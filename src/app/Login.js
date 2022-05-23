import React from "react";
import styled from "styled-components";

export default function Login({ auth, setLogin }) {
  const onLogin = async (e) => {
    const loginUser = await auth.login(e.target.name);
    const { id, email } = loginUser.additionalUserInfo.profile;
    localStorage.setItem("googleDogsLoingInfo", JSON.stringify({ id, email }));
    setLogin({ id, email });
  };

  return (
    <Main>
      <LoginBox>
        <h1>Login</h1>
        <ul>
          <li>
            <button onClick={onLogin} name="Google">
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
  border: 2px solid black;
  border-radius: 5px;
  background-color: orange;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 30px;
    margin: 10px;
  }

  button {
    width: 150px;
  }
`;
