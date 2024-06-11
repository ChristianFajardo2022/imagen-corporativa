import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, setPagina } from "../store/slices/counter/counterSlides";
import { ConstructorPropiedades } from "./ConstructorPropiedades";

export const Local = () => {
  const { formData } = useSelector((state) => state.counter);
  const [medidaNum, setMedidaNum] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const [active, setActive] = useState(false);
  const [inicial, setInicial] = useState(0);
  const dispatch = useDispatch();
  const NumCounters = 1;
  const mobiliario = formData.mobiliario;
  let posicionPropiedad = inicial + 1;
  const [dataCounter, setDataCounter] = useState([]);
  const [dataForm, setDataForm] = useState({
    ancho: "",
    alto: "",
    imagen: "",
  });

  //manejar el estado de active
  useEffect(() => {
    const camposCompletados = Object.values(dataForm).every(
      (field) => field !== ""
    );
    if (camposCompletados) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [dataForm]);

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

  const paginalocal = () => {
    if (formData.mobiliario === "antiguo") {
      dispatch(setPagina(6));
    }
  };

  return (
    <ConstructorPropiedades
      paginalocal={paginalocal}
      title={"Local"}
      handleClick={handleClick}
      active={active}
      NumCounters={NumCounters}
      inicial={inicial}
      imgSrc={imgSrc}
      mobiliario={`${mobiliario}local`}
      setImgSrc={setImgSrc}
      setMedidaNum={setMedidaNum}
      medidaNum={medidaNum}
      setDataForm={setDataForm}
    />
  );
};