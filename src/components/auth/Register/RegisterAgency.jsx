
// // // // // export default RegisterAgency;

// // // // import React, { useState, useRef, useEffect } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { toast, ToastContainer } from 'react-toastify';
// // // // import 'react-toastify/dist/ReactToastify.css';
// // // // import NeshanMap from "@neshan-maps-platform/react-openlayers";
// // // // import "@neshan-maps-platform/react-openlayers/dist/style.css";
// // // // import './RegisterAgency.css';

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
  
// // // //   const [formData, setFormData] = useState({
// // // //     fullName: '',
// // // //     mobile: '',
// // // //     password: '',
// // // //     confirmPassword: '',
// // // //     nationalCode: '',
// // // //     agentCode: '',
// // // //     officeAddress: '',
// // // //     licenseNumber: '',
// // // //     licenseExpiryDate: '',
// // // //     nationalCardImage: null,
// // // //     licenseImage: null,
// // // //     lat: 35.699739,
// // // //     lng: 51.338097
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
  
// // // //   const nationalCardRef = useRef(null);
// // // //   const licenseRef = useRef(null);
// // // //   const navigate = useNavigate();

// // // //   const benefits = [
// // // //     { icon: '🏆', title: 'اعتبار برند اوتاپ', desc: 'برخورداری از اعتبار و جایگاه برند معتبر اوتاپ' },
// // // //     { icon: '⚡', title: 'ثبت سریع و آسان ملک', desc: 'ثبت آگهی در کمترین زمان ممکن' },
// // // //     { icon: '🎨', title: 'پنل مشاوری حرفه‌ای', desc: 'پنل اختصاصی با طراحی مدرن و کاربری آسان' },
// // // //     { icon: '💰', title: 'کیف پول و شارژ هدیه', desc: 'امکان برخورداری از کیف پول و دریافت شارژ هدیه' },
// // // //     { icon: '📈', title: 'امکانات ارتقاء آگهی', desc: 'به روزرسانی، ویترین، بسته افزایش بازدید' },
// // // //     { icon: '📊', title: 'آمار بازدید و تماس', desc: 'مشاهده آمار دقیق بازدید و تماس هر آگهی' }
// // // //   ];

// // // //   const validateNationalCode = (code) => {
// // // //     const nationalCodeRegex = /^[0-9]{10}$/;
// // // //     if (!nationalCodeRegex.test(code)) return false;
// // // //     const check = parseInt(code[9]);
// // // //     let sum = 0;
// // // //     for (let i = 0; i < 9; i++) sum += parseInt(code[i]) * (10 - i);
// // // //     const remainder = sum % 11;
// // // //     return remainder < 2 ? check === remainder : check === (11 - remainder);
// // // //   };

// // // //   const validateMobile = (mobile) => /^09[0-9]{9}$/.test(mobile);

// // // //   const updateLocation = (lat, lng) => {
// // // //     setFormData(prev => ({ ...prev, lat, lng }));
// // // //     setMapCenter({ lat, lng });
// // // //     setLocationSelected(true);
    
// // // //     if (mapRef.current) {
// // // //       const view = mapRef.current.getView();
// // // //       const coords = wgs84ToWebMercator(lng, lat);
// // // //       view.setCenter([coords.x, coords.y]);
// // // //       view.setZoom(17);
// // // //     }
// // // //   };

// // // //   const reverseGeocode = async (lat, lng) => {
// // // //     try {
// // // //       const response = await fetch(`https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`, {
// // // //         headers: { 'Api-Key': mapKey }
// // // //       });
// // // //       const data = await response.json();
// // // //       if (data?.formatted_address) {
// // // //         setFormData(prev => ({ ...prev, officeAddress: data.formatted_address }));
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error:', error);
// // // //     }
// // // //   };

// // // //   const searchAddressHandler = async () => {
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
// // // //   };

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
// // // //     if (formData.password !== formData.confirmPassword) return toast.error('رمز عبور مطابقت ندارد');
// // // //     if (!validateNationalCode(formData.nationalCode)) return toast.error('کد ملی نامعتبر است');
// // // //     if (!formData.agentCode) return toast.error('کد مشاور را وارد کنید');
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

// // // //   return (
// // // //     <div className="agency-register">
// // // //       <ToastContainer position="top-center" rtl={true} />
      
// // // //       <div className="register-bg"></div>
      
// // // //       <div className="register-card">
// // // //         <button className="back-btn" onClick={handleBack}>← بازگشت</button>

// // // //         <div className="register-header">
// // // //           <div className="header-icon">🏢</div>
// // // //           <h1>ثبت نام <span>آژانس املاک</span></h1>
// // // //           <p>به خانواده بزرگ اوتاپ خوش آمدید</p>
// // // //         </div>

// // // //         <div className="benefits">
// // // //           <h3>✨ مزایای همکاری با اوتاپ</h3>
// // // //           <div className="benefits-grid">
// // // //             {benefits.map((b, i) => (
// // // //               <div key={i} className="benefit">
// // // //                 <div className="benefit-icon">{b.icon}</div>
// // // //                 <div>
// // // //                   <strong>{b.title}</strong>
// // // //                   <p>{b.desc}</p>
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </div>

// // // //         <form onSubmit={handleSubmit}>
// // // //           <div className="form-row">
// // // //             <div className="input-group">
// // // //               <label>👤 نام و نام خانوادگی *</label>
// // // //               <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="علی محمدی" disabled={loading} />
// // // //             </div>
// // // //             <div className="input-group">
// // // //               <label>📱 شماره موبایل *</label>
// // // //               <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="09123456789" disabled={loading} />
// // // //             </div>
// // // //           </div>

// // // //           <div className="form-row">
// // // //             <div className="input-group">
// // // //               <label>🔒 رمز عبور *</label>
// // // //               <div className="password-box">
// // // //                 <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="حداقل 6 کاراکتر" disabled={loading} />
// // // //                 <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? '🙈' : '👁️'}</button>
// // // //               </div>
// // // //             </div>
// // // //             <div className="input-group">
// // // //               <label>🔒 تکرار رمز عبور *</label>
// // // //               <div className="password-box">
// // // //                 <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="تکرار رمز عبور" disabled={loading} />
// // // //                 <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? '🙈' : '👁️'}</button>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {formData.confirmPassword && formData.password !== formData.confirmPassword && (
// // // //             <div className="error-msg">❌ رمز عبور مطابقت ندارد</div>
// // // //           )}

// // // //           <div className="form-row">
// // // //             <div className="input-group">
// // // //               <label>🆔 کد ملی *</label>
// // // //               <input type="text" name="nationalCode" value={formData.nationalCode} onChange={handleChange} maxLength="10" placeholder="1234567890" disabled={loading} />
// // // //             </div>
// // // //             <div className="input-group">
// // // //               <label>🏢 کد مشاور املاک *</label>
// // // //               <input type="text" name="agentCode" value={formData.agentCode} onChange={handleChange} placeholder="کد مشاور" disabled={loading} />
// // // //             </div>
// // // //           </div>

// // // //           <div className="input-group">
// // // //             <label>📍 آدرس دفتر *</label>
// // // //             <input type="text" name="officeAddress" value={formData.officeAddress} onChange={handleChange} placeholder="آدرس کامل دفتر" disabled={loading} />
// // // //           </div>

// // // //           <div className="search-box">
// // // //             <input type="text" value={searchAddress} onChange={(e) => setSearchAddress(e.target.value)} placeholder="جستجوی آدرس روی نقشه..." onKeyPress={(e) => e.key === 'Enter' && searchAddressHandler()} />
// // // //             <button type="button" onClick={searchAddressHandler} disabled={searching}>{searching ? 'جستجو...' : '🔍 جستجو'}</button>
// // // //           </div>

// // // //           <div className="map-wrapper">
// // // //             <label>📍 موقعیت دفتر روی نقشه * <small>(کلیک کنید)</small></label>
// // // //             <div className="map-container">
// // // //               <NeshanMap 
// // // //                 mapKey={mapKey} 
// // // //                 center={{ latitude: mapCenter.lat, longitude: mapCenter.lng }} 
// // // //                 zoom={14} 
// // // //                 defaultType="dreamy" 
// // // //                 style={{ height: '100%', width: '100%', borderRadius: '16px' }} 
// // // //                 onInit={(map) => {
// // // //                   mapRef.current = map;
// // // //                   map.on('click', (e) => {
// // // //                     if (loading) return;
// // // //                     const wgs84 = webMercatorToWgs84(e.coordinate[0], e.coordinate[1]);
// // // //                     updateLocation(wgs84.lat, wgs84.lng);
// // // //                     reverseGeocode(wgs84.lat, wgs84.lng);
// // // //                     toast.success('موقعیت ثبت شد');
// // // //                   });
// // // //                 }} 
// // // //               />
// // // //               <div className="map-marker">📍</div>
// // // //             </div>
// // // //             {locationSelected && (
// // // //               <div className="location-success">✓ موقعیت ثبت شد | {formData.lat.toFixed(5)} , {formData.lng.toFixed(5)}</div>
// // // //             )}
// // // //           </div>

// // // //           <div className="form-row">
// // // //             <div className="input-group">
// // // //               <label>📜 شماره پروانه *</label>
// // // //               <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} placeholder="شماره پروانه" disabled={loading} />
// // // //             </div>
// // // //             <div className="input-group">
// // // //               <label>📅 تاریخ اعتبار پروانه *</label>
// // // //               <input type="date" name="licenseExpiryDate" value={formData.licenseExpiryDate} onChange={handleChange} disabled={loading} />
// // // //             </div>
// // // //           </div>

// // // //           <div className="upload-row">
// // // //             <div className="upload-box" onClick={() => nationalCardRef.current?.click()}>
// // // //               <input type="file" ref={nationalCardRef} onChange={(e) => handleImageChange(e, 'national')} accept="image/*" hidden />
// // // //               {nationalCardPreview ? (
// // // //                 <div className="preview"><img src={nationalCardPreview} alt="کارت ملی" /><button type="button" onClick={(e) => { e.stopPropagation(); setNationalCardPreview(null); setFormData(prev => ({ ...prev, nationalCardImage: null })); }}>✗</button></div>
// // // //               ) : (
// // // //                 <>🪪<p>تصویر کارت ملی</p><small>jpg, png (حداکثر 2MB)</small></>
// // // //               )}
// // // //             </div>
// // // //             <div className="upload-box" onClick={() => licenseRef.current?.click()}>
// // // //               <input type="file" ref={licenseRef} onChange={(e) => handleImageChange(e, 'license')} accept="image/*" hidden />
// // // //               {licensePreview ? (
// // // //                 <div className="preview"><img src={licensePreview} alt="پروانه" /><button type="button" onClick={(e) => { e.stopPropagation(); setLicensePreview(null); setFormData(prev => ({ ...prev, licenseImage: null })); }}>✗</button></div>
// // // //               ) : (
// // // //                 <>📄<p>تصویر پروانه کسب</p><small>jpg, png (حداکثر 2MB)</small></>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           <div className="notice">
// // // //             <span>💎</span>
// // // //             <div>
// // // //               <h4>توجه مهم</h4>
// // // //               <ul>
// // // //                 <li>پس از تایید جواز کسب، پنل اختصاصی برای آژانس شما ایجاد می‌شود</li>
// // // //                 <li>اطلاعات کاربری از طریق پیامک ارسال خواهد شد</li>
// // // //                 <li>می‌توانید مشاوران خود را به پنل اضافه کنید</li>
// // // //                 <li>آگهی‌ها با نام و لوگوی آژانس شما نمایش داده می‌شود</li>
// // // //               </ul>
// // // //             </div>
// // // //           </div>

