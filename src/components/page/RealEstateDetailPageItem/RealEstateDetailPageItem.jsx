
// // import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
// // import DOMPurify from 'dompurify';
// // import { useNavigate, useLocation, useParams } from 'react-router-dom';
// // import RelatedPropertiesSlider from './RelatedPropertiesSlider';
// // import DoubleSidebarBanners from './SidebarBanner';
// // import LoginModal from './LoginModal/LoginModal';
// // import { 
// //   FaMapMarkerAlt, FaPhone, FaWhatsapp, FaShare, FaArrowRight, 
// //   FaStar, FaParking, FaWarehouse, FaSwimmingPool, FaBath, FaRulerCombined,
// //   FaCalendarAlt, FaLayerGroup, FaArrowUp, FaCheckCircle, FaTag, FaHome,
// //   FaBuilding, FaRuler, FaShieldAlt, FaClock, FaEye, FaLink,
// //   FaLock, FaUser, FaSpinner, FaTimes,
// //   FaBookmark, FaRegBookmark, FaFlag
// // } from 'react-icons/fa';
// // import { Swiper, SwiperSlide } from 'swiper/react';
// // import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// // import NeshanMap from "@neshan-maps-platform/react-openlayers";
// // import "@neshan-maps-platform/react-openlayers/dist/style.css";
// // import 'swiper/css';
// // import 'swiper/css/navigation';
// // import 'swiper/css/pagination';
// // import './RealEstateDetailPageItem.css';

// // // ============================================================
// // // ========== کامپوننت مودال گزارش تخلف ==========
// // // ============================================================
// // const ReportViolationModal = ({ propertyId, propertyTitle, onClose, onSuccess }) => {
// //   const [violationTypes, setViolationTypes] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [selectedType, setSelectedType] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [error, setError] = useState(null);
// //   const [success, setSuccess] = useState(false);

// //   // دریافت انواع تخلف
// //   useEffect(() => {
// //     const fetchViolationTypes = async () => {
// //       setLoading(true);
// //       setError(null);
      
// //       try {
// //         const token = localStorage.getItem('auth_token');
        
// //         const response = await fetch('https://localhost:7178/api/RealEstatePage/violation-types', {
// //           headers: {
// //             'Authorization': `Bearer ${token}`
// //           }
// //         });

// //         if (!response.ok) {
// //           throw new Error(`HTTP ${response.status}`);
// //         }

// //         const result = await response.json();
// //         console.log('📋 انواع تخلف:', result);

// //         if (result.status === 200 && result.data) {
// //           setViolationTypes(result.data);
// //         } else {
// //           setViolationTypes([]);
// //         }
// //       } catch (error) {
// //         console.error('❌ خطا در دریافت انواع تخلف:', error);
// //         setError('مشکل در دریافت لیست انواع تخلف');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchViolationTypes();
// //   }, []);

// //   // ارسال گزارش تخلف
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!selectedType) {
// //       setError('لطفاً نوع تخلف را انتخاب کنید');
// //       return;
// //     }

// //     if (!description.trim()) {
// //       setError('لطفاً توضیحات تخلف را وارد کنید');
// //       return;
// //     }

// //     if (description.trim().length < 5) {
// //       setError('توضیحات باید حداقل ۵ کاراکتر باشد');
// //       return;
// //     }

// //     setSubmitting(true);
// //     setError(null);

// //     try {
// //       const token = localStorage.getItem('auth_token');

// //       const payload = {
// //         id: propertyId,
// //         desc: description.trim(),
// //         errorType: parseInt(selectedType)
// //       };

// //       console.log('📤 ارسال گزارش تخلف:', payload);

// //       const response = await fetch('https://localhost:7178/api/RealEstatePage/InsertViolations', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`
// //         },
// //         body: JSON.stringify(payload)
// //       });
// //       console.log("*/*/*/*//***/*/*/*/*/",response)
// //       if (!response.ok) {
// //         const errorData = await response.json().catch(() => ({}));
// //         throw new Error(errorData.message || `HTTP ${response.status}`);
// //       }

// //       const result = await response.json();
// //       console.log('✅ نتیجه ثبت تخلف:', result);

// //       if (result.status === 200 || result.status === 201) {
// //         setSuccess(true);
// //         if (onSuccess) onSuccess();
// //         setTimeout(() => {
// //           onClose();
// //         }, 2000);
// //       } else {
// //         throw new Error(result.message || 'ثبت گزارش با خطا مواجه شد');
// //       }
// //     } catch (error) {
// //       console.error('❌ خطا در ثبت تخلف:', error);
// //       setError(error.message || 'مشکل در ثبت گزارش تخلف');
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   // کلید ESC برای بستن
// //   useEffect(() => {
// //     const handleKeyDown = (e) => {
// //       if (e.key === 'Escape') {
// //         onClose();
// //       }
// //     };
// //     window.addEventListener('keydown', handleKeyDown);
// //     return () => window.removeEventListener('keydown', handleKeyDown);
// //   }, [onClose]);

// //   // جلوگیری از اسکرول پس‌زمینه
// //   useEffect(() => {
// //     document.body.style.overflow = 'hidden';
// //     return () => {
// //       document.body.style.overflow = '';
// //     };
// //   }, []);

// //   return (
// //     <div className="report-modal-overlay" onClick={onClose}>
// //       <div className="report-modal-content" onClick={(e) => e.stopPropagation()}>
// //         <div className="report-modal-header">
// //           <h2>
// //             <FaFlag className="report-icon" />
// //             گزارش تخلف
// //           </h2>
// //           <button className="report-modal-close" onClick={onClose}>
// //             <FaTimes />
// //           </button>
// //         </div>

// //         <div className="report-modal-body">
// //           {success ? (
// //             <div className="report-success">
// //               <FaCheckCircle className="success-icon" />
// //               <h3>گزارش شما با موفقیت ثبت شد</h3>
// //               <p>کارشناسان ما گزارش شما را بررسی خواهند کرد</p>
// //             </div>
// //           ) : (
// //             <form onSubmit={handleSubmit}>
// //               <div className="form-group">
// //                 <label htmlFor="property-info">اطلاعات ملک</label>
// //                 <div className="property-info-box">
// //                   <span className="property-id">کد: #{propertyId}</span>
// //                   <span className="property-title">{propertyTitle}</span>
// //                 </div>
// //               </div>

// //               <div className="form-group">
// //                 <label htmlFor="violation-type">نوع تخلف <span className="required">*</span></label>
// //                 {loading ? (
// //                   <div className="loading-types">
// //                     <FaSpinner className="spinner" />
// //                     <span>در حال بارگذاری...</span>
// //                   </div>
// //                 ) : (
// //                   <select
// //                     id="violation-type"
// //                     value={selectedType}
// //                     onChange={(e) => setSelectedType(e.target.value)}
// //                     className={selectedType ? 'filled' : ''}
// //                     disabled={submitting}
// //                   >
// //                     <option value="">انتخاب کنید...</option>
// //                     {violationTypes.map((type) => (
// //                       <option key={type.id} value={type.id}>
// //                         {type.name}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 )}
// //               </div>

// //               <div className="form-group">
// //                 <label htmlFor="violation-desc">توضیحات تخلف <span className="required">*</span></label>
// //                 <textarea
// //                   id="violation-desc"
// //                   value={description}
// //                   onChange={(e) => setDescription(e.target.value)}
// //                   placeholder="لطفاً توضیح دهید که چه تخلفی مشاهده کرده‌اید..."
// //                   rows="5"
// //                   disabled={submitting}
// //                   maxLength="500"
// //                 />
// //                 <div className="char-counter">
// //                   {description.length} / ۵۰۰
// //                 </div>
// //               </div>

// //               {error && (
// //                 <div className="report-error">
// //                   <FaTimes className="error-icon" />
// //                   <span>{error}</span>
// //                 </div>
// //               )}

// //               <div className="report-modal-footer">
// //                 <button 
// //                   type="button" 
// //                   className="btn-cancel" 
// //                   onClick={onClose}
// //                   disabled={submitting}
// //                 >
// //                   انصراف
// //                 </button>
// //                 <button 
// //                   type="submit" 
// //                   className="btn-submit"
// //                   disabled={submitting || loading}
// //                 >
// //                   {submitting ? (
// //                     <>
// //                       <FaSpinner className="spinner" />
// //                       در حال ارسال...
// //                     </>
// //                   ) : (
// //                     <>
// //                       <FaFlag />
// //                       ثبت گزارش
// //                     </>
// //                   )}
// //                 </button>
// //               </div>
// //             </form>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ============================================================
// // // ========== کامپوننت گالری تمام‌صفحه ==========
// // // ============================================================
// // const ImageGalleryModal = ({ images, initialIndex = 0, onClose }) => {
// //   const [currentIndex, setCurrentIndex] = useState(initialIndex);
// //   const [isZoomed, setIsZoomed] = useState(false);
// //   const [touchStart, setTouchStart] = useState(null);
// //   const [touchEnd, setTouchEnd] = useState(null);

// //   useEffect(() => {
// //     document.body.style.overflow = 'hidden';
// //     return () => {
// //       document.body.style.overflow = '';
// //     };
// //   }, []);

// //   useEffect(() => {
// //     const handleKeyDown = (e) => {
// //       if (e.key === 'Escape') {
// //         onClose();
// //       } else if (e.key === 'ArrowLeft') {
// //         e.preventDefault();
// //         setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
// //       } else if (e.key === 'ArrowRight') {
// //         e.preventDefault();
// //         setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
// //       }
// //     };
// //     window.addEventListener('keydown', handleKeyDown);
// //     return () => window.removeEventListener('keydown', handleKeyDown);
// //   }, [images.length, onClose]);

// //   const handleTouchStart = (e) => {
// //     setTouchStart(e.targetTouches[0].clientX);
// //   };

// //   const handleTouchMove = (e) => {
// //     setTouchEnd(e.targetTouches[0].clientX);
// //   };

// //   const handleTouchEnd = () => {
// //     if (!touchStart || !touchEnd) return;
// //     const distance = touchStart - touchEnd;
// //     const isLeftSwipe = distance > 50;
// //     const isRightSwipe = distance < -50;

// //     if (isLeftSwipe) {
// //       setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
// //     } else if (isRightSwipe) {
// //       setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
// //     }
// //     setTouchStart(null);
// //     setTouchEnd(null);
// //   };

// //   const handleZoom = (e) => {
// //     e.stopPropagation();
// //     setIsZoomed(prev => !prev);
// //   };

// //   const goToNext = (e) => {
// //     e.stopPropagation();
// //     setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
// //   };

// //   const goToPrev = (e) => {
// //     e.stopPropagation();
// //     setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
// //   };

// //   if (!images || images.length === 0) return null;

// //   return (
// //     <div 
// //       className="image-gallery-modal-overlay"
// //       onClick={onClose}
// //       onTouchStart={handleTouchStart}
// //       onTouchMove={handleTouchMove}
// //       onTouchEnd={handleTouchEnd}
// //     >
// //       <div className="image-gallery-modal-content" onClick={(e) => e.stopPropagation()}>
// //         <button className="gallery-modal-close" onClick={onClose}>
// //           <FaTimes />
// //         </button>

// //         <div className="gallery-modal-counter">
// //           {currentIndex + 1} / {images.length}
// //         </div>

// //         <div 
// //           className={`gallery-modal-image-wrapper ${isZoomed ? 'zoomed' : ''}`}
// //           onClick={handleZoom}
// //         >
// //           <img 
// //             src={images[currentIndex]} 
// //             alt={`تصویر ${currentIndex + 1}`}
// //             className="gallery-modal-image"
// //           />
// //         </div>

// //         {images.length > 1 && (
// //           <>
// //             <button className="gallery-modal-nav prev" onClick={goToPrev}>
// //               <FaArrowRight />
// //             </button>
// //             <button className="gallery-modal-nav next" onClick={goToNext}>
// //               <FaArrowRight />
// //             </button>
// //           </>
// //         )}

// //         <button className="gallery-modal-zoom-btn" onClick={handleZoom}>
// //           {isZoomed ? '🔍−' : '🔍+'}
// //         </button>

// //         {images.length > 1 && (
// //           <div className="gallery-modal-thumbnails">
// //             {images.map((img, index) => (
// //               <div 
// //                 key={index}
// //                 className={`thumbnail-item ${index === currentIndex ? 'active' : ''}`}
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   setCurrentIndex(index);
// //                 }}
// //               >
// //                 <img src={img} alt={`تصویر کوچک ${index + 1}`} />
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // // ============================================================
// // // ========== کامپوننت پاپ‌آپ استوری ==========
// // // ============================================================
// // const StoryPopup = ({ agentName, agentImage, userId, onClose }) => {
// //   const [stories, setStories] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
// //   const [progress, setProgress] = useState(0);
// //   const [isPaused, setIsPaused] = useState(false);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchStories = async () => {
// //       if (!userId) {
// //         setError('شناسه کاربر یافت نشد');
// //         setLoading(false);
// //         return;
// //       }

// //       try {
// //         setLoading(true);
// //         const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${userId}`);
        
// //         if (!response.ok) {
// //           throw new Error(`HTTP ${response.status}`);
// //         }
        
// //         const result = await response.json();
        
// //         if (result.status === 200 && result.data && result.data.length > 0) {
// //           const userStories = result.data[0]?.storyUser || [];
// //           const formattedStories = userStories.map(story => ({
// //             ...story,
// //             url: `https://localhost:7178${story.url}`
// //           }));
// //           setStories(formattedStories);
// //         } else {
// //           setStories([]);
// //         }
// //       } catch (error) {
// //         console.error('❌ خطا در دریافت استوری:', error);
// //         setError('مشکل در دریافت استوری‌ها');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchStories();
// //   }, [userId]);

// //   useEffect(() => {
// //     if (isPaused || loading || stories.length === 0) return;

// //     const timer = setInterval(() => {
// //       setProgress(prev => {
// //         const newProgress = prev + 1;
// //         if (newProgress >= 100) {
// //           if (currentStoryIndex < stories.length - 1) {
// //             setCurrentStoryIndex(prev => prev + 1);
// //             return 0;
// //           } else {
// //             onClose();
// //             return 0;
// //           }
// //         }
// //         return newProgress;
// //       });
// //     }, 50);

// //     return () => clearInterval(timer);
// //   }, [currentStoryIndex, isPaused, loading, stories, onClose]);

// //   const handlePrevStory = useCallback((e) => {
// //     e.stopPropagation();
// //     if (currentStoryIndex > 0) {
// //       setCurrentStoryIndex(prev => prev - 1);
// //       setProgress(0);
// //     }
// //   }, [currentStoryIndex]);

// //   const handleNextStory = useCallback((e) => {
// //     e.stopPropagation();
// //     if (currentStoryIndex < stories.length - 1) {
// //       setCurrentStoryIndex(prev => prev + 1);
// //       setProgress(0);
// //     } else {
// //       onClose();
// //     }
// //   }, [currentStoryIndex, stories.length, onClose]);

// //   const handleStoryLink = useCallback((link) => {
// //     if (link) {
// //       window.location.href = link;
// //     }
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="realestate-detail story-popup-overlay" onClick={onClose}>
// //         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// //           <div style={{ 
// //             display: 'flex', 
// //             alignItems: 'center', 
// //             justifyContent: 'center', 
// //             height: '100%',
// //             color: 'white',
// //             fontSize: '18px',
// //             fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
// //           }}>
// //             در حال بارگذاری استوری‌ها...
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error || stories.length === 0) {
// //     return (
// //       <div className="realestate-detail story-popup-overlay" onClick={onClose}>
// //         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// //           <div style={{ 
// //             display: 'flex', 
// //             flexDirection: 'column',
// //             alignItems: 'center', 
// //             justifyContent: 'center', 
// //             height: '100%',
// //             color: 'white',
// //             fontSize: '16px',
// //             padding: '20px',
// //             textAlign: 'center',
// //             fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
// //           }}>
// //             <p>{error || 'هیچ استوری برای این کاربر وجود ندارد'}</p>
// //             <button 
// //               onClick={onClose}
// //               style={{
// //                 marginTop: '20px',
// //                 padding: '10px 30px',
// //                 background: '#ff0000',
// //                 color: 'white',
// //                 border: 'none',
// //                 borderRadius: '8px',
// //                 cursor: 'pointer',
// //                 fontSize: '14px',
// //                 fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
// //               }}
// //             >
// //               بستن
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const currentStory = stories[currentStoryIndex];

// //   return (
// //     <div 
// //       className="realestate-detail story-popup-overlay"
// //       onClick={onClose}
// //       onMouseEnter={() => setIsPaused(true)}
// //       onMouseLeave={() => setIsPaused(false)}
// //     >
// //       <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// //         <div className="story-progress-container">
// //           {stories.map((_, index) => (
// //             <div key={index} className="story-progress-bar">
// //               <div 
// //                 className="story-progress-fill"
// //                 style={{
// //                   width: index < currentStoryIndex ? '100%' : 
// //                          index === currentStoryIndex ? `${progress}%` : '0%'
// //                 }}
// //               />
// //             </div>
// //           ))}
// //         </div>

// //         <div className="story-header">
// //           <div className="story-user-info">
// //             <img src={agentImage} alt={agentName} className="story-user-avatar" />
// //             <span className="story-user-name">{agentName}</span>
// //             <span className="story-time">لحظاتی پیش</span>
// //           </div>
// //           <button className="story-close-btn" onClick={onClose}>✕</button>
// //         </div>

// //         <div className="story-content">
// //           <img src={currentStory.url} alt={currentStory.caption || 'استوری'} className="story-image" />
          
// //           {currentStory.caption && (
// //             <div className="story-caption">{currentStory.caption}</div>
// //           )}

// //           {currentStory.link && (
// //             <div className="story-link-button" onClick={() => handleStoryLink(currentStory.link)}>
// //               <FaLink />
// //               <span>{currentStory.linkText || 'مشاهده بیشتر'}</span>
// //             </div>
// //           )}
// //         </div>

// //         <div className="story-nav-left" onClick={handlePrevStory} />
// //         <div className="story-nav-right" onClick={handleNextStory} />
// //       </div>
// //     </div>
// //   );
// // };

// // // ============================================================
// // // ========== کامپوننت SafeImage ==========
// // // ============================================================
// // const SafeImage = ({ src, alt, className, fallbackSrc, ...props }) => {
// //   const [error, setError] = useState(false);

// //   if (!src || error) {
// //     return (
// //       <img 
// //         src={fallbackSrc || 'https://randomuser.me/api/portraits/men/32.jpg'} 
// //         alt={alt || 'تصویر'} 
// //         className={className}
// //         {...props}
// //       />
// //     );
// //   }

// //   return (
// //     <img
// //       src={src}
// //       alt={alt}
// //       className={className}
// //       onError={() => {
// //         setError(true);
// //       }}
// //       {...props}
// //     />
// //   );
// // };

// // // ============================================================
// // // ========== توابع کمکی ==========
// // // ============================================================
// // const stripHtml = (html) => {
// //   if (!html) return '';
// //   const temp = document.createElement('div');
// //   temp.innerHTML = html;
// //   return temp.textContent || temp.innerText || '';
// // };

// // const truncateText = (text, maxLength) => {
// //   if (!text) return '';
// //   if (text.length <= maxLength) return text;
// //   return text.substring(0, maxLength - 2) + '…';
// // };

// // // ============================================================
// // // ========== کامپوننت‌های متا ==========
// // // ============================================================
// // const PageMetadata = ({ property, isForSale, isForRent }) => {
// //   useEffect(() => {
// //     if (!property) return;
// //     let title = property.title 
// //       ? `${truncateText(property.title, 40)} | ${isForSale ? 'فروش' : 'رهن و اجاره'} ${property.area}م ${property.regionName}`
// //       : `ملک ${property.area} متری ${property.regionName}`;
// //     title = truncateText(title, 65);
// //     document.title = title;
// //     const plainDescription = stripHtml(property.description || '');
// //     const priceText = isForSale ? `قیمت: ${property.price} تومان` : `رهن: ${property.mortgagePrice || property.depositPrice || 'تماس بگیرید'} تومان`;
// //     let description = plainDescription ? truncateText(plainDescription, 120) + `... ${priceText}` : `ملک ${isForSale ? 'فروش' : 'رهن و اجاره'} در ${property.regionName}، ${property.area} متری، ${property.rooms} خوابه - ${priceText}`;
// //     description = truncateText(description, 155);
// //     const keywords = [property.title, `${property.regionName} ملک`, isForSale ? 'فروش آپارتمان' : 'رهن آپارتمان', `${property.area} متری`, `${property.rooms} خوابه`, `طبقه ${property.floor}`, property.year !== "نامشخص" ? `ساخت ${property.year}` : '', ...property.features.slice(0, 5)].filter(Boolean).join(',');
// //     const updateOrCreateMeta = (name, content, isProperty = false) => {
// //       const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
// //       let meta = document.querySelector(selector);
// //       if (!meta) {
// //         meta = document.createElement('meta');
// //         if (isProperty) meta.setAttribute('property', name);
// //         else meta.setAttribute('name', name);
// //         document.head.appendChild(meta);
// //       }
// //       meta.setAttribute('content', content);
// //     };
// //     updateOrCreateMeta('description', description);
// //     updateOrCreateMeta('keywords', keywords);
// //     updateOrCreateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1');
// //     let canonical = document.querySelector('link[rel="canonical"]');
// //     if (!canonical) {
// //       canonical = document.createElement('link');
// //       canonical.rel = 'canonical';
// //       document.head.appendChild(canonical);
// //     }
// //     canonical.href = window.location.href;
// //     updateOrCreateMeta('og:title', title, true);
// //     updateOrCreateMeta('og:description', truncateText(description, 200), true);
// //     updateOrCreateMeta('og:image', property.images?.[0] || '/default-property-image.jpg', true);
// //     updateOrCreateMeta('og:url', window.location.href, true);
// //     updateOrCreateMeta('og:type', 'product', true);
// //     updateOrCreateMeta('og:locale', 'fa_IR', true);
// //     updateOrCreateMeta('og:site_name', 'مشاور املاک', true);
// //     updateOrCreateMeta('twitter:card', 'summary_large_image');
// //     updateOrCreateMeta('twitter:title', title);
// //     updateOrCreateMeta('twitter:description', truncateText(description, 200));
// //     updateOrCreateMeta('twitter:image', property.images?.[0] || '/default-property-image.jpg');
// //     document.documentElement.lang = 'fa';
// //     document.documentElement.dir = 'rtl';
// //   }, [property, isForSale, isForRent]);
// //   return null;
// // };

// // const StructuredData = ({ property, isForSale, isForRent }) => {
// //   useEffect(() => {
// //     if (!property) return;
// //     const removeOldScript = () => { const oldScript = document.getElementById('json-ld-structured-data'); if (oldScript) oldScript.remove(); };
// //     removeOldScript();
// //     const parsePriceToNumber = (priceStr) => { if (!priceStr || priceStr === '۰') return '0'; return String(priceStr).replace(/[^0-9]/g, '') || '0'; };
// //     const structuredData = {
// //       "@context": "https://schema.org", "@type": isForSale ? "Product" : "RealEstateListing", "name": property.title,
// //       "description": stripHtml(property.description || '').substring(0, 500), "image": property.images.slice(0, 10), "url": window.location.href,
// //       "datePublished": new Date().toISOString(), "dateModified": new Date().toISOString(),
// //       ...(isForSale && { "offers": { "@type": "Offer", "price": parsePriceToNumber(property.price), "priceCurrency": "IRR", "availability": "https://schema.org/InStock", "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] } }),
// //       ...(isForRent && { "offers": { "@type": "Offer", "price": parsePriceToNumber(property.mortgagePrice || property.rentPrice || '0'), "priceCurrency": "IRR", "description": "ملک رهن و اجاره" } }),
// //       "address": { "@type": "PostalAddress", "addressLocality": property.regionName, "streetAddress": property.address, "addressCountry": "IR", "addressRegion": "تهران" },
// //       "floorSize": { "@type": "QuantitativeValue", "value": property.area || 0, "unitCode": "MTK", "unitText": "متر مربع" },
// //       "numberOfRooms": property.rooms || 0,
// //       "additionalProperty": [{ "@type": "PropertyValue", "name": "طبقه", "value": `${property.floor || 1} از ${property.totalFloors || 1}` }, { "@type": "PropertyValue", "name": "سال ساخت", "value": property.year !== "نامشخص" ? property.year : "نامشخص" }, ...property.features.slice(0, 15).map(feature => ({ "@type": "PropertyValue", "name": "امکانات", "value": feature }))],
// //       "potentialAction": { "@type": "CommunicateAction", "name": "تماس با مشاور", "target": { "@type": "EntryPoint", "urlTemplate": `tel:${property.agent?.phone || ''}`, "inLanguage": "fa-IR", "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"] } }
// //     };
// //     const script = document.createElement('script');
// //     script.id = 'json-ld-structured-data';
// //     script.type = 'application/ld+json';
// //     script.textContent = JSON.stringify(structuredData);
// //     document.head.appendChild(script);
// //     return () => removeOldScript();
// //   }, [property, isForSale, isForRent]);
// //   return null;
// // };

// // const BreadcrumbStructuredData = ({ property, isForSale }) => {
// //   useEffect(() => {
// //     if (!property) return;
// //     const removeOldScript = () => { const oldScript = document.getElementById('json-ld-breadcrumb'); if (oldScript) oldScript.remove(); };
// //     removeOldScript();
// //     const baseUrl = window.location.origin;
// //     const regionSlug = encodeURIComponent(property.regionName || 'منطقه');
// //     const breadcrumbData = {
// //       "@context": "https://schema.org", "@type": "BreadcrumbList",
// //       "itemListElement": [
// //         { "@type": "ListItem", "position": 1, "name": "صفحه اصلی", "item": `${baseUrl}/` },
// //         { "@type": "ListItem", "position": 2, "name": isForSale ? "آپارتمان‌های فروش" : "آپارتمان‌های رهن و اجاره", "item": `${baseUrl}/${isForSale ? 'RealEstatePageDetail' : 'rent'}` },
// //         { "@type": "ListItem", "position": 3, "name": `منطقه ${property.regionName}`, "item": `${baseUrl}/region/${regionSlug}` },
// //         { "@type": "ListItem", "position": 4, "name": truncateText(property.title || 'جزئیات ملک', 80), "item": window.location.href }
// //       ]
// //     };
// //     const script = document.createElement('script');
// //     script.id = 'json-ld-breadcrumb';
// //     script.type = 'application/ld+json';
// //     script.textContent = JSON.stringify(breadcrumbData);
// //     document.head.appendChild(script);
// //     return () => removeOldScript();
// //   }, [property, isForSale]);
// //   return null;
// // };

// // // ============================================================
// // // ========== Skeleton ==========
// // // ============================================================
// // const DetailSkeleton = () => (
// //   <div className="detail-skeleton">
// //     <div className="skeleton-header"><div className="skeleton-circle"></div><div className="skeleton-title"></div><div className="skeleton-circle"></div></div>
// //     <div className="skeleton-gallery"><div className="skeleton-image"></div></div>
// //     <div className="skeleton-content"><div className="skeleton-price"></div><div className="skeleton-info">{[]}</div><div className="skeleton-tabs">{[]}</div><div className="skeleton-text">{[]}</div></div>
// //   </div>
// // );

// // // ============================================================
// // // ========== کامپوننت اصلی ==========
// // // ============================================================
// // const RealEstateDetailPageItem = memo(() => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { id: paramId } = useParams();
// //   const queryParams = new URLSearchParams(location.search);
// //   const id = paramId || queryParams.get('id');
  
// //   const [property, setProperty] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [copied, setCopied] = useState(false);
// //   const [selectedImage, setSelectedImage] = useState(0);
// //   const [activeTab, setActiveTab] = useState('details');
  
// //   const [isBookmarked, setIsBookmarked] = useState(false);
// //   const [bookmarkLoading, setBookmarkLoading] = useState(false);
  
// //   const [imagesLoaded, setImagesLoaded] = useState({});
// //   const [showStoryPopup, setShowStoryPopup] = useState(false);
// //   const [storyUserId, setStoryUserId] = useState(null);
  
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [showLoginModal, setShowLoginModal] = useState(false);

// //   // ===== state های گالری =====
// //   const [showGalleryModal, setShowGalleryModal] = useState(false);
// //   const [galleryStartIndex, setGalleryStartIndex] = useState(0);

// //   // ===== state های گزارش تخلف =====
// //   const [showReportModal, setShowReportModal] = useState(false);

// //   // ===== تابع باز کردن گالری =====
// //   const openGallery = useCallback((index) => {
// //     setGalleryStartIndex(index);
// //     setShowGalleryModal(true);
// //     document.body.style.overflow = 'hidden';
// //   }, []);

// //   // ===== تابع بستن گالری =====
// //   const closeGallery = useCallback(() => {
// //     setShowGalleryModal(false);
// //     document.body.style.overflow = '';
// //   }, []);

// //   // ===== تابع باز کردن مودال گزارش تخلف =====
// //   const handleReportClick = useCallback(() => {
// //     if (!isLoggedIn) {
// //       setShowLoginModal(true);
// //       return;
// //     }
// //     setShowReportModal(true);
// //   }, [isLoggedIn]);

// //   // ===== تابع بستن مودال گزارش تخلف =====
// //   const closeReportModal = useCallback(() => {
// //     setShowReportModal(false);
// //   }, []);

// //   // ===== بررسی لاگین =====
// //   useEffect(() => {
// //     const checkLogin = () => {
// //       const token = localStorage.getItem('auth_token');
// //       setIsLoggedIn(!!token);
// //     };
    
// //     checkLogin();
    
// //     window.addEventListener('authChange', checkLogin);
// //     window.addEventListener('storage', checkLogin);
    
// //     return () => {
// //       window.removeEventListener('authChange', checkLogin);
// //       window.removeEventListener('storage', checkLogin);
// //     };
// //   }, []);

// //   // ===== دریافت اطلاعات ملک =====
// //   useEffect(() => {
// //     const fetchPropertyData = async () => {
// //       if (!id) { 
// //         setError('شناسه ملک یافت نشد'); 
// //         setLoading(false); 
// //         return; 
// //       }
      
// //       setLoading(true); 
// //       setError(null);
      
// //       try {
// //         const token = localStorage.getItem('auth_token');
// //         const controller = new AbortController();
// //         const timeoutId = setTimeout(() => controller.abort(), 10000);
        
// //         const API_BASE_URL = 'https://localhost:7178/api';
        
// //         const headers = {
// //           'Content-Type': 'application/json',
// //         };
        
// //         if (token) {
// //           headers['Authorization'] = `Bearer ${token}`;
// //         }
        
// //         const response = await fetch(
// //           `${API_BASE_URL}/RealEstatePage/GetRealEstateDetails?id=${id}`,
// //           { 
// //             signal: controller.signal,
// //             headers: headers
// //           }
// //         );

// //         clearTimeout(timeoutId);
        
// //         if (!response.ok) {
// //           throw new Error(`HTTP ${response.status}`);
// //         }
        
// //         const result = await response.json();
// //         console.log('📦 Full API response:', result);
        
// //         if (result.status === 200 && result.data) {
// //           const data = result.data;
          
// //           const agentImage = data.agents?.image 
// //             ? `https://localhost:7178/${data.agents.image}` 
// //             : "https://randomuser.me/api/portraits/men/32.jpg";
          
// //           const userId = data.agents?.userId || null;
// //           const hasStory = data.agents?.hasStory || false;
          
// //           console.log('👤 Agent UserId:', userId);
// //           console.log('📱 HasStory:', hasStory);
// //           console.log('📕 inBookMark از سرور:', data.inBookMark);
// //           console.log('📕 isLoggedIn:', isLoggedIn);
          
// //           const bookmarkedValue = isLoggedIn ? (data.inBookMark === true) : false;
// //           console.log('📕 مقدار نهایی بوک‌مارک:', bookmarkedValue);
          
// //           setIsBookmarked(bookmarkedValue);
// //           setStoryUserId(hasStory ? userId : null);
          
// //           setProperty({
// //             id: data.id, 
// //             title: data.title || `ملک در ${data.regionName || 'منطقه'} `, 
// //             price: data.price?.toLocaleString("fa-IR") || "۰",
// //             priceMeter: data.priceMeter?.toLocaleString("fa-IR") || "۰", 
// //             rentPrice: data.rent?.toLocaleString("fa-IR") || null,
// //             depositPrice: data.deposit?.toLocaleString("fa-IR") || null, 
// //             mortgagePrice: data.mortgagePrice?.toLocaleString("fa-IR") || null,
// //             type: data.categoryType, 
// //             area: parseInt(data.additionalInformation?.match(/\d+/)?.[0]) || 0, 
// //             rooms: data.rooms || 0,
// //             floor: data.floor || 1, 
// //             regionName: data.regionName || "منطقه نامشخص", 
// //             totalFloors: data.countFloor || 1,
// //             year: data.constructionYear || "نامشخص", 
// //             address: data.address || "آدرس درج نشده", 
// //             showExactLocation: data.showExactLocation,
// //             location: { lat: data.lat || 35.7199363, lng: data.lng || 51.4334842 },
// //             description: data.descriptionRows || "توضیحاتی برای این ملک ثبت نشده است.", 
// //             features: data.facilities || [],
// //             warnings: data.warnings || ["استعلام خلافی", "بررسی سند مالکیت", "استعلام پایان کار", "بررسی مفاصا حساب"],
// //             images: (data.images || []).map(img => `https://localhost:7178/${img}`),
// //             agent: { 
// //               name: data.agents?.name || "مشاور املاک", 
// //               phone: data.agents?.phone || "۰۲۱۹۱۰۰۰۰۰۰", 
// //               whatsapp: data.agents?.connectSocialMedia || "", 
// //               address: data.agents?.address || "آدرس دفتر درج نشده", 
// //               rating: data.agents?.rating || 4.5, 
// //               deals: data.agents?.deals || 120, 
// //               image: agentImage,
// //               hasStory: hasStory,
// //               userId: userId
// //             },
// //             views: data.views || 0, 
// //             saved: data.saved || 0, 
// //             inBookMark: data.inBookMark,
// //             createdAt: data.createdAtPersianRelative || "امروز", 
// //             certificate: data.isHasLoan ? "قابل وام" : "سند رسمی", 
// //             mortgage: data.isHasLoan ? "امکان وام" : "بدون وام",
// //             nearby: [{ name: "مترو", distance: "۵۰۰ متر" }, { name: "مرکز خرید", distance: "۳۰۰ متر" }, { name: "پارک", distance: "۲۰۰ متر" }, { name: "مدرسه", distance: "۴۰۰ متر" }]
// //           });
// //         } else {
// //           throw new Error(result.message || 'ملک یافت نشد');
// //         }
// //       } catch (error) { 
// //         console.error('خطا:', error); 
// //         setError(error.name === 'AbortError' ? 'مدت زمان درخواست به پایان رسید' : 'مشکل در ارتباط با سرور'); 
// //       } finally { 
// //         setLoading(false); 
// //       }
// //     };
    
// //     fetchPropertyData();
// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //   }, [id, isLoggedIn]);

// //   // ===== تابع بوک‌مارک =====
// //   const handleBookmarkToggle = useCallback(async () => {
// //     if (!isLoggedIn) {
// //       setShowLoginModal(true);
// //       return;
// //     }

// //     if (bookmarkLoading) return;

// //     setBookmarkLoading(true);
    
// //     try {
// //       const token = localStorage.getItem('auth_token');
      
// //       const response = await fetch('https://localhost:7178/api/RealEstatePage/ToggleBookMark', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`
// //         },
// //         body: JSON.stringify(property?.id),
// //       });

// //       if (response.ok) {
// //         setIsBookmarked(prev => !prev);
// //         console.log('✅ بوک‌مارک با موفقیت تغییر کرد');
// //       } else {
// //         const errorData = await response.json();
// //         console.error('❌ خطا در بوک‌مارک:', errorData);
// //         alert('مشکل در ذخیره بوک‌مارک. لطفاً دوباره تلاش کنید.');
// //       }
// //     } catch (error) {
// //       console.error('❌ خطا در ارتباط با سرور:', error);
// //       alert('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
// //     } finally {
// //       setBookmarkLoading(false);
// //     }
// //   }, [isLoggedIn, property, isBookmarked, bookmarkLoading]);

// //   // ===== توابع تماس =====
// //   const handlePhoneClick = useCallback(() => {
// //     if (!isLoggedIn) {
// //       setShowLoginModal(true);
// //       return;
// //     }
// //     if (!property?.agent?.phone) {
// //       alert('شماره تماس در دسترس نیست');
// //       return;
// //     }
// //     navigator.clipboard.writeText(property.agent.phone);
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 2000);
// //   }, [isLoggedIn, property]);

