import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CACHED_RESPONSES from './js/cache.js';
import ExchangeService from './js/exchange-rate-service.js';

function resetDisplay() {
  $("#output-result").show();
  $("#progress-log").html("");
  const errorConsole = $("#error-console");
  errorConsole.hide();
  errorConsole.html("");
}

function printError(message) {
  $("#output-result").hide();
  const errorConsole = $("#error-console");
  errorConsole.append(`<li>${message}</li>`);
  errorConsole.show();
}

function buildInputOptions(currencyCode) {
  let arrayOfCurrencies = [];
  for (const currency in currencyCode) {
    arrayOfCurrencies.push(currency);
  }
  let html = "";
  for (let i = 0; i < arrayOfCurrencies.length; i++) {
    html += `<option value="${arrayOfCurrencies[i]}" require>${arrayOfCurrencies[i]}</option>`;
  }
  return {
    html_string: html,
    currency_codes: arrayOfCurrencies
  };
}

function showExchangeRate(userQuery) {
  const response = userQuery.response;
  const allCurrencies = userQuery.response.conversion_rates;

  let conversionRate;

  userQuery.progress_log.append(`<li><ul>Searching for output currency "${userQuery.output_currency}":`);
  for (const currency in allCurrencies) {
    userQuery.progress_log.append(`<li>${currency}: ${allCurrencies[currency]}</li>`);
    if (currency === userQuery.output_currency) {
      conversionRate = allCurrencies[currency];
      break;
    }
  }
  userQuery.progress_log.append(`</ul></li>`);

  const convertedCurrency = (userQuery.input_quantity * conversionRate).toFixed(2);

  if (response.result === "success") {
    $("#output-result").html(`<h3>${userQuery.input_quantity} ${userQuery.input_currency} converts to: <br> <strong><em>${convertedCurrency} ${userQuery.output_currency}</em></strong></h3>`);
  } else {
    printError(`An error occurred: <em>${response["error-type"]}</em>. Please verify the URL, including your private API key.`);
  }
}

async function parseBaseCurrency(userQuery) {
  let response;
  if (userQuery.do_fetch === true) {
    userQuery.progress_log.append(`<li>Query not yet cached: fetching ${userQuery.input_currency} data via API</li>`);
    response = await ExchangeService.getExchangeRates(userQuery.input_currency);
    CACHED_RESPONSES.unshift(response);
  } else {
    userQuery.progress_log.append(`<li>Query is cached: bypassing API fetch</li>`);
    response = CACHED_RESPONSES[0];
  }
  if (response instanceof Error) {
    const errorMessage = `There was an error: ${response.message}`;
    printError(errorMessage);
  } else {
    $("#error-console").hide();
    userQuery.progress_log.append(`<li>Received exchange rates based on currency: ${response.base_code}</li>`);
    userQuery.response = response;
    showExchangeRate(userQuery);
  }
}

function requestNotCached(currencyCode) {
  const currentTime = Date.now() / 1000;
  for (let i = 0; i < CACHED_RESPONSES.length; i++) {
    if (currencyCode === CACHED_RESPONSES[i].base_code
    && currentTime >= CACHED_RESPONSES[i].time_last_update_unix
    && currentTime < CACHED_RESPONSES[i].time_next_update_unix
    ) {
      return false;
    } else {
      return true;
    }
  }
}

$(document).ready(function () {
  let latestCache = CACHED_RESPONSES[0];
  const allCurrencyCodes = buildInputOptions(latestCache.conversion_rates);
  $("#input-currency").html(allCurrencyCodes.html_string);
  $("#output-currency").html(allCurrencyCodes.html_string);

  $("#currency-submit").on("click", function() {
    resetDisplay();

    // All 3-letter currency codes in ExchangeRate-API are uppercase
    const inputCurrency = $("#input-currency").val().toUpperCase();
    const outputCurrency = $("#output-currency").val().toUpperCase();
    
    let inputErrors = false;
    
    const validInputCurrency = Object.prototype.hasOwnProperty.call(latestCache["conversion_rates"], inputCurrency);
    if (!validInputCurrency) {
      inputErrors = true;
      printError(`"${inputCurrency}" is not a recognized currency code so its quantity cannot be converted.`);
    }
    
    const validOutputCurrency = Object.prototype.hasOwnProperty.call(latestCache["conversion_rates"], outputCurrency);
    if (!validOutputCurrency) {
      inputErrors = true;
      printError(`"${outputCurrency}" is not a recognized currency code so no value can be converted into it.`);
    }
    
    const inputQuantity = parseFloat($("#input-quantity").val());
    const inputQuantityShortened = inputQuantity.toFixed(2);
    if (isNaN(inputQuantity)
    || inputQuantity < 0
    || inputQuantity > 10000000000000
    || inputQuantityShortened != inputQuantity) {
      inputErrors = true;
      printError(`"${inputQuantity}" is not a valid number between 0 and 10 trillion, or exceeds the two-decimal-place limit.`);
    }

    if (!inputErrors) {
      const doFetch = requestNotCached(inputCurrency);
      // returns 'true' if the base unit's response is not yet fetched/cached for the current date

      const progressLog = $("#progress-log");
      progressLog.html("");
      // used to show console-like progress to the user

      const userQuery = {
        do_fetch: doFetch,
        input_quantity: inputQuantity,
        input_currency: inputCurrency,
        output_currency: outputCurrency,
        progress_log: progressLog
      };

      parseBaseCurrency(userQuery);
    }
  });
});