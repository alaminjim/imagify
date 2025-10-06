import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Routes.jsx";
import AppContextProvider from "./context/AppContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Router></Router>
    </BrowserRouter>
  </AppContextProvider>
);
