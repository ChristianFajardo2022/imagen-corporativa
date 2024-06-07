import { useState } from "react";
import { BoxMobiliario } from "./BoxMobiliario";
import { Layout } from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  setData,
  setPagina,
} from "../store/slices/counter/counterSlides";
import { updateLocaleData } from "../firebase/firebaseService";

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
  const { formData } = useSelector((state) => state.counter)

  // Función para manejar el clic en un selector
  const handleClick = async (selector) => {
    setActiveSelector(selector);
    setActive(true);
    dispatch(setData({ key: "mobiliario", value: selector }));

    try {
      // Agregar datos al Firestore
      await updateLocaleData(formData.id, "mobiliario", selector);
    
     
      
    } catch (error) {
      console.error("Error al actualizar los datos en Firestore:", error);
      // Manejar el error aquí
    }
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
        <h2 className="-tracking-wider lg:px-10 xs:px-6">
          ¿Qué tipo de mobiliario tienes?
        </h2>
        <div className="flex flex-col lg:px-10 xs:px-6">
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
