

// import React, { useState } from 'react';
// import { FaSearch, FaBookOpen, FaClock, FaMobileAlt } from 'react-icons/fa';
// import { searchBooks } from '../services/api'; // API funksiyasi shu fayldan keladi
// import '../styles/home.css';

// const popularBooks = [
//   {
//     id: 1,
//     title: "O'tkan kunlar",
//     author: "Abdulla Qodiriy",
//     image: "https://kitobxon.com/img_knigi/1447.jpg",
//     available: true
//   },
//   {
//     id: 2,
//     title: "Sariq devni minib",
//     author: "Xudoyberdi To'xtaboyev",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8l4XhyV2El8Z9M4u7hjmx8t9oJW0CKew48g&s",
//     available: true
//   },
//   {
//     id: 3,
//     title: "Ikki eshik orasi",
//     author: "O'tkir Hoshimov",
//     image: "https://backend.book.uz/user-api/img/img-file-f94aa12ba267f24b219252b42b3ff461.jpg",
//     available: false
//   },
//   {
//     id: 4,
//     title: "Yulduzli tunlar",
//     author: "Pirimqul Qodirov",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Sg2Z8Z9liylJovVE-A_QQoPfvbr-5izGOg&s",
//     available: true
//   }
// ];

// const Home: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       try {
//         const data = await searchBooks(searchQuery);
//         setSearchResults(data.results || []);
//       } catch (error) {
//         console.error('Search error:', error);
//       }
//     }
//   };

//   return (
//     <div className="home">
//       <section className="hero">
//         <div className="hero-content">
//           <h1>Kutubxonalar tizimiga xush kelibsiz</h1>
//           <p>Kitoblarni qidiring, bron qiling va o'qishdan bahramand bo'ling</p>
//           <div className="search-container">
//             <form onSubmit={handleSearch} className="search-form">
//               <div className="search-input-wrapper">
//                 <FaSearch className="search-icon" />
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Kitob nomi yoki muallif bo'yicha qidiring..."
//                   className="search-input"
//                 />
//               </div>
//               <button type="submit" className="search-button">
//                 Qidirish
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>

//       {searchResults.length > 0 && (
//         <section className="search-results">
//           <h2>Qidiruv natijalari</h2>
//           <div className="search-books-grid">
//             {searchResults.map((book: any) => (
//               <div key={book.id} className="search-book-card">
//                 <div className="search-book-info">
//                   <h3>{book.name}</h3>
//                   <p><strong>Muallif:</strong> {book.author}</p>
//                   <p><strong>Nashriyot:</strong> {book.publisher}</p>
//                   <p><strong>Soni:</strong> {book.quantity_in_library}</p>
//                   <p className={`book-status ${book.quantity_in_library > 0 ? 'available' : 'unavailable'}`}>
//                     {book.quantity_in_library > 0 ? 'Mavjud' : 'Band'}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       <section className="why-us">
//         <h2>Nega bizning tizimdan foydalanish kerak?</h2>
//         <div className="features-grid">
//           <div className="feature-card">
//             <div className="feature-icon">
//               <FaSearch />
//             </div>
//             <h3>Tezkor qidiruv</h3>
//             <p>Barcha kutubxonalardagi kitoblarni bir joydan qidiring.</p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon">
//               <FaBookOpen />
//             </div>
//             <h3>Keng tanlash imkoniyati</h3>
//             <p>Turli janrdagi adabiyotlar, yangi nashrlar mavjud.</p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon">
//               <FaClock />
//             </div>
//             <h3>Vaqtni tejash</h3>
//             <p>Online bron qilish orqali navbatsiz xizmatdan foydalaning.</p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon">
//               <FaMobileAlt />
//             </div>
//             <h3>Qulay interfeys</h3>
//             <p>Mobil qurilmalarga moslashgan va tushunarli dizayn.</p>
//           </div>
//         </div>
//       </section>

//       <section className="popular-books">
//         <h2>Eng ko'p qidirilgan kitoblar</h2>
//         <div className="books-grid">
//           {popularBooks.map(book => (
//             <div key={book.id} className="book-card">
//               <div className="book-image">
//                 <img src={book.image} alt={book.title} />
//                 <div className="book-status">
//                   {book.available ? (
//                     <span className="available">Mavjud</span>
//                   ) : (
//                     <span className="unavailable">Band</span>
//                   )}
//                 </div>
//               </div>
//               <div className="book-info">
//                 <h3>{book.title}</h3>
//                 <p>{book.author}</p>
//                 <button className="book-details-btn">Batafsil</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaBookOpen, FaClock, FaMobileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Sg2Z8Z9liylJovVE-A_QQoPfvbr-5izGOg&s",
    available: true
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<any[]>([]); // Kitoblarni saqlash
  const [loading, setLoading] = useState(false);

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
              <div>Yuklanmoqda...</div>
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
          {[0, 1, 2, 3].map((i) => (
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
              </div>
              <h3>
                {i === 0 && 'Tezkor qidiruv'}
                {i === 1 && 'Keng tanlash imkoniyati'}
                {i === 2 && 'Vaqtni tejash'}
                {i === 3 && 'Qulay interfeys'}
              </h3>
              <p>
                {i === 0 && 'Barcha kutubxonalardagi kitoblarni bir joydan qidiring.'}
                {i === 1 && 'Turli janrdagi adabiyotlar, yangi nashrlar mavjud.'}
                {i === 2 && 'Online bron qilish orqali navbatsiz xizmatdan foydalaning.'}
                {i === 3 && 'Mobil qurilmalarga moslashgan va tushunarli dizayn.'}
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
