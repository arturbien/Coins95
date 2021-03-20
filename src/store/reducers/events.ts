import { FETCH_EVENTS_SUCCESS } from "../actions/events";
import { ActionTypes } from "../actions/actionTypes";

type Event = {};

type EventsState = Event[] | null;
const initialState: EventsState = null;

const eventsReducer = (
  state: EventsState = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default eventsReducer;
