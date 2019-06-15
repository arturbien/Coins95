import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_ERROR
} from "./actionTypes";

import API from "../../API";

export const setNews = (news, extend) => ({
  type: FETCH_NEWS_SUCCESS,
  payload: {
    news,
    extend
  }
});
export const fetchNews = timestamp => async dispatch => {
  dispatch({ type: FETCH_NEWS_REQUEST });
  try {
    const news = await API.fetchNews(timestamp);
    dispatch(setNews(news, timestamp ? true : false));
  } catch (error) {
    dispatch({ type: FETCH_NEWS_ERROR });
  }
};
