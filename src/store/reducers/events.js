import { FETCH_EVENTS_SUCCESS, SET_EVENT_SEEN } from "../actions/actionTypes";

const initialState = null;

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return action.payload;
    case SET_EVENT_SEEN:
      const id = action.payload;
      const events = [...state];
      const index = events.findIndex(e => e.id === id);
      events[index].seen = true;
      return events;
    default:
      return state;
  }
};

export default eventsReducer;
