import React, { useState } from "react";

import { Selector } from "./Selector";
import { Layout } from "./Layout";
import { useDispatch } from "react-redux";
import { increment } from "../store/slices/counter/counterSlides";

const selectores = ["Agencia", "Alianza", "Corresponsal", "Punto de venta"];

export const TipoAgencia = () => {
  const [active, setActive] = useState(false);
  const [activeSelector, setActiveSelector] = useState(null);
  const dispatch = useDispatch();
  // Función para manejar el clic en un selector
  const handleClick = (selector) => {
    setActiveSelector(selector);
  };
  return (
    <>
      <Layout
        handleClick={() => dispatch(increment())}
        textBtn={"Continuar"}
        active={active}
        btnTrue={true}
      >
        <h2 className="-tracking-wider">¿Qué tipo de mobiliario tienes?</h2>
        <div className="flex flex-col">
          {selectores.map((selector) => (
            <Selector
              key={selector}
              title={selector}
              active={selector === activeSelector}
              handleClick={() => handleClick(selector)}
            />
          ))}
        </div>
      </Layout>
    </>
  );
};
