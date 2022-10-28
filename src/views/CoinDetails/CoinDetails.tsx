import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import API, { CryptoCompare } from "../../API";
import { AppDispatch, AppState } from "../../store";
import { fetchCoinsInfo } from "../../store/actions/coins";
import { setFollowedCoin } from "../../store/actions/user";
import Layout, { Timespan } from "./Layout";

function HLCAverage(high: number, low: number, close: number) {
  return (high + low + close) / 3;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Swag = (props: Props) => {
  const isMounted = React.useRef(true);
  const [{ data, historicalData, timeSpan }, setState] = React.useState<{
    data:
      | (CryptoCompare.DisplayCoinData & {
          imageURL: string;
        })
      | null;
    historicalData:
      | {
          HLCAverage: number;
          time: number;
          high: number;
          low: number;
          open: number;
          volumefrom: number;
          volumeto: number;
          close: number;
        }[]
      | null;
    timeSpan: Timespan;
  }>({
    data: null,
    historicalData: null,
    timeSpan: "24H",
  });

  const { following, coin, currency, info, setFollowedCoin, inWallet } = props;

  const handleFetchCoinsData = React.useCallback(async () => {
    let resp = await API.fetchCoinsDisplayData([coin], currency);
    const data = resp[coin];
    if (isMounted.current) setState((state) => ({ ...state, data }));
  }, [coin, currency]);

  const handleFetchHistoricalData = React.useCallback(
    async (newTimeSpan: Timespan) => {
      try {
        const data = await API.fetchCoinsHistoricalData(
          coin,
          newTimeSpan,
          currency
        );
        const historicalData = data.map((dataPoint) => ({
          ...dataPoint,
          HLCAverage: HLCAverage(
            dataPoint.high,
            dataPoint.low,
            dataPoint.close
          ),
        }));

        if (isMounted.current)
          setState((state) => ({
            ...state,
            historicalData,
            timeSpan: newTimeSpan,
          }));
      } catch (error) {
        console.log("Error in CoinDetails handleFetchHistoricalData ");
        if (isMounted.current)
          setState((state) => ({
            ...state,
            timeSpan: timeSpan,
          }));
      }
    },
    [coin, currency, timeSpan]
  );

  React.useEffect(() => {
    async function update() {
      if (!info) {
        await fetchCoinsInfo();
      }

      handleFetchCoinsData();
      handleFetchHistoricalData(timeSpan);
    }
    update();
  }, [handleFetchCoinsData, handleFetchHistoricalData, info, timeSpan]);

  return (
    <Layout
      info={info}
      data={data}
      historicalData={historicalData}
      following={following}
      inWallet={inWallet}
      timeSpan={timeSpan}
      onTimeSpanChange={handleFetchHistoricalData}
      onFollow={() => info && setFollowedCoin(info.symbol, !following)}
    />
  );
};

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
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
    info,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchCoinsInfo: () => dispatch(fetchCoinsInfo()),
  setFollowedCoin: (coin: string, follow: boolean) =>
    dispatch(setFollowedCoin(coin, follow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Swag);

type OwnProps = RouteComponentProps<{
  coin: string;
}>;
