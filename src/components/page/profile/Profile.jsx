import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import moment from 'moment-jalaali';
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

import { profileService } from '../../../services/profile';

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
    twitter: '',
    profileImage: '' // اضافه کردن فیلد profileImage به formData
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    console.log(user);
    if (user) {
      setFormData({
        name: user.name || user.username || '',
        email: user.email || '',
        phone: user.mobileNumber || '+98 912 345 6789',
        location: user.location || 'تهران، ایران',
        bio: user.bio || 'مدیر سیستم با ۵ سال سابقه در زمینه مدیریت نرم‌افزار',
        department: user.department || 'فناوری اطلاعات',
        website: user.website || 'www.example.com',
        linkedin: user.linkedin || 'linkedin.com/in/username',
        roleName: user.roleName || 'twitter.com/username',
        profileImage: user.avatar || '' // اضافه کردن profileImage
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

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // اعتبارسنجی نوع فایل
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('فرمت فایل مجاز نیست. فقط فایل‌های JPG, PNG, GIF قابل قبول هستند.');
      return;
    }

    // اعتبارسنجی حجم فایل (3MB)
    const maxSize = 3 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('حجم فایل نباید بیشتر از 3 مگابایت باشد.');
      return;
    }

    setIsUploading(true);

    try {
      const response = await profileService.uploadProfilePhoto(file);
      console.log("آپلود موفق:", response);

      // آپدیت formData بدون پاک کردن فیلدهای دیگر
      setFormData(prev => ({
        ...prev,
        profileImage: response.fullUrl
      }));

      // آپدیت پروفایل کاربر در context
      // await updateProfile({ 
      //   profileImage: response.fullUrl,
      //   // سایر فیلدها را هم آپدیت کنید اگر نیاز است
      //   name: formData.name,
      //   email: formData.email,
      //   // ...
      // });
      
      // نمایش پیام موفقیت
      alert( response.fullUrl);
      
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert(error.message || 'خطا در آپلود عکس');
    } finally {
      setIsUploading(false);
      // ریست کردن input file برای امکان انتخاب مجدد همان فایل
      event.target.value = '';
    }
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

  const convertToJalaali = (dateString) => {
    if (!dateString) return 'تعیین نشده';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        if (typeof dateString === 'string' && dateString.includes('/')) {
          return dateString;
        }
        return 'تاریخ نامعتبر';
      }
      
      return moment(date).format('jYYYY/jMM/jDD');
    } catch (error) {
      console.error('Error converting date:', error);
      return 'تاریخ نامعتبر';
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
      twitter: user.twitter || 'twitter.com/username',
      profileImage: user.profileImage || ''
    });
    setIsEditing(false);
  };

  // تابع برای گرفتن URL تصویر - اولویت با formData.profileImage سپس user.profileImage
  const getProfileImageUrl = () => {
    return formData.profileImage || user?.profileImage;
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
                {getProfileImageUrl() ? (
                  <img 
                    src={getProfileImageUrl()} 
                    alt="Profile" 
                    className="user-avatar large profile-image"
                    onError={(e) => {
                      // اگر تصویر لود نشد، آواتار پیش‌فرض نشان داده شود
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : null}
                
                {!getProfileImageUrl() && (
                  <div className="user-avatar large">
                    {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
                  </div>
                )}
                
                <label htmlFor="avatar-upload" className="avatar-edit-btn">
                  {isUploading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <FaCamera />
                  )}
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                  disabled={isUploading}
                />
              </div>
              <div className="user-info-summary">
                <h2 className="user-display-name">{formData.name}</h2>
                <p className="user-role">{user?.roleName || 'مدیر سیستم'}</p>
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

        {/* بقیه کد بدون تغییر */}
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

                {/* بقیه فیلدها */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;