import React, { useEffect, useState } from "react";
import { Layout } from "./Layout";
import { Propiedad } from "./Propiedad";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../store/slices/counter/counterSlides";
import { SlideMedidas } from "./SlideMedidas";

export const Counter = () => {
  const { formData } = useSelector((state) => state.counter);
  const [medidaNum, setMedidaNum] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const [active, setActive] = useState(false);
  const [inicial, setInicial] = useState(0);
  const dispatch = useDispatch();
  const NumCounters = formData.NumCounters;
  const mobiliario = formData.mobiliario;
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

  /* useEffect(() => {
    setDataCounter((prev) => [...prev, dataForm]);
  }, [dataCounter]); */

  const handleClick = () => {
    if (posicionPropiedad >= NumCounters) {
      setDataCounter((prev) => [...prev, dataForm]);
      setTimeout(() => {
        dispatch(increment());
      }, 1000);
    } else {
      setInicial(inicial + 1);
      setDataCounter((prev) => [...prev, dataForm]);
      setImgSrc(null);
    }
  };

  console.log(dataCounter);

  return (
    <>
      <Layout
        handleClick={handleClick}
        textBtn={"Continuar"}
        active={active ? true : false}
        btnTrue={true}
      >
        {Array.from(
          { length: NumCounters },
          (_, index) =>
            inicial == index && (
              <Propiedad
                key={index}
                title={`Counter #${index + 1}`}
                mobiliario={
                  imgSrc && medidaNum === 2
                    ? imgSrc
                    : `${mobiliario}${
                        medidaNum === null || medidaNum === 2 ? "" : medidaNum
                      }.webp`
                }
              >
                <>
                  <SlideMedidas
                    index={index}
                    imgSrc={imgSrc}
                    setImgSrc={setImgSrc}
                    setMedidaNum={setMedidaNum}
                    setData={setDataForm}
                  />
                </>
              </Propiedad>
            )
        )}
      </Layout>
    </>
  );
};