// // // //           <label className="checkbox">
// // // //             <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
// // // //             <span></span>
// // // //             قوانین و مقررات سایت اوتاپ را مطالعه کرده و می‌پذیرم
// // // //           </label>

// // // //           <button type="submit" disabled={loading} className="submit-btn">
// // // //             {loading ? 'در حال ثبت نام...' : '🏢 ثبت نام آژانس'}
// // // //           </button>
// // // //         </form>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default RegisterAgency;

// // // // // RegisterAgency.jsx - نسخه دوستونه (فرم راست، محتوای چپ)
// // // // import React, { useState, useRef } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { toast, ToastContainer } from 'react-toastify';
// // // // import 'react-toastify/dist/ReactToastify.css';
// // // // import NeshanMap from "@neshan-maps-platform/react-openlayers";
// // // // import "@neshan-maps-platform/react-openlayers/dist/style.css";
// // // // import './RegisterAgency.css';

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
  
// // // //   const [formData, setFormData] = useState({
// // // //     fullName: '', mobile: '', password: '', confirmPassword: '',
// // // //     nationalCode: '', agentCode: '', province: '', city: '',
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
  
// // // //   const nationalCardRef = useRef(null);
// // // //   const licenseRef = useRef(null);
// // // //   const navigate = useNavigate();

// // // //   const benefits = [
// // // //     { icon: '🏆', title: 'اعتبار برند اوتاپ', desc: 'برخورداری از اعتبار و جایگاه برند معتبر' },
// // // //     { icon: '⚡', title: 'ثبت سریع و آسان ملک', desc: 'ثبت آگهی در کمترین زمان ممکن' },
// // // //     { icon: '🎨', title: 'پنل مشاوری حرفه‌ای', desc: 'پنل اختصاصی با طراحی مدرن و کاربری آسان' },
// // // //     { icon: '💰', title: 'کیف پول و شارژ هدیه', desc: 'امکان برخورداری از کیف پول و دریافت شارژ هدیه' },
// // // //     { icon: '📈', title: 'امکانات ارتقاء آگهی', desc: 'به روزرسانی، ویترین، بسته افزایش بازدید' },
// // // //     { icon: '📊', title: 'آمار بازدید و تماس', desc: 'مشاهده آمار دقیق بازدید و تماس هر آگهی' }
// // // //   ];

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

// // // //   const updateLocation = (lat, lng) => {
// // // //     setFormData(prev => ({ ...prev, lat, lng }));
// // // //     setMapCenter({ lat, lng });
// // // //     setLocationSelected(true);
    
// // // //     if (mapRef.current) {
// // // //       const view = mapRef.current.getView();
// // // //       const coords = wgs84ToWebMercator(lng, lat);
// // // //       view.setCenter([coords.x, coords.y]);
// // // //       view.setZoom(17);
// // // //     }
// // // //   };

// // // //   const reverseGeocode = async (lat, lng) => {
// // // //     try {
// // // //       const response = await fetch(`https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`, {
// // // //         headers: { 'Api-Key': mapKey }
// // // //       });
// // // //       const data = await response.json();
// // // //       if (data?.formatted_address) {
// // // //         setFormData(prev => ({ ...prev, officeAddress: data.formatted_address }));
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error:', error);
// // // //     }
// // // //   };

// // // //   const searchAddressHandler = async () => {
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
// // // //   };

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

// // // //   // لیست استان‌ها
// // // //   const provinces = ['تهران', 'اصفهان', 'فارس', 'خراسان رضوی', 'آذربایجان شرقی'];
// // // //   const cities = {
// // // //     'تهران': ['تهران', 'ری', 'شمیرانات', 'اسلامشهر'],
// // // //     'اصفهان': ['اصفهان', 'کاشان', 'خمینی‌شهر', 'نجف‌آباد'],
// // // //     'فارس': ['شیراز', 'مرودشت', 'کازرون', 'جهرم'],
// // // //     'خراسان رضوی': ['مشهد', 'نیشابور', 'سبزوار', 'تربت حیدریه'],
// // // //     'آذربایجان شرقی': ['تبریز', 'مراغه', 'مرند', 'میانه']
// // // //   };

// // // //   return (
// // // //     <div className="agency-register">
// // // //       <ToastContainer position="top-center" rtl={true} />
      
// // // //       <div className="register-container">
// // // //         {/* سمت چپ: توضیحات و مزایا */}
// // // //         <div className="register-sidebar">
// // // //           <div className="sidebar-content">
// // // //             <div className="sidebar-header">
// // // //               <div className="sidebar-icon">🏢</div>
// // // //               <h2>عضویت آژانس املاک</h2>
// // // //               <p>اگر آژانس شما دارای جواز کسب معتبر است، برای عضویت لطفا فرم مقابل را تکمیل نمائید.</p>
// // // //             </div>

// // // //             <div className="benefits-box">
// // // //               <h3>✨ مزایا همکاری با اوتاپ</h3>
// // // //               <div className="benefits-list">
// // // //                 {benefits.map((b, i) => (
// // // //                   <div key={i} className="benefit-item">
// // // //                     <span className="benefit-icon">{b.icon}</span>
// // // //                     <div>
// // // //                       <strong>{b.title}</strong>
// // // //                       <p>{b.desc}</p>
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>

// // // //             <div className="info-box">
// // // //               <div className="info-icon">💎</div>
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

// // // //         {/* سمت راست: فرم ثبت‌نام */}
// // // //         <div className="register-form-wrapper">
// // // //           <div className="register-form">
// // // //             <button className="back-btn" onClick={handleBack}>← بازگشت</button>

// // // //             <form onSubmit={handleSubmit}>
// // // //               {/* بخش 1: اطلاعات شخصی */}
// // // //               <div className="form-section">
// // // //                 <div className="section-title">
// // // //                   <span>👤</span> اطلاعات شخصی
// // // //                 </div>
// // // //                 <div className="form-row">
// // // //                   <div className="input-group">
// // // //                     <label>نام و نام خانوادگی *</label>
// // // //                     <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="علی محمدی" disabled={loading} />
// // // //                   </div>
// // // //                   <div className="input-group">
// // // //                     <label>شماره موبایل *</label>
// // // //                     <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="09123456789" disabled={loading} />
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="form-row">
// // // //                   <div className="input-group">
// // // //                     <label>رمز عبور *</label>
// // // //                     <div className="password-box">
// // // //                       <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="حداقل 6 کاراکتر" disabled={loading} />
// // // //                       <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? '🙈' : '👁️'}</button>
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="input-group">
// // // //                     <label>تکرار رمز عبور *</label>
// // // //                     <div className="password-box">
// // // //                       <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="تکرار رمز عبور" disabled={loading} />
// // // //                       <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? '🙈' : '👁️'}</button>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //                 {formData.confirmPassword && formData.password !== formData.confirmPassword && (
// // // //                   <div className="error-msg">❌ رمز عبور مطابقت ندارد</div>
// // // //                 )}

// // // //                 <div className="form-row">
// // // //                   <div className="input-group">
// // // //                     <label>کد ملی *</label>
// // // //                     <input type="text" name="nationalCode" value={formData.nationalCode} onChange={handleChange} maxLength="10" placeholder="1234567890" disabled={loading} />
// // // //                   </div>
// // // //                   <div className="input-group">
// // // //                     <label>کد مشاور املاک *</label>
// // // //                     <input type="text" name="agentCode" value={formData.agentCode} onChange={handleChange} placeholder="کد مشاور" disabled={loading} />
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               {/* بخش 2: اطلاعات آژانس */}
// // // //               <div className="form-section">
// // // //                 <div className="section-title">
// // // //                   <span>🏛️</span> اطلاعات آژانس و مجوزها
// // // //                 </div>
// // // //                 <div className="form-row">
// // // //                   <div className="input-group">
// // // //                     <label>استان *</label>
// // // //                     <select name="province" value={formData.province} onChange={handleChange} disabled={loading}>
// // // //                       <option value="">انتخاب استان</option>
// // // //                       {provinces.map(p => <option key={p} value={p}>{p}</option>)}
// // // //                     </select>
// // // //                   </div>
// // // //                   <div className="input-group">
// // // //                     <label>شهر *</label>
// // // //                     <select name="city" value={formData.city} onChange={handleChange} disabled={loading}>
// // // //                       <option value="">انتخاب شهر</option>
// // // //                       {formData.province && cities[formData.province]?.map(c => <option key={c} value={c}>{c}</option>)}
// // // //                     </select>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="input-group full-width">
// // // //                   <label>آدرس دفتر *</label>
// // // //                   <input type="text" name="officeAddress" value={formData.officeAddress} onChange={handleChange} placeholder="آدرس کامل دفتر" disabled={loading} />
// // // //                 </div>

// // // //                 <div className="form-row">
// // // //                   <div className="input-group">
// // // //                     <label>شماره پروانه *</label>
// // // //                     <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} placeholder="شماره پروانه" disabled={loading} />
// // // //                   </div>
// // // //                   <div className="input-group">
// // // //                     <label>تاریخ اعتبار پروانه *</label>
// // // //                     <input type="date" name="licenseExpiryDate" value={formData.licenseExpiryDate} onChange={handleChange} disabled={loading} />
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               {/* بخش 3: موقعیت روی نقشه */}
// // // //               <div className="form-section">
// // // //                 <div className="section-title">
// // // //                   <span>🗺️</span> موقعیت دفتر روی نقشه
// // // //                 </div>
// // // //                 <div className="search-box">
// // // //                   <input type="text" value={searchAddress} onChange={(e) => setSearchAddress(e.target.value)} placeholder="جستجوی آدرس روی نقشه..." onKeyPress={(e) => e.key === 'Enter' && searchAddressHandler()} />
// // // //                   <button type="button" onClick={searchAddressHandler} disabled={searching}>{searching ? 'جستجو...' : '🔍 جستجو'}</button>
// // // //                 </div>

