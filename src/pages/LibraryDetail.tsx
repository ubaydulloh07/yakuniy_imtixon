import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  available: boolean;
}

const LibraryDetail: React.FC = () => {
  // const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  // Mock data for books
  const books: Book[] = [
    { id: 1, title: "O'tgan kunlar", author: "Abdulla Qodiriy", isbn: "978-1-234567-89-0", available: true },
    { id: 2, title: "Mehrobdan chayon", author: "Abdulla Qahhor", isbn: "978-1-234567-89-1", available: false },
    // Add more mock books here
  ];

  // Calculate pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div className="library-detail-page">
      <div className="library-info">
        <h1>Kutubxona tafsilotlari</h1>
        
        <div className="library-description">
          <h2>Kutubxona haqida</h2>
          <p>
            Bu kutubxona 1995-yilda tashkil etilgan bo'lib, shahrimizning eng yirik kutubxonalaridan biri hisoblanadi.
            Kutubxonada 100 000 dan ortiq kitoblar mavjud bo'lib, har yili yangi nashrlar bilan boyitiladi.
          </p>
        </div>

        <div className="library-location">
          <h2>Manzil</h2>
          <p>Toshkent shahri, Yunusobod tumani, Navoiy ko'chasi, 45-uy</p>
          <div className="map-container">
            {/* Google Maps yoki boshqa xarita xizmati uchun joy */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.254715819424!2d69.2793743154256!3d41.3152199792706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc1e8c7d5%3A0x4c2a8f5f5f5f5f5f!2sNavoiy%20ko'chasi%2C%20Toshkent!5e0!3m2!1suz!2s!4v1620000000000!5m2!1suz!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="library-books">
          <h2>Kitoblar ro'yxati</h2>
          <div className="books-table">
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Kitob nomi</th>
                  <th>Muallif</th>
                  <th>ISBN</th>
                  <th>Holati</th>
                </tr>
              </thead>
              <tbody>
                {currentBooks.map((book, index) => (
                  <tr key={book.id}>
                    <td>{indexOfFirstBook + index + 1}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.isbn}</td>
                    <td>
                      <span className={`status ${book.available ? 'available' : 'unavailable'}`}>
                        {book.available ? 'Mavjud' : 'Mavjud emas'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Oldingi
            </button>
            <span>
              Sahifa {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Keyingi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryDetail; 