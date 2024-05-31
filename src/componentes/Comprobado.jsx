import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Layout } from "./Layout";
import { decrement, increment } from "../store/slices/counter/counterSlides";

const Comprobado = () => {
  const { resultado } = useSelector((state) => state.counter);

  const dispatch = useDispatch();

  const handleNext = () => {
    if (resultado) {
      dispatch(increment());
    } else {
      dispatch(decrement());
    }
  };
  return (
    <Layout
      handleClick={handleNext}
      navBar={true}
      textBtn={resultado ? "Continuar" : "Intentar de nuevo"}
      btnTrue={true}
      active={true}
    >
      {resultado ? (
        <div className="flex flex-col justify-center items-center h-[80vh] px-10">
          <img className="w-14" src="/chuloaprobado.png" alt="Aprobado" />
          <h1 className="text-4xl mt-4">Datos verificados</h1>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[80vh] px-10">
          <img className="w-14" src="/chuloaprobado.png" alt="No Aprobado" />
          <h1 className="text-2xl mt-4">Datos equivocados</h1>
        </div>
      )}
    </Layout>
  );
};

export default Comprobado;
