import React from "react";
import { MenuItem } from "./menuitem"; // Assuming MenuItem component is imported correctly

// List of input types available in the sidebar
const inputTypes = ["label", "input", "button"];

/**
 * Sidebar component displaying different input types for selection.
 * Allows users to choose from predefined input types to add elements to the board.
 */
const Sidebar = ({ setCurrentElementDetails, setShowModal, exportPage }) => (
  <div className="sidebar sm:w-[250px] w-full">
    <div className="sidebar-header">BLOCKS</div>
    {inputTypes.map((type) => (
      <MenuItem
        key={type} // Unique key for each input type
        type={type} // Type of the menu item (e.g., "label", "input", "button")
        setCurrentElementDetails={setCurrentElementDetails} // Function to set current element details when menu item is clicked
        setShowModal={setShowModal} // Function to control modal visibility when menu item is clicked
      />
    ))}
    {/* Export button */}
    <button className="export-button" onClick={exportPage}>
      Export Page
    </button>
  </div>
);

export default Sidebar;
