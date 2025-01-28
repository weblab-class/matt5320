import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../App";
import { get, post } from "../../utilities";
import * as fabric from "fabric";
import "./Garden.css";

const Garden = () => {
  const fabricCanvasRef = useRef(null);
  const [url, setUrl] = useState("");

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
      if (!user._id) return;
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

      post("/api/garden", garden).then(console.log);
    });
  };

  const modifiableOn = () => {
    fabricCanvasRef.current.forEachObject((object, index, array) => {
      object.selectable = true;
      object.hoverCursor = null;
    });
  };

  const addPicture = (event) => {
    event.preventDefault();
    fabric.FabricImage.fromURL(url).then((img) => {
      fabricCanvasRef.current.add(img);
    });
    setUrl("");
  };

  // if (!userId) return <div>This page is only available to users</div>;
  return (
    <>
      <div className="Garden-Container">
        <canvas id="Garden-Canvas"></canvas>
      </div>
      <div className="Button-Container">
        <button onClick={resetGarden}>Cancel</button>
        <button onClick={modifiableOn}>Edit</button>
        <div>
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          ></input>
          <button type="submit" value="Submit" onClick={addPicture}>
            Add Picture
          </button>
        </div>
        <button onClick={updateGarden}>Update</button>
      </div>
    </>
  );
};

export default Garden;
