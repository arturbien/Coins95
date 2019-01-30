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
import Divider from "../../components/Divider/Divider";
import Button from "../../components/Button/Button";

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
      if (!this.props.coinInfo) {
        await this.props.fetchCoinsList();
      }
      if (!this.props.coinData) {
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
    const { coinInfo, coinData } = this.props;
    console.log(this.props);
    const { coinName, sortOrder } = coinInfo;
    const { HIGH24HOUR, LOW24HOUR, MKTCAP } = coinData;
    const baseClass = "CoinDetails";
    return (
      <section className={baseClass}>
        <div className={`${baseClass}-layout`}>
          <div className="window" />
          <div className="btns">
            <Button fullWidth>1H</Button>
            <Button fullWidth>24H</Button>
            <Button fullWidth>1M</Button>
            <Button fullWidth>3M</Button>
            <Button fullWidth>1Y</Button>
          </div>
          <Frame title={"Coin information"} className={`${baseClass}-frame`}>
            <div className={`${baseClass}-details`}>
              <div className={`${baseClass}-details-row`}>
                <span className={`${baseClass}-details__title`}>Rank:</span>
                <span className={`${baseClass}-details__value`}>
                  {sortOrder}
                </span>
              </div>
              <div className={`${baseClass}-details-row`}>
                <span className={`${baseClass}-details__title`}>
                  High (24h):
                </span>
                <span className={`${baseClass}-details__value`}>
                  {HIGH24HOUR.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR"
                  })}
                </span>
              </div>
              <div className={`${baseClass}-details-row`}>
                <span className={`${baseClass}-details__title`}>
                  Low (24h):
                </span>
                <span className={`${baseClass}-details__value`}>
                  {LOW24HOUR.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR"
                  })}
                </span>
              </div>
              <div className={`${baseClass}-details-row`}>
                <span className={`${baseClass}-details__title`}>
                  Total market cap:
                </span>
                <span className={`${baseClass}-details__value`}>
                  {MKTCAP.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR"
                  })}
                </span>
              </div>
            </div>
          </Frame>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const coin = ownProps.match.params.coin;
  const coinInfo = state.coins.coinsInfo ? state.coins.coinsInfo[coin] : null;
  const coinData = state.coins.coinsData ? state.coins.coinsData[coin] : null;
  console.log(coin);

  return {
    userCoinsList: state.user.coinsList,
    currency: state.user.currency,
    coinInfo,
    coinData
  };
};

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
