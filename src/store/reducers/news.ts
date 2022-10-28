import { FETCH_NEWS_SUCCESS } from "../actions/actionConstants";
import { ActionTypes } from "../actions/actionTypes";

export type NewsItem = {
  body: string;
  categories: string;
  downvotes: string;
  guid: string;
  id: string;
  imageurl: string;
  lang: string;
  published_on: number;
  source: string;
  source_info: {
    name: string;
    lang: string;
    img: string;
  };
  tags: string;
  title: string;
  upvotes: string;
  url: string;
};

export type News = NewsItem[];

// TODO: suggestions for initial state show type of null ?!
type NewsState = News | null;
const initialState: NewsState = null;

const newsReducer = (state: NewsState = initialState, action: ActionTypes) => {
  switch (action.type) {
    case FETCH_NEWS_SUCCESS:
      let news;
      const newNews = action.payload.news;
      if (action.payload.extend) {
        let uniqueIDs: NewsItem["id"][] = [];

        news = [...(state || []), ...newNews];
        news = news.filter((n) => {
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

export default newsReducer;
