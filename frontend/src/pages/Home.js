import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // ← Shto këtë
import ProductCard from '../components/customer/ProductCard';
import API_URL from '../config';
import { 
  FaCouch, 
  FaBed, 
  FaUtensils, 
  FaChair, 
  FaLightbulb,
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

  // Produktet në ofertë (përkohësisht rastësisht)
  const saleProducts = products.filter(() => Math.random() > 0.7);

  // Kategoritë
  const categories = [
    { name: 'Dhoma e ndejes', icon: <FaCouch />, count: products.filter(p => p.category === 'Dhoma e ndejes').length },
    { name: 'Dhoma e gjumit', icon: <FaBed />, count: products.filter(p => p.category === 'Dhoma e gjumit').length },
    { name: 'Kuzhina', icon: <FaUtensils />, count: products.filter(p => p.category === 'Kuzhina').length },
    { name: 'Zyra', icon: <FaChair />, count: products.filter(p => p.category === 'Zyra').length },
    { name: 'Aksesorë', icon: <FaLightbulb />, count: products.filter(p => p.category === 'Aksesorë').length },
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
        {/* Sidebar me kategori - TANI LINKET PUNOJNË */}
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
          {/* Produktet në ofertë */}
          {saleProducts.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <div className="section-header">
                <h2 className="section-title">Në Ofertë</h2>
                <Link to="/kategoria/oferta" className="view-all">
                  Shiko të gjitha <FaArrowRight />
                </Link>
              </div>
              <div className="products-grid">
                {saleProducts.slice(0, 4).map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* Produktet e reja */}
          {newProducts.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <div className="section-header">
                <h2 className="section-title">Produkte të Reja</h2>
                <Link to="/kategoria/te-reja" className="view-all">
                  Shiko të gjitha <FaArrowRight />
                </Link>
              </div>
              <div className="products-grid">
                {newProducts.slice(0, 4).map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </section>
          )}

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