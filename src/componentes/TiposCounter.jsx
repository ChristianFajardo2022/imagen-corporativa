import React, { useEffect, useState } from "react";
import { Layout } from "./Layout";
import { Selector } from "./Selector";
import { SeleccionTipoCounter } from "./SeleccionTipoCounter";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  setData,
} from "../store/slices/counter/counterSlides";
import { SlideMedidas } from "./SlideMedidas";
import { uploadBlobToStorage } from "../firebase/firebaseService";

const TipodeCounter = [
  {
    antiguo: {
      imagenes: {
        counter: "/antiguo",
        local: "/localAntiguo",
        aviso: "/aviso",
      },
      counter: [],
      local: [],
      aviso: [],
    },
  },
  {
    nuevo: {
      imagenes: {
        counter: "/nuevo",
        cenefa: "/cenefa",
        local: "/localNuevo",
        aviso: "/aviso",
      },
      counter: [],
      cenefa: [],
      local: [],
      aviso: [],
    },
  },
];
const opcionesMobiliario = ["counter", "cenefa", "local", "aviso"];

export const TiposCounter = () => {
  const { formData, Pagina } = useSelector((state) => state.counter);
  const [medidaNum, setMedidaNum] = useState(null);
  const [dataForm, setDataForm] = useState({
    ancho: "",
    alto: "",
    imagen: "",
  });
  const [active, setActive] = useState(false);
  const [Propiedad, setPropiedad] = useState([]);
  const [nuMobiliario, setNuMobiliario] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const NumCounter = formData.NumCounters;
  const mobiliario = formData.mobiliario;
  const [counters, setCounters] = useState(NumCounter - NumCounter);
  const dispatch = useDispatch();

  //Filtramos para ubicar el tipo de mobiliario y sus propiedades
  const TipoMobiliario = TipodeCounter.filter((obj) =>
    obj.hasOwnProperty(mobiliario)
  ).map((obj) => obj[mobiliario])[0];

  const [arryMobiliario, setArryMobiliario] = useState([]);

  useEffect(() => {
    if (TipoMobiliario) {
      const opcionesFiltradas = opcionesMobiliario.filter((opcion) =>
        TipoMobiliario.hasOwnProperty(opcion)
      );
      setArryMobiliario(opcionesFiltradas);
    }
  }, [TipoMobiliario]);

  // Lógica para obtener la imagen
  let imagen = null;
  if (TipoMobiliario) {
    imagen = TipoMobiliario.imagenes[arryMobiliario[nuMobiliario]];
  }

  const agregarValoresAlArray = (array, valores) => {
    dispatch(setData({ key: array, value: valores }));
    return;
  };

  useEffect(() => {
    agregarValoresAlArray(arryMobiliario[nuMobiliario], Propiedad);
  }, [Propiedad]);

  //TODO Funcion que avanza a redux
  const handleClick = () => {
    const newNum = NumCounter - 2;
    if (Pagina === 5) {
      dispatch(increment());
      setActive(false);
      setMedidaNum(0);
    } else if (Pagina === 6) {
      if (counters <= newNum) {
        setCounters(counters + 1);
        setMedidaNum(0);
        setPropiedad((prevPropiedades) => [...prevPropiedades, dataForm]);
      } else {
        setPropiedad((prevPropiedades) => [...prevPropiedades, dataForm]);

        setTimeout(() => {
          dispatch(increment());
          setNuMobiliario(nuMobiliario + 1);
          setMedidaNum(null);
          setPropiedad([]);
        }, 1000);
      }
    } else if (Pagina >= 7) {
      setPropiedad((prevPropiedades) => [...prevPropiedades, dataForm]);

      setTimeout(() => {
        dispatch(increment());
        setNuMobiliario(nuMobiliario + 1);
        setMedidaNum(null);
        setPropiedad([]);
      }, 1000);
    }
  };

  const handlePagina = () => {
    dispatch(decrement());
    setMedidaNum(null);
  };

  const filter = arryMobiliario.filter((item) => item !== "counter");

  
    const handleUpload = async () => {
      if (imgSrc) {
        try {
          const response = await fetch(imgSrc);
          const blob = await response.blob();
          const result = await uploadBlobToStorage(blob, "images");
  
          if (result.success) {
            console.log("Image uploaded successfully:", result.url);
            // Puedes guardar la URL en el estado o en Redux si es necesario
          } else {
            console.error("Error uploading image:", result.error);
          }
        } catch (error) {
          console.error("Error fetching the blob:", error);
        }
      }
    };
  
    handleUpload();
  

  console.log(imgSrc)
  return (
    <>
      <Layout
        handlePagina={handlePagina}
        handleClick={handleClick}
        textBtn={"Continuar"}
        active={active ? true : false}
        btnTrue={true}
      >
        <div>
          <h3 className="w-full text-center mt-8">
            {arryMobiliario[nuMobiliario]}
          </h3>

          <figure className="h-96 w-full my-8 lg:px-10 xs:px-6">
            {imgSrc != null && medidaNum === 2 ? (
              <img className="object-contain" src={imgSrc} alt="" />
            ) : (
              <img
                className="object-contain"
                src={`${
                  medidaNum === null || medidaNum === 2
                    ? imagen
                    : imagen + medidaNum
                }.webp`}
                alt=""
              />
            )}
          </figure>
          <div className="min-h-80 h-1 w-full xs:overflow-x-scroll lg:overflow-hidden">
            {Pagina == 5 && (
              <>
                <p className="w-1/2 mx-auto text-center">
                  ¿Cuántos counter tienes en el local?
                </p>
                <SeleccionTipoCounter
                  NumCounter={NumCounter}
                  setActive={setActive}
                />
              </>
            )}
            {Pagina == 6 && (
              <>
                {Array.from({ length: NumCounter }, (_, index) => (
                  <div key={index}>
                    {index == counters && (
                      <SlideMedidas
                        index={index}
                        key={index}
                        setMedidaNum={setMedidaNum}
                        setData={setDataForm}
                        imgSrc={imgSrc}
                        setImgSrc={setImgSrc}
                      />
                    )}
                  </div>
                ))}
              </>
            )}
            {Pagina >= 7 && (
              <>
                {filter.map((index) => (
                  <>
                    {index == arryMobiliario[nuMobiliario] && (
                      <SlideMedidas
                        index={index}
                        setMedidaNum={setMedidaNum}
                        setData={setDataForm}
                        imgSrc={imgSrc}
                        setImgSrc={setImgSrc}
                      />
                    )}
                  </>
                ))}
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};
