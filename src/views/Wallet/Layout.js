import React from "react";
import styled from "styled-components";

import { withRouter, Route } from "react-router";
import arrayMove from "array-move";
import { Divider, Button, Toolbar, Anchor } from "react95";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";

import { createMaterialStyles, formatCurrency } from "../../utils";
import EditCoin from "./EditCoin";
import Handle from "../../components/Handle/Handle";
import CurrencySelect from "../../components/CurrencySelect/CurrencySelect";
import Well from "../../components/Well/Well";
import WellContainer from "../../components/WellContainer/WellContainer";
import LinkButton from "../../components/LinkButton/LinkButton";

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
    <Wrapper>
      <Top>
        <div>
          <header>@zlotousty</header>
          <Divider />
          <section>
            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5aQ9Atw03VBh1p5nYEw0Xnzu5pZUXzLVmJ2Dd_LNAYyIXIF8SpQ" />

            <div>
              <TotalBalance>
                {balance ? formatCurrency(balance, currency) : null}
              </TotalBalance>
              <div>
                <Toolbar>
                  <LinkButton fullWidth style={{ marginRight: 8 }} to="/search">
                    + Add
                  </LinkButton>
                  <CurrencySelect selectedCurrency={currency} />
                </Toolbar>
              </div>
            </div>
          </section>
          <div style={{ paddingLeft: "0.5rem", fontSize: "0.9rem" }}>
            <p style={{ lineHeight: 1.5 }}>
              <b style={{ fontWeight: "bold" }}>Artur Bien</b>
            </p>
            {/* <p style={{ lineHeight: 1.5 }}>@zlotousty</p> */}
            <p style={{ lineHeight: 1.5 }}>artur.bien@gmail.com</p>
            <Anchor
              href="https://www.expensive.toys"
              style={{ lineHeight: 1.5, textDecoration: "none" }}
            >
              www.expensive.toys
            </Anchor>
          </div>
        </div>
        <div>
          {/* <Divider /> */}
          <WellContainer>
            <Well>{new Date().toLocaleDateString()}</Well>
            <Well style={{ flexShrink: 0, minWidth: 65, textAlign: "center" }}>
              {data && `${data.length} coin(s)`}
            </Well>
          </WellContainer>
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
                          {`${formatCurrency(
                            Math.round(coin.PRICE * coin._amount * 100) / 100
                          )} ${currency}`}
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
    </Wrapper>
  );
};

export default withRouter(Layout);
const Wrapper = styled.div`
  padding-bottom: 100px;
`;
const Top = styled.div`
  ${createMaterialStyles("full")}
  box-shadow: rgba(0, 0, 0, 0.35) 4px 4px 10px 0px;
  margin-bottom: 4rem;
  padding-right: 2px;
  & > div {
    padding: 0.125rem 0.25rem;
  }
  & > div:first-child {
    margin-bottom: 0.5rem;
  }
  & > div:last-child {
    padding-bottom: 6px;
  }
  header {
    text-align: center;
    font-weight: bold;
    /* font-size: 1.1rem; */
    padding: 0.75rem;
  }
  section {
    padding: 0.625rem 0;
    display: flex;
    justify-content: space-between;
    & > div {
      width: 100%;
      padding-left: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
`;
const Avatar = styled.img`
  margin-left: 0.25rem;
  display: inline-block;
  object-fit: cover;
  height: 5.25rem;
  width: 5.25rem;
  border-radius: 50%;
`;
const TotalBalance = styled.div`
  height: 32px;
  font-size: 2rem;
  margin-right: 0.5rem;
  margin-bottom: 0.75rem;
  /* color: ${({ theme }) => theme.textDisabled}; */
  text-align: right;
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
