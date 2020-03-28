import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

import { List, ListItem } from "react95";

const SList = styled(List)`
  position: absolute;
  top: 100%;
  right: 0;
`
const Menu = ({ horizontalAlign, verticalAlign, trigger, items }) => {
  const [open, setOpen] = React.useState(false);

  function toggle() {
    setOpen(!open);
  }

  function handleClose() {
    setOpen(false);
  }

  const TriggerElement = trigger;
  const listItems = items.map((item, i) => (
    <ListItem key={i} onClick={item.onClick} size="lg">
      {item.label}
    </ListItem>
  ));
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {open && (
        <SList
          horizontalAlign={horizontalAlign}
          verticalAlign={verticalAlign}
          open={open}
          onClick={handleClose}
          style={{ zIndex: 1 }}
        >
          {listItems}
        </SList>
      )}
      <TriggerElement onClick={toggle} active={open} />
    </div>
  );
};

Menu.propTypes = {
  // trigger: propTypes.element,
  items: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string,
      onClick: propTypes.func
    })
  )
};

export default Menu;
