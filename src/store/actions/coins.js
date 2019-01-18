import {
  FETCH_COINS_LIST_REQUEST,
  FETCH_COINS_LIST_SUCCESS,
  FETCH_COINS_LIST_ERROR
} from "./actionTypes";

import API from "../../API";

export const setCoinsList = data => ({
  type: FETCH_COINS_LIST_SUCCESS,
  payload: data
});
export const fetchCoinsList = () => async dispatch => {
  dispatch({ type: FETCH_COINS_LIST_REQUEST });
  try {
    console.log("fetch coins list");
    const coinsList = await API.fetchCoinsList();
    dispatch(setCoinsList(coinsList));
  } catch (error) {
    dispatch({ type: FETCH_COINS_LIST_ERROR });
  }
};
