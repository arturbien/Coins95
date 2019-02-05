import React from "react";
import "./Radio.css";
// import "./common.css";
import cx from "classnames";

const Radio = props => {
  const { onClick, text, name, value, checked } = props;
  const baseClass = "Radio";
  const rootClass = cx(baseClass, {
    checked: checked
  });
  return (
    <>
      <label class="container">
        One
        <input type="radio" checked="checked" name="radio" />
        <span class="checkmark" />
      </label>
      <label class="container">
        Two
        <input type="radio" name="radio" />
        <span class="checkmark" />
      </label>
      <label class="container">
        Three
        <input type="radio" name="radio" />
        <span class="checkmark" />
      </label>
      <label class="container">
        Four
        <input type="radio" name="radio" />
        <span class="checkmark" />
      </label>
    </>
  );
};

export default Radio;
