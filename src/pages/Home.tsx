import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaBookOpen, FaClock, FaMobileAlt } from 'react-icons/fa';
import '../styles/home.css';

const popularBooks = [
  {
    id: 1,
    title: "O'tkan kunlar",
    author: "Abdulla Qodiriy",
    image: "https://kitobxon.com/img_knigi/1447.jpg",
    available: true
  },
  {
    id: 2,
    title: "Sariq devni minib",
    author: "Xudoyberdi To'xtaboyev",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8l4XhyV2El8Z9M4u7hjmx8t9oJW0CKew48g&s",
    available: true
  },
  {
    id: 3,
    title: "Ikki eshik orasi",
    author: "O'tkir Hoshimov",
    image: "https://backend.book.uz/user-api/img/img-file-f94aa12ba267f24b219252b42b3ff461.jpg",
    available: false
  },
  {
    id: 4,
    title: "Yulduzli tunlar",
    author: "Pirimqul Qodirov",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Sg2Z8Z9liylJovVE-A_QQoPfvbr-5izGOg&s  ",
    available: true
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Kutubxonalar tizimiga xush kelibsiz</h1>
          <p>Kitoblarni qidiring, bron qiling va o'qishdan bahramand bo'ling</p>
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by book title or author..."
                  className="search-input"
                />
              </div>
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="why-us">
        <h2>Nega bizning tizimdan foydalanish kerak?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaSearch />
            </div>
            <h3>Tezkor qidiruv</h3>
            <p>
              Barcha kutubxonalardagi kitoblarni bir joydan qidiring. 
              Kitob nomi, muallif yoki mavzu bo'yicha izlash imkoniyati. 
              Real vaqt rejimida natijalarni ko'rish. 
              Kitobning qaysi kutubxonada borligini aniqlash.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaBookOpen />
            </div>
            <h3>Keng tanlash imkoniyati</h3>
            <p>
              Minglab kitoblar orasidan o'zingizga mosini toping. 
              Turli janrdagi adabiyotlar mavjud. 
              Yangi nashrlar muntazam qo'shib boriladi. 
              O'zbek va jahon adabiyotining eng sara asarlari.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaClock />
            </div>
            <h3>Vaqtni tejash</h3>
            <p>
              Online bron qilish orqali vaqtingizni tejang. 
              Navbatsiz kitob olish imkoniyati. 
              Kitobni oldindan band qilish mumkin. 
              Bron qilish muddatini o'zingiz tanlang.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaMobileAlt />
            </div>
            <h3>Qulay interfeys</h3>
            <p>
              Zamonaviy va qulay foydalanuvchi interfeysi. 
              Mobil qurilmalarga moslashgan dizayn. 
              Tushunarli va sodda menyu tizimi. 
              Tezkor va sifatli ishlash.
            </p>
          </div>
        </div>
      </section>

      <section className="popular-books">
        <h2>Eng ko'p qidirilgan kitoblar</h2>
        <div className="books-grid">
          {popularBooks.map(book => (
            <div key={book.id} className="book-card">
              <div className="book-image">
                <img src={book.image} alt={book.title} />
                <div className="book-status">
                  {book.available ? 
                    <span className="available">Mavjud</span> : 
                    <span className="unavailable">Band</span>
                  }
                </div>
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <button className="book-details-btn">
                  Batafsil
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home; 