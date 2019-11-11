import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchCoinsList, fetchCoinsData } from "../../store/actions/coins";

import Layout from "./Layout";
const Dashboard = ({
  topCoinsList,
  userCoinsList,
  walletCoinsList,
  coinsData,
  coinsInfo,
  currency,
  fetchCoinsList,
  needsUpdate,
  fetchCoinsData
}) => {
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (!topCoinsList) {
      fetchCoinsList();
    } else {
      fetchCoinsData(
        [
          ...new Set([
            ...userCoinsList,
            ...(topCoinsList || []),
            ...(walletCoinsList || [])
          ])
        ],
        currency
      );
    }
  }, [coinsInfo]);

  let data;
  if (!coinsInfo || !coinsData) {
    data = null;
  } else {
    data = (showFollowing ? userCoinsList : topCoinsList).map(coin => ({
      ...coinsInfo[coin],
      ...coinsData[coin]
    }));
  }
  return (
    <Layout
      data={data}
      showingFollowing={showFollowing}
      showFollowing={() => setShowFollowing(true)}
      showTop={() => setShowFollowing(false)}
    />
  );
};

const mapStateToProps = state => ({
  userCoinsList: state.user.coinsList,
  walletCoinsList: Object.keys(state.user.wallet),
  topCoinsList: state.coins.coinsList
    ? [...state.coins.coinsList].splice(0, 30)
    : null,
  currency: state.user.currency,
  coinsInfo: state.coins.coinsInfo,
  coinsData: state.coins.coinsData,
  needsUpdate: state.coins.needsUpdate
});

const mapDispatchToProps = dispatch => ({
  fetchCoinsList: () => dispatch(fetchCoinsList()),
  fetchCoinsData: (coinsList, currency) =>
    dispatch(fetchCoinsData(coinsList, currency))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
