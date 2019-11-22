import {
  FETCH_COINS_LIST_REQUEST,
  FETCH_COINS_LIST_SUCCESS,
  FETCH_COINS_LIST_ERROR,
  FETCH_COINS_DATA_REQUEST,
  FETCH_COINS_DATA_SUCCESS,
  FETCH_COINS_DATA_ERROR
} from "./actionTypes";

import API from "../../API";

export const setCoinsList = data => ({
  type: FETCH_COINS_LIST_SUCCESS,
  payload: data
});
export const fetchCoinsInfo = () => async dispatch => {
  dispatch({ type: FETCH_COINS_LIST_REQUEST });
  try {
    const info = await API.fetchCoinsInfo();
    const top = await API.fetchTopList();
    dispatch(setCoinsList({ top, info }));
  } catch (error) {
    dispatch({ type: FETCH_COINS_LIST_ERROR });
  }
};

export const setCoinsData = data => ({
  type: FETCH_COINS_DATA_SUCCESS,
  payload: data
});
export const fetchCoinsData = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_COINS_DATA_REQUEST });
  try {
    const state = getState();
    const currency = state.user.currency;
    const wallet = Object.keys(state.user.wallet);
    const followed = state.user.coinsList;
    const top = state.coins.top;
    const allCoins = [
      ...new Set([...followed, ...(top || []), ...(wallet || [])])
    ];
    const coinsData = await API.fetchCoinsData(allCoins, currency);
    dispatch(setCoinsData(coinsData));
  } catch (error) {
    dispatch({ type: FETCH_COINS_DATA_ERROR });
  }
};
