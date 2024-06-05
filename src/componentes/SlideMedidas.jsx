import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { CamposMedidas } from "./CamposMedidas";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const SlideMedidas = ({ setMedidaNum }) => {
  const sliderRef = useRef(null);
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
      tabIndex={0}
    >
      <Slider {...settings} ref={sliderRef}>
        <div>
          <CamposMedidas
            medida={"Ancho en cm"}
            autoFocus={currentSlide === 0}
          />
        </div>
        <div>
          <CamposMedidas medida={"Alto en cm"} autoFocus={currentSlide === 1} />
        </div>
        <div>
          <CamposMedidas
            medida={"Foto"}
            autoFocus={currentSlide === 2}
            takephoto={true}
          />
        </div>
      </Slider>
    </div>
  );
};
