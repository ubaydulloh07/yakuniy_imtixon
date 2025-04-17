import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getLibraryDetail } from '../services/API';
import '../styles/libraryDetail.css';
import { FiMapPin, FiPhone, FiBook, FiMap } from 'react-icons/fi';
import { IoArrowBackSharp } from "react-icons/io5";
import { FiBookOpen, FiUser, FiLayers, FiPackage } from 'react-icons/fi';
import { Spin } from 'antd';



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
  if (!detail) return <Spin size="large" className="spin" />;

  const { library, books, total_books, phone, is_active } = detail;

  return (
    <div className="library-detail-container">

      <button onClick={() => window.history.back()} className='back-button'> <IoArrowBackSharp /> Orqaga</button>
      <div className="top-section">
        <div className="library-info-box">
          <h1 className="library-title">{state?.name}</h1>
          <p className="library-address">
            <FiMapPin className="detail-icon" /> {library?.address}
          </p>
          {phone && (
            <p className="library-phone">
              <FiPhone className="detail-icon" /> {phone}
            </p>
          )}
          <p className={`library-status ${is_active ? 'active' : 'inactive'}`}>
            Holati: {is_active ? 'Faol' : 'Faol emas'}
          </p>
          <p className="library-total">
            <FiBook className="detail-icon" /> Jami kitoblar: {total_books}
          </p>
        </div>

        {library?.address && (
          <div className="map-container">
            <p className="map-title">
              <FiMap className="detail-icon" /> Joylashuv:
            </p>
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(library.address)}&output=embed`}
              className='map-iframe'
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        )}
      </div>

      <div className="books-section">
  <h2 className="books-title">
 Kitoblar ro‘yxati
  </h2>
  {books.length > 0 ? (
    <div className="books-grid">
      {books.map((book: any) => (
        <div key={book.id} className="book-card">
          <img src={book.image || "https://prd-static-1.sf-cdn.com/resources/images/store/2015/global/640x400/Books/xbooks-640x400-20250314.jpg.pagespeed.ic.0_0jDnm6Ea.webp"}  alt={book.name} className="book-cover" />
          <h3 className="book-name">{book.name}</h3>
          <p className="book-author">
            <FiUser className="detail-books-icon" /> {book.author}
          </p>
          <p className="book-publisher">
            <FiLayers className="detail-books-icon-icon" /> {book.publisher}
          </p>
          <p className="book-quantity">
            <FiPackage className="detail-books-icon" /> Soni: {book.quantity_in_library}
          </p>

          <button onClick={() => window.location.href = `/books/${book.id}`} className="book-detail-button">Batafsil</button>
        </div>
      ))}
    </div>
  ) : (
    <p className="no-books">
      <FiBookOpen className="detail-books-icons" /> Kitoblar mavjud emas
    </p>
  )}

</div>
    </div>
  );
};

export default LibraryDetail;