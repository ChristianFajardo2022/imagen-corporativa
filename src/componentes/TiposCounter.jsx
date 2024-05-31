import React, { useState } from "react";
import { Layout } from "./Layout";
import { Selector } from "./Selector";
import { SeleccionTipoCounter } from "./SeleccionTipoCounter";

export const TiposCounter = () => {
  const [active, setActive] = useState(false);
  return (
    <>
      <Layout
        //handleClick={() => dispatch(increment())}
        textBtn={"Continuar"}
        active={active ? true : false}
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
          <SeleccionTipoCounter setActive={setActive} />
        </div>
      </Layout>
    </>
  );
};
