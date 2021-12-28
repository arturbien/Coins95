import React from "react";
import styled from "styled-components";
import useWindowSize from "../../hooks/useWindowSize";

type Props = React.ComponentProps<typeof ViewportWrapper>;

const Viewport = ({ children, maxWidth = 450, maxHeight = 896 }: Props) => {
  const [width, height] = useWindowSize();
  return width > maxWidth || height > maxHeight ? (
    <ViewportWrapper maxWidth={maxWidth} maxHeight={maxHeight} id="device">
      <ViewportContent>{children}</ViewportContent>
    </ViewportWrapper>
  ) : (
    <>
      {children}
      <BottomCornersCover />
    </>
  );
};

export default Viewport;

const ViewportWrapper = styled.div<{ maxHeight: number; maxWidth: number }>`
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: ${({ maxHeight }) => maxHeight}px;
  width: ${({ maxWidth }) => maxWidth}px;
  max-height: 100%;
  max-width: 100%;

  overflow: hidden;
  overflow: visible;

  @media only screen and (min-width: 450px) and (min-height: 600px) {
    position: fixed;
    right: 0;
    left: auto;
    top: 0;
    height: 100%;
    transform: none;
    height: auto;
    width: 300px;
    height: -webkit-fill-available;
    max-width: 100%;

    overflow: hidden;
    overflow: visible;
  }
`;
const ViewportContent = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
`;
const BottomCornersCover = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
  background: black;
  z-index: 999;
  height: 0;
  height: var(--safe-area-inset-bottom);
`;
