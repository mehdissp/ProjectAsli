// components/auth/Captcha/Captcha.jsx
import React from 'react';
import './Captcha.css';

const Captcha = ({ captchaData, value, onChange, onRefresh }) => {
  if (!captchaData) {
    return <div>در حال بارگذاری کپچا...</div>;
  }

  return (
    <div className="captcha-container fade-in">
      <label className="captcha-label">کد امنیتی</label>
      
      <div className="captcha-display">
        <div 
          className="captcha-image-container"
          onClick={onRefresh}
        >
          <img 
            src={captchaData.image} 
            alt="CAPTCHA" 
            className="captcha-image"
          />
          <div className="captcha-overlay">
            <span className="refresh-icon">🔄</span>
            <span className="refresh-text">کلیک برای بارگذاری مجدد</span>
          </div>
        </div>
        
        <button 
          type="button" 
          onClick={onRefresh}
          className="captcha-refresh-btn btn btn-secondary"
          aria-label="بارگذاری مجدد کپچا"
        >
          <span className="refresh-icon">🔄</span>
          جدید
        </button>
      </div>
      
      <input
        type="text"
        name="captcha"
        value={value}
        onChange={onChange}
        className="captcha-input form-input"
        placeholder="کد نمایش داده شده را وارد کنید"
        required
        autoComplete="off"
      />
    </div>
  );
};

export default Captcha;