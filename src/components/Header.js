import React, { useEffect, useState } from "react";
import styled from "styled-components";
import searchIcon from "../assets/search.png";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import Accessible from "@mui/icons-material/Accessible";
import Close from "@mui/icons-material/Close";
import Trie from "../dataStructures/Trie";
import Stack from "../dataStructures/Stack";
function Header(props) {
  let [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const trie = new Trie();
  const undo = new Stack();
  const redo = new Stack();

  let editor = document.getElementById("editor");
  const result = document.getElementById("auto");
  const words = props.siteData.map((site) => site.name.toLowerCase());

  words.forEach((word) => trie.insert(word));

  const changeTheme = () => {
    if (props.theme === "dark") {
      props.setTheme("light");
    } else {
      props.setTheme("dark");
    }
  };

  const themeIcon =
    props.theme === "dark" ? <LightModeIcon /> : <NightlightRoundIcon />;

  const newEl = (str) => {
    //   const d = `<div onClick={() => setSelectedP(site.index)}></div>`
    const p = document.createElement("p");
    p.classList = "results";
    p.innerText = str;
    return p;
  };

  const autocompleted = (e) => {
    setOpen(true);
    const siteResults = trie.autoComplete(input.toLowerCase());

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

  //   let completeStack = (ev) => {
  //     if (ev.metaKey) {
  //       if (ev.key === "u") {
  //         ev.preventDefault();
  //         redo.push(undo.pop());
  //         editor.value = undo.data.join("");
  //       } else if (ev.key === "r") {
  //         ev.preventDefault();
  //         undo.push(redo.pop());
  //         console.log(undo.data);
  //         editor.value = undo.data.join("");
  //       }
  //     } else {
  //       undo.push(ev.key);
  //     }
  //   };

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
          id="editor"
          value={input}
          onKeyUp={(e) => autocompleted(e)}
          //   onKeyDown={(ev) => completeStack(ev)}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search site application accessibility..."
        />
        <Close
          onClick={handleClose}
          style={{ cursor: "pointer", paddingRight: "10px" }}
        />
        <AutoResults
          id="auto"
          style={{ zIndex: open ? "10" : "-1" }}
        ></AutoResults>
      </SearchBar>
      <HeaderContent>
        <SortButton>Sort by Most Accessible</SortButton>
      </HeaderContent>
      <HeaderContent>
        <SortButton>RESET</SortButton>
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
  padding: 5px
  /* display: flex;
  align-items: center;
  justify-content: space-evenly; */
  color: ${(props) => props.theme.punkNameTextColor};
  p {
    font-weight: 700;
    font-size: 20px;
  }
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
  border: none;
  width: 100%;
  outline: none;
  color: #eee;
  font-size: 16px;
`;

const HeaderContent = styled.div`
  display: flex;
  color: #a1a5b0;
  p {
    margin: 10px;
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

  @media (max-width: 768px) {
    margin: 3px 0px;
  }
`;

const LoginButton = styled.div`
  background: linear-gradient(to right, #59f9b7, #66feea);
  padding: 15px 40px;
  border-radius: 50px;
  color: black;

  a {
    text-decoration: none;
    color: black;
  }
`;
export default Header;
