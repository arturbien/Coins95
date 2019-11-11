import styled from "styled-components";

export default styled.span`
  position: relative;
  display: inline-block;
  width: 3px;
  height: 3px;

  transform: rotateZ(${({ horizontal }) => (horizontal ? "90deg" : "0deg")});
  background: ${({ theme }) => theme.text};
  &:after,
  &:before {
    content: "";
    position: absolute;
    left: 0;
    display: inline-block;
    width: 3px;
    height: 3px;

    background: ${({ theme }) => theme.text};
  }
  &:after {
    top: -6px;
  }
  &:before {
    top: 6px;
  }
`;
