import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import AppBar from "./AppBar";

const props = {
  type: "button",
  onClick: null,
  style: {},
  disabled: false,
  fullWidth: false,
  size: "m",
  square: false,
  active: false
};

export const actions = { onClick: action("onClick") };

storiesOf("AppBar", module).add("default", () => <AppBar />);
