import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  display: inline-block;
  box-sizing: border-box;
  height: 5px;
  width: 100%;
  border-top: 2px solid ${({ theme }) => theme.borderLightest};
  border-left: 2px solid ${({ theme }) => theme.borderLightest};
  border-bottom: 2px solid ${({ theme }) => theme.borderDark};
  border-right: 2px solid ${({ theme }) => theme.borderDark};
  background: ${({ theme }) => theme.material};
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 0.75rem 0.25rem;
  width: 27px;
  margin-right: 0.5rem;
  cursor: grab;
`;

type Props = React.ComponentProps<typeof Wrapper>;

export default (props: Props) => (
  <Wrapper {...props}>
    <Bar />
    <Bar />
    <Bar />
  </Wrapper>
);
