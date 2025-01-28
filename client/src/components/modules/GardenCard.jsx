import { get } from "../../utilities";
import StaticGarden from "./StaticGarden";
import "./GardenCard.css";

const GardenCard = (props) => {
  const scaleFactor = 0.5;
  const garden = {
    _id: "67906091f14b1454aa69ddc1",
    userId: props.userId ?? "user1",
    plants: [
      "https://img.freepik.com/free-vector/sticker-design-with-plant-pot-isolated_1308-58441.jpg?t=st=1737496519~exp=1737500119~hmac=e7bd24e32867bc193b22e75a37113675493841b8df50b3c55685e23ae67b9121&w=740",
      "https://img.freepik.com/free-vector/plant-pot-cartoon_1308-112324.jpg?t=st=1737554353~exp=1737557953~hmac=9919ddb9baf3ee3e7e45e86ffaa283f06a3b197d99433baa5adead0d53041ecb&w=740",
      "https://img.freepik.com/free-vector/plant-wooden-pot_1308-30818.jpg?t=st=1737851620~exp=1737855220~hmac=559b8e0227ff5a478b5414348a0c7df8ce9e60b98548d1949393dc51a1929e09&w=1380",
    ],
    x: [29.693551506427568, 369.27763577042253, 486.69422423556057],
    y: [71.26151761517639, 82.22236422957738, 404.80577576443943],
    scaleX: [0.2801438493156385, 0.23860503254403953, 0.14514911287278215],
    scaleY: [0.2801438493156385, 0.23860503254403953, 0.14514911287278215],
    __v: 8,
  };
  const userId = props.userId ?? "user1";

  return (
    <div className="Card-Container">
      <StaticGarden scaleFactor={scaleFactor} garden={garden}></StaticGarden>
      <div className="Card-Info">{userId}'s Garden</div>
    </div>
  );
};

export default GardenCard;
