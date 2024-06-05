import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import DepartmentSelector from "./DatosColombia";
import { useDispatch } from "react-redux";
import { increment, setData } from "../store/slices/counter/counterSlides";
import { getLocaleById, addLocaleData } from "../firebase/firebaseService";


export const Inicio = () => {
  const [active, setActive] = useState(false);
  const [formdata, setFormData] = useState({
    id: "",
    ciudad: "",
  });

  const dispatch = useDispatch();

  //Habilitar el boton
  useEffect(() => {
    setActive(formdata.id !== "" && formdata.ciudad !== "");
  }, [formdata]);

  //Funcion para manejar datos de los campos
  const HandleChangeData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  //Funcion para ejecutar el form y llamado a redux
  const updateField = (name, value) => {
    dispatch(setData({ key: name, value }));
  };

  const handleRedux = async (e) => {
    e.preventDefault();

    if (!formdata.id) {
      alert("Por favor ingrese un número de ID");
      return;
    }

    try {
      const { data, error } = await getLocaleById(formdata.id);
      if (error) {
        throw new Error(error);
      }

     


      // Si el ID es correcto, navega al componente Seguridad con el ID como parámetro en la URL
      updateField("id", formdata.id);
      updateField("ciudad", formdata.ciudad);
      dispatch(increment());

      

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form
      onSubmit={handleRedux}
      className="flex flex-col justify-between h-full lg:px-10 xs:px-6 lg:py-16 xs:py-6"
    >
      <div></div>
      <div className="w-full">
        <h1>Hola,</h1>
        <p className="pt-3">
          Para continuar, escribe el ID de tu punto Inter Rapidísimo
        </p>
        <input
          onChange={HandleChangeData}
          className="text-center"
          value={formdata.id}
          name="id"
          type="number"
          placeholder="Número de id"
        />

        <DepartmentSelector HandleChangeData={HandleChangeData} />
      </div>

      <Button
        type={true}
        text={"Empecemos"}
        customStyle={` ${active ? "btnActive" : "pointer-events-none"}`}
      />
    </form>
  );
};
