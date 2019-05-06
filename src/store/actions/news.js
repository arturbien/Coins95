import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_ERROR
} from "./actionTypes";

import API from "../../API";

export const setNews = news => ({
  type: FETCH_NEWS_SUCCESS,
  payload: news
});
export const fetchNews = () => async dispatch => {
  dispatch({ type: FETCH_NEWS_REQUEST });
  try {
    const news = await API.fetchNews();
    dispatch(setNews(news));
  } catch (error) {
    dispatch({ type: FETCH_NEWS_ERROR });
  }
};
