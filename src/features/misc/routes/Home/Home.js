import * as React from "react";
import { useNavigate } from "react-router";
import { Container, Button } from "../../../../components";

export function Home() {
  const navigate = useNavigate();
  const toLogin = () => {
    navigate("/login");
  };
  return (
    <Container>
      <h3>Welcome to Fetch Quest</h3>
      <Button raised onClick={toLogin}>
        Log In!
      </Button>
    </Container>
  );
}
