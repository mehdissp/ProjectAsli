// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './OTPLogin.css';

// const OTPLogin = () => {
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [otpCode, setOtpCode] = useState(['', '', '', '']);
//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [canResend, setCanResend] = useState(false);
//   const [error, setError] = useState('');
//   const inputRefs = useRef([]);
//   const navigate = useNavigate();
//   let timerInterval = useRef(null);

//   // پاک کردن تایمر هنگام unmount
//   useEffect(() => {
//     return () => {
//       if (timerInterval.current) {
//         clearInterval(timerInterval.current);
//       }
//     };
//   }, []);

//   // مدیریت تایمر
//   useEffect(() => {
//     if (timeLeft > 0) {
//       timerInterval.current = setInterval(() => {
//         setTimeLeft(prev => {
//           if (prev <= 1) {
//             clearInterval(timerInterval.current);
//             setCanResend(true);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     } else if (timeLeft === 0 && otpSent) {
//       setCanResend(true);
//     }

//     return () => {
//       if (timerInterval.current) {
//         clearInterval(timerInterval.current);
//       }
//     };
//   }, [timeLeft, otpSent]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const validateMobileNumber = (number) => {
//     const mobileRegex = /^09[0-9]{9}$/;
//     return mobileRegex.test(number);
//   };

