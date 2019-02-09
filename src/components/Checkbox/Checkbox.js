import React from "react";
import PropTypes from "prop-types";

import "./Checkbox.css";
// import "./common.css";
import cx from "classnames";

const Checkbox = props => {
  const { onChange, label, value, checked, name } = props;
  const baseClass = "Checkbox";
  const rootClass = cx(baseClass, {
    [`${baseClass}--checked`]: checked
  });
  return (
    <label className={`${rootClass}`}>
      {label}
      <input
        onChange={onChange}
        className={`${baseClass}__input`}
        type="checkbox"
        value={value}
        checked={checked}
        name={name}
      />
      <span className={`${baseClass}__checkmark`} />
    </label>
  );
};

Checkbox.defaultProps = {
  checked: false,
  name: "",
  value: null,
  label: ""
};

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool
};

export default Checkbox;
