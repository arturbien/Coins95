import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import { Button, WindowContent, TextField, Toolbar } from "react95";

import FullPageWindow from "../../components/FullPageWindow/FullPageWindow";
import WindowHeader from "../../components/WindowHeader/WindowHeader";
import CoinsTable, { CoinsTableProps } from "./CoinsTable";
import CloseIcon from "../../components/CloseIcon/CloseIcon";
import LinkButton from "../../components/LinkButton/LinkButton";

import SearchIcon from "../../assets/img/system-search.png";

type Props = RouteComponentProps<{}> &
  Pick<CoinsTableProps, "data" | "onFollow">;

const Layout = ({ data, onFollow }: Props) => {
  const [searchPhrase, setSearchPhrase] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPhrase(e.target.value);
  };

  useLockBodyScroll();
  return (
    <FullPageWindow style={{ position: "absolute", top: "0" }}>
      <WindowHeader>
        <img
          alt="Search icon"
          src={SearchIcon}
          style={{
            height: 27,
            marginTop: 2,
            marginRight: "0.5rem",
            imageRendering: "pixelated",
          }}
        />
        Search
        <LinkButton
          square
          size="sm"
          style={{
            position: "absolute",
            right: 2,
            top: 3,
            fontWeight: "bold",
          }}
          goBack
        >
          <CloseIcon />
        </LinkButton>
      </WindowHeader>
      <SWindowContent>
        <SearchWrapper>
          <TextField
            placeholder="Search..."
            value={searchPhrase}
            onChange={handleSearch}
            width="100%"
            style={{ marginRight: "4px", width: "100%" }}
          />
          <Button
            disabled={searchPhrase === ""}
            onClick={() => setSearchPhrase("")}
          >
            Clear
          </Button>
        </SearchWrapper>
        <CoinsTable
          searchPhrase={searchPhrase}
          data={data}
          onFollow={onFollow}
        />
      </SWindowContent>
    </FullPageWindow>
  );
};

// TODO: remove withRouter?
export default withRouter(Layout);

let SWindowContent = styled(WindowContent)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding-top: 4px;
  padding-bottom: 37px;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
`;

const SearchWrapper = styled(Toolbar)`
  margin: 0 -4px;
`;
