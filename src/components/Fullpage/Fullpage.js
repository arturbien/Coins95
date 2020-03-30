import React from "react";

import styled from "styled-components";
import { Window, WindowContent } from "react95";

let SWindow = styled(Window)`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  height: calc(100% - var(--safe-area-inset-bottom));
  padding-bottom: 43px;
`;
let SWindowContent = styled(WindowContent)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 4px;
  padding-left: 4px;
  padding-right: 4px;
  height: 100%;
`;

const Fullpage = ({ children, ...otherProps }) => (
  <SWindow>
    <SWindowContent {...otherProps}>{children}</SWindowContent>
  </SWindow>
);

export default Fullpage;
