import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../styles/header.css';
import { GiOpenBook } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {  // setIsLoggedIn olib tashlandi
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  const getHeaderStyle = () => {
    if (location.pathname === '/') return 'header home-header';
    if (location.pathname === '/about') return 'header about-header';
    if (location.pathname === '/libraries') return 'header libraries-header';
    if (location.pathname === '/login') return 'header login-header';
    if (location.pathname === '/librarian/register') return 'header register-header';
    if (location.pathname === '/profile') return 'header profile-header';
    if (location.pathname === '/profile/edit') return 'header profile-header';
    return 'header default-header';
  };

  return (
    <header className={getHeaderStyle()}>
      <div className="header-content">
        <div className="logo">
          <GiOpenBook className="icon" />
          <Link to="/"><h1>EZMA</h1></Link>
        </div>

        <nav className="nav-links">
          <Link to="/" className={isActive('/')}>Bosh sahifa</Link>
          <Link to="/libraries" className={isActive('/libraries')}>Kutubxonalar</Link>
          <Link to="/about" className={isActive('/about')}>Biz haqimizda</Link>
          <Link to="/books" className="books-btn">Kitoblar</Link>
        </nav>

        <div className="auth-buttons">
          {!isLoggedIn && (
            <>
              <Link to="/login" className={`login-btn ${isActive('/login')}`}>Kirish</Link>
              <Link to="/librarian/register" className={`register-btn ${isActive('/librarian/register')}`}>Kutubxonachi bo'lish</Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link to="/librarian/add-book" className="add-books-btn">Kitob qo'shish</Link>
              <Link to="/profile" className="profile-btn"><AiOutlineUser /></Link>
              <button className="settings-btn"><IoSettingsOutline /></button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
