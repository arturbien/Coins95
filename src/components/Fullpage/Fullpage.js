import React from "react";

import styled from "styled-components";
import { Window, WindowContent } from "react95";

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
  padding-bottom: 56px;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
`;

const Fullpage = ({ children, ...otherProps }) => (
  <SWindow>
    <SWindowContent {...otherProps}>{children}</SWindowContent>
  </SWindow>
);

export default Fullpage;