// //   const handleWhatsAppClick = useCallback(() => {
// //     if (!isLoggedIn) {
// //       setShowLoginModal(true);
// //       return;
// //     }
// //     if (!property?.agent?.whatsapp) {
// //       alert('شماره واتساپ در دسترس نیست');
// //       return;
// //     }
// //     window.open(`https://wa.me/${property.agent.whatsapp.replace(/\s/g, '')}`, '_blank');
// //   }, [isLoggedIn, property]);

// //   // ===== سایر توابع =====
// //   const isForSale = useMemo(() => property?.type === 1, [property]);
// //   const isForRent = useMemo(() => property?.type === 2, [property]);
// //   const formattedPricePerMeter = useMemo(() => { 
// //     if (!property?.priceMeter || property.priceMeter === "۰") return null; 
// //     return `${property.priceMeter} تومان`; 
// //   }, [property]);
// //   const shareUrl = useMemo(() => window.location.href, []);

// //   const handleCopyLink = useCallback(() => { 
// //     navigator.clipboard.writeText(shareUrl); 
// //     setCopied(true); 
// //     setTimeout(() => setCopied(false), 2000); 
// //   }, [shareUrl]);
  
// //   const handleShare = useCallback(async () => { 
// //     if (!property) return; 
// //     const shareData = { 
// //       title: property.title, 
// //       text: `${property.title} - ${property.area} متری - ${isForSale ? `قیمت ${property.price}` : `رهن ${property.mortgagePrice}`} تومان`, 
// //       url: shareUrl 
// //     }; 
// //     if (navigator.share && /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)) { 
// //       try { 
// //         await navigator.share(shareData); 
// //       } catch (error) { 
// //         if (error.name !== 'AbortError') handleCopyLink(); 
// //       } 
// //     } else handleCopyLink(); 
// //   }, [property, isForSale, shareUrl, handleCopyLink]);
  
// //   const handleImageLoad = useCallback((index) => { 
// //     setImagesLoaded(prev => ({ ...prev, [index]: true })); 
// //   }, []);
  
// // // ===== تابع رفتن به پروفایل =====
// // // ===== تابع رفتن به پروفایل =====
// // // ===== تابع رفتن به پروفایل =====
// // const goToProfile = useCallback(() => {
// //   if (!property || !property.agent || !property.agent.userId) {
// //     console.warn('اطلاعات کاربر برای رفتن به پروفایل موجود نیست');
// //     return;
// //   }
  
// //   try {
// //     const agentName = property.agent.name || 'مشاور';
// //     const userId = property.agent.userId;
    
// //     // ساخت slug از نام
// //     const nameSlug = agentName
// //       .replace(/\s+/g, '-')
// //       .replace(/[^آ-یa-zA-Z0-9-]/g, '')
// //       .substring(0, 50);
    
// //     // ذخیره userId در localStorage برای استفاده در صفحه پروفایل
// //     localStorage.setItem('temp_profile_userId', userId);
    
// //     // رفتن به صفحه پروفایل با نام در URL و userId در state
// //     navigate(`/profile/${nameSlug}`, {
// //       state: { userId: userId }
// //     });
// //   } catch (error) {
// //     console.error('خطا در رفتن به پروفایل:', error);
// //     navigate('/');
// //   }
// // }, [property, navigate]);


// //   const handleStoryClick = useCallback((e) => {
// //     if (e) {
// //       e.stopPropagation();
// //     }
    
// //     if (storyUserId) {
// //       setShowStoryPopup(true);
// //       document.body.style.overflow = 'hidden';
// //     }
// //   }, [storyUserId]);

// //   const handleStoryClose = useCallback(() => {
// //     setShowStoryPopup(false);
// //     document.body.style.overflow = '';
// //   }, []);

// //   const handleLoginModalClose = useCallback(() => {
// //     setShowLoginModal(false);
// //     const token = localStorage.getItem('auth_token');
// //     if (token) {
// //       setIsLoggedIn(true);
// //     }
// //   }, []);

// //   // ============================================================
// //   // ===== رندر =====
// //   // ============================================================
// //   if (error) return ( 
// //     <> 
// //       <PageMetadata property={null} /> 
// //       <div className="detail-container realestate-detail">
// //         <div className="detail-header">
// //           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
// //           <h1 className="header-title">خطا</h1>
// //           <div className="header-btn"></div>
// //         </div>
// //         <div className="error-message">
// //           <h2>متاسفانه خطایی رخ داده است</h2>
// //           <p>{error}</p>
// //           <button onClick={() => window.location.reload()}>تلاش مجدد</button>
// //           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
// //         </div>
// //       </div>
// //     </> 
// //   );
  
// //   if (loading) return <DetailSkeleton />;
  
// //   if (!property) return ( 
// //     <> 
// //       <PageMetadata property={null} /> 
// //       <div className="detail-container realestate-detail">
// //         <div className="detail-header">
// //           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
// //           <h1 className="header-title">ملک یافت نشد</h1>
// //           <div className="header-btn"></div>
// //         </div>
// //         <div className="error-message">
// //           <p>متاسفانه ملک مورد نظر یافت نشد</p>
// //           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
// //         </div>
// //       </div>
// //     </> 
// //   );

