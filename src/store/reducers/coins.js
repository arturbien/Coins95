import { FETCH_COINS_LIST_SUCCESS } from "../actions/actionTypes";

const initialState = {
  coinsList: null
};
const coinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COINS_LIST_SUCCESS:
      return { ...state, coinsList: action.payload };
    default:
      return state;
  }
};

export default coinsReducer;

// selectors

export const selectCoins = (state, ammount) => {
  return state.splice(0, ammount);
};
