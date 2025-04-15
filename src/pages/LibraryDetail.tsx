import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getLibraryDetail } from '../services/API';
import '../styles/libraryDetail.css';

const LibraryDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [detail, setDetail] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getLibraryDetail(id)
        .then(res => setDetail(res))
        .catch(() => {
          setError("Ma'lumotlarni olishda xatolik yuz berdi.");
        });
    }
  }, [id]);

  if (error) return <h1 className="error-message">{error}</h1>;
  if (!detail) return <h1 className="loading-message">Yuklanmoqda...</h1>;

  const { library, books, total_books, phone, is_active } = detail;

  return (
    <div className="library-detail-container">
      <div className="library-info-box">
        <h1 className="library-title">{state?.name}</h1>
        <p className="library-address">📍 {library?.address}</p>
        {phone && <p className="library-phone">📞 {phone}</p>}
        <p className={`library-status ${is_active ? 'active' : 'inactive'}`}>
          Holati: {is_active ? 'Faol' : 'Faol emas'}
        </p>
        <p className="library-total">📚 Jami kitoblar: {total_books}</p>
        {library?.google_maps_url && (
          <a
            href={library.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="library-map-link"
          >
            📌 Google Maps orqali ko‘rish
          </a>
        )}
      </div>

      <div className="books-section">
        <h2 className="books-title">📖 Kitoblar ro‘yxati</h2>
        {books.length > 0 ? (
          <div className="books-grid">
            {books.map((book: any) => (
              <div key={book.id} className="book-card">
                <h3 className="book-name">{book.name}</h3>
                <p className="book-author">✍️ {book.author}</p>
                <p className="book-publisher">🏢 {book.publisher}</p>
                <p className="book-quantity">📦 Soni: {book.quantity_in_library}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-books">📭 Kitoblar mavjud emas</p>
        )}
      </div>
    </div>
  );
};

export default LibraryDetail;
