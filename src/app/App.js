import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Reset } from "styled-reset";
import styled from "styled-components";
import axios from "axios";

import Login from "./Login";
import Home from "./Home";

export default function App({ auth }) {
  const [isLoggedIn, setLogin] = useState(false);
  const callApi = async () => {
    axios.get("/api").then((res) => console.log(res));
  };

  const onLogout = async () => {
    await auth.logout().then(console.log);
    setLogin(false);
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <Container>
      <Reset />
      {isLoggedIn && <Home onLogout={onLogout} />}
      {!isLoggedIn && <Login auth={auth} setLogin={setLogin} />}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ivory;
`;
