import API, { CoinGecko } from "../../API";

import { AppThunk } from "..";
import {
  FETCH_EVENTS_ERROR,
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  SET_EVENT_SEEN,
} from "./actionConstants";

export const setEvents = (events: CoinGecko.Event[]) =>
  ({
    type: FETCH_EVENTS_SUCCESS,
    payload: events,
  } as const);

export const fetchEvents = (): AppThunk => async (dispatch) => {
  dispatch({ type: FETCH_EVENTS_REQUEST });
  try {
    // TODO
    // const events = await API.fetchEvents(timestamp);
    const events = await API.fetchEvents();
    dispatch(setEvents(events));
  } catch (error) {
    dispatch({ type: FETCH_EVENTS_ERROR });
  }
};

export const setEventSeen = (eventID: string) =>
  ({
    type: SET_EVENT_SEEN,
    payload: eventID,
  } as const);
