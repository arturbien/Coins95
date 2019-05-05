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
export const fetchCoinsList = () => async dispatch => {
  dispatch({ type: FETCH_COINS_LIST_REQUEST });
  try {
    const coinsList = await API.fetchCoinsList();
    dispatch(setCoinsList(coinsList));
  } catch (error) {
    dispatch({ type: FETCH_COINS_LIST_ERROR });
  }
};

export const setCoinsData = data => ({
  type: FETCH_COINS_DATA_SUCCESS,
  payload: data
});
export const fetchCoinsData = (coinsList, currency) => async dispatch => {
  dispatch({ type: FETCH_COINS_DATA_REQUEST });
  try {
    const coinsData = await API.fetchCoinsData(coinsList, currency);
    dispatch(setCoinsData(coinsData));
  } catch (error) {
    dispatch({ type: FETCH_COINS_DATA_ERROR });
  }
};
