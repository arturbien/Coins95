import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { withRouter } from "react-router";
import API from "../../API";

import {
  Divider,
  Toolbar,
  Button,
  TextField,
  Window,
  WindowHeader,
  WindowContent
} from "react95";

const Layout = ({ currency, match, history }) => {
  const [data, setData] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    async function fetchData() {
      const coin = match.params.coin;
      console.log("coin, ", match);
      let data = await API.fetchCoinsData([coin], currency, false);
      data = data[coin];
      console.log("😂", data);
      setData(data);
    }
    fetchData();
  }, []);

  const handleAmountChange = e => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };
  return (
    <EditWindowWrapper onClick={() => history.push(`/wallet`)}>
      <EditWindow onClick={e => e.stopPropagation()}>
        {/* <WindowHeader>{"🚀 coin here"}</WindowHeader> */}
        <h3>Bitcoin holdings:</h3>
        <WindowContent>
          <Field>
            <Label>{data && data.TOSYMBOL}</Label>
            <TextField
              disabled
              value={data ? data.PRICE * amount : 0}
              width={"100%"}
            />
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
          <Toolbar>
            <Button fullWidth>Cancel</Button>
            <Button fullWidth>OK</Button>
          </Toolbar>
        </WindowContent>
      </EditWindow>
    </EditWindowWrapper>
  );
};

export default withRouter(Layout);

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
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
`;
const EditWindow = styled(Window)`
  flex: 1;
`;
const Field = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;
const Label = styled.label`
  width: 55px;
  flex-shrink: 0;
`;
