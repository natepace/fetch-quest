import * as React from "react";
import { useContext } from "react";
import { ThemeContext } from "./contexts/themes/themeprovider";
import { Button, Container } from "./components/";
import "./app.scss";
import { AppLayout } from "./layouts/index";

function FetchQuestApp() {
  const { toggle, toggler } = useContext(ThemeContext);
  return (
    <div className="app">
      <AppLayout />
    </div>
    // <div className={toggle ? "app-redpill" : "app-bluepill"}>
    // <Container className={toggle ? "app-redpill" : "app-bluepill"}>
    //   <AppLayout />
    //   <Button raised onClick={toggler}>
    //     change to matrix
    //   </Button>
    //   HELLO
    // </Container>
    // </div>
  );
}

export default FetchQuestApp;
