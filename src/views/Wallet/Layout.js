import React from "react";
import styled from "styled-components";

import { withRouter, Route } from "react-router";
import arrayMove from "array-move";
import { Divider, Avatar, AppBar, Toolbar, Button } from "react95";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";

import { createMaterialStyles } from "../../utils";
import EditCoin from "./EditCoin";
import Handle from "../../components/Handle/Handle";

const DragHandle = sortableHandle(Handle);
const SortableItem = sortableElement(({ value, children }) => (
  <li>{children}</li>
));

const SortableContainer = sortableContainer(({ children }) => {
  return <ul>{children}</ul>;
});

const Layout = ({ data, currency, sortUserHoldings, history, match }) => {
  const handleSortEnd = ({ oldIndex, newIndex }) => {
    const coinsList = arrayMove(
      data.map(coinData => coinData.symbol),
      oldIndex,
      newIndex
    );
    console.log(coinsList);
    sortUserHoldings(coinsList);
  };
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
        <>
          <ListWrapper>
            <SortableContainer
              useDragHandle
              lockAxis="y"
              onSortEnd={handleSortEnd}
            >
              {data.map((coin, i) => (
                <SortableItem key={coin.symbol} index={i} value={coin.symbol}>
                  <MainRow>
                    <LeftCol>
                      <DragHandle />
                      <CoinIcon src={coin.imageURL} alt={`${coin.name} logo`} />
                      <h4>{coin.symbol}</h4>
                    </LeftCol>
                    <RightCol>
                      <Balance>
                        <data value={coin.PRICE * coin._amount}>
                          {`${Math.round(coin.PRICE * coin._amount * 100) /
                            100} ${currency}`}
                        </data>
                        <data
                          value={coin._amount}
                        >{`${coin._amount} ${coin.symbol}`}</data>
                      </Balance>
                      <Button
                        size="md"
                        square
                        variant="menu"
                        onClick={() => history.push(`/wallet/${coin.symbol}`)}
                      >
                        <KebabIcon />
                      </Button>
                    </RightCol>
                  </MainRow>
                </SortableItem>
              ))}
            </SortableContainer>
          </ListWrapper>
          <Route path={`${match.url}/:coin`} component={EditCoin} />
        </>
      )}
    </>
  );
};

export default withRouter(Layout);

const Header = styled.header`
  height: 30%;
`;
const ListWrapper = styled.section`
  background: rgba(0, 0, 0, 0.2);
`;
const CoinIcon = styled.img`
  display: inline-block;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  object-fit: contain;
`;
const MainRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0.5rem;
  height: auto;
  ${createMaterialStyles("full")}
`;

const LeftCol = styled.header`
  display: flex;
  align-items: center;

  h4 {
    margin-left: 10px;
    margin-top: 2px;
  }
`;
const RightCol = styled.div`
  display: flex;
  align-items: center;
`;
const Balance = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 5px;
  data:last-child {
    color: ${({ theme }) => theme.borderDark};
    margin-top: 4px;
  }
`;
const KebabIcon = styled.span`
  position: relative;
  top: 50%;
  display: inline-block;
  width: 3px;
  height: 3px;

  background: ${({ theme }) => theme.borderDarkest};
  &:after,
  &:before {
    content: "";
    position: absolute;
    left: 0;
    display: inline-block;
    width: 3px;
    height: 3px;

    background: ${({ theme }) => theme.borderDarkest};
  }
  &:after {
    top: -6px;
  }
  &:before {
    top: 6px;
  }
`;
