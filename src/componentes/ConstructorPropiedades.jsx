import React, { useRef } from "react";
import { SlideMedidas } from "./SlideMedidas";
import { Propiedad } from "./Propiedad";
import { Layout } from "./Layout";

export const ConstructorPropiedades = ({
  handleClick,
  active,
  NumCounters,
  inicial,
  imgSrc,
  mobiliario,
  setImgSrc,
  setMedidaNum,
  setDataForm,
  medidaNum,
  title,
  paginalocal,
}) => {
  const sliderRef = useRef(null);

  const HandleNext = () => {
    if (medidaNum <= 1) {
      sliderRef.current.slickNext();
    } else {
      active ? handleClick() : alert("Ningún campo puede estar vacío");
    }
  };

  return (
    <>
      <Layout
        handlePagina={paginalocal ? paginalocal : null}
        handleClick={HandleNext}
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
                title={`${title} ${index < 1 ? "" : `#${index + 1}`}`}
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
                    sliderRef={sliderRef}
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