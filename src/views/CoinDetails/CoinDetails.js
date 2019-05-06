import React, { Component } from "react";
// import PropTypes from "prop-types";
import "./CoinDetails.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { Link } from "react-router-dom";

import API from "../../API";
import { fetchCoinsList } from "../../store/actions/coins";

import { setUserCoin } from "../../store/actions/user";
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

  async handleFetchHistoricalData(timeSpan) {
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
  }
  render() {
    const baseClass = "CoinDetails";
    const {
      data,
      historicalData,
      dataLoading,
      infoLoading,
      timeSpan
    } = this.state;
    const { coin, following, coinInfo, setUserCoin } = this.props;
    let coinName, symbol, sortOrder, HIGH24HOUR, LOW24HOUR, MKTCAP, imageURL;
    coinName = symbol = sortOrder = HIGH24HOUR = LOW24HOUR = MKTCAP = "-";
    if (coinInfo && data) {
      console.log(this.props);
      coinName = coinInfo.coinName;
      symbol = coinInfo.symbol;
      sortOrder = coinInfo.sortOrder;
      HIGH24HOUR = data.HIGH24HOUR.toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR"
      });
      LOW24HOUR = data.LOW24HOUR.toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR"
      });
      MKTCAP = data.MKTCAP.toLocaleString("de-DE", {
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
              right: "0.5rem",
              top: 7,
              fontWeight: "bold"
            }}
            onClick={() => this.props.history.goBack()}
          >
            X
          </Button>
        </SWindowHeader>
        <SWindowContent>
          <TopToolbar>
            <Checkbox
              name="follow"
              label="Follow"
              value={true}
              checked={following}
              onChange={() => setUserCoin(coin, !following)}
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
            {historicalData && (
              <SimpleLineChart
                data={historicalData.map((historicalDataPoint, i) => ({
                  name: i,
                  AVG: historicalDataPoint.HLCAverage,
                  HIGH: historicalDataPoint.high,
                  LOW: historicalDataPoint.low
                }))}
              />
            )}
            {(dataLoading || !historicalData) && <CenteredLoader />}
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
          <Fieldset label={"Coin information"}>
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
                <span className={`${baseClass}-details__value`}>{MKTCAP}</span>
              </div>
            </div>
          </Fieldset>
        </SWindowContent>
      </SWindow>
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
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CoinDetails)
);

let SWindow = styled(Window)`
  width: 100%;
  height: 100%;
  display: flex !important;
  flex-direction: column;
`;
let SWindowHeader = styled(WindowHeader)`
  flex-shrink: 0;
`;
let SWindowContent = styled(WindowContent)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding-top: 0.5rem;
`;
let TopToolbar = styled(Toolbar)`
  justify-content: space-between;
  padding: 0;
  margin-bottom: 0.5em;
`;
let ChartWrapper = styled(Cutout)`
  position: relative;
  width: 100%;
  flex: 1;
  background: teal;
  background: radial-gradient(#1d8a99, teal);
  padding: 1em;
`;
let PeriodButtonsWrapper = styled(Toolbar)`
  padding: 0;
  margin-bottom: 1.5em;
  margin-top: 0.5em;
`;
