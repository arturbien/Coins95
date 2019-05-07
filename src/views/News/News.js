import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchNews } from "../../store/actions/news";

import NewsList from "./NewsList/NewsList";
import Fullpage from "../../components/Fullpage/Fullpage";

export class News extends Component {
  static propTypes = {};
  componentDidMount = async () => {
    const { fetchNews } = this.props;
    await fetchNews();
  };

  render() {
    const { news } = this.props;
    return (
      <Fullpage style={{ overflowY: "scroll" }}>
        {news && <NewsList news={news} />}
      </Fullpage>
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
