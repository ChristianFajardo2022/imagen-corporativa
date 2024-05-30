import React, { useEffect, useState } from "react";
import data from "../data/dataColombia.json";
import useUpdateFormData from "../hooks/updateDispatch";

function DepartmentSelector({ HandleChangeData }) {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [cities, setCities] = useState([]);

  const handleDepartmentChange = (event) => {
    const departmentName = event.target.value;
    setSelectedDepartment(departmentName);
    const department = data.find(
      (dept) => dept.departamento === departmentName
    );
    if (department) {
      setCities(department.ciudades);
    } else {
      setCities([]);
    }
  };

  return (
    <>
      <select value={selectedDepartment} onChange={handleDepartmentChange}>
        <option value="">Seleccione un departamento</option>
        {data.map((department) => (
          <option key={department.id} value={department.departamento}>
            {department.departamento}
          </option>
        ))}
      </select>
      <select
        disabled={!selectedDepartment}
        onChange={HandleChangeData}
        name="ciudad"
      >
        <option value="">Seleccione una ciudad</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </>
  );
}

export default DepartmentSelector;
