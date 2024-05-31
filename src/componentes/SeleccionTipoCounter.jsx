import { useState } from "react";
import { Selector } from "./Selector";

const cantidadCounter = ["Un counter", "Dos counter", "+ Tres counter"];

export const SeleccionTipoCounter = ({ setActive }) => {
  const [open, setOpen] = useState(false);

  const [counterState, setCounterState] = useState(cantidadCounter[0]);

  const handleCounter = (counter) => {
    setCounterState(counter);
    setOpen(false);
    setActive(true);
  };

  return (
    <div className="selectOpcions relative">
      <Selector
        handleClick={() => setOpen(open ? false : true)}
        customStyle={`tipoSelect`}
        title={counterState}
        icon={true}
      />
      {open && (
        <div className="absolute top-12 tipoSelect__box flex-col overflow-hidden">
          {cantidadCounter.map((counter) => (
            <span
              onClick={() => handleCounter(counter)}
              className="cursor-pointer hover:bg-[--btn-active] hover:text-white w-full effect px-6 py-2"
            >
              {counter}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
