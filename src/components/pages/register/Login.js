// import React, { useState } from 'react';
// import axios from 'axios';
// import './login.css'; // Import the stylesheet

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/login/', {
//         username,
//         password,
//       });

//       // Store tokens in localStorage
//       localStorage.setItem('token', response.data.access);
//       localStorage.setItem('refreshToken', response.data.refresh);

//       // Redirect to dashboard using user_id
//       const user_id = response.data.user_id; // or username if you prefer
//       window.location.href = `/dashboard/${user_id}`;

//       setMessage('Login successful!');
//     } catch (error) {
//       setMessage('Error: ' + (error.response?.data?.detail || 'Something went wrong.'));
//     }
//   };

//   return (
//     <div className="container">
//       <div className="login-form">
//         <h2>Login</h2>
//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>
//         {message && <p className={message.includes("Error") ? "error-message" : "message"}>{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; // Import the stylesheet

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', {
        username,
        password,
      });

      // Store tokens in localStorage with correct keys
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      // Redirect to dashboard using user_id
      const user_id = response.data.user_id; // or username if you prefer
      window.location.href = `/dashboard/${user_id}`;

      setMessage('Login successful!');
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.detail || 'Something went wrong.'));
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {message && <p className={message.includes("Error") ? "error-message" : "message"}>{message}</p>}
      </div>
    </div>
  );
};

export default Login;