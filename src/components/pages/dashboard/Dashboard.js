// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './dashboard.css';

// const Dashboard = () => {
//   const [data, setData] = useState({
//     user: {},
//     profile: {},
//     balance_kes: '0',
//     balance_usd: '0',
//     monthly_spending: '0',
//     highest_transfer: '0',
//     highest_receipt: '0',
//     recent_transactions: [],
//     mpesa_payments: []
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const accessToken = localStorage.getItem('access_token');
//         if (!accessToken) {
//           console.error('No access token found');
//           return; // Handle this case, maybe redirect to login
//         }
//         const response = await axios.get('http://127.0.0.1:8000/api/dashboard/', { 
//           headers: {
//             Authorization: `Bearer ${accessToken}`
//           }
//         });
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//         // If it's a 401, you might want to trigger token refresh here
//       }
//     };
//     fetchData();
//   }, []);
// //http://127.0.0.1:8000
//   return (
//     <div className="dashboard">
//       <h1>Welcome, {data.user.username}</h1>
//       <section className="user-info">
//         <p><strong>Full Name:</strong> {data.profile.full_name}</p>
//         <p><strong>Email:</strong> {data.user.email}</p>
//         <p><strong>Last Login:</strong> {data.profile.last_login ? new Date(data.profile.last_login).toLocaleString() : 'Never'}</p>
//         <p><strong>Email Verified:</strong> {data.profile.email_verified ? 'Yes' : 'No'}</p>
//       </section>

//       <section className="balances">
//         <h2>Balances</h2>
//         <p><strong>KES:</strong> {data.balance_kes}</p>
//         <p><strong>USD:</strong> {data.balance_usd}</p>
//       </section>

//       <section className="monthly-info">
//         <h2>Monthly Spending</h2>
//         <p><strong>Total:</strong> {data.monthly_spending} KES</p>
//       </section>

//       <section className="highs">
//         <h2>Highs</h2>
//         <p><strong>Highest Transfer:</strong> {data.highest_transfer} KES</p>
//         <p><strong>Highest Receipt:</strong> {data.highest_receipt} KES</p>
//       </section>

//       <section className="transactions">
//         <h2>Recent Transactions</h2>
//         <ul>
//           {data.recent_transactions.map((txn, index) => (
//             <li key={index}>
//               {txn.transaction_type} - {txn.amount} KES - {new Date(txn.timestamp).toLocaleString()} - {txn.description}
//             </li>
//           ))}
//         </ul>
//       </section>

//       <section className="mpesa">
//         <h2>Recent M-Pesa Payments</h2>
//         <ul>
//           {data.mpesa_payments.map((payment, index) => (
//             <li key={index}>
//               {payment.amount} KES - Status: {payment.status} - {new Date(payment.created_at).toLocaleString()}
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';

// Token refresh logic
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      try {
        const res = await axios.post('http://127.0.0.1:8000/refresh/', { refresh: refreshToken });
        localStorage.setItem('access_token', res.data.access);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        // Redirect to login or handle logout
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

const Dashboard = () => {
  const [data, setData] = useState({
    user: {},
    profile: {},
    balance_kes: '0',
    balance_usd: '0',
    monthly_spending: '0',
    highest_transfer: '0',
    highest_receipt: '0',
    recent_transactions: [],
    mpesa_payments: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          console.error('No access token found');
          // Redirect to login page if no token is found
          window.location.href = '/login';
          return;
        }
        const response = await axios.get('http://127.0.0.1:8000/api/dashboard/', { 
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // The interceptor will handle 401 errors, so we don't need to do much here
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome, {data.user.username}</h1>
      <section className="user-info">
        <p><strong>Full Name:</strong> {data.profile.full_name}</p>
        <p><strong>Email:</strong> {data.user.email}</p>
        <p><strong>Last Login:</strong> {data.profile.last_login ? new Date(data.profile.last_login).toLocaleString() : 'Never'}</p>
        <p><strong>Email Verified:</strong> {data.profile.email_verified ? 'Yes' : 'No'}</p>
      </section>

      <section className="balances">
        <h2>Balances</h2>
        <p><strong>KES:</strong> {data.balance_kes}</p>
        <p><strong>USD:</strong> {data.balance_usd}</p>
      </section>

      <section className="monthly-info">
        <h2>Monthly Spending</h2>
        <p><strong>Total:</strong> {data.monthly_spending} KES</p>
      </section>

      <section className="highs">
        <h2>Highs</h2>
        <p><strong>Highest Transfer:</strong> {data.highest_transfer} KES</p>
        <p><strong>Highest Receipt:</strong> {data.highest_receipt} KES</p>
      </section>

      <section className="transactions">
        <h2>Recent Transactions</h2>
        <ul>
          {data.recent_transactions.map((txn, index) => (
            <li key={index}>
              {txn.transaction_type} - {txn.amount} KES - {new Date(txn.timestamp).toLocaleString()} - {txn.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="mpesa">
        <h2>Recent M-Pesa Payments</h2>
        <ul>
          {data.mpesa_payments.map((payment, index) => (
            <li key={index}>
              {payment.amount} KES - Status: {payment.status} - {new Date(payment.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;