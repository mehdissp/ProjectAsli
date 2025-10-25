import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaShieldAlt,
  FaBell,
  FaGlobe,
  FaLinkedin,
  FaTwitter,
  FaCamera,
  FaKey
} from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    department: '',
    website: '',
    linkedin: '',
    twitter: ''
  });

  useEffect(() => {
      console.log(user)
    if (user) {
      setFormData({
        name: user.name || user.username || '',
        email: user.email || '',
        phone: user.phone || '+98 912 345 6789',
        location: user.location || 'تهران، ایران',
        bio: user.bio || 'مدیر سیستم با ۵ سال سابقه در زمینه مدیریت نرم‌افزار',
        department: user.department || 'فناوری اطلاعات',
        website: user.website || 'www.example.com',
        linkedin: user.linkedin || 'linkedin.com/in/username',
        twitter: user.twitter || 'twitter.com/username'
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
  
    setFormData({
      name: user.name || user.username || '',
      email: user.email || '',
      phone: user.mobileNumber || '+98 912 345 6789',
      location: user.location || 'تهران، ایران',
      bio: user.bio || 'مدیر سیستم با ۵ سال سابقه در زمینه مدیریت نرم‌افزار',
      department: user.department || 'فناوری اطلاعات',
      website: user.website || 'www.example.com',
      linkedin: user.linkedin || 'linkedin.com/in/username',
      twitter: user.twitter || 'twitter.com/username'
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="header-content">
          <h1 className="profile-title">پروفایل کاربری</h1>
          <p className="profile-subtitle">مدیریت اطلاعات حساب کاربری</p>
        </div>
        <div className="header-actions">
          {!isEditing ? (
            <button 
              className="btn btn-primary edit-btn"
              onClick={() => setIsEditing(true)}
            >
              <FaEdit />
              ویرایش پروفایل
            </button>
          ) : (
            <div className="edit-actions">
              <button 
                className="btn btn-success save-btn"
                onClick={handleSubmit}
              >
                <FaSave />
                ذخیره تغییرات
              </button>
              <button 
                className="btn btn-secondary cancel-btn"
                onClick={handleCancel}
              >
                <FaTimes />
                انصراف
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="user-card">
            <div className="avatar-section">
              <div className="avatar-wrapper">
                <div className="user-avatar large">
                  {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
                </div>
                <button className="avatar-edit-btn">
                  <FaCamera />
                </button>
              </div>
              <div className="user-info-summary">
                <h2 className="user-display-name">{formData.name}</h2>
                <p className="user-role">{user?.role || 'مدیر سیستم'}</p>
                <div className="user-stats">
                  <div className="stat-item">
                    <span className="stat-number">۵</span>
                    <span className="stat-label">پروژه</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">۱۲</span>
                    <span className="stat-label">فعالیت</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">۳</span>
                    <span className="stat-label">تیم</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="quick-actions">
            <h3>دسترسی سریع</h3>
            <button className="quick-action-btn">
              <FaKey />
              تغییر رمز عبور
            </button>
            <button className="quick-action-btn">
              <FaBell />
              تنظیمات نوتیفیکیشن
            </button>
            <button className="quick-action-btn">
              <FaShieldAlt />
              امنیت حساب
            </button>
          </div>
        </div>

        <div className="profile-main">
          <div className="profile-section">
            <div className="section-header">
              <h3 className="section-title">اطلاعات شخصی</h3>
              <div className="section-decoration"></div>
            </div>
            
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <FaUser />
                    نام کامل
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="نام و نام خانوادگی"
                    />
                  ) : (
                    <div className="form-display">{formData.name}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaEnvelope />
                    آدرس ایمیل
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="example@domain.com"
                    />
                  ) : (
                    <div className="form-display">{formData.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaPhone />
                    شماره تماس
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="+98 912 345 6789"
                    />
                  ) : (
                    <div className="form-display">{formData.phone}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaMapMarkerAlt />
                    محل سکونت
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="شهر، کشور"
                    />
                  ) : (
                    <div className="form-display">{formData.location}</div>
                  )}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    <FaUser />
                    درباره من
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="توضیحاتی درباره خودتان..."
                      rows="4"
                    />
                  ) : (
                    <div className="form-display bio-text">{formData.bio}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaUser />
                    دپارتمان
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="دپارتمان مربوطه"
                    />
                  ) : (
                    <div className="form-display">{formData.department}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaCalendarAlt />
                    تاریخ عضویت
                  </label>
                  <div className="form-display">
                    {user?.joinDate || '۱۴۰۲/۰۱/۱۵'}
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="profile-section">
            <div className="section-header">
              <h3 className="section-title">اطلاعات تماس</h3>
              <div className="section-decoration"></div>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  <FaGlobe />
                  وبسایت
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="https://example.com"
                  />
                ) : (
                  <div className="form-display link">{formData.website}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <FaLinkedin />
                  LinkedIn
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="linkedin.com/in/username"
                  />
                ) : (
                  <div className="form-display link">{formData.linkedin}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <FaTwitter />
                  Twitter
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="twitter.com/username"
                  />
                ) : (
                  <div className="form-display link">{formData.twitter}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;