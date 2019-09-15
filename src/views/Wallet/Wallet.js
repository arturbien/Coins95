import React, { Component, useEffect } from "react";
// import propTypes from "prop-types";
import { connect } from "react-redux";

import { fetchCoinsList, fetchCoinsData } from "../../store/actions/coins";
import { sortUserHoldings } from "../../store/actions/user";

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
  fetchCoinsData,
  sortUserHoldings
}) => {
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
  }, [coinsInfo, wallet]);

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

  return (
    <Layout
      data={data}
      currency={currency}
      sortUserHoldings={sortUserHoldings}
    />
  );
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
    dispatch(fetchCoinsData(coinsList, currency, extend)),
  sortUserHoldings: coinsList => dispatch(sortUserHoldings(coinsList))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);
