import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';
import '../styles/libraryList.css';

const libraries = [
  {
    id: 1,
    name: "Alisher Navoiy nomidagi O'zbekiston Milliy kutubxonasi",
    address: "Mustaqillik maydoni, 5, Toshkent",
    phone: "+998 71 239 41 42",
    workingHours: "Dushanba-Shanba: 9:00-20:00",
    image: "./library.png"
  },
  {
    id: 2,
    name: "Abu Ali ibn Sino nomidagi kutubxona",
    address: "Navoiy ko'chasi, 45, Buxoro",
    phone: "+998 65 223 14 55",
    workingHours: "Dushanba-Shanba: 9:00-18:00",
    image: "./library.png"
  },
  {
    id: 3,
    name: "Mirzo Ulug'bek nomidagi kutubxona",
    address: "Universitet ko'chasi, 4, Samarqand",
    phone: "+998 66 233 17 62",
    workingHours: "Dushanba-Shanba: 8:00-19:00",
    image: "./library.png"
  }
];

const LibraryList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="library-list">
      <h1>Kutubxonalar ro'yxati</h1>
      <div className="libraries-grid">
        {libraries.map(library => (
          <div key={library.id} className="library-card">
            <div className="library-image">
              <img src={library.image} alt={library.name} />
            </div>
            <div className="library-info">
              <h2>{library.name}</h2>
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <span>{library.address}</span>
              </div>
              <div className="info-item">
                <FaPhone className="info-icon" />
                <span>{library.phone}</span>
              </div>
              <div className="info-item">
                <FaClock className="info-icon" />
                <span>{library.workingHours}</span>
              </div>
              <button 
                className="details-btn"
                onClick={() => navigate(`/library/${library.id}`)}
              >
                Batafsil ma'lumot
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryList; 