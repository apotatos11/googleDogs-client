import { Fragment, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { nanoid } from "nanoid";

import Document from "./Document";

export default function DocumentList({
  onLogout,
  onSetCurrentDocument,
  documents,
  setLoading,
  getDocuments,
  setDocuments,
  loginUserInfo,
}) {
  const [myListMode, setMyListMode] = useState(false);
  const [serarchKeyword, setSearchKeyword] = useState("");

  const makeNewDocument = async () => {
    const uniqueId = nanoid();

    const localStorageInfo = JSON.parse(
      localStorage.getItem("googleDogsLoginInfo")
    );

    const newDocument = {
      title: "제목 없음",
      creator: localStorageInfo.email,
      contents: "테스트용 텍스트입니다.",
      participants: [localStorageInfo.email],
      createdAt: new Date(),
      url: process.env.REACT_APP_DOCUMENT_DB_URL + uniqueId,
      id: uniqueId,
    };

    await axios
      .post("api/document", newDocument)
      .then((res) => {
        console.log("document maiking success", res);
      })
      .catch((error) => console.error(error));

    const documentId = newDocument.id;
    const documentUrl = process.env.REACT_APP_DOCUMENT_DB_URL + documentId;

    await axios
      .get(documentUrl)
      .then((res) => {
        console.log("Target Document", res.data);
        onSetCurrentDocument(res.data);
      })
      .catch((error) => console.error(error));
  };

  const documentList =
    documents.length > 0 ? (
      documents
        .sort(
          (a, b) =>
            new Date(`${b.lastModified}`) - new Date(`${a.lastModified}`)
        )
        .filter((document) => document.title.includes(serarchKeyword))
        .map((document) => (
          <Document
            key={document._id}
            title={document.title}
            id={document._id}
            onSetCurrentDocument={onSetCurrentDocument}
            lastModified={new Date(`${document.lastModified}`).toLocaleString()}
          />
        ))
    ) : (
      <p>현재 저장된 문서가 없습니다.</p>
    );

  const currentUserEmail = JSON.parse(
    localStorage.getItem("googleDogsLoginInfo")
  ).email;

  const myDocumentList = documents.filter(
    (document) => document.creator === currentUserEmail
  );

  const myListModeOff = () => {
    setMyListMode(false);
    getDocuments();
  };

  const myListModeOn = () => {
    setMyListMode(true);
    setDocuments(myDocumentList);
  };

  if (!myListMode) {
    return (
      <Fragment>
        <DocumentListHeader>
          <nav>
            <button type="button" onClick={makeNewDocument}>
              새 문서
            </button>
            <button type="button" onClick={myListModeOn}>
              내 문서
            </button>
          </nav>
          <input
            type="search"
            placeholder="검색"
            value={serarchKeyword}
            onChange={(event) => {
              console.log("hi");
              setSearchKeyword(event.target.value);
            }}
          ></input>
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        </DocumentListHeader>
        <DocumentListMain>{documentList}</DocumentListMain>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <DocumentListHeader>
          <nav>
            <button type="button" onClick={makeNewDocument}>
              새 문서
            </button>
            <button type="button" onClick={myListModeOff}>
              전체 문서
            </button>
          </nav>
          <input
            type="search"
            placeholder="검색"
            value={serarchKeyword}
            onChange={(event) => {
              console.log("hi");
              setSearchKeyword(event.target.value);
            }}
          ></input>
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        </DocumentListHeader>
        <MyDocumentListMain>{documentList}</MyDocumentListMain>
      </Fragment>
    );
  }
}

const DocumentListHeader = styled.header`
  height: 7%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    height: 30px;
    margin: 0px 5px;
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

const MyDocumentListMain = styled.main`
  background-color: aquamarine;
  height: 93%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  overflow-y: scroll;
  justify-items: center;
  align-items: center;
`;
