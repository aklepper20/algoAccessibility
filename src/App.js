import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import PunkList from "./components/PunkList";
import Main from "./components/Main";
import axios from "axios";
import { onSnapshot, collection, doc } from "firebase/firestore";
import db from "./firebase";
import Trie from "./dataStructures/Trie";

function App() {
  const [siteData, setSiteData] = useState([]);
  const [selectedSite, setSelectedSite] = useState(0);
  const [theme, setTheme] = useState("dark");
  let [mergeVal, setMergeVal] = useState("percent");
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

  const handleMergeSort = (arr) => {
    if (arr.length <= 1) {
      return arr;
    }

    let mid = Math.floor(arr.length / 2);
    let left = handleMergeSort(arr.slice(0, mid));
    let right = handleMergeSort(arr.slice(mid));

    return merge(left, right);
  };

  function merge(left, right) {
    let sorted = [];
    while (left.length && right.length) {
      if (left[0][mergeVal] > right[0][mergeVal]) {
        sorted.push(right.shift());
      } else {
        sorted.push(left.shift());
      }
    }

    return sorted.concat(left.concat(right));
  }

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
  };

  const themes = {
    light: lightTheme,
    dark: darkTheme,
  };

  return (
    <ThemeProvider theme={themes[theme]}>
      <Container>
        <Header
          handleMergeSort={handleMergeSort}
          wordsArr={wordsArr}
          setWordsArr={setWordsArr}
          siteData={siteData}
          setSiteData={setSiteData}
          setSelectedSite={setSelectedSite}
          setTheme={setTheme}
          theme={theme}
        />
        {siteData?.length > 0 && (
          <>
            <Main
              selectedSite={selectedSite}
              setSelectedSite={setSelectedSite}
              siteData={siteData}
              theme={theme}
              setTheme={setTheme}
              wordsArr={wordsArr}
              setWordsArr={setWordsArr}
              mergeVal={mergeVal}
              setMergeVal={setMergeVal}
              handleMergeSort={handleMergeSort}
            />
            <PunkList
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
