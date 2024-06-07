import React, { useState } from "react";
import { Layout } from "./Layout";
import { SeleccionTipoCounter } from "./SeleccionTipoCounter";
import { useSelector } from "react-redux";
import { CantidadElementos } from "./CantidadElementos";
import { setNumeCounter } from "../store/slices/counter/counterSlides";
import { updateLocaleData } from "../firebase/firebaseService";

export const Counters = () => {
  const { formData } = useSelector((state) => state.counter);
  const [active, setActive] = useState(false);

  const NumCounters = formData.NumCounters;
  const mobiliario = formData.mobiliario;

  const handleCounterFirebase = async () => {
    try {
      // Agregar datos al Firestore
      
      await updateLocaleData(formData.id, "NumCounters", NumCounters);
     
      
    } catch (error) {
      console.error("Error al actualizar los datos en Firestore:", error);
      // Manejar el error aquí
    }
  }

  return (
    <>
      <CantidadElementos
        setNumeCounter={setNumeCounter}
        NumMobiliarios={NumCounters}
        setActive={setActive}
        active={active}
        title={"counter"}
        mobiliario={mobiliario}
        handleFirebase={handleCounterFirebase}
      />
    </>
  );
};
