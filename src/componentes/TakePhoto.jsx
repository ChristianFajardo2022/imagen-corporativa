import React, { useState } from "react";

const TakePhoto = () => {
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
    <div className="take-photo-container">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCapture}
        className="capture-input hidden"
      />
      <button
        onClick={() => document.querySelector(".capture-input").click()}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Tomar Foto
      </button>
      {imgSrc && (
        <div className="mt-4">
          <h2 className="text-xl">Foto tomada:</h2>
          <img src={imgSrc} alt="Foto tomada" className="taken-photo" />
        </div>
      )}
      {downloadURL && (
        <div className="mt-4">
          <h2 className="text-xl">URL de descarga:</h2>
          <a
            href={downloadURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {downloadURL}
          </a>
        </div>
      )}
    </div>
  );
};

export default TakePhoto;
