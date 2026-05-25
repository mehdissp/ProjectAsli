
// // import React, { useState, useRef, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import './RegisterIndependent.css';
// // import { useAuth } from '../../../context/AuthContext';
// // import { FaEye, FaEyeSlash, FaSyncAlt, FaCheckCircle } from 'react-icons/fa';

// // const RegisterIndependent = () => {
// //   const { isAuthenticated, isLoading: authLoading } = useAuth();
// //   const navigate = useNavigate();
  
// //   const [formData, setFormData] = useState({
// //     userName: '',        // نام کاربری جدید
// //     fullName: '',
// //     mobile: '',
// //     password: '',
// //     confirmPassword: '',
// //     nationalCode: '',
// //     codeMoaref: '',      // کد معرف جدید
// //     captchaId: '',
// //     captchaInput: ''
// //   });
  
// //   const [captchaImage, setCaptchaImage] = useState('');
// //   const [captchaLoading, setCaptchaLoading] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [touched, setTouched] = useState({});
// //   const [loading, setLoading] = useState(false);
// //   const [acceptTerms, setAcceptTerms] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [passwordStrength, setPasswordStrength] = useState({ score: 0, message: '', color: '', width: '0%' });

// //   const updateMetaTags = () => {
// //     document.title = 'ثبت‌نام مشاور مستقل | اوتاپ - بزرگترین سامانه املاک ایران';
    
// //     let metaDescription = document.querySelector('meta[name="description"]');
// //     if (!metaDescription) {
// //       metaDescription = document.createElement('meta');
// //       metaDescription.name = 'description';
// //       document.head.appendChild(metaDescription);
// //     }
// //     metaDescription.content = 'ثبت‌نام مشاورین مستقل در سایت اوتاپ - با پنل حرفه‌ای، امکانات پیشرفته و شرایط ویژه برای مشاورین املاک';
// //   };

// //   const fetchCaptcha = async () => {
// //     setCaptchaLoading(true);
// //     try {
// //       const response = await fetch('https://localhost:7178/api/auth/captcha', {
// //         method: 'GET',
// //         headers: { 'Content-Type': 'application/json' }
// //       });
      
// //       if (response.ok) {
// //         const data = await response.json();
// //         setCaptchaImage(data.image);
// //         setFormData(prev => ({ ...prev, captchaId: data.captchaId, captchaInput: '' }));
// //         setErrors(prev => ({ ...prev, captchaInput: '' }));
// //       } else {
// //         toast.error('خطا در دریافت کد امنیتی');
// //       }
// //     } catch (error) {
// //       console.error('Error fetching captcha:', error);
// //       toast.error('خطا در ارتباط با سرور');
// //     } finally {
// //       setCaptchaLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     updateMetaTags();
// //     fetchCaptcha();
// //   }, []);

// //   useEffect(() => {
// //     if (!authLoading && isAuthenticated) {
// //       navigate('/dashboard', { replace: true });
// //     }
// //   }, [isAuthenticated, authLoading, navigate]);

// //   useEffect(() => {
// //     checkPasswordStrength(formData.password);
// //     if (formData.confirmPassword) {
// //       validateField('confirmPassword', formData.confirmPassword);
// //     }
// //   }, [formData.password]);

// //   useEffect(() => {
// //     if (formData.confirmPassword) {
// //       validateField('confirmPassword', formData.confirmPassword);
// //     }
// //   }, [formData.confirmPassword]);

// //   const validateField = (name, value) => {
// //     let error = '';
// //     switch (name) {
// //       case 'userName':
// //         if (!value || !value.trim()) error = 'نام کاربری الزامی است';
// //         else if (value.trim().length < 3) error = 'حداقل ۳ کاراکتر وارد کنید';
// //         else if (!/^[a-zA-Z0-9_]+$/.test(value)) error = 'فقط حروف انگلیسی، اعداد و زیرخط مجاز است';
// //         break;
// //       case 'fullName':
// //         if (!value || !value.trim()) error = 'نام و نام خانوادگی الزامی است';
// //         else if (value.trim().length < 3) error = 'حداقل ۳ کاراکتر وارد کنید';
// //         break;
// //       case 'mobile':
// //         if (!value) error = 'شماره موبایل الزامی است';
// //         else if (!/^09[0-9]{9}$/.test(value)) error = 'شماره باید با 09 شروع و 11 رقم باشد';
// //         break;
// //       case 'nationalCode':
// //         if (!value) error = 'کد ملی الزامی است';
// //         else if (!/^[0-9]{10}$/.test(value)) error = 'کد ملی باید ۱۰ رقم باشد';
// //         else {
// //           const check = parseInt(value[9]);
// //           let sum = 0;
// //           for (let i = 0; i < 9; i++) sum += parseInt(value[i]) * (10 - i);
// //           const remainder = sum % 11;
// //           const isValid = remainder < 2 ? check === remainder : check === (11 - remainder);
// //           if (!isValid) error = 'کد ملی نامعتبر است';
// //         }
// //         break;
// //       case 'password':
// //         if (!value) error = 'رمز عبور الزامی است';
// //         else if (value.length < 6) error = 'حداقل ۶ کاراکتر';
// //         break;
// //       case 'confirmPassword':
// //         if (!value) error = 'تکرار رمز عبور الزامی است';
// //         else if (value !== formData.password) error = 'رمز عبور مطابقت ندارد';
// //         break;
// //       case 'codeMoaref':
// //         // کد معرف اختیاری است، فقط اگر وارد شده باشه validation میکنیم
// //         if (value && value.trim().length > 0 && !/^[a-zA-Z0-9]+$/.test(value)) {
// //           error = 'فرمت کد معرف نامعتبر است';
// //         }
// //         break;
// //       case 'captchaInput':
// //         if (!value || !value.trim()) error = 'کد امنیتی الزامی است';
// //         else if (value.length !== 4) error = 'کد امنیتی ۴ رقمی است';
// //         break;
// //       default: break;
// //     }
// //     setErrors(prev => ({ ...prev, [name]: error }));
// //     return !error;
// //   };

// //   const handleBlur = (name) => {
// //     setTouched(prev => ({ ...prev, [name]: true }));
// //     validateField(name, formData[name]);
// //   };

// //   const checkPasswordStrength = (password) => {
// //     if (!password || password.length === 0) {
// //       setPasswordStrength({ score: 0, message: '', color: '', width: '0%' });
// //       return;
// //     }
// //     let score = 1;
// //     if (password.length >= 8) score++;
// //     if (/[a-z]/.test(password)) score++;
// //     if (/[A-Z]/.test(password)) score++;
// //     if (/[0-9]/.test(password)) score++;
// //     if (/[!@#$%^&*]/.test(password)) score++;
    
// //     let message = '', color = '', width = '';
// //     if (score <= 2) { message = 'ضعیف'; color = '#ef4444'; width = '25%'; }
// //     else if (score <= 4) { message = 'متوسط'; color = '#f59e0b'; width = '60%'; }
// //     else { message = 'قوی'; color = '#10b981'; width = '100%'; }
// //     setPasswordStrength({ score, message, color, width });
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
    
// //     if (name === 'nationalCode') {
// //       const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10);
// //       setFormData(prev => ({ ...prev, [name]: numericValue }));
// //       if (touched.nationalCode) validateField(name, numericValue);
// //     } else if (name === 'mobile') {
// //       const numericValue = value.replace(/[^0-9]/g, '').slice(0, 11);
// //       setFormData(prev => ({ ...prev, [name]: numericValue }));
// //       if (touched.mobile) validateField(name, numericValue);
// //     } else if (name === 'captchaInput') {
// //       const numericValue = value.replace(/[^0-9]/g, '').slice(0, 4);
// //       setFormData(prev => ({ ...prev, [name]: numericValue }));
// //       if (touched.captchaInput) validateField(name, numericValue);
// //     } else {
// //       setFormData(prev => ({ ...prev, [name]: value }));
// //       if (touched[name]) validateField(name, value);
// //     }
// //   };

// //   const isFormValid = () => {
// //     const userNameValid = formData.userName && formData.userName.trim() && !errors.userName;
// //     const fullNameValid = formData.fullName && formData.fullName.trim() && !errors.fullName;
// //     const mobileValid = formData.mobile && !errors.mobile;
// //     const passwordValid = formData.password && formData.password.length >= 6 && !errors.password;
// //     const confirmValid = formData.confirmPassword && formData.password === formData.confirmPassword && !errors.confirmPassword;
// //     const nationalCodeValid = formData.nationalCode && !errors.nationalCode;
// //     const captchaValid = formData.captchaInput && formData.captchaInput.length === 4 && !errors.captchaInput;
    
// //     return userNameValid && fullNameValid && mobileValid && passwordValid && confirmValid && 
// //            nationalCodeValid && captchaValid && acceptTerms;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     const fieldsToValidate = ['userName', 'fullName', 'mobile', 'nationalCode', 'password', 'confirmPassword', 'captchaInput'];
// //     fieldsToValidate.forEach(field => {
// //       setTouched(prev => ({ ...prev, [field]: true }));
// //       validateField(field, formData[field]);
// //     });
    
// //     if (!isFormValid()) {
// //       toast.warning('لطفاً تمام اطلاعات را به درستی تکمیل کنید');
// //       return;
// //     }
    
// //     setLoading(true);
    
// //     // ساخت object برای ارسال به سرور
// //     const submitData = {
// //       userName: formData.userName.trim(),
// //       fullName: formData.fullName.trim(),
// //       mobileNumber: formData.mobile,
// //       passWord: formData.password,
// //       nationalCode: formData.nationalCode,
// //       codeMoaref: formData.codeMoaref?.trim() || '',
// //       captchaId: formData.captchaId,
// //       captchaInput: formData.captchaInput
// //     };
    
// //     try {
// //       const response = await fetch('https://localhost:7178/api/Auth/registerNewUserIndependent', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify(submitData),
// //       });
// //       console.log(response)
// //       const data = await response.json();
// //       console.log(data)
// //     if (response.status === 200 && data) {
// //       toast.success(data.data || 'ثبت‌نام با موفقیت انجام شد!');
// //       setTimeout(() => navigate('/dashbaord', {
// //         state: { mobile: formData.mobile, userType: 'independent' }
// //       }), 1500);
// //     } else {
// //         if (data.error === 'captcha_invalid') {
// //           toast.error('کد امنیتی اشتباه است');
// //           fetchCaptcha();
// //         } else if (data.error === 'captcha_expired') {
// //           toast.error('کد امنیتی منقضی شده است');
// //           fetchCaptcha();
// //         } else {
// //           toast.error(data.message || data.error || 'خطا در ثبت‌نام');
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Registration error:', error);
// //       toast.error('خطا در ارتباط با سرور. لطفاً مجدداً تلاش کنید');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (authLoading) {
// //     return (
// //       <div className="loading-screen">
// //         <div className="loading-spinner"></div>
// //         <span>در حال بارگذاری...</span>
// //       </div>
// //     );
// //   }

// //   const benefits = [
// //     { icon: '🏆', title: 'اعتبار برند اوتاپ', desc: 'برخورداری از اعتبار و جایگاه برند معتبر اوتاپ در بازار' },
// //     { icon: '⚡', title: 'ثبت سریع و آسان ملک', desc: 'ثبت آگهی در کمترین زمان ممکن با رابط کاربری ساده' },
// //     { icon: '🎨', title: 'پنل مشاوری حرفه‌ای', desc: 'پنل اختصاصی با طراحی مدرن و کاربری فوق‌العاده آسان' },
// //     { icon: '💰', title: 'کیف پول و شارژ هدیه', desc: 'امکان برخورداری از کیف پول و دریافت شارژ هدیه' },
// //     { icon: '📈', title: 'امکانات ارتقاء آگهی', desc: 'به روزرسانی، ویترین، بسته افزایش بازدید و آگهی ویژه' },
// //     { icon: '📊', title: 'آمار بازدید و تماس', desc: 'مشاهده آمار دقیق بازدید و تماس به تفکیک هر آگهی' }
// //   ];

// //   return (
// //     <div className="independent-register-container">
// //       <ToastContainer position="top-center" rtl={true} autoClose={3000} />
      
// //       <div className="independent-background">
// //         <div className="gradient-bg"></div>
// //         <div className="overlay"></div>
// //       </div>
      
// //       <div className="two-column-layout">
// //         {/* سمت راست - توضیحات و مزایا */}
// //         <div className="right-column-info">
// //           <div className="content-wrapper">
// //             <div className="brand-header">
// //               <div className="logo-icon">🏠</div>
// //               <h1 className="brand-name">اوتاپ</h1>
// //               <p className="brand-tagline">بزرگترین سامانه تخصصی املاک ایران</p>
// //             </div>

// //             <div className="welcome-box">
// //               <h2>به خانواده بزرگ اوتاپ خوش آمدید ✨</h2>
// //               <p>با ثبت‌نام در سامانه اوتاپ، به جمع هزاران مشاور موفق بپیوندید و از امکانات پیشرفته ما بهره‌مند شوید.</p>
// //             </div>

// //             <div className="benefits-sidebar">
// //               <h3>✨ مزایای همکاری با اوتاپ</h3>
// //               <div className="benefits-list">
// //                 {benefits.map((benefit, idx) => (
// //                   <div key={idx} className="benefit-item">
// //                     <div className="benefit-icon">{benefit.icon}</div>
// //                     <div className="benefit-info">
// //                       <strong>{benefit.title}</strong>
// //                       <p>{benefit.desc}</p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="stats-box">
// //               <div className="stat">
// //                 <span className="stat-number">۱۰,۰۰۰+</span>
// //                 <span className="stat-label">مشاور فعال</span>
// //               </div>
// //               <div className="stat">
// //                 <span className="stat-number">۵۰,۰۰۰+</span>
// //                 <span className="stat-label">آگهی فعال</span>
// //               </div>
// //               <div className="stat">
// //                 <span className="stat-number">۹۸٪</span>
// //                 <span className="stat-label">رضایت مشاوران</span>
// //               </div>
// //             </div>

// //             <div className="support-box">
// //               <div className="support-icon">📞</div>
// //               <div>
// //                 <h4>پشتیبانی ۲۴ ساعته</h4>
// //                 <p>تیم پشتیبانی اوتاپ همواره آماده پاسخگویی به سوالات شماست</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* سمت چپ - فرم ثبت‌نام */}
// //         <div className="left-column-form">
// //           <div className="form-card">
// //             <div className="form-header">
// //               <div className="form-icon">
// //                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
// //                   <path d="M12 2C8.13 2 5 5.13 5 9v4c0 3.87 3.13 7 7 7s7-3.13 7-7V9c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2"/>
// //                   <path d="M12 22v-2M8 2h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
// //                 </svg>
// //               </div>
// //               <h2>فرم ثبت‌نام مشاور مستقل</h2>
// //               <p>لطفاً اطلاعات خواسته شده را دقیق وارد کنید</p>
// //             </div>

// //             <form onSubmit={handleSubmit} className="register-form" noValidate>
// //               {/* نام کاربری */}
// //               <div className="form-group floating-label">
// //                 <input
// //                   type="text"
// //                   name="userName"
// //                   value={formData.userName}
// //                   onChange={handleChange}
// //                   onBlur={() => handleBlur('userName')}
// //                   className={`ltr ${touched.userName && errors.userName ? 'error' : touched.userName && !errors.userName && formData.userName ? 'success' : ''}`}
// //                   placeholder=" "
// //                   disabled={loading}
// //                 />
// //                 <label>نام کاربری</label>
// //                 {touched.userName && errors.userName && <span className="error-message">{errors.userName}</span>}
// //                 {touched.userName && !errors.userName && formData.userName && <FaCheckCircle className="success-check-icon" />}
// //               </div>

// //               {/* نام و نام خانوادگی */}
// //               <div className="form-group floating-label">
// //                 <input
// //                   type="text"
// //                   name="fullName"
// //                   value={formData.fullName}
// //                   onChange={handleChange}
// //                   onBlur={() => handleBlur('fullName')}
// //                   className={touched.fullName && errors.fullName ? 'error' : touched.fullName && !errors.fullName && formData.fullName ? 'success' : ''}
// //                   placeholder=" "
// //                   disabled={loading}
// //                 />
// //                 <label>نام و نام خانوادگی</label>
// //                 {touched.fullName && errors.fullName && <span className="error-message">{errors.fullName}</span>}
// //                 {touched.fullName && !errors.fullName && formData.fullName && <FaCheckCircle className="success-check-icon" />}
// //               </div>

// //               {/* شماره موبایل */}
// //               <div className="form-group floating-label">
// //                 <input
// //                   type="tel"
// //                   name="mobile"
// //                   value={formData.mobile}
// //                   onChange={handleChange}
// //                   onBlur={() => handleBlur('mobile')}
// //                   className={`ltr ${touched.mobile && errors.mobile ? 'error' : touched.mobile && !errors.mobile && formData.mobile ? 'success' : ''}`}
// //                   placeholder=" "
// //                   disabled={loading}
// //                 />
// //                 <label>شماره موبایل</label>
// //                 {touched.mobile && errors.mobile && <span className="error-message">{errors.mobile}</span>}
// //                 {touched.mobile && !errors.mobile && formData.mobile && <FaCheckCircle className="success-check-icon" />}
// //               </div>

