import React, { Component } from "react";
import "./Dashboard.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCoinsList, fetchCoinsData } from "../../store/actions/coins";
// import { Link } from "react-router-dom";

// import AppBar from "../../components/AppBar/AppBar";
import Button from "../../components/Button/Button";
import Divider from "../../components/Divider/Divider";
import Loader from "../../components/Loader/Loader";
// import CoinsList from "./CoinsList/CoinsList";

import CoinsTable from "./CoinsTable/CoinsTable";

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
    const baseClass = "Dashboard";
    const { userCoinsList, coinsData, coinsInfo } = this.props;
    if (!coinsData || !coinsInfo) return <p>loading...</p>;

    const data = userCoinsList.map(coin => ({
      ...coinsInfo[coin],
      ...coinsData[coin]
    }));
    console.log(data);

    return (
      <section className={baseClass}>
        <Loader />
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <h1
            style={{
              fontFamily: "TimesNewRoman",
              fontSize: "2em",
              margin: "0.5em 0"
            }}
          >
            Dashboard
          </h1>
          <Button>+ Add</Button>
        </span>
        <CoinsTable data={data} />
        <Divider />
      </section>
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
