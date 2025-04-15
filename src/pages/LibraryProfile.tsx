import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { getProfile } from '../services/API';
import '../styles/libraryProfile.css';

interface Library {
  name: string;
  address: string;
  allowBookRentals: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
  socialMedia: Array<{
    platform: string;
    link: string;
  }>;
}

interface LibraryProfile {
  name: string;
  phoneNumber: string;
  library: Library;
  isActive: boolean;
}

// Leaflet marker ikonkasini sozlash
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

const LibraryProfile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Ma'lumotlar yuklanmoqda...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <p>{error || 'Ma\'lumotlar topilmadi'}</p>
      </div>
    );
  }

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'telegram':
        return '📱';
      case 'instagram':
        return '📸';
      case 'facebook':
        return '👥';
      default:
        return '🌐';
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="status-badge" data-active={profile.is_active}>
          {profile.is_active ? 'Faol' : 'Faol emas'}
        </div>
        <h1>{profile.library.name}</h1>
        <p className="subtitle">Kutubxona ma'lumotlari</p>
      </div>

      <div className="profile-content">
        <div className="info-section">
          <div className="info-card">
            <h2>Asosiy ma'lumotlar</h2>
            <div className="info-item">
              <span className="label">Admin:</span>
              <span className="value">{profile.name}</span>
            </div>
            <div className="info-item">
              <span className="label">Telefon:</span>
              <span className="value">{profile.phone}</span>
            </div>
            <div className="info-item">
              <span className="label">Kitob ijarasi:</span>
              <span className="value rental-status" data-allows-rental={profile.library.can_rent_books}>
                {profile.library.can_rent_books ? 'Mavjud' : 'Mavjud emas'}
              </span>
            </div>
          </div>

          <div className="info-card">
            <h2>Manzil</h2>
            <p className="address">{profile.library.address}</p>
            <div className="map-container">
              <MapContainer
                center={[parseFloat(profile.library.latitude), parseFloat(profile.library.longitude)]}
                zoom={15}
                style={{ height: '300px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[parseFloat(profile.library.latitude), parseFloat(profile.library.longitude)]} />
              </MapContainer>
            </div>
          </div>

          {profile.library.social_media.length > 0 && (
            <div className="info-card">
              <h2>Ijtimoiy tarmoqlar</h2>
              <div className="social-links">
                {profile.library.social_media.map((social: any) => (
                  <a
                    key={social.id}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <span className="social-icon">{getSocialIcon(social.platform)}</span>
                    <span className="platform-name">{social.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryProfile; 