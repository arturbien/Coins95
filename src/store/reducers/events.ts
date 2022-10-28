import { CoinGecko } from "../../API";
import { FETCH_EVENTS_SUCCESS } from "../actions/actionConstants";
import { ActionTypes } from "../actions/actionTypes";

type EventsState = CoinGecko.Event[] | null;
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
