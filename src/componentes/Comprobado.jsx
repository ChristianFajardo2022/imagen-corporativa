import React from 'react';
import Nav from './Nav';

const Comprobado = () => {

  return (
    <div className='w-screen h-screen fondo_degradado flex flex-col'>
      <Nav />
      {correctAnswers === 3 ? (
        <div className='flex flex-col justify-center items-center h-[80vh] px-10'>
          <img className='w-14' src="/chuloaprobado.png" alt="" />
          <h1 className='text-4xl mt-4'>Datos verificados</h1>
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center h-[80vh] px-10'>
          <img className='w-14' src="/chuloaprobado.png" alt=""/>
          <h1 className='text-2xl mt-4'>Datos equivocados</h1>
        </div>
      )}
      <div className="px-10 absolute bottom-12 w-full">
        <button className="text-[#7D7E79] border-black border-2 w-full h-12 rounded-3xl hover:bg-black hover:text-white">
          Continuar
        </button>
      </div>
    </div>
  )
}

export default Comprobado;