import React from "react";
import propTypes from "prop-types";

import { withRouter } from "react-router-dom";

import styled from "styled-components";
import {
  Cutout,
  Fieldset,
  Toolbar,
  Button,
  WindowHeader,
  Window,
  WindowContent,
  Divider,
  Select,
  TextField,
  Checkbox
} from "react95";

const Layout = ({ ...otherProps }) => {
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
        <Toolbar>
          <TextField
            defaultValue=""
            width="100%"
            style={{ marginRight: "4px" }}
          />
          <Button>Clear</Button>
        </Toolbar>
        <Divider />
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
