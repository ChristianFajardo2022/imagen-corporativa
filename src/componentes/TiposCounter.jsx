import React from "react";
import { Layout } from "./Layout";
import { Selector } from "./Selector";
import { SeleccionTipoCounter } from "./SeleccionTipoCounter";

export const TiposCounter = () => {
  return (
    <>
      <Layout
        //handleClick={() => dispatch(increment())}
        textBtn={"Continuar"}
        //active={active}
        btnTrue={true}
      >
        <div>
          <h3 className="w-full text-center">Counter</h3>
          <figure className="w-full my-16">
            <img src="/antiguo.webp" alt="" />
          </figure>
          <p className="w-1/2 mx-auto text-center">
            ¿Cuántos counter tienes en el local?
          </p>
          <SeleccionTipoCounter />
        </div>
      </Layout>
    </>
  );
};
