import React, { useState  } from 'react';
import '../styles/about.css';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface Developer {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
}

const About: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const developers: Developer[] = [
    {
      id: 1,
      name: "Ubaydulloh Mirzaaxmadov",
      role: "Frontend Developer",
      description: "React , Next.js va TypeScript bilan ishlash tajribasiga ega. Zamonaviy web ilovalar yaratish bo'yicha mutaxassis.",
      image: "./user.png"
    },
    {
      id: 2,
      name: "Backendchini tanimayman",
      role: "Backend Developer",
      description: "Node.js va PostgreSQL bilan ishlovchi tajribali dasturchi. API va ma'lumotlar bazasi arxitekturasi bo'yicha mutaxassis.",
      image: "./backend.png"
    },
    {
      id: 3,
      name: "Ubaydulloh Mirzaaxmadov",
      role: "UI/UX Designer",
      description: "Foydalanuvchi interfeyslarini loyihalash va prototiplash bo'yicha tajribali dizayner.",
      image: "./user.png"
    }
  ];

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "Kutubxonachi sifatida qanday ro'yxatdan o'tish mumkin?",
      answer: "Kutubxonachi sifatida ro'yxatdan o'tish uchun saytning yuqori qismidagi 'Kutubxonachi bo'lish' tugmasini bosing va kerakli ma'lumotlarni kiriting. So'ng admin tasdig'ini kuting."
    },
    {
      id: 2,
      question: "Kutubxonaga kitob qo'shish mumkinmi?",
      answer: "Ha, kutubxonachi sifatida tizimga kirgandan so'ng, o'z kutubxonangizga yangi kitoblar qo'shishingiz mumkin."
    },
    {
      id: 3,
      question: "Kitob qidirish qanday amalga oshiriladi?",
      answer: "Bosh sahifadagi qidiruv maydoniga kitob nomi yoki muallifini kiriting. Tizim avtomatik ravishda mos keluvchi kitoblarni ko'rsatadi."
    },
    {
      id: 4,
      question: "Kutubxona manzilini qanday topish mumkin?",
      answer: "Kutubxonalar ro'yxatidan kerakli kutubxonani tanlab, uning sahifasiga o'ting. U yerda kutubxonaning to'liq manzili va xaritadagi joylashuvi ko'rsatilgan."
    }
  ];

  const toggleFAQ = (id: number) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };




  return (
    <div className="about-page">
      <section className="about-section">
        <h1>Biz haqimizda</h1>
        <p className="about-description">
          Ezma Library - bu zamonaviy kutubxona tizimi bo'lib, u kutubxonalar va kitobxonlar o'rtasidagi aloqani 
          yangi bosqichga olib chiqadi. Bizning maqsadimiz - kitob o'qishni yanada qulayroq va zamonaviyroq qilish.
        </p>
      </section>

      <section className="mission-values">
        <div className="mission">
          <h2>Bizning maqsadimiz</h2>
          <p>
            Ezma loyihasining asosiy maqsadi - O'zbekiston aholisiga kutubxona resurslaridan
            foydalanishni osonlashtirish va kitobxonlikni rivojlantirish. Biz zamonaviy texnologiyalar
            yordamida an'anaviy kutubxonalarni yanada qulay va foydalanuvchilarga yaqinroq
            qilishga harakat qilmoqdamiz.
          </p>
          <p>
            Bizning tizim orqali har bir kishi o'ziga kerakli kitobni qaysi kutubxonada borligini va eng
            yaqin kutubxonani topishi mumkin. Bu esa vaqtni tejash va kitobxonlikni rag'batlantirish
            imkonini beradi.
          </p>
        </div>

        <div className="values">
          <h2>Bizning qadriyatlarimiz</h2>
          <ul>
            <li>Innovatsiya - biz doimo yangi g'oyalar va yechimlar izlaymiz</li>
            <li>Foydalanuvchi tajribasi - bizning asosiy e'tiborimiz foydalanuvchilar ehtiyojlariga qaratilgan</li>
            <li>Hamkorlik - biz kutubxonalar va foydalanuvchilar bilan yaqin hamkorlikda ishlaymiz</li>
            <li>Ochiqlik - biz ochiq ma'lumotlar va ochiq kodli yechimlarni qo'llab-quvvatlaymiz</li>
          </ul>
        </div>
      </section>

      <section className="developers-section">
        <h2>Bizning jamoa</h2>
        <div className="developers-grid">
          {developers.map(developer => (
            <div key={developer.id} className="developer-card">
              <div className="developer-image">
                <img src={developer.image} alt={developer.name} />
              </div>
              <div className="developer-info">
                <h3>{developer.name}</h3>
                <p className="developer-role">{developer.role}</p>
                <p className="developer-description">{developer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <h2>Ko'p so'raladigan savollar</h2>
        <div className="faq-list">
          {faqs.map(faq => (
            <div key={faq.id} className="faq-item">
              <button
                className={`faq-question ${activeFAQ === faq.id ? 'active' : ''}`}
                onClick={() => toggleFAQ(faq.id)}
              >
                {faq.question}
                <span className="faq-icon">{activeFAQ === faq.id ? '−' : '+'}</span>
              </button>
              {activeFAQ === faq.id && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About; 