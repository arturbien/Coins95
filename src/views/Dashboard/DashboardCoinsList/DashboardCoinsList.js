import React from "react";
import PropTypes from "prop-types";
import Divider from "../../../components/Divider/Divider";

const DashboardCoinsList = props => {
  const { data } = props;
  const baseClass = "DashboardCoinsList";

  console.log(data);

  return (
    <ul>
      {data.map(coinData => {
        const { name, coinName, symbol, PRICE } = coinData;
        return (
          <li key={name}>
            <div>{`${symbol} ${coinName} ${PRICE}`}</div>
            <Divider />
          </li>
        );
      })}
    </ul>
  );
};

DashboardCoinsList.propTypes = {
  coinsDataList: PropTypes.array
};

export default DashboardCoinsList;
