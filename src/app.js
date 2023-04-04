import React, { useContext } from "react";
import { ThemeContext } from "./themes/themeprovider";
import { Button, Container } from "./components/";
import "./app.scss";

function FetchQuestApp() {
  const { toggle, toggler } = useContext(ThemeContext);
  return (
    // <div className={toggle ? "app-redpill" : "app-bluepill"}>
    <Container className={toggle ? "app-redpill" : "app-bluepill"}>
      <Button raised onClick={toggler}>
        change to matrix
      </Button>
      HELLO
    </Container>
    // </div>
  );
}

export default FetchQuestApp;
