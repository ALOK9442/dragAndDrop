import React, { useState } from "react";

const Modal = ({ setShowModal, element = {}, handleAddOrUpdateElement }) => {
  const { id } = element;

  const [formValues, setFormValues] = useState(
    JSON.parse(JSON.stringify(element))
  );

  const handleClose = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const { text, x, y, fontSize, fontWeight } = formValues;
    if (text && x && y && fontSize && fontWeight) {
      handleAddOrUpdateElement({ id, ...formValues });
      setShowModal(false);
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
        <div className="z-100 p-2 text-[#ccc] cursor-pointer top-[10px] right-[0px] absolute" onClick={handleClose}>
          X
        </div>
        <div className="modal-content">
          <h2 className="modal-heading">Edit Label</h2>
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
