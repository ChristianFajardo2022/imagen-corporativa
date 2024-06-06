import React from "react";
import { useDispatch } from "react-redux";
import { increment } from "../store/slices/counter/counterSlides";
import { Layout } from "./Layout";
import { Propiedad } from "./Propiedad";
import { SeleccionTipoCounter } from "./SeleccionTipoCounter";

export const CantidadElementos = ({
  NumMobiliarios,
  setActive,
  active,
  title,
  mobiliario,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(increment());
  };

  return (
    <>
      <Layout
        handleClick={handleClick}
        textBtn={"Continuar"}
        active={active ? true : false}
        btnTrue={true}
      >
        <Propiedad title={title} mobiliario={`${mobiliario}.webp`}>
          <>
            <p className="w-1/2 mx-auto text-center">
              ¿Cuántos counter tienes en el local?
            </p>
            <SeleccionTipoCounter
              NumCounter={NumMobiliarios}
              setActive={setActive}
            />
          </>
        </Propiedad>
      </Layout>
    </>
  );
};
