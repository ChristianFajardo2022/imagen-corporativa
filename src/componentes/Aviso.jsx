import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../store/slices/counter/counterSlides";
import { ConstructorPropiedades } from "./ConstructorPropiedades";
import { updateLocaleData } from "../firebase/firebaseService";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const Aviso = () => {
  const { formData } = useSelector((state) => state.counter);
  const [medidaNum, setMedidaNum] = useState(0);
  const [imgSrc, setImgSrc] = useState("");
  const [fecthMedias, setFecthMedias] = useState({});
  const [active, setActive] = useState(false);
  const [inicial, setInicial] = useState(0);
  const dispatch = useDispatch();
  const NumCounters = formData.NumAvisos;
  const mobiliario = "aviso";
  let posicionPropiedad = inicial + 1;
  const [dataAviso, setDataAviso] = useState([]);
  const [dataForm, setDataForm] = useState({
    ancho: "",
    alto: "",
    imagen: "",
  });

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
    try {
      const storage = getStorage();
      const fileName = `image_${Date.now()}.jpg`;
      const storageRef = ref(storage, `images/${formData.id}/${fileName}`);

      // Convertir el blob a un archivo de tipo image/jpeg
      const file = new File([imageBlob], fileName, { type: "image/jpeg" });

      // Subir archivo a Firebase Storage con el tipo de contenido especificado
      const snapshot = await uploadBytes(storageRef, file, {
        contentType: "image/jpeg",
      });

      // Obtener la URL de descarga
      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } catch (error) {
      console.error("Error al subir la imagen", error);
      throw error;
    }
  };

  const handleClick = async () => {
    const newDataAviso = [...dataAviso, dataForm];
    setDataAviso(newDataAviso);

    if (posicionPropiedad >= NumCounters) {
      setTimeout(async () => {
        dispatch(increment());

        /* Funcion aqui para enviar a la base de datos */
        const updatedDataAviso = await Promise.all(
          newDataAviso.map(async (item) => {
            if (item.imagen.startsWith("blob:")) {
              const imageBlob = await fetch(item.imagen).then((r) => r.blob());
              const imageUrl = await uploadImageToStorage(imageBlob);
              return { ...item, imagen: imageUrl };
            }
            return item;
          })
        );

        try {
          await updateLocaleData(formData.id, "dataAviso", updatedDataAviso);
          //console.log("Datos actualizados en Firestore");
        } catch (error) {
          console.error("Error al actualizar los datos", error);
        }
      }, 1000);
    } else {
      setInicial(inicial + 1);
      setDataCounter((prev) => [...prev, dataForm]);
      setImgSrc(null);
    }
  };

  //traer la data de los locales
  useEffect(() => {
    const fetchLocal = async () => {
      const { data, error } = await getLocaleById(formData.id);
      if (data) {
        setImgSrc(data.dataCounter[0].imagen);
        setFecthMedias({
          ancho: data.dataCounter[0].ancho,
          alto: data.dataCounter[0].alto,
        });
      } else {
        alert(error);
      }
    };

    fetchLocal();
  }, []);

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
      fetchNumber={fecthMedias}
    />
  );
};
