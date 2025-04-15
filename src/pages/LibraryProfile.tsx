import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { getProfile } from '../services/API';
import '../styles/libraryProfile.css';

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
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

  if (loading) return <div className="loading">Yuklanmoqda...</div>;
  if (error || !profile) return <div className="error">{error || "Ma'lumotlar topilmadi"}</div>;

  return (
    <div className="library-profile">
      <h1>Kutubxona Profili</h1>

      <div className="profile-info">
        <p><strong>ID:</strong> {profile.id}</p>
        <p><strong>Manzil:</strong> {profile.address}</p>
        <p><strong>Kitob ijarasi:</strong> {profile.can_rent_books ? 'Mavjud' : 'Mavjud emas'}</p>
        <p><strong>User ID:</strong> {profile.user}</p>
        {profile.image && (
          <div className="profile-img">
            <img src={profile.image} alt="Kutubxona rasmi" />
          </div>
        )}
      </div>

      {profile.latitude && profile.longitude && (
        <div className="map">
          <MapContainer
            center={[parseFloat(profile.latitude), parseFloat(profile.longitude)]}
            zoom={15}
            style={{ height: '300px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            <Marker position={[parseFloat(profile.latitude), parseFloat(profile.longitude)]} />
          </MapContainer>
        </div>
      )}

{profile.social_media && profile.social_media.telegram && (
  <div className="social-media">
    <h2>Ijtimoiy tarmoqlar</h2>
    <ul>
      <li>
        <a
          href={`https://${profile.social_media.telegram}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          📱 Telegram: {profile.social_media.telegram}
        </a>
      </li>
    </ul>
  </div>
)}
    </div>
  );
};

export default LibraryProfile;
