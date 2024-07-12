import React from "react";

export default function Element({
  type,
  text,
  x,
  y,
  fontSize,
  fontWeight,
  onClick,
  focused,
  onDragEnd,
}) {
  // Common styles for elements
  const commonStyles = {
    position: "absolute",
    left: x + "px",
    top: y + "px",
    fontSize: fontSize + "px",
    fontWeight: fontWeight,
  };
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
    onDragEnd,
  };

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
  }
}
