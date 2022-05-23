import { useState, useEffect, Fragment } from "react";
import styled from "styled-components";

import Document from "./Document";

export default function DocumentList({ makeNewDocument, onLogout, onSetPage }) {
  return (
    <Fragment>
      <DocumentListHeader>
        <button type="button" onClick={makeNewDocument}>
          새 문서
        </button>
        <input type="search" placeholder=" 검색"></input>
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      </DocumentListHeader>
      <DocumentListMain>
        <Document onSetPage={onSetPage} />
        <Document onSetPage={onSetPage} />
        <Document onSetPage={onSetPage} />
        <Document onSetPage={onSetPage} />
        <Document onSetPage={onSetPage} />
        <Document onSetPage={onSetPage} />
        <Document onSetPage={onSetPage} />
        <Document onSetPage={onSetPage} />
        <Document onSetPage={onSetPage} />
        <Document onSetPage={onSetPage} />
        <Document onSetPage={onSetPage} />
        <Document onSetPage={onSetPage} />
        <Document onSetPage={onSetPage} />
        <Document onSetPage={onSetPage} />
      </DocumentListMain>
    </Fragment>
  );
}

const DocumentListHeader = styled.header`
  height: 7%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 10px;

  button {
    height: 30px;
  }

  input {
    width: 50%;
    min-width: 200px;
    padding-left: 30px;
    height: 40px;
    background-color: whitesmoke;
    border: none;
  }
`;

const DocumentListMain = styled.main`
  background-color: aqua;
  height: 93%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  overflow-y: scroll;
  justify-items: center;
  align-items: center;
`;
