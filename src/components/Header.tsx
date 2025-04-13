import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/header.css';
import { IoBookOutline } from "react-icons/io5";

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <h1>EZMA</h1>
          </Link>
          <IoBookOutline className="icon" />
        </div>
        
        <nav className="nav-links">
          <Link to="/" className={isActive('/')}>Bosh sahifa</Link>
          <Link to="/libraries" className={isActive('/libraries')}>Kutubxonalar</Link>
          <Link to="/about" className={isActive('/about')}>Biz haqimizda</Link>
        </nav>

        <div className="auth-buttons">
          <Link to="/librarian/register" className={`register-btn ${isActive('/librarian/register')}`}>Kutubxonachi bo'lish</Link>
          <Link to="/login" className={`login-btn ${isActive('/login')}`}>Kirish</Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 