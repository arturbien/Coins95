import React from "react";
// import propTypes from "prop-types";

import styled from "styled-components";
import {
  Cutout,
  Fieldset,
  Toolbar,
  Window,
  WindowContent,
  Checkbox
} from "react95";

import SimpleLineChart from "./SimpleLineChart";
import WindowHeader from "../../components/WindowHeader/WindowHeader";
import ButtonSwitch from "../../components/ButtonSwitch/ButtonSwitch";
import CenteredHourglass from "../../components/CenteredHourglass/CenteredHourglass";
// import CurrencySelect from "../../components/CurrencySelect/CurrencySelect";
import CoinIcon from "../../components/CoinIcon/CoinIcon";
import CloseIcon from "../../components/CloseIcon/CloseIcon";

import LinkButton from "../../components/LinkButton/LinkButton";

import useLockBodyScroll from "../../hooks/useLockBodyScroll";

const Layout = ({
  coinInfo,
  data,
  currency,
  historicalData,
  following,
  inWallet,
  timeSpan,
  onFollow,
  onTimeSpanChange,
  onCurrencyChange,
  ...otherProps
}) => {
  useLockBodyScroll();

  let coinName, symbol, sortOrder, HIGH24HOUR, LOW24HOUR, MKTCAP, imageURL;
  coinName = symbol = sortOrder = HIGH24HOUR = LOW24HOUR = MKTCAP = "-";
  if (coinInfo && data) {
    coinName = coinInfo.coinName;
    symbol = coinInfo.symbol;
    sortOrder = coinInfo.sortOrder;
    HIGH24HOUR = data.HIGH24HOUR;
    LOW24HOUR = data.LOW24HOUR;
    MKTCAP = data.MKTCAP;
    imageURL = coinInfo.imageURL;
  }
  return (
    <SWindow>
      <WindowHeader>
        <CoinIcon src={imageURL} />
        {`${coinName}.${symbol.toLocaleLowerCase()}`}
        <LinkButton
          square
          size="sm"
          style={{
            position: "absolute",
            right: "6px",
            top: "5px",
            fontWeight: "bold"
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
            value={true}
            checked={following}
            disabled={!coinInfo}
            onChange={onFollow}
          />
          <LinkButton to={`/wallet/${symbol}`} disabled={!coinInfo}>
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
                LOW: historicalDataPoint.low
              }))}
            />
          )}
          {!historicalData && <CenteredHourglass />}
        </ChartWrapper>

        <ButtonSwitch
          buttons={[
            {
              label: "1H",
              onClick: () => onTimeSpanChange("1H"),
              active: timeSpan === "1H"
            },
            {
              label: "24H",
              onClick: () => onTimeSpanChange("24H"),
              active: timeSpan === "24H"
            },
            {
              label: "1M",
              onClick: () => onTimeSpanChange("1M"),
              active: timeSpan === "1M"
            },
            {
              label: "3M",
              onClick: () => onTimeSpanChange("3M"),
              active: timeSpan === "3M"
            },
            {
              label: "1Y",
              onClick: () => onTimeSpanChange("1Y"),
              active: timeSpan === "1Y"
            }
          ]}
        />
        <SFieldset label={"Coin information"}>
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
        </SFieldset>
      </SWindowContent>
    </SWindow>
  );
};

export default Layout;

const SWindow = styled(Window)`
  width: 100%;
  height: 100%;
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
  background: black;
  /* background: radial-gradient(#1d8a99, teal); */
  padding: 1em;
`;
const SFieldset = styled(Fieldset)`
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
