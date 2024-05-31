import React from "react";

export const BoxMobiliario = ({ img, title, handleClick, active }) => {
  return (
    <div
      onClick={handleClick}
      className={`group cursor-pointer selectoresCaja ${
        active ? "selectorActive" : ""
      } relative`}
    >
      <span className="group-hover:text-white w-1/2 flexCenter text-[--TextoBlack]">
        {title}
      </span>
      <figure className="w-1/2 h-full flexCenter">
        <img className="object-contain" src={img} alt="" />
      </figure>
    </div>
  );
};
