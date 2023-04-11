import axios from "axios";

const axiosWithAuth = () => {
  //   const token = window.localStorage.getItem("token");

  return axios.create({
    headers: {
      "fetch-api-key":
        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9
          .Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s,
      //   authorization: token,
    },
    baseURL: "https://frontend-take-home-service.fetch.com/",
  });
};

export default axiosWithAuth;
