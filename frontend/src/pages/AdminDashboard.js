import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductUploader from "../components/admin/ProductUploader";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Kontrollo nëse është admin (nga localStorage)
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const loadProducts = async () => {
    try {
      const res = await fetch("https://orendion-bend.onrender.com/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>
      <button 
        onClick={() => {
          localStorage.removeItem('isAdmin');
          navigate('/admin-login');
        }}
        style={{ float: 'right' }}
      >
        Logout
      </button>
      
      <ProductUploader onProductCreated={loadProducts} />

      <hr />

      <h2>Produktet</h2>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} – {p.price} €
            <br />
            <img src={p.image} alt="" width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;