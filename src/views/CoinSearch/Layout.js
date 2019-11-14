import React from "react";
// import propTypes from "prop-types";

import { withRouter } from "react-router-dom";
import styled from "styled-components";

import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import { Button, WindowHeader, Window, WindowContent } from "react95";

import CoinsTable from "./CoinsTable";
import CloseIcon from "../../components/CloseIcon/CloseIcon";

const Layout = ({ data, onFollow, ...otherProps }) => {
  useLockBodyScroll();
  return (
    <SWindow>
      <SWindowHeader>
        <span role="img" aria-label="Magnifying glass">
          🔎
        </span>{" "}
        Search
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
          <CloseIcon />
        </Button>
      </SWindowHeader>
      <SWindowContent>
        <CoinsTable data={data} onFollow={onFollow} />
      </SWindowContent>
    </SWindow>
  );
};

export default withRouter(Layout);

//TODO use Fullpage component ?
let SWindow = styled(Window)`
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 100%;
`;
let SWindowContent = styled(WindowContent)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding-top: 4px;
  padding-bottom: 42px;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
`;
let SWindowHeader = styled(WindowHeader)`
  flex-shrink: 0;
`;
