import React from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
import styled from "styled-components";
import {
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableDataCell,
  Checkbox,
} from "react95";
import FlexTable from "../../components/FlexTable/FlexTable";

import FileIcon from "../../components/FileIcon/FileIcon";
import EyeIcon from "../../assets/img/eyeIcon.png";
import Well from "../../components/Well/Well";
import WellContainer from "../../components/WellContainer/WellContainer";

const COIN_LIMIT = 40;

class CoinsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: "rank",
      desc: false
    };
  }
  handleChangeOrder = (orderBy) => {
    if (orderBy === this.state.orderBy) {
      this.setState((prevState) => ({ desc: !prevState.desc }));
    } else {
      this.setState({ orderBy, desc: true });
    }
  };
  handleInputChange = (e) => this.setState({ searchPhrase: e.target.value });
  render() {
    let { history, data, onFollow ,searchPhrase} = this.props;
    searchPhrase = searchPhrase.toLowerCase();
    const orderPairs = {
      rank: "sortOrder",
      name: "coinName",
      following: "isFollowed",
    };

    let tableData;
    if (!data) {
      tableData = null;
    } else {
      const orderBy = orderPairs[this.state.orderBy];
      let desc = this.state.desc ? 1 : -1;
      desc = this.state.orderBy === "name" ? -desc : desc;

      const orderedData = [...data]
        .filter((coin) => {
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
          isFollowed,
        } = coinData;
        const onClick = () => history.push(`/coins/${symbol}`);
        return (
          <TableRow key={i} >
            <TableDataCell onClick={onClick}>
              <SFileIcon height={22} imageURL={imageURL} />
              <CoinName>{`${coinName.toLowerCase()}.${name.toLowerCase()}`}</CoinName>
            </TableDataCell>
            <TableDataCell style={{ textAlign: "right" }} onClick={onClick}>
              {sortOrder}
            </TableDataCell>
            <TableDataCell
              style={{ textAlign: "right" }}
              onClick={(e) => {
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
        <TableWrapper>
          <Table>
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
          </Table>
        </TableWrapper>
        <TableFooter>
          <WellContainer>
            <Well>
              {data
                ? `Showing ${tableData.length} coin(s) of ${data.length} total`
                : "Loading..."}
            </Well>
            <Well draggable />
          </WellContainer>
        </TableFooter>
      </>
    );
  }
}

CoinsTable.propTypes = {
  data: PropTypes.array,
};

export default withRouter(CoinsTable);

let TableFooter = styled.footer`
  margin-top: 0.5rem;
  margin-bottom: 2px;
  flex-shrink: 0;
`;
const SFileIcon = styled(FileIcon)`
  margin-right: 6px;
`;
const CoinName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
let TableWrapper = styled.div`
  flex: 1;
  margin-top: 0.5rem;
  overflow: hidden;
  & > div {
    height: 100%;
  }
`;

const Table = styled(FlexTable)`
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
  th:nth-child(3),
  td:nth-child(3) {
    width: 60px;
  }
  td:nth-child(3) {
    position: relative;
    text-align: center;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    align-items: center;
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
