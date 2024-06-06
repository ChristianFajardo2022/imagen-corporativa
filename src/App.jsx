import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import { Button } from "./componentes/Button";
import { BoxMobiliario } from "./componentes/BoxMobiliario";
import { Selector } from "./componentes/Selector";
import TakePhoto from "./componentes/TakePhoto";
import { TiposMobiliario } from "./componentes/TiposMobiliario";
import { TipoAgencia } from "./componentes/TipoAgencia";
import { Inicio } from "./componentes/Inicio";
import Seguridad from "./componentes/Seguridad";
import { TiposCounter } from "./componentes/TiposCounter";
import Comprobado from "./componentes/Comprobado";
import Administrador from "./componentes/Administrador";
import Login from "./componentes/Login";

const AppContent = ({ isAuthenticated, onLogin }) => {
  const { Pagina } = useSelector((state) => state.counter);
  const location = useLocation();

  const containerClass =
    location.pathname === "/" ? "max-w-[30rem] m-auto flexCenter h-full" : "";

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
        <Route
          path="/administrador"
          element={
            isAuthenticated ? <Administrador /> : <Login onLogin={onLogin} />
          }
        />
      </Routes>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <AppContent isAuthenticated={isAuthenticated} onLogin={handleLogin} />
    </Router>
  );
}

export default App;
