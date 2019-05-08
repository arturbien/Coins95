import React from "react";
import { withRouter } from "react-router-dom";

import styled from "styled-components";

import Fab from "../../components/Fab/Fab";

import { AppBar, Button, Toolbar } from "react95";

import ArticleIcon from "../../img/article.png";
import FolderIcon from "../../img/folder.png";
import GlobeIcon from "../../img/globe.png";
import NotepadIcon from "../../img/notepad.png";

const SAppBar = styled(AppBar)`
  top: auto;
  bottom: 0;
  z-index: 666;
`;
const Icon = styled.img`
  height: 25px;
  filter: ${({ active }) => (active ? "none" : "grayscale(1)")};
`;

const SButton = styled(Button)`
  margin: 0 1px;

  ${({active}) => active && `
    background: url(
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIElEQVQYV2P8////fwYGBgZGRkZGMI0hABIFAbgEugAAQFQP/QfjEPcAAAAASUVORK5CYII=
    ) repeat;
  `}
`;
const SToolbar = styled(Toolbar)`
  margin: 0 -1px;
`;
const NavBar = props => {
  console.log(props);
  const currentLocation = props.location.pathname;
  return (
    <SAppBar fixed>
      <SToolbar>
        <SButton
          active={currentLocation === "/coins"}
          onClick={() => props.history.push("/coins")}
          fullWidth
          size="lg"
        >
          <Icon
            active={currentLocation === "/coins"}
            src={GlobeIcon}
            alt="icon"
          />
        </SButton>
        <SButton
          active={currentLocation === "/news"}
          onClick={() => props.history.push("/news")}
          fullWidth
          size="lg"
        >
          <Icon
            active={currentLocation === "/news"}
            src={ArticleIcon}
            alt="icon"
          />
        </SButton>
        <SButton fullWidth size="lg">
          <Icon src={FolderIcon} alt="icon" />
        </SButton>
        <SButton fullWidth size="lg">
          <Icon src={NotepadIcon} alt="icon" />
        </SButton>
      </SToolbar>
      <Fab>{"+"}</Fab>
    </SAppBar>
  );
};

export default withRouter(NavBar);
