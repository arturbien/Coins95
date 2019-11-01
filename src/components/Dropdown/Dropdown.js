import React from "react";
import propTypes from "prop-types";

import { List, ListItem } from "react95";

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
        <List
          horizontalAlign={horizontalAlign}
          verticalAlign={verticalAlign}
          open={open}
          onClick={handleClose}
          style={{ zIndex: 1 }}
        >
          {listItems}
        </List>
      )}
      <TriggerElement onClick={toggle} active={open} />
    </div>
  );
};

Menu.propTypes = {
  horizontalAlign: propTypes.oneOf(["left", "right"]),
  verticalAlign: propTypes.oneOf(["top", "bottom"]),
  // trigger: propTypes.element,
  items: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string,
      onClick: propTypes.func
    })
  )
};

export default Menu;
