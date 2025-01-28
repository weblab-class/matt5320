import React, { useContext } from "react";

import "../../utilities.css";
import "./Home.css";
import GardenCard from "../modules/GardenCard";
import { get } from "../../utilities";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="Home-Container">
      <Link to={"/profile/" + "1"}>
        <GardenCard userId="1"></GardenCard>
      </Link>
      <GardenCard userId="2"></GardenCard>
      <GardenCard userId="3"></GardenCard>
      <GardenCard userId="4"></GardenCard>
    </div>
  );
};

export default Home;
