import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { createGlobalStyle, ThemeProvider } from "styled-components";
import { themes, reset } from "react95";

import woff2 from "./assets/fonts/MS-Sans-Serif.woff2";

import Dashboard from "./views/Dashboard/Dashboard";
import CoinDetails from "./views/CoinDetails/CoinDetails";
import CoinSearch from "./views/CoinSearch/CoinSearch";
import Wallet from "./views/Wallet/Wallet";
import News from "./views/News/News";
import Settings from "./views/Settings/Settings";

import NavBar from "./components/NavBar/NavBar";
import Phone from "./components/Phone/Phone";

import { backgrounds } from "./store/reducers/user";
const ResetStyles = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'MS-Sans-Serif';
    src:  url('${woff2}') format('woff2');
  }
  html, body, #root {
    height: 100%;
    background: teal;
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
        image-rendering: pixelated!important;
  }
  input[disabled],
  fieldset[disabled]  {

 -webkit-text-fill-color: unset;
  opacity: 1;
  }
`;

class App extends Component {
  render() {
    const { theme, background, vintageFont } = this.props;
    return (
      <ThemeProvider theme={themes[theme]}>
        <Phone
          style={{
            background: backgrounds[background].value,
            backgroundRepeat: "repeat"
          }}
        >
          <ResetStyles
            vintageFont={vintageFont}
            // background={backgrounds[background].value}
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
                <Route path={"/wallet/"} component={Wallet} />
                <Route exact path={"/news"} component={News} />
                <Route exact path={"/settings"} component={Settings} />
                <Redirect exact from={"/"} to={"/coins"} />
              </Switch>
            </>
          </BrowserRouter>
        </Phone>
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
