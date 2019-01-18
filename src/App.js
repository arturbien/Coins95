import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path={"/"} component={Dashboard} />
      </BrowserRouter>
    );
  }
}

export default App;
