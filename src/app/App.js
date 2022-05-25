import { useState } from "react";
import { Reset } from "styled-reset";
import styled from "styled-components";
import { Routes, Route, Navigate } from "react-router-dom";

import RedirectHome from "./RedirectHome";
import RequireAuth from "./RequireAuth";
import Login from "./Login";
import Home from "./Home";

export default function App({ auth }) {
  const localStorageInfo = localStorage.getItem("googleDogsLoginInfo");
  const [loginUserInfo, setLoginUser] = useState(localStorageInfo);

  const onLogout = async () => {
    try {
      localStorage.removeItem("googleDogsLoginInfo");
      await auth.logout().then(console.log);
      setLoginUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Reset />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth loginUserInfo={loginUserInfo}>
              <Home onLogout={onLogout} loginUserInfo={loginUserInfo} />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={
            loginUserInfo ? (
              <Navigate to="/" />
            ) : (
              <RedirectHome>
                <Login
                  auth={auth}
                  setLoginUser={setLoginUser}
                  loginUserInfo={loginUserInfo}
                />
              </RedirectHome>
            )
          }
        />
      </Routes>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ivory;
`;
