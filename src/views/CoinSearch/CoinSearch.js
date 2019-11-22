import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchCoinsInfo } from "../../store/actions/coins";
import { setUserCoin } from "../../store/actions/user";

import Layout from "./Layout";

const CoinSearch = ({ data, fetchCoinsInfo, setUserCoin }) => {
  useEffect(() => {
    if (!data) {
      fetchCoinsInfo();
    }
  }, [data, fetchCoinsInfo]);
  return <Layout data={data} onFollow={setUserCoin} />;
};

const mapStateToProps = state => ({
  data: state.coins.coinsList
    ? state.coins.coinsList.map(coin => {
        const coinData = { ...state.coins.coinsInfo[coin] };
        coinData.isFollowed = state.user.coinsList.includes(coin);
        return coinData;
      })
    : null
});
const mapDispatchToProps = dispatch => ({
  fetchCoinsInfo: () => dispatch(fetchCoinsInfo()),
  setUserCoin: (coin, follow) => dispatch(setUserCoin(coin, follow))
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinSearch);
