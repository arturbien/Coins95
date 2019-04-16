import React from "react";
import Fab from "../../components/Fab/Fab";

import styled from "styled-components";
import { AppBar, Button, Toolbar } from "react95";

import ArticleIcon from "../../img/article.png";
import FolderIcon from "../../img/folder.png";
import GlobeIcon from "../../img/globe.png";
import NotepadIcon from "../../img/notepad.png";

const SAppBar = styled(AppBar)`
  top: auto;
  bottom: 0;
  z-index: 1;
`;
const Icon = styled.img`
  height: 25px;
  filter: grayscale(1);
`;
const NavBar = props => (
  <SAppBar fixed>
    <Toolbar>
      <Button fullWidth size="lg" active>
        <Icon src={GlobeIcon} alt="icon" />
      </Button>
      <Button fullWidth size="lg">
        <Icon src={ArticleIcon} alt="icon" />
      </Button>
      <Button fullWidth size="lg">
        <Icon src={FolderIcon} alt="icon" />
      </Button>
      <Button fullWidth size="lg">
        <Icon src={NotepadIcon} alt="icon" />
      </Button>
    </Toolbar>
    <Fab>{"+"}</Fab>
  </SAppBar>
);

export default NavBar;
