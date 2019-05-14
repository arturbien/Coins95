import React, { Component } from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";

import { fetchNews } from "../../store/actions/news";

import NewsList from "./NewsList/NewsList";

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
    const { news } = this.props;
    return (
      // <Fullpage>
      //   <SCutout>
      //     <NewsListWrapper>{news && <NewsList news={news} />}</NewsListWrapper>
      //   </SCutout>
      // </Fullpage>
      <NewsListWrapper>{news && <NewsList news={news} />}</NewsListWrapper>
    );
  }
}

const mapStateToProps = state => ({
  news: state.news
});

const mapDispatchToProps = dispatch => ({
  fetchNews: () => dispatch(fetchNews())
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
