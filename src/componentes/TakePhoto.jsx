import React, { useState } from "react";
import imageCompression from "browser-image-compression";

import { Selector } from "./Selector";

const TakePhoto = ({ takephoto, imgSrc, setImgSrc }) => {
  const [uploading, setUploading] = useState(false);

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
          handleUpload(compressedFile); // Llama a handleUpload con el archivo comprimido
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error al comprimir la imagen:", error);
      }
    }
  };

  const handleUpload = (file) => {
    const blob = URL.createObjectURL(file);
    setImgSrc(blob);
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
    </>
  );
};

export default TakePhoto;
