import React from "react";
import styled from "styled-components";
import CollectionCard from "./CollectionCard";

function PunkList({ siteData, setSelectedSite }) {
  return (
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

export default PunkList;
