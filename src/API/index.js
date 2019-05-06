import axios from "axios";
const cryptoURL = "https://www.cryptocompare.com";

class API {
  constructor() {
    this.axios = axios.create({
      baseURL: "https://min-api.cryptocompare.com"
    });
  }
  fetchNews = async (sortOrder = "latest") => {
    const query = `/data/v2/news/?lang=EN`;
    let news = await this.axios.get(query);
    news = news.data.Data;
    return news;
  };
  fetchCoinsList = async (ammount = 10) => {
    const query = "/data/all/coinlist";
    const response = await this.axios.get(query);
    const data = response.data.Data;
    console.log(data);
    const formattedData = {};
    for (let coin in data) {
      const coinData = data[coin];
      formattedData[coin] = {
        name: coinData.Name,
        symbol: coinData.Symbol,
        fullName: coinData.FullName,
        coinName: coinData.CoinName,
        imageURL: cryptoURL + coinData.ImageUrl,
        totalCoinSupply: coinData.TotalCoinSupply,
        totalCoinsMined: coinData.TotalCoinsMined,
        sortOrder: coinData.SortOrder
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
    const response = await this.axios.get(query);
    const data = response.data.Data;
    return data;
  };
}

export default new API();
