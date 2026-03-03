import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Rreth nesh</h4>
          <ul>
            <li><Link to="/about">Për Orendion</Link></li>
            <li><Link to="/contact">Kontakt</Link></li>
            <li><Link to="/careers">Puna me ne</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Shërbimi ndaj klientit</h4>
          <ul>
            <li><Link to="/help">Ndihmë</Link></li>
            <li><Link to="/shipping">Dërgesa</Link></li>
            <li><Link to="/returns">Kthimet</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Blerje të sigurta</h4>
          <ul>
            <li>✓ Dërgesa të shpejta</li>
            <li>✓ Produkte origjinale</li>
            <li>✓ Çmimi më i mirë</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Na ndiqni</h4>
          <ul>
            <li><Link to="#">Facebook</Link></li>
            <li><Link to="#">Instagram</Link></li>
            <li><Link to="#">LinkedIn</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Orendion. Të gjitha të drejtat e rezervuara.</p>
      </div>
    </footer>
  );
}