import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMapPin, FiBook, FiAlertCircle } from 'react-icons/fi';
import '../styles/libraryList.css';
import { getLibraries } from '../services/API';
import { motion } from 'framer-motion';
import { Skeleton } from 'antd';

interface Library {
  id: number;
  name: string;
  image: string | null;
  address: string;
  total_books: number;
  is_active: boolean;
}

const LibraryList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visibleCount, setVisibleCount] = useState(6); // ✅

  useEffect(() => {
    setLoading(true);
    setError('');

    const fetchData = async () => {
      try {
        const data = await getLibraries();
        setLibraries(data);
      } catch (err) {
        setError("Kutubxonalarni yuklashda xatolik yuz berdi.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredLibraries = libraries.filter(library =>
    library.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    library.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleLibraries = filteredLibraries.slice(0, visibleCount); 

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="library-list-container">
      <div className="library-list-header">
        <h1>Kutubxonalar</h1>
        <div className="search-box">
          <FiSearch className="search-icon-k" />
          <input
            type="text"
            placeholder="Qidirish..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setVisibleCount(6); 
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="libraries-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="library-card" key={i}>
              <Skeleton.Image active style={{ width: '100%', height: 200 }} />
              <Skeleton active paragraph={{ rows: 2 }} />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="error-message">
          <FiAlertCircle /> {error}
        </div>
      ) : (
        <>
          <div className="libraries-grid">
            {visibleLibraries.map(library => (
              <motion.div
                key={library.id}
                className="library-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`/library/${library.id}`} state={{ name: library.name }}>
                  <div className="library-image">
                    <img src={library.image || "https://i.pinimg.com/736x/c5/98/59/c59859449c63060efc95ccd7c6314a4a.jpg"} alt={library.name} />
                  </div>
                  <div className="library-info">
                    <h2>{library.name}</h2>
                    <p><FiMapPin /> {library.address}</p>
                    <p><FiBook /> {library.total_books} ta kitob</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {visibleCount < filteredLibraries.length && (
            <div className="load-more-container">
              <button onClick={handleLoadMore} className="load-more-btn">
                Ko‘proq ko‘rsatish
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};



export default LibraryList;
