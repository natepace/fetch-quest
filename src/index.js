import * as React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./contexts/themes/themeprovider";
import { DogsProvider } from "./contexts/dogsContext";
import { UserProvider } from "./contexts/userContext";
import FetchQuestApp from "./app";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      {/* <DogsProvider> */}
      <ThemeProvider>
        <FetchQuestApp />
      </ThemeProvider>
      {/* </DogsProvider> */}
    </UserProvider>
  </BrowserRouter>
  // document.getElementById("root")
);
