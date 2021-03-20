import {
  FETCH_COINS_INFO_REQUEST,
  FETCH_COINS_INFO_SUCCESS,
  FETCH_COINS_INFO_ERROR,
  FETCH_COINS_DATA_REQUEST,
  FETCH_COINS_DATA_SUCCESS,
  FETCH_COINS_DATA_ERROR,
} from "./actionConstants";

import { AppThunk } from "..";

import { CoinsList, CoinsInfo, CoinsData } from "../reducers/coins";

import API from "../../API";

export const setCoinInfo = (data: { top: CoinsList; info: CoinsInfo }) =>
  ({
    type: FETCH_COINS_INFO_SUCCESS,
    payload: data,
  } as const);

export const fetchCoinsInfo = (): AppThunk => async (dispatch) => {
  dispatch({ type: FETCH_COINS_INFO_REQUEST });
  try {
    const info = await API.fetchCoinsInfo();
    const top = await API.fetchTopList();
    dispatch(setCoinInfo({ top, info }));
  } catch (error) {
    dispatch({ type: FETCH_COINS_INFO_ERROR });
  }
};

export const setCoinsData = (data: CoinsData) =>
  ({
    type: FETCH_COINS_DATA_SUCCESS,
    payload: data,
  } as const);

export const fetchCoinsData = (): AppThunk => async (dispatch, getState) => {
  dispatch({ type: FETCH_COINS_DATA_REQUEST });
  try {
    const state = getState();
    const currency = state.user.currency;

    const walletCoins = Object.keys(state.user.wallet);
    const followedCoins = state.user.followed;
    const topCoins = state.coins.top;
    const allCoins = [
      ...new Set([
        ...followedCoins,
        ...(topCoins || []),
        ...(walletCoins || []),
      ]),
    ];

    const coinsData: CoinsData = await API.fetchCoinsData(allCoins, currency);
    dispatch(setCoinsData(coinsData));
  } catch (error) {
    dispatch({ type: FETCH_COINS_DATA_ERROR });
  }
};
