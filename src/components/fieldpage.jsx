import React from "react";
import Element from "./element";

/**
 * Board component displaying elements on a draggable board.
 * Allows users to interact with elements, focusing on them and dragging them.
 */
export default function Board({
  elements = {}, // Object containing elements to display on the board
  focusedElement, // ID of the currently focused element
  setFocusedElement, // Function to set the ID of the focused element
  handleDragAndDrop, // Function to handle drag and drop events for elements
}) {
  console.log({ elements });

  // Function to handle element click and focus
  const handleElementClick = (e, id) => {
    e.stopPropagation(); // Prevents event bubbling
    setFocusedElement(id); // Sets the ID of the focused element
  };

  return (
    <div
      className="page sm:h-screen h-full"
      droppable="true" // Indicates that the board is droppable
      onClick={() => setFocusedElement(null)} // Clears focused element on board click
    >
      {/* Rendering each element on the board */}
      {Object.values(elements).map(({ id, ...config }) => (
        <Element
          key={id} // Unique key for each element
          {...config} // Spread operator to pass element details (x, y, text, etc.)
          focused={focusedElement === id} // Boolean indicating if the element is focused
          onClick={(e) => handleElementClick(e, id)} // Event handler for element click
          onDragEnd={(e) => handleDragAndDrop(id, e.clientX, e.clientY)} // Event handler for drag end
        />
      ))}
    </div>
  );
}
