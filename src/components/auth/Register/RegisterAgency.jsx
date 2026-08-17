
// // // // // // export default RegisterAgency;
// // // // // // RegisterAgency.jsx
// // // // // import React, { useState, useRef, useEffect, useCallback } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import { toast, ToastContainer } from 'react-toastify';
// // // // // import 'react-toastify/dist/ReactToastify.css';
// // // // // import './RegisterAgency.css';

// // // // // // تابع تبدیل مختصات
// // // // // const wgs84ToWebMercator = (lng, lat) => {
// // // // //   const R = 6378137;
// // // // //   return {
// // // // //     x: lng * (Math.PI * R) / 180,
// // // // //     y: Math.log(Math.tan((90 + lat) * Math.PI / 360)) * R
// // // // //   };
// // // // // };

// // // // // const webMercatorToWgs84 = (x, y) => {
// // // // //   const R = 6378137;
// // // // //   return {
// // // // //     lat: (2 * Math.atan(Math.exp(y / R)) - Math.PI / 2) * 180 / Math.PI,
// // // // //     lng: (x * 180) / (Math.PI * R)
// // // // //   };
// // // // // };

// // // // // const RegisterAgency = () => {
// // // // //   const mapRef = useRef(null);
// // // // //   const [mapKey] = useState("web.31c5ea6c425e40cc9b30620a84a8be90");
// // // // //   const [mapLoaded, setMapLoaded] = useState(false);
  
// // // // //   const [formData, setFormData] = useState({
// // // // //     fullName: '', mobile: '', password: '', confirmPassword: '',
// // // // //     nationalCode: '', agentCode: '', province: '', city: '',
// // // // //     officeAddress: '', licenseNumber: '', licenseExpiryDate: '',
// // // // //     nationalCardImage: null, licenseImage: null,
// // // // //     lat: 35.699739, lng: 51.338097
// // // // //   });
  
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [acceptTerms, setAcceptTerms] = useState(false);
// // // // //   const [nationalCardPreview, setNationalCardPreview] = useState(null);
// // // // //   const [licensePreview, setLicensePreview] = useState(null);
// // // // //   const [showPassword, setShowPassword] = useState(false);
// // // // //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// // // // //   const [locationSelected, setLocationSelected] = useState(false);
// // // // //   const [mapCenter, setMapCenter] = useState({ lat: 35.699739, lng: 51.338097 });
// // // // //   const [searchAddress, setSearchAddress] = useState('');
// // // // //   const [searching, setSearching] = useState(false);
// // // // //   const [activeSection, setActiveSection] = useState('personal');
  
// // // // //   const nationalCardRef = useRef(null);
// // // // //   const licenseRef = useRef(null);
// // // // //   const navigate = useNavigate();

// // // // //   const benefits = [
// // // // //     { icon: '🏆', title: 'اعتبار برند اوتاپ', desc: 'برخورداری از اعتبار و جایگاه برند معتبر', color: '#7d0000' },
// // // // //     { icon: '⚡', title: 'ثبت سریع و آسان ملک', desc: 'ثبت آگهی در کمترین زمان ممکن', color: '#d4af37' },
// // // // //     { icon: '🎨', title: 'پنل مشاوری حرفه‌ای', desc: 'پنل اختصاصی با طراحی مدرن و کاربری آسان', color: '#7d0000' },
// // // // //     { icon: '💰', title: 'کیف پول و شارژ هدیه', desc: 'امکان برخورداری از کیف پول و دریافت شارژ هدیه', color: '#d4af37' },
// // // // //     { icon: '📈', title: 'امکانات ارتقاء آگهی', desc: 'به روزرسانی، ویترین، بسته افزایش بازدید', color: '#7d0000' },
// // // // //     { icon: '📊', title: 'آمار بازدید و تماس', desc: 'مشاهده آمار دقیق بازدید و تماس هر آگهی', color: '#d4af37' }
// // // // //   ];

// // // // //   // لود کردن اسکریپت نقشه
// // // // //   useEffect(() => {
// // // // //     const loadNeshanMap = () => {
// // // // //       return new Promise((resolve) => {
// // // // //         if (document.querySelector('script[src*="neshan"]')) {
// // // // //           resolve();
// // // // //           return;
// // // // //         }
// // // // //         const script = document.createElement('script');
// // // // //         script.src = 'https://static.neshan.org/api/openlayers/4.6.5/ol.js';
// // // // //         script.onload = () => {
// // // // //           const link = document.createElement('link');
// // // // //           link.rel = 'stylesheet';
// // // // //           link.href = 'https://static.neshan.org/api/openlayers/4.6.5/ol.css';
// // // // //           document.head.appendChild(link);
// // // // //           resolve();
// // // // //         };
// // // // //         document.head.appendChild(script);
// // // // //       });
// // // // //     };

