import React, { useState } from "react";
import styled from "styled-components";

function Table({ name }) {
  let [count, setCount] = useState(1);
  return (
    <Container>
      <Wrapper>
        <h2>{name}</h2>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 250px;
  border: 1px solid white;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid blue;

  h2 {
    padding-left: 15px;
  }
`;
export default Table;
