import React, { useState } from 'react';
import { storage } from '../firebase'; // Asegúrate de que la ruta sea correcta
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const TakePhoto = () => {
  const [imgSrc, setImgSrc] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
        handleUpload(file); // Llama a handleUpload con el archivo
      };
      reader.readAsDataURL(file);
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
      <h1 className="text-2xl font-semibold mb-4">Toma una foto</h1>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCapture}
        className="capture-input"
      />
      <button
        onClick={() => document.querySelector('.capture-input').click()}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Tomar Foto
      </button>
      {uploading && <p>Subiendo imagen...</p>}
      {imgSrc && !uploading && (
        <div className="mt-4">
          <h2 className="text-xl">Foto tomada:</h2>
          <img src={imgSrc} alt="Foto tomada" className="taken-photo" />
        </div>
      )}
      {downloadURL && (
        <div className="mt-4">
          <h2 className="text-xl">URL de descarga:</h2>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {downloadURL}
          </a>
        </div>
      )}
    </div>
  );
};

export default TakePhoto;