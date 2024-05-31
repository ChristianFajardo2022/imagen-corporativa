import { useSelector } from "react-redux";
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

function App() {
  const { Pagina } = useSelector((state) => state.counter);

  return (
    <div className="max-w-[30rem] m-auto flexCenter h-full lg:px-10 xs:px-6 lg:py-16 xs:p-y6">
      {Pagina == 0 && <Inicio />}
      {Pagina == 1 && <Seguridad />}
      {Pagina == 2 && <TipoAgencia />}
      {Pagina == 3 && <TiposMobiliario />}
      {Pagina == 4 && <TiposCounter />}

      {/* <TipoAgencia />
      <TiposMobiliario />
      <Button customStyle={`  `} text={"Boton"} />
      

      <TakePhoto /> */}
    </div>
  );
}

export default App;
