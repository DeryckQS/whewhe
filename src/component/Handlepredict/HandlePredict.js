import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';

function HandlePredict({ selectedNumbers }) {
  const [predictions, setPredictions] = useState(null);

  const handleClick = async () => {
    try {
      // Preprocess the selected numbers
      const X = selectedNumbers.map(row => [row.year, row.month, row.day, row.time_of_day]);
      const xs = tf.tensor2d(X);

      // Load the model
      const model = await tf.loadLayersModel('http://localhost:3000/model/model.json');

      // Make predictions
      const rawPredictions = model.predict(xs);
      const predictions = await rawPredictions.argMax(-1).array();
      setPredictions(predictions);
    } catch (error) {
      console.error('Failed to make predictions:', error);
      setPredictions(null);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Predict</button>
      <ul>
        {predictions && predictions.map((prediction, i) => <li key={i}>{prediction.toString()}</li>)}
      </ul>
    </div>
  );
}

export default HandlePredict;
