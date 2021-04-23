import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './js/exchange-rate-service.js';

function showExchangeRate(response) {
  // if (response) {
  //   if (response.PROPERTY === "VALUE") {
  //     const someCurrencyProbably = response.PROPERTY;
  // $("#element").text(response.PROPERTY);
  // } else if (response.PROPERTY === "OTHER VALUE") {
  //   const someOtherCurrencyMaybe = response.PROPERTY;
  // $("#element").text(response.PROPERTY);
  //   }
  // }
}

function currencyNotFound() {
  // $("#currency-not-found").show();
}

async function parseExchangeRate(inputCurrency, outputCurrency) {
  const response = await ExchangeService.getExchangeRate(inputCurrency, outputCurrency);
  if (response instanceof Error) {
    console.log("Hey! This is an error!");
    console.log(response);
    currencyNotFound();
  } else {
    console.log(response.PROPERTY);
    response.PROPERTY = outputCurrency;
    showExchangeRate(response);
    $("#could-not-find").hide();
  }
}

$(document).ready(function () {
  $('#currency-submit').on("click", "other stuff", function() {
    let inputCurrency = $('#text-input1').text().toLowerCase();
    let outputCurrency = $('#text-input2').text().toLowerCase();
    parseExchangeRate(inputCurrency, outputCurrency);
  });
});