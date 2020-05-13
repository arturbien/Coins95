import React, { useState } from "react";
import styled, {ThemeProvider} from "styled-components";

import { Switch, Route, withRouter } from "react-router";

import { Button, Radio, Fieldset, themes } from "react95";

import ClippyIcon from "../../assets/img/clippy4.png";
import CryingEmoji from "../../assets/img/emojis/32/face-crying.png";

const Emoji = styled.img`
  display: inline-block;
  height: 23px;
  width: 23px;
`;
const actions = [
  {
    label: 'One time donation via PayPal',
    value: 'https://www.paypal.me/react95'
  },
  { 
    label: 'Support on Patreon',
    value: 'https://www.patreon.com/arturbien'
  },
  { 
    label: 'Share on Twitter',
    value: 'https://twitter.com/intent/tweet?url=https%3A%2F%2Fcoins95.web.app%2F&text=This%20is%20the%20cutest%20app%20I%20have%20ever%20seen!%20%E2%99%A5%EF%B8%8F'
  }
];
const Clippy = props => {
  const [isOpened, setIsOpened] = useState(false);
  const [action, setAction] = useState(actions[0].value);

  const handleChange = e => {
    setAction(e.target.value);
  }
  return (
    <ThemeProvider theme={themes.default}>
      {isOpened && (
        <Modal onClick={() => setIsOpened(false)}>
          <ModalBody onClick={e => e.stopPropagation()}>
            <Switch>
              <Route
                path={"/"}
                component={() => (
                  <>
                    <h3
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.1em"
                      }}
                    >
                      Clippy is dead  <Emoji src={CryingEmoji} />
                    </h3>
                    <p style={{lineHeight:'1.5', margin: '1rem 0 2rem'}}>I'm trying to bring it back to life.
                    <br />I've spent couple of months working on this app and I am not even interested in crypto. If you like what you see, show some love.
                    </p>
                    <Fieldset label="Actions:" variant="flat">
                      {actions.map(o => <><Radio {...o} onChange={handleChange} checked={action===o.value} variant="flat"/><br/></>)}
              
                    </Fieldset>
                    <br />
                    <Button
                     as="a"
                     href={action}
                      variant="flat"
                      primary
                      fullWidth
                      // onClick={() => window.location.replace(action)}
                    >
                      Continue
                    </Button>
                  </>
                )}
              />
            </Switch>
          </ModalBody>
        </Modal>
      )}
      <Fab onClick={() => setIsOpened(!isOpened)} />
    </ThemeProvider>
  );
};

export default withRouter(Clippy);

const Modal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
  top: 0;
  bottom: var(--safe-area-inset-bottom);
  left: 0;
  right: 0;
  padding: 2rem 2rem 113px 2rem;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
`;
const ModalBody = styled.div`
  position: relative;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.borderDarkest};
  color: ${({ theme }) => theme.materialText};

  border-radius: 0.5rem;
  background: ${({ theme }) => theme.tooltip};
  filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.55));

  &:after {
    content: "";
    display: inline-block;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-100%, 100%);
    width: 1.5rem;
    height: 1.5rem;
    clip-path: polygon(0.5rem 0, 100% 0, 100% 100%);

    border-right: 2px solid ${({ theme }) => theme.borderDarkest};
    background: ${({ theme }) => theme.tooltip};
  }
`;
const Fab = styled.button`
  display: inline-block;
  width: 60px;
  height: 60px;
  position: absolute;
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
