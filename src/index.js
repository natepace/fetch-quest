import * as React from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./contexts/userContext";
import FetchQuestApp from "./app";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
        <FetchQuestApp />
    </UserProvider>
  </BrowserRouter>
  
);
