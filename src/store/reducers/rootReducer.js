import { combineReducers } from "redux";

import coinsReducer, * as FromCoinsList from "./coins";
import userReducer from "./user";
const rootReducer = combineReducers({
  coins: coinsReducer,
  user: userReducer
});

export default rootReducer;

export const selectCoins = (store, ammount) => {
  return FromCoinsList.selectCoins(store.coins, ammount);
};
