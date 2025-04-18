
import { useState, useEffect } from 'react';
import { FaSearch , 
  FaBookOpen,
  FaClock,
  FaMobileAlt,
  FaLock,
  FaUserGraduate, } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../styles/home.css';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { searchBooks, getLibraries } from '../services/API';
import { Book, Library } from '../types/type';


const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        const data = await getLibraries();
        setLibraries(data);
      } catch (error) {
        console.error("Kutubxonalarni olishda xatolik:", error);
      }
    };

    fetchLibraries();
  }, []);

  // Debounce qidiruvni amalga oshiruvchi funksiya
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim() === '') {
        setBooks([]);
        setNoResults(false); // Qidiruv bo'sh bo'lsa, natijalarni tozalash
        return;
      }

      const fetchBooks = async () => {
        setLoading(true);
        setNoResults(false); // Qidiruvni boshlaganda "Natija yo'q" holatini tozalash

        try {
          const results = await searchBooks(searchQuery);
          setBooks(results);

          if (results.length === 0) {
            setNoResults(true);
          }
        } catch (error) {
          console.error("Qidiruvda xatolik:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBooks();
    }, 500); // 500ms kutish vaqti

    return () => {
      clearTimeout(debounceTimer); // Har safar yangi yozilish sodir bo'lsa, avvalgi so'rovni to'xtatish
    };
  }, [searchQuery]); // `searchQuery` o'zgarganda bu kod qayta ishlaydi

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Kutubxonalar tizimiga xush kelibsiz</h1>
          <p>Kitoblarni qidiring, bron qiling va o'qishdan bahramand bo'ling</p>
          <div className="search-container">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="search-form"
            >
              <div className="search-input-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  placeholder="Kitob nomi yoki muallif bo'yicha qidiring..."
                  className="search-input"
                />
              </div>
            </form>

            {searchQuery && (
              <div className="search-results-inline">
                {loading ? (
                  <Spin size="small" />
                ) : noResults ? (
                  <div className="no-results-inline">
                    Hech qanday natija topilmadi
                  </div>
                ) : (
                  books.map((book) => (
                    <div key={book.id} className="inline-result">
                      <div className="inline-result-info">
                        <strong>{book.name}</strong>
                        <strong>{book.author}</strong>
                      </div>
                      <button onClick={() => navigate(`/books/${book.id}`)} className="inline-detail-btn">
                        Batafsil
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="why-us">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Nega bizning tizimdan foydalanish kerak?
        </motion.h2>
        <div className="features-grid">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="feature-card"
              initial={{ opacity: 0, x: i < 2 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <div className="feature-icon">
                {i === 0 && <FaSearch />}
                {i === 1 && <FaBookOpen />}
                {i === 2 && <FaClock />}
                {i === 3 && <FaMobileAlt />}
                {i === 4 && <FaLock />}
                {i === 5 && <FaUserGraduate />}
              </div>
              <h3>
                {i === 0 && 'Tezkor qidiruv'}
                {i === 1 && 'Keng tanlash imkoniyati'}
                {i === 2 && 'Vaqtni tejash'}
                {i === 3 && 'Qulay interfeys'}
                {i === 4 && 'Xavfsiz tizim'}
                {i === 5 && 'O‘quvchilar uchun mos'}
              </h3>
              <p>
                {i === 0 && 'Barcha kutubxonalardagi kitoblarni bir joydan qidiring.'}
                {i === 1 && 'Turli janrdagi adabiyotlar, yangi nashrlar mavjud.'}
                {i === 2 && 'Online bron qilish orqali navbatsiz xizmatdan foydalaning.'}
                {i === 3 && 'Mobil qurilmalarga moslashgan va tushunarli dizayn.'}
                {i === 4 && 'Foydalanuvchilarning ma’lumotlari xavfsiz saqlanadi.'}
                {i === 5 && 'Maktab va oliygoh talabalariga qulay platforma.'}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="libraries-preview">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Kutubxonalar
        </motion.h2>
        <div className="libraries-grid">
          {libraries.slice(0, 3).map((lib) => (
            <motion.div
              key={lib.id}
              className="library-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="ee">
                <img src="https://prd-static-1.sf-cdn.com/resources/images/store/2015/global/640x400/Books/xbooks-640x400-20250314.jpg.pagespeed.ic.0_0jDnm6Ea.webp" alt={lib.name} />
                <div className="library-card-info">
                  <h3>{lib.name}</h3>
                  <p>Manzil: {lib.address}</p>
                  <p>Kitoblar soni: {lib.total_books}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="see-more-container">
          <button className="see-more-btn" onClick={() => navigate('/libraries')}>
            Ko‘proq ko‘rish
          </button>
        </div>
      </section>

   
    </div>
  );
};

export default Home;
