import React, { useState, useEffect } from "react";
import { getAllLocales } from "../firebase/firebaseService";

const Administrador = () => {
  const [locales, setLocales] = useState([]);
  const [filteredLocales, setFilteredLocales] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLocales = async () => {
      const { data, error } = await getAllLocales();
      if (data) {
        setLocales(data);
        setFilteredLocales(data);
      } else {
        alert(error);
      }
    };

    fetchLocales();
  }, []);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const filtered = locales.filter((locale) =>
      Object.values(locale).some((value) =>
        value.toString().toLowerCase().includes(term)
      )
    );
    setFilteredLocales(filtered);
  };

  return (
    <div className=" px-10">
      <div className=" mb-4 px-4">
        <input
          type="text"
          placeholder="Buscar por ID, Teléfono, Email, Dirección..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-xl w-80"
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded-xl w-48"
        >
          Filtrar
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Dirección</th>
            <th className="py-2 px-4 border-b">Teléfono</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">tipo de franquicia</th>
            {/* Añade más encabezados según los campos de datos */}
          </tr>
        </thead>
        <tbody>
          {filteredLocales.map((locale) => (
            <tr key={locale.id}>
              <td className="py-2 px-4 border-b">{locale.id}</td>
              <td className="py-2 px-4 border-b">{locale.direccion}</td>
              <td className="py-2 px-4 border-b">{locale.telefono}</td>
              <td className="py-2 px-4 border-b">{locale.email}</td>
              {/* Añade más celdas según los campos de datos */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Administrador;