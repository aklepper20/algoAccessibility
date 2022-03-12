import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import instagramLogo from "../assets/instagram.png";
import gitHubLogo from "../assets/gitHublogo.png";
import me from "../assets/me.jpg";

function Main({ selectedSite, siteData }) {
  const [activeSite, setActiveSite] = useState(siteData[0]);

  useEffect(() => {
    setActiveSite(siteData[selectedSite]);
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
          <PunkDetails>{<Title>{activeSite.name}</Title>}</PunkDetails>

          <Owner>
            <OwnerImageContainer>
              <img src={me} alt="Aly Photo" />
            </OwnerImageContainer>

            <OwnerDetails>
              <OwnerNameAndHandle>
                <div style={{ color: "#a1a5b0" }}>{activeSite.id}</div>
                <OwnerHandle style={{ color: "#a1a5b0" }}>@Bait</OwnerHandle>
              </OwnerNameAndHandle>

              <OwnerLink>
                <a href="https://www.instagram.com/" target="_blank">
                  <img
                    src={instagramLogo}
                    alt="Instagram Logo"
                    style={{ width: "55px", height: "55px" }}
                  />
                </a>
              </OwnerLink>
              <OwnerLink>
                <a href="https://github.com/aklepper20" target="_blank">
                  <img
                    src={gitHubLogo}
                    alt="Github Logo"
                    style={{
                      backgroundColor: "white",
                      padding: "3px",
                      borderRadius: "5px",
                    }}
                  />
                </a>
              </OwnerLink>
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

const PunkDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0.75;
  color: ${(props) => props.theme.punkNameTextColor};
  transition: all 0.5s ease;
`;

const Title = styled.div`
  font-size: 56px;
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

const OwnerImageContainer = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  overflow: hidden;
  object-fit: contain;
  img {
    height: 100%;
    width: 100%;
  }
`;

const OwnerDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OwnerNameAndHandle = styled.div`
  /* flex: 0; */
`;

const OwnerHandle = styled.div`
  color: #00ebe;
`;

const OwnerLink = styled.div`
  padding: 12px;
  border-radius: 50px;
  width: 40px;
  margin: 0 0 0 10px;
  text-align: center;
  img {
    height: 100%;
    width: 100%;
    background-color: ${(props) => props.theme.instaBackgroundColor};
    border-radius: 15px;
    transition: all 0.5s ease;
  }
`;

//@media(max-width: 600px)
//@media(max-width: 800px)
export default Main;
