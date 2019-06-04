import React from "react";
import propTypes from "prop-types";

import { withRouter } from "react-router-dom";

import styled from "styled-components";
import {
  Cutout,
  Fieldset,
  Toolbar,
  Button,
  WindowHeader,
  Window,
  WindowContent,
  Divider,
  Select,
  TextField,
  Checkbox,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableDataCell
} from "react95";

import FileIcon from "../../components/FileIcon/FileIcon";

const SFileIcon = styled(FileIcon)`
  margin-right: 6px;
`;
let CoinsTableWrapper = styled.div`
  flex: 1;
  margin-top: 1rem;
  & > div {
    height: 100%;
  }
`;
const ScrollTable = styled(Table)`
  display: flex;
  flex-direction: column;
  height: 100%;
  thead,
  tbody,
  tr,
  th,
  td {
    display: block;
  }
  th,
  td {
    flex-shrink: 0 !important;
  }
  tr {
    display: flex;
  }
  th:nth-child(1),
  td:nth-child(1) {
    flex: 4;
  }
  td:nth-child(1) {
    display: flex;
    align-items: center;
  }
  th:nth-child(2),
  td:nth-child(2) {
    flex: 2;
    text-align: center;
  }
  th:nth-child(3),
  td:nth-child(3) {
    flex: 1.5;
  }
  td:nth-child(3) {
    border-left: 2px solid ${({ theme }) => theme.borderLight};
    background: white;
    text-align: center;
  }
  thead {
    flex-shrink: 0;
  }
  tbody {
    height: 200px;
    flex: 1;
    overflow: auto;
  }
`;

const Layout = ({ ...otherProps }) => {
  return (
    <SWindow>
      <SWindowHeader>
        🔎 Search
        <Button
          square
          size="sm"
          style={{
            position: "absolute",
            right: "7px",
            top: "5px",
            fontWeight: "bold"
          }}
          onClick={() => otherProps.history.goBack()}
        >
          X
        </Button>
      </SWindowHeader>
      <SWindowContent>
        <Toolbar>
          <TextField
            placeholder="Search..."
            defaultValue=""
            width="100%"
            style={{ marginRight: "4px" }}
          />
          <Button>Clear</Button>
        </Toolbar>
        <CoinsTableWrapper>
          <ScrollTable>
            <TableHead>
              <TableRow>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Rank</TableHeadCell>
                <TableHeadCell>🎆</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableDataCell>
                  <SFileIcon
                    height={22}
                    imageURL={
                      "https://www.cryptocompare.com/media/19633/btc.png"
                    }
                  />
                  bitcoin.btc
                </TableDataCell>
                <TableDataCell>1</TableDataCell>
                <TableDataCell>
                  <Checkbox defaultChecked={true} variant="flat" />
                </TableDataCell>
              </TableRow>
              <TableRow>
                <TableDataCell>
                  <SFileIcon
                    height={22}
                    imageURL={
                      "https://www.cryptocompare.com/media/19633/btc.png"
                    }
                  />
                  bitcoin.btc
                </TableDataCell>
                <TableDataCell>1</TableDataCell>
                <TableDataCell>
                  <Checkbox defaultChecked={true} variant="flat" />
                </TableDataCell>
              </TableRow>
              <TableRow>
                <TableDataCell>
                  <SFileIcon
                    height={22}
                    imageURL={
                      "https://www.cryptocompare.com/media/19633/btc.png"
                    }
                  />
                  bitcoin.btc
                </TableDataCell>
                <TableDataCell>1</TableDataCell>
                <TableDataCell>
                  <Checkbox defaultChecked={true} variant="flat" />
                </TableDataCell>
              </TableRow>
              <TableRow>
                <TableDataCell>
                  <SFileIcon
                    height={22}
                    imageURL={
                      "https://www.cryptocompare.com/media/19633/btc.png"
                    }
                  />
                  bitcoin.btc
                </TableDataCell>
                <TableDataCell>1</TableDataCell>
                <TableDataCell>
                  <Checkbox defaultChecked={true} variant="flat" />
                </TableDataCell>
              </TableRow>
              <TableRow>
                <TableDataCell>
                  <SFileIcon
                    height={22}
                    imageURL={
                      "https://www.cryptocompare.com/media/19633/btc.png"
                    }
                  />
                  bitcoin.btc
                </TableDataCell>
                <TableDataCell>1</TableDataCell>
                <TableDataCell>
                  <Checkbox defaultChecked={true} variant="flat" />
                </TableDataCell>
              </TableRow>
            </TableBody>
          </ScrollTable>
        </CoinsTableWrapper>
      </SWindowContent>
    </SWindow>
  );
};

export default withRouter(Layout);

let SWindow = styled(Window)`
  width: 100%;
  height: 100%;
  display: flex !important;
  flex-direction: column;
`;
let SWindowHeader = styled(WindowHeader)`
  flex-shrink: 0;
`;
let SWindowContent = styled(WindowContent)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 0.25rem;
  padding-top: 0.5rem;
`;
