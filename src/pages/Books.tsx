import { useEffect, useState } from 'react';
import { getAllBooks } from '../services/API';
import { Bookpage } from '../types/type';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/Books.css';

const BooksPage = () => {
  const [books, setBooks] = useState<Bookpage[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading holatini saqlash
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
        setLoading(false); // Kitoblar olinganidan keyin loadingni o'chirish
      } catch (error) {
        console.error('Kitoblarni olishda xatolik:', error);
        setLoading(false); // Xatolik yuz berishi holatida ham loadingni o'chirish
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="books-page">
      <h1>Barcha kitoblar</h1>
      <div className="books-page-grid">
        {loading ? (
          // Skeleton loading uchun
          [...Array(6)].map((_, index) => (
            <div key={index} className="book-page-card">
              <Skeleton height={200} width="100%" />
              <Skeleton count={1} width="80%" />
              <Skeleton count={1} width="60%" />
              <Skeleton count={1} width="50%" />
              <Skeleton count={1} width="40%" />
            </div>
          ))
        ) : (
          books.map((book) => (
            <div key={book.id} className="book-page-card">
              <img src="https://prd-static-1.sf-cdn.com/resources/images/store/2015/global/640x400/Books/xbooks-640x400-20250314.jpg.pagespeed.ic.0_0jDnm6Ea.webp" alt={book.name} />
              <h2>{book.name}</h2>
              <p><strong>Muallif:</strong> {book.author}</p>
              <p><strong>Nashriyot:</strong> {book.publisher}</p>
              <p><strong>Soni:</strong> {book.quantity_in_library}</p>
              <button onClick={() => navigate(`/books/${book.id}`)}>Batafsil</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BooksPage;
