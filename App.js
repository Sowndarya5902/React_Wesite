import React, { useState } from 'react';
import './App.css';

function App() {
  
  const [boxesData, setBoxesData] = useState([null, null, null, null]);
  const [isLoading, setIsLoading] = useState([false, false, false, false]);
  const [deleteCount, setDeleteCount] = useState(0);  


  const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';

  const fetchData = async (index) => {
    let updatedIsLoading = [...isLoading];
    updatedIsLoading[index] = true;
    setIsLoading(updatedIsLoading);

    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      let updatedBoxesData = [...boxesData];
      updatedBoxesData[index] = result;
      setBoxesData(updatedBoxesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      updatedIsLoading[index] = false;
      setIsLoading(updatedIsLoading);
    }
  };

  // Function to delete the box and update the delete count
  const deleteBox = (index) => {
    let updatedBoxesData = [...boxesData];
    updatedBoxesData[index] = null;
    setBoxesData(updatedBoxesData);

    let updatedDeleteCount = deleteCount + 1;
    setDeleteCount(updatedDeleteCount);
  };

  return (
    <div className="App">
      <h1>Fetch Data in React Using API</h1>
      {/* Display Delete count */}
      <div className="delete-count">
        <p>Deleted {deleteCount}</p>
      </div>

      {/* Display 4 boxes */}
      <div className="boxes-container">
        {boxesData.map((data, index) => (
          <div key={index} className="box-container">
            <div
              className="data-box"
              onClick={() => fetchData(index)}
            >
              <p>Data fetch in React </p>
            </div>

            {/* Show loading state or data */}
            {isLoading[index] && <p>Loading...</p>}

            {data && !isLoading[index] && (
              <div className="data-display">
                <pre>{JSON.stringify(data, null, 2)}</pre>
                <button className="delete-button" onClick={() => deleteBox(index)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


