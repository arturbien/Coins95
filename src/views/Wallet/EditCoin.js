import React from "react";
import styled from "styled-components";

import { withRouter } from "react-router";

import {
  Divider,
  Toolbar,
  Button,
  Window,
  WindowHeader,
  WindowContent
} from "react95";

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
const Layout = ({ match, history }) => {
  return (
    <EditWindowWrapper onClick={() => history.push(`/wallet`)}>
      <EditWindow onClick={e => e.stopPropagation()}>
        <WindowHeader>{"🚀 coin here"}</WindowHeader>
        <WindowContent>hahaha</WindowContent>
      </EditWindow>
    </EditWindowWrapper>
  );
};

export default withRouter(Layout);
