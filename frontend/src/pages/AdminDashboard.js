import React, { useState, useEffect } from "react";
import API_URL from "../config";
import ProductUploader from "../components/admin/ProductUploader";

function AdminDashboard() {
  const adminPass = localStorage.getItem("adminPassword") || "luli123";
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: {
          "x-admin-pass": adminPass
        }
      });

      const data = await res.json();

      // 🔒 SIGURI: vetëm array lejohet
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error("Orders nuk është array:", data);
        setOrders([]);
      }

    } catch (err) {
      console.error("Gabim gjatë marrjes së porosive:", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>

      <ProductUploader onProductCreated={() => loadOrders()} />

      <h2>Porositë</h2>

      {orders.length === 0 && <p>Nuk ka ende porosi</p>}

      {orders.map(o => (
        <div key={o._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <p><b>Nr:</b> {o.orderNumber}</p>
          <p><b>Statusi:</b> {o.status}</p>
          <p><b>Total:</b> {o.total} €</p>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
