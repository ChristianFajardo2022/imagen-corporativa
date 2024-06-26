import { useEffect, useState, useRef } from "react";
import TakePhoto from "./TakePhoto";
import { SelectorMedidas } from "./SelectorMedidas";

export const CamposMedidas = ({
  medida,
  autoFocus,
  takephoto,
  setData,
  imgSrc,
  setImgSrc,
  tipoMedida,
  title,
  fetchNumber,
}) => {
  const [number, setNumber] = useState();

  useEffect(() => {
    if (fetchNumber) {
      setNumber(fetchNumber);
    }
  }, [fetchNumber]);

  const inputRef = useRef(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value.replace(/[^\d]/g, ""); // Remover caracteres no numéricos
    setNumber(value);
    //console.log(name);
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (e) => {
    const value = e.target.value.replace(" cm", "").trim();
    setNumber(value);
  };

  const handleBlur = (e) => {
    const value = e.target.value;
    if (!value.endsWith("cm") && value !== "") {
      setNumber(value + " cm");
    }
  };

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const handleTabKey = (event) => {
      if (event.key === "Tab" || event.key === "Enter") {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleTabKey);

    return () => {
      document.removeEventListener("keydown", handleTabKey);
    };
  }, []);

  return (
    <div className="campos w-full flexCenter flex-col px-2 relative">
      <div className="bg-[--btn-active] px-10 pt-6 rounded-2xl">
        <p className="w-full text-white text-center">
          {takephoto ? (
            <>
              Toma una foto desde tu celular o comparte una imagen desde tu
              computador en formato jpg o png
            </>
          ) : (
            <>
              Toma la medida como se muestra en la imagen y escríbela aquí en cm{" "}
              <b>"ejemplo: 150 cm."</b>
            </>
          )}
        </p>

        {takephoto ? (
          <TakePhoto takephoto={true} imgSrc={imgSrc} setImgSrc={setImgSrc} />
        ) : (
          <>
            <input
              autoComplete="off"
              ref={inputRef}
              className="text-center"
              type="text"
              name={medida}
              placeholder={`${medida} en cm`}
              value={number}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </>
        )}
      </div>
    </div>
  );
};

/* 

return (
    <div className="campos w-full flexCenter flex-col px-2 relative">
      <div className="bg-[--btn-active] px-10 pt-6 rounded-2xl">
        <p className="w-full text-white text-center">
        { takephoto ? (<>Toma una foto desde tu celular o comparte una imagen desde tu computador en formato jpg o png</>) : (<>Toma la medida como se muestra en la imagen y escríbela aquí en cm <b>"ejemplo: 150 cm."</b></>)} 
        </p>

        {takephoto ? (
          <TakePhoto takephoto={true} imgSrc={imgSrc} setImgSrc={setImgSrc} />
        ) : (
          <>
            {title === "Counter" ? (
              <SelectorMedidas
                setData={setData}
                tipoMedida={tipoMedida}
                nombreMedida={medida}
              />
            ) : (
              <input
                autoComplete="off"
                ref={inputRef}
                className="text-center"
                type="text"
                name={medida}
                placeholder={`${medida} en cm`}
                value={number}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            )}
          </>
          
        )}
      </div>
    </div>
  );
*/
