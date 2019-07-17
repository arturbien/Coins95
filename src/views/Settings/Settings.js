import React, { Component } from "react";
// import propTypes from "prop-types";
import { connect } from "react-redux";

import { setTheme, toggleVintageFont } from "../../store/actions/user";

import Layout from "./Layout";

export class Settings extends Component {
  // static propTypes = {
  //   prop: propTypes
  // };

  render() {
    const { theme, setTheme, vintageFont, toggleVintageFont } = this.props;
    return (
      <Layout
        theme={theme}
        setTheme={setTheme}
        vintageFont={vintageFont}
        toggleVintageFont={toggleVintageFont}
      />
    );
  }
}

const mapStateToProps = state => ({
  theme: state.user.theme,
  vintageFont: state.user.vintageFont
});

const mapDispatchToProps = dispatch => ({
  setTheme: theme => dispatch(setTheme(theme)),
  toggleVintageFont: vintageFont => dispatch(toggleVintageFont(vintageFont))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
