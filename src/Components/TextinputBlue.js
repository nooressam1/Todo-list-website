import React from "react";

const TextinputBlue = ({ TextinputTitle, TextinputText,setValue }) => {
  return (
    <div style={{ width: "80%" }}>
      <label
        htmlFor="fname"
        style={{
          color: "#99b9f0",
          fontsize: "1vw",
          marginBottom: "2%",
          fontweight: "400",
          display: "block",
        }}
      >
        {TextinputTitle}
      </label>
      <input
        type="text"
        id="fname"
        name="fname"
        placeholder={TextinputText}
        onChange={(e)=>{setValue(e.target.value)}}
        style={{
          padding: "3%",
          color: "#616263",
          width: "90%",
          display: "block",
          border: " transparent",
          borderRadius:"10px",
          outline: "none",
          boxShadow: "inset 1px 1px 5px rgba(59, 59, 59, 0.2)", // Inner shadow
          
        }}
      />
    </div>
  );
};

export default TextinputBlue;
