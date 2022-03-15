import React, { useState } from "react";
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
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid blue;
`;
export default Table;
