import styled from "styled-components";
import { Table } from "react95";
export default styled(Table)`
  display: flex;
  flex-direction: column;
  height: 100%;
  -webkit-overflow-scrolling: touch;

  thead,
  tbody,
  tr,
  th,
  td {
    display: block;
  }

  thead {
    flex-shrink: 0;
  }
  tbody {
    height: 100%;
    overflow-y: scroll;
  }

  tr {
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.borderLight};
  }
  tr:hover th {
    color: ${({ theme }) => theme.materialText};
  }
  th,
  td {
    flex-shrink: 0 !important;
    box-sizing: border-box;
  }
  td:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.borderLight};
  }
  td {
    cursor: pointer;
  }
`;
