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
import EyeIcon from "../../assets/img/eyeIcon.png";
import Well from "../../components/Well/Well";

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
      name: "coinName",
      following: "isFollowed"
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
              <CoinName>{`${coinName.toLowerCase()}.${name.toLowerCase()}`}</CoinName>
            </TableDataCell>
            <TableDataCell style={{ textAlign: "right" }}>
              {sortOrder}
            </TableDataCell>
            <TableDataCell
              style={{ textAlign: "right" }}
              onClick={e => {
                e.stopPropagation();
                onFollow(symbol, !isFollowed);
              }}
            >
              <SCheckbox
                readOnly
                checked={isFollowed}
                variant="flat"
                value={name}
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
                <TableHeadCell
                  onClick={() => this.handleChangeOrder("following")}
                >
                  <EyeIconIMG src={EyeIcon} />
                </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableData}</TableBody>
          </ScrollTable>
        </CoinsTableWrapper>
        <CoinsTableFooter>
          <Well>
            {data
              ? `Showing ${tableData.length} coin(s) of ${data.length} total`
              : "Loading..."}
          </Well>
          <Well />
        </CoinsTableFooter>
      </>
    );
  }
}

CoinsTable.propTypes = {
  data: PropTypes.array
};

export default withRouter(CoinsTable);

const SearchWrapper = styled(Toolbar)`
  margin: 0 -4px;
`;
let CoinsTableFooter = styled.footer`
  margin-top: 0.5rem;
  margin-bottom: 2px;
  flex-shrink: 0;
  display: flex;
  flex-wrap: no-wrap;
  ${Well}:first-child {
    width: 100%;
    margin-right: 2px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
  ${Well}:last-child {
    flex-shrink: 0;
    min-width: 4.75rem;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      bottom: -2px;
      right: -2px;
      width: 25px;
      height: 25px;
      border: 2px solid ${({ theme }) => theme.material};
      background-image: linear-gradient(
        135deg,
        ${({ theme }) => theme.borderLightest} 16.67%,
        ${({ theme }) => theme.material} 16.67%,
        ${({ theme }) => theme.material} 33.33%,
        ${({ theme }) => theme.borderDark} 33.33%,
        ${({ theme }) => theme.borderDark} 50%,
        ${({ theme }) => theme.borderLightest} 50%,
        ${({ theme }) => theme.borderLightest} 66.67%,
        ${({ theme }) => theme.material} 66.67%,
        ${({ theme }) => theme.material} 83.33%,
        ${({ theme }) => theme.borderDark} 83.33%,
        ${({ theme }) => theme.borderDark} 100%
      );
      background-size: 8.49px 8.49px;
      clip-path: polygon(100% 0, 0 100%, 100% 100%);
    }
  }
`;
const SFileIcon = styled(FileIcon)`
  margin-right: 6px;
`;
const CoinName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
let CoinsTableWrapper = styled.div`
  flex: 1;
  margin-top: 0.5rem;
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
    box-sizing: border-box;
  }
  th {
  }
  tr {
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.borderLight};
  }
  tr:hover th {
    color: ${({ theme }) => theme.text};
  }
  th:nth-child(1),
  td:nth-child(1) {
    flex: 1;
  }
  td:nth-child(1) {
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  th:nth-child(2),
  td:nth-child(2) {
    width: 60px;
    text-align: center;
  }
  td:nth-child(2) {
    border-right: 1px solid ${({ theme }) => theme.borderLight};
    border-left: 1px solid ${({ theme }) => theme.borderLight};
  }
  th:nth-child(3),
  td:nth-child(3) {
    width: 60px;
    /* flex: 1.5; */
  }
  td:nth-child(3) {
    position: relative;
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
    overflow-y: scroll;
  }
`;
const SCheckbox = styled(Checkbox)`
  height: 14px;
  pointer-events: none;
  & > div {
    margin-left: 0.25rem;
  }
`;
const EyeIconIMG = styled.img`
  height: 26px;
  width: auto;
  margin-top: 3px;
`;
