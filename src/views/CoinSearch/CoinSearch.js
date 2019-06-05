import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCoinsList } from "../../store/actions/coins";
import { setUserCoin } from "../../store/actions/user";

import Layout from "./Layout";

export class CoinSearch extends Component {
  static propTypes = {
    data: propTypes.array,
    fetchCoinsList: propTypes.func
  };
  componentDidMount = async () => {
    // first fetch coins list and info
    const { coinsList, fetchCoinsList } = this.props;

    if (!coinsList) {
      fetchCoinsList();
    }
  };
  render() {
    const { data, setUserCoin } = this.props;
    return <Layout data={data} onFollow={setUserCoin} />;
  }
}

const mapStateToProps = state => ({
  data: state.coins.coinsList
    ? state.coins.coinsList.map(coin => {
        const coinData = state.coins.coinsInfo[coin];
        coinData.isFollowed = state.user.coinsList.includes(coin);
        coinData.sortOrder = parseInt(coinData.sortOrder);
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
