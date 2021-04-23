export default class ExchangeService {
  static getExchangeRate(inputCurrency, outputCurrency) {
    return fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${inputCurrency}`)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        return error;
      });
  }
}