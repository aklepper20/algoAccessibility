import React, { useState } from "react";
import styled from "styled-components";
import searchIcon from "../assets/search.png";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import Accessible from "@mui/icons-material/Accessible";
import Close from "@mui/icons-material/Close";
import Trie from "../dataStructures/Trie";
import BinarySearch from "./BinarySearch";
import stackComplete from "../dataStructures/Stack";
import handleMergeSort from "../helpers/mergeSort";

function Header({ setTheme, theme, setWordsArr, siteData }) {
  let [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [binaryOpen, setBinaryOpen] = useState(false);

  const result = document.getElementById("auto");
  const trie = new Trie();
  const words = siteData.map((site) => site.name.toLowerCase());

  words.forEach((word) => trie.insert(word));

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const themeIcon =
    theme === "dark" ? <LightModeIcon /> : <NightlightRoundIcon />;

  const newEl = (str) => {
    const p = document.createElement("p");
    p.classList = "results";
    p.innerText = str;
    return p;
  };

  const autoCompleted = () => {
    setOpen(true);
    const siteResults = trie.autoComplete(input);
    result.innerHTML = "";
    if (siteResults.found) {
      siteResults.found.map((site) => {
        const el = newEl(site);
        result.appendChild(el);
      });
    }
    if (
      siteResults.found?.length === undefined ||
      siteResults.found?.length === 0
    ) {
      result.innerHTML = "No search results found...";
    }
  };

  const handleClose = () => {
    setOpen(false);
    setInput("");
    result.innerHTML = "";
  };

  return (
    <Container>
      <HeaderLogo>
        <p>
          Al-Go Accessibility{" "}
          <span>
            <Accessible alt="Accessible Logo" />
          </span>
        </p>
      </HeaderLogo>
      <SearchBar>
        <SearchIcon>
          <img src={searchIcon} alt="Search Icon" />
        </SearchIcon>
        <SearchInput
          autoComplete="off"
          id="editor"
          value={input}
          onKeyDown={(ev) => stackComplete(ev)}
          onKeyUp={(e) => autoCompleted(e)}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search site application accessibility..."
        />
        <InputClose>
          <Close
            onClick={handleClose}
            style={{ cursor: "pointer", paddingRight: "10px" }}
          />
        </InputClose>
        <AutoResults
          id="auto"
          style={{ zIndex: open ? "10" : "-1" }}
        ></AutoResults>
      </SearchBar>
      <HeaderContent>
        <SortButton onClick={() => setWordsArr(handleMergeSort(siteData))}>
          MERGE SORT!
        </SortButton>
        {binaryOpen ? (
          <BinarySearch siteData={siteData} setBinaryOpen={setBinaryOpen} />
        ) : (
          <SortButton onClick={() => setBinaryOpen(true)}>
            BINARY SEARCH!
          </SortButton>
        )}
      </HeaderContent>
      <HeaderActions>
        <ThemeSwitchContainer onClick={changeTheme}>
          {themeIcon}
        </ThemeSwitchContainer>
      </HeaderActions>
    </Container>
  );
}

const Container = styled.div`
  height: 100px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: 200px;
  }
`;

const HeaderLogo = styled.div`
  border: 2px solid #59f9b7;
  padding: 8px 12px;
  border-radius: 5px;
  padding: 5px;
  p {
    font-weight: 700;
    font-size: 20px;
    color: ${(props) => props.theme.algoText};
  }
`;

const InputClose = styled.div`
  color: ${(props) => props.theme.inputText};
`;
const SearchBar = styled.div`
  background-color: ${(props) => props.theme.backgroundColorSearchBar};
  height: 50px;
  flex: 1;
  display: flex;
  border-radius: 50px;
  align-items: center;
  margin: 10px;
  transition: all 0.5s ease;
  position: relative;
`;

const SearchIcon = styled.div`
  margin: 10px;
`;

const SearchInput = styled.input`
  background-color: transparent;
  border: transparent;
  width: 100%;
  outline: none;
  color: ${(props) => props.theme.inputText};
  font-size: 16px;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  color: #a1a5b0;
  p {
    margin: 10px;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const AutoResults = styled.div`
  position: absolute;
  width: 300px;
  height: fit-content;
  background-color: #1c1c1e;
  top: 50px;
  left: 23px;
  border-top: 1px solid #a1a5b0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 12px;

  p {
    padding: 8px 0;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;

  div {
    margin: 10px;
  }
`;

const ThemeSwitchContainer = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.backgroundThemeSwitchIcon};
  border-radius: 50px;
  padding: 15px;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  transition: all 0.5s ease;

  img {
    height: 25px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SortButton = styled.div`
  background: linear-gradient(to left, #52f9b7, #66feea);
  padding: 15px 40px;
  border-radius: 50px;
  color: black;
  margin: 0px 7px;
  height: 20px;
  @media (max-width: 768px) {
    margin: 3px 0px;
  }
`;

export default Header;
