import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../App";
import { get, post } from "../../utilities";
import * as fabric from "fabric";

const Garden = () => {
  const canvasref = useRef(null);

  useEffect(() => {
    const fabriccanvas = new fabric.Canvas(canvasref.current, {
      height: 500,
      width: 500,
    });
    const url =
      "https://img.freepik.com/free-vector/sticker-design-with-plant-pot-isolated_1308-58441.jpg?t=st=1737496519~exp=1737500119~hmac=e7bd24e32867bc193b22e75a37113675493841b8df50b3c55685e23ae67b9121&w=740";
    const pic = fabric.FabricImage.fromURL(url).then((img) => {
      img.set({
        scaleX: 0.5,
        scaleY: 0.5,
        left: 0,
        top: 0,
        lockRotation: true,
      });
      fabriccanvas.add(img);
    });

    return () => {
      fabriccanvas.dispose();
    };
  }, []);

  const { userId } = useContext(UserContext);
  return (
    <>
      <canvas ref={canvasref} style={{ borderStyle: "solid" }}></canvas>
    </>
  );
};

export default Garden;
