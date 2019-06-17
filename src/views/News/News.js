import React, { Component } from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";

import { fetchNews } from "../../store/actions/news";

import Layout from "./Layout";

export class News extends Component {
  static propTypes = {
    fetchNews: propTypes.func,
    news: propTypes.array
  };
  componentDidMount = async () => {
    const { fetchNews } = this.props;
    await fetchNews();
  };

  render() {
    const { news, popularNews, fetchNews } = this.props;
    return (
      // <Fullpage>
      //   <SCutout>
      //     <NewsListWrapper>{news && <NewsList news={news} />}</NewsListWrapper>
      //   </SCutout>
      // </Fullpage>
      <NewsListWrapper>
        {news && (
          <Layout news={news} popularNews={popularNews} fetchNews={fetchNews} />
        )}
      </NewsListWrapper>
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

let NewsListWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  background: white;
`;
