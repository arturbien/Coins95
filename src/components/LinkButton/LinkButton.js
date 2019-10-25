import React from "react";
import { withRouter } from "react-router";
import { Button } from "react95";

const LinkButton = ({ goBack, to, history, children, ...otherProps }) => {
  return (
    <Button
      onClick={() => (goBack ? history.goBack() : history.push(to))}
      {...otherProps}
    >
      {children}
    </Button>
  );
};
export default withRouter(LinkButton);