// //               {/* رمز عبور */}
// //               <div className="form-group floating-label">
// //                 <div className="password-wrapper">
// //                   <input
// //                     type={showPassword ? "text" : "password"}
// //                     name="password"
// //                     value={formData.password}
// //                     onChange={handleChange}
// //                     onBlur={() => handleBlur('password')}
// //                     className={touched.password && errors.password ? 'error' : ''}
// //                     placeholder=" "
// //                     disabled={loading}
// //                   />
// //                   <label>رمز عبور</label>
// //                   <button 
// //                     type="button" 
// //                     className="toggle-password" 
// //                     onClick={() => setShowPassword(!showPassword)}
// //                     tabIndex="-1"
// //                   >
// //                     {showPassword ? <FaEyeSlash /> : <FaEye />}
// //                   </button>
// //                 </div>
// //                 {formData.password && (
// //                   <div className="password-strength">
// //                     <div className="strength-bar">
// //                       <div className="strength-fill" style={{ width: passwordStrength.width, backgroundColor: passwordStrength.color }} />
// //                     </div>
// //                     <span className="strength-text" style={{ color: passwordStrength.color }}>رمز {passwordStrength.message}</span>
// //                   </div>
// //                 )}
// //                 {touched.password && errors.password && <span className="error-message">{errors.password}</span>}
// //               </div>

// //               {/* تکرار رمز عبور */}
// //               <div className="form-group floating-label">
// //                 <div className="password-wrapper">
// //                   <input
// //                     type={showConfirmPassword ? "text" : "password"}
// //                     name="confirmPassword"
// //                     value={formData.confirmPassword}
// //                     onChange={handleChange}
// //                     onBlur={() => handleBlur('confirmPassword')}
// //                     className={touched.confirmPassword && errors.confirmPassword ? 'error' : touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword ? 'success' : ''}
// //                     placeholder=" "
// //                     disabled={loading}
// //                   />
// //                   <label>تکرار رمز عبور</label>
// //                   <button 
// //                     type="button" 
// //                     className="toggle-password" 
// //                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                     tabIndex="-1"
// //                   >
// //                     {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
// //                   </button>
// //                 </div>
// //                 {touched.confirmPassword && errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
// //                 {touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword && (
// //                   <span className="success-message"><FaCheckCircle /> رمز عبور مطابقت دارد</span>
// //                 )}
// //               </div>

// //               {/* کد ملی */}
// //               <div className="form-group floating-label">
// //                 <input
// //                   type="text"
// //                   name="nationalCode"
// //                   value={formData.nationalCode}
// //                   onChange={handleChange}
// //                   onBlur={() => handleBlur('nationalCode')}
// //                   className={`ltr ${touched.nationalCode && errors.nationalCode ? 'error' : touched.nationalCode && !errors.nationalCode && formData.nationalCode ? 'success' : ''}`}
// //                   placeholder=" "
// //                   maxLength="10"
// //                   disabled={loading}
// //                 />
// //                 <label>کد ملی</label>
// //                 {touched.nationalCode && errors.nationalCode && <span className="error-message">{errors.nationalCode}</span>}
// //                 {touched.nationalCode && !errors.nationalCode && formData.nationalCode && <FaCheckCircle className="success-check-icon" />}
// //               </div>

// //               {/* کد معرف (اختیاری) */}
// //               <div className="form-group floating-label">
// //                 <input
// //                   type="text"
// //                   name="codeMoaref"
// //                   value={formData.codeMoaref}
// //                   onChange={handleChange}
// //                   onBlur={() => handleBlur('codeMoaref')}
// //                   className={`ltr ${touched.codeMoaref && errors.codeMoaref ? 'error' : ''}`}
// //                   placeholder=" "
// //                   disabled={loading}
// //                 />
// //                 <label>کد معرف (اختیاری)</label>
// //                 {touched.codeMoaref && errors.codeMoaref && <span className="error-message">{errors.codeMoaref}</span>}
// //               </div>

// //               {/* بخش کپچا */}
// //               <div className="captcha-section">
// //                 <label className="captcha-label">کد امنیتی <span className="required">*</span></label>
// //                 <div className="captcha-container">
// //                   <div className="captcha-image-wrapper">
// //                     {captchaLoading ? (
// //                       <div className="captcha-loading">
// //                         <div className="loading-spinner-small"></div>
// //                       </div>
// //                     ) : (
// //                       <img 
// //                         src={captchaImage} 
// //                         alt="Captcha" 
// //                         className="captcha-image"
// //                         onClick={fetchCaptcha}
// //                       />
// //                     )}
// //                     <button 
// //                       type="button" 
// //                       className="refresh-captcha"
// //                       onClick={fetchCaptcha}
// //                       disabled={captchaLoading}
// //                     >
// //                       <FaSyncAlt className={captchaLoading ? 'spin' : ''} />
// //                     </button>
// //                   </div>
// //                   <div className="captcha-input-wrapper">
// //                     <input
// //                       type="text"
// //                       name="captchaInput"
// //                       value={formData.captchaInput}
// //                       onChange={handleChange}
// //                       onBlur={() => handleBlur('captchaInput')}
// //                       className={`captcha-input ${touched.captchaInput && errors.captchaInput ? 'error' : touched.captchaInput && !errors.captchaInput && formData.captchaInput ? 'success' : ''}`}
// //                       placeholder="کد روبرو را وارد کنید"
// //                       maxLength="4"
// //                       disabled={loading}
// //                     />
// //                     {touched.captchaInput && errors.captchaInput && (
// //                       <span className="error-message">{errors.captchaInput}</span>
// //                     )}
// //                     {touched.captchaInput && !errors.captchaInput && formData.captchaInput && (
// //                       <FaCheckCircle className="captcha-success-icon" />
// //                     )}
// //                   </div>
// //                 </div>
// //                 <p className="captcha-hint">برای مشاهده کد جدید روی تصویر کلیک کنید</p>
// //               </div>

// //               {/* نکات مهم */}
// //               <div className="notice-box">
// //                 <div className="notice-icon">💡</div>
// //                 <div className="notice-content">
// //                   <strong>نکات مهم:</strong>
// //                   <ul>
// //                     <li>پس از ثبت، پنل اختصاصی برای شما ایجاد می‌شود</li>
// //                     <li>اطلاعات ورود (نام کاربری و رمز عبور) از طریق پیامک ارسال خواهد شد</li>
// //                     <li>امکان ثبت آگهی، افزایش بازدید و مشاهده آمار دقیق تماس‌ها</li>
// //                     <li>پشتیبانی آنلاین و پاسخگویی سریع به سوالات شما</li>
// //                   </ul>
// //                 </div>
// //               </div>

// //               {/* قوانین */}
// //               <div className="terms-section">
// //                 <label className="terms-label">
// //                   <input 
// //                     type="checkbox" 
// //                     checked={acceptTerms} 
// //                     onChange={(e) => setAcceptTerms(e.target.checked)} 
// //                     disabled={loading}
// //                   />
// //                   <span className="custom-checkbox"></span>
// //                   <span>قوانین و مقررات سایت اوتاپ را مطالعه کرده و می‌پذیرم</span>
// //                 </label>
// //               </div>

// //               {/* دکمه ثبت‌نام */}
// //               <button type="submit" className="submit-button" disabled={loading}>
// //                 {loading ? (
// //                   <>
// //                     <div className="button-spinner"></div>
// //                     در حال ثبت‌نام...
// //                   </>
// //                 ) : (
// //                   <>
// //                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
// //                       <path d="M20 12v8H4v-8M12 2v12m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
// //                     </svg>
// //                     ثبت‌نام و ادامه
// //                   </>
// //                 )}
// //               </button>

// //               <p className="login-link">
// //                 قبلاً ثبت‌نام کرده‌اید؟ <a href="/login">وارد شوید</a>
// //               </p>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RegisterIndependent;

// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './RegisterIndependent.css';
// import { useAuth } from '../../../context/AuthContext';
// import { FaEye, FaEyeSlash, FaSyncAlt, FaCheckCircle, FaHome, FaSignInAlt } from 'react-icons/fa';

// const RegisterIndependent = () => {
//   const { isAuthenticated, isLoading: authLoading } = useAuth();
//   const navigate = useNavigate();
  
//   const [formData, setFormData] = useState({
//     userName: '',
//     fullName: '',
//     mobile: '',
//     password: '',
//     confirmPassword: '',
//     nationalCode: '',
//     codeMoaref: '',
//     captchaId: '',
//     captchaInput: ''
//   });
  
//   const [captchaImage, setCaptchaImage] = useState('');
//   const [captchaLoading, setCaptchaLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [acceptTerms, setAcceptTerms] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState({ score: 0, message: '', color: '', width: '0%' });

//   // بهینه‌سازی سئو - اضافه کردن متا تگ‌های بیشتر
//   const updateMetaTags = () => {
//     // عنوان صفحه
//     document.title = 'ثبت‌نام مشاور مستقل | اوتاپ - بزرگترین سامانه املاک ایران';
    
//     // متا دیسکریپشن
//     let metaDescription = document.querySelector('meta[name="description"]');
//     if (!metaDescription) {
//       metaDescription = document.createElement('meta');
//       metaDescription.name = 'description';
//       document.head.appendChild(metaDescription);
//     }
//     metaDescription.content = 'ثبت‌نام مشاورین مستقل در سایت اوتاپ - با پنل حرفه‌ای، امکانات پیشرفته و شرایط ویژه برای مشاورین املاک. ثبت نام آسان و سریع مشاوران املاک';
    
//     // متا کلمات کلیدی
//     let metaKeywords = document.querySelector('meta[name="keywords"]');
//     if (!metaKeywords) {
//       metaKeywords = document.createElement('meta');
//       metaKeywords.name = 'keywords';
//       document.head.appendChild(metaKeywords);
//     }
//     metaKeywords.content = 'ثبت نام مشاور مستقل, مشاور املاک, ثبت نام مشاور املاک, اوتاپ, پنل مشاوره املاک, ثبت نام آنلاین مشاور املاک';
    
//     // متا ربات‌ها
//     let metaRobots = document.querySelector('meta[name="robots"]');
//     if (!metaRobots) {
//       metaRobots = document.createElement('meta');
//       metaRobots.name = 'robots';
//       document.head.appendChild(metaRobots);
//     }
//     metaRobots.content = 'index, follow';
    
//     // متا نویسنده
//     let metaAuthor = document.querySelector('meta[name="author"]');
//     if (!metaAuthor) {
//       metaAuthor = document.createElement('meta');
//       metaAuthor.name = 'author';
//       document.head.appendChild(metaAuthor);
//     }
//     metaAuthor.content = 'اوتاپ';
    
//     // کانونیکال لینک
//     let canonicalLink = document.querySelector('link[rel="canonical"]');
//     if (!canonicalLink) {
//       canonicalLink = document.createElement('link');
//       canonicalLink.rel = 'canonical';
//       document.head.appendChild(canonicalLink);
//     }
//     canonicalLink.href = window.location.origin + '/register/independent';
    
//     // Open Graph meta tags (برای اشتراک در شبکه‌های اجتماعی)
//     let ogTitle = document.querySelector('meta[property="og:title"]');
//     if (!ogTitle) {
//       ogTitle = document.createElement('meta');
//       ogTitle.setAttribute('property', 'og:title');
//       document.head.appendChild(ogTitle);
//     }
//     ogTitle.content = 'ثبت‌نام مشاور مستقل | اوتاپ';
    
//     let ogDescription = document.querySelector('meta[property="og:description"]');
//     if (!ogDescription) {
//       ogDescription = document.createElement('meta');
//       ogDescription.setAttribute('property', 'og:description');
//       document.head.appendChild(ogDescription);
//     }
//     ogDescription.content = 'به جمع هزاران مشاور موفق بپیوندید و از امکانات پیشرفته اوتاپ بهره‌مند شوید';
    
//     let ogType = document.querySelector('meta[property="og:type"]');
//     if (!ogType) {
//       ogType = document.createElement('meta');
//       ogType.setAttribute('property', 'og:type');
//       document.head.appendChild(ogType);
//     }
//     ogType.content = 'website';
//   };

//   const fetchCaptcha = async () => {
//     setCaptchaLoading(true);
//     try {
//       const response = await fetch('https://localhost:7178/api/auth/captcha', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         setCaptchaImage(data.image);
//         setFormData(prev => ({ ...prev, captchaId: data.captchaId, captchaInput: '' }));
//         setErrors(prev => ({ ...prev, captchaInput: '' }));
//       } else {
//         toast.error('خطا در دریافت کد امنیتی');
//       }
//     } catch (error) {
//       console.error('Error fetching captcha:', error);
//       toast.error('خطا در ارتباط با سرور');
//     } finally {
//       setCaptchaLoading(false);
//     }
//   };

//   useEffect(() => {
//     updateMetaTags();
//     fetchCaptcha();
//   }, []);

//   useEffect(() => {
//     if (!authLoading && isAuthenticated) {
//       navigate('/dashboard', { replace: true });
//     }
//   }, [isAuthenticated, authLoading, navigate]);

//   useEffect(() => {
//     checkPasswordStrength(formData.password);
//     if (formData.confirmPassword) {
//       validateField('confirmPassword', formData.confirmPassword);
//     }
//   }, [formData.password]);

//   useEffect(() => {
//     if (formData.confirmPassword) {
//       validateField('confirmPassword', formData.confirmPassword);
//     }
//   }, [formData.confirmPassword]);

//   // توابع validation مثل قبل
//   const validateField = (name, value) => {
//     let error = '';
//     switch (name) {
//       case 'userName':
//         if (!value || !value.trim()) error = 'نام کاربری الزامی است';
//         else if (value.trim().length < 3) error = 'حداقل ۳ کاراکتر وارد کنید';
//         else if (!/^[a-zA-Z0-9_]+$/.test(value)) error = 'فقط حروف انگلیسی، اعداد و زیرخط مجاز است';
//         break;
//       case 'fullName':
//         if (!value || !value.trim()) error = 'نام و نام خانوادگی الزامی است';
//         else if (value.trim().length < 3) error = 'حداقل ۳ کاراکتر وارد کنید';
//         break;
//       case 'mobile':
//         if (!value) error = 'شماره موبایل الزامی است';
//         else if (!/^09[0-9]{9}$/.test(value)) error = 'شماره باید با 09 شروع و 11 رقم باشد';
//         break;
//       case 'nationalCode':
//         if (!value) error = 'کد ملی الزامی است';
//         else if (!/^[0-9]{10}$/.test(value)) error = 'کد ملی باید ۱۰ رقم باشد';
//         else {
//           const check = parseInt(value[9]);
//           let sum = 0;
//           for (let i = 0; i < 9; i++) sum += parseInt(value[i]) * (10 - i);
//           const remainder = sum % 11;
//           const isValid = remainder < 2 ? check === remainder : check === (11 - remainder);
//           if (!isValid) error = 'کد ملی نامعتبر است';
//         }
//         break;
//       case 'password':
//         if (!value) error = 'رمز عبور الزامی است';
//         else if (value.length < 6) error = 'حداقل ۶ کاراکتر';
//         break;
//       case 'confirmPassword':
//         if (!value) error = 'تکرار رمز عبور الزامی است';
//         else if (value !== formData.password) error = 'رمز عبور مطابقت ندارد';
//         break;
//       case 'codeMoaref':
//         if (value && value.trim().length > 0 && !/^[a-zA-Z0-9]+$/.test(value)) {
//           error = 'فرمت کد معرف نامعتبر است';
//         }
//         break;
//       case 'captchaInput':
//         if (!value || !value.trim()) error = 'کد امنیتی الزامی است';
//         else if (value.length !== 4) error = 'کد امنیتی ۴ رقمی است';
//         break;
//       default: break;
//     }
//     setErrors(prev => ({ ...prev, [name]: error }));
//     return !error;
//   };

//   const handleBlur = (name) => {
//     setTouched(prev => ({ ...prev, [name]: true }));
//     validateField(name, formData[name]);
//   };

//   const checkPasswordStrength = (password) => {
//     if (!password || password.length === 0) {
//       setPasswordStrength({ score: 0, message: '', color: '', width: '0%' });
//       return;
//     }
//     let score = 1;
//     if (password.length >= 8) score++;
//     if (/[a-z]/.test(password)) score++;
//     if (/[A-Z]/.test(password)) score++;
//     if (/[0-9]/.test(password)) score++;
//     if (/[!@#$%^&*]/.test(password)) score++;
    
//     let message = '', color = '', width = '';
//     if (score <= 2) { message = 'ضعیف'; color = '#ef4444'; width = '25%'; }
//     else if (score <= 4) { message = 'متوسط'; color = '#f59e0b'; width = '60%'; }
//     else { message = 'قوی'; color = '#10b981'; width = '100%'; }
//     setPasswordStrength({ score, message, color, width });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === 'nationalCode') {
//       const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10);
//       setFormData(prev => ({ ...prev, [name]: numericValue }));
//       if (touched.nationalCode) validateField(name, numericValue);
//     } else if (name === 'mobile') {
//       const numericValue = value.replace(/[^0-9]/g, '').slice(0, 11);
//       setFormData(prev => ({ ...prev, [name]: numericValue }));
//       if (touched.mobile) validateField(name, numericValue);
//     } else if (name === 'captchaInput') {
//       const numericValue = value.replace(/[^0-9]/g, '').slice(0, 4);
//       setFormData(prev => ({ ...prev, [name]: numericValue }));
//       if (touched.captchaInput) validateField(name, numericValue);
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//       if (touched[name]) validateField(name, value);
//     }
//   };

//   const isFormValid = () => {
//     const userNameValid = formData.userName && formData.userName.trim() && !errors.userName;
//     const fullNameValid = formData.fullName && formData.fullName.trim() && !errors.fullName;
//     const mobileValid = formData.mobile && !errors.mobile;
//     const passwordValid = formData.password && formData.password.length >= 6 && !errors.password;
//     const confirmValid = formData.confirmPassword && formData.password === formData.confirmPassword && !errors.confirmPassword;
//     const nationalCodeValid = formData.nationalCode && !errors.nationalCode;
//     const captchaValid = formData.captchaInput && formData.captchaInput.length === 4 && !errors.captchaInput;
    
//     return userNameValid && fullNameValid && mobileValid && passwordValid && confirmValid && 
//            nationalCodeValid && captchaValid && acceptTerms;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const fieldsToValidate = ['userName', 'fullName', 'mobile', 'nationalCode', 'password', 'confirmPassword', 'captchaInput'];
//     fieldsToValidate.forEach(field => {
//       setTouched(prev => ({ ...prev, [field]: true }));
//       validateField(field, formData[field]);
//     });
    
//     if (!isFormValid()) {
//       toast.warning('لطفاً تمام اطلاعات را به درستی تکمیل کنید');
//       return;
//     }
    
//     setLoading(true);
    
//     const submitData = {
//       userName: formData.userName.trim(),
//       fullName: formData.fullName.trim(),
//       mobileNumber: formData.mobile,
//       passWord: formData.password,
//       nationalCode: formData.nationalCode,
//       codeMoaref: formData.codeMoaref?.trim() || '',
//       captchaId: formData.captchaId,
//       captchaInput: formData.captchaInput
//     };
    
//     try {
//       const response = await fetch('https://localhost:7178/api/Auth/registerNewUserIndependent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(submitData),
//       });
      
//       const data = await response.json();
      
//       if (response.status === 200 && data) {
//         toast.success(data.data || 'ثبت‌نام با موفقیت انجام شد! لطفاً وارد شوید');
//         // هدایت به صفحه ورود با OTP
//         setTimeout(() => {
//           navigate('/otp-login', { 
//             state: { mobileNumber: formData.mobile } 
//           });
//         }, 2000);
//       } else {
//         if (data.error === 'captcha_invalid') {
//           toast.error('کد امنیتی اشتباه است');
//           fetchCaptcha();
//         } else if (data.error === 'captcha_expired') {
//           toast.error('کد امنیتی منقضی شده است');
//           fetchCaptcha();
//         } else {
//           toast.error(data.message || data.error || 'خطا در ثبت‌نام');
//         }
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       toast.error('خطا در ارتباط با سرور. لطفاً مجدداً تلاش کنید');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // دکمه بازگشت به خانه
//   const handleGoHome = () => {
//     navigate('/');
//   };

//   // دکمه ورود
//   const handleGoToLogin = () => {
//     navigate('/login');
//   };

//   if (authLoading) {
//     return (
//       <div className="loading-screen">
//         <div className="loading-spinner"></div>
//         <span>در حال بارگذاری...</span>
//       </div>
//     );
//   }

//   const benefits = [
//     { icon: '🏆', title: 'اعتبار برند اوتاپ', desc: 'برخورداری از اعتبار و جایگاه برند معتبر اوتاپ در بازار' },
//     { icon: '⚡', title: 'ثبت سریع و آسان ملک', desc: 'ثبت آگهی در کمترین زمان ممکن با رابط کاربری ساده' },
//     { icon: '🎨', title: 'پنل مشاوری حرفه‌ای', desc: 'پنل اختصاصی با طراحی مدرن و کاربری فوق‌العاده آسان' },
//     { icon: '💰', title: 'کیف پول و شارژ هدیه', desc: 'امکان برخورداری از کیف پول و دریافت شارژ هدیه' },
//     { icon: '📈', title: 'امکانات ارتقاء آگهی', desc: 'به روزرسانی، ویترین، بسته افزایش بازدید و آگهی ویژه' },
//     { icon: '📊', title: 'آمار بازدید و تماس', desc: 'مشاهده آمار دقیق بازدید و تماس به تفکیک هر آگهی' }
//   ];

//   return (
//     <div className="independent-register-container">
//       <ToastContainer position="top-center" rtl={true} autoClose={3000} />
      
//       <div className="independent-background">
//         <div className="gradient-bg"></div>
//         <div className="overlay"></div>
//       </div>
      
//       <div className="two-column-layout">
//         {/* سمت راست - توضیحات و مزایا */}
//         <div className="right-column-info">
//           <div className="content-wrapper">
//             <div className="brand-header">
//               <div className="logo-icon">🏠</div>
//               <h1 className="brand-name">اوتاپ</h1>
//               <p className="brand-tagline">بزرگترین سامانه تخصصی املاک ایران</p>
//             </div>

//             <div className="welcome-box">
//               <h2>به خانواده بزرگ اوتاپ خوش آمدید ✨</h2>
//               <p>با ثبت‌نام در سامانه اوتاپ، به جمع هزاران مشاور موفق بپیوندید و از امکانات پیشرفته ما بهره‌مند شوید.</p>
//             </div>

//             <div className="benefits-sidebar">
//               <h3>✨ مزایای همکاری با اوتاپ</h3>
//               <div className="benefits-list">
//                 {benefits.map((benefit, idx) => (
//                   <div key={idx} className="benefit-item">
//                     <div className="benefit-icon">{benefit.icon}</div>
//                     <div className="benefit-info">
//                       <strong>{benefit.title}</strong>
//                       <p>{benefit.desc}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="stats-box">
//               <div className="stat">
//                 <span className="stat-number">۱۰,۰۰۰+</span>
//                 <span className="stat-label">مشاور فعال</span>
//               </div>
//               <div className="stat">
//                 <span className="stat-number">۵۰,۰۰۰+</span>
//                 <span className="stat-label">آگهی فعال</span>
//               </div>
//               <div className="stat">
//                 <span className="stat-number">۹۸٪</span>
//                 <span className="stat-label">رضایت مشاوران</span>
//               </div>
//             </div>

//             <div className="support-box">
//               <div className="support-icon">📞</div>
//               <div>
//                 <h4>پشتیبانی ۲۴ ساعته</h4>
//                 <p>تیم پشتیبانی اوتاپ همواره آماده پاسخگویی به سوالات شماست</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* سمت چپ - فرم ثبت‌نام */}
//         <div className="left-column-form">
//           <div className="form-card">
//             {/* دکمه‌های ناوبری بالای فرم */}
//             <div className="form-nav-buttons">
//               <button 
//                 type="button" 
//                 onClick={handleGoHome} 
//                 className="nav-btn home-btn"
//                 title="بازگشت به صفحه اصلی"
//               >
//                 <FaHome />
//                 <span>خانه</span>
//               </button>
//               <button 
//                 type="button" 
//                 onClick={handleGoToLogin} 
//                 className="nav-btn login-btn"
//                 title="ورود به حساب کاربری"
//               >
//                 <FaSignInAlt />
//                 <span>ورود</span>
//               </button>
//             </div>

//             <div className="form-header">
//               <div className="form-icon">
//                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
//                   <path d="M12 2C8.13 2 5 5.13 5 9v4c0 3.87 3.13 7 7 7s7-3.13 7-7V9c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2"/>
//                   <path d="M12 22v-2M8 2h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//                 </svg>
//               </div>
//               <h2>فرم ثبت‌نام مشاور مستقل</h2>
//               <p>لطفاً اطلاعات خواسته شده را دقیق وارد کنید</p>
//             </div>

//             <form onSubmit={handleSubmit} className="register-form" noValidate>
//               {/* فیلدهای فرم مثل قبل */}
//               <div className="form-group floating-label">
//                 <input
//                   type="text"
//                   name="userName"
//                   value={formData.userName}
//                   onChange={handleChange}
//                   onBlur={() => handleBlur('userName')}
//                   className={`ltr ${touched.userName && errors.userName ? 'error' : touched.userName && !errors.userName && formData.userName ? 'success' : ''}`}
//                   placeholder=" "
//                   disabled={loading}
//                 />
//                 <label>نام کاربری</label>
//                 {touched.userName && errors.userName && <span className="error-message">{errors.userName}</span>}
//                 {touched.userName && !errors.userName && formData.userName && <FaCheckCircle className="success-check-icon" />}
//               </div>

//               <div className="form-group floating-label">
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   onBlur={() => handleBlur('fullName')}
//                   className={touched.fullName && errors.fullName ? 'error' : touched.fullName && !errors.fullName && formData.fullName ? 'success' : ''}
//                   placeholder=" "
//                   disabled={loading}
//                 />
//                 <label>نام و نام خانوادگی</label>
//                 {touched.fullName && errors.fullName && <span className="error-message">{errors.fullName}</span>}
//                 {touched.fullName && !errors.fullName && formData.fullName && <FaCheckCircle className="success-check-icon" />}
//               </div>

