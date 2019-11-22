import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchCoinsInfo, fetchCoinsData } from "../../store/actions/coins";

import Layout from "./Layout";

const Dashboard = ({
  topList,
  followed,
  coinsData,
  info,
  fetchCoinsInfo,
  fetchCoinsData
}) => {
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (!info) {
      fetchCoinsInfo();
    } else {
      fetchCoinsData();
    }
  }, [info, fetchCoinsInfo, topList, fetchCoinsData]);

  let data;
  if (!info || !coinsData) {
    data = null;
  } else {
    data = (showFollowing ? followed : topList).map(coin => ({
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
  followed: state.user.followed,
  walletCoinsList: Object.keys(state.user.wallet),
  topList: state.coins.top,
  currency: state.user.currency,
  info: state.coins.info,
  coinsData: state.coins.coinsData
});

const mapDispatchToProps = dispatch => ({
  fetchCoinsInfo: () => dispatch(fetchCoinsInfo()),
  fetchCoinsData: () => dispatch(fetchCoinsData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
