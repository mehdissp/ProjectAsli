import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './Header.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
const Header = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isScrolled, setIsScrolled] = useState(false);

    const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const navigate = useNavigate();
 // داده‌های نمونه برای اعلان‌ها
  useEffect(() => {
    const sampleNotifications = [
      {
        id: 1,
        title: 'سفارش جدید',
        message: 'یک سفارش جدید ثبت شده است',
        time: '۲ دقیقه پیش',
        type: 'success',
        read: false,
        icon: '🛒'
      },
      {
        id: 2,
        title: 'پیام جدید',
        message: 'شما یک پیام جدید دارید',
        time: '۵ دقیقه پیش',
        type: 'info',
        read: false,
        icon: '💬'
      },
      {
        id: 3,
        title: 'بروزرسانی سیستم',
        message: 'بروزرسانی سیستم انجام شد',
        time: '۱ ساعت پیش',
        type: 'warning',
        read: true,
        icon: '⚡'
      }
    ];
    setNotifications(sampleNotifications);
  }, []);

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

    const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  const handleProfileClick = () => {
    navigate('/profile');
   
  };
  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };
    const getProfileImageUrl = () => {
    return user.avatar || user?.avatar;
  };
  const formattedTime = currentTime.toLocaleTimeString('fa-IR');
  const formattedDate = currentTime.toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const unreadCount = notifications.filter(notif => !notif.read).length;
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
         {/* بخش نوتیفیکیشن */}
        <div className="notification-wrapper">
          <button 
            className="notification-bell"
            onClick={toggleNotifications}
            aria-label="اعلان‌ها"
          >
            <div className="bell-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path 
                  d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {/* دراپ‌دان اعلان‌ها */}
          {showNotifications && (
            <>
              <div 
                className="notification-backdrop"
                onClick={() => setShowNotifications(false)}
              />
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3>اعلان‌ها</h3>
                  <div className="notification-actions">
                    {unreadCount > 0 && (
                      <button 
                        className="mark-all-read"
                        onClick={markAllAsRead}
                      >
                        خواندن همه
                      </button>
                    )}
                    <button 
                      className="close-notifications"
                      onClick={() => setShowNotifications(false)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
                
                <div className="notification-list">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="notification-icon">
                          <div className={`icon-bubble ${notification.type}`}>
                            {notification.icon}
                          </div>
                        </div>
                        <div className="notification-content">
                          <div className="notification-title">
                            {notification.title}
                            {!notification.read && <div className="unread-indicator"></div>}
                          </div>
                          <div className="notification-message">
                            {notification.message}
                          </div>
                          <div className="notification-time">
                            {notification.time}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-notifications">
                      <div className="empty-icon">🔔</div>
                      <p>هیچ اعلان جدیدی وجود ندارد</p>
                    </div>
                  )}
                </div>
                
                <div className="notification-footer">
                  <button className="view-all-btn">
                    مشاهده همه اعلان‌ها
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="user-menu">
          <div className="user-avatar">
            {/* {user?.username?.charAt(0) || 'U'} */}

                 {getProfileImageUrl() ? (
                  <img 
                    src={getProfileImageUrl()} 
                    alt="Profile" 
                    className="user-avatar  profile-image"
                     onClick={handleProfileClick}
                    onError={(e) => {
                      // اگر تصویر لود نشد، آواتار پیش‌فرض نشان داده شود
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : null}
                
                {!getProfileImageUrl() && (
                  <div >
                    {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
                  </div>
                )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;