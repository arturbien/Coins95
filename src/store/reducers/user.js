import { FETCH_COINS_LIST_SUCCESS } from "../actions/actionTypes";
const initialState = {
  coinsList: null,
  currency: "USD"
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COINS_LIST_SUCCESS:
      if (state.coinsList === null) {
        const data = action.payload;
        const coinsList = Object.keys(action.payload)
          .sort((coinA, coinB) => data[coinA].sortOrder - data[coinB].sortOrder)
          .splice(0, 5);
        return { ...state, coinsList: coinsList };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default userReducer;
