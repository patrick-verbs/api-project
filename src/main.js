import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './js/exchange-rate-service.js';

const CACHED_RESPONSES = [];

function currencyNotFound() {
  // $("#currency-not-found").show();
}

function showExchangeRate(userQuery) {
  const response = userQuery.response;
  const allCurrencies = userQuery.response.conversion_rates;

  let conversionRate;

  for (const currency in allCurrencies) {
    console.log(`${currency}: ${allCurrencies[currency]}`);
    if (currency === userQuery.output_currency) {
      conversionRate = allCurrencies[currency];
      break;
    }
  }

  const result = userQuery.input_quantity * conversionRate;

  if (response.result === "success") {
    // const someCurrencyProbably = response.PROPERTY;
    $("#output-result").html(`<h3>Here's the API query result: ${result}</h3>`);
  // } else if (response.PROPERTY === "OTHER VALUE") {
    // const someOtherCurrencyMaybe = response.PROPERTY;
    // $("#output-result").html(`${response.PROPERTY}`);
  }
}

async function parseBaseCurrency(userQuery) {
  let response;
  if (userQuery.do_fetch) {
    console.log(`Query not yet cached: fetching ${userQuery.input_currency} data via API`);
    response = await ExchangeService.getExchangeRates(userQuery.input_currency);
    CACHED_RESPONSES.unshift(response);
  } else {
    console.log(`Query is cached: bypassing API fetch`);
    response = CACHED_RESPONSES[0];
  }
  if (response instanceof Error) {
    console.log(`Hey! This is an error!`);
    console.log(response);
    currencyNotFound();
  } else {
    // $("#currency-not-found").hide();
    console.log(`Received exchange rates based on currency: ${response.base_code}`);
    // response.PROPERTY = outputCurrency;
    userQuery.response = response;
    showExchangeRate(userQuery);
  }
}

function requestNotCached(currencyCode) {
  if (CACHED_RESPONSES[0] != undefined && currencyCode === CACHED_RESPONSES[0].base_code) {
    // Expand the check into a loop, and also compare current date/time to next update per API
    // skip parseBaseCurrency
    return false;
  } else {
    return true;
  }
}

$(document).ready(function () {
  let latestCache;
  // Refactor this to choose the input currency on the first menu
  // ...then fetch, and create <select> options from the "result.conversion_rates" entries
  // ...and therefore do NOT fetch when a user requests a conversion; just do the math
  //
  // For now, using scoped variables to compare the user's chosen currency (e.g. USD)
  // to the last fetched one, to prevent spamming the fetches (until page refresh, anyway)
  // let inputCurrencyResponse;
  $("#currency-submit").on("click", function() {
    const inputQuantity = $("#input-quantity").val();
    const inputCurrency = $("#input-currency").val().toUpperCase();// All 3-letter currency values in ExchangeRate-API are uppercase
    const outputCurrency = $("#output-currency").val().toUpperCase();


    for (let i = 0; i < CACHED_RESPONSES.length; i++) {
      for (const currency in CACHED_RESPONSES[i]) {
        if (inputCurrency === userQuery.output_currency) {
          conversionRate = allCurrencies[currency];
        }
      }
    }

    // returns 'true' if the base unit is not yet fetched/cached
    const doFetch = requestNotCached(inputCurrency);

    const userQuery = {
      do_fetch: doFetch,
      input_quantity: inputQuantity,
      input_currency: inputCurrency,
      output_currency: outputCurrency
    };

    parseBaseCurrency(userQuery);
    // Refactor this to search the array for the correct response (instead of just the most recent one)
    // inputCurrencyResponse = CACHED_RESPONSES[CACHED_RESPONSES.length - 1];
  });
});