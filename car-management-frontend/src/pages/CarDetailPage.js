import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';
import './CarDetailPage.css';

const CarDetailPage = () => {
  const [car, setCar] = useState(null);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Define fetchCar as a memoized function
  const fetchCar = useCallback(async () => {
    try {
      const response = await API.get(`/cars/${id}`);
      setCar(response.data);
    } catch (err) {
      setError('Failed to fetch car details');
    }
  }, [id]);  // Only re-run if `id` changes

  // Fetch car details when component is mounted or when `id` changes
  useEffect(() => {
    fetchCar();
  }, [fetchCar]);  // Dependency on `fetchCar`

  const handleDelete = async () => {
    try {
      await API.delete(`/cars/${id}`);
      navigate('/cars');
    } catch (err) {
      setError('Failed to delete car');
    }
  };

  const handleUpdate = () => {
    navigate(`/update-car/${id}`);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsImageSelected(true);
  };

  const handleCloseImage = () => {
    setIsImageSelected(false);
    setSelectedImage(null);
  };

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!car) {
    return <p>Loading...</p>;
  }

  return (
    <div className="car-detail-container">
      <h2>{car.title}</h2>
      <p>{car.description}</p>
      <p>Number Plate: {car.numberPlate}</p>
      <p>Registration Number: {car.registrationNumber}</p>
      <p>Color: {car.color}</p>
      <p>Last Service Date: {new Date(car.lastServiceDate).toLocaleDateString()}</p>

      <div className={`car-images ${isImageSelected ? 'hidden' : ''}`}>
        {car.images.map((image, index) => (
          <img key={index} src={image} alt={`Car ${index + 1}`} onClick={() => handleImageClick(image)} />
        ))}
      </div>

      {isImageSelected && (
        <div className="selected-image-wrapper">
          <button className="close-btn" onClick={handleCloseImage}>&times;</button>
          <img src={selectedImage} alt="Selected Car" className="selected-image" />
        </div>
      )}

      <button onClick={handleUpdate} className="update-btn">Update Car</button>
      <button onClick={handleDelete} className="delete-btn">Delete Car</button>
    </div>
  );
};

export default CarDetailPage;
