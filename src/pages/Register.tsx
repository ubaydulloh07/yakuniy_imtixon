import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import '../styles/register.css';

interface UserAndLibrary {
  user: {
    password: string;
    name: string;
    phone: string;
  };
  library: {
    address: string;
    social_media?: {
      website?: string;
      facebook?: string;
      instagram?: string;
      telegram?: string;
    };
    can_rent_books: boolean;
    latitude?: string;
    longitude?: string;
  };
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserAndLibrary>({
    user: {
      name: '',
      phone: '',
      password: ''
    },
    library: {
      address: '',
      social_media: {},
      can_rent_books: false,
      latitude: '',
      longitude: ''
    }
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        [name]: value
      }
    }));
  };

  const handleLibraryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '');
      setFormData(prev => ({
        ...prev,
        library: {
          ...prev.library,
          social_media: {
            ...prev.library.social_media,
            [socialKey]: value || undefined
          }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        library: {
          ...prev.library,
          [name]: type === 'checkbox' ? checked : value
        }
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validatsiya
    if (formData.user.password !== confirmPassword) {
      setError('Parollar mos kelmadi');
      return;
    }

    if (formData.user.password.length < 1 || formData.user.password.length > 128) {
      setError('Parol uzunligi 1 dan 128 gacha bo\'lishi kerak');
      return;
    }

    if (formData.user.name.length > 50) {
      setError('Ism 50 ta belgidan oshmasligi kerak');
      return;
    }

    const phoneRegex = /^\+?[0-9]{9,14}$/;
    if (!phoneRegex.test(formData.user.phone)) {
      setError('Telefon raqami noto\'g\'ri formatda');
      return;
    }

    try {
      await authAPI.registerLibrary(formData);
      setSuccess('Ro\'yxatdan o\'tish muvaffaqiyatli yakunlandi. Admin tasdiqlashini kuting.');
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ro\'yxatdan o\'tishda xatolik yuz berdi');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Kutubxonachi sifatida ro'yxatdan o'tish</h1>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-section">
            <h2>Shaxsiy ma'lumotlar</h2>
            <div className="form-group">
              <label htmlFor="name">To'liq ism</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.user.name}
                onChange={handleUserInputChange}
                required
                maxLength={50}
                placeholder="To'liq ismingizni kiriting"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefon raqam</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.user.phone}
                onChange={handleUserInputChange}
                required
                pattern="^\+?[0-9]{9,14}$"
                placeholder="+998901234567"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Parol</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.user.password}
                onChange={handleUserInputChange}
                required
                maxLength={128}
                placeholder="Parolni kiriting"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Parolni tasdiqlang</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Parolni qayta kiriting"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Kutubxona ma'lumotlari</h2>
            <div className="form-group">
              <label htmlFor="address">Manzil</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.library.address}
                onChange={handleLibraryInputChange}
                required
                minLength={1}
                placeholder="Kutubxona manzilini kiriting"
              />
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="can_rent_books"
                  checked={formData.library.can_rent_books}
                  onChange={handleLibraryInputChange}
                />
                Kitoblarni ijaraga berish imkoniyati
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="text"
                id="latitude"
                name="latitude"
                value={formData.library.latitude}
                onChange={handleLibraryInputChange}
                placeholder="41.123456"
              />
            </div>

            <div className="form-group">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="text"
                id="longitude"
                name="longitude"
                value={formData.library.longitude}
                onChange={handleLibraryInputChange}
                placeholder="69.123456"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Ijtimoiy tarmoqlar (ixtiyoriy)</h2>
            <div className="form-group">
              <label htmlFor="social_website">Vebsayt</label>
              <input
                type="url"
                id="social_website"
                name="social_website"
                value={formData.library.social_media?.website || ''}
                onChange={handleLibraryInputChange}
                placeholder="https://example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="social_facebook">Facebook</label>
              <input
                type="url"
                id="social_facebook"
                name="social_facebook"
                value={formData.library.social_media?.facebook || ''}
                onChange={handleLibraryInputChange}
                placeholder="https://facebook.com/username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="social_instagram">Instagram</label>
              <input
                type="url"
                id="social_instagram"
                name="social_instagram"
                value={formData.library.social_media?.instagram || ''}
                onChange={handleLibraryInputChange}
                placeholder="https://instagram.com/username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="social_telegram">Telegram</label>
              <input
                type="url"
                id="social_telegram"
                name="social_telegram"
                value={formData.library.social_media?.telegram || ''}
                onChange={handleLibraryInputChange}
                placeholder="https://t.me/username"
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            Ro'yxatdan o'tish
          </button>
        </form>

        <div className="login-link">
          <p>Akkauntingiz bormi? <a href="/login">Kirish</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register; 