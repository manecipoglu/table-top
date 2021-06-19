import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./state/userContext";

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById("root")
);
