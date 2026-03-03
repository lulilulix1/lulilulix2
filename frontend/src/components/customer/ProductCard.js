import React from 'react';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { FaShoppingCart } from 'react-icons/fa';

export default function ProductCard({ product }) {
  const { addToCart } = useShoppingCart();

  // Kontrollo nëse produkti është i ri (30 ditët e fundit)
  const isNew = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(product.createdAt) > thirtyDaysAgo;
  };

  // Për shembull, produktet në ofertë (për momentin i shënojmë rastësisht)
  const isOnSale = Math.random() > 0.7;

  return (
    <div className="product-card">
      {/* Badges */}
      {(isNew() || isOnSale) && (
        <div className="product-badges">
          {isNew() && <span className="badge badge-new">NEW</span>}
          {isOnSale && <span className="badge badge-sale">SALE</span>}
        </div>
      )}

      {/* Imazhi */}
      <img
  src={product.image || 'https://placehold.co/300x200/2c3e50/white?text=Orendion'}
  alt={product.name}
  className="product-image"
  onError={(e) => {
    e.target.src = 'https://placehold.co/300x200/2c3e50/white?text=No+Image';
  }}
/>

      {/* Informacioni */}
      <div className="product-info">
        <div className="product-category">{product.category || 'Kategori'}</div>
        <h3 className="product-name">{product.name}</h3>
        {product.description && (
          <p className="product-description">
            {product.description.length > 60
              ? `${product.description.substring(0, 60)}...`
              : product.description}
          </p>
        )}
        <div className="product-price">€{product.price?.toFixed(2)}</div>
        
        <button
          className="btn-add-to-cart"
          onClick={() => addToCart(product)}
        >
          <FaShoppingCart /> Shto në shportë
        </button>
      </div>
    </div>
  );
}