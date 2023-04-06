//login
import * as React from "react";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../../contexts/userContext";
import axios from "axios";
import { useNavigate } from "react-router";
// import axiosWithAuth from "../../../../utils/axioswithauth";
import { Container, Button } from "../../../../components";
import "./Login.scss";
export function Login() {
  const Navigate = useNavigate();

  const [localUser, setLocalUser] = useState({
    name: "",
    email: "",
  });
  const [user, userToken, updateUser] = useUserContext();

  useEffect(() => {
    localStorage.removeItem("fetch-access-token");
    updateUser(null);
  }, []);
  console.log(user);
  const handleChange = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;
    setLocalUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const navTime = await updateUser(localUser);
    console.log(navTime);

    Navigate("/dogs");
  };
  return (
    <Container>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <div className="login-loginBox">
            <div className="login-loginElement">
              <h2>Welcome to Fetch Quest</h2>
            </div>
            {/* <p className="login-loginElement">My Quest to Impress Fetch</p> */}
            <div className="login-loginElement">
              <input
                placeholder="Name"
                name="name"
                value={localUser.name}
                onChange={handleChange}
              />
            </div>
            <div className="login-loginElement">
              <input
                placeholder="email"
                name="email"
                value={localUser.email}
                onChange={handleChange}
              />
            </div>
            <div className="login-loginElement">
              <Button raised>Login</Button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}
