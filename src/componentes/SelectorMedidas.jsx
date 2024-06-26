import React, { useState } from "react";
import { Selector } from "./Selector";

export const SelectorMedidas = ({ setData, tipoMedida, nombreMedida }) => {
  const [medida, setMedida] = useState(`Indicanos ${nombreMedida} en `);
  const [open, setOpen] = useState(false);
  const handleCounter = (counter, index) => {
    //dispatch(setNumeCounter(index + 1));
    //setCounterState(counter);
    setOpen(false);
    //setActive(true);
    setData((prev) => ({ ...prev, [nombreMedida]: counter }));
    setMedida(counter);
  };

  return (
    <div className="selectOpcions">
      <Selector
        handleClick={() => setOpen(open ? false : true)}
        title={`${medida} cm`}
        icon={true}
        customStyle={`tipoSelect`}
      />

      {open && (
        <div
          // style={{ justifyContent: "center" }}
          className="tipoSelect__box selectorMedidas  flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 overflow-auto"
        >
          {tipoMedida.map((medi, index) => (
            <span
              key={index}
              onClick={() => handleCounter(medi, index)}
              className="cursor-pointer hover:bg-[--btn-active] hover:text-white w-full effect px-6 py-2 text-center"
            >
              {medi} cm
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
