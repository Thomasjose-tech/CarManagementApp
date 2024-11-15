import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CarListPage from './pages/CarListPage';
import CarDetailPage from './pages/CarDetailPage';
import AddCarPage from './pages/AddCarPage';
import UpdateCarPage from './pages/UpdateCarPage'; // New UpdateCarPage import
import ProtectedRoute from './components/ProtectedRoute'; // Protected route component
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes */}
          <Route path="/cars" element={<ProtectedRoute><CarListPage /></ProtectedRoute>} />
          <Route path="/cars/:id" element={<ProtectedRoute><CarDetailPage /></ProtectedRoute>} />
          <Route path="/add-car" element={<ProtectedRoute><AddCarPage /></ProtectedRoute>} />
          <Route path="/update-car/:id" element={<ProtectedRoute><UpdateCarPage /></ProtectedRoute>} /> {/* Update route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
