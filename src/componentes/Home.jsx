import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!id) {
      alert('Por favor ingrese un número de ID');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/locales/${id}`);
      if (!response.ok) {
        throw new Error('ID no encontrado');
      }
      // Si el ID es correcto, navega al componente Seguridad con el ID como parámetro en la URL
      navigate(`/seguridad/${id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="fondo_degradado w-screen h-screen flex flex-col justify-center item">
      <div className="px-10">
        <h1 className="text-[#2E3136] text-5xl font-semibold my-3">Hola,</h1>
        <p className="text-[#7D7E79] my-3">Para continuar, escribe el ID de tu punto Inter Rapidísimo</p>
        <input
          className="bg-[#F2F4F9] shadow-md border-2 rounded-lg h-12 w-full text-center placeholder:text-[#C1C1C1] placeholder:text-sm"
          placeholder="Número ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="px-10 absolute bottom-12 w-full">
        <button
          onClick={handleSubmit}
          className="bg-[#F2F4F9] text-[#C1C1C1] border-2 w-full h-12 rounded-3xl hover:bg-white hover:text-black"
        >
          Empecemos
        </button>
      </div>
    </div>
  );
};

export default Home;