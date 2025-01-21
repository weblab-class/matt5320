import { useContext } from "react";
import { UserContext } from "../App";

const Garden = () => {
  const { userId } = useContext(UserContext);
  return (
    <>
      <img src="https://img.freepik.com/free-vector/sticker-design-with-plant-pot-isolated_1308-58441.jpg?t=st=1737496519~exp=1737500119~hmac=e7bd24e32867bc193b22e75a37113675493841b8df50b3c55685e23ae67b9121&w=740"></img>
    </>
  );
};

export default Garden;
