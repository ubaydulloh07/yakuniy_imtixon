import React from 'react';
import '../styles/libraryList.css';

interface Library {
  id: number;
  name: string;
  address: string;
  image: string;
  totalBooks: number;
}

const libraries: Library[] = [
  {
    id: 1,
    name: "O'zbekiston Milliy Kutubxonasi",
    address: "Toshkent shahri, Navoiy ko'chasi, 1-uy",
    image: "https://via.placeholder.com/300x200",
    totalBooks: 15000
  },
  {
    id: 2,
    name: "Alisher Navoiy nomidagi kutubxona",
    address: "Toshkent shahri, Amir Temur ko'chasi, 5-uy",
    image: "https://via.placeholder.com/300x200",
    totalBooks: 12000
  },
  {
    id: 3,
    name: "Yoshlar kutubxonasi",
    address: "Toshkent shahri, Bunyodkor ko'chasi, 12-uy",
    image: "https://via.placeholder.com/300x200",
    totalBooks: 8000
  }
];

const LibraryList: React.FC = () => {
  return (
    <div className="library-list-page">
      <h1>Kutubxonalar ro'yxati</h1>
      <div className="library-grid">
        {libraries.map((library) => (
          <div key={library.id} className="library-card">
            <div className="library-image">
              <img src={library.image} alt={library.name} />
            </div>
            <div className="library-info">
              <h2>{library.name}</h2>
              <p className="address">
                <span className="icon">📍</span>
                {library.address}
              </p>
              <p className="book-count">
                <span className="icon">📚</span>
                Jami kitoblar: {library.totalBooks}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryList; 