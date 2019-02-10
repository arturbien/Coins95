import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./Cutout.css";

const Cutout = ({ className, children, noShadow, ...otherProps }) => {
  const baseClass = "Cutout";
  const rootClass = cx(baseClass, className, {
    [`${baseClass}--noShadow`]: noShadow
  });
  return (
    <div className={rootClass} {...otherProps}>
      {children}
    </div>
  );
};

Cutout.defaultProps = {
  noShadow: false
};

Cutout.propTypes = {
  noShadow: PropTypes.bool,
  children: PropTypes.node
};

export default Cutout;
