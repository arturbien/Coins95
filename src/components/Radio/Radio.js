import React from "react";
import PropTypes from "prop-types";

import "./Radio.css";
// import "./common.css";
import cx from "classnames";

const Radio = ({ onChange, disabled, label, value, checked, name }) => {
  const baseClass = "Radio";
  const rootClass = cx(baseClass, {
    [`${baseClass}--checked`]: checked,
    [`${baseClass}--disabled`]: disabled
  });
  return (
    <label className={`${rootClass}`}>
      {label}
      <input
        onChange={!disabled && onChange}
        className={`${baseClass}__input`}
        type="radio"
        value={value}
        checked={checked}
        name={name}
      />
      <span className={`${baseClass}__checkmark`} />
    </label>
  );
};

Radio.defaultProps = {
  checked: false,
  disabled: false,
  name: "",
  value: null,
  label: ""
};

Radio.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool,
  disabled: PropTypes.bool
};

export default Radio;
