import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { getLocaleById } from "../firebase/firebaseService";
import datosFalsos from "./data/datosfalsos.json"; // Importa los datos falsos
import { useDispatch, useSelector } from "react-redux";
import { resultado } from "../store/slices/counter/counterSlides";
import { Button } from "./Button";

const mezclarOpciones = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Seguridad = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [opciones, setOpciones] = useState([]);
  const [error, setError] = useState(null);
  const { formData } = useSelector((state) => state.counter);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  //Funcion que ejecuta el resultado a TRUE
  dispatch(resultado());

  useEffect(() => {
    setQuestions([
      "¿Cuál de estos es el correo electrónico con el que registraste tu punto?",
      "¿Cuál es la dirección de tu local?",
      "¿En qué ciudad (municipio) está ubicado tu local?",
    ]);
  }, []);

  useEffect(() => {
    if (questions.length > currentQuestionIndex) {
      cargarRespuestaCorrecta(currentQuestionIndex);
    }
  }, [currentQuestionIndex, questions]);

  const cargarRespuestaCorrecta = async (index) => {
    try {
      const { data, error } = await getLocaleById(formData.id);
      if (error) {
        throw new Error(error);
      }

      let opcionesAleatorias = [];
      switch (index) {
        case 0:
          opcionesAleatorias = mezclarOpciones([
            data.email, // Respuesta correcta
            ...datosFalsos.datosAleatorios
              .slice(0, 2)
              .map((item) => item.correo), // Dos datos falsos de emails
          ]);
          break;
        case 1:
          opcionesAleatorias = mezclarOpciones([
            data.direccion, // Respuesta correcta
            ...datosFalsos.datosAleatorios
              .slice(0, 2)
              .map((item) => item.direccion), // Dos datos falsos de direcciones
          ]);
          break;
        case 2:
          opcionesAleatorias = mezclarOpciones([
            data.telefono.toString(), // Respuesta correcta
            ...datosFalsos.datosAleatorios
              .slice(0, 2)
              .map((item) => item.telefono), // Dos datos falsos de teléfonos
          ]);
          break;
        default:
          opcionesAleatorias = [];
      }

      setOpciones(opcionesAleatorias);
    } catch (error) {
      setError(error.message);
    }
  };

  const getIdFromURL = () => {
    const segments = window.location.pathname.split("/");
    return segments[segments.length - 1];
  };

  const handleAnswer = () => {
    setCurrentQuestionIndex((current) => current + 1);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="fondo_degradado flex flex-col justify-between h-full relative">
      <Nav />
      <div>
        <div className="w-20 mx-auto flex justify-center">
          <img src="/user.svg" alt="Logo" className="" />
        </div>
        <h2 className="mt-10 mb-6">Queremos estar seguros de que eres tú</h2>

        {questions.length > 0 && currentQuestionIndex < questions.length && (
          <>
            <div className="">
              <p className="text-[#7D7E79]">
                {questions[currentQuestionIndex]}
              </p>
              <div className="flex flex-col">
                {opciones.map((opcion, index) => (
                  <span
                    key={index}
                    onClick={handleAnswer}
                    className="selectoresTexto"
                  >
                    {opcion}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-10 absolute bottom-12 w-full"></div>
          </>
        )}
      </div>

      <Button
        handleClick={handleAnswer}
        text={"Continuar"}
        customStyle={`${active ? "btnActive" : "pointer-events-none"}`}
      />
    </div>
  );
};

export default Seguridad;
