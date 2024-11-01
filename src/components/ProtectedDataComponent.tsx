// src/components/ProtectedDataComponent.tsx
import React, { useEffect, useState } from 'react';
import { fetchProtectedData } from './services/api';

const ProtectedDataComponent = () => {
  const [data, setData] = useState<any>(null); // State to hold fetched data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to hold error messages

  const loadData = async () => {
    try {
      const response = await fetchProtectedData(); // Call the function to fetch data
      setData(response.data); // Set the fetched data to state
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data'); // Set error message
    } finally {
      setLoading(false); // Set loading to false once data fetching is done
    }
  };

  useEffect(() => {
    loadData(); // Load data when the component mounts
  }, []);

  // Render different UI based on loading, error, or data states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <h2>Protected Data</h2>
      {/* Render the fetched data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display the data */}
    </div>
  );
};

export default ProtectedDataComponent;
