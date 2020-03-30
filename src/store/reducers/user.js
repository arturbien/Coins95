import {
  FOLLOW_COIN,
  UNFOLLOW_COIN,
  SET_THEME,
  SET_BACKGROUND,
  TOGGLE_VINTAGE_FONT,
  SET_FONT_SIZE,
  SET_EVENT_SEEN,
  SET_USER_HOLDINGS,
  DELETE_USER_HOLDINGS,
  SORT_USER_HOLDINGS,
  SET_USER_CURRENCY
} from "../actions/actionTypes";

import { saveState, loadState } from "../localStorage";

import BricksIMG from "../../assets/img/backgrounds/bricks.png";

import MazeIMG from "../../assets/img/backgrounds/egypt.png";

import Rivets from "../../assets/img/backgrounds/rivets.png";
import Zigzag from "../../assets/img/backgrounds/zigzag.png";
import PurpleSquares from "../../assets/img/backgrounds/purpleSquares.png";
import Honey from "../../assets/img/backgrounds/honey.png";

import WaterIMG from "../../assets/img/backgrounds/water.gif";
import PoolsideIMG from "../../assets/img/backgrounds/poolside.gif";
import NoiseIMG from "../../assets/img/backgrounds/noise.gif";

// import Marble from "../../assets/img/backgrounds/marble.png";
// import Arches from "../../assets/img/backgrounds/arches.png";

const LOCAL_STORAGE_KEY = "user";

const persistedState = loadState(LOCAL_STORAGE_KEY) || {};

export const backgrounds = [
  { value: "teal", label: "Teal" },
  { value: `url(${BricksIMG})`, label: "Bricks" },
  { value: `url(${MazeIMG})`, label: "Maze" },

  { value: `url(${Rivets})`, label: "Rivets" },
  { value: `url(${Zigzag})`, label: "Zig-zag" },
  { value: `url(${PurpleSquares})`, label: "Purple squares" },
  { value: `url(${Honey})`, label: "Honey" },

  { value: `url(${WaterIMG})`, label: "Water" },
  { value: `url(${PoolsideIMG})`, label: "Poolside OS" },
  { value: `url(${NoiseIMG})`, label: "Noise" }

  // { value: `url(${Marble})`, label: "Marble" },
  // { value: `url(${Arches})`, label: "Arches" },
];

const initialState = {
  followed: [],
  wallet: {},
  seenEvents: [],
  currency: "EUR",
  vintageFont: true,
  theme: "default",
  background: 7,
  fontSize: 1,
  ...persistedState
};

const userReducer = (state = initialState, action) => {
  let followed;
  const newState = (function() {
    switch (action.type) {
      case FOLLOW_COIN:
        followed = [...new Set([...state.followed, action.payload])];
        return { ...state, followed };
      case UNFOLLOW_COIN:
        followed = state.followed.filter(
          userCoin => userCoin !== action.payload
        );
        return { ...state, followed };
      case SET_THEME:
        return { ...state, theme: action.payload };
      case SET_BACKGROUND:
        return { ...state, background: action.payload };
      case TOGGLE_VINTAGE_FONT:
        return { ...state, vintageFont: action.payload };
      case SET_FONT_SIZE:
          return { ...state, fontSize: action.payload };
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
        action.payload.forEach(coin => (wallet[coin] = state.wallet[coin]));
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
