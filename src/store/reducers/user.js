import { FETCH_COINS_LIST_SUCCESS } from "../actions/actionTypes";
const initialState = {
  coinsList: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COINS_LIST_SUCCESS:
      if (state.coinsList === null) {
        return { ...state, coinsList: action.payload.splice(0, 5) };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default userReducer;
