import React, { useContext } from "react";

import "../../utilities.css";
import "./Home.css";
import { UserContext } from "../App";

const Home = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  return <></>;
};

export default Home;
