import { useState, useEffect } from "react";
import axios from "axios";

import DocumentList from "./DocumentList";
import DocumentDetail from "./DocumentDetail";

export default function Home({ onLogout, loginUserInfo }) {
  const [currentDocument, setCurrentDocument] = useState({});
  const [documents, setDocuments] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getDocuments = async () => {
    setLoading(true);
    await axios
      .get("api/documents")
      .then((res) => {
        setDocuments(res.data);
      })
      .catch((error) => console.error(error));
    setLoading(false);
  };

  const onSetCurrentDocument = (document) => {
    setCurrentDocument(document);
  };

  const onSetCurrentDocumentNone = () => {
    setCurrentDocument({});
  };

  useEffect(() => {
    getDocuments();
  }, [currentDocument]);

  if (isLoading) {
    return <p>Loading.......</p>;
  } else if (!isLoading && !Object.keys(currentDocument).length)
    return (
      <DocumentList
        onLogout={onLogout}
        onSetCurrentDocument={onSetCurrentDocument}
        documents={documents}
        setLoading={setLoading}
        getDocuments={getDocuments}
        setDocuments={setDocuments}
        loginUserInfo={loginUserInfo}
      />
    );
  else if (!isLoading && Object.keys(currentDocument).length)
    return (
      <DocumentDetail
        currentDocument={currentDocument}
        onSetCurrentDocumentNone={onSetCurrentDocumentNone}
        onSetCurrentDocument={onSetCurrentDocument}
        onLogout={onLogout}
        setLoading={setLoading}
      />
    );
}
