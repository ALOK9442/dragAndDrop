import React from "react";

/**
 * Element component representing different types of elements on the board.
 * Displays elements like labels, input fields, and buttons at specified positions.
 */
export default function Element({
  type, // Type of the element ("label", "input", "button")
  text, // Text content displayed in the element
  x, // X-coordinate position of the element
  y, // Y-coordinate position of the element
  fontSize, // Font size of the text in the element
  fontWeight, // Font weight of the text in the element
  onClick, // Function to handle click events on the element
  focused, // Indicates if the element is currently focused
  onDragEnd, // Function to handle drag end events for the element
}) {
  // Calculate relative positions based on the viewport size
  const leftPercentage = (x / window.innerWidth) * 100;
  const topPercentage = (y / window.innerHeight) * 100;

  // Common styles for elements
  const commonStyles = {
    position: "absolute",
    left: leftPercentage + "vw",
    top: topPercentage + "vh",
    fontSize: fontSize + "px",
    fontWeight: fontWeight,
    cursor: "pointer",
    padding: "8px",
    width: "max-content",
  };

  // Apply additional styling if the element is focused
  if (focused) {
    if (type === "input") {
      commonStyles.outline = "2px solid red";
    } else {
      commonStyles.border = "2px solid red";
    }
  }

  // Common props shared by elements
  const commonProps = {
    style: commonStyles,
    draggable: "true",
    onClick,
    onDragEnd: (e) => {
      document.body.style.cursor = 'auto';
      onDragEnd(e);
    },
  };

  // Render different types of elements based on the specified type
  switch (type) {
    case "label":
      return <span {...commonProps}>{text}</span>;
    case "input":
      return <input {...commonProps} type="text" placeholder={text} />;
    case "button":
      return (
        <button
          {...commonProps}
          style={{
            ...commonProps.style,
            backgroundColor: "#0144c0",
            color: "#ffffff",
            padding: "8px",
          }}
        >
          {text}
        </button>
      );
    default:
      return null;
  }
}
