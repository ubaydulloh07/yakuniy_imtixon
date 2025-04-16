import { useState } from 'react';
import axios from 'axios';
import '../styles/addBooks.css';

const AddBooks = () => {
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    publisher: '',
    quantity_in_library: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://s-libraries.uz/api/v1/books/add-books/', formData);
      setMessage('Kitob muvaffaqiyatli qo‘shildi!');
      setFormData({
        name: '',
        author: '',
        publisher: '',
        quantity_in_library: '',
    
      });
      console.log(response.data);
    } catch (error) {
      console.error('Xatolik:', error);
      setMessage('Kitob qo‘shishda xatolik yuz berdi.');
    }
  };

  return (
    <div className="add-book-container">
      <h2>Yangi kitob qo‘shish</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="add-book-form">
        <input
          type="text"
          name="name"
          placeholder="Kitob nomi"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Muallif"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="publisher"
          placeholder="Nashriyot"
          value={formData.publisher}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity_in_library"
          placeholder="Kutubxonadagi soni"
          value={formData.quantity_in_library}
          onChange={handleChange}
          required
          min={1}
        />
        <button type="submit">Qo‘shish</button>
      </form>
    </div>
  );
};

export default AddBooks;
