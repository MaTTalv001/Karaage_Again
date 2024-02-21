import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "contexts/AuthContext";
import { ProfileProvider } from "contexts/ProfileContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </AuthProvider>
  </BrowserRouter>
  //</React.StrictMode>
);
