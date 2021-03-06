import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import SiteList from "./components/SiteList";
import Main from "./components/Main";
import { onSnapshot, collection } from "firebase/firestore";
import db from "./firebase";
import handleMergeSort from "./helpers/mergeSort";

function App() {
  const [siteData, setSiteData] = useState([]);
  const [selectedSite, setSelectedSite] = useState(0);
  const [theme, setTheme] = useState("dark");
  let [wordsArr, setWordsArr] = useState(null);

  useEffect(() => {
    onSnapshot(collection(db, "sites"), (snap) => {
      let allSites = snap.docs.map((doc, index) => ({
        ...doc.data(),
        id: doc.id,
        index: index,
      }));
      setSiteData(allSites);
    });
  }, []);

  useEffect(() => {
    handleMergeSort(siteData);
  }, []);

  const lightTheme = {
    pageBackgroundColor: "#fff",
    backgroundColorSearchBar: "#f3f6f9",
    backgroundThemeSwitchIcon: "#a1a5b0",
    punkNameTextColor: "#1c1c1e",
    instaBackgroundColor: "#1c1c1e",
    mainBorderBottom: "1px solid #1a1c1e",
    collectionCardBackground: "#f3f6f9",
    collectionNameColor: "#1c1c1e",
    algoText: "black",
    inputText: "black",
  };

  const darkTheme = {
    pageBackgroundColor: "#000",
    backgroundColorSearchBar: "#1c1c1e",
    backgroundThemeSwitchIcon: "#1c1c1e",
    punkNameTextColor: "#fff",
    instaBackgroundColor: "transparent",
    mainBorderBottom: "1px solid #fff",
    collectionCardBackground: "#1a1c1e",
    collectionNameColor: "#fff",
    algoText: "white",
    inputText: "#eee",
  };

  const themes = {
    light: lightTheme,
    dark: darkTheme,
  };

  return (
    <ThemeProvider theme={themes[theme]}>
      <Container>
        <Header
          setWordsArr={setWordsArr}
          wordsArr={wordsArr}
          siteData={siteData}
          setTheme={setTheme}
          theme={theme}
        />
        {siteData?.length > 0 && (
          <>
            <Main
              selectedSite={selectedSite}
              siteData={siteData}
              wordsArr={wordsArr}
            />
            <SiteList
              selectedSite={selectedSite}
              siteData={siteData}
              setSelectedSite={setSelectedSite}
            />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.pageBackgroundColor};
  min-height: 100vh;
  max-width: 100vw;
  transition: all 0.5s ease;
  overflow-x: hidden;
`;

export default App;
