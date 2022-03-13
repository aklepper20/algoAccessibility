import React, { useState } from "react";
import styled from "styled-components";
import searchIcon from "../assets/search.png";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import Accessible from "@mui/icons-material/Accessible";
import Trie from "../dataStructures/Trie";

function Header(props) {
  const [input, setInput] = useState("");

  const trie = new Trie();
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
    const p = document.createElement("p");
    p.classList = "results";
    p.innerText = str;
    return p;
  };

  const autocompleted = (e) => {
    const siteResults = trie.autoComplete(input.toLowerCase());

    result.innerHTML = "";

    if (siteResults.found) {
      siteResults.found.forEach((site) => {
        const el = newEl(site);
        console.log(el);
        result.appendChild(el);
      });
    }
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
          value={input}
          onKeyUp={(e) => autocompleted(e)}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search site application accessibility..."
        />
        <AutoResults id="auto"></AutoResults>
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

const AutoResults = styled.div``;

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
