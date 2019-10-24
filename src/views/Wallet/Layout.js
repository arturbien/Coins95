import React from "react";
import styled from "styled-components";

import { withRouter, Route } from "react-router";
import arrayMove from "array-move";
import { Divider, Button } from "react95";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";

import { createMaterialStyles } from "../../utils";
import EditCoin from "./EditCoin";
import Handle from "../../components/Handle/Handle";
import ButtonSwitch from "../../components/ButtonSwitch/ButtonSwitch.js";
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
  const balance =
    data &&
    Math.round(
      data.map(coin => coin.PRICE * coin._amount).reduce((a, b) => a + b, 0) *
        100
    ) / 100;
  return (
    <>
      <Top>
        <div>
          <header>@zlotousty</header>
          <Divider />
          <section>
            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5aQ9Atw03VBh1p5nYEw0Xnzu5pZUXzLVmJ2Dd_LNAYyIXIF8SpQ" />
            {balance && (
              <TotalBalance>
                {balance.toLocaleString("en-US", {
                  style: "currency",
                  currency
                })}
              </TotalBalance>
            )}
          </section>
        </div>
        <div>
          <Divider />
          <ButtonSwitch
            style={{ marginBottom: 2, marginTop: 4 }}
            buttons={[
              {
                label: "A-Z",
                active: true
              },
              {
                label: "Z-A"
              },
              {
                label: "1M"
              },
              {
                label: "3M"
              }
            ]}
          />
        </div>
      </Top>
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
const Top = styled.div`
  ${createMaterialStyles("full")}
  box-shadow: rgba(0, 0, 0, 0.35) 4px 4px 10px 0px;
  margin-bottom: 4rem;
  padding-right: 2px;
  & > div {
    padding: 0.125rem 0.25rem;
  }
  & > div:first-child {
    margin-bottom: 2rem;
  }
  & > div:last-child {
  }
  header {
    text-align: center;
    font-weight: bold;
    font-size: 1.1rem;
    padding: 1rem;
  }
  section {
    padding: 0.625rem 0;
    display: flex;
    justify-content: space-between;
  }
`;
const Avatar = styled.img`
  display: inline-block;
  object-fit: cover;
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
`;
const TotalBalance = styled.h4`
  font-size: 2rem;
  /* font-weight: bold; */
  margin-right: 1rem;
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
  height: auto;
  ${createMaterialStyles("full")}
  padding: 0.75rem 0.5rem;
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
