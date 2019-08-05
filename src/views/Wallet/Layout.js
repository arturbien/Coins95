import React from "react";
import styled from "styled-components";
import { createMaterialStyles } from "../../utils";

import { Divider, Avatar, AppBar, Toolbar } from "react95";

const Layout = ({ data, wallet }) => {
  console.log(data);

  return (
    <>
      <AppBar fixed={false}>
        <Toolbar>
          <Avatar
            style={{ background: "teal" }}
            src={"https://rolandgroza.com/images/doom-guy-face-5.png"}
            noBorder
          />
        </Toolbar>
      </AppBar>
      <Header>swag</Header>
      {data && (
        <ListWrapper>
          <ul>
            {data.map((coin, i) => (
              <li key={coin.name}>
                <CoinDataWrapper>
                  <div>{coin.name}</div>
                </CoinDataWrapper>
                {i < data.length - 1 && <Divider />}
              </li>
            ))}
          </ul>
        </ListWrapper>
      )}
    </>
  );
};

export default Layout;

const Header = styled.header`
  height: 30%;
`;
const ListWrapper = styled.section`
  ${createMaterialStyles("full")}
  padding: 0.5rem;
`;

const CoinDataWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
`;
