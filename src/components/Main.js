import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import instagramLogo from "../assets/instagram.png";
import gitHubLogo from "../assets/gitHublogo.png";
import me from "../assets/me.jpg";

function Main({ selectedSite, siteData }) {
  const [activeSite, setActiveSite] = useState(siteData[0]);
  const [color, setColor] = useState("");

  useEffect(() => {
    setActiveSite(siteData[selectedSite]);
    activeSite.percent < 1 ? setColor("#90EE90") : setColor("#CF142B");
  }, [siteData, selectedSite]);

  return (
    <Container>
      <MainContent>
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
          <OwnerLink>
            <a href={activeSite.website} target="_blank">
              {activeSite.name} ADA Resource
            </a>
          </OwnerLink>
          <Owner>
            <OwnerDetails>
              <OwnerNameAndHandle>
                <h4>Site Assets: {activeSite.assets}</h4>
                <h4>Accessibility Errors: {activeSite.errors}</h4>
                <h4>Accessibility Warnings: {activeSite.warnings}</h4>
                {activeSite.login && (
                  <>
                    <h4>Accessibility Login {activeSite.login}</h4>
                    <h4>Accessibility Feed {activeSite.feed}</h4>
                  </>
                )}
              </OwnerNameAndHandle>
            </OwnerDetails>
          </Owner>
        </Flex>
      </MainContent>
    </Container>
  );
}

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  max-height: 50vh;
`;

const MainContent = styled.div`
  display: flex;
  padding-bottom: 20px;
  border-bottom: ${(props) => props.theme.mainBorderBottom};
  transition: all 0.5s ease;
`;

const PunkHighlight = styled.div`
  flex: 0.25;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PunkContainer = styled.div`
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  margin-right: 20px;

  img {
    object-fit: contain;
    max-width: min(30vw, 40vh);
    max-height: 30vw;
  }
`;

const Percent = styled.div`
  font-size: 40px;
`;

const PunkDetails = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: 0.75;
  color: ${(props) => props.theme.punkNameTextColor};
  transition: all 0.5s ease;
`;

const Title = styled.div`
  font-size: 65px;
  font-weight: 800;
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
    margin: 6px;
  }
`;

const OwnerHandle = styled.div`
  color: #00ebe;
`;

const OwnerLink = styled.div`
  padding: 12px;
  width: 180px;
  text-align: center;
  color: purple;
`;

//@media(max-width: 600px)
//@media(max-width: 800px)
export default Main;
