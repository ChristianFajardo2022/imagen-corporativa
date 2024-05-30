import { useState } from "react";
import { BoxMobiliario } from "./BoxMobiliario";

const selectorBox = [
  {
    title: "Antiguo",
    img: "/antiguo.png",
  },
  {
    title: "Nuevo",
    img: "/nuevo.png",
  },
];

export const TiposMobiliario = () => {
  const [activeSelector, setActiveSelector] = useState(null);
  // Función para manejar el clic en un selector
  const handleClick = (selector) => {
    setActiveSelector(selector);
  };
  return (
    <>
      {selectorBox.map((item) => (
        <BoxMobiliario
          handleClick={() => handleClick(item.title)}
          active={item.title === activeSelector}
          key={item.title}
          {...item}
        />
      ))}
    </>
  );
};
