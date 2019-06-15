import { FETCH_NEWS_SUCCESS } from "../actions/actionTypes";

const initialState = null;

const coinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS_SUCCESS:
      let news;
      const newNews = action.payload.news;
      if (action.payload.extend) {
        let uniqueIDs = [];
        news = [...state, ...newNews];
        news = news.filter(n => {
          if (!uniqueIDs.includes(n.id)) {
            uniqueIDs.push(n.id);
            return true;
          } else {
            return false;
          }
        });
      } else {
        news = newNews;
      }
      return news;
    default:
      return state;
  }
};

export default coinsReducer;
