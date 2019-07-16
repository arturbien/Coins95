import React, { useState } from "react";
import styled from "styled-components";

import { Switch, Route } from "react-router";

import ClippyIcon from "../../img/clippy4.png";

const Clippy = ({ props }) => {
  const [isOpened, setIsOpened] = useState(true);
  return (
    <>
      {isOpened && (
        <Modal>
          <ModalBody>
            <Switch>
              <Route exact path={"/coins"} component={() => <h1>Swag</h1>} />
            </Switch>
          </ModalBody>
        </Modal>
      )}
      <Fab onClick={() => setIsOpened(!isOpened)} />
    </>
  );
};

export default Clippy;

const Modal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem 2rem 113px 2rem;
  background: rgba(0, 0, 0, 0.6);
`;
const ModalBody = styled.div`
  position: relative;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.borderDarkest};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.tooltip};
  box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.35);

  &:after {
    content: "";
    display: inline-block;
    position: fixed;
    bottom: 115px;
    left: 50%;
    transform: translate(-100%, 100%);
    width: 1.5rem;
    height: 1.5rem;
    clip-path: polygon(0.5rem 0, 100% 0, 100% 100%);

    border-right: 2px solid ${({ theme }) => theme.borderDarkest};
    background: ${({ theme }) => theme.tooltip};
    box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.35);
  }
`;
const Fab = styled.button`
  display: inline-block;
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 55px;
  left: 50%;
  transform: translate(-50%, 50%);
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
