import React, { useState } from "react";
import { Layout } from "./Layout";
import { SeleccionTipoCounter } from "./SeleccionTipoCounter";
import { useDispatch, useSelector } from "react-redux";
import { CantidadElementos } from "./CantidadElementos";
import { setAvisos, setPagina } from "../store/slices/counter/counterSlides";
import { updateLocaleData } from "../firebase/firebaseService";

export const Avisos = () => {
  const { formData } = useSelector((state) => state.counter);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const NumCounters = formData.NumAvisos;
  const mobiliario = formData.mobiliario;

  const handleAvisoFirebase = async () => {
    try {
      // Agregar datos a Firestore

      await updateLocaleData(formData.id, "NumCounters", NumCounters);
    } catch (error) {
      console.error(
        "Error al actualizar los datos de avisos en firestore:",
        error
      );
    }
  };

  const paginalocal = () => {
    if (formData.mobiliario === "aviso") {
      dispatch(setPagina(4));
    } else {
      dispatch(decrement());
    }
  };

  return (
    <>
      <CantidadElementos
        paginalocal={paginalocal}
        setNumeCounter={setAvisos}
        NumMobiliarios={NumCounters}
        setActive={setActive}
        active={active}
        title={"aviso"}
        mobiliario={mobiliario}
        handleFirebase={handleAvisoFirebase}
      />
    </>
  );
};
