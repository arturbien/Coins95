import React, { Component } from "react";
// import PropTypes from "prop-types";
import "./CoinDetails.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { Link } from "react-router-dom";

import API from "../../API";
import {
  fetchCoinsList,
  fetchCoinsData,
  fetchCoinsHistoricalData
} from "../../store/actions/coins";

import SimpleLineChart from "./SimpleLineChart/SimpleLineChart";

import CenteredLoader from "../../components/CenteredLoader/CenteredLoader";

import styled from "styled-components";
import {
  Cutout,
  Fieldset,
  Toolbar,
  Button,
  WindowHeader,
  Window,
  WindowContent,
  Select,
  Checkbox
} from "react95";
function HLCAverage(high, low, close) {
  return (high + low + close) / 3;
}

const SWindow = styled(Window)`
  width: 100%;
  height: 100%;
  display: flex !important;
  flex-direction: column;
`;
const SWindowHeader = styled(WindowHeader)`
  flex-shrink: 0;
`;
const SWindowContent = styled(WindowContent)`
  flex: 1;
`;
const TopToolbar = styled(Toolbar)`
  justify-content: space-between;
  padding: 0;
  margin-bottom: 0.5em;
`;
const ChartWrapper = styled(Cutout)`
  position: relative;
  width: 100%;
  flex: 1;
  background: teal;
  background: radial-gradient(#1d8a99, teal);
  padding: 1em;
`;
const PeriodButtonsWrapper = styled(Toolbar)`
  padding: 0;
  margin-bottom: 1.5em;
  margin-top: 0.5em;
`;
export class CoinDetails extends Component {
  // static propTypes = {
  // prop: PropTypes
  // };
  _isMounted = false;
  state = {
    coin: this.props.match.params.coin,
    data: null,
    dataLoading: false,
    infoLoading: true,
    timeSpan: "24H"
  };
  componentDidMount = async () => {
    this._isMounted = true;
    const { timeSpan } = this.state;
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
      this.handleFetchHistoricalData(timeSpan);
      if (this._isMounted) this.setState({ infoLoading: false });
    } catch (error) {
      console.log("Error in CoinDetails componentDidMount");
      if (this._isMounted) this.setState({ infoLoading: false });
    }
  };
  componentWillUnmount() {
    this._isMounted = false;
  }

  async handleFetchHistoricalData(timeSpan) {
    if (this.state.dataLoading) return;
    this.setState({ timeSpan, dataLoading: true });
    // for optimistic update
    const previousTimespan = this.state.timeSpan;
    const coin = this.state.coin;
    try {
      const data = await API.fetchCoinsHistoricalData(coin, timeSpan);
      data.forEach(dataPoint => {
        dataPoint["HLCAverage"] = HLCAverage(
          dataPoint.high,
          dataPoint.low,
          dataPoint.close
        );
      });

      if (this._isMounted)
        this.setState({ dataLoading: false, data, timeSpan });
    } catch (error) {
      console.log("Error in CoinDetails handleFetchHistoricalData ");
      if (this._isMounted)
        this.setState({
          dataLoading: false,
          timeSpan: previousTimespan
        });
    }
  }
  render() {
    const baseClass = "CoinDetails";
    const { data, dataLoading, infoLoading, timeSpan } = this.state;
    const { coinInfo, coinData } = this.props;

    let coinName, symbol, sortOrder, HIGH24HOUR, LOW24HOUR, MKTCAP, imageURL;
    coinName = symbol = sortOrder = HIGH24HOUR = LOW24HOUR = MKTCAP = "-";
    if (coinInfo && coinData) {
      coinName = coinInfo.coinName;
      symbol = coinInfo.symbol;
      sortOrder = coinInfo.sortOrder;
      HIGH24HOUR = coinData.HIGH24HOUR.toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR"
      });
      LOW24HOUR = coinData.LOW24HOUR.toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR"
      });
      MKTCAP = coinData.MKTCAP.toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR"
      });
      imageURL = coinInfo.imageURL;
      console.log(coinInfo);
    }
    return (
      <SWindow>
        <SWindowHeader>
          {/* <img src={imageURL} className={`${baseClass}-SwindowHeader__icon`} /> */}
          {`${coinName}.${symbol.toLocaleLowerCase()}`}
          <Button
            square
            size="sm"
            style={{
              position: "absolute",
              right: 4,
              top: 7,
              fontWeight: "bold"
            }}
            onClick={() => this.props.history.goBack()}
          >
            X
          </Button>
        </SWindowHeader>
        <SWindowContent>
          <section className={baseClass}>
            <div className={`${baseClass}-layout`}>
              <TopToolbar>
                <Checkbox
                  name="follow"
                  label="Follow"
                  value={true}
                  onChange={e => console.log(e.target.value)}
                />

                <Select
                  width={85}
                  onSelect={value => console.log(value)}
                  items={[
                    { value: 1, label: "EUR" },
                    { value: 2, label: "USD" },
                    { value: 3, label: "PLN" }
                  ]}
                />
              </TopToolbar>

              <ChartWrapper>
                {data && (
                  <SimpleLineChart
                    data={data.map((dataPoint, i) => ({
                      name: i,
                      AVG: dataPoint.HLCAverage,
                      HIGH: dataPoint.high,
                      LOW: dataPoint.low
                    }))}
                  />
                )}
                {(dataLoading || !data) && <CenteredLoader />}
              </ChartWrapper>
              <PeriodButtonsWrapper>
                <Button
                  size="sm"
                  onClick={() => this.handleFetchHistoricalData("1H")}
                  active={timeSpan === "1H"}
                  fullWidth
                >
                  1H
                </Button>
                <Button
                  size="sm"
                  onClick={() => this.handleFetchHistoricalData("24H")}
                  active={timeSpan === "24H"}
                  fullWidth
                >
                  24H
                </Button>
                <Button
                  size="sm"
                  onClick={() => this.handleFetchHistoricalData("1M")}
                  active={timeSpan === "1M"}
                  fullWidth
                >
                  1M
                </Button>
                <Button
                  size="sm"
                  onClick={() => this.handleFetchHistoricalData("3M")}
                  active={timeSpan === "3M"}
                  fullWidth
                >
                  3M
                </Button>
                <Button
                  size="sm"
                  onClick={() => this.handleFetchHistoricalData("1Y")}
                  active={timeSpan === "1Y"}
                  fullWidth
                >
                  1Y
                </Button>
              </PeriodButtonsWrapper>
              <Fieldset
                label={"Coin information"}
                className={`${baseClass}-frame`}
              >
                <div className={`${baseClass}-details`}>
                  <div className={`${baseClass}-details-row`}>
                    <span className={`${baseClass}-details__title`}>Rank:</span>
                    <span className={`${baseClass}-details__value`}>
                      {infoLoading ? "-" : sortOrder}
                    </span>
                  </div>
                  <div className={`${baseClass}-details-row`}>
                    <span className={`${baseClass}-details__title`}>
                      High (24h):
                    </span>
                    <span className={`${baseClass}-details__value`}>
                      {HIGH24HOUR}
                    </span>
                  </div>
                  <div className={`${baseClass}-details-row`}>
                    <span className={`${baseClass}-details__title`}>
                      Low (24h):
                    </span>
                    <span className={`${baseClass}-details__value`}>
                      {LOW24HOUR}
                    </span>
                  </div>
                  <div className={`${baseClass}-details-row`}>
                    <span className={`${baseClass}-details__title`}>
                      Total market cap:
                    </span>
                    <span className={`${baseClass}-details__value`}>
                      {MKTCAP}
                    </span>
                  </div>
                </div>
              </Fieldset>
            </div>
          </section>
        </SWindowContent>
      </SWindow>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const coin = ownProps.match.params.coin;
  const coinInfo = state.coins.coinsInfo ? state.coins.coinsInfo[coin] : null;
  const coinData = state.coins.coinsData ? state.coins.coinsData[coin] : null;

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
    dispatch(fetchCoinsData(coinsList, currency)),
  fetchCoinsHistoricalData: (coin, timeSpan) =>
    dispatch(fetchCoinsHistoricalData(coin, timeSpan))
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CoinDetails)
);
