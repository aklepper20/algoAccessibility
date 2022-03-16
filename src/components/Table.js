import React from "react";
import styled from "styled-components";

function Table({ name, percent }) {
  return (
    <Container>
      <Wrapper>
        <div>
          <h3>{name}</h3>
        </div>
        <div>
          <h2>{percent}%</h2>
        </div>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 230px;
  border: 1px solid white;
  color: ${(props) => props.theme.algoText};
  background-color: color: ${(props) => props.theme.algoText};
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: ${(props) => props.theme.algoText};
`;
export default Table;
