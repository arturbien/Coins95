import { combineReducers } from "redux";

import coinsReducer, * as FromCoinsList from "./coins";
import userReducer from "./user";
import newsReducer from "./news";

const rootReducer = combineReducers({
  coins: coinsReducer,
  user: userReducer,
  news: newsReducer
});

export default rootReducer;

export const selectCoins = (store, ammount) => {
  return FromCoinsList.selectCoins(store.coins, ammount);
};
