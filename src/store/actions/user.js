import {
  FOLLOW_COIN,
  UNFOLLOW_COIN,
  SET_THEME,
  SET_BACKGROUND,
  TOGGLE_VINTAGE_FONT,
  SET_USER_HOLDINGS,
  DELETE_USER_HOLDINGS,
  SORT_USER_HOLDINGS,
  SET_FONT_SIZE,
  SET_USER_CURRENCY
} from "./actionTypes";

export const setCurrency = currency => ({
  type: SET_USER_CURRENCY,
  payload: currency
});
export const setFollowedCoin = (coin, follow) => ({
  type: follow ? FOLLOW_COIN : UNFOLLOW_COIN,
  payload: coin
});

export const setTheme = theme => ({
  type: SET_THEME,
  payload: theme
});
export const setBackground = backgroundIndex => ({
  type: SET_BACKGROUND,
  payload: backgroundIndex
});
export const toggleVintageFont = isVintage => ({
  type: TOGGLE_VINTAGE_FONT,
  payload: isVintage
});
export const setFontSize = fontSize => ({
  type: SET_FONT_SIZE,
  payload: fontSize
})
export const setUserHoldings = ({ amount, coin }) => ({
  type: SET_USER_HOLDINGS,
  payload: {
    amount,
    coin
  }
});

export const deleteUserHoldings = coin => ({
  type: DELETE_USER_HOLDINGS,
  payload: coin
});

export const sortUserHoldings = coinsList => ({
  type: SORT_USER_HOLDINGS,
  payload: coinsList
});
