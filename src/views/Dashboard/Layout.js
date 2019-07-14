import React from "react";
import styled from "styled-components";

import Fullpage from "../../components/Fullpage/Fullpage";

import ButtonSwitch from "../../components/ButtonSwitch/ButtonSwitch";
import CoinsTable from "./CoinsTable";

import useLockBodyScroll from "../../hooks/useLockBodyScroll";

const DashboardLayout = ({
  data,
  showingFollowing,
  showFollowing,
  showTop
}) => {
  useLockBodyScroll();
  return (
    <Fullpage>
      <Header />
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

export default DashboardLayout;

let Header = styled.header`
  display: block;
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
