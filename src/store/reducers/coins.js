import {
  FETCH_COINS_LIST_SUCCESS,
  FETCH_COINS_DATA_SUCCESS
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
      // sorting by  rank
      const coinsList = Object.keys(coinsInfo).sort(
        (coinA, coinB) =>
          coinsInfo[coinA].sortOrder - coinsInfo[coinB].sortOrder
      );
      return { ...state, coinsList, coinsInfo };
    case FETCH_COINS_DATA_SUCCESS:
      return { ...state, coinsData: action.payload };

    default:
      return state;
  }
};

export default coinsReducer;
// selectors
export const selectCoins = (state, ammount) => {
  return state.splice(0, ammount);
};
