import React from "react";
import { useDispatch } from "react-redux";
import { increment } from "../store/slices/counter/counterSlides";
import { Layout } from "./Layout";
import { Propiedad } from "./Propiedad";
import { SeleccionTipoCounter } from "./SeleccionTipoCounter";

export const CantidadElementos = ({handleFirebase,
  NumMobiliarios,
  setActive,
  active,
  title,
  mobiliario,
  setNumeCounter,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(increment());

handleFirebase();
  };

  return (
    <>
      <Layout
        handleClick={handleClick}
        textBtn={"Continuar"}
        active={active ? true : false}
        btnTrue={true}
      >
        <Propiedad
          title={title}
          mobiliario={`${title === "aviso" ? title : mobiliario}.webp`}
        >
          <>
            <p className="w-1/2 mx-auto text-center">
              {`¿Cuántos ${
                title === "aviso" ? "avisos" : title
              } tienes en el local?`}
            </p>
            <SeleccionTipoCounter
              title={title}
              setNumeCounter={setNumeCounter}
              NumCounter={NumMobiliarios}
              setActive={setActive}
            />
          </>
        </Propiedad>
      </Layout>
    </>
  );
};
