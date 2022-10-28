import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AppDispatch, AppState } from "../../store";
import { fetchCoinsInfo } from "../../store/actions/coins";
import { setFollowedCoin } from "../../store/actions/user";

import Layout from "./Layout";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const CoinSearch = ({ data, fetchCoinsInfo, setFollowedCoin }: Props) => {
  useEffect(() => {
    if (!data) {
      fetchCoinsInfo();
    }
  }, [data, fetchCoinsInfo]);
  return <Layout data={data} onFollow={setFollowedCoin} />;
};

const mapStateToProps = (state: AppState) => {
  if (state.coins.info === null) {
    return {
      data: null,
    };
  } else {
    let info = state.coins.info;
    return {
      data: Object.keys(state.coins.info).map((coin) => {
        const coinData = {
          ...info[coin],
          isFollowed: state.user.followed.includes(coin),
        };
        return coinData;
      }),
    };
  }
};
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  // TODO: is there a better way to silence TS with something other than <any>?
  fetchCoinsInfo: () => dispatch<any>(fetchCoinsInfo()),
  // TODO: extract 'coin' and 'follow' types from 'setFollowedCoin' arguments
  setFollowedCoin: (coin: string, follow: boolean) =>
    dispatch(setFollowedCoin(coin, follow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinSearch);
