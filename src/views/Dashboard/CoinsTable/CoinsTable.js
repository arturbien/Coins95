import React from "react";
import PropTypes from "prop-types";
import "./CoinsTable.css";

import FileIcon from "../../../components/FileIcon/FileIcon";

class CoinsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: "price",
      desc: true,
      data: props.data
    };
  }

  handleChangeOrder = orderBy => {
    if (orderBy === this.state.orderBy) {
      this.setState(prevState => ({ desc: !prevState.desc }));
    } else {
      this.setState({ orderBy, desc: true });
    }
  };

  render() {
    const { data } = this.state;
    const baseClass = "CoinsTable";
    console.log(data);

    const orderPairs = {
      price: "PRICE",
      change: "CHANGEPCT24HOUR",
      name: "coinName"
    };

    const orderBy = orderPairs[this.state.orderBy];
    let desc = this.state.desc ? 1 : -1;
    desc = this.state.orderBy === "name" ? -desc : desc;
    const orderedData = data.sort((a, b) => {
      return (b[orderBy] > a[orderBy] ? 1 : -1) * desc;
    });

    const tableData = orderedData.map((coinData, i) => {
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
                onClick={() => this.handleChangeOrder("name")}
              >
                <span className={`${baseClass}-th__content`}>Name</span>
              </th>
              <th
                className={`${baseClass}-th`}
                onClick={() => this.handleChangeOrder("price")}
              >
                Price
              </th>
              <th
                className={`${baseClass}-th`}
                onClick={() => this.handleChangeOrder("change")}
              >
                Change
              </th>
            </tr>
          </thead>
          <tbody className={`${baseClass}-tbody`}>{tableData}</tbody>
        </table>
      </div>
    );
  }
}

CoinsTable.propTypes = {
  data: PropTypes.array
};

export default CoinsTable;
