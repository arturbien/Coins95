import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Select from "./Select";

export const actions = { onClick: action("onClick") };

const items = [
  { value: "volvo", title: "Volvo" },
  { value: "BMW", title: "BMW" }
];
const onSelect = value => console.log(value);
storiesOf("Select", module)
  .addDecorator(story => (
    <div
      style={{
        padding: "5rem",
        background: "#ced0cf"
      }}
    >
      {story()}
    </div>
  ))
  .add("default", () => <Select items={items} onSelect={onSelect} />)
  .add("noShadow", () => <Select noShadow items={items} onSelect={onSelect} />)
  .add("fullWidth", () => (
    <Select fullWidth items={items} onSelect={onSelect} />
  ));
