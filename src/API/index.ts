import axios, { AxiosInstance } from "axios";
import { CoinsList, CoinsInfo } from "../store/reducers/coins";

const cryptocompareURL = "https://www.cryptocompare.com";

declare namespace CoinGecko {
  type Event = {
    id: string;
    organizer: string;
    title: string;
  };

  type EventsResponse = {
    count: number;
    data: Event[];
    page: number;
  };
}

declare namespace CryptoCompare {
  // TODO: are there any other values for SortOrder?
  type SortOrder = "latest";

  type NewsRequestParams = {
    lTs: number;
    sortOrder: SortOrder;
    extraParams: string;
    categories: string;
    excludeCategories: string;
    feeds: string;
    limit: number;
    lang: string;
  };

  type NewsItem = {
    body: string;
    categories: string;
    downvotes: string;
    guid: string;
    id: string;
    imageurl: string;
    lang: string;
    published_on: number;
    source: string;
    source_info: {
      name: string;
      lang: string;
      img: string;
    };
    tags: string;
    title: string;
    upvotes: string;
    url: string;
  };

  type NewsRequestResponse = {
    Data: NewsItem[];
    HasWarning: boolean;
    Message: string;
    Promoted: string[];
    RateLimit: object;
    Type: number;
  };

  type TopListRequestParams = {
    limit: number;
    page: number;
    tsym: string;
    assetClass: "DEFI" | "ALL";
    ascending: boolean;
    sign: boolean;
  };

  type CoinInfo = {
    Algorithm: string;
    AssetLaunchDate: string;
    BlockNumber: number;
    BlockReward: number;
    BlockTime: number;
    DocumentType: string;
    FullName: string;
    Id: string;
    ImageUrl: string;
    Internal: string;
    MaxSupply: number;
    Name: string;
    NetHashesPerSecond: number;
    ProofType: string;
    Rating: {
      Weiss: {
        Rating: "C-";
        TechnologyAdoptionRating: "C-";
        MarketPerformanceRating: "C+";
      };
    };
    Type: number;
    Url: string;
  };

  type TopListRequestResponse = {
    Data: { CoinInfo: CoinInfo }[];
    HasWarning: boolean;
    Message: "Success";
    MetaData: { Count: number };
    RateLimit: {};
    SponsoredData: any[];
    Type: number;
  };

  type CoinsListRequestParams = {
    builtOn: string;
    summary: boolean;
    extraParams: string;
    sign: boolean;
  };

  type CoinsListResponse = {
    BaseImageUrl: string;
    BaseLinkUrl: string;

    Data: {
      [coinName: string]: CoinInfo & {
        SortOrder: string;
        Symbol: string;
        CoinName: string;
        TotalCoinSupply: number;
        TotalCoinsMined: number;
      };
    };
    HasWarning: boolean;
    Message: string;
    MetaData: { Count: number };
    RateLimit: {};
    Response: "Success";
    Type: number;
  };

  type CoinsDataRequestParams = {
    fsyms: string;
    tsyms: string;
  };

