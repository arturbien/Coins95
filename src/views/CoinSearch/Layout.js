import React from "react";
import propTypes from "prop-types";

import { withRouter } from "react-router-dom";

import styled from "styled-components";
import { Button, WindowHeader, Window, WindowContent } from "react95";

import CoinsTable from "./CoinsTable/CoinsTable";

const Layout = ({ data, onFollow, ...otherProps }) => {
  return (
    <SWindow>
      <SWindowHeader>
        🔎 Search
        <Button
          square
          size="sm"
          style={{
            position: "absolute",
            right: "7px",
            top: "5px",
            fontWeight: "bold"
          }}
          onClick={() => otherProps.history.goBack()}
        >
          X
        </Button>
      </SWindowHeader>
      <SWindowContent>
        <CoinsTable data={data} onFollow={onFollow} />
      </SWindowContent>
    </SWindow>
  );
};

export default withRouter(Layout);

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
  padding: 0.25rem;
  padding-top: 0.5rem;
`;
let CoinsTableWrapper = styled.div`
  flex: 1;
  margin-top: 1rem;
  & > div {
    height: 100%;
  }
`;
