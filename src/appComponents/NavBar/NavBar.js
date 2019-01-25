import React from "react";
import AppBar from "../../components/AppBar/AppBar";
import Button from "../../components/Button/Button";

import "./NavBar.css";

const NavBar = props => {
  const baseClass = "NavBar";
  return (
    <AppBar className={baseClass}>
      <Button fullWidth size="l">
        1
      </Button>
      <Button fullWidth size="l">
        2
      </Button>
      <Button fullWidth size="l">
        3
      </Button>
      <Button fullWidth size="l">
        4
      </Button>
    </AppBar>
  );
};

export default NavBar;
