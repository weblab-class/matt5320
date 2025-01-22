import { useContext } from "react";
import { UserContext } from "../App";
import { get, post } from "../../utilities";

const Garden = () => {
  const postGarden = () => {
    const test_garden = {
      googleid: "test",
      plants: [
        "https://img.freepik.com/free-vector/sticker-design-with-plant-pot-isolated_1308-58441.jpg?t=st=1737496519~exp=1737500119~hmac=e7bd24e32867bc193b22e75a37113675493841b8df50b3c55685e23ae67b9121&w=740",
      ],
      x: [0],
      y: [0],
    };
    console.log(test_garden);
    post("/api/garden", test_garden).then((res) => {
      console.log(res);
    });
  };

  const getGarden = () => {
    get("/api/garden", { googleid: "test" }).then((res) => {
      console.log(res);
    });
  };

  const { userId } = useContext(UserContext);
  return (
    <>
      <canvas></canvas>
    </>
  );
};

export default Garden;
