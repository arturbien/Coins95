import {
  FETCH_COINS_LIST_SUCCESS,
  FETCH_COINS_DATA_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  top: null,
  info: null,
  coinsData: null
};
const coinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COINS_LIST_SUCCESS:
      const { top, info } = action.payload;
      return { ...state, top, info };
    case FETCH_COINS_DATA_SUCCESS:
      return { ...state, coinsData: action.payload };
    default:
      return state;
  }
};

export default coinsReducer;
