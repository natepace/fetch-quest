import * as React from "react";
import { useNavigate } from "react-router";
import { Container, Button } from "../../../../components";
import textimg from "../../../../assets/bestfriend.png";
import "./Home.scss";
export function Home() {
  const navigate = useNavigate();
  const toLogin = () => {
    navigate("/login");
  };
  return (
    <div className="home">
      <div className="home-title">
        <img src={textimg} />
      </div>
      <div className="home-wrapper">
        <div className="home-loginWrapper">
          <div className="home-loginPeel">
            <div className="home-loginBox">
              <div className="home-loginElement">
                <h2>Welcome to Fetch Quest</h2>
              </div>
              <p className="home-loginElement">My Quest to Impress Fetch</p>
              <div className="home-loginElement">
                <Button raised onClick={toLogin}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="home-wrapper">
        <div className="home-loginBox">
          <div>
            <h3>Welcome to Fetch Quest</h3>
          </div>
          <div>
            <Button raised onClick={toLogin}>
              Log In!
            </Button>
          </div>
        </div>
      </div> */
}
