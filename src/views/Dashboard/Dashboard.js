import React, { Component } from "react";
import "./Dashboard.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCoinsList, fetchCoinsData } from "../../store/actions/coins";
// import { Link } from "react-router-dom";

// import AppBar from "../../components/AppBar/AppBar";
import Button from "../../components/Button/Button";
// import Divider from "../../components/Divider/Divider";
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
    if (
      !this.props.coinsData ||
      !this.props.coinsInfo ||
      !this.props.userCoinsList
    )
      return <Loader />;
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
        <div className="portfolio">
          <div className="hole" />
          <h5>Portfolio</h5>
          <h4>29/01/2019</h4>
        </div>

        <CoinsTable data={data} />
        {/* <Divider /> */}
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <Button fullWidth>Top 30</Button>
          </div>
          <div style={{ width: "50%" }}>
            <div style={{ display: "flex" }}>
              <Button fullWidth>Following</Button>
              <Button square disabled style={{ flexShrink: 0 }}>
                +
              </Button>
            </div>
          </div>
        </div>
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
