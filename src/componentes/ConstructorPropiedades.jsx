import React from "react";
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
}) => {
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
