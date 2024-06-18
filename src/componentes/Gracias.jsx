import React from "react";
import { Layout } from "./Layout";
import { useDispatch } from "react-redux";
import { setPagina } from "../store/slices/counter/counterSlides";

export const Gracias = () => {
  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(setPagina(0));
  };
  return (
    <>
      <Layout
        handleClick={handleNext}
        navBar={true}
        textBtn={"Finalizar"}
        btnTrue={true}
        active={true}
      >
        <div className="flex flex-col justify-center items-center h-[80vh] lg:px-10 xs:px-6 lg:py-16 xs:py-6">
          <h2 className="text-7xl w-full text-start mb-8">¡Gracias!</h2>
          <p>
            Con tu ayuda, haremos de cada espacio una experiencia única para
            nuestros clientes
          </p>
        </div>
      </Layout>
    </>
  );
};
