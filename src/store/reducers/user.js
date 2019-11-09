import {
  FOLLOW_COIN,
  UNFOLLOW_COIN,
  SET_THEME,
  SET_BACKGROUND,
  TOGGLE_VINTAGE_FONT,
  SET_EVENT_SEEN,
  SET_USER_HOLDINGS,
  DELETE_USER_HOLDINGS,
  SORT_USER_HOLDINGS
} from "../actions/actionTypes";

import { saveState, loadState } from "../localStorage";
import CloudsIMG from "../../assets/img/backgrounds/clouds.jpg";
import BricksIMG from "../../assets/img/backgrounds/bricks.png";
import MazeIMG from "../../assets/img/backgrounds/maze.png";
import BluescreenIMG from "../../assets/img/backgrounds/bluescreen.png";
import WaterIMG from "../../assets/img/backgrounds/water.gif";
import PoolsideIMG from "../../assets/img/backgrounds/poolside.gif";
import NoiseIMG from "../../assets/img/backgrounds/noise.gif";

const LOCAL_STORAGE_KEY = "user";

const persistedState = loadState(LOCAL_STORAGE_KEY) || {};

export const backgrounds = [
  { value: "teal", label: "Teal" },
  { value: "black", label: "Black" },
  { value: `url(${CloudsIMG})`, label: "Clouds" },
  { value: `url(${BricksIMG})`, label: "Bricks" },
  { value: `url(${BluescreenIMG})`, label: "Bluescreen" },
  { value: `url(${MazeIMG})`, label: "Maze" },
  { value: `url(${WaterIMG})`, label: "Water" },
  { value: `url(${PoolsideIMG})`, label: "Poolside OS" },
  { value: `url(${NoiseIMG})`, label: "Noise" }
];

const initialState = {
  coinsList: [],
  wallet: {},
  seenEvents: [],
  currency: "EUR",
  vintageFont: true,
  theme: "default",
  background: 6,
  ...persistedState
};

const userReducer = (state = initialState, action) => {
  let coinsList;
  const newState = (function() {
    switch (action.type) {
      case FOLLOW_COIN:
        coinsList = [...new Set([...state.coinsList, action.payload])];
        return { ...state, coinsList };
      case UNFOLLOW_COIN:
        coinsList = state.coinsList.filter(
          userCoin => userCoin !== action.payload
        );
        return { ...state, coinsList };
      case SET_THEME:
        return { ...state, theme: action.payload };
      case SET_BACKGROUND:
        return { ...state, background: action.payload };
      case TOGGLE_VINTAGE_FONT:
        return { ...state, vintageFont: action.payload };
      case SET_EVENT_SEEN:
        const eventId = action.payload;
        const seenEvents = [...state.seenEvents, eventId];
        return { ...state, seenEvents };
      case SET_USER_HOLDINGS:
        const { amount, coin } = action.payload;
        const wallet = { ...state.wallet };
        const order = wallet[coin] ? wallet[coin].order : wallet.length;
        wallet[coin] = { coin, amount, order };
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
      default:
        return state;
    }
  })();
  saveState(LOCAL_STORAGE_KEY, newState);
  return newState;
};

export default userReducer;
