import React, { Component } from "react";
import propTypes from "prop-types";

import { connect } from "react-redux";
import { fetchCoinsList, fetchCoinsData } from "../../store/actions/coins";

import Layout from "./Layout";
export class Dashboard extends Component {
  static propTypes = {
    topCoinsList: propTypes.array,
    userCoinsList: propTypes.array,
    coinsInfo: propTypes.object,
    coinsData: propTypes.object,
    currency: propTypes.string,
    fetchCoinsList: propTypes.func,
    fetchCoinsData: propTypes.func
  };

  state = {
    showingFollowing: false
  };

  componentDidMount = async () => {
    // first fetch coins list and info
    const {
      topCoinsList,
      userCoinsList,
      walletCoinsList,
      coinsData,
      currency,
      fetchCoinsList,
      needsUpdate,
      fetchCoinsData
    } = this.props;

    if (!topCoinsList) {
      fetchCoinsList();
      // case when user laods app on /coins/BTC and presses X to go to dashboard
      // or user follows new coins in /search, we have to get data for the new coins
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
  switchView = showFollowing => {
    const { history } = this.props;
    // keeping view state in URL
    history.push(
      `${history.location.pathname}#${showFollowing ? "following" : "top"}`
    );
  };
  render() {
    const {
      userCoinsList,
      topCoinsList,
      coinsData,
      coinsInfo,
      history
    } = this.props;
    const showingFollowing = history.location.hash === "#following";

    let data;
    if (!coinsInfo || !coinsData) {
      data = null;
    } else {
      data = (showingFollowing ? userCoinsList : topCoinsList).map(coin => ({
        ...coinsInfo[coin],
        ...coinsData[coin]
      }));
    }
    return (
      <Layout
        data={data}
        showingFollowing={showingFollowing}
        showFollowing={() => this.switchView(true)}
        showTop={() => this.switchView(false)}
      />
    );
  }
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
