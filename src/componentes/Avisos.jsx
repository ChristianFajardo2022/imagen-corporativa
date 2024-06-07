import React, { useState } from "react";
import { Layout } from "./Layout";
import { SeleccionTipoCounter } from "./SeleccionTipoCounter";
import { useSelector } from "react-redux";
import { CantidadElementos } from "./CantidadElementos";
import { setAvisos } from "../store/slices/counter/counterSlides";

export const Avisos = () => {
  const { formData } = useSelector((state) => state.counter);
  const [active, setActive] = useState(false);

  const NumCounters = formData.NumAvisos;
  const mobiliario = formData.mobiliario;

  return (
    <>
      <CantidadElementos
        setNumeCounter={setAvisos}
        NumMobiliarios={NumCounters}
        setActive={setActive}
        active={active}
        title={"aviso"}
        mobiliario={mobiliario}
      />
    </>
  );
};
