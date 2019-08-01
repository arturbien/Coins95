import {
  FOLLOW_COIN,
  UNFOLLOW_COIN,
  SET_THEME,
  SET_BACKGROUND,
  TOGGLE_VINTAGE_FONT
} from "./actionTypes";

export const setUserCoin = (coin, follow) => ({
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
