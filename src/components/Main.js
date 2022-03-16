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
  }, [siteData, selectedSite, activeSite, list, idx]);

  // useEffect(() => {
  //   if (list.getNodeAtIndex(idx).value.percent <= 1) {
  //     percents.style.color = "#90EE90";
  //   } else {
  //     percents.style.color = "#CF142B";
  //   }
  // }, [list, idx]);
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
    if (list.getNodeAtIndex(idx).value.percent <= 1) {
      percents.style.color = "#90EE90";
    } else {
      percents.style.color = "#CF142B";
    }
  };

  const handleNext = () => {
    if (idx >= list.length - 1) {
      setIdx(0);
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
      percents.innerHTML = list.getNodeAtIndex(idx).value.percent;
      errors.innerHTML = list.getNodeAtIndex(idx).value.errors;
      warnings.innerHTML = list.getNodeAtIndex(idx).value.warnings;
      assets.innerHTML = list.getNodeAtIndex(idx).value.assets;
    }
    if (list.getNodeAtIndex(idx).value.percent <= 1) {
      percents.style.color = "#90EE90";
    } else {
      percents.style.color = "#CF142B";
    }
  };

  return (
    <Container>
      <MainContent>
        <div style={{ display: "flex", alignItems: "center", flex: 0.7 }}>
          <PunkHighlight>
            <PunkContainer>
              <img id="img" src={activeSite.img} alt={activeSite.name} />
            </PunkContainer>
            <ArrowContainer>
              <Arrow>
                <ArrowBackIosIcon onClick={handlePrevious} />
              </Arrow>
              <Arrow>
                <ArrowForwardIosIcon onClick={handleNext} />
              </Arrow>
            </ArrowContainer>
          </PunkHighlight>
          <Flex>
            <PunkDetails>
              {<Title id="name">{activeSite.name}</Title>}
              <Percent id="percent" style={{ color: color }}>
                {activeSite.percent}%
              </Percent>
            </PunkDetails>
            <Owner>
              <OwnerDetails>
                <OwnerNameAndHandle>
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
                </OwnerNameAndHandle>
              </OwnerDetails>
            </Owner>
          </Flex>
        </div>
        <div style={{ color: "white" }}>
          {wordsArr && <TableHeader>Most Accessible</TableHeader>}
          {wordsArr &&
            [...wordsArr]
              ?.splice(0, 5)
              .map((word) => <Table name={word.name} percent={word.percent} />)}
        </div>
      </MainContent>
    </Container>
  );
}

const Flex = styled.div`
  /* display: flex; */
  max-width: fit-content;
  /* flex-direction: column; */
`;
const Container = styled.div`
  max-height: 50vh;

  @media (max-width: 768px) {
    margin-top: 40px;
  }
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

  &:hover {
    background-color: lightgrey;
    cursor: pointer;
    color: black;
    transform: scale(1.1);
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

const TableHeader = styled.div`
  font-weight: 800;
  font-size: 30px;
  margin-bottom: 10px;
  text-align: center;
`;

const MainContent = styled.div`
  height: 300px;
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 20px;
  border-bottom: ${(props) => props.theme.mainBorderBottom};
  transition: all 0.5s ease;
`;

const PunkHighlight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const PunkContainer = styled.div`
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

const PunkDetails = styled.div`
  display: flex;
  /* justify-content: space-around; */
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
  /* margin-bottom: "20px"; */
`;

const ItemNumber = styled.span`
  color: #a1a5b0;
  font-size: 72px;
  align-self: center;
`;

const Owner = styled.div`
  display: flex;
  margin: 10px 0;
  height: 50px;

  div {
    margin: 0 5px;
  }
`;

// const OwnerImageContainer = styled.div`
//   height: 50px;
//   width: 50px;
//   border-radius: 50%;
//   overflow: hidden;
//   object-fit: contain;
//   img {
//     height: 100%;
//     width: 100%;
//   }
// `;

const OwnerDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #a1a5b0;
`;

const OwnerNameAndHandle = styled.div`
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

const OwnerHandle = styled.div`
  color: #00ebe;
`;

const OwnerLink = styled.div`
  padding: 12px 12px 0px 12px;

  width: 180px;
  text-align: center;
  color: purple;

  a {
    margin: 0;
  }
`;

//@media(max-width: 600px)
//@media(max-width: 800px)
export default Main;
