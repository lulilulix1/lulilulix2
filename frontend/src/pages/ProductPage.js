import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import API_URL from '../config';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import './ProductPage.css';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useShoppingCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
      
      // Nëse produkti ka array images, përdor atë, përndryshe krijo array me një foto
      if (data.images && data.images.length > 0) {
        setSelectedImage(0);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Duke ngarkuar...</div>;
  }

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '60px' }}>
        <h2>Produkti nuk u gjet</h2>
        <Link to="/" className="btn btn-primary">Kthehu në ballinë</Link>
      </div>
    );
  }

  // Krijimi i array-it të fotove (për momentin vetëm një foto)
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image].filter(img => img); // Filtron null/undefined

  return (
    <div className="container product-page">
      <Link to="/" className="back-link">
        <FaArrowLeft /> Kthehu
      </Link>

      <div className="product-details">
        {/* Galeria e fotove */}
        <div className="product-gallery">
          <div className="main-image">
            <img 
              src={productImages[selectedImage] || 'https://via.placeholder.com/600x400?text=No+Image'} 
              alt={product.name}
            />
          </div>
          
          {/* Thumbnails (nëse ka shumë foto) */}
          {productImages.length > 1 && (
            <div className="thumbnail-grid">
              {productImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.name} - ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Informacioni i produktit */}
        <div className="product-info">
          <p className="product-category">{product.category}</p>
          <h1 className="product-title">{product.name}</h1>
          
          {product.supplier && (
            <p className="product-supplier">Furnitori: {product.supplier}</p>
          )}
          
          <div className="product-price-section">
            {product.isOnSale && product.salePrice ? (
              <>
                <span className="old-price">€{product.price.toFixed(2)}</span>
                <span className="sale-price">€{product.salePrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="regular-price">€{product.price.toFixed(2)}</span>
            )}
          </div>

          {product.description && (
            <div className="product-description">
              <h3>Përshkrimi</h3>
              <p>{product.description}</p>
            </div>
          )}

          <button 
            className="btn-add-to-cart-large"
            onClick={() => addToCart(product)}
          >
            <FaShoppingCart /> Shto në shportë
          </button>
        </div>
      </div>
    </div>
  );
}