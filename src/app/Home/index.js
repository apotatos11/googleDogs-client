import { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import axios from "axios";

import DocumentList from "./DocumentList";
import DocumentDetail from "./DocumentDetail";

export default function Home({ onLogout }) {
  const [currentDocument, setCurrentDocument] = useState({});

  const onSetCurrentDocument = (document) => {
    setCurrentDocument(document);
  };

  const onSetCurrentDocumentNone = (event) => {
    console.log("Page None");
    setCurrentDocument({});
  };

  if (!Object.keys(currentDocument).length)
    return (
      <DocumentList
        onLogout={onLogout}
        onSetCurrentDocument={onSetCurrentDocument}
      />
    );
  else
    return (
      <DocumentDetail
        currentDocument={currentDocument}
        onSetCurrentDocumentNone={onSetCurrentDocumentNone}
        onLogout={onLogout}
      />
    );
}
