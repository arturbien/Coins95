import API from "../../API";

import { AppDispatch } from "..";

export const FETCH_EVENTS_REQUEST = "FETCH_EVENTS_REQUEST";
export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const FETCH_EVENTS_ERROR = "FETCH_EVENTS_ERROR";
export const SET_EVENT_SEEN = "SET_EVENT_SEEN";

export const setEvents = (events: any[]) =>
  ({
    type: FETCH_EVENTS_SUCCESS,
    payload: events,
  } as const);

export const fetchEvents = (timestamp: number) => async (
  dispatch: AppDispatch
) => {
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
