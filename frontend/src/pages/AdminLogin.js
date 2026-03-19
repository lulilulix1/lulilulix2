import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${API_URL}/api/products`, {
        headers: {
          'x-admin-pass': password
        }
      });
      
      if (res.ok) {
        localStorage.setItem('adminAuthenticated', 'true');
        navigate('/admin');
      } else {
        setError('Fjalëkalimi i gabuar');
      }
    } catch (err) {
      setError('Gabim në lidhje me serverin');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>Admin Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Fjalëkalimi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Kyçu</button>
        </form>
      </div>
    </div>
  );
}