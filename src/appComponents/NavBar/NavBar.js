import React from "react";
import AppBar from "../../components/AppBar/AppBar";
import Button from "../../components/Button/Button";

import "./NavBar.css";

const NavBar = props => {
  const baseClass = "NavBar";
  return (
    <AppBar className={baseClass}>
      <Button fullWidth size="m">
        1
      </Button>
      <Button fullWidth size="m">
        2
      </Button>
      <Button fullWidth size="m">
        3
      </Button>
      <Button fullWidth size="m">
        4
      </Button>
    </AppBar>
  );
};

export default NavBar;