  type DisplayCoinData = {
    CHANGE24HOUR: string;
    CHANGEDAY: string;
    CHANGEHOUR: string;
    CHANGEPCT24HOUR: string;
    CHANGEPCTDAY: string;
    CHANGEPCTHOUR: string;
    CONVERSIONSYMBOL: string;
    CONVERSIONTYPE: string;
    FROMSYMBOL: string;
    HIGH24HOUR: string;
    HIGHDAY: string;
    HIGHHOUR: string;
    IMAGEURL: string;
    LASTMARKET: string;
    LASTTRADEID: string;
    LASTUPDATE: string;
    LASTVOLUME: string;
    LASTVOLUMETO: string;
    LOW24HOUR: string;
    LOWDAY: string;
    LOWHOUR: string;
    MARKET: string;
    MKTCAP: string;
    MKTCAPPENALTY: string;
    OPEN24HOUR: string;
    OPENDAY: string;
    OPENHOUR: string;
    PRICE: string;
    SUPPLY: string;
    TOPTIERVOLUME24HOUR: string;
    TOPTIERVOLUME24HOURTO: string;
    TOSYMBOL: string;
    TOTALTOPTIERVOLUME24H: string;
    TOTALTOPTIERVOLUME24HTO: string;
    TOTALVOLUME24H: string;
    TOTALVOLUME24HTO: string;
    VOLUME24HOUR: string;
    VOLUME24HOURTO: string;
    VOLUMEDAY: string;
    VOLUMEDAYTO: string;
    VOLUMEHOUR: string;
    VOLUMEHOURTO: string;
  };
  type RawCoinData = {
    CHANGE24HOUR: number;
    CHANGEDAY: number;
    CHANGEHOUR: number;
    CHANGEPCT24HOUR: number;
    CHANGEPCTDAY: number;
    CHANGEPCTHOUR: number;
    CONVERSIONSYMBOL: string;
    CONVERSIONTYPE: string;
    FROMSYMBOL: string;
    HIGH24HOUR: number;
    HIGHDAY: number;
    HIGHHOUR: number;
    IMAGEURL: string;
    LASTMARKET: string;
    LASTTRADEID: string;
    LASTUPDATE: number;
    LASTVOLUME: number;
    LASTVOLUMETO: number;
    LOW24HOUR: number;
    LOWDAY: number;
    LOWHOUR: number;
    MARKET: string;
    MKTCAP: number;
    MKTCAPPENALTY: number;
    OPEN24HOUR: number;
    OPENDAY: number;
    OPENHOUR: number;
    PRICE: number;
    SUPPLY: number;
    TOPTIERVOLUME24HOUR: number;
    TOPTIERVOLUME24HOURTO: number;
    TOSYMBOL: string;
    TOTALTOPTIERVOLUME24H: number;
    TOTALTOPTIERVOLUME24HTO: number;
    TOTALVOLUME24H: number;
    TOTALVOLUME24HTO: number;
    VOLUME24HOUR: number;
    VOLUME24HOURTO: number;
    VOLUMEDAY: number;
    VOLUMEDAYTO: number;
    VOLUMEHOUR: number;
    VOLUMEHOURTO: number;
  };
  type CoinsDataRequestResponse = {
    DISPLAY: {
      [coinName: string]: {
        [currency: string]: DisplayCoinData;
      };
    };
    RAW: {
      [coinName: string]: {
        [currency: string]: RawCoinData;
      };
    };
  };

  type HistoricalDataRequestResponse = {
    Aggregated: boolean;
    ConversionType: {
      conversionSymbol: string;
      type: "direct";
    };
    Data: {
      HLCAverage: number;
      close: number;
      conversionSymbol: string;
      conversionType: string;
      high: number;
      low: number;
      open: number;
      time: number;
      volumefrom: number;
      volumeto: number;
    }[];
    FirstValueInArray: boolean;
    HasWarning: boolean;
    RateLimit: {};
    Response: "Success";
    TimeFrom: number;
    TimeTo: number;
    Type: number;
  };
}

