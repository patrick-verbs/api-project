import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './js/exchange-rate-service.js';

let CACHED_RESPONSES = [];

function showExchangeRate(response) {
  if (response) {
    if (response.PROPERTY === "VALUE") {
      const someCurrencyProbably = response.PROPERTY;
      $("#element").text(response.PROPERTY);
    } else if (response.PROPERTY === "OTHER VALUE") {
      const someOtherCurrencyMaybe = response.PROPERTY;
      $("#element").text(response.PROPERTY);
    }
  }
}

function currencyNotFound() {
  // $("#currency-not-found").show();
}

async function fetchBaseCurrency(doFetch, inputCurrency) {
  let response;
  if (doFetch) {
    response = await ExchangeService.getExchangeRates(inputCurrency);
  }
  if (response instanceof Error) {
    console.log(`Hey! This is an error!`);
    console.log(response);
    currencyNotFound();
  } else {
    // $("#currency-not-found").hide();
    console.log(`Received exchange rates based on currency: ${response.base_code}`);
    // response.PROPERTY = outputCurrency;
    showExchangeRate(response);
  }
}

function requestIsCached(requestedCurrency, CACHED_RESPONSES) {
  if (requestedCurrency === CACHED_RESPONSES[0]) {
    // Expand the check into a loop, and also compare current date/time to next update per API
    // skip fetchBaseCurrency
    return false;
  } else {
    return true;
  }
}

$(document).ready(function () {
  // Refactor this to choose the input currency on the first menu
  // ...then fetch, and create <select> options from the "result.conversion_rates" entries
  // ...and therefore do NOT fetch when a user requests a conversion; just do the math
  //
  // For now, using scoped variables to compare the user's chosen currency (e.g. USD)
  // to the last fetched one, to prevent spamming the fetches (until page refresh, anyway)
  let inputCurrencyResponse;
  $("#currency-submit").on("click", function() {
    const inputQuantity = $("#input-quantity").val();
    const inputCurrency = $("#input-currency").val().toUpperCase();// All 3-letter currency values in ExchangeRate-API are uppercase
    const outputCurrency = $("#output-currency").val().toUpperCase();
    console.log(inputQuantity, inputCurrency, outputCurrency);
    let doFetch = false;
    if (!requestIsCached(inputCurrency, CACHED_RESPONSES)) {
      // if the base unit & time is not yet stored/fetched, fetch it
      // and add to the array of cached responses
      doFetch = true;
    }
    CACHED_RESPONSES.push(fetchBaseCurrency(doFetch, inputCurrency));
    // Refactor this to search the array for the correct response (instead of just the most recent one)
    inputCurrencyResponse = CACHED_RESPONSES[CACHED_RESPONSES.length - 1];
    showExchangeRate(inputCurrencyResponse, outputCurrency);
  });
});