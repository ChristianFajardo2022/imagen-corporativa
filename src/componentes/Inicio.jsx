import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import DepartmentSelector from "./DatosColombia";
import useUpdateFormData from "../hooks/updateDispatch";

export const Inicio = () => {
  const [id, setId] = useState("");

  const { updateField } = useUpdateFormData();

  useEffect(() => {
    updateField();
  }, []);

  return (
    <div className="flex flex-col justify-between h-full">
      <div></div>
      <div className="w-full">
        <h1>Hola,</h1>
        <p className="py-6">
          Para continuar, escribe el ID de tu punto Inter Rapidísimo
        </p>
        <input
          onChange={(e) => setId(e.target.value)}
          className="text-center"
          value={id}
          name="id"
          type="text"
          placeholder="Número de id"
        />

        <DepartmentSelector />
      </div>

      <Button handleClick={(e) => updateField("id", id)} text={"Empecemos"} />
    </div>
  );
};
