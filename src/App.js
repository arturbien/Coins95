import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "./views/Dashboard/Dashboard";
import CoinDetails from "./views/CoinDetails/CoinDetails";
import News from "./views/News/News";
import Settings from "./views/Settings/Settings";

import NavBar from "./components/NavBar/NavBar";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Switch>
            <Route exact path={"/coins/:coin"} component={null} />
            <NavBar />
          </Switch>
          <Switch>
            <Route exact path={"/coins"} component={Dashboard} />
            <Route exact path={"/coins/:coin"} component={CoinDetails} />
            <Route exact path={"/news"} component={News} />
            <Route exact path={"/settings"} component={Settings} />
            <Redirect exact from={"/"} to={"/coins"} />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
