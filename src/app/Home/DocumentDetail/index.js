import { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import schedule from "node-schedule";

export default function DocumentDetail({
  currentDocument,
  onSetCurrentDocument,
  onSetCurrentDocumentNone,
  setLoading,
  onLogout,
}) {
  const { title, contents } = currentDocument;
  const documentId = currentDocument._id;
  const documentUrl = process.env.REACT_APP_DOCUMENT_DB_URL + documentId;

  const [currentTitle, setTitle] = useState(title);
  const [currentContents, setContents] = useState(contents);

  const titleSubmit = async (event) => {
    event.preventDefault();
    const updateInfo = { title: currentTitle };
    const titleChangedDocument = { ...currentDocument, title: currentTitle };

    await axios
      .patch(documentUrl, updateInfo)
      .then((res) => {
        console.log("Target Document", res.data);
      })
      .catch((error) => console.error(error));

    onSetCurrentDocument(titleChangedDocument);
  };

  const saveDocument = async () => {
    const updateInfo = {
      title: currentTitle,
      contents: currentContents,
      lastModified: new Date(),
    };

    await axios
      .patch(documentUrl, updateInfo)
      .catch((error) => console.error(error));
  };

  const deleteDocument = async () => {
    console.log("delete1");
    setLoading(true);
    console.log("delete2");
    await axios.delete(documentUrl).catch((error) => console.error(error));
    console.log("delete3");

    await onSetCurrentDocumentNone();
    console.log("delete4");

    setLoading(false);
    console.log("delete5");
  };

  useEffect(() => {
    schedule.scheduleJob("0 * * * * *", function () {
      saveDocument();
    });

    schedule.scheduleJob("20 * * * * *", function () {
      saveDocument();
    });

    schedule.scheduleJob("40 * * * * *", function () {
      saveDocument();
    });

    return () => schedule.gracefulShutdown();
  }, []);

  return (
    <Fragment>
      <DocumentDetailHeader>
        <form onSubmit={titleSubmit}>
          <input
            type="text"
            placeholder="문서 제목"
            value={currentTitle}
            onChange={(event) => setTitle(event.target.value)}
            required
          ></input>
        </form>
        <div>
          <button type="button" onClick={saveDocument}>
            저장하기
          </button>
          <button type="button" onClick={() => deleteDocument()}>
            삭제하기
          </button>
          <button type="button" onClick={onSetCurrentDocumentNone}>
            리스트로 돌아가기
          </button>
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </DocumentDetailHeader>
      <DocumentDetailMain>
        <textarea
          value={currentContents}
          autoComplete="off"
          onChange={(event) => setContents(event.target.value)}
        />
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
  margin-right: 5px;
  margin-left: 10px;

  form {
    height: 40px;
    background-color: aquamarine;
    width: 50%;
    display: flex;
    align-items: center;
  }

  input {
    border: none;
    width: 100%;
    height: 100%;
    font-size: 20px;
  }

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

  form {
  }

  textarea {
    margin: 10px;
    width: 50%;
    height: auto;
    background-color: white;
    border: none;
    resize: none;
    font-size: large;
  }

  textarea:focus {
    outline: none;
  }
`;
