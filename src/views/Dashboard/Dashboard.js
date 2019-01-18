import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCoinsList } from "../../store/actions/coins";
import { selectCoins } from "../../store/reducers/rootReducer";
export class Dashboard extends Component {
  static propTypes = {
    coinsList: PropTypes.array,
    fetchCoinsList: PropTypes.func
  };
  componentDidMount = () => {
    if (!this.props.userCoinsList) this.props.fetchCoinsList();
  };

  render() {
    const { coinsList } = this.props;
    return <div>{coinsList}</div>;
  }
}

const mapStateToProps = state => ({
  userCoinsList: state.user.coinsList
});

const mapDispatchToProps = dispatch => ({
  fetchCoinsList: () => dispatch(fetchCoinsList())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
