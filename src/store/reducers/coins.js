import {
  FETCH_COINS_LIST_SUCCESS,
  FETCH_COINS_DATA_SUCCESS,
  FETCH_COINS_HISTORICAL_DATA_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  coinsList: null,
  coinsInfo: null,
  coinsData: null
};
const coinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COINS_LIST_SUCCESS:
      const coinsInfo = action.payload;
      const coinsList = Object.keys(coinsInfo);
      return { ...state, coinsList, coinsInfo };
    case FETCH_COINS_DATA_SUCCESS:
      return { ...state, coinsData: action.payload };
    case FETCH_COINS_HISTORICAL_DATA_SUCCESS:
      const { timeSpan, data } = action.payload;
      return { ...state, coinsHistoricalData: { data, timeSpan } };
    default:
      return state;
  }
};

export default coinsReducer;

// selectors

export const selectCoins = (state, ammount) => {
  return state.splice(0, ammount);
};
