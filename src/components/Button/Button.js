import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./Button.css";

const Button = ({
  type,
  size,
  onClick,
  className,
  style,
  disabled,
  active,
  children,
  fullWidth,
  square,
  ...otherProps
}) => {
  const baseClass = "Button";

  const rootClass = cx(baseClass, className, {
    // [`${baseClass}-group__button`]: isGroup || group,
    // [`${baseClass}--block`]: isBlock,
    [`${baseClass}--${size}`]: size,
    [`${baseClass}--disabled`]: disabled,
    [`${baseClass}--active`]: active,
    [`${baseClass}--fullWidth`]: fullWidth && !square,
    [`${baseClass}--square`]: square
  });

  return (
    <button
      className={rootClass}
      type={type}
      style={style}
      onClick={!disabled && onClick}
      {...otherProps}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  onClick: null,
  style: {},
  disabled: false,
  fullWidth: false,
  size: "m",
  square: false,
  active: false
};

Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(["s", "m", "l", "xl"]),
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  fullWidth: PropTypes.bool,
  square: PropTypes.bool,
  children: PropTypes.node
};

export default Button;
