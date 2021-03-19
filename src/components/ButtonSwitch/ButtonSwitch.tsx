import React from "react";
import styled from "styled-components";

import { Button } from "react95";

type Size = "sm" | "md" | "lg";

type ButtonShape = {
  onClick: () => void;
  active: boolean;
  size: Size;
  label: React.ReactNode;
};

type Props = {
  size: Size;
  buttons: ButtonShape[];
};

const ButtonSwitch = ({ buttons, size = "sm", ...otherProps }: Props) => {
  return (
    <Switch {...otherProps}>
      {buttons.map((btn, i) => (
        <SwitchButton
          onClick={btn.onClick}
          active={btn.active}
          size={size}
          key={i}
          fullWidth
        >
          {btn.label}
        </SwitchButton>
      ))}
    </Switch>
  );
};

export default ButtonSwitch;

let Switch = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem -1px;
  flex-shrink: 0;
`;

let SwitchButton = styled(Button)`
  margin: 0 1px;
`;
