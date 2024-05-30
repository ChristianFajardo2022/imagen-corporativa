import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import DepartmentSelector from "./DatosColombia";
import { useDispatch } from "react-redux";
import { setData } from "../store/slices/counter/counterSlides";

export const Inicio = () => {
  const [formdata, setFormData] = useState({
    id: "",
    ciudad: "",
  });

  const HandleChangeData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const dispatch = useDispatch();

  const updateField = (name, value) => {
    dispatch(setData({ key: name, value: value }));
  };
  const handleRedux = (e) => {
    e.preventDefault();
    updateField("id", formdata.id);
    updateField("ciudad", formdata.ciudad);
  };

  return (
    <form
      onSubmit={handleRedux}
      className="flex flex-col justify-between h-full"
    >
      <div></div>
      <div className="w-full">
        <h1>Hola,</h1>
        <p className="py-6">
          Para continuar, escribe el ID de tu punto Inter Rapidísimo
        </p>
        <input
          onChange={HandleChangeData}
          className="text-center"
          value={formdata.id}
          name="id"
          type="text"
          placeholder="Número de id"
        />

        <DepartmentSelector HandleChangeData={HandleChangeData} />
      </div>

      <Button type={true} text={"Empecemos"} />
    </form>
  );
};
