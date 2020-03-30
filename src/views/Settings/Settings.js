import React, { Component } from "react";
// import propTypes from "prop-types";
import { connect } from "react-redux";

import {
  setTheme,
  setBackground,
  toggleVintageFont,
  setFontSize
} from "../../store/actions/user";

import Layout from "./Layout";
export class Settings extends Component {
  // static propTypes = {
  //   prop: propTypes
  // };

  render() {
    const {
      theme,
      setTheme,
      background,
      setBackground,
      vintageFont,
      toggleVintageFont,
      fontSize,
      setFontSize
    } = this.props;
    return (
      <Layout
        theme={theme}
        setTheme={setTheme}
        background={background}
        setBackground={setBackground}
        vintageFont={vintageFont}
        toggleVintageFont={toggleVintageFont}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
    );
  }
}

const mapStateToProps = state => ({
  theme: state.user.theme,
  background: state.user.background,
  vintageFont: state.user.vintageFont,
  fontSize: state.user.fontSize
});

const mapDispatchToProps = dispatch => ({
  setTheme: theme => dispatch(setTheme(theme)),
  toggleVintageFont: vintageFont => dispatch(toggleVintageFont(vintageFont)),
  setFontSize: fontSize => dispatch(setFontSize(fontSize)),
  setBackground: backgroundIndex => dispatch(setBackground(backgroundIndex)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
