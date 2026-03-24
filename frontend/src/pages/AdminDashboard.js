import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductUploader from "../components/admin/ProductUploader";
import API_URL from "../config";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const [loading, setLoading] = useState(true);

  // Kontrollo admin
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const loadProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  const loadOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: {
          'x-admin-pass': 'luli123'
        }
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error loading orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pass': 'luli123'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        alert(`Statusi u ndryshua në "${newStatus}"`);
        loadOrders(); // Rifresko listën
      } else {
        alert("Gabim gjatë ndryshimit të statusit");
      }
    } catch (err) {
      console.error("Error updating order:", err);
      alert("Gabim në lidhje me serverin");
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'ne-pritje': { label: '⏳ Në pritje', color: '#f39c12' },
      'konfirmuar': { label: '✅ Konfirmuar', color: '#27ae60' },
      'dërguar': { label: '🚚 Dërguar', color: '#3498db' },
      'përfunduar': { label: '🏁 Përfunduar', color: '#2c3e50' },
      'anuluar': { label: '❌ Anuluar', color: '#e74c3c' }
    };
    const s = statusMap[status] || { label: status, color: '#95a5a6' };
    return <span style={{ background: s.color, color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>{s.label}</span>;
  };

  if (loading) return <div className="loading">Duke ngarkuar...</div>;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1>Admin Panel</h1>
        <button 
          onClick={() => {
            localStorage.removeItem('isAdmin');
            navigate('/admin-login');
          }}
          style={{
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: 20, borderBottom: '1px solid #ddd', paddingBottom: 10 }}>
        <button 
          onClick={() => setActiveTab('products')}
          style={{
            padding: '8px 16px',
            background: activeTab === 'products' ? '#27ae60' : '#f8f9fa',
            color: activeTab === 'products' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          📦 Produktet
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '8px 16px',
            background: activeTab === 'orders' ? '#27ae60' : '#f8f9fa',
            color: activeTab === 'orders' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🛒 Porositë ({orders.length})
        </button>
      </div>

      {/* Produktet */}
      {activeTab === 'products' && (
        <>
          <ProductUploader onProductCreated={loadProducts} />
          <hr style={{ margin: '30px 0' }} />
          <h2>Lista e produkteve</h2>
          <div style={{ display: 'grid', gap: '10px' }}>
            {products.map(p => (
              <div key={p._id} style={{ background: '#f8f9fa', padding: '10px', borderRadius: '8px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <img src={p.image} alt={p.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flex: 1 }}>
                  <strong>{p.name}</strong>
                  <div style={{ fontSize: '12px', color: '#666' }}>{p.category} | €{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Porositë */}
      {activeTab === 'orders' && (
        <div>
          <h2>Menaxho porositë</h2>
          {orders.length === 0 ? (
            <p>Nuk ka porosi ende.</p>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <div><strong>Porosia #{order.orderNumber}</strong></div>
                      <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                        {new Date(order.createdAt).toLocaleString('sq-AL')}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      {getStatusBadge(order.status)}
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '4px',
                          border: '1px solid #ddd',
                          background: 'white'
                        }}
                      >
                        <option value="ne-pritje">Në pritje</option>
                        <option value="konfirmuar">Konfirmuar</option>
                        <option value="dërguar">Dërguar</option>
                        <option value="përfunduar">Përfunduar</option>
                        <option value="anuluar">Anuluar</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginTop: '15px', padding: '10px', background: '#f8f9fa', borderRadius: '8px' }}>
                    <div><strong>👤 Klienti:</strong> {order.customer.emri} {order.customer.mbiemri}</div>
                    <div><strong>📧 Email:</strong> {order.customer.email}</div>
                    <div><strong>📞 Telefoni:</strong> {order.customer.telefoni}</div>
                    <div><strong>📍 Adresa:</strong> {order.customer.adresa}, {order.customer.qyteti}</div>
                  </div>

                  <details style={{ marginTop: '15px' }}>
                    <summary style={{ cursor: 'pointer', color: '#27ae60' }}>🛍️ Produktet ({order.products.length})</summary>
                    <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                      {order.products.map((p, idx) => (
                        <li key={idx}>
                          {p.name} x {p.quantity} = €{(p.price * p.quantity).toFixed(2)}
                          {p.supplier && <span style={{ fontSize: '12px', color: '#666', marginLeft: '10px' }}>(Furnitori: {p.supplier})</span>}
                        </li>
                      ))}
                    </ul>
                  </details>

                  <div style={{ marginTop: '15px', textAlign: 'right', fontWeight: 'bold', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                    Totali: €{order.total.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;