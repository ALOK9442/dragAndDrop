import React, { useCallback } from "react";
import { MenuItem } from "./menuitem";

const inputTypes = ["label", "input", "button"]

const Sidebar = ({ setCurrentElementDetails, setShowModal }) => (
  <div className="sidebar sm:w-[250px] w-full">
    <div className="sidebar-header">BLOCKS</div>
    {inputTypes.map((e) => (
      <MenuItem
        key={e}
        type={e}
        setCurrentElementDetails={setCurrentElementDetails}
        setShowModal={setShowModal}
      />
    ))}
  </div>
);

export default Sidebar;
