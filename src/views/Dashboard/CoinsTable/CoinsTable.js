import React from "react";
import PropTypes from "prop-types";
import "./CoinsTable.css";

import FileIcon from "../../../components/FileIcon/FileIcon";

const CoinsTable = props => {
  const { data } = props;
  const baseClass = "CoinsTable";
  console.log(data);

  const tableData = data.map((coinData, i) => {
    const { name, coinName, imageURL, PRICE, CHANGEPCT24HOUR } = coinData;
    return (
      <tr className={`${baseClass}-tr`} key={i}>
        <td className={`${baseClass}-td`}>
          <span className={`CoinName`}>
            <FileIcon imageURL={imageURL} className={`CoinName__icon`} />
            {`${coinName.toLowerCase()}.${name.toLowerCase()}`}
          </span>
        </td>
        <td className={`${baseClass}-td`} style={{ textAlign: "right" }}>
          {PRICE.toFixed(2)}
        </td>
        <td className={`${baseClass}-td`} style={{ textAlign: "right" }}>
          {`${CHANGEPCT24HOUR.toFixed(2)}%`}
        </td>
      </tr>
    );
  });
  return (
    <div className={`${baseClass}Wrapper`}>
      <table className={`${baseClass}`}>
        <thead className={`${baseClass}-thead`}>
          <tr className={`${baseClass}-tr`}>
            <th
              className={`${baseClass}-th`}
              style={{ textAlign: "left", paddingLeft: 6 }}
            >
              Name
            </th>
            <th className={`${baseClass}-th`}>Price</th>
            <th className={`${baseClass}-th`}>Change</th>
          </tr>
        </thead>
        <tbody className={`${baseClass}-tbody`}>{tableData}</tbody>
      </table>
    </div>
  );
};

CoinsTable.propTypes = {
  data: PropTypes.array
};

export default CoinsTable;
