import React from "react";
import "../Css files/BlueButton.css"
const BlueButton = ({ Title }) => {
  return (
    <div style={{ width: "80%", height: "3.5em" }}>
      <button type="submit" className="bluebuttonstyle" >{Title}</button>
    </div>
  );
};

export default BlueButton;