class API {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: "https://min-api.cryptocompare.com",
    });
  }

  fetchEvents = async () => {
    const query = `https://api.coingecko.com/api/v3/events?upcoming_events_only=${true}`;
    const response = await axios.get<CoinGecko.EventsResponse>(query);
    const data = response.data.data;
    // creating ID because CoinGecko doesn't supply one 😥
    data.forEach((event) => (event.id = event.organizer + event.title));
    return data;
  };

  fetchNews = async (
    timestamp: number,
    sortOrder: CryptoCompare.SortOrder = "latest",
    limit = 15
  ) => {
    const query = `/data/v2/news/`;

    let news = await this.axios.get<CryptoCompare.NewsRequestResponse>(query, {
      params: {
        lTs: timestamp,
        sortOrder,
        lang: "EN",
        // TODO: use something else than "as" keyword
      } as CryptoCompare.NewsRequestParams,
    });
    const data = news.data.Data;
    return data.splice(0, limit);
  };

  fetchTopList = async (amount = 30, currency = "EUR"): Promise<CoinsList> => {
    const query = `/data/top/totalvolfull`;
    let response = await this.axios.get<CryptoCompare.TopListRequestResponse>(
      query,
      {
        params: {
          limit: amount,
          tsym: currency,
        } as CryptoCompare.TopListRequestParams,
      }
    );
    const data = response.data.Data;
    const coinsTopList = data.map((coinData) => coinData.CoinInfo.Name);
    return coinsTopList;
  };

  fetchCoinsInfo = async (): Promise<CoinsInfo> => {
    const query = "/data/all/coinlist";
    const response = await this.axios.get<CryptoCompare.CoinsListResponse>(
      query
    );
    const data = response.data.Data;
    const formattedData: {
      [coinName: string]: {
        name: string;
        symbol: string;
        fullName: string;
        coinName: string;
        imageURL: string;
        totalCoinSupply: number;
        totalCoinsMined: number;
        sortOrder: number;
      };
    } = {};
    const sortedCoins = Object.keys(data).sort(
      (coinA, coinB) =>
        parseInt(data[coinA].SortOrder) - parseInt(data[coinB].SortOrder)
    );
    sortedCoins.forEach((coin) => {
      const coinData = data[coin];
      formattedData[coin] = {
        name: coinData.Name,
        symbol: coinData.Symbol,
        fullName: coinData.FullName.split(" ").join("_"),
        coinName: coinData.CoinName.split(" ").join("_"),
        imageURL: cryptocompareURL + coinData.ImageUrl,
        totalCoinSupply: coinData.TotalCoinSupply,
        totalCoinsMined: coinData.TotalCoinsMined,
        sortOrder: parseInt(coinData.SortOrder),
      };
    });

    return formattedData;
  };

  fetchCoinsData = async (coinsList: string[], currency: string = "EUR") => {
    const response = await this.axios.get<CryptoCompare.CoinsDataRequestResponse>(
      `data/pricemultifull`,
      {
        params: {
          fsyms: coinsList.join(","),
          tsyms: currency,
        } as CryptoCompare.CoinsDataRequestParams,
      }
    );

    const formattedData: {
      [coinName: string]: CryptoCompare.RawCoinData & { imageURL: string };
    } = {};
    const data = response.data.RAW;

    Object.keys(data).forEach((coin) => {
      formattedData[coin] = {
        ...data[coin][currency],
        imageURL: cryptocompareURL + data[coin][currency].IMAGEURL,
      };
    });
    return formattedData;
  };

  fetchCoinsDisplayData = async <T extends boolean>(
    coinsList: string[],
    currency: string = "EUR"
  ) => {
    const response = await this.axios.get<CryptoCompare.CoinsDataRequestResponse>(
      `data/pricemultifull`,
      {
        params: {
          fsyms: coinsList.join(","),
          tsyms: currency,
        } as CryptoCompare.CoinsDataRequestParams,
      }
    );

    const formattedData: {
      [coinName: string]: CryptoCompare.DisplayCoinData & {
        imageURL: string;
      };
    } = {};
    const data = response.data.DISPLAY;

    Object.keys(data).forEach((coin) => {
      formattedData[coin] = {
        ...data[coin][currency],
        imageURL: cryptocompareURL + data[coin][currency].IMAGEURL,
      };
    });
    return formattedData;
  };

  fetchCoinsHistoricalData = async (
    coin: string,
    timeSpan: "1H" | "24H" | "1M" | "3M" | "1Y",
    currency = "EUR"
  ) => {
    const maxDataPoints = 180;

    let query: string;
    let limit, aggregate;
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
        return false;
    }

    const response = await this.axios.get(query);
    const data = response.data.Data;
    return data;
  };
}

export default new API();
