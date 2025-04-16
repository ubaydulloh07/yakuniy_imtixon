
import { useState , useEffect } from 'react';
import { FaSearch, FaBookOpen, FaClock, FaMobileAlt, FaLock, FaUserGraduate, FaGlobe, FaHandsHelping, FaHistory } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../styles/home.css';
import { Spin } from 'antd';

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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Sg2Z8Z9liylJovVE-A_QQoPfvbr-5izGOg&s",
    available: true
  }
];



const Home: React.FC = () => {
  // const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<any[]>([]); // Kitoblarni saqlash
 

  // API so'rovini yuborish
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLoading(true);
      try {
        // APIga so'rov yuborish
        const response = await fetch(`https://s-libraries.uz/api/v1/books/books/?q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        
        // Kitoblar ro'yxatini yangilash
        setBooks(data);
      } catch (error) {
        console.error('Xatolik:', error);
      } finally {
        setLoading(false);
      }
    }
  };


  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Spin size="large" className='spin' />;


  

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
                  placeholder="Kitob nomi yoki muallif bo'yicha qidiring..."
                  className="search-input"
                />
              </div>
              <button type="submit" className="search-button">
                Qidirish
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Qidirilgan kitoblar */}
      {searchQuery && (
        <section className="search-results">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Qidiruv natijalari
          </motion.h2>
          <div className="books-grid">
            {loading ? (
              <Spin size="large" className="spin" />
            ) : books.length > 0 ? (
              books.map((book) => (
                <motion.div
                  key={book.id}
                  className="book-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="book-image">
                    <img src={book.image || "https://via.placeholder.com/150"} alt={book.title} />
                    <div className="book-status">
                      {book.available ? (
                        <span className="available">Mavjud</span>
                      ) : (
                        <span className="unavailable">Band</span>
                      )}
                    </div>
                  </div>
                  <div className="book-info">
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <button className="book-details-btn">Batafsil</button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div>Hech qanday natija topilmadi.</div>
            )}
          </div>
        </section>
      )}

      {/* Boshqa kontentlar: Popular Books */}
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
          {[0, 1, 2, 3 ,4, 5, 6, 7, 8].map((i) => (
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
      {i === 6 && <FaGlobe />}
      {i === 7 && <FaHandsHelping />}
      {i === 8 && <FaHistory />}
    </div>
    <h3>
      {i === 0 && 'Tezkor qidiruv'}
      {i === 1 && 'Keng tanlash imkoniyati'}
      {i === 2 && 'Vaqtni tejash'}
      {i === 3 && 'Qulay interfeys'}
      {i === 4 && 'Xavfsiz tizim'}
      {i === 5 && 'O‘quvchilar uchun mos'}
      {i === 6 && 'Global foydalanish'}
      {i === 7 && 'Yordam va qo‘llab-quvvatlash'}
      {i === 8 && 'Kitoblar tarixi'}
    </h3>
    <p>
      {i === 0 && 'Barcha kutubxonalardagi kitoblarni bir joydan qidiring.'}
      {i === 1 && 'Turli janrdagi adabiyotlar, yangi nashrlar mavjud.'}
      {i === 2 && 'Online bron qilish orqali navbatsiz xizmatdan foydalaning.'}
      {i === 3 && 'Mobil qurilmalarga moslashgan va tushunarli dizayn.'}
      {i === 4 && 'Foydalanuvchilarning ma’lumotlari xavfsiz saqlanadi.'}
      {i === 5 && 'Maktab va oliygoh talabalariga qulay platforma.'}
      {i === 6 && 'Har qanday joydan va vaqtda foydalanish imkoniyati.'}
      {i === 7 && 'Har doim yordam berishga tayyor xizmat jamoasi.'}
      {i === 8 && 'Har bir kitob haqida batafsil ma’lumot va tarix.'}
    </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="popular-books">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Eng ko'p qidirilgan kitoblar
        </motion.h2>
        <div className="books-grid">
          {popularBooks.map((book, index) => (
            <motion.div
              key={book.id}
              className="book-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="book-image">
                <img src={book.image} alt={book.title} />
                <div className="book-status">
                  {book.available ? (
                    <span className="available">Mavjud</span>
                  ) : (
                    <span className="unavailable">Band</span>
                  )}
                </div>
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <button className="book-details-btn">Batafsil</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
