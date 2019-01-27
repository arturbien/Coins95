import React from "react";
import AppBar from "../../components/AppBar/AppBar";
import Button from "../../components/Button/Button";
import Fab from "../../components/Fab/Fab";

import "./NavBar.css";

import ArticleIcon from "../../img/article.png";
import FolderIcon from "../../img/folder.png";
import GlobeIcon from "../../img/globe.png";
import NotepadIcon from "../../img/notepad.png";

const NavBar = props => {
  const baseClass = "NavBar";
  return (
    <AppBar className={baseClass}>
      <Button fullWidth size="l" active>
        <img className={"globeIcon"} src={GlobeIcon} />
      </Button>
      <Button fullWidth size="l">
        <img className={"articleIcon"} src={ArticleIcon} />
      </Button>
      <Button fullWidth size="l">
        <img className={"folderIcon"} src={FolderIcon} />
      </Button>
      <Button fullWidth size="l">
        <img className={"notepadIcon"} src={NotepadIcon} />
      </Button>
      <Fab>{"+"}</Fab>
    </AppBar>
  );
};

export default NavBar;
