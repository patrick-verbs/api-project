const CACHED_RESPONSES = [
  {
    "result": "success",
    "documentation": "https://www.exchangerate-api.com/docs",
    "terms_of_use": "https://www.exchangerate-api.com/terms",
    "time_last_update_unix": 1619913601,
    "time_last_update_utc": "Sun, 02 May 2021 00:00:01 +0000",
    "time_next_update_unix": 1620000001,
    "time_next_update_utc": "Mon, 03 May 2021 00:00:01 +0000",
    "base_code": "USD",
    "conversion_rates": {
      "USD": 1,
      "AED": 3.6725,
      "AFN": 77.8033,
      "ALL": 101.3773,
      "AMD": 520.6194,
      "ANG": 1.7900,
      "AOA": 650.6498,
      "ARS": 93.4452,
      "AUD": 1.2911,
      "AWG": 1.7900,
      "AZN": 1.6968,
      "BAM": 1.6189,
      "BBD": 2.0000,
      "BDT": 84.7713,
      "BGN": 1.6185,
      "BHD": 0.3760,
      "BIF": 1949.7779,
      "BMD": 1.0000,
      "BND": 1.3263,
      "BOB": 6.8700,
      "BRL": 5.3573,
      "BSD": 1.0000,
      "BTN": 74.1118,
      "BWP": 10.8852,
      "BYN": 2.5564,
      "BZD": 2.0000,
      "CAD": 1.2263,
      "CDF": 1982.3802,
      "CHF": 0.9120,
      "CLP": 705.2609,
      "CNY": 6.4687,
      "COP": 3721.1702,
      "CRC": 613.4516,
      "CUC": 1.0000,
      "CUP": 25.7500,
      "CVE": 91.2718,
      "CZK": 21.4212,
      "DJF": 177.7210,
      "DKK": 6.1753,
      "DOP": 57.0384,
      "DZD": 133.3267,
      "EGP": 15.6466,
      "ERN": 15.0000,
      "ETB": 42.0238,
      "EUR": 0.8278,
      "FJD": 2.0203,
      "FKP": 0.7205,
      "FOK": 6.1753,
      "GBP": 0.7205,
      "GEL": 3.4468,
      "GGP": 0.7205,
      "GHS": 5.7631,
      "GIP": 0.7205,
      "GMD": 51.8678,
      "GNF": 9886.0215,
      "GTQ": 7.6914,
      "GYD": 213.1637,
      "HKD": 7.7683,
      "HNL": 23.9807,
      "HRK": 6.2367,
      "HTG": 85.3553,
      "HUF": 298.3625,
      "IDR": 14415.2282,
      "ILS": 3.2519,
      "IMP": 0.7205,
      "INR": 74.1123,
      "IQD": 1455.7271,
      "IRR": 41879.2094,
      "ISK": 123.3464,
      "JMD": 152.8292,
      "JOD": 0.7090,
      "JPY": 109.1699,
      "KES": 107.7405,
      "KGS": 84.7984,
      "KHR": 4071.3400,
      "KID": 1.2911,
      "KMF": 407.2259,
      "KRW": 1112.2905,
      "KWD": 0.2996,
      "KYD": 0.8333,
      "KZT": 428.4530,
      "LAK": 9406.3207,
      "LBP": 1507.5000,
      "LKR": 197.1687,
      "LRD": 171.8726,
      "LSL": 14.4245,
      "LYD": 4.4703,
      "MAD": 8.8941,
      "MDL": 17.7889,
      "MGA": 3790.4530,
      "MKD": 50.7976,
      "MMK": 1490.7894,
      "MNT": 2844.7380,
      "MOP": 8.0013,
      "MRU": 35.9577,
      "MUR": 40.1841,
      "MVR": 15.4284,
      "MWK": 792.4669,
      "MXN": 20.1750,
      "MYR": 4.1009,
      "MZN": 57.4136,
      "NAD": 14.4245,
      "NGN": 399.4452,
      "NIO": 35.1252,
      "NOK": 8.2668,
      "NPR": 118.5789,
      "NZD": 1.3904,
      "OMR": 0.3845,
      "PAB": 1.0000,
      "PEN": 3.7827,
      "PGK": 3.5144,
      "PHP": 48.3077,
      "PKR": 153.4303,
      "PLN": 3.7802,
      "PYG": 6432.8583,
      "QAR": 3.6400,
      "RON": 4.0726,
      "RSD": 96.9151,
      "RUB": 74.9181,
      "RWF": 999.3783,
      "SAR": 3.7500,
      "SBD": 7.9260,
      "SCR": 14.5052,
      "SDG": 378.6346,
      "SEK": 8.4258,
      "SGD": 1.3264,
      "SHP": 0.7205,
      "SLL": 10205.7849,
      "SOS": 577.2749,
      "SRD": 14.1229,
      "SSP": 177.6091,
      "STN": 20.2799,
      "SYP": 1304.3687,
      "SZL": 14.4245,
      "THB": 31.2136,
      "TJS": 11.3128,
      "TMT": 3.4994,
      "TND": 2.7333,
      "TOP": 2.2597,
      "TRY": 8.2682,
      "TTD": 6.7775,
      "TVD": 1.2911,
      "TWD": 27.8764,
      "TZS": 2315.1806,
      "UAH": 27.4719,
      "UGX": 3571.1009,
      "UYU": 43.7852,
      "UZS": 10418.6392,
      "VES": 2816059.9068,
      "VND": 23035.2164,
      "VUV": 107.6568,
      "WST": 2.5044,
      "XAF": 542.9678,
      "XCD": 2.7000,
      "XDR": 0.6966,
      "XOF": 542.9678,
      "XPF": 98.7770,
      "YER": 249.9693,
      "ZAR": 14.4249,
      "ZMW": 22.3203
    }
  }
];

export default CACHED_RESPONSES;