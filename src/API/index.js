import axios from "axios";
const cryptoURL = "https://www.cryptocompare.com";

class API {
  constructor() {
    this.axios = axios.create({
      baseURL: "https://min-api.cryptocompare.com"
    });
  }
  fetchNews = async (timestamp, sortOrder = "latest", limit = 1500) => {
    const query = `/data/v2/news/?lang=EN`;

    let news = await this.axios.get(query, {
      params: {
        lTs: timestamp,
        sortOrder
      }
    });
    news = news.data.Data;
    return news.splice(0, limit);
  };
  fetchCoinsList = async (amount = 1000) => {
    const query = "/data/all/coinlist";
    const response = await this.axios.get(query);
    const data = response.data.Data;
    const formattedData = {};
    const sortedCoins = Object.keys(data).sort(
      (coinA, coinB) =>
        parseInt(data[coinA].sortOrder) - parseInt(data[coinB].sortOrder)
    );
    console.log(data, sortedCoins);

    for (let coin of sortedCoins) {
      const coinData = data[coin];
      formattedData[coin] = {
        name: coinData.Name,
        symbol: coinData.Symbol,
        fullName: coinData.FullName,
        coinName: coinData.CoinName,
        imageURL: cryptoURL + coinData.ImageUrl,
        totalCoinSupply: coinData.TotalCoinSupply,
        totalCoinsMined: coinData.TotalCoinsMined,
        sortOrder: parseInt(coinData.SortOrder)
      };
    }
    return formattedData;
  };

  fetchCoinsData = async (coinsList, currency = "EUR") => {
    const query = `data/pricemultifull?fsyms=${coinsList.join(
      ","
    )}&tsyms=${currency}`;

    const response = await this.axios.get(query);
    const formattedData = {};
    const data = response.data.RAW;
    for (let coin in data) {
      formattedData[coin] = data[coin][currency];
    }
    return formattedData;
  };

  fetchCoinsHistoricalData = async (coin, timeSpan) => {
    const maxDataPoints = 180;
    // let limit;
    let query, limit, aggregate;
    switch (timeSpan) {
      case "1H":
        limit = 60;
        query = `https://min-api.cryptocompare.com/data/histominute?fsym=${coin}&tsym=EUR&limit=${limit}`;
        break;
      case "24H":
        limit = 24 * 60;
        aggregate = limit / maxDataPoints;
        query = `https://min-api.cryptocompare.com/data/histominute?fsym=${coin}&tsym=EUR&limit=${maxDataPoints}&aggregate=${aggregate}`;
        break;
      case "1M":
        limit = 30 * 24;
        aggregate = limit / maxDataPoints;
        query = `https://min-api.cryptocompare.com/data/histohour?fsym=${coin}&tsym=EUR&limit=${maxDataPoints}&aggregate=${aggregate}`;
        break;
      case "3M":
        limit = 90;
        query = `https://min-api.cryptocompare.com/data/histoday?fsym=${coin}&tsym=EUR&limit=${maxDataPoints}`;
        break;
      case "1Y":
        limit = 360;
        aggregate = limit / maxDataPoints;
        query = `https://min-api.cryptocompare.com/data/histoday?fsym=${coin}&tsym=EUR&limit=${maxDataPoints}&aggregate=${aggregate}`;
        break;
      default:
    }
    // const params = {
    //   fsym: coin,
    //   tsym: currency,
    //   limit,
    //   aggreagate
    // }
    const response = await this.axios.get(query);
    const data = response.data.Data;
    return data;
  };
}

export default new API();
