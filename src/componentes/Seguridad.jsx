import React, { useState, useEffect } from "react";

import { getLocaleById } from "../firebase/firebaseService";
import datosFalsos from "./data/datosfalsos.json"; // Importa los datos falsos
import { useDispatch, useSelector } from "react-redux";
import { resultado, increment } from "../store/slices/counter/counterSlides";
import { Button } from "./Button";
import { Layout } from "./Layout";

const mezclarOpciones = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Seguridad = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [active, setactive] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [opciones, setOpciones] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const { formData } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuestions([
      "¿Cuál de estos es el correo electrónico con el que registraste tu punto?",
      "¿Cuál es la dirección de tu local?",
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
      let respuestaCorrecta = "";
      switch (index) {
        case 0:
          respuestaCorrecta = data.email;
          opcionesAleatorias = mezclarOpciones([
            respuestaCorrecta, // Respuesta correcta
            ...datosFalsos.datosAleatorios
              .slice(0, 2)
              .map((item) => item.correo), // Dos datos falsos de emails
          ]);
          break;
        case 1:
          respuestaCorrecta = data.direccion;
          opcionesAleatorias = mezclarOpciones([
            respuestaCorrecta, // Respuesta correcta
            ...datosFalsos.datosAleatorios
              .slice(0, 2)
              .map((item) => item.direccion), // Dos datos falsos de direcciones
          ]);
          break;

        default:
          opcionesAleatorias = [];
      }

      setOpciones(opcionesAleatorias);
      setCorrectAnswers((prev) => [...prev, respuestaCorrecta]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAnswer = (answer, index) => {
    setactive(index);
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((current) => current + 1);
      setactive(null);
    }
  };

  const handleContinue = () => {
    const isCorrect = selectedAnswers.every(
      (answer, index) => answer === correctAnswers[index]
    );

    if (isCorrect) {
      dispatch(resultado());
    }
    dispatch(increment()); // Incrementa la página para navegar a Comprobado
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout
      handleClick={handleContinue}
      textBtn={"Continuar"}
      btnTrue={true}
      styles={`${
        selectedAnswers.length === questions.length
          ? "btnActive"
          : "pointer-events-none"
      }`}
    >
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
                    onClick={() => handleAnswer(opcion, index)}
                    className={`selectoresTexto ${
                      active == index ? "selectorActive" : ""
                    }`}
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
    </Layout>
  );
};

export default Seguridad;
