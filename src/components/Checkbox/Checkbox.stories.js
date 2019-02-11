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
    steak: false,
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
    const { steak, tortilla, pizza } = this.state;
    return (
      <>
        <Checkbox
          checked={steak}
          onChange={this.handleChange}
          value="steak"
          label="Steak 🥩"
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
          disabled
        />
      </>
    );
  }
}
