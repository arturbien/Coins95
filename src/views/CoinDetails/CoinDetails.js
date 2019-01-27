import React, { Component } from "react";
// import PropTypes from "prop-types";
import "./CoinDetails.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import API from "../../API";
import { fetchCoinsList, fetchCoinsData } from "../../store/actions/coins";

// import { fetchCoinsData } from "../../store/actions/coins";

import Frame from "../../components/Frame/Frame";
import Loader from "../../components/Loader/Loader";

function HLCAverage(high, low, close) {
  return (high + low + close) / 3;
}

export class CoinDetails extends Component {
  // static propTypes = {
  // prop: PropTypes
  // };

  state = {
    data: null,
    loading: true
  };

  componentDidMount = async () => {
    const coin = this.props.match.params.coin;
    try {
      if (!this.props.coinsInfo) {
        await this.props.fetchCoinsList();
      }
      if (!this.props.coinsData) {
        await this.props.fetchCoinsData(
          this.props.userCoinsList,
          this.props.currency
        );
      }
      const data = await API.fetchHistoricalData(coin);
      data.forEach(dataPoint => {
        dataPoint["HLCAverage"] = HLCAverage(
          dataPoint.high,
          dataPoint.low,
          dataPoint.close
        );
      });

      console.log(data);
      this.setState({ data, loading: false });
    } catch (error) {
      console.log("Error in CoinDetails fetchHistoricalData");
      this.setState({ loading: false });
    }
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    const { coinsInfo } = this.props;
    console.log(this.props);
    const coin = this.props.match.params.coin;
    const { coinName } = coinsInfo[coin];
    const baseClass = "CoinDetails";
    return (
      <section className={baseClass}>
        <Frame title={coinName}>
          <mark>swag</mark>
          <div className="test" />
        </Frame>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  userCoinsList: state.user.coinsList,

  currency: state.user.currency,
  coinsInfo: state.coins.coinsInfo,
  coinsData: state.coins.coinsData
});

const mapDispatchToProps = dispatch => ({
  fetchCoinsList: () => dispatch(fetchCoinsList()),
  fetchCoinsData: (coinsList, currency) =>
    dispatch(fetchCoinsData(coinsList, currency))
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CoinDetails)
);
