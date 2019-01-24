import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import API from "../../API";
// import { fetchCoinsData } from "../../store/actions/coins";

function HLCAverage(high, low, close) {
  return (high + low + close) / 3;
}

export class CoinDetails extends Component {
  // static propTypes = {
  // prop: PropTypes
  // };

  state = {
    data: null,
    loading: true
  };

  componentDidMount = async () => {
    const coin = this.props.match.params.coin;
    try {
      const data = await API.fetchHistoricalData(coin);
      data.forEach(dataPoint => {
        dataPoint["HLCAverage"] = HLCAverage(
          dataPoint.high,
          dataPoint.low,
          dataPoint.close
        );
      });

      console.log(data);
      this.setState({ data, loading: false });
    } catch (error) {
      console.log("Error in CoinDetails fetchHistoricalData");
      this.setState({ loading: false });
    }
  };

  render() {
    if (this.state.data) {
      console.log("swag");
      return null;
    } else {
      return <h1>loading...</h1>;
    }
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CoinDetails)
);
