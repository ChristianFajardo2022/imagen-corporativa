import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { getAllLocales } from "../firebase/firebaseService";

const Administrador = ({ onLogout }) => {
  const [locales, setLocales] = useState([]);
  const [filteredLocales, setFilteredLocales] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocale, setSelectedLocale] = useState(null);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(0); // Nuevo estado para el grupo de páginas
  const itemsPerPage = 10;
  const pagesPerGroup = 10; // Número de páginas por grupo

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
    const term = searchTerm.trim();
    if (!term) {
      setFilteredLocales(locales);
      setError("");
      setCurrentPage(1);
      setCurrentGroup(0);
      return;
    }

    const filtered = locales.filter((locale) => locale.id.toString() === term);
    if (filtered.length) {
      setFilteredLocales(filtered);
      setError("");
      setCurrentPage(1);
      setCurrentGroup(0);
    } else {
      setFilteredLocales([]);
      setError("No se encontraron datos coincidentes.");
    }
  };

  const handleClose = () => {
    setSelectedLocale(null);
  };

  const renderSubTable = (data, label) => {
    return (
      <div>
        <h3 className="text-xl font-bold my-4">{label}:</h3>
        <table className="min-w-full bg-white mb-4">
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-2 text-lg">
                  <a
                    href={item.imagen}
                    download
                    onClick={(e) => {
                      e.preventDefault();
                      const link = document.createElement("a");
                      link.href = item.imagen;
                      link.download;
                      link.target = "_blank";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <img src={item.imagen} alt="Imagen" className="max-w-20" />
                  </a>
                </td>
                <td className="py-2 px-4 border-2 text-lg">
                  Ancho: {item.ancho}
                </td>
                <td className="py-2 px-4 border-2 text-lg">
                  Alto: {item.alto}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderDetails = (locale) => {
    const fields = [
      { key: "id", label: "Id" },
      { key: "direccion", label: "Dirección" },
      { key: "telefono", label: "Teléfono" },
      { key: "email", label: "Email" },
      { key: "NumCounters", label: "NumCounters" },
      { key: "ciudad", label: "Ciudad" },
      { key: "mobiliario", label: "Mobiliario" },
      { key: "tipoFranquicia", label: "Tipo de Franquicia" },
    ];

    const subTables = [
      { key: "dataCounter", label: "COUNTER" },
      { key: "dataCenefa", label: "CENEFA" },
      { key: "dataAviso", label: "AVISO" },
      { key: "dataLocal", label: "LOCAL" },
    ];

    return (
      <table className="min-w-full">
        <tbody>
          {fields.map((field) => (
            <tr key={field.key}>
              <td className="py-2 px-4 border text-lg">{field.label}</td>
              <td className="py-2 px-4 border text-lg">
                {locale[field.key] || "No Aplica"}
              </td>
            </tr>
          ))}
          {subTables.map((subTable) =>
            locale[subTable.key] && locale[subTable.key].length > 0 ? (
              locale[subTable.key].map((item, index) => (
                <tr key={`${subTable.key}-${index}`}>
                  <td className="py-2 px-4 border-4 text-lg">{`${
                    subTable.label
                  } ${index + 1}`}</td>
                  <td className="py-4 px-4 border-4 text-lg">
                    {renderSubTable([item], `${subTable.label} ${index + 1}`)}
                  </td>
                </tr>
              ))
            ) : (
              <tr key={subTable.key}>
                <td className="py-2 px-4 border-4 text-lg">{subTable.label}</td>
                <td className="py-2 px-4 border-4 text-lg">No Aplica</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    );
  };

  const downloadCSV = () => {
    const csvHeaders = [
      "Id",
      "Dirección",
      "Teléfono",
      "Email",
      "NumCounters",
      "Ciudad",
      "Mobiliario",
      "Tipo de Franquicia",
      "Counter 1 Imagen",
      "Counter 1 Ancho",
      "Counter 1 Alto",
      "Counter 2 Imagen",
      "Counter 2 Ancho",
      "Counter 2 Alto",
      "Counter 3 Imagen",
      "Counter 3 Ancho",
      "Counter 3 Alto",
      "Counter 4 Imagen",
      "Counter 4 Ancho",
      "Counter 4 Alto",
      "Cenefa Imagen",
      "Cenefa Ancho",
      "Cenefa Alto",
      "Aviso Imagen",
      "Aviso Ancho",
      "Aviso Alto",
      "Local Imagen",
      "Local Ancho",
      "Local Alto",
    ];

    const csvData = locales.map((locale) => {
      const flattenData = {
        Id: locale.id || "No Aplica",
        Dirección: locale.direccion || "No Aplica",
        Teléfono: locale.telefono || "No Aplica",
        Email: locale.email || "No Aplica",
        NumCounters: locale.NumCounters || "No Aplica",
        Ciudad: locale.ciudad || "No Aplica",
        Mobiliario: locale.mobiliario || "No Aplica",
        "Tipo de Franquicia": locale.tipoFranquicia || "No Aplica",
        "Counter 1 Imagen": locale.dataCounter?.[0]?.imagen || "No Aplica",
        "Counter 1 Ancho": locale.dataCounter?.[0]?.ancho || "No Aplica",
        "Counter 1 Alto": locale.dataCounter?.[0]?.alto || "No Aplica",
        "Counter 2 Imagen": locale.dataCounter?.[1]?.imagen || "No Aplica",
        "Counter 2 Ancho": locale.dataCounter?.[1]?.ancho || "No Aplica",
        "Counter 2 Alto": locale.dataCounter?.[1]?.alto || "No Aplica",
        "Counter 3 Imagen": locale.dataCounter?.[2]?.imagen || "No Aplica",
        "Counter 3 Ancho": locale.dataCounter?.[2]?.ancho || "No Aplica",
        "Counter 3 Alto": locale.dataCounter?.[2]?.alto || "No Aplica",
        "Counter 4 Imagen": locale.dataCounter?.[3]?.imagen || "No Aplica",
        "Counter 4 Ancho": locale.dataCounter?.[3]?.ancho || "No Aplica",
        "Counter 4 Alto": locale.dataCounter?.[3]?.alto || "No Aplica",
        "Cenefa Imagen": locale.dataCenefa?.[0]?.imagen || "No Aplica",
        "Cenefa Ancho": locale.dataCenefa?.[0]?.ancho || "No Aplica",
        "Cenefa Alto": locale.dataCenefa?.[0]?.alto || "No Aplica",
        "Aviso Imagen": locale.dataAviso?.[0]?.imagen || "No Aplica",
        "Aviso Ancho": locale.dataAviso?.[0]?.ancho || "No Aplica",
        "Aviso Alto": locale.dataAviso?.[0]?.alto || "No Aplica",
        "Local Imagen": locale.dataLocal?.[0]?.imagen || "No Aplica",
        "Local Ancho": locale.dataLocal?.[0]?.ancho || "No Aplica",
        "Local Alto": locale.dataLocal?.[0]?.alto || "No Aplica",
      };

      return flattenData;
    });

    return (
      <CSVLink
        data={csvData}
        headers={csvHeaders}
        filename={"locales.csv"}
        className="p-4 bg-blue-500 text-white text-center rounded-xl w-48 ml-4"
      >
        Descargar CSV
      </CSVLink>
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGroupChange = (direction) => {
    setCurrentGroup((prevGroup) => {
      const newGroup = prevGroup + direction;
      if (newGroup < 0 || newGroup >= Math.ceil(totalPages / pagesPerGroup)) {
        return prevGroup;
      }
      return newGroup;
    });
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredLocales.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredLocales.length / itemsPerPage);
  const startPage = currentGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <div className="px-20 flex flex-col justify-start items-start w-full">
      <h2 className="text-center w-full mt-10">Base de datos Franquicias</h2>
      <div className="my-4 px-4 flex justify-center items-center">
        <input
          type="text"
          placeholder="Buscar por ID"
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
        {downloadCSV()}
        <button
          onClick={onLogout}
          className="p-4 bg-red-500 text-white rounded-xl w-48 ml-10"
        >
          Cerrar sesión
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <table className="min-w-full bg-white border-4 shadow-xl listaGeneral">
        <thead>
          <tr className="text-2xl">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Dirección</th>
            <th className="py-2 px-4 border-b">Teléfono</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Detalles</th>
          </tr>
        </thead>
        <tbody>
          {getCurrentPageData().map((locale) => (
            <React.Fragment key={locale.id}>
              <tr>
                <td className="py-2 px-4 border-b text-center">{locale.id}</td>
                <td className="py-2 px-4 border-b text-center">
                  {locale.direccion}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {locale.telefono}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {locale.email}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => setSelectedLocale(locale)}
                    className="p-2 bg-green-500 text-white rounded"
                  >
                    Detalles
                  </button>
                </td>
              </tr>
              {selectedLocale && selectedLocale.id === locale.id && (
                <tr>
                  <td colSpan="5">{renderDetails(selectedLocale)}</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => handleGroupChange(-1)}
          disabled={currentGroup === 0}
          className="px-4 py-2 mx-1 rounded bg-gray-200"
        >
          &laquo;
        </button>
        <div className="pagination-buttons">
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => handleGroupChange(1)}
          disabled={endPage === totalPages}
          className="px-4 py-2 mx-1 rounded bg-gray-200"
        >
          &raquo;
        </button>
      </div>

      {selectedLocale && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-xl w-3/4 h-3/4 overflow-y-auto shadow-xl shadow-slate-500">
            <h2 className="text-4xl mb-4">Detalles del Local</h2>
            <button
              onClick={handleClose}
              className="p-2 bg-red-500 text-white rounded absolute top-10 right-32"
            >
              Cerrar
            </button>
            {renderDetails(selectedLocale)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Administrador;