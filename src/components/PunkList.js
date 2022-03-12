import React from "react";
import styled from "styled-components";
import CollectionCard from "./CollectionCard";

function PunkList({ siteData, setSelectedSite }) {
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
      <Footer>
        <a href="https://askjan.org/" target="_blank">
          ADA Career Resource
        </a>
      </Footer>
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

const Footer = styled.div`
  text-align: center;
  background: linear-gradient(to right, #59f9b7, #66feea);
  padding: 15px 40px;
  border-radius: 50px;
  color: black;
  width: 180px;
  margin-top: 15px;
  a {
    text-decoration: none;
    color: black;
  }
`;

export default PunkList;
