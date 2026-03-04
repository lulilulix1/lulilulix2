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
    images: [] // tani është array
  });

  const [uploading, setUploading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

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
    const files = Array.from(e.target.files);
    setForm({ ...form, images: files });
    
    // Krijo preview për të gjitha fotot
    const previews = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const action = e.nativeEvent.submitter?.value || 'add';
    
    if (form.images.length === 0) {
      alert('Zgjidh të paktën një foto!');
      return;
    }
    
    setUploading(true);

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
    
    // Shto të gjitha fotot
    form.images.forEach((image, index) => {
      formData.append('images', image);
    });

    try {
      const res = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'x-admin-pass': 'luli123'
        },
        body: formData
      });

      const data = await res.json();
      
      if (res.ok) {
        alert(`✅ "${form.name}" u shtua me ${form.images.length} foto!`);
        
        if (action === 'addAnother') {
          // Pastro vetëm fotot dhe emrin/çmimin/përshkrimin
          setForm({
            ...form,
            name: '',
            price: '',
            description: '',
            images: []
          });
          setImagePreviews([]);
        } else {
          // Pastro gjithçka
          setForm({
            name: '',
            price: '',
            category: 'Dhoma e ndejes',
            supplier: '',
            description: '',
            stock: '0',
            isOnSale: false,
            salePrice: '',
            images: []
          });
          setImagePreviews([]);
        }
        
        if (onProductCreated) onProductCreated(data);
      } else {
        alert('❌ Gabim: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ Gabim gjatë shtimit');
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

        {/* Fotot */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Fotot e produktit (zgjidh disa) *
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          {imagePreviews.length > 0 && (
            <div style={{ 
              marginTop: '10px', 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
              gap: '10px'
            }}>
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Dy butonat */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            type="submit"
            name="action"
            value="add"
            disabled={uploading}
            style={{
              flex: 1,
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
            {uploading ? 'Duke shtuar...' : '✅ Shto Produktin'}
          </button>
          
          <button
            type="submit"
            name="action"
            value="addAnother"
            disabled={uploading}
            style={{
              flex: 1,
              padding: '12px',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: uploading ? 'not-allowed' : 'pointer',
              opacity: uploading ? 0.7 : 1
            }}
          >
            {uploading ? 'Duke shtuar...' : '➕ Shto dhe vazhdo'}
          </button>
        </div>
      </form>
    </div>
  );
}