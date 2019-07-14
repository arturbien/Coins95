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
  TableDataCell,
  Checkbox,
  Toolbar,
  TextField,
  Button
} from "react95";

import FileIcon from "../../components/FileIcon/FileIcon";

const COIN_LIMIT = 40;

class CoinsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: "rank",
      desc: false,
      searchPhrase: ""
    };
  }
  handleChangeOrder = orderBy => {
    if (orderBy === this.state.orderBy) {
      this.setState(prevState => ({ desc: !prevState.desc }));
    } else {
      this.setState({ orderBy, desc: true });
    }
  };
  handleInputChange = e => this.setState({ searchPhrase: e.target.value });
  render() {
    const { history, data, onFollow } = this.props;
    let { searchPhrase } = this.state;
    searchPhrase = searchPhrase.toLowerCase();
    const orderPairs = {
      rank: "sortOrder",
      name: "coinName"
    };

    let tableData;
    if (!data) {
      tableData = null;
    } else {
      const orderBy = orderPairs[this.state.orderBy];
      let desc = this.state.desc ? 1 : -1;
      desc = this.state.orderBy === "name" ? -desc : desc;

      const orderedData = [...data]
        .filter(coin => {
          return coin.coinName.toLowerCase().includes(searchPhrase);
        })
        .sort((a, b) => {
          return (b[orderBy] > a[orderBy] ? 1 : -1) * desc;
        })
        .splice(0, COIN_LIMIT);
      console.log("💖");
      tableData = orderedData.map((coinData, i) => {
        const {
          name,
          coinName,
          symbol,
          imageURL,
          sortOrder,
          isFollowed
        } = coinData;
        return (
          <TableRow key={i} onClick={() => history.push(`/coins/${symbol}`)}>
            <TableDataCell>
              <SFileIcon height={22} imageURL={imageURL} />
              {`${coinName.toLowerCase()}.${name.toLowerCase()}`}
            </TableDataCell>
            <TableDataCell style={{ textAlign: "right" }}>
              {sortOrder}
            </TableDataCell>
            <TableDataCell
              style={{ textAlign: "right" }}
              onClick={e => e.stopPropagation()}
            >
              <SCheckbox
                checked={isFollowed}
                variant="flat"
                value={name}
                onChange={() => onFollow(symbol, !isFollowed)}
              />
            </TableDataCell>
          </TableRow>
        );
      });
    }

    return (
      <>
        <SearchWrapper>
          <TextField
            placeholder="Search..."
            value={searchPhrase}
            onChange={this.handleInputChange}
            width="100%"
            style={{ marginRight: "4px" }}
          />
          <Button
            disabled={searchPhrase === ""}
            onClick={() => this.setState({ searchPhrase: "" })}
          >
            Clear
          </Button>
        </SearchWrapper>
        <CoinsTableWrapper>
          <ScrollTable>
            <TableHead>
              <TableRow>
                <TableHeadCell onClick={() => this.handleChangeOrder("name")}>
                  Name
                </TableHeadCell>
                <TableHeadCell onClick={() => this.handleChangeOrder("rank")}>
                  Rank
                </TableHeadCell>
                <TableHeadCell>🎆</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableData}</TableBody>
          </ScrollTable>
        </CoinsTableWrapper>
      </>
    );
  }
}

CoinsTable.propTypes = {
  data: PropTypes.array
};

export default withRouter(CoinsTable);

const SearchWrapper = styled(Toolbar)`
  margin-left: -4px;
  margin-right: 0px;
`;

const SFileIcon = styled(FileIcon)`
  margin-right: 6px;
`;
let CoinsTableWrapper = styled.div`
  flex: 1;
  margin-top: 1rem;
  padding-bottom: calc(56px + 35px + 1rem);
  overflow: hidden;
  & > div {
    height: 100%;
  }
`;

const ScrollTable = styled(Table)`
  display: flex;
  flex-direction: column;
  height: 100%;
  -webkit-overflow-scrolling: touch;

  thead,
  tbody,
  tr,
  th,
  td {
    display: block;
  }
  th,
  td {
    flex-shrink: 0 !important;
  }
  tr {
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.borderLight};
  }
  th:nth-child(1),
  td:nth-child(1) {
    flex: 6;
  }
  td:nth-child(1) {
    display: flex;
    align-items: center;
  }
  th:nth-child(2),
  td:nth-child(2) {
    flex: 2;
    text-align: center;
  }
  td:nth-child(2) {
    border-right: 1px solid ${({ theme }) => theme.borderLight};
    border-left: 1px solid ${({ theme }) => theme.borderLight};
  }
  th:nth-child(3),
  td:nth-child(3) {
    flex: 1.5;
  }
  td:nth-child(3) {
    position: relative;
    background: ${({ theme }) => theme.canvas};
    text-align: center;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  thead {
    flex-shrink: 0;
  }
  tbody {
    height: 100%;
    overflow: scroll;
  }
`;
const SCheckbox = styled(Checkbox)`
  height: 14px;
  & > div {
    margin-left: 0.25rem;
  }
`;
