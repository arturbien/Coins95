import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./TextField.css";

const TextField = ({
  onChange,
  value,
  disabled,
  name,
  width,
  className,
  type
}) => {
  const baseClass = "TextField";
  const rootClass = cx(baseClass, {
    [`${baseClass}--disabled`]: disabled
  });
  return (
    <div
      className={cx(`${baseClass}-wrapper`, className)}
      style={{ width: width ? width : "auto" }}
    >
      <input
        onChange={disabled ? undefined : onChange}
        readOnly={disabled}
        value={value}
        name={name}
        className={rootClass}
        type={type}
      />
    </div>
  );
};

TextField.defaultProps = {
  value: "",
  disabled: false
};
TextField.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  disabled: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(["text", "number"])
};
export default TextField;
