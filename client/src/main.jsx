import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Routes.jsx";
import AppContextProvider from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <BrowserRouter>
      <Router></Router>
    </BrowserRouter>
  </AppContextProvider>
);
