import React from "react";
import ReactDOM from "react-dom/client";

import AppRoutes from "./routes/auth/AppRoutes";

import { AuthProvider } from "./routes/auth/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);