import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import packageJSON from "../../../package.json";

import CoinsTable from "./CoinsTable";

import Fullpage from "../../components/Fullpage/Fullpage";
import ButtonSwitch from "../../components/ButtonSwitch/ButtonSwitch";
import LinkButton from "../../components/LinkButton/LinkButton";

import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import { CoinsData, CoinsInfo } from "../../store/reducers/coins";

type Props = {
  data: (CoinsInfo[string] & CoinsData[string])[] | null;
  showingFollowing: boolean;
  showFollowing: () => void;
  showTop: () => void;
};
const DashboardLayout = ({
  data,
  showingFollowing,
  showFollowing,
  showTop,
}: Props) => {
  useLockBodyScroll();
  const location = useLocation();
  const currentUrl = location.pathname + location.search;
  return (
    <Fullpage>
      <Header>
        <h1>
          Coins
          <span>95</span>
          <small>v{packageJSON.version}</small>
        </h1>
        <LinkButton
          to={{
            pathname: "/search",
            state: {
              from: currentUrl,
            },
          }}
        >
          Search...
        </LinkButton>
      </Header>
      <CoinsTableWrapper>
        <CoinsTable data={data} />
      </CoinsTableWrapper>
      <ButtonSwitch
        size="md"
        buttons={[
          { label: "Top 30", onClick: showTop, active: !showingFollowing },
          {
            label: "Following",
            onClick: showFollowing,
            active: showingFollowing,
          },
        ]}
      />
    </Fullpage>
  );
};

export default DashboardLayout;

let Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 5px;
  margin-bottom: 1em;
  /* background: rgb(128, 128, 128); */

  h1 {
    /* background: -webkit-linear-gradient(transparent, black); */
    /* -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; */
    font-size: 1.8rem;
    font-weight: bold;
    /* font-family: arial; */
    font-style: italic;
    color: ${({ theme }) => theme.borderDark};
    text-shadow: 2px 2px white;
    span {
      /* font-weight: 100; */
    }
    small {
      font-size: 0.6em;
      color: black;
      font-weight: 100;
      text-shadow: 1px 1px white;

      color: ${({ theme }) => theme.borderDark};
      text-decoration: none;
      /* font-style: normal; */
      margin-left: 0.5rem;
    }
  }
`;

let CoinsTableWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  & > div {
    height: 100%;
  }
`;
