import { useState, useEffect, Fragment } from "react";
import styled from "styled-components";

export default function DocumentDetail({
  currentDocument,
  onSetCurrentDocumentNone,
  onLogout,
}) {
  const { title, contents } = currentDocument;
  return (
    <Fragment>
      <DocumentDetailHeader>
        <h1>{title}</h1>
        <div>
          <button type="button" onClick={onSetCurrentDocumentNone}>
            리스트로 돌아가기
          </button>
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </DocumentDetailHeader>
      <DocumentDetailMain>
        <p>{contents}</p>
      </DocumentDetailMain>
    </Fragment>
  );
}

const DocumentDetailHeader = styled.header`
  height: 7%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 10px;

  button {
    height: 30px;
    margin-left: 10px;
  }
`;

const DocumentDetailMain = styled.main`
  background-color: antiquewhite;
  height: 93%;
  display: flex;
  justify-content: center;

  p {
    margin: 10px;
    width: 50%;
    height: auto;
    background-color: white;
  }
`;
