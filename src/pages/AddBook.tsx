import React, { useState } from 'react';
import '../styles/addBook.css';

interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  quantity: number;
}

const AddBook: React.FC = () => {
  const [book, setBook] = useState<Book>({
    id: Date.now(),
    title: '',
    author: '',
    publisher: '',
    quantity: 1
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validatsiya
    if (!book.title.trim()) {
      setErrorMessage('Kitob nomini kiriting');
      return;
    }
    if (!book.author.trim()) {
      setErrorMessage('Muallifni kiriting');
      return;
    }
    if (!book.publisher.trim()) {
      setErrorMessage('Nashriyotni kiriting');
      return;
    }
    if (book.quantity < 1) {
      setErrorMessage('Kitoblar soni 1 dan kam bo\'lmasligi kerak');
      return;
    }

    // Bu yerda formani yuborish logikasi bo'ladi
    console.log('Kitob ma\'lumotlari:', book);
    
    // Muvaffaqiyatli xabar
    setSuccessMessage('Kitob muvaffaqiyatli qo\'shildi');
    setErrorMessage('');
    
    // Formani tozalash
    setBook({
      id: Date.now(),
      title: '',
      author: '',
      publisher: '',
      quantity: 1
    });

    // 3 sekunddan keyin xabarni yo'qotish
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="add-book-page">
      <h1>Yangi kitob qo'shish</h1>
      
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="form-group">
          <label htmlFor="title">Kitob nomi</label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleInputChange}
            placeholder="Kitob nomini kiriting"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Muallif</label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleInputChange}
            placeholder="Muallifni kiriting"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="publisher">Nashriyot</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={book.publisher}
            onChange={handleInputChange}
            placeholder="Nashriyotni kiriting"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Kutubxonadagi mavjud soni</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={book.quantity}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Kitob qo'shish
        </button>
      </form>
    </div>
  );
};

export default AddBook; 