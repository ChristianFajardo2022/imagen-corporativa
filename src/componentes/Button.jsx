import React from "react";

export const Button = ({ type, text, customStyle, handleClick }) => {
  return (
    <button
      type={type ? "submit" : ""}
      onClick={handleClick}
      className={`${customStyle} btn`}
    >
      {text}
    </button>
  );
};
