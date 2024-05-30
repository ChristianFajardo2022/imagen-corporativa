import React from 'react';
import Nav from './Nav';
import { useLocation } from 'react-router-dom'; // Importa useLocation desde react-router-dom

const Comprobado = () => {
  const location = useLocation(); // Usa useLocation para obtener la ubicación actual y el estado pasado

  // Obtener el estado pasado desde el componente Seguridad
  const respuestaCorrecta = location.state?.respuestaCorrecta || 'equivocado';

  const handleContinue = () => {
    // Redirigir al inicio después de continuar
    // Coloca la URL adecuada según la lógica de tu aplicación
  };

  return (
    <div className='w-screen h-screen fondo_degradado flex flex-col'>
      <Nav />
      <div className='flex flex-col justify-center items-center h-[80vh] px-10'>
        <img className='w-14' src="/chuloaprobado.png" alt="" />
        <h1 className='text-4xl mt-4'>{respuestaCorrecta === 'verificado' ? 'Datos verificados' : 'Datos equivocados'}</h1>
      </div>
      <div className="px-10 absolute bottom-12 w-full">
        <button onClick={handleContinue} className="text-[#7D7E79] border-black border-2 w-full h-12 rounded-3xl hover:bg-black hover:text-white">
          Continuar
        </button>
      </div>
    </div>
  )
}

export default Comprobado;