import styled from "styled-components";

export default styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;

  height: 100%;
  height: calc(100% - var(--safe-area-inset-bottom));

  background-color: rgba(0, 0, 0, 0.35);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
`;
