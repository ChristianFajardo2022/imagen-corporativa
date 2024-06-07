import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../store/slices/counter/counterSlides";
import { ConstructorPropiedades } from "./ConstructorPropiedades";

export const Aviso = () => {
  const { formData } = useSelector((state) => state.counter);
  const [medidaNum, setMedidaNum] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const [active, setActive] = useState(false);
  const [inicial, setInicial] = useState(0);
  const dispatch = useDispatch();
  const NumCounters = formData.NumAvisos;
  const mobiliario = "aviso";
  let posicionPropiedad = inicial + 1;
  const [dataCounter, setDataCounter] = useState([]);
  const [dataForm, setDataForm] = useState({
    ancho: "",
    alto: "",
    imagen: "",
  });

  useEffect(() => {
    setDataForm((pre) => ({ ...pre, imagen: imgSrc }));
  }, [imgSrc]);

  const handleClick = () => {
    if (posicionPropiedad >= NumCounters) {
      setDataCounter((prev) => [...prev, dataForm]);
      setTimeout(() => {
        dispatch(increment());

        /* Funcion aqui para enviar a la base de datos */
      }, 1000);
    } else {
      setInicial(inicial + 1);
      setDataCounter((prev) => [...prev, dataForm]);
      setImgSrc(null);
    }
  };

  console.log(dataCounter);

  return (
    <ConstructorPropiedades
      title={mobiliario}
      handleClick={handleClick}
      active={active}
      NumCounters={NumCounters}
      inicial={inicial}
      imgSrc={imgSrc}
      mobiliario={mobiliario}
      setImgSrc={setImgSrc}
      setMedidaNum={setMedidaNum}
      medidaNum={medidaNum}
      setDataForm={setDataForm}
    />
  );
};
