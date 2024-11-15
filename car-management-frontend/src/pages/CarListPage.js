// src/pages/CarListPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';
import './CarListPage.css';

const CarListPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await API.get('/cars');
        setCars(response.data);
      } catch (err) {
        console.error("Error fetching cars:", err);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="car-list-container">
      {/* Title */}
      <h2 className="car-list-title">Car List</h2>

      {/* Add Car Button */}
      <Link to="/add-car" className="add-car-btn">
        Add New Car
      </Link>

      <div className="car-list">
        {cars.map((car) => (
          <div key={car._id} className="car-item">
            <div className="car-thumbnail">
              {car.images && car.images.length > 0 ? (
                <img src={car.images[0]} alt={car.title} className="car-image-thumbnail" />
              ) : (
                <div className="no-image-placeholder">No Image</div>
              )}
            </div>
            <h3>{car.title}</h3>
            <Link to={`/cars/${car._id}`} className="view-details-btn">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarListPage;
