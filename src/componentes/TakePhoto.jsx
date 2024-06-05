import React, { useState } from "react";
import { Layout } from "./Layout";
import { Selector } from "./Selector";

const TakePhoto = ({ takephoto }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);

  const handleCapture = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        });
        const reader = new FileReader();
        reader.onloadend = () => {
          setImgSrc(reader.result);
          handleUpload(compressedFile); // Llama a handleUpload con el archivo comprimido
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error al comprimir la imagen:", error);
      }
    }
  };

  const handleUpload = async (file) => {
    setUploading(true);
    const storageRef = ref(storage, `images/${uuidv4()}`); // Usa UUID para nombres únicos

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setDownloadURL(url);
      setUploading(false);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      setUploading(false);
    }
  };

  return (
    <>
      <Selector
        takephoto={takephoto}
        title={"Subir foto"}
        icon={true}
        handleClick={() => document.querySelector(".capture-input").click()}
        customStyle={"tipoSelect"}
      />
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCapture}
        className="capture-input hidden"
      />

      {/* <img className="w-auto ml-4" src="./mas.svg"/> */}
    </>
  );
};

export default TakePhoto;
