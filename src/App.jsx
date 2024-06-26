import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
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
import { Counters } from "./componentes/Counters";
import { Counter } from "./componentes/Counter";
import { Cenefa } from "./componentes/Cenefa";
import { Local } from "./componentes/Local";
import { Avisos } from "./componentes/Avisos";
import { Aviso } from "./componentes/Aviso";
import { Gracias } from "./componentes/Gracias";

const AppContent = ({ isAuthenticated, onLogin, onLogout }) => {
  const { Pagina, formData } = useSelector((state) => state.counter);
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
              {/*               {Pagina === 1 && <Seguridad />}
              {Pagina === 2 && <Comprobado />} */}
              {Pagina === 3 && <TipoAgencia />}
              {Pagina === 4 && <TiposMobiliario />}
              {Pagina === 5 && <Counters />}
              {Pagina === 6 && <Counter />}

              {Pagina === 7 && <Cenefa />}

              {Pagina === 8 && <Local />}
              {Pagina === 9 && <Avisos />}
              {Pagina === 10 && <Aviso />}
              {Pagina === 11 && <Gracias />}
            </>
          }
        />
        <Route
          path="/administrador"
          element={
            isAuthenticated ? (
              <Administrador onLogout={onLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login onLogin={onLogin} />} />
      </Routes>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un usuario almacenado en localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <AppContent
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </Router>
  );
}

export default App;
