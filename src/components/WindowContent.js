import React from "react";
import "./WindowContent.css";
import PropTypes from "prop-types";

import cx from "classnames";

const WindowContent = ({
  border,
  className,
  children,
  style,
  ...otherProps
}) => {
  const baseClass = "WindowContent";
  const rootClass = cx(baseClass, className, {
    [`${baseClass}--border`]: border
  });

  return (
    <div className={rootClass} style={style}>
      {children}
    </div>
  );
};

WindowContent.defaultProps = {
  border: false
};

WindowContent.propTypes = {
  border: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
};

export default WindowContent;
