import React, { useState } from 'react';
import axios from 'axios';

const Logout = () => {
  const [message, setMessage] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://payment-system-o6wq.onrender.com/logout/',
        { refresh_token: refreshToken }
      );
      setMessage('Logged out successfully!');
    } catch (error) {
      setMessage('Error: ' + error.response.data?.detail || 'Something went wrong.');
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <input
        type="text"
        placeholder="Refresh Token"
        value={refreshToken}
        onChange={(e) => setRefreshToken(e.target.value)}
      />
      <button onClick={handleLogout}>Logout</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Logout;
