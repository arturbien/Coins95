import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import store from "./store";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { themes, reset } from "react95";

const ResetStyles = createGlobalStyle`
  ${reset}
  html, body, #root {
    height: 100%;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={themes.default}>
      <>
        <ResetStyles />
        <App />
      </>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