// //   return ( 
// //     <>
// //       <PageMetadata property={property} isForSale={isForSale} isForRent={isForRent} />
// //       <StructuredData property={property} isForSale={isForSale} isForRent={isForRent} />
// //       <BreadcrumbStructuredData property={property} isForSale={isForSale} />
      
// //       {showStoryPopup && (
// //         <StoryPopup 
// //           agentName={property.agent.name}
// //           agentImage={property.agent.image}
// //           userId={storyUserId}
// //           onClose={handleStoryClose}
// //         />
// //       )}

// //       {showLoginModal && (
// //         <LoginModal 
// //           onClose={handleLoginModalClose}
// //           triggerSource="real-estate-detail"
// //         />
// //       )}

// //       {/* مودال گزارش تخلف */}
// //       {showReportModal && (
// //         <ReportViolationModal
// //           propertyId={property.id}
// //           propertyTitle={property.title}
// //           onClose={closeReportModal}
// //           onSuccess={() => {
// //             setCopied(true);
// //             setTimeout(() => setCopied(false), 3000);
// //           }}
// //         />
// //       )}

// //       {/* گالری تمام‌صفحه */}
// //       {showGalleryModal && (
// //         <ImageGalleryModal 
// //           images={property.images}
// //           initialIndex={galleryStartIndex}
// //           onClose={closeGallery}
// //         />
// //       )}
      
// //       <div className="detail-container realestate-detail">
// //         <nav className="breadcrumb-nav">
// //           <ol className="breadcrumb-list">
// //             <li className="breadcrumb-item"><a href="/">خانه</a></li>
// //             <li className="breadcrumb-item"><a href={isForSale ? '/sale' : '/rent'}>{isForSale ? 'فروش آپارتمان' : 'رهن و اجاره آپارتمان'}</a></li>
// //             <li className="breadcrumb-item"><a href={`/region/${encodeURIComponent(property.regionName)}`}>منطقه {property.regionName}</a></li>
// //             <li className="breadcrumb-item active">{truncateText(property.title, 50)}</li>
// //           </ol>
// //         </nav>
        
// //         <div className="detail-header">
// //           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
// //           <h1 className="header-title">{property.title}</h1>
// //           <div className="header-actions">
// //             <button className="header-btn report-btn" onClick={handleReportClick} title="گزارش تخلف">
// //               <FaFlag />
// //             </button>
// //             <button className="header-btn" onClick={handleShare}><FaShare /></button>
// //           </div>
// //         </div>
        
// //         <div className="detail-gallery">
// //           <Swiper 
// //             modules={[Navigation, Pagination, Autoplay]} 
// //             navigation 
// //             pagination={{ clickable: true }} 
// //             autoplay={{ delay: 4000, disableOnInteraction: false }} 
// //             spaceBetween={0} 
// //             slidesPerView={1} 
// //             onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)} 
// //             className="gallery-swiper"
// //           >
// //             {property.images.length > 0 ? 
// //               property.images.map((img, index) => (
// //                 <SwiperSlide key={index}>
// //                   <div 
// //                     className="gallery-slide"
// //                     onClick={() => openGallery(index)}
// //                     style={{ cursor: 'pointer' }}
// //                   >
// //                     {!imagesLoaded[index] && <div className="image-placeholder"><FaHome /></div>}
// //                     <img 
// //                       src={img} 
// //                       alt={`${property.title} - ${index === 0 ? 'نمای اصلی' : `تصویر ${index + 1}`}`} 
// //                       loading={index === 0 ? 'eager' : 'lazy'} 
// //                       onLoad={() => handleImageLoad(index)} 
// //                       style={{ display: imagesLoaded[index] ? 'block' : 'none' }} 
// //                     />
// //                   </div>
// //                 </SwiperSlide>
// //               )) : 
// //               (<SwiperSlide>
// //                 <div className="gallery-slide no-image">
// //                   <FaHome />
// //                   <span>تصویری موجود نیست</span>
// //                 </div>
// //               </SwiperSlide>)
// //             }
// //           </Swiper>
          
// //           <button 
// //             className={`bookmark-btn ${isBookmarked ? 'active' : ''}`} 
// //             onClick={handleBookmarkToggle}
// //             disabled={bookmarkLoading}
// //             title={isBookmarked ? 'حذف از بوک‌مارک‌ها' : 'افزودن به بوک‌مارک‌ها'}
// //           >
// //             {bookmarkLoading ? (
// //               <FaSpinner className="spinner" />
// //             ) : (
// //               isBookmarked ? <FaBookmark /> : <FaRegBookmark />
// //             )}
// //           </button>
          
// //           {/* دکمه گزارش تخلف در گالری */}
// //           <button 
// //             className={`report-flag-btn ${!isLoggedIn ? 'locked' : ''}`}
// //             onClick={handleReportClick}
// //             title="گزارش تخلف"
// //           >
// //             <FaFlag />
// //             {!isLoggedIn && (
// //               <span className="report-lock-badge">
// //                 <FaLock className="lock-icon-small" />
// //               </span>
// //             )}
// //           </button>
          
// //           <div className="image-counter">{selectedImage + 1} / {property.images.length || 1}</div>
// //         </div>
        
// //         <div className="detail-main">
// //           <div className="detail-title-section">
// //             <div className="title-row">
// //               <div className="property-stats">
// //                 <span className="stat-badge"><FaEye /> {property.views.toLocaleString('fa-IR')} بازدید</span>
// //                 <span className="stat-badge">
// //                   <FaBookmark /> {property.saved.toLocaleString('fa-IR')} ذخیره
// //                 </span>
// //                 <span className="stat-badge"><FaClock /> {property.createdAt}</span>
// //               </div>
// //             </div>
// //           </div>
          
// //           <div className="price-section">
// //             {isForSale && (
// //               <div className="price-card sale-price">
// //                 <div className="price-card-icon"><FaTag /></div>
// //                 <div className="price-card-content">
// //                   <span className="price-label">قیمت فروش</span>
// //                   <div className="price-value-wrapper">
// //                     <span className="price-number">{property.price}</span>
// //                     <span className="price-unit">تومان</span>
// //                   </div>
// //                   {formattedPricePerMeter && 
// //                     <div className="price-meta">
// //                       <FaRuler />
// //                       <span>متری {formattedPricePerMeter}</span>
// //                     </div>
// //                   }
// //                 </div>
// //               </div>
// //             )}
            
// //             {isForRent && (
// //               <div className="rent-price-group">
// //                 {property.mortgagePrice && property.mortgagePrice !== "۰" && (
// //                   <div className="price-card mortgage-price">
// //                     <div className="price-card-icon"><FaBuilding /></div>
// //                     <div className="price-card-content">
// //                       <span className="price-label">مبلغ رهن</span>
// //                       <div className="price-value-wrapper">
// //                         <span className="price-number">{property.mortgagePrice}</span>
// //                         <span className="price-unit">تومان</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //                 {property.rentPrice && property.rentPrice !== "۰" && (
// //                   <div className="price-card rent-price">
// //                     <div className="price-card-icon"><FaHome /></div>
// //                     <div className="price-card-content">
// //                       <span className="price-label">اجاره ماهانه</span>
// //                       <div className="price-value-wrapper">
// //                         <span className="price-number">{property.rentPrice}</span>
// //                         <span className="price-unit">تومان</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>
          
// //           <div className="quick-specs">
// //             <div className="spec-item">
// //               <FaRulerCombined />
// //               <span className="spec-label">متراژ</span>
// //               <span className="spec-value">{property.area} متر²</span>
// //             </div>
// //             <div className="spec-item">
// //               <FaBath />
// //               <span className="spec-label">اتاق‌خواب</span>
// //               <span className="spec-value">{property.rooms} خواب</span>
// //             </div>
// //             <div className="spec-item">
// //               <FaLayerGroup />
// //               <span className="spec-label">طبقه</span>
// //               <span className="spec-value">{property.floor} از {property.totalFloors}</span>
// //             </div>
// //             <div className="spec-item">
// //               <FaCalendarAlt />
// //               <span className="spec-label">سال ساخت</span>
// //               <span className="spec-value">{property.year}</span>
// //             </div>
// //           </div>
          
// //           <div className="info-chips">
// //             <span className="info-chip">کد ملک: {property.id}</span>
// //             <span className="info-chip"><FaShieldAlt /> {property.certificate}</span>
// //             <span className="info-chip type-chip">{isForSale ? 'فروش' : 'رهن و اجاره'}</span>
// //           </div>
          
// //           <div className="detail-tabs">
// //             <button className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`} onClick={() => setActiveTab('details')}>جزئیات ملک</button>
// //             <button className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`} onClick={() => setActiveTab('features')}>امکانات ({property.features.length})</button>
// //             <button className={`tab-btn ${activeTab === 'warnings' ? 'active' : ''}`} onClick={() => setActiveTab('warnings')}>هشدارهای معامله</button>
// //             <button className={`tab-btn ${activeTab === 'nearby' ? 'active' : ''}`} onClick={() => setActiveTab('nearby')}>امکانات اطراف</button>
// //           </div>
          
// //           <div className="tab-content">
// //             {activeTab === 'details' && (
// //               <div className="details-tab">
// //                 <div className="address-card">
// //                   <FaMapMarkerAlt />
// //                   <div className="address-info">
// //                     <h3>آدرس ملک</h3>
// //                     <div>منطقه {property.regionName}</div>
// //                     <p>{property.address}</p>
// //                     <span className="post-date">تاریخ درج: {property.createdAt}</span>
// //                   </div>
// //                 </div>
// //                 <div className="description-card">
// //                   <h3>توضیحات کامل {property.title}</h3>
// //                   <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(property.description, { ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'a', 'blockquote'], ALLOWED_ATTR: ['href', 'target'] }) }} />
// //                 </div>
// //                 <div className="map-card">
// //                   <h3><FaMapMarkerAlt /> موقعیت مکانی ملک در منطقه {property.regionName}</h3>
// //                   <div className="map-location-badge">
// //                     {property.showExactLocation ? 
// //                       <span className="badge exact">📍 نمایش موقعیت دقیق ملک</span> : 
// //                       <span className="badge approximate">🔵 نمایش محدوده تقریبی</span>
// //                     }
// //                   </div>
// //                   <div className="map-container">
// //                     <NeshanMap 
// //                       mapKey="web.31c5ea6c425e40cc9b30620a84a8be90" 
// //                       center={{ latitude: property.location.lat, longitude: property.location.lng }} 
// //                       zoom={property.showExactLocation ? 17 : 15.9} 
// //                       defaultType="dreamy" 
// //                       poi={true} 
// //                       traffic={false} 
// //                       style={{ height: '100%', width: '100%', pointerEvents: 'none' }} 
// //                     />
// //                     <div className="map-marker-overlay">
// //                       {property.showExactLocation ? 
// //                         <><div className="location-dot"></div><div className="location-ripple"></div></> : 
// //                         <div className="location-circles"><div className="circle-3"></div></div>
// //                       }
// //                     </div>
// //                   </div>
// //                   <div className="map-privacy-note">
// //                     <small>{property.showExactLocation ? '📍 موقعیت دقیق ملک' : '📍 محدوده تقریبی ملک'}</small>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
            
// //             {activeTab === 'features' && (
// //               <div className="features-tab">
// //                 <h3>امکانات و ویژگی‌ها</h3>
// //                 <div className="features-grid">
// //                   {property.features.length > 0 ? 
// //                     property.features.map((feature, idx) => {
// //                       let Icon = FaCheckCircle;
// //                       if (feature.includes('پارکینگ')) Icon = FaParking;
// //                       else if (feature.includes('انباری')) Icon = FaWarehouse;
// //                       else if (feature.includes('آسانسور')) Icon = FaArrowUp;
// //                       else if (feature.includes('استخر')) Icon = FaSwimmingPool;
// //                       return (
// //                         <div key={idx} className="feature-card">
// //                           <Icon />
// //                           <span>{feature}</span>
// //                         </div>
// //                       );
// //                     }) : 
// //                     <p className="no-data">امکاناتی ثبت نشده است</p>
// //                   }
// //                 </div>
// //               </div>
// //             )}
            
// //             {activeTab === 'warnings' && (
// //               <div className="warnings-tab">
// //                 <h3>⚠️ هشدارهای مهم</h3>
// //                 <ul className="warnings-list">
// //                   {property.warnings.map((w, idx) => (
// //                     <li key={idx} className="warning-item">
// //                       <span className="warning-bullet"></span>
// //                       <span>{w}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //                 <div className="warning-footer">
// //                   <p>⚠️ قبل از معامله مدارک را بررسی کنید</p>
// //                 </div>
// //               </div>
// //             )}
            
// //             {activeTab === 'nearby' && (
// //               <div className="nearby-tab">
// //                 <h3>امکانات اطراف</h3>
// //                 <div className="nearby-list">
// //                   {property.nearby.map((item, idx) => (
// //                     <div key={idx} className="nearby-item">
// //                       <span className="nearby-name">{item.name}</span>
// //                       <span className="nearby-distance">{item.distance}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
          
// //           <div className="agent-card">
// //             <div className="agent-header">
// //               <div 
// //                 className={`agent-avatar-wrapper ${property.agent.hasStory ? 'has-story' : ''}`}
// //                 style={{ 
// //                   position: 'relative',
// //                   display: 'inline-block',
// //                   flexShrink: 0,
// //                   cursor: property.agent.userId ? 'pointer' : 'default'
// //                 }}
// //                 onClick={property.agent.userId ? goToProfile : undefined}
// //               >
// //                 <SafeImage 
// //                   src={property.agent.image} 
// //                   alt={property.agent.name} 
// //                   className={`agent-avatar ${property.agent.hasStory ? 'has-story' : ''}`}
// //                   fallbackSrc="https://randomuser.me/api/portraits/men/32.jpg"
// //                 />
                
// //                 {property.agent.hasStory && (
// //                   <div 
// //                     className="story-ring-indicator"
// //                     onClick={(e) => {
// //                       e.stopPropagation();
// //                       handleStoryClick(e);
// //                     }}
// //                   >
// //                   </div>
// //                 )}
// //               </div>
              
// //               <div className="agent-info">
// //                 <div className="agent-name-wrapper">
// //                   <h3 
// //                     style={{ cursor: property.agent.userId ? 'pointer' : 'default' }}
// //                     onClick={property.agent.userId ? goToProfile : undefined}
// //                   >
// //                     {property.agent.name}
// //                   </h3>
                  
// //                   {property.agent.hasStory && (
// //                     <span 
// //                       className="story-label" 
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         handleStoryClick(e);
// //                       }}
// //                       style={{ cursor: 'pointer' }}
// //                     >
// //                       <span className="story-dot"></span>
// //                       استوری
// //                     </span>
// //                   )}
// //                 </div>
// //                 <p>{property.agent.address}</p>
// //                 <div className="agent-rating">
// //                   <FaStar />
// //                   <span>{property.agent.rating}</span>
// //                   <span>({property.agent.deals} معامله)</span>
// //                 </div>
// //               </div>
// //             </div>
            
// //             <div className="agent-actions-wrapper">
// //               <button 
// //                 className={`agent-action-btn phone ${!isLoggedIn ? 'locked' : ''}`}
// //                 onClick={handlePhoneClick}
// //               >
// //                 <FaPhone /> 
// //                 <span className="btn-label">
// //                   {isLoggedIn ? property.agent.phone : 'شماره تماس'}
// //                 </span>
                
// //                 {!isLoggedIn && (
// //                   <>
// //                     <span className="lock-badge">
// //                       <FaLock className="lock-icon-small" />
// //                     </span>
// //                     <div className="lock-overlay">
// //                       <FaLock className="lock-icon" />
// //                       <span className="lock-text">برای مشاهده شماره</span>
// //                       <span className="lock-subtext">وارد سامانه شوید</span>
// //                     </div>
// //                   </>
// //                 )}
// //               </button>

// //               <button 
// //                 className={`agent-action-btn whatsapp ${!isLoggedIn ? 'locked' : ''}`}
// //                 onClick={handleWhatsAppClick}
// //               >
// //                 <FaWhatsapp /> 
// //                 <span className="btn-label">واتساپ</span>
                
// //                 {!isLoggedIn && (
// //                   <>
// //                     <span className="lock-badge">
// //                       <FaLock className="lock-icon-small" />
// //                     </span>
// //                     <div className="lock-overlay">
// //                       <FaLock className="lock-icon" />
// //                       <span className="lock-text">برای مشاهده شماره</span>
// //                       <span className="lock-subtext">وارد سامانه شوید</span>
// //                     </div>
// //                   </>
// //                 )}
// //               </button>
// //             </div>

// //             {!isLoggedIn && (
// //               <button 
// //                 className="login-prompt-btn" 
// //                 onClick={() => setShowLoginModal(true)}
// //                 style={{ marginTop: '10px' }}
// //               >
// //                 <FaUser className="login-icon" />
// //                 ورود / ثبت‌نام
// //                 <FaArrowRight className="arrow-icon" />
// //               </button>
// //             )}
// //           </div>
// //         </div>
        
// //         <DoubleSidebarBanners />
// //         <RelatedPropertiesSlider 
// //           currentPropertyId={property.id} 
// //           regionName={property.regionName} 
// //           propertyType={property.type} 
// //         />
        
// //         {(copied) && (
// //           <div className="toast-notification">
// //             <FaCheckCircle /> {copied === 'report' ? 'گزارش تخلف با موفقیت ثبت شد' : 'لینک کپی شد'}
// //           </div>
// //         )}
// //       </div>
// //     </> 
// //   );
// // });

// // RealEstateDetailPageItem.displayName = 'RealEstateDetailPageItem';
// // export default RealEstateDetailPageItem;

// import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
// import DOMPurify from 'dompurify';
// import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import RelatedPropertiesSlider from './RelatedPropertiesSlider';
// import DoubleSidebarBanners from './SidebarBanner';
// import LoginModal from './LoginModal/LoginModal';
// import { 
//   FaMapMarkerAlt, FaPhone, FaWhatsapp, FaShare, FaArrowRight, 
//   FaStar, FaParking, FaWarehouse, FaSwimmingPool, FaBath, FaRulerCombined,
//   FaCalendarAlt, FaLayerGroup, FaArrowUp, FaCheckCircle, FaTag, FaHome,
//   FaBuilding, FaRuler, FaShieldAlt, FaClock, FaEye, FaLink,
//   FaLock, FaUser, FaSpinner, FaTimes,
//   FaBookmark, FaRegBookmark, FaFlag
// } from 'react-icons/fa';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import NeshanMap from "@neshan-maps-platform/react-openlayers";
// import "@neshan-maps-platform/react-openlayers/dist/style.css";
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import './RealEstateDetailPageItem.css';

// // ===== ثابت‌های مدیریت بازدید =====
// const VIEW_EXPIRY_DAYS = 30; // بازدیدها تا 30 روز معتبر هستند

// // ============================================================
// // ========== کامپوننت مودال گزارش تخلف ==========
// // ============================================================
// const ReportViolationModal = ({ propertyId, propertyTitle, onClose, onSuccess }) => {
//   const [violationTypes, setViolationTypes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [selectedType, setSelectedType] = useState('');
//   const [description, setDescription] = useState('');
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   // دریافت انواع تخلف
//   useEffect(() => {
//     const fetchViolationTypes = async () => {
//       setLoading(true);
//       setError(null);
      
//       try {
//         const token = localStorage.getItem('auth_token');
        
//         const response = await fetch('https://localhost:7178/api/RealEstatePage/violation-types', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }

//         const result = await response.json();
//         console.log('📋 انواع تخلف:', result);

//         if (result.status === 200 && result.data) {
//           setViolationTypes(result.data);
//         } else {
//           setViolationTypes([]);
//         }
//       } catch (error) {
//         console.error('❌ خطا در دریافت انواع تخلف:', error);
//         setError('مشکل در دریافت لیست انواع تخلف');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchViolationTypes();
//   }, []);

//   // ارسال گزارش تخلف
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedType) {
//       setError('لطفاً نوع تخلف را انتخاب کنید');
//       return;
//     }

//     if (!description.trim()) {
//       setError('لطفاً توضیحات تخلف را وارد کنید');
//       return;
//     }

//     if (description.trim().length < 5) {
//       setError('توضیحات باید حداقل ۵ کاراکتر باشد');
//       return;
//     }

//     setSubmitting(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem('auth_token');

//       const payload = {
//         id: propertyId,
//         desc: description.trim(),
//         errorType: parseInt(selectedType)
//       };

//       console.log('📤 ارسال گزارش تخلف:', payload);

//       const response = await fetch('https://localhost:7178/api/RealEstatePage/InsertViolations', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(payload)
//       });
//       console.log("*/*/*/*//***/*/*/*/*/",response)
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || `HTTP ${response.status}`);
//       }

