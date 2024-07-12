import DragIcon from "../assets/grip-vertical.svg"; // Assuming DragIcon is imported correctly
import { nanoid } from "nanoid"; // Importing nanoid for generating unique IDs
import MenuIcon from "./menuIcon"; // Assuming MenuIcon is imported correctly

/**
 * Menu item component representing a draggable element type.
 * Allows users to drag and drop predefined element types onto the board.
 */
export const MenuItem = ({ type, setCurrentElementDetails, setShowModal }) => {
  // Default text for each element type
  const defaultText = {
    label: "This is a label.",
    input: "Input Field",
    button: "Button",
  };

  // Function triggered when dragging ends
  const handleDragEnd = (e) => {
    setCurrentElementDetails({
      id: nanoid(), // Generates a unique ID for the new element
      x: e.clientX, // X coordinate where the element is dropped
      y: e.clientY, // Y coordinate where the element is dropped
      text: defaultText[type], // Default text for the element type
      type, // Type of the element (label, input, button)
      fontSize: 14, // Default font size
      fontWeight: "normal", // Default font weight
    });
    setShowModal(true); // Shows the modal after dropping the element
  };

  return (
    <div
      className="draggable-element cursor-grab"
      draggable="true"
      onDragEnd={handleDragEnd} // Event handler for drag end
    >
      <MenuIcon /> {/* Icon for the menu item */}
      {type} {/* Type of the menu item */}
    </div>
  );
};
