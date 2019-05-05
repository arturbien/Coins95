import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCoinsList, fetchCoinsData } from "../../store/actions/coins";
import styled from "styled-components";
import { Window, WindowContent, Button, Toolbar } from "react95";
import Loader from "../../components/Loader/Loader";
import CoinsTable from "./CoinsTable/CoinsTable";

export class Dashboard extends Component {
  static propTypes = {
    userCoinsList: PropTypes.array,
    coinsInfo: PropTypes.object,
    coinsData: PropTypes.object,
    fetchCoinsList: PropTypes.func,
    fetchCoinsData: PropTypes.func
  };

  state = {
    showFollowing: false
  };

  componentDidMount = async () => {
    // first fetch coins list and info
    const {
      topCoinsList,
      userCoinsList,
      coinsData,
      fetchCoinsList,
      fetchCoinsData
    } = this.props;

    if (!topCoinsList) {
      fetchCoinsList();
    } else {
      // case when user laods app on /coins/BTC and presses X to go to dashboard
      if (!coinsData) {
        fetchCoinsData([...new Set([...userCoinsList, ...topCoinsList])]);
      }
    }
  };
  componentDidUpdate(prevProps, prevState) {
    // then if we already have topCoinsList, we need to
    // fetch data for both top coins and user coins
    const {
      userCoinsList,
      topCoinsList,
      coinsData,
      fetchCoinsData
    } = this.props;
    // case when app is loaded in /coins
    if (coinsData === null && prevProps.topCoinsList === null) {
      // new Set() for removing duplicates
      fetchCoinsData([...new Set([...userCoinsList, ...topCoinsList])]);
    }
  }
  render() {
    const { showFollowing } = this.state;
    const { userCoinsList, topCoinsList, coinsData, coinsInfo } = this.props;

    if (!coinsData) return <Loader />;

    const data = (showFollowing ? userCoinsList : topCoinsList).map(coin => ({
      ...coinsInfo[coin],
      ...coinsData[coin]
    }));

    return (
      <SWindow>
        <SWindowContent>
          <Header />
          <CoinsTableWrapper>
            <CoinsTable data={data} />
          </CoinsTableWrapper>
          <SToolbar>
            <Button
              active={!showFollowing}
              onClick={() =>
                showFollowing && this.setState({ showFollowing: false })
              }
              fullWidth
            >
              Top 30
            </Button>
            <Button
              active={showFollowing}
              onClick={() =>
                !showFollowing && this.setState({ showFollowing: true })
              }
              fullWidth
            >
              Following
            </Button>
          </SToolbar>
        </SWindowContent>
      </SWindow>
    );
  }
}

const mapStateToProps = state => ({
  userCoinsList: state.user.coinsList,
  topCoinsList: state.coins.coinsList
    ? [...state.coins.coinsList].splice(0, 30)
    : null,
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

let Header = styled.header`
  display: block;
  height: 100px;
  margin-bottom: 1em;
  /* background: pink; */
`;
let SWindow = styled(Window)`
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 100%;
`;
let SWindowContent = styled(WindowContent)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding-bottom: 5rem;
`;
let CoinsTableWrapper = styled.div`
  flex: 1;
  & > div {
    height: 100%;
  }
`;
let SToolbar = styled(Toolbar)`
  margin: 1rem 0;
  padding: 0;
`;
