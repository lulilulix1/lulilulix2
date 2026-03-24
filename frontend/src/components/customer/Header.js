import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { fetchAuthSession } from 'aws-amplify/auth';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const session = await fetchAuthSession();
      if (session.tokens) {
        setUser({ email: session.tokens.accessToken.payload.email });
      }
    } catch (error) {
      setUser(null);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">Orendion</Link>
        
        <div className="search-bar">
          <input type="text" placeholder="Kërko..." />
          <button className="search-btn"><FaSearch /></button>
        </div>
        
        <div className="header-icons">
          <Link to={user ? "/account" : "/login"}>
            <FaUser /> {user ? user.email.split('@')[0] : 'Llogaria'}
          </Link>
          <Link to="/checkout"><FaShoppingCart /> Shporta</Link>
        </div>
      </div>
    </header>
  );
}