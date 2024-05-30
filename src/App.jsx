import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./componentes/Home";
import Seguridad from "./componentes/Seguridad";
import Comprobado from "./componentes/Comprobado";
import { Button } from "./componentes/Button";

function App() {
  return (
    <>
      <Button customStyle={`  `} text={"Boton"} />
      <h1>Hola,</h1>
      <h2>Queremos estar seguros de que eres tú</h2>
      <p>Para continuar, escribe el ID de tu punto Inter Rapidísimo</p>
      <input type="text" value="hola" />
      <span>Para continuar, escribe el ID de tu punto Inter Rapidísimo</span>
      <span className="selectoresTexto">selector</span>
      <span className="selectoresCaja">selector</span>
    </>
  );
}

export default App;
