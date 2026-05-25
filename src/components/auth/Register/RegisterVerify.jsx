import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterVerify.css';

const RegisterVerify = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [userType, setUserType] = useState('');
  const [step, setStep] = useState(1); // step 1: اطلاعات اولیه, step 2: کد تایید
  
  // State های مربوط به کپچا
  const [captchaId, setCaptchaId] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaLoading, setCaptchaLoading] = useState(false);
  
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  let timerInterval = useRef(null);

  // دریافت نوع کاربر از state یا localStorage
  useEffect(() => {
    const type = location.state?.userType || localStorage.getItem('registerType');
    if (type) {
      setUserType(type);
    } else {
      // اگر نوع کاربر انتخاب نشده بود، برگرد به صفحه انتخاب
      toast.error('لطفاً ابتدا نوع عضویت را انتخاب کنید', {
        position: "top-center",
        autoClose: 3000,
        rtl: true,
      });
      navigate('/register');
    }
  }, [location, navigate]);

  // دریافت کپچا
  useEffect(() => {
    if (step === 1) {
      loadCaptcha();
    }
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, [step]);

  // مدیریت تایمر
  useEffect(() => {
    if (timeLeft > 0) {
      timerInterval.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerInterval.current);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && otpSent) {
      setCanResend(true);
    }

    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, [timeLeft, otpSent]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const validateMobileNumber = (number) => {
    const mobileRegex = /^09[0-9]{9}$/;
    return mobileRegex.test(number);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const loadCaptcha = async () => {
    setCaptchaLoading(true);
    try {
      const response = await fetch('https://localhost:7178/api/auth/captcha', {
        method: 'GET',
      });

      const data = await response.json();
      
      if (response.ok && data.captchaId && data.image) {
        setCaptchaId(data.captchaId);
        setCaptchaImage(data.image);
        setCaptchaValue('');
      } else {
        toast.error('خطا در دریافت کد امنیتی', {
          position: "top-center",
          autoClose: 3000,
          rtl: true,
        });
      }
    } catch (error) {
      console.error('Error loading captcha:', error);
      toast.error('خطا در دریافت کد امنیتی', {
        position: "top-center",
        autoClose: 3000,
        rtl: true,
      });
    } finally {
      setCaptchaLoading(false);
    }
  };

  const handleSendOTP = async () => {
    // اعتبارسنجی نام
    if (!fullName.trim()) {
      toast.error('لطفاً نام و نام خانوادگی خود را وارد کنید', {
        position: "top-center",
        autoClose: 3000,
        rtl: true,
      });
      return;
    }

    // اعتبارسنجی شماره موبایل
    if (!validateMobileNumber(mobileNumber)) {
      toast.error('شماره موبایل نامعتبر است! لطفاً یک شماره 11 رقمی با فرمت 09XXXXXXXXX وارد کنید', {
        position: "top-center",
        autoClose: 4000,
        rtl: true,
      });
      return;
    }

    // اعتبارسنجی ایمیل (اختیاری)
    if (email && !validateEmail(email)) {
      toast.error('ایمیل وارد شده نامعتبر است', {
        position: "top-center",
        autoClose: 3000,
        rtl: true,
      });
      return;
    }

    // اعتبارسنجی کپچا
    if (!captchaValue || captchaValue.length !== 4) {
      toast.error('لطفاً کد امنیتی 4 رقمی را وارد کنید', {
        position: "top-center",
        autoClose: 3000,
        rtl: true,
      });
      return;
    }

    setLoading(true);

    try {
      // API فرضی برای ثبت نام اولیه و ارسال OTP
      const response = await fetch('https://localhost:7178/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName,
          mobile: mobileNumber,
          email: email || null,
          userType: userType,
          captchaId: captchaId,
          captchaValue: captchaValue
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setOtpSent(true);
        setStep(2);
        setTimeLeft(data.expiresIn || 300);
        setCanResend(false);
        
        toast.success(data.message || 'کد تایید با موفقیت ارسال شد', {
          position: "top-center",
          autoClose: 3000,
          rtl: true,
        });
        
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      } else {
        if (data.message?.includes('کد امنیتی')) {
          loadCaptcha();
        }
        
        toast.error(data.message || 'خطا در ثبت نام', {
          position: "top-center",
          autoClose: 4000,
          rtl: true,
        });
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('خطا در ارتباط با سرور. لطفاً مجدداً تلاش کنید', {
        position: "top-center",
        autoClose: 4000,
        rtl: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) {
      toast.warning(`لطفاً ${formatTime(timeLeft)} ثانیه صبر کنید`, {
        position: "top-center",
        autoClose: 2000,
        rtl: true,
      });
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7178/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile: mobileNumber }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setTimeLeft(data.expiresIn || 300);
        setCanResend(false);
        toast.success('کد تایید مجدداً ارسال شد', {
          position: "top-center",
          autoClose: 3000,
          rtl: true,
        });
      } else {
        toast.error(data.message || 'خطا در ارسال مجدد کد', {
          position: "top-center",
          autoClose: 3000,
          rtl: true,
        });
      }
    } catch (error) {
      toast.error('خطا در ارتباط با سرور', {
        position: "top-center",
        autoClose: 3000,
        rtl: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value && !/^\d*$/.test(value)) return;

    const newOtp = [...otpCode];
    
    if (value.length === 4) {
      const digits = value.split('');
      for (let i = 0; i < 4 && i < digits.length; i++) {
        if (/^\d$/.test(digits[i])) {
          newOtp[i] = digits[i];
        }
      }
      setOtpCode(newOtp);
      inputRefs.current[3]?.focus();
      return;
    }
    
    newOtp[index] = value.slice(-1);
    setOtpCode(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === 'ArrowRight' && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    if (pastedText && /^\d{4}$/.test(pastedText)) {
      const digits = pastedText.split('');
      const newOtp = [...otpCode];
      digits.forEach((digit, idx) => {
        if (idx < 4) newOtp[idx] = digit;
      });
      setOtpCode(newOtp);
      inputRefs.current[3]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otpCode.join('');
    
    if (otpString.length !== 4) {
      toast.error('لطفاً کد 4 رقمی را کامل وارد کنید', {
        position: "top-center",
        autoClose: 3000,
        rtl: true,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://localhost:7178/api/auth/verify-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: mobileNumber,
          otpCode: otpString,
          userType: userType
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('ثبت نام با موفقیت انجام شد', {
          position: "top-center",
          autoClose: 2000,
          rtl: true,
        });
        
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('userType', userType);
        }
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        toast.error(data.message || 'کد تایید نامعتبر است', {
          position: "top-center",
          autoClose: 4000,
          rtl: true,
        });
        setOtpCode(['', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('خطا در ارتباط با سرور', {
        position: "top-center",
        autoClose: 4000,
        rtl: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setOtpSent(false);
      setOtpCode(['', '', '', '']);
      loadCaptcha();
    } else {
      navigate('/register');
    }
  };

  const getUserTypeTitle = () => {
    switch (userType) {
      case 'agency': return 'مشاور املاک';
      case 'independent': return 'مشاور مستقل';
      case 'buyer': return 'خریدار / فروشنده';
      default: return '';
    }
  };

  return (
    <div className="register-verify-container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="register-verify-background">
        <div className="animated-bg"></div>
      </div>
      
      <div className="register-verify-card">
        <button className="back-button" onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          بازگشت
        </button>

        <div className="register-verify-header">
          <div className="register-verify-icon">
            {step === 1 ? (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9v4c0 3.87 3.13 7 7 7s7-3.13 7-7V9c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 22v-2M8 2h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </div>
          <h1 className="register-verify-title">
            {step === 1 ? 'ثبت نام جدید' : 'تایید کد یکبار مصرف'}
          </h1>
          <p className="register-verify-subtitle">
            {step === 1 
              ? `لطفاً اطلاعات خود را برای عضویت به عنوان ${getUserTypeTitle()} وارد کنید`
              : `کد 4 رقمی ارسال شده به شماره ${mobileNumber.slice(0, 4)}****${mobileNumber.slice(-4)} را وارد کنید`}
          </p>
        </div>

        <div className="register-verify-form">
          {step === 1 ? (
            <>
              <div className="form-group">
                <label className="form-label">نام و نام خانوادگی</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="form-input"
                    placeholder="نام و نام خانوادگی"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">شماره موبایل</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      if (value.length <= 11) {
                        setMobileNumber(value);
                      }
                    }}
                    className="form-input"
                    placeholder="09123456789"
                    dir="ltr"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">ایمیل (اختیاری)</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="example@gmail.com"
                    dir="ltr"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="captcha-group">
                <div className="captcha-container">
                  <div className="captcha-image-wrapper">
                    {captchaLoading ? (
                      <div className="captcha-loading">
                        <div className="loading-spinner-small"></div>
                      </div>
                    ) : (
                      <img 
                        src={captchaImage} 
                        alt="کد امنیتی" 
                        className="captcha-image"
                        onClick={loadCaptcha}
                      />
                    )}
                    <button 
                      type="button" 
                      onClick={loadCaptcha} 
                      className="refresh-captcha"
                      title="تازه سازی کد امنیتی"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M23 4v6h-6M1 20v-6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <div className="captcha-input-wrapper">
                    <input
                      type="text"
                      value={captchaValue}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        if (value.length <= 4) {
                          setCaptchaValue(value);
                        }
                      }}
                      className="captcha-input"
                      placeholder="کد امنیتی"
                      maxLength={4}
                      dir="ltr"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSendOTP}
                disabled={loading || !fullName || !mobileNumber || !captchaValue || captchaValue.length !== 4}
                className={`submit-button ${loading ? 'loading' : ''}`}
              >
                {loading ? (
                  <>
                    <div className="button-spinner"></div>
                    در حال ارسال کد...
                  </>
                ) : (
                  'ارسال کد تایید'
                )}
              </button>
            </>
          ) : (
            <>
              <div className="otp-input-group">
                <div className="otp-inputs" onPaste={handlePaste}>
                  {otpCode.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => inputRefs.current[index] = el}
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="otp-digit"
                      disabled={loading}
                      style={{
                        textAlign: 'center',
                        direction: 'ltr',
                        unicodeBidi: 'embed',
                      }}
                    />
                  ))}
                </div>
                
                <div className="timer-section">
                  {timeLeft > 0 ? (
                    <div className="timer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>زمان باقیمانده: {formatTime(timeLeft)}</span>
                    </div>
                  ) : (
                    <button 
                      onClick={handleResendOTP}
                      disabled={!canResend || loading}
                      className="resend-button"
                    >
                      ارسال مجدد کد
                    </button>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleVerifyOTP}
                disabled={loading || otpCode.join('').length !== 4}
                className={`submit-button ${loading ? 'loading' : ''}`}
              >
                {loading ? (
                  <>
                    <div className="button-spinner"></div>
                    در حال تایید...
                  </>
                ) : (
                  'تایید و ثبت نام'
                )}
              </button>
            </>
          )}
        </div>

        <div className="register-verify-footer">
          <p>با ثبت نام در سامانه، قوانین و مقررات را می‌پذیرید</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterVerify;