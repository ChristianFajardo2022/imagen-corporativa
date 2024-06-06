import React from "react";
import { SeleccionTipoCounter } from "./SeleccionTipoCounter";

export const Propiedad = ({ title, mobiliario, children }) => {
  return (
    <>
      <h3 className="w-full text-center mt-8">{title}</h3>

      <figure className="h-96 w-full my-8 lg:px-10 xs:px-6">
        <img className="object-contain" src={mobiliario} alt="" />
      </figure>
      <div className="min-h-80 h-1 w-full xs:overflow-x-scroll lg:overflow-hidden">
        {children}
      </div>
    </>
  );
};
