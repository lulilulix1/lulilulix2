import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuthSession } from "aws-amplify/auth";
import { getToken } from "../utils/getToken";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    supplier: "",
    description: ""
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // =============================
  // LOAD PRODUCTS
  // =============================
  const loadProducts = async () => {
    try {
      const res = await fetch("https://orendion-bend.onrender.com/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  // =============================
  // CHECK AUTH
  // =============================
  useEffect(() => {
    async function checkAuth() {
      try {
        const session = await fetchAuthSession();
        if (!session.tokens) {
          navigate("/admin-login");
        }
      } catch {
        navigate("/admin-login");
      }
    }

    checkAuth();
    loadProducts();
  }, [navigate]);

  // =============================
  // HANDLE INPUT
  // =============================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =============================
  // HANDLE FILE
  // =============================
  const handleFileChange = (e) => {
    console.log("FILES:", e.target.files);
    setImage(e.target.files[0]);
  };

  // =============================
  // SUBMIT
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("IMAGE BEFORE UPLOAD:", image);

    setLoading(true);

    const formData = new FormData();

    Object.keys(form).forEach(key => {
      formData.append(key, form[key]);
    });

    if (image) {
      formData.append("image", image);
    }

    try {

      const token = await getToken();

      const res = await fetch(
        "https://orendion-bend.onrender.com/api/products",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        }
      );

      const data = await res.json();

      console.log("CREATED PRODUCT:", data);

      setForm({
        name: "",
        price: "",
        category: "",
        supplier: "",
        description: ""
      });

      setImage(null);
      loadProducts();

    } catch (err) {
      console.error("UPLOAD ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // UI
  // =============================
  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel – Add Product</h1>

      <form onSubmit={handleSubmit}>

        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required /><br/>

        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required /><br/>

        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} /><br/>

        <input name="supplier" placeholder="Supplier" value={form.supplier} onChange={handleChange} /><br/>

        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br/>

        <input type="file" onChange={handleFileChange} required /><br/><br/>

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Add Product"}
        </button>

      </form>

      <hr />

      <h2>Products</h2>

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
