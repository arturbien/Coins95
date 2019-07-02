import React from "react";

import styled from "styled-components";

import NewsList from "./NewsList";
import Events from "./Events";

import { createMaterialStyles } from "../../utils";

const Layout = ({ news, popularNews, fetchNews }) => {
  return (
    <Wrapper>
      <Header>
        <span style={{ opacity: 0 }}>News</span>
      </Header>
      <Events popularNews={popularNews} />
      <NewsList news={news} fetchNews={fetchNews} />
    </Wrapper>
  );
};

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
