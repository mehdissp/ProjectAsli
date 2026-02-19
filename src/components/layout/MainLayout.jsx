import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './MainLayout.css';
import useApi from '../../hooks/useApi';
import { authService } from '../../services/auth';
import { useAuth } from '../../context/AuthContext';
const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // تشخیص اسکرول برای تغییر استایل هدر
  useEffect(() => {
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const { data: stats, loading: statsLoading, error: statsError } = useApi(
    () => authService.getDashboardStats ? authService.getDashboardStats() : Promise.resolve(null)
  );
  const { user } = useAuth();
console.log(user, '************************************');
// یا اگر می‌خواید بدونید loading یا error چی هستن:
console.log({ stats, statsLoading, statsError }, '********** وضعیت API **********');
  // منوها
  const menuItems = [
    { path: '/', label: 'صفحه اصلی', icon: '🏠' },
    { path: '/search', label: 'جستجوی ملک', icon: '🔍' },
    { path: '/register', label: 'ثبت آگهی', icon: '📝' },
    { path: '/agencies', label: 'آژانس‌های ملک', icon: '🏢' },
    { path: '/cities', label: 'ایران شهرستان', icon: '🌍' }
  ];

  // بستن منوی موبایل بعد از تغییر مسیر
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="main-layout">
      {/* هدر */}
      <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* لوگو */}
          <div className="logo" onClick={() => navigate('/')}>
            <span className="logo-icon">🏡</span>
            <span className="logo-text">ملک‌چی</span>
          </div>

          {/* منوی دسکتاپ */}
          <nav className="desktop-menu">
            {menuItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* دکمه‌های ورود و ثبت‌نام */}
          


<div className="auth-buttons">
  {user ? (
    <>


       <button className="btn-login" onClick={() => navigate('/dashboard')}>
        <span>👤</span>
        <span> {user?.username || 'کاربر'} 👋پنل کاربری</span>
      </button>
    </>
    // اگر کاربر لاگین کرده بود، دکمه داشبورد نشون بده
  
  ) : (
    // اگر کاربر لاگین نکرده بود، دکمه‌های ورود و ثبت‌نام نشون بده
    <>
      <button className="btn-login" onClick={() => navigate('/login')}>
        <span>👤</span>
        <span>ورود</span>
      </button>
      <button className="btn-register" onClick={() => navigate('/register')}>
        ثبت‌نام
      </button>
    </>
  )}
</div>

          {/* دکمه همبرگری موبایل */}
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* منوی موبایل */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-menu-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </Link>
          ))}
          <div className="mobile-auth">
            <button className="mobile-login" onClick={() => navigate('/login')}>
              <span>👤</span>
              <span>ورود به حساب</span>
            </button>
            <button className="mobile-register" onClick={() => navigate('/register')}>
              ثبت‌نام
            </button>
          </div>
        </div>
      </header>

      {/* محتوای اصلی - هر صفحه اینجا رندر میشه */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* فوتر */}
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>درباره ما</h4>
            <p>اولین سایت تخصصی ملکی در ایران با بیش از ۱۰ سال سابقه</p>
          </div>
          <div className="footer-section">
            <h4>لینک‌های سریع</h4>
            <ul>
              <li><Link to="/">صفحه اصلی</Link></li>
              <li><Link to="/search">جستجوی ملک</Link></li>
              <li><Link to="/register">ثبت آگهی</Link></li>
              <li><Link to="/agencies">آژانس‌ها</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>تماس با ما</h4>
            <p>📞 ۰۲۱-۱۲۳۴۵۶۷۸</p>
            <p>✉️ info@melkchi.ir</p>
          </div>
        </div>
        <div className="copyright">
          تمامی حقوق برای ملک‌چی محفوظ است © ۱۴۰۴
        </div>
      </footer>

      {/* اویرلی برای منوی موبایل */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </div>
  );
};

export default MainLayout;