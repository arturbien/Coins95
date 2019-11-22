import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchCoinsInfo, fetchCoinsData } from "../../store/actions/coins";

import Layout from "./Layout";

const Dashboard = ({
  topList,
  userCoinsList,
  coinsData,
  info,
  fetchCoinsInfo,
  fetchCoinsData
}) => {
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (!topList) {
      fetchCoinsInfo();
    } else {
      fetchCoinsData();
    }
  }, [info, fetchCoinsInfo, topList, fetchCoinsData]);

  let data;
  if (!info || !coinsData) {
    data = null;
  } else {
    data = (showFollowing ? userCoinsList : topList).map(coin => ({
      ...info[coin],
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
  topList: state.coins.top,
  currency: state.user.currency,
  info: state.coins.info,
  coinsData: state.coins.coinsData,
  needsUpdate: state.coins.needsUpdate
});

const mapDispatchToProps = dispatch => ({
  fetchCoinsInfo: () => dispatch(fetchCoinsInfo()),
  fetchCoinsData: () => dispatch(fetchCoinsData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
