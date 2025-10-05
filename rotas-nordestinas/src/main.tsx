import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
// import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { UIProvider } from "./context/UIContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {}
    <BrowserRouter>
      {}
      <AuthProvider>
        <UIProvider>
          {" "}
          {}
          <App />
        </UIProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
