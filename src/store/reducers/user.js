import {
  FOLLOW_COIN,
  UNFOLLOW_COIN,
  SET_THEME,
  TOGGLE_VINTAGE_FONT,
  SET_EVENT_SEEN
} from "../actions/actionTypes";

import { saveState, loadState } from "../localStorage";
const LOCAL_STORAGE_KEY = "user";

const persistedState = loadState(LOCAL_STORAGE_KEY) || {};
const initialState = {
  coinsList: [],
  seenEvents: [],
  currency: "EUR",
  vintageFont: true,
  theme: "default",
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
      case TOGGLE_VINTAGE_FONT:
        return { ...state, vintageFont: action.payload };
      case SET_EVENT_SEEN:
        const eventId = action.payload;
        const seenEvents = [...state.seenEvents, eventId];
        return { ...state, seenEvents };
      default:
        return state;
    }
  })();
  saveState(LOCAL_STORAGE_KEY, newState);
  return newState;
};

export default userReducer;
