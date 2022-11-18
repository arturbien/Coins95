import React from "react";
// import propTypes from "prop-types";

import styled from "styled-components";
import { Cutout, GroupBox, Toolbar, WindowContent, Checkbox } from "react95";

import SimpleLineChart from "./SimpleLineChart";
import FullPageWindow from "../../components/FullPageWindow/FullPageWindow";
import WindowHeader from "../../components/WindowHeader/WindowHeader";
import ButtonSwitch from "../../components/ButtonSwitch/ButtonSwitch";
import CenteredHourglass from "../../components/CenteredHourglass/CenteredHourglass";
import CoinIcon from "../../components/CoinIcon/CoinIcon";
import CloseIcon from "../../components/CloseIcon/CloseIcon";

import LinkButton from "../../components/LinkButton/LinkButton";

import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import { CryptoCompare } from "../../API";

export type Timespan = "24H" | "1H" | "1M" | "3M" | "1Y";

type Props = {
  info: {
    name: string;
    symbol: string;
    fullName: string;
    coinName: string;
    imageURL: string;
    totalCoinSupply: number;
    totalCoinsMined: number;
    sortOrder: number;
  } | null;
  data:
    | (CryptoCompare.DisplayCoinData & {
        imageURL: string;
      })
    | null;

  historicalData:
    | {
        HLCAverage: number;
        time: number;
        high: number;
        low: number;
        open: number;
        volumefrom: number;
        volumeto: number;
        close: number;
      }[]
    | null;
  following: boolean;
  inWallet: boolean;
  timeSpan: Timespan;
  onFollow: () => void;
  onTimeSpanChange: (timespan: Timespan) => Promise<void>;
};
const Layout = ({
  info,
  data,
  historicalData,
  following,
  inWallet,
  timeSpan,
  onFollow,
  onTimeSpanChange,
}: Props) => {
  useLockBodyScroll();

  let coinName, symbol, sortOrder, HIGH24HOUR, LOW24HOUR, MKTCAP, imageURL;
  coinName = symbol = sortOrder = HIGH24HOUR = LOW24HOUR = MKTCAP = "-";
  if (info && data) {
    coinName = info.coinName;
    symbol = info.symbol;
    sortOrder = info.sortOrder;
    HIGH24HOUR = data.HIGH24HOUR;
    LOW24HOUR = data.LOW24HOUR;
    MKTCAP = data.MKTCAP;
    imageURL = info.imageURL;
  }
  return (
    <SWindow>
      <WindowHeader>
        <CoinIcon src={imageURL} />
        {`${coinName}.${symbol}`.split(" ").join("_").toLowerCase()}
        <LinkButton
          square
          size="sm"
          style={{
            position: "absolute",
            right: 2,
            top: 3,
            fontWeight: "bold",
          }}
          goBack
        >
          <CloseIcon />
        </LinkButton>
      </WindowHeader>
      <SWindowContent>
        <TopToolbar>
          <Checkbox
            name="follow"
            label="Follow"
            checked={following}
            disabled={!info || !data}
            onChange={onFollow}
          />
          <LinkButton to={`/wallet/${(info || {}).symbol}`} disabled={!info}>
            {inWallet ? "Edit in wallet" : "Add to wallet"}
          </LinkButton>
        </TopToolbar>
        <ChartWrapper>
          {historicalData && (
            <SimpleLineChart
              data={historicalData.map((historicalDataPoint, i) => ({
                name: i,
                AVG: historicalDataPoint.HLCAverage,
                HIGH: historicalDataPoint.high,
                LOW: historicalDataPoint.low,
              }))}
            />
          )}
          {!historicalData && <CenteredHourglass />}
        </ChartWrapper>

        <ButtonSwitch
          size="sm"
          buttons={[
            {
              label: "1H",
              onClick: () => onTimeSpanChange("1H"),
              active: timeSpan === "1H",
            },
            {
              label: "24H",
              onClick: () => onTimeSpanChange("24H"),
              active: timeSpan === "24H",
            },
            {
              label: "1M",
              onClick: () => onTimeSpanChange("1M"),
              active: timeSpan === "1M",
            },
            {
              label: "3M",
              onClick: () => onTimeSpanChange("3M"),
              active: timeSpan === "3M",
            },
            {
              label: "1Y",
              onClick: () => onTimeSpanChange("1Y"),
              active: timeSpan === "1Y",
            },
          ]}
        />
        <SGroupBox label={"Coin information"}>
          <Row>
            <Col>Rank:</Col>
            <Col>{sortOrder ? sortOrder : "-"}</Col>
          </Row>
          <Row>
            <Col>High (24h):</Col>
            <Col>{HIGH24HOUR}</Col>
          </Row>
          <Row>
            <Col>Low (24h):</Col>
            <Col>{LOW24HOUR}</Col>
          </Row>
          <Row>
            <Col>Total market cap:</Col>
            <Col>{MKTCAP}</Col>
          </Row>
        </SGroupBox>
      </SWindowContent>
    </SWindow>
  );
};

export default Layout;

const SWindow = styled(FullPageWindow)`
  display: flex !important;
  flex-direction: column;
`;
const SWindowContent = styled(WindowContent)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 0.25rem;
  padding-top: 0.5rem;
`;
const TopToolbar = styled(Toolbar)`
  justify-content: space-between;
  padding: 0;
  margin-bottom: 0.5em;
`;
const ChartWrapper = styled(Cutout)`
  position: relative;
  width: 100%;
  flex: 1;
  background: ${({ theme }) => theme.canvas};
  /* background: radial-gradient(#1d8a99, teal); */
  padding: 1em;
`;
const SGroupBox = styled(GroupBox)`
  margin: 1rem 0.25rem calc(0.25rem + 4px) calc(0.25rem + 2px);
`;
const Row = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  line-height: 1.8;
`;
const Col = styled.div`
  width: 50%;
`;