// // // //                 <div className="map-wrapper">
// // // //                   <div className="map-container">
// // // //                     <NeshanMap 
// // // //                       mapKey={mapKey} 
// // // //                       center={{ latitude: mapCenter.lat, longitude: mapCenter.lng }} 
// // // //                       zoom={14} 
// // // //                       defaultType="dreamy" 
// // // //                       style={{ height: '100%', width: '100%', borderRadius: '16px' }} 
// // // //                       onInit={(map) => {
// // // //                         mapRef.current = map;
// // // //                         map.on('click', (e) => {
// // // //                           if (loading) return;
// // // //                           const wgs84 = webMercatorToWgs84(e.coordinate[0], e.coordinate[1]);
// // // //                           updateLocation(wgs84.lat, wgs84.lng);
// // // //                           reverseGeocode(wgs84.lat, wgs84.lng);
// // // //                           toast.success('موقعیت ثبت شد');
// // // //                         });
// // // //                       }} 
// // // //                     />
// // // //                     <div className="map-marker">📍</div>
// // // //                   </div>
// // // //                   {locationSelected && (
// // // //                     <div className="location-success">✓ موقعیت ثبت شد | {formData.lat.toFixed(5)} , {formData.lng.toFixed(5)}</div>
// // // //                   )}
// // // //                 </div>
// // // //               </div>

// // // //               {/* بخش 4: آپلود مدارک */}
// // // //               <div className="form-section">
// // // //                 <div className="section-title">
// // // //                   <span>📎</span> آپلود مدارک
// // // //                 </div>
// // // //                 <div className="upload-row">
// // // //                   <div className="upload-box" onClick={() => nationalCardRef.current?.click()}>
// // // //                     <input type="file" ref={nationalCardRef} onChange={(e) => handleImageChange(e, 'national')} accept="image/*" hidden />
// // // //                     {nationalCardPreview ? (
// // // //                       <div className="preview">
// // // //                         <img src={nationalCardPreview} alt="کارت ملی" />
// // // //                         <button type="button" onClick={(e) => { e.stopPropagation(); setNationalCardPreview(null); setFormData(prev => ({ ...prev, nationalCardImage: null })); }}>✗</button>
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
// // // //                         <button type="button" onClick={(e) => { e.stopPropagation(); setLicensePreview(null); setFormData(prev => ({ ...prev, licenseImage: null })); }}>✗</button>
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
// // // //                 {loading ? 'در حال ثبت نام...' : '🏢 ثبت نام آژانس'}
// // // //               </button>
// // // //             </form>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default RegisterAgency;

// // // // RegisterAgency.jsx - نسخه بهبودیافته با انیمیشن‌های نرم‌تر و视觉效果 بهتر
// // // import React, { useState, useRef, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { toast, ToastContainer } from 'react-toastify';
// // // import 'react-toastify/dist/ReactToastify.css';
// // // import NeshanMap from "@neshan-maps-platform/react-openlayers";
// // // import "@neshan-maps-platform/react-openlayers/dist/style.css";
// // // import './'; // این لاین باید باشه

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
  
// // //   const [formData, setFormData] = useState({
// // //     fullName: '', mobile: '', password: '', confirmPassword: '',
// // //     nationalCode: '', agentCode: '', province: '', city: '',
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
// // //   const [focusedField, setFocusedField] = useState(null);
  
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

// // //   useEffect(() => {
// // //     const observer = new IntersectionObserver((entries) => {
// // //       entries.forEach(entry => {
// // //         if (entry.isIntersecting) {
// // //           entry.target.style.opacity = '1';
// // //           entry.target.style.transform = 'translateY(0)';
// // //         }
// // //       });
// // //     }, { threshold: 0.1 });

// // //     document.querySelectorAll('.form-section, .benefit-item, .upload-box').forEach(el => {
// // //       el.style.opacity = '0';
// // //       el.style.transform = 'translateY(20px)';
// // //       el.style.transition = 'all 0.6s ease-out';
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

// // //   const updateLocation = (lat, lng) => {
// // //     setFormData(prev => ({ ...prev, lat, lng }));
// // //     setMapCenter({ lat, lng });
// // //     setLocationSelected(true);
    
// // //     if (mapRef.current) {
// // //       const view = mapRef.current.getView();
// // //       const coords = wgs84ToWebMercator(lng, lat);
// // //       view.setCenter([coords.x, coords.y]);
// // //       view.setZoom(17);
// // //     }
// // //   };

// // //   const reverseGeocode = async (lat, lng) => {
// // //     try {
// // //       const response = await fetch(`https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`, {
// // //         headers: { 'Api-Key': mapKey }
// // //       });
// // //       const data = await response.json();
// // //       if (data?.formatted_address) {
// // //         setFormData(prev => ({ ...prev, officeAddress: data.formatted_address }));
// // //       }
// // //     } catch (error) {
// // //       console.error('Error:', error);
// // //     }
// // //   };

// // //   const searchAddressHandler = async () => {
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
// // //   };

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

// // //   const provinces = ['تهران', 'اصفهان', 'فارس', 'خراسان رضوی', 'آذربایجان شرقی', 'مازندران', 'گیلان', 'کرمان', 'خوزستان'];
// // //   const cities = {
// // //     'تهران': ['تهران', 'ری', 'شمیرانات', 'اسلامشهر', 'قدس', 'ملارد', 'ورامین'],
// // //     'اصفهان': ['اصفهان', 'کاشان', 'خمینی‌شهر', 'نجف‌آباد', 'شاهین‌شهر', 'مبارکه'],
// // //     'فارس': ['شیراز', 'مرودشت', 'کازرون', 'جهرم', 'فسا', 'لارستان'],
// // //     'خراسان رضوی': ['مشهد', 'نیشابور', 'سبزوار', 'تربت حیدریه', 'قوچان', 'کاشمر'],
// // //     'آذربایجان شرقی': ['تبریز', 'مراغه', 'مرند', 'میانه', 'اهر', 'بستان‌آباد'],
// // //     'مازندران': ['ساری', 'بابلسر', 'آمل', 'بابل', 'قائم‌شهر', 'نور'],
// // //     'گیلان': ['رشت', 'انزلی', 'لاهیجان', 'آستارا', 'تالش', 'رودسر'],
// // //     'کرمان': ['کرمان', 'سیرجان', 'رفسنجان', 'بم', 'جیرفت', 'زرند'],
// // //     'خوزستان': ['اهواز', 'آبادان', 'خرمشهر', 'دزفول', 'اندیمشک', 'شوشتر']
// // //   };

// // //   return (
// // //     <div className="agency-register">
// // //       <ToastContainer position="top-center" rtl={true} />
      
// // //       {/* Particles with more variety */}
// // //       <div className="particles">
// // //         {[...Array(15)].map((_, i) => (
// // //           <div key={i} className="particle" style={{
// // //             left: `${Math.random() * 100}%`,
// // //             top: `${Math.random() * 100}%`,
// // //             animationDelay: `${Math.random() * 15}s`,
// // //             animationDuration: `${10 + Math.random() * 10}s`,
// // //             width: `${2 + Math.random() * 4}px`,
// // //             height: `${2 + Math.random() * 4}px`,
// // //             background: `rgba(212, 175, 55, ${0.3 + Math.random() * 0.4})`
// // //           }}></div>
// // //         ))}
// // //       </div>

// // //       <div className="register-container">
// // //         {/* سمت چپ: توضیحات و مزایا با انیمیشن جدید */}
// // //         <div className="register-sidebar">
// // //           <div className="sidebar-content">
// // //             <div className="sidebar-header">
// // //               <div className="sidebar-icon">
// // //                 <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// // //                   <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// // //                   <path d="M5 10.5V16.5L12 21L19 16.5V10.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// // //                   <path d="M12 15V21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
// // //                 </svg>
// // //               </div>
// // //               <h2>عضویت آژانس املاک</h2>
// // //               <p>اگر آژانس شما دارای جواز کسب معتبر است، برای عضویت لطفا فرم مقابل را تکمیل نمائید.</p>
// // //             </div>

// // //             <div className="benefits-box">
// // //               <h3>
// // //                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginLeft: '8px' }}>
// // //                   <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" fill="#d4af37" stroke="#d4af37" strokeWidth="1.5"/>
// // //                 </svg>
// // //                 ✨ مزایا همکاری با اوتاپ
// // //               </h3>
// // //               <div className="benefits-list">
// // //                 {benefits.map((b, i) => (
// // //                   <div key={i} className="benefit-item" style={{ transitionDelay: `${i * 0.1}s` }}>
// // //                     <span className="benefit-icon" style={{ textShadow: `0 0 10px ${b.color}` }}>{b.icon}</span>
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
// // //               <h4>💎 توجه مهم</h4>
// // //               <ul>
// // //                 <li>پس از تایید جواز کسب و اطلاعات ثبت شده، پنلی اختصاصی برای آژانس شما ایجاد می‌شود</li>
// // //                 <li>اطلاعات کاربری از طریق پیامک ارسال خواهد شد</li>
// // //                 <li>می‌توانید مشاوران خود را به پنل اضافه کنید</li>
// // //                 <li>آگهی‌ها با نام و لوگوی آژانس شما نمایش داده می‌شود</li>
// // //               </ul>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* سمت راست: فرم ثبت‌نام با navigation پیشرفته */}
// // //         <div className="register-form-wrapper">
// // //           <div className="register-form">
// // //             <button className="back-btn" onClick={handleBack}>
// // //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                 <path d="M19 12H5M12 19L5 12L12 5" strokeLinecap="round" strokeLinejoin="round"/>
// // //               </svg>
// // //               بازگشت
// // //             </button>

