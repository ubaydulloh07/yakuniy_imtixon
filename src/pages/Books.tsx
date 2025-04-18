

import { useEffect, useState } from 'react';
import { getAllBooks } from '../services/API';
import { Bookpage } from '../types/type';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/Books.css';

const BooksPage = () => {
  const [books, setBooks] = useState<Bookpage[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Bookpage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
        setFilteredBooks(data);
        setLoading(false);
      } catch (error) {
        console.error('Kitoblarni olishda xatolik:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1); // Qidiruvda har doim 1-sahifadan boshlansin

    const filtered = books.filter(
      (book) =>
        book.name.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.publisher.toLowerCase().includes(term)
    );
    setFilteredBooks(filtered);
  };

  // Pagination uchun sahifadagi elementlar
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="books-page">
      <h1>Barcha kitoblar</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Kitob, muallif yoki nashriyot bo‘yicha qidirish..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="books-page-grid">
        {loading ? (
          [...Array(6)].map((_, index) => (
            <div key={index} className="book-page-card">
              <Skeleton height={200} width="100%" />
              <Skeleton count={1} width="80%" />
              <Skeleton count={1} width="60%" />
              <Skeleton count={1} width="50%" />
              <Skeleton count={1} width="40%" />
            </div>
          ))
        ) : currentBooks.length === 0 ? (
          <p>Kitob topilmadi</p>
        ) : (
          currentBooks.map((book) => (
            <div key={book.id} className="book-page-card">
              <img
                src="https://prd-static-1.sf-cdn.com/resources/images/store/2015/global/640x400/Books/xbooks-640x400-20250314.jpg.pagespeed.ic.0_0jDnm6Ea.webp"
                alt={book.name}
              />
              <h2>{book.name}</h2>
              <p><strong>Muallif:</strong> {book.author}</p>
              <p><strong>Nashriyot:</strong> {book.publisher}</p>
              <p><strong>Soni:</strong> {book.quantity_in_library}</p>
              <button onClick={() => navigate(`/books/${book.id}`)}>Batafsil</button>
            </div>
          ))
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? 'active' : ''}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
