import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { useLocation } from "react-router-dom";

import { Button } from "react95";

type Props = RouteComponentProps<{}> & {
  goBack: boolean;
  to: string;
  children: React.ReactNode;
};

const LinkButton = ({
  goBack,
  to,
  history,
  children,
  ...otherProps
}: Props) => {
  const location = useLocation<{ from: string }>();
  // if previous location is present then go back to it
  // otherwise go to main page
  const previousLocation = location.state ? location.state.from : "/";

  return (
    <Button
      onClick={() =>
        goBack ? history.push(previousLocation) : history.push(to)
      }
      {...otherProps}
    >
      {children}
    </Button>
  );
};
export default withRouter(LinkButton);
