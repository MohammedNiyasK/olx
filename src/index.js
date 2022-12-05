import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "../src/context/AuthContext";

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById("root")
);
