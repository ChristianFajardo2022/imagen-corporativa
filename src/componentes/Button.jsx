import React from "react";

export const Button = ({ text, customStyle }) => {
  return <button className={`${customStyle} btn`}>{text}</button>;
};
