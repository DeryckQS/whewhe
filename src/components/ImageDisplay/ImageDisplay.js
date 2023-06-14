import React from 'react';

const ImageDisplay = ({ imageBase64 }) => {
  return (
    <div>
      <h2>Uploaded Image:</h2>
      <div>
        <img
          src={imageBase64}
          alt="Uploaded Image"
          style={{ maxWidth: '30%', height: '30%' }}
        />
      </div>
    </div>
  );
};

export default ImageDisplay;
