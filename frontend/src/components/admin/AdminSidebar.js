// src/components/admin/AdminSidebar.js
import React from "react";

function AdminSidebar({ active, onSelect }) {
  const items = [
    { id: "dashboard", label: "Dashboard" },
    { id: "products", label: "Products" },
    { id: "upload", label: "Upload Product" },
    { id: "orders", label: "Orders" },
    { id: "categories", label: "Categories" },
    { id: "suppliers", label: "Suppliers" }
  ];

  return (
    <aside style={{
      width: 260, background: "#071226", color: "#dbeafe", padding: 20, minHeight: "calc(100vh - 56px)"
    }}>
      <div style={{ marginBottom: 20, fontWeight: 700 }}>Menu</div>
      {items.map(i => (
        <div key={i.id}
             onClick={() => onSelect(i.id)}
             style={{
               padding: "10px 12px",
               borderRadius: 8,
               marginBottom: 8,
               background: active === i.id ? "linear-gradient(90deg,#0f1724,#0b1220)" : "transparent",
               cursor: "pointer",
               color: active === i.id ? "#fff" : "#9fb4d6"
             }}>
          {i.label}
        </div>
      ))}
    </aside>
  );
}

export default AdminSidebar;
