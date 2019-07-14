import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import { Button } from "react95";

const ButtonSwitch = ({ buttons, size, ...otherProps }) => {
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

ButtonSwitch.defaultProps = {
  size: "sm"
};
ButtonSwitch.propTypes = {
  buttons: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.node,
      onClick: propTypes.func,
      active: propTypes.bool
    })
  ),
  size: propTypes.oneOf(["sm", "md", "lg"])
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
