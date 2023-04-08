import * as React from "react";
import { Button } from "../Button";
import { useNavigate } from "react-router";
import { useUserContext } from "../../contexts/userContext";
import "./Nav.scss";
export function Nav() {
  const [user, userToken, updateUser, logOutUser] = useUserContext();
  const Navigate = useNavigate();
  const Logout = () => {
    // const navTime = await logOutUser();
    // console.log(navTime);
    localStorage.removeItem("fetch-access-token");
    updateUser(null);
    // navigate('/login');

    Navigate("/login");
  };
  return (
    <div className="Nav">
      {/* <div> */}
      <div className="Nav-title">
        <h1>Fetch Quest</h1>
        <h3>. . . a quest to impress fetch</h3>
      </div>

      <Button raised onClick={Logout}>
        logout
      </Button>
      {/* </div> */}
    </div>
  );
}
