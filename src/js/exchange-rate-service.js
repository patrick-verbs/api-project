export default class ExchangeService {
  static getExchangeRates(inputCurrency) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${inputCurrency}`)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        console.log(response);
        return response.json();
      })
      .catch(function (error) {
        return error;
      });
  }
}