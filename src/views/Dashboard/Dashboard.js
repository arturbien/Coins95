import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCoinsList, fetchCoinsData } from "../../store/actions/coins";
import styled from "styled-components";
import { Button, Toolbar } from "react95";
import Loader from "../../components/Loader/Loader";
import CoinsTable from "./CoinsTable/CoinsTable";
import Fullpage from "../../components/Fullpage/Fullpage";



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
      <Fullpage>
        <Header />
        <CoinsTableWrapper>
          <CoinsTable data={data} />
        </CoinsTableWrapper>
        <SToolbar>
          <SButton
            active={!showFollowing}
            onClick={() =>
              showFollowing && this.setState({ showFollowing: false })
            }
            fullWidth
          >
            Top 30
          </SButton>
          <SButton
            active={showFollowing}
            onClick={() =>
              !showFollowing && this.setState({ showFollowing: true })
            }
            fullWidth
          >
            Following
          </SButton>
        </SToolbar>
      </Fullpage>
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
  height: 40px;
  margin-bottom: 1em;
  /* background: pink; */
`;

let CoinsTableWrapper = styled.div`
  flex: 1;
  & > div {
    height: 100%;
  }
`;
let SToolbar = styled(Toolbar)`
  margin: 0.5rem -1px;
  padding: 0;
`;

let SButton = styled(Button)`
  margin: 0 1px;

  ${({active}) => active && `
    background: url(
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIElEQVQYV2P8////fwYGBgZGRkZGMI0hABIFAbgEugAAQFQP/QfjEPcAAAAASUVORK5CYII=
    ) repeat;
  `}
`;