
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { registerLibrary } from '../services/API';
import '../styles/register.css';

interface RegisterData {
  libraryName: string;
  adminName: string;
  password: string;
  phoneNumber: string;
  allowBookRentals: boolean;
  address: string;
  latitude: string;
  longitude: string;
  socialMedia: Array<{ platform: string; url: string }>;
}

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

const MapEvents = ({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [position, setPosition] = useState<[number, number]>([41.311081, 69.240562]);

  const [registerData, setRegisterData] = useState<RegisterData>({
    libraryName: '',
    adminName: '',
    password: '',
    phoneNumber: '',
    allowBookRentals: false,
    address: '',
    latitude: '',
    longitude: '',
    socialMedia: [{ platform: 'telegram', url: '' }]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSocialMediaChange = (index: number, field: 'platform' | 'url', value: string) => {
    setRegisterData((prev) => {
      const updated = [...prev.socialMedia];
      updated[index][field] = value;
      return { ...prev, socialMedia: updated };
    });
  };

  const addSocialMedia = () => {
    setRegisterData((prev) => ({
      ...prev,
      socialMedia: [...prev.socialMedia, { platform: '', url: '' }]
    }));
  };

  const removeSocialMedia = (index: number) => {
    setRegisterData((prev) => ({
      ...prev,
      socialMedia: prev.socialMedia.filter((_, i) => i !== index)
    }));
  };

  const handleLocationSelect = async (lat: number, lng: number) => {
    setPosition([lat, lng]);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=uz`, {
        headers: {
          'Accept-Language': 'uz',
          'User-Agent': 'SmartLibraryApp/1.0'
        }
      });
      const data = await res.json();
      setRegisterData((prev) => ({
        ...prev,
        address: data.display_name,
        latitude: lat.toString(),
        longitude: lng.toString()
      }));
    } catch (err) {
      console.error('Manzilni olishda xatolik:', err);
    }
  };

  const handleLocationSearch = async () => {
    if (!searchQuery) return;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&accept-language=uz`, {
        headers: {
          'Accept-Language': 'uz',
          'User-Agent': 'SmartLibraryApp/1.0'
        }
      });
      const data = await res.json();
      if (data[0]) {
        const { lat, lon, display_name } = data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
        setRegisterData((prev) => ({
          ...prev,
          address: display_name,
          latitude: lat,
          longitude: lon
        }));
      }
    } catch (err) {
      console.error('Qidirishda xatolik:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerLibrary({
        user: {
          name: registerData.adminName,
          phone: registerData.phoneNumber,
          password: registerData.password
        },
        library: {
          name: registerData.libraryName,
          address: registerData.address,
          latitude: registerData.latitude,
          longitude: registerData.longitude,
          can_rent_books: registerData.allowBookRentals,
          social_media: registerData.socialMedia.map(s => ({
            platform: s.platform,
            link: s.url
          }))
        }
      });

      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/login');
      }, 3000);
    } catch (error: any) {
      console.error('Ro‘yxatdan o‘tishda xatolik:', error);
      alert(error?.response?.data?.detail || 'Xatolik yuz berdi');
    }
  };

  return (
    <div className="register-page">
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Ro'yxatdan o'tish yakunlandi</h2>
            <p>Admin tasdiqlashini kuting...</p>
          </div>
        </div>
      )}

      <h1>Kutubxonachi ro'yxatdan o'tish</h1>
      <p className="subtitle">Kutubxona ma'lumotlarini to'ldiring</p>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Kutubxona ma'lumotlari</h2>
          <div className="form-group">
            <label htmlFor="libraryName">Kutubxona nomi</label>
            <input type="text" id="libraryName" name="libraryName" value={registerData.libraryName} onChange={handleInputChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="adminName">Admin ismi</label>
              <input type="text" id="adminName" name="adminName" value={registerData.adminName} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Telefon raqami</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" value={registerData.phoneNumber} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Parol</label>
            <input type="password" id="password" name="password" value={registerData.password} onChange={handleInputChange} required />
          </div>

          <div className="form-group checkbox">
            <input type="checkbox" id="allowBookRentals" name="allowBookRentals" checked={registerData.allowBookRentals} onChange={handleInputChange} />
            <label htmlFor="allowBookRentals">Kitob ijarasi</label>
          </div>
        </div>

        <div className="form-section">
          <h2>Manzil</h2>
          <div className="form-group">
            <div className="search-box">
              <input type="text" placeholder="Manzilni qidiring" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <button type="button" className="search-btn" onClick={handleLocationSearch}>
                Qidirish
              </button>
            </div>
          </div>

          <div className="map-container">
            <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={position} />
              <MapEvents onLocationSelect={handleLocationSelect} />
            </MapContainer>
          </div>

          <div className="location-details">
            <div className="form-group">
              <label>Tanlangan manzil:</label>
              <input type="text" value={registerData.address} readOnly className="readonly-input" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Latitude:</label>
                <input type="text" value={registerData.latitude} readOnly className="readonly-input" />
              </div>
              <div className="form-group">
                <label>Longitude:</label>
                <input type="text" value={registerData.longitude} readOnly className="readonly-input" />
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <h2>Ijtimoiy tarmoqlar</h2>
            <button type="button" className="add-platform-btn" onClick={addSocialMedia}>
              + Qo'shish
            </button>
          </div>

          {registerData.socialMedia.map((social, index) => (
            <div key={index} className="social-media-row">
              <div className="form-row">
                <div className="form-group">
                  <label>Platforma</label>
                  <input type="text" value={social.platform} onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)} placeholder="masalan: telegram" />
                </div>

                <div className="form-group">
                  <label>URL</label>
                  <input type="text" value={social.url} onChange={(e) => handleSocialMediaChange(index, 'url', e.target.value)} placeholder="masalan: t.me/username" />
                </div>

                {index > 0 && (
                  <button type="button" className="remove-btn" onClick={() => removeSocialMedia(index)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate('/login')}>
            Bekor qilish
          </button>
          <button type="submit" className="submit-btn">
            Ro'yxatdan o'tish
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
