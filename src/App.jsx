import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Pricing from './pages/Pricing';
import BookPickup from './pages/BookPickup';
import BookingConfirmation from './pages/BookingConfirmation';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SecretaryManagement from './pages/SecretaryManagement';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/book" element={<BookPickup />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/secretaries" element={<SecretaryManagement />} />

      </Routes>
    </Router>
  );
}

export default App;
