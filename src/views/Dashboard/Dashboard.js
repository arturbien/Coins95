import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCoinsList, fetchCoinsData } from "../../store/actions/coins";

import styled from "styled-components";
import { Window, WindowContent, Button, Toolbar, Divider } from "react95";
import Loader from "../../components/Loader/Loader";

import CoinsTable from "./CoinsTable/CoinsTable";

const SWindow = styled(Window)`
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 100%;
`;
const SWindowContent = styled(WindowContent)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding-bottom: 5rem;
`;
const CoinsTableWrapper = styled.div`
  flex: 1;
  & > div {
    height: 100%;
  }
`;
const SToolbar = styled(Toolbar)`
  margin: 1rem 0;
  padding: 0;
`;
const Header = styled.header`
  display: block;
  height: 100px;
  margin-bottom: 1em;
  background: pink;
`;
export class Dashboard extends Component {
  static propTypes = {
    userCoinsList: PropTypes.array,
    coinsInfo: PropTypes.object,
    coinsData: PropTypes.object,
    fetchCoinsList: PropTypes.func,
    fetchCoinsData: PropTypes.func
  };
  componentDidMount = async () => {
    if (!this.props.userCoinsList) {
      await this.props.fetchCoinsList();
    }
    if (!this.props.coinsData) {
      this.props.fetchCoinsData(this.props.userCoinsList, this.props.currency);
    }
  };

  render() {
    if (
      !this.props.coinsData ||
      !this.props.coinsInfo ||
      !this.props.userCoinsList
    )
      return <Loader />;
    const { userCoinsList, coinsData, coinsInfo } = this.props;
    if (!coinsData || !coinsInfo) return <p>loading...</p>;

    const data = userCoinsList.map(coin => ({
      ...coinsInfo[coin],
      ...coinsData[coin]
    }));
    console.log(data);

    return (
      <SWindow>
        <SWindowContent>
          <Header />
          <CoinsTableWrapper>
            <CoinsTable data={data} />
          </CoinsTableWrapper>
          <SToolbar>
            <Button fullWidth>Top 30</Button>
            <Button fullWidth>Following</Button>
          </SToolbar>
        </SWindowContent>
      </SWindow>
    );
  }
}

const mapStateToProps = state => ({
  userCoinsList: state.user.coinsList,
  currency: state.user.currency,
  coinsInfo: state.coins.coinsInfo,
  coinsData: state.coins.coinsData
});

const mapDispatchToProps = dispatch => ({
  fetchCoinsList: () => dispatch(fetchCoinsList()),
  fetchCoinsData: (coinsList, currency) =>
    dispatch(fetchCoinsData(coinsList, currency))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
