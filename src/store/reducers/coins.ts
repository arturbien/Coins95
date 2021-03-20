import {
  FETCH_COINS_INFO_SUCCESS,
  FETCH_COINS_DATA_SUCCESS,
} from "../actions/actionConstants";
import { ActionTypes } from "../actions/actionTypes";

export type CoinsList = string[];

export type CoinsInfo = {
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
};

export type CoinsData = {
  [coinName: string]: {
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
    //TODO:
    imageURL: string;
  };
};

type CoinsState = {
  top: CoinsList | null;
  info: CoinsInfo | null;
  coinsData: CoinsData | null;
};

const initialState: CoinsState = {
  top: null,
  info: null,
  coinsData: null,
};

const coinsReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case FETCH_COINS_INFO_SUCCESS:
      const { top, info } = action.payload;
      return { ...state, top, info };
    case FETCH_COINS_DATA_SUCCESS:
      return { ...state, coinsData: action.payload };
    default:
      return state;
  }
};

export default coinsReducer;
