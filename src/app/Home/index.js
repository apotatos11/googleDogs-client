import { useState } from "react";

import DocumentList from "./DocumentList";
import DocumentDetail from "./DocumentDetail";

export default function Home({ onLogout }) {
  const [currentDocument, setCurrentDocument] = useState({});

  const onSetCurrentDocument = (document) => {
    setCurrentDocument(document);
  };

  const onSetCurrentDocumentNone = (event) => {
    event.preventDefault();
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
        onSetCurrentDocument={onSetCurrentDocument}
        onLogout={onLogout}
      />
    );
}
