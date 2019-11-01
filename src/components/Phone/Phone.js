import React from "react";
import styled from "styled-components";

const PhoneWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  max-width: 100%;
  height: 850px;
  max-height: 100%;
  overflow-y: scroll;
`;
const PhoneContent = styled.div`
  position: relative;
  height: 100%;
  overflow: scroll;
`;
export default ({ children, ...otherProps }) => (
  <PhoneWrapper {...otherProps}>
    <PhoneContent>{children}</PhoneContent>
  </PhoneWrapper>
);
