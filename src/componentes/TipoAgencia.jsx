import React, { useState } from "react";

import { Selector } from "./Selector";
import { Layout } from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  setData,
  setPagina,
} from "../store/slices/counter/counterSlides";
import { updateLocaleData } from "../firebase/firebaseService";

const selectores = ["Agencia", "Corresponsal", "Punto de venta"];

export const TipoAgencia = () => {
  const [active, setActive] = useState(false);
  const [activeSelector, setActiveSelector] = useState(null);
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.counter.formData);


  // Función para manejar el clic en un selector
  const handleClick = async (selector) => {
    setActiveSelector(selector);
    setActive(true);
    dispatch(setData({ key: "tipoFranquicia", value: selector }));

    try {
      // Agregar datos al Firestore
      await updateLocaleData(formData.id, "ciudad", formData.ciudad);
      await updateLocaleData(formData.id, "tipoFranquicia", selector);
     
      
    } catch (error) {
      console.error("Error al actualizar los datos en Firestore:", error);
      // Manejar el error aquí
    }
  };

  const handlePagina = () => {
    dispatch(setPagina(0));
  };
  return (
    <>
      <Layout
        handlePagina={handlePagina}
        handleClick={() => dispatch(increment())}
        textBtn={"Continuar"}
        active={active}
        btnTrue={true}
      >
        <h2 className="-tracking-wider lg:px-10 xs:px-6 ">
          ¿Qué tipo de mobiliario tienes?
        </h2>
        <div className="flex flex-col lg:px-10 xs:px-6 ">
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
