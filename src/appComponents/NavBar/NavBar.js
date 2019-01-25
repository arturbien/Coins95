import React from "react";
import AppBar from "../../components/AppBar/AppBar";
import Button from "../../components/Button/Button";
import Fab from "../../components/Fab/Fab";

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
      <Fab>{"+"}</Fab>
    </AppBar>
  );
};

export default NavBar;
