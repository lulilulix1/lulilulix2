import React from 'react';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { FaShoppingCart } from 'react-icons/fa';

export default function ProductCard({ product }) {
  const { addToCart } = useShoppingCart();

  // Kontrollo nëse produkti është i ri (30 ditët e fundit)
  const isNew = () => {
    if (!product?.createdAt) return false;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(product.createdAt) > thirtyDaysAgo;
  };

  // Funksioni për të trajtuar gabimet e ngarkimit të fotove
  const handleImageError = (e) => {
    console.error('Image failed to load:', e.target.src);
    e.target.src = 'https://placehold.co/300x200/2c3e50/white?text=No+Image';
    e.target.onerror = null;
  };

  // Përcakto URL-në e fotos në mënyrën më të thjeshtë të mundshme
  let imageUrl = 'https://placehold.co/300x200/2c3e50/white?text=No+Image';
  
  if (product?.images && product.images.length > 0 && product.images[0]) {
    imageUrl = product.images[0];
  } else if (product?.image) {
    imageUrl = product.image;
  }

  // DEBUG: Shiko në console se çfarë po ndodh
  console.log(`Product: ${product?.name}, Image URL: ${imageUrl}`);

  return (
    <div className="product-card">
      <div className="product-badges">
        {isNew() && <span className="badge badge-new">NEW</span>}
      </div>

      <Link to={`/produkti/${product?._id}`} className="product-link">
        <img
          src={imageUrl}
          alt={product?.name || 'Product'}
          className="product-image"
          onError={handleImageError}
          loading="lazy"
          width="300"
          height="200"
        />
      </Link>

      <div className="product-info">
        <Link to={`/produkti/${product?._id}`} className="product-link">
          <div className="product-category">
            {product?.category || 'Kategori'}
          </div>
          <h3 className="product-name">
            {product?.name || 'Pa emër'}
          </h3>
        </Link>

        <div className="product-price">
          €{product?.price ? product.price.toFixed(2) : '0.00'}
        </div>

        <button
          className="btn-add-to-cart"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
        >
          <FaShoppingCart /> Shto në shportë
        </button>
      </div>
    </div>
  );
}