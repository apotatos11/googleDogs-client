import { useState, useEffect } from "react";
import styled from "styled-components";

export default function Document({ onSetPage }) {
  return (
    <Container onClick={onSetPage}>
      <main>본문 미리보기</main>
      <footer>
        <div>문서제목</div>
        <div>last Modified</div>
      </footer>
    </Container>
  );
}

const Container = styled.div`
  width: 210px;
  height: 372px;
  background-color: white;
  margin: 30px 0px;

  &:hover {
    border: 1px solid blue;
    width: 208px;
    height: 371px;

    footer {
      height: 74px;
    }
  }

  main {
    height: 297px;
    text-align: center;
    line-height: 297px;
  }

  footer {
    height: 75px;
    line-height: 75px;
    text-align: center;
    background: whitesmoke;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    div {
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin: 0px;
    }
  }
`;
