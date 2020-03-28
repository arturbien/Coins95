import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { withRouter } from "react-router";

import { setUserHoldings, deleteUserHoldings } from "../../store/actions/user";
import { formatCurrency } from "../../utils";

import API from "../../API";

import { Toolbar, Button, TextField, Window, WindowContent } from "react95";

import WindowHeader from "../../components/WindowHeader/WindowHeader";
import CoinIcon from "../../components/CoinIcon/CoinIcon";
import CloseIcon from "../../components/CloseIcon/CloseIcon";

const Layout = ({
  coin,
  currency,
  holdings,
  history,
  setUserHoldings,
  deleteUserHoldings
}) => {
  const [data, setData] = useState(null);
  const [amount, setAmount] = useState(holdings || 0);
  useEffect(() => {
    async function fetchData() {
      let data = await API.fetchCoinsData([coin], currency, false);
      data = data[coin];
      setData(data);
    }
    fetchData();
  }, [coin, currency]);

  const handleAmountChange = e => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };
  const goBack = () => history.push(`/wallet`);
  const handleAccept = () => {
    setUserHoldings({ coin, amount: parseFloat(amount) || 0 });
    goBack();
  };
  const handleDelete = () => {
    deleteUserHoldings(coin);
    goBack();
  };

  return (
    <EditWindowWrapper onClick={goBack}>
      <EditWindow onClick={e => e.stopPropagation()}>
        <WindowHeader>
          <CoinIcon src={data && data.imageURL} />
          {" " + coin}
          <Button
            square
            size="sm"
            style={{
              position: "absolute",
              right: "6px",
              fontWeight: "bold"
            }}
            onClick={goBack}
          >
            <CloseIcon />
          </Button>
        </WindowHeader>
        <WindowContent>
          <Field>
            <Label>{data && data.TOSYMBOL}</Label>
            <data>{data ? formatCurrency(data.PRICE * amount) : 0}</data>
          </Field>
          <Field>
            <Label>{data && data.FROMSYMBOL}</Label>
            <TextField
              disabled={!data}
              value={amount}
              onChange={handleAmountChange}
              width={"100%"}
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
            >
              OK
            </Button>
          </Toolbar>
        </WindowContent>
      </EditWindow>
    </EditWindowWrapper>
  );
};

const mapStateToProps = (state, ownProps) => {
  const coin = ownProps.match.params.coin;
  const holdings = state.user.wallet[coin]
    ? state.user.wallet[coin].amount
    : null;
  return {
    coin,
    holdings,
    currency: state.user.currency
  };
};
const mapDispatchToProps = dispatch => ({
  setUserHoldings: ({ amount, coin }) =>
    dispatch(setUserHoldings({ amount, coin })),
  deleteUserHoldings: coin => dispatch(deleteUserHoldings(coin))
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));

const EditWindowWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999999;
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
