import React, { useState, useEffect } from 'react';
import Prediction from './component/prediction/prediction';
import InputForm from './component/inputform/inputform';
import Table from './component/table/Table';
import HandlePredict from './component/Handlepredict/HandlePredict';

function App() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);

  // Fetch predicted results when selectedNumbers change
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch predicted results from API or any other data source
        // using selectedNumbers as input
        const response = await fetch('http://localhost:3000/predictions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ numbers: selectedNumbers })
        });
        const data = await response.json();
        setPredictions(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching predictions:', err);
        setError('Error fetching predictions. Please try again later.');
      }
    };

    fetchData();
  }, [selectedNumbers]);

  const handleCheckboxChange = (event) => {
    const number = Number(event.target.value);
    if (event.target.checked) {
      setSelectedNumbers([...selectedNumbers, number]);
    } else {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    }
  };

  const handleSubmit = (number) => {
    setSelectedNumbers([...selectedNumbers, number]);
  };

  return (
    <div>
      <h1>Welcome to Whe Whe Predictor</h1>
      <h2>Select Winning Numbers</h2>
      <p>Click the numbers to select them</p>
      <div>
        {[...Array(36)].map((_, index) => (
          <label key={index}>
            <input
              type="checkbox"
              value={index + 1}
              checked={selectedNumbers.includes(index + 1)}
              onChange={handleCheckboxChange}
            />
            {index + 1}
          </label>
        ))}
      </div>
      <InputForm handleSubmit={handleSubmit} />
      {/* Render the Table component with the predicted results */}
      {error ? (
        <p>{error}</p>
      ) : predictions.length ? (
        <Table predictions={predictions} />
      ) : (
        <p>Loading predictions...</p>
      )}
      <HandlePredict selectedNumbers={selectedNumbers} />
      <Prediction />
    </div>
  );
}

export default App;
