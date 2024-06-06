import React, { useState, useEffect } from "react";
import { getAllLocales } from "../firebase/firebaseService";

const Administrador = () => {
  const [locales, setLocales] = useState([]);
  const [filteredLocales, setFilteredLocales] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocale, setSelectedLocale] = useState(null);
  const [error, setError] = useState("");

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
    if (filtered.length > 0) {
      setFilteredLocales(filtered);
      setError("");
    } else {
      setFilteredLocales([]);
      setError("No se encontraron datos coincidentes.");
    }
  };

  const handleClose = () => {
    setSelectedLocale(null);
  };

  return (
    <div className=" px-20 flex flex-col justify-start items-start w-full">
      <h2 className=" text-center w-full mt-10">Base de datos Franquicias</h2>
      <div className="my-4 px-4 flex justify-center items-center">
        <input
          type="text"
          placeholder="Buscar por ID, Teléfono, Email, Dirección..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-xl w-[400px]"
        />
        <button
          onClick={handleSearch}
          className="p-4 bg-cyan-500 text-white rounded-xl w-48 ml-10"
        >
          Filtrar
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <table className="min-w-full bg-white border-4 shadow-xl">
        <thead>
          <tr className="text-2xl">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Dirección</th>
            <th className="py-2 px-4 border-b">Teléfono</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredLocales.map((locale) => (
            <tr key={locale.id}>
              <td className="py-2 px-4 border-b text-center">{locale.id}</td>
              <td className="py-2 px-4 border-b text-center">{locale.direccion}</td>
              <td className="py-2 px-4 border-b text-center">{locale.telefono}</td>
              <td className="py-2 px-4 border-b text-center">{locale.email}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => setSelectedLocale(locale)}
                  className="p-2 bg-green-500 text-white rounded"
                >
                  Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLocale && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 " onClick={handleClose}>
          <div className="bg-white p-4 rounded-xl w-3/4 h-3/4 overflow-y-auto shadow-xl shadow-slate-500">
            <h2 className="text-4xl mb-4">Detalles del Local</h2>
            <button
              onClick={handleClose}
              className="p-2 bg-red-500 text-white rounded absolute top-10 right-32"
            >
              Cerrar
            </button>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b w-[40%] text-lg">Campo</th>
                  <th className="py-2 px-4 border-b text-lg">Valor</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(selectedLocale).map((key) => (
                  <tr key={key}>
                    <td className="py-2 px-4 border text-lg">{key}</td>
                    <td className="py-2 px-4 border text-lg">
                      {key.includes("foto") ? (
                        <div>
                        <a
                          href={selectedLocale[key]}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-500 font-bold"
                        >
                          Descargar
                          
                        </a>
                        <a href={selectedLocale[key]}
                          target="_blank"><img className="w-[150px] mt-8" target="_blank" src={selectedLocale[key]} /></a>
                        </div>
                      ) : (
                        selectedLocale[key]
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Administrador;