import { useState } from "react";
import { Selector } from "./Selector";
import { useDispatch } from "react-redux";

const cantidadCounter = ["Un", "Dos"];

export const SeleccionTipoCounter = ({
  setActive,
  NumCounter,
  setNumeCounter,
  title,
}) => {
  const [open, setOpen] = useState(false);
  const [counterAdd, setCounterAdd] = useState();
  const dispatch = useDispatch();

  const [counterState, setCounterState] = useState(
    cantidadCounter[NumCounter - 1]
  );
  const constructortitle =
    title === "aviso" && counterState === "Un"
      ? title
      : title === "counter" && counterState === "Un"
      ? title
      : `${title}s`;

  const handleCounter = (counter, index) => {
    dispatch(setNumeCounter(index + 1));
    setCounterState(counter);
    setOpen(false);
    setActive(true);
  };

  const handleCounterAdd = (e) => {
    setCounterAdd(e.target.value);
    dispatch(setNumeCounter(Number(e.target.value)));
  };
  const handleNewCouters = () => {
    setOpen(false);
    setActive(true);
    dispatch(setNumeCounter(Number(counterAdd)));
  };
  console.log(counterState);
  return (
    <div className="selectOpcions relative lg:px-10 xs:px-6 ">
      <Selector
        handleClick={() => setOpen(open ? false : true)}
        customStyle={`tipoSelect`}
        title={
          NumCounter <= cantidadCounter.length
            ? `${counterState} ${constructortitle}`
            : `${counterAdd} ${constructortitle}`
        }
        icon={true}
      />
      {open && (
        <div className="  tipoSelect__box flex-col overflow-hidden">
          {cantidadCounter.map((counter, index) => (
            <span
              key={index}
              onClick={() => handleCounter(counter, index)}
              className="cursor-pointer hover:bg-[--btn-active] hover:text-white w-full effect px-6 py-2"
            >
              {`${counter} ${
                title === "aviso" && counter === "Un"
                  ? title
                  : title === "counter" && counter === "Un"
                  ? title
                  : `${title}s`
              }`}
            </span>
          ))}
          <span className="group flex items-center cursor-pointer hover:bg-[--btn-active] hover:text-white w-full effect px-6">
            <input
              style={{
                padding: "0",
                margin: "0",
                height: "3rem",
                width: "70%",
                minHeight: "fit-content",
              }}
              className={`bg-transparent border-none shadow-none `}
              type="number"
              placeholder="más de 3 ¿cuantos?"
              value={counterAdd}
              onChange={handleCounterAdd}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  setOpen(false);
                  setActive(true);
                }
              }}
            />
            <figure
              onClick={handleNewCouters}
              className="w-2/6 h-4 inline-block rotate-180"
            >
              <svg
                width="10"
                height="17"
                viewBox="0 0 10 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.86 9.30029C3.65 9.11029 3.65 8.81028 3.86 8.60028L9.61 3.12028C10.18 2.58028 10.11 1.76029 9.48 1.27029C8.85 0.790285 7.86 0.840284 7.29 1.39028C7.29 1.39028 1.95 6.41028 0.27 8.28028C-0.09 8.68028 -0.09 9.22029 0.27 9.62029C1.95 11.4903 7.29 16.5103 7.29 16.5103C7.86 17.0503 8.83 17.1003 9.48 16.6303C10.12 16.1603 10.17 15.3203 9.61 14.7803L3.86 9.30029Z"
                  className="svgSelector"
                  fill="#09080D"
                />
              </svg>
            </figure>
          </span>
        </div>
      )}
    </div>
  );
};
