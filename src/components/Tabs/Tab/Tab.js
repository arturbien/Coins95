import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./Tab.css";

const Tab = ({
  value,
  onClick,
  active,
  first,
  last,
  children,
  className,
  style,
  ...otherProps
}) => {
  const baseClass = "Tab";
  const rootClass = cx(baseClass, className, {
    [`${baseClass}--active`]: active,
    [`${baseClass}--first`]: first,
    [`${baseClass}--last`]: last
  });

  return (
    <div
      className={rootClass}
      style={style}
      {...otherProps}
      onClick={() => onClick(value)}
    >
      {children}
    </div>
  );
};

Tab.defaultProps = {};

Tab.propTypes = {
  value: PropTypes.number,
  active: PropTypes.bool,
  first: PropTypes.bool,
  last: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node
};
export default Tab;
