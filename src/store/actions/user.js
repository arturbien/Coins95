import { FOLLOW_COIN, UNFOLLOW_COIN } from "./actionTypes";

export const setUserCoin = (coin, follow) => ({
  type: follow ? FOLLOW_COIN : UNFOLLOW_COIN,
  payload: coin
});
