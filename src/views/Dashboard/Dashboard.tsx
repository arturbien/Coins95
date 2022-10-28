import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, AppState } from "../../store";
import { fetchCoinsData, fetchCoinsInfo } from "../../store/actions/coins";
import { CoinsData, CoinsInfo } from "../../store/reducers/coins";

import Layout from "./Layout";

type PropsFromRedux = ConnectedProps<typeof connector>;

const Dashboard = ({
  topList,
  followed,
  coinsData,
  info,
  fetchCoinsInfo,
  fetchCoinsData,
}: PropsFromRedux) => {
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (!info) {
      fetchCoinsInfo();
    } else {
      fetchCoinsData();
    }
  }, [info, fetchCoinsInfo, topList, fetchCoinsData]);

  let data: (CoinsInfo[string] & CoinsData[string])[] | null;
  if (!info || !coinsData) {
    data = null;
  } else {
    data = (showFollowing ? followed : topList || []).map((coin) => ({
      ...info[coin],
      ...coinsData[coin],
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

const mapStateToProps = (state: AppState) => ({
  followed: state.user.followed,
  walletCoinsList: Object.keys(state.user.wallet),
  topList: state.coins.top,
  currency: state.user.currency,
  info: state.coins.info,
  coinsData: state.coins.coinsData,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchCoinsInfo: () => dispatch(fetchCoinsInfo()),
  fetchCoinsData: () => dispatch(fetchCoinsData()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Dashboard);
