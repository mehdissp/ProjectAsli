
import React, { useState, useEffect, useRef } from 'react';
import { 
  FaUserCheck, 
  FaWallet, 
  FaChartLine, 
  FaEye, 
  FaUserFriends, 
  FaThumbsUp,
  FaCheckCircle,
  FaPhoneAlt,
  FaUserTie,
  FaCalendarAlt,
  FaClock,
  FaChartBar,
  FaChartPie,
  FaArrowUp,
  FaSpinner,
  FaEdit,
  FaCamera,
  FaKey,
  FaSave,
  FaTimes,
  FaUserCircle,
  FaTrash
} from 'react-icons/fa';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { consultantService } from '../../../services/consultantService ';
import ImageWithSafeError from '../../common/ImageWithSafeError/ImageWithSafeError';
import './ConsultantProfile.css';

const ConsultantProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // State های اصلی
  const [cspLoading, setCspLoading] = useState(true);
  const [cspError, setCspError] = useState(null);
  const [cspConsultant, setCspConsultant] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    isPhoneVerified: false,
    walletBalance: 0,
    specialty: '',
    experience: 0,
    rating: 0,
    totalSessions: 0,
    bio: '',
    profileImage: null
  });

  // State برای مودال‌ها
  const [cspShowEditModal, setCspShowEditModal] = useState(false);
  const [cspShowPasswordModal, setCspShowPasswordModal] = useState(false);
  const [cspShowImageModal, setCspShowImageModal] = useState(false);
  const [cspUploadingImage, setCspUploadingImage] = useState(false);
  const [cspSaving, setCspSaving] = useState(false);
  
  // State برای ویرایش پروفایل
  const [cspEditForm, setCspEditForm] = useState({
    name: '',
    phone: '',
    email: '',
    specialty: '',
    experience: '',
    bio: ''
  });

  // State برای تغییر پسورد
  const [cspPasswordForm, setCspPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // State برای تصویر - با مدیریت خطا
  const [cspImagePreview, setCspImagePreview] = useState(null);
  const [cspSelectedFile, setCspSelectedFile] = useState(null);
  const [cspImageError, setCspImageError] = useState(false);
  const [cspImageLoading, setCspImageLoading] = useState(true);

  // State برای Toast
  const [cspToast, setCspToast] = useState(null);

  // داده‌های نمودارها
  const [cspMonthlyViews] = useState([
    { month: 'فروردین', views: 245, sessions: 18 },
    { month: 'اردیبهشت', views: 312, sessions: 24 },
    { month: 'خرداد', views: 298, sessions: 22 },
    { month: 'تیر', views: 356, sessions: 28 },
    { month: 'مرداد', views: 423, sessions: 35 },
    { month: 'شهریور', views: 389, sessions: 31 },
    { month: 'مهر', views: 445, sessions: 38 },
    { month: 'آبان', views: 498, sessions: 42 },
    { month: 'آذر', views: 467, sessions: 39 },
    { month: 'دی', views: 512, sessions: 45 },
    { month: 'بهمن', views: 534, sessions: 48 },
    { month: 'اسفند', views: 489, sessions: 44 }
  ]);

  const [cspCategoryData] = useState([
    { name: 'مشاوره فردی', value: 45, color: '#4F46E5' },
    { name: 'مشاوره تیمی', value: 28, color: '#10B981' },
    { name: 'کارگاه‌ها', value: 18, color: '#F59E0B' },
    { name: 'دوره‌ها', value: 9, color: '#EF4444' }
  ]);

  const [cspWeeklyData] = useState([
    { day: 'شنبه', views: 68, engagement: 45 },
    { day: 'یکشنبه', views: 72, engagement: 52 },
    { day: 'دوشنبه', views: 85, engagement: 63 },
    { day: 'سه‌شنبه', views: 79, engagement: 58 },
    { day: 'چهارشنبه', views: 92, engagement: 71 },
    { day: 'پنجشنبه', views: 64, engagement: 48 },
    { day: 'جمعه', views: 45, engagement: 38 }
  ]);

  // نمایش Toast
  const cspShowToast = (message, type = 'success') => {
    setCspToast({ message, type });
    setTimeout(() => setCspToast(null), 3000);
  };

  // دریافت اطلاعات
  useEffect(() => {
    const fetchConsultantData = async () => {
      try {
        setCspLoading(true);
        setCspError(null);
        setCspImageError(false);
        setCspImageLoading(true);
        
        const data = await consultantService.getConsultantDashboard();
        
        let profileImage = null;
        try {
          const avatarPath = await consultantService.getAvatar();
          if (avatarPath && typeof avatarPath === 'string') {
            profileImage = avatarPath.startsWith('/') ? avatarPath : `/${avatarPath}`;
            console.log('✅ Profile image path:', profileImage);
          }
        } catch (avatarError) {
          console.log('No avatar found');
        }
        
        setCspConsultant({
          id: data.id || '',
          name: data.fullName || 'مشاور',
          phone: data.mobile || '',
          email: data.email || '',
          isPhoneVerified: data.isPhoneVerified || false,
          walletBalance: data.walletBalance || 0,
          specialty: data.specialty || 'مشاور',
          experience: parseInt(data.experience) || 0,
          rating: parseFloat(data.rating) || 0,
          totalSessions: parseInt(data.totalSessions) || 0,
          bio: data.bio || '',
          profileImage: profileImage
        });
        
      } catch (err) {
        console.error('Error fetching consultant data:', err);
        setCspError(err.message || 'خطا در بارگذاری اطلاعات');
      } finally {
        setCspLoading(false);
        setCspImageLoading(false);
      }
    };
    
    fetchConsultantData();
  }, []);

  // وقتی عکس تغییر میکنه، error رو reset کن
  useEffect(() => {
    setCspImageError(false);
    setCspImageLoading(true);
  }, [cspConsultant.profileImage]);

  const cspFormatCurrency = (amount) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
  };

  // ========== توابع ویرایش پروفایل ==========
  
  const cspOpenEditModal = () => {
    setCspEditForm({
      name: cspConsultant.name,
      phone: cspConsultant.phone,
      email: cspConsultant.email || '',
      specialty: cspConsultant.specialty,
      experience: cspConsultant.experience.toString(),
      bio: cspConsultant.bio || ''
    });
    setCspShowEditModal(true);
  };

  const cspHandleEditFormChange = (e) => {
    const { name, value } = e.target;
    setCspEditForm(prev => ({ ...prev, [name]: value }));
  };

  const cspHandleUpdateProfile = async (e) => {
    e.preventDefault();
    setCspSaving(true);
    
    try {
      const updateData = {
        fullName: cspEditForm.name,
        mobile: cspEditForm.phone,
        email: cspEditForm.email,
        specialty: cspEditForm.specialty,
        experience: parseInt(cspEditForm.experience),
        bio: cspEditForm.bio
      };
      
      await consultantService.updateConsultantProfile(updateData);
      
      setCspConsultant(prev => ({
        ...prev,
        name: cspEditForm.name,
        phone: cspEditForm.phone,
        email: cspEditForm.email,
        specialty: cspEditForm.specialty,
        experience: parseInt(cspEditForm.experience),
        bio: cspEditForm.bio
      }));
      
      cspShowToast('پروفایل با موفقیت ویرایش شد', 'success');
      setCspShowEditModal(false);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      cspShowToast(error.response?.data?.message || 'خطا در ویرایش پروفایل', 'error');
    } finally {
      setCspSaving(false);
    }
  };

  // ========== توابع تغییر پسورد ==========
  
  const cspOpenPasswordModal = () => {
    setCspPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setCspShowPasswordModal(true);
  };

  const cspHandlePasswordChange = (e) => {
    const { name, value } = e.target;
    setCspPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const cspHandleChangePassword = async (e) => {
    e.preventDefault();
    
    if (cspPasswordForm.newPassword !== cspPasswordForm.confirmPassword) {
      cspShowToast('رمز عبور جدید و تکرار آن مطابقت ندارند', 'error');
      return;
    }
    
    if (cspPasswordForm.newPassword.length < 6) {
      cspShowToast('رمز عبور جدید باید حداقل ۶ کاراکتر باشد', 'error');
      return;
    }
    
    setCspSaving(true);
    
    try {
      await consultantService.changePassword({
        currentPassword: cspPasswordForm.currentPassword,
        newPassword: cspPasswordForm.newPassword
      });
      
      cspShowToast('رمز عبور با موفقیت تغییر یافت', 'success');
      setCspShowPasswordModal(false);
      
    } catch (error) {
      console.error('Error changing password:', error);
      cspShowToast(error.response?.data?.message || 'خطا در تغییر رمز عبور', 'error');
    } finally {
      setCspSaving(false);
    }
  };

  // ========== توابع آپلود عکس ==========
  
  const cspOpenImageModal = () => {
    const imageUrl = cspConsultant.profileImage 
      ? `https://localhost:7178${cspConsultant.profileImage}`
      : null;
    setCspImagePreview(imageUrl);
    setCspSelectedFile(null);
    setCspImageError(false);
    setCspImageLoading(true);
    setCspShowImageModal(true);
  };

  const cspHandleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        cspShowToast('حجم عکس نباید بیشتر از ۵ مگابایت باشد', 'error');
        return;
      }
      if (!file.type.startsWith('image/')) {
        cspShowToast('فایل انتخابی باید عکس باشد', 'error');
        return;
      }
      setCspSelectedFile(file);
      setCspImagePreview(URL.createObjectURL(file));
      setCspImageError(false);
      setCspImageLoading(false);
    }
  };

  const cspHandleUploadImage = async () => {
    if (!cspSelectedFile) {
      cspShowToast('لطفاً یک عکس انتخاب کنید', 'error');
      return;
    }
    
    setCspUploadingImage(true);
    
    try {
      await consultantService.uploadProfileImage(cspSelectedFile);
      
      const avatarPath = await consultantService.getAvatar();
      
      let newImageUrl = null;
      if (avatarPath && typeof avatarPath === 'string') {
        newImageUrl = avatarPath.startsWith('/') ? avatarPath : `/${avatarPath}`;
      }
      
      setCspConsultant(prev => ({
        ...prev,
        profileImage: newImageUrl
      }));
      
      cspShowToast('عکس پروفایل با موفقیت آپلود شد', 'success');
      setCspShowImageModal(false);
      
    } catch (error) {
      console.error('Error uploading image:', error);
      cspShowToast(error.response?.data?.message || 'خطا در آپلود عکس', 'error');
    } finally {
      setCspUploadingImage(false);
    }
  };

  const cspHandleRemoveImage = async () => {
    if (!window.confirm('آیا از حذف عکس پروفایل مطمئن هستید؟')) return;
    
    setCspUploadingImage(true);
    
    try {
      await consultantService.removeProfileImage();
      
      setCspConsultant(prev => ({
        ...prev,
        profileImage: null
      }));
      
      cspShowToast('عکس پروفایل با موفقیت حذف شد', 'success');
      setCspShowImageModal(false);
      
    } catch (error) {
      console.error('Error removing image:', error);
      cspShowToast(error.response?.data?.message || 'خطا در حذف عکس', 'error');
    } finally {
      setCspUploadingImage(false);
    }
  };

  // ========== کامپوننت StatCard ==========
  const CspStatCard = ({ icon, title, value, trend, color }) => (
    <div className="csp-stat-card">
      <div className="csp-stat-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="csp-stat-info">
        <h4>{title}</h4>
        <p>{value}</p>
        {trend && <span className="csp-stat-trend positive">{trend}</span>}
      </div>
    </div>
  );

  // ========== کامپوننت Avatar - با استفاده از useRef و useEffect ==========
  const CspAvatarComponent = () => {
    const imgRef = useRef(null);
    const [showFallback, setShowFallback] = useState(false);
    
    const imageUrl = cspConsultant.profileImage 
      ? `https://localhost:7178${cspConsultant.profileImage}`
      : null;

    // وقتی imageUrl تغییر میکنه، state رو reset کن
    useEffect(() => {
      setShowFallback(false);
    }, [imageUrl]);

    // اگر عکس وجود نداشت یا خطا داشت، fallback رو نشون بده
    if (!imageUrl || showFallback) {
      return <FaUserTie size={48} />;
    }

    return (
      <img 
        ref={imgRef}
        src={imageUrl}
        alt={cspConsultant.name}
        className="csp-profile-avatar-image"
        onError={() => {
          // فقط state رو تغییر بده، هیچ دسترسی به DOM نداره
          setShowFallback(true);
        }}
        onLoad={() => {
          // عکس با موفقیت لود شد
          setShowFallback(false);
        }}
      />
    );
  };

  if (cspLoading) {
    return (
      <div className="csp-loading-container">
        <FaSpinner className="csp-spinner" />
        <p>در حال بارگذاری اطلاعات...</p>
      </div>
    );
  }

  if (cspError) {
    return (
      <div className="csp-error-container">
        <h3>خطا در بارگذاری</h3>
        <p>{cspError}</p>
        <button onClick={() => window.location.reload()} className="csp-retry-button">
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <div className="csp-consultant-profile-container">
      {cspToast && (
        <div className={`csp-toast-notification ${cspToast.type}`}>
          <span>{cspToast.message}</span>
        </div>
      )}

      <div className="csp-profile-header-modern">
        <div className="csp-header-overlay"></div>
        <div className="csp-profile-info-wrapper">
          <div className="csp-profile-avatar">
            <div 
              className="csp-avatar-circle" 
              onClick={cspOpenImageModal} 
              style={{ cursor: 'pointer' }}
            >
              <CspAvatarComponent />
              <div className="csp-avatar-overlay">
                <FaCamera />
              </div>
            </div>
            <div className="csp-online-status"></div>
          </div>
          <div className="csp-profile-details">
            <div className="csp-name-section">
              <h1>{cspConsultant.name}</h1>
              <span className="csp-specialty-badge">{cspConsultant.specialty}</span>
            </div>
            <div className="csp-contact-section">
              <div className="csp-contact-item">
                <FaPhoneAlt />
                <span>{cspConsultant.phone}</span>
                {cspConsultant.isPhoneVerified && (
                  <span className="csp-verified-badge">
                    <FaCheckCircle />
                    تایید شده
                  </span>
                )}
              </div>
              {cspConsultant.email && (
                <div className="csp-contact-item">
                  <span>📧</span>
                  <span>{cspConsultant.email}</span>
                </div>
              )}
            </div>
            <div className="csp-profile-actions">
              <button className="csp-profile-action-btn csp-edit" onClick={cspOpenEditModal}>
                <FaEdit /> ویرایش پروفایل
              </button>
              <button className="csp-profile-action-btn csp-password" onClick={cspOpenPasswordModal}>
                <FaKey /> تغییر رمز عبور
              </button>
            </div>
            <div className="csp-stats-ribbon">
              <div className="csp-ribbon-item">
                <span className="csp-ribbon-value">{cspConsultant.experience}+</span>
                <span className="csp-ribbon-label">سال تجربه</span>
              </div>
              <div className="csp-ribbon-divider"></div>
              <div className="csp-ribbon-item">
                <span className="csp-ribbon-value">{cspConsultant.rating}</span>
                <span className="csp-ribbon-label">امتیاز</span>
              </div>
              <div className="csp-ribbon-divider"></div>
              <div className="csp-ribbon-item">
                <span className="csp-ribbon-value">{cspConsultant.totalSessions}</span>
                <span className="csp-ribbon-label">جلسه مشاوره</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* بقیه بخش‌ها به همان صورت */}
      <div className="csp-wallet-section">
        <div className="csp-wallet-card">
          <div className="csp-wallet-icon">
            <FaWallet />
          </div>
          <div className="csp-wallet-info">
            <p className="csp-wallet-label">موجودی کیف پول</p>
            <h2 className="csp-wallet-amount">{cspFormatCurrency(cspConsultant.walletBalance)}</h2>
            <button 
              className="csp-charge-button"
              onClick={() => navigate('/charge-wallet')}
            >
              افزایش موجودی
            </button>
          </div>
        </div>
        <div className="csp-quick-stats">
          <CspStatCard 
            icon={<FaEye />}
            title="بازدید کل پروفایل"
            value="5,234"
            trend="+23%"
            color="#4F46E5"
          />
          <CspStatCard 
            icon={<FaUserFriends />}
            title="مشاوره‌های انجام شده"
            value={cspConsultant.totalSessions}
            trend="+12%"
            color="#10B981"
          />
          <CspStatCard 
            icon={<FaThumbsUp />}
            title="رضایت مشتریان"
            value="98%"
            trend="+5%"
            color="#F59E0B"
          />
        </div>
      </div>

      <div className="csp-charts-section">
        <div className="csp-section-header">
          <h2>
            <FaChartLine />
            آمار بازدید و عملکرد
          </h2>
          <div className="csp-date-filter">
            <button className="csp-filter-btn active">سال جاری</button>
            <button className="csp-filter-btn">۶ ماه اخیر</button>
            <button className="csp-filter-btn">۳ ماه اخیر</button>
          </div>
        </div>

        <div className="csp-charts-grid">
          <div className="csp-chart-card csp-large">
            <div className="csp-chart-title">
              <FaArrowUp />
              <h3>روند بازدید ماهانه</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cspMonthlyViews}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="views" 
                  stroke="#4F46E5" 
                  strokeWidth={3}
                  name="تعداد بازدید"
                  dot={{ fill: '#4F46E5', r: 4 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="تعداد جلسات"
                  dot={{ fill: '#10B981', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="csp-chart-card">
            <div className="csp-chart-title">
              <FaChartPie />
              <h3>دسته‌بندی خدمات</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={cspCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {cspCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="csp-chart-card">
            <div className="csp-chart-title">
              <FaChartBar />
              <h3>بازدید هفتگی</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={cspWeeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#4F46E5" name="بازدید" radius={[8, 8, 0, 0]} />
                <Bar dataKey="engagement" fill="#10B981" name="تعامل" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="csp-chart-card csp-large">
            <div className="csp-chart-title">
              <FaChartLine />
              <h3>نرخ تعامل مشتریان</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={cspMonthlyViews.slice(-6)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="sessions" 
                  stackId="1"
                  stroke="#F59E0B" 
                  fill="#F59E0B" 
                  fillOpacity={0.3}
                  name="جلسات مشاوره"
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stackId="1"
                  stroke="#4F46E5" 
                  fill="#4F46E5" 
                  fillOpacity={0.3}
                  name="بازدیدها"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="csp-advanced-stats">
        <div className="csp-stat-box">
          <div className="csp-stat-header">
            <FaCalendarAlt />
            <span>میانگین جلسات ماهانه</span>
          </div>
          <div className="csp-stat-value">34.5</div>
          <div className="csp-stat-change positive">+15% نسبت به ماه قبل</div>
        </div>
        <div className="csp-stat-box">
          <div className="csp-stat-header">
            <FaClock />
            <span>زمان پاسخگویی میانگین</span>
          </div>
          <div className="csp-stat-value">2.4 ساعت</div>
          <div className="csp-stat-change positive">-0.8 ساعت</div>
        </div>
        <div className="csp-stat-box">
          <div className="csp-stat-header">
            <FaUserFriends />
            <span>مشتریان وفادار</span>
          </div>
          <div className="csp-stat-value">187</div>
          <div className="csp-stat-change positive">+28 نفر</div>
        </div>
        <div className="csp-stat-box">
          <div className="csp-stat-header">
            <FaChartLine />
            <span>نرخ تبدیل بازدید به جلسه</span>
          </div>
          <div className="csp-stat-value">8.4%</div>
          <div className="csp-stat-change positive">+2.1%</div>
        </div>
      </div>

      {/* مودال‌ها */}
      {cspShowEditModal && (
        <div className="csp-modal-overlay" onClick={() => setCspShowEditModal(false)}>
          <div className="csp-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="csp-modal-header">
              <h2><FaEdit /> ویرایش پروفایل</h2>
              <button className="csp-modal-close" onClick={() => setCspShowEditModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={cspHandleUpdateProfile}>
              <div className="csp-modal-body">
                <div className="csp-form-group">
                  <label>نام و نام خانوادگی</label>
                  <input
                    type="text"
                    name="name"
                    value={cspEditForm.name}
                    onChange={cspHandleEditFormChange}
                    required
                  />
                </div>
                <div className="csp-form-group">
                  <label>شماره موبایل</label>
                  <input
                    type="text"
                    name="phone"
                    value={cspEditForm.phone}
                    onChange={cspHandleEditFormChange}
                    required
                  />
                </div>
                <div className="csp-form-group">
                  <label>ایمیل (اختیاری)</label>
                  <input
                    type="email"
                    name="email"
                    value={cspEditForm.email}
                    onChange={cspHandleEditFormChange}
                  />
                </div>
                <div className="csp-form-group">
                  <label>تخصص</label>
                  <input
                    type="text"
                    name="specialty"
                    value={cspEditForm.specialty}
                    onChange={cspHandleEditFormChange}
                    required
                  />
                </div>
                <div className="csp-form-group">
                  <label>سال‌های تجربه</label>
                  <input
                    type="number"
                    name="experience"
                    value={cspEditForm.experience}
                    onChange={cspHandleEditFormChange}
                    min="0"
                    required
                  />
                </div>
                <div className="csp-form-group">
                  <label>بیوگرافی</label>
                  <textarea
                    name="bio"
                    value={cspEditForm.bio}
                    onChange={cspHandleEditFormChange}
                    rows="3"
                    placeholder="درباره خودتان بنویسید..."
                  />
                </div>
              </div>
              <div className="csp-modal-footer">
                <button type="button" onClick={() => setCspShowEditModal(false)}>
                  انصراف
                </button>
                <button type="submit" disabled={cspSaving}>
                  {cspSaving ? <FaSpinner className="csp-spinner" /> : <FaSave />}
                  {cspSaving ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {cspShowPasswordModal && (
        <div className="csp-modal-overlay" onClick={() => setCspShowPasswordModal(false)}>
          <div className="csp-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="csp-modal-header">
              <h2><FaKey /> تغییر رمز عبور</h2>
              <button className="csp-modal-close" onClick={() => setCspShowPasswordModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={cspHandleChangePassword}>
              <div className="csp-modal-body">
                <div className="csp-form-group">
                  <label>رمز عبور فعلی</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={cspPasswordForm.currentPassword}
                    onChange={cspHandlePasswordChange}
                    required
                  />
                </div>
                <div className="csp-form-group">
                  <label>رمز عبور جدید</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={cspPasswordForm.newPassword}
                    onChange={cspHandlePasswordChange}
                    required
                    minLength="6"
                  />
                </div>
                <div className="csp-form-group">
                  <label>تکرار رمز عبور جدید</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={cspPasswordForm.confirmPassword}
                    onChange={cspHandlePasswordChange}
                    required
                    minLength="6"
                  />
                </div>
              </div>
              <div className="csp-modal-footer">
                <button type="button" onClick={() => setCspShowPasswordModal(false)}>
                  انصراف
                </button>
                <button type="submit" disabled={cspSaving}>
                  {cspSaving ? <FaSpinner className="csp-spinner" /> : <FaKey />}
                  {cspSaving ? 'در حال تغییر...' : 'تغییر رمز عبور'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {cspShowImageModal && (
        <div className="csp-modal-overlay" onClick={() => setCspShowImageModal(false)}>
          <div className="csp-modal-content csp-image-modal" onClick={(e) => e.stopPropagation()}>
            <div className="csp-modal-header">
              <h2><FaCamera /> عکس پروفایل</h2>
              <button className="csp-modal-close" onClick={() => setCspShowImageModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="csp-modal-body">
              <div className="csp-image-upload-container">
                <div className="csp-image-preview-large">
                  {cspImagePreview ? (
                    <img 
                      src={cspImagePreview} 
                      alt="Profile" 
                      className="csp-preview-image"
                      onError={() => {
                        setCspImagePreview(null);
                      }}
                    />
                  ) : (
                    <div className="csp-image-placeholder">
                      <FaUserCircle size={80} />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={cspHandleFileSelect}
                  style={{ display: 'none' }}
                />
                <div className="csp-image-upload-actions">
                  <button 
                    type="button"
                    className="csp-btn-select-image"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FaCamera /> انتخاب عکس
                  </button>
                  {cspSelectedFile && (
                    <button 
                      type="button"
                      className="csp-btn-upload-image"
                      onClick={cspHandleUploadImage}
                      disabled={cspUploadingImage}
                    >
                      {cspUploadingImage ? <FaSpinner className="csp-spinner" /> : <FaSave />}
                      {cspUploadingImage ? 'در حال آپلود...' : 'آپلود عکس'}
                    </button>
                  )}
                  {cspConsultant.profileImage && (
                    <button 
                      type="button"
                      className="csp-btn-remove-image"
                      onClick={cspHandleRemoveImage}
                      disabled={cspUploadingImage}
                    >
                      <FaTrash /> حذف عکس
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantProfile;