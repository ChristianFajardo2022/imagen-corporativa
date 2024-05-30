import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import datosFalsos from "./data/datosfalsos.json"; // Importa los datos falsos
import { useSelector } from "react-redux";

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
  const [respuestaCorrecta, setRespuestaCorrecta] = useState("");
  const [error, setError] = useState(null);

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
      const response = await fetch(
        `http://localhost:5000/locales/${getIdFromURL()}`
      );
      if (!response.ok) {
        throw new Error("ID no encontrado");
      }
      const data = await response.json();

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
    <div className="fondo_degradado flex flex-col h-screen relative">
      <Nav />
      <div className="mt-14 px-10">
        <div className="flex justify-center mb-10">
          <img src="/capa1.png" alt="Logo" className="" />
        </div>
        <h1 className="text-4xl font-semibold text-[#2E3136] tracking-tighter">
          Queremos estar seguros de que eres tú
        </h1>
      </div>
      {questions.length > 0 && currentQuestionIndex < questions.length && (
        <>
          <div className="px-10 mt-10">
            <p className="text-[#7D7E79]">{questions[currentQuestionIndex]}</p>
            <div className="my-10 text-sm">
              {opciones.map((opcion, index) => (
                <button
                  key={index}
                  onClick={handleAnswer}
                  className="shadow-md py-4 my-5 w-full rounded-lg text-left pl-4 bg-[#F2F4F9] hover:bg-black hover:text-white"
                >
                  {opcion}
                </button>
              ))}
            </div>
          </div>
          <div className="px-10 absolute bottom-12 w-full">
            <button
              onClick={handleAnswer}
              className="text-[#7D7E79] shadow-md w-full h-12 rounded-3xl bg-[#F2F4F9] hover:bg-black hover:text-white"
            >
              Continuar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Seguridad;
