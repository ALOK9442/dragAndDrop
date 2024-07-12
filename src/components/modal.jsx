import React, { useState } from "react";

/**
 * Modal component for editing or adding elements.
 * Allows users to modify element details such as text, position, font size, and font weight.
 */
const Modal = ({ setShowModal, element = {}, handleAddOrUpdateElement }) => {
  const { id } = element;

  // State to manage form input values
  const [formValues, setFormValues] = useState(
    JSON.parse(JSON.stringify(element))
  );

  // Function to close the modal
  const handleClose = () => {
    setShowModal(false);
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevState) => ({ ...prevState, [id]: value }));
  };

  // Function to handle form submission
  const handleSave = (e) => {
    e.preventDefault();
    const { text, x, y, fontSize, fontWeight } = formValues;
    // Validation: Ensure required fields are filled
    if (text && x && y && fontSize && fontWeight) {
      handleAddOrUpdateElement({ id, ...formValues }); // Adds or updates element with form values
      setShowModal(false); // Closes the modal after saving changes
    }
  };

  return (
    <div className="modal-background" onClick={handleClose}>
      <form
        id="modal-form"
        className="modal-box bg-white"
        onSubmit={handleSave}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="z-100 p-2 text-[#ccc] cursor-pointer top-[10px] right-[0px] absolute" onClick={handleClose}>
          X
        </div>
        <div className="modal-content">
          <h2 className="modal-heading">Edit Label</h2>
          {/* Input fields for editing element details */}
          <div className="input-label">Text</div>
          <input
            id="text"
            type="text"
            className="input-field"
            defaultValue={formValues.text}
            onChange={handleChange}
          />
          <div className="input-label">X</div>
          <input
            id="x"
            type="number"
            className="input-field"
            defaultValue={formValues.x}
            onChange={handleChange}
          />
          <div className="input-label">Y</div>
          <input
            id="y"
            type="number"
            className="input-field"
            defaultValue={formValues.y}
            onChange={handleChange}
          />
          <div className="input-label">Font Size</div>
          <input
            id="fontSize"
            type="number"
            className="input-field"
            defaultValue={formValues.fontSize}
            onChange={handleChange}
          />
          <div className="input-label">Font Weight</div>
          <input
            id="fontWeight"
            type="text"
            className="input-field"
            defaultValue={formValues.fontWeight}
            onChange={handleChange}
          />
        </div>
        {/* Save button */}
        <input
          type="submit"
          value="Save Changes"
          onClick={handleSave}
          className="save-button"
        />
      </form>
    </div>
  );
};

export default Modal;
