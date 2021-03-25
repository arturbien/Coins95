/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import styled from "styled-components";
import { Link, Route } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";
import arrayMove from "array-move";
import { Divider, Toolbar } from "react95";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";

import { createMaterialStyles, formatCurrency } from "../../utils";
import EditCoin from "./EditCoin";
import Handle from "../../components/Handle/Handle";
import MenuIcon from "../../components/MenuIcon/MenuIcon";

import CurrencySelect from "../../components/CurrencySelect/CurrencySelect";
import Well from "../../components/Well/Well";
import WellContainer from "../../components/WellContainer/WellContainer";
import LinkButton from "../../components/LinkButton/LinkButton";

const DragHandle = SortableHandle(Handle);
const SortableItem = SortableElement(
  ({ children }: { children: React.ReactNode }) => <li>{children}</li>
);

const SortableList = SortableContainer(
  ({ children }: { children: React.ReactNode }) => {
    return <ul>{children}</ul>;
  }
);

// TODO: cleanup
type WalletCoinData = {
  _amount: number;
  imageURL: string;
  name: string;
  PRICE: number;
  symbol: string;
};

type Props = RouteComponentProps<{}> & {
  data: WalletCoinData[] | null;
  currency: string;
  sortUserHoldings: (coinsList: string[]) => void;
};

const Layout = ({
  data,
  currency,
  sortUserHoldings,
  match,
  location,
}: Props) => {
  const handleSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    if (!data) return;
    const coinsList = arrayMove(
      data.map((coinData) => coinData.symbol),
      oldIndex,
      newIndex
    );
    sortUserHoldings(coinsList);
  };
  const balance = data
    ? Math.round(
        data
          .map((coin) => coin.PRICE * coin._amount)
          .reduce((a, b) => a + b, 0) * 100
      ) / 100
    : null;

  return (
    <Wrapper>
      <Top>
        <div>
          <header>
            <a href="https://twitter.com/artur_bien?lang=en">
              @bill_the_thustler
            </a>
          </header>
          <Divider />
          <section>
            <Avatar
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5aQ9Atw03VBh1p5nYEw0Xnzu5pZUXzLVmJ2Dd_LNAYyIXIF8SpQ"
              }
            />

            <div>
              <TotalBalance>
                {balance !== null && formatCurrency(balance, currency)}
              </TotalBalance>
              <div>
                <Toolbar>
                  <LinkButton
                    fullWidth
                    style={{ marginRight: 8 }}
                    to={{
                      pathname: "/search",
                      state: {
                        from: location.pathname,
                      },
                    }}
                  >
                    + Add
                  </LinkButton>
                  <CurrencySelect />
                </Toolbar>
              </div>
            </div>
          </section>
          <div
            style={{
              paddingLeft: "0.5rem",
              fontSize: "0.9rem",
              lineHeight: "1.5",
            }}
          >
            <p style={{ lineHeight: 1.5 }}>
              <b style={{ fontWeight: "bold" }}>Bill the Hustler</b>
            </p>

            <p>
              Ever since i left yo dumbass i been winning 😗💋
              <br />
              💰 Hustler
              <br />
              💪 Fitness geek
            </p>
          </div>
        </div>
        <div>
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
            <SortableList useDragHandle lockAxis="y" onSortEnd={handleSortEnd}>
              {data.map((coin, i) => (
                <SortableItem key={coin.symbol} index={i}>
                  <MainRow>
                    <LeftCol>
                      <DragHandle />
                      <Link
                        to={{
                          pathname: `/coins/${coin.symbol}`,
                          state: {
                            from: location.pathname,
                          },
                        }}
                      >
                        <CoinLinkContent>
                          <CoinIcon
                            src={coin.imageURL}
                            alt={`${coin.name} logo`}
                          />
                          <h4>{coin.symbol}</h4>
                        </CoinLinkContent>
                      </Link>
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
                      <LinkButton
                        size="md"
                        square
                        variant="menu"
                        to={`/wallet/${coin.symbol}`}
                      >
                        <MenuIcon />
                      </LinkButton>
                    </RightCol>
                  </MainRow>
                </SortableItem>
              ))}
            </SortableList>
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
    padding: 16px;
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
  height: 85px;
  width: 85px;
  border-radius: 50%;
  flex-shrink: 0;
`;
const TotalBalance = styled.div`
  height: 32px;
  font-size: 2rem;
  margin-right: 0.5rem;
  margin-bottom: 0.75rem;
  text-align: right;
`;
const ListWrapper = styled.section`
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
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
  line-height: 1;
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

const CoinLinkContent = styled.div`
  display: flex;
  align-items: center;
`;
