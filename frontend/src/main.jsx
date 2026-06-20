import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
            style: {
              background: "#1f1f35",
              color: "#fff",
              border: "1px solid rgba(255,255,255,.15)",
            },
          }}
        />

        <App />

      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);