//       const result = await response.json();
//       console.log('✅ نتیجه ثبت تخلف:', result);

//       if (result.status === 200 || result.status === 201) {
//         setSuccess(true);
//         if (onSuccess) onSuccess();
//         setTimeout(() => {
//           onClose();
//         }, 2000);
//       } else {
//         throw new Error(result.message || 'ثبت گزارش با خطا مواجه شد');
//       }
//     } catch (error) {
//       console.error('❌ خطا در ثبت تخلف:', error);
//       setError(error.message || 'مشکل در ثبت گزارش تخلف');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // کلید ESC برای بستن
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape') {
//         onClose();
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [onClose]);

//   // جلوگیری از اسکرول پس‌زمینه
//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, []);

//   return (
//     <div className="report-modal-overlay" onClick={onClose}>
//       <div className="report-modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="report-modal-header">
//           <h2>
//             <FaFlag className="report-icon" />
//             گزارش تخلف
//           </h2>
//           <button className="report-modal-close" onClick={onClose}>
//             <FaTimes />
//           </button>
//         </div>

//         <div className="report-modal-body">
//           {success ? (
//             <div className="report-success">
//               <FaCheckCircle className="success-icon" />
//               <h3>گزارش شما با موفقیت ثبت شد</h3>
//               <p>کارشناسان ما گزارش شما را بررسی خواهند کرد</p>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="property-info">اطلاعات ملک</label>
//                 <div className="property-info-box">
//                   <span className="property-id">کد: #{propertyId}</span>
//                   <span className="property-title">{propertyTitle}</span>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="violation-type">نوع تخلف <span className="required">*</span></label>
//                 {loading ? (
//                   <div className="loading-types">
//                     <FaSpinner className="spinner" />
//                     <span>در حال بارگذاری...</span>
//                   </div>
//                 ) : (
//                   <select
//                     id="violation-type"
//                     value={selectedType}
//                     onChange={(e) => setSelectedType(e.target.value)}
//                     className={selectedType ? 'filled' : ''}
//                     disabled={submitting}
//                   >
//                     <option value="">انتخاب کنید...</option>
//                     {violationTypes.map((type) => (
//                       <option key={type.id} value={type.id}>
//                         {type.name}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="violation-desc">توضیحات تخلف <span className="required">*</span></label>
//                 <textarea
//                   id="violation-desc"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="لطفاً توضیح دهید که چه تخلفی مشاهده کرده‌اید..."
//                   rows="5"
//                   disabled={submitting}
//                   maxLength="500"
//                 />
//                 <div className="char-counter">
//                   {description.length} / ۵۰۰
//                 </div>
//               </div>

//               {error && (
//                 <div className="report-error">
//                   <FaTimes className="error-icon" />
//                   <span>{error}</span>
//                 </div>
//               )}

//               <div className="report-modal-footer">
//                 <button 
//                   type="button" 
//                   className="btn-cancel" 
//                   onClick={onClose}
//                   disabled={submitting}
//                 >
//                   انصراف
//                 </button>
//                 <button 
//                   type="submit" 
//                   className="btn-submit"
//                   disabled={submitting || loading}
//                 >
//                   {submitting ? (
//                     <>
//                       <FaSpinner className="spinner" />
//                       در حال ارسال...
//                     </>
//                   ) : (
//                     <>
//                       <FaFlag />
//                       ثبت گزارش
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // ========== کامپوننت گالری تمام‌صفحه ==========
// // ============================================================
// const ImageGalleryModal = ({ images, initialIndex = 0, onClose }) => {
//   const [currentIndex, setCurrentIndex] = useState(initialIndex);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [touchStart, setTouchStart] = useState(null);
//   const [touchEnd, setTouchEnd] = useState(null);

//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, []);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape') {
//         onClose();
//       } else if (e.key === 'ArrowLeft') {
//         e.preventDefault();
//         setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
//       } else if (e.key === 'ArrowRight') {
//         e.preventDefault();
//         setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [images.length, onClose]);

//   const handleTouchStart = (e) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;
//     const distance = touchStart - touchEnd;
//     const isLeftSwipe = distance > 50;
//     const isRightSwipe = distance < -50;

//     if (isLeftSwipe) {
//       setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
//     } else if (isRightSwipe) {
//       setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
//     }
//     setTouchStart(null);
//     setTouchEnd(null);
//   };

//   const handleZoom = (e) => {
//     e.stopPropagation();
//     setIsZoomed(prev => !prev);
//   };

//   const goToNext = (e) => {
//     e.stopPropagation();
//     setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
//   };

//   const goToPrev = (e) => {
//     e.stopPropagation();
//     setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
//   };

//   if (!images || images.length === 0) return null;

//   return (
//     <div 
//       className="image-gallery-modal-overlay"
//       onClick={onClose}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       <div className="image-gallery-modal-content" onClick={(e) => e.stopPropagation()}>
//         <button className="gallery-modal-close" onClick={onClose}>
//           <FaTimes />
//         </button>

//         <div className="gallery-modal-counter">
//           {currentIndex + 1} / {images.length}
//         </div>

//         <div 
//           className={`gallery-modal-image-wrapper ${isZoomed ? 'zoomed' : ''}`}
//           onClick={handleZoom}
//         >
//           <img 
//             src={images[currentIndex]} 
//             alt={`تصویر ${currentIndex + 1}`}
//             className="gallery-modal-image"
//           />
//         </div>

//         {images.length > 1 && (
//           <>
//             <button className="gallery-modal-nav prev" onClick={goToPrev}>
//               <FaArrowRight />
//             </button>
//             <button className="gallery-modal-nav next" onClick={goToNext}>
//               <FaArrowRight />
//             </button>
//           </>
//         )}

//         <button className="gallery-modal-zoom-btn" onClick={handleZoom}>
//           {isZoomed ? '🔍−' : '🔍+'}
//         </button>

//         {images.length > 1 && (
//           <div className="gallery-modal-thumbnails">
//             {images.map((img, index) => (
//               <div 
//                 key={index}
//                 className={`thumbnail-item ${index === currentIndex ? 'active' : ''}`}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setCurrentIndex(index);
//                 }}
//               >
//                 <img src={img} alt={`تصویر کوچک ${index + 1}`} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // ========== کامپوننت پاپ‌آپ استوری ==========
// // ============================================================
// const StoryPopup = ({ agentName, agentImage, userId, onClose }) => {
//   const [stories, setStories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStories = async () => {
//       if (!userId) {
//         setError('شناسه کاربر یافت نشد');
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${userId}`);
        
//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }
        
//         const result = await response.json();
        
//         if (result.status === 200 && result.data && result.data.length > 0) {
//           const userStories = result.data[0]?.storyUser || [];
//           const formattedStories = userStories.map(story => ({
//             ...story,
//             url: `https://localhost:7178${story.url}`
//           }));
//           setStories(formattedStories);
//         } else {
//           setStories([]);
//         }
//       } catch (error) {
//         console.error('❌ خطا در دریافت استوری:', error);
//         setError('مشکل در دریافت استوری‌ها');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStories();
//   }, [userId]);

//   useEffect(() => {
//     if (isPaused || loading || stories.length === 0) return;

//     const timer = setInterval(() => {
//       setProgress(prev => {
//         const newProgress = prev + 1;
//         if (newProgress >= 100) {
//           if (currentStoryIndex < stories.length - 1) {
//             setCurrentStoryIndex(prev => prev + 1);
//             return 0;
//           } else {
//             onClose();
//             return 0;
//           }
//         }
//         return newProgress;
//       });
//     }, 50);

//     return () => clearInterval(timer);
//   }, [currentStoryIndex, isPaused, loading, stories, onClose]);

//   const handlePrevStory = useCallback((e) => {
//     e.stopPropagation();
//     if (currentStoryIndex > 0) {
//       setCurrentStoryIndex(prev => prev - 1);
//       setProgress(0);
//     }
//   }, [currentStoryIndex]);

//   const handleNextStory = useCallback((e) => {
//     e.stopPropagation();
//     if (currentStoryIndex < stories.length - 1) {
//       setCurrentStoryIndex(prev => prev + 1);
//       setProgress(0);
//     } else {
//       onClose();
//     }
//   }, [currentStoryIndex, stories.length, onClose]);

//   const handleStoryLink = useCallback((link) => {
//     if (link) {
//       window.location.href = link;
//     }
//   }, []);

//   if (loading) {
//     return (
//       <div className="realestate-detail story-popup-overlay" onClick={onClose}>
//         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
//           <div style={{ 
//             display: 'flex', 
//             alignItems: 'center', 
//             justifyContent: 'center', 
//             height: '100%',
//             color: 'white',
//             fontSize: '18px',
//             fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
//           }}>
//             در حال بارگذاری استوری‌ها...
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || stories.length === 0) {
//     return (
//       <div className="realestate-detail story-popup-overlay" onClick={onClose}>
//         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
//           <div style={{ 
//             display: 'flex', 
//             flexDirection: 'column',
//             alignItems: 'center', 
//             justifyContent: 'center', 
//             height: '100%',
//             color: 'white',
//             fontSize: '16px',
//             padding: '20px',
//             textAlign: 'center',
//             fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
//           }}>
//             <p>{error || 'هیچ استوری برای این کاربر وجود ندارد'}</p>
//             <button 
//               onClick={onClose}
//               style={{
//                 marginTop: '20px',
//                 padding: '10px 30px',
//                 background: '#ff0000',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
//               }}
//             >
//               بستن
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const currentStory = stories[currentStoryIndex];

//   return (
//     <div 
//       className="realestate-detail story-popup-overlay"
//       onClick={onClose}
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
//         <div className="story-progress-container">
//           {stories.map((_, index) => (
//             <div key={index} className="story-progress-bar">
//               <div 
//                 className="story-progress-fill"
//                 style={{
//                   width: index < currentStoryIndex ? '100%' : 
//                          index === currentStoryIndex ? `${progress}%` : '0%'
//                 }}
//               />
//             </div>
//           ))}
//         </div>

//         <div className="story-header">
//           <div className="story-user-info">
//             <img src={agentImage} alt={agentName} className="story-user-avatar" />
//             <span className="story-user-name">{agentName}</span>
//             <span className="story-time">لحظاتی پیش</span>
//           </div>
//           <button className="story-close-btn" onClick={onClose}>✕</button>
//         </div>

//         <div className="story-content">
//           <img src={currentStory.url} alt={currentStory.caption || 'استوری'} className="story-image" />
          
//           {currentStory.caption && (
//             <div className="story-caption">{currentStory.caption}</div>
//           )}

//           {currentStory.link && (
//             <div className="story-link-button" onClick={() => handleStoryLink(currentStory.link)}>
//               <FaLink />
//               <span>{currentStory.linkText || 'مشاهده بیشتر'}</span>
//             </div>
//           )}
//         </div>

//         <div className="story-nav-left" onClick={handlePrevStory} />
//         <div className="story-nav-right" onClick={handleNextStory} />
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // ========== کامپوننت SafeImage ==========
// // ============================================================
// const SafeImage = ({ src, alt, className, fallbackSrc, ...props }) => {
//   const [error, setError] = useState(false);

//   if (!src || error) {
//     return (
//       <img 
//         src={fallbackSrc || 'https://randomuser.me/api/portraits/men/32.jpg'} 
//         alt={alt || 'تصویر'} 
//         className={className}
//         {...props}
//       />
//     );
//   }

//   return (
//     <img
//       src={src}
//       alt={alt}
//       className={className}
//       onError={() => {
//         setError(true);
//       }}
//       {...props}
//     />
//   );
// };

// // ============================================================
// // ========== توابع کمکی ==========
// // ============================================================
// const stripHtml = (html) => {
//   if (!html) return '';
//   const temp = document.createElement('div');
//   temp.innerHTML = html;
//   return temp.textContent || temp.innerText || '';
// };

// const truncateText = (text, maxLength) => {
//   if (!text) return '';
//   if (text.length <= maxLength) return text;
//   return text.substring(0, maxLength - 2) + '…';
// };

// // ============================================================
// // ========== کامپوننت‌های متا ==========
// // ============================================================
// const PageMetadata = ({ property, isForSale, isForRent }) => {
//   useEffect(() => {
//     if (!property) return;
//     let title = property.title 
//       ? `${truncateText(property.title, 40)} | ${isForSale ? 'فروش' : 'رهن و اجاره'} ${property.area}م ${property.regionName}`
//       : `ملک ${property.area} متری ${property.regionName}`;
//     title = truncateText(title, 65);
//     document.title = title;
//     const plainDescription = stripHtml(property.description || '');
//     const priceText = isForSale ? `قیمت: ${property.price} تومان` : `رهن: ${property.mortgagePrice || property.depositPrice || 'تماس بگیرید'} تومان`;
//     let description = plainDescription ? truncateText(plainDescription, 120) + `... ${priceText}` : `ملک ${isForSale ? 'فروش' : 'رهن و اجاره'} در ${property.regionName}، ${property.area} متری، ${property.rooms} خوابه - ${priceText}`;
//     description = truncateText(description, 155);
//     const keywords = [property.title, `${property.regionName} ملک`, isForSale ? 'فروش آپارتمان' : 'رهن آپارتمان', `${property.area} متری`, `${property.rooms} خوابه`, `طبقه ${property.floor}`, property.year !== "نامشخص" ? `ساخت ${property.year}` : '', ...property.features.slice(0, 5)].filter(Boolean).join(',');
//     const updateOrCreateMeta = (name, content, isProperty = false) => {
//       const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
//       let meta = document.querySelector(selector);
//       if (!meta) {
//         meta = document.createElement('meta');
//         if (isProperty) meta.setAttribute('property', name);
//         else meta.setAttribute('name', name);
//         document.head.appendChild(meta);
//       }
//       meta.setAttribute('content', content);
//     };
//     updateOrCreateMeta('description', description);
//     updateOrCreateMeta('keywords', keywords);
//     updateOrCreateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1');
//     let canonical = document.querySelector('link[rel="canonical"]');
//     if (!canonical) {
//       canonical = document.createElement('link');
//       canonical.rel = 'canonical';
//       document.head.appendChild(canonical);
//     }
//     canonical.href = window.location.href;
//     updateOrCreateMeta('og:title', title, true);
//     updateOrCreateMeta('og:description', truncateText(description, 200), true);
//     updateOrCreateMeta('og:image', property.images?.[0] || '/default-property-image.jpg', true);
//     updateOrCreateMeta('og:url', window.location.href, true);
//     updateOrCreateMeta('og:type', 'product', true);
//     updateOrCreateMeta('og:locale', 'fa_IR', true);
//     updateOrCreateMeta('og:site_name', 'مشاور املاک', true);
//     updateOrCreateMeta('twitter:card', 'summary_large_image');
//     updateOrCreateMeta('twitter:title', title);
//     updateOrCreateMeta('twitter:description', truncateText(description, 200));
//     updateOrCreateMeta('twitter:image', property.images?.[0] || '/default-property-image.jpg');
//     document.documentElement.lang = 'fa';
//     document.documentElement.dir = 'rtl';
//   }, [property, isForSale, isForRent]);
//   return null;
// };

// const StructuredData = ({ property, isForSale, isForRent }) => {
//   useEffect(() => {
//     if (!property) return;
//     const removeOldScript = () => { const oldScript = document.getElementById('json-ld-structured-data'); if (oldScript) oldScript.remove(); };
//     removeOldScript();
//     const parsePriceToNumber = (priceStr) => { if (!priceStr || priceStr === '۰') return '0'; return String(priceStr).replace(/[^0-9]/g, '') || '0'; };
//     const structuredData = {
//       "@context": "https://schema.org", "@type": isForSale ? "Product" : "RealEstateListing", "name": property.title,
//       "description": stripHtml(property.description || '').substring(0, 500), "image": property.images.slice(0, 10), "url": window.location.href,
//       "datePublished": new Date().toISOString(), "dateModified": new Date().toISOString(),
//       ...(isForSale && { "offers": { "@type": "Offer", "price": parsePriceToNumber(property.price), "priceCurrency": "IRR", "availability": "https://schema.org/InStock", "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] } }),
//       ...(isForRent && { "offers": { "@type": "Offer", "price": parsePriceToNumber(property.mortgagePrice || property.rentPrice || '0'), "priceCurrency": "IRR", "description": "ملک رهن و اجاره" } }),
//       "address": { "@type": "PostalAddress", "addressLocality": property.regionName, "streetAddress": property.address, "addressCountry": "IR", "addressRegion": "تهران" },
//       "floorSize": { "@type": "QuantitativeValue", "value": property.area || 0, "unitCode": "MTK", "unitText": "متر مربع" },
//       "numberOfRooms": property.rooms || 0,
//       "additionalProperty": [{ "@type": "PropertyValue", "name": "طبقه", "value": `${property.floor || 1} از ${property.totalFloors || 1}` }, { "@type": "PropertyValue", "name": "سال ساخت", "value": property.year !== "نامشخص" ? property.year : "نامشخص" }, ...property.features.slice(0, 15).map(feature => ({ "@type": "PropertyValue", "name": "امکانات", "value": feature }))],
//       "potentialAction": { "@type": "CommunicateAction", "name": "تماس با مشاور", "target": { "@type": "EntryPoint", "urlTemplate": `tel:${property.agent?.phone || ''}`, "inLanguage": "fa-IR", "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"] } }
//     };
//     const script = document.createElement('script');
//     script.id = 'json-ld-structured-data';
//     script.type = 'application/ld+json';
//     script.textContent = JSON.stringify(structuredData);
//     document.head.appendChild(script);
//     return () => removeOldScript();
//   }, [property, isForSale, isForRent]);
//   return null;
// };

// const BreadcrumbStructuredData = ({ property, isForSale }) => {
//   useEffect(() => {
//     if (!property) return;
//     const removeOldScript = () => { const oldScript = document.getElementById('json-ld-breadcrumb'); if (oldScript) oldScript.remove(); };
//     removeOldScript();
//     const baseUrl = window.location.origin;
//     const regionSlug = encodeURIComponent(property.regionName || 'منطقه');
//     const breadcrumbData = {
//       "@context": "https://schema.org", "@type": "BreadcrumbList",
//       "itemListElement": [
//         { "@type": "ListItem", "position": 1, "name": "صفحه اصلی", "item": `${baseUrl}/` },
//         { "@type": "ListItem", "position": 2, "name": isForSale ? "آپارتمان‌های فروش" : "آپارتمان‌های رهن و اجاره", "item": `${baseUrl}/${isForSale ? 'RealEstatePageDetail' : 'rent'}` },
//         { "@type": "ListItem", "position": 3, "name": `منطقه ${property.regionName}`, "item": `${baseUrl}/region/${regionSlug}` },
//         { "@type": "ListItem", "position": 4, "name": truncateText(property.title || 'جزئیات ملک', 80), "item": window.location.href }
//       ]
//     };
//     const script = document.createElement('script');
//     script.id = 'json-ld-breadcrumb';
//     script.type = 'application/ld+json';
//     script.textContent = JSON.stringify(breadcrumbData);
//     document.head.appendChild(script);
//     return () => removeOldScript();
//   }, [property, isForSale]);
//   return null;
// };

// // ============================================================
// // ========== Skeleton ==========
// // ============================================================
// const DetailSkeleton = () => (
//   <div className="detail-skeleton">
//     <div className="skeleton-header"><div className="skeleton-circle"></div><div className="skeleton-title"></div><div className="skeleton-circle"></div></div>
//     <div className="skeleton-gallery"><div className="skeleton-image"></div></div>
//     <div className="skeleton-content"><div className="skeleton-price"></div><div className="skeleton-info">{[]}</div><div className="skeleton-tabs">{[]}</div><div className="skeleton-text">{[]}</div></div>
//   </div>
// );

// // ============================================================
// // ========== کامپوننت اصلی ==========
// // ============================================================
// const RealEstateDetailPageItem = memo(() => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { id: paramId } = useParams();
//   const queryParams = new URLSearchParams(location.search);
//   const id = paramId || queryParams.get('id');
  
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [copied, setCopied] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [activeTab, setActiveTab] = useState('details');
  
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [bookmarkLoading, setBookmarkLoading] = useState(false);
  
//   const [imagesLoaded, setImagesLoaded] = useState({});
//   const [showStoryPopup, setShowStoryPopup] = useState(false);
//   const [storyUserId, setStoryUserId] = useState(null);
  
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   // ===== state های گالری =====
//   const [showGalleryModal, setShowGalleryModal] = useState(false);
//   const [galleryStartIndex, setGalleryStartIndex] = useState(0);

//   // ===== state های گزارش تخلف =====
//   const [showReportModal, setShowReportModal] = useState(false);

//   // ===== state های مدیریت بازدید =====
//   const [viewSent, setViewSent] = useState(false);

//   // ===== تابع باز کردن گالری =====
//   const openGallery = useCallback((index) => {
//     setGalleryStartIndex(index);
//     setShowGalleryModal(true);
//     document.body.style.overflow = 'hidden';
//   }, []);

//   // ===== تابع بستن گالری =====
//   const closeGallery = useCallback(() => {
//     setShowGalleryModal(false);
//     document.body.style.overflow = '';
//   }, []);

//   // ===== تابع باز کردن مودال گزارش تخلف =====
//   const handleReportClick = useCallback(() => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//       return;
//     }
//     setShowReportModal(true);
//   }, [isLoggedIn]);

//   // ===== تابع بستن مودال گزارش تخلف =====
//   const closeReportModal = useCallback(() => {
//     setShowReportModal(false);
//   }, []);

//   // ===== بررسی لاگین =====
//   useEffect(() => {
//     const checkLogin = () => {
//       const token = localStorage.getItem('auth_token');
//       setIsLoggedIn(!!token);
//     };
    
//     checkLogin();
    
//     window.addEventListener('authChange', checkLogin);
//     window.addEventListener('storage', checkLogin);
    
//     return () => {
//       window.removeEventListener('authChange', checkLogin);
//       window.removeEventListener('storage', checkLogin);
//     };
//   }, []);

//   // ===== ارسال بازدید غیرتکراری به API =====
//   const sendViewCount = useCallback(async (realEstateId) => {
//     try {
//       // جلوگیری از ارسال مجدد در همین رندر
//       if (viewSent) {
//         console.log('⏳ بازدید قبلاً ارسال شده است');
//         return;
//       }

//       const storageKey = `viewed_property_${realEstateId}`;
      
//       // بررسی در localStorage
//       const storedData = localStorage.getItem(storageKey);
      
//       if (storedData) {
//         try {
//           const viewData = JSON.parse(storedData);
//           const viewDate = new Date(viewData.timestamp);
//           const now = new Date();
//           const daysDiff = (now - viewDate) / (1000 * 60 * 60 * 24);
          
//           // اگر از تاریخ انقضا گذشته، اجازه ارسال مجدد بده
//           if (daysDiff > VIEW_EXPIRY_DAYS) {
//             localStorage.removeItem(storageKey);
//             sessionStorage.removeItem(storageKey);
//             console.log('⏰ انقضای بازدید، ارسال مجدد...');
//           } else {
//             console.log('✅ این ملک قبلاً توسط این کاربر مشاهده شده است');
//             return;
//           }
//         } catch (parseError) {
//           // اگر داده خراب بود، حذف کن
//           localStorage.removeItem(storageKey);
//           sessionStorage.removeItem(storageKey);
//         }
//       }

//       // بررسی در sessionStorage (برای این جلسه)
//       const sessionViewed = sessionStorage.getItem(storageKey);
//       if (sessionViewed) {
//         console.log('✅ این ملک در این جلسه مشاهده شده است');
//         return;
//       }

//       // ===== ارسال درخواست به API =====
//       console.log('📡 ارسال بازدید برای ملک:', realEstateId);
      
//       const token = localStorage.getItem('auth_token');
//       const response = await fetch('https://localhost:7178/api/RealEstatePage/UpdateViewCount', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           // ...(token && { 'Authorization': `Bearer ${token}` })
//         },
//         body: JSON.stringify(realEstateId) // ارسال id به صورت عدد در body
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log('✅ بازدید با موفقیت ثبت شد:', result);
        
//         // ذخیره در localStorage با تاریخ
//         const viewData = {
//           timestamp: new Date().toISOString(),
//           realEstateId: realEstateId
//         };
//         localStorage.setItem(storageKey, JSON.stringify(viewData));
        
//         // ذخیره در sessionStorage برای این جلسه
//         sessionStorage.setItem(storageKey, 'true');
        
//         // جلوگیری از ارسال مجدد
//         setViewSent(true);
        
//         // به‌روزرسانی views در UI
//         setProperty(prev => prev ? {
//           ...prev,
//           views: (prev.views || 0) + 1
//         } : prev);
        
//       } else {
//         console.error('❌ خطا در ثبت بازدید:', response.status);
//         const errorText = await response.text();
//         console.error('❌ جزئیات خطا:', errorText);
//       }
//     } catch (error) {
//       console.error('❌ خطا در ارسال بازدید:', error);
//     }
//   }, [viewSent]);

//   // ===== پاکسازی بازدیدهای منقضی شده =====
//   const cleanExpiredViews = useCallback(() => {
//     try {
//       const keys = Object.keys(localStorage);
//       let cleanedCount = 0;
      
//       keys.forEach(key => {
//         if (key.startsWith('viewed_property_')) {
//           try {
//             const data = JSON.parse(localStorage.getItem(key));
//             const viewDate = new Date(data.timestamp);
//             const now = new Date();
//             const daysDiff = (now - viewDate) / (1000 * 60 * 60 * 24);
            
//             if (daysDiff > VIEW_EXPIRY_DAYS) {
//               localStorage.removeItem(key);
//               sessionStorage.removeItem(key);
//               cleanedCount++;
//             }
//           } catch {
//             localStorage.removeItem(key);
//             sessionStorage.removeItem(key);
//             cleanedCount++;
//           }
//         }
//       });
      
//       if (cleanedCount > 0) {
//         console.log(`🧹 ${cleanedCount} بازدید منقضی پاکسازی شد`);
//       }
//     } catch (error) {
//       console.error('❌ خطا در پاکسازی:', error);
//     }
//   }, []);

//   // ===== دریافت اطلاعات ملک =====
//   useEffect(() => {
//     const fetchPropertyData = async () => {
//       if (!id) { 
//         setError('شناسه ملک یافت نشد'); 
//         setLoading(false); 
//         return; 
//       }
      
//       setLoading(true); 
//       setError(null);
      
//       try {
//         const token = localStorage.getItem('auth_token');
//         const controller = new AbortController();
//         const timeoutId = setTimeout(() => controller.abort(), 10000);
        
//         const API_BASE_URL = 'https://localhost:7178/api';
        
//         const headers = {
//           'Content-Type': 'application/json',
//         };
        
//         if (token) {
//           headers['Authorization'] = `Bearer ${token}`;
//         }
        
//         const response = await fetch(
//           `${API_BASE_URL}/RealEstatePage/GetRealEstateDetails?id=${id}`,
//           { 
//             signal: controller.signal,
//             headers: headers
//           }
//         );

//         clearTimeout(timeoutId);
        
//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }
        
//         const result = await response.json();
//         console.log('📦 Full API response:', result);
        
//         if (result.status === 200 && result.data) {
//           const data = result.data;
          
//           const agentImage = data.agents?.image 
//             ? `https://localhost:7178/${data.agents.image}` 
//             : "https://randomuser.me/api/portraits/men/32.jpg";
          
//           const userId = data.agents?.userId || null;
//           const hasStory = data.agents?.hasStory || false;
          
//           console.log('👤 Agent UserId:', userId);
//           console.log('📱 HasStory:', hasStory);
//           console.log('📕 inBookMark از سرور:', data.inBookMark);
//           console.log('📕 isLoggedIn:', isLoggedIn);
          
//           const bookmarkedValue = isLoggedIn ? (data.inBookMark === true) : false;
//           console.log('📕 مقدار نهایی بوک‌مارک:', bookmarkedValue);
          
//           setIsBookmarked(bookmarkedValue);
//           setStoryUserId(hasStory ? userId : null);
          
//           const propertyData = {
//             id: data.id, 
//             title: data.title || `ملک در ${data.regionName || 'منطقه'} `, 
//             price: data.price?.toLocaleString("fa-IR") || "۰",
//             priceMeter: data.priceMeter?.toLocaleString("fa-IR") || "۰", 
//             rentPrice: data.rent?.toLocaleString("fa-IR") || null,
//             depositPrice: data.deposit?.toLocaleString("fa-IR") || null, 
//          //   mortgagePrice: data.rent?.toLocaleString("fa-IR") || null,
//             type: data.categoryType, 
//             area: data.squareMeter, //parseInt(data.squareMeter?.match(/\d+/)?.[0]) || 0, 
//             rooms: data.rooms || 0,
//             floor: data.floor || 1, 
//             regionName: data.regionName || "منطقه نامشخص", 
//             totalFloors: data.countFloor || 1,
//             year: data.constructionYear || "نامشخص", 
//             address: data.address || "آدرس درج نشده", 
//             showExactLocation: data.showExactLocation,
//             location: { lat: data.lat || 35.7199363, lng: data.lng || 51.4334842 },
//             description: data.descriptionRows || "توضیحاتی برای این ملک ثبت نشده است.", 
//             features: data.facilities || [],
//             warnings: data.warnings || ["استعلام خلافی", "بررسی سند مالکیت", "استعلام پایان کار", "بررسی مفاصا حساب"],
//             images: (data.images || []).map(img => `https://localhost:7178/${img}`),
//             agent: { 
//               name: data.agents?.name || "مشاور املاک", 
//               phone: data.agents?.phone || "۰۲۱۹۱۰۰۰۰۰۰", 
//               whatsapp: data.agents?.connectSocialMedia || "", 
//               address: data.agents?.address || "آدرس دفتر درج نشده", 
//               rating: data.agents?.rating || 4.5, 
//               deals: data.agents?.deals || 120, 
//               image: agentImage,
//               hasStory: hasStory,
//               userId: userId
//             },
//             views: data.views || 0, 
//             saved: data.saved || 0, 
//             inBookMark: data.inBookMark,
//             createdAt: data.createdAtPersianRelative || "امروز", 
//             certificate: data.isHasLoan ? "قابل وام" : "سند رسمی", 
//             mortgage: data.isHasLoan ? "امکان وام" : "بدون وام",
//             nearby: [{ name: "مترو", distance: "۵۰۰ متر" }, { name: "مرکز خرید", distance: "۳۰۰ متر" }, { name: "پارک", distance: "۲۰۰ متر" }, { name: "مدرسه", distance: "۴۰۰ متر" }]
//           };
          
//           setProperty(propertyData);

//           // ===== ارسال بازدید غیرتکراری =====
//           await sendViewCount(id);
          
//         } else {
//           throw new Error(result.message || 'ملک یافت نشد');
//         }
//       } catch (error) { 
//         console.error('خطا:', error); 
//         setError(error.name === 'AbortError' ? 'مدت زمان درخواست به پایان رسید' : 'مشکل در ارتباط با سرور'); 
//       } finally { 
//         setLoading(false); 
//       }
//     };
    
//     // پاکسازی بازدیدهای منقضی
//     cleanExpiredViews();
    
//     fetchPropertyData();
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [id, isLoggedIn, sendViewCount, cleanExpiredViews]);

