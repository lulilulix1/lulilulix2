import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/api";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getProducts();
    setProducts(data);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Produktet</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {products.map((p) => (
          <div key={p._id} style={{ border: "1px solid #ddd", padding: 10, width: 200 }}>
            <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: 150, objectFit: "cover" }} />
            <h4>{p.name}</h4>
            <p>{p.price} €</p>
          </div>
        ))}
      </div>
    </div>
  );
}
