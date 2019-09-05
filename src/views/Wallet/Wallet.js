import React, { Component } from "react";
// import propTypes from "prop-types";
import { connect } from "react-redux";

import { fetchCoinsList, fetchCoinsData } from "../../store/actions/coins";

import Layout from "./Layout";

export class Wallet extends Component {
  // static propTypes = {
  //   prop: propTypes
  // }
  componentDidMount = async () => {
    // first fetch coins list and info
    const {
      topCoinsList,
      userCoinsList,
      wallet,
      coinsData,
      currency,
      fetchCoinsList,
      needsUpdate,
      fetchCoinsData
    } = this.props;
    //same logic as in Dashboard. fix it soon 😂
    if (!topCoinsList) {
      fetchCoinsList();
    } else if (!coinsData || needsUpdate) {
      fetchCoinsData(
        [
          ...new Set([
            ...userCoinsList,
            ...(topCoinsList || []),
            ...(Object.keys(wallet) || []),
            "ACOIN"
          ])
        ],
        currency
      );
    }
  };
  componentDidUpdate(prevProps, prevState) {
    // then if we already have topCoinsList, we need to
    // fetch data for both top coins and user coins
    const {
      topCoinsList,
      userCoinsList,
      walletCoinsList,
      coinsData,
      currency,
      fetchCoinsData
    } = this.props;
    // case when app is loaded in /coins
    if (coinsData === null && prevProps.topCoinsList === null) {
      // new Set() for removing duplicates
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
  }
  render() {
    const { wallet, coinsData, currency, coinsInfo } = this.props;

    let data;
    if (!coinsInfo || !coinsData) {
      data = null;
    } else {
      data = Object.keys(wallet)
        .sort((a, b) => wallet[a].order - wallet[b].order)
        .map(coin => ({
          ...coinsInfo[coin],
          ...coinsData[coin],
          _amount: wallet[coin].amount,
          _order: wallet[coin].order
        }));
    }

    return <Layout data={data} currency={currency} />;
  }
}

const mapStateToProps = state => ({
  userCoinsList: state.user.coinsList,
  wallet: state.user.wallet,
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
