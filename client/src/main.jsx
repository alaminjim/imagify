import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Routes.jsx";
import AppContextProvider from "./context/AppContext.jsx";
import { ToastContainer } from "react-toastify";

import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={clientId}>
      <AppContextProvider>
        <ToastContainer position="top-center" />
        <Router />
      </AppContextProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);
