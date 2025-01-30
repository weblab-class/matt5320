import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Home.css";
import GardenCard from "../modules/GardenCard";
import { get } from "../../utilities";
import { Link } from "react-router-dom";

const Home = () => {
  const [gardens, setGardens] = useState([]);

  useEffect(() => {
    get("/api/gardens").then((gardenObjs) => {
      setGardens(gardenObjs);
    });
  }, []);

  let gardenList;
  if (gardens.length !== 0) {
    gardenList = gardens.map((gardenObj) => (
      <Link to={`/profile/${gardenObj.userId}`} key={`GardenCard_${gardenObj.userId}`}>
        <GardenCard garden={gardenObj}></GardenCard>
      </Link>
    ));
  } else {
    gardenList = <div></div>;
  }

  return (
    <div className="Home-Container">
      <div style={{ width: "fit-content" }}>Explore Other People's Gardens!</div>
      <div className="Feed-Container">{gardenList}</div>
    </div>
  );
};

export default Home;
