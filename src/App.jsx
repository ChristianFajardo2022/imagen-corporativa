import { useSelector } from "react-redux";
import { Button } from "./componentes/Button";
import { BoxMobiliario } from "./componentes/BoxMobiliario";
import { Selector } from "./componentes/Selector";
import { useState } from "react";
import TakePhoto from "./componentes/TakePhoto";

function App() {
  const { Pagina } = useSelector((state) => state.counter);

  const [activeSelector, setActiveSelector] = useState(null);

  // Función para manejar el clic en un selector
  const handleClick = (selector) => {
    setActiveSelector(selector);
  };
  const selectores = ["Agencia", "Alianza", "Corresponsal", "Punto de venta"];

  console.log(Pagina);
  return (
    <>
      {selectores.map((selector) => (
        <Selector
          key={selector}
          title={selector}
          active={selector === activeSelector}
          handleClick={() => handleClick(selector)}
        />
      ))}

      <BoxMobiliario title={"Antiguo"} img={"/antiguo.png"} />
      <Button customStyle={`  `} text={"Boton"} />
      <h1>Hola,</h1>
      <h2>Queremos estar seguros de que eres tú</h2>
      <p>Para continuar, escribe el ID de tu punto Inter Rapidísimo</p>
      <input type="text" value="hola" />
      <span>Para continuar, escribe el ID de tu punto Inter Rapidísimo</span>
      <span className="selectoresTexto">selector</span>
      <span className="selectoresCaja">selector</span>
      <TakePhoto />
    </>
  );
}

export default App;
