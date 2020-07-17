import React, { Component, Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import { createGlobalStyle, ThemeProvider, css } from "styled-components";
import { styleReset } from "react95";

import original from "react95/dist/themes/original";
import rose from "react95/dist/themes/rose";
import rainyDay from "react95/dist/themes/rainyDay";
import travel from "react95/dist/themes/travel";
import marine from "react95/dist/themes/marine";
import olive from "react95/dist/themes/olive";
import theSixtiesUSA from "react95/dist/themes/theSixtiesUSA";
import candy from "react95/dist/themes/candy";
import tokyoDark from "react95/dist/themes/tokyoDark";
import vaporTeal from "react95/dist/themes/vaporTeal";

import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

import Viewport from "./components/Viewport/Viewport";
import NavBar from "./components/NavBar/NavBar";

const themes = {
  original,
  rose,
  rainyDay,
  travel,
  marine,
  olive,
  theSixtiesUSA,
  candy,
  tokyoDark,
  vaporTeal,
};
const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));
const CoinDetails = React.lazy(() => import("./views/CoinDetails/CoinDetails"));
const CoinSearch = React.lazy(() => import("./views/CoinSearch/CoinSearch"));
const Wallet = React.lazy(() => import("./views/Wallet/Wallet"));
const News = React.lazy(() => import("./views/News/News"));
const Settings = React.lazy(() => import("./views/Settings/Settings"));

const ResetStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  html {
    font-size: ${({ fontSize }) => `${fontSize * 16}px`};
  }
  html, body, #root {
    height: 100%;
    font-family: ${({ vintageFont }) =>
      vintageFont ? "ms_sans_serif" : "sans-serif"};
  }
  body {
    color: ${({ theme }) => theme.materialText};
    --safe-area-inset-bottom: constant(safe-area-inset-bottom); 
    --safe-area-inset-bottom: env(safe-area-inset-bottom);
    &:before {
      content: '';
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: var(--safe-area-inset-bottom);
      background: black;
      z-index: 9999999;
    }
    ${({ scanLines, scanLinesIntensity }) =>
      scanLines &&
      css`
        &:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 99999;
          opacity: 0.7;
          filter: alpha(opacity=70);
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          background-image: radial-gradient(
              ellipse at center,
              transparent 0,
              transparent 60%,
              rgba(0, 0, 0, ${(0.15 * scanLinesIntensity) / 100}) 100%
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 1px,
              rgba(0, 0, 0, ${(0.35 * scanLinesIntensity) / 100}) 3px
            );
          background-size: 100% 100%, 100% 6px;
          -webkit-animation: flicker 0.3s linear infinite;
          animation: flicker 0.3s linear infinite;
        }
      `} 
  }
  #background {
    position: fixed;
    z-index: -1;
    top: 0;
    bottom: 0;
    left:0;
    right: 0;
    height: 100vh;
    width: 100vw;
    background: ${({ background }) => background};
    background-attachment: fixed;
    background-repeat: repeat;
  }
  * {
      font-family: ${({ vintageFont }) =>
        vintageFont ? "ms_sans_serif" : "sans-serif"};
  }
  #root input {
      font-family: ${({ vintageFont }) =>
        vintageFont ? "ms_sans_serif" : "sans-serif"};
  }

  * {
    scrollbar-width: none
  }
  ::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
  /* Optional: show position indicator in red */
  ::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

class App extends Component {
  render() {
    const {
      theme,
      background,
      vintageFont,
      fontSize,
      scanLines,
      scanLinesIntensity,
    } = this.props;
    return (
      <Viewport>
        <ThemeProvider theme={themes[theme]}>
          <>
            <ResetStyles
              vintageFont={vintageFont}
              fontSize={fontSize}
              scanLines={scanLines}
              scanLinesIntensity={scanLinesIntensity}
              background={background.value}
            />
            <BrowserRouter>
              <>
                <Switch>
                  <Route exact path={"/coins/:coin"} component={null} />
                  <Route exact path={"/search"} component={null} />
                  <NavBar />
                </Switch>
                <Suspense fallback={null}>
                  <Switch>
                    <Route exact path={"/coins"} component={Dashboard} />
                    <Route
                      exact
                      path={"/coins/:coin"}
                      component={CoinDetails}
                    />
                    <Route exact path={"/search"} component={CoinSearch} />
                    <Route path={"/wallet/"} component={Wallet} />
                    <Route exact path={"/news"} component={News} />
                    <Route exact path={"/settings"} component={Settings} />
                    <Redirect exact from={"/"} to={"/coins"} />
                  </Switch>
                </Suspense>
              </>
            </BrowserRouter>
          </>
        </ThemeProvider>
      </Viewport>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.user.theme,
  background: state.user.background,
  vintageFont: state.user.vintageFont,
  fontSize: state.user.fontSize,
  scanLines: state.user.scanLines,
  scanLinesIntensity: state.user.scanLinesIntensity,
});
export default connect(mapStateToProps, null)(App);
