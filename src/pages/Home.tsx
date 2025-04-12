import React, { useState } from 'react';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality will be implemented here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="home-page">
      <div className="search-section">
        <h1>Kitob qidirish</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Kitob nomi yoki muallifi bo'yicha qidiring..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Qidirish
          </button>
        </form>
      </div>

      <div className="features-section">
        <h2>Nega bizning tizimdan foydalanish kerak?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Keng kitoblar bazasi</h3>
            <p>Bizning kutubxonamizda turli janrlardagi minglab kitoblar mavjud. Har qanday qiziqishingiz bo'yicha kitob topishingiz mumkin.</p>
          </div>
          <div className="feature-card">
            <h3>Qulay qidiruv</h3>
            <p>Kitob nomi, muallifi yoki janri bo'yicha tez va qulay qidiruv imkoniyati. Kerakli kitobni bir necha soniyada topishingiz mumkin.</p>
          </div>
          <div className="feature-card">
            <h3>Zamonaviy interfeys</h3>
            <p>Foydalanuvchi uchun qulay va zamonaviy interfeys. Barcha funksiyalar oddiy va tushunarli.</p>
          </div>
          <div className="feature-card">
            <h3>Doimiy yangilanish</h3>
            <p>Kitoblar bazasi doimiy ravishda yangilanib boriladi. Eng yangi nashrlar va mashhur kitoblar bizning kutubxonamizda mavjud.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 