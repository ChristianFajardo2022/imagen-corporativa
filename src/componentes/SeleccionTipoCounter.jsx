import { useState } from "react";
import { Selector } from "./Selector";
import { useDispatch } from "react-redux";
import { setNumeCounter } from "../store/slices/counter/counterSlides";

const cantidadCounter = ["Un counter", "Dos counter", "+ Tres counter"];

export const SeleccionTipoCounter = ({ setActive, NumCounter }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const [counterState, setCounterState] = useState(
    cantidadCounter[NumCounter - 1]
  );

  const handleCounter = (counter, index) => {
    dispatch(setNumeCounter(index + 1));
    setCounterState(counter);
    setOpen(false);
    setActive(true);
  };

  return (
    <div className="selectOpcions relative lg:px-10 xs:px-6">
      <Selector
        handleClick={() => setOpen(open ? false : true)}
        customStyle={`tipoSelect`}
        title={counterState}
        icon={true}
      />
      {open && (
        <div className="absolute top-12 tipoSelect__box flex-col overflow-hidden">
          {cantidadCounter.map((counter, index) => (
            <span
              key={index}
              onClick={() => handleCounter(counter, index)}
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
