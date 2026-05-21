
// // export default MainLayout;

// import React, { useState, useEffect } from 'react';
// import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
// import './MainLayout.css';
// import CityModal from './CityModal';
// import { useAuth } from '../../context/AuthContext';

// const MainLayout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [isCityModalOpen, setIsCityModalOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const { user } = useAuth();

//   // بارگذاری شهر ذخیره شده
//   useEffect(() => {
//     const savedCity = localStorage.getItem('selectedCity');
//     if (savedCity) {
//       try {
//         setSelectedCity(JSON.parse(savedCity));
//       } catch (e) {
//         console.error('Error loading city:', e);
//       }
//     } else {
//       // اگر شهری ذخیره نشده، بعد از 1 ثانیه مودال رو باز کن
//       const timer = setTimeout(() => {
//         setIsCityModalOpen(true);
//       }, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, []);

//   const handleSelectCity = (city) => {
//     setSelectedCity(city);
//     localStorage.setItem('selectedCity', JSON.stringify(city));
//     setIsCityModalOpen(false);
//   };

//   const menuItems = [
//     { path: '/', label: 'صفحه اصلی', icon: '🏠' },
//     { path: '/search', label: 'جستجوی ملک', icon: '🔍' },
//       { path: '/map-search', label: 'جستجوی نقشه', icon: '🗺️' },  // گزینه جدید
//     { path: '/UserPropertiesPanel', label: 'ثبت آگهی', icon: '📝' },
//     { path: '/agencies', label: 'آژانس‌ها', icon: '🏢' },
//   ];

//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location.pathname]);

//   return (
//     <div className="main-layout">
//       <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
//         <div className="header-container">
//           <div className="logo" onClick={() => navigate('/')}>
//             <span className="logo-icon">🏡</span>
//             <span className="logo-text">خونه‌یاب</span>
//           </div>

//           {/* سلیکتور شهر خوشگل */}
//           <div className="city-selector-modern" onClick={() => setIsCityModalOpen(true)}>
//             <div className="city-selector-icon">
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" fill="none"/>
//                 <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
//               </svg>
//             </div>
//             <span className="city-selector-name">
//               {selectedCity ? selectedCity.name : 'انتخاب شهر'}
//             </span>
//             <span className="city-selector-arrow">⌵</span>
//           </div>

//           <nav className="desktop-menu">
//             {menuItems.map(item => (
//               <Link key={item.path} to={item.path} className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}>
//                 <span className="menu-icon">{item.icon}</span>
//                 <span className="menu-label">{item.label}</span>
//               </Link>
//             ))}
//           </nav>

//           <div className="auth-buttons">
//             {user ? (
//               <button className="btn-login" onClick={() => navigate('/dashboard')}>
//                 <span>👤</span>
//                 <span>{user?.username || 'کاربر'}</span>
//               </button>
//             ) : (
//               <>
//                 <button className="btn-login" onClick={() => navigate('/login')}>ورود</button>
//                 <button className="btn-register" onClick={() => navigate('/register')}>ثبت‌نام</button>
//               </>
//             )}
//           </div>

//           <button className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//             <span></span><span></span><span></span>
//           </button>
//         </div>

//         <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
//           <div className="mobile-city-item" onClick={() => { setIsCityModalOpen(true); setIsMobileMenuOpen(false); }}>
//             <span>📍</span>
//             <span>{selectedCity ? selectedCity.name : 'انتخاب شهر'}</span>
//           </div>
//           <div className="mobile-menu-divider"></div>
//           {menuItems.map(item => (
//             <Link key={item.path} to={item.path} className="mobile-menu-item" onClick={() => setIsMobileMenuOpen(false)}>
//               <span className="menu-icon">{item.icon}</span>
//               <span className="menu-label">{item.label}</span>
//             </Link>
//           ))}
//         </div>
//       </header>

//       <main className="main-content">
//         <Outlet context={{ selectedCity }} />
//       </main>

