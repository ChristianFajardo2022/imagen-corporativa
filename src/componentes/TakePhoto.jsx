import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const TakePhoto = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  return (
    <div className="take-photo-container">
      <h1 className="text-2xl font-semibold mb-4">Toma una foto</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam"
      />
      <button
        onClick={capture}
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