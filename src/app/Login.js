import React, { useState } from "react";
import styled from "styled-components";
import { Routes, Route, Navigate } from "react-router-dom";

export default function Login({ auth, setLoginUser, loginUserInfo }) {
  const onLogin = async (e) => {
    const loginUser = await auth.login(e.target.name);
    const { id, email } = loginUser.additionalUserInfo.profile;
    await localStorage.setItem(
      "googleDogsLoginInfo",
      JSON.stringify({ id, email })
    );
    setLoginUser({ id, email });
  };

  return (
    <Main>
      <LoginBox>
        <h1>Login</h1>
        <ul>
          <li>
            <button onClick={onLogin} name="Google">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/640px-Google_%22G%22_Logo.svg.png"
                alt="Google Logo"
              />
              Login with Google
            </button>
          </li>
        </ul>
      </LoginBox>
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 20%;
  min-width: 250px;
  height: 50%;
  border: 1px solid black;
  background-color: greenyellow;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 30px;
    margin: 10px;
    width: 90%;
    height: 20%;
    text-align: center;
    padding-top: 40px;
  }

  ul {
    width: 90%;
    height: 80%;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  button {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
