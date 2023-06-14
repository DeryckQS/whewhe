import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import ImageToTextConverter from './components/ImageToTextConverter/ImageToTextConverter';
import ImageDisplay from './components/ImageDisplay/ImageDisplay';
import ImageEnhancer from './components/ImageEnhancer/ImageEnhancer'; // Import the ImageEnhancer component
import './App.css';

const App = () => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = async () => {
      const imageBase64 = reader.result;
      await performOCR(imageBase64);
      setUploadedImages((prevImages) => [...prevImages, imageBase64]);
    };
  
    reader.readAsDataURL(file);
  };
  
  const performOCR = async (imageBase64) => {
    try {
      const result = await Tesseract.recognize(imageBase64, 'eng');
      if (result && result.text) {
        console.log(result.text);
      } else {
        console.log('No recognized text found');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div>
      <h1>WELL CHECKER</h1>
      <h1>Place your well readings here!</h1>
      <input type="file" onChange={handleImageUpload} />

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {uploadedImages.map((imageBase64, index) => (
          <ImageDisplay
            key={index}
            imageBase64={imageBase64}
            alt={`Uploaded Image ${index}`}
            style={{ width: '30%', height: '30%', margin: '5px' }}
          />
        ))}
      </div>

      <ImageToTextConverter imageBase64={uploadedImages[uploadedImages.length - 1]} />

      {/* Render the ImageEnhancer component and pass the imageBase64 */}
      <ImageEnhancer imageBase64={uploadedImages[uploadedImages.length - 1]} />
    </div>
  );
};

export default App;
