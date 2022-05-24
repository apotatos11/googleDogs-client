import { useState } from "react";
import { Reset } from "styled-reset";
import styled from "styled-components";

import Login from "./Login";
import Home from "./Home";

export default function App({ auth }) {
  const localStorageInfo = localStorage.getItem("googleDogsLoingInfo");

  const [loginUserInfo, setLogin] = useState(localStorageInfo);

  const onLogout = async () => {
    try {
      localStorage.removeItem("googleDogsLoingInfo");
      await auth.logout().then(console.log);
      setLogin(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Reset />
      {loginUserInfo && <Home onLogout={onLogout} />}
      {!loginUserInfo && <Login auth={auth} setLogin={setLogin} />}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ivory;
`;