//   // ===== تابع بوک‌مارک =====
//   const handleBookmarkToggle = useCallback(async () => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//       return;
//     }

//     if (bookmarkLoading) return;

//     setBookmarkLoading(true);
    
//     try {
//       const token = localStorage.getItem('auth_token');
      
//       const response = await fetch('https://localhost:7178/api/RealEstatePage/ToggleBookMark', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(property?.id),
//       });

//       if (response.ok) {
//         setIsBookmarked(prev => !prev);
//         console.log('✅ بوک‌مارک با موفقیت تغییر کرد');
//       } else {
//         const errorData = await response.json();
//         console.error('❌ خطا در بوک‌مارک:', errorData);
//         alert('مشکل در ذخیره بوک‌مارک. لطفاً دوباره تلاش کنید.');
//       }
//     } catch (error) {
//       console.error('❌ خطا در ارتباط با سرور:', error);
//       alert('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
//     } finally {
//       setBookmarkLoading(false);
//     }
//   }, [isLoggedIn, property, isBookmarked, bookmarkLoading]);

//   // ===== توابع تماس =====
//   const handlePhoneClick = useCallback(() => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//       return;
//     }
//     if (!property?.agent?.phone) {
//       alert('شماره تماس در دسترس نیست');
//       return;
//     }
//     navigator.clipboard.writeText(property.agent.phone);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   }, [isLoggedIn, property]);

//   const handleWhatsAppClick = useCallback(() => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//       return;
//     }
//     if (!property?.agent?.whatsapp) {
//       alert('شماره واتساپ در دسترس نیست');
//       return;
//     }
//     window.open(`https://wa.me/${property.agent.whatsapp.replace(/\s/g, '')}`, '_blank');
//   }, [isLoggedIn, property]);

//   // ===== سایر توابع =====
//   const isForSale = useMemo(() => property?.type === 1, [property]);
//   const isForRent = useMemo(() => property?.type === 2, [property]);
//   const formattedPricePerMeter = useMemo(() => { 
//     if (!property?.priceMeter || property.priceMeter === "۰") return null; 
//     return `${property.priceMeter} تومان`; 
//   }, [property]);
//   const shareUrl = useMemo(() => window.location.href, []);

//   const handleCopyLink = useCallback(() => { 
//     navigator.clipboard.writeText(shareUrl); 
//     setCopied(true); 
//     setTimeout(() => setCopied(false), 2000); 
//   }, [shareUrl]);
  
//   const handleShare = useCallback(async () => { 
//     if (!property) return; 
//     const shareData = { 
//       title: property.title, 
//       text: `${property.title} - ${property.area} متری - ${isForSale ? `قیمت ${property.price}` : `رهن ${property.mortgagePrice}`} تومان`, 
//       url: shareUrl 
//     }; 
//     if (navigator.share && /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)) { 
//       try { 
//         await navigator.share(shareData); 
//       } catch (error) { 
//         if (error.name !== 'AbortError') handleCopyLink(); 
//       } 
//     } else handleCopyLink(); 
//   }, [property, isForSale, shareUrl, handleCopyLink]);
  
//   const handleImageLoad = useCallback((index) => { 
//     setImagesLoaded(prev => ({ ...prev, [index]: true })); 
//   }, []);
  
//   // ===== تابع رفتن به پروفایل =====
//   const goToProfile = useCallback(() => {
//     if (!property || !property.agent || !property.agent.userId) {
//       console.warn('اطلاعات کاربر برای رفتن به پروفایل موجود نیست');
//       return;
//     }
    
//     try {
//       const agentName = property.agent.name || 'مشاور';
//       const userId = property.agent.userId;
      
//       // ساخت slug از نام
//       const nameSlug = agentName
//         .replace(/\s+/g, '-')
//         .replace(/[^آ-یa-zA-Z0-9-]/g, '')
//         .substring(0, 50);
      
//       // ذخیره userId در localStorage برای استفاده در صفحه پروفایل
//       localStorage.setItem('temp_profile_userId', userId);
      
//       // رفتن به صفحه پروفایل با نام در URL و userId در state
//       navigate(`/profile/${nameSlug}`, {
//         state: { userId: userId }
//       });
//     } catch (error) {
//       console.error('خطا در رفتن به پروفایل:', error);
//       navigate('/');
//     }
//   }, [property, navigate]);

//   const handleStoryClick = useCallback((e) => {
//     if (e) {
//       e.stopPropagation();
//     }
    
//     if (storyUserId) {
//       setShowStoryPopup(true);
//       document.body.style.overflow = 'hidden';
//     }
//   }, [storyUserId]);

//   const handleStoryClose = useCallback(() => {
//     setShowStoryPopup(false);
//     document.body.style.overflow = '';
//   }, []);

//   const handleLoginModalClose = useCallback(() => {
//     setShowLoginModal(false);
//     const token = localStorage.getItem('auth_token');
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   // ============================================================
//   // ===== رندر =====
//   // ============================================================
//   if (error) return ( 
//     <> 
//       <PageMetadata property={null} /> 
//       <div className="detail-container realestate-detail">
//         <div className="detail-header">
//           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
//           <h1 className="header-title">خطا</h1>
//           <div className="header-btn"></div>
//         </div>
//         <div className="error-message">
//           <h2>متاسفانه خطایی رخ داده است</h2>
//           <p>{error}</p>
//           <button onClick={() => window.location.reload()}>تلاش مجدد</button>
//           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
//         </div>
//       </div>
//     </> 
//   );
  
//   if (loading) return <DetailSkeleton />;
  
//   if (!property) return ( 
//     <> 
//       <PageMetadata property={null} /> 
//       <div className="detail-container realestate-detail">
//         <div className="detail-header">
//           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
//           <h1 className="header-title">ملک یافت نشد</h1>
//           <div className="header-btn"></div>
//         </div>
//         <div className="error-message">
//           <p>متاسفانه ملک مورد نظر یافت نشد</p>
//           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
//         </div>
//       </div>
//     </> 
//   );

//   return ( 
//     <>
//       <PageMetadata property={property} isForSale={isForSale} isForRent={isForRent} />
//       <StructuredData property={property} isForSale={isForSale} isForRent={isForRent} />
//       <BreadcrumbStructuredData property={property} isForSale={isForSale} />
      
//       {showStoryPopup && (
//         <StoryPopup 
//           agentName={property.agent.name}
//           agentImage={property.agent.image}
//           userId={storyUserId}
//           onClose={handleStoryClose}
//         />
//       )}

//       {showLoginModal && (
//         <LoginModal 
//           onClose={handleLoginModalClose}
//           triggerSource="real-estate-detail"
//         />
//       )}

//       {/* مودال گزارش تخلف */}
//       {showReportModal && (
//         <ReportViolationModal
//           propertyId={property.id}
//           propertyTitle={property.title}
//           onClose={closeReportModal}
//           onSuccess={() => {
//             setCopied(true);
//             setTimeout(() => setCopied(false), 3000);
//           }}
//         />
//       )}

//       {/* گالری تمام‌صفحه */}
//       {showGalleryModal && (
//         <ImageGalleryModal 
//           images={property.images}
//           initialIndex={galleryStartIndex}
//           onClose={closeGallery}
//         />
//       )}
      
//       <div className="detail-container realestate-detail">
//         <nav className="breadcrumb-nav">
//           <ol className="breadcrumb-list">
//             <li className="breadcrumb-item"><a href="/">خانه</a></li>
//             <li className="breadcrumb-item"><a href={isForSale ? '/sale' : '/rent'}>{isForSale ? 'فروش آپارتمان' : 'رهن و اجاره آپارتمان'}</a></li>
//             <li className="breadcrumb-item"><a href={`/region/${encodeURIComponent(property.regionName)}`}>منطقه {property.regionName}</a></li>
//             <li className="breadcrumb-item active">{truncateText(property.title, 50)}</li>
//           </ol>
//         </nav>
        
//         <div className="detail-header">
//           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
//           <h1 className="header-title">{property.title}</h1>
//           <div className="header-actions">
//             <button className="header-btn report-btn" onClick={handleReportClick} title="گزارش تخلف">
//               <FaFlag />
//             </button>
//             <button className="header-btn" onClick={handleShare}><FaShare /></button>
//           </div>
//         </div>
        
//         <div className="detail-gallery">
//           <Swiper 
//             modules={[Navigation, Pagination, Autoplay]} 
//             navigation 
//             pagination={{ clickable: true }} 
//             autoplay={{ delay: 4000, disableOnInteraction: false }} 
//             spaceBetween={0} 
//             slidesPerView={1} 
//             onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)} 
//             className="gallery-swiper"
//           >
//             {property.images.length > 0 ? 
//               property.images.map((img, index) => (
//                 <SwiperSlide key={index}>
//                   <div 
//                     className="gallery-slide"
//                     onClick={() => openGallery(index)}
//                     style={{ cursor: 'pointer' }}
//                   >
//                     {!imagesLoaded[index] && <div className="image-placeholder"><FaHome /></div>}
//                     <img 
//                       src={img} 
//                       alt={`${property.title} - ${index === 0 ? 'نمای اصلی' : `تصویر ${index + 1}`}`} 
//                       loading={index === 0 ? 'eager' : 'lazy'} 
//                       onLoad={() => handleImageLoad(index)} 
//                       style={{ display: imagesLoaded[index] ? 'block' : 'none' }} 
//                     />
//                   </div>
//                 </SwiperSlide>
//               )) : 
//               (<SwiperSlide>
//                 <div className="gallery-slide no-image">
//                   <FaHome />
//                   <span>تصویری موجود نیست</span>
//                 </div>
//               </SwiperSlide>)
//             }
//           </Swiper>
          
//           <button 
//             className={`bookmark-btn ${isBookmarked ? 'active' : ''}`} 
//             onClick={handleBookmarkToggle}
//             disabled={bookmarkLoading}
//             title={isBookmarked ? 'حذف از بوک‌مارک‌ها' : 'افزودن به بوک‌مارک‌ها'}
//           >
//             {bookmarkLoading ? (
//               <FaSpinner className="spinner" />
//             ) : (
//               isBookmarked ? <FaBookmark /> : <FaRegBookmark />
//             )}
//           </button>
          
//           {/* دکمه گزارش تخلف در گالری */}
//           <button 
//             className={`report-flag-btn ${!isLoggedIn ? 'locked' : ''}`}
//             onClick={handleReportClick}
//             title="گزارش تخلف"
//           >
//             <FaFlag />
//             {!isLoggedIn && (
//               <span className="report-lock-badge">
//                 <FaLock className="lock-icon-small" />
//               </span>
//             )}
//           </button>
          
