import { useState } from "react";
import { Selector } from "./Selector";

const cantidadCounter = ["Un counter", "Dos counter", "+ Tres counter"];

export const SeleccionTipoCounter = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="selectOpcions">
      <Selector
        handleClick={() => setOpen(true)}
        customStyle={`tipoSelect`}
        title={"counter"}
        icon={true}
      />
      <div className="tipoSelect__box flex-col overflow-hidden">
        {open && (
          <>
            {cantidadCounter.map((counter) => (
              <span className="hover:bg-[--btn-active] hover:text-white w-full effect px-6 py-2">
                {counter}
              </span>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
