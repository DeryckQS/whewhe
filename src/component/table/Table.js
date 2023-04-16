import React, { useState, useEffect } from 'react';

function Table({ predictions }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(predictions);
        setError(null);
      } catch (err) {
        setError('Error fetching data. Please try again later.');
      }
    };

    fetchData();
  }, [predictions]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : data && data.length ? ( // Add null check for data
        <table>
          <thead>
            <tr>
              <th>Time of Day</th>
              <th>Number 1</th>
              <th>Number 2</th>
              <th>Number 3</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td>{row.timeOfDay}</td>
                <td>{row.numbers[0]}</td>
                <td>{row.numbers[1]}</td>
                <td>{row.numbers[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default Table;
