import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import ListItem from "./ListItem";
import List from "../List/List";

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

storiesOf("ListItem", module)
  .addDecorator(story => (
    <div
      style={{
        padding: "5rem",
        background: "teal"
      }}
    >
      {story()}
    </div>
  ))
  .add("default", () => (
    <List>
      <ListItem {...actions}>Item 1</ListItem>
      <ListItem {...actions}>Item 2</ListItem>
      <ListItem {...actions}>Item 3</ListItem>
    </List>
  ))
  .add("disabled", () => (
    <List>
      <ListItem {...actions} disabled>
        disabled
      </ListItem>
      <ListItem {...actions} disabled>
        disabled
      </ListItem>
      <ListItem {...actions} disabled>
        disabled
      </ListItem>
    </List>
  ))
  .add("square", () => (
    <List>
      <ListItem {...actions} square>
        😎
      </ListItem>
      <ListItem {...actions} square>
        🤖
      </ListItem>
      <ListItem {...actions} square>
        🎁
      </ListItem>
    </List>
  ));