// // // // //     loadNeshanMap().then(() => {
// // // // //       setMapLoaded(true);
// // // // //     });
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     const observer = new IntersectionObserver((entries) => {
// // // // //       entries.forEach(entry => {
// // // // //         if (entry.isIntersecting) {
// // // // //           entry.target.classList.add('visible');
// // // // //         }
// // // // //       });
// // // // //     }, { threshold: 0.1 });

// // // // //     document.querySelectorAll('.form-section, .benefit-item, .upload-box').forEach(el => {
// // // // //       observer.observe(el);
// // // // //     });

// // // // //     return () => observer.disconnect();
// // // // //   }, []);

// // // // //   const validateNationalCode = (code) => {
// // // // //     if (!/^\d{10}$/.test(code)) return false;
// // // // //     const check = parseInt(code[9], 10);
// // // // //     let sum = 0;
// // // // //     for (let i = 0; i < 9; i++) sum += parseInt(code[i], 10) * (10 - i);
// // // // //     const remainder = sum % 11;
// // // // //     if (remainder < 2) return check === remainder;
// // // // //     return check === (11 - remainder);
// // // // //   };

// // // // //   const validateMobile = (mobile) => /^09[0-9]{9}$/.test(mobile);

// // // // //   const updateLocation = useCallback((lat, lng) => {
// // // // //     setFormData(prev => ({ ...prev, lat, lng }));
// // // // //     setMapCenter({ lat, lng });
// // // // //     setLocationSelected(true);
    
// // // // //     if (mapRef.current && mapRef.current.getView) {
// // // // //       try {
// // // // //         const view = mapRef.current.getView();
// // // // //         const coords = wgs84ToWebMercator(lng, lat);
// // // // //         view.setCenter([coords.x, coords.y]);
// // // // //         view.setZoom(17);
// // // // //       } catch (error) {
// // // // //         console.error('خطا در به‌روزرسانی نقشه:', error);
// // // // //       }
// // // // //     }
// // // // //   }, []);

// // // // //   const reverseGeocode = useCallback(async (lat, lng) => {
// // // // //     try {
// // // // //       const response = await fetch(`https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`, {
// // // // //         headers: { 'Api-Key': mapKey }
// // // // //       });
// // // // //       const data = await response.json();
// // // // //       if (data?.formatted_address) {
// // // // //         setFormData(prev => ({ ...prev, officeAddress: data.formatted_address }));
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('خطا در تبدیل معکوس:', error);
// // // // //     }
// // // // //   }, [mapKey]);

// // // // //   const searchAddressHandler = useCallback(async () => {
// // // // //     if (!searchAddress.trim()) {
// // // // //       toast.warning('لطفاً آدرس را وارد کنید');
// // // // //       return;
// // // // //     }
    
// // // // //     setSearching(true);
// // // // //     try {
// // // // //       const response = await fetch(
// // // // //         `https://api.neshan.org/v4/search?term=${encodeURIComponent(searchAddress)}&lat=${mapCenter.lat}&lng=${mapCenter.lng}`,
// // // // //         { headers: { 'Api-Key': mapKey } }
// // // // //       );
// // // // //       const data = await response.json();
      
// // // // //       if (data.items?.length > 0) {
// // // // //         const item = data.items[0];
// // // // //         updateLocation(item.location.y, item.location.x);
// // // // //         setFormData(prev => ({ ...prev, officeAddress: item.title }));
// // // // //         reverseGeocode(item.location.y, item.location.x);
// // // // //         toast.success('موقعیت پیدا شد');
// // // // //       } else {
// // // // //         toast.error('آدرس یافت نشد');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       toast.error('خطا در جستجو');
// // // // //     } finally {
// // // // //       setSearching(false);
// // // // //     }
// // // // //   }, [searchAddress, mapCenter, mapKey, updateLocation, reverseGeocode]);

// // // // //   const handleChange = (e) => {
// // // // //     const { name, value } = e.target;
    
// // // // //     if (name === 'nationalCode' || name === 'mobile' || name === 'agentCode') {
// // // // //       const numericValue = value.replace(/[^0-9]/g, '');
// // // // //       const maxLen = name === 'nationalCode' ? 10 : name === 'mobile' ? 11 : 20;
// // // // //       if (numericValue.length <= maxLen) {
// // // // //         setFormData(prev => ({ ...prev, [name]: numericValue }));
// // // // //       }
// // // // //     } else {
// // // // //       setFormData(prev => ({ ...prev, [name]: value }));
// // // // //     }
// // // // //   };

// // // // //   const handleImageChange = (e, type) => {
// // // // //     const file = e.target.files[0];
// // // // //     if (file) {
// // // // //       if (!file.type.match('image.*')) {
// // // // //         toast.error('فایل باید تصویر باشد');
// // // // //         return;
// // // // //       }
// // // // //       if (file.size > 2 * 1024 * 1024) {
// // // // //         toast.error('حجم تصویر حداکثر 2 مگابایت');
// // // // //         return;
// // // // //       }
      
// // // // //       const reader = new FileReader();
// // // // //       reader.onloadend = () => {
// // // // //         if (type === 'national') {
// // // // //           setNationalCardPreview(reader.result);
// // // // //           setFormData(prev => ({ ...prev, nationalCardImage: file }));
// // // // //         } else {
// // // // //           setLicensePreview(reader.result);
// // // // //           setFormData(prev => ({ ...prev, licenseImage: file }));
// // // // //         }
// // // // //       };
// // // // //       reader.readAsDataURL(file);
// // // // //     }
// // // // //   };

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();
    
// // // // //     if (!formData.fullName.trim()) return toast.error('نام و نام خانوادگی را وارد کنید');
// // // // //     if (!validateMobile(formData.mobile)) return toast.error('شماره موبایل نامعتبر است');
// // // // //     if (formData.password.length < 6) return toast.error('رمز عبور حداقل 6 کاراکتر باشد');
// // // // //     if (formData.password !== formData.confirmPassword) return toast.error('رمز عبور مطابقت ندارد');
// // // // //     if (!validateNationalCode(formData.nationalCode)) return toast.error('کد ملی نامعتبر است');
// // // // //     if (!formData.agentCode) return toast.error('کد مشاور را وارد کنید');
// // // // //     if (!formData.province) return toast.error('استان را انتخاب کنید');
// // // // //     if (!formData.city) return toast.error('شهر را انتخاب کنید');
// // // // //     if (!formData.officeAddress) return toast.error('آدرس دفتر را وارد کنید');
// // // // //     if (!formData.licenseNumber) return toast.error('شماره پروانه را وارد کنید');
// // // // //     if (!formData.licenseExpiryDate) return toast.error('تاریخ اعتبار پروانه را وارد کنید');
// // // // //     if (!nationalCardPreview) return toast.error('تصویر کارت ملی را آپلود کنید');
// // // // //     if (!licensePreview) return toast.error('تصویر پروانه را آپلود کنید');
// // // // //     if (!locationSelected) return toast.error('موقعیت دفتر را روی نقشه انتخاب کنید');
// // // // //     if (!acceptTerms) return toast.error('قوانین را بپذیرید');
    
// // // // //     setLoading(true);
// // // // //     const submitData = new FormData();
// // // // //     Object.keys(formData).forEach(key => {
// // // // //       if (formData[key] !== null && key !== 'confirmPassword') {
// // // // //         submitData.append(key, formData[key]);
// // // // //       }
// // // // //     });
// // // // //     submitData.append('userType', 'agency');
    
// // // // //     try {
// // // // //       const response = await fetch('https://localhost:7178/api/auth/register-agency', {
// // // // //         method: 'POST',
// // // // //         body: submitData,
// // // // //       });
// // // // //       const data = await response.json();
      
// // // // //       if (response.ok && data.success) {
// // // // //         toast.success('اطلاعات با موفقیت ثبت شد');
// // // // //         localStorage.setItem('userType', 'agency');
// // // // //         setTimeout(() => navigate('/register/verify', { 
// // // // //           state: { mobile: formData.mobile, userType: 'agency', fullName: formData.fullName } 
// // // // //         }), 2000);
// // // // //       } else {
// // // // //         toast.error(data.message || 'خطا در ثبت نام');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       toast.error('خطا در ارتباط با سرور');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleBack = () => navigate('/register');

// // // // //   const provinces = ['تهران', 'اصفهان', 'فارس', 'خراسان رضوی', 'آذربایجان شرقی', 'مازندران', 'گیلان', 'کرمان', 'خوزستان'];
// // // // //   const cities = {
// // // // //     'تهران': ['تهران', 'ری', 'شمیرانات', 'اسلامشهر', 'قدس', 'ملارد', 'ورامین'],
// // // // //     'اصفهان': ['اصفهان', 'کاشان', 'خمینی‌شهر', 'نجف‌آباد', 'شاهین‌شهر', 'مبارکه'],
// // // // //     'فارس': ['شیراز', 'مرودشت', 'کازرون', 'جهرم', 'فسا', 'لارستان'],
// // // // //     'خراسان رضوی': ['مشهد', 'نیشابور', 'سبزوار', 'تربت حیدریه', 'قوچان', 'کاشمر'],
// // // // //     'آذربایجان شرقی': ['تبریز', 'مراغه', 'مرند', 'میانه', 'اهر', 'بستان‌آباد'],
// // // // //     'مازندران': ['ساری', 'بابلسر', 'آمل', 'بابل', 'قائم‌شهر', 'نور'],
// // // // //     'گیلان': ['رشت', 'انزلی', 'لاهیجان', 'آستارا', 'تالش', 'رودسر'],
// // // // //     'کرمان': ['کرمان', 'سیرجان', 'رفسنجان', 'بم', 'جیرفت', 'زرند'],
// // // // //     'خوزستان': ['اهواز', 'آبادان', 'خرمشهر', 'دزفول', 'اندیمشک', 'شوشتر']
// // // // //   };

// // // // //   const scrollToSection = (section) => {
// // // // //     setActiveSection(section);
// // // // //     const element = document.querySelector(`[data-section="${section}"]`);
// // // // //     if (element) {
// // // // //       element.scrollIntoView({ behavior: 'smooth', block: 'center' });
// // // // //     }
// // // // //   };

// // // // //   // رندر نقشه
// // // // //   const renderMap = () => {
// // // // //     if (!mapLoaded) {
// // // // //       return (
// // // // //         <div className="map-loading">
// // // // //           <div className="loading-spinner"></div>
// // // // //           <p>در حال بارگذاری نقشه...</p>
// // // // //         </div>
// // // // //       );
// // // // //     }

// // // // //     // بررسی وجود کتابخانه OpenLayers
// // // // //     if (typeof window.ol === 'undefined') {
// // // // //       return (
// // // // //         <div className="map-loading">
// // // // //           <p>در حال بارگذاری نقشه...</p>
// // // // //         </div>
// // // // //       );
// // // // //     }

// // // // //     return (
// // // // //       <div id="neshan-map" className="neshan-map-container"></div>
// // // // //     );
// // // // //   };

// // // // //   // مقداردهی اولیه نقشه بعد از لود DOM
// // // // //   useEffect(() => {
// // // // //     if (mapLoaded && typeof window.ol !== 'undefined' && !mapRef.current) {
// // // // //       const center = wgs84ToWebMercator(mapCenter.lng, mapCenter.lat);
      
// // // // //       const map = new window.ol.Map({
// // // // //         target: 'neshan-map',
// // // // //         view: new window.ol.View({
// // // // //           center: [center.x, center.y],
// // // // //           zoom: 14,
// // // // //         }),
// // // // //         layers: [
// // // // //           new window.ol.layer.Tile({
// // // // //             source: new window.ol.source.XYZ({
// // // // //               url: `https://api.neshan.org/maps/neshan/v1/dreamy/{z}/{x}/{y}.png?key=${mapKey}`,
// // // // //               attributions: '© نقشه‌ نشان',
// // // // //             }),
// // // // //           }),
// // // // //         ],
// // // // //       });
      
// // // // //       mapRef.current = map;
      
// // // // //       map.on('click', (e) => {
// // // // //         if (loading) return;
// // // // //         const wgs84 = webMercatorToWgs84(e.coordinate[0], e.coordinate[1]);
// // // // //         updateLocation(wgs84.lat, wgs84.lng);
// // // // //         reverseGeocode(wgs84.lat, wgs84.lng);
// // // // //         toast.success('موقعیت ثبت شد');
// // // // //       });
// // // // //     }
// // // // //   }, [mapLoaded, mapCenter, mapKey, updateLocation, reverseGeocode, loading]);

// // // // //   return (
// // // // //     <div className="agency-register">
// // // // //       <ToastContainer position="top-center" rtl={true} />
      
// // // // //       <div className="particles">
// // // // //         {[...Array(12)].map((_, i) => (
// // // // //           <div key={i} className="particle" style={{
// // // // //             left: `${Math.random() * 100}%`,
// // // // //             top: `${Math.random() * 100}%`,
// // // // //             animationDelay: `${Math.random() * 15}s`,
// // // // //             animationDuration: `${10 + Math.random() * 10}s`,
// // // // //           }}></div>
// // // // //         ))}
// // // // //       </div>

// // // // //       <div className="register-container">
// // // // //         {/* سایدبار راست - توضیحات و مزایا */}
// // // // //         <div className="register-sidebar">
// // // // //           <div className="sidebar-content">
// // // // //             <div className="sidebar-header">
// // // // //               <div className="sidebar-icon">
// // // // //                 <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
// // // // //                   <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// // // // //                   <path d="M5 10.5V16.5L12 21L19 16.5V10.5" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// // // // //                   <path d="M12 15V21" stroke="#d4af37" strokeWidth="2" strokeLinecap="round"/>
// // // // //                 </svg>
// // // // //               </div>
// // // // //               <h2>عضویت آژانس املاک</h2>
// // // // //               <p>اگر آژانس شما دارای جواز کسب معتبر است، برای عضویت لطفا فرم مقابل را تکمیل نمائید.</p>
// // // // //             </div>

// // // // //             <div className="benefits-box">
// // // // //               <h3>
// // // // //                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
// // // // //                   <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" fill="#d4af37" stroke="#d4af37" strokeWidth="1.5"/>
// // // // //                 </svg>
// // // // //                 مزایا همکاری با اوتاپ
// // // // //               </h3>
// // // // //               <div className="benefits-list">
// // // // //                 {benefits.map((b, i) => (
// // // // //                   <div key={i} className="benefit-item" style={{ transitionDelay: `${i * 0.1}s` }}>
// // // // //                     <span className="benefit-icon">{b.icon}</span>
// // // // //                     <div>
// // // // //                       <strong style={{ color: b.color }}>{b.title}</strong>
// // // // //                       <p>{b.desc}</p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="info-box">
// // // // //               <div className="info-icon">
// // // // //                 <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
// // // // //                   <path d="M12 8V12L15 15M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#d4af37" strokeWidth="2" strokeLinecap="round"/>
// // // // //                 </svg>
// // // // //               </div>
// // // // //               <h4>توجه مهم</h4>
// // // // //               <ul>
// // // // //                 <li>پس از تایید جواز کسب و اطلاعات ثبت شده، پنلی اختصاصی برای آژانس شما ایجاد می‌شود</li>
// // // // //                 <li>اطلاعات کاربری از طریق پیامک ارسال خواهد شد</li>
// // // // //                 <li>می‌توانید مشاوران خود را به پنل اضافه کنید</li>
// // // // //                 <li>آگهی‌ها با نام و لوگوی آژانس شما نمایش داده می‌شود</li>
// // // // //               </ul>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* فرم اصلی سمت چپ */}
// // // // //         <div className="register-form-wrapper">
// // // // //           <div className="register-form">
// // // // //             <button className="back-btn" onClick={handleBack}>
// // // // //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // // //                 <path d="M19 12H5M12 19L5 12L12 5" strokeLinecap="round" strokeLinejoin="round"/>
// // // // //               </svg>
// // // // //               بازگشت
// // // // //             </button>

// // // // //             {/* پروگرس استپ */}
// // // // //             <div className="form-progress">
// // // // //               {['personal', 'agency', 'documents'].map((section, idx) => (
// // // // //                 <div 
// // // // //                   key={section} 
// // // // //                   className={`progress-step ${activeSection === section ? 'active' : ''}`}
// // // // //                   onClick={() => scrollToSection(section)}
// // // // //                 >
// // // // //                   <div className="step-number">{idx + 1}</div>
// // // // //                   <div className="step-label">
// // // // //                     {section === 'personal' && 'اطلاعات شخصی'}
// // // // //                     {section === 'agency' && 'اطلاعات آژانس'}
// // // // //                     {section === 'documents' && 'مدارک'}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>

// // // // //             <form onSubmit={handleSubmit}>
// // // // //               {/* بخش 1: اطلاعات شخصی */}
// // // // //               <div className="form-section" data-section="personal">
// // // // //                 <div className="section-title">
// // // // //                   <span>👤</span> اطلاعات شخصی
// // // // //                 </div>
// // // // //                 <div className="form-row">
// // // // //                   <div className="input-group">
// // // // //                     <label>نام و نام خانوادگی *</label>
// // // // //                     <input 
// // // // //                       type="text" 
// // // // //                       name="fullName" 
// // // // //                       value={formData.fullName} 
// // // // //                       onChange={handleChange} 
// // // // //                       placeholder="علی محمدی" 
// // // // //                       disabled={loading}
// // // // //                     />
// // // // //                   </div>
// // // // //                   <div className="input-group">
// // // // //                     <label>شماره موبایل *</label>
// // // // //                     <input 
// // // // //                       type="tel" 
// // // // //                       name="mobile" 
// // // // //                       value={formData.mobile} 
// // // // //                       onChange={handleChange} 
// // // // //                       placeholder="09123456789" 
// // // // //                       disabled={loading}
// // // // //                     />
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="form-row">
// // // // //                   <div className="input-group">
// // // // //                     <label>رمز عبور *</label>
// // // // //                     <div className="password-box">
// // // // //                       <input 
// // // // //                         type={showPassword ? "text" : "password"} 
// // // // //                         name="password" 
// // // // //                         value={formData.password} 
// // // // //                         onChange={handleChange} 
// // // // //                         placeholder="حداقل 6 کاراکتر" 
// // // // //                         disabled={loading}
// // // // //                       />
// // // // //                       <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
// // // // //                         {showPassword ? '🙈' : '👁️'}
// // // // //                       </button>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                   <div className="input-group">
// // // // //                     <label>تکرار رمز عبور *</label>
// // // // //                     <div className="password-box">
// // // // //                       <input 
// // // // //                         type={showConfirmPassword ? "text" : "password"} 
// // // // //                         name="confirmPassword" 
// // // // //                         value={formData.confirmPassword} 
// // // // //                         onChange={handleChange} 
// // // // //                         placeholder="تکرار رمز عبور" 
// // // // //                         disabled={loading}
// // // // //                       />
// // // // //                       <button type="button" className="eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
// // // // //                         {showConfirmPassword ? '🙈' : '👁️'}
// // // // //                       </button>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 {formData.confirmPassword && formData.password !== formData.confirmPassword && (
// // // // //                   <div className="error-msg">
// // // // //                     ❌ رمز عبور مطابقت ندارد
// // // // //                   </div>
// // // // //                 )}

// // // // //                 <div className="form-row">
// // // // //                   <div className="input-group">
// // // // //                     <label>کد ملی *</label>
// // // // //                     <input 
// // // // //                       type="text" 
// // // // //                       name="nationalCode" 
// // // // //                       value={formData.nationalCode} 
// // // // //                       onChange={handleChange} 
// // // // //                       maxLength="10" 
// // // // //                       placeholder="1234567890" 
// // // // //                       disabled={loading}
// // // // //                     />
// // // // //                   </div>
// // // // //                   <div className="input-group">
// // // // //                     <label>کد مشاور املاک *</label>
// // // // //                     <input 
// // // // //                       type="text" 
// // // // //                       name="agentCode" 
// // // // //                       value={formData.agentCode} 
// // // // //                       onChange={handleChange} 
// // // // //                       placeholder="کد مشاور" 
// // // // //                       disabled={loading}
// // // // //                     />
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               {/* بخش 2: اطلاعات آژانس */}
// // // // //               <div className="form-section" data-section="agency">
// // // // //                 <div className="section-title">
// // // // //                   <span>🏛️</span> اطلاعات آژانس و مجوزها
// // // // //                 </div>
// // // // //                 <div className="form-row">
// // // // //                   <div className="input-group">
// // // // //                     <label>استان *</label>
// // // // //                     <select name="province" value={formData.province} onChange={handleChange} disabled={loading}>
// // // // //                       <option value="">انتخاب استان</option>
// // // // //                       {provinces.map(p => <option key={p} value={p}>{p}</option>)}
// // // // //                     </select>
// // // // //                   </div>
// // // // //                   <div className="input-group">
// // // // //                     <label>شهر *</label>
// // // // //                     <select name="city" value={formData.city} onChange={handleChange} disabled={loading}>
// // // // //                       <option value="">انتخاب شهر</option>
// // // // //                       {formData.province && cities[formData.province]?.map(c => <option key={c} value={c}>{c}</option>)}
// // // // //                     </select>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="input-group full-width">
// // // // //                   <label>آدرس دفتر *</label>
// // // // //                   <input 
// // // // //                     type="text" 
// // // // //                     name="officeAddress" 
// // // // //                     value={formData.officeAddress} 
// // // // //                     onChange={handleChange} 
// // // // //                     placeholder="آدرس کامل دفتر" 
// // // // //                     disabled={loading}
// // // // //                   />
// // // // //                 </div>

// // // // //                 <div className="form-row">
// // // // //                   <div className="input-group">
// // // // //                     <label>شماره پروانه *</label>
// // // // //                     <input 
// // // // //                       type="text" 
// // // // //                       name="licenseNumber" 
// // // // //                       value={formData.licenseNumber} 
// // // // //                       onChange={handleChange} 
// // // // //                       placeholder="شماره پروانه" 
// // // // //                       disabled={loading}
// // // // //                     />
// // // // //                   </div>
// // // // //                   <div className="input-group">
// // // // //                     <label>تاریخ اعتبار پروانه *</label>
// // // // //                     <input 
// // // // //                       type="date" 
// // // // //                       name="licenseExpiryDate" 
// // // // //                       value={formData.licenseExpiryDate} 
// // // // //                       onChange={handleChange} 
// // // // //                       disabled={loading}
// // // // //                     />
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               {/* بخش 3: موقعیت روی نقشه */}
// // // // //               {/* <div className="form-section" data-section="location">
// // // // //                 <div className="section-title">
// // // // //                   <span>🗺️</span> موقعیت دفتر روی نقشه
// // // // //                 </div>
// // // // //                 <div className="search-box">
// // // // //                   <input 
// // // // //                     type="text" 
// // // // //                     value={searchAddress} 
// // // // //                     onChange={(e) => setSearchAddress(e.target.value)} 
// // // // //                     placeholder="جستجوی آدرس روی نقشه..." 
// // // // //                     onKeyPress={(e) => e.key === 'Enter' && searchAddressHandler()} 
// // // // //                   />
// // // // //                   <button type="button" onClick={searchAddressHandler} disabled={searching}>
// // // // //                     {searching ? 'جستجو...' : '🔍 جستجو'}
// // // // //                   </button>
// // // // //                 </div>

// // // // //                 <div className="map-wrapper">
// // // // //                   {renderMap()}
// // // // //                   <div className="map-marker">📍</div>
// // // // //                 </div>
                
// // // // //                 {locationSelected && (
// // // // //                   <div className="location-success">
// // // // //                     ✓ موقعیت ثبت شد | {formData.lat.toFixed(5)} , {formData.lng.toFixed(5)}
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div> */}

// // // // //               {/* بخش 4: آپلود مدارک */}
// // // // //               <div className="form-section" data-section="documents">
// // // // //                 <div className="section-title">
// // // // //                   <span>📎</span> آپلود مدارک
// // // // //                 </div>
// // // // //                 <div className="upload-row">
// // // // //                   <div className="upload-box" onClick={() => nationalCardRef.current?.click()}>
// // // // //                     <input type="file" ref={nationalCardRef} onChange={(e) => handleImageChange(e, 'national')} accept="image/*" hidden />
// // // // //                     {nationalCardPreview ? (
// // // // //                       <div className="preview">
// // // // //                         <img src={nationalCardPreview} alt="کارت ملی" />
// // // // //                         <button type="button" className="remove-btn" onClick={(e) => { e.stopPropagation(); setNationalCardPreview(null); setFormData(prev => ({ ...prev, nationalCardImage: null })); }}>
// // // // //                           ✗
// // // // //                         </button>
// // // // //                       </div>
// // // // //                     ) : (
// // // // //                       <>
// // // // //                         <div className="upload-icon">🪪</div>
// // // // //                         <p>تصویر کارت ملی</p>
// // // // //                         <small>jpg, png (حداکثر 2MB)</small>
// // // // //                       </>
// // // // //                     )}
// // // // //                   </div>
// // // // //                   <div className="upload-box" onClick={() => licenseRef.current?.click()}>
// // // // //                     <input type="file" ref={licenseRef} onChange={(e) => handleImageChange(e, 'license')} accept="image/*" hidden />
// // // // //                     {licensePreview ? (
// // // // //                       <div className="preview">
// // // // //                         <img src={licensePreview} alt="پروانه" />
// // // // //                         <button type="button" className="remove-btn" onClick={(e) => { e.stopPropagation(); setLicensePreview(null); setFormData(prev => ({ ...prev, licenseImage: null })); }}>
// // // // //                           ✗
// // // // //                         </button>
// // // // //                       </div>
// // // // //                     ) : (
// // // // //                       <>
// // // // //                         <div className="upload-icon">📄</div>
// // // // //                         <p>تصویر پروانه کسب</p>
// // // // //                         <small>jpg, png (حداکثر 2MB)</small>
// // // // //                       </>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <label className="checkbox">
// // // // //                 <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
// // // // //                 <span className="checkmark"></span>
// // // // //                 قوانین و مقررات سایت اوتاپ را مطالعه کرده و می‌پذیرم
// // // // //               </label>

// // // // //               <button type="submit" disabled={loading} className="submit-btn">
// // // // //                 {loading ? (
// // // // //                   <>
// // // // //                     <span className="spinner"></span>
// // // // //                     در حال ثبت نام...
// // // // //                   </>
// // // // //                 ) : (
// // // // //                   <>🏢 ثبت نام آژانس</>
// // // // //                 )}
// // // // //               </button>
// // // // //             </form>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default RegisterAgency;

// // // // // RegisterAgency.jsx - با داینامیک کردن شهرها و مناطق
// // // // import React, { useState, useRef, useEffect, useCallback } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { toast, ToastContainer } from 'react-toastify';
// // // // import 'react-toastify/dist/ReactToastify.css';
// // // // import './RegisterAgency.css';

// // // // // تابع تبدیل مختصات
// // // // const wgs84ToWebMercator = (lng, lat) => {
// // // //   const R = 6378137;
// // // //   return {
// // // //     x: lng * (Math.PI * R) / 180,
// // // //     y: Math.log(Math.tan((90 + lat) * Math.PI / 360)) * R
// // // //   };
// // // // };

// // // // const webMercatorToWgs84 = (x, y) => {
// // // //   const R = 6378137;
// // // //   return {
// // // //     lat: (2 * Math.atan(Math.exp(y / R)) - Math.PI / 2) * 180 / Math.PI,
// // // //     lng: (x * 180) / (Math.PI * R)
// // // //   };
// // // // };

// // // // const RegisterAgency = () => {
// // // //   const mapRef = useRef(null);
// // // //   const [mapKey] = useState("web.31c5ea6c425e40cc9b30620a84a8be90");
// // // //   const [mapLoaded, setMapLoaded] = useState(false);
  
// // // //   const [formData, setFormData] = useState({
// // // //     fullName: '', mobile: '', password: '', confirmPassword: '',
// // // //     nationalCode: '', agentCode: '', province: '', city: '', region: '',
// // // //     officeAddress: '', licenseNumber: '', licenseExpiryDate: '',
// // // //     nationalCardImage: null, licenseImage: null,
// // // //     lat: 35.699739, lng: 51.338097
// // // //   });
  
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [acceptTerms, setAcceptTerms] = useState(false);
// // // //   const [nationalCardPreview, setNationalCardPreview] = useState(null);
// // // //   const [licensePreview, setLicensePreview] = useState(null);
// // // //   const [showPassword, setShowPassword] = useState(false);
// // // //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// // // //   const [locationSelected, setLocationSelected] = useState(false);
// // // //   const [mapCenter, setMapCenter] = useState({ lat: 35.699739, lng: 51.338097 });
// // // //   const [searchAddress, setSearchAddress] = useState('');
// // // //   const [searching, setSearching] = useState(false);
// // // //   const [activeSection, setActiveSection] = useState('personal');
  
// // // //   // ===== State های داینامیک برای استان/شهر/منطقه =====
// // // //   const [provinces, setProvinces] = useState([]);
// // // //   const [cities, setCities] = useState([]);
// // // //   const [regions, setRegions] = useState([]);
// // // //   const [loadingRegions, setLoadingRegions] = useState(false);
// // // //   const [selectedProvinceId, setSelectedProvinceId] = useState(null);
// // // //   const [selectedCityId, setSelectedCityId] = useState(null);
  
// // // //   const nationalCardRef = useRef(null);
// // // //   const licenseRef = useRef(null);
// // // //   const navigate = useNavigate();

// // // //   const benefits = [
// // // //     { icon: '🏆', title: 'اعتبار برند اوتاپ', desc: 'برخورداری از اعتبار و جایگاه برند معتبر', color: '#7d0000' },
// // // //     { icon: '⚡', title: 'ثبت سریع و آسان ملک', desc: 'ثبت آگهی در کمترین زمان ممکن', color: '#d4af37' },
// // // //     { icon: '🎨', title: 'پنل مشاوری حرفه‌ای', desc: 'پنل اختصاصی با طراحی مدرن و کاربری آسان', color: '#7d0000' },
// // // //     { icon: '💰', title: 'کیف پول و شارژ هدیه', desc: 'امکان برخورداری از کیف پول و دریافت شارژ هدیه', color: '#d4af37' },
// // // //     { icon: '📈', title: 'امکانات ارتقاء آگهی', desc: 'به روزرسانی، ویترین، بسته افزایش بازدید', color: '#7d0000' },
// // // //     { icon: '📊', title: 'آمار بازدید و تماس', desc: 'مشاهده آمار دقیق بازدید و تماس هر آگهی', color: '#d4af37' }
// // // //   ];

// // // //   // ===== دریافت استان‌ها =====
// // // //   useEffect(() => {
// // // //     const fetchProvinces = async () => {
// // // //       try {
// // // //         const response = await fetch('https://localhost:7178/api/RealEstatePage/GetRegions');
// // // //         const result = await response.json();
        
// // // //         if (result.status === 200 && result.data) {
// // // //           setProvinces(result.data);
// // // //         } else {
// // // //           console.warn('⚠️ خطا در دریافت استان‌ها');
// // // //         }
// // // //       } catch (error) {
// // // //         console.error('❌ خطا در دریافت استان‌ها:', error);
// // // //       }
// // // //     };

// // // //     fetchProvinces();
// // // //   }, []);

// // // //   // ===== دریافت شهرها هنگام انتخاب استان =====
// // // //   useEffect(() => {
// // // //     const fetchCities = async () => {
// // // //       if (!selectedProvinceId) {
// // // //         setCities([]);
// // // //         return;
// // // //       }

// // // //       setLoadingRegions(true);
// // // //       try {
// // // //         const response = await fetch(
// // // //           `https://localhost:7178/api/RealEstatePage/GetRegionsWithChildFlagAsync?id=${selectedProvinceId}`
// // // //         );
// // // //         const result = await response.json();
        
// // // //         if (result.status === 200 && result.data) {
// // // //           setCities(result.data);
// // // //           // ریست کردن شهر و منطقه
// // // //           setFormData(prev => ({ ...prev, city: '', region: '' }));
// // // //           setSelectedCityId(null);
// // // //           setRegions([]);
// // // //         } else {
// // // //           setCities([]);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error('❌ خطا در دریافت شهرها:', error);
// // // //         setCities([]);
// // // //       } finally {
// // // //         setLoadingRegions(false);
// // // //       }
// // // //     };

// // // //     fetchCities();
// // // //   }, [selectedProvinceId]);

// // // //   // ===== دریافت مناطق هنگام انتخاب شهر =====
// // // //   useEffect(() => {
// // // //     const fetchRegions = async () => {
// // // //       if (!selectedCityId) {
// // // //         setRegions([]);
// // // //         return;
// // // //       }

// // // //       setLoadingRegions(true);
// // // //       try {
// // // //         const response = await fetch(
// // // //           `https://localhost:7178/api/RealEstatePage/GetRegionsWithChildFlagAsync?id=${selectedCityId}`
// // // //         );
// // // //         const result = await response.json();
        
// // // //         if (result.status === 200 && result.data) {
// // // //           setRegions(result.data);
// // // //           setFormData(prev => ({ ...prev, region: '' }));
// // // //         } else {
// // // //           setRegions([]);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error('❌ خطا در دریافت مناطق:', error);
// // // //         setRegions([]);
// // // //       } finally {
// // // //         setLoadingRegions(false);
// // // //       }
// // // //     };

// // // //     fetchRegions();
// // // //   }, [selectedCityId]);

// // // //   // لود کردن اسکریپت نقشه
// // // //   useEffect(() => {
// // // //     const loadNeshanMap = () => {
// // // //       return new Promise((resolve) => {
// // // //         if (document.querySelector('script[src*="neshan"]')) {
// // // //           resolve();
// // // //           return;
// // // //         }
// // // //         const script = document.createElement('script');
// // // //         script.src = 'https://static.neshan.org/api/openlayers/4.6.5/ol.js';
// // // //         script.onload = () => {
// // // //           const link = document.createElement('link');
// // // //           link.rel = 'stylesheet';
// // // //           link.href = 'https://static.neshan.org/api/openlayers/4.6.5/ol.css';
// // // //           document.head.appendChild(link);
// // // //           resolve();
// // // //         };
// // // //         document.head.appendChild(script);
// // // //       });
// // // //     };

// // // //     loadNeshanMap().then(() => {
// // // //       setMapLoaded(true);
// // // //     });
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     const observer = new IntersectionObserver((entries) => {
// // // //       entries.forEach(entry => {
// // // //         if (entry.isIntersecting) {
// // // //           entry.target.classList.add('visible');
// // // //         }
// // // //       });
// // // //     }, { threshold: 0.1 });

// // // //     document.querySelectorAll('.form-section, .benefit-item, .upload-box').forEach(el => {
// // // //       observer.observe(el);
// // // //     });

// // // //     return () => observer.disconnect();
// // // //   }, []);

// // // //   const validateNationalCode = (code) => {
// // // //     if (!/^\d{10}$/.test(code)) return false;
// // // //     const check = parseInt(code[9], 10);
// // // //     let sum = 0;
// // // //     for (let i = 0; i < 9; i++) sum += parseInt(code[i], 10) * (10 - i);
// // // //     const remainder = sum % 11;
// // // //     if (remainder < 2) return check === remainder;
// // // //     return check === (11 - remainder);
// // // //   };

// // // //   const validateMobile = (mobile) => /^09[0-9]{9}$/.test(mobile);

// // // //   const updateLocation = useCallback((lat, lng) => {
// // // //     setFormData(prev => ({ ...prev, lat, lng }));
// // // //     setMapCenter({ lat, lng });
// // // //     setLocationSelected(true);
    
// // // //     if (mapRef.current && mapRef.current.getView) {
// // // //       try {
// // // //         const view = mapRef.current.getView();
// // // //         const coords = wgs84ToWebMercator(lng, lat);
// // // //         view.setCenter([coords.x, coords.y]);
// // // //         view.setZoom(17);
// // // //       } catch (error) {
// // // //         console.error('خطا در به‌روزرسانی نقشه:', error);
// // // //       }
// // // //     }
// // // //   }, []);

// // // //   const reverseGeocode = useCallback(async (lat, lng) => {
// // // //     try {
// // // //       const response = await fetch(`https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`, {
// // // //         headers: { 'Api-Key': mapKey }
// // // //       });
// // // //       const data = await response.json();
// // // //       if (data?.formatted_address) {
// // // //         setFormData(prev => ({ ...prev, officeAddress: data.formatted_address }));
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('خطا در تبدیل معکوس:', error);
// // // //     }
// // // //   }, [mapKey]);

// // // //   const searchAddressHandler = useCallback(async () => {
// // // //     if (!searchAddress.trim()) {
// // // //       toast.warning('لطفاً آدرس را وارد کنید');
// // // //       return;
// // // //     }
    
// // // //     setSearching(true);
// // // //     try {
// // // //       const response = await fetch(
// // // //         `https://api.neshan.org/v4/search?term=${encodeURIComponent(searchAddress)}&lat=${mapCenter.lat}&lng=${mapCenter.lng}`,
// // // //         { headers: { 'Api-Key': mapKey } }
// // // //       );
// // // //       const data = await response.json();
      
// // // //       if (data.items?.length > 0) {
// // // //         const item = data.items[0];
// // // //         updateLocation(item.location.y, item.location.x);
// // // //         setFormData(prev => ({ ...prev, officeAddress: item.title }));
// // // //         reverseGeocode(item.location.y, item.location.x);
// // // //         toast.success('موقعیت پیدا شد');
// // // //       } else {
// // // //         toast.error('آدرس یافت نشد');
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error('خطا در جستجو');
// // // //     } finally {
// // // //       setSearching(false);
// // // //     }
// // // //   }, [searchAddress, mapCenter, mapKey, updateLocation, reverseGeocode]);

// // // //   const handleChange = (e) => {
// // // //     const { name, value } = e.target;
    
// // // //     if (name === 'nationalCode' || name === 'mobile' || name === 'agentCode') {
// // // //       const numericValue = value.replace(/[^0-9]/g, '');
// // // //       const maxLen = name === 'nationalCode' ? 10 : name === 'mobile' ? 11 : 20;
// // // //       if (numericValue.length <= maxLen) {
// // // //         setFormData(prev => ({ ...prev, [name]: numericValue }));
// // // //       }
// // // //     } else {
// // // //       setFormData(prev => ({ ...prev, [name]: value }));
// // // //     }
// // // //   };

// // // //   // ===== هندلر تغییر استان =====
// // // //   const handleProvinceChange = (e) => {
// // // //     const value = e.target.value;
// // // //     const selected = provinces.find(p => p.id === parseInt(value));
    
// // // //     if (selected) {
// // // //       setSelectedProvinceId(selected.id);
// // // //       setFormData(prev => ({ 
// // // //         ...prev, 
// // // //         province: selected.name,
// // // //         city: '',
// // // //         region: ''
// // // //       }));
// // // //       setSelectedCityId(null);
// // // //       setRegions([]);
// // // //     }
// // // //   };

// // // //   // ===== هندلر تغییر شهر =====
// // // //   const handleCityChange = (e) => {
// // // //     const value = e.target.value;
// // // //     const selected = cities.find(c => c.id === parseInt(value));
    
// // // //     if (selected) {
// // // //       setSelectedCityId(selected.id);
// // // //       setFormData(prev => ({ 
// // // //         ...prev, 
// // // //         city: selected.name,
// // // //         region: ''
// // // //       }));
// // // //       setRegions([]);
// // // //     }
// // // //   };

// // // //   // ===== هندلر تغییر منطقه =====
// // // //   const handleRegionChange = (e) => {
// // // //     const value = e.target.value;
// // // //     const selected = regions.find(r => r.id === parseInt(value));
    
// // // //     if (selected) {
// // // //       setFormData(prev => ({ ...prev, region: selected.name }));
// // // //     }
// // // //   };

// // // //   const handleImageChange = (e, type) => {
// // // //     const file = e.target.files[0];
// // // //     if (file) {
// // // //       if (!file.type.match('image.*')) {
// // // //         toast.error('فایل باید تصویر باشد');
// // // //         return;
// // // //       }
// // // //       if (file.size > 2 * 1024 * 1024) {
// // // //         toast.error('حجم تصویر حداکثر 2 مگابایت');
// // // //         return;
// // // //       }
      
// // // //       const reader = new FileReader();
// // // //       reader.onloadend = () => {
// // // //         if (type === 'national') {
// // // //           setNationalCardPreview(reader.result);
// // // //           setFormData(prev => ({ ...prev, nationalCardImage: file }));
// // // //         } else {
// // // //           setLicensePreview(reader.result);
// // // //           setFormData(prev => ({ ...prev, licenseImage: file }));
// // // //         }
// // // //       };
// // // //       reader.readAsDataURL(file);
// // // //     }
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
    
// // // //     if (!formData.fullName.trim()) return toast.error('نام و نام خانوادگی را وارد کنید');
// // // //     if (!validateMobile(formData.mobile)) return toast.error('شماره موبایل نامعتبر است');
// // // //     if (formData.password.length < 6) return toast.error('رمز عبور حداقل 6 کاراکتر باشد');
// // // //     if (formData.password !== formData.confirmPassword) return toast.error('رمز عبور مطابقت ندارد');
// // // //     if (!validateNationalCode(formData.nationalCode)) return toast.error('کد ملی نامعتبر است');
// // // //     if (!formData.agentCode) return toast.error('کد مشاور را وارد کنید');
// // // //     if (!formData.province) return toast.error('استان را انتخاب کنید');
// // // //     if (!formData.city) return toast.error('شهر را انتخاب کنید');
// // // //     if (!formData.officeAddress) return toast.error('آدرس دفتر را وارد کنید');
// // // //     if (!formData.licenseNumber) return toast.error('شماره پروانه را وارد کنید');
// // // //     if (!formData.licenseExpiryDate) return toast.error('تاریخ اعتبار پروانه را وارد کنید');
// // // //     if (!nationalCardPreview) return toast.error('تصویر کارت ملی را آپلود کنید');
// // // //     if (!licensePreview) return toast.error('تصویر پروانه را آپلود کنید');
// // // //     if (!locationSelected) return toast.error('موقعیت دفتر را روی نقشه انتخاب کنید');
// // // //     if (!acceptTerms) return toast.error('قوانین را بپذیرید');
    
// // // //     setLoading(true);
// // // //     const submitData = new FormData();
// // // //     Object.keys(formData).forEach(key => {
// // // //       if (formData[key] !== null && key !== 'confirmPassword') {
// // // //         submitData.append(key, formData[key]);
// // // //       }
// // // //     });
// // // //     submitData.append('userType', 'agency');
    
// // // //     try {
// // // //       const response = await fetch('https://localhost:7178/api/auth/register-agency', {
// // // //         method: 'POST',
// // // //         body: submitData,
// // // //       });
// // // //       const data = await response.json();
      
// // // //       if (response.ok && data.success) {
// // // //         toast.success('اطلاعات با موفقیت ثبت شد');
// // // //         localStorage.setItem('userType', 'agency');
// // // //         setTimeout(() => navigate('/register/verify', { 
// // // //           state: { mobile: formData.mobile, userType: 'agency', fullName: formData.fullName } 
// // // //         }), 2000);
// // // //       } else {
// // // //         toast.error(data.message || 'خطا در ثبت نام');
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error('خطا در ارتباط با سرور');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleBack = () => navigate('/register');

// // // //   const scrollToSection = (section) => {
// // // //     setActiveSection(section);
// // // //     const element = document.querySelector(`[data-section="${section}"]`);
// // // //     if (element) {
// // // //       element.scrollIntoView({ behavior: 'smooth', block: 'center' });
// // // //     }
// // // //   };

// // // //   // رندر نقشه
// // // //   const renderMap = () => {
// // // //     if (!mapLoaded) {
// // // //       return (
// // // //         <div className="map-loading">
// // // //           <div className="loading-spinner"></div>
// // // //           <p>در حال بارگذاری نقشه...</p>
// // // //         </div>
// // // //       );
// // // //     }

// // // //     if (typeof window.ol === 'undefined') {
// // // //       return (
// // // //         <div className="map-loading">
// // // //           <p>در حال بارگذاری نقشه...</p>
// // // //         </div>
// // // //       );
// // // //     }

// // // //     return (
// // // //       <div id="neshan-map" className="neshan-map-container"></div>
// // // //     );
// // // //   };

// // // //   // مقداردهی اولیه نقشه بعد از لود DOM
// // // //   useEffect(() => {
// // // //     if (mapLoaded && typeof window.ol !== 'undefined' && !mapRef.current) {
// // // //       const center = wgs84ToWebMercator(mapCenter.lng, mapCenter.lat);
      
// // // //       const map = new window.ol.Map({
// // // //         target: 'neshan-map',
// // // //         view: new window.ol.View({
// // // //           center: [center.x, center.y],
// // // //           zoom: 14,
// // // //         }),
// // // //         layers: [
// // // //           new window.ol.layer.Tile({
// // // //             source: new window.ol.source.XYZ({
// // // //               url: `https://api.neshan.org/maps/neshan/v1/dreamy/{z}/{x}/{y}.png?key=${mapKey}`,
// // // //               attributions: '© نقشه‌ نشان',
// // // //             }),
// // // //           }),
// // // //         ],
// // // //       });
      
// // // //       mapRef.current = map;
      
// // // //       map.on('click', (e) => {
// // // //         if (loading) return;
// // // //         const wgs84 = webMercatorToWgs84(e.coordinate[0], e.coordinate[1]);
// // // //         updateLocation(wgs84.lat, wgs84.lng);
// // // //         reverseGeocode(wgs84.lat, wgs84.lng);
// // // //         toast.success('موقعیت ثبت شد');
// // // //       });
// // // //     }
// // // //   }, [mapLoaded, mapCenter, mapKey, updateLocation, reverseGeocode, loading]);

// // // //   return (
// // // //     <div className="agency-register">
// // // //       <ToastContainer position="top-center" rtl={true} />
      
// // // //       <div className="particles">
// // // //         {[...Array(12)].map((_, i) => (
// // // //           <div key={i} className="particle" style={{
// // // //             left: `${Math.random() * 100}%`,
// // // //             top: `${Math.random() * 100}%`,
// // // //             animationDelay: `${Math.random() * 15}s`,
// // // //             animationDuration: `${10 + Math.random() * 10}s`,
// // // //           }}></div>
// // // //         ))}
// // // //       </div>

// // // //       <div className="register-container">
// // // //         {/* سایدبار راست - توضیحات و مزایا */}
// // // //         <div className="register-sidebar">
// // // //           <div className="sidebar-content">
// // // //             <div className="sidebar-header">
// // // //               <div className="sidebar-icon">
// // // //                 <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
// // // //                   <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// // // //                   <path d="M5 10.5V16.5L12 21L19 16.5V10.5" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// // // //                   <path d="M12 15V21" stroke="#d4af37" strokeWidth="2" strokeLinecap="round"/>
// // // //                 </svg>
// // // //               </div>
// // // //               <h2>عضویت آژانس املاک</h2>
// // // //               <p>اگر آژانس شما دارای جواز کسب معتبر است، برای عضویت لطفا فرم مقابل را تکمیل نمائید.</p>
// // // //             </div>

// // // //             <div className="benefits-box">
// // // //               <h3>
// // // //                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
// // // //                   <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" fill="#d4af37" stroke="#d4af37" strokeWidth="1.5"/>
// // // //                 </svg>
// // // //                 مزایا همکاری با اوتاپ
// // // //               </h3>
// // // //               <div className="benefits-list">
// // // //                 {benefits.map((b, i) => (
// // // //                   <div key={i} className="benefit-item" style={{ transitionDelay: `${i * 0.1}s` }}>
// // // //                     <span className="benefit-icon">{b.icon}</span>
// // // //                     <div>
// // // //                       <strong style={{ color: b.color }}>{b.title}</strong>
// // // //                       <p>{b.desc}</p>
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>

// // // //             <div className="info-box">
// // // //               <div className="info-icon">
// // // //                 <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
// // // //                   <path d="M12 8V12L15 15M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#d4af37" strokeWidth="2" strokeLinecap="round"/>
// // // //                 </svg>
// // // //               </div>
// // // //               <h4>توجه مهم</h4>
// // // //               <ul>
// // // //                 <li>پس از تایید جواز کسب و اطلاعات ثبت شده، پنلی اختصاصی برای آژانس شما ایجاد می‌شود</li>
// // // //                 <li>اطلاعات کاربری از طریق پیامک ارسال خواهد شد</li>
// // // //                 <li>می‌توانید مشاوران خود را به پنل اضافه کنید</li>
// // // //                 <li>آگهی‌ها با نام و لوگوی آژانس شما نمایش داده می‌شود</li>
// // // //               </ul>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* فرم اصلی سمت چپ */}
// // // //         <div className="register-form-wrapper">
// // // //           <div className="register-form">
// // // //             <button className="back-btn" onClick={handleBack}>
// // // //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //                 <path d="M19 12H5M12 19L5 12L12 5" strokeLinecap="round" strokeLinejoin="round"/>
// // // //               </svg>
// // // //               بازگشت
// // // //             </button>

// // // //             {/* پروگرس استپ */}
// // // //             <div className="form-progress">
// // // //               {['personal', 'agency', 'documents'].map((section, idx) => (
// // // //                 <div 
// // // //                   key={section} 
// // // //                   className={`progress-step ${activeSection === section ? 'active' : ''}`}
// // // //                   onClick={() => scrollToSection(section)}
// // // //                 >
// // // //                   <div className="step-number">{idx + 1}</div>
// // // //                   <div className="step-label">
// // // //                     {section === 'personal' && 'اطلاعات شخصی'}
// // // //                     {section === 'agency' && 'اطلاعات آژانس'}
// // // //                     {section === 'documents' && 'مدارک'}
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>

// // // //             <form onSubmit={handleSubmit}>
// // // //               {/* بخش 1: اطلاعات شخصی */}
// // // //               <div className="form-section" data-section="personal">
// // // //                 <div className="section-title">
// // // //                   <span>👤</span> اطلاعات شخصی
// // // //                 </div>
// // // //                 <div className="form-row">
// // // //                   <div className="input-group">
// // // //                     <label>نام و نام خانوادگی *</label>
// // // //                     <input 
// // // //                       type="text" 
// // // //                       name="fullName" 
// // // //                       value={formData.fullName} 
// // // //                       onChange={handleChange} 
// // // //                       placeholder="علی محمدی" 
// // // //                       disabled={loading}
// // // //                     />
// // // //                   </div>
// // // //                   <div className="input-group">
// // // //                     <label>شماره موبایل *</label>
// // // //                     <input 
// // // //                       type="tel" 
// // // //                       name="mobile" 
// // // //                       value={formData.mobile} 
// // // //                       onChange={handleChange} 
// // // //                       placeholder="09123456789" 
// // // //                       disabled={loading}
// // // //                     />
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="form-row">
// // // //                   <div className="input-group">
// // // //                     <label>رمز عبور *</label>
// // // //                     <div className="password-box">
// // // //                       <input 
// // // //                         type={showPassword ? "text" : "password"} 
// // // //                         name="password" 
// // // //                         value={formData.password} 
// // // //                         onChange={handleChange} 
// // // //                         placeholder="حداقل 6 کاراکتر" 
// // // //                         disabled={loading}
// // // //                       />
// // // //                       <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
// // // //                         {showPassword ? '🙈' : '👁️'}
// // // //                       </button>
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="input-group">
// // // //                     <label>تکرار رمز عبور *</label>
// // // //                     <div className="password-box">
// // // //                       <input 
// // // //                         type={showConfirmPassword ? "text" : "password"} 
// // // //                         name="confirmPassword" 
// // // //                         value={formData.confirmPassword} 
// // // //                         onChange={handleChange} 
// // // //                         placeholder="تکرار رمز عبور" 
// // // //                         disabled={loading}
// // // //                       />
// // // //                       <button type="button" className="eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
// // // //                         {showConfirmPassword ? '🙈' : '👁️'}
// // // //                       </button>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //                 {formData.confirmPassword && formData.password !== formData.confirmPassword && (
// // // //                   <div className="error-msg">
// // // //                     ❌ رمز عبور مطابقت ندارد
// // // //                   </div>
// // // //                 )}

// // // //                 <div className="form-row">
// // // //                   <div className="input-group">
// // // //                     <label>کد ملی *</label>
// // // //                     <input 
// // // //                       type="text" 
// // // //                       name="nationalCode" 
// // // //                       value={formData.nationalCode} 
// // // //                       onChange={handleChange} 
// // // //                       maxLength="10" 
// // // //                       placeholder="1234567890" 
// // // //                       disabled={loading}
// // // //                     />
// // // //                   </div>
// // // //                   <div className="input-group">
// // // //                     <label>کد مشاور املاک *</label>
// // // //                     <input 
// // // //                       type="text" 
// // // //                       name="agentCode" 
// // // //                       value={formData.agentCode} 
// // // //                       onChange={handleChange} 
// // // //                       placeholder="کد مشاور" 
// // // //                       disabled={loading}
// // // //                     />
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               {/* بخش 2: اطلاعات آژانس با انتخاب داینامیک استان/شهر/منطقه */}
// // // //               <div className="form-section" data-section="agency">
// // // //                 <div className="section-title">
// // // //                   <span>🏛️</span> اطلاعات آژانس و مجوزها
// // // //                 </div>
// // // //                 <div className="form-row">
// // // //                   <div className="input-group">
// // // //                     <label>استان *</label>
// // // //                     <select 
// // // //                       name="province" 
// // // //                       value={selectedProvinceId || ''} 
// // // //                       onChange={handleProvinceChange} 
// // // //                       disabled={loading || provinces.length === 0}
// // // //                     >
// // // //                       <option value="">انتخاب استان</option>
// // // //                       {provinces.map(p => (
// // // //                         <option key={p.id} value={p.id}>
// // // //                           {p.name}
// // // //                         </option>
// // // //                       ))}
// // // //                     </select>
// // // //                   </div>
// // // //                   <div className="input-group">
// // // //                     <label>شهر *</label>
// // // //                     <select 
// // // //                       name="city" 
// // // //                       value={selectedCityId || ''} 
// // // //                       onChange={handleCityChange} 
// // // //                       disabled={loading || cities.length === 0 || loadingRegions}
// // // //                     >
// // // //                       <option value="">انتخاب شهر</option>
// // // //                       {cities.map(c => (
// // // //                         <option key={c.id} value={c.id}>
// // // //                           {c.name}
// // // //                         </option>
// // // //                       ))}
// // // //                     </select>
// // // //                     {loadingRegions && <small>در حال بارگذاری...</small>}
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* نمایش کامبوباکس منطقه اگر وجود داشته باشد */}
// // // //                 {regions.length > 0 && (
// // // //                   <div className="form-row">
// // // //                     <div className="input-group full-width">
// // // //                       <label>منطقه *</label>
// // // //                       <select 
// // // //                         name="region" 
// // // //                         value={formData.region} 
// // // //                         onChange={handleRegionChange} 
// // // //                         disabled={loading || regions.length === 0}
// // // //                       >
// // // //                         <option value="">انتخاب منطقه</option>
// // // //                         {regions.map(r => (
// // // //                           <option key={r.id} value={r.id}>
// // // //                             {r.name}
// // // //                           </option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>
// // // //                   </div>
// // // //                 )}

// // // //                 <div className="input-group full-width">
// // // //                   <label>آدرس دفتر *</label>
// // // //                   <input 
// // // //                     type="text" 
// // // //                     name="officeAddress" 
// // // //                     value={formData.officeAddress} 
// // // //                     onChange={handleChange} 
// // // //                     placeholder="آدرس کامل دفتر" 
// // // //                     disabled={loading}
// // // //                   />
// // // //                 </div>

// // // //                 <div className="form-row">
// // // //                   <div className="input-group">
// // // //                     <label>شماره پروانه *</label>
// // // //                     <input 
// // // //                       type="text" 
// // // //                       name="licenseNumber" 
// // // //                       value={formData.licenseNumber} 
// // // //                       onChange={handleChange} 
// // // //                       placeholder="شماره پروانه" 
// // // //                       disabled={loading}
// // // //                     />
// // // //                   </div>
// // // //                   <div className="input-group">
// // // //                     <label>تاریخ اعتبار پروانه *</label>
// // // //                     <input 
// // // //                       type="date" 
// // // //                       name="licenseExpiryDate" 
// // // //                       value={formData.licenseExpiryDate} 
// // // //                       onChange={handleChange} 
// // // //                       disabled={loading}
// // // //                     />
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               {/* بخش 3: موقعیت روی نقشه */}
// // // //               <div className="form-section" data-section="location">
// // // //                 <div className="section-title">
// // // //                   <span>🗺️</span> موقعیت دفتر روی نقشه
// // // //                 </div>
// // // //                 <div className="search-box">
// // // //                   <input 
// // // //                     type="text" 
// // // //                     value={searchAddress} 
// // // //                     onChange={(e) => setSearchAddress(e.target.value)} 
// // // //                     placeholder="جستجوی آدرس روی نقشه..." 
// // // //                     onKeyPress={(e) => e.key === 'Enter' && searchAddressHandler()} 
// // // //                   />
// // // //                   <button type="button" onClick={searchAddressHandler} disabled={searching}>
// // // //                     {searching ? 'جستجو...' : '🔍 جستجو'}
// // // //                   </button>
// // // //                 </div>

// // // //                 <div className="map-wrapper">
// // // //                   {renderMap()}
// // // //                   <div className="map-marker">📍</div>
// // // //                 </div>
                
// // // //                 {locationSelected && (
// // // //                   <div className="location-success">
// // // //                     ✓ موقعیت ثبت شد | {formData.lat.toFixed(5)} , {formData.lng.toFixed(5)}
// // // //                   </div>
// // // //                 )}
// // // //               </div>

// // // //               {/* بخش 4: آپلود مدارک */}
// // // //               <div className="form-section" data-section="documents">
// // // //                 <div className="section-title">
// // // //                   <span>📎</span> آپلود مدارک
// // // //                 </div>
// // // //                 <div className="upload-row">
// // // //                   <div className="upload-box" onClick={() => nationalCardRef.current?.click()}>
// // // //                     <input type="file" ref={nationalCardRef} onChange={(e) => handleImageChange(e, 'national')} accept="image/*" hidden />
// // // //                     {nationalCardPreview ? (
// // // //                       <div className="preview">
// // // //                         <img src={nationalCardPreview} alt="کارت ملی" />
// // // //                         <button type="button" className="remove-btn" onClick={(e) => { e.stopPropagation(); setNationalCardPreview(null); setFormData(prev => ({ ...prev, nationalCardImage: null })); }}>
// // // //                           ✗
// // // //                         </button>
// // // //                       </div>
// // // //                     ) : (
// // // //                       <>
// // // //                         <div className="upload-icon">🪪</div>
// // // //                         <p>تصویر کارت ملی</p>
// // // //                         <small>jpg, png (حداکثر 2MB)</small>
// // // //                       </>
// // // //                     )}
// // // //                   </div>
// // // //                   <div className="upload-box" onClick={() => licenseRef.current?.click()}>
// // // //                     <input type="file" ref={licenseRef} onChange={(e) => handleImageChange(e, 'license')} accept="image/*" hidden />
// // // //                     {licensePreview ? (
// // // //                       <div className="preview">
// // // //                         <img src={licensePreview} alt="پروانه" />
// // // //                         <button type="button" className="remove-btn" onClick={(e) => { e.stopPropagation(); setLicensePreview(null); setFormData(prev => ({ ...prev, licenseImage: null })); }}>
// // // //                           ✗
// // // //                         </button>
// // // //                       </div>
// // // //                     ) : (
// // // //                       <>
// // // //                         <div className="upload-icon">📄</div>
// // // //                         <p>تصویر پروانه کسب</p>
// // // //                         <small>jpg, png (حداکثر 2MB)</small>
// // // //                       </>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               <label className="checkbox">
// // // //                 <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
// // // //                 <span className="checkmark"></span>
// // // //                 قوانین و مقررات سایت اوتاپ را مطالعه کرده و می‌پذیرم
// // // //               </label>

// // // //               <button type="submit" disabled={loading} className="submit-btn">
// // // //                 {loading ? (
// // // //                   <>
// // // //                     <span className="spinner"></span>
// // // //                     در حال ثبت نام...
// // // //                   </>
// // // //                 ) : (
// // // //                   <>🏢 ثبت نام آژانس</>
// // // //                 )}
// // // //               </button>
// // // //             </form>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default RegisterAgency;
// // // // RegisterAgency.jsx - با داینامیک کردن شهرها و مناطق + نمایش نام انتخابی
// // // import React, { useState, useRef, useEffect, useCallback } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { toast, ToastContainer } from 'react-toastify';
// // // import 'react-toastify/dist/ReactToastify.css';
// // // import './RegisterAgency.css';

// // // // تابع تبدیل مختصات
// // // const wgs84ToWebMercator = (lng, lat) => {
// // //   const R = 6378137;
// // //   return {
// // //     x: lng * (Math.PI * R) / 180,
// // //     y: Math.log(Math.tan((90 + lat) * Math.PI / 360)) * R
// // //   };
// // // };

// // // const webMercatorToWgs84 = (x, y) => {
// // //   const R = 6378137;
// // //   return {
// // //     lat: (2 * Math.atan(Math.exp(y / R)) - Math.PI / 2) * 180 / Math.PI,
// // //     lng: (x * 180) / (Math.PI * R)
// // //   };
// // // };

// // // const RegisterAgency = () => {
// // //   const mapRef = useRef(null);
// // //   const [mapKey] = useState("web.31c5ea6c425e40cc9b30620a84a8be90");
// // //   const [mapLoaded, setMapLoaded] = useState(false);
  
// // //   const [formData, setFormData] = useState({
// // //     fullName: '', mobile: '', password: '', confirmPassword: '',
// // //     nationalCode: '', agentCode: '', province: '', city: '', region: '',
// // //     officeAddress: '', licenseNumber: '', licenseExpiryDate: '',
// // //     nationalCardImage: null, licenseImage: null,
// // //     lat: 35.699739, lng: 51.338097
// // //   });
  
// // //   const [loading, setLoading] = useState(false);
// // //   const [acceptTerms, setAcceptTerms] = useState(false);
// // //   const [nationalCardPreview, setNationalCardPreview] = useState(null);
// // //   const [licensePreview, setLicensePreview] = useState(null);
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// // //   const [locationSelected, setLocationSelected] = useState(false);
// // //   const [mapCenter, setMapCenter] = useState({ lat: 35.699739, lng: 51.338097 });
// // //   const [searchAddress, setSearchAddress] = useState('');
// // //   const [searching, setSearching] = useState(false);
// // //   const [activeSection, setActiveSection] = useState('personal');
  
// // //   // ===== State های داینامیک برای استان/شهر/منطقه =====
// // //   const [provinces, setProvinces] = useState([]);
// // //   const [cities, setCities] = useState([]);
// // //   const [regions, setRegions] = useState([]);
// // //   const [loadingRegions, setLoadingRegions] = useState(false);
// // //   const [selectedProvinceId, setSelectedProvinceId] = useState(null);
// // //   const [selectedCityId, setSelectedCityId] = useState(null);
// // //   const [selectedRegionId, setSelectedRegionId] = useState(null);
  
// // //   const nationalCardRef = useRef(null);
// // //   const licenseRef = useRef(null);
// // //   const navigate = useNavigate();

// // //   const benefits = [
// // //     { icon: '🏆', title: 'اعتبار برند اوتاپ', desc: 'برخورداری از اعتبار و جایگاه برند معتبر', color: '#7d0000' },
// // //     { icon: '⚡', title: 'ثبت سریع و آسان ملک', desc: 'ثبت آگهی در کمترین زمان ممکن', color: '#d4af37' },
// // //     { icon: '🎨', title: 'پنل مشاوری حرفه‌ای', desc: 'پنل اختصاصی با طراحی مدرن و کاربری آسان', color: '#7d0000' },
// // //     { icon: '💰', title: 'کیف پول و شارژ هدیه', desc: 'امکان برخورداری از کیف پول و دریافت شارژ هدیه', color: '#d4af37' },
// // //     { icon: '📈', title: 'امکانات ارتقاء آگهی', desc: 'به روزرسانی، ویترین، بسته افزایش بازدید', color: '#7d0000' },
// // //     { icon: '📊', title: 'آمار بازدید و تماس', desc: 'مشاهده آمار دقیق بازدید و تماس هر آگهی', color: '#d4af37' }
// // //   ];

// // //   // ===== دریافت استان‌ها =====
// // //   useEffect(() => {
// // //     const fetchProvinces = async () => {
// // //       try {
// // //         const response = await fetch('https://localhost:7178/api/RealEstatePage/GetRegions');
// // //         const result = await response.json();
        
// // //         if (result.status === 200 && result.data) {
// // //           setProvinces(result.data);
// // //         } else {
// // //           console.warn('⚠️ خطا در دریافت استان‌ها');
// // //         }
// // //       } catch (error) {
// // //         console.error('❌ خطا در دریافت استان‌ها:', error);
// // //       }
// // //     };

// // //     fetchProvinces();
// // //   }, []);

// // //   // ===== دریافت شهرها هنگام انتخاب استان =====
// // //   useEffect(() => {
// // //     const fetchCities = async () => {
// // //       if (!selectedProvinceId) {
// // //         setCities([]);
// // //         return;
// // //       }

// // //       setLoadingRegions(true);
// // //       try {
// // //         const response = await fetch(
// // //           `https://localhost:7178/api/RealEstatePage/GetRegionsWithChildFlagAsync?id=${selectedProvinceId}`
// // //         );
// // //         const result = await response.json();
        
// // //         if (result.status === 200 && result.data) {
// // //           setCities(result.data);
// // //           // ریست کردن شهر و منطقه
// // //           setFormData(prev => ({ ...prev, city: '', region: '' }));
// // //           setSelectedCityId(null);
// // //           setSelectedRegionId(null);
// // //           setRegions([]);
// // //         } else {
// // //           setCities([]);
// // //         }
// // //       } catch (error) {
// // //         console.error('❌ خطا در دریافت شهرها:', error);
// // //         setCities([]);
// // //       } finally {
// // //         setLoadingRegions(false);
// // //       }
// // //     };

// // //     fetchCities();
// // //   }, [selectedProvinceId]);

// // //   // ===== دریافت مناطق هنگام انتخاب شهر =====
// // //   useEffect(() => {
// // //     const fetchRegions = async () => {
// // //       if (!selectedCityId) {
// // //         setRegions([]);
// // //         setSelectedRegionId(null);
// // //         return;
// // //       }

// // //       setLoadingRegions(true);
// // //       try {
// // //         const response = await fetch(
// // //           `https://localhost:7178/api/RealEstatePage/GetRegionsWithChildFlagAsync?id=${selectedCityId}`
// // //         );
// // //         const result = await response.json();
        
// // //         if (result.status === 200 && result.data) {
// // //           setRegions(result.data);
// // //           setFormData(prev => ({ ...prev, region: '' }));
// // //           setSelectedRegionId(null);
// // //         } else {
// // //           setRegions([]);
// // //         }
// // //       } catch (error) {
// // //         console.error('❌ خطا در دریافت مناطق:', error);
// // //         setRegions([]);
// // //       } finally {
// // //         setLoadingRegions(false);
// // //       }
// // //     };

// // //     fetchRegions();
// // //   }, [selectedCityId]);

// // //   // لود کردن اسکریپت نقشه
// // //   useEffect(() => {
// // //     const loadNeshanMap = () => {
// // //       return new Promise((resolve) => {
// // //         if (document.querySelector('script[src*="neshan"]')) {
// // //           resolve();
// // //           return;
// // //         }
// // //         const script = document.createElement('script');
// // //         script.src = 'https://static.neshan.org/api/openlayers/4.6.5/ol.js';
// // //         script.onload = () => {
// // //           const link = document.createElement('link');
// // //           link.rel = 'stylesheet';
// // //           link.href = 'https://static.neshan.org/api/openlayers/4.6.5/ol.css';
// // //           document.head.appendChild(link);
// // //           resolve();
// // //         };
// // //         document.head.appendChild(script);
// // //       });
// // //     };

// // //     loadNeshanMap().then(() => {
// // //       setMapLoaded(true);
// // //     });
// // //   }, []);

// // //   useEffect(() => {
// // //     const observer = new IntersectionObserver((entries) => {
// // //       entries.forEach(entry => {
// // //         if (entry.isIntersecting) {
// // //           entry.target.classList.add('visible');
// // //         }
// // //       });
// // //     }, { threshold: 0.1 });

// // //     document.querySelectorAll('.form-section, .benefit-item, .upload-box').forEach(el => {
// // //       observer.observe(el);
// // //     });

// // //     return () => observer.disconnect();
// // //   }, []);

// // //   const validateNationalCode = (code) => {
// // //     if (!/^\d{10}$/.test(code)) return false;
// // //     const check = parseInt(code[9], 10);
// // //     let sum = 0;
// // //     for (let i = 0; i < 9; i++) sum += parseInt(code[i], 10) * (10 - i);
// // //     const remainder = sum % 11;
// // //     if (remainder < 2) return check === remainder;
// // //     return check === (11 - remainder);
// // //   };

// // //   const validateMobile = (mobile) => /^09[0-9]{9}$/.test(mobile);

// // //   const updateLocation = useCallback((lat, lng) => {
// // //     setFormData(prev => ({ ...prev, lat, lng }));
// // //     setMapCenter({ lat, lng });
// // //     setLocationSelected(true);
    
// // //     if (mapRef.current && mapRef.current.getView) {
// // //       try {
// // //         const view = mapRef.current.getView();
// // //         const coords = wgs84ToWebMercator(lng, lat);
// // //         view.setCenter([coords.x, coords.y]);
// // //         view.setZoom(17);
// // //       } catch (error) {
// // //         console.error('خطا در به‌روزرسانی نقشه:', error);
// // //       }
// // //     }
// // //   }, []);

// // //   const reverseGeocode = useCallback(async (lat, lng) => {
// // //     try {
// // //       const response = await fetch(`https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`, {
// // //         headers: { 'Api-Key': mapKey }
// // //       });
// // //       const data = await response.json();
// // //       if (data?.formatted_address) {
// // //         setFormData(prev => ({ ...prev, officeAddress: data.formatted_address }));
// // //       }
// // //     } catch (error) {
// // //       console.error('خطا در تبدیل معکوس:', error);
// // //     }
// // //   }, [mapKey]);

// // //   const searchAddressHandler = useCallback(async () => {
// // //     if (!searchAddress.trim()) {
// // //       toast.warning('لطفاً آدرس را وارد کنید');
// // //       return;
// // //     }
    
// // //     setSearching(true);
// // //     try {
// // //       const response = await fetch(
// // //         `https://api.neshan.org/v4/search?term=${encodeURIComponent(searchAddress)}&lat=${mapCenter.lat}&lng=${mapCenter.lng}`,
// // //         { headers: { 'Api-Key': mapKey } }
// // //       );
// // //       const data = await response.json();
      
// // //       if (data.items?.length > 0) {
// // //         const item = data.items[0];
// // //         updateLocation(item.location.y, item.location.x);
// // //         setFormData(prev => ({ ...prev, officeAddress: item.title }));
// // //         reverseGeocode(item.location.y, item.location.x);
// // //         toast.success('موقعیت پیدا شد');
// // //       } else {
// // //         toast.error('آدرس یافت نشد');
// // //       }
// // //     } catch (error) {
// // //       toast.error('خطا در جستجو');
// // //     } finally {
// // //       setSearching(false);
// // //     }
// // //   }, [searchAddress, mapCenter, mapKey, updateLocation, reverseGeocode]);

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
    
// // //     if (name === 'nationalCode' || name === 'mobile' || name === 'agentCode') {
// // //       const numericValue = value.replace(/[^0-9]/g, '');
// // //       const maxLen = name === 'nationalCode' ? 10 : name === 'mobile' ? 11 : 20;
// // //       if (numericValue.length <= maxLen) {
// // //         setFormData(prev => ({ ...prev, [name]: numericValue }));
// // //       }
// // //     } else {
// // //       setFormData(prev => ({ ...prev, [name]: value }));
// // //     }
// // //   };

// // //   // ===== هندلر تغییر استان =====
// // //   const handleProvinceChange = (e) => {
// // //     const value = e.target.value;
// // //     const selected = provinces.find(p => p.id === parseInt(value));
    
// // //     if (selected) {
// // //       setSelectedProvinceId(selected.id);
// // //       setFormData(prev => ({ 
// // //         ...prev, 
// // //         province: selected.name,
// // //         city: '',
// // //         region: ''
// // //       }));
// // //       setSelectedCityId(null);
// // //       setSelectedRegionId(null);
// // //       setRegions([]);
// // //     }
// // //   };

// // //   // ===== هندلر تغییر شهر =====
// // //   const handleCityChange = (e) => {
// // //     const value = e.target.value;
// // //     const selected = cities.find(c => c.id === parseInt(value));
    
// // //     if (selected) {
// // //       setSelectedCityId(selected.id);
// // //       setFormData(prev => ({ 
// // //         ...prev, 
// // //         city: selected.name,
// // //         region: ''
// // //       }));
// // //       setSelectedRegionId(null);
// // //       setRegions([]);
// // //     }
// // //   };

// // //   // ===== هندلر تغییر منطقه =====
// // //   const handleRegionChange = (e) => {
// // //     const value = e.target.value;
// // //     const selected = regions.find(r => r.id === parseInt(value));
    
// // //     if (selected) {
// // //       setSelectedRegionId(selected.id);
// // //       setFormData(prev => ({ ...prev, region: selected.name }));
// // //     }
// // //   };

// // //   const handleImageChange = (e, type) => {
// // //     const file = e.target.files[0];
// // //     if (file) {
// // //       if (!file.type.match('image.*')) {
// // //         toast.error('فایل باید تصویر باشد');
// // //         return;
// // //       }
// // //       if (file.size > 2 * 1024 * 1024) {
// // //         toast.error('حجم تصویر حداکثر 2 مگابایت');
// // //         return;
// // //       }
      
// // //       const reader = new FileReader();
// // //       reader.onloadend = () => {
// // //         if (type === 'national') {
// // //           setNationalCardPreview(reader.result);
// // //           setFormData(prev => ({ ...prev, nationalCardImage: file }));
// // //         } else {
// // //           setLicensePreview(reader.result);
// // //           setFormData(prev => ({ ...prev, licenseImage: file }));
// // //         }
// // //       };
// // //       reader.readAsDataURL(file);
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
    
// // //     if (!formData.fullName.trim()) return toast.error('نام و نام خانوادگی را وارد کنید');
// // //     if (!validateMobile(formData.mobile)) return toast.error('شماره موبایل نامعتبر است');
// // //     if (formData.password.length < 6) return toast.error('رمز عبور حداقل 6 کاراکتر باشد');
// // //     if (formData.password !== formData.confirmPassword) return toast.error('رمز عبور مطابقت ندارد');
// // //     if (!validateNationalCode(formData.nationalCode)) return toast.error('کد ملی نامعتبر است');
// // //     if (!formData.agentCode) return toast.error('کد مشاور را وارد کنید');
// // //     if (!formData.province) return toast.error('استان را انتخاب کنید');
// // //     if (!formData.city) return toast.error('شهر را انتخاب کنید');
// // //     if (!formData.officeAddress) return toast.error('آدرس دفتر را وارد کنید');
// // //     if (!formData.licenseNumber) return toast.error('شماره پروانه را وارد کنید');
// // //     if (!formData.licenseExpiryDate) return toast.error('تاریخ اعتبار پروانه را وارد کنید');
// // //     if (!nationalCardPreview) return toast.error('تصویر کارت ملی را آپلود کنید');
// // //     if (!licensePreview) return toast.error('تصویر پروانه را آپلود کنید');
// // //     if (!locationSelected) return toast.error('موقعیت دفتر را روی نقشه انتخاب کنید');
// // //     if (!acceptTerms) return toast.error('قوانین را بپذیرید');
    
// // //     setLoading(true);
// // //     const submitData = new FormData();
// // //     Object.keys(formData).forEach(key => {
// // //       if (formData[key] !== null && key !== 'confirmPassword') {
// // //         submitData.append(key, formData[key]);
// // //       }
// // //     });
// // //     submitData.append('userType', 'agency');
    
// // //     try {
// // //       const response = await fetch('https://localhost:7178/api/auth/register-agency', {
// // //         method: 'POST',
// // //         body: submitData,
// // //       });
// // //       const data = await response.json();
      
// // //       if (response.ok && data.success) {
// // //         toast.success('اطلاعات با موفقیت ثبت شد');
// // //         localStorage.setItem('userType', 'agency');
// // //         setTimeout(() => navigate('/register/verify', { 
// // //           state: { mobile: formData.mobile, userType: 'agency', fullName: formData.fullName } 
// // //         }), 2000);
// // //       } else {
// // //         toast.error(data.message || 'خطا در ثبت نام');
// // //       }
// // //     } catch (error) {
// // //       toast.error('خطا در ارتباط با سرور');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleBack = () => navigate('/register');

// // //   const scrollToSection = (section) => {
// // //     setActiveSection(section);
// // //     const element = document.querySelector(`[data-section="${section}"]`);
// // //     if (element) {
// // //       element.scrollIntoView({ behavior: 'smooth', block: 'center' });
// // //     }
// // //   };

// // //   // رندر نقشه
// // //   const renderMap = () => {
// // //     if (!mapLoaded) {
// // //       return (
// // //         <div className="map-loading">
// // //           <div className="loading-spinner"></div>
// // //           <p>در حال بارگذاری نقشه...</p>
// // //         </div>
// // //       );
// // //     }

// // //     if (typeof window.ol === 'undefined') {
// // //       return (
// // //         <div className="map-loading">
// // //           <p>در حال بارگذاری نقشه...</p>
// // //         </div>
// // //       );
// // //     }

// // //     return (
// // //       <div id="neshan-map" className="neshan-map-container"></div>
// // //     );
// // //   };

// // //   // مقداردهی اولیه نقشه بعد از لود DOM
// // //   useEffect(() => {
// // //     if (mapLoaded && typeof window.ol !== 'undefined' && !mapRef.current) {
// // //       const center = wgs84ToWebMercator(mapCenter.lng, mapCenter.lat);
      
// // //       const map = new window.ol.Map({
// // //         target: 'neshan-map',
// // //         view: new window.ol.View({
// // //           center: [center.x, center.y],
// // //           zoom: 14,
// // //         }),
// // //         layers: [
// // //           new window.ol.layer.Tile({
// // //             source: new window.ol.source.XYZ({
// // //               url: `https://api.neshan.org/maps/neshan/v1/dreamy/{z}/{x}/{y}.png?key=${mapKey}`,
// // //               attributions: '© نقشه‌ نشان',
// // //             }),
// // //           }),
// // //         ],
// // //       });
      
// // //       mapRef.current = map;
      
// // //       map.on('click', (e) => {
// // //         if (loading) return;
// // //         const wgs84 = webMercatorToWgs84(e.coordinate[0], e.coordinate[1]);
// // //         updateLocation(wgs84.lat, wgs84.lng);
// // //         reverseGeocode(wgs84.lat, wgs84.lng);
// // //         toast.success('موقعیت ثبت شد');
// // //       });
// // //     }
// // //   }, [mapLoaded, mapCenter, mapKey, updateLocation, reverseGeocode, loading]);

// // //   return (
// // //     <div className="agency-register">
// // //       <ToastContainer position="top-center" rtl={true} />
      
// // //       <div className="particles">
// // //         {[...Array(12)].map((_, i) => (
// // //           <div key={i} className="particle" style={{
// // //             left: `${Math.random() * 100}%`,
// // //             top: `${Math.random() * 100}%`,
// // //             animationDelay: `${Math.random() * 15}s`,
// // //             animationDuration: `${10 + Math.random() * 10}s`,
// // //           }}></div>
// // //         ))}
// // //       </div>

// // //       <div className="register-container">
// // //         {/* سایدبار راست - توضیحات و مزایا */}
// // //         <div className="register-sidebar">
// // //           <div className="sidebar-content">
// // //             <div className="sidebar-header">
// // //               <div className="sidebar-icon">
// // //                 <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
// // //                   <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// // //                   <path d="M5 10.5V16.5L12 21L19 16.5V10.5" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// // //                   <path d="M12 15V21" stroke="#d4af37" strokeWidth="2" strokeLinecap="round"/>
// // //                 </svg>
// // //               </div>
// // //               <h2>عضویت آژانس املاک</h2>
// // //               <p>اگر آژانس شما دارای جواز کسب معتبر است، برای عضویت لطفا فرم مقابل را تکمیل نمائید.</p>
// // //             </div>

// // //             <div className="benefits-box">
// // //               <h3>
// // //                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
// // //                   <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" fill="#d4af37" stroke="#d4af37" strokeWidth="1.5"/>
// // //                 </svg>
// // //                 مزایا همکاری با اوتاپ
// // //               </h3>
// // //               <div className="benefits-list">
// // //                 {benefits.map((b, i) => (
// // //                   <div key={i} className="benefit-item" style={{ transitionDelay: `${i * 0.1}s` }}>
// // //                     <span className="benefit-icon">{b.icon}</span>
// // //                     <div>
// // //                       <strong style={{ color: b.color }}>{b.title}</strong>
// // //                       <p>{b.desc}</p>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             <div className="info-box">
// // //               <div className="info-icon">
// // //                 <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
// // //                   <path d="M12 8V12L15 15M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#d4af37" strokeWidth="2" strokeLinecap="round"/>
// // //                 </svg>
// // //               </div>
// // //               <h4>توجه مهم</h4>
// // //               <ul>
// // //                 <li>پس از تایید جواز کسب و اطلاعات ثبت شده، پنلی اختصاصی برای آژانس شما ایجاد می‌شود</li>
// // //                 <li>اطلاعات کاربری از طریق پیامک ارسال خواهد شد</li>
// // //                 <li>می‌توانید مشاوران خود را به پنل اضافه کنید</li>
// // //                 <li>آگهی‌ها با نام و لوگوی آژانس شما نمایش داده می‌شود</li>
// // //               </ul>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* فرم اصلی سمت چپ */}
// // //         <div className="register-form-wrapper">
// // //           <div className="register-form">
// // //             <button className="back-btn" onClick={handleBack}>
// // //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                 <path d="M19 12H5M12 19L5 12L12 5" strokeLinecap="round" strokeLinejoin="round"/>
// // //               </svg>
// // //               بازگشت
// // //             </button>

// // //             {/* پروگرس استپ */}
// // //             <div className="form-progress">
// // //               {['personal', 'agency', 'documents'].map((section, idx) => (
// // //                 <div 
// // //                   key={section} 
// // //                   className={`progress-step ${activeSection === section ? 'active' : ''}`}
// // //                   onClick={() => scrollToSection(section)}
// // //                 >
// // //                   <div className="step-number">{idx + 1}</div>
// // //                   <div className="step-label">
// // //                     {section === 'personal' && 'اطلاعات شخصی'}
// // //                     {section === 'agency' && 'اطلاعات آژانس'}
// // //                     {section === 'documents' && 'مدارک'}
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             <form onSubmit={handleSubmit}>
// // //               {/* بخش 1: اطلاعات شخصی */}
// // //               <div className="form-section" data-section="personal">
// // //                 <div className="section-title">
// // //                   <span>👤</span> اطلاعات شخصی
// // //                 </div>
// // //                 <div className="form-row">
// // //                   <div className="input-group">
// // //                     <label>نام و نام خانوادگی *</label>
// // //                     <input 
// // //                       type="text" 
// // //                       name="fullName" 
// // //                       value={formData.fullName} 
// // //                       onChange={handleChange} 
// // //                       placeholder="علی محمدی" 
// // //                       disabled={loading}
// // //                     />
// // //                   </div>
// // //                   <div className="input-group">
// // //                     <label>شماره موبایل *</label>
// // //                     <input 
// // //                       type="tel" 
// // //                       name="mobile" 
// // //                       value={formData.mobile} 
// // //                       onChange={handleChange} 
// // //                       placeholder="09123456789" 
// // //                       disabled={loading}
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 <div className="form-row">
// // //                   <div className="input-group">
// // //                     <label>رمز عبور *</label>
// // //                     <div className="password-box">
// // //                       <input 
// // //                         type={showPassword ? "text" : "password"} 
// // //                         name="password" 
// // //                         value={formData.password} 
// // //                         onChange={handleChange} 
// // //                         placeholder="حداقل 6 کاراکتر" 
// // //                         disabled={loading}
// // //                       />
// // //                       <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
// // //                         {showPassword ? '🙈' : '👁️'}
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                   <div className="input-group">
// // //                     <label>تکرار رمز عبور *</label>
// // //                     <div className="password-box">
// // //                       <input 
// // //                         type={showConfirmPassword ? "text" : "password"} 
// // //                         name="confirmPassword" 
// // //                         value={formData.confirmPassword} 
// // //                         onChange={handleChange} 
// // //                         placeholder="تکرار رمز عبور" 
// // //                         disabled={loading}
// // //                       />
// // //                       <button type="button" className="eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
// // //                         {showConfirmPassword ? '🙈' : '👁️'}
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //                 {formData.confirmPassword && formData.password !== formData.confirmPassword && (
// // //                   <div className="error-msg">
// // //                     ❌ رمز عبور مطابقت ندارد
// // //                   </div>
// // //                 )}

// // //                 <div className="form-row">
// // //                   <div className="input-group">
// // //                     <label>کد ملی *</label>
// // //                     <input 
// // //                       type="text" 
// // //                       name="nationalCode" 
// // //                       value={formData.nationalCode} 
// // //                       onChange={handleChange} 
// // //                       maxLength="10" 
// // //                       placeholder="1234567890" 
// // //                       disabled={loading}
// // //                     />
// // //                   </div>
// // //                   <div className="input-group">
// // //                     <label>کد مشاور املاک *</label>
// // //                     <input 
// // //                       type="text" 
// // //                       name="agentCode" 
// // //                       value={formData.agentCode} 
// // //                       onChange={handleChange} 
// // //                       placeholder="کد مشاور" 
// // //                       disabled={loading}
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* بخش 2: اطلاعات آژانس با انتخاب داینامیک استان/شهر/منطقه */}
// // //               <div className="form-section" data-section="agency">
// // //                 <div className="section-title">
// // //                   <span>🏛️</span> اطلاعات آژانس و مجوزها
// // //                 </div>
// // //                 <div className="form-row">
// // //                   <div className="input-group">
// // //                     <label>استان *</label>
// // //                     <select 
// // //                       name="province" 
// // //                       value={selectedProvinceId || ''} 
// // //                       onChange={handleProvinceChange} 
// // //                       disabled={loading || provinces.length === 0}
// // //                     >
// // //                       <option value="">انتخاب استان</option>
// // //                       {provinces.map(p => (
// // //                         <option key={p.id} value={p.id}>
// // //                           {p.name}
// // //                         </option>
// // //                       ))}
// // //                     </select>
// // //                     {/* نمایش نام استان انتخاب شده */}
// // //                     {selectedProvinceId && formData.province && (
// // //                       <div className="selected-value">✅ {formData.province}</div>
// // //                     )}
// // //                   </div>
// // //                   <div className="input-group">
// // //                     <label>شهر *</label>
// // //                     <select 
// // //                       name="city" 
// // //                       value={selectedCityId || ''} 
// // //                       onChange={handleCityChange} 
// // //                       disabled={loading || cities.length === 0 || loadingRegions}
// // //                     >
// // //                       <option value="">انتخاب شهر</option>
// // //                       {cities.map(c => (
// // //                         <option key={c.id} value={c.id}>
// // //                           {c.name}
// // //                         </option>
// // //                       ))}
// // //                     </select>
// // //                     {loadingRegions && <div className="loading-text">در حال بارگذاری...</div>}
// // //                     {/* نمایش نام شهر انتخاب شده */}
// // //                     {selectedCityId && formData.city && (
// // //                       <div className="selected-value">✅ {formData.city}</div>
// // //                     )}
// // //                   </div>
// // //                 </div>

// // //                 {/* نمایش کامبوباکس منطقه اگر وجود داشته باشد */}
// // //                 {regions.length > 0 && (
// // //                   <div className="form-row">
// // //                     <div className="input-group full-width">
// // //                       <label>منطقه *</label>
// // //                       <select 
// // //                         name="region" 
// // //                         value={selectedRegionId || ''} 
// // //                         onChange={handleRegionChange} 
// // //                         disabled={loading || regions.length === 0}
// // //                       >
// // //                         <option value="">انتخاب منطقه</option>
// // //                         {regions.map(r => (
// // //                           <option key={r.id} value={r.id}>
// // //                             {r.name}
// // //                           </option>
// // //                         ))}
// // //                       </select>
// // //                       {/* نمایش نام منطقه انتخاب شده */}
// // //                       {selectedRegionId && formData.region && (
// // //                         <div className="selected-value">✅ {formData.region}</div>
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                 )}