//               <div className="form-group floating-label">
//                 <input
//                   type="tel"
//                   name="mobile"
//                   value={formData.mobile}
//                   onChange={handleChange}
//                   onBlur={() => handleBlur('mobile')}
//                   className={`ltr ${touched.mobile && errors.mobile ? 'error' : touched.mobile && !errors.mobile && formData.mobile ? 'success' : ''}`}
//                   placeholder=" "
//                   disabled={loading}
//                 />
//                 <label>شماره موبایل</label>
//                 {touched.mobile && errors.mobile && <span className="error-message">{errors.mobile}</span>}
//                 {touched.mobile && !errors.mobile && formData.mobile && <FaCheckCircle className="success-check-icon" />}
//               </div>

//               <div className="form-group floating-label">
//                 <div className="password-wrapper">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     onBlur={() => handleBlur('password')}
//                     className={touched.password && errors.password ? 'error' : ''}
//                     placeholder=" "
//                     disabled={loading}
//                   />
//                   <label>رمز عبور</label>
//                   <button 
//                     type="button" 
//                     className="toggle-password" 
//                     onClick={() => setShowPassword(!showPassword)}
//                     tabIndex="-1"
//                   >
//                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </div>
//                 {formData.password && (
//                   <div className="password-strength">
//                     <div className="strength-bar">
//                       <div className="strength-fill" style={{ width: passwordStrength.width, backgroundColor: passwordStrength.color }} />
//                     </div>
//                     <span className="strength-text" style={{ color: passwordStrength.color }}>رمز {passwordStrength.message}</span>
//                   </div>
//                 )}
//                 {touched.password && errors.password && <span className="error-message">{errors.password}</span>}
//               </div>

//               <div className="form-group floating-label">
//                 <div className="password-wrapper">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     onBlur={() => handleBlur('confirmPassword')}
//                     className={touched.confirmPassword && errors.confirmPassword ? 'error' : touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword ? 'success' : ''}
//                     placeholder=" "
//                     disabled={loading}
//                   />
//                   <label>تکرار رمز عبور</label>
//                   <button 
//                     type="button" 
//                     className="toggle-password" 
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     tabIndex="-1"
//                   >
//                     {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </div>
//                 {touched.confirmPassword && errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
//                 {touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword && (
//                   <span className="success-message"><FaCheckCircle /> رمز عبور مطابقت دارد</span>
//                 )}
//               </div>

//               <div className="form-group floating-label">
//                 <input
//                   type="text"
//                   name="nationalCode"
//                   value={formData.nationalCode}
//                   onChange={handleChange}
//                   onBlur={() => handleBlur('nationalCode')}
//                   className={`ltr ${touched.nationalCode && errors.nationalCode ? 'error' : touched.nationalCode && !errors.nationalCode && formData.nationalCode ? 'success' : ''}`}
//                   placeholder=" "
//                   maxLength="10"
//                   disabled={loading}
//                 />
//                 <label>کد ملی</label>
//                 {touched.nationalCode && errors.nationalCode && <span className="error-message">{errors.nationalCode}</span>}
//                 {touched.nationalCode && !errors.nationalCode && formData.nationalCode && <FaCheckCircle className="success-check-icon" />}
//               </div>

//               <div className="form-group floating-label">
//                 <input
//                   type="text"
//                   name="codeMoaref"
//                   value={formData.codeMoaref}
//                   onChange={handleChange}
//                   onBlur={() => handleBlur('codeMoaref')}
//                   className={`ltr ${touched.codeMoaref && errors.codeMoaref ? 'error' : ''}`}
//                   placeholder=" "
//                   disabled={loading}
//                 />
//                 <label>کد معرف (اختیاری)</label>
//                 {touched.codeMoaref && errors.codeMoaref && <span className="error-message">{errors.codeMoaref}</span>}
//               </div>

//               <div className="captcha-section">
//                 <label className="captcha-label">کد امنیتی <span className="required">*</span></label>
//                 <div className="captcha-container">
//                   <div className="captcha-image-wrapper">
//                     {captchaLoading ? (
//                       <div className="captcha-loading">
//                         <div className="loading-spinner-small"></div>
//                       </div>
//                     ) : (
//                       <img 
//                         src={captchaImage} 
//                         alt="کد امنیتی" 
//                         className="captcha-image"
//                         onClick={fetchCaptcha}
//                       />
//                     )}
//                     <button 
//                       type="button" 
//                       className="refresh-captcha"
//                       onClick={fetchCaptcha}
//                       disabled={captchaLoading}
//                     >
//                       <FaSyncAlt className={captchaLoading ? 'spin' : ''} />
//                     </button>
//                   </div>
//                   <div className="captcha-input-wrapper">
//                     <input
//                       type="text"
//                       name="captchaInput"
//                       value={formData.captchaInput}
//                       onChange={handleChange}
//                       onBlur={() => handleBlur('captchaInput')}
//                       className={`captcha-input ${touched.captchaInput && errors.captchaInput ? 'error' : touched.captchaInput && !errors.captchaInput && formData.captchaInput ? 'success' : ''}`}
//                       placeholder="کد روبرو را وارد کنید"
//                       maxLength="4"
//                       disabled={loading}
//                     />
//                     {touched.captchaInput && errors.captchaInput && (
//                       <span className="error-message">{errors.captchaInput}</span>
//                     )}
//                     {touched.captchaInput && !errors.captchaInput && formData.captchaInput && (
//                       <FaCheckCircle className="captcha-success-icon" />
//                     )}
//                   </div>
//                 </div>
//                 <p className="captcha-hint">برای مشاهده کد جدید روی تصویر کلیک کنید</p>
//               </div>

//               <div className="notice-box">
//                 <div className="notice-icon">💡</div>
//                 <div className="notice-content">
//                   <strong>نکات مهم:</strong>
//                   <ul>
//                     <li>پس از ثبت، پنل اختصاصی برای شما ایجاد می‌شود</li>
//                     <li>اطلاعات ورود (نام کاربری و رمز عبور) از طریق پیامک ارسال خواهد شد</li>
//                     <li>امکان ثبت آگهی، افزایش بازدید و مشاهده آمار دقیق تماس‌ها</li>
//                     <li>پشتیبانی آنلاین و پاسخگویی سریع به سوالات شما</li>
//                   </ul>
//                 </div>
//               </div>

//               <div className="terms-section">
//                 <label className="terms-label">
//                   <input 
//                     type="checkbox" 
//                     checked={acceptTerms} 
//                     onChange={(e) => setAcceptTerms(e.target.checked)} 
//                     disabled={loading}
//                   />
//                   <span className="custom-checkbox"></span>
//                   <span>قوانین و مقررات سایت اوتاپ را مطالعه کرده و می‌پذیرم</span>
//                 </label>
//               </div>

//               <button type="submit" className="submit-button" disabled={loading}>
//                 {loading ? (
//                   <>
//                     <div className="button-spinner"></div>
//                     در حال ثبت‌نام...
//                   </>
//                 ) : (
//                   <>
//                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//                       <path d="M20 12v8H4v-8M12 2v12m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//                     </svg>
//                     ثبت‌نام و ادامه
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterIndependent;

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterIndependent.css';
import { useAuth } from '../../../context/AuthContext';
import { FaEye, FaEyeSlash, FaSyncAlt, FaCheckCircle, FaHome, FaSignInAlt } from 'react-icons/fa';

