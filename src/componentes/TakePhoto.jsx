import React, { useState } from 'react';

const TakePhoto = () => {
  const [imgSrc, setImgSrc] = useState(null);

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
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
      {imgSrc && (
        <div className="mt-4">
          <h2 className="text-xl">Foto tomada:</h2>
          <img src={imgSrc} alt="Foto tomada" className="taken-photo" />
        </div>
      )}
    </div>
  );
};

export default TakePhoto;