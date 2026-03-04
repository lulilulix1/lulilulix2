import React from 'react';
import { Link } from 'react-router-dom'; // Shto këtë
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { FaShoppingCart } from 'react-icons/fa';

export default function ProductCard({ product }) {
  const { addToCart } = useShoppingCart();

  const isNew = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(product.createdAt) > thirtyDaysAgo;
  };

  return (
    <div className="product-card">
      {/* Badges */}
      <div className="product-badges">
        {isNew() && <span className="badge badge-new">NEW</span>}
        {/* Mund të shtosh edhe badge për ofertë kur të kesh logjikën */}
      </div>

      {/* Linku që çon te faqja e detajeve */}
      <Link to={`/produkti/${product._id}`} className="product-link">
        <img
          src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </Link>

      <div className="product-info">
        <Link to={`/produkti/${product._id}`} className="product-link">
          <div className="product-category">{product.category || 'Kategori'}</div>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        
        <div className="product-price">€{product.price?.toFixed(2)}</div>
        
        <button
          className="btn-add-to-cart"
          onClick={(e) => {
            e.preventDefault(); // Parandalon navigimin kur klikon butonin
            addToCart(product);
          }}
        >
          <FaShoppingCart /> Shto në shportë
        </button>
      </div>
    </div>
  );
}