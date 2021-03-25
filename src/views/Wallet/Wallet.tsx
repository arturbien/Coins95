import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AppDispatch, AppState } from "../../store";

import { fetchCoinsInfo, fetchCoinsData } from "../../store/actions/coins";
import { sortUserHoldings } from "../../store/actions/user";

import Layout from "./Layout";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export type WalletData = Pick<Props, "data">;

const Wallet = ({
  info,
  data,
  currency,
  fetchCoinsInfo,
  fetchCoinsData,
  sortUserHoldings,
}: Props) => {
  // TODO fix missing dependencies issue
  useEffect(() => {
    if (!info) {
      fetchCoinsInfo();
    } else {
      fetchCoinsData();
    }
  }, [info, currency, fetchCoinsInfo, fetchCoinsData]);

  return (
    <Layout
      data={data}
      currency={currency}
      sortUserHoldings={sortUserHoldings}
    />
  );
};

const mapStateToProps = (state: AppState) => {
  const wallet = state.user.wallet;
  const info = state.coins.info;
  const coinsData = state.coins.coinsData;
  const currency = state.user.currency;

  const data =
    info && coinsData
      ? Object.values(wallet).map((coin) => ({
          ...info[coin.symbol],
          ...coinsData[coin.symbol],
          _amount: coin.amount,
        }))
      : null;
  return {
    info,
    data,
    currency,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchCoinsInfo: () => dispatch<any>(fetchCoinsInfo()),
  fetchCoinsData: () => dispatch<any>(fetchCoinsData()),
  sortUserHoldings: (coinsList: string[]) =>
    dispatch(sortUserHoldings(coinsList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
