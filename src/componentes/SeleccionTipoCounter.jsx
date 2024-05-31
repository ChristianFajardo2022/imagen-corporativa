import { Selector } from "./Selector";

const cantidadCounter = ["Un counter", "Dos counter", "Tres counter"];

export const SeleccionTipoCounter = () => {
  return (
    <>
      <Selector customStyle={`tipoSelect`} title={"counter"} icon={true} />

      {cantidadCounter.map((counter) => (
        <span>{counter}</span>
      ))}
    </>
  );
};
