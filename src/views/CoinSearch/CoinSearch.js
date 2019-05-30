import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Layout from "./Layout";

export class CoinSearch extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return <Layout />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinSearch);
