import React from "react";
import styled from "styled-components";

import { createMaterialStyles } from "../../utils";

import Well from "../../components/Well/Well";
const Stories = ({ popularNews }) => {
  console.log(popularNews);
  return (
    <div>
      <FeedList>
        <FeedItem>ASD</FeedItem>
        <FeedItem>POD</FeedItem>
        <FeedItem>PIR</FeedItem>
        <FeedItem>ASD</FeedItem>
        <FeedItem>POD</FeedItem>
        <FeedItem>PIR</FeedItem>
        <FeedItem>ASD</FeedItem>
        <FeedItem>POD</FeedItem>
        <FeedItem>PIR</FeedItem>
        <FeedItem>ASD</FeedItem>
        <FeedItem>POD</FeedItem>
        <FeedItem>PIR</FeedItem>
      </FeedList>
      <FeedFooter>
        <Well>25 news found</Well>
        <Well>25 news found</Well>
      </FeedFooter>
    </div>
  );
};

export default Stories;

let FeedList = styled.ul`
  display: flex;
  align-items: center;
  height: 5rem;
  overflow-x: scroll;
  flex-wrap: no-wrap;
  background: ${({ theme }) => theme.material};
`;
let FeedItem = styled.li`
  display: inline-block;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  background: blue;
  margin: 0 0.5rem;
  flex-shrink: 0;
`;
let FeedFooter = styled.section`
  ${createMaterialStyles("top")}
  padding-bottom: 1rem;
  display: flex;
  flex-wrap: no-wrap;

  ${Well}:first-child {
    width: 100%;
    margin-right: 2px;
  }
  ${Well}:last-child {
    flex-shrink: 0;
  }
`;
