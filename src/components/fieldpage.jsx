import React from "react";
import Element from "./element";

export default function FieldPage({
  elements = {},
  focusedElement,
  setFocusedElement,
  handleDragAndDrop,
}) {
  console.log({ elements });

  const handleElementClick = (e, id) => {
    e.stopPropagation();
    setFocusedElement(id);
  };

  return (
    <div
      className="page sm:h-screen h-full"
      droppable="true"
      onClick={() => setFocusedElement(null)}
    >
      {Object.values(elements).map(({ id, ...config }) => (
        <Element
          key={id}
          {...config}
          focused={focusedElement === id}
          onClick={(e) => handleElementClick(e, id)}
          onDragEnd={(e) => handleDragAndDrop(id, e.clientX, e.clientY)}
        />
      ))}
    </div>
  );
}
