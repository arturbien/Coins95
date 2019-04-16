import React from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
import styled from "styled-components";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableDataCell
} from "react95";
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
    const { history } = this.props;
    const { data } = this.state;
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
        <TableRow key={i} onClick={() => history.push(`/coins/${name}`)}>
          <TableDataCell>
            <FileIcon imageURL={imageURL} />
            {`${coinName.toLowerCase()}.${name.toLowerCase()}`}
          </TableDataCell>
          <TableDataCell style={{ textAlign: "right" }}>
            {PRICE.toFixed(2)}
          </TableDataCell>
          <TableDataCell style={{ textAlign: "right" }}>
            {`${CHANGEPCT24HOUR.toFixed(2)}%`}
          </TableDataCell>
        </TableRow>
      );
    });
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell onClick={() => this.handleChangeOrder("name")}>
              Name
            </TableHeadCell>
            <TableHeadCell onClick={() => this.handleChangeOrder("price")}>
              Price
            </TableHeadCell>
            <TableHeadCell onClick={() => this.handleChangeOrder("change")}>
              Change
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableData}</TableBody>
      </Table>
    );
  }
}

CoinsTable.propTypes = {
  data: PropTypes.array
};

export default withRouter(CoinsTable);
