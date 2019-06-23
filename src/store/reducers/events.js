import { FETCH_EVENTS_SUCCESS } from "../actions/actionTypes";

const initialState = null;

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default eventsReducer;