//       <CityModal
//         isOpen={isCityModalOpen}
//         onClose={() => {
//           if (selectedCity) setIsCityModalOpen(false);
//         }}
//         onSelect={handleSelectCity}
//         selectedCity={selectedCity}
//       />

//       <footer className="main-footer">...</footer>
//     </div>
//   );
// };

// export default MainLayout;

// MainLayout.js - Improved Version
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './MainLayout.css';
import CityModal from './CityModal';
import { useAuth } from '../../context/AuthContext';

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // بارگذاری شهر ذخیره شده
  useEffect(() => {
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
      try {
        setSelectedCity(JSON.parse(savedCity));
      } catch (e) {
        console.error('Error loading city:', e);
      }
    } else {
      const timer = setTimeout(() => {
        setIsCityModalOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    localStorage.setItem('selectedCity', JSON.stringify(city));
    setIsCityModalOpen(false);
  };

  const menuItems = [
    { path: '/', label: 'صفحه اصلی', icon: '🏠' },
    { path: '/search', label: 'جستجوی ملک', icon: '🔍' },
    { path: '/map-search', label: 'جستجوی نقشه', icon: '🗺️' },
    { path: '/UserPropertiesPanel', label: 'ثبت آگهی', icon: '📝' },
    { path: '/agencies', label: 'آژانس‌ها', icon: '🏢' },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="main-layout">
      <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="logo" onClick={() => navigate('/')}>
            <span className="logo-icon">🏡</span>
            <span className="logo-text">خونه‌یاب</span>
          </div>

          <div className="city-selector-modern" onClick={() => setIsCityModalOpen(true)}>
            <div className="city-selector-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <span className="city-selector-name">
              {selectedCity ? selectedCity.name : 'انتخاب شهر'}
            </span>
            <span className="city-selector-arrow">⌵</span>
          </div>

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

          <div className="auth-buttons">
            {user ? (
              <button className="btn-login" onClick={() => navigate('/dashboard')}>
                <span>👤</span>
                <span>{user?.username || 'کاربر'}</span>
              </button>
            ) : (
              <>
                <button className="btn-login" onClick={() => navigate('/login')}>ورود</button>
                <button className="btn-register" onClick={() => navigate('/register')}>ثبت‌نام</button>
              </>
            )}
          </div>

          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="منو"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div 
            className="mobile-city-item" 
            onClick={() => { 
              setIsCityModalOpen(true); 
              setIsMobileMenuOpen(false); 
            }}
          >
            <span>📍</span>
            <span>{selectedCity ? selectedCity.name : 'انتخاب شهر'}</span>
          </div>
          <div className="mobile-menu-divider"></div>
          {menuItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className="mobile-menu-item" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </Link>
          ))}
          <div className="mobile-menu-divider"></div>
          {!user && (
            <div className="mobile-auth">
              <button className="mobile-login" onClick={() => navigate('/login')}>ورود</button>
              <button className="mobile-register" onClick={() => navigate('/register')}>ثبت‌نام</button>
            </div>
          )}
        </div>
      </header>

      <main className="main-content">
        <Outlet context={{ selectedCity }} />
      </main>

      <CityModal
        isOpen={isCityModalOpen}
        onClose={() => {
          if (selectedCity) setIsCityModalOpen(false);
        }}
        onSelect={handleSelectCity}
        selectedCity={selectedCity}
      />

      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>درباره ما</h4>
            <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
          </div>
          <div className="footer-section">
            <h4>دسترسی سریع</h4>
            <ul>
              <li><a href="/search">جستجوی ملک</a></li>
              <li><a href="/agencies">آژانس‌ها</a></li>
              <li><a href="/blog">وبلاگ</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>تماس با ما</h4>
            <p>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
            <p>ایمیل: info@khoneyab.com</p>
          </div>
        </div>
        <div className="copyright">
          © {new Date().getFullYear()} خونه‌یاب. تمامی حقوق محفوظ است.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;