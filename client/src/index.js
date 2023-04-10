// This file is used to mount stuff to the DOM

import React from "react";
import ReactDOM from "react-dom";

import App from "./App/App";

import { AuthContextProvider } from "./App/Context/AuthContext";

import "./index.css";

/**
 * index file
 */

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  
  document.getElementById("root")
);