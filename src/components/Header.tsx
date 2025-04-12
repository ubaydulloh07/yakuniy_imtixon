import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <h1>Smart Library</h1>
          </Link>
        </div>
        
        <nav className="nav-links">
          <Link to="/">Bosh sahifa</Link>
          <Link to="/libraries">Kutubxonalar</Link>
          <Link to="/about">Biz haqimizda</Link>
        </nav>

        <div className="auth-buttons">
          <Link to="/librarian/register" className="register-btn">Kutubxonachi bo'lish</Link>
          <Link to="/login" className="login-btn">Kirish</Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 