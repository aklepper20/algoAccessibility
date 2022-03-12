import React from "react";
import styled from "styled-components";
import searchIcon from "../assets/search.png";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import Accessible from "@mui/icons-material/Accessible";

function Header(props) {
  const changeTheme = () => {
    if (props.theme === "dark") {
      props.setTheme("light");
    } else {
      props.setTheme("dark");
    }
  };

  const themeIcon =
    props.theme === "dark" ? <LightModeIcon /> : <NightlightRoundIcon />;

  return (
    <Container>
      <HeaderLogo>
        <p>Al-Go Accessibility</p>
        <Accessible alt="Accessible Logo" />
      </HeaderLogo>
      <SearchBar>
        <SearchIcon>
          <img src={searchIcon} alt="Search Icon" />
        </SearchIcon>
        <SearchInput placeholder="Search site application accessibility..." />
      </SearchBar>
      <HeaderContent>
        <SortButton>Sort by Most Accessible</SortButton>
      </HeaderContent>
      <HeaderActions>
        <ThemeSwitchContainer onClick={changeTheme}>
          {themeIcon}
        </ThemeSwitchContainer>
      </HeaderActions>
      <LoginButton>
        <a href="https://askjan.org/" target="_blank">
          ADA Resources
        </a>
      </LoginButton>
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
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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
`;

const SortButton = styled.div`
  background: linear-gradient(to left, #52f9b7, #66feea);
  padding: 15px 40px;
  border-radius: 50px;
  color: black;
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
