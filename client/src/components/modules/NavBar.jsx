import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import "./NavBar.css";
import { UserContext } from "../App";

const NavBar = (props) => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  return (
    <nav className="NavBar-container">
      <div className="NavBar-links">
        <Link className="NavBar-title u-inlineBlock" to="/">
          Virtual Garden
        </Link>
        {userId && (
          <Link className="NavBar-link u-inlineBlock" to="/garden">
            Garden
          </Link>
        )}
      </div>
      {userId ? (
        <Link
          className="NavBar-link"
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
          to="/"
        >
          Logout
        </Link>
      ) : (
        <GoogleLogin
          onSuccess={handleLogin}
          onError={(err) => console.log(err)}
          containerProps={{ className: "NavBar-link NavBar-login u-inlineBlock" }}
        />
      )}
    </nav>
  );
};

export default NavBar;
