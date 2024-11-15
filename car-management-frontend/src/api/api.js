// src/api/api.js
import axios from 'axios';

// Create an Axios instance with the backend API base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Update with your backend URL
});

// Set token in header if present (for authentication)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
