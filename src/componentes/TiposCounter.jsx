import React, { useEffect, useState } from "react";
import { Layout } from "./Layout";
import { Selector } from "./Selector";
import { SeleccionTipoCounter } from "./SeleccionTipoCounter";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../store/slices/counter/counterSlides";
import { SlideMedidas } from "./SlideMedidas";

const TipodeCounter = [
  {
    antiguo: {
      imagenes: {
        counter: "/antiguo",
        local: "/localAntiguo",
        aviso: "/aviso",
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
  const [medidaNum, setMedidaNum] = useState(null);
  const [nuMobiliario, setNuMobiliario] = useState(0);
  const NumCounter = formData.NumCounters;
  const mobiliario = formData.mobiliario;
  const dispatch = useDispatch();

  //Filtramos para ubicar el tipo de mobiliario y sus propiedades
  const TipoMobiliario = TipodeCounter.filter((obj) =>
    obj.hasOwnProperty(mobiliario)
  ).map((obj) => obj[mobiliario])[0];

  const [arryMobiliario, setArryMobiliario] = useState([]);

  useEffect(() => {
    if (TipoMobiliario) {
      const opcionesFiltradas = opcionesMobiliario.filter((opcion) =>
        TipoMobiliario.hasOwnProperty(opcion)
      );
      setArryMobiliario(opcionesFiltradas);
    }
  }, [TipoMobiliario]);

  // Lógica para obtener la imagen
  let imagen = null;
  if (TipoMobiliario) {
    imagen = TipoMobiliario.imagenes[arryMobiliario[nuMobiliario]];
  }

  console.log(arryMobiliario);
  const [active, setActive] = useState(false);

  //TODO Funcion que avanza a redux
  /* const handleClick = () => {
    dispatch(increment());
    setActive(false);
    setMedidaNum(0);
  }; */
  const handleClick = () => {
    // Si nuMobiliario es el último índice, vuelve a 0, de lo contrario, incrementa nuMobiliario
    setNuMobiliario(
      nuMobiliario === arryMobiliario.length - 1 ? 0 : nuMobiliario + 1
    );
  };

  const handlePagina = () => {
    dispatch(decrement());
    setMedidaNum(null);
  };

  return (
    <>
      <Layout
        handlePagina={handlePagina}
        handleClick={handleClick}
        textBtn={"Continuar"}
        active={active ? true : false}
        btnTrue={true}
      >
        <div>
          <h3 className="w-full text-center">{arryMobiliario[nuMobiliario]}</h3>

          <figure className="w-full my-16 lg:px-10 xs:px-6">
            <img
              src={`${
                medidaNum === null || medidaNum === 2
                  ? imagen
                  : imagen + medidaNum
              }.webp`}
              alt=""
            />
          </figure>
          <div className="min-h-80 h-1 w-full xs:overflow-x-scroll lg:overflow-hidden">
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
                <SlideMedidas setMedidaNum={setMedidaNum} />
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};