// // //                 <div className="input-group full-width">
// // //                   <label>آدرس دفتر *</label>
// // //                   <input 
// // //                     type="text" 
// // //                     name="officeAddress" 
// // //                     value={formData.officeAddress} 
// // //                     onChange={handleChange} 
// // //                     placeholder="آدرس کامل دفتر" 
// // //                     disabled={loading}
// // //                   />
// // //                 </div>

// // //                 <div className="form-row">
// // //                   <div className="input-group">
// // //                     <label>شماره پروانه *</label>
// // //                     <input 
// // //                       type="text" 
// // //                       name="licenseNumber" 
// // //                       value={formData.licenseNumber} 
// // //                       onChange={handleChange} 
// // //                       placeholder="شماره پروانه" 
// // //                       disabled={loading}
// // //                     />
// // //                   </div>
// // //                   <div className="input-group">
// // //                     <label>تاریخ اعتبار پروانه *</label>
// // //                     <input 
// // //                       type="date" 
// // //                       name="licenseExpiryDate" 
// // //                       value={formData.licenseExpiryDate} 
// // //                       onChange={handleChange} 
// // //                       disabled={loading}
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* بخش 3: موقعیت روی نقشه */}
// // //               <div className="form-section" data-section="location">
// // //                 <div className="section-title">
// // //                   <span>🗺️</span> موقعیت دفتر روی نقشه
// // //                 </div>
// // //                 <div className="search-box">
// // //                   <input 
// // //                     type="text" 
// // //                     value={searchAddress} 
// // //                     onChange={(e) => setSearchAddress(e.target.value)} 
// // //                     placeholder="جستجوی آدرس روی نقشه..." 
// // //                     onKeyPress={(e) => e.key === 'Enter' && searchAddressHandler()} 
// // //                   />
// // //                   <button type="button" onClick={searchAddressHandler} disabled={searching}>
// // //                     {searching ? 'جستجو...' : '🔍 جستجو'}
// // //                   </button>
// // //                 </div>

// // //                 <div className="map-wrapper">
// // //                   {renderMap()}
// // //                   <div className="map-marker">📍</div>
// // //                 </div>
                
// // //                 {locationSelected && (
// // //                   <div className="location-success">
// // //                     ✓ موقعیت ثبت شد | {formData.lat.toFixed(5)} , {formData.lng.toFixed(5)}
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* بخش 4: آپلود مدارک */}
// // //               <div className="form-section" data-section="documents">
// // //                 <div className="section-title">
// // //                   <span>📎</span> آپلود مدارک
// // //                 </div>
// // //                 <div className="upload-row">
// // //                   <div className="upload-box" onClick={() => nationalCardRef.current?.click()}>
// // //                     <input type="file" ref={nationalCardRef} onChange={(e) => handleImageChange(e, 'national')} accept="image/*" hidden />
// // //                     {nationalCardPreview ? (
// // //                       <div className="preview">
// // //                         <img src={nationalCardPreview} alt="کارت ملی" />
// // //                         <button type="button" className="remove-btn" onClick={(e) => { e.stopPropagation(); setNationalCardPreview(null); setFormData(prev => ({ ...prev, nationalCardImage: null })); }}>
// // //                           ✗
// // //                         </button>
// // //                       </div>
// // //                     ) : (
// // //                       <>
// // //                         <div className="upload-icon">🪪</div>
// // //                         <p>تصویر کارت ملی</p>
// // //                         <small>jpg, png (حداکثر 2MB)</small>
// // //                       </>
// // //                     )}
// // //                   </div>
// // //                   <div className="upload-box" onClick={() => licenseRef.current?.click()}>
// // //                     <input type="file" ref={licenseRef} onChange={(e) => handleImageChange(e, 'license')} accept="image/*" hidden />
// // //                     {licensePreview ? (
// // //                       <div className="preview">
// // //                         <img src={licensePreview} alt="پروانه" />
// // //                         <button type="button" className="remove-btn" onClick={(e) => { e.stopPropagation(); setLicensePreview(null); setFormData(prev => ({ ...prev, licenseImage: null })); }}>
// // //                           ✗
// // //                         </button>
// // //                       </div>
// // //                     ) : (
// // //                       <>
// // //                         <div className="upload-icon">📄</div>
// // //                         <p>تصویر پروانه کسب</p>
// // //                         <small>jpg, png (حداکثر 2MB)</small>
// // //                       </>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <label className="checkbox">
// // //                 <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
// // //                 <span className="checkmark"></span>
// // //                 قوانین و مقررات سایت اوتاپ را مطالعه کرده و می‌پذیرم
// // //               </label>

// // //               <button type="submit" disabled={loading} className="submit-btn">
// // //                 {loading ? (
// // //                   <>
// // //                     <span className="spinner"></span>
// // //                     در حال ثبت نام...
// // //                   </>
// // //                 ) : (
// // //                   <>🏢 ثبت نام آژانس</>
// // //                 )}
// // //               </button>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default RegisterAgency;

// // // RegisterAgency.jsx - با تولید خودکار آدرس کامل
// // import React, { useState, useRef, useEffect, useCallback } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import './RegisterAgency.css';

// // // تابع تبدیل مختصات
// // const wgs84ToWebMercator = (lng, lat) => {
// //   const R = 6378137;
// //   return {
// //     x: lng * (Math.PI * R) / 180,
// //     y: Math.log(Math.tan((90 + lat) * Math.PI / 360)) * R
// //   };
// // };

// // const webMercatorToWgs84 = (x, y) => {
// //   const R = 6378137;
// //   return {
// //     lat: (2 * Math.atan(Math.exp(y / R)) - Math.PI / 2) * 180 / Math.PI,
// //     lng: (x * 180) / (Math.PI * R)
// //   };
// // };

// // const RegisterAgency = () => {
// //   const mapRef = useRef(null);
// //   const [mapKey] = useState("web.31c5ea6c425e40cc9b30620a84a8be90");
// //   const [mapLoaded, setMapLoaded] = useState(false);
  
// //   const [formData, setFormData] = useState({
// //     fullName: '', mobile: '', password: '', confirmPassword: '',
// //     nationalCode: '', agentCode: '', province: '', city: '', region: '',
// //     officeAddress: '', licenseNumber: '', licenseExpiryDate: '',
// //     nationalCardImage: null, licenseImage: null,
// //     lat: 35.699739, lng: 51.338097
// //   });
  
// //   const [loading, setLoading] = useState(false);
// //   const [acceptTerms, setAcceptTerms] = useState(false);
// //   const [nationalCardPreview, setNationalCardPreview] = useState(null);
// //   const [licensePreview, setLicensePreview] = useState(null);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [locationSelected, setLocationSelected] = useState(false);
// //   const [mapCenter, setMapCenter] = useState({ lat: 35.699739, lng: 51.338097 });
// //   const [searchAddress, setSearchAddress] = useState('');
// //   const [searching, setSearching] = useState(false);
// //   const [activeSection, setActiveSection] = useState('personal');
  
// //   // ===== State های داینامیک برای استان/شهر/منطقه =====
// //   const [provinces, setProvinces] = useState([]);
// //   const [cities, setCities] = useState([]);
// //   const [regions, setRegions] = useState([]);
// //   const [loadingRegions, setLoadingRegions] = useState(false);
// //   const [selectedProvinceId, setSelectedProvinceId] = useState(null);
// //   const [selectedCityId, setSelectedCityId] = useState(null);
// //   const [selectedRegionId, setSelectedRegionId] = useState(null);
  
// //   const nationalCardRef = useRef(null);
// //   const licenseRef = useRef(null);
// //   const navigate = useNavigate();

// //   const benefits = [
// //     { icon: '🏆', title: 'اعتبار برند اوتاپ', desc: 'برخورداری از اعتبار و جایگاه برند معتبر', color: '#7d0000' },
// //     { icon: '⚡', title: 'ثبت سریع و آسان ملک', desc: 'ثبت آگهی در کمترین زمان ممکن', color: '#d4af37' },
// //     { icon: '🎨', title: 'پنل مشاوری حرفه‌ای', desc: 'پنل اختصاصی با طراحی مدرن و کاربری آسان', color: '#7d0000' },
// //     { icon: '💰', title: 'کیف پول و شارژ هدیه', desc: 'امکان برخورداری از کیف پول و دریافت شارژ هدیه', color: '#d4af37' },
// //     { icon: '📈', title: 'امکانات ارتقاء آگهی', desc: 'به روزرسانی، ویترین، بسته افزایش بازدید', color: '#7d0000' },
// //     { icon: '📊', title: 'آمار بازدید و تماس', desc: 'مشاهده آمار دقیق بازدید و تماس هر آگهی', color: '#d4af37' }
// //   ];

// //   // ===== دریافت استان‌ها =====
// //   useEffect(() => {
// //     const fetchProvinces = async () => {
// //       try {
// //         const response = await fetch('https://localhost:7178/api/RealEstatePage/GetRegions');
// //         const result = await response.json();
        
// //         if (result.status === 200 && result.data) {
// //           setProvinces(result.data);
// //         } else {
// //           console.warn('⚠️ خطا در دریافت استان‌ها');
// //         }
// //       } catch (error) {
// //         console.error('❌ خطا در دریافت استان‌ها:', error);
// //       }
// //     };

// //     fetchProvinces();
// //   }, []);

// //   // ===== دریافت شهرها هنگام انتخاب استان =====
// //   useEffect(() => {
// //     const fetchCities = async () => {
// //       if (!selectedProvinceId) {
// //         setCities([]);
// //         return;
// //       }

// //       setLoadingRegions(true);
// //       try {
// //         const response = await fetch(
// //           `https://localhost:7178/api/RealEstatePage/GetRegionsWithChildFlagAsync?id=${selectedProvinceId}`
// //         );
// //         const result = await response.json();
        
// //         if (result.status === 200 && result.data) {
// //           setCities(result.data);
// //           // ریست کردن شهر و منطقه
// //           setFormData(prev => ({ ...prev, city: '', region: '' }));
// //           setSelectedCityId(null);
// //           setSelectedRegionId(null);
// //           setRegions([]);
// //           // آدرس رو آپدیت کن
// //           updateFullAddress('', '');
// //         } else {
// //           setCities([]);
// //         }
// //       } catch (error) {
// //         console.error('❌ خطا در دریافت شهرها:', error);
// //         setCities([]);
// //       } finally {
// //         setLoadingRegions(false);
// //       }
// //     };

// //     fetchCities();
// //   }, [selectedProvinceId]);

// //   // ===== دریافت مناطق هنگام انتخاب شهر =====
// //   useEffect(() => {
// //     const fetchRegions = async () => {
// //       if (!selectedCityId) {
// //         setRegions([]);
// //         setSelectedRegionId(null);
// //         return;
// //       }

// //       setLoadingRegions(true);
// //       try {
// //         const response = await fetch(
// //           `https://localhost:7178/api/RealEstatePage/GetRegionsWithChildFlagAsync?id=${selectedCityId}`
// //         );
// //         const result = await response.json();
        
// //         if (result.status === 200 && result.data) {
// //           setRegions(result.data);
// //           setFormData(prev => ({ ...prev, region: '' }));
// //           setSelectedRegionId(null);
// //           // آدرس رو آپدیت کن
// //           updateFullAddress(formData.city, '');
// //         } else {
// //           setRegions([]);
// //         }
// //       } catch (error) {
// //         console.error('❌ خطا در دریافت مناطق:', error);
// //         setRegions([]);
// //       } finally {
// //         setLoadingRegions(false);
// //       }
// //     };

// //     fetchRegions();
// //   }, [selectedCityId]);

// //   // ===== تابع تولید آدرس کامل =====
// //   const updateFullAddress = useCallback((cityName, regionName) => {
// //     const province = formData.province || '';
// //     const city = cityName || formData.city || '';
// //     const region = regionName || formData.region || '';
    
// //     // ساخت آدرس کامل با خط تیره
// //     let fullAddress = '';
    
// //     if (province) {
// //       fullAddress += province;
// //     }
    
// //     if (city) {
// //       fullAddress += fullAddress ? ' - ' : '';
// //       fullAddress += city;
// //     }
    
// //     if (region) {
// //       fullAddress += fullAddress ? ' - ' : '';
// //       fullAddress += region;
// //     }
    
// //     // اگر آدرسی وجود داشت، آدرس دفتر رو آپدیت کن
// //     if (fullAddress) {
// //       // اگر کاربر قبلاً آدرس دستی وارد کرده بود، حفظش کن
// //       if (!formData.officeAddress || formData.officeAddress === '' || 
// //           formData.officeAddress === formData.province || 
// //           formData.officeAddress === `${formData.province} - ${formData.city}`) {
// //         setFormData(prev => ({ ...prev, officeAddress: fullAddress }));
// //       }
// //     }
// //   }, [formData.province, formData.city, formData.region]);

// //   // ===== وقتی استان، شهر یا منطقه تغییر می‌کنه آدرس رو آپدیت کن =====
// //   useEffect(() => {
// //     if (formData.province || formData.city || formData.region) {
// //       const province = formData.province || '';
// //       const city = formData.city || '';
// //       const region = formData.region || '';
      
// //       let fullAddress = '';
      
// //       if (province) fullAddress += province;
// //       if (city) fullAddress += fullAddress ? ' - ' + city : city;
// //       if (region) fullAddress += fullAddress ? ' - ' + region : region;
      
// //       // فقط اگر کاربر آدرس رو دستی تغییر نداده باشه
// //       const isAutoGenerated = formData.officeAddress === '' || 
// //                               formData.officeAddress === formData.province || 
// //                               formData.officeAddress === `${formData.province} - ${formData.city}` ||
// //                               formData.officeAddress === `${formData.province} - ${formData.city} - ${formData.region}` ||
// //                               !formData.officeAddress.includes(province);
      
// //       if (fullAddress && isAutoGenerated) {
// //         setFormData(prev => ({ ...prev, officeAddress: fullAddress }));
// //       }
// //     }
// //   }, [formData.province, formData.city, formData.region]);

// //   // لود کردن اسکریپت نقشه
// //   useEffect(() => {
// //     const loadNeshanMap = () => {
// //       return new Promise((resolve) => {
// //         if (document.querySelector('script[src*="neshan"]')) {
// //           resolve();
// //           return;
// //         }
// //         const script = document.createElement('script');
// //         script.src = 'https://static.neshan.org/api/openlayers/4.6.5/ol.js';
// //         script.onload = () => {
// //           const link = document.createElement('link');
// //           link.rel = 'stylesheet';
// //           link.href = 'https://static.neshan.org/api/openlayers/4.6.5/ol.css';
// //           document.head.appendChild(link);
// //           resolve();
// //         };
// //         document.head.appendChild(script);
// //       });
// //     };

// //     loadNeshanMap().then(() => {
// //       setMapLoaded(true);
// //     });
// //   }, []);

// //   useEffect(() => {
// //     const observer = new IntersectionObserver((entries) => {
// //       entries.forEach(entry => {
// //         if (entry.isIntersecting) {
// //           entry.target.classList.add('visible');
// //         }
// //       });
// //     }, { threshold: 0.1 });

// //     document.querySelectorAll('.form-section, .benefit-item, .upload-box').forEach(el => {
// //       observer.observe(el);
// //     });

// //     return () => observer.disconnect();
// //   }, []);

// //   const validateNationalCode = (code) => {
// //     if (!/^\d{10}$/.test(code)) return false;
// //     const check = parseInt(code[9], 10);
// //     let sum = 0;
// //     for (let i = 0; i < 9; i++) sum += parseInt(code[i], 10) * (10 - i);
// //     const remainder = sum % 11;
// //     if (remainder < 2) return check === remainder;
// //     return check === (11 - remainder);
// //   };

// //   const validateMobile = (mobile) => /^09[0-9]{9}$/.test(mobile);

// //   const updateLocation = useCallback((lat, lng) => {
// //     setFormData(prev => ({ ...prev, lat, lng }));
// //     setMapCenter({ lat, lng });
// //     setLocationSelected(true);
    
// //     if (mapRef.current && mapRef.current.getView) {
// //       try {
// //         const view = mapRef.current.getView();
// //         const coords = wgs84ToWebMercator(lng, lat);
// //         view.setCenter([coords.x, coords.y]);
// //         view.setZoom(17);
// //       } catch (error) {
// //         console.error('خطا در به‌روزرسانی نقشه:', error);
// //       }
// //     }
// //   }, []);

// //   const reverseGeocode = useCallback(async (lat, lng) => {
// //     try {
// //       const response = await fetch(`https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`, {
// //         headers: { 'Api-Key': mapKey }
// //       });
// //       const data = await response.json();
// //       if (data?.formatted_address) {
// //         // اگر آدرس از نقشه بیاد و کاربر هنوز دستی چیزی وارد نکرده
// //         if (!formData.officeAddress || formData.officeAddress === '' || 
// //             formData.officeAddress === formData.province || 
// //             formData.officeAddress === `${formData.province} - ${formData.city}` ||
// //             formData.officeAddress === `${formData.province} - ${formData.city} - ${formData.region}`) {
// //           setFormData(prev => ({ ...prev, officeAddress: data.formatted_address }));
// //         }
// //       }
// //     } catch (error) {
// //       console.error('خطا در تبدیل معکوس:', error);
// //     }
// //   }, [mapKey, formData.officeAddress, formData.province, formData.city, formData.region]);

// //   const searchAddressHandler = useCallback(async () => {
// //     if (!searchAddress.trim()) {
// //       toast.warning('لطفاً آدرس را وارد کنید');
// //       return;
// //     }
    
// //     setSearching(true);
// //     try {
// //       const response = await fetch(
// //         `https://api.neshan.org/v4/search?term=${encodeURIComponent(searchAddress)}&lat=${mapCenter.lat}&lng=${mapCenter.lng}`,
// //         { headers: { 'Api-Key': mapKey } }
// //       );
// //       const data = await response.json();
      
// //       if (data.items?.length > 0) {
// //         const item = data.items[0];
// //         updateLocation(item.location.y, item.location.x);
// //         setFormData(prev => ({ ...prev, officeAddress: item.title }));
// //         reverseGeocode(item.location.y, item.location.x);
// //         toast.success('موقعیت پیدا شد');
// //       } else {
// //         toast.error('آدرس یافت نشد');
// //       }
// //     } catch (error) {
// //       toast.error('خطا در جستجو');
// //     } finally {
// //       setSearching(false);
// //     }
// //   }, [searchAddress, mapCenter, mapKey, updateLocation, reverseGeocode]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
    
// //     if (name === 'nationalCode' || name === 'mobile' || name === 'agentCode') {
// //       const numericValue = value.replace(/[^0-9]/g, '');
// //       const maxLen = name === 'nationalCode' ? 10 : name === 'mobile' ? 11 : 20;
// //       if (numericValue.length <= maxLen) {
// //         setFormData(prev => ({ ...prev, [name]: numericValue }));
// //       }
// //     } else if (name === 'officeAddress') {
// //       // کاربر دستی آدرس رو تغییر داده
// //       setFormData(prev => ({ ...prev, officeAddress: value }));
// //     } else {
// //       setFormData(prev => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   // ===== هندلر تغییر استان =====
// //   const handleProvinceChange = (e) => {
// //     const value = e.target.value;
// //     const selected = provinces.find(p => p.id === parseInt(value));
    
// //     if (selected) {
// //       setSelectedProvinceId(selected.id);
// //       setFormData(prev => ({ 
// //         ...prev, 
// //         province: selected.name,
// //         city: '',
// //         region: ''
// //       }));
// //       setSelectedCityId(null);
// //       setSelectedRegionId(null);
// //       setRegions([]);
// //     }
// //   };

// //   // ===== هندلر تغییر شهر =====
// //   const handleCityChange = (e) => {
// //     const value = e.target.value;
// //     const selected = cities.find(c => c.id === parseInt(value));
    
// //     if (selected) {
// //       setSelectedCityId(selected.id);
// //       setFormData(prev => ({ 
// //         ...prev, 
// //         city: selected.name,
// //         region: ''
// //       }));
// //       setSelectedRegionId(null);
// //       setRegions([]);
// //     }
// //   };

// //   // ===== هندلر تغییر منطقه =====
// //   const handleRegionChange = (e) => {
// //     const value = e.target.value;
// //     const selected = regions.find(r => r.id === parseInt(value));
    
// //     if (selected) {
// //       setSelectedRegionId(selected.id);
// //       setFormData(prev => ({ ...prev, region: selected.name }));
// //     }
// //   };

// //   const handleImageChange = (e, type) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       if (!file.type.match('image.*')) {
// //         toast.error('فایل باید تصویر باشد');
// //         return;
// //       }
// //       if (file.size > 2 * 1024 * 1024) {
// //         toast.error('حجم تصویر حداکثر 2 مگابایت');
// //         return;
// //       }
      
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         if (type === 'national') {
// //           setNationalCardPreview(reader.result);
// //           setFormData(prev => ({ ...prev, nationalCardImage: file }));
// //         } else {
// //           setLicensePreview(reader.result);
// //           setFormData(prev => ({ ...prev, licenseImage: file }));
// //         }
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!formData.fullName.trim()) return toast.error('نام و نام خانوادگی را وارد کنید');
// //     if (!validateMobile(formData.mobile)) return toast.error('شماره موبایل نامعتبر است');
// //     if (formData.password.length < 6) return toast.error('رمز عبور حداقل 6 کاراکتر باشد');
// //     if (formData.password !== formData.confirmPassword) return toast.error('رمز عبور مطابقت ندارد');
// //     if (!validateNationalCode(formData.nationalCode)) return toast.error('کد ملی نامعتبر است');
// //     if (!formData.agentCode) return toast.error('کد مشاور را وارد کنید');
// //     if (!formData.province) return toast.error('استان را انتخاب کنید');
// //     if (!formData.city) return toast.error('شهر را انتخاب کنید');
// //     if (!formData.officeAddress) return toast.error('آدرس دفتر را وارد کنید');
// //     if (!formData.licenseNumber) return toast.error('شماره پروانه را وارد کنید');
// //     if (!formData.licenseExpiryDate) return toast.error('تاریخ اعتبار پروانه را وارد کنید');
// //     if (!nationalCardPreview) return toast.error('تصویر کارت ملی را آپلود کنید');
// //     if (!licensePreview) return toast.error('تصویر پروانه را آپلود کنید');
// //     if (!locationSelected) return toast.error('موقعیت دفتر را روی نقشه انتخاب کنید');
// //     if (!acceptTerms) return toast.error('قوانین را بپذیرید');
    
// //     setLoading(true);
// //     const submitData = new FormData();
// //     Object.keys(formData).forEach(key => {
// //       if (formData[key] !== null && key !== 'confirmPassword') {
// //         submitData.append(key, formData[key]);
// //       }
// //     });
// //     submitData.append('userType', 'agency');
    
// //     try {
// //       const response = await fetch('https://localhost:7178/api/auth/register-agency', {
// //         method: 'POST',
// //         body: submitData,
// //       });
// //       const data = await response.json();
      
// //       if (response.ok && data.success) {
// //         toast.success('اطلاعات با موفقیت ثبت شد');
// //         localStorage.setItem('userType', 'agency');
// //         setTimeout(() => navigate('/register/verify', { 
// //           state: { mobile: formData.mobile, userType: 'agency', fullName: formData.fullName } 
// //         }), 2000);
// //       } else {
// //         toast.error(data.message || 'خطا در ثبت نام');
// //       }
// //     } catch (error) {
// //       toast.error('خطا در ارتباط با سرور');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleBack = () => navigate('/register');

// //   const scrollToSection = (section) => {
// //     setActiveSection(section);
// //     const element = document.querySelector(`[data-section="${section}"]`);
// //     if (element) {
// //       element.scrollIntoView({ behavior: 'smooth', block: 'center' });
// //     }
// //   };

// //   // رندر نقشه
// //   const renderMap = () => {
// //     if (!mapLoaded) {
// //       return (
// //         <div className="map-loading">
// //           <div className="loading-spinner"></div>
// //           <p>در حال بارگذاری نقشه...</p>
// //         </div>
// //       );
// //     }

// //     if (typeof window.ol === 'undefined') {
// //       return (
// //         <div className="map-loading">
// //           <p>در حال بارگذاری نقشه...</p>
// //         </div>
// //       );
// //     }

// //     return (
// //       <div id="neshan-map" className="neshan-map-container"></div>
// //     );
// //   };

// //   // مقداردهی اولیه نقشه بعد از لود DOM
// //   useEffect(() => {
// //     if (mapLoaded && typeof window.ol !== 'undefined' && !mapRef.current) {
// //       const center = wgs84ToWebMercator(mapCenter.lng, mapCenter.lat);
      
// //       const map = new window.ol.Map({
// //         target: 'neshan-map',
// //         view: new window.ol.View({
// //           center: [center.x, center.y],
// //           zoom: 14,
// //         }),
// //         layers: [
// //           new window.ol.layer.Tile({
// //             source: new window.ol.source.XYZ({
// //               url: `https://api.neshan.org/maps/neshan/v1/dreamy/{z}/{x}/{y}.png?key=${mapKey}`,
// //               attributions: '© نقشه‌ نشان',
// //             }),
// //           }),
// //         ],
// //       });
      
// //       mapRef.current = map;
      
// //       map.on('click', (e) => {
// //         if (loading) return;
// //         const wgs84 = webMercatorToWgs84(e.coordinate[0], e.coordinate[1]);
// //         updateLocation(wgs84.lat, wgs84.lng);
// //         reverseGeocode(wgs84.lat, wgs84.lng);
// //         toast.success('موقعیت ثبت شد');
// //       });
// //     }
// //   }, [mapLoaded, mapCenter, mapKey, updateLocation, reverseGeocode, loading]);

// //   // ===== ساختن آدرس نمایشی =====
// //   const getDisplayAddress = () => {
// //     const parts = [];
// //     if (formData.province) parts.push(formData.province);
// //     if (formData.city) parts.push(formData.city);
// //     if (formData.region) parts.push(formData.region);
// //     return parts.join(' - ');
// //   };

// //   return (
// //     <div className="agency-register">
// //       <ToastContainer position="top-center" rtl={true} />
      
// //       <div className="particles">
// //         {[...Array(12)].map((_, i) => (
// //           <div key={i} className="particle" style={{
// //             left: `${Math.random() * 100}%`,
// //             top: `${Math.random() * 100}%`,
// //             animationDelay: `${Math.random() * 15}s`,
// //             animationDuration: `${10 + Math.random() * 10}s`,
// //           }}></div>
// //         ))}
// //       </div>

// //       <div className="register-container">
// //         {/* سایدبار راست - توضیحات و مزایا */}
// //         <div className="register-sidebar">
// //           <div className="sidebar-content">
// //             <div className="sidebar-header">
// //               <div className="sidebar-icon">
// //                 <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
// //                   <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// //                   <path d="M5 10.5V16.5L12 21L19 16.5V10.5" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// //                   <path d="M12 15V21" stroke="#d4af37" strokeWidth="2" strokeLinecap="round"/>
// //                 </svg>
// //               </div>
// //               <h2>عضویت آژانس املاک</h2>
// //               <p>اگر آژانس شما دارای جواز کسب معتبر است، برای عضویت لطفا فرم مقابل را تکمیل نمائید.</p>
// //             </div>

// //             <div className="benefits-box">
// //               <h3>
// //                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
// //                   <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" fill="#d4af37" stroke="#d4af37" strokeWidth="1.5"/>
// //                 </svg>
// //                 مزایا همکاری با اوتاپ
// //               </h3>
// //               <div className="benefits-list">
// //                 {benefits.map((b, i) => (
// //                   <div key={i} className="benefit-item" style={{ transitionDelay: `${i * 0.1}s` }}>
// //                     <span className="benefit-icon">{b.icon}</span>
// //                     <div>
// //                       <strong style={{ color: b.color }}>{b.title}</strong>
// //                       <p>{b.desc}</p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="info-box">
// //               <div className="info-icon">
// //                 <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
// //                   <path d="M12 8V12L15 15M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#d4af37" strokeWidth="2" strokeLinecap="round"/>
// //                 </svg>
// //               </div>
// //               <h4>توجه مهم</h4>
// //               <ul>
// //                 <li>پس از تایید جواز کسب و اطلاعات ثبت شده، پنلی اختصاصی برای آژانس شما ایجاد می‌شود</li>
// //                 <li>اطلاعات کاربری از طریق پیامک ارسال خواهد شد</li>
// //                 <li>می‌توانید مشاوران خود را به پنل اضافه کنید</li>
// //                 <li>آگهی‌ها با نام و لوگوی آژانس شما نمایش داده می‌شود</li>
// //               </ul>
// //             </div>
// //           </div>
// //         </div>

// //         {/* فرم اصلی سمت چپ */}
// //         <div className="register-form-wrapper">
// //           <div className="register-form">
// //             <button className="back-btn" onClick={handleBack}>
// //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                 <path d="M19 12H5M12 19L5 12L12 5" strokeLinecap="round" strokeLinejoin="round"/>
// //               </svg>
// //               بازگشت
// //             </button>

// //             {/* پروگرس استپ */}
// //             <div className="form-progress">
// //               {['personal', 'agency', 'documents'].map((section, idx) => (
// //                 <div 
// //                   key={section} 
// //                   className={`progress-step ${activeSection === section ? 'active' : ''}`}
// //                   onClick={() => scrollToSection(section)}
// //                 >
// //                   <div className="step-number">{idx + 1}</div>
// //                   <div className="step-label">
// //                     {section === 'personal' && 'اطلاعات شخصی'}
// //                     {section === 'agency' && 'اطلاعات آژانس'}
// //                     {section === 'documents' && 'مدارک'}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             <form onSubmit={handleSubmit}>
// //               {/* بخش 1: اطلاعات شخصی */}
// //               <div className="form-section" data-section="personal">
// //                 <div className="section-title">
// //                   <span>👤</span> اطلاعات شخصی
// //                 </div>
// //                 <div className="form-row">
// //                   <div className="input-group">
// //                     <label>نام و نام خانوادگی *</label>
// //                     <input 
// //                       type="text" 
// //                       name="fullName" 
// //                       value={formData.fullName} 
// //                       onChange={handleChange} 
// //                       placeholder="علی محمدی" 
// //                       disabled={loading}
// //                     />
// //                   </div>
// //                   <div className="input-group">
// //                     <label>شماره موبایل *</label>
// //                     <input 
// //                       type="tel" 
// //                       name="mobile" 
// //                       value={formData.mobile} 
// //                       onChange={handleChange} 
// //                       placeholder="09123456789" 
// //                       disabled={loading}
// //                     />
// //                   </div>
// //                 </div>

// //                 <div className="form-row">
// //                   <div className="input-group">
// //                     <label>رمز عبور *</label>
// //                     <div className="password-box">
// //                       <input 
// //                         type={showPassword ? "text" : "password"} 
// //                         name="password" 
// //                         value={formData.password} 
// //                         onChange={handleChange} 
// //                         placeholder="حداقل 6 کاراکتر" 
// //                         disabled={loading}
// //                       />
// //                       <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
// //                         {showPassword ? '🙈' : '👁️'}
// //                       </button>
// //                     </div>
// //                   </div>
// //                   <div className="input-group">
// //                     <label>تکرار رمز عبور *</label>
// //                     <div className="password-box">
// //                       <input 
// //                         type={showConfirmPassword ? "text" : "password"} 
// //                         name="confirmPassword" 
// //                         value={formData.confirmPassword} 
// //                         onChange={handleChange} 
// //                         placeholder="تکرار رمز عبور" 
// //                         disabled={loading}
// //                       />
// //                       <button type="button" className="eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
// //                         {showConfirmPassword ? '🙈' : '👁️'}
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 {formData.confirmPassword && formData.password !== formData.confirmPassword && (
// //                   <div className="error-msg">
// //                     ❌ رمز عبور مطابقت ندارد
// //                   </div>
// //                 )}

// //                 <div className="form-row">
// //                   <div className="input-group">
// //                     <label>کد ملی *</label>
// //                     <input 
// //                       type="text" 
// //                       name="nationalCode" 
// //                       value={formData.nationalCode} 
// //                       onChange={handleChange} 
// //                       maxLength="10" 
// //                       placeholder="1234567890" 
// //                       disabled={loading}
// //                     />
// //                   </div>
// //                   <div className="input-group">
// //                     <label>کد مشاور املاک *</label>
// //                     <input 
// //                       type="text" 
// //                       name="agentCode" 
// //                       value={formData.agentCode} 
// //                       onChange={handleChange} 
// //                       placeholder="کد مشاور" 
// //                       disabled={loading}
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* بخش 2: اطلاعات آژانس با انتخاب داینامیک استان/شهر/منطقه */}
// //               <div className="form-section" data-section="agency">
// //                 <div className="section-title">
// //                   <span>🏛️</span> اطلاعات آژانس و مجوزها
// //                 </div>
// //                 <div className="form-row">
// //                   <div className="input-group">
// //                     <label>استان *</label>
// //                     <select 
// //                       name="province" 
// //                       value={selectedProvinceId || ''} 
// //                       onChange={handleProvinceChange} 
// //                       disabled={loading || provinces.length === 0}
// //                     >
// //                       <option value="">انتخاب استان</option>
// //                       {provinces.map(p => (
// //                         <option key={p.id} value={p.id}>
// //                           {p.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                     {selectedProvinceId && formData.province && (
// //                       <div className="selected-value">✅ {formData.province}</div>
// //                     )}
// //                   </div>
// //                   <div className="input-group">
// //                     <label>شهر *</label>
// //                     <select 
// //                       name="city" 
// //                       value={selectedCityId || ''} 
// //                       onChange={handleCityChange} 
// //                       disabled={loading || cities.length === 0 || loadingRegions}
// //                     >
// //                       <option value="">انتخاب شهر</option>
// //                       {cities.map(c => (
// //                         <option key={c.id} value={c.id}>
// //                           {c.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                     {loadingRegions && <div className="loading-text">در حال بارگذاری...</div>}
// //                     {selectedCityId && formData.city && (
// //                       <div className="selected-value">✅ {formData.city}</div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* نمایش کامبوباکس منطقه اگر وجود داشته باشد */}
// //                 {regions.length > 0 && (
// //                   <div className="form-row">
// //                     <div className="input-group full-width">
// //                       <label>منطقه *</label>
// //                       <select 
// //                         name="region" 
// //                         value={selectedRegionId || ''} 
// //                         onChange={handleRegionChange} 
// //                         disabled={loading || regions.length === 0}
// //                       >
// //                         <option value="">انتخاب منطقه</option>
// //                         {regions.map(r => (
// //                           <option key={r.id} value={r.id}>
// //                             {r.name}
// //                           </option>
// //                         ))}
// //                       </select>
// //                       {selectedRegionId && formData.region && (
// //                         <div className="selected-value">✅ {formData.region}</div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* نمایش آدرس کامل تولید شده */}
// //                 {getDisplayAddress() && (
// //                   <div className="address-preview">
// //                     <span className="address-label">📍 آدرس کامل:</span>
// //                     <span className="address-value">{getDisplayAddress()}</span>
// //                   </div>
// //                 )}

// //                 <div className="input-group full-width">
// //                   <label>آدرس دفتر *</label>
// //                   <input 
// //                     type="text" 
// //                     name="officeAddress" 
// //                     value={formData.officeAddress} 
// //                     onChange={handleChange} 
// //                     placeholder="آدرس کامل دفتر (به صورت دستی هم می‌توانید ویرایش کنید)" 
// //                     disabled={loading}
// //                   />
// //                   <small className="address-hint">💡 می‌توانید آدرس را به صورت دستی ویرایش کنید</small>
// //                 </div>

// //                 <div className="form-row">
// //                   <div className="input-group">
// //                     <label>شماره پروانه *</label>
// //                     <input 
// //                       type="text" 
// //                       name="licenseNumber" 
// //                       value={formData.licenseNumber} 
// //                       onChange={handleChange} 
// //                       placeholder="شماره پروانه" 
// //                       disabled={loading}
// //                     />
// //                   </div>
// //                   <div className="input-group">
// //                     <label>تاریخ اعتبار پروانه *</label>
// //                     <input 
// //                       type="date" 
// //                       name="licenseExpiryDate" 
// //                       value={formData.licenseExpiryDate} 
// //                       onChange={handleChange} 
// //                       disabled={loading}
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* بخش 3: موقعیت روی نقشه */}
// //               <div className="form-section" data-section="location">
// //                 <div className="section-title">
// //                   <span>🗺️</span> موقعیت دفتر روی نقشه
// //                 </div>
// //                 <div className="search-box">
// //                   <input 
// //                     type="text" 
// //                     value={searchAddress} 
// //                     onChange={(e) => setSearchAddress(e.target.value)} 
// //                     placeholder="جستجوی آدرس روی نقشه..." 
// //                     onKeyPress={(e) => e.key === 'Enter' && searchAddressHandler()} 
// //                   />
// //                   <button type="button" onClick={searchAddressHandler} disabled={searching}>
// //                     {searching ? 'جستجو...' : '🔍 جستجو'}
// //                   </button>
// //                 </div>

// //                 <div className="map-wrapper">
// //                   {renderMap()}
// //                   <div className="map-marker">📍</div>
// //                 </div>
                
// //                 {locationSelected && (
// //                   <div className="location-success">
// //                     ✓ موقعیت ثبت شد | {formData.lat.toFixed(5)} , {formData.lng.toFixed(5)}
// //                   </div>
// //                 )}
// //               </div>

// //               {/* بخش 4: آپلود مدارک */}
// //               <div className="form-section" data-section="documents">
// //                 <div className="section-title">
// //                   <span>📎</span> آپلود مدارک
// //                 </div>
// //                 <div className="upload-row">
// //                   <div className="upload-box" onClick={() => nationalCardRef.current?.click()}>
// //                     <input type="file" ref={nationalCardRef} onChange={(e) => handleImageChange(e, 'national')} accept="image/*" hidden />
// //                     {nationalCardPreview ? (
// //                       <div className="preview">
// //                         <img src={nationalCardPreview} alt="کارت ملی" />
// //                         <button type="button" className="remove-btn" onClick={(e) => { e.stopPropagation(); setNationalCardPreview(null); setFormData(prev => ({ ...prev, nationalCardImage: null })); }}>
// //                           ✗
// //                         </button>
// //                       </div>
// //                     ) : (
// //                       <>
// //                         <div className="upload-icon">🪪</div>
// //                         <p>تصویر کارت ملی</p>
// //                         <small>jpg, png (حداکثر 2MB)</small>
// //                       </>
// //                     )}
// //                   </div>
// //                   <div className="upload-box" onClick={() => licenseRef.current?.click()}>
// //                     <input type="file" ref={licenseRef} onChange={(e) => handleImageChange(e, 'license')} accept="image/*" hidden />
// //                     {licensePreview ? (
// //                       <div className="preview">
// //                         <img src={licensePreview} alt="پروانه" />
// //                         <button type="button" className="remove-btn" onClick={(e) => { e.stopPropagation(); setLicensePreview(null); setFormData(prev => ({ ...prev, licenseImage: null })); }}>
// //                           ✗
// //                         </button>
// //                       </div>
// //                     ) : (
// //                       <>
// //                         <div className="upload-icon">📄</div>
// //                         <p>تصویر پروانه کسب</p>
// //                         <small>jpg, png (حداکثر 2MB)</small>
// //                       </>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>

// //               <label className="checkbox">
// //                 <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
// //                 <span className="checkmark"></span>
// //                 قوانین و مقررات سایت اوتاپ را مطالعه کرده و می‌پذیرم
// //               </label>

// //               <button type="submit" disabled={loading} className="submit-btn">
// //                 {loading ? (
// //                   <>
// //                     <span className="spinner"></span>
// //                     در حال ثبت نام...
// //                   </>
// //                 ) : (
// //                   <>🏢 ثبت نام آژانس</>
// //                 )}
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RegisterAgency;

// // RegisterAgency.jsx - با آیکون‌های چشم برای نمایش/مخفی کردن رمز عبور
// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './RegisterAgency.css';

// // تابع تبدیل مختصات
// const wgs84ToWebMercator = (lng, lat) => {
//   const R = 6378137;
//   return {
//     x: lng * (Math.PI * R) / 180,
//     y: Math.log(Math.tan((90 + lat) * Math.PI / 360)) * R
//   };
// };

// const webMercatorToWgs84 = (x, y) => {
//   const R = 6378137;
//   return {
//     lat: (2 * Math.atan(Math.exp(y / R)) - Math.PI / 2) * 180 / Math.PI,
//     lng: (x * 180) / (Math.PI * R)
//   };
// };

// // ===== آیکون‌های چشم =====
// const EyeIcon = ({ isOpen }) => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     {isOpen ? (
//       <>
//         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//         <circle cx="12" cy="12" r="3" />
//       </>
//     ) : (
//       <>
//         <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
//         <line x1="1" y1="1" x2="23" y2="23" />
//       </>
//     )}
//   </svg>
// );

// const RegisterAgency = () => {
//   const mapRef = useRef(null);
//   const [mapKey] = useState("web.31c5ea6c425e40cc9b30620a84a8be90");
//   const [mapLoaded, setMapLoaded] = useState(false);
  
//   const [formData, setFormData] = useState({
//     fullName: '', mobile: '', password: '', confirmPassword: '',
//     nationalCode: '', agentCode: '', province: '', city: '', region: '',
//     officeAddress: '', licenseNumber: '', licenseExpiryDate: '',
//     nationalCardImage: null, licenseImage: null,
//     lat: 35.699739, lng: 51.338097
//   });
  
//   const [loading, setLoading] = useState(false);
//   const [acceptTerms, setAcceptTerms] = useState(false);
//   const [nationalCardPreview, setNationalCardPreview] = useState(null);
//   const [licensePreview, setLicensePreview] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [locationSelected, setLocationSelected] = useState(false);
//   const [mapCenter, setMapCenter] = useState({ lat: 35.699739, lng: 51.338097 });
//   const [searchAddress, setSearchAddress] = useState('');
//   const [searching, setSearching] = useState(false);
//   const [activeSection, setActiveSection] = useState('personal');
  
//   // ===== State های داینامیک برای استان/شهر/منطقه =====
//   const [provinces, setProvinces] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [regions, setRegions] = useState([]);
//   const [loadingRegions, setLoadingRegions] = useState(false);
//   const [selectedProvinceId, setSelectedProvinceId] = useState(null);
//   const [selectedCityId, setSelectedCityId] = useState(null);
//   const [selectedRegionId, setSelectedRegionId] = useState(null);
  
//   const nationalCardRef = useRef(null);
//   const licenseRef = useRef(null);
//   const navigate = useNavigate();

//   const benefits = [
//     { icon: '🏆', title: 'اعتبار برند اوتاپ', desc: 'برخورداری از اعتبار و جایگاه برند معتبر', color: '#7d0000' },
//     { icon: '⚡', title: 'ثبت سریع و آسان ملک', desc: 'ثبت آگهی در کمترین زمان ممکن', color: '#d4af37' },
//     { icon: '🎨', title: 'پنل مشاوری حرفه‌ای', desc: 'پنل اختصاصی با طراحی مدرن و کاربری آسان', color: '#7d0000' },
//     { icon: '💰', title: 'کیف پول و شارژ هدیه', desc: 'امکان برخورداری از کیف پول و دریافت شارژ هدیه', color: '#d4af37' },
//     { icon: '📈', title: 'امکانات ارتقاء آگهی', desc: 'به روزرسانی، ویترین، بسته افزایش بازدید', color: '#7d0000' },
//     { icon: '📊', title: 'آمار بازدید و تماس', desc: 'مشاهده آمار دقیق بازدید و تماس هر آگهی', color: '#d4af37' }
//   ];

//   // ===== دریافت استان‌ها =====
//   useEffect(() => {
//     const fetchProvinces = async () => {
//       try {
//         const response = await fetch('https://localhost:7178/api/RealEstatePage/GetRegions');
//         const result = await response.json();
        
//         if (result.status === 200 && result.data) {
//           setProvinces(result.data);
//         } else {
//           console.warn('⚠️ خطا در دریافت استان‌ها');
//         }
//       } catch (error) {
//         console.error('❌ خطا در دریافت استان‌ها:', error);
//       }
//     };

//     fetchProvinces();
//   }, []);

//   // ===== دریافت شهرها هنگام انتخاب استان =====
//   useEffect(() => {
//     const fetchCities = async () => {
//       if (!selectedProvinceId) {
//         setCities([]);
//         return;
//       }

//       setLoadingRegions(true);
//       try {
//         const response = await fetch(
//           `https://localhost:7178/api/RealEstatePage/GetRegionsWithChildFlagAsync?id=${selectedProvinceId}`
//         );
//         const result = await response.json();
        
//         if (result.status === 200 && result.data) {
//           setCities(result.data);
//           setFormData(prev => ({ ...prev, city: '', region: '' }));
//           setSelectedCityId(null);
//           setSelectedRegionId(null);
//           setRegions([]);
//         } else {
//           setCities([]);
//         }
//       } catch (error) {
//         console.error('❌ خطا در دریافت شهرها:', error);
//         setCities([]);
//       } finally {
//         setLoadingRegions(false);
//       }
//     };

//     fetchCities();
//   }, [selectedProvinceId]);

//   // ===== دریافت مناطق هنگام انتخاب شهر =====
//   useEffect(() => {
//     const fetchRegions = async () => {
//       if (!selectedCityId) {
//         setRegions([]);
//         setSelectedRegionId(null);
//         return;
//       }

//       setLoadingRegions(true);
//       try {
//         const response = await fetch(
//           `https://localhost:7178/api/RealEstatePage/GetRegionsWithChildFlagAsync?id=${selectedCityId}`
//         );
//         const result = await response.json();
        
//         if (result.status === 200 && result.data) {
//           setRegions(result.data);
//           setFormData(prev => ({ ...prev, region: '' }));
//           setSelectedRegionId(null);
//         } else {
//           setRegions([]);
//         }
//       } catch (error) {
//         console.error('❌ خطا در دریافت مناطق:', error);
//         setRegions([]);
//       } finally {
//         setLoadingRegions(false);
//       }
//     };

//     fetchRegions();
//   }, [selectedCityId]);

//   // ===== تابع تولید آدرس کامل =====
//   const updateFullAddress = useCallback((cityName, regionName) => {
//     const province = formData.province || '';
//     const city = cityName || formData.city || '';
//     const region = regionName || formData.region || '';
    
//     let fullAddress = '';
    
//     if (province) fullAddress += province;
//     if (city) fullAddress += fullAddress ? ' - ' + city : city;
//     if (region) fullAddress += fullAddress ? ' - ' + region : region;
    
//     if (fullAddress) {
//       const isAutoGenerated = formData.officeAddress === '' || 
//                               formData.officeAddress === formData.province || 
//                               formData.officeAddress === `${formData.province} - ${formData.city}` ||
//                               formData.officeAddress === `${formData.province} - ${formData.city} - ${formData.region}` ||
//                               !formData.officeAddress.includes(province);
      
//       if (isAutoGenerated) {
//         setFormData(prev => ({ ...prev, officeAddress: fullAddress }));
//       }
//     }
//   }, [formData.province, formData.city, formData.region, formData.officeAddress]);

//   // ===== وقتی استان، شهر یا منطقه تغییر می‌کنه آدرس رو آپدیت کن =====
//   useEffect(() => {
//     if (formData.province || formData.city || formData.region) {
//       const province = formData.province || '';
//       const city = formData.city || '';
//       const region = formData.region || '';
      
//       let fullAddress = '';
      
//       if (province) fullAddress += province;
//       if (city) fullAddress += fullAddress ? ' - ' + city : city;
//       if (region) fullAddress += fullAddress ? ' - ' + region : region;
      
//       const isAutoGenerated = formData.officeAddress === '' || 
//                               formData.officeAddress === formData.province || 
//                               formData.officeAddress === `${formData.province} - ${formData.city}` ||
//                               formData.officeAddress === `${formData.province} - ${formData.city} - ${formData.region}` ||
//                               !formData.officeAddress.includes(province);
      
//       if (fullAddress && isAutoGenerated) {
//         setFormData(prev => ({ ...prev, officeAddress: fullAddress }));
//       }
//     }
//   }, [formData.province, formData.city, formData.region]);

//   // لود کردن اسکریپت نقشه
//   useEffect(() => {
//     const loadNeshanMap = () => {
//       return new Promise((resolve) => {
//         if (document.querySelector('script[src*="neshan"]')) {
//           resolve();
//           return;
//         }
//         const script = document.createElement('script');
//         script.src = 'https://static.neshan.org/api/openlayers/4.6.5/ol.js';
//         script.onload = () => {
//           const link = document.createElement('link');
//           link.rel = 'stylesheet';
//           link.href = 'https://static.neshan.org/api/openlayers/4.6.5/ol.css';
//           document.head.appendChild(link);
//           resolve();
//         };
//         document.head.appendChild(script);
//       });
//     };

//     loadNeshanMap().then(() => {
//       setMapLoaded(true);
//     });
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('visible');
//         }
//       });
//     }, { threshold: 0.1 });

//     document.querySelectorAll('.form-section, .benefit-item, .upload-box').forEach(el => {
//       observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, []);

//   const validateNationalCode = (code) => {
//     if (!/^\d{10}$/.test(code)) return false;
//     const check = parseInt(code[9], 10);
//     let sum = 0;
//     for (let i = 0; i < 9; i++) sum += parseInt(code[i], 10) * (10 - i);
//     const remainder = sum % 11;
//     if (remainder < 2) return check === remainder;
//     return check === (11 - remainder);
//   };

//   const validateMobile = (mobile) => /^09[0-9]{9}$/.test(mobile);

//   const updateLocation = useCallback((lat, lng) => {
//     setFormData(prev => ({ ...prev, lat, lng }));
//     setMapCenter({ lat, lng });
//     setLocationSelected(true);
    
//     if (mapRef.current && mapRef.current.getView) {
//       try {
//         const view = mapRef.current.getView();
//         const coords = wgs84ToWebMercator(lng, lat);
//         view.setCenter([coords.x, coords.y]);
//         view.setZoom(17);
//       } catch (error) {
//         console.error('خطا در به‌روزرسانی نقشه:', error);
//       }
//     }
//   }, []);

//   const reverseGeocode = useCallback(async (lat, lng) => {
//     try {
//       const response = await fetch(`https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`, {
//         headers: { 'Api-Key': mapKey }
//       });
//       const data = await response.json();
//       if (data?.formatted_address) {
//         if (!formData.officeAddress || formData.officeAddress === '' || 
//             formData.officeAddress === formData.province || 
//             formData.officeAddress === `${formData.province} - ${formData.city}` ||
//             formData.officeAddress === `${formData.province} - ${formData.city} - ${formData.region}`) {
//           setFormData(prev => ({ ...prev, officeAddress: data.formatted_address }));
//         }
//       }
//     } catch (error) {
//       console.error('خطا در تبدیل معکوس:', error);
//     }
//   }, [mapKey, formData.officeAddress, formData.province, formData.city, formData.region]);

//   const searchAddressHandler = useCallback(async () => {
//     if (!searchAddress.trim()) {
//       toast.warning('لطفاً آدرس را وارد کنید');
//       return;
//     }
    
//     setSearching(true);
//     try {
//       const response = await fetch(
//         `https://api.neshan.org/v4/search?term=${encodeURIComponent(searchAddress)}&lat=${mapCenter.lat}&lng=${mapCenter.lng}`,
//         { headers: { 'Api-Key': mapKey } }
//       );
//       const data = await response.json();
      
//       if (data.items?.length > 0) {
//         const item = data.items[0];
//         updateLocation(item.location.y, item.location.x);
//         setFormData(prev => ({ ...prev, officeAddress: item.title }));
//         reverseGeocode(item.location.y, item.location.x);
//         toast.success('موقعیت پیدا شد');
//       } else {
//         toast.error('آدرس یافت نشد');
//       }
//     } catch (error) {
//       toast.error('خطا در جستجو');
//     } finally {
//       setSearching(false);
//     }
//   }, [searchAddress, mapCenter, mapKey, updateLocation, reverseGeocode]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === 'nationalCode' || name === 'mobile' || name === 'agentCode') {
//       const numericValue = value.replace(/[^0-9]/g, '');
//       const maxLen = name === 'nationalCode' ? 10 : name === 'mobile' ? 11 : 20;
//       if (numericValue.length <= maxLen) {
//         setFormData(prev => ({ ...prev, [name]: numericValue }));
//       }
//     } else if (name === 'officeAddress') {
//       setFormData(prev => ({ ...prev, officeAddress: value }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleProvinceChange = (e) => {
//     const value = e.target.value;
//     const selected = provinces.find(p => p.id === parseInt(value));
    
//     if (selected) {
//       setSelectedProvinceId(selected.id);
//       setFormData(prev => ({ 
//         ...prev, 
//         province: selected.name,
//         city: '',
//         region: ''
//       }));
//       setSelectedCityId(null);
//       setSelectedRegionId(null);
//       setRegions([]);
//     }
//   };

//   const handleCityChange = (e) => {
//     const value = e.target.value;
//     const selected = cities.find(c => c.id === parseInt(value));
    
//     if (selected) {
//       setSelectedCityId(selected.id);
//       setFormData(prev => ({ 
//         ...prev, 
//         city: selected.name,
//         region: ''
//       }));
//       setSelectedRegionId(null);
//       setRegions([]);
//     }
//   };

//   const handleRegionChange = (e) => {
//     const value = e.target.value;
//     const selected = regions.find(r => r.id === parseInt(value));
    
//     if (selected) {
//       setSelectedRegionId(selected.id);
//       setFormData(prev => ({ ...prev, region: selected.name }));
//     }
//   };

//   const handleImageChange = (e, type) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.type.match('image.*')) {
//         toast.error('فایل باید تصویر باشد');
//         return;
//       }
//       if (file.size > 2 * 1024 * 1024) {
//         toast.error('حجم تصویر حداکثر 2 مگابایت');
//         return;
//       }
      
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (type === 'national') {
//           setNationalCardPreview(reader.result);
//           setFormData(prev => ({ ...prev, nationalCardImage: file }));
//         } else {
//           setLicensePreview(reader.result);
//           setFormData(prev => ({ ...prev, licenseImage: file }));
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.fullName.trim()) return toast.error('نام و نام خانوادگی را وارد کنید');
//     if (!validateMobile(formData.mobile)) return toast.error('شماره موبایل نامعتبر است');
//     if (formData.password.length < 6) return toast.error('رمز عبور حداقل 6 کاراکتر باشد');
//     if (formData.password !== formData.confirmPassword) return toast.error('رمز عبور مطابقت ندارد');
//     if (!validateNationalCode(formData.nationalCode)) return toast.error('کد ملی نامعتبر است');
//     if (!formData.agentCode) return toast.error('کد مشاور را وارد کنید');
//     if (!formData.province) return toast.error('استان را انتخاب کنید');
//     if (!formData.city) return toast.error('شهر را انتخاب کنید');
//     if (!formData.officeAddress) return toast.error('آدرس دفتر را وارد کنید');
//     if (!formData.licenseNumber) return toast.error('شماره پروانه را وارد کنید');
//     if (!formData.licenseExpiryDate) return toast.error('تاریخ اعتبار پروانه را وارد کنید');
//     if (!nationalCardPreview) return toast.error('تصویر کارت ملی را آپلود کنید');
//     if (!licensePreview) return toast.error('تصویر پروانه را آپلود کنید');
//     if (!locationSelected) return toast.error('موقعیت دفتر را روی نقشه انتخاب کنید');
//     if (!acceptTerms) return toast.error('قوانین را بپذیرید');
    
//     setLoading(true);
//     const submitData = new FormData();
//     Object.keys(formData).forEach(key => {
//       if (formData[key] !== null && key !== 'confirmPassword') {
//         submitData.append(key, formData[key]);
//       }
//     });
//     submitData.append('userType', 'agency');
    
//     try {
//       const response = await fetch('https://localhost:7178/api/auth/register-agency', {
//         method: 'POST',
//         body: submitData,
//       });
//       const data = await response.json();
      
//       if (response.ok && data.success) {
//         toast.success('اطلاعات با موفقیت ثبت شد');
//         localStorage.setItem('userType', 'agency');
//         setTimeout(() => navigate('/register/verify', { 
//           state: { mobile: formData.mobile, userType: 'agency', fullName: formData.fullName } 
//         }), 2000);
//       } else {
//         toast.error(data.message || 'خطا در ثبت نام');
//       }
//     } catch (error) {
//       toast.error('خطا در ارتباط با سرور');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => navigate('/register');

//   const scrollToSection = (section) => {
//     setActiveSection(section);
//     const element = document.querySelector(`[data-section="${section}"]`);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   };

//   const renderMap = () => {
//     if (!mapLoaded) {
//       return (
//         <div className="map-loading">
//           <div className="loading-spinner"></div>
//           <p>در حال بارگذاری نقشه...</p>
//         </div>
//       );
//     }

//     if (typeof window.ol === 'undefined') {
//       return (
//         <div className="map-loading">
//           <p>در حال بارگذاری نقشه...</p>
//         </div>
//       );
//     }

//     return (
//       <div id="neshan-map" className="neshan-map-container"></div>
//     );
//   };

//   useEffect(() => {
//     if (mapLoaded && typeof window.ol !== 'undefined' && !mapRef.current) {
//       const center = wgs84ToWebMercator(mapCenter.lng, mapCenter.lat);
      
//       const map = new window.ol.Map({
//         target: 'neshan-map',
//         view: new window.ol.View({
//           center: [center.x, center.y],
//           zoom: 14,
//         }),
//         layers: [
//           new window.ol.layer.Tile({
//             source: new window.ol.source.XYZ({
//               url: `https://api.neshan.org/maps/neshan/v1/dreamy/{z}/{x}/{y}.png?key=${mapKey}`,
//               attributions: '© نقشه‌ نشان',
//             }),
//           }),
//         ],
//       });
      
//       mapRef.current = map;
      
//       map.on('click', (e) => {
//         if (loading) return;
//         const wgs84 = webMercatorToWgs84(e.coordinate[0], e.coordinate[1]);
//         updateLocation(wgs84.lat, wgs84.lng);
//         reverseGeocode(wgs84.lat, wgs84.lng);
//         toast.success('موقعیت ثبت شد');
//       });
//     }
//   }, [mapLoaded, mapCenter, mapKey, updateLocation, reverseGeocode, loading]);

//   const getDisplayAddress = () => {
//     const parts = [];
//     if (formData.province) parts.push(formData.province);
//     if (formData.city) parts.push(formData.city);
//     if (formData.region) parts.push(formData.region);
//     return parts.join(' - ');
//   };

//   return (
//     <div className="agency-register">
//       <ToastContainer position="top-center" rtl={true} />
      
//       <div className="particles">
//         {[...Array(12)].map((_, i) => (
//           <div key={i} className="particle" style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             animationDelay: `${Math.random() * 15}s`,
//             animationDuration: `${10 + Math.random() * 10}s`,
//           }}></div>
//         ))}
//       </div>

//       <div className="register-container">
//         {/* سایدبار راست - توضیحات و مزایا */}
//         <div className="register-sidebar">
//           <div className="sidebar-content">
//             <div className="sidebar-header">
//               <div className="sidebar-icon">
//                 <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
//                   <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   <path d="M5 10.5V16.5L12 21L19 16.5V10.5" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   <path d="M12 15V21" stroke="#d4af37" strokeWidth="2" strokeLinecap="round"/>
//                 </svg>
//               </div>
//               <h2>عضویت آژانس املاک</h2>
//               <p>اگر آژانس شما دارای جواز کسب معتبر است، برای عضویت لطفا فرم مقابل را تکمیل نمائید.</p>
//             </div>

//             <div className="benefits-box">
//               <h3>
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//                   <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" fill="#d4af37" stroke="#d4af37" strokeWidth="1.5"/>
//                 </svg>
//                 مزایا همکاری با اوتاپ
//               </h3>
//               <div className="benefits-list">
//                 {benefits.map((b, i) => (
//                   <div key={i} className="benefit-item" style={{ transitionDelay: `${i * 0.1}s` }}>
//                     <span className="benefit-icon">{b.icon}</span>
//                     <div>
//                       <strong style={{ color: b.color }}>{b.title}</strong>
//                       <p>{b.desc}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="info-box">
//               <div className="info-icon">
//                 <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
//                   <path d="M12 8V12L15 15M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#d4af37" strokeWidth="2" strokeLinecap="round"/>
//                 </svg>
//               </div>
//               <h4>توجه مهم</h4>
//               <ul>
//                 <li>پس از تایید جواز کسب و اطلاعات ثبت شده، پنلی اختصاصی برای آژانس شما ایجاد می‌شود</li>
//                 <li>اطلاعات کاربری از طریق پیامک ارسال خواهد شد</li>
//                 <li>می‌توانید مشاوران خود را به پنل اضافه کنید</li>
//                 <li>آگهی‌ها با نام و لوگوی آژانس شما نمایش داده می‌شود</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* فرم اصلی سمت چپ */}
//         <div className="register-form-wrapper">
//           <div className="register-form">
//             <button className="back-btn" onClick={handleBack}>
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M19 12H5M12 19L5 12L12 5" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//               بازگشت
//             </button>

//             {/* پروگرس استپ */}
//             <div className="form-progress">
//               {['personal', 'agency', 'documents'].map((section, idx) => (
//                 <div 
//                   key={section} 
//                   className={`progress-step ${activeSection === section ? 'active' : ''}`}
//                   onClick={() => scrollToSection(section)}
//                 >
//                   <div className="step-number">{idx + 1}</div>
//                   <div className="step-label">
//                     {section === 'personal' && 'اطلاعات شخصی'}
//                     {section === 'agency' && 'اطلاعات آژانس'}
//                     {section === 'documents' && 'مدارک'}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <form onSubmit={handleSubmit}>
//               {/* بخش 1: اطلاعات شخصی */}
//               <div className="form-section" data-section="personal">
//                 <div className="section-title">
//                   <span>👤</span> اطلاعات شخصی
//                 </div>
//                 <div className="form-row">
//                   <div className="input-group">
//                     <label>نام و نام خانوادگی *</label>
//                     <input 
//                       type="text" 
//                       name="fullName" 
//                       value={formData.fullName} 
//                       onChange={handleChange} 
//                       placeholder="علی محمدی" 
//                       disabled={loading}
//                     />
//                   </div>
//                   <div className="input-group">
//                     <label>شماره موبایل *</label>
//                     <input 
//                       type="tel" 
//                       name="mobile" 
//                       value={formData.mobile} 
//                       onChange={handleChange} 
//                       placeholder="09123456789" 
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="input-group">
//                     <label>رمز عبور *</label>
//                     <div className="password-box">
//                       <input 
//                         type={showPassword ? "text" : "password"} 
//                         name="password" 
//                         value={formData.password} 
//                         onChange={handleChange} 
//                         placeholder="حداقل 6 کاراکتر" 
//                         disabled={loading}
//                       />
//                       <button 
//                         type="button" 
//                         className="eye-btn" 
//                         onClick={() => setShowPassword(!showPassword)}
//                         aria-label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
//                       >
//                         <EyeIcon isOpen={showPassword} />
//                       </button>
//                     </div>
//                   </div>
//                   <div className="input-group">
//                     <label>تکرار رمز عبور *</label>
//                     <div className="password-box">
//                       <input 
//                         type={showConfirmPassword ? "text" : "password"} 
//                         name="confirmPassword" 
//                         value={formData.confirmPassword} 
//                         onChange={handleChange} 
//                         placeholder="تکرار رمز عبور" 
//                         disabled={loading}
//                       />
//                       <button 
//                         type="button" 
//                         className="eye-btn" 
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         aria-label={showConfirmPassword ? "مخفی کردن تکرار رمز عبور" : "نمایش تکرار رمز عبور"}
//                       >
//                         <EyeIcon isOpen={showConfirmPassword} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 {formData.confirmPassword && formData.password !== formData.confirmPassword && (
//                   <div className="error-msg">
//                     ❌ رمز عبور مطابقت ندارد
//                   </div>
//                 )}

//                 <div className="form-row">
//                   <div className="input-group">
//                     <label>کد ملی *</label>
//                     <input 
//                       type="text" 
//                       name="nationalCode" 
//                       value={formData.nationalCode} 
//                       onChange={handleChange} 
//                       maxLength="10" 
//                       placeholder="1234567890" 
//                       disabled={loading}
//                     />
//                   </div>
//                   <div className="input-group">
//                     <label>کد مشاور املاک *</label>
//                     <input 
//                       type="text" 
//                       name="agentCode" 
//                       value={formData.agentCode} 
//                       onChange={handleChange} 
//                       placeholder="کد مشاور" 
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* بخش 2: اطلاعات آژانس */}
//               <div className="form-section" data-section="agency">
//                 <div className="section-title">
//                   <span>🏛️</span> اطلاعات آژانس و مجوزها
//                 </div>
//                 <div className="form-row">
//                   <div className="input-group">
//                     <label>استان *</label>
//                     <select 
//                       name="province" 
//                       value={selectedProvinceId || ''} 
//                       onChange={handleProvinceChange} 
//                       disabled={loading || provinces.length === 0}
//                     >
//                       <option value="">انتخاب استان</option>
//                       {provinces.map(p => (
//                         <option key={p.id} value={p.id}>
//                           {p.name}
//                         </option>
//                       ))}
//                     </select>
//                     {selectedProvinceId && formData.province && (
//                       <div className="selected-value">✅ {formData.province}</div>
//                     )}
//                   </div>
//                   <div className="input-group">
//                     <label>شهر *</label>
//                     <select 
//                       name="city" 
//                       value={selectedCityId || ''} 
//                       onChange={handleCityChange} 
//                       disabled={loading || cities.length === 0 || loadingRegions}
//                     >
//                       <option value="">انتخاب شهر</option>
//                       {cities.map(c => (
//                         <option key={c.id} value={c.id}>
//                           {c.name}
//                         </option>
//                       ))}
//                     </select>
//                     {loadingRegions && <div className="loading-text">در حال بارگذاری...</div>}
//                     {selectedCityId && formData.city && (
//                       <div className="selected-value">✅ {formData.city}</div>
//                     )}
//                   </div>
//                 </div>

//                 {regions.length > 0 && (
//                   <div className="form-row">
//                     <div className="input-group full-width">
//                       <label>منطقه *</label>
//                       <select 
//                         name="region" 
//                         value={selectedRegionId || ''} 
//                         onChange={handleRegionChange} 
//                         disabled={loading || regions.length === 0}
//                       >
//                         <option value="">انتخاب منطقه</option>
//                         {regions.map(r => (
//                           <option key={r.id} value={r.id}>
//                             {r.name}
//                           </option>
//                         ))}
//                       </select>
//                       {selectedRegionId && formData.region && (
//                         <div className="selected-value">✅ {formData.region}</div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {getDisplayAddress() && (
//                   <div className="address-preview">
//                     <span className="address-label">📍 آدرس کامل:</span>
//                     <span className="address-value">{getDisplayAddress()}</span>
//                   </div>
//                 )}

//                 <div className="input-group full-width">
//                   <label>آدرس دفتر *</label>
//                   <input 
//                     type="text" 
//                     name="officeAddress" 
//                     value={formData.officeAddress} 
//                     onChange={handleChange} 
//                     placeholder="آدرس کامل دفتر (به صورت دستی هم می‌توانید ویرایش کنید)" 
//                     disabled={loading}
//                   />
//                   <small className="address-hint">💡 می‌توانید آدرس را به صورت دستی ویرایش کنید</small>
//                 </div>

//                 <div className="form-row">
//                   <div className="input-group">
//                     <label>شماره پروانه *</label>
//                     <input 
//                       type="text" 
//                       name="licenseNumber" 
//                       value={formData.licenseNumber} 
//                       onChange={handleChange} 
//                       placeholder="شماره پروانه" 
//                       disabled={loading}
//                     />
//                   </div>
//                   <div className="input-group">
//                     <label>تاریخ اعتبار پروانه *</label>
//                     <input 
//                       type="date" 
//                       name="licenseExpiryDate" 
//                       value={formData.licenseExpiryDate} 
//                       onChange={handleChange} 
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* بخش 3: موقعیت روی نقشه */}
//               <div className="form-section" data-section="location">
//                 <div className="section-title">
//                   <span>🗺️</span> موقعیت دفتر روی نقشه
//                 </div>
//                 <div className="search-box">
//                   <input 
//                     type="text" 
//                     value={searchAddress} 
//                     onChange={(e) => setSearchAddress(e.target.value)} 
//                     placeholder="جستجوی آدرس روی نقشه..." 
//                     onKeyPress={(e) => e.key === 'Enter' && searchAddressHandler()} 
//                   />
//                   <button type="button" onClick={searchAddressHandler} disabled={searching}>
//                     {searching ? 'جستجو...' : '🔍 جستجو'}
//                   </button>
//                 </div>

//                 <div className="map-wrapper">
//                   {renderMap()}
//                   <div className="map-marker">📍</div>
//                 </div>
                
//                 {locationSelected && (
//                   <div className="location-success">
//                     ✓ موقعیت ثبت شد | {formData.lat.toFixed(5)} , {formData.lng.toFixed(5)}
//                   </div>
//                 )}
//               </div>

//               {/* بخش 4: آپلود مدارک */}
//               <div className="form-section" data-section="documents">
//                 <div className="section-title">
//                   <span>📎</span> آپلود مدارک
//                 </div>
//                 <div className="upload-row">
//                   <div className="upload-box" onClick={() => nationalCardRef.current?.click()}>
//                     <input type="file" ref={nationalCardRef} onChange={(e) => handleImageChange(e, 'national')} accept="image/*" hidden />
//                     {nationalCardPreview ? (
//                       <div className="preview">
//                         <img src={nationalCardPreview} alt="کارت ملی" />
//                         <button type="button" className="remove-btn" onClick={(e) => { e.stopPropagation(); setNationalCardPreview(null); setFormData(prev => ({ ...prev, nationalCardImage: null })); }}>
//                           ✗
//                         </button>
//                       </div>
//                     ) : (
//                       <>
//                         <div className="upload-icon">🪪</div>
//                         <p>تصویر کارت ملی</p>
//                         <small>jpg, png (حداکثر 2MB)</small>
//                       </>
//                     )}
//                   </div>
//                   <div className="upload-box" onClick={() => licenseRef.current?.click()}>
//                     <input type="file" ref={licenseRef} onChange={(e) => handleImageChange(e, 'license')} accept="image/*" hidden />
//                     {licensePreview ? (
//                       <div className="preview">
//                         <img src={licensePreview} alt="پروانه" />
//                         <button type="button" className="remove-btn" onClick={(e) => { e.stopPropagation(); setLicensePreview(null); setFormData(prev => ({ ...prev, licenseImage: null })); }}>
//                           ✗
//                         </button>
//                       </div>
//                     ) : (
//                       <>
//                         <div className="upload-icon">📄</div>
//                         <p>تصویر پروانه کسب</p>
//                         <small>jpg, png (حداکثر 2MB)</small>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <label className="checkbox">
//                 <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
//                 <span className="checkmark"></span>
//                 قوانین و مقررات سایت اوتاپ را مطالعه کرده و می‌پذیرم
//               </label>

//               <button type="submit" disabled={loading} className="submit-btn">
//                 {loading ? (
//                   <>
//                     <span className="spinner"></span>
//                     در حال ثبت نام...
//                   </>
//                 ) : (
//                   <>🏢 ثبت نام آژانس</>
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterAgency;

// RegisterAgency.jsx - نسخه کامل با نقشه اصلاح شده
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterAgency.css';

// تابع تبدیل مختصات
const wgs84ToWebMercator = (lng, lat) => {
  const R = 6378137;
  return {
    x: lng * (Math.PI * R) / 180,
    y: Math.log(Math.tan((90 + lat) * Math.PI / 360)) * R
  };
};

const webMercatorToWgs84 = (x, y) => {
  const R = 6378137;
  return {
    lat: (2 * Math.atan(Math.exp(y / R)) - Math.PI / 2) * 180 / Math.PI,
    lng: (x * 180) / (Math.PI * R)
  };
};

// ===== آیکون‌های چشم =====
const EyeIcon = ({ isOpen }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {isOpen ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

const RegisterAgency = () => {
  const mapRef = useRef(null);
  const [mapKey] = useState("web.31c5ea6c425e40cc9b30620a84a8be90");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [olLoaded, setOlLoaded] = useState(false); // ✅ State جدید برای OL
  
  const [formData, setFormData] = useState({
    fullName: '', mobile: '', password: '', confirmPassword: '',
    nationalCode: '', agentCode: '', province: '', city: '', region: '',
    officeAddress: '', licenseNumber: '', licenseExpiryDate: '',
    nationalCardImage: null, licenseImage: null,
    lat: 35.699739, lng: 51.338097
  });
  
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [nationalCardPreview, setNationalCardPreview] = useState(null);
  const [licensePreview, setLicensePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [locationSelected, setLocationSelected] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 35.699739, lng: 51.338097 });
  const [searchAddress, setSearchAddress] = useState('');
  const [searching, setSearching] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  
  // ===== State های داینامیک برای استان/شهر/منطقه =====
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loadingRegions, setLoadingRegions] = useState(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  
  const nationalCardRef = useRef(null);
  const licenseRef = useRef(null);
  const navigate = useNavigate();

  const benefits = [
    { icon: '🏆', title: 'اعتبار برند اوتاپ', desc: 'برخورداری از اعتبار و جایگاه برند معتبر', color: '#7d0000' },
    { icon: '⚡', title: 'ثبت سریع و آسان ملک', desc: 'ثبت آگهی در کمترین زمان ممکن', color: '#d4af37' },
    { icon: '🎨', title: 'پنل مشاوری حرفه‌ای', desc: 'پنل اختصاصی با طراحی مدرن و کاربری آسان', color: '#7d0000' },
    { icon: '💰', title: 'کیف پول و شارژ هدیه', desc: 'امکان برخورداری از کیف پول و دریافت شارژ هدیه', color: '#d4af37' },
    { icon: '📈', title: 'امکانات ارتقاء آگهی', desc: 'به روزرسانی، ویترین، بسته افزایش بازدید', color: '#7d0000' },
    { icon: '📊', title: 'آمار بازدید و تماس', desc: 'مشاهده آمار دقیق بازدید و تماس هر آگهی', color: '#d4af37' }
  ];

  // ===== لود کردن اسکریپت نقشه =====
  useEffect(() => {
    const loadNeshanMap = () => {
      return new Promise((resolve) => {
        // بررسی اینکه قبلاً لود نشده باشد
        if (document.querySelector('script[src*="neshan"]')) {
          // اگر قبلاً لود شده، بررسی کن که OL در دسترس است
          if (typeof window.ol !== 'undefined') {
            setOlLoaded(true);
            setMapLoaded(true);
          }
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://static.neshan.org/api/openlayers/4.6.5/ol.js';
        script.async = false; // ✅ اجرای همزمان برای اطمینان
        script.onload = () => {
          // اضافه کردن CSS
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://static.neshan.org/api/openlayers/4.6.5/ol.css';
          document.head.appendChild(link);
          
          // ✅ اطمینان از وجود window.ol
          const checkOl = () => {
            if (typeof window.ol !== 'undefined') {
              setOlLoaded(true);
              setMapLoaded(true);
              resolve();
            } else {
              // اگر هنوز undefined است، دوباره بررسی کن
              setTimeout(checkOl, 100);
            }
          };
          checkOl();
        };
        script.onerror = () => {
          console.error('❌ خطا در بارگذاری نقشه');
          resolve();
        };
        document.head.appendChild(script);
      });
    };

    loadNeshanMap();
  }, []);

  // ===== دریافت استان‌ها =====
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://localhost:7178/api/RealEstatePage/GetRegions');
        const result = await response.json();
        
        if (result.status === 200 && result.data) {
          setProvinces(result.data);
        } else {
          console.warn('⚠️ خطا در دریافت استان‌ها');
        }
      } catch (error) {
        console.error('❌ خطا در دریافت استان‌ها:', error);
      }
    };

    fetchProvinces();
  }, []);

  // ===== دریافت شهرها هنگام انتخاب استان =====
  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedProvinceId) {
        setCities([]);
        return;
      }

      setLoadingRegions(true);
      try {
        const response = await fetch(
          `https://localhost:7178/api/RealEstatePage/GetRegionsWithChildFlagAsync?id=${selectedProvinceId}`
        );
        const result = await response.json();
        
        if (result.status === 200 && result.data) {
          setCities(result.data);
          setFormData(prev => ({ ...prev, city: '', region: '' }));
          setSelectedCityId(null);
          setSelectedRegionId(null);
          setRegions([]);
        } else {
          setCities([]);
        }
      } catch (error) {
        console.error('❌ خطا در دریافت شهرها:', error);
        setCities([]);
      } finally {
        setLoadingRegions(false);
      }
    };

    fetchCities();
  }, [selectedProvinceId]);

  // ===== دریافت مناطق هنگام انتخاب شهر =====
  useEffect(() => {
    const fetchRegions = async () => {
      if (!selectedCityId) {
        setRegions([]);
        setSelectedRegionId(null);
        return;
      }

      setLoadingRegions(true);
      try {
        const response = await fetch(
          `https://localhost:7178/api/RealEstatePage/GetRegionsWithChildFlagAsync?id=${selectedCityId}`
        );
        const result = await response.json();
        
        if (result.status === 200 && result.data) {
          setRegions(result.data);
          setFormData(prev => ({ ...prev, region: '' }));
          setSelectedRegionId(null);
        } else {
          setRegions([]);
        }
      } catch (error) {
        console.error('❌ خطا در دریافت مناطق:', error);
        setRegions([]);
      } finally {
        setLoadingRegions(false);
      }
    };

    fetchRegions();
  }, [selectedCityId]);

  // ===== تابع تولید آدرس کامل =====
  const updateFullAddress = useCallback((cityName, regionName) => {
    const province = formData.province || '';
    const city = cityName || formData.city || '';
    const region = regionName || formData.region || '';
    
    let fullAddress = '';
    
    if (province) fullAddress += province;
    if (city) fullAddress += fullAddress ? ' - ' + city : city;
    if (region) fullAddress += fullAddress ? ' - ' + region : region;
    
    if (fullAddress) {
      const isAutoGenerated = formData.officeAddress === '' || 
                              formData.officeAddress === formData.province || 
                              formData.officeAddress === `${formData.province} - ${formData.city}` ||
                              formData.officeAddress === `${formData.province} - ${formData.city} - ${formData.region}` ||
                              !formData.officeAddress.includes(province);
      
      if (isAutoGenerated) {
        setFormData(prev => ({ ...prev, officeAddress: fullAddress }));
      }
    }
  }, [formData.province, formData.city, formData.region, formData.officeAddress]);

  // ===== وقتی استان، شهر یا منطقه تغییر می‌کنه آدرس رو آپدیت کن =====
  useEffect(() => {
    if (formData.province || formData.city || formData.region) {
      const province = formData.province || '';
      const city = formData.city || '';
      const region = formData.region || '';
      
      let fullAddress = '';
      
      if (province) fullAddress += province;
      if (city) fullAddress += fullAddress ? ' - ' + city : city;
      if (region) fullAddress += fullAddress ? ' - ' + region : region;
      
      const isAutoGenerated = formData.officeAddress === '' || 
                              formData.officeAddress === formData.province || 
                              formData.officeAddress === `${formData.province} - ${formData.city}` ||
                              formData.officeAddress === `${formData.province} - ${formData.city} - ${formData.region}` ||
                              !formData.officeAddress.includes(province);
      
      if (fullAddress && isAutoGenerated) {
        setFormData(prev => ({ ...prev, officeAddress: fullAddress }));
      }
    }
  }, [formData.province, formData.city, formData.region]);

  // ===== Intersection Observer برای انیمیشن =====
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.form-section, .benefit-item, .upload-box').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const validateNationalCode = (code) => {
    if (!/^\d{10}$/.test(code)) return false;
    const check = parseInt(code[9], 10);
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(code[i], 10) * (10 - i);
    const remainder = sum % 11;
    if (remainder < 2) return check === remainder;
    return check === (11 - remainder);
  };

  const validateMobile = (mobile) => /^09[0-9]{9}$/.test(mobile);

  const updateLocation = useCallback((lat, lng) => {
    setFormData(prev => ({ ...prev, lat, lng }));
    setMapCenter({ lat, lng });
    setLocationSelected(true);
    
    if (mapRef.current && mapRef.current.getView) {
      try {
        const view = mapRef.current.getView();
        const coords = wgs84ToWebMercator(lng, lat);
        view.setCenter([coords.x, coords.y]);
        view.setZoom(17);
      } catch (error) {
        console.error('خطا در به‌روزرسانی نقشه:', error);
      }
    }
  }, []);

  const reverseGeocode = useCallback(async (lat, lng) => {
    try {
      const response = await fetch(`https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`, {
        headers: { 'Api-Key': mapKey }
      });
      const data = await response.json();
      if (data?.formatted_address) {
        if (!formData.officeAddress || formData.officeAddress === '' || 
            formData.officeAddress === formData.province || 
            formData.officeAddress === `${formData.province} - ${formData.city}` ||
            formData.officeAddress === `${formData.province} - ${formData.city} - ${formData.region}`) {
          setFormData(prev => ({ ...prev, officeAddress: data.formatted_address }));
        }
      }
    } catch (error) {
      console.error('خطا در تبدیل معکوس:', error);
    }
  }, [mapKey, formData.officeAddress, formData.province, formData.city, formData.region]);

  const searchAddressHandler = useCallback(async () => {
    if (!searchAddress.trim()) {
      toast.warning('لطفاً آدرس را وارد کنید');
      return;
    }
    
    setSearching(true);
    try {
      const response = await fetch(
        `https://api.neshan.org/v4/search?term=${encodeURIComponent(searchAddress)}&lat=${mapCenter.lat}&lng=${mapCenter.lng}`,
        { headers: { 'Api-Key': mapKey } }
      );
      const data = await response.json();
      
      if (data.items?.length > 0) {
        const item = data.items[0];
        updateLocation(item.location.y, item.location.x);
        setFormData(prev => ({ ...prev, officeAddress: item.title }));
        reverseGeocode(item.location.y, item.location.x);
        toast.success('موقعیت پیدا شد');
      } else {
        toast.error('آدرس یافت نشد');
      }
    } catch (error) {
      toast.error('خطا در جستجو');
    } finally {
      setSearching(false);
    }
  }, [searchAddress, mapCenter, mapKey, updateLocation, reverseGeocode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'nationalCode' || name === 'mobile' || name === 'agentCode') {
      const numericValue = value.replace(/[^0-9]/g, '');
      const maxLen = name === 'nationalCode' ? 10 : name === 'mobile' ? 11 : 20;
      if (numericValue.length <= maxLen) {
        setFormData(prev => ({ ...prev, [name]: numericValue }));
      }
    } else if (name === 'officeAddress') {
      setFormData(prev => ({ ...prev, officeAddress: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleProvinceChange = (e) => {
    const value = e.target.value;
    const selected = provinces.find(p => p.id === parseInt(value));
    
    if (selected) {
      setSelectedProvinceId(selected.id);
      setFormData(prev => ({ 
        ...prev, 
        province: selected.name,
        city: '',
        region: ''
      }));
      setSelectedCityId(null);
      setSelectedRegionId(null);
      setRegions([]);
    }
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    const selected = cities.find(c => c.id === parseInt(value));
    
    if (selected) {
      setSelectedCityId(selected.id);
      setFormData(prev => ({ 
        ...prev, 
        city: selected.name,
        region: ''
      }));
      setSelectedRegionId(null);
      setRegions([]);
    }
  };

  const handleRegionChange = (e) => {
    const value = e.target.value;
    const selected = regions.find(r => r.id === parseInt(value));
    
    if (selected) {
      setSelectedRegionId(selected.id);
      setFormData(prev => ({ ...prev, region: selected.name }));
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        toast.error('فایل باید تصویر باشد');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error('حجم تصویر حداکثر 2 مگابایت');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'national') {
          setNationalCardPreview(reader.result);
          setFormData(prev => ({ ...prev, nationalCardImage: file }));
        } else {
          setLicensePreview(reader.result);
          setFormData(prev => ({ ...prev, licenseImage: file }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName.trim()) return toast.error('نام و نام خانوادگی را وارد کنید');
    if (!validateMobile(formData.mobile)) return toast.error('شماره موبایل نامعتبر است');
    if (formData.password.length < 6) return toast.error('رمز عبور حداقل 6 کاراکتر باشد');
    if (formData.password !== formData.confirmPassword) return toast.error('رمز عبور مطابقت ندارد');
    if (!validateNationalCode(formData.nationalCode)) return toast.error('کد ملی نامعتبر است');
    if (!formData.agentCode) return toast.error('کد مشاور را وارد کنید');
    if (!formData.province) return toast.error('استان را انتخاب کنید');
    if (!formData.city) return toast.error('شهر را انتخاب کنید');
    if (!formData.officeAddress) return toast.error('آدرس دفتر را وارد کنید');
    if (!formData.licenseNumber) return toast.error('شماره پروانه را وارد کنید');
    if (!formData.licenseExpiryDate) return toast.error('تاریخ اعتبار پروانه را وارد کنید');
    if (!nationalCardPreview) return toast.error('تصویر کارت ملی را آپلود کنید');
    if (!licensePreview) return toast.error('تصویر پروانه را آپلود کنید');
    if (!locationSelected) return toast.error('موقعیت دفتر را روی نقشه انتخاب کنید');
    if (!acceptTerms) return toast.error('قوانین را بپذیرید');
    
    setLoading(true);
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && key !== 'confirmPassword') {
        submitData.append(key, formData[key]);
      }
    });
    submitData.append('userType', 'agency');
    
    try {
      const response = await fetch('https://localhost:7178/api/auth/register-agency', {
        method: 'POST',
        body: submitData,
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success('اطلاعات با موفقیت ثبت شد');
        localStorage.setItem('userType', 'agency');
        setTimeout(() => navigate('/register/verify', { 
          state: { mobile: formData.mobile, userType: 'agency', fullName: formData.fullName } 
        }), 2000);
      } else {
        toast.error(data.message || 'خطا در ثبت نام');
      }
    } catch (error) {
      toast.error('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => navigate('/register');

  const scrollToSection = (section) => {
    setActiveSection(section);
    const element = document.querySelector(`[data-section="${section}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // ===== رندر نقشه =====
  const renderMap = () => {
    // ✅ بررسی کامل‌تر
    if (!mapLoaded || !olLoaded || typeof window.ol === 'undefined') {
      return (
        <div className="map-loading">
          <div className="loading-spinner"></div>
          <p>در حال بارگذاری نقشه...</p>
        </div>
      );
    }

    return (
      <div id="neshan-map" className="neshan-map-container"></div>
    );
  };

  // ===== مقداردهی اولیه نقشه =====
  useEffect(() => {
    // ✅ بررسی کامل با olLoaded
    if (mapLoaded && olLoaded && typeof window.ol !== 'undefined' && !mapRef.current) {
      // بررسی وجود المان نقشه
      const mapElement = document.getElementById('neshan-map');
      if (!mapElement) return;

      try {
        const center = wgs84ToWebMercator(mapCenter.lng, mapCenter.lat);
        
        const map = new window.ol.Map({
          target: 'neshan-map',
          view: new window.ol.View({
            center: [center.x, center.y],
            zoom: 14,
          }),
          layers: [
            new window.ol.layer.Tile({
              source: new window.ol.source.XYZ({
                url: `https://api.neshan.org/maps/neshan/v1/dreamy/{z}/{x}/{y}.png?key=${mapKey}`,
                attributions: '© نقشه‌ نشان',
              }),
            }),
          ],
        });
        
        mapRef.current = map;
        
        map.on('click', (e) => {
          if (loading) return;
          const wgs84 = webMercatorToWgs84(e.coordinate[0], e.coordinate[1]);
          updateLocation(wgs84.lat, wgs84.lng);
          reverseGeocode(wgs84.lat, wgs84.lng);
          toast.success('موقعیت ثبت شد');
        });

        // ✅ به‌روزرسانی موقعیت اولیه
        setTimeout(() => {
          const view = map.getView();
          const coords = wgs84ToWebMercator(mapCenter.lng, mapCenter.lat);
          view.setCenter([coords.x, coords.y]);
          view.setZoom(14);
        }, 100);

      } catch (error) {
        console.error('❌ خطا در ایجاد نقشه:', error);
      }
    }

    // ✅ Cleanup
    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.dispose();
          mapRef.current = null;
        } catch (e) {
          console.warn('خطا در dispose نقشه:', e);
        }
      }
    };
  }, [mapLoaded, olLoaded, mapCenter, mapKey, updateLocation, reverseGeocode, loading]);

  const getDisplayAddress = () => {
    const parts = [];
    if (formData.province) parts.push(formData.province);
    if (formData.city) parts.push(formData.city);
    if (formData.region) parts.push(formData.region);
    return parts.join(' - ');
  };

  return (
    <div className="agency-register">
      <ToastContainer position="top-center" rtl={true} />
      
      <div className="particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
          }}></div>
        ))}
      </div>

      <div className="register-container">
        {/* سایدبار راست - توضیحات و مزایا */}
        <div className="register-sidebar">
          <div className="sidebar-content">
            <div className="sidebar-header">
              <div className="sidebar-icon">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 10.5V16.5L12 21L19 16.5V10.5" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 15V21" stroke="#d4af37" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h2>عضویت آژانس املاک</h2>
              <p>اگر آژانس شما دارای جواز کسب معتبر است، برای عضویت لطفا فرم مقابل را تکمیل نمائید.</p>
            </div>

            <div className="benefits-box">
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" fill="#d4af37" stroke="#d4af37" strokeWidth="1.5"/>
                </svg>
                مزایا همکاری با اوتاپ
              </h3>
              <div className="benefits-list">
                {benefits.map((b, i) => (
                  <div key={i} className="benefit-item" style={{ transitionDelay: `${i * 0.1}s` }}>
                    <span className="benefit-icon">{b.icon}</span>
                    <div>
                      <strong style={{ color: b.color }}>{b.title}</strong>
                      <p>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-box">
              <div className="info-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8V12L15 15M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#d4af37" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h4>توجه مهم</h4>
              <ul>
                <li>پس از تایید جواز کسب و اطلاعات ثبت شده، پنلی اختصاصی برای آژانس شما ایجاد می‌شود</li>
                <li>اطلاعات کاربری از طریق پیامک ارسال خواهد شد</li>
                <li>می‌توانید مشاوران خود را به پنل اضافه کنید</li>
                <li>آگهی‌ها با نام و لوگوی آژانس شما نمایش داده می‌شود</li>
              </ul>
            </div>
          </div>
        </div>

        {/* فرم اصلی سمت چپ */}
        <div className="register-form-wrapper">
          <div className="register-form">
            <button className="back-btn" onClick={handleBack}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19L5 12L12 5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              بازگشت
            </button>

            {/* پروگرس استپ */}
            <div className="form-progress">
              {['personal', 'agency'].map((section, idx) => (
                <div 
                  key={section} 
                  className={`progress-step ${activeSection === section ? 'active' : ''}`}
                  onClick={() => scrollToSection(section)}
                >
                  <div className="step-number">{idx + 1}</div>
                  <div className="step-label">
                    {section === 'personal' && 'اطلاعات شخصی'}
                    {section === 'agency' && 'اطلاعات آژانس'}
                    {/* {section === 'documents' && 'مدارک'} */}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* بخش 1: اطلاعات شخصی */}
              <div className="form-section" data-section="personal">
                <div className="section-title">
                  <span>👤</span> اطلاعات شخصی
                </div>
                <div className="form-row">
                  <div className="input-group">
                    <label>نام و نام خانوادگی *</label>
                                 <div className="password-box">  
                    <input 
                      type="text" 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleChange} 
                      placeholder="علی محمدی" 
                      disabled={loading}
                    />
                  </div>
                  </div>
                  <div className="input-group">
                    <label>شماره موبایل *</label>
                        <div className="password-box">  
                    <input 
                      type="tel" 
                      name="mobile" 
                      value={formData.mobile} 
                      onChange={handleChange} 
                      placeholder="09123456789" 
                      disabled={loading}
                    />
                         </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label>رمز عبور *</label>
                    <div className="password-box">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        placeholder="حداقل 6 کاراکتر" 
                        disabled={loading}
                      />
                      <button 
                        type="button" 
                        className="eye-btn" 
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
                      >
                        <EyeIcon isOpen={showPassword} />
                      </button>
                    </div>
                  </div>
                  <div className="input-group">
                    <label>تکرار رمز عبور *</label>
                    <div className="password-box">
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        placeholder="تکرار رمز عبور" 
                        disabled={loading}
                      />
                      <button 
                        type="button" 
                        className="eye-btn" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "مخفی کردن تکرار رمز عبور" : "نمایش تکرار رمز عبور"}
                      >
                        <EyeIcon isOpen={showConfirmPassword} />
                      </button>
                    </div>
                  </div>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <div className="error-msg">
                    ❌ رمز عبور مطابقت ندارد
                  </div>
                )}

                <div className="form-row">
                  <div className="input-group">
                    <label>کد ملی *</label>
                        <div className="password-box">  
                            <input 
                      type="text" 
                      name="nationalCode" 
                      value={formData.nationalCode} 
                      onChange={handleChange} 
                      maxLength="10" 
                      placeholder="1234567890" 
                      disabled={loading}
                    /></div>
                
                  </div>
                  <div className="input-group">
                    <label>کد مشاور املاک *</label>
                     <div className="password-box">  
                    <input 
                      type="text" 
                      name="agentCode" 
                      value={formData.agentCode} 
                      onChange={handleChange} 
                      placeholder="کد مشاور" 
                      disabled={loading}
                    />
                    </div>
                  </div>
                </div>
              </div>

              {/* بخش 2: اطلاعات آژانس */}
              <div className="form-section" data-section="agency">
                <div className="section-title">
                  <span>🏛️</span> اطلاعات آژانس و مجوزها
                </div>
                <div className="form-row">
                  <div className="input-group ">
                    <label>استان *</label>
                    
                    <select 
                      name="province" 
                      value={selectedProvinceId || ''} 
                      onChange={handleProvinceChange} 
                      disabled={loading || provinces.length === 0}
                    >
                      <option value="">انتخاب استان</option>
                      {provinces.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    {selectedProvinceId && formData.province && (
                      <div className="selected-value">✅ {formData.province}</div>
                    )}
                  </div>
                  <div className="input-group">
                    <label>شهر *</label>
                    <select 
                      name="city" 
                      value={selectedCityId || ''} 
                      onChange={handleCityChange} 
                      disabled={loading || cities.length === 0 || loadingRegions}
                    >
                      <option value="">انتخاب منطقه</option>
                      {cities.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {loadingRegions && <div className="loading-text">در حال بارگذاری...</div>}
                    {selectedCityId && formData.city && (
                      <div className="selected-value">✅ {formData.city}</div>
                    )}
                  </div>
                       {regions.length > 0 && (
                  <div className="form-row">
                    <div className="input-group full-width">
                      <label>محله *</label>
                      <select 
                        name="region" 
                        value={selectedRegionId || ''} 
                        onChange={handleRegionChange} 
                        disabled={loading || regions.length === 0}
                      >
                        <option value="">انتخاب منطقه</option>
                        {regions.map(r => (
                          <option key={r.id} value={r.id}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                      {selectedRegionId && formData.region && (
                        <div className="selected-value">✅ {formData.region}</div>
                      )}
                    </div>
                  </div>
                )}
                </div>

           

                {getDisplayAddress() && (
                  <div className="address-preview">
                    <span className="address-label">📍 آدرس کامل:</span>
                    <span className="address-value">{getDisplayAddress()}</span>
                  </div>
                )}

                <div className="input-group full-width">
                  <label>آدرس دفتر *</label>
                  <input 
                    type="text" 
                    name="officeAddress" 
                    value={formData.officeAddress} 
                    onChange={handleChange} 
                    placeholder="آدرس کامل دفتر (به صورت دستی هم می‌توانید ویرایش کنید)" 
                    disabled={loading}
                  />
                  <small className="address-hint">💡 می‌توانید آدرس را به صورت دستی ویرایش کنید</small>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label>شماره پروانه *</label>
                      <div className="password-box">  
                    <input 
                      type="text" 
                      name="licenseNumber" 
                      value={formData.licenseNumber} 
                      onChange={handleChange} 
                      placeholder="شماره پروانه" 
                      disabled={loading}
                    />
                      </div>
                  </div>
                  <div className="input-group">
                    <label>تاریخ اعتبار پروانه *</label>
                    <div className="password-box"> 
                    <input 
                      type="date" 
                      name="licenseExpiryDate" 
                      value={formData.licenseExpiryDate} 
                      onChange={handleChange} 
                      disabled={loading}
                    />
                          </div>  
                  </div>
                </div>
              </div>

              {/* بخش 3: موقعیت روی نقشه */}
              {/* <div className="form-section" data-section="location">
                <div className="section-title">
                  <span>🗺️</span> موقعیت دفتر روی نقشه
                </div>
                <div className="search-box">
                  <input 
                    type="text" 
                    value={searchAddress} 
                    onChange={(e) => setSearchAddress(e.target.value)} 
                    placeholder="جستجوی آدرس روی نقشه..." 
                    onKeyPress={(e) => e.key === 'Enter' && searchAddressHandler()} 
                  />
                  <button type="button" onClick={searchAddressHandler} disabled={searching}>
                    {searching ? 'جستجو...' : '🔍 جستجو'}
                  </button>
                </div>

                <div className="map-wrapper">
                  {renderMap()}
                  <div className="map-marker">📍</div>
                </div>
                
                {locationSelected && (
                  <div className="location-success">
                    ✓ موقعیت ثبت شد | {formData.lat.toFixed(5)} , {formData.lng.toFixed(5)}
                  </div>
                )}
              </div> */}

              {/* بخش 4: آپلود مدارک */}
              {/* <div className="form-section" data-section="documents">
                <div className="section-title">
                  <span>📎</span> آپلود مدارک
                </div>
                <div className="upload-row">
                  <div className="upload-box" onClick={() => nationalCardRef.current?.click()}>
                    <input type="file" ref={nationalCardRef} onChange={(e) => handleImageChange(e, 'national')} accept="image/*" hidden />
                    {nationalCardPreview ? (
                      <div className="preview">
                        <img src={nationalCardPreview} alt="کارت ملی" />
                        <button type="button" className="remove-btn" onClick={(e) => { e.stopPropagation(); setNationalCardPreview(null); setFormData(prev => ({ ...prev, nationalCardImage: null })); }}>
                          ✗
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="upload-icon">🪪</div>
                        <p>تصویر کارت ملی</p>
                        <small>jpg, png (حداکثر 2MB)</small>
                      </>
                    )}
                  </div>
                  <div className="upload-box" onClick={() => licenseRef.current?.click()}>
                    <input type="file" ref={licenseRef} onChange={(e) => handleImageChange(e, 'license')} accept="image/*" hidden />
                    {licensePreview ? (
                      <div className="preview">
                        <img src={licensePreview} alt="پروانه" />
                        <button type="button" className="remove-btn" onClick={(e) => { e.stopPropagation(); setLicensePreview(null); setFormData(prev => ({ ...prev, licenseImage: null })); }}>
                          ✗
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="upload-icon">📄</div>
                        <p>تصویر پروانه کسب</p>
                        <small>jpg, png (حداکثر 2MB)</small>
                      </>
                    )}
                  </div>
                </div>
              </div> */}

              <label className="checkbox">
                <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
                <span className="checkmark"></span>
                قوانین و مقررات سایت اوتاپ را مطالعه کرده و می‌پذیرم
              </label>

              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    در حال ثبت نام...
                  </>
                ) : (
                  <>🏢 ثبت نام آژانس</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAgency;