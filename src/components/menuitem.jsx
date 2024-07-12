import DragIcon from "../assets/grip-vertical.svg";
import { nanoid } from "nanoid";
import MenuIcon from "./menuIcon";

export const MenuItem = ({ type, setCurrentElementDetails, setShowModal }) => {
  const defaultText = {
    label: "This is a label.",
    input: "Input Field",
    button: "Button",
  };

  const handleDragEnd = (e) => {
    // Set details of the element initially has default values but it is changable
    setCurrentElementDetails({
      id: nanoid(),
      x: e.clientX,
      y: e.clientY,
      text: defaultText[type],
      type,
      fontSize: 14,
      fontWeight: "normal",
    });
    setShowModal(true);
  };

  return (
    <div
      className="draggable-element cursor-grab"
      draggable="true"
      onDragEnd={handleDragEnd}
    >
      <MenuIcon />
      {type}
    </div>
  );
};
