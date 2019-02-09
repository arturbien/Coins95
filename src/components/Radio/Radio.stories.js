import React from "react";
import { storiesOf } from "@storybook/react";

import Radio from "./Radio";

storiesOf("Radio", module)
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
  .add("default", () => <RadioGroup />);

class RadioGroup extends React.Component {
  state = {
    checkedValue: null
  };

  handleChange = e => this.setState({ checkedValue: e.target.value });

  render() {
    const { checkedValue } = this.state;
    return (
      <>
        <Radio
          checked={checkedValue === "bmw"}
          onChange={this.handleChange}
          value="bmw"
          label="bmw"
          name="cars"
        />
        <Radio
          checked={checkedValue === "volvo"}
          onChange={this.handleChange}
          value="volvo"
          label="volvo"
          name="cars"
        />
        <Radio
          checked={checkedValue === "audi"}
          onChange={this.handleChange}
          value="audi"
          label="audi"
          name="cars"
          disabled
        />
      </>
    );
  }
}
