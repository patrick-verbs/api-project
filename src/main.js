import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './js/exchange-rate-service.js';

const CACHED_RESPONSES = [];

function currencyNotFound() {
  // $("#currency-not-found").show();
}

function showExchangeRate(response) {
  if (response) {
    if (response.result === "success") {
      // const someCurrencyProbably = response.PROPERTY;
      $("#output-result").html(`<h1>Here's the API query result: ${response.result}</h1>`);
    // } else if (response.PROPERTY === "OTHER VALUE") {
      // const someOtherCurrencyMaybe = response.PROPERTY;
      // $("#output-result").html(`${response.PROPERTY}`);
    }
  }
}  

async function parseBaseCurrency(doFetch, inputCurrency) {
  let response;
  if (doFetch) {
    console.log(`Query not yet cached: fetching ${inputCurrency} data via API`);
    response = await ExchangeService.getExchangeRates(inputCurrency);
    CACHED_RESPONSES.push(response);
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
    showExchangeRate(response);
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
    console.log(inputQuantity, inputCurrency, outputCurrency);

    // returns 'true' if the base unit is not yet stored/fetched
    const doFetch = requestNotCached(inputCurrency);

    parseBaseCurrency(doFetch, inputCurrency);
    // Refactor this to search the array for the correct response (instead of just the most recent one)
    // inputCurrencyResponse = CACHED_RESPONSES[CACHED_RESPONSES.length - 1];
  });
});