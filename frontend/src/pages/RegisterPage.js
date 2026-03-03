import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from 'aws-amplify/auth';

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Fjalëkalimet nuk përputhen');
      setLoading(false);
      return;
    }

    try {
      await signUp({
        username: form.email,
        password: form.password,
        attributes: { email: form.email }
      });
      navigate('/confirm-account');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Regjistrohu</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <input
          type="password"
          placeholder="Fjalëkalimi"
          value={form.password}
          onChange={(e) => setForm({...form, password: e.target.value})}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <input
          type="password"
          placeholder="Konfirmo fjalëkalimin"
          value={form.confirmPassword}
          onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px' }}>
          {loading ? 'Duke regjistruar...' : 'Regjistrohu'}
        </button>
      </form>
    </div>
  );
}