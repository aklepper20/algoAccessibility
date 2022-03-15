import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Close from "@mui/icons-material/Close";
import { flexbox } from "@mui/system";

function BinarySearch({ setBinaryOpen, siteData }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [progress, setProgress] = useState(false);
  const [arrBinary, setArrBinary] = useState(null);

  useEffect(() => {
    const handleMergeSort = (arr) => {
      if (arr.length <= 1) {
        return arr;
      }

      let mid = Math.floor(arr.length / 2);
      let left = handleMergeSort(arr.slice(0, mid));
      let right = handleMergeSort(arr.slice(mid));

      return merge(left, right);
    };

    function merge(left, right) {
      let sorted = [];
      while (left.length && right.length) {
        if (left[0].name > right[0].name) {
          sorted.push(right.shift());
        } else {
          sorted.push(left.shift());
        }
      }

      return sorted.concat(left.concat(right));
    }
    setArrBinary(handleMergeSort(siteData));
  }, []);

  const handleBinarySearch = (arr, val) => {
    let min = 0;
    let max = arr.length - 1;

    while (min <= max) {
      let mid = Math.floor((min + max) / 2);

      if (arr[mid].name == val && arr[mid].percent <= 1) {
        return true;
      } else if (arr[mid].name == val && arr[mid].percent >= 1) {
        return false;
      } else if (arr[mid].name < val) {
        min = mid + 1;
      } else if (arr[mid].name > val) {
        max = mid - 1;
      }
    }
  };

  return (
    <Container>
      <BinaryInput
        placeholder="Enter Company..."
        value={input}
        onChange={(e) => setInput(e.target.value.toLowerCase())}
      ></BinaryInput>
      <ButtonActions>
        {progress ? (
          <>
            <p>{result ? "PASS" : "FAIL"}</p>
          </>
        ) : (
          <GoButton
            onClick={() => {
              setResult(handleBinarySearch(arrBinary, input));
              setProgress(true);
            }}
          >
            GO!
          </GoButton>
        )}
        <Close
          onClick={() => {
            setBinaryOpen(false);
            setInput("");
          }}
        />
      </ButtonActions>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to left, #52f9b7, #66feea);
  padding: 20px 20px;
  border-radius: 50px;
  color: black;
  margin: 0px 7px;
  height: 20px;
`;
const BinaryInput = styled.input`
  outline: none;

  border: transparent;
  background: transparent;
  /* padding 7px; */
`;

const ButtonActions = styled.div`
  display: flex;
  align-items: center;
`;

const GoButton = styled.div`
  border: 1px solid black;
  padding: 4px;
  border-radius: 5px;
`;

const WarningPrompt = styled.p`
  color: "red";
`;
export default BinarySearch;
