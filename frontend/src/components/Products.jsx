import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://orendion-bend.onrender.com/api/products")
      .then(res => res.json())
      .then(data => {
        console.log("DATA NGA BACKEND:", data); // kontrollo gjithë array
        // Ky console.log tregon saktë field-in e imazhit për çdo produkt
        data.forEach(p => console.log("IMAGE URL:", p.image || p.imageUrl));
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
      {products.map(product => {
        // Vendosim imageUrl saktë
        const imgSrc = product.imageUrl || product.image; // përdor field-in që ekziston
        return (
          <div key={product._id} style={{ border: "1px solid #ddd", padding: "10px" }}>
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={product.name}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
            ) : (
              <div style={{ width: "100%", height: "150px", backgroundColor: "#eee", display: "flex", alignItems: "center", justifyContent: "center" }}>
                No Image
              </div>
            )}
            <h4>{product.name}</h4>
            <p>{product.price} €</p>
          </div>
        );
      })}
    </div>
  );
}

export default Products;
