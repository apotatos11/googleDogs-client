import { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import schedule from "node-schedule";
import { io } from "socket.io-client";
import getCaretCoordinates from "textarea-caret";
const socket = io.connect("http://localhost:4000");

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
  const currentUserEmail = JSON.parse(
    localStorage.getItem("googleDogsLoginInfo")
  ).email;

  const [currentTitle, setTitle] = useState(title);
  const [currentContents, setContents] = useState(contents);
  const [otherPosition, setOtherPosition] = useState({});

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

    setTitle(currentTitle);
  };

  const deleteDocument = async () => {
    setLoading(true);
    await axios.delete(documentUrl).catch((error) => console.error(error));
    await onSetCurrentDocumentNone();
    setLoading(false);
  };

  const onChangeHandler = (event) => {
    setContents(event.target.value);
    const caret = getCaretCoordinates(event.target, event.target.selectionEnd);

    socket.emit(
      "position",
      documentId,
      currentUserEmail,
      event.target.selectionStart,
      caret
    );
  };

  useEffect(() => {
    const socket = io.connect("http://localhost:4000");
    socket.emit("joinRoom", documentId, currentUserEmail);

    socket.on("otherPosition", (msg) => {
      const { userEmail, caret } = msg;
      const newObject = {};

      if (otherPosition[userEmail]) {
        const revisedPosition = { ...otherPosition };
        revisedPosition[userEmail] = caret;
        setOtherPosition({ ...revisedPosition });
      } else {
        newObject[userEmail] = caret;
        setOtherPosition({ ...otherPosition, ...newObject });
      }
    });

    return () => {
      socket.emit("leaveRoom", documentId, currentUserEmail);
      socket.emit("forceDisconnect");
    };
  }, [otherPosition]);

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
  }, [currentTitle, currentContents]);

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
          {currentUserEmail === currentDocument.creator && (
            <button type="button" onClick={() => deleteDocument()}>
              삭제하기
            </button>
          )}
          <button type="button" onClick={onSetCurrentDocumentNone}>
            리스트로 돌아가기
          </button>
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </DocumentDetailHeader>
      <DocumentDetailMain>
        <TextEditor>
          <textarea
            value={currentContents}
            autoComplete="off"
            onChange={onChangeHandler}
          ></textarea>
          {Object.keys(otherPosition)
            .filter((element) => element !== currentUserEmail)
            .map((element, index) => (
              <CursorPointer key={index} position={otherPosition[element]}>
                <div></div>
                <p>{element}</p>
              </CursorPointer>
            ))}
        </TextEditor>
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
`;

const TextEditor = styled.div`
  margin: 10px;
  width: 50%;
  height: auto;
  background-color: white;
  position: relative;

  textarea {
    width: 100%;
    height: 100%;
    border: none;
    resize: none;
    font-size: 20px;
  }

  textarea:focus {
    outline: none;
  }

  textarea:nth-child(70) {
    color: red;

    animation: blink-effect 1s step-end infinite;

    @keyframes blink-effect {
      50% {
        opacity: 0;
      }
    }
  }
`;

const CursorPointer = styled.div`
  --cursor-color: ${"#" + parseInt(Math.random() * 0xffffff).toString(16)};
  position: absolute;
  width: 4px;
  height: 25px;
  top: ${(props) => props.position.top}px;
  left: ${(props) => props.position.left}px;

  div {
    width: 100%;
    height: 100%;
    background-color: var(--cursor-color);

    animation: blink-effect 1s step-end infinite;

    @keyframes blink-effect {
      50% {
        opacity: 0;
      }
    }
  }

  p {
    position: absolute;
    top: -15px;
    background-color: var(--cursor-color);
    color: white;
    opacity: 0;
  }

  &:hover {
    p {
      opacity: 1;
    }
  }
`;
