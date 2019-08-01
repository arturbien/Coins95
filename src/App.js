import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import { createGlobalStyle, ThemeProvider } from "styled-components";
import { themes, reset } from "react95";

import woff2 from "./assets/fonts/MS-Sans-Serif.woff2";

import Dashboard from "./views/Dashboard/Dashboard";
import CoinDetails from "./views/CoinDetails/CoinDetails";
import CoinSearch from "./views/CoinSearch/CoinSearch";
import News from "./views/News/News";
import Settings from "./views/Settings/Settings";

import NavBar from "./components/NavBar/NavBar";
import { backgrounds } from "./store/reducers/user";
const ResetStyles = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'MS-Sans-Serif';
    src:  url('${woff2}') format('woff2');
  }
  html, body, #root {
    height: 100%;
    background: ${({ background }) => background};
    background-attachment: fixed;
    background-repeat: repeat;
    font-family: ${({ vintageFont }) =>
      vintageFont ? "MS-Sans-Serif" : "sans-serif"};
  }
  * {
      font-family: ${({ vintageFont }) =>
        vintageFont ? "MS-Sans-Serif" : "sans-serif"};
  }
  #root input {
      font-family: ${({ vintageFont }) =>
        vintageFont ? "MS-Sans-Serif" : "sans-serif"};
    
  }
  img {
        /* image-rendering: pixelated!important; */
  }
`;

class App extends Component {
  render() {
    const { theme, background, vintageFont } = this.props;
    return (
      <ThemeProvider theme={themes[theme]}>
        <>
          <ResetStyles
            vintageFont={vintageFont}
            background={backgrounds[background].value}
          />
          <BrowserRouter>
            <>
              <Switch>
                <Route exact path={"/coins/:coin"} component={null} />
                <Route exact path={"/search"} component={null} />
                <NavBar />
              </Switch>
              <Switch>
                <Route exact path={"/coins"} component={Dashboard} />
                <Route exact path={"/coins/:coin"} component={CoinDetails} />
                <Route exact path={"/search"} component={CoinSearch} />
                <Route exact path={"/news"} component={News} />
                <Route exact path={"/settings"} component={Settings} />
                <Redirect exact from={"/"} to={"/coins"} />
              </Switch>
            </>
          </BrowserRouter>
        </>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.user.theme,
  background: state.user.background,
  vintageFont: state.user.vintageFont
});
export default connect(
  mapStateToProps,
  null
)(App);
