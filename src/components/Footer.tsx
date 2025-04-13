import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Ezma</h3>
          <p>O'zbekiston kutubxonalarida kitoblarni qidirish va topish uchun zamonaviy tizim</p>
        </div>

        <div className="footer-section">
          <h3>Sahifalar</h3>
          <ul>
            <li><Link to="/">Bosh sahifa</Link></li>
            <li><Link to="/libraries">Kutubxonalar</Link></li>
            <li><Link to="/about">Biz haqimizda</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Yordam</h3>
          <ul>
            <li><Link to="/faq">Ko'p so'raladigan savollar</Link></li>
            <li><Link to="/contact">Bog'lanish</Link></li>
            <li><Link to="/privacy">Maxfiylik siyosati</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Ijtimoiy tarmoqlar</h3>
          <ul>
            <li><a href="https://t.me/ezma" target="_blank" rel="noopener noreferrer">Telegram</a></li>
            <li><a href="https://instagram.com/ezma" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://facebook.com/ezma" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Ezma. Barcha huquqlar himoyalangan.</p>
      </div>
    </footer>
  );
};

export default Footer; 