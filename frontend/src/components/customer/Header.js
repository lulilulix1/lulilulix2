import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">Orendion</Link>
        
        <div className="search-bar">
          <input type="text" placeholder="Kërko..." />
          <button className="search-btn"><FaSearch /></button>
        </div>
        
        <div className="header-icons">
          <Link to="/login"><FaUser /> Llogaria</Link>
          <Link to="/checkout"><FaShoppingCart /> Shporta</Link>
        </div>
      </div>
    </header>
  );
}