import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar";

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

  return (
    <div className="app" onKeyDown={handleKeyDown} tabIndex={0}>
      <Sidebar
        setCurrentElementDetails={setCurrentElementDetails}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default App;
