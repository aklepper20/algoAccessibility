import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CollectionCard from "./CollectionCard";

function PunkList({ siteData, setSelectedSite, selectedSite }) {
  const [currentKey, setCurrentKey] = useState("");

  return (
    <>
      <Container>
        {siteData?.map((site) => (
          <div onClick={() => setSelectedSite(site.index)}>
            <CollectionCard
              key={site.id}
              id={site.id}
              name={site.name}
              image={site.img}
              assets={site.assets}
              percentAccessibility={site.percent}
            />
          </div>
        ))}
      </Container>
      <FooterContainer>
        <Footer>
          <a href="https://askjan.org/" target="_blank">
            ADA Career Resource
          </a>
        </Footer>
        <Disclaimer>
          <em>*All statistics sourced from ToolTester*</em>
        </Disclaimer>
      </FooterContainer>
    </>
  );
}

const Container = styled.div`
  display: flex;
  cursor: pointer;
  overflow: scroll;
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid white;

  ::-webkit-scrollbar {
    display: none;
  }
`;

// const Arrow = styled.div`
//   height: 40px;
//   width: 40px;
//   border-radius: 5px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: all 0.2s ease-in-out;

//   &:hover {
//     background-color: lightgrey;
//     cursor: pointer;
//     color: black;
//     transform: scale(1.1);
//   }
// `;

// const ArrowContainer = styled.div`
//   color: white;
//   display: flex;
//   justify-content: space-between;
//   margin-top: 15px;
// `;

const FooterContainer = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px;
  }
`;

const Disclaimer = styled.div`
  text-align: center;
  color: #a1a5b0;
`;

const Footer = styled.div`
  text-align: center;
  background: linear-gradient(to right, #59f9b7, #66feea);
  padding: 15px 40px;
  border-radius: 50px;
  color: black;
  width: 180px;
  margin-top: 15px;
  margin-bottom: 5px;
  a {
    text-decoration: none;
    color: black;
  }
`;

export default PunkList;