//           <div className="image-counter">{selectedImage + 1} / {property.images.length || 1}</div>
//         </div>
        
//         <div className="detail-main">
//           <div className="detail-title-section">
//             <div className="title-row">
//               <div className="property-stats">
//                 <span className="stat-badge"><FaEye /> {property.views.toLocaleString('fa-IR')} بازدید</span>
//                 <span className="stat-badge">
//                   <FaBookmark /> {property.saved.toLocaleString('fa-IR')} ذخیره
//                 </span>
//                 <span className="stat-badge"><FaClock /> {property.createdAt}</span>
//               </div>
//             </div>
//           </div>
          
//           <div className="price-section">
//             {isForSale && (
//               <div className="price-card sale-price">
//                 <div className="price-card-icon"><FaTag /></div>
//                 <div className="price-card-content">
//                   <span className="price-label">قیمت فروش</span>
//                   <div className="price-value-wrapper">
//                     <span className="price-number">{property.price}</span>
//                     <span className="price-unit">تومان</span>
//                   </div>
//                   {formattedPricePerMeter && 
//                     <div className="price-meta">
//                       <FaRuler />
//                       <span>متری {formattedPricePerMeter}</span>
//                     </div>
//                   }
//                 </div>
//               </div>
//             )}
            
//             {isForRent && (
//               <div className="rent-price-group">
//                 {property.depositPrice && property.depositPrice !== "۰" && (
//                   <div className="price-card mortgage-price">
//                     <div className="price-card-icon"><FaBuilding /></div>
//                     <div className="price-card-content">
//                       <span className="price-label-deposit">مبلغ رهن</span>
//                       <div className="price-value-wrapper">
//                         <span className="price-number">{property.depositPrice}</span>
//                         <span className="price-unit">تومان</span>
//                       </div>
//                     </div>
                    
//                   </div>
//                 )}
//                 {property.rentPrice && property.rentPrice !== "۰" && (
//                   <div className="price-card rent-price">
//                     <div className="price-card-icon"><FaHome /></div>
//                     <div className="price-card-content">
//                       <span className="price-label-deposit">اجاره ماهانه</span>
//                       <div className="price-value-wrapper">
//                         <span className="price-number">{property.rentPrice}</span>
//                         <span className="price-unit">تومان</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
          
//           <div className="quick-specs">
//             <div className="spec-item">
//               <FaRulerCombined />
//               <span className="spec-label">متراژ</span>
//               <span className="spec-value">{property.area} متر²</span>
//             </div>
//             <div className="spec-item">
//               <FaBath />
//               <span className="spec-label">اتاق‌خواب</span>
//               <span className="spec-value">{property.rooms} خواب</span>
//             </div>
//             <div className="spec-item">
//               <FaLayerGroup />
//               <span className="spec-label">طبقه</span>
//               <span className="spec-value">{property.floor} از {property.totalFloors}</span>
//             </div>
//             <div className="spec-item">
//               <FaCalendarAlt />
//               <span className="spec-label">سال ساخت</span>
//               <span className="spec-value">{property.year}</span>
//             </div>
//           </div>
          
//           <div className="info-chips">
//             <span className="info-chip">کد ملک: {property.id}</span>
//             <span className="info-chip"><FaShieldAlt /> {property.certificate}</span>
//             <span className="info-chip type-chip">{isForSale ? 'فروش' : 'رهن و اجاره'}</span>
//           </div>
          
//           <div className="detail-tabs">
//             <button className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`} onClick={() => setActiveTab('details')}>جزئیات ملک</button>
//             <button className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`} onClick={() => setActiveTab('features')}>امکانات ({property.features.length})</button>
//             <button className={`tab-btn ${activeTab === 'warnings' ? 'active' : ''}`} onClick={() => setActiveTab('warnings')}>هشدارهای معامله</button>
//             <button className={`tab-btn ${activeTab === 'nearby' ? 'active' : ''}`} onClick={() => setActiveTab('nearby')}>امکانات اطراف</button>
//           </div>
          
