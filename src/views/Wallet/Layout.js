import React from "react";
import styled from "styled-components";
import { createMaterialStyles } from "../../utils";

import { Divider, Avatar, AppBar, Toolbar, Button } from "react95";

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
              <li key={coin.symbol}>
                <CoinDataWrapper>
                  <Button variant="menu">{coin.symbol}</Button>
                  {coin.PRICE * coin._amount}
                </CoinDataWrapper>
                {i < data.length - 1 && <Divider />}
              </li>
            ))}
            <li>
              <Button fullWidth>+Add coin to wallet</Button>
            </li>
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
  padding: 0 0.5rem 4px;
`;

const CoinDataWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  height: auto;
`;
