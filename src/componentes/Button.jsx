import React from "react";

export const Button = ({ text, customStyle, handleClick }) => {
  return (
    <button onClick={handleClick} className={`${customStyle} btn`}>
      {text}
    </button>
  );
};
