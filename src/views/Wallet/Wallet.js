import React, { Component, useEffect } from "react";
// import propTypes from "prop-types";
import { connect } from "react-redux";

import { fetchCoinsList, fetchCoinsData } from "../../store/actions/coins";

import Layout from "./Layout";

const Wallet = ({
  topCoinsList,
  userCoinsList,
  walletCoinsList,
  wallet,
  coinsData,
  coinsInfo,
  currency,
  fetchCoinsList,
  needsUpdate,
  fetchCoinsData
}) => {
  useEffect(() => {
    if (!topCoinsList) {
      fetchCoinsList();
    } else if (!coinsData || needsUpdate) {
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
    data = walletCoinsList
      .sort((a, b) => wallet[a].order - wallet[b].order)
      .map(coin => ({
        ...coinsInfo[coin],
        ...coinsData[coin],
        _amount: wallet[coin].amount,
        _order: wallet[coin].order
      }));
  }

  return <Layout data={data} currency={currency} />;
};

const mapStateToProps = state => ({
  userCoinsList: state.user.coinsList,
  wallet: state.user.wallet,
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
  fetchCoinsData: (coinsList, currency, extend) =>
    dispatch(fetchCoinsData(coinsList, currency, extend))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);
