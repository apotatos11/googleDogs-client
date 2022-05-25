import React from "react";
import { Navigate } from "react-router-dom";

function RedirectHome({ children, loginUserInfo }) {
  const auth = loginUserInfo;

  if (auth) {
    return <Navigate to="/" />;
  }
  return children;
}

export default RedirectHome;
