import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import styled from "styled-components";
import ClippyIcon from "../../assets/img/clippy4.png";

// TODO: move that to css variable?
export const NavbarHeight = 80;

type Props = RouteComponentProps<{}>;

const NavBar = (props: Props) => {
  return (
    <Nav>
      <Fab />
    </Nav>
  );
};

export default withRouter(NavBar);

const Nav = styled.div`
  pointer-events: none;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  top: var(--safe-area-inset-top);
  bottom: auto;
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1rem;
  height: ${NavbarHeight}px;
`;

const Fab = styled.button`
  display: inline-block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #b96ac9;
  border-top: 4px solid #e980fc;
  border-left: 4px solid #e980fc;
  border-bottom: 4px solid #6f2dbd;
  border-right: 4px solid #6f2dbd;

  box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.45);

  &:after {
    content: "";
    display: inline-block;
    width: 100%;
    height: 100%;
    background-image: url(${ClippyIcon});
    background-size: 30px;
    background-repeat: no-repeat;
    filter: drop-shadow(1px 1px 0px #e980fc) drop-shadow(-1px -1px 0px #6f2dbd);
    background-position: center;
  }

  &:active {
    border-bottom: 4px solid #e980fc;
    border-right: 4px solid #e980fc;
    border-top: 4px solid #6f2dbd;
    border-left: 4px solid #6f2dbd;
    box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.55);

    &:after {
      background-position: 50% calc(50% + 2px);
    }
  }
`;
