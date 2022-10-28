import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_ERROR,
} from "./actionConstants";
import { AppThunk } from "..";
import { News } from "../reducers/news";
import API from "../../API";

export const setNews = (news: News, extend: boolean) =>
  ({
    type: FETCH_NEWS_SUCCESS,
    payload: {
      news,
      extend,
    },
  } as const);

export const fetchNews =
  (timestamp?: number): AppThunk =>
  async (dispatch) => {
    dispatch({ type: FETCH_NEWS_REQUEST });
    try {
      const news = await API.fetchNews({ timestamp });
      dispatch(setNews(news, timestamp ? true : false));
    } catch (error) {
      dispatch({ type: FETCH_NEWS_ERROR });
    }
  };
