import React from "react";
import { Navigate } from "react-router-dom";

function RequireAuth({ children, loginUserInfo }) {
  const auth = loginUserInfo;

  if (!auth) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default RequireAuth;
