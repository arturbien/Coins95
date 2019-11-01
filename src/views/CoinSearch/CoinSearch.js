import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchCoinsList } from "../../store/actions/coins";
import { setUserCoin } from "../../store/actions/user";

import Layout from "./Layout";

const CoinSearch = ({ data, fetchCoinsList, setUserCoin }) => {
  useEffect(() => {
    if (!data) {
      fetchCoinsList();
    }
  }, [data, fetchCoinsList]);
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
  fetchCoinsList: () => dispatch(fetchCoinsList()),
  setUserCoin: (coin, follow) => dispatch(setUserCoin(coin, follow))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinSearch);
