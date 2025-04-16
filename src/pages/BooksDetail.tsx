import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../services/API';
import { Bookpage } from '../types/type';
import '../styles/bookDetail.css';
import { Spin } from 'antd';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Bookpage | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (id) {
          const data = await getBookById(id);
          setBook(data);
        }
      } catch (error) {
        console.error('Kitob maʼlumotlarini olishda xatolik:', error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return  <Spin size="large" className="spin" />;
  }

  return (
    <div className="book-detail-container">
      <h1 className="book-detail-title">{book.name} Kitobi</h1>
      <div className="book-detail-content">
        <div className="book-detail-info">
          <p><strong>Muallif :  </strong> {book.author}</p>
          <p><strong>Nashriyot : </strong> {book.publisher}</p>
          <p><strong>Shu kutubxonada mavjud  : </strong> {book.library}</p>
          <p><strong>Kitob soni :</strong> {book.quantity_in_library}</p>
        </div>
        <div className="book-detail-image">
          <img
            src="https://prd-static-2.sf-cdn.com/resources/images/store/2021/global/980x640/UK/xbook-covers-980x640-20220216.jpg.pagespeed.ic.xCT8QrSc8g.webp"
            alt="Kitob rasmi"
          />
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
