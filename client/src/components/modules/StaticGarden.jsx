import { StaticCanvas, FabricImage } from "fabric";
import { useEffect } from "react";
import "./StaticGarden.css";

const StaticGarden = (props) => {
  const originalWidth = 700;
  const originalHeight = 600;
  const scaleFactor = props.scaleFactor ?? 1;
  const garden = props.garden;
  const userId = props.garden?.userId ?? "blank";
  useEffect(() => {
    const canvas = new StaticCanvas(userId, {
      width: scaleFactor * originalWidth,
      height: scaleFactor * originalHeight,
      backgroundColor: "#ffffff",
    });

    garden?.plants.forEach((url, index) => {
      FabricImage.fromURL(url).then((img) => {
        img.set({
          top: garden.y[index] * scaleFactor,
          left: garden.x[index] * scaleFactor,
          scaleY: garden.scaleY[index] * scaleFactor,
          scaleX: garden.scaleX[index] * scaleFactor,
        });
        canvas.add(img);
      });
    });

    return () => {
      canvas.dispose();
    };
  });

  return <canvas className="Static-Garden-Canvas" id={userId}></canvas>;
};

export default StaticGarden;
