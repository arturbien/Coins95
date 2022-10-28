import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { RouteComponentProps, withRouter } from "react-router";

import { setUserHoldings, deleteUserHoldings } from "../../store/actions/user";
import { formatCurrency } from "../../utils";

import API, { FormattedCoinData } from "../../API";

import { Toolbar, Button, Window, WindowContent, TextField } from "react95";

import WindowHeader from "../../components/WindowHeader/WindowHeader";
import CoinIcon from "../../components/CoinIcon/CoinIcon";
import CloseIcon from "../../components/CloseIcon/CloseIcon";
import { AppDispatch, AppState } from "../../store";

type OwnProps = RouteComponentProps<{ coin: string }>;

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Layout = ({
  coin,
  currency,
  holdings,
  history,
  setUserHoldings,
  deleteUserHoldings,
}: Props) => {
  const [data, setData] = useState<FormattedCoinData | null>(null);
  const [amount, setAmount] = useState((holdings || 0).toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await API.fetchCoinsData([coin], currency);
      const coinData = data[coin];
      setData(coinData);
    }
    fetchData();
  }, [coin, currency]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };
  const goBack = () => history.push(`/wallet`);

  const parsedAmount = parseFloat(amount) || 0;

  const handleAccept = () => {
    setUserHoldings({ coin, amount: parsedAmount });
    goBack();
  };

  const handleDelete = () => {
    deleteUserHoldings(coin);
    goBack();
  };

  return (
    <EditWindowWrapper onClick={goBack}>
      <EditWindow onClick={(e) => e.stopPropagation()}>
        <WindowHeader>
          {/* TODO: is it good approach? */}
          <CoinIcon src={data ? data.imageURL : ""} />
          {" " + coin}
          <Button
            square
            size="sm"
            style={{
              position: "absolute",
              right: 2,
              top: 3,
              fontWeight: "bold",
            }}
            onClick={goBack}
          >
            <CloseIcon />
          </Button>
        </WindowHeader>
        <WindowContent>
          <Field>
            <Label>{data && data.TOSYMBOL}</Label>
            <data>{data ? formatCurrency(data.PRICE * parsedAmount) : 0}</data>
          </Field>
          <Field>
            <Label>{data && data.FROMSYMBOL}</Label>
            <TextField
              ref={inputRef}
              disabled={!data}
              value={amount}
              onChange={handleAmountChange}
              style={{ width: "100%" }}
            />
          </Field>
          <Toolbar style={{ justifyContent: "flex-end" }}>
            {holdings !== null && (
              <Button style={{ width: "50%" }} onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Button
              style={{ width: "50%" }}
              onClick={handleAccept}
              disabled={!data}
              primary
            >
              OK
            </Button>
          </Toolbar>
        </WindowContent>
      </EditWindow>
    </EditWindowWrapper>
  );
};

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
  const coin = ownProps.match.params.coin;
  const holdings = state.user.wallet[coin]
    ? state.user.wallet[coin].amount
    : null;
  return {
    coin,
    holdings,
    currency: state.user.currency,
  };
};
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setUserHoldings: ({ amount, coin }: { amount: number; coin: string }) =>
    dispatch(setUserHoldings({ amount, coin })),
  deleteUserHoldings: (coin: string) => dispatch(deleteUserHoldings(coin)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));

const EditWindowWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
`;
const EditWindow = styled(Window)`
  flex: 1;
  max-width: 350px;
`;
const Field = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  data {
    margin-left: 12px;
  }
`;
const Label = styled.label`
  width: 62px;
  flex-shrink: 0;
`;
