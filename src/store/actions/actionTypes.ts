import * as userActionCreators from "./user";
import { setEvents, setEventSeen } from "./events";
import { setCoinInfo, setCoinsData } from "./coins";
import { setNews } from "./news";

const eventActionCreators = { setEvents, setEventSeen };
const coinsActionCreators = { setCoinInfo, setCoinsData };
const newsActionCreators = { setNews };

const allActionCreators = {
  ...userActionCreators,
  ...eventActionCreators,
  ...coinsActionCreators,
  ...newsActionCreators,
};

export type ActionTypes = ReturnType<
  typeof allActionCreators[keyof typeof allActionCreators]
>;
