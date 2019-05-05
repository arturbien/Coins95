import { FOLLOW_COIN, UNFOLLOW_COIN } from "../actions/actionTypes";

const initialState = {
  coinsList: ["BTC", "ETH"],
  currency: "EUR"
};

const userReducer = (state = initialState, action) => {
  let coinsList;
  switch (action.type) {
    case FOLLOW_COIN:
      coinsList = [...new Set([...state.coinsList, action.payload])];
      return { ...state, coinsList };
    case UNFOLLOW_COIN:
      coinsList = state.coinsList.filter(
        userCoin => userCoin !== action.payload
      );
      return { ...state, coinsList };
    default:
      return state;
  }
};

export default userReducer;
