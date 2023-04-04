//login
import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
// import axiosWithAuth from "../../../../utils/axioswithauth";
import { Container, Button } from "../../../../components";
import "./Login.scss";
export function Login() {
  // let user = {
  //   name: "nate",
  //   email: "email@email.com",
  // };
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    // const handleClicky = () => {
    axios
      .get(`https://frontend-take-home-service.fetch.com/dogs/breeds`, {
        headers: {
          "fetch-api-key":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      });
    // };
  }, []);
  console.log(user);
  const handleChange = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`https://frontend-take-home-service.fetch.com/auth/login`, user, {
        headers: {
          "fetch-api-key":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
        },

        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h1>WELCOME</h1>
        <input
          placeholder="Name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          placeholder="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </Container>
  );
}
