import { useSelector } from "react-redux";
import { Button } from "./componentes/Button";
import { BoxMobiliario } from "./componentes/BoxMobiliario";
import { Selector } from "./componentes/Selector";
import { useState } from "react";

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
    </>
  );
}

export default App;
