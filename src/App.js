import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/pages/Landing'; 
import Register from './components/pages/register/Register';
import Login from './components/pages/register/Login';
import Logout from './components/pages/register/Logout'; 
import Dashboard from './components/pages/dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Landing />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;