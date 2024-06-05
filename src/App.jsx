import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Button } from "./componentes/Button";
import { BoxMobiliario } from "./componentes/BoxMobiliario";
import { Selector } from "./componentes/Selector";
import { useState } from "react";
import TakePhoto from "./componentes/TakePhoto";
import { TiposMobiliario } from "./componentes/TiposMobiliario";
import { TipoAgencia } from "./componentes/TipoAgencia";
import { Inicio } from "./componentes/Inicio";
import Seguridad from "./componentes/Seguridad";
import { TiposCounter } from "./componentes/TiposCounter";
import Comprobado from "./componentes/Comprobado";
import Administrador from "./componentes/Administrador";

const AppContent = () => {
  const { Pagina } = useSelector((state) => state.counter);
  const location = useLocation();

  const containerClass =
    location.pathname === "/"
      ? "max-w-[30rem] m-auto flexCenter h-full lg:px-10 xs:px-6 lg:py-16 xs:p-y6"
      : "";

  return (
    <div className={containerClass}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {Pagina === 0 && <Inicio />}
              {Pagina === 1 && <Seguridad />}
              {Pagina === 2 && <Comprobado />}
              {Pagina === 3 && <TipoAgencia />}
              {Pagina === 4 && <TiposMobiliario />}
              {Pagina >= 5 && <TiposCounter />}
            </>
          }
        />
        <Route path="/administrador" element={<Administrador />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;