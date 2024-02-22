import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import "./index.css";
import "@mantine/core/styles.css";
import { TodosProvider } from "./context/TodoContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <TodosProvider>
        <App />
      </TodosProvider>
    </MantineProvider>
  </React.StrictMode>
);
