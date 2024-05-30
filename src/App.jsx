import { useSelector } from "react-redux";
import { Button } from "./componentes/Button";
import { BoxMobiliario } from "./componentes/BoxMobiliario";
import { Selector } from "./componentes/Selector";
import { useState } from "react";
import TakePhoto from "./componentes/TakePhoto";
import { TiposMobiliario } from "./componentes/TiposMobiliario";
import { TipoAgencia } from "./componentes/TipoAgencia";
import { Inicio } from "./componentes/Inicio";

function App() {
  const { Pagina } = useSelector((state) => state.counter);

  return (
    <div className="max-w-[30rem] m-auto flexCenter h-full lg:p-10 xs:p-6">
      <Inicio />
      {/* <TipoAgencia />
      <TiposMobiliario />
      <Button customStyle={`  `} text={"Boton"} />
      

      <TakePhoto /> */}
    </div>
  );
}

export default App;
