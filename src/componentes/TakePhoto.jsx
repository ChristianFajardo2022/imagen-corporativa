import React, { useState } from "react";
import { Button } from "./Button";

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
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCapture}
        className="capture-input"
      />

      <Button
        handleClick={() => document.querySelector(".capture-input").click()}
        customStyle={`mt-4 bg-blue-500 text-white py-2 px-4 rounded`}
        text={"Tomar Foto"}
      />

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
