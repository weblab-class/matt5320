import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { get, post } from "../../utilities";
import * as fabric from "fabric";
import "./Garden.css";
import GardenButtons from "../modules/GardenButtons";

const Garden = () => {
  const fabricCanvasRef = useRef(null);
  const navigate = useNavigate();

  fabric.FabricObject.createControls = () => {
    const controls = fabric.controlsUtils.createObjectDefaultControls();
    delete controls.mtr;
    return { controls };
  };

  useEffect(() => {
    const fabriccanvas = new fabric.Canvas("Garden-Canvas", {
      width: 700,
      height: 600,
      selection: false,
    });
    fabricCanvasRef.current = fabriccanvas;
    resetGarden();

    return () => {
      fabriccanvas.dispose();
    };
  }, []);

  const resetGarden = () => {
    fabricCanvasRef.current.clear();
    fabricCanvasRef.current.set("backgroundColor", "#ffffff");
    get("/api/whoami").then((user) => {
      if (!user._id) {
        navigate("/");
        return;
      }
      const userId = user._id;

      get("/api/garden", { userId }).then((garden) => {
        if (!garden.plants) return;

        garden.plants.forEach((url, index) => {
          fabric.FabricImage.fromURL(url).then((img) => {
            img.set({
              top: garden.y[index],
              left: garden.x[index],
              scaleY: garden.scaleY[index],
              scaleX: garden.scaleX[index],
            });
            img.selectable = false;
            img.hoverCursor = "default";
            fabricCanvasRef.current.add(img);
          });
        });
      });
    });
  };

  const updateGarden = () => {
    get("/api/whoami").then((user) => {
      if (!user._id) return;
      const userId = user._id;

      const plants = [];
      const x = [];
      const y = [];
      const scaleX = [];
      const scaleY = [];

      fabricCanvasRef.current.getObjects().forEach((object) => {
        plants.push(object.getSrc());
        x.push(object.left);
        y.push(object.top);
        scaleX.push(object.scaleX);
        scaleY.push(object.scaleY);
      });

      const garden = { userId, plants, x, y, scaleX, scaleY };

      post("/api/garden", garden).then(resetGarden);
    });
  };

  const modifiableOn = () => {
    fabricCanvasRef.current.forEachObject((object, index, array) => {
      object.selectable = true;
      object.hoverCursor = null;
    });
  };

  const addPicture = (url) => {
    fabric.FabricImage.fromURL(url).then((img) => {
      fabricCanvasRef.current.add(img);
    });
  };

  return (
    <div className="Garden-Container">
      <div className="Canvas-Container">
        <canvas id="Garden-Canvas"></canvas>
      </div>
      <GardenButtons
        cancel={resetGarden}
        edit={modifiableOn}
        update={updateGarden}
        addPicture={addPicture}
      ></GardenButtons>
    </div>
  );
};

export default Garden;
