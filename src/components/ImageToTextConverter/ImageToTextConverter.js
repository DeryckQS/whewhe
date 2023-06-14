import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';

const ImageToTextConverter = ({ imageBase64 }) => {
  const [recognizedText, setRecognizedText] = useState('');

  useEffect(() => {
    if (imageBase64) {
      performOCR(imageBase64);
    }
  }, [imageBase64]);

  const performOCR = async (imageBase64) => {
    try {
      console.log('Starting OCR...');
      const { data: { text } } = await Tesseract.recognize(imageBase64);
      console.log('OCR Result:', text);
      setRecognizedText(text);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div>
      <h1>Image to Text Converter</h1>
      {recognizedText ? (
        <div>
          <h2>Recognized Text:</h2>
          <pre>{recognizedText}</pre>
        </div>
      ) : (
        <p>No recognized text found</p>
      )}
    </div>
  );
};

export default ImageToTextConverter;
