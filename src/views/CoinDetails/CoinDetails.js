import React, { Component } from "react";
// import PropTypes from "prop-types";
import "./CoinDetails.css";
import { connect } from "react-redux";

import API from "../../API";
import { fetchCoinsList } from "../../store/actions/coins";

import { setUserCoin } from "../../store/actions/user";
import CoinDetailsLayout from "./CoinDetailsLayout/CoinDetailsLayout";

function HLCAverage(high, low, close) {
  return (high + low + close) / 3;
}
export class CoinDetails extends Component {
  // static propTypes = {
  // prop: PropTypes
  // };
  // TO PREVENT UPDATES ON UNMOUNTED COMPONENT
  _isMounted = false;
  state = {
    coin: this.props.match.params.coin,
    data: null,
    historicalData: null,
    dataLoading: false,
    infoLoading: true,
    timeSpan: "24H"
  };
  componentDidMount = async () => {
    this._isMounted = true;
    let { coin, data, timeSpan } = this.state;
    try {
      if (!this.props.coinInfo) {
        await this.props.fetchCoinsList();
      }

      data = await API.fetchCoinsData([coin], this.props.currency);
      data = data[coin];
      this.handleFetchHistoricalData(timeSpan);
      if (this._isMounted) this.setState({ infoLoading: false, data });
    } catch (error) {
      console.log("Error in CoinDetails componentDidMount");
      if (this._isMounted) this.setState({ infoLoading: false });
    }
  };
  componentWillUnmount() {
    this._isMounted = false;
  }

  handleFetchHistoricalData = async timeSpan => {
    if (this.state.dataLoading) return;
    this.setState({ timeSpan, dataLoading: true });
    // for optimistic update
    const previousTimespan = this.state.timeSpan;
    const coin = this.state.coin;
    try {
      const historicalData = await API.fetchCoinsHistoricalData(coin, timeSpan);
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
          timeSpan: previousTimespan
        });
    }
  };
  render() {
    const { data, historicalData, timeSpan } = this.state;
    const { coin, following, coinInfo, setUserCoin } = this.props;

    return (
      <CoinDetailsLayout
        coinInfo={coinInfo}
        data={data}
        historicalData={historicalData}
        following={following}
        timeSpan={timeSpan}
        onTimeSpanChange={this.handleFetchHistoricalData}
        onFollow={() => setUserCoin(coin, !following)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const coin = ownProps.match.params.coin;
  const following = state.user.coinsList.includes(coin);
  const coinInfo = state.coins.coinsInfo ? state.coins.coinsInfo[coin] : null;

  return {
    coin,
    following,
    userCoinsList: state.user.coinsList,
    currency: state.user.currency,
    coinInfo
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCoinsList: () => dispatch(fetchCoinsList()),
  setUserCoin: (coin, follow) => dispatch(setUserCoin(coin, follow))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinDetails);
