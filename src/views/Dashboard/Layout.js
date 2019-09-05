import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router";
import Fullpage from "../../components/Fullpage/Fullpage";

import ButtonSwitch from "../../components/ButtonSwitch/ButtonSwitch";
import CoinsTable from "./CoinsTable";

import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import { Button } from "react95";
const DashboardLayout = ({
  data,
  showingFollowing,
  showFollowing,
  showTop,
  history
}) => {
  useLockBodyScroll();
  return (
    <Fullpage>
      <Header>
        <h1>
          Coins
          <span>95</span>
          <small>v0.0.1</small>
        </h1>
        <Button onClick={() => history.push("/search")}>Search...</Button>
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
            active: showingFollowing
          }
        ]}
      />
    </Fullpage>
  );
};

export default withRouter(DashboardLayout);

let Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 5px;
  margin-bottom: 1em;
  /* background: rgb(128, 128, 128); */

  h1 {
    background: -webkit-linear-gradient(#eee, #333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.6rem;
    font-weight: bold;
    font-family: arial;
    font-style: italic;

    span {
      font-weight: 100;
    }
    small {
      font-size: 0.8rem;
      color: black;
      font-weight: 100;
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
