//returns how much time passed since date/timestamp
import { css } from "styled-components";
export const timeSince = date => {
  var seconds = Math.floor(new Date().getTime() / 1000 - date);
  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

// top / bottom/ full
export const createMaterialStyles = (mode = "top") => css`
  position: relative;
  box-sizing: border-box;
  /* width: 100%;
  padding: 0.5rem; */
  background: ${({ theme }) => theme.material};
  border-top: ${({ theme }) =>
    ["top", "full"].includes(mode)
      ? `2px solid ${theme.borderLightest}`
      : "none"};
  padding: 2px;
  border-bottom: ${({ theme }) =>
    mode === "top" ? "none" : `2px solid ${theme.borderDarkest}`};
  border-left: 2px solid ${({ theme }) => theme.borderLightest};
  border-right: 2px solid ${({ theme }) => theme.borderDarkest};
  &:before {
    content: "";
    display: block;
    position: absolute;
    width: calc(100% - 4px);
    height: calc(100% - ${mode === "full" ? "4px" : "2px"});
    ${["top", "full"].includes(mode) ? "bottom: 0px" : "top: 0px"};
    left: 0;
    pointer-events: none;
    border-left: 2px solid ${({ theme }) => theme.borderLight};
    border-right: 2px solid ${({ theme }) => theme.borderDark};
    border-top: ${({ theme }) =>
      ["top", "full"].includes(mode)
        ? `2px solid ${theme.borderLight}`
        : "none"};
    border-bottom: ${({ theme }) =>
      mode === "top" ? "none" : `2px solid ${theme.borderDark}`};
  }
`;
