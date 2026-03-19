import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/customer/ProductCard';
import API_URL from '../config';
import { 
  FaCouch, 
  FaBed, 
  FaUtensils, 
  FaChair, 
  FaLightbulb,
  FaStar,
  FaArrowRight 
} from 'react-icons/fa';
import '../styles/global.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Produktet e reja (30 ditët e fundit)
  const newProducts = products.filter(p => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(p.createdAt) > thirtyDaysAgo;
  });

  // Kategoritë - Me "Produkte speciale" të përfshirë
  const categories = [
    { name: 'Dhoma e ndejes', icon: <FaCouch />, count: products.filter(p => p.category === 'Dhoma e ndejes').length },
    { name: 'Dhoma e gjumit', icon: <FaBed />, count: products.filter(p => p.category === 'Dhoma e gjumit').length },
    { name: 'Kuzhina', icon: <FaUtensils />, count: products.filter(p => p.category === 'Kuzhina').length },
    { name: 'Zyra', icon: <FaChair />, count: products.filter(p => p.category === 'Zyra').length },
    { name: 'Aksesorë', icon: <FaLightbulb />, count: products.filter(p => p.category === 'Aksesorë').length },
    { name: 'Produkte speciale', icon: <FaStar />, count: products.filter(p => p.category === 'Produkte speciale').length },
  ];

  if (loading) return <div className="loading">Duke ngarkuar produktet...</div>;

  return (
    <div className="container">
      {/* Hero Mini */}
      <div className="hero-mini">
        <div>
          <h1>Orendion</h1>
          <p>Mobilje dhe aksesorë për çdo ambient</p>
        </div>
        <button>Shfleto të gjitha</button>
      </div>

      {/* Layout me dy kolona */}
      <div className="home-layout">
        {/* Sidebar me kategori */}
        <aside className="categories-sidebar">
          <h3 className="categories-title">Kategoritë</h3>
          <ul className="categories-list">
            {categories.map(cat => (
              <li key={cat.name} className="category-item">
                <Link 
                  to={`/kategoria/${encodeURIComponent(cat.name)}`} 
                  className="category-link"
                >
                  <span>{cat.name}</span>
                  <span className="category-count">{cat.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Përmbajtja kryesore */}
        <main>
          {/* Të gjitha produktet */}
          <section>
            <h2 className="section-title">Të gjitha produktet</h2>
            <div className="products-grid">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}