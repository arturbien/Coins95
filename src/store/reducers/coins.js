import {
  FETCH_COINS_TOP_LIST_SUCCESS,
  FETCH_COINS_LIST_SUCCESS,
  FETCH_COINS_DATA_SUCCESS,
  FOLLOW_COIN
} from "../actions/actionTypes";

const initialState = {
  coinsTopList: null,
  coinsList: null,
  coinsInfo: null,
  coinsData: null,
  needsUpdate: false
};
const coinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COINS_TOP_LIST_SUCCESS:
      const coinsTopList = action.payload;
      return { ...state, coinsTopList };
    case FETCH_COINS_LIST_SUCCESS:
      const coinsInfo = action.payload;
      // sorting by  rank
      const coinsList = Object.keys(coinsInfo).sort(
        (coinA, coinB) =>
          coinsInfo[coinA].sortOrder - coinsInfo[coinB].sortOrder
      );
      return { ...state, coinsList, coinsInfo };
    case FETCH_COINS_DATA_SUCCESS:
      return { ...state, coinsData: action.payload, needsUpdate: false };
    case FOLLOW_COIN:
      return { ...state, needsUpdate: true };
    default:
      return state;
  }
};

export default coinsReducer;
