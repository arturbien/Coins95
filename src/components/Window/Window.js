import React from "react";
import PropTypes from "prop-types";

import "./Window.css";

import cx from "classnames";

const Window = ({ noShadow, className, children, ...otherProps }) => {
  const baseClass = "Window";
  const rootClass = cx(baseClass, className, {
    [`${baseClass}--noShadow`]: noShadow
  });
  return <section className={rootClass}>{children}</section>;
};

Window.defaultProps = {
  noShadow: false
};

Window.propTypes = {
  noShadow: PropTypes.bool,
  children: PropTypes.node
};

export default Window;
