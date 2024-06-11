import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../store/slices/counter/counterSlides";
import { ConstructorPropiedades } from "./ConstructorPropiedades";
import { updateLocaleData } from "../firebase/firebaseService";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const Cenefa = () => {
  const { formData } = useSelector((state) => state.counter);
  const [medidaNum, setMedidaNum] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const [active, setActive] = useState(false);
  const [inicial, setInicial] = useState(0);
  const dispatch = useDispatch();
  const NumCounters = 1;
  const mobiliario = "cenefa";
  let posicionPropiedad = inicial + 1;
  const [dataCenefa, setDataCenefa] = useState([]);
  const [dataForm, setDataForm] = useState({
    ancho: "",
    alto: "",
    imagen: "",
  });

  // Manejar el estado de active
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
    const newDataCenefa = [...dataCenefa, dataForm];
    setDataCenefa(newDataCenefa);

    if (posicionPropiedad >= NumCounters) {
      setTimeout(async () => {
        dispatch(increment());

        // Subir imágenes a Firebase Storage y actualizar URLs en Firestore
        const updatedDataCenefa = await Promise.all(
          newDataCenefa.map(async (item) => {
            if (item.imagen.startsWith("blob:")) {
              const imageBlob = await fetch(item.imagen).then((r) => r.blob());
              const imageUrl = await uploadImageToStorage(imageBlob);
              return { ...item, imagen: imageUrl };
            }
            return item;
          })
        );

        try {
          await updateLocaleData(formData.id, "dataCenefa", updatedDataCenefa);
          console.log("Datos actualizados en Firestore");
        } catch (error) {
          console.error("Error al actualizar los datos en Firestore:", error);
        }
      }, 1000);
    } else {
      setInicial(inicial + 1);
      setImgSrc(null);
    }
  };

  console.log(dataCenefa);

  return (
    <ConstructorPropiedades
      title={mobiliario}
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