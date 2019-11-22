import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

import API from "../../API";
import { fetchCoinsInfo } from "../../store/actions/coins";
import { setFollowedCoin } from "../../store/actions/user";
import Layout from "./Layout";

function HLCAverage(high, low, close) {
  return (high + low + close) / 3;
}
export class CoinDetails extends Component {
  // TO PREVENT UPDATES ON UNMOUNTED COMPONENT
  _isMounted = false;
  state = {
    data: null,
    historicalData: null,
    dataLoading: false,
    timeSpan: "24H"
  };
  componentDidMount = async () => {
    let { timeSpan } = this.state;
    const { info, fetchCoinsInfo, currency } = this.props;

    this._isMounted = true;
    if (!info) {
      await fetchCoinsInfo();
    }

    // let data = await API.fetchCoinsData([coin], currency);
    this.handleFetchCoinsData(currency);
    this.handleFetchHistoricalData(timeSpan, currency);
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleFetchCoinsData = async () => {
    const { coin, currency } = this.props;
    let data = await API.fetchCoinsData([coin], currency, true);
    data = data[coin];
    if (this._isMounted) this.setState({ data });
  };
  handleFetchHistoricalData = async timeSpan => {
    const { timeSpan: currentTimeSpan, dataLoading } = this.state;
    const { coin, currency } = this.props;

    if (dataLoading) return;
    this.setState({ timeSpan, dataLoading: true });
    // for optimistic update
    try {
      const historicalData = await API.fetchCoinsHistoricalData(
        coin,
        timeSpan,
        currency
      );
      historicalData.forEach(historicalDataPoint => {
        historicalDataPoint["HLCAverage"] = HLCAverage(
          historicalDataPoint.high,
          historicalDataPoint.low,
          historicalDataPoint.close
        );
      });

      if (this._isMounted)
        this.setState({ dataLoading: false, historicalData, timeSpan });
    } catch (error) {
      console.log("Error in CoinDetails handleFetchHistoricalData ");
      if (this._isMounted)
        this.setState({
          dataLoading: false,
          timeSpan: currentTimeSpan
        });
    }
  };

  render() {
    const { data, historicalData, timeSpan } = this.state;
    const { following, currency, info, setFollowedCoin, inWallet } = this.props;
    return (
      <Layout
        info={info}
        data={data}
        currency={currency}
        historicalData={historicalData}
        following={following}
        inWallet={inWallet}
        timeSpan={timeSpan}
        onTimeSpanChange={this.handleFetchHistoricalData}
        onFollow={() => setFollowedCoin(info.symbol, !following)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const coin = ownProps.match.params.coin;
  const following = state.user.followed.includes(coin);
  const inWallet = state.user.wallet[coin] ? true : false;
  const info = state.coins.info ? state.coins.info[coin] : null;
  const currency = state.user.currency;
  return {
    coin,
    following,
    inWallet,
    currency,
    info
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCoinsInfo: () => dispatch(fetchCoinsInfo()),
  setFollowedCoin: (coin, follow) => dispatch(setFollowedCoin(coin, follow))
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinDetails);
