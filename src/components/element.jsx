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
