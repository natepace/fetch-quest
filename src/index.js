import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./themes/themeprovider";
import FetchQuestApp from "./app";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <FetchQuestApp />
    </ThemeProvider>
  </BrowserRouter>
  // document.getElementById("root")
);
