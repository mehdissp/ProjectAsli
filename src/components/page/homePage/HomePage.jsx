import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './HomePage.css';
import { useNavigate } from 'react-router-dom'; // اضافه کردن useNavigate

const HomePage = () => {
  const { login } = useAuth();
    const navigate = useNavigate(); // استفاده از useNavigate
  // اسلایدر هیرو
  const heroSlides = [
    {
      id: 1,
      title: "مدیریت پروژه‌ها به سبک Trello",
      description: "با پنل مدیریت Trello فارسی، پروژه‌های خود را به راحتی سازماندهی کنید",
      image: "🎯",
      bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      title: "همکاری تیمی کارآمد",
      description: "با تیم خود به راحتی همکاری و پروژه‌ها را پیگیری کنید",
      image: "👥",
      bgGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      title: "سریع و قدرتمند",
      description: "رابط کاربری سریع و intuitive برای کارایی بهتر",
      image: "⚡",
      bgGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  ];

  // اسلایدر لوگوی شرکت‌ها
  const companies = [
    { id: 1, name: 'شرکت نمونه ۱', logo: '🏢' },
    { id: 2, name: 'شرکت نمونه ۲', logo: '🏛️' },
    { id: 3, name: 'شرکت نمونه ۳', logo: '💼' },
    { id: 4, name: 'شرکت نمونه ۴', logo: '🏭' },
    { id: 5, name: 'شرکت نمونه ۵', logo: '🎯' },
    { id: 6, name: 'شرکت نمونه ۶', logo: '🚀' },
    { id: 7, name: 'شرکت نمونه ۷', logo: '⭐' },
    { id: 8, name: 'شرکت نمونه ۸', logo: '🔷' },
    { id: 9, name: 'شرکت نمونه ۹', logo: '🏆' },
    { id: 10, name: 'شرکت نمونه ۱۰', logo: '💎' }
  ];

  const features = [
    {
      icon: '📋',
      title: 'مدیریت پروژه',
      description: 'پروژه‌های خود را به صورت کارت‌های سازماندهی شده مدیریت کنید'
    },
    {
      icon: '👥',
      title: 'همکاری تیمی',
      description: 'با تیم خود به راحتی همکاری و پروژه‌ها را پیگیری کنید'
    },
    {
      icon: '⚡',
      title: 'سریع و کارآمد',
      description: 'رابط کاربری سریع و intuitive برای کارایی بهتر'
    },
    {
      icon: '🔒',
      title: 'امنیت بالا',
      description: 'اطلاعات شما با بالاترین سطح امنیتی محافظت می‌شود'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // اتوپلی اسلایدر هیرو
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleDemoLogin = () => {
         navigate('/login');
  };

  return (
    <div className="homepage">
      {/* هدر */}
      <nav className="home-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="logo">
              
            </div>
            <span>Trello فارسی</span>
          </div>
          <div className="nav-actions">
            <button 
              className="login-btn"
              onClick={handleDemoLogin}
            >
              ورود به پنل
            </button>
          </div>
        </div>
      </nav>

      {/* اسلایدر بزرگ هیرو */}
      <section className="hero-slider">
        <div 
          className="hero-slide"
          style={{ background: heroSlides[currentSlide].bgGradient }}
        >
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="hero-description">
                {heroSlides[currentSlide].description}
              </p>
              <div className="hero-actions">
                <button 
                  className="cta-button primary"
                  onClick={handleDemoLogin}
                >
                  شروع کنید 🚀
                </button>
                <button className="cta-button secondary">
                  دمو ویدیویی 📹
                </button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-image">
                {heroSlides[currentSlide].image}
              </div>
            </div>
          </div>

          {/* کنترل‌های اسلایدر */}
          <div className="slider-controls">
            <button className="slider-btn prev" onClick={prevSlide}>
              ‹
            </button>
            
            <div className="slider-dots">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            
            <button className="slider-btn next" onClick={nextSlide}>
              ›
            </button>
          </div>

          {/* اتوپلی کنترل */}
          <div className="autoplay-control">
            <button 
              className={`autoplay-btn ${isAutoPlaying ? 'paused' : ''}`}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            >
              {isAutoPlaying ? '⏸️' : '▶️'}
            </button>
          </div>
        </div>
      </section>

      {/* اسلایدر شرکت‌های همکار */}
      <section className="companies-section">
        <div className="container">
          <div className="section-header">
            <h2>شرکت‌های همکار</h2>
            <p>به جمع صدها شرکت موفق بپیوندید</p>
          </div>
          
          <div className="companies-slider">
            <div className="companies-track">
              {/* رندر دو بار برای ایجاد افکت loop */}
              {[...companies, ...companies].map((company, index) => (
                <div key={`${company.id}-${index}`} className="company-logo">
                  <div className="logo-icon">{company.logo}</div>
                  <span className="company-name">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* بخش ویژگی‌ها */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">چرا Trello فارسی؟</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* پیش‌نمایش برد */}
      <section className="preview-section">
        <div className="container">
          <div className="section-header">
            <h2>پیش‌نمایش محیط کاری</h2>
            <p>محیطی شبیه به Trello با امکانات پیشرفته</p>
          </div>
          <div className="board-preview">
            <div className="board-header">
              <div className="board-title">پروژه نمونه</div>
            </div>
            <div className="lists-container">
              <div className="list">
                <div className="list-header">در حال انجام 📝</div>
                <div className="cards">
                  <div className="card">طراحی رابط کاربری</div>
                  <div className="card">توسعه ماژول لاگین</div>
                  <div className="card">بررسی نیازمندی‌ها</div>
                </div>
              </div>
              <div className="list">
                <div className="list-header">در حال بررسی 🔍</div>
                <div className="cards">
                  <div className="card">تست سیستم</div>
                  <div className="card">بازبینی کد</div>
                </div>
              </div>
              <div className="list">
                <div className="list-header">انجام شده ✅</div>
                <div className="cards">
                  <div className="card">تحلیل پروژه</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>آماده شروع هستید؟</h2>
            <p>همین حالا به جامعه هزاران کاربر Trello فارسی بپیوندید</p>
            <button 
              className="cta-button primary large"
              onClick={handleDemoLogin}
            >
              ورود به پنل مدیریت
            </button>
          </div>
        </div>
      </section>

      {/* فوتر */}
      <footer className="home-footer">
        <div className="container">
          <p>© 2024 Trello فارسی - ساخته شده با ❤️ برای جامعه فارسی‌زبان</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;