import React from "react";
import styled from "styled-components";

import NewsList from "./NewsList";
import Events from "./Events";

const Layout = () => (
  <Wrapper>
    <Events />
    <NewsList />
  </Wrapper>
);

export default Layout;

let Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
