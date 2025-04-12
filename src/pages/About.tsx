import React, { useState } from 'react';

interface Developer {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const About: React.FC = () => {
  const [currentDeveloper, setCurrentDeveloper] = useState(0);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const developers: Developer[] = [
    {
      id: 1,
      name: "John Doe",
      role: "Bosh dasturchi",
      image: "https://via.placeholder.com/150",
      description: "10 yillik tajribaga ega full-stack dasturchi. React, Node.js va Python bo'yicha mutaxassis."
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "UI/UX dizayner",
      image: "https://via.placeholder.com/150",
      description: "Zamonaviy va foydalanuvchi uchun qulay interfeyslar yaratish bo'yicha mutaxassis."
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Backend dasturchi",
      image: "https://via.placeholder.com/150",
      description: "Ma'lumotlar bazasi va server tomoni dasturlash bo'yicha mutaxassis."
    }
  ];

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "Kutubxona tizimidan qanday foydalanish mumkin?",
      answer: "Tizimdan foydalanish uchun avval ro'yxatdan o'tishingiz kerak. Ro'yxatdan o'tgandan so'ng, kitoblar ro'yxatini ko'rib chiqishingiz, qidirish yoki kitob bron qilishingiz mumkin."
    },
    {
      id: 2,
      question: "Kitobni qancha muddatga olish mumkin?",
      answer: "Kitobni odatda 2 haftaga olish mumkin. Agar kerak bo'lsa, muddatni uzaytirish imkoniyati ham mavjud."
    },
    {
      id: 3,
      question: "Kitobni qaytarish muddati o'tib ketganda nima bo'ladi?",
      answer: "Kitobni o'z vaqtida qaytarmasangiz, har bir kun uchun ma'lum miqdorda jarima to'lashingiz kerak bo'ladi."
    },
    {
      id: 4,
      question: "Elektron kitoblarni o'qish mumkinmi?",
      answer: "Ha, bizning tizimda elektron kitoblarni o'qish imkoniyati mavjud. Buning uchun maxsus o'quvchi dastur yoki brauzer kerak bo'ladi."
    }
  ];

  const nextDeveloper = () => {
    setCurrentDeveloper((prev) => (prev + 1) % developers.length);
  };

  const prevDeveloper = () => {
    setCurrentDeveloper((prev) => (prev - 1 + developers.length) % developers.length);
  };

  const toggleFAQ = (id: number) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  return (
    <div className="about-page">
      <div className="about-header">
        <h1>Biz haqimizda</h1>
        <p>Bu loyiha kutubxona boshqaruv tizimini zamonaviy va qulay qilish maqsadida yaratilgan.</p>
      </div>

      <div className="developers-section">
        <h2>Jamoa a'zolari</h2>
        <div className="carousel">
          <button className="carousel-button prev" onClick={prevDeveloper}>
            &lt;
          </button>
          <div className="carousel-content">
            <div className="developer-card">
              <img src={developers[currentDeveloper].image} alt={developers[currentDeveloper].name} />
              <h3>{developers[currentDeveloper].name}</h3>
              <p className="role">{developers[currentDeveloper].role}</p>
              <p className="description">{developers[currentDeveloper].description}</p>
            </div>
          </div>
          <button className="carousel-button next" onClick={nextDeveloper}>
            &gt;
          </button>
        </div>
        <div className="carousel-indicators">
          {developers.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentDeveloper ? 'active' : ''}`}
              onClick={() => setCurrentDeveloper(index)}
            />
          ))}
        </div>
      </div>

      <div className="faq-section">
        <h2>Tez-tez beriladigan savollar</h2>
        <div className="faq-list">
          {faqs.map((faq) => (
            <div key={faq.id} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleFAQ(faq.id)}
              >
                {faq.question}
                <span className={`arrow ${activeFAQ === faq.id ? 'active' : ''}`}>▼</span>
              </button>
              {activeFAQ === faq.id && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About; 