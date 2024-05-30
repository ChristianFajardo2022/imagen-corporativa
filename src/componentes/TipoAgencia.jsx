import React, { useState } from "react";

import { Selector } from "./Selector";

const selectores = ["Agencia", "Alianza", "Corresponsal", "Punto de venta"];

export const TipoAgencia = () => {
  const [activeSelector, setActiveSelector] = useState(null);
  // Función para manejar el clic en un selector
  const handleClick = (selector) => {
    setActiveSelector(selector);
  };
  return (
    <>
      {selectores.map((selector) => (
        <Selector
          key={selector}
          title={selector}
          active={selector === activeSelector}
          handleClick={() => handleClick(selector)}
        />
      ))}
    </>
  );
};
