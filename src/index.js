import * as React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./contexts/themes/themeprovider";
import { DogsProvider } from "./contexts/dogsContext";
import FetchQuestApp from "./app";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DogsProvider>
      <ThemeProvider>
        <FetchQuestApp />
      </ThemeProvider>
    </DogsProvider>
  </BrowserRouter>
  // document.getElementById("root")
);
