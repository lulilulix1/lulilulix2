// src/components/admin/AdminHeader.js
import React from "react";

function AdminHeader({ onLogout }) {
  return (
    <header style={{
      background: "#0f1724",
      color: "#e6eef8",
      padding: "12px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid rgba(255,255,255,0.04)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, background: "#1f2937",
          display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700
        }}>O</div>
        <h2 style={{ margin: 0, fontSize: 18 }}>Orendion Admin</h2>
      </div>

      <div>
        <button onClick={onLogout} style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: 8,
          cursor: "pointer"
        }}>Sign out</button>
      </div>
    </header>
  );
}

export default AdminHeader;
