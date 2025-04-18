import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoBookOutline } from "react-icons/io5";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/login.css';
import { login } from '../services/API';

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; 
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login({ phone, password });
      
     
      localStorage.setItem('token', response.access);
      localStorage.setItem('user', JSON.stringify(response.user));

      
      setIsLoggedIn(true);

     
      toast.success('Muvaffaqiyatli tizimga kirdingiz!', {
        onClose: () => {
          navigate('/profile');
        }
      });
    } catch (err) {
      if (err instanceof Error) {
     
        toast.error('Login yoki prol notogri ');
      } else {
        toast.error("Login yoki parol notogri ");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="toast"
      />
      <div className="login-box">
        <div className="login-logo">
          <IoBookOutline />
          <h2>EZMA</h2>
        </div>
        <h1>Kutubxonaga kirish</h1>
        
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
            {loading ? "Kirish..." : "Kirish"}
          </button>
        </form>
        
        <Link to="/librarian/register" className="signup-link">
          Ro'yxatdan o'tish
        </Link>
      </div>
    </div>
  );
};

export default Login;
