import React from "react";

import styled from "styled-components";

import NewsList from "./NewsList";
import Stories from "./Stories";

const Layout = ({ news, popularNews, fetchNews }) => {
  return (
    <>
      <Stories popularNews={popularNews} />
      <NewsList news={news} fetchNews={fetchNews} />
    </>
  );
};

export default Layout;
