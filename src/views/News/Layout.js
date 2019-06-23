import React from "react";

import styled from "styled-components";

import NewsList from "./NewsList";
import Events from "./Events";

import { createMaterialStyles } from "../../utils";

const Layout = ({ news, popularNews, fetchNews }) => {
  return (
    <>
      <Header>News</Header>
      <Events popularNews={popularNews} />
      <NewsList news={news} fetchNews={fetchNews} />
    </>
  );
};

export default Layout;

let Header = styled.header`
  ${createMaterialStyles("full")}
  height: 3rem;
`;
