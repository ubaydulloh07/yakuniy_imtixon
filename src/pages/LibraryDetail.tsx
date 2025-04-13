import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/libraryDetail.css';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  available: boolean;
  coverImage?: string;
  publishYear: number;
  category: string;
}

interface NewBook {
  title: string;
  author: string;
  isbn: string;
  publishYear: string;
  category: string;
  coverImage?: File;
}

const LibraryDetail: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBook, setNewBook] = useState<NewBook>({
    title: '',
    author: '',
    isbn: '',
    publishYear: '',
    category: '',
  });
  const [previewImage, setPreviewImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: "O'tkan kunlar",
      author: "Abdulla Qodiriy",
      isbn: "9789943289789",
      available: true,
      coverImage: "https://kitobxon.com/img_knigi/1857.jpg",
      publishYear: 1926,
      category: "Roman"
    },
    {
      id: 2,
      title: "Mehrobdan chayon",
      author: "Abdulla Qodiriy",
      isbn: "9789943289796",
      available: false,
      coverImage: "https://kitobxon.com/img_knigi/3497.jpg",
      publishYear: 1928,
      category: "Roman"
    },
    {
      id: 3,
      title: "Kecha va kunduz",
      author: "Cho'lpon",
      isbn: "9789943289802",
      available: true,
      coverImage: "https://kitobxon.com/img_knigi/2535.jpg",
      publishYear: 1936,
      category: "Roman"
    }
  ]);

  const booksPerPage = 6;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, Math.ceil(books.length / booksPerPage)));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewBook(prev => ({
        ...prev,
        coverImage: file
      }));
      
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!newBook.title || !newBook.author || !newBook.isbn || !newBook.publishYear || !newBook.category) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    const newBookData: Book = {
      id: books.length + 1,
      title: newBook.title,
      author: newBook.author,
      isbn: newBook.isbn,
      available: true,
      publishYear: parseInt(newBook.publishYear),
      category: newBook.category,
      coverImage: previewImage || "https://via.placeholder.com/300x400"
    };

    setBooks(prev => [...prev, newBookData]);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewBook({
      title: '',
      author: '',
      isbn: '',
      publishYear: '',
      category: ''
    });
    setPreviewImage('');
  };

  return (
    <div className="library-detail-page">
      <div className="navigation-header">
        <button 
          className="back-button"
          onClick={() => navigate('/libraries')}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Kutubxonalar ro'yxatiga qaytish
        </button>
      </div>

      <div className="library-header">
        <h1>Alisher Navoiy nomidagi O'zbekiston Milliy kutubxonasi</h1>
      </div>

      <div className="library-content">
        <div className="library-info-card">
          <div className="info-section">
            <h2>Kutubxona haqida</h2>
            <p>
              1870-yilda tashkil etilgan ushbu kutubxona O'zbekistonning eng qadimiy va boy kutubxonalaridan biri hisoblanadi. 
              Bu yerda 10 milliondan ortiq kitob, qo'lyozmalar va boshqa materiallar mavjud.
            </p>
          </div>

          <div className="stats-section">
            <div className="stat-card">
              <h3>Kitoblar</h3>
              <span>10M+</span>
            </div>
            <div className="stat-card">
              <h3>A'zolar</h3>
              <span>50K+</span>
            </div>
            <div className="stat-card">
              <h3>Xizmatlar</h3>
              <span>20+</span>
            </div>
          </div>
        </div>

        <div className="location-card">
          <h2>Manzil</h2>
          <div className="location-info">
            <div className="address-details">
              <p>
                <strong>Manzil:</strong> Toshkent shahri, Navoiy ko'chasi, 1-uy
              </p>
              <p>
                <strong>Ish vaqti:</strong> Dushanba - Shanba, 9:00 - 18:00
              </p>
              <p>
                <strong>Telefon:</strong> +998 71 232 83 89
              </p>
            </div>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.0336621612437!2d69.2786!3d41.3115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzQxLjQiTiA2OcKwMTYnNDMuMCJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="books-section">
          <div className="books-header">
            <h2>Mavjud kitoblar</h2>
            <button className="add-book-btn" onClick={() => setIsModalOpen(true)}>
              + Yangi kitob qo'shish
            </button>
          </div>
          <div className="books-grid">
            {currentBooks.map(book => (
              <div key={book.id} className="book-card">
                <div className="book-cover">
                  <img src={book.coverImage} alt={book.title} />
                  <span className={`status-badge ${book.available ? 'available' : 'unavailable'}`}>
                    {book.available ? 'Mavjud' : 'Band'}
                  </span>
                </div>
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p className="author">{book.author}</p>
                  <div className="book-details">
                    <span className="category">{book.category}</span>
                    <span className="year">{book.publishYear}</span>
                  </div>
                  <p className="isbn">ISBN: {book.isbn}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button 
              onClick={handlePrevPage} 
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              ← Oldingi
            </button>
            <span className="page-info">
              {currentPage} / {Math.ceil(books.length / booksPerPage)}
            </span>
            <button 
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(books.length / booksPerPage)}
              className="pagination-btn"
            >
              Keyingi →
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Yangi kitob qo'shish</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Kitob nomi</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newBook.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="author">Muallif</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={newBook.author}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="isbn">ISBN</label>
                <input
                  type="text"
                  id="isbn"
                  name="isbn"
                  value={newBook.isbn}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="publishYear">Nashr yili</label>
                <input
                  type="number"
                  id="publishYear"
                  name="publishYear"
                  value={newBook.publishYear}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Kategoriya</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={newBook.category}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="coverImage">Kitob rasmi</label>
                <div className="image-upload">
                  <input
                    type="file"
                    id="coverImage"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                  <button 
                    type="button" 
                    className="upload-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Rasm tanlash
                  </button>
                  {previewImage && (
                    <div className="image-preview">
                      <img src={previewImage} alt="Preview" />
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-buttons">
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                  Bekor qilish
                </button>
                <button type="submit" className="submit-btn">
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryDetail;
