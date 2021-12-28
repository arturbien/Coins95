import React from "react";
// iOS Safari doesn't support native .scrollIntoView({ behavior: 'smooth'})
// import propTypes from "prop-types";
import styled from "styled-components";
import { NavbarHeight } from "../../components/NavBar/NavBar";
import type { CardTypes } from "./Card";

export type AddStepHandler = (card: CardTypes) => void;

export type GoBackHandler = () => void;

export type StepComponent = (
  props: React.ComponentProps<typeof StepContent> & {
    onAddStep?: AddStepHandler;
    goBack?: GoBackHandler;
  }
) => JSX.Element;

const StepContent = styled.div<{ fullHeight?: boolean }>`
  position: relative;
  box-sizing: border-box;

  height: ${(p) => (p.fullHeight ? "100%" : "auto")};
  max-height: 100%;
  // overflow scroll or auto?
  overflow-y: auto;
  overscroll-behavior-y: none;

  display: flex;
  flex-direction: column;
`;

// fills entire Step height
// pulls step content to the bottom
const StepInner = styled.div`
  box-sizing: border-box;

  flex: 1;
  border-top-width: ${NavbarHeight}px;
  border-top-style: solid;
  border-color: transparent;

  justify-content: flex-end;
  display: flex;
  flex-direction: column;
`;

/**
 * - Step is a part of flow path.
 * - Step is generally a container for Cards
 * - Step is never bigger taller the viewport. When its content is bigger than the viewport, step will become scrollable
 * - When step is not the active step, its scroll position should be locked, as user should not be able to scroll previous cards
 * - Since card is always locked in the flow path, on mobile browsers users might want to scroll up (elastic scroll)
 *   in that case animate previous card with it so that everything looks like a continuous surface
 * - TODO: scroll snapping when user is close to the scroll end (make it not possible to be ALMOST close to scroll)
 * @param param0
 * @returns
 */
const Step = ({
  children,
  ...otherProps
}: React.ComponentProps<typeof StepContent>) => {
  const ref = React.useRef<null | HTMLDivElement>(null);

  return (
    <StepContent ref={ref} {...otherProps}>
      <StepInner>{children}</StepInner>
    </StepContent>
  );
};

export default Step;
