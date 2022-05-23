import { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import axios from "axios";

import DocumentList from "./DocumentList";
import DocumentDetail from "./DocumentDetail";

export default function Home({ onLogout }) {
  const [hasPageChosen, setPage] = useState("");

  const makeNewDocument = () => {
    console.log("New Document");
  };

  const onSetPage = () => {
    console.log("Set Page");
    setPage("title id");
  };

  const onSetPageNone = () => {
    console.log("Page None");
    setPage("");
  };

  if (!hasPageChosen)
    return (
      <DocumentList
        makeNewDocument={makeNewDocument}
        onLogout={onLogout}
        onSetPage={onSetPage}
      />
    );
  else
    return <DocumentDetail onSetPageNone={onSetPageNone} onLogout={onLogout} />;
}
