import styled from "styled-components";
import Well from "../Well/Well";

export default styled.div`
  display: flex;
  flex-wrap: no-wrap;
  ${Well}:not(:last-child) {
    width: 100%;
    margin-right: 2px;
  }
`;
