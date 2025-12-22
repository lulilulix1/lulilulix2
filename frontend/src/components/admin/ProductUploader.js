import React, { useState } from "react";
import { uploadProduct } from "../../services/api";

export default function ProductUploader() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("supplier", supplier);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await uploadProduct(formData);
      alert("Produkti u shtua!");

      setName("");
      setPrice("");
      setCategory("");
      setSupplier("");
      setDescription("");
      setImage(null);
    } catch (err) {
      console.log("Error uploading:", err);
      alert("Gabim gjatë upload-it");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Emri" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Çmimi" value={price} type="number" onChange={e => setPrice(e.target.value)} required />
      <input placeholder="Kategoria" value={category} onChange={e => setCategory(e.target.value)} required />
      <input placeholder="Furnitori" value={supplier} onChange={e => setSupplier(e.target.value)} />
      <textarea placeholder="Përshkrimi" value={description} onChange={e => setDescription(e.target.value)}></textarea>

      <input type="file" onChange={e => setImage(e.target.files[0])} required />

      <button type="submit">Shto Produkt</button>
    </form>
  );
}
