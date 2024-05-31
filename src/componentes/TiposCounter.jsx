import React, { useState } from "react";
import { Layout } from "./Layout";
import { Selector } from "./Selector";
import { SeleccionTipoCounter } from "./SeleccionTipoCounter";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../store/slices/counter/counterSlides";
import { SlideMedidas } from "./SlideMedidas";

const TipodeCounter = [
  {
    antiguo: {
      imagenes: {
        counter: "/antiguo.webp",
        local: "/localAntiguo.webp",
        aviso: "/aviso.webp",
      },
      counter: [{}],
      local: {},
      aviso: {},
    },
  },
  {
    nuevo: {
      imagenes: {
        counter: "/nuevo.webp",
        cenefa: "/cenefa.webp",
        local: "/localNuevo.webp",
        aviso: "/aviso.webp",
      },
      counter: [{}],
      cenefa: {},
      local: {},
      aviso: {},
    },
  },
];
const opcionesMobiliario = ["counter", "cenefa", "local", "aviso"];

export const TiposCounter = () => {
  const { formData, Pagina } = useSelector((state) => state.counter);
  const [nuMobiliario, setNuMobiliario] = useState(0);
  const NumCounter = formData.NumCounters;
  const tipoMobiliario = formData.mobiliario;
  const dispatch = useDispatch();

  const TipoMobiliario = TipodeCounter.filter((obj) =>
    obj.hasOwnProperty(tipoMobiliario)
  ).map((obj) => obj[tipoMobiliario])[0];

  const imagen = TipoMobiliario.imagenes[opcionesMobiliario[nuMobiliario]];

  if (TipoMobiliario.hasOwnProperty(opcionesMobiliario[nuMobiliario])) {
    console.log(
      `${opcionesMobiliario[nuMobiliario]}:`,
      TipoMobiliario[opcionesMobiliario[nuMobiliario]]
    );
  } else {
    console.log(
      `La propiedad '${opcionesMobiliario[nuMobiliario]}' no existe en el objeto 'antiguo'.`
    );
  }

  const [active, setActive] = useState(false);

  const handleClick = () => {
    dispatch(increment());
    setActive(false);
  };
  return (
    <>
      <Layout
        handleClick={handleClick}
        textBtn={"Continuar"}
        active={active ? true : false}
        btnTrue={true}
      >
        <div>
          <h3 className="w-full text-center">
            {opcionesMobiliario[nuMobiliario]}
          </h3>

          <figure className="w-full my-16">
            <img src={imagen} alt="" />
          </figure>
          <div className="min-h-80">
            {Pagina == 5 && (
              <>
                <p className="w-1/2 mx-auto text-center">
                  ¿Cuántos counter tienes en el local?
                </p>
                <SeleccionTipoCounter
                  NumCounter={NumCounter}
                  setActive={setActive}
                />
              </>
            )}
            {Pagina == 6 && (
              <>
                <SlideMedidas />
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};
