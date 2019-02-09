import React from "react";
import { storiesOf } from "@storybook/react";

import Checkbox from "./Checkbox";

storiesOf("Checkbox", module)
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
  .add("default", () => <CheckboxGroup />);

class CheckboxGroup extends React.Component {
  state = {
    meat: false,
    tortilla: false,
    pizza: false
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState(prevState => ({
      [value]: !prevState[value]
    }));
  };

  render() {
    const { meat, tortilla, pizza } = this.state;
    return (
      <>
        <Checkbox
          checked={meat}
          onChange={this.handleChange}
          value="meat"
          label="Meat 🥩"
          name="food"
        />
        <Checkbox
          checked={tortilla}
          onChange={this.handleChange}
          value="tortilla"
          label="Tortilla 🌯"
          name="food"
        />
        <Checkbox
          checked={pizza}
          onChange={this.handleChange}
          value="pizza"
          label="Pizza 🍕"
          name="food"
        />
      </>
    );
  }
}
