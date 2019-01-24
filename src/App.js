import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "./views/Dashboard/Dashboard";
import CoinDetails from "./views/CoinDetails/CoinDetails";

import NavBar from "./appComponents/NavBar/NavBar";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <NavBar />
          <Switch>
            <Route exact path={"/coins"} component={Dashboard} />
            <Route exact path={"/coins/:coin"} component={CoinDetails} />
            <Redirect exact from={"/"} to={"/coins"} />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
