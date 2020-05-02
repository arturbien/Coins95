import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import { Button, WindowContent,  Toolbar } from "react95";

import FullPageWindow from "../../components/FullPageWindow/FullPageWindow";
import WindowHeader from "../../components/WindowHeader/WindowHeader";
import CoinsTable from "./CoinsTable";
import CloseIcon from "../../components/CloseIcon/CloseIcon";
import KeyboardInput from "../../components/KeyboardInput/KeyboardInput";
import SearchIcon from "../../assets/img/system-search.png";

const Layout = ({ data, onFollow, ...otherProps }) => {
  const [searchPhrase, setSearchPhrase]=useState('')

  const handleSearch = e => {
    setSearchPhrase(e.target.value);
  }
  useLockBodyScroll();
  return (
    <FullPageWindow>
      <WindowHeader>
        <img
          alt="Search icon"
          src={SearchIcon}
          style={{
            height: 27,
            marginTop: 2,
            marginRight: "0.5rem",
            imageRendering: "pixelated"
          }}
        />
        Search
        <Button
          square
          size="sm"
          style={{
            position: "absolute",
            right: 2,
            top: 3,
            fontWeight: "bold"
          }}
          onClick={() => otherProps.history.goBack()}
        >
          <CloseIcon />
        </Button>
      </WindowHeader>
      <SWindowContent>
      <SearchWrapper>
          <KeyboardInput
            placeholder="Search..."
            value={searchPhrase}
            onChange={handleSearch}
            width="100%"
            style={{ marginRight: "4px", width: '100%' }}
            // onFocus={e =>{
            //   e.preventDefault();
            //   setShowKeyboard(true);
            // }}
            // onBlur={() => setShowKeyboard(false)}
          />
          <Button
            disabled={searchPhrase === ""}
            onClick={() => setSearchPhrase('')}
          >
            Clear
          </Button>
        </SearchWrapper>
        <CoinsTable searchPhrase={searchPhrase} data={data} onFollow={onFollow} />
      </SWindowContent>
    </FullPageWindow>
  );
};

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