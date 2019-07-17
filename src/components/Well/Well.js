import styled from "styled-components";

export default styled.div`
  padding: 0 0.25rem;
  height: 1.6rem;
  line-height: 1.6rem;

  border-top: 2px solid ${({ theme }) => theme.borderDark};
  border-left: 2px solid ${({ theme }) => theme.borderDark};
  border-bottom: 2px solid ${({ theme }) => theme.borderLightest};
  border-right: 2px solid ${({ theme }) => theme.borderLightest};
`;
