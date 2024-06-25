import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { CamposMedidas } from "./CamposMedidas";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Medias de ancho
const medidasAncho = [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210];
//Medias de alto
const medidasAlto = [120];

export const SlideMedidas = ({
  setMedidaNum,
  index,
  setData,
  imgSrc,
  setImgSrc,
  sliderRef,
  title,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    centerPadding: "30px",
    centerMode: true,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index) => {
      setCurrentSlide(index);
      setMedidaNum(index);
    }, // actualizar el índice del slide actual
  };

  const handleKeyDown = (e) => {
    if (sliderRef.current) {
      if (e.key === "Enter") {
        sliderRef.current.slickNext();
      } else if (e.key === "Tab" && e.shiftKey) {
        sliderRef.current.slickPrev();
      } else if (e.key === "Tab") {
        sliderRef.current.slickNext();
      }
    }
  };

  return (
    <div
      className="h-full w-full boxMedidas"
      onKeyDown={handleKeyDown}
      tabIndex={index}
    >
      <Slider {...settings} ref={sliderRef}>
        <div>
          <CamposMedidas
            title={title}
            tipoMedida={medidasAncho}
            setData={setData}
            medida={"ancho"}
            autoFocus={currentSlide === 0}
          />
        </div>
        <div>
          <CamposMedidas
            title={title}
            tipoMedida={medidasAlto}
            setData={setData}
            medida={"alto"}
            autoFocus={currentSlide === 1}
          />
        </div>
        <div>
          <CamposMedidas
            title={title}
            setData={setData}
            medida={"Foto"}
            autoFocus={currentSlide === 2}
            takephoto={true}
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
          />
        </div>
      </Slider>
    </div>
  );
};
