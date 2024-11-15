import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';
import './UpdateCarPage.css';

const UpdateCarPage = () => {
  const [carDetails, setCarDetails] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  // Define fetchCarDetails as a memoized function
  const fetchCarDetails = useCallback(async () => {
    try {
      const response = await API.get(`/cars/${id}`);
      setCarDetails(response.data);
    } catch (err) {
      setError('Failed to fetch car details');
    }
  }, [id]);  // Only re-run if `id` changes

  // Fetch car details when component is mounted or `id` changes
  useEffect(() => {
    fetchCarDetails();
  }, [fetchCarDetails]);  // Dependency on `fetchCarDetails`

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCar = {
        title: carDetails.title,
        description: carDetails.description,
        numberPlate: carDetails.numberPlate,
        registrationNumber: carDetails.registrationNumber,
        color: carDetails.color,
        lastServiceDate: carDetails.lastServiceDate,
        // Add other fields as needed
      };

      await API.put(`/cars/${id}`, updatedCar);
      navigate(`/cars/${id}`);  // Navigate back to the car detail page after update
    } catch (err) {
      setError('Failed to update car');
    }
  };

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!carDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="update-car-container">
      <h2>Update Car</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={carDetails.title}
            onChange={(e) => setCarDetails({ ...carDetails, title: e.target.value })}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={carDetails.description}
            onChange={(e) => setCarDetails({ ...carDetails, description: e.target.value })}
          />
        </div>
        <div>
          <label>Number Plate:</label>
          <input
            type="text"
            value={carDetails.numberPlate}
            onChange={(e) => setCarDetails({ ...carDetails, numberPlate: e.target.value })}
          />
        </div>
        <div>
          <label>Registration Number:</label>
          <input
            type="text"
            value={carDetails.registrationNumber}
            onChange={(e) => setCarDetails({ ...carDetails, registrationNumber: e.target.value })}
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="text"
            value={carDetails.color}
            onChange={(e) => setCarDetails({ ...carDetails, color: e.target.value })}
          />
        </div>
        <div>
          <label>Last Service Date:</label>
          <input
            type="date"
            value={carDetails.lastServiceDate}
            onChange={(e) => setCarDetails({ ...carDetails, lastServiceDate: e.target.value })}
          />
        </div>

        <button type="submit">Update Car</button>
      </form>
    </div>
  );
};

export default UpdateCarPage;