// // //             {/* Progress indicator */}
// // //             <div className="form-progress">
// // //               {['personal', 'agency', 'location', 'documents'].map((section, idx) => (
// // //                 <div key={section} className={`progress-step ${activeSection === section ? 'active' : ''}`}>
// // //                   <div className="step-number">{idx + 1}</div>
// // //                   <div className="step-label">
// // //                     {section === 'personal' && 'اطلاعات شخصی'}
// // //                     {section === 'agency' && 'اطلاعات آژانس'}
// // //                     {section === 'location' && 'موقعیت مکانی'}
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
// // //                   <div className={`input-group ${focusedField === 'fullName' ? 'focused' : ''}`}>
// // //                     <label>نام و نام خانوادگی *</label>
// // //                     <input 
// // //                       type="text" 
// // //                       name="fullName" 
// // //                       value={formData.fullName} 
// // //                       onChange={handleChange} 
// // //                       placeholder="علی محمدی" 
// // //                       disabled={loading}
// // //                       onFocus={() => setFocusedField('fullName')}
// // //                       onBlur={() => setFocusedField(null)}
// // //                     />
// // //                   </div>
// // //                   <div className={`input-group ${focusedField === 'mobile' ? 'focused' : ''}`}>
// // //                     <label>شماره موبایل *</label>
// // //                     <input 
// // //                       type="tel" 
// // //                       name="mobile" 
// // //                       value={formData.mobile} 
// // //                       onChange={handleChange} 
// // //                       placeholder="09123456789" 
// // //                       disabled={loading}
// // //                       onFocus={() => setFocusedField('mobile')}
// // //                       onBlur={() => setFocusedField(null)}
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 <div className="form-row">
// // //                   <div className={`input-group ${focusedField === 'password' ? 'focused' : ''}`}>
// // //                     <label>رمز عبور *</label>
// // //                     <div className="password-box">
// // //                       <input 
// // //                         type={showPassword ? "text" : "password"} 
// // //                         name="password" 
// // //                         value={formData.password} 
// // //                         onChange={handleChange} 
// // //                         placeholder="حداقل 6 کاراکتر" 
// // //                         disabled={loading}
// // //                         onFocus={() => setFocusedField('password')}
// // //                         onBlur={() => setFocusedField(null)}
// // //                       />
// // //                       <button type="button" onClick={() => setShowPassword(!showPassword)}>
// // //                         {showPassword ? '🙈' : '👁️'}
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                   <div className={`input-group ${focusedField === 'confirmPassword' ? 'focused' : ''}`}>
// // //                     <label>تکرار رمز عبور *</label>
// // //                     <div className="password-box">
// // //                       <input 
// // //                         type={showConfirmPassword ? "text" : "password"} 
// // //                         name="confirmPassword" 
// // //                         value={formData.confirmPassword} 
// // //                         onChange={handleChange} 
// // //                         placeholder="تکرار رمز عبور" 
// // //                         disabled={loading}
// // //                         onFocus={() => setFocusedField('confirmPassword')}
// // //                         onBlur={() => setFocusedField(null)}
// // //                       />
// // //                       <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
// // //                         {showConfirmPassword ? '🙈' : '👁️'}
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //                 {formData.confirmPassword && formData.password !== formData.confirmPassword && (
// // //                   <div className="error-msg shake">
// // //                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                       <circle cx="12" cy="12" r="10"/>
// // //                       <line x1="12" y1="8" x2="12" y2="12"/>
// // //                       <line x1="12" y1="16" x2="12.01" y2="16"/>
// // //                     </svg>
// // //                     ❌ رمز عبور مطابقت ندارد
// // //                   </div>
// // //                 )}

// // //                 <div className="form-row">
// // //                   <div className={`input-group ${focusedField === 'nationalCode' ? 'focused' : ''}`}>
// // //                     <label>کد ملی *</label>
// // //                     <input 
// // //                       type="text" 
// // //                       name="nationalCode" 
// // //                       value={formData.nationalCode} 
// // //                       onChange={handleChange} 
// // //                       maxLength="10" 
// // //                       placeholder="1234567890" 
// // //                       disabled={loading}
// // //                       onFocus={() => setFocusedField('nationalCode')}
// // //                       onBlur={() => setFocusedField(null)}
// // //                     />
// // //                   </div>
// // //                   <div className={`input-group ${focusedField === 'agentCode' ? 'focused' : ''}`}>
// // //                     <label>کد مشاور املاک *</label>
// // //                     <input 
// // //                       type="text" 
// // //                       name="agentCode" 
// // //                       value={formData.agentCode} 
// // //                       onChange={handleChange} 
// // //                       placeholder="کد مشاور" 
// // //                       disabled={loading}
// // //                       onFocus={() => setFocusedField('agentCode')}
// // //                       onBlur={() => setFocusedField(null)}
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* بخش 2: اطلاعات آژانس */}
// // //               <div className="form-section" data-section="agency">
// // //                 <div className="section-title">
// // //                   <span>🏛️</span> اطلاعات آژانس و مجوزها
// // //                 </div>
// // //                 <div className="form-row">
// // //                   <div className={`input-group ${focusedField === 'province' ? 'focused' : ''}`}>
// // //                     <label>استان *</label>
// // //                     <select name="province" value={formData.province} onChange={handleChange} disabled={loading}>
// // //                       <option value="">انتخاب استان</option>
// // //                       {provinces.map(p => <option key={p} value={p}>{p}</option>)}
// // //                     </select>
// // //                   </div>
// // //                   <div className={`input-group ${focusedField === 'city' ? 'focused' : ''}`}>
// // //                     <label>شهر *</label>
// // //                     <select name="city" value={formData.city} onChange={handleChange} disabled={loading}>
// // //                       <option value="">انتخاب شهر</option>
// // //                       {formData.province && cities[formData.province]?.map(c => <option key={c} value={c}>{c}</option>)}
// // //                     </select>
// // //                   </div>
// // //                 </div>

// // //                 <div className={`input-group full-width ${focusedField === 'officeAddress' ? 'focused' : ''}`}>
// // //                   <label>آدرس دفتر *</label>
// // //                   <input 
// // //                     type="text" 
// // //                     name="officeAddress" 
// // //                     value={formData.officeAddress} 
// // //                     onChange={handleChange} 
// // //                     placeholder="آدرس کامل دفتر" 
// // //                     disabled={loading}
// // //                     onFocus={() => setFocusedField('officeAddress')}
// // //                     onBlur={() => setFocusedField(null)}
// // //                   />
// // //                 </div>

// // //                 <div className="form-row">
// // //                   <div className={`input-group ${focusedField === 'licenseNumber' ? 'focused' : ''}`}>
// // //                     <label>شماره پروانه *</label>
// // //                     <input 
// // //                       type="text" 
// // //                       name="licenseNumber" 
// // //                       value={formData.licenseNumber} 
// // //                       onChange={handleChange} 
// // //                       placeholder="شماره پروانه" 
// // //                       disabled={loading}
// // //                       onFocus={() => setFocusedField('licenseNumber')}
// // //                       onBlur={() => setFocusedField(null)}
// // //                     />
// // //                   </div>
// // //                   <div className={`input-group ${focusedField === 'licenseExpiryDate' ? 'focused' : ''}`}>
// // //                     <label>تاریخ اعتبار پروانه *</label>
// // //                     <input 
// // //                       type="date" 
// // //                       name="licenseExpiryDate" 
// // //                       value={formData.licenseExpiryDate} 
// // //                       onChange={handleChange} 
// // //                       disabled={loading}
// // //                       onFocus={() => setFocusedField('licenseExpiryDate')}
// // //                       onBlur={() => setFocusedField(null)}
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
// // //                   <div className="map-container">
// // //                     <NeshanMap 
// // //                       mapKey={mapKey} 
// // //                       center={{ latitude: mapCenter.lat, longitude: mapCenter.lng }} 
// // //                       zoom={14} 
// // //                       defaultType="dreamy" 
// // //                       style={{ height: '100%', width: '100%', borderRadius: '16px' }} 
// // //                       onInit={(map) => {
// // //                         mapRef.current = map;
// // //                         map.on('click', (e) => {
// // //                           if (loading) return;
// // //                           const wgs84 = webMercatorToWgs84(e.coordinate[0], e.coordinate[1]);
// // //                           updateLocation(wgs84.lat, wgs84.lng);
// // //                           reverseGeocode(wgs84.lat, wgs84.lng);
// // //                           toast.success('موقعیت ثبت شد');
// // //                         });
// // //                       }} 
// // //                     />
// // //                     <div className="map-marker">📍</div>
// // //                   </div>
// // //                   {locationSelected && (
// // //                     <div className="location-success slideDown">
// // //                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                         <polyline points="20 6 9 17 4 12"/>
// // //                       </svg>
// // //                       ✓ موقعیت ثبت شد | {formData.lat.toFixed(5)} , {formData.lng.toFixed(5)}
// // //                     </div>
// // //                   )}
// // //                 </div>
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
// // //                         <button type="button" onClick={(e) => { e.stopPropagation(); setNationalCardPreview(null); setFormData(prev => ({ ...prev, nationalCardImage: null })); }}>
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
// // //                         <button type="button" onClick={(e) => { e.stopPropagation(); setLicensePreview(null); setFormData(prev => ({ ...prev, licenseImage: null })); }}>
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
// // //                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="spinner">
// // //                       <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round"/>
// // //                     </svg>
// // //                     در حال ثبت نام...
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     🏢 ثبت نام آژانس
// // //                   </>
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

// // // RegisterAgency.jsx
// // import React, { useState, useRef, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import NeshanMap from "@neshan-maps-platform/react-openlayers";
// // import "@neshan-maps-platform/react-openlayers/dist/style.css";
// // import styles from './RegisterAgency.module.css';

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
  
// //   const [formData, setFormData] = useState({
// //     fullName: '', mobile: '', password: '', confirmPassword: '',
// //     nationalCode: '', agentCode: '', province: '', city: '',
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
// //   const [focusedField, setFocusedField] = useState(null);
  
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

// //   useEffect(() => {
// //     const observer = new IntersectionObserver((entries) => {
// //       entries.forEach(entry => {
// //         if (entry.isIntersecting) {
// //           entry.target.classList.add(styles.visible);
// //         }
// //       });
// //     }, { threshold: 0.1 });

// //     document.querySelectorAll(`.${styles.formSection}, .${styles.benefitItem}, .${styles.uploadBox}`).forEach(el => {
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

// //   const updateLocation = (lat, lng) => {
// //     setFormData(prev => ({ ...prev, lat, lng }));
// //     setMapCenter({ lat, lng });
// //     setLocationSelected(true);
    
// //     if (mapRef.current) {
// //       const view = mapRef.current.getView();
// //       const coords = wgs84ToWebMercator(lng, lat);
// //       view.setCenter([coords.x, coords.y]);
// //       view.setZoom(17);
// //     }
// //   };

// //   const reverseGeocode = async (lat, lng) => {
// //     try {
// //       const response = await fetch(`https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`, {
// //         headers: { 'Api-Key': mapKey }
// //       });
// //       const data = await response.json();
// //       if (data?.formatted_address) {
// //         setFormData(prev => ({ ...prev, officeAddress: data.formatted_address }));
// //       }
// //     } catch (error) {
// //       console.error('Error:', error);
// //     }
// //   };

// //   const searchAddressHandler = async () => {
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
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
    
// //     if (name === 'nationalCode' || name === 'mobile' || name === 'agentCode') {
// //       const numericValue = value.replace(/[^0-9]/g, '');
// //       const maxLen = name === 'nationalCode' ? 10 : name === 'mobile' ? 11 : 20;
// //       if (numericValue.length <= maxLen) {
// //         setFormData(prev => ({ ...prev, [name]: numericValue }));
// //       }
// //     } else {
// //       setFormData(prev => ({ ...prev, [name]: value }));
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

