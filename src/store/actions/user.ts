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
} from "./actionConstants";

import { ThemeName } from "../../themes";
import { Background, Currency } from "../reducers/user";

// TODO: find a better way than 'as const' to handle action creator return types
export const setCurrency = (currency: Currency) =>
  ({
    type: SET_USER_CURRENCY,
    payload: currency,
  } as const);

export const setFollowedCoin = (coin: string, follow: boolean) =>
  ({
    type: follow ? FOLLOW_COIN : UNFOLLOW_COIN,
    payload: coin,
  } as const);

export const setTheme = (theme: ThemeName) =>
  ({
    type: SET_THEME,
    payload: theme,
  } as const);

export const setBackground = (background: Background) =>
  ({
    type: SET_BACKGROUND,
    payload: background,
  } as const);

export const setCustomBackground = (color: string) =>
  ({
    type: SET_CUSTOM_BACKGROUND,
    payload: color,
  } as const);

export const toggleVintageFont = (isVintage: boolean) =>
  ({
    type: TOGGLE_VINTAGE_FONT,
    payload: isVintage,
  } as const);

export const toggleScanLines = (scanLinesOn: boolean) =>
  ({
    type: TOGGLE_SCAN_LINES,
    payload: scanLinesOn,
  } as const);

export const setScanLinesIntensity = (intensity: number) =>
  ({
    type: SET_SCAN_LINES_INTENSITY,
    payload: intensity,
  } as const);

export const setFontSize = (fontSize: number) =>
  ({
    type: SET_FONT_SIZE,
    payload: fontSize,
  } as const);

export const setUserHoldings = ({
  amount,
  coin,
}: {
  amount: number;
  coin: string;
}) =>
  ({
    type: SET_USER_HOLDINGS,
    payload: {
      amount,
      coin,
    },
  } as const);

export const deleteUserHoldings = (coin: string) =>
  ({
    type: DELETE_USER_HOLDINGS,
    payload: coin,
  } as const);

export const sortUserHoldings = (coinsList: string[]) =>
  ({
    type: SORT_USER_HOLDINGS,
    payload: coinsList,
  } as const);
