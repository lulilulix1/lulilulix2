import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // ← Shto Link
import ProductCard from '../components/customer/ProductCard';
import API_URL from '../config';
import { FaArrowLeft } from 'react-icons/fa'; // ← Shto ikonën

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductsByCategory();
  }, [categoryName]);

  const fetchProductsByCategory = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const allProducts = await res.json();
      
      // Filtro produktet sipas kategorisë (case insensitive)
      const filtered = allProducts.filter(p => 
        p.category?.toLowerCase() === decodeURIComponent(categoryName).toLowerCase()
      );
      
      setProducts(filtered);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Duke ngarkuar...</div>;
  }

  return (
    <div className="container">
      {/* Butoni Kthehu dhe Titulli */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '20px', 
        marginBottom: '30px',
        padding: '10px 0'
      }}>
        <Link 
          to="/" 
          style={{ 
            color: 'var(--primary)', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '5px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          <FaArrowLeft /> Kthehu në ballinë
        </Link>
        <h1 className="section-title" style={{ marginBottom: 0 }}>
          {decodeURIComponent(categoryName)}
        </h1>
      </div>
      
      {/* Përmbajtja */}
      {products.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          background: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <p style={{ fontSize: '16px', color: 'var(--gray-600)', marginBottom: '20px' }}>
            Nuk ka produkte në këtë kategori.
          </p>
          <Link 
            to="/" 
            className="btn btn-primary"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: 'var(--primary)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            Shfleto të gjitha produktet
          </Link>
        </div>
      ) : (
        <>
          <p style={{ 
            marginBottom: '20px', 
            color: 'var(--gray-600)',
            fontSize: '14px'
          }}>
            {products.length} {products.length === 1 ? 'produkt' : 'produkte'} të gjetura
          </p>
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}