// //   const provinces = ['تهران', 'اصفهان', 'فارس', 'خراسان رضوی', 'آذربایجان شرقی', 'مازندران', 'گیلان', 'کرمان', 'خوزستان'];
// //   const cities = {
// //     'تهران': ['تهران', 'ری', 'شمیرانات', 'اسلامشهر', 'قدس', 'ملارد', 'ورامین'],
// //     'اصفهان': ['اصفهان', 'کاشان', 'خمینی‌شهر', 'نجف‌آباد', 'شاهین‌شهر', 'مبارکه'],
// //     'فارس': ['شیراز', 'مرودشت', 'کازرون', 'جهرم', 'فسا', 'لارستان'],
// //     'خراسان رضوی': ['مشهد', 'نیشابور', 'سبزوار', 'تربت حیدریه', 'قوچان', 'کاشمر'],
// //     'آذربایجان شرقی': ['تبریز', 'مراغه', 'مرند', 'میانه', 'اهر', 'بستان‌آباد'],
// //     'مازندران': ['ساری', 'بابلسر', 'آمل', 'بابل', 'قائم‌شهر', 'نور'],
// //     'گیلان': ['رشت', 'انزلی', 'لاهیجان', 'آستارا', 'تالش', 'رودسر'],
// //     'کرمان': ['کرمان', 'سیرجان', 'رفسنجان', 'بم', 'جیرفت', 'زرند'],
// //     'خوزستان': ['اهواز', 'آبادان', 'خرمشهر', 'دزفول', 'اندیمشک', 'شوشتر']
// //   };

// //   const scrollToSection = (section) => {
// //     setActiveSection(section);
// //     const element = document.querySelector(`[data-section="${section}"]`);
// //     if (element) {
// //       element.scrollIntoView({ behavior: 'smooth', block: 'center' });
// //     }
// //   };

// //   return (
// //     <div className={styles.agencyRegister}>
// //       <ToastContainer position="top-center" rtl={true} />
      
// //       <div className={styles.particles}>
// //         {[...Array(15)].map((_, i) => (
// //           <div key={i} className={styles.particle} style={{
// //             left: `${Math.random() * 100}%`,
// //             top: `${Math.random() * 100}%`,
// //             animationDelay: `${Math.random() * 15}s`,
// //             animationDuration: `${10 + Math.random() * 10}s`,
// //             width: `${2 + Math.random() * 4}px`,
// //             height: `${2 + Math.random() * 4}px`,
// //             background: `rgba(212, 175, 55, ${0.3 + Math.random() * 0.4})`
// //           }}></div>
// //         ))}
// //       </div>

// //       <div className={styles.registerContainer}>
// //         <div className={styles.registerSidebar}>
// //           <div className={styles.sidebarContent}>
// //             <div className={styles.sidebarHeader}>
// //               <div className={styles.sidebarIcon}>
// //                 <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
// //                   <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// //                   <path d="M5 10.5V16.5L12 21L19 16.5V10.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// //                   <path d="M12 15V21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
// //                 </svg>
// //               </div>
// //               <h2>عضویت آژانس املاک</h2>
// //               <p>اگر آژانس شما دارای جواز کسب معتبر است، برای عضویت لطفا فرم مقابل را تکمیل نمائید.</p>
// //             </div>

// //             <div className={styles.benefitsBox}>
// //               <h3>
// //                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginLeft: '8px' }}>
// //                   <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" fill="#d4af37" stroke="#d4af37" strokeWidth="1.5"/>
// //                 </svg>
// //                 مزایا همکاری با اوتاپ
// //               </h3>
// //               <div className={styles.benefitsList}>
// //                 {benefits.map((b, i) => (
// //                   <div key={i} className={styles.benefitItem} style={{ transitionDelay: `${i * 0.1}s` }}>
// //                     <span className={styles.benefitIcon} style={{ textShadow: `0 0 10px ${b.color}` }}>{b.icon}</span>
// //                     <div>
// //                       <strong style={{ color: b.color }}>{b.title}</strong>
// //                       <p>{b.desc}</p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             <div className={styles.infoBox}>
// //               <div className={styles.infoIcon}>
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

// //         <div className={styles.registerFormWrapper}>
// //           <div className={styles.registerForm}>
// //             <button className={styles.backBtn} onClick={handleBack}>
// //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                 <path d="M19 12H5M12 19L5 12L12 5" strokeLinecap="round" strokeLinejoin="round"/>
// //               </svg>
// //               بازگشت
// //             </button>

// //             <div className={styles.formProgress}>
// //               {['personal', 'agency', 'location', 'documents'].map((section, idx) => (
// //                 <div 
// //                   key={section} 
// //                   className={`${styles.progressStep} ${activeSection === section ? styles.active : ''}`}
// //                   onClick={() => scrollToSection(section)}
// //                 >
// //                   <div className={styles.stepNumber}>{idx + 1}</div>
// //                   <div className={styles.stepLabel}>
// //                     {section === 'personal' && 'اطلاعات شخصی'}
// //                     {section === 'agency' && 'اطلاعات آژانس'}
// //                     {section === 'location' && 'موقعیت مکانی'}
// //                     {section === 'documents' && 'مدارک'}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             <form onSubmit={handleSubmit}>
// //               <div className={styles.formSection} data-section="personal">
// //                 <div className={styles.sectionTitle}>
// //                   <span>👤</span> اطلاعات شخصی
// //                 </div>
// //                 <div className={styles.formRow}>
// //                   <div className={`${styles.inputGroup} ${focusedField === 'fullName' ? styles.focused : ''}`}>
// //                     <label>نام و نام خانوادگی *</label>
// //                     <input 
// //                       type="text" 
// //                       name="fullName" 
// //                       value={formData.fullName} 
// //                       onChange={handleChange} 
// //                       placeholder="علی محمدی" 
// //                       disabled={loading}
// //                       onFocus={() => setFocusedField('fullName')}
// //                       onBlur={() => setFocusedField(null)}
// //                     />
// //                   </div>
// //                   <div className={`${styles.inputGroup} ${focusedField === 'mobile' ? styles.focused : ''}`}>
// //                     <label>شماره موبایل *</label>
// //                     <input 
// //                       type="tel" 
// //                       name="mobile" 
// //                       value={formData.mobile} 
// //                       onChange={handleChange} 
// //                       placeholder="09123456789" 
// //                       disabled={loading}
// //                       onFocus={() => setFocusedField('mobile')}
// //                       onBlur={() => setFocusedField(null)}
// //                     />
// //                   </div>
// //                 </div>

// //                 <div className={styles.formRow}>
// //                   <div className={`${styles.inputGroup} ${focusedField === 'password' ? styles.focused : ''}`}>
// //                     <label>رمز عبور *</label>
// //                     <div className={styles.passwordBox}>
// //                       <input 
// //                         type={showPassword ? "text" : "password"} 
// //                         name="password" 
// //                         value={formData.password} 
// //                         onChange={handleChange} 
// //                         placeholder="حداقل 6 کاراکتر" 
// //                         disabled={loading}
// //                         onFocus={() => setFocusedField('password')}
// //                         onBlur={() => setFocusedField(null)}
// //                       />
// //                       <button type="button" onClick={() => setShowPassword(!showPassword)}>
// //                         {showPassword ? '🙈' : '👁️'}
// //                       </button>
// //                     </div>
// //                   </div>
// //                   <div className={`${styles.inputGroup} ${focusedField === 'confirmPassword' ? styles.focused : ''}`}>
// //                     <label>تکرار رمز عبور *</label>
// //                     <div className={styles.passwordBox}>
// //                       <input 
// //                         type={showConfirmPassword ? "text" : "password"} 
// //                         name="confirmPassword" 
// //                         value={formData.confirmPassword} 
// //                         onChange={handleChange} 
// //                         placeholder="تکرار رمز عبور" 
// //                         disabled={loading}
// //                         onFocus={() => setFocusedField('confirmPassword')}
// //                         onBlur={() => setFocusedField(null)}
// //                       />
// //                       <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
// //                         {showConfirmPassword ? '🙈' : '👁️'}
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 {formData.confirmPassword && formData.password !== formData.confirmPassword && (
// //                   <div className={styles.errorMsg}>
// //                     ❌ رمز عبور مطابقت ندارد
// //                   </div>
// //                 )}

// //                 <div className={styles.formRow}>
// //                   <div className={`${styles.inputGroup} ${focusedField === 'nationalCode' ? styles.focused : ''}`}>
// //                     <label>کد ملی *</label>
// //                     <input 
// //                       type="text" 
// //                       name="nationalCode" 
// //                       value={formData.nationalCode} 
// //                       onChange={handleChange} 
// //                       maxLength="10" 
// //                       placeholder="1234567890" 
// //                       disabled={loading}
// //                       onFocus={() => setFocusedField('nationalCode')}
// //                       onBlur={() => setFocusedField(null)}
// //                     />
// //                   </div>
// //                   <div className={`${styles.inputGroup} ${focusedField === 'agentCode' ? styles.focused : ''}`}>
// //                     <label>کد مشاور املاک *</label>
// //                     <input 
// //                       type="text" 
// //                       name="agentCode" 
// //                       value={formData.agentCode} 
// //                       onChange={handleChange} 
// //                       placeholder="کد مشاور" 
// //                       disabled={loading}
// //                       onFocus={() => setFocusedField('agentCode')}
// //                       onBlur={() => setFocusedField(null)}
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className={styles.formSection} data-section="agency">
// //                 <div className={styles.sectionTitle}>
// //                   <span>🏛️</span> اطلاعات آژانس و مجوزها
// //                 </div>
// //                 <div className={styles.formRow}>
// //                   <div className={`${styles.inputGroup} ${focusedField === 'province' ? styles.focused : ''}`}>
// //                     <label>استان *</label>
// //                     <select name="province" value={formData.province} onChange={handleChange} disabled={loading}>
// //                       <option value="">انتخاب استان</option>
// //                       {provinces.map(p => <option key={p} value={p}>{p}</option>)}
// //                     </select>
// //                   </div>
// //                   <div className={`${styles.inputGroup} ${focusedField === 'city' ? styles.focused : ''}`}>
// //                     <label>شهر *</label>
// //                     <select name="city" value={formData.city} onChange={handleChange} disabled={loading}>
// //                       <option value="">انتخاب شهر</option>
// //                       {formData.province && cities[formData.province]?.map(c => <option key={c} value={c}>{c}</option>)}
// //                     </select>
// //                   </div>
// //                 </div>

// //                 <div className={`${styles.inputGroup} ${styles.fullWidth} ${focusedField === 'officeAddress' ? styles.focused : ''}`}>
// //                   <label>آدرس دفتر *</label>
// //                   <input 
// //                     type="text" 
// //                     name="officeAddress" 
// //                     value={formData.officeAddress} 
// //                     onChange={handleChange} 
// //                     placeholder="آدرس کامل دفتر" 
// //                     disabled={loading}
// //                     onFocus={() => setFocusedField('officeAddress')}
// //                     onBlur={() => setFocusedField(null)}
// //                   />
// //                 </div>

// //                 <div className={styles.formRow}>
// //                   <div className={`${styles.inputGroup} ${focusedField === 'licenseNumber' ? styles.focused : ''}`}>
// //                     <label>شماره پروانه *</label>
// //                     <input 
// //                       type="text" 
// //                       name="licenseNumber" 
// //                       value={formData.licenseNumber} 
// //                       onChange={handleChange} 
// //                       placeholder="شماره پروانه" 
// //                       disabled={loading}
// //                       onFocus={() => setFocusedField('licenseNumber')}
// //                       onBlur={() => setFocusedField(null)}
// //                     />
// //                   </div>
// //                   <div className={`${styles.inputGroup} ${focusedField === 'licenseExpiryDate' ? styles.focused : ''}`}>
// //                     <label>تاریخ اعتبار پروانه *</label>
// //                     <input 
// //                       type="date" 
// //                       name="licenseExpiryDate" 
// //                       value={formData.licenseExpiryDate} 
// //                       onChange={handleChange} 
// //                       disabled={loading}
// //                       onFocus={() => setFocusedField('licenseExpiryDate')}
// //                       onBlur={() => setFocusedField(null)}
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className={styles.formSection} data-section="location">
// //                 <div className={styles.sectionTitle}>
// //                   <span>🗺️</span> موقعیت دفتر روی نقشه
// //                 </div>
// //                 <div className={styles.searchBox}>
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

// //                 <div className={styles.mapWrapper}>
// //                   <div className={styles.mapContainer}>
// //                     <NeshanMap 
// //                       mapKey={mapKey} 
// //                       center={{ latitude: mapCenter.lat, longitude: mapCenter.lng }} 
// //                       zoom={14} 
// //                       defaultType="dreamy" 
// //                       style={{ height: '100%', width: '100%', borderRadius: '16px' }} 
// //                       onInit={(map) => {
// //                         mapRef.current = map;
// //                         map.on('click', (e) => {
// //                           if (loading) return;
// //                           const wgs84 = webMercatorToWgs84(e.coordinate[0], e.coordinate[1]);
// //                           updateLocation(wgs84.lat, wgs84.lng);
// //                           reverseGeocode(wgs84.lat, wgs84.lng);
// //                           toast.success('موقعیت ثبت شد');
// //                         });
// //                       }} 
// //                     />
// //                     <div className={styles.mapMarker}>📍</div>
// //                   </div>
// //                   {locationSelected && (
// //                     <div className={styles.locationSuccess}>
// //                       ✓ موقعیت ثبت شد | {formData.lat.toFixed(5)} , {formData.lng.toFixed(5)}
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               <div className={styles.formSection} data-section="documents">
// //                 <div className={styles.sectionTitle}>
// //                   <span>📎</span> آپلود مدارک
// //                 </div>
// //                 <div className={styles.uploadRow}>
// //                   <div className={styles.uploadBox} onClick={() => nationalCardRef.current?.click()}>
// //                     <input type="file" ref={nationalCardRef} onChange={(e) => handleImageChange(e, 'national')} accept="image/*" hidden />
// //                     {nationalCardPreview ? (
// //                       <div className={styles.preview}>
// //                         <img src={nationalCardPreview} alt="کارت ملی" />
// //                         <button type="button" onClick={(e) => { e.stopPropagation(); setNationalCardPreview(null); setFormData(prev => ({ ...prev, nationalCardImage: null })); }}>
// //                           ✗
// //                         </button>
// //                       </div>
// //                     ) : (
// //                       <>
// //                         <div className={styles.uploadIcon}>🪪</div>
// //                         <p>تصویر کارت ملی</p>
// //                         <small>jpg, png (حداکثر 2MB)</small>
// //                       </>
// //                     )}
// //                   </div>
// //                   <div className={styles.uploadBox} onClick={() => licenseRef.current?.click()}>
// //                     <input type="file" ref={licenseRef} onChange={(e) => handleImageChange(e, 'license')} accept="image/*" hidden />
// //                     {licensePreview ? (
// //                       <div className={styles.preview}>
// //                         <img src={licensePreview} alt="پروانه" />
// //                         <button type="button" onClick={(e) => { e.stopPropagation(); setLicensePreview(null); setFormData(prev => ({ ...prev, licenseImage: null })); }}>
// //                           ✗
// //                         </button>
// //                       </div>
// //                     ) : (
// //                       <>
// //                         <div className={styles.uploadIcon}>📄</div>
// //                         <p>تصویر پروانه کسب</p>
// //                         <small>jpg, png (حداکثر 2MB)</small>
// //                       </>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>

// //               <label className={styles.checkbox}>
// //                 <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
// //                 <span className={styles.checkmark}></span>
// //                 قوانین و مقررات سایت اوتاپ را مطالعه کرده و می‌پذیرم
// //               </label>

// //               <button type="submit" disabled={loading} className={styles.submitBtn}>
// //                 {loading ? (
// //                   <>
// //                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.spinner}>
// //                       <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round"/>
// //                     </svg>
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

// // RegisterAgency.jsx - نسخه اصلاح شده
// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // برای جلوگیری از خطای نقشه، این رو کامنت می‌کنیم تا مطمئن بشیم فرم حداقل نمایش داده بشه
// // import NeshanMap from "@neshan-maps-platform/react-openlayers";
// // import "@neshan-maps-platform/react-openlayers/dist/style.css";

// const RegisterAgency = () => {
//   const mapRef = useRef(null);
  
//   const [formData, setFormData] = useState({
//     fullName: '', mobile: '', password: '', confirmPassword: '',
//     nationalCode: '', agentCode: '', province: '', city: '',
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
//   const [mapCenter] = useState({ lat: 35.699739, lng: 51.338097 });
//   const [searchAddress, setSearchAddress] = useState('');
//   const [searching, setSearching] = useState(false);
//   const [activeSection, setActiveSection] = useState('personal');
//   const [focusedField, setFocusedField] = useState(null);
  
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

//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.style.opacity = '1';
//           entry.target.style.transform = 'translateY(0)';
//         }
//       });
//     }, { threshold: 0.1 });

//     document.querySelectorAll('.form-section, .benefit-item, .upload-box').forEach(el => {
//       el.style.opacity = '0';
//       el.style.transform = 'translateY(20px)';
//       el.style.transition = 'all 0.6s ease-out';
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

//   const updateLocation = (lat, lng) => {
//     setFormData(prev => ({ ...prev, lat, lng }));
//     setLocationSelected(true);
//     toast.success('موقعیت ثبت شد');
//   };

//   const searchAddressHandler = async () => {
//     if (!searchAddress.trim()) {
//       toast.warning('لطفاً آدرس را وارد کنید');
//       return;
//     }
    
//     setSearching(true);
//     try {
//       // شبیه‌سازی جستجو
//       setTimeout(() => {
//         setSearching(false);
//         toast.info('امکان جستجوی آدرس فعلاً غیرفعال است');
//       }, 1000);
//     } catch (error) {
//       toast.error('خطا در جستجو');
//       setSearching(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === 'nationalCode' || name === 'mobile' || name === 'agentCode') {
//       const numericValue = value.replace(/[^0-9]/g, '');
//       const maxLen = name === 'nationalCode' ? 10 : name === 'mobile' ? 11 : 20;
//       if (numericValue.length <= maxLen) {
//         setFormData(prev => ({ ...prev, [name]: numericValue }));
//       }
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
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

//   const provinces = ['تهران', 'اصفهان', 'فارس', 'خراسان رضوی', 'آذربایجان شرقی', 'مازندران', 'گیلان', 'کرمان', 'خوزستان'];
//   const cities = {
//     'تهران': ['تهران', 'ری', 'شمیرانات', 'اسلامشهر', 'قدس', 'ملارد', 'ورامین'],
//     'اصفهان': ['اصفهان', 'کاشان', 'خمینی‌شهر', 'نجف‌آباد', 'شاهین‌شهر', 'مبارکه'],
//     'فارس': ['شیراز', 'مرودشت', 'کازرون', 'جهرم', 'فسا', 'لارستان'],
//     'خراسان رضوی': ['مشهد', 'نیشابور', 'سبزوار', 'تربت حیدریه', 'قوچان', 'کاشمر'],
//     'آذربایجان شرقی': ['تبریز', 'مراغه', 'مرند', 'میانه', 'اهر', 'بستان‌آباد'],
//     'مازندران': ['ساری', 'بابلسر', 'آمل', 'بابل', 'قائم‌شهر', 'نور'],
//     'گیلان': ['رشت', 'انزلی', 'لاهیجان', 'آستارا', 'تالش', 'رودسر'],
//     'کرمان': ['کرمان', 'سیرجان', 'رفسنجان', 'بم', 'جیرفت', 'زرند'],
//     'خوزستان': ['اهواز', 'آبادان', 'خرمشهر', 'دزفول', 'اندیمشک', 'شوشتر']
//   };

//   const scrollToSection = (section) => {
//     setActiveSection(section);
//     const element = document.querySelector(`[data-section="${section}"]`);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   };

//   // استایل‌های داخلی برای اطمینان از نمایش فرم
//   const styles = {
//     container: {
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #0f0c0c 0%, #1a0f0f 50%, #0f0c0c 100%)',
//       direction: 'rtl',
//       fontFamily: "'Inter', 'Vazirmatn', sans-serif",
//       padding: '2rem',
//     },
//     mainContainer: {
//       maxWidth: '1400px',
//       margin: '0 auto',
//       display: 'flex',
//       gap: '2rem',
//     },
//     sidebar: {
//       flex: '0 0 380px',
//       background: 'linear-gradient(135deg, rgba(30, 20, 20, 0.95), rgba(20, 10, 10, 0.95))',
//       borderRadius: '32px',
//       padding: '2rem',
//       border: '1px solid rgba(212, 175, 55, 0.2)',
//     },
//     formWrapper: {
//       flex: 1,
//       background: 'white',
//       borderRadius: '32px',
//       padding: '2rem',
//       maxHeight: '85vh',
//       overflowY: 'auto',
//     },
//     sectionTitle: {
//       fontSize: '1.125rem',
//       fontWeight: '700',
//       color: '#1f2937',
//       marginBottom: '1.25rem',
//       paddingRight: '0.75rem',
//       borderRight: '4px solid #d4af37',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//     },
//     formRow: {
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr',
//       gap: '1rem',
//       marginBottom: '1rem',
//     },
//     inputGroup: {
//       marginBottom: '1rem',
//     },
//     label: {
//       display: 'block',
//       fontSize: '0.75rem',
//       fontWeight: '600',
//       color: '#374151',
//       marginBottom: '0.5rem',
//     },
//     input: {
//       width: '100%',
//       padding: '0.75rem',
//       border: '2px solid #e5e7eb',
//       borderRadius: '12px',
//       fontSize: '0.875rem',
//       fontFamily: 'inherit',
//     },
//     select: {
//       width: '100%',
//       padding: '0.75rem',
//       border: '2px solid #e5e7eb',
//       borderRadius: '12px',
//       fontSize: '0.875rem',
//       fontFamily: 'inherit',
//       background: 'white',
//     },
//     passwordBox: {
//       position: 'relative',
//     },
//     passwordInput: {
//       width: '100%',
//       padding: '0.75rem',
//       paddingLeft: '2.5rem',
//       border: '2px solid #e5e7eb',
//       borderRadius: '12px',
//       fontSize: '0.875rem',
//       fontFamily: 'inherit',
//     },
//     eyeButton: {
//       position: 'absolute',
//       left: '0.75rem',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       background: 'none',
//       border: 'none',
//       cursor: 'pointer',
//       fontSize: '1rem',
//     },
//     uploadRow: {
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr',
//       gap: '1rem',
//     },
//     uploadBox: {
//       background: '#f9fafb',
//       border: '2px dashed #e5e7eb',
//       borderRadius: '16px',
//       padding: '1.5rem',
//       textAlign: 'center',
//       cursor: 'pointer',
//     },
//     preview: {
//       position: 'relative',
//     },
//     previewImg: {
//       width: '100%',
//       maxHeight: '150px',
//       objectFit: 'cover',
//       borderRadius: '12px',
//     },
//     removeBtn: {
//       position: 'absolute',
//       top: '-8px',
//       left: '-8px',
//       width: '24px',
//       height: '24px',
//       background: '#dc2626',
//       color: 'white',
//       border: 'none',
//       borderRadius: '50%',
//       cursor: 'pointer',
//     },
//     submitBtn: {
//       width: '100%',
//       padding: '1rem',
//       background: 'linear-gradient(135deg, #7d0000, #5c0000)',
//       color: 'white',
//       border: 'none',
//       borderRadius: '16px',
//       fontSize: '1rem',
//       fontWeight: '700',
//       cursor: 'pointer',
//       marginTop: '1rem',
//     },
//     backBtn: {
//       background: 'none',
//       border: 'none',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       color: '#7d0000',
//       fontSize: '0.875rem',
//       fontWeight: '500',
//       cursor: 'pointer',
//       padding: '0.5rem 1rem',
//       marginBottom: '1rem',
//       borderRadius: '12px',
//     },
//     checkbox: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       cursor: 'pointer',
//       margin: '1rem 0',
//       fontSize: '0.75rem',
//       color: '#374151',
//     },
//     mapPlaceholder: {
//       height: '300px',
//       background: '#f0f0f0',
//       borderRadius: '16px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       flexDirection: 'column',
//       gap: '1rem',
//       border: '2px solid #e5e7eb',
//     },
//     progressStep: {
//       flex: 1,
//       textAlign: 'center',
//       cursor: 'pointer',
//     },
//     formProgress: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       marginBottom: '2rem',
//       padding: '1rem 0',
//       borderBottom: '2px solid #f0f0f0',
//     },
//     stepNumber: {
//       width: '36px',
//       height: '36px',
//       background: '#e5e7eb',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       margin: '0 auto 0.5rem',
//       fontWeight: '700',
//       color: '#6b7280',
//     },
//     stepNumberActive: {
//       background: '#7d0000',
//       color: 'white',
//     },
//     stepLabel: {
//       fontSize: '0.75rem',
//       color: '#6b7280',
//       fontWeight: '500',
//     },
//     stepLabelActive: {
//       color: '#7d0000',
//       fontWeight: '700',
//     },
//     errorMsg: {
//       background: '#fee2e2',
//       color: '#dc2626',
//       padding: '0.5rem 0.75rem',
//       borderRadius: '10px',
//       fontSize: '0.75rem',
//       marginTop: '-0.5rem',
//       marginBottom: '0.5rem',
//     },
//     locationSuccess: {
//       marginTop: '0.75rem',
//       padding: '0.5rem 0.75rem',
//       background: '#10b981',
//       color: 'white',
//       borderRadius: '10px',
//       fontSize: '0.75rem',
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <ToastContainer position="top-center" rtl={true} />
      
//       <div style={styles.mainContainer}>
//         {/* سایدبار راست */}
//         <div style={styles.sidebar}>
//           <div style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '1.5rem' }}>
//             <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #7d0000, #3a0000)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
//               <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
//                 <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M5 10.5V16.5L12 21L19 16.5V10.5" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M12 15V21" stroke="#d4af37" strokeWidth="2" strokeLinecap="round"/>
//               </svg>
//             </div>
//             <h2 style={{ color: '#d4af37', fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>عضویت آژانس املاک</h2>
//             <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>اگر آژانس شما دارای جواز کسب معتبر است، برای عضویت لطفا فرم مقابل را تکمیل نمائید.</p>
//           </div>

//           <div style={{ marginBottom: '2rem' }}>
//             <h3 style={{ color: 'white', fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginLeft: '8px' }}>
//                 <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" fill="#d4af37" stroke="#d4af37" strokeWidth="1.5"/>
//               </svg>
//               مزایا همکاری با اوتاپ
//             </h3>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//               {benefits.map((b, i) => (
//                 <div key={i} className="benefit-item" style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
//                   <span style={{ fontSize: '1.75rem' }}>{b.icon}</span>
//                   <div>
//                     <strong style={{ color: b.color }}>{b.title}</strong>
//                     <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>{b.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div style={{ background: 'rgba(125,0,0,0.15)', borderRadius: '20px', padding: '1.25rem', border: '1px solid rgba(212,175,55,0.15)' }}>
//             <h4 style={{ color: '#d4af37', fontSize: '0.875rem', marginBottom: '0.75rem' }}>توجه مهم</h4>
//             <ul style={{ listStyle: 'none', padding: 0 }}>
//               <li style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>✓ پس از تایید جواز کسب، پنل اختصاصی برای شما ایجاد می‌شود</li>
//               <li style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>✓ اطلاعات کاربری از طریق پیامک ارسال خواهد شد</li>
//               <li style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', padding: '0.5rem 0' }}>✓ آگهی‌ها با نام و لوگوی آژانس شما نمایش داده می‌شود</li>
//             </ul>
//           </div>
//         </div>

//         {/* فرم اصلی */}
//         <div style={styles.formWrapper}>
//           <button style={styles.backBtn} onClick={handleBack}>
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M19 12H5M12 19L5 12L12 5" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//             بازگشت
//           </button>

//           <div style={styles.formProgress}>
//             {['personal', 'agency', 'location', 'documents'].map((section, idx) => (
//               <div key={section} style={styles.progressStep} onClick={() => scrollToSection(section)}>
//                 <div style={{ ...styles.stepNumber, ...(activeSection === section ? styles.stepNumberActive : {}) }}>{idx + 1}</div>
//                 <div style={{ ...styles.stepLabel, ...(activeSection === section ? styles.stepLabelActive : {}) }}>
//                   {section === 'personal' && 'اطلاعات شخصی'}
//                   {section === 'agency' && 'اطلاعات آژانس'}
//                   {section === 'location' && 'موقعیت مکانی'}
//                   {section === 'documents' && 'مدارک'}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <form onSubmit={handleSubmit}>
//             {/* بخش 1: اطلاعات شخصی */}
//             <div className="form-section" data-section="personal" style={{ marginBottom: '2.5rem' }}>
//               <div style={styles.sectionTitle}>
//                 <span>👤</span> اطلاعات شخصی
//               </div>
//               <div style={styles.formRow}>
//                 <div style={styles.inputGroup}>
//                   <label style={styles.label}>نام و نام خانوادگی *</label>
//                   <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="علی محمدی" disabled={loading} style={styles.input} />
//                 </div>
//                 <div style={styles.inputGroup}>
//                   <label style={styles.label}>شماره موبایل *</label>
//                   <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="09123456789" disabled={loading} style={styles.input} />
//                 </div>
//               </div>

//               <div style={styles.formRow}>
//                 <div style={styles.inputGroup}>
//                   <label style={styles.label}>رمز عبور *</label>
//                   <div style={styles.passwordBox}>
//                     <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="حداقل 6 کاراکتر" disabled={loading} style={styles.passwordInput} />
//                     <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeButton}>{showPassword ? '🙈' : '👁️'}</button>
//                   </div>
//                 </div>
//                 <div style={styles.inputGroup}>
//                   <label style={styles.label}>تکرار رمز عبور *</label>
//                   <div style={styles.passwordBox}>
//                     <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="تکرار رمز عبور" disabled={loading} style={styles.passwordInput} />
//                     <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeButton}>{showConfirmPassword ? '🙈' : '👁️'}</button>
//                   </div>
//                 </div>
//               </div>
//               {formData.confirmPassword && formData.password !== formData.confirmPassword && (
//                 <div style={styles.errorMsg}>❌ رمز عبور مطابقت ندارد</div>
//               )}

//               <div style={styles.formRow}>
//                 <div style={styles.inputGroup}>
//                   <label style={styles.label}>کد ملی *</label>
//                   <input type="text" name="nationalCode" value={formData.nationalCode} onChange={handleChange} maxLength="10" placeholder="1234567890" disabled={loading} style={styles.input} />
//                 </div>
//                 <div style={styles.inputGroup}>
//                   <label style={styles.label}>کد مشاور املاک *</label>
//                   <input type="text" name="agentCode" value={formData.agentCode} onChange={handleChange} placeholder="کد مشاور" disabled={loading} style={styles.input} />
//                 </div>
//               </div>
//             </div>

//             {/* بخش 2: اطلاعات آژانس */}
//             <div className="form-section" data-section="agency" style={{ marginBottom: '2.5rem' }}>
//               <div style={styles.sectionTitle}>
//                 <span>🏛️</span> اطلاعات آژانس و مجوزها
//               </div>
//               <div style={styles.formRow}>
//                 <div style={styles.inputGroup}>
//                   <label style={styles.label}>استان *</label>
//                   <select name="province" value={formData.province} onChange={handleChange} disabled={loading} style={styles.select}>
//                     <option value="">انتخاب استان</option>
//                     {provinces.map(p => <option key={p} value={p}>{p}</option>)}
//                   </select>
//                 </div>
//                 <div style={styles.inputGroup}>
//                   <label style={styles.label}>شهر *</label>
//                   <select name="city" value={formData.city} onChange={handleChange} disabled={loading} style={styles.select}>
//                     <option value="">انتخاب شهر</option>
//                     {formData.province && cities[formData.province]?.map(c => <option key={c} value={c}>{c}</option>)}
//                   </select>
//                 </div>
//               </div>

//               <div style={styles.inputGroup}>
//                 <label style={styles.label}>آدرس دفتر *</label>
//                 <input type="text" name="officeAddress" value={formData.officeAddress} onChange={handleChange} placeholder="آدرس کامل دفتر" disabled={loading} style={styles.input} />
//               </div>

//               <div style={styles.formRow}>
//                 <div style={styles.inputGroup}>
//                   <label style={styles.label}>شماره پروانه *</label>
//                   <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} placeholder="شماره پروانه" disabled={loading} style={styles.input} />
//                 </div>
//                 <div style={styles.inputGroup}>
//                   <label style={styles.label}>تاریخ اعتبار پروانه *</label>
//                   <input type="date" name="licenseExpiryDate" value={formData.licenseExpiryDate} onChange={handleChange} disabled={loading} style={styles.input} />
//                 </div>
//               </div>
//             </div>

//             {/* بخش 3: موقعیت مکانی */}
//             <div className="form-section" data-section="location" style={{ marginBottom: '2.5rem' }}>
//               <div style={styles.sectionTitle}>
//                 <span>🗺️</span> موقعیت دفتر روی نقشه
//               </div>
//               <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
//                 <input type="text" value={searchAddress} onChange={(e) => setSearchAddress(e.target.value)} placeholder="جستجوی آدرس روی نقشه..." style={{ flex: 1, padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '12px' }} />
//                 <button type="button" onClick={searchAddressHandler} disabled={searching} style={{ padding: '0.75rem 1.5rem', background: '#7d0000', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>{searching ? 'جستجو...' : '🔍 جستجو'}</button>
//               </div>

//               <div style={styles.mapPlaceholder}>
//                 <div style={{ fontSize: '3rem' }}>🗺️</div>
//                 <p style={{ color: '#666' }}>نقشه به زودی اضافه می‌شود</p>
//                 <button type="button" onClick={() => { updateLocation(35.699739, 51.338097); toast.success('موقعیت آزمایشی ثبت شد'); }} style={{ padding: '0.5rem 1rem', background: '#7d0000', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>انتخاب موقعیت آزمایشی</button>
//               </div>
              
//               {locationSelected && (
//                 <div style={styles.locationSuccess}>✓ موقعیت ثبت شد | {formData.lat.toFixed(5)} , {formData.lng.toFixed(5)}</div>
//               )}
//             </div>

//             {/* بخش 4: مدارک */}
//             <div className="form-section" data-section="documents" style={{ marginBottom: '2.5rem' }}>
//               <div style={styles.sectionTitle}>
//                 <span>📎</span> آپلود مدارک
//               </div>
//               <div style={styles.uploadRow}>
//                 <div style={styles.uploadBox} onClick={() => nationalCardRef.current?.click()}>
//                   <input type="file" ref={nationalCardRef} onChange={(e) => handleImageChange(e, 'national')} accept="image/*" hidden />
//                   {nationalCardPreview ? (
//                     <div style={styles.preview}>
//                       <img src={nationalCardPreview} alt="کارت ملی" style={styles.previewImg} />
//                       <button type="button" style={styles.removeBtn} onClick={(e) => { e.stopPropagation(); setNationalCardPreview(null); setFormData(prev => ({ ...prev, nationalCardImage: null })); }}>✗</button>
//                     </div>
//                   ) : (
//                     <>
//                       <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🪪</div>
//                       <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>تصویر کارت ملی</p>
//                       <small style={{ fontSize: '0.625rem', color: '#6b7280' }}>jpg, png (حداکثر 2MB)</small>
//                     </>
//                   )}
//                 </div>
//                 <div style={styles.uploadBox} onClick={() => licenseRef.current?.click()}>
//                   <input type="file" ref={licenseRef} onChange={(e) => handleImageChange(e, 'license')} accept="image/*" hidden />
//                   {licensePreview ? (
//                     <div style={styles.preview}>
//                       <img src={licensePreview} alt="پروانه" style={styles.previewImg} />
//                       <button type="button" style={styles.removeBtn} onClick={(e) => { e.stopPropagation(); setLicensePreview(null); setFormData(prev => ({ ...prev, licenseImage: null })); }}>✗</button>
//                     </div>
//                   ) : (
//                     <>
//                       <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
//                       <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>تصویر پروانه کسب</p>
//                       <small style={{ fontSize: '0.625rem', color: '#6b7280' }}>jpg, png (حداکثر 2MB)</small>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <label style={styles.checkbox}>
//               <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} style={{ marginLeft: '0.5rem' }} />
//               قوانین و مقررات سایت اوتاپ را مطالعه کرده و می‌پذیرم
//             </label>

//             <button type="submit" disabled={loading} style={styles.submitBtn}>
//               {loading ? 'در حال ثبت نام...' : '🏢 ثبت نام آژانس'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterAgency;
// RegisterAgency.jsx
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

const RegisterAgency = () => {
  const mapRef = useRef(null);
  const [mapKey] = useState("web.31c5ea6c425e40cc9b30620a84a8be90");
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '', mobile: '', password: '', confirmPassword: '',
    nationalCode: '', agentCode: '', province: '', city: '',
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

  // لود کردن اسکریپت نقشه
  useEffect(() => {
    const loadNeshanMap = () => {
      return new Promise((resolve) => {
        if (document.querySelector('script[src*="neshan"]')) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://static.neshan.org/api/openlayers/4.6.5/ol.js';
        script.onload = () => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://static.neshan.org/api/openlayers/4.6.5/ol.css';
          document.head.appendChild(link);
          resolve();
        };
        document.head.appendChild(script);
      });
    };

    loadNeshanMap().then(() => {
      setMapLoaded(true);
    });
  }, []);

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
        setFormData(prev => ({ ...prev, officeAddress: data.formatted_address }));
      }
    } catch (error) {
      console.error('خطا در تبدیل معکوس:', error);
    }
  }, [mapKey]);

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
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
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

  const provinces = ['تهران', 'اصفهان', 'فارس', 'خراسان رضوی', 'آذربایجان شرقی', 'مازندران', 'گیلان', 'کرمان', 'خوزستان'];
  const cities = {
    'تهران': ['تهران', 'ری', 'شمیرانات', 'اسلامشهر', 'قدس', 'ملارد', 'ورامین'],
    'اصفهان': ['اصفهان', 'کاشان', 'خمینی‌شهر', 'نجف‌آباد', 'شاهین‌شهر', 'مبارکه'],
    'فارس': ['شیراز', 'مرودشت', 'کازرون', 'جهرم', 'فسا', 'لارستان'],
    'خراسان رضوی': ['مشهد', 'نیشابور', 'سبزوار', 'تربت حیدریه', 'قوچان', 'کاشمر'],
    'آذربایجان شرقی': ['تبریز', 'مراغه', 'مرند', 'میانه', 'اهر', 'بستان‌آباد'],
    'مازندران': ['ساری', 'بابلسر', 'آمل', 'بابل', 'قائم‌شهر', 'نور'],
    'گیلان': ['رشت', 'انزلی', 'لاهیجان', 'آستارا', 'تالش', 'رودسر'],
    'کرمان': ['کرمان', 'سیرجان', 'رفسنجان', 'بم', 'جیرفت', 'زرند'],
    'خوزستان': ['اهواز', 'آبادان', 'خرمشهر', 'دزفول', 'اندیمشک', 'شوشتر']
  };

  const scrollToSection = (section) => {
    setActiveSection(section);
    const element = document.querySelector(`[data-section="${section}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // رندر نقشه
  const renderMap = () => {
    if (!mapLoaded) {
      return (
        <div className="map-loading">
          <div className="loading-spinner"></div>
          <p>در حال بارگذاری نقشه...</p>
        </div>
      );
    }

    // بررسی وجود کتابخانه OpenLayers
    if (typeof window.ol === 'undefined') {
      return (
        <div className="map-loading">
          <p>در حال بارگذاری نقشه...</p>
        </div>
      );
    }

    return (
      <div id="neshan-map" className="neshan-map-container"></div>
    );
  };

  // مقداردهی اولیه نقشه بعد از لود DOM
  useEffect(() => {
    if (mapLoaded && typeof window.ol !== 'undefined' && !mapRef.current) {
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
    }
  }, [mapLoaded, mapCenter, mapKey, updateLocation, reverseGeocode, loading]);

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
              {['personal', 'agency', 'location', 'documents'].map((section, idx) => (
                <div 
                  key={section} 
                  className={`progress-step ${activeSection === section ? 'active' : ''}`}
                  onClick={() => scrollToSection(section)}
                >
                  <div className="step-number">{idx + 1}</div>
                  <div className="step-label">
                    {section === 'personal' && 'اطلاعات شخصی'}
                    {section === 'agency' && 'اطلاعات آژانس'}
                    {section === 'location' && 'موقعیت مکانی'}
                    {section === 'documents' && 'مدارک'}
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
                    <input 
                      type="text" 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleChange} 
                      placeholder="علی محمدی" 
                      disabled={loading}
                    />
                  </div>
                  <div className="input-group">
                    <label>شماره موبایل *</label>
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
                      <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? '🙈' : '👁️'}
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
                      <button type="button" className="eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? '🙈' : '👁️'}
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
                    <input 
                      type="text" 
                      name="nationalCode" 
                      value={formData.nationalCode} 
                      onChange={handleChange} 
                      maxLength="10" 
                      placeholder="1234567890" 
                      disabled={loading}
                    />
                  </div>
                  <div className="input-group">
                    <label>کد مشاور املاک *</label>
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

              {/* بخش 2: اطلاعات آژانس */}
              <div className="form-section" data-section="agency">
                <div className="section-title">
                  <span>🏛️</span> اطلاعات آژانس و مجوزها
                </div>
                <div className="form-row">
                  <div className="input-group">
                    <label>استان *</label>
                    <select name="province" value={formData.province} onChange={handleChange} disabled={loading}>
                      <option value="">انتخاب استان</option>
                      {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="input-group">
                    <label>شهر *</label>
                    <select name="city" value={formData.city} onChange={handleChange} disabled={loading}>
                      <option value="">انتخاب شهر</option>
                      {formData.province && cities[formData.province]?.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="input-group full-width">
                  <label>آدرس دفتر *</label>
                  <input 
                    type="text" 
                    name="officeAddress" 
                    value={formData.officeAddress} 
                    onChange={handleChange} 
                    placeholder="آدرس کامل دفتر" 
                    disabled={loading}
                  />
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label>شماره پروانه *</label>
                    <input 
                      type="text" 
                      name="licenseNumber" 
                      value={formData.licenseNumber} 
                      onChange={handleChange} 
                      placeholder="شماره پروانه" 
                      disabled={loading}
                    />
                  </div>
                  <div className="input-group">
                    <label>تاریخ اعتبار پروانه *</label>
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

              {/* بخش 3: موقعیت روی نقشه */}
              <div className="form-section" data-section="location">
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
              </div>

              {/* بخش 4: آپلود مدارک */}
              <div className="form-section" data-section="documents">
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
              </div>

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