//   const handleSendOTP = async () => {
//     if (!validateMobileNumber(mobileNumber)) {
//       toast.error('شماره موبایل نامعتبر است! لطفاً یک شماره 11 رقمی با فرمت 09XXXXXXXXX وارد کنید', {
//         position: "top-center",
//         autoClose: 4000,
//         rtl: true,
//       });
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('https://localhost:7178/api/auth/send-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ mobile: mobileNumber }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         setOtpSent(true);
//         setTimeLeft(data.expiresIn || 300);
//         setCanResend(false);
//         toast.success(data.message || 'کد تایید با موفقیت ارسال شد', {
//           position: "top-center",
//           autoClose: 3000,
//           rtl: true,
//         });
//         // فوکوس روی اولین input کد
//         if (inputRefs.current[0]) {
//           inputRefs.current[0].focus();
//         }
//       } else {
//         if (data.remainingTime) {
//           setTimeLeft(data.remainingTime);
//           setCanResend(false);
//           toast.error(`لطفاً ${formatTime(data.remainingTime)} ثانیه صبر کنید`, {
//             position: "top-center",
//             autoClose: 3000,
//             rtl: true,
//           });
//         } else {
//           toast.error(data.message || 'خطا در ارسال کد تایید', {
//             position: "top-center",
//             autoClose: 4000,
//             rtl: true,
//           });
//         }
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       toast.error('خطا در ارتباط با سرور. لطفاً مجدداً تلاش کنید', {
//         position: "top-center",
//         autoClose: 4000,
//         rtl: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     if (!canResend) {
//       toast.warning(`لطفاً ${formatTime(timeLeft)} ثانیه صبر کنید`, {
//         position: "top-center",
//         autoClose: 2000,
//         rtl: true,
//       });
//       return;
//     }
//     await handleSendOTP();
//   };

//   const handleOtpChange = (index, value) => {
//     // فقط عدد قبول کن
//     if (value && !/^\d+$/.test(value)) return;

//     const newOtp = [...otpCode];
//     //newOtp[index] = value.slice(0, 1);
//       newOtp[index] = value.slice(-1); // آخرین کاراکتر رو بگیر
//     setOtpCode(newOtp);

//     // حرکت خودکار به فیلد بعدی
//     if (value && index < 3) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     // حرکت با کلید backspace
//     if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handleVerifyOTP = async () => {
//     const otpString = otpCode.join('');
    
//     if (otpString.length !== 4) {
//       toast.error('لطفاً کد 4 رقمی را کامل وارد کنید', {
//         position: "top-center",
//         autoClose: 3000,
//         rtl: true,
//       });
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('https://your-api-url/api/auth/verify-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ 
//           mobile: mobileNumber, 
//           otpCode: otpString 
//         }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         toast.success('ورود با موفقیت انجام شد', {
//           position: "top-center",
//           autoClose: 2000,
//           rtl: true,
//         });
        
//         // ذخیره توکن و اطلاعات کاربر
//         if (data.token) {
//           localStorage.setItem('token', data.token);
//           localStorage.setItem('user', JSON.stringify(data.user));
//         }
        
//         setTimeout(() => {
//           navigate('/dashboard');
//         }, 1500);
//       } else {
//         toast.error(data.message || 'کد تایید نامعتبر است', {
//           position: "top-center",
//           autoClose: 4000,
//           rtl: true,
//         });
//         // پاک کردن کد
//         setOtpCode(['', '', '', '']);
//         inputRefs.current[0].focus();
//       }
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       toast.error('خطا در ارتباط با سرور', {
//         position: "top-center",
//         autoClose: 4000,
//         rtl: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackToLogin = () => {
//     navigate('/login');
//   };

//   return (
//     <div className="otp-container">
//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={true}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
      
//       <div className="otp-background">
//         <div className="animated-bg"></div>
//       </div>
      
//       <div className="otp-card">
//         <button className="back-button" onClick={handleBackToLogin}>
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//           بازگشت
//         </button>

//         <div className="otp-header">
//           <div className="otp-icon">
//             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M12 2C8.13 2 5 5.13 5 9v4c0 3.87 3.13 7 7 7s7-3.13 7-7V9c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2"/>
//               <path d="M12 22v-2M8 2h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//             </svg>
//           </div>
//           <h1 className="otp-title">
//             {!otpSent ? 'ورود با شماره موبایل' : 'تایید کد یکبار مصرف'}
//           </h1>
//           <p className="otp-subtitle">
//             {!otpSent 
//               ? 'برای دریافت کد تایید، شماره موبایل خود را وارد کنید' 
//               : `کد 4 رقمی ارسال شده به شماره ${mobileNumber.slice(0, 4)}****${mobileNumber.slice(-4)} را وارد کنید`}
//           </p>
//         </div>

//         <div className="otp-form">
//           {!otpSent ? (
//             <>
//               <div className="mobile-input-group">
//                 <div className="input-wrapper">
//                   <span className="input-icon">
//                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   </span>
//                   <input
//                     type="tel"
//                     value={mobileNumber}
//                     onChange={(e) => {
//                       const value = e.target.value.replace(/[^0-9]/g, '');
//                       if (value.length <= 11) {
//                         setMobileNumber(value);
//                       }
//                     }}
//                     className="mobile-input"
//                     placeholder="09123456789"
//                     dir="ltr"
//                     disabled={loading}
//                     autoFocus
//                   />
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={handleSendOTP}
//                 disabled={loading || !mobileNumber}
//                 className={`submit-button ${loading ? 'loading' : ''}`}
//               >
//                 {loading ? (
//                   <>
//                     <div className="button-spinner"></div>
//                     در حال ارسال...
//                   </>
//                 ) : (
//                   'ارسال کد تایید'
//                 )}
//               </button>
//             </>
//           ) : (
//             <>
//               <div className="otp-input-group">
//     <div className="otp-inputs">
//   {otpCode.map((digit, index) => (
//     <input
//       key={index}
//       ref={(el) => inputRefs.current[index] = el}
//       type="text"
//       inputMode="numeric"
//       maxLength={1}
//       value={digit}
//       onChange={(e) => {
//         const newValue = e.target.value;
//         if (newValue && !/^\d+$/.test(newValue)) return;
        
//         const newOtp = [...otpCode];
//         newOtp[index] = newValue.slice(-1);
//         setOtpCode(newOtp);
        
//         // حرکت به فیلد بعدی
//         if (newValue && index < 3) {
//           inputRefs.current[index + 1].focus();
//         }
//       }}
//       onKeyDown={(e) => {
//         // حرکت با کلید backspace
//         if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
//           inputRefs.current[index - 1].focus();
//         }
//         // حرکت با کلید چپ و راست
//         if (e.key === 'ArrowLeft' && index > 0) {
//           inputRefs.current[index - 1].focus();
//         }
//         if (e.key === 'ArrowRight' && index < 3) {
//           inputRefs.current[index + 1].focus();
//         }
//       }}
//       className="otp-digit"
//       disabled={loading}
//     />
//   ))}
// </div>
                
//                 <div className="timer-section">
//                   {timeLeft > 0 ? (
//                     <div className="timer">
//                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
//                         <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                       </svg>
//                       <span>زمان باقیمانده: {formatTime(timeLeft)}</span>
//                     </div>
//                   ) : (
//                     <button 
//                       onClick={handleResendOTP}
//                       disabled={!canResend || loading}
//                       className="resend-button"
//                     >
//                       ارسال مجدد کد
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={handleVerifyOTP}
//                 disabled={loading || otpCode.join('').length !== 4}
//                 className={`submit-button ${loading ? 'loading' : ''}`}
//               >
//                 {loading ? (
//                   <>
//                     <div className="button-spinner"></div>
//                     در حال تایید...
//                   </>
//                 ) : (
//                   'تایید و ورود'
//                 )}
//               </button>
//             </>
//           )}
//         </div>

//         <div className="otp-footer">
//           <p>دریافت کد تایید به شماره موبایل شما ارسال خواهد شد</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OTPLogin;


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../context/AuthContext';
import './OTPLogin.css';

const OTPLogin = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
    const { loginByMobile } = useAuth();
  
  // State های مربوط به کپچا
  const [captchaId, setCaptchaId] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaLoading, setCaptchaLoading] = useState(false);
  
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  let timerInterval = useRef(null);

  // دریافت کپچا در اولین بار loading صفحه
  useEffect(() => {
    loadCaptcha();
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, []);

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

  // تابع دریافت کپچا از سرور
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
        setCaptchaValue(''); // پاک کردن مقدار قبلی
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
    // اعتبارسنجی شماره موبایل
    if (!validateMobileNumber(mobileNumber)) {
      toast.error('شماره موبایل نامعتبر است! لطفاً یک شماره 11 رقمی با فرمت 09XXXXXXXXX وارد کنید', {
        position: "top-center",
        autoClose: 4000,
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
    setError('');

    try {
 
      const response = await fetch('https://localhost:7178/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        
        },
        body: JSON.stringify({ 
          mobile: mobileNumber,
          captchaId: captchaId,
          captchaValue: captchaValue
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setOtpSent(true);
        setTimeLeft(data.expiresIn || 300);
        setCanResend(false);
        toast.success(data.message || 'کد تایید با موفقیت ارسال شد', {
          position: "top-center",
          autoClose: 3000,
          rtl: true,
        });
        // فوکوس روی اولین input کد
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      } else {
        // اگر کپچا اشتباه بود، کپچا رو refresh کن
        if (data.message?.includes('کد امنیتی')) {
          loadCaptcha();
        }
        
        if (data.remainingTime) {
          setTimeLeft(data.remainingTime);
          setCanResend(false);
          toast.error(`لطفاً ${formatTime(data.remainingTime)} ثانیه صبر کنید`, {
            position: "top-center",
            autoClose: 3000,
            rtl: true,
          });
        } else {
          toast.error(data.message || 'خطا در ارسال کد تایید', {
            position: "top-center",
            autoClose: 4000,
            rtl: true,
          });
        }
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
    
    // برای ارسال مجدد، کپچا رو دوباره دریافت کن
    await loadCaptcha();
    setCaptchaValue('');
    await handleSendOTP();
  };

  const handleOtpChange = (index, value) => {
    if (value && !/^\d*$/.test(value)) return;

    const newOtp = [...otpCode];
    
    // پشتیبانی از Paste کردن کد کامل
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
    if (e.key === 'ArrowLeft' && index >0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === 'ArrowRight' && index <3) {
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
  setError('');

  try {
    var credentials = {
      mobile: mobileNumber, 
      Code: otpString 
    };
    
    const result = await loginByMobile(credentials);
    
    if (result.success) {
      toast.success('ورود با موفقیت انجام شد', {
        position: "top-center",
        autoClose: 2000,
        rtl: true,
      });
      
      navigate('/dashboard');
    } else {
      loadCaptcha();
      toast.error(result.error || 'خطا در ورود', {
        position: "top-left",
        autoClose: 5000,
        rtl: true,
      });
      setOtpCode(['', '', '', '']);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    toast.error('کپچا یا اطلاعات ورود نامعتبر است', {
      position: "top-left",
      autoClose: 5000,
      rtl: true,
    });
    loadCaptcha();
  } finally {
    setLoading(false);
  }
};

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="otp-container">
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
      
      <div className="otp-background">
        <div className="animated-bg"></div>
      </div>
      
      <div className="otp-card">
        <button className="back-button" onClick={handleBackToLogin}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          بازگشت
        </button>

        <div className="otp-header">
          <div className="otp-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9v4c0 3.87 3.13 7 7 7s7-3.13 7-7V9c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 22v-2M8 2h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="otp-title">
            {!otpSent ? 'ورود با شماره موبایل' : 'تایید کد یکبار مصرف'}
          </h1>
          <p className="otp-subtitle">
            {!otpSent 
              ? 'برای دریافت کد تایید، شماره موبایل خود را وارد کنید' 
              : `کد 4 رقمی ارسال شده به شماره ${mobileNumber.slice(0, 4)}****${mobileNumber.slice(-4)} را وارد کنید`}
          </p>
        </div>

        <div className="otp-form">
          {!otpSent ? (
            <>
              <div className="mobile-input-group">
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    className="mobile-input"
                    placeholder="09123456789"
                    dir="ltr"
                    disabled={loading}
                    autoFocus
                  />
                </div>
              </div>

              {/* بخش کپچا */}
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
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                disabled={loading || !mobileNumber || !captchaValue || captchaValue.length !== 4}
                className={`submit-button ${loading ? 'loading' : ''}`}
              >
                {loading ? (
                  <>
                    <div className="button-spinner"></div>
                    در حال ارسال...
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
          direction: 'ltr !important',
          unicodeBidi: 'embed',
        }}
                    />
                  ))}
                </div>
                
                <div className="timer-section">
                  {timeLeft > 0 ? (
                    <div className="timer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  'تایید و ورود'
                )}
              </button>
            </>
          )}
        </div>

        <div className="otp-footer">
          <p>دریافت کد تایید به شماره موبایل شما ارسال خواهد شد</p>
        </div>
      </div>
    </div>
  );
};

export default OTPLogin;