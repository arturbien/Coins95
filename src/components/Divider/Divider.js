import React from "react";
import "./Divider.css";
import cx from "classnames";

const Divider = () => {
  const rootClass = cx("Divider");
  return <hr className={rootClass} />;
};

export default Divider;
