import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar";
import Modal from "./components/modal";
import Board from "./components/fieldpage";

/**
 * Main application component managing the board, sidebar, and modal interactions.
 * Allows users to manage elements on a board, update their details, delete them,
 * and perform drag-and-drop operations.
 */
const App = () => {
  // State variables
  const [currentElementDetails, setCurrentElementDetails] = useState({}); // Details of currently selected element for modal display
  const [showModal, setShowModal] = useState(false); // Controls modal visibility
  const [focusedElement, setFocusedElement] = useState(null); // ID of currently focused element
  const [savedElements, setSavedElements] = useState(
    JSON.parse(localStorage.getItem("elements")) || {} // Retrieves saved elements from localStorage
  );

  /**
   * Handles deletion of an element by ID.
   */
  const handleElementDelete = (id) => {
    const updatedElements = JSON.parse(JSON.stringify(savedElements));
    delete updatedElements[id]; // Deletes element from updatedElements
    localStorage.setItem("elements", JSON.stringify(updatedElements)); // Updates localStorage with modified elements
    setSavedElements(updatedElements); // Updates state with modified elements
  };

  /**
   * Handles update of an element by ID, preparing for modal display.
   */
  const handleElementUpdate = (id) => {
    setCurrentElementDetails(savedElements[id]); // Sets current element details for modal display
    setShowModal(true); // Shows the modal
  };

  /**
   * Handles keyboard events for element interaction (update and delete).
   */
  const handleKeyDown = (event) => {
    if (focusedElement && !showModal) {
      if (event.key === "Enter") {
        handleElementUpdate(focusedElement); // Opens modal to update focused element details on Enter key press
      } else if (event.key === "Delete") {
        handleElementDelete(focusedElement); // Deletes focused element on Delete key press
        setFocusedElement(null); // Clears focused element after deletion
      }
    }
  };

  /**
   * Handles addition or update of an element, updating localStorage and state.
   */
  const handleAddOrUpdateElement = (element) => {
    const updatedElements = { ...savedElements, [element.id]: element }; // Adds or updates element in updatedElements
    localStorage.setItem("elements", JSON.stringify(updatedElements)); // Updates localStorage with modified elements
    setSavedElements(updatedElements); // Updates state with modified elements
    setCurrentElementDetails({}); // Resets current element details after update
  };

  /**
   * Handles drag-and-drop interaction for elements, updating their positions.
   */
  const handleDragAndDrop = (id, x, y) => {
    const updatedElements = JSON.parse(JSON.stringify(savedElements));
    updatedElements[id].x = x; // Updates X coordinate of dragged element
    updatedElements[id].y = y; // Updates Y coordinate of dragged element
    localStorage.setItem("elements", JSON.stringify(updatedElements)); // Updates localStorage with modified elements
    setSavedElements(updatedElements); // Updates state with modified elements
  };

  return (
    <div
      className="app sm:flex-row flex-col"
      onKeyDown={handleKeyDown}
      tabIndex={0} // Allows the component to receive keyboard events
    >
      {/* Board component displaying elements */}
      <Board
        elements={savedElements}
        focusedElement={focusedElement}
        setFocusedElement={setFocusedElement}
        handleDragAndDrop={handleDragAndDrop}
      />

      {/* Sidebar component for element management */}
      <Sidebar
        setCurrentElementDetails={setCurrentElementDetails}
        setShowModal={setShowModal}
      />

      {/* Modal component for displaying and updating element details */}
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          element={currentElementDetails}
          handleAddOrUpdateElement={handleAddOrUpdateElement}
        />
      )}
    </div>
  );
};

export default App;
