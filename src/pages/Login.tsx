import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoBookOutline } from "react-icons/io5";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import '../styles/login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <h2>EZMA</h2>
          <IoBookOutline />
        </div>
        <h1>Kutubxonaga kirish</h1>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <input 
          className='login-input'
            type="number"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          
          <button type="submit">Kirish</button>
        </form>
        <Link to="/librarian/register" className="signup-link">
          Register
        </Link>
        
      </div>
    </div>
  );
};

export default Login; 