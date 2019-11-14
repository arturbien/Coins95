import React from "react";
import styled from "styled-components";
import useWindowSize from "../../hooks/useWindowSize";

const Viewport = styled.div`
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;

  overflow: hidden;
  box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.35);
`;
const ViewportContent = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
`;

export default ({ children, maxWidth = 450, maxHeight = 896 }) => {
  const [width, height] = useWindowSize();
  console.log(width, height);
  return (width > maxWidth && height > maxHeight) ||
    (width > maxWidth && width > height) ? (
    <Viewport
      style={{ width: maxWidth + "px", height: maxHeight + "px" }}
      id="swag"
    >
      <ViewportContent>{children}</ViewportContent>
    </Viewport>
  ) : (
    <>{children}</>
  );
};
