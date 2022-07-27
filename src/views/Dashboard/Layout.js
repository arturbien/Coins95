import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import packageJSON from "../../../package.json";

import CoinsTable from "./CoinsTable";

import Fullpage from "../../components/Fullpage/Fullpage";
import ButtonSwitch from "../../components/ButtonSwitch/ButtonSwitch";
import LinkButton from "../../components/LinkButton/LinkButton";

import useLockBodyScroll from "../../hooks/useLockBodyScroll";

const DashboardLayout = ({
  data,
  showingFollowing,
  showFollowing,
  showTop,
}) => {
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
      <Glass >
        <IconBg />
      </Glass>
    </Fullpage>
  );
};

export default DashboardLayout;

const Glass = styled.div`
  position: fixed;
  padding: 24px;
  z-index: 999999;
  left: -260px;
  right: 260px;
  bottom: 130px;
  height: 60%;
  background-color: rgba(211, 211, 211, 0.3);
  backdrop-filter: blur(5px);
  border-radius: 32px;
  border: 4px solid rgba(211, 211, 211, 0.3);

  box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07), 
                0 4px 8px rgba(0,0,0,0.07), 
                0 8px 16px rgba(0,0,0,0.07),
                0 16px 32px rgba(0,0,0,0.07), 
                0 32px 64px rgba(0,0,0,0.07);
`

const IconBg = styled.div`
position: relative;
  height: 60px;
  width: 60px;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #50e0ff, #3ab5fe, #2077e3, #1f63b8);

  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.07)) drop-shadow(0 2px 4px rgba(0,0,0,0.07)) drop-shadow(0 4px 8px rgba(0,0,0,0.07)) drop-shadow(0 8px 16px rgba(0,0,0,0.07)) drop-shadow(0 16px 32px rgba(0,0,0,0.07)) drop-shadow(0 32px 64px rgba(0,0,0,0.07));
  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    bottom: 4px;
    right: 4px;
    border-radius: 12px;
    background: linear-gradient(to bottom, #3ab5fe, #2077e3, #2466ba);

  }
  &::after {
    content: 'Mail';
    display: inline-block;
    position: absolute;
    bottom: 0;
    left: 50%;
    padding: 4px;
    transform: translate(-50%, 100%);
    color: #CDCDCD;
    font-size: 1.25rem;
    text-shadow: -1px -1px 0px white, 1px 1px 0px black;
    letter-spacing: 2px;
  }
`


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
