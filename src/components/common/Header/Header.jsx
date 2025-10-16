import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './Header.css';

const Header = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('fa-IR');
  const formattedDate = currentTime.toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-left">
        <button 
          className="menu-toggle"
          onClick={onToggleSidebar}
          aria-label="باز کردن منو"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div className="welcome-message">
          <h1 className="greeting">سلام، {user?.username || 'کاربر'} 👋</h1>
          <p className="welcome-text">خوش آمدید به پنل مدیریت</p>
        </div>
      </div>

      <div className="header-right">
        <div className="time-display">
          <div className="time">{formattedTime}</div>
          <div className="date">{formattedDate}</div>
        </div>
        
        <div className="user-menu">
          <div className="user-avatar">
            {user?.name?.charAt(0) || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;