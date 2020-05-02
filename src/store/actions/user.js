import {
  FOLLOW_COIN,
  UNFOLLOW_COIN,
  SET_THEME,
  SET_BACKGROUND,
  SET_CUSTOM_BACKGROUND,
  TOGGLE_VINTAGE_FONT,
  SET_USER_HOLDINGS,
  DELETE_USER_HOLDINGS,
  SORT_USER_HOLDINGS,
  SET_FONT_SIZE,
  SET_USER_CURRENCY,
  TOGGLE_SCAN_LINES,
  SET_SCAN_LINES_INTENSITY,
} from "./actionTypes";

export const setCurrency = (currency) => ({
  type: SET_USER_CURRENCY,
  payload: currency,
});
export const setFollowedCoin = (coin, follow) => ({
  type: follow ? FOLLOW_COIN : UNFOLLOW_COIN,
  payload: coin,
});
export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});
export const setBackground = (background) => ({
  type: SET_BACKGROUND,
  payload: background,
});
export const setCustomBackground = (color) => ({
  type: SET_CUSTOM_BACKGROUND,
  payload: color,
});
export const toggleVintageFont = (isVintage) => ({
  type: TOGGLE_VINTAGE_FONT,
  payload: isVintage,
});
export const toggleScanLines = (scanLinesOn) => ({
  type: TOGGLE_SCAN_LINES,
  payload: scanLinesOn,
});
export const setScanLinesIntensity = (intensity) => ({
  type: SET_SCAN_LINES_INTENSITY,
  payload: intensity,
});
export const setFontSize = (fontSize) => ({
  type: SET_FONT_SIZE,
  payload: fontSize,
});
export const setUserHoldings = ({ amount, coin }) => ({
  type: SET_USER_HOLDINGS,
  payload: {
    amount,
    coin,
  },
});
export const deleteUserHoldings = (coin) => ({
  type: DELETE_USER_HOLDINGS,
  payload: coin,
});
export const sortUserHoldings = (coinsList) => ({
  type: SORT_USER_HOLDINGS,
  payload: coinsList,
});
