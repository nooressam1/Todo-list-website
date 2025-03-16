import React, { useState } from "react";
import "../Css files/Login.css";

const Checkbox = ({ name, value, title, Change }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    const newChecked = !checked; 
    setChecked(newChecked); 
    Change(newChecked);
  };

  return (
    <div
      style={{
        width: "80%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <input
        type="checkbox"
        id={name}
        name={name}
        value={value}
        checked={checked} 
        onChange={handleCheckboxChange}
        style={{
          backgroundColor: "white",
          border: "1px solid gray",
        }}
      />
      <label
        htmlFor={name} 
        style={{ cursor: "pointer" }}
        className="SmallerTextStyles"
      >
        {title}
      </label>
    </div>
  );
};

export default Checkbox;
