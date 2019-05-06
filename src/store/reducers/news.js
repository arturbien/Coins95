import { FETCH_NEWS_SUCCESS } from "../actions/actionTypes";

const initialState = null;

const coinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS_SUCCESS:
      const news = action.payload;
      return news;
    default:
      return state;
  }
};

export default coinsReducer;
