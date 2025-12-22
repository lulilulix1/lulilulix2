// src/components/admin/ProductListAdmin.js
import React from "react";

function ProductListAdmin({ products = [] }) {
  return (
    <div style={{ color: "#e6eef8" }}>
      <h3>Lista e Produkteve (Admin)</h3>
      <div style={{ display: "grid", gap: 12 }}>
        {products.map(p => (
          <div key={p.id} style={{ background: "#0b1220", padding: 12, borderRadius: 8, display: "flex", gap: 12 }}>
            <div style={{ width: 120, height: 80, background: "#07101a", borderRadius: 6, overflow: "hidden" }}>
              {p.images && p.images[0] ? <img src={p.images[0]} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={p.name}/> : <div style={{padding:10}}>No image</div>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{p.name}</div>
                  <div style={{ color: "#9fb4d6" }}>{p.category} • {p.supplier || "—"}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700 }}>{p.price.toFixed(2)}€</div>
                  <div style={{ fontSize: 12, color: "#9fb4d6" }}>Cost: {(p.cost||0).toFixed(2)}€ • Profit: {((p.price - (p.cost||0))).toFixed(2)}€</div>
                </div>
              </div>
              <p style={{ marginTop: 8, color: "#cbd5e1" }}>{p.description?.slice(0,120) || ""}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListAdmin;
