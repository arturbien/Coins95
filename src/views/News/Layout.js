import React from "react";
import styled from "styled-components";

import NewsList from "./NewsList";
import Events from "./Events";

import { createMaterialStyles } from "../../utils";

const Layout = () => (
  <Wrapper>
    <Header>
      <span style={{ opacity: 0 }}>News</span>
    </Header>
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
let Header = styled.header`
  ${createMaterialStyles("full")}
  height: 3rem;
`;
