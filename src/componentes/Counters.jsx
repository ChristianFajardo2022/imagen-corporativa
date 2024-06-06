import React, { useState } from "react";
import { Layout } from "./Layout";
import { SeleccionTipoCounter } from "./SeleccionTipoCounter";
import { useSelector } from "react-redux";
import { CantidadElementos } from "./CantidadElementos";

export const Counters = () => {
  const { formData } = useSelector((state) => state.counter);
  const [active, setActive] = useState(false);

  const NumCounters = formData.NumCounters;
  const mobiliario = formData.mobiliario;

  return (
    <>
      <CantidadElementos
        NumMobiliarios={NumCounters}
        setActive={setActive}
        active={active}
        title={"Counter"}
        mobiliario={mobiliario}
      />
    </>
  );
};
