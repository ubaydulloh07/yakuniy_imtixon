
import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile, deleteBook, getLibraryBooks, updateBook } from '../services/API';
import { Button, Modal, Form, Input, Switch, Spin } from 'antd';
import { FaMapMarkerAlt, FaBookOpen, FaIdCard, FaTelegram, FaUserCircle, FaUserEdit, FaPhone, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/libraryProfile.css';
import { RiDeleteBin5Line } from "react-icons/ri";

const LibraryProfile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async () => {
    try {
      const data = await getLibraryBooks();
      setBooks(data);
    } catch (err) {
      console.error('Kitoblarni yuklashda xatolik:', err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchBooks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success("Muvaffaqiyatli chiqdingiz!");
    setTimeout(() => {
      navigate('/login');
      window.location.reload();
    }, 1500);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id);
      toast.success("Kitob muvaffaqiyatli o'chirildi!");
      fetchBooks();
    } catch (error) {
      toast.error("Kitobni o'chirishda xatolik yuz berdi");
    }
  };

  const onFinish = async (values: any) => {
    try {
      const updatedData = {
        ...profile,
        ...values,
        user: {
          ...profile.user,
          ...values.user,
        },
        social_media: {
          ...profile.social_media,
          ...values.social_media,
        },
      };

      if (values.user?.phone === profile.user?.phone) {
        delete updatedData.user.phone;
      }

      await updateProfile(updatedData);
      toast.success("Profil muvaffaqiyatli yangilandi!");
      setIsModalOpen(false);
      fetchProfile();
    } catch (err: any) {
      if (err.response?.data?.user?.phone) {
        toast.error(`Telefon raqami xatosi: ${err.response.data.user.phone[0]}`);
      } else {
        toast.error(err.message || 'Profilni yangilashda xatolik yuz berdi');
      }
    }
  };

  const handleEditClick = (book: any) => {
    setEditingBook(book);
    editForm.setFieldsValue({
      name: book.name,
      author: book.author,
      publisher: book.publisher,
      quantity_in_library: book.quantity_in_library,
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (values: any) => {
    try {
      await updateBook(editingBook.id, values);
      toast.success("Kitob muvaffaqiyatli yangilandi!");
      setIsEditModalOpen(false);
      fetchBooks();
    } catch (err: any) {
      toast.error("Kitobni yangilashda xatolik yuz berdi");
    }
  };

  if (loading) return <Spin size='large' className='spin' />;
  if (error || !profile) return <div className="error">{error || "Ma'lumotlar topilmadi"}</div>;

  return (
    <div className="library-profile-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="profile-header-ss">
        <h1>Kutubxona Profili</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            type="primary"
            onClick={() => {
              form.setFieldsValue({
                address: profile.address,
                can_rent_books: profile.can_rent_books,
                latitude: profile.latitude,
                longitude: profile.longitude,
                user: {
                  name: profile.user?.name,
                  phone: profile.user?.phone,
                },
                social_media: {
                  telegram: profile.social_media?.telegram,
                },
              });
              setIsModalOpen(true);
            }}
          >
            <FaUserEdit className='edit-icon' />
            Tahrirlash
          </Button>

          <Button className='logout-btn' danger onClick={handleLogout}>
            <FaSignOutAlt /> Chiqish
          </Button>
        </div>
      </div>

      <div className="profile-content">
        <div className="info-side">
          <p><FaUserCircle /> <strong>Foydalanuvchi:</strong> {profile.user?.name}</p>
          <p><FaIdCard /> <strong>ID:</strong> {profile.user?.id}</p>
          <p><FaMapMarkerAlt /> <strong>Manzil:</strong> {profile.address}</p>
          <p><FaBookOpen /> <strong>Kitob ijarasi:</strong> {profile.can_rent_books ? 'Mavjud' : 'Mavjud emas'}</p>
          <p><FaPhone /> <strong>Telefon:</strong> {profile.user?.phone}</p>

          {profile.social_media?.telegram && (
            <p>
              <FaTelegram /> <strong>Telegram:</strong>{' '}
              <a href={`https://${profile.social_media.telegram}`} target="_blank" rel="noopener noreferrer">
                {profile.social_media.telegram}
              </a>
            </p>
          )}

          {profile.image && (
            <div className="profile-img">
              <img src={profile.image} alt="Kutubxona rasmi" />
            </div>
          )}
        </div>

        <div className="map-side">
          {profile.address && profile.address.length > 5 ? (
            <iframe
              width="100%"
              height="350"
              style={{ border: 0, borderRadius: '10px' }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${encodeURIComponent(profile.address)}&z=15&output=embed`}
            ></iframe>
          ) : (
            <div className="no-map">Manzil topilmadi</div>
          )}
        </div>
      </div>

      <div className="profile-books-section">
        <h2 style={{ marginTop: '30px' }}>Kutubxona kitoblari</h2>
        <div className="profile-books-list">
          {books.length === 0 ? (
            <p>Kitoblar topilmadi</p>
          ) : (
            books.map((book) => (
              <div key={book.id} className="profile-book-card">
                <div className="book-edit-top">
                  <Button className='book-edit' size="small" onClick={() => handleEditClick(book)} icon={<FaEdit />} />
                </div>
                <img
                  src="https://prd-static-1.sf-cdn.com/resources/images/store/2015/global/640x400/Books/xbooks-640x400-20250314.jpg.pagespeed.ic.0_0jDnm6Ea.webp"
                  alt={book.name}
                  className="profile-book-image"
                />
                <h3>{book.name}</h3>
                <p><strong>Muallif:</strong> {book.author}</p>
                <p><strong>Nashriyot:</strong> {book.publisher}</p>
                <p><strong>Soni:</strong> {book.quantity_in_library}</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className='profile-book-button' onClick={() => navigate(`/books/${book.id}`)}>Batafsil</button>
                  <button className='profile-book-delete' onClick={() => handleDelete(book.id)}>
                    <RiDeleteBin5Line />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    
      <Modal title="Profilni tahrirlash" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ flex: '1 1 48%' }}>
              <Form.Item name={['user', 'name']} label="Ism" rules={[{ required: true, message: 'Ismingizni kiriting' }]}>
                <Input />
              </Form.Item>
            </div>
            <div style={{ flex: '1 1 48%' }}>
              <Form.Item name={['user', 'phone']} label="Telefon" rules={[{ required: true, message: 'Telefon raqamni kiriting' }]}>
                <Input />
              </Form.Item>
            </div>
            <div style={{ flex: '1 1 48%' }}>
              <Form.Item name="address" label="Manzil">
                <Input />
              </Form.Item>
            </div>
            <div style={{ flex: '1 1 48%' }}>
              <Form.Item name={['social_media', 'telegram']} label="Telegram link">
                <Input />
              </Form.Item>
            </div>
            <div style={{ flex: '1 1 48%' }}>
              <Form.Item name="latitude" label="Latitude">
                <Input />
              </Form.Item>
            </div>
            <div style={{ flex: '1 1 48%' }}>
              <Form.Item name="longitude" label="Longitude">
                <Input />
              </Form.Item>
            </div>
            <div style={{ flex: '1 1 48%' }}>
              <Form.Item name="can_rent_books" label="Kitob ijarasi" valuePropName="checked">
                <Switch />
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <Button className='edit-btn' type="primary" htmlType="submit" style={{ width: '100%' }}>
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Kitobni tahrirlash modali */}
      <Modal title="Kitobni tahrirlash" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} footer={null}>
        <Form layout="vertical" form={editForm} onFinish={handleEditSubmit}>
          <Form.Item name="name" label="Kitob nomi" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="author" label="Muallif" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="publisher" label="Nashriyot" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="quantity_in_library" label="Soni" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Yangilash
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LibraryProfile;
