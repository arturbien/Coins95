import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchCoinsInfo, fetchCoinsData } from "../../store/actions/coins";
import { sortUserHoldings } from "../../store/actions/user";

import Layout from "./Layout";

const Wallet = ({
  wallet,
  coinsData,
  info,
  currency,
  fetchCoinsInfo,
  fetchCoinsData,
  sortUserHoldings
}) => {
  // TODO fix missing dependencies issue
  useEffect(() => {
    if (!info) {
      fetchCoinsInfo();
    } else {
      fetchCoinsData();
    }
  }, [info, wallet, currency]);

  let data;
  if (!info || !coinsData) {
    data = null;
  } else {
    data = Object.keys(wallet)
      .sort((a, b) => wallet[a].order - wallet[b].order)
      .map(coin => ({
        ...info[coin],
        ...coinsData[coin],
        _amount: wallet[coin].amount,
        _order: wallet[coin].order
      }));
  }

  return (
    <Layout
      data={data}
      currency={currency}
      sortUserHoldings={sortUserHoldings}
    />
  );
};

const mapStateToProps = state => ({
  wallet: state.user.wallet,
  currency: state.user.currency,
  info: state.coins.info,
  coinsData: state.coins.coinsData
});

const mapDispatchToProps = dispatch => ({
  fetchCoinsInfo: () => dispatch(fetchCoinsInfo()),
  fetchCoinsData: () => dispatch(fetchCoinsData()),
  sortUserHoldings: coinsList => dispatch(sortUserHoldings(coinsList))
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
