import React, { Component } from "react";
// import propTypes from "prop-types";
import { connect } from "react-redux";

import {
  setTheme,
  setBackground,
  setCustomBackground,
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
      backgrounds,
      setBackground,
      setCustomBackground,
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
        backgrounds={backgrounds}
        setBackground={setBackground}
        setCustomBackground={setCustomBackground}
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
  backgrounds: state.user.backgrounds,
  vintageFont: state.user.vintageFont,
  fontSize: state.user.fontSize
});

const mapDispatchToProps = dispatch => ({
  setTheme: theme => dispatch(setTheme(theme)),
  toggleVintageFont: vintageFont => dispatch(toggleVintageFont(vintageFont)),
  setFontSize: fontSize => dispatch(setFontSize(fontSize)),
  setBackground: background => dispatch(setBackground(background)),
  setCustomBackground: color => dispatch(setCustomBackground(color))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
