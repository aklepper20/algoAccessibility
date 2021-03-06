import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "./Table";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DLL from "../dataStructures/DLL";

function Main({ selectedSite, siteData, wordsArr }) {
  const [activeSite, setActiveSite] = useState(siteData[0]);
  const [color, setColor] = useState("");
  let [idx, setIdx] = useState(0);

  const list = new DLL();
  siteData.forEach((image) => list.push(image));

  let viewer = document.getElementById("img");
  let name = document.getElementById("name");
  let percents = document.getElementById("percent");
  let errors = document.getElementById("error");
  let warnings = document.getElementById("warning");
  let assets = document.getElementById("asset");

  useEffect(() => {
    setActiveSite(siteData[selectedSite]);
    activeSite.percent <= 1 ? setColor("#90EE90") : setColor("#CF142B");
  }, [siteData, selectedSite, activeSite]);

  const handleListColor = (percentData) => {
    if (percentData <= 1) {
      percents.style.color = "#90EE90";
    } else {
      percents.style.color = "#CF142B";
    }
  };

  const handlePrevious = () => {
    if (idx === 0) {
      setIdx(list.length - 1);
      viewer.src = list.getNodeAtIndex(idx).value.img;
      name.innerHTML = list.getNodeAtIndex(idx).value.name;
      percents.innerHTML = list.getNodeAtIndex(idx).value.percent;
      errors.innerHTML = list.getNodeAtIndex(idx).value.errors;
      warnings.innerHTML = list.getNodeAtIndex(idx).value.warnings;
      assets.innerHTML = list.getNodeAtIndex(idx).value.assets;
    } else {
      setIdx(idx - 1);
      viewer.src = list.getNodeAtIndex(idx).value.img;
      name.innerHTML = list.getNodeAtIndex(idx).value.name;
      percents.innerHTML = list.getNodeAtIndex(idx).value.percent;
      errors.innerHTML = list.getNodeAtIndex(idx).value.errors;
      warnings.innerHTML = list.getNodeAtIndex(idx).value.warnings;
      assets.innerHTML = list.getNodeAtIndex(idx).value.assets;
    }

    handleListColor(list.getNodeAtIndex(idx).value.percent);
  };

  const handleNext = () => {
    if (idx >= list.length - 1) {
      setIdx(1);
      viewer.src = list.getNodeAtIndex(idx).value.img;
      name.innerHTML = list.getNodeAtIndex(idx).value.name;
      percents.innerHTML = list.getNodeAtIndex(idx).value.percent;
      errors.innerHTML = list.getNodeAtIndex(idx).value.errors;
      warnings.innerHTML = list.getNodeAtIndex(idx).value.warnings;
      assets.innerHTML = list.getNodeAtIndex(idx).value.assets;
    } else {
      setIdx(idx + 1);
      viewer.src = list.getNodeAtIndex(idx).value.img;
      name.innerHTML = list.getNodeAtIndex(idx).value.name;
      percents.innerHTML = list.getNodeAtIndex(idx).value.percent + "%";
      errors.innerHTML = list.getNodeAtIndex(idx).value.errors;
      warnings.innerHTML = list.getNodeAtIndex(idx).value.warnings;
      assets.innerHTML = list.getNodeAtIndex(idx).value.assets;
    }

    handleListColor(list.getNodeAtIndex(idx).value.percent);
  };

  return (
    <Container>
      <MainContent>
        <div style={{ display: "flex", alignItems: "center", flex: 0.7 }}>
          <SiteHighlight>
            <SiteContainer>
              <img id="img" src={activeSite.img} alt={activeSite.name} />
            </SiteContainer>
            <ArrowContainer>
              <Arrow>
                <ArrowBackIosIcon onClick={handlePrevious} />
              </Arrow>
              <Arrow>
                <ArrowForwardIosIcon onClick={handleNext} />
              </Arrow>
            </ArrowContainer>
          </SiteHighlight>
          <Flex>
            <Details>
              {<Title id="name">{activeSite.name}</Title>}
              <Percent id="percent" style={{ color: color }}>
                {activeSite.percent}%
              </Percent>
            </Details>
            <Company>
              <CompanyDetails>
                <CompanyNameAndHandle>
                  <h2>Accessibility</h2>
                  <h4>
                    Site Assets: <span id="asset">{activeSite.assets}</span>
                  </h4>
                  <h4>
                    Errors: <span id="error">{activeSite.errors}</span>
                  </h4>
                  <h4>
                    Warnings: <span id="warning">{activeSite.warnings}</span>
                  </h4>
                  {activeSite.login && (
                    <>
                      <h4>
                        Login: <span>{activeSite.login}</span>%
                      </h4>
                      <h4>
                        Feed: <span>{activeSite.feed}</span>%
                      </h4>
                    </>
                  )}
                </CompanyNameAndHandle>
              </CompanyDetails>
            </Company>
          </Flex>
        </div>
        <TableWrapper>
          {wordsArr && <TableHeader>Most Accessible</TableHeader>}
          {wordsArr &&
            [...wordsArr]
              ?.splice(0, 5)
              .map((word) => (
                <Table key={word.id} name={word.name} percent={word.percent} />
              ))}
        </TableWrapper>
      </MainContent>
    </Container>
  );
}

const Flex = styled.div`
  max-width: fit-content;
`;
const Container = styled.div`
  max-height: 50vh;

  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;
const TableWrapper = styled.div`
  border: ${(props) => props.theme.algoText};
`;

const ArrowContainer = styled.div`
  display: flex;
`;
const Arrow = styled.div`
  color: white;
  margin-top: 10px;
  height: 30px;
  width: 30px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  color: ${(props) => props.theme.inputText};
  &:hover {
    background-color: lightgrey;
    cursor: pointer;
    color: black;
    transform: scale(1.1);
`;

const TableHeader = styled.div`
  font-weight: 800;
  font-size: 30px;
  margin-bottom: 10px;
  text-align: center;
  color: ${(props) => props.theme.algoText};
`;

const MainContent = styled.div`
  height: 300px;
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 20px;
  border-bottom: ${(props) => props.theme.mainBorderBottom};
  transition: all 0.5s ease;
`;

const SiteHighlight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SiteContainer = styled.div`
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  justify-content: space-evenly;
  margin-right: 20px;

  img {
    object-fit: contain;
    max-width: min(30vw, 40vh);
    max-height: 30vw;
  }
`;

const Percent = styled.div`
  font-size: 40px;
  margin-left: 40px;
  padding-top: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Details = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: center;
  flex: 0.75;
  color: ${(props) => props.theme.punkNameTextColor};
  transition: all 0.5s ease;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const Title = styled.div`
  font-size: 65px;
  font-weight: 800;
`;

const Company = styled.div`
  display: flex;
  margin: 10px 0;
  height: 50px;

  div {
    margin: 0 5px;
  }
`;

const CompanyDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #a1a5b0;
`;

const CompanyNameAndHandle = styled.div`
  display: flex;
  flex-direction: column;
  h4 {
    margin: 2px;
  }

  span {
    color: lightgrey;
  }

  h2 {
    color: #59f9b7;
    margin-bottom: 5px;
  }
`;

export default Main;
