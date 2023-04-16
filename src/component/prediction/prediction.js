import React, { useState } from 'react';

function Prediction() {
  const [predictions, setPredictions] = useState([]);

  const handlePredict = async () => {
    try {
      const response = await fetch('http://localhost:3000/predictions');
      const data = await response.json();
      setPredictions(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Predictions</h2>
      <button onClick={handlePredict}>Make Prediction</button>
      {predictions.length > 0 && (
        <ul>
          {predictions.map((prediction, index) => (
            <li key={index}>Prediction {index + 1}: {prediction.join(', ')}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Prediction;
