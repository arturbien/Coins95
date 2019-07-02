import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";

import { fetchNews } from "../../store/actions/news";

import Layout from "./Layout";

export class News extends Component {
  static propTypes = {
    fetchNews: propTypes.func,
    news: propTypes.array
  };
  componentDidMount = () => {
    const { fetchNews, news } = this.props;
    // if (!news) {
    fetchNews();
    // }
  };

  render() {
    const { news, popularNews, fetchNews } = this.props;
    return (
      news && (
        <Layout news={news} popularNews={popularNews} fetchNews={fetchNews} />
      )
    );
  }
}

const mapStateToProps = state => ({
  news: state.news,
  popularNews:
    state.news &&
    state.news.sort((a, b) => {
      return (
        parseInt(a.upvotes) + parseInt(a.downvotes) >
        parseInt(b.upvotes) + parseInt(b.downvotes)
      );
    })
});

const mapDispatchToProps = dispatch => ({
  fetchNews: timestamp => dispatch(fetchNews(timestamp))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
