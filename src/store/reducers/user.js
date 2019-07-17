import {
  FOLLOW_COIN,
  UNFOLLOW_COIN,
  SET_THEME,
  TOGGLE_VINTAGE_FONT
} from "../actions/actionTypes";

const initialState = {
  coinsList: ["BTC", "ETH"],
  currency: "EUR",
  vintageFont: true,
  theme: "default"
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
    case SET_THEME:
      return { ...state, theme: action.payload };
    case TOGGLE_VINTAGE_FONT:
      return { ...state, vintageFont: action.payload };
    default:
      return state;
  }
};

export default userReducer;
