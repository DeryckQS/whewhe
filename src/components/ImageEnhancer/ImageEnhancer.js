import React, { useState, useEffect } from 'react';

const ImageEnhancer = ({ imageBase64 }) => {
  const [enhancedImage, setEnhancedImage] = useState(null);

  useEffect(() => {
    if (imageBase64) {
      enhanceImage(imageBase64);
    }
  }, [imageBase64]);

  const enhanceImage = async (imageBase64) => {
    try {
      // Create a new image element
      const img = new Image();

      // Set the source of the image to the base64 string
      img.src = imageBase64;

      // Wait for the image to load
      await img.decode();

      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Set the canvas size to match the image size
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Get the image data from the canvas
      const imageData = ctx.getImageData(0, 0, img.width, img.height);

      // Apply contrast adjustment to the image data
      for (let i = 0; i < imageData.data.length; i += 4) {
        // Apply contrast formula
        imageData.data[i] = (imageData.data[i] - 128) * 0.5 + 128;
        imageData.data[i + 1] = (imageData.data[i + 1] - 128) * 0.5 + 128;
        imageData.data[i + 2] = (imageData.data[i + 2] - 128) * 0.5 + 128;
      }

      // Put the enhanced image data back on the canvas
      ctx.putImageData(imageData, 0, 0);

      // Convert the canvas to base64 string
      const enhancedImageBase64 = canvas.toDataURL();

      // Set the enhanced image in state
      setEnhancedImage(enhancedImageBase64);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Image Enhancer</h1>
      {enhancedImage ? (
        <div>
          <h2>Enhanced Image:</h2>
          <img src={enhancedImage} alt="Enhanced Image" />
        </div>
      ) : (
        <p>No enhanced image found</p>
      )}
    </div>
  );
};

export default ImageEnhancer;