//           <div className="tab-content">
//             {activeTab === 'details' && (
//               <div className="details-tab">
//                 <div className="address-card">
//                   <FaMapMarkerAlt />
//                   <div className="address-info">
//                     <h3>آدرس ملک</h3>
//                     <div>منطقه {property.regionName}</div>
//                     <p>{property.address}</p>
//                     <span className="post-date">تاریخ درج: {property.createdAt}</span>
//                   </div>
//                 </div>
//                 <div className="description-card">
//                   <h3>توضیحات کامل {property.title}</h3>
//                   <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(property.description, { ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'a', 'blockquote'], ALLOWED_ATTR: ['href', 'target'] }) }} />
//                 </div>
//                 <div className="map-card">
//                   <h3><FaMapMarkerAlt /> موقعیت مکانی ملک در منطقه {property.regionName}</h3>
//                   <div className="map-location-badge">
//                     {property.showExactLocation ? 
//                       <span className="badge exact">📍 نمایش موقعیت دقیق ملک</span> : 
//                       <span className="badge approximate">🔵 نمایش محدوده تقریبی</span>
//                     }
//                   </div>
//                   <div className="map-container">
//                     <NeshanMap 
//                       mapKey="web.31c5ea6c425e40cc9b30620a84a8be90" 
//                       center={{ latitude: property.location.lat, longitude: property.location.lng }} 
//                       zoom={property.showExactLocation ? 17 : 15.9} 
//                       defaultType="dreamy" 
//                       poi={true} 
//                       traffic={false} 
//                       style={{ height: '100%', width: '100%', pointerEvents: 'none' }} 
//                     />
//                     <div className="map-marker-overlay">
//                       {property.showExactLocation ? 
//                         <><div className="location-dot"></div><div className="location-ripple"></div></> : 
//                         <div className="location-circles"><div className="circle-3"></div></div>
//                       }
//                     </div>
//                   </div>
//                   <div className="map-privacy-note">
//                     <small>{property.showExactLocation ? '📍 موقعیت دقیق ملک' : '📍 محدوده تقریبی ملک'}</small>
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {activeTab === 'features' && (
//               <div className="features-tab">
//                 <h3>امکانات و ویژگی‌ها</h3>
//                 <div className="features-grid">
//                   {property.features.length > 0 ? 
//                     property.features.map((feature, idx) => {
//                       let Icon = FaCheckCircle;
//                       if (feature.includes('پارکینگ')) Icon = FaParking;
//                       else if (feature.includes('انباری')) Icon = FaWarehouse;
//                       else if (feature.includes('آسانسور')) Icon = FaArrowUp;
//                       else if (feature.includes('استخر')) Icon = FaSwimmingPool;
//                       return (
//                         <div key={idx} className="feature-card">
//                           <Icon />
//                           <span>{feature}</span>
//                         </div>
//                       );
//                     }) : 
//                     <p className="no-data">امکاناتی ثبت نشده است</p>
//                   }
//                 </div>
//               </div>
//             )}
            
//             {activeTab === 'warnings' && (
//               <div className="warnings-tab">
//                 <h3>⚠️ هشدارهای مهم</h3>
//                 <ul className="warnings-list">
//                   {property.warnings.map((w, idx) => (
//                     <li key={idx} className="warning-item">
//                       <span className="warning-bullet"></span>
//                       <span>{w}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <div className="warning-footer">
//                   <p>⚠️ قبل از معامله مدارک را بررسی کنید</p>
//                 </div>
//               </div>
//             )}
            
//             {activeTab === 'nearby' && (
//               <div className="nearby-tab">
//                 <h3>امکانات اطراف</h3>
//                 <div className="nearby-list">
//                   {property.nearby.map((item, idx) => (
//                     <div key={idx} className="nearby-item">
//                       <span className="nearby-name">{item.name}</span>
//                       <span className="nearby-distance">{item.distance}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
          
//           <div className="agent-card">
//             <div className="agent-header">
//               <div 
//                 className={`agent-avatar-wrapper ${property.agent.hasStory ? 'has-story' : ''}`}
//                 style={{ 
//                   position: 'relative',
//                   display: 'inline-block',
//                   flexShrink: 0,
//                   cursor: property.agent.userId ? 'pointer' : 'default'
//                 }}
//                 onClick={property.agent.userId ? goToProfile : undefined}
//               >
//                 <SafeImage 
//                   src={property.agent.image} 
//                   alt={property.agent.name} 
//                   className={`agent-avatar ${property.agent.hasStory ? 'has-story' : ''}`}
//                   fallbackSrc="https://randomuser.me/api/portraits/men/32.jpg"
//                 />
                
//                 {property.agent.hasStory && (
//                   <div 
//                     className="story-ring-indicator"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleStoryClick(e);
//                     }}
//                   >
//                   </div>
//                 )}
//               </div>
              
//               <div className="agent-info">
//                 <div className="agent-name-wrapper">
//                   <h3 
//                     style={{ cursor: property.agent.userId ? 'pointer' : 'default' }}
//                     onClick={property.agent.userId ? goToProfile : undefined}
//                   >
//                     {property.agent.name}
//                   </h3>
                  
//                   {property.agent.hasStory && (
//                     <span 
//                       className="story-label" 
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleStoryClick(e);
//                       }}
//                       style={{ cursor: 'pointer' }}
//                     >
//                       <span className="story-dot"></span>
//                       استوری
//                     </span>
//                   )}
//                 </div>
//                 <p>{property.agent.address}</p>
//                 <div className="agent-rating">
//                   <FaStar />
//                   <span>{property.agent.rating}</span>
//                   <span>({property.agent.deals} معامله)</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="agent-actions-wrapper">
//               <button 
//                 className={`agent-action-btn phone ${!isLoggedIn ? 'locked' : ''}`}
//                 onClick={handlePhoneClick}
//               >
//                 <FaPhone /> 
//                 <span className="btn-label">
//                   {isLoggedIn ? property.agent.phone : 'شماره تماس'}
//                 </span>
                
//                 {!isLoggedIn && (
//                   <>
//                     <span className="lock-badge">
//                       <FaLock className="lock-icon-small" />
//                     </span>
//                     <div className="lock-overlay">
//                       <FaLock className="lock-icon" />
//                       <span className="lock-text">برای مشاهده شماره</span>
//                       <span className="lock-subtext">وارد سامانه شوید</span>
//                     </div>
//                   </>
//                 )}
//               </button>

//               <button 
//                 className={`agent-action-btn whatsapp ${!isLoggedIn ? 'locked' : ''}`}
//                 onClick={handleWhatsAppClick}
//               >
//                 <FaWhatsapp /> 
//                 <span className="btn-label">واتساپ</span>
                
//                 {!isLoggedIn && (
//                   <>
//                     <span className="lock-badge">
//                       <FaLock className="lock-icon-small" />
//                     </span>
//                     <div className="lock-overlay">
//                       <FaLock className="lock-icon" />
//                       <span className="lock-text">برای مشاهده شماره</span>
//                       <span className="lock-subtext">وارد سامانه شوید</span>
//                     </div>
//                   </>
//                 )}
//               </button>
//             </div>

//             {!isLoggedIn && (
//               <button 
//                 className="login-prompt-btn" 
//                 onClick={() => setShowLoginModal(true)}
//                 style={{ marginTop: '10px' }}
//               >
//                 <FaUser className="login-icon" />
//                 ورود / ثبت‌نام
//                 <FaArrowRight className="arrow-icon" />
//               </button>
//             )}
//           </div>
//         </div>
        
//         <DoubleSidebarBanners />
//         <RelatedPropertiesSlider 
//           currentPropertyId={property.id} 
//           regionName={property.regionName} 
//           propertyType={property.type} 
//         />
        
//         {(copied) && (
//           <div className="toast-notification">
//             <FaCheckCircle /> {copied === 'report' ? 'گزارش تخلف با موفقیت ثبت شد' : 'لینک کپی شد'}
//           </div>
//         )}
//       </div>
//     </> 
//   );
// });

// RealEstateDetailPageItem.displayName = 'RealEstateDetailPageItem';
// export default RealEstateDetailPageItem;

import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import DOMPurify from 'dompurify';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import RelatedPropertiesSlider from './RelatedPropertiesSlider';
import DoubleSidebarBanners from './SidebarBanner';
import LoginModal from './LoginModal/LoginModal';
import { 
  FaMapMarkerAlt, FaPhone, FaWhatsapp, FaShare, FaArrowRight, 
  FaStar, FaParking, FaWarehouse, FaSwimmingPool, FaBath, FaRulerCombined,
  FaCalendarAlt, FaLayerGroup, FaArrowUp, FaCheckCircle, FaTag, FaHome,
  FaBuilding, FaRuler, FaShieldAlt, FaClock, FaEye, FaLink,
  FaLock, FaUser, FaSpinner, FaTimes,
  FaBookmark, FaRegBookmark, FaFlag
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import NeshanMap from "@neshan-maps-platform/react-openlayers";
import "@neshan-maps-platform/react-openlayers/dist/style.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './RealEstateDetailPageItem.css';

// ===== ثابت‌های مدیریت بازدید =====
const VIEW_EXPIRY_DAYS = 30;

// ============================================================
// ========== کامپوننت مودال گزارش تخلف ==========
// ============================================================
const ReportViolationModal = ({ propertyId, propertyTitle, onClose, onSuccess }) => {
  const [violationTypes, setViolationTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchViolationTypes = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem('auth_token');
        
        const response = await fetch('https://localhost:7178/api/RealEstatePage/violation-types', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();
        console.log('📋 انواع تخلف:', result);

        if (result.status === 200 && result.data) {
          setViolationTypes(result.data);
        } else {
          setViolationTypes([]);
        }
      } catch (error) {
        console.error('❌ خطا در دریافت انواع تخلف:', error);
        setError('مشکل در دریافت لیست انواع تخلف');
      } finally {
        setLoading(false);
      }
    };

    fetchViolationTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedType) {
      setError('لطفاً نوع تخلف را انتخاب کنید');
      return;
    }

    if (!description.trim()) {
      setError('لطفاً توضیحات تخلف را وارد کنید');
      return;
    }

    if (description.trim().length < 5) {
      setError('توضیحات باید حداقل ۵ کاراکتر باشد');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('auth_token');

      const payload = {
        id: propertyId,
        desc: description.trim(),
        errorType: parseInt(selectedType)
      };

      console.log('📤 ارسال گزارش تخلف:', payload);

      const response = await fetch('https://localhost:7178/api/RealEstatePage/InsertViolations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ نتیجه ثبت تخلف:', result);

      if (result.status === 200 || result.status === 201) {
        setSuccess(true);
        if (onSuccess) onSuccess();
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error(result.message || 'ثبت گزارش با خطا مواجه شد');
      }
    } catch (error) {
      console.error('❌ خطا در ثبت تخلف:', error);
      setError(error.message || 'مشکل در ثبت گزارش تخلف');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="report-modal-overlay" onClick={onClose}>
      <div className="report-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="report-modal-header">
          <h2>
            <FaFlag className="report-icon" />
            گزارش تخلف
          </h2>
          <button className="report-modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="report-modal-body">
          {success ? (
            <div className="report-success">
              <FaCheckCircle className="success-icon" />
              <h3>گزارش شما با موفقیت ثبت شد</h3>
              <p>کارشناسان ما گزارش شما را بررسی خواهند کرد</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="property-info">اطلاعات ملک</label>
                <div className="property-info-box">
                  <span className="property-id">کد: #{propertyId}</span>
                  <span className="property-title">{propertyTitle}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="violation-type">نوع تخلف <span className="required">*</span></label>
                {loading ? (
                  <div className="loading-types">
                    <FaSpinner className="spinner" />
                    <span>در حال بارگذاری...</span>
                  </div>
                ) : (
                  <select
                    id="violation-type"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className={selectedType ? 'filled' : ''}
                    disabled={submitting}
                  >
                    <option value="">انتخاب کنید...</option>
                    {violationTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="violation-desc">توضیحات تخلف <span className="required">*</span></label>
                <textarea
                  id="violation-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="لطفاً توضیح دهید که چه تخلفی مشاهده کرده‌اید..."
                  rows="5"
                  disabled={submitting}
                  maxLength="500"
                />
                <div className="char-counter">
                  {description.length} / ۵۰۰
                </div>
              </div>

              {error && (
                <div className="report-error">
                  <FaTimes className="error-icon" />
                  <span>{error}</span>
                </div>
              )}

              <div className="report-modal-footer">
                <button 
                  type="button" 
                  className="btn-cancel" 
                  onClick={onClose}
                  disabled={submitting}
                >
                  انصراف
                </button>
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={submitting || loading}
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="spinner" />
                      در حال ارسال...
                    </>
                  ) : (
                    <>
                      <FaFlag />
                      ثبت گزارش
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// ========== کامپوننت گالری تمام‌صفحه ==========
// ============================================================
const ImageGalleryModal = ({ images, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
    } else if (isRightSwipe) {
      setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleZoom = (e) => {
    e.stopPropagation();
    setIsZoomed(prev => !prev);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const goToPrev = (e) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div 
      className="image-gallery-modal-overlay"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="image-gallery-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="gallery-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="gallery-modal-counter">
          {currentIndex + 1} / {images.length}
        </div>

        <div 
          className={`gallery-modal-image-wrapper ${isZoomed ? 'zoomed' : ''}`}
          onClick={handleZoom}
        >
          <img 
            src={images[currentIndex]} 
            alt={`تصویر ${currentIndex + 1}`}
            className="gallery-modal-image"
          />
        </div>

        {images.length > 1 && (
          <>
            <button className="gallery-modal-nav prev" onClick={goToPrev}>
              <FaArrowRight />
            </button>
            <button className="gallery-modal-nav next" onClick={goToNext}>
              <FaArrowRight />
            </button>
          </>
        )}

        <button className="gallery-modal-zoom-btn" onClick={handleZoom}>
          {isZoomed ? '🔍−' : '🔍+'}
        </button>

        {images.length > 1 && (
          <div className="gallery-modal-thumbnails">
            {images.map((img, index) => (
              <div 
                key={index}
                className={`thumbnail-item ${index === currentIndex ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
              >
                <img src={img} alt={`تصویر کوچک ${index + 1}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// ========== کامپوننت پاپ‌آپ استوری ==========
// ============================================================
const StoryPopup = ({ agentName, agentImage, userId, onClose }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      if (!userId) {
        setError('شناسه کاربر یافت نشد');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.status === 200 && result.data && result.data.length > 0) {
          const userStories = result.data[0]?.storyUser || [];
          const formattedStories = userStories.map(story => ({
            ...story,
            url: `https://localhost:7178${story.url}`
          }));
          setStories(formattedStories);
        } else {
          setStories([]);
        }
      } catch (error) {
        console.error('❌ خطا در دریافت استوری:', error);
        setError('مشکل در دریافت استوری‌ها');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [userId]);

  useEffect(() => {
    if (isPaused || loading || stories.length === 0) return;

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(prev => prev + 1);
            return 0;
          } else {
            onClose();
            return 0;
          }
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [currentStoryIndex, isPaused, loading, stories, onClose]);

  const handlePrevStory = useCallback((e) => {
    e.stopPropagation();
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    }
  }, [currentStoryIndex]);

  const handleNextStory = useCallback((e) => {
    e.stopPropagation();
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentStoryIndex, stories.length, onClose]);

  const handleStoryLink = useCallback((link) => {
    if (link) {
      window.location.href = link;
    }
  }, []);

  if (loading) {
    return (
      <div className="realestate-detail story-popup-overlay" onClick={onClose}>
        <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            color: 'white',
            fontSize: '18px',
            fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
          }}>
            در حال بارگذاری استوری‌ها...
          </div>
        </div>
      </div>
    );
  }

  if (error || stories.length === 0) {
    return (
      <div className="realestate-detail story-popup-overlay" onClick={onClose}>
        <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            color: 'white',
            fontSize: '16px',
            padding: '20px',
            textAlign: 'center',
            fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
          }}>
            <p>{error || 'هیچ استوری برای این کاربر وجود ندارد'}</p>
            <button 
              onClick={onClose}
              style={{
                marginTop: '20px',
                padding: '10px 30px',
                background: '#ff0000',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
              }}
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentStory = stories[currentStoryIndex];

  return (
    <div 
      className="realestate-detail story-popup-overlay"
      onClick={onClose}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="story-progress-container">
          {stories.map((_, index) => (
            <div key={index} className="story-progress-bar">
              <div 
                className="story-progress-fill"
                style={{
                  width: index < currentStoryIndex ? '100%' : 
                         index === currentStoryIndex ? `${progress}%` : '0%'
                }}
              />
            </div>
          ))}
        </div>

        <div className="story-header">
          <div className="story-user-info">
            <img src={agentImage} alt={agentName} className="story-user-avatar" />
            <span className="story-user-name">{agentName}</span>
            <span className="story-time">لحظاتی پیش</span>
          </div>
          <button className="story-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="story-content">
          <img src={currentStory.url} alt={currentStory.caption || 'استوری'} className="story-image" />
          
          {currentStory.caption && (
            <div className="story-caption">{currentStory.caption}</div>
          )}

          {currentStory.link && (
            <div className="story-link-button" onClick={() => handleStoryLink(currentStory.link)}>
              <FaLink />
              <span>{currentStory.linkText || 'مشاهده بیشتر'}</span>
            </div>
          )}
        </div>

        <div className="story-nav-left" onClick={handlePrevStory} />
        <div className="story-nav-right" onClick={handleNextStory} />
      </div>
    </div>
  );
};

// ============================================================
// ========== کامپوننت SafeImage ==========
// ============================================================
const SafeImage = ({ src, alt, className, fallbackSrc, ...props }) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <img 
        src={fallbackSrc || 'https://randomuser.me/api/portraits/men/32.jpg'} 
        alt={alt || 'تصویر'} 
        className={className}
        {...props}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => {
        setError(true);
      }}
      {...props}
    />
  );
};

// ============================================================
// ========== توابع کمکی ==========
// ============================================================
const stripHtml = (html) => {
  if (!html) return '';
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
};

const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 2) + '…';
};

// ============================================================
// ========== کامپوننت‌های متا ==========
// ============================================================
const PageMetadata = ({ property, isForSale, isForRent }) => {
  useEffect(() => {
    if (!property) return;
    let title = property.title 
      ? `${truncateText(property.title, 40)} | ${isForSale ? 'فروش' : 'رهن و اجاره'} ${property.area}م ${property.regionName}`
      : `ملک ${property.area} متری ${property.regionName}`;
    title = truncateText(title, 65);
    document.title = title;
    const plainDescription = stripHtml(property.description || '');
    const priceText = isForSale ? `قیمت: ${property.price} تومان` : `رهن: ${property.mortgagePrice || property.depositPrice || 'تماس بگیرید'} تومان`;
    let description = plainDescription ? truncateText(plainDescription, 120) + `... ${priceText}` : `ملک ${isForSale ? 'فروش' : 'رهن و اجاره'} در ${property.regionName}، ${property.area} متری، ${property.rooms} خوابه - ${priceText}`;
    description = truncateText(description, 155);
    const keywords = [property.title, `${property.regionName} ملک`, isForSale ? 'فروش آپارتمان' : 'رهن آپارتمان', `${property.area} متری`, `${property.rooms} خوابه`, `طبقه ${property.floor}`, property.year !== "نامشخص" ? `ساخت ${property.year}` : '', ...property.features.slice(0, 5)].filter(Boolean).join(',');
    const updateOrCreateMeta = (name, content, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) meta.setAttribute('property', name);
        else meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    updateOrCreateMeta('description', description);
    updateOrCreateMeta('keywords', keywords);
    updateOrCreateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1');
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;
    updateOrCreateMeta('og:title', title, true);
    updateOrCreateMeta('og:description', truncateText(description, 200), true);
    updateOrCreateMeta('og:image', property.images?.[0] || '/default-property-image.jpg', true);
    updateOrCreateMeta('og:url', window.location.href, true);
    updateOrCreateMeta('og:type', 'product', true);
    updateOrCreateMeta('og:locale', 'fa_IR', true);
    updateOrCreateMeta('og:site_name', 'مشاور املاک', true);
    updateOrCreateMeta('twitter:card', 'summary_large_image');
    updateOrCreateMeta('twitter:title', title);
    updateOrCreateMeta('twitter:description', truncateText(description, 200));
    updateOrCreateMeta('twitter:image', property.images?.[0] || '/default-property-image.jpg');
    document.documentElement.lang = 'fa';
    document.documentElement.dir = 'rtl';
  }, [property, isForSale, isForRent]);
  return null;
};

const StructuredData = ({ property, isForSale, isForRent }) => {
  useEffect(() => {
    if (!property) return;
    const removeOldScript = () => { const oldScript = document.getElementById('json-ld-structured-data'); if (oldScript) oldScript.remove(); };
    removeOldScript();
    const parsePriceToNumber = (priceStr) => { if (!priceStr || priceStr === '۰') return '0'; return String(priceStr).replace(/[^0-9]/g, '') || '0'; };
    const structuredData = {
      "@context": "https://schema.org", "@type": isForSale ? "Product" : "RealEstateListing", "name": property.title,
      "description": stripHtml(property.description || '').substring(0, 500), "image": property.images.slice(0, 10), "url": window.location.href,
      "datePublished": new Date().toISOString(), "dateModified": new Date().toISOString(),
      ...(isForSale && { "offers": { "@type": "Offer", "price": parsePriceToNumber(property.price), "priceCurrency": "IRR", "availability": "https://schema.org/InStock", "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] } }),
      ...(isForRent && { "offers": { "@type": "Offer", "price": parsePriceToNumber(property.mortgagePrice || property.rentPrice || '0'), "priceCurrency": "IRR", "description": "ملک رهن و اجاره" } }),
      "address": { "@type": "PostalAddress", "addressLocality": property.regionName, "streetAddress": property.address, "addressCountry": "IR", "addressRegion": "تهران" },
      "floorSize": { "@type": "QuantitativeValue", "value": property.area || 0, "unitCode": "MTK", "unitText": "متر مربع" },
      "numberOfRooms": property.rooms || 0,
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "طبقه", "value": `${property.floor || 1} از ${property.totalFloors || 1}` },
        { "@type": "PropertyValue", "name": "سال ساخت", "value": property.year !== "نامشخص" ? property.year : "نامشخص" },
        { "@type": "PropertyValue", "name": "آسانسور", "value": property.isHasElevator ? "دارد" : "ندارد" },
        { "@type": "PropertyValue", "name": "پارکینگ", "value": property.isHasParking ? "دارد" : "ندارد" },
        { "@type": "PropertyValue", "name": "استخر", "value": property.isHasPool ? "دارد" : "ندارد" },
        { "@type": "PropertyValue", "name": "انباری", "value": property.isHasStoreRoom ? "دارد" : "ندارد" },
        { "@type": "PropertyValue", "name": "وام", "value": property.isHasLoan ? "قابل وام" : "بدون وام" },
        ...property.features.slice(0, 15).map(feature => ({ "@type": "PropertyValue", "name": "امکانات", "value": feature }))
      ],
      "potentialAction": { "@type": "CommunicateAction", "name": "تماس با مشاور", "target": { "@type": "EntryPoint", "urlTemplate": `tel:${property.agent?.phone || ''}`, "inLanguage": "fa-IR", "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"] } }
    };
    const script = document.createElement('script');
    script.id = 'json-ld-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    return () => removeOldScript();
  }, [property, isForSale, isForRent]);
  return null;
};

const BreadcrumbStructuredData = ({ property, isForSale }) => {
  useEffect(() => {
    if (!property) return;
    const removeOldScript = () => { const oldScript = document.getElementById('json-ld-breadcrumb'); if (oldScript) oldScript.remove(); };
    removeOldScript();
    const baseUrl = window.location.origin;
    const regionSlug = encodeURIComponent(property.regionName || 'منطقه');
    const breadcrumbData = {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "صفحه اصلی", "item": `${baseUrl}/` },
        { "@type": "ListItem", "position": 2, "name": isForSale ? "آپارتمان‌های فروش" : "آپارتمان‌های رهن و اجاره", "item": `${baseUrl}/${isForSale ? 'RealEstatePageDetail' : 'rent'}` },
        { "@type": "ListItem", "position": 3, "name": `منطقه ${property.regionName}`, "item": `${baseUrl}/region/${regionSlug}` },
        { "@type": "ListItem", "position": 4, "name": truncateText(property.title || 'جزئیات ملک', 80), "item": window.location.href }
      ]
    };
    const script = document.createElement('script');
    script.id = 'json-ld-breadcrumb';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(breadcrumbData);
    document.head.appendChild(script);
    return () => removeOldScript();
  }, [property, isForSale]);
  return null;
};

// ============================================================
// ========== Skeleton ==========
// ============================================================
const DetailSkeleton = () => (
  <div className="detail-skeleton">
    <div className="skeleton-header"><div className="skeleton-circle"></div><div className="skeleton-title"></div><div className="skeleton-circle"></div></div>
    <div className="skeleton-gallery"><div className="skeleton-image"></div></div>
    <div className="skeleton-content"><div className="skeleton-price"></div><div className="skeleton-info">{[]}</div><div className="skeleton-tabs">{[]}</div><div className="skeleton-text">{[]}</div></div>
  </div>
);

// ============================================================
// ========== کامپوننت اصلی ==========
// ============================================================
const RealEstateDetailPageItem = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const id = paramId || queryParams.get('id');
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('details');
  
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [showStoryPopup, setShowStoryPopup] = useState(false);
  const [storyUserId, setStoryUserId] = useState(null);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);

  const [showReportModal, setShowReportModal] = useState(false);

  const [viewSent, setViewSent] = useState(false);

  const openGallery = useCallback((index) => {
    setGalleryStartIndex(index);
    setShowGalleryModal(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeGallery = useCallback(() => {
    setShowGalleryModal(false);
    document.body.style.overflow = '';
  }, []);

  const handleReportClick = useCallback(() => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setShowReportModal(true);
  }, [isLoggedIn]);

  const closeReportModal = useCallback(() => {
    setShowReportModal(false);
  }, []);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('auth_token');
      setIsLoggedIn(!!token);
    };
    
    checkLogin();
    
    window.addEventListener('authChange', checkLogin);
    window.addEventListener('storage', checkLogin);
    
    return () => {
      window.removeEventListener('authChange', checkLogin);
      window.removeEventListener('storage', checkLogin);
    };
  }, []);

  const sendViewCount = useCallback(async (realEstateId) => {
    try {
      if (viewSent) {
        console.log('⏳ بازدید قبلاً ارسال شده است');
        return;
      }

      const storageKey = `viewed_property_${realEstateId}`;
      
      const storedData = localStorage.getItem(storageKey);
      
      if (storedData) {
        try {
          const viewData = JSON.parse(storedData);
          const viewDate = new Date(viewData.timestamp);
          const now = new Date();
          const daysDiff = (now - viewDate) / (1000 * 60 * 60 * 24);
          
          if (daysDiff > VIEW_EXPIRY_DAYS) {
            localStorage.removeItem(storageKey);
            sessionStorage.removeItem(storageKey);
            console.log('⏰ انقضای بازدید، ارسال مجدد...');
          } else {
            console.log('✅ این ملک قبلاً توسط این کاربر مشاهده شده است');
            return;
          }
        } catch (parseError) {
          localStorage.removeItem(storageKey);
          sessionStorage.removeItem(storageKey);
        }
      }

      const sessionViewed = sessionStorage.getItem(storageKey);
      if (sessionViewed) {
        console.log('✅ این ملک در این جلسه مشاهده شده است');
        return;
      }

      console.log('📡 ارسال بازدید برای ملک:', realEstateId);
      
      const token = localStorage.getItem('auth_token');
      const response = await fetch('https://localhost:7178/api/RealEstatePage/UpdateViewCount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(realEstateId)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ بازدید با موفقیت ثبت شد:', result);
        
        const viewData = {
          timestamp: new Date().toISOString(),
          realEstateId: realEstateId
        };
        localStorage.setItem(storageKey, JSON.stringify(viewData));
        sessionStorage.setItem(storageKey, 'true');
        setViewSent(true);
        
        setProperty(prev => prev ? {
          ...prev,
          views: (prev.views || 0) + 1
        } : prev);
        
      } else {
        console.error('❌ خطا در ثبت بازدید:', response.status);
        const errorText = await response.text();
        console.error('❌ جزئیات خطا:', errorText);
      }
    } catch (error) {
      console.error('❌ خطا در ارسال بازدید:', error);
    }
  }, [viewSent]);

  const cleanExpiredViews = useCallback(() => {
    try {
      const keys = Object.keys(localStorage);
      let cleanedCount = 0;
      
      keys.forEach(key => {
        if (key.startsWith('viewed_property_')) {
          try {
            const data = JSON.parse(localStorage.getItem(key));
            const viewDate = new Date(data.timestamp);
            const now = new Date();
            const daysDiff = (now - viewDate) / (1000 * 60 * 60 * 24);
            
            if (daysDiff > VIEW_EXPIRY_DAYS) {
              localStorage.removeItem(key);
              sessionStorage.removeItem(key);
              cleanedCount++;
            }
          } catch {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
            cleanedCount++;
          }
        }
      });
      
      if (cleanedCount > 0) {
        console.log(`🧹 ${cleanedCount} بازدید منقضی پاکسازی شد`);
      }
    } catch (error) {
      console.error('❌ خطا در پاکسازی:', error);
    }
  }, []);

  // ===== دریافت اطلاعات ملک =====
  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) { 
        setError('شناسه ملک یافت نشد'); 
        setLoading(false); 
        return; 
      }
      
      setLoading(true); 
      setError(null);
      
      try {
        const token = localStorage.getItem('auth_token');
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const API_BASE_URL = 'https://localhost:7178/api';
        
        const headers = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(
          `${API_BASE_URL}/RealEstatePage/GetRealEstateDetails?id=${id}`,
          { 
            signal: controller.signal,
            headers: headers
          }
        );

        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const result = await response.json();
        console.log('📦 Full API response:', result);
        
        if (result.status === 200 && result.data) {
          const data = result.data;
          
          const agentImage = data.agents?.image 
            ? `https://localhost:7178/${data.agents.image}` 
            : "https://randomuser.me/api/portraits/men/32.jpg";
          
          const userId = data.agents?.userId || null;
          const hasStory = data.agents?.hasStory || false;
          
          console.log('👤 Agent UserId:', userId);
          console.log('📱 HasStory:', hasStory);
          console.log('📕 inBookMark از سرور:', data.inBookMark);
          console.log('📕 isLoggedIn:', isLoggedIn);
          
          const bookmarkedValue = isLoggedIn ? (data.inBookMark === true) : false;
          console.log('📕 مقدار نهایی بوک‌مارک:', bookmarkedValue);
          
          setIsBookmarked(bookmarkedValue);
          setStoryUserId(hasStory ? userId : null);
          
          // ============================================================
          // ===== ساخت آبجکت propertyData با تمام فیلدها =====
          // ============================================================
          const propertyData = {
            id: data.id,
            title: data.title || `ملک در ${data.regionName || 'منطقه'} `,
            price: data.price?.toLocaleString("fa-IR") || "۰",
            priceMeter: data.priceMeter?.toLocaleString("fa-IR") || "۰",
            rentPrice: data.rent?.toLocaleString("fa-IR") || null,
            depositPrice: data.deposit?.toLocaleString("fa-IR") || null,
            type: data.categoryType,
            area: data.squareMeter || 0,
            rooms: data.rooms || 0,
            floor: data.floor || 1,
            regionName: data.regionName || "منطقه نامشخص",
            totalFloors: data.countFloor || 1,
            year: data.constructionYear || "نامشخص",
            address: data.address || "آدرس درج نشده",
            showExactLocation: data.showExactLocation,
            location: { 
              lat: data.lat || 35.7199363, 
              lng: data.lng || 51.4334842 
            },
            description: data.descriptionRows || "توضیحاتی برای این ملک ثبت نشده است.",
            features: data.facilities || [],
            warnings: data.warnings || ["استعلام خلافی", "بررسی سند مالکیت", "استعلام پایان کار", "بررسی مفاصا حساب"],
            images: (data.images || []).map(img => `https://localhost:7178/${img}`),
            agent: {
              name: data.agents?.name || "مشاور املاک",
              phone: data.agents?.phone || "۰۲۱۹۱۰۰۰۰۰۰",
              whatsapp: data.agents?.connectSocialMedia || "",
              address: data.agents?.address || "آدرس دفتر درج نشده",
              rating: data.agents?.rating || 4.5,
              deals: data.agents?.deals || 120,
              image: agentImage,
              hasStory: hasStory,
              userId: userId
            },
            views: data.views || 0,
            saved: data.saved || 0,
            inBookMark: data.inBookMark,
            createdAt: data.createdAtPersianRelative || "امروز",
            
            // ===== فیلدهای اضافه شده از سرور =====
            isHasElevator: data.isHasElevator || false,
            isHasParking: data.isHasParking || false,
            isHasPool: data.isHasPool || false,
            isHasStoreRoom: data.isHasStoreRoom || false,
            isHasLoan: data.isHasLoan || false,
            
            // ===== فیلدهای مشتق شده =====
            certificate: data.isHasLoan ? "قابل وام" : "سند رسمی",
            mortgage: data.isHasLoan ? "امکان وام" : "بدون وام",
            
            nearby: [
              { name: "مترو", distance: "۵۰۰ متر" },
              { name: "مرکز خرید", distance: "۳۰۰ متر" },
              { name: "پارک", distance: "۲۰۰ متر" },
              { name: "مدرسه", distance: "۴۰۰ متر" }
            ]
          };
          
          console.log('✅ propertyData ساخته شد:', propertyData);
          setProperty(propertyData);

          // ===== ارسال بازدید غیرتکراری =====
          await sendViewCount(id);
          
        } else {
          throw new Error(result.message || 'ملک یافت نشد');
        }
      } catch (error) { 
        console.error('خطا:', error); 
        setError(error.name === 'AbortError' ? 'مدت زمان درخواست به پایان رسید' : 'مشکل در ارتباط با سرور'); 
      } finally { 
        setLoading(false); 
      }
    };
    
    cleanExpiredViews();
    fetchPropertyData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, isLoggedIn, sendViewCount, cleanExpiredViews]);

  const handleBookmarkToggle = useCallback(async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (bookmarkLoading) return;

    setBookmarkLoading(true);
    
    try {
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch('https://localhost:7178/api/RealEstatePage/ToggleBookMark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(property?.id),
      });

      if (response.ok) {
        setIsBookmarked(prev => !prev);
        console.log('✅ بوک‌مارک با موفقیت تغییر کرد');
      } else {
        const errorData = await response.json();
        console.error('❌ خطا در بوک‌مارک:', errorData);
        alert('مشکل در ذخیره بوک‌مارک. لطفاً دوباره تلاش کنید.');
      }
    } catch (error) {
      console.error('❌ خطا در ارتباط با سرور:', error);
      alert('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
    } finally {
      setBookmarkLoading(false);
    }
  }, [isLoggedIn, property, isBookmarked, bookmarkLoading]);

  const handlePhoneClick = useCallback(() => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (!property?.agent?.phone) {
      alert('شماره تماس در دسترس نیست');
      return;
    }
    navigator.clipboard.writeText(property.agent.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [isLoggedIn, property]);

  const handleWhatsAppClick = useCallback(() => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (!property?.agent?.whatsapp) {
      alert('شماره واتساپ در دسترس نیست');
      return;
    }
    window.open(`https://wa.me/${property.agent.whatsapp.replace(/\s/g, '')}`, '_blank');
  }, [isLoggedIn, property]);

  const isForSale = useMemo(() => property?.type === 1, [property]);
  const isForRent = useMemo(() => property?.type === 2, [property]);
  const formattedPricePerMeter = useMemo(() => { 
    if (!property?.priceMeter || property.priceMeter === "۰") return null; 
    return `${property.priceMeter} تومان`; 
  }, [property]);
  const shareUrl = useMemo(() => window.location.href, []);

  const handleCopyLink = useCallback(() => { 
    navigator.clipboard.writeText(shareUrl); 
    setCopied(true); 
    setTimeout(() => setCopied(false), 2000); 
  }, [shareUrl]);
  
  const handleShare = useCallback(async () => { 
    if (!property) return; 
    const shareData = { 
      title: property.title, 
      text: `${property.title} - ${property.area} متری - ${isForSale ? `قیمت ${property.price}` : `رهن ${property.mortgagePrice}`} تومان`, 
      url: shareUrl 
    }; 
    if (navigator.share && /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)) { 
      try { 
        await navigator.share(shareData); 
      } catch (error) { 
        if (error.name !== 'AbortError') handleCopyLink(); 
      } 
    } else handleCopyLink(); 
  }, [property, isForSale, shareUrl, handleCopyLink]);
  
  const handleImageLoad = useCallback((index) => { 
    setImagesLoaded(prev => ({ ...prev, [index]: true })); 
  }, []);
  
  const goToProfile = useCallback(() => {
    if (!property || !property.agent || !property.agent.userId) {
      console.warn('اطلاعات کاربر برای رفتن به پروفایل موجود نیست');
      return;
    }
    
    try {
      const agentName = property.agent.name || 'مشاور';
      const userId = property.agent.userId;
      
      const nameSlug = agentName
        .replace(/\s+/g, '-')
        .replace(/[^آ-یa-zA-Z0-9-]/g, '')
        .substring(0, 50);
      
      localStorage.setItem('temp_profile_userId', userId);
      
      navigate(`/profile/${nameSlug}`, {
        state: { userId: userId }
      });
    } catch (error) {
      console.error('خطا در رفتن به پروفایل:', error);
      navigate('/');
    }
  }, [property, navigate]);

  const handleStoryClick = useCallback((e) => {
    if (e) {
      e.stopPropagation();
    }
    
    if (storyUserId) {
      setShowStoryPopup(true);
      document.body.style.overflow = 'hidden';
    }
  }, [storyUserId]);

  const handleStoryClose = useCallback(() => {
    setShowStoryPopup(false);
    document.body.style.overflow = '';
  }, []);

  const handleLoginModalClose = useCallback(() => {
    setShowLoginModal(false);
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // ============================================================
  // ===== رندر =====
  // ============================================================
  if (error) return ( 
    <> 
      <PageMetadata property={null} /> 
      <div className="detail-container realestate-detail">
        <div className="detail-header">
          <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
          <h1 className="header-title">خطا</h1>
          <div className="header-btn"></div>
        </div>
        <div className="error-message">
          <h2>متاسفانه خطایی رخ داده است</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>تلاش مجدد</button>
          <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
        </div>
      </div>
    </> 
  );
  
  if (loading) return <DetailSkeleton />;
  
  if (!property) return ( 
    <> 
      <PageMetadata property={null} /> 
      <div className="detail-container realestate-detail">
        <div className="detail-header">
          <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
          <h1 className="header-title">ملک یافت نشد</h1>
          <div className="header-btn"></div>
        </div>
        <div className="error-message">
          <p>متاسفانه ملک مورد نظر یافت نشد</p>
          <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
        </div>
      </div>
    </> 
  );

  return ( 
    <>
      <PageMetadata property={property} isForSale={isForSale} isForRent={isForRent} />
      <StructuredData property={property} isForSale={isForSale} isForRent={isForRent} />
      <BreadcrumbStructuredData property={property} isForSale={isForSale} />
      
      {showStoryPopup && (
        <StoryPopup 
          agentName={property.agent.name}
          agentImage={property.agent.image}
          userId={storyUserId}
          onClose={handleStoryClose}
        />
      )}

      {showLoginModal && (
        <LoginModal 
          onClose={handleLoginModalClose}
          triggerSource="real-estate-detail"
        />
      )}

      {showReportModal && (
        <ReportViolationModal
          propertyId={property.id}
          propertyTitle={property.title}
          onClose={closeReportModal}
          onSuccess={() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
          }}
        />
      )}

      {showGalleryModal && (
        <ImageGalleryModal 
          images={property.images}
          initialIndex={galleryStartIndex}
          onClose={closeGallery}
        />
      )}
      
      <div className="detail-container realestate-detail">
        <nav className="breadcrumb-nav">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item"><a href="/">خانه</a></li>
            <li className="breadcrumb-item"><a href={isForSale ? '/sale' : '/rent'}>{isForSale ? 'فروش آپارتمان' : 'رهن و اجاره آپارتمان'}</a></li>
            <li className="breadcrumb-item"><a href={`/region/${encodeURIComponent(property.regionName)}`}>منطقه {property.regionName}</a></li>
            <li className="breadcrumb-item active">{truncateText(property.title, 50)}</li>
          </ol>
        </nav>
        
        <div className="detail-header">
          <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
          <h1 className="header-title">{property.title}</h1>
          <div className="header-actions">
            <button className="header-btn report-btn" onClick={handleReportClick} title="گزارش تخلف">
              <FaFlag />
            </button>
            <button className="header-btn" onClick={handleShare}><FaShare /></button>
          </div>
        </div>
        
        <div className="detail-gallery">
          <Swiper 
            modules={[Navigation, Pagination, Autoplay]} 
            navigation 
            pagination={{ clickable: true }} 
            autoplay={{ delay: 4000, disableOnInteraction: false }} 
            spaceBetween={0} 
            slidesPerView={1} 
            onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)} 
            className="gallery-swiper"
          >
            {property.images.length > 0 ? 
              property.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <div 
                    className="gallery-slide"
                    onClick={() => openGallery(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    {!imagesLoaded[index] && <div className="image-placeholder"><FaHome /></div>}
                    <img 
                      src={img} 
                      alt={`${property.title} - ${index === 0 ? 'نمای اصلی' : `تصویر ${index + 1}`}`} 
                      loading={index === 0 ? 'eager' : 'lazy'} 
                      onLoad={() => handleImageLoad(index)} 
                      style={{ display: imagesLoaded[index] ? 'block' : 'none' }} 
                    />
                  </div>
                </SwiperSlide>
              )) : 
              (<SwiperSlide>
                <div className="gallery-slide no-image">
                  <FaHome />
                  <span>تصویری موجود نیست</span>
                </div>
              </SwiperSlide>)
            }
          </Swiper>
          
          <button 
            className={`bookmark-btn ${isBookmarked ? 'active' : ''}`} 
            onClick={handleBookmarkToggle}
            disabled={bookmarkLoading}
            title={isBookmarked ? 'حذف از بوک‌مارک‌ها' : 'افزودن به بوک‌مارک‌ها'}
          >
            {bookmarkLoading ? (
              <FaSpinner className="spinner" />
            ) : (
              isBookmarked ? <FaBookmark /> : <FaRegBookmark />
            )}
          </button>
          
          <button 
            className={`report-flag-btn ${!isLoggedIn ? 'locked' : ''}`}
            onClick={handleReportClick}
            title="گزارش تخلف"
          >
            <FaFlag />
            {!isLoggedIn && (
              <span className="report-lock-badge">
                <FaLock className="lock-icon-small" />
              </span>
            )}
          </button>
          
          <div className="image-counter">{selectedImage + 1} / {property.images.length || 1}</div>
        </div>
        
        <div className="detail-main">
          <div className="detail-title-section">
            <div className="title-row">
              <div className="property-stats">
                <span className="stat-badge"><FaEye /> {property.views.toLocaleString('fa-IR')} بازدید</span>
                <span className="stat-badge">
                  <FaBookmark /> {property.saved.toLocaleString('fa-IR')} ذخیره
                </span>
                <span className="stat-badge"><FaClock /> {property.createdAt}</span>
              </div>
            </div>
          </div>
          
          <div className="price-section">
            {isForSale && (
              <div className="price-card sale-price">
                <div className="price-card-icon"><FaTag /></div>
                <div className="price-card-content">
                  <span className="price-label-detail">قیمت فروش</span>
                  <div className="price-value-wrapper">
                    <span className="price-number">{property.price}</span>
                    <span className="price-unit">تومان</span>
                  </div>
                  {formattedPricePerMeter && 
                    <div className="price-value-wrapper">
                      <FaRuler />
                      <span>متری {formattedPricePerMeter}</span>
                    </div>
                  }
                </div>
              </div>
            )}
            
            {isForRent && (
              <div className="rent-price-group">
                {property.depositPrice && property.depositPrice !== "۰" && (
                  <div className="price-card mortgage-price">
                    <div className="price-card-icon"><FaBuilding /></div>
                    <div className="price-card-content">
                      <span className="price-label-deposit">مبلغ رهن</span>
                      <div className="price-value-wrapper">
                        <span className="price-number">{property.depositPrice}</span>
                        <span className="price-unit">تومان</span>
                      </div>
                    </div>
                  </div>
                )}
                {property.rentPrice && property.rentPrice !== "۰" && (
                  <div className="price-card rent-price">
                    <div className="price-card-icon"><FaHome /></div>
                    <div className="price-card-content">
                      <span className="price-label-deposit">اجاره ماهانه</span>
                      <div className="price-value-wrapper">
                        <span className="price-number">{property.rentPrice}</span>
                        <span className="price-unit">تومان</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* ============================================================
              ===== بخش Quick Specs با فیلدهای جدید =====
              ============================================================ */}
          <div className="quick-specs">
            <div className="spec-item">
              <FaRulerCombined />
              <span className="spec-label">متراژ</span>
              <span className="spec-value">{property.area} متر²</span>
            </div>
            <div className="spec-item">
              <FaBath />
              <span className="spec-label">اتاق‌خواب</span>
              <span className="spec-value">{property.rooms} خواب</span>
            </div>
            <div className="spec-item">
              <FaLayerGroup />
              <span className="spec-label">طبقه</span>
              <span className="spec-value">{property.floor} از {property.totalFloors}</span>
            </div>
            <div className="spec-item">
              <FaCalendarAlt />
              <span className="spec-label">سال ساخت</span>
              <span className="spec-value">{property.year}</span>
            </div>
            
            {/* فیلدهای جدید */}
            <div className="spec-item">
              <FaParking />
              <span className="spec-label">پارکینگ</span>
              <span className={`spec-value ${property.isHasParking ? 'has' : 'no'}`}>
                {property.isHasParking ? '✅ دارد' : '❌ ندارد'}
              </span>
            </div>
            
            <div className="spec-item">
              <FaArrowUp />
              <span className="spec-label">آسانسور</span>
              <span className={`spec-value ${property.isHasElevator ? 'has' : 'no'}`}>
                {property.isHasElevator ? '✅ دارد' : '❌ ندارد'}
              </span>
            </div>
            
            <div className="spec-item">
              <FaSwimmingPool />
              <span className="spec-label">استخر</span>
              <span className={`spec-value ${property.isHasPool ? 'has' : 'no'}`}>
                {property.isHasPool ? '✅ دارد' : '❌ ندارد'}
              </span>
            </div>
            
            <div className="spec-item">
              <FaWarehouse />
              <span className="spec-label">انباری</span>
              <span className={`spec-value ${property.isHasStoreRoom ? 'has' : 'no'}`}>
                {property.isHasStoreRoom ? '✅ دارد' : '❌ ندارد'}
              </span>
            </div>
          </div>
          
          {/* ============================================================
              ===== بخش Info Chips با فیلدهای جدید =====
              ============================================================ */}
          <div className="info-chips">
            <span className="info-chip">کد ملک: {property.id}</span>
            <span className="info-chip"><FaShieldAlt /> {property.certificate}</span>
            <span className="info-chip type-chip">{isForSale ? 'فروش' : 'رهن و اجاره'}</span>
            
            {property.isHasLoan && (
              <span className="info-chip loan-chip">💰 قابل وام</span>
            )}
            
            {property.isHasElevator && (
              <span className="info-chip feature-chip">🛗 آسانسور</span>
            )}
            
            {property.isHasParking && (
              <span className="info-chip feature-chip">🅿️ پارکینگ</span>
            )}
            
            {property.isHasPool && (
              <span className="info-chip feature-chip">🏊 استخر</span>
            )}
            
            {property.isHasStoreRoom && (
              <span className="info-chip feature-chip">📦 انباری</span>
            )}
          </div>
          
          <div className="detail-tabs">
            <button className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`} onClick={() => setActiveTab('details')}>جزئیات ملک</button>
            <button className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`} onClick={() => setActiveTab('features')}>امکانات ({property.features.length + (property.isHasElevator ? 1 : 0) + (property.isHasParking ? 1 : 0) + (property.isHasPool ? 1 : 0) + (property.isHasStoreRoom ? 1 : 0)})</button>
            <button className={`tab-btn ${activeTab === 'warnings' ? 'active' : ''}`} onClick={() => setActiveTab('warnings')}>هشدارهای معامله</button>
            <button className={`tab-btn ${activeTab === 'nearby' ? 'active' : ''}`} onClick={() => setActiveTab('nearby')}>امکانات اطراف</button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'details' && (
              <div className="details-tab">
                <div className="address-card">
                  <FaMapMarkerAlt />
                  <div className="address-info">
                    <h3>آدرس ملک</h3>
                    <div>منطقه {property.regionName}</div>
                    <p>{property.address}</p>
                    <span className="post-date">تاریخ درج: {property.createdAt}</span>
                  </div>
                </div>
                
                <div className="description-card">
                  <h3>توضیحات کامل {property.title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(property.description, { ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'a', 'blockquote'], ALLOWED_ATTR: ['href', 'target'] }) }} />
                </div>
                
                {/* ===== بخش امکانات ملک در تب جزئیات ===== */}
                {/* <div className="property-features-summary">
                  <h3>امکانات ملک</h3>
                  <div className="features-summary-grid">
                    <div className={`feature-summary-item ${property.isHasElevator ? 'active' : 'inactive'}`}>
                      <FaArrowUp />
                      <span>آسانسور</span>
                      <span className="feature-status">{property.isHasElevator ? 'دارد' : 'ندارد'}</span>
                    </div>
                    <div className={`feature-summary-item ${property.isHasParking ? 'active' : 'inactive'}`}>
                      <FaParking />
                      <span>پارکینگ</span>
                      <span className="feature-status">{property.isHasParking ? 'دارد' : 'ندارد'}</span>
                    </div>
                    <div className={`feature-summary-item ${property.isHasPool ? 'active' : 'inactive'}`}>
                      <FaSwimmingPool />
                      <span>استخر</span>
                      <span className="feature-status">{property.isHasPool ? 'دارد' : 'ندارد'}</span>
                    </div>
                    <div className={`feature-summary-item ${property.isHasStoreRoom ? 'active' : 'inactive'}`}>
                      <FaWarehouse />
                      <span>انباری</span>
                      <span className="feature-status">{property.isHasStoreRoom ? 'دارد' : 'ندارد'}</span>
                    </div>
                    <div className={`feature-summary-item ${property.isHasLoan ? 'active' : 'inactive'}`}>
                      <FaShieldAlt />
                      <span>وام</span>
                      <span className="feature-status">{property.isHasLoan ? 'قابل وام' : 'بدون وام'}</span>
                    </div>
                  </div>
                </div> */}
                
                <div className="map-card">
                  <h3><FaMapMarkerAlt /> موقعیت مکانی ملک در منطقه {property.regionName}</h3>
                  <div className="map-location-badge">
                    {property.showExactLocation ? 
                      <span className="badge exact">📍 نمایش موقعیت دقیق ملک</span> : 
                      <span className="badge approximate">🔵 نمایش محدوده تقریبی</span>
                    }
                  </div>
                  <div className="map-container">
                    <NeshanMap 
                      mapKey="web.31c5ea6c425e40cc9b30620a84a8be90" 
                      center={{ latitude: property.location.lat, longitude: property.location.lng }} 
                      zoom={property.showExactLocation ? 17 : 15.9} 
                      defaultType="dreamy" 
                      poi={true} 
                      traffic={false} 
                      style={{ height: '100%', width: '100%', pointerEvents: 'none' }} 
                    />
                    <div className="map-marker-overlay">
                      {property.showExactLocation ? 
                        <><div className="location-dot"></div><div className="location-ripple"></div></> : 
                        <div className="location-circles"><div className="circle-3"></div></div>
                      }
                    </div>
                  </div>
                  <div className="map-privacy-note">
                    <small>{property.showExactLocation ? '📍 موقعیت دقیق ملک' : '📍 محدوده تقریبی ملک'}</small>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'features' && (
              <div className="features-tab">
                <h3>امکانات و ویژگی‌ها</h3>
                <div className="features-grid">
                  {/* ===== امکانات از فیلدهای boolean ===== */}
                  {property.isHasElevator && (
                    <div className="feature-card">
                      <FaArrowUp />
                      <span>آسانسور</span>
                    </div>
                  )}
                  
                  {property.isHasParking && (
                    <div className="feature-card">
                      <FaParking />
                      <span>پارکینگ</span>
                    </div>
                  )}
                  
                  {property.isHasPool && (
                    <div className="feature-card">
                      <FaSwimmingPool />
                      <span>استخر</span>
                    </div>
                  )}
                  
                  {property.isHasStoreRoom && (
                    <div className="feature-card">
                      <FaWarehouse />
                      <span>انباری</span>
                    </div>
                  )}
                  
                  {property.isHasLoan && (
                    <div className="feature-card loan-feature">
                      <FaShieldAlt />
                      <span>قابل وام</span>
                    </div>
                  )}
                  
                  {/* ===== امکانات از لیست features ===== */}
                  {property.features.length > 0 ? 
                    property.features.map((feature, idx) => {
                      let Icon = FaCheckCircle;
                      if (feature.includes('پارکینگ')) Icon = FaParking;
                      else if (feature.includes('انباری')) Icon = FaWarehouse;
                      else if (feature.includes('آسانسور')) Icon = FaArrowUp;
                      else if (feature.includes('استخر')) Icon = FaSwimmingPool;
                      return (
                        <div key={idx} className="feature-card">
                          <Icon />
                          <span>{feature}</span>
                        </div>
                      );
                    }) : 
                    !property.isHasElevator && !property.isHasParking && !property.isHasPool && !property.isHasStoreRoom && (
                      <p className="no-data">امکاناتی ثبت نشده است</p>
                    )
                  }
                </div>
              </div>
            )}
            
            {activeTab === 'warnings' && (
              <div className="warnings-tab">
                <h3>⚠️ هشدارهای مهم</h3>
                <ul className="warnings-list">
                  {property.warnings.map((w, idx) => (
                    <li key={idx} className="warning-item">
                      <span className="warning-bullet"></span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
                <div className="warning-footer">
                  <p>⚠️ قبل از معامله مدارک را بررسی کنید</p>
                </div>
              </div>
            )}
            
            {activeTab === 'nearby' && (
              <div className="nearby-tab">
                <h3>امکانات اطراف</h3>
                <div className="nearby-list">
                  {property.nearby.map((item, idx) => (
                    <div key={idx} className="nearby-item">
                      <span className="nearby-name">{item.name}</span>
                      <span className="nearby-distance">{item.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="agent-card-ag">
            <div className="agent-header">
              <div 
                className={`agent-avatar-wrapper ${property.agent.hasStory ? 'has-story' : ''}`}
                style={{ 
                  position: 'relative',
                  display: 'inline-block',
                  flexShrink: 0,
                  cursor: property.agent.userId ? 'pointer' : 'default'
                }}
                onClick={property.agent.userId ? goToProfile : undefined}
              >
                <SafeImage 
                  src={property.agent.image} 
                  alt={property.agent.name} 
                  className={`agent-avatar ${property.agent.hasStory ? 'has-story' : ''}`}
                  fallbackSrc="https://randomuser.me/api/portraits/men/32.jpg"
                />
                
                {property.agent.hasStory && (
                  <div 
                    className="story-ring-indicator"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStoryClick(e);
                    }}
                  />
                )}
              </div>
              
              <div className="agent-info">
                <div className="agent-name-wrapper">
                  <h3 
                    style={{ cursor: property.agent.userId ? 'pointer' : 'default' }}
                    onClick={property.agent.userId ? goToProfile : undefined}
                  >
                    {property.agent.name}
                  </h3>
                  
                  {property.agent.hasStory && (
                    <span 
                      className="story-label" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStoryClick(e);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <span className="story-dot"></span>
                      استوری
                    </span>
                  )}
                </div>
                <p>{property.agent.address}</p>
                <div className="agent-rating">
                  <FaStar />
                  <span>{property.agent.rating}</span>
                  <span>({property.agent.deals} معامله)</span>
                </div>
              </div>
            </div>
            
            <div className="agent-actions-wrapper">
              <button 
                className={`agent-action-btn phone ${!isLoggedIn ? 'locked' : ''}`}
                onClick={handlePhoneClick}
              >
                <FaPhone /> 
                <span className="btn-label">
                  {isLoggedIn ? property.agent.phone : 'شماره تماس'}
                </span>
                
                {!isLoggedIn && (
                  <>
                    <span className="lock-badge">
                      <FaLock className="lock-icon-small" />
                    </span>
                    <div className="lock-overlay">
                      <FaLock className="lock-icon" />
                      <span className="lock-text">برای مشاهده شماره</span>
                      <span className="lock-subtext">وارد سامانه شوید</span>
                    </div>
                  </>
                )}
              </button>

              <button 
                className={`agent-action-btn whatsapp ${!isLoggedIn ? 'locked' : ''}`}
                onClick={handleWhatsAppClick}
              >
                <FaWhatsapp /> 
                <span className="btn-label">واتساپ</span>
                
                {!isLoggedIn && (
                  <>
                    <span className="lock-badge">
                      <FaLock className="lock-icon-small" />
                    </span>
                    <div className="lock-overlay">
                      <FaLock className="lock-icon" />
                      <span className="lock-text">برای مشاهده شماره</span>
                      <span className="lock-subtext">وارد سامانه شوید</span>
                    </div>
                  </>
                )}
              </button>
            </div>

            {!isLoggedIn && (
              <button 
                className="login-prompt-btn" 
                onClick={() => setShowLoginModal(true)}
                style={{ marginTop: '10px' }}
              >
                <FaUser className="login-icon" />
                ورود / ثبت‌نام
                <FaArrowRight className="arrow-icon" />
              </button>
            )}
          </div>
        </div>
        
        <DoubleSidebarBanners />
        <RelatedPropertiesSlider 
          currentPropertyId={property.id} 
          regionName={property.regionName} 
          propertyType={property.type} 
        />
        
        {(copied) && (
          <div className="toast-notification">
            <FaCheckCircle /> {copied === 'report' ? 'گزارش تخلف با موفقیت ثبت شد' : 'لینک کپی شد'}
          </div>
        )}
      </div>
    </> 
  );
});

RealEstateDetailPageItem.displayName = 'RealEstateDetailPageItem';
export default RealEstateDetailPageItem;