import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { useLocation } from "react-router-dom";

import { Button } from "react95";

// TODO: rethink the goBack/to prop since they're mutually exclusive
type Props = RouteComponentProps<{}> & {
  goBack: boolean;
  to?: string;
  children: React.ReactNode;
} & React.ComponentProps<typeof Button>;

// TODO: usehooks instead of withRouter?

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

  const onClick = () =>
    goBack ? history.push(previousLocation) : to ? history.push(to) : () => {};

  return (
    <Button onClick={onClick} {...otherProps}>
      {children}
    </Button>
  );
};
export default withRouter(LinkButton);
