import React from "react";
import propTypes from "prop-types";

import { withRouter } from "react-router-dom";

import styled from "styled-components";
import {
  Cutout,
  Fieldset,
  Toolbar,
  Button,
  WindowHeader,
  Window,
  WindowContent,
  Select,
  Checkbox
} from "react95";

import SimpleLineChart from "./SimpleLineChart/SimpleLineChart";
import ButtonSwitch from "../../../components/ButtonSwitch/ButtonSwitch";
import CenteredLoader from "../../../components/CenteredLoader/CenteredLoader";

import "./CoinDetails.css";

const CoinDetailsLayout = ({
  coinInfo,
  data,
  historicalData,
  following,
  timeSpan,
  onFollow,
  onTimeSpanChange,
  ...otherProps
}) => {
  const baseClass = "CoinDetails";

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
      <SWindowHeader>
        <SourceIMG src={imageURL} />
        {`${coinName}.${symbol.toLocaleLowerCase()}`}
        <Button
          square
          size="sm"
          style={{
            position: "absolute",
            right: "7px",
            top: "5px",
            fontWeight: "bold"
          }}
          onClick={() => otherProps.history.goBack()}
        >
          X
        </Button>
      </SWindowHeader>
      <SWindowContent>
        <TopToolbar>
          <Checkbox
            name="follow"
            label="Follow"
            value={true}
            checked={following}
            onChange={onFollow}
          />

          <Select
            width={85}
            onSelect={value => console.log(value)}
            items={[
              { value: 1, label: "EUR" },
              { value: 2, label: "USD" },
              { value: 3, label: "PLN" }
            ]}
          />
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
          {!historicalData && <CenteredLoader />}
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
        <Fieldset label={"Coin information"}>
          <div className={`${baseClass}-details`}>
            <div className={`${baseClass}-details-row`}>
              <span className={`${baseClass}-details__title`}>Rank:</span>
              <span className={`${baseClass}-details__value`}>
                {sortOrder ? sortOrder : "-"}
              </span>
            </div>
            <div className={`${baseClass}-details-row`}>
              <span className={`${baseClass}-details__title`}>High (24h):</span>
              <span className={`${baseClass}-details__value`}>
                {HIGH24HOUR}
              </span>
            </div>
            <div className={`${baseClass}-details-row`}>
              <span className={`${baseClass}-details__title`}>Low (24h):</span>
              <span className={`${baseClass}-details__value`}>{LOW24HOUR}</span>
            </div>
            <div className={`${baseClass}-details-row`}>
              <span className={`${baseClass}-details__title`}>
                Total market cap:
              </span>
              <span className={`${baseClass}-details__value`}>{MKTCAP}</span>
            </div>
          </div>
        </Fieldset>
      </SWindowContent>
    </SWindow>
  );
};

export default withRouter(CoinDetailsLayout);

let SWindow = styled(Window)`
  width: 100%;
  height: 100%;
  display: flex !important;
  flex-direction: column;
`;
let SWindowHeader = styled(WindowHeader)`
  flex-shrink: 0;
`;
let SWindowContent = styled(WindowContent)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 0.25rem;
  padding-top: 0.5rem;
`;
let TopToolbar = styled(Toolbar)`
  justify-content: space-between;
  padding: 0;
  margin-bottom: 0.5em;
`;
let ChartWrapper = styled(Cutout)`
  position: relative;
  width: 100%;
  flex: 1;
  background: teal;
  background: radial-gradient(#1d8a99, teal);
  padding: 1em;
`;
let SourceIMG = styled.img`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  display: inline-block;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: white;
  margin-right: 0.5rem;
`;
