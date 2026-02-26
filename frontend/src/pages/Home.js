import React, { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then(res => res.json())
      .then(data => {
        console.log("PRODUCTS FROM BACKEND:", data);
        setProducts(data);
      })
      .catch(err => console.error("ERROR:", err));
  }, []);

  return (
    <div>
      <h1>Produktet nga Backend</h1>

      {products.length === 0 && <p>Nuk ka produkte</p>}

      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} – {p.price} €
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
