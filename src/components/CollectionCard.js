import React, { useEffect, useState } from "react";
import styled from "styled-components";
import check from "../assets/green.png";
import stop from "../assets/stop.png";
import warn from "../assets/warn.png";

function CollectionCard({ name, image, assets, percentAccessibility }) {
  const [marker, setMarker] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (percentAccessibility < 1) {
      setMarker(check);
      setColor("#90EE90");
    } else {
      setMarker(stop);
      setColor("#CF142B");
    }
  }, []);
  return (
    <Container>
      <img src={image} alt="photo" />
      <Details>
        <Name>{name}</Name>
        <PriceContainer>
          <img src={marker} alt="Marking Indicator" />
          <Price style={{ color: color }}>
            Inaccessibility: <span>{percentAccessibility}%</span>
          </Price>
        </PriceContainer>
      </Details>
    </Container>
  );
}

const Container = styled.div`
  color: white;
  background-color: ${(props) => props.theme.collectionCardBackground};
  border-radius: 20px;
  overflow: hidden;
  width: 300px;
  height: 400px;
  margin-right: 30px;
  transition: all 0.5s ease;
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
`;
const Details = styled.div`
  padding: 20px;
`;
const Name = styled.div`
  font-size: 20px;
  font-weight: 900;
  color: #a1a5b0;
`;
const Id = styled.div`
  color: #a1a5b0;
  font-size: 18px;
  font-weight: 600;
`;
const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 18px;
  object-fit: contain;
  color: #a1a5b0;
  img {
    height: 30px;
    width: 30px;
    object-fit: contain;
  }
`;
const Price = styled.div`
  margin-left: 5px;
  font-weight: 600;
  span {
    font-size: 26px;
  }
`;

//whenever you want to render to the dom you have to use .map. If you filter and array or anything your have to use .map chained onto it to render any JSX.
export default CollectionCard;
