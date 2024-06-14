import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserCredentials } from "../firebase/firebaseService";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay un usuario almacenado en localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      navigate("/administrador");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await getUserCredentials(username);
    if (error) {
      setError("Usuario no encontrado");
    } else if (data && data.contraseña === password) {
      // Guardar el nombre de usuario en localStorage
      localStorage.setItem("username", username);
      onLogin();
      navigate("/administrador");
    } else {
      setError("Contraseña incorrecta");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-xl w-80">
        <h2 className="text-4xl mb-4">Iniciar sesión</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;