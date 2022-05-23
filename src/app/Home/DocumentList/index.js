import { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import axios from "axios";
import { nanoid } from "nanoid";

import Document from "./Document";

export default function DocumentList({ onLogout, onSetCurrentDocument }) {
  const [documents, setDocuments] = useState([]);
  const getDocuments = async () => {
    axios
      .get("api/documents")
      .then((res) => {
        console.log("Documents", res.data);
        setDocuments(res.data);
      })
      .catch((error) => console.error(error));
  };

  const makeNewDocument = async () => {
    const uniqueId = nanoid();

    const localStorageInfo = JSON.parse(
      localStorage.getItem("googleDogsLoingInfo")
    );

    console.log("localStorage", localStorageInfo);

    const newDocument = {
      title: "제목 없음",
      creator: localStorageInfo.email,
      contents: "테스트용 텍스트입니다.",
      participants: [localStorageInfo.email],
      createdAt: new Date(),
      url: process.env.REACT_APP_DOCUMENT_DB_URL + uniqueId,
      id: uniqueId,
    };

    console.log(newDocument);

    axios
      .post("api/document", newDocument)
      .then((res) => {
        console.log("document maiking success", res);
      })
      .catch((error) => console.error(error));

    onSetCurrentDocument(newDocument);
  };

  useEffect(() => {
    getDocuments();
  }, []);

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
        <Document onSetCurrentDocument={onSetCurrentDocument} />
        <Document onSetCurrentDocument={onSetCurrentDocument} />
        <Document onSetCurrentDocument={onSetCurrentDocument} />
        <Document onSetCurrentDocument={onSetCurrentDocument} />
        <Document onSetCurrentDocument={onSetCurrentDocument} />
        <Document onSetCurrentDocument={onSetCurrentDocument} />
        <Document onSetCurrentDocument={onSetCurrentDocument} />
        <Document onSetCurrentDocument={onSetCurrentDocument} />
        <Document onSetCurrentDocument={onSetCurrentDocument} />
        <Document onSetCurrentDocument={onSetCurrentDocument} />
        <Document onSetCurrentDocument={onSetCurrentDocument} />
        <Document onSetCurrentDocument={onSetCurrentDocument} />
        <Document onSetCurrentDocument={onSetCurrentDocument} />
        <Document onSetCurrentDocument={onSetCurrentDocument} />
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
