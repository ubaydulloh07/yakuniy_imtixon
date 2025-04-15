import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoBookOutline } from "react-icons/io5";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import '../styles/login.css';
import { login } from '../services/API';

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // setIsLoggedIn ni props sifatida olish
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await login({ phone, password });
      
      // Tokenni saqlash
      localStorage.setItem('token', response.access);
      localStorage.setItem('user', JSON.stringify(response.user));

      // setIsLoggedIn ni chaqirish
      setIsLoggedIn(true);

      // Muvaffaqiyatli login bo'lganda profil sahifasiga yo'naltirish
      navigate('/profile');
    } catch (err) {
      if (err instanceof Error) {
        // API dan kelgan xatoni ko'rsatish
        setError(err.message || "Login paytida xatolik yuz berdi");
      } else {
        setError("Tizimda xatolik yuz berdi. Iltimos qaytadan urinib ko'ring");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <IoBookOutline />
          <h2>EZMA</h2>
        </div>
        <h1>Library Login</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
          >
            {loading ? "Kirish..." : "Log In"}
          </button>
        </form>
        
        <Link to="/librarian/register" className="signup-link">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
