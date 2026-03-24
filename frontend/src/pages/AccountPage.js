import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAuthSession, signOut } from 'aws-amplify/auth';
import API_URL from '../config';

export default function AccountPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndLoadOrders();
  }, []);

  const checkAuthAndLoadOrders = async () => {
    try {
      const session = await fetchAuthSession();
      if (!session.tokens) {
        navigate('/login');
        return;
      }

      // Merr të dhënat e përdoruesit
      const userId = session.tokens.accessToken.payload.sub;
      setUser({ email: session.tokens.accessToken.payload.email });

      // Merr porositë e përdoruesit
      const token = session.tokens.idToken?.toString();
      const res = await fetch(`${API_URL}/api/orders/my`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return <div className="loading">Duke ngarkuar...</div>;
  }

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '40px auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Llogaria ime</h1>
        <button 
          onClick={handleLogout}
          style={{
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Dalje
        </button>
      </div>

      {user && (
        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '30px' }}>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      <h2>Porositë e mia</h2>

      {orders.length === 0 ? (
        <p>Nuk ke asnjë porosi ende.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {orders.map(order => (
            <div key={order._id} style={{
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <strong>Porosia #{order.orderNumber}</strong>
                <span style={{
                  background: order.status === 'ne-pritje' ? '#f39c12' : '#27ae60',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {order.status === 'ne-pritje' ? 'Në pritje' : 'Konfirmuar'}
                </span>
              </div>
              <p><strong>Data:</strong> {new Date(order.createdAt).toLocaleDateString('sq-AL')}</p>
              <p><strong>Totali:</strong> €{order.total.toFixed(2)}</p>
              <details style={{ marginTop: '10px' }}>
                <summary style={{ cursor: 'pointer', color: '#27ae60' }}>Shiko produktet</summary>
                <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                  {order.products.map((p, idx) => (
                    <li key={idx}>{p.name} x {p.quantity} = €{(p.price * p.quantity).toFixed(2)}</li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}