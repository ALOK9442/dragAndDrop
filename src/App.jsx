import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar";
import FieldPage from "./components/fieldpage";
import Modal from "./components/modal";

// Define the main App component
const App = () => {
  const [currentElementDetails, setCurrentElementDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [focusedElement, setFocusedElement] = useState(null);
  const [savedElements, setSavedElements] = useState(
    JSON.parse(localStorage.getItem("elements")) || {}
  );

  const handleElementDelete = (id) => {
    const updatedElements = JSON.parse(JSON.stringify(savedElements));
    delete updatedElements[id];
    localStorage.setItem("elements", JSON.stringify(updatedElements));
    setSavedElements(updatedElements);
  };
  const handleElementUpdate = (id) => {
    setCurrentElementDetails(savedElements[id]);
    setShowModal(true);
  };

  const handleKeyDown = (event) => {
    if (focusedElement && !showModal) {
      if (event.key === "Enter") {
        handleElementUpdate(focusedElement);
      } else if (event.key === "Delete") {
        handleElementDelete(focusedElement);
        setFocusedElement(null);
      }
    }
  };

  const handleAddOrUpdateElement = (element) => {
    const updatedElements = { ...savedElements, [element.id]: element };
    localStorage.setItem("elements", JSON.stringify(updatedElements));
    setSavedElements(updatedElements);
    setCurrentElementDetails({});
  };

  const handleDragAndDrop = (id, x, y) => {
    const updatedElements = JSON.parse(JSON.stringify(savedElements));
    updatedElements[id].x = x;
    updatedElements[id].y = y;
    localStorage.setItem("elements", JSON.stringify(updatedElements));
    setSavedElements(updatedElements);
  };

  return (
    <div
      className="app sm:flex-row flex-col"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <FieldPage
        elements={savedElements}
        focusedElement={focusedElement}
        setFocusedElement={setFocusedElement}
        handleDragAndDrop={handleDragAndDrop}
      />
      <Sidebar
        setCurrentElementDetails={setCurrentElementDetails}
        setShowModal={setShowModal}
      />

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
