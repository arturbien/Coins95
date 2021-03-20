import {
  FOLLOW_COIN,
  UNFOLLOW_COIN,
  SET_THEME,
  SET_BACKGROUND,
  SET_CUSTOM_BACKGROUND,
  TOGGLE_VINTAGE_FONT,
  SET_FONT_SIZE,
  SET_USER_HOLDINGS,
  DELETE_USER_HOLDINGS,
  SORT_USER_HOLDINGS,
  SET_USER_CURRENCY,
  TOGGLE_SCAN_LINES,
  SET_SCAN_LINES_INTENSITY,
} from "../actions/actionConstants";
import { ActionTypes } from "../actions/actionTypes";

import { CoinsList } from "./coins";

import { SET_EVENT_SEEN } from "../actions/events";

import { saveState, loadState } from "../localStorage";

import { ThemeName } from "../../themes";

import Rivets from "../../assets/img/backgrounds/rivets.png";
import Zigzag from "../../assets/img/backgrounds/zigzag.png";
import PurpleSquares from "../../assets/img/backgrounds/purpleSquares.png";
import Honey from "../../assets/img/backgrounds/honey.png";
import Water from "../../assets/img/backgrounds/water.gif";
import Noise from "../../assets/img/backgrounds/noise.gif";

const LOCAL_STORAGE_KEY = "user";
const persistedState = loadState(LOCAL_STORAGE_KEY) || {};

export type Background = { value: string; label: string };
// TODO: nominal type for Color?
export type Color = string;

export const backgrounds: Background[] = [
  { value: "#008080", label: "(Custom)" },

  { value: `url(${Rivets})`, label: "Rivets" },
  { value: `url(${Zigzag})`, label: "Zig-zag" },
  { value: `url(${PurpleSquares})`, label: "Purple squares" },
  { value: `url(${Honey})`, label: "Honey" },
  { value: `url(${Water})`, label: "Water" },
  { value: `url(${Noise})`, label: "Noise" },
];

export const currencies = ["USD", "EUR", "PLN", "JPY"] as const;

export type Currency = typeof currencies[number];

type Wallet = {
  [coinName: string]: { symbol: string; amount: number; order: number };
};

type UserState = {
  followed: CoinsList;
  wallet: Wallet;
  seenEvents: any;
  currency: Currency;
  vintageFont: boolean;
  theme: ThemeName;
  backgrounds: Background[];
  background: Background;
  fontSize: number;
  scanLines: boolean;
  // scanLinesIntensity in %
  scanLinesIntensity: number;
};

const initialState: UserState = {
  followed: [],
  wallet: {},
  seenEvents: [],
  currency: "EUR",
  vintageFont: true,
  theme: "original",
  backgrounds,
  background: backgrounds[0],
  fontSize: 1,
  scanLines: false,
  scanLinesIntensity: 0,
  ...persistedState,
};

const userReducer = (state = initialState, action: ActionTypes): UserState => {
  const newState = (function (): UserState {
    switch (action.type) {
      case FOLLOW_COIN: {
        const followed = [...new Set([...state.followed, action.payload])];
        return { ...state, followed };
      }
      case UNFOLLOW_COIN: {
        const followed = state.followed.filter(
          (userCoin: string) => userCoin !== action.payload
        );
        return { ...state, followed };
      }
      case SET_THEME:
        let a = action;
        return { ...state, theme: action.payload };
      case SET_BACKGROUND:
        return { ...state, background: action.payload };
      case SET_CUSTOM_BACKGROUND:
        const [custom, ...rest] = state.backgrounds;
        const customBackground = { ...custom, value: action.payload };
        const newBackgrounds = [customBackground, ...rest];
        return {
          ...state,
          backgrounds: newBackgrounds,
          background: customBackground,
        };
      case TOGGLE_VINTAGE_FONT:
        return { ...state, vintageFont: action.payload };
      case SET_FONT_SIZE:
        return { ...state, fontSize: action.payload };
      case TOGGLE_SCAN_LINES:
        return { ...state, scanLines: action.payload };
      case SET_SCAN_LINES_INTENSITY:
        return { ...state, scanLinesIntensity: action.payload };
      case SET_EVENT_SEEN:
        const eventId = action.payload;
        const seenEvents = [...state.seenEvents, eventId];
        return { ...state, seenEvents };
      case SET_USER_HOLDINGS:
        const { amount, coin } = action.payload;
        const wallet = { ...state.wallet };
        const numberOfCoinsInWallet = Object.keys(wallet).length;
        const order = wallet[coin] ? wallet[coin].order : numberOfCoinsInWallet;
        wallet[coin] = { symbol: coin, amount, order };
        return { ...state, wallet };
      case DELETE_USER_HOLDINGS: {
        const wallet = { ...state.wallet };
        wallet[action.payload] && delete wallet[action.payload];
        return { ...state, wallet };
      }
      case SORT_USER_HOLDINGS: {
        const coinsList: string[] = action.payload;
        const wallet = coinsList.reduce((obj, coinName) => {
          return {
            ...obj,
            [coinName]: state.wallet[coinName],
          };
        }, {});

        return { ...state, wallet };
      }
      case SET_USER_CURRENCY:
        return { ...state, currency: action.payload };
      default:
        return state;
    }
  })();
  saveState(LOCAL_STORAGE_KEY, newState);
  return newState;
};

export default userReducer;
