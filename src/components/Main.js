import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "./Table";

function Main({
  selectedSite,
  siteData,
  wordsArr,
  mergeVal,
  setWordsArr,
  handleMergeSort,
  setMergeVal,
}) {
  const [activeSite, setActiveSite] = useState(siteData[0]);
  const [color, setColor] = useState("");

  useEffect(() => {
    setActiveSite(siteData[selectedSite]);
    activeSite.percent >= 1 ? setColor("#90EE90") : setColor("#CF142B");
  }, [siteData, selectedSite]);

  return (
    <Container>
      <MainContent>
        <div style={{ display: "flex", alignItems: "center", flex: 0.7 }}>
          <PunkHighlight>
            <PunkContainer>
              <img src={activeSite.img} alt={activeSite.name} />
            </PunkContainer>
          </PunkHighlight>
          <Flex>
            <PunkDetails>
              {<Title>{activeSite.name}</Title>}
              <Percent style={{ color: color }}>{activeSite.percent}%</Percent>
            </PunkDetails>

            <Owner>
              <OwnerDetails>
                <OwnerNameAndHandle>
                  <h2>Accessibility Information</h2>
                  <h4>
                    Site Assets: <span>{activeSite.assets}</span>
                  </h4>
                  <h4>
                    Errors: <span>{activeSite.errors}</span>
                  </h4>
                  <h4>
                    Warnings: <span>{activeSite.warnings}</span>
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
