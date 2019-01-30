import axios from "axios";
const cryptoURL = "https://www.cryptocompare.com";

class API {
  constructor() {
    this.axios = axios.create({
      baseURL: "https://min-api.cryptocompare.com"
    });
  }

  fetchCoinsList = async (ammount = 10) => {
    const query = "/data/all/coinlist";
    const response = await this.axios.get(query);
    const data = response.data.Data;
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

  fetchCoinsData = async (coinsList, currency = "PLN") => {
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

  fetchHistoricalData = async coin => {
    const limit = 10;
    const query = `https://min-api.cryptocompare.com/data/histoday?fsym=${coin}&tsym=PLN&limit=${limit}`;
    const response = await this.axios.get(query);
    const data = response.data.Data;
    return data;
  };
}

export default new API();
