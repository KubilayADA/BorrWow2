import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import SessionContextProvider from "./contexts/SessionContext";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./styles/global.css";
import theme from "./styles/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <SessionContextProvider>
          <App />
        </SessionContextProvider>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
