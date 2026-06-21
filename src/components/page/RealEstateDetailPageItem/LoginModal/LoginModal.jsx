// src/components/LoginModal/LoginModal.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaPhone, FaUser, FaLock, FaCheckCircle, 
  FaArrowRight, FaSpinner, FaSync 
} from 'react-icons/fa';
import './LoginModal.css';

/**
 * کامپوننت مودال لاگین/ثبت‌نام
 * قابل استفاده در تمام صفحات پروژه
 * 
 * @param {Object} props
 * @param {Function} props.onClose - تابع بستن مودال
 * @param {Function} props.onSuccess - تابع بعد از لاگین موفق (اختیاری)
 * @param {string} props.redirectTo - آدرس برای هدایت بعد از لاگین (اختیاری)
 * @param {string} props.triggerSource - منبع باز شدن مودال (برای دیباگ)
 */
const LoginModal = ({ 
  onClose, 
  onSuccess, 
  redirectTo, 
  triggerSource = 'unknown' 
}) => {
  const navigate = useNavigate();
  
  // ===== State‌ها =====
  const [step, setStep] = useState('phone'); // 'phone' | 'login' | 'register'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // ===== State کپچا =====
  const [captchaId, setCaptchaId] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaLoading, setCaptchaLoading] = useState(false);

  const API_BASE_URL = 'https://localhost:7178/api';

  // ============================================================
  // ===== دریافت کپچا =====
  // ============================================================
  const fetchCaptcha = useCallback(async () => {
    setCaptchaLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/Auth/captcha`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const result = await response.json();
      console.log('📦 کپچا دریافت شد:', result);
      
      if (result.captchaId && result.image) {
        setCaptchaId(result.captchaId);
        setCaptchaImage(result.image);
        setCaptchaValue('');
      }
    } catch (error) {
      console.error('❌ خطا در دریافت کپچا:', error);
    } finally {
      setCaptchaLoading(false);
    }
  }, []);

  // ===== دریافت کپچا هنگام باز شدن مودال =====
  useEffect(() => {
    fetchCaptcha();
    
    // لاگ برای دیباگ
    console.log(`🔐 مودال لاگین باز شد - منبع: ${triggerSource}`);
  }, [fetchCaptcha, triggerSource]);

  // ============================================================
  // ===== جلوگیری از اسکرول بدنه =====
  // ============================================================
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // ============================================================
  // ===== تابع بررسی شماره موبایل با کپچا =====
  // ============================================================
  const checkPhoneNumber = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('لطفاً شماره موبایل معتبر وارد کنید');
      return;
    }

    if (!captchaValue || captchaValue.length < 4) {
      setError('لطفاً کد امنیتی را وارد کنید');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      console.log('📡 بررسی شماره با کپچا:', { 
        phone: phoneNumber, 
        captchaId, 
        captchaValue 
      });

      const response = await fetch(`${API_BASE_URL}/Auth/CheckUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: phoneNumber,
          captchaId: captchaId,
          captchaValue: captchaValue
        }),
      });

      const result = await response.json();
      console.log('📦 نتیجه بررسی:', result);

      if (result.success === true) {
        setStep('login');
        setError('');
      } else if (result.success === false && result.message === 'کاربر یافت نشد') {
        setStep('register');
        setError('');
      } else {
        setError(result.message || 'خطا در بررسی اطلاعات');
        fetchCaptcha();
      }
    } catch (error) {
      console.error('❌ خطا در بررسی شماره:', error);
      setError('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
      fetchCaptcha();
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // ===== تابع لاگین =====
  // ============================================================
  const handleLogin = async () => {
    if (!username || !password) {
      setError('لطفاً نام کاربری و رمز عبور را وارد کنید');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('📡 درخواست لاگین:', { username, phone: phoneNumber });

      const response = await fetch(`${API_BASE_URL}/Auth/Login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          phone: phoneNumber
        }),
      });

      const result = await response.json();
      console.log('📦 نتیجه لاگین:', result);

      if (result.status === 200 && result.data) {
        // ذخیره توکن و اطلاعات کاربر
        localStorage.setItem('auth_token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        
        // ارسال رویداد برای اطلاع‌رسانی به سایر کامپوننت‌ها
        window.dispatchEvent(new Event('authChange'));
        
        // فراخوانی تابع onSuccess اگر وجود داشته باشد
        if (onSuccess) {
          onSuccess(result.data.user);
        }
        
        // بستن مودال
        onClose();
        
        // هدایت به آدرس مورد نظر
        if (redirectTo) {
          navigate(redirectTo);
        } else {
          // رفرش صفحه برای به‌روزرسانی وضعیت
          window.location.reload();
        }
      } else {
        setError(result.message || 'نام کاربری یا رمز عبور اشتباه است');
      }
    } catch (error) {
      console.error('❌ خطا در لاگین:', error);
      setError('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // ===== تابع ثبت‌نام =====
  // ============================================================
  const handleRegister = async () => {
    if (!username || username.length < 3) {
      setError('نام کاربری باید حداقل ۳ کاراکتر باشد');
      return;
    }
    if (!password || password.length < 6) {
      setError('رمز عبور باید حداقل ۶ کاراکتر باشد');
      return;
    }
    if (password !== confirmPassword) {
      setError('رمز عبور و تکرار آن مطابقت ندارند');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('📡 درخواست ثبت‌نام:', { username, phone: phoneNumber });

      const response = await fetch(`${API_BASE_URL}/Auth/Register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          phone: phoneNumber,
          name: username
        }),
      });

      const result = await response.json();
      console.log('📦 نتیجه ثبت‌نام:', result);

      if (result.status === 200 || result.status === 201) {
        // بعد از ثبت‌نام، لاگین خودکار
        const loginResponse = await fetch(`${API_BASE_URL}/Auth/Login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
            phone: phoneNumber
          }),
        });

        const loginResult = await loginResponse.json();

        if (loginResult.status === 200 && loginResult.data) {
          localStorage.setItem('auth_token', loginResult.data.token);
          localStorage.setItem('user', JSON.stringify(loginResult.data.user));
          
          window.dispatchEvent(new Event('authChange'));
          
          if (onSuccess) {
            onSuccess(loginResult.data.user);
          }
          
          onClose();
          
          if (redirectTo) {
            navigate(redirectTo);
          } else {
            window.location.reload();
          }
        } else {
          setError('ثبت‌نام موفق بود. لطفاً وارد شوید.');
          setStep('login');
        }
      } else {
        setError(result.message || 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.');
      }
    } catch (error) {
      console.error('❌ خطا در ثبت‌نام:', error);
      setError('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // ===== توابع کمکی =====
  // ============================================================
  const handleBack = () => {
    setStep('phone');
    setError('');
    setCaptchaValue('');
    fetchCaptcha();
  };

  const goToRegisterPage = () => {
    onClose();
    navigate('/register', { 
      state: { 
        from: window.location.pathname,
        phone: phoneNumber
      } 
    });
  };

  // ============================================================
  // ===== رندر استپ‌ها =====
  // ============================================================
  
  // ===== مرحله شماره موبایل =====
  const renderPhoneStep = () => (
    <>
      <div className="login-modal-icon">
        <FaPhone className="login-modal-phone-icon" />
      </div>
      
      <h2 className="login-modal-title">ورود / ثبت‌نام</h2>
      <p className="login-modal-description">
        برای ادامه، لطفاً شماره موبایل خود را وارد کنید
      </p>

      <div className="login-phone-input-wrapper">
        <div className="login-phone-prefix">+98</div>
        <input
          type="tel"
          className="login-phone-input"
          placeholder="۹۱۲۳۴۵۶۷۸۹"
          value={phoneNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
              setPhoneNumber(value);
            }
          }}
          maxLength="11"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              checkPhoneNumber();
            }
          }}
        />
      </div>

      {/* بخش کپچا */}
      <div className="login-captcha-container">
        <div className="login-captcha-image-wrapper">
          {captchaLoading ? (
            <div className="login-captcha-loading">
              <FaSpinner className="login-spinner" />
            </div>
          ) : (
            <img 
              src={captchaImage} 
              alt="کد امنیتی" 
              className="login-captcha-image"
            />
          )}
          <button 
            className="login-captcha-refresh-btn"
            onClick={fetchCaptcha}
            disabled={captchaLoading}
            title="تغییر کد امنیتی"
          >
            <FaSync className={captchaLoading ? 'login-spinner' : ''} />
          </button>
        </div>
        
        <input
          type="text"
          className="login-captcha-input"
          placeholder="کد امنیتی را وارد کنید"
          value={captchaValue}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            if (value.length <= 4) {
              setCaptchaValue(value);
            }
          }}
          maxLength="4"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              checkPhoneNumber();
            }
          }}
        />
      </div>

      {error && <div className="login-error-message">{error}</div>}

      <button 
        className="login-modal-submit-btn"
        onClick={checkPhoneNumber}
        disabled={loading || phoneNumber.length < 10 || captchaValue.length < 4}
      >
        {loading ? (
          <>
            <FaSpinner className="login-spinner" />
            در حال بررسی...
          </>
        ) : (
          <>
            ادامه
            <FaArrowRight />
          </>
        )}
      </button>

      <p className="login-modal-footer-text">
        با ادامه، شما با <a href="/terms">قوانین</a> موافقت می‌کنید
      </p>
    </>
  );

  // ===== مرحله لاگین =====
  const renderLoginStep = () => (
    <>
      <button className="login-modal-back-btn" onClick={handleBack}>
        ← بازگشت
      </button>

      <div className="login-modal-icon">
        <FaUser className="login-modal-login-icon" />
      </div>
      
      <h2 className="login-modal-title">خوش آمدید</h2>
      <p className="login-modal-description">
        شماره <strong>{phoneNumber}</strong> در سامانه ثبت شده است
        <br />
        لطفاً وارد شوید
      </p>

      <div className="login-input-group">
        <div className="login-input-wrapper">
          <FaUser className="login-input-icon" />
          <input
            type="text"
            className="login-modal-input"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
          />
        </div>

        <div className="login-input-wrapper">
          <FaLock className="login-input-icon" />
          <input
            type="password"
            className="login-modal-input"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
          />
        </div>
      </div>

      {error && <div className="login-error-message">{error}</div>}

      <button 
        className="login-modal-submit-btn"
        onClick={handleLogin}
        disabled={loading || !username || !password}
      >
        {loading ? (
          <>
            <FaSpinner className="login-spinner" />
            در حال ورود...
          </>
        ) : (
          <>
            ورود
            <FaArrowRight />
          </>
        )}
      </button>

      <button className="login-modal-guest-btn" onClick={onClose}>
        ادامه به عنوان مهمان
      </button>
    </>
  );

  // ===== مرحله ثبت‌نام =====
  const renderRegisterStep = () => (
    <>
      <button className="login-modal-back-btn" onClick={handleBack}>
        ← بازگشت
      </button>

      <div className="login-modal-icon">
        <FaUser className="login-modal-register-icon" />
      </div>
      
      <h2 className="login-modal-title">ثبت‌نام</h2>
      <p className="login-modal-description">
        شماره <strong>{phoneNumber}</strong> در سامانه ثبت نشده است
        <br />
        لطفاً ثبت‌نام کنید
      </p>

      <div className="login-input-group">
        <div className="login-input-wrapper">
          <FaUser className="login-input-icon" />
          <input
            type="text"
            className="login-modal-input"
            placeholder="نام کاربری (حداقل ۳ کاراکتر)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleRegister();
              }
            }}
          />
        </div>

        <div className="login-input-wrapper">
          <FaLock className="login-input-icon" />
          <input
            type="password"
            className="login-modal-input"
            placeholder="رمز عبور (حداقل ۶ کاراکتر)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleRegister();
              }
            }}
          />
        </div>

        <div className="login-input-wrapper">
          <FaCheckCircle className="login-input-icon" />
          <input
            type="password"
            className="login-modal-input"
            placeholder="تکرار رمز عبور"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleRegister();
              }
            }}
          />
        </div>
      </div>

      {error && <div className="login-error-message">{error}</div>}

      <button 
        className="login-modal-submit-btn"
        onClick={handleRegister}
        disabled={loading || !username || !password || !confirmPassword}
      >
        {loading ? (
          <>
            <FaSpinner className="login-spinner" />
            در حال ثبت‌نام...
          </>
        ) : (
          <>
            ثبت‌نام
            <FaArrowRight />
          </>
        )}
      </button>

      <button 
        className="login-modal-guest-btn" 
        onClick={goToRegisterPage}
      >
        ثبت‌نام کامل در صفحه جداگانه
      </button>
    </>
  );

  // ============================================================
  // ===== رندر اصلی =====
  // ============================================================
  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal-close-btn" onClick={onClose}>✕</button>
        
        {step === 'phone' && renderPhoneStep()}
        {step === 'login' && renderLoginStep()}
        {step === 'register' && renderRegisterStep()}
        
        <div className="login-modal-benefits">
          <span>✅ ثبت‌نام رایگان</span>
          <span>🔒 امن و مطمئن</span>
          <span>⚡ کمتر از ۱ دقیقه</span>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;