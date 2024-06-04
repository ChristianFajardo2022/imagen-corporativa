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
          <figure className="w-14 h-14">
            <img className="" src="/chuloaprobado.svg" alt="Aprobado" />
          </figure>

          <h1 className="text-4xl mt-4">Datos verificados</h1>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[80vh] px-10">
          <figure>
          <img className="w-14" src="/chulodesaprobado.svg" alt="No Aprobado" />  
          </figure>
          
          <h1 className="text-4xl mt-4">Datos equivocados</h1>
        </div>
      )}
    </Layout>
  );
};

export default Comprobado;
