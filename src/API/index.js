import axios from "axios";
const cryptoURL = "https://www.cryptocompare.com";

class API {
  constructor() {
    this.axios = axios.create({
      baseURL: "https://min-api.cryptocompare.com"
    });
  }

  fetchEvents = async () => {
    const query = `https://api.coingecko.com/api/v3/events?upcoming_events_only=${true}`;
    const response = await axios.get(query);
    const data = response.data.data;
    // creating ID because CoinGecko doesn't supply one 😥
    data.forEach(event => (event.id = event.organizer + event.title));
    return data;
  };

  fetchNews = async (timestamp, sortOrder = "latest", limit = 15) => {
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
  fetchTopList = async (amount = 30, currency = "EUR") => {
    const query = `/data/top/totalvolfull?limit=${amount}&tsym=${currency}`;
    const response = await this.axios.get(query);
    const data = response.data.Data;
    const coinsTopList = data.map(coinData => coinData.CoinInfo.Name);
    return coinsTopList;
  };
  fetchCoinsInfo = async (amount = 1000) => {
    const query = "/data/all/coinlist";
    const response = await this.axios.get(query);
    const data = response.data.Data;
    const formattedData = {};
    const sortedCoins = Object.keys(data).sort(
      (coinA, coinB) =>
        parseInt(data[coinA].sortOrder) - parseInt(data[coinB].sortOrder)
    );
    sortedCoins.forEach(coin => {
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
    });

    return formattedData;
  };

  fetchCoinsData = async (coinsList, currency = "EUR", display = false) => {
    const query = `data/pricemultifull?fsyms=${coinsList.join(
      ","
    )}&tsyms=${currency}`;

    const response = await this.axios.get(query);
    const formattedData = {};
    const data = response.data[display ? "DISPLAY" : "RAW"];

    Object.keys(data).forEach(coin => {
      formattedData[coin] = data[coin][currency];
      formattedData[coin].imageURL = cryptoURL + formattedData[coin].IMAGEURL;
    });
    return formattedData;
  };

  fetchCoinsHistoricalData = async (coin, timeSpan, currency = "EUR") => {
    const maxDataPoints = 180;
    // let limit;
    let query, limit, aggregate;
    switch (timeSpan) {
      case "1H":
        limit = 60;
        query = `https://min-api.cryptocompare.com/data/histominute?fsym=${coin}&tsym=${currency}&limit=${limit}`;
        break;
      case "24H":
        limit = 24 * 60;
        aggregate = limit / maxDataPoints;
        query = `https://min-api.cryptocompare.com/data/histominute?fsym=${coin}&tsym=${currency}&limit=${maxDataPoints}&aggregate=${aggregate}`;
        break;
      case "1M":
        limit = 30 * 24;
        aggregate = limit / maxDataPoints;
        query = `https://min-api.cryptocompare.com/data/histohour?fsym=${coin}&tsym=${currency}&limit=${maxDataPoints}&aggregate=${aggregate}`;
        break;
      case "3M":
        limit = 90;
        query = `https://min-api.cryptocompare.com/data/histoday?fsym=${coin}&tsym=${currency}&limit=${maxDataPoints}`;
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
  // fetchCoinsInfo = async (IDs, limit, currency = "usd") => {
  //   let query = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`;
  //   if (IDs) {
  //     query += `&ids=${IDs.join(",")}`;
  //   }
  //   const response = await axios.get(query);
  //   const data = response.data;
  // };
}

export default new API();
