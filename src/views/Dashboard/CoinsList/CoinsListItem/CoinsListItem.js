import React from "react";
import PropTypes from "prop-types";
import "./CoinsListItem.css";

import { Link } from "react-router-dom";
// import Button from "../../../../components/Button/Button";

const CoinsListItem = props => {
  const { coinName, symbol, PRICE, CHANGEPCT24HOUR, imageURL } = props.data;
  const baseClass = "CoinsListItem";
  return (
    <>
      <li>
        <Link to={`coins/${symbol}`}>
          <div className={baseClass}>
            <div className={`${baseClass}-image`}>
              <img
                className={`${baseClass}-image__img`}
                src={imageURL}
                alt={`${coinName} logo`}
              />
            </div>
            <div className={`${baseClass}-title`}>
              <span>{`${coinName}.${symbol}`}</span>
            </div>
            <div className={`${baseClass}-stats`}>
              <span className={`${baseClass}-stats__item`}>{PRICE}$</span>
              <span className={`${baseClass}-stats__item`}>
                {`${CHANGEPCT24HOUR.toFixed(2)}%`}
              </span>
            </div>
          </div>
        </Link>
      </li>
    </>
  );
};

CoinsListItem.propTypes = {
  data: PropTypes.object
};

export default CoinsListItem;
