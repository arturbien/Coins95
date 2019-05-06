import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchNews } from "../../store/actions/news";

export class News extends Component {
  static propTypes = {};
  componentDidMount = async () => {
    const { fetchNews } = this.props;
    await fetchNews();
  };

  render() {
    return <div>swag</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  fetchNews: () => dispatch(fetchNews())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
