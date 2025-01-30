import { useState } from "react";
import "./GardenButtons.css";

const GardenButtons = ({ cancel, edit, update, addPicture }) => {
  const [editing, setEditing] = useState(false);

  const handleCancel = () => {
    setEditing(false);
    cancel();
  };
  const handleEdit = () => {
    setEditing(true);
    edit();
  };
  const handleUpdate = () => {
    setEditing(false);
    update();
  };
  const handleAddPicture = (event) => {
    const url = event.target.src;
    if (url) addPicture(url);
  };

  const imgs = [
    "https://img.freepik.com/free-vector/sticker-design-with-plant-pot-isolated_1308-58441.jpg?t=st=1737496519~exp=1737500119~hmac=e7bd24e32867bc193b22e75a37113675493841b8df50b3c55685e23ae67b9121&w=740",
    "https://img.freepik.com/free-vector/plant-pot-cartoon_1308-112324.jpg?t=st=1737554353~exp=1737557953~hmac=9919ddb9baf3ee3e7e45e86ffaa283f06a3b197d99433baa5adead0d53041ecb&w=740",
    "https://img.freepik.com/free-vector/plant-wooden-pot_1308-30818.jpg?t=st=1737851620~exp=1737855220~hmac=559b8e0227ff5a478b5414348a0c7df8ce9e60b98548d1949393dc51a1929e09&w=1380",
    "https://img.freepik.com/free-vector/lush-green-potted-plant-illustration_1308-165085.jpg?t=st=1737557789~exp=1737561389~hmac=f0683fb4d78645ccee2d175b0f173b9514df831c8d29e15b9de132d5bbe91e32&w=826",
  ];
  const imgList = imgs.map((url) => <img src={url}></img>);
  return (
    <div className="Button-Container">
      {editing ? (
        <>
          <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleUpdate}>Update</button>
          </div>
          <div className="Picture-Container" onClick={handleAddPicture}>
            {imgList}
          </div>
        </>
      ) : (
        <>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
};

export default GardenButtons;
