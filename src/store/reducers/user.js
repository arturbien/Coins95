import {
  FOLLOW_COIN,
  UNFOLLOW_COIN,
  SET_THEME,
  SET_BACKGROUND,
  SET_CUSTOM_BACKGROUND,
  TOGGLE_VINTAGE_FONT,
  SET_FONT_SIZE,
  SET_EVENT_SEEN,
  SET_USER_HOLDINGS,
  DELETE_USER_HOLDINGS,
  SORT_USER_HOLDINGS,
  SET_USER_CURRENCY,
  TOGGLE_SCAN_LINES,
  SET_SCAN_LINES_INTENSITY,
} from "../actions/actionTypes";

import { saveState, loadState } from "../localStorage";
import Rivets from "../../assets/img/backgrounds/rivets.png";
import Zigzag from "../../assets/img/backgrounds/zigzag.png";
import PurpleSquares from "../../assets/img/backgrounds/purpleSquares.png";
import Honey from "../../assets/img/backgrounds/honey.png";

import WaterIMG from "../../assets/img/backgrounds/water.gif";
import NoiseIMG from "../../assets/img/backgrounds/noise.gif";

const LOCAL_STORAGE_KEY = "user";
const persistedState = loadState(LOCAL_STORAGE_KEY) || {};

export const backgrounds = [
  { value: "#008080", label: "(Custom)" },
  { value: `url(${Rivets})`, label: "Rivets" },
  { value: `url(${Zigzag})`, label: "Zig-zag" },
  { value: `url(${PurpleSquares})`, label: "Purple squares" },
  { value: `url(${Honey})`, label: "Honey" },

  { value: `url(${WaterIMG})`, label: "Water" },
  { value: `url(${NoiseIMG})`, label: "Noise" },
];

const initialState = {
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
  // scanLinesIntensity in %
  scanLinesIntensity: 0,
  ...persistedState,
};

const userReducer = (state = initialState, action) => {
  let followed;
  const newState = (function () {
    switch (action.type) {
      case FOLLOW_COIN:
        followed = [...new Set([...state.followed, action.payload])];
        return { ...state, followed };
      case UNFOLLOW_COIN:
        followed = state.followed.filter(
          (userCoin) => userCoin !== action.payload
        );
        return { ...state, followed };
      case SET_THEME:
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
        const order = wallet[coin] ? wallet[coin].order : wallet.length;
        wallet[coin] = { symbol: coin, amount, order };
        return { ...state, wallet };
      case DELETE_USER_HOLDINGS: {
        const wallet = { ...state.wallet };
        wallet[action.payload] && delete wallet[action.payload];
        return { ...state, wallet };
      }
      case SORT_USER_HOLDINGS: {
        const wallet = {};
        action.payload.forEach((coin) => (wallet[coin] = state.wallet[coin]));
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
