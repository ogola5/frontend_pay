import React, { useState } from 'react';
import axios from 'axios';
import './register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Added confirmPassword state
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/register/', {
        username,
        email,
        full_name: fullName, // Match Django's model field name
        password,
        confirm_password: confirmPassword, // Include confirm_password field
      });

      if (response.status === 201) {
        setMessage('Registration successful! Please check your email to verify your account.');
      }
    } catch (error) {
      console.error(error);
      setMessage(
        'Error: ' + (error.response?.data?.detail || 'Something went wrong during registration.')
      );
    }
  };

  return (
    <div className="container">
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password" // Added confirm password field
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        {message && <p className={message.includes('Error') ? 'error-message' : 'message'}>{message}</p>}
      </div>
    </div>
  );
};

export default Register;
