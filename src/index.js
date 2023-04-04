import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "./themes/themeprovider";
import FetchQuestApp from "./app";
ReactDOM.render(
  <ThemeProvider>
    <FetchQuestApp />
  </ThemeProvider>,
  document.getElementById("root")
);
