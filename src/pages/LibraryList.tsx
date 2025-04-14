import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMapPin, FiBook, FiClock, FiStar } from 'react-icons/fi';
import '../styles/libraryList.css';

interface Library {
  id: number;
  name: string;
  location: string;
  bookCount: number;
  rating: number;
  workingHours: string;
  image: string;
}

const DUMMY_LIBRARIES: Library[] = [
  {
    id: 1,
    name: "Alisher Navoiy nomidagi kutubxona",
    location: "Toshkent shahri, Navoiy ko'chasi, 32-uy",
    bookCount: 50000,
    rating: 4.8,
    workingHours: "09:00 - 18:00",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "Bobur nomidagi viloyat kutubxonasi",
    location: "Andijon shahri, Bobur shoh ko'chasi, 15-uy",
    bookCount: 35000,
    rating: 4.5,
    workingHours: "09:00 - 20:00",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Ulug'bek nomidagi ilmiy kutubxona",
    location: "Samarqand shahri, Registon ko'chasi, 1-uy",
    bookCount: 45000,
    rating: 4.9,
    workingHours: "08:00 - 19:00",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3"
  }
];

const LibraryList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [libraries] = useState<Library[]>(DUMMY_LIBRARIES);

  const filteredLibraries = libraries.filter(library =>
    library.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    library.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="library-list-container">
      <div className="library-list-header">
        <h1>Kutubxonalar</h1>
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Kutubxona nomi yoki manzili bo'yicha qidiring..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="libraries-grid">
        {filteredLibraries.map(library => (
          <Link to={`/library/${library.id}`} key={library.id} className="library-card">
            <div className="library-image">
              <img src={library.image} alt={library.name} />
            </div>
            <div className="library-info">
              <h2>{library.name}</h2>
              <div className="library-details">
                <p className="location">
                  <FiMapPin /> {library.location}
                </p>
                <p className="book-count">
                  <FiBook /> {library.bookCount.toLocaleString()} ta kitob
                </p>
                <p className="working-hours">
                  <FiClock /> {library.workingHours}
                </p>
                <p className="rating">
                  <FiStar /> {library.rating}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LibraryList; 