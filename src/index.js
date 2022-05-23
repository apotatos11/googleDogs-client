import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import Auth from "./service/auth";
import { BrowserRouter } from "react-router-dom";

const auth = new Auth();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App auth={auth} />
    </BrowserRouter>
  </React.StrictMode>
);
