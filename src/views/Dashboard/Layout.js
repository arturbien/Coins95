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
        <h1 style={{ fontSize: "1.5em", fontWeight: "bold" }}>Coins</h1>
        <Button onClick={() => history.push("/search")}>Search</Button>
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
  margin-bottom: 1em;
  /* background: pink; */
`;

let CoinsTableWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  & > div {
    height: 100%;
  }
`;
