import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchCoinsInfo } from "../../store/actions/coins";
import { setFollowedCoin } from "../../store/actions/user";

import Layout from "./Layout";

const CoinSearch = ({ data, fetchCoinsInfo, setFollowedCoin }) => {
  useEffect(() => {
    if (!data) {
      fetchCoinsInfo();
    }
  }, [data, fetchCoinsInfo]);
  return <Layout data={data} onFollow={setFollowedCoin} />;
};

const mapStateToProps = state => ({
  data: state.coins.info
    ? Object.keys(state.coins.info).map(coin => {
        const coinData = { ...state.coins.info[coin] };
        coinData.isFollowed = state.user.followed.includes(coin);
        return coinData;
      })
    : null
});
const mapDispatchToProps = dispatch => ({
  fetchCoinsInfo: () => dispatch(fetchCoinsInfo()),
  setFollowedCoin: (coin, follow) => dispatch(setFollowedCoin(coin, follow))
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinSearch);
