import axios from "axios";

class API {
  constructor() {
    this.axios = axios.create({
      baseURL: "https://min-api.cryptocompare.com"
    });
  }

  fetchCoinsList = async (ammount = 5) => {
    const response = await this.axios.get("/data/all/coinlist");
    const data = response.data.Data;
    const coinsList = Object.keys(data).sort(
      (coinA, coinB) => data[coinA].SortOrder - data[coinB].SortOrder
    );
    console.log(coinsList);
    return coinsList;
  };
}

export default new API();
