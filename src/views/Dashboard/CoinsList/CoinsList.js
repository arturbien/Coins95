import React from "react";
import PropTypes from "prop-types";
import "./CoinsList.css";
import CoinsListItem from "./CoinsListItem/CoinsListItem";

import Button from "../../../components/Button/Button";

const CoinsList = props => {
  const { data } = props;
  const baseClass = "CoinsList";
  return (
    <div className="CoinsListWrapper">
      <Button style={{ width: "50%", textAlign: "left" }}>Name</Button>
      <Button style={{ width: "25%" }}>Price</Button>
      <Button style={{ width: "25%" }}>Change</Button>
      <ul className={`${baseClass}`}>
        {data.map((coinData, i) => (
          <CoinsListItem key={i} data={coinData} />
        ))}
      </ul>
    </div>
  );
};

CoinsList.propTypes = {
  data: PropTypes.array
};

export default CoinsList;
