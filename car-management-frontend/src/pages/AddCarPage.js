import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import './AddCarPage.css';

const AddCarPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);  // Store multiple image files
  const [numberPlate, setNumberPlate] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [color, setColor] = useState('');
  const [lastServiceDate, setLastServiceDate] = useState('');
  const navigate = useNavigate();

  // Handle file selection for multiple files
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);  // Convert file list to an array
    setImages(files);
  };

  // Handle form submission
  const handleAddCar = async (e) => {
    e.preventDefault();

    // Convert all image files to base64
    const base64Images = [];
    for (const file of images) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      base64Images.push(
        await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
        })
      );
    }

    // Prepare the data to be sent to the backend
    const payload = {
      title,
      description,
      tags: tags.split(','), // Split tags into an array
      images: base64Images, // Send the array of base64 images
      numberPlate,
      registrationNumber,
      color,
      lastServiceDate,
    };

    try {
      // Make the POST request to add the car
      await API.post('/cars', payload);
      navigate('/cars'); // Redirect to the car list page on success
    } catch (err) {
      console.error('Error adding car:', err.response ? err.response.data : err);
    }
  };

  return (
    <div className="add-car-container">
      <h2>Add New Car</h2>
      <form onSubmit={handleAddCar} className="add-car-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Car Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Car Description"
          required
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
        />
        <input
          type="text"
          value={numberPlate}
          onChange={(e) => setNumberPlate(e.target.value)}
          placeholder="Number Plate"
          required
        />
        <input
          type="text"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          placeholder="Registration Number"
          required
        />
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Color"
          required
        />
        <input
          type="date"
          value={lastServiceDate}
          onChange={(e) => setLastServiceDate(e.target.value)}
          placeholder="Last Service Date"
          required
        />
        <input
          type="file"
          onChange={handleImageChange}
          multiple
        />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCarPage;
