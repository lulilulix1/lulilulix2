import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductUploader from '../components/admin/ProductUploader';
import AdminSidebar from '../components/admin/AdminSidebar';
import API_URL from '../config'; // ← IMPORTIMI QË MUNGONTE

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kontrollo nëse admin është logged in
    const isAdmin = localStorage.getItem('adminAuthenticated');
    if (!isAdmin) {
      navigate('/admin-login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt që doni ta fshini këtë produkt?')) {
      try {
        const res = await fetch(`${API_URL}/api/products/${id}`, {
          method: 'DELETE',
          headers: {
            'x-admin-pass': 'luli123'
          }
        });
        
        if (res.ok) {
          alert('Produkti u fshi me sukses!');
          fetchProducts(); // Rifresko listën
        } else {
          alert('Gabim gjatë fshirjes');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Gabim gjatë fshirjes');
      }
    }
  };

  if (loading) {
    return <div className="loading">Duke ngarkuar...</div>;
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="admin-content">
        {activeTab === 'upload' && (
          <div>
            <h1>Shto Produkt të Ri</h1>
            <ProductUploader onProductCreated={fetchProducts} />
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <h1>Menaxho Produktet</h1>
            <div className="products-list">
              {products.map(product => (
                <div key={product._id} className="product-item">
                  <div className="product-info">
                    {product.images && product.images.length > 0 ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/50x50/2c3e50/white?text=No+Image';
                        }}
                      />
                    ) : (
                      <div style={{ width: '50px', height: '50px', background: '#f0f0f0' }}></div>
                    )}
                    <div>
                      <h3>{product.name}</h3>
                      <p>€{product.price}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(product._id)}
                    className="delete-btn"
                  >
                    Fshi
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}