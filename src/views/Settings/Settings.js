import React from "react";
import { connect } from "react-redux";

import {
  setTheme,
  setBackground,
  setCustomBackground,
  toggleVintageFont,
  toggleScanLines,
  setScanLinesIntensity,
  setFontSize,
} from "../../store/actions/user";

import Layout from "./Layout";

const Settings = ({
  theme,
  setTheme,
  background,
  backgrounds,
  setBackground,
  setCustomBackground,
  scanLines,
  toggleScanLines,
  setScanLinesIntensity,
  scanLinesIntensity,
  vintageFont,
  toggleVintageFont,
  fontSize,
  setFontSize,
}) => (
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
    scanLines={scanLines}
    toggleScanLines={toggleScanLines}
    setScanLinesIntensity={setScanLinesIntensity}
    scanLinesIntensity={scanLinesIntensity}
  />
);

const mapStateToProps = (state) => ({
  theme: state.user.theme,
  background: state.user.background,
  backgrounds: state.user.backgrounds,
  vintageFont: state.user.vintageFont,
  scanLines: state.user.scanLines,
  scanLinesIntensity: state.user.scanLinesIntensity,
  fontSize: state.user.fontSize,
});

const mapDispatchToProps = (dispatch) => ({
  setTheme: (theme) => dispatch(setTheme(theme)),
  toggleVintageFont: (vintageFont) => dispatch(toggleVintageFont(vintageFont)),
  setFontSize: (fontSize) => dispatch(setFontSize(fontSize)),
  toggleScanLines: (scanLinesOn) => dispatch(toggleScanLines(scanLinesOn)),
  setScanLinesIntensity: (intensity) =>
    dispatch(setScanLinesIntensity(intensity)),
  setBackground: (background) => dispatch(setBackground(background)),
  setCustomBackground: (color) => dispatch(setCustomBackground(color)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
