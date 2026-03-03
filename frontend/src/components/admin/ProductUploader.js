import React, { useState } from 'react';
import API_URL from '../../config';

export default function ProductUploader({ onProductCreated }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: 'Dhoma e ndejes',
    supplier: '',
    description: '',
    stock: '0',
    isOnSale: false,
    salePrice: '',
    image: null
  });

  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    'Dhoma e ndejes',
    'Dhoma e gjumit',
    'Kuzhina',
    'Zyra',
    'Aksesorë'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('File selected:', file); // DEBUG
    
    if (file) {
      setForm({ ...form, image: file });
      
      // Krijo preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setForm({ ...form, image: null });
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verifiko nëse ka foto
    if (!form.image) {
      alert('Zgjidh një foto për produktin!');
      return;
    }
    
    setUploading(true);

    // Krijo FormData
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('category', form.category);
    formData.append('supplier', form.supplier);
    formData.append('description', form.description);
    formData.append('stock', form.stock || '0');
    formData.append('isOnSale', form.isOnSale);
    
    if (form.isOnSale && form.salePrice) {
      formData.append('salePrice', form.salePrice);
    }
    
    // Shto foton (shumë e rëndësishme!)
    formData.append('image', form.image);
    
    // DEBUG: Shiko çfarë po dërgohet
    console.log('=== FORM DATA ===');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    try {
      const res = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'x-admin-pass': 'luli123'
          // MOS VENDOS 'Content-Type' - FormData e vendos vetë!
        },
        body: formData
      });

      const data = await res.json();
      console.log('Response:', data);
      
      if (res.ok) {
        alert(`✅ Produkti "${form.name}" u shtua me sukses!`);
        
        // Pastro formularin
        setForm({
          name: '',
          price: '',
          category: 'Dhoma e ndejes',
          supplier: '',
          description: '',
          stock: '0',
          isOnSale: false,
          salePrice: '',
          image: null
        });
        setImagePreview(null);
        
        if (onProductCreated) onProductCreated(data);
      } else {
        alert('❌ Gabim: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ Gabim gjatë shtimit të produktit');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Shto Produkt të Ri</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Emri i produktit */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Emri i produktit *
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Kategoria */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Kategoria *
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: 'white'
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Furnitori */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Furnitori
          </label>
          <input
            type="text"
            name="supplier"
            value={form.supplier}
            onChange={handleInputChange}
            placeholder="Emri i furnitorit"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Çmimi dhe stoku */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Çmimi (€) *
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleInputChange}
              required
              step="0.01"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Stoku
            </label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
        </div>

        {/* Në ofertë */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              name="isOnSale"
              checked={form.isOnSale}
              onChange={handleInputChange}
            />
            <span>Ky produkt është në ofertë</span>
          </label>
        </div>

        {/* Çmimi i ofertës */}
        {form.isOnSale && (
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Çmimi i zbritur (€)
            </label>
            <input
              type="number"
              name="salePrice"
              value={form.salePrice}
              onChange={handleInputChange}
              step="0.01"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
        )}

        {/* Përshkrimi */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Përshkrimi
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            rows="4"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Foto - KJO ËSHTË PJESA MË E RËNDËSISHME */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Foto e produktit *
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          {imagePreview && (
            <div style={{ marginTop: '10px' }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: '200px',
                  maxHeight: '200px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
          )}
        </div>

        {/* Butoni */}
        <button
          type="submit"
          disabled={uploading}
          style={{
            width: '100%',
            padding: '12px',
            background: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: uploading ? 'not-allowed' : 'pointer',
            opacity: uploading ? 0.7 : 1
          }}
        >
          {uploading ? 'Duke shtuar...' : '📤 Shto Produktin'}
        </button>
      </form>
    </div>
  );
}