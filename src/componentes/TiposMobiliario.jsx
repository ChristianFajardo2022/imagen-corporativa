import { useState } from "react";
import { BoxMobiliario } from "./BoxMobiliario";
import { Layout } from "./Layout";
import { useDispatch } from "react-redux";
import { increment } from "../store/slices/counter/counterSlides";

const selectorBox = [
  {
    title: "Antiguo",
    img: "/antiguo.webp",
  },
  {
    title: "Nuevo",
    img: "/nuevo.webp",
  },
];

export const TiposMobiliario = () => {
  const [activeSelector, setActiveSelector] = useState(null);
  const [active, setActive] = useState(null);
  const dispatch = useDispatch();
  // Función para manejar el clic en un selector
  const handleClick = (selector) => {
    setActiveSelector(selector);
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
          <p className="mt-6 cursor-pointer underline font-light w-full text-center">
            Solo cuento con aviso
          </p>
        </div>
      </Layout>
    </>
  );
};
