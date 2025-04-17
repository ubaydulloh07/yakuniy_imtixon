import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../services/API';
import { Button, Modal, Form, Input, Switch, message ,Spin } from 'antd';
import { FaMapMarkerAlt, FaBookOpen, FaIdCard, FaTelegram , FaUserCircle , FaUserEdit , FaPhone } from 'react-icons/fa';
import '../styles/libraryProfile.css';

const LibraryProfile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    fetchProfile();
  }, []);

  const onFinish = async (values: any) => {
    try {
      const updatedData = { ...profile, ...values };
      await updateProfile(updatedData);
      message.success("Profil yangilandi");
      setIsModalOpen(false);
      fetchProfile();
    } catch (err: any) {
      message.error(err.message);
    }
  };

  if (loading) return <Spin size='large'  className='spin' />;
  if (error || !profile) return <div className="error">{error || "Ma'lumotlar topilmadi"}</div>;

  console.log(profile);
  

  return (
    <div className="library-profile-page">
      <div className="profile-header-ss">
        <h1>Kutubxona Profili</h1>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
        <FaUserEdit className='edit-icon' />
        Tahrirlash
        </Button>
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

      <Modal
        title="Profilni tahrirlash"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" initialValues={profile} onFinish={onFinish}>
          <Form.Item name="address" label="Manzil">
            <Input />
          </Form.Item>

     

          <Form.Item name="can_rent_books" label="Kitob ijarasi">
            <Switch defaultChecked={profile.can_rent_books} />
          </Form.Item>

          <Form.Item name={['social_media', 'telegram']} label="Telegram link">
            <Input />
          </Form.Item>

          <Form.Item name="latitude" label="Latitude">
            <Input />
          </Form.Item>

          <Form.Item name="longitude" label="Longitude">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Saqlash</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LibraryProfile;
