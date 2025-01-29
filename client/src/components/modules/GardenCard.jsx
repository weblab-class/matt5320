import { get } from "../../utilities";
import StaticGarden from "./StaticGarden";
import "./GardenCard.css";

const GardenCard = (props) => {
  const scaleFactor = 0.5;
  const garden = props.garden;
  const userName = props.garden.userName ?? "Unknown User";

  return (
    <div className="Card-Container">
      <StaticGarden scaleFactor={scaleFactor} garden={garden}></StaticGarden>
      <div className="Card-Info">{userName}'s Garden</div>
    </div>
  );
};

export default GardenCard;
