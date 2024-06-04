import { useState } from "react";
import { BoxMobiliario } from "./BoxMobiliario";
import { Layout } from "./Layout";
import { useDispatch } from "react-redux";
import {
  increment,
  setData,
  setPagina,
} from "../store/slices/counter/counterSlides";

const selectorBox = [
  {
    title: "antiguo",
    img: "/antiguo.webp",
  },
  {
    title: "nuevo",
    img: "/nuevo.webp",
  },
];

export const TiposMobiliario = () => {
  const [activeSelector, setActiveSelector] = useState(null);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  // Función para manejar el clic en un selector
  const handleClick = (selector) => {
    setActiveSelector(selector);
    setActive(true);
    dispatch(setData({ key: "mobiliario", value: selector }));
  };

  //Enviar a Aviso

  const HandleGoAviso = () => {
    //dispatch(setPagina(0));
  };
  return (
    <>
      <Layout
        handleClick={() => dispatch(increment())}
        textBtn={"Continuar"}
        active={active}
        btnTrue={true}
      >
        <h2 className="-tracking-wider">¿Qué tipo de mobiliario tienes?</h2>
        <div className="flex flex-col">
          {selectorBox.map((item) => (
            <BoxMobiliario
              handleClick={() => handleClick(item.title)}
              active={item.title === activeSelector}
              key={item.title}
              {...item}
            />
          ))}
          <p
            onClick={HandleGoAviso}
            className="mt-6 cursor-pointer underline font-light w-full text-center"
          >
            Solo cuento con aviso
          </p>
        </div>
      </Layout>
    </>
  );
};
