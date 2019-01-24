import React from "react";
import "./WindowHeader.css";
import "./common.css";

import classNames from "classnames";

const WindowHeader = props => {
  const { text, gray } = props;
  const style = classNames("WindowHeader", { gray: gray });
  return <header className={style}>{text}</header>;
};
export default WindowHeader;
