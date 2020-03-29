import React from "react";
import { withRouter } from "react-router-dom";

import styled from "styled-components";

import Clippy from "../Clippy/Clippy";

import { AppBar, Button, Toolbar } from "react95";

import GearsIcon from "../../assets/img/emblem-system.png";
import WorldIcon from "../../assets/img/worldIcon.png";
import UserIcon from "../../assets/img/avatar-default.png";
import HomeIcon from "../../assets/img/homeIcon.png";

const NavBar = props => {
  const currentLocation = props.location.pathname;
  return (
    <Nav fixed>
      <SToolbar>
        <SwitchButton
          active={currentLocation === "/coins"}
          onClick={() => props.history.push("/coins")}
          fullWidth
          size="lg"
        >
          <Icon
            active={currentLocation === "/coins"}
            src={HomeIcon}
            alt="icon"
          />
        </SwitchButton>
        <SwitchButton
          active={currentLocation.startsWith("/wallet")}
          onClick={() => props.history.push("/wallet")}
          fullWidth
          size="lg"
        >
          <Icon
            style={{ height: 21, opacity: 0.9 }}
            active={currentLocation === "/wallet"}
            src={UserIcon}
            alt="icon"
          />
        </SwitchButton>
        <SwitchButton
          active={currentLocation === "/news"}
          onClick={() => props.history.push("/news")}
          fullWidth
          size="lg"
        >
          <Icon
            active={currentLocation === "/news"}
            src={WorldIcon}
            alt="icon"
          />
        </SwitchButton>
        <SwitchButton
          active={currentLocation === "/settings"}
          onClick={() => props.history.push("/settings")}
          fullWidth
          size="lg"
        >
          <Icon src={GearsIcon} alt="icon" style={{ height: 30 }} />
        </SwitchButton>
      </SToolbar>
      <Clippy />
    </Nav>
  );
};

export default withRouter(NavBar);

const Nav = styled(AppBar)`
  top: auto;
  bottom: 0;
  z-index: 2;
  bottom: var(--safe-area-inset-bottom); 
`;
const Icon = styled.img`
  /* image-rendering: pixelated; */
  filter: grayscale(1);
  height: 24px;
`;

const SwitchButton = styled(Button)`
  margin: 0 1px;
`;
const SToolbar = styled(Toolbar)`
  margin: 0 -1px;
`;
