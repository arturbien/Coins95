import React from "react";
import styled from "styled-components";
import useWindowSize from "../../hooks/useWindowSize";
import iPhoneImage from "../../assets/img/iphone.png";

type Props = React.ComponentProps<typeof Viewport>;

export default ({ children, maxWidth = 450, maxHeight = 896 }: Props) => {
  const [width, height] = useWindowSize();
  return width > maxWidth || height > maxHeight ? (
    <Viewport maxWidth={maxWidth} maxHeight={maxHeight} id="device">
      <ViewportContent>{children}</ViewportContent>
    </Viewport>
  ) : (
    <>
      {children}
      <BottomCornersCover />
    </>
  );
};

const Viewport = styled.div<{ maxHeight: number; maxWidth: number }>`
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: ${({ maxHeight }) => maxHeight}px;
  width: ${({ maxWidth }) => maxWidth}px;

  @media only screen and (min-width: 450px) and (min-height: 600px) {
    height: 680px;
    width: 400px;
    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      pointer-events: none;
    }
    &:before {
      box-sizing: content-box;
      border-bottom: 70px solid black;
      border-top: 70px solid black;
      height: 100%;
      width: 100%;
      border-radius: 56px;
      box-shadow: 14px 4px 24px 18px rgba(0, 0, 0, 0.5);
    }
    &:after {
      z-index: 99999;
      transform: translate(-50%, -50%);
      height: 852px;
      width: 461px;
      background: url(${iPhoneImage});
      background-size: cover;
    }
  }
  max-height: 100%;
  max-width: 100%;

  overflow: hidden;
  box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.35);

  overflow: visible;
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