const RegisterIndependent = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    userName: '',
    fullName: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    nationalCode: '',
    codeMoaref: '',
    captchaId: '',
    captchaInput: ''
  });
  
  const [captchaImage, setCaptchaImage] = useState('');
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, message: '', color: '', width: '0%' });

  // بهینه‌سازی سئو - متا تگ‌ها
  const updateMetaTags = () => {
    document.title = 'ثبت‌نام مشاور مستقل | اوتاپ - بزرگترین سامانه املاک ایران';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = 'ثبت‌نام مشاورین مستقل در سایت اوتاپ - با پنل حرفه‌ای، امکانات پیشرفته و شرایط ویژه برای مشاورین املاک. ثبت نام آسان و سریع مشاوران املاک';
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'ثبت نام مشاور مستقل, مشاور املاک, ثبت نام مشاور املاک, اوتاپ, پنل مشاوره املاک';
    
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = window.location.origin + '/register/independent';
  };

  const fetchCaptcha = async () => {
    setCaptchaLoading(true);
    try {
      const response = await fetch('https://localhost:7178/api/auth/captcha', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCaptchaImage(data.image);
        setFormData(prev => ({ ...prev, captchaId: data.captchaId, captchaInput: '' }));
        setErrors(prev => ({ ...prev, captchaInput: '' }));
      } else {
        toast.error('خطا در دریافت کد امنیتی');
      }
    } catch (error) {
      console.error('Error fetching captcha:', error);
      toast.error('خطا در ارتباط با سرور');
    } finally {
      setCaptchaLoading(false);
    }
  };

  useEffect(() => {
    updateMetaTags();
    fetchCaptcha();
  }, []);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/ConsultantProfile', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    checkPasswordStrength(formData.password);
    if (formData.confirmPassword) {
      validateField('confirmPassword', formData.confirmPassword);
    }
  }, [formData.password]);

  useEffect(() => {
    if (formData.confirmPassword) {
      validateField('confirmPassword', formData.confirmPassword);
    }
  }, [formData.confirmPassword]);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'userName':
        if (!value || !value.trim()) error = 'نام کاربری الزامی است';
        else if (value.trim().length < 3) error = 'حداقل ۳ کاراکتر وارد کنید';
        else if (!/^[a-zA-Z0-9_]+$/.test(value)) error = 'فقط حروف انگلیسی، اعداد و زیرخط مجاز است';
        break;
      case 'fullName':
        if (!value || !value.trim()) error = 'نام و نام خانوادگی الزامی است';
        else if (value.trim().length < 3) error = 'حداقل ۳ کاراکتر وارد کنید';
        break;
      case 'mobile':
        if (!value) error = 'شماره موبایل الزامی است';
        else if (!/^09[0-9]{9}$/.test(value)) error = 'شماره باید با 09 شروع و 11 رقم باشد';
        break;
      case 'nationalCode':
        if (!value) error = 'کد ملی الزامی است';
        else if (!/^[0-9]{10}$/.test(value)) error = 'کد ملی باید ۱۰ رقم باشد';
        else {
          const check = parseInt(value[9]);
          let sum = 0;
          for (let i = 0; i < 9; i++) sum += parseInt(value[i]) * (10 - i);
          const remainder = sum % 11;
          const isValid = remainder < 2 ? check === remainder : check === (11 - remainder);
          if (!isValid) error = 'کد ملی نامعتبر است';
        }
        break;
      case 'password':
        if (!value) error = 'رمز عبور الزامی است';
        else if (value.length < 6) error = 'حداقل ۶ کاراکتر';
        break;
      case 'confirmPassword':
        if (!value) error = 'تکرار رمز عبور الزامی است';
        else if (value !== formData.password) error = 'رمز عبور مطابقت ندارد';
        break;
      case 'codeMoaref':
        if (value && value.trim().length > 0 && !/^[a-zA-Z0-9]+$/.test(value)) {
          error = 'فرمت کد معرف نامعتبر است';
        }
        break;
      case 'captchaInput':
        if (!value || !value.trim()) error = 'کد امنیتی الزامی است';
        else if (value.length !== 4) error = 'کد امنیتی ۴ رقمی است';
        break;
      default: break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const checkPasswordStrength = (password) => {
    if (!password || password.length === 0) {
      setPasswordStrength({ score: 0, message: '', color: '', width: '0%' });
      return;
    }
    let score = 1;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;
    
    let message = '', color = '', width = '';
    if (score <= 2) { message = 'ضعیف'; color = '#ef4444'; width = '25%'; }
    else if (score <= 4) { message = 'متوسط'; color = '#f59e0b'; width = '60%'; }
    else { message = 'قوی'; color = '#10b981'; width = '100%'; }
    setPasswordStrength({ score, message, color, width });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'nationalCode') {
      const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      if (touched.nationalCode) validateField(name, numericValue);
    } else if (name === 'mobile') {
      const numericValue = value.replace(/[^0-9]/g, '').slice(0, 11);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      if (touched.mobile) validateField(name, numericValue);
    } else if (name === 'captchaInput') {
      const numericValue = value.replace(/[^0-9]/g, '').slice(0, 4);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      if (touched.captchaInput) validateField(name, numericValue);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (touched[name]) validateField(name, value);
    }
  };

  const isFormValid = () => {
    const userNameValid = formData.userName && formData.userName.trim() && !errors.userName;
    const fullNameValid = formData.fullName && formData.fullName.trim() && !errors.fullName;
    const mobileValid = formData.mobile && !errors.mobile;
    const passwordValid = formData.password && formData.password.length >= 6 && !errors.password;
    const confirmValid = formData.confirmPassword && formData.password === formData.confirmPassword && !errors.confirmPassword;
    const nationalCodeValid = formData.nationalCode && !errors.nationalCode;
    const captchaValid = formData.captchaInput && formData.captchaInput.length === 4 && !errors.captchaInput;
    
    return userNameValid && fullNameValid && mobileValid && passwordValid && confirmValid && 
           nationalCodeValid && captchaValid && acceptTerms;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // تمام فیلدها را touched کن
    const fieldsToValidate = ['userName', 'fullName', 'mobile', 'nationalCode', 'password', 'confirmPassword', 'captchaInput'];
    fieldsToValidate.forEach(field => {
      setTouched(prev => ({ ...prev, [field]: true }));
      validateField(field, formData[field]);
    });
    
    // بررسی قوانین
    if (!acceptTerms) {
      toast.warning('لطفاً قوانین و مقررات را بپذیرید');
      setTouched(prev => ({ ...prev, terms: true }));
      return;
    }
    
    if (!isFormValid()) {
      toast.warning('لطفاً تمام اطلاعات را به درستی تکمیل کنید');
      return;
    }
    
    setLoading(true);
    
    const submitData = {
      userName: formData.userName.trim(),
      fullName: formData.fullName.trim(),
      mobileNumber: formData.mobile,
      passWord: formData.password,
      nationalCode: formData.nationalCode,
      codeMoaref: formData.codeMoaref?.trim() || '',
      captchaId: formData.captchaId,
      captchaInput: formData.captchaInput
    };
    
    try {
      const response = await fetch('https://localhost:7178/api/Auth/registerNewUserIndependent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData),
      });
      
      const data = await response.json();
      
      if (response.status === 200 && data) {
        toast.success(data.data || 'ثبت‌نام با موفقیت انجام شد! لطفاً وارد شوید');
        setTimeout(() => {
          navigate('/ConsultantProfile', { 
            state: { mobileNumber: formData.mobile } 
          });
        }, 2000);
      } else {
        if (data.error === 'captcha_invalid') {
          toast.error('کد امنیتی اشتباه است');
          fetchCaptcha();
        } else if (data.error === 'captcha_expired') {
          toast.error('کد امنیتی منقضی شده است');
          fetchCaptcha();
        } else {
          toast.error(data.message || data.error || 'خطا در ثبت‌نام');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('خطا در ارتباط با سرور. لطفاً مجدداً تلاش کنید');
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => navigate('/');
  const handleGoToLogin = () => navigate('/login');

  if (authLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <span>در حال بارگذاری...</span>
      </div>
    );
  }

  const benefits = [
    { icon: '🏆', title: 'اعتبار برند اوتاپ', desc: 'برخورداری از اعتبار و جایگاه برند معتبر اوتاپ در بازار' },
    { icon: '⚡', title: 'ثبت سریع و آسان ملک', desc: 'ثبت آگهی در کمترین زمان ممکن با رابط کاربری ساده' },
    { icon: '🎨', title: 'پنل مشاوری حرفه‌ای', desc: 'پنل اختصاصی با طراحی مدرن و کاربری فوق‌العاده آسان' },
    { icon: '💰', title: 'کیف پول و شارژ هدیه', desc: 'امکان برخورداری از کیف پول و دریافت شارژ هدیه' },
    { icon: '📈', title: 'امکانات ارتقاء آگهی', desc: 'به روزرسانی، ویترین، بسته افزایش بازدید و آگهی ویژه' },
    { icon: '📊', title: 'آمار بازدید و تماس', desc: 'مشاهده آمار دقیق بازدید و تماس به تفکیک هر آگهی' }
  ];

  return (
    <div className="independent-register-container">
      <ToastContainer position="top-center" rtl={true} autoClose={3000} />
      
      <div className="independent-background">
        <div className="gradient-bg"></div>
        <div className="overlay"></div>
      </div>
      
      <div className="two-column-layout">
        {/* سمت راست - توضیحات و مزایا */}
        <div className="right-column-info">
          <div className="content-wrapper">
            <div className="brand-header">
              <div className="logo-icon">🏠</div>
              <h1 className="brand-name">اوتاپ</h1>
              <p className="brand-tagline">بزرگترین سامانه تخصصی املاک ایران</p>
            </div>

            <div className="welcome-box">
              <h2>به خانواده بزرگ اوتاپ خوش آمدید ✨</h2>
              <p>با ثبت‌نام در سامانه اوتاپ، به جمع هزاران مشاور موفق بپیوندید و از امکانات پیشرفته ما بهره‌مند شوید.</p>
            </div>

            <div className="benefits-sidebar">
              <h3>✨ مزایای همکاری با اوتاپ</h3>
              <div className="benefits-list">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="benefit-item">
                    <div className="benefit-icon">{benefit.icon}</div>
                    <div className="benefit-info">
                      <strong>{benefit.title}</strong>
                      <p>{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="stats-box">
              <div className="stat">
                <span className="stat-number">۱۰,۰۰۰+</span>
                <span className="stat-label">مشاور فعال</span>
              </div>
              <div className="stat">
                <span className="stat-number">۵۰,۰۰۰+</span>
                <span className="stat-label">آگهی فعال</span>
              </div>
              <div className="stat">
                <span className="stat-number">۹۸٪</span>
                <span className="stat-label">رضایت مشاوران</span>
              </div>
            </div>

            <div className="support-box">
              <div className="support-icon">📞</div>
              <div>
                <h4>پشتیبانی ۲۴ ساعته</h4>
                <p>تیم پشتیبانی اوتاپ همواره آماده پاسخگویی به سوالات شماست</p>
              </div>
            </div>
          </div>
        </div>

        {/* سمت چپ - فرم ثبت‌نام */}
        <div className="left-column-form">
          <div className="form-card">
            <div className="form-header">
              <div className="form-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9v4c0 3.87 3.13 7 7 7s7-3.13 7-7V9c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 22v-2M8 2h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h2>فرم ثبت‌نام مشاور مستقل</h2>
              <p>لطفاً اطلاعات خواسته شده را دقیق وارد کنید</p>
            </div>

            <form onSubmit={handleSubmit} className="register-form" noValidate>
              <div className="form-group floating-label">
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  onBlur={() => handleBlur('userName')}
                  className={`ltr ${touched.userName && errors.userName ? 'error' : touched.userName && !errors.userName && formData.userName ? 'success' : ''}`}
                  placeholder=" "
                  disabled={loading}
                />
                <label>نام کاربری</label>
                {touched.userName && errors.userName && <span className="error-message">{errors.userName}</span>}
                {touched.userName && !errors.userName && formData.userName && <FaCheckCircle className="success-check-icon" />}
              </div>

              <div className="form-group floating-label">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={() => handleBlur('fullName')}
                  className={touched.fullName && errors.fullName ? 'error' : touched.fullName && !errors.fullName && formData.fullName ? 'success' : ''}
                  placeholder=" "
                  disabled={loading}
                />
                <label>نام و نام خانوادگی</label>
                {touched.fullName && errors.fullName && <span className="error-message">{errors.fullName}</span>}
                {touched.fullName && !errors.fullName && formData.fullName && <FaCheckCircle className="success-check-icon" />}
              </div>

              <div className="form-group floating-label">
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  onBlur={() => handleBlur('mobile')}
                  className={`ltr ${touched.mobile && errors.mobile ? 'error' : touched.mobile && !errors.mobile && formData.mobile ? 'success' : ''}`}
                  placeholder=" "
                  disabled={loading}
                />
                <label>شماره موبایل</label>
                {touched.mobile && errors.mobile && <span className="error-message">{errors.mobile}</span>}
                {touched.mobile && !errors.mobile && formData.mobile && <FaCheckCircle className="success-check-icon" />}
              </div>

              <div className="form-group floating-label">
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur('password')}
                    className={touched.password && errors.password ? 'error' : ''}
                    placeholder=" "
                    disabled={loading}
                  />
                  <label>رمز عبور</label>
                  <button 
                    type="button" 
                    className="toggle-password" 
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div className="strength-fill" style={{ width: passwordStrength.width, backgroundColor: passwordStrength.color }} />
                    </div>
                    <span className="strength-text" style={{ color: passwordStrength.color }}>رمز {passwordStrength.message}</span>
                  </div>
                )}
                {touched.password && errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-group floating-label">
                <div className="password-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={() => handleBlur('confirmPassword')}
                    className={touched.confirmPassword && errors.confirmPassword ? 'error' : touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword ? 'success' : ''}
                    placeholder=" "
                    disabled={loading}
                  />
                  <label>تکرار رمز عبور</label>
                  <button 
                    type="button" 
                    className="toggle-password" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex="-1"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {touched.confirmPassword && errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                {touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <span className="success-message"><FaCheckCircle /> رمز عبور مطابقت دارد</span>
                )}
              </div>

              <div className="form-group floating-label">
                <input
                  type="text"
                  name="nationalCode"
                  value={formData.nationalCode}
                  onChange={handleChange}
                  onBlur={() => handleBlur('nationalCode')}
                  className={`ltr ${touched.nationalCode && errors.nationalCode ? 'error' : touched.nationalCode && !errors.nationalCode && formData.nationalCode ? 'success' : ''}`}
                  placeholder=" "
                  maxLength="10"
                  disabled={loading}
                />
                <label>کد ملی</label>
                {touched.nationalCode && errors.nationalCode && <span className="error-message">{errors.nationalCode}</span>}
                {touched.nationalCode && !errors.nationalCode && formData.nationalCode && <FaCheckCircle className="success-check-icon" />}
              </div>

              <div className="form-group floating-label">
                <input
                  type="text"
                  name="codeMoaref"
                  value={formData.codeMoaref}
                  onChange={handleChange}
                  onBlur={() => handleBlur('codeMoaref')}
                  className={`ltr ${touched.codeMoaref && errors.codeMoaref ? 'error' : ''}`}
                  placeholder=" "
                  disabled={loading}
                />
                <label>کد معرف (اختیاری)</label>
                {touched.codeMoaref && errors.codeMoaref && <span className="error-message">{errors.codeMoaref}</span>}
              </div>

              <div className="captcha-section">
                <label className="captcha-label">کد امنیتی <span className="required">*</span></label>
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
                        onClick={fetchCaptcha}
                      />
                    )}
                    <button 
                      type="button" 
                      className="refresh-captcha"
                      onClick={fetchCaptcha}
                      disabled={captchaLoading}
                    >
                      <FaSyncAlt className={captchaLoading ? 'spin' : ''} />
                    </button>
                  </div>
                  <div className="captcha-input-wrapper">
                    <input
                      type="text"
                      name="captchaInput"
                      value={formData.captchaInput}
                      onChange={handleChange}
                      onBlur={() => handleBlur('captchaInput')}
                      className={`captcha-input ${touched.captchaInput && errors.captchaInput ? 'error' : touched.captchaInput && !errors.captchaInput && formData.captchaInput ? 'success' : ''}`}
                      placeholder="کد روبرو را وارد کنید"
                      maxLength="4"
                      disabled={loading}
                    />
                    {touched.captchaInput && errors.captchaInput && (
                      <span className="error-message">{errors.captchaInput}</span>
                    )}
                    {touched.captchaInput && !errors.captchaInput && formData.captchaInput && (
                      <FaCheckCircle className="captcha-success-icon" />
                    )}
                  </div>
                </div>
                <p className="captcha-hint">برای مشاهده کد جدید روی تصویر کلیک کنید</p>
              </div>

              <div className="notice-box">
                <div className="notice-icon">💡</div>
                <div className="notice-content">
                  <strong>نکات مهم:</strong>
                  <ul>
                    <li>پس از ثبت، پنل اختصاصی برای شما ایجاد می‌شود</li>
                    <li>اطلاعات ورود (نام کاربری و رمز عبور) از طریق پیامک ارسال خواهد شد</li>
                    <li>امکان ثبت آگهی، افزایش بازدید و مشاهده آمار دقیق تماس‌ها</li>
                    <li>پشتیبانی آنلاین و پاسخگویی سریع به سوالات شما</li>
                  </ul>
                </div>
              </div>

              <div className="terms-section">
                <label className="terms-label">
                  <input 
                    type="checkbox" 
                    checked={acceptTerms} 
                    onChange={(e) => {
                      setAcceptTerms(e.target.checked);
                      setTouched(prev => ({ ...prev, terms: true }));
                    }} 
                    disabled={loading}
                  />
                  <span className="custom-checkbox"></span>
                  <span>قوانین و مقررات سایت اوتاپ را مطالعه کرده و می‌پذیرم</span>
                </label>
                {touched.terms && !acceptTerms && (
                  <div className="error-message" style={{ marginTop: '8px', textAlign: 'center' }}>
                    برای ثبت‌نام باید قوانین را بپذیرید
                  </div>
                )}
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? (
                  <>
                    <div className="button-spinner"></div>
                    در حال ثبت‌نام...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20 12v8H4v-8M12 2v12m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    ثبت‌نام و ادامه
                  </>
                )}
              </button>

              {/* دکمه‌های خانه و ورود - حالا در پایین فرم */}
              <div className="form-extra-buttons">
                <button type="button" onClick={handleGoHome} className="nav-btn home-btn">
                  <FaHome />
                  <span>خانه</span>
                </button>
                <button type="button" onClick={handleGoToLogin} className="nav-btn2 login-btn">
                  <FaSignInAlt />
                  <span>ورود به حساب کاربری</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterIndependent;