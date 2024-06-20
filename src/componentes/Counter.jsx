import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, setPagina } from "../store/slices/counter/counterSlides";
import { ConstructorPropiedades } from "./ConstructorPropiedades";
import { updateLocaleData } from "../firebase/firebaseService";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const Counter = () => {
  const { formData } = useSelector((state) => state.counter);
  const [medidaNum, setMedidaNum] = useState(0);
  const [imgSrc, setImgSrc] = useState("");
  const [active, setActive] = useState(false);
  const [inicial, setInicial] = useState(0);
  const dispatch = useDispatch();
  const NumCounters = formData.NumCounters;
  const mobiliario = formData.mobiliario;
  let posicionPropiedad = inicial + 1;
  const [dataCounter, setDataCounter] = useState([]);
  const [dataForm, setDataForm] = useState({
    ancho: "",
    alto: "",
    imagen: "",
  });
  console.log(dataForm);
  //manejar el estado de active
  useEffect(() => {
    const camposCompletados = Object.values(dataForm).every(
      (field) => field !== ""
    );
    if (camposCompletados) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [dataForm]);

  useEffect(() => {
    setDataForm((pre) => ({ ...pre, imagen: imgSrc }));
  }, [imgSrc]);

  const uploadImageToStorage = async (imageBlob) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${formData.id}/${Date.now()}`);
    const snapshot = await uploadBytes(storageRef, imageBlob);
    return await getDownloadURL(snapshot.ref);
  };

  const handleClick = async () => {
    const newDataCounter = [...dataCounter, dataForm];
    setDataCounter(newDataCounter);

    if (posicionPropiedad >= NumCounters) {
      setTimeout(async () => {
        if (formData.mobiliario === "antiguo") {
          dispatch(setPagina(8));
        } else {
          dispatch(increment());
        }

        // Subir imágenes a Firebase Storage y actualizar URLs en Firestore
        const updatedDataCounter = await Promise.all(
          newDataCounter.map(async (item) => {
            if (item.imagen.startsWith("blob:")) {
              const imageBlob = await fetch(item.imagen).then((r) => r.blob());
              const imageUrl = await uploadImageToStorage(imageBlob);
              return { ...item, imagen: imageUrl };
            }
            return item;
          })
        );

        try {
          await updateLocaleData(
            formData.id,
            "dataCounter",
            updatedDataCounter
          );
          //console.log("Datos actualizados en Firestore");
        } catch (error) {
          console.error("Error al actualizar los datos", error);
        }
      }, 1000);
    } else {
      setMedidaNum(0);
      setInicial(inicial + 1);
      setImgSrc(null);
    }
  };

  return (
    <ConstructorPropiedades
      title={"Counter"}
      handleClick={handleClick}
      active={active}
      NumCounters={NumCounters}
      inicial={inicial}
      imgSrc={imgSrc}
      mobiliario={mobiliario}
      setImgSrc={setImgSrc}
      setMedidaNum={setMedidaNum}
      medidaNum={medidaNum}
      setDataForm={setDataForm}
    />
  );
};
