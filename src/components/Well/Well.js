import styled, { css } from "styled-components";

export default styled.div`
  position: relative;
  padding: 0 0.25rem;
  height: 1.6rem;
  line-height: 1.6rem;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  border-top: 2px solid ${({ theme }) => theme.borderDark};
  border-left: 2px solid ${({ theme }) => theme.borderDark};
  border-bottom: 2px solid ${({ theme }) => theme.borderLightest};
  border-right: 2px solid ${({ theme }) => theme.borderLightest};

  ${({ draggable }) =>
    draggable &&
    css`
      flex-shrink: 0;
      min-width: 4.75rem;
      &:after {
        content: "";
        position: absolute;
        width: 2rem;
        bottom: -2px;
        right: -2px;
        width: 25px;
        height: 25px;
        border: 2px solid ${({ theme }) => theme.material};
        background-image: linear-gradient(
          135deg,
          ${({ theme }) => theme.borderLightest} 16.67%,
          ${({ theme }) => theme.material} 16.67%,
          ${({ theme }) => theme.material} 33.33%,
          ${({ theme }) => theme.borderDark} 33.33%,
          ${({ theme }) => theme.borderDark} 50%,
          ${({ theme }) => theme.borderLightest} 50%,
          ${({ theme }) => theme.borderLightest} 66.67%,
          ${({ theme }) => theme.material} 66.67%,
          ${({ theme }) => theme.material} 83.33%,
          ${({ theme }) => theme.borderDark} 83.33%,
          ${({ theme }) => theme.borderDark} 100%
        );
        background-size: 8.49px 8.49px;
        clip-path: polygon(100% 0, 0 100%, 100% 100%);
      }
    `}
`;
