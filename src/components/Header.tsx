import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai'; // Logout iconi
import { logout } from '../services/API'; // Import qildik
import '../styles/header.css';
import { GiOpenBook } from "react-icons/gi";

interface HeaderProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = async () => {
    try {
      await logout(); // APIga logout so'rov yuborildi
      localStorage.removeItem("token"); // Tokenni o'chiramiz
      localStorage.removeItem("user");  // Foydalanuvchi ma'lumotlarini o'chiramiz
      setIsLoggedIn(false); // Foydalanuvchini tizimdan chiqarish
      navigate("/login"); // Login sahifasiga yo'naltirish
    } catch (error) {
      console.error("Logout xatolik: ", error);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
        <GiOpenBook className='icon' />
          <Link to="/">
            <h1>EZMA</h1>
          </Link>
        </div>

        <nav className="nav-links">
          <Link to="/" className={isActive('/')}>Bosh sahifa</Link>
          <Link to="/libraries" className={isActive('/libraries')}>Kutubxonalar</Link>
          <Link to="/about" className={isActive('/about')}>Biz haqimizda</Link>
        </nav>

        <div className="auth-buttons">
          {/* Agar foydalanuvchi login bo'lmasa, faqat login va register ko'rsatiladi */}
          {!isLoggedIn && (
            <>
              <Link to="/login" className={`login-btn ${isActive('/login')}`}>Kirish</Link>
              <Link to="/librarian/register" className={`register-btn ${isActive('/librarian/register')}`}>Kutubxonachi bo'lish</Link>
            </>
          )}

          {/* Agar foydalanuvchi login bo'lsa, profile va logout ko'rsatiladi */}
          {isLoggedIn && (
            <>
              <Link to="/profile" className="profile-btn">Profile</Link>
              <button onClick={handleLogout} className="logout-btn">
                <AiOutlineLogout /> {/* Logout iconi */}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
