import { useParams } from "react-router-dom";
import StaticGarden from "../modules/StaticGarden";
import { useEffect, useState } from "react";
import { get } from "../../utilities";
const Profile = () => {
  const userId = useParams().userId;
  const [garden, setGarden] = useState();

  useEffect(() => {
    get("/api/garden", { userId }).then((gardenObj) => {
      setGarden(gardenObj);
    });
  }, []);

  return (
    <div className="Garden-Container">
      <StaticGarden garden={garden}></StaticGarden>
    </div>
  );
};

export default Profile;
