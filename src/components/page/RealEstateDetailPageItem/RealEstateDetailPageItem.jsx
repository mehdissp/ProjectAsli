

// // // // // // // import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
// // // // // // // import CryptoJS from 'crypto-js';
// // // // // // // import DOMPurify from 'dompurify';
// // // // // // // import { useNavigate, useLocation, useParams } from 'react-router-dom';
// // // // // // // import RelatedPropertiesSlider from './RelatedPropertiesSlider';
// // // // // // // import DoubleSidebarBanners from './SidebarBanner';
// // // // // // // import { 
// // // // // // //   FaMapMarkerAlt, FaPhone, FaWhatsapp, FaShare, FaArrowRight, FaHeart, FaRegHeart,
// // // // // // //   FaStar, FaParking, FaWarehouse, FaSwimmingPool, FaBath, FaRulerCombined,
// // // // // // //   FaCalendarAlt, FaLayerGroup, FaArrowUp, FaCheckCircle, FaTag, FaHome,
// // // // // // //   FaBuilding, FaRuler, FaShieldAlt, FaClock, FaEye, FaBookmark, FaLink
// // // // // // // } from 'react-icons/fa';
// // // // // // // import { Swiper, SwiperSlide } from 'swiper/react';
// // // // // // // import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// // // // // // // import NeshanMap from "@neshan-maps-platform/react-openlayers";
// // // // // // // import "@neshan-maps-platform/react-openlayers/dist/style.css";
// // // // // // // import 'swiper/css';
// // // // // // // import 'swiper/css/navigation';
// // // // // // // import 'swiper/css/pagination';
// // // // // // // import './RealEstateDetailPageItem.css';

// // // // // // // // ========== کامپوننت پاپ‌آپ استوری ==========
// // // // // // // const StoryPopup = ({ agentName, agentImage, userId, onClose }) => {
// // // // // // //   const [stories, setStories] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
// // // // // // //   const [progress, setProgress] = useState(0);
// // // // // // //   const [isPaused, setIsPaused] = useState(false);
// // // // // // //   const [error, setError] = useState(null);

// // // // // // //   // دریافت استوری‌ها از API
// // // // // // //   useEffect(() => {
// // // // // // //     const fetchStories = async () => {
// // // // // // //       if (!userId) {
// // // // // // //         setError('شناسه کاربر یافت نشد');
// // // // // // //         setLoading(false);
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       try {
// // // // // // //         setLoading(true);
// // // // // // //         console.log('📡 در حال دریافت استوری برای userId:', userId);
        
// // // // // // //         const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${userId}`);
        
// // // // // // //         console.log('📡 Response status:', response.status);
        
// // // // // // //         if (!response.ok) {
// // // // // // //           throw new Error(`HTTP ${response.status}`);
// // // // // // //         }
        
// // // // // // //         const result = await response.json();
// // // // // // //         console.log('📦 نتیجه استوری:', result);
        
// // // // // // //         if (result.status === 200 && result.data && result.data.length > 0) {
// // // // // // //           const userStories = result.data[0]?.storyUser || [];
// // // // // // //           console.log('📸 تعداد استوری‌ها:', userStories.length);
          
// // // // // // //           const formattedStories = userStories.map(story => ({
// // // // // // //             ...story,
// // // // // // //             url: `https://localhost:7178${story.url}`
// // // // // // //           }));
// // // // // // //           setStories(formattedStories);
// // // // // // //         } else {
// // // // // // //           console.log('⚠️ هیچ استوری پیدا نشد');
// // // // // // //           setStories([]);
// // // // // // //         }
// // // // // // //       } catch (error) {
// // // // // // //         console.error('❌ خطا در دریافت استوری:', error);
// // // // // // //         setError('مشکل در دریافت استوری‌ها');
// // // // // // //       } finally {
// // // // // // //         setLoading(false);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchStories();
// // // // // // //   }, [userId]);

// // // // // // //   // مدیریت پخش خودکار استوری‌ها
// // // // // // //   useEffect(() => {
// // // // // // //     if (isPaused || loading || stories.length === 0) return;

// // // // // // //     const timer = setInterval(() => {
// // // // // // //       setProgress(prev => {
// // // // // // //         const newProgress = prev + 1;
// // // // // // //         if (newProgress >= 100) {
// // // // // // //           if (currentStoryIndex < stories.length - 1) {
// // // // // // //             setCurrentStoryIndex(prev => prev + 1);
// // // // // // //             return 0;
// // // // // // //           } else {
// // // // // // //             onClose();
// // // // // // //             return 0;
// // // // // // //           }
// // // // // // //         }
// // // // // // //         return newProgress;
// // // // // // //       });
// // // // // // //     }, 50);

// // // // // // //     return () => clearInterval(timer);
// // // // // // //   }, [currentStoryIndex, isPaused, loading, stories, onClose]);

// // // // // // //   // هندلرهای ناوبری
// // // // // // //   const handlePrevStory = useCallback((e) => {
// // // // // // //     e.stopPropagation();
// // // // // // //     if (currentStoryIndex > 0) {
// // // // // // //       setCurrentStoryIndex(prev => prev - 1);
// // // // // // //       setProgress(0);
// // // // // // //     }
// // // // // // //   }, [currentStoryIndex]);

// // // // // // //   const handleNextStory = useCallback((e) => {
// // // // // // //     e.stopPropagation();
// // // // // // //     if (currentStoryIndex < stories.length - 1) {
// // // // // // //       setCurrentStoryIndex(prev => prev + 1);
// // // // // // //       setProgress(0);
// // // // // // //     } else {
// // // // // // //       onClose();
// // // // // // //     }
// // // // // // //   }, [currentStoryIndex, stories.length, onClose]);

// // // // // // //   // کلیک روی لینک استوری
// // // // // // //   const handleStoryLink = useCallback((link) => {
// // // // // // //     if (link) {
// // // // // // //       window.location.href = link;
// // // // // // //     }
// // // // // // //   }, []);

// // // // // // //   if (loading) {
// // // // // // //     return (
// // // // // // //       <div className="realestate-detail story-popup-overlay" onClick={onClose}>
// // // // // // //         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // // // // // //           <div style={{ 
// // // // // // //             display: 'flex', 
// // // // // // //             alignItems: 'center', 
// // // // // // //             justifyContent: 'center', 
// // // // // // //             height: '100%',
// // // // // // //             color: 'white',
// // // // // // //             fontSize: '18px',
// // // // // // //             fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
// // // // // // //           }}>
// // // // // // //             در حال بارگذاری استوری‌ها...
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   if (error || stories.length === 0) {
// // // // // // //     return (
// // // // // // //       <div className="realestate-detail story-popup-overlay" onClick={onClose}>
// // // // // // //         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // // // // // //           <div style={{ 
// // // // // // //             display: 'flex', 
// // // // // // //             flexDirection: 'column',
// // // // // // //             alignItems: 'center', 
// // // // // // //             justifyContent: 'center', 
// // // // // // //             height: '100%',
// // // // // // //             color: 'white',
// // // // // // //             fontSize: '16px',
// // // // // // //             padding: '20px',
// // // // // // //             textAlign: 'center',
// // // // // // //             fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
// // // // // // //           }}>
// // // // // // //             <p>{error || 'هیچ استوری برای این کاربر وجود ندارد'}</p>
// // // // // // //             <button 
// // // // // // //               onClick={onClose}
// // // // // // //               style={{
// // // // // // //                 marginTop: '20px',
// // // // // // //                 padding: '10px 30px',
// // // // // // //                 background: '#ff0000',
// // // // // // //                 color: 'white',
// // // // // // //                 border: 'none',
// // // // // // //                 borderRadius: '8px',
// // // // // // //                 cursor: 'pointer',
// // // // // // //                 fontSize: '14px',
// // // // // // //                 fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
// // // // // // //               }}
// // // // // // //             >
// // // // // // //               بستن
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   const currentStory = stories[currentStoryIndex];

// // // // // // //   return (
// // // // // // //     <div 
// // // // // // //       className="realestate-detail story-popup-overlay"
// // // // // // //       onClick={onClose}
// // // // // // //       onMouseEnter={() => setIsPaused(true)}
// // // // // // //       onMouseLeave={() => setIsPaused(false)}
// // // // // // //     >
// // // // // // //       <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // // // // // //         {/* نوارهای پیشرفت */}
// // // // // // //         <div className="story-progress-container">
// // // // // // //           {stories.map((_, index) => (
// // // // // // //             <div 
// // // // // // //               key={index} 
// // // // // // //               className="story-progress-bar"
// // // // // // //             >
// // // // // // //               <div 
// // // // // // //                 className="story-progress-fill"
// // // // // // //                 style={{
// // // // // // //                   width: index < currentStoryIndex ? '100%' : 
// // // // // // //                          index === currentStoryIndex ? `${progress}%` : '0%'
// // // // // // //                 }}
// // // // // // //               />
// // // // // // //             </div>
// // // // // // //           ))}
// // // // // // //         </div>

// // // // // // //         {/* هدر */}
// // // // // // //         <div className="story-header">
// // // // // // //           <div className="story-user-info">
// // // // // // //             <img 
// // // // // // //               src={agentImage} 
// // // // // // //               alt={agentName} 
// // // // // // //               className="story-user-avatar"
// // // // // // //             />
// // // // // // //             <span className="story-user-name">{agentName}</span>
// // // // // // //             <span className="story-time">لحظاتی پیش</span>
// // // // // // //           </div>
// // // // // // //           <button className="story-close-btn" onClick={onClose}>✕</button>
// // // // // // //         </div>

// // // // // // //         {/* محتوای استوری */}
// // // // // // //         <div className="story-content">
// // // // // // //           <img 
// // // // // // //             src={currentStory.url} 
// // // // // // //             alt={currentStory.caption || 'استوری'} 
// // // // // // //             className="story-image"
// // // // // // //           />
          
// // // // // // //           {/* کپشن */}
// // // // // // //           {currentStory.caption && (
// // // // // // //             <div className="story-caption">
// // // // // // //               {currentStory.caption}
// // // // // // //             </div>
// // // // // // //           )}

// // // // // // //           {/* لینک استوری */}
// // // // // // //           {currentStory.link && (
// // // // // // //             <div 
// // // // // // //               className="story-link-button"
// // // // // // //               onClick={() => handleStoryLink(currentStory.link)}
// // // // // // //             >
// // // // // // //               <FaLink />
// // // // // // //               <span>{currentStory.linkText || 'مشاهده بیشتر'}</span>
// // // // // // //             </div>
// // // // // // //           )}
// // // // // // //         </div>

// // // // // // //         {/* دکمه‌های ناوبری */}
// // // // // // //         <div 
// // // // // // //           className="story-nav-left"
// // // // // // //           onClick={handlePrevStory}
// // // // // // //         />
// // // // // // //         <div 
// // // // // // //           className="story-nav-right"
// // // // // // //           onClick={handleNextStory}
// // // // // // //         />
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // // ========== کامپوننت SafeImage ==========
// // // // // // // const SafeImage = ({ src, alt, className, fallbackSrc, ...props }) => {
// // // // // // //   const [error, setError] = useState(false);

// // // // // // //   if (!src || error) {
// // // // // // //     return (
// // // // // // //       <img 
// // // // // // //         src={fallbackSrc || 'https://randomuser.me/api/portraits/men/32.jpg'} 
// // // // // // //         alt={alt || 'تصویر'} 
// // // // // // //         className={className}
// // // // // // //         {...props}
// // // // // // //       />
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <img
// // // // // // //       src={src}
// // // // // // //       alt={alt}
// // // // // // //       className={className}
// // // // // // //       onError={() => {
// // // // // // //         setError(true);
// // // // // // //       }}
// // // // // // //       {...props}
// // // // // // //     />
// // // // // // //   );
// // // // // // // };

// // // // // // // // ========== توابع کمکی ==========
// // // // // // // const stripHtml = (html) => {
// // // // // // //   if (!html) return '';
// // // // // // //   const temp = document.createElement('div');
// // // // // // //   temp.innerHTML = html;
// // // // // // //   return temp.textContent || temp.innerText || '';
// // // // // // // };

// // // // // // // const truncateText = (text, maxLength) => {
// // // // // // //   if (!text) return '';
// // // // // // //   if (text.length <= maxLength) return text;
// // // // // // //   return text.substring(0, maxLength - 2) + '…';
// // // // // // // };

// // // // // // // // ========== کامپوننت‌های متا ==========
// // // // // // // const PageMetadata = ({ property, isForSale, isForRent }) => {
// // // // // // //   useEffect(() => {
// // // // // // //     if (!property) return;
// // // // // // //     let title = property.title 
// // // // // // //       ? `${truncateText(property.title, 40)} | ${isForSale ? 'فروش' : 'رهن و اجاره'} ${property.area}م ${property.regionName}`
// // // // // // //       : `ملک ${property.area} متری ${property.regionName}`;
// // // // // // //     title = truncateText(title, 65);
// // // // // // //     document.title = title;
// // // // // // //     const plainDescription = stripHtml(property.description || '');
// // // // // // //     const priceText = isForSale ? `قیمت: ${property.price} تومان` : `رهن: ${property.mortgagePrice || property.depositPrice || 'تماس بگیرید'} تومان`;
// // // // // // //     let description = plainDescription ? truncateText(plainDescription, 120) + `... ${priceText}` : `ملک ${isForSale ? 'فروش' : 'رهن و اجاره'} در ${property.regionName}، ${property.area} متری، ${property.rooms} خوابه - ${priceText}`;
// // // // // // //     description = truncateText(description, 155);
// // // // // // //     const keywords = [property.title, `${property.regionName} ملک`, isForSale ? 'فروش آپارتمان' : 'رهن آپارتمان', `${property.area} متری`, `${property.rooms} خوابه`, `طبقه ${property.floor}`, property.year !== "نامشخص" ? `ساخت ${property.year}` : '', ...property.features.slice(0, 5)].filter(Boolean).join(',');
// // // // // // //     const updateOrCreateMeta = (name, content, isProperty = false) => {
// // // // // // //       const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
// // // // // // //       let meta = document.querySelector(selector);
// // // // // // //       if (!meta) {
// // // // // // //         meta = document.createElement('meta');
// // // // // // //         if (isProperty) meta.setAttribute('property', name);
// // // // // // //         else meta.setAttribute('name', name);
// // // // // // //         document.head.appendChild(meta);
// // // // // // //       }
// // // // // // //       meta.setAttribute('content', content);
// // // // // // //     };
// // // // // // //     updateOrCreateMeta('description', description);
// // // // // // //     updateOrCreateMeta('keywords', keywords);
// // // // // // //     updateOrCreateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1');
// // // // // // //     let canonical = document.querySelector('link[rel="canonical"]');
// // // // // // //     if (!canonical) {
// // // // // // //       canonical = document.createElement('link');
// // // // // // //       canonical.rel = 'canonical';
// // // // // // //       document.head.appendChild(canonical);
// // // // // // //     }
// // // // // // //     canonical.href = window.location.href;
// // // // // // //     updateOrCreateMeta('og:title', title, true);
// // // // // // //     updateOrCreateMeta('og:description', truncateText(description, 200), true);
// // // // // // //     updateOrCreateMeta('og:image', property.images?.[0] || '/default-property-image.jpg', true);
// // // // // // //     updateOrCreateMeta('og:url', window.location.href, true);
// // // // // // //     updateOrCreateMeta('og:type', 'product', true);
// // // // // // //     updateOrCreateMeta('og:locale', 'fa_IR', true);
// // // // // // //     updateOrCreateMeta('og:site_name', 'مشاور املاک', true);
// // // // // // //     updateOrCreateMeta('twitter:card', 'summary_large_image');
// // // // // // //     updateOrCreateMeta('twitter:title', title);
// // // // // // //     updateOrCreateMeta('twitter:description', truncateText(description, 200));
// // // // // // //     updateOrCreateMeta('twitter:image', property.images?.[0] || '/default-property-image.jpg');
// // // // // // //     document.documentElement.lang = 'fa';
// // // // // // //     document.documentElement.dir = 'rtl';
// // // // // // //   }, [property, isForSale, isForRent]);
// // // // // // //   return null;
// // // // // // // };

// // // // // // // const StructuredData = ({ property, isForSale, isForRent }) => {
// // // // // // //   useEffect(() => {
// // // // // // //     if (!property) return;
// // // // // // //     const removeOldScript = () => { const oldScript = document.getElementById('json-ld-structured-data'); if (oldScript) oldScript.remove(); };
// // // // // // //     removeOldScript();
// // // // // // //     const parsePriceToNumber = (priceStr) => { if (!priceStr || priceStr === '۰') return '0'; return String(priceStr).replace(/[^0-9]/g, '') || '0'; };
// // // // // // //     const structuredData = {
// // // // // // //       "@context": "https://schema.org", "@type": isForSale ? "Product" : "RealEstateListing", "name": property.title,
// // // // // // //       "description": stripHtml(property.description || '').substring(0, 500), "image": property.images.slice(0, 10), "url": window.location.href,
// // // // // // //       "datePublished": new Date().toISOString(), "dateModified": new Date().toISOString(),
// // // // // // //       ...(isForSale && { "offers": { "@type": "Offer", "price": parsePriceToNumber(property.price), "priceCurrency": "IRR", "availability": "https://schema.org/InStock", "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] } }),
// // // // // // //       ...(isForRent && { "offers": { "@type": "Offer", "price": parsePriceToNumber(property.mortgagePrice || property.rentPrice || '0'), "priceCurrency": "IRR", "description": "ملک رهن و اجاره" } }),
// // // // // // //       "address": { "@type": "PostalAddress", "addressLocality": property.regionName, "streetAddress": property.address, "addressCountry": "IR", "addressRegion": "تهران" },
// // // // // // //       "floorSize": { "@type": "QuantitativeValue", "value": property.area || 0, "unitCode": "MTK", "unitText": "متر مربع" },
// // // // // // //       "numberOfRooms": property.rooms || 0,
// // // // // // //       "additionalProperty": [{ "@type": "PropertyValue", "name": "طبقه", "value": `${property.floor || 1} از ${property.totalFloors || 1}` }, { "@type": "PropertyValue", "name": "سال ساخت", "value": property.year !== "نامشخص" ? property.year : "نامشخص" }, ...property.features.slice(0, 15).map(feature => ({ "@type": "PropertyValue", "name": "امکانات", "value": feature }))],
// // // // // // //       "potentialAction": { "@type": "CommunicateAction", "name": "تماس با مشاور", "target": { "@type": "EntryPoint", "urlTemplate": `tel:${property.agent?.phone || ''}`, "inLanguage": "fa-IR", "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"] } }
// // // // // // //     };
// // // // // // //     const script = document.createElement('script');
// // // // // // //     script.id = 'json-ld-structured-data';
// // // // // // //     script.type = 'application/ld+json';
// // // // // // //     script.textContent = JSON.stringify(structuredData);
// // // // // // //     document.head.appendChild(script);
// // // // // // //     return () => removeOldScript();
// // // // // // //   }, [property, isForSale, isForRent]);
// // // // // // //   return null;
// // // // // // // };

// // // // // // // const BreadcrumbStructuredData = ({ property, isForSale }) => {
// // // // // // //   useEffect(() => {
// // // // // // //     if (!property) return;
// // // // // // //     const removeOldScript = () => { const oldScript = document.getElementById('json-ld-breadcrumb'); if (oldScript) oldScript.remove(); };
// // // // // // //     removeOldScript();
// // // // // // //     const baseUrl = window.location.origin;
// // // // // // //     const regionSlug = encodeURIComponent(property.regionName || 'منطقه');
// // // // // // //     const breadcrumbData = {
// // // // // // //       "@context": "https://schema.org", "@type": "BreadcrumbList",
// // // // // // //       "itemListElement": [
// // // // // // //         { "@type": "ListItem", "position": 1, "name": "صفحه اصلی", "item": `${baseUrl}/` },
// // // // // // //         { "@type": "ListItem", "position": 2, "name": isForSale ? "آپارتمان‌های فروش" : "آپارتمان‌های رهن و اجاره", "item": `${baseUrl}/${isForSale ? 'RealEstatePageDetail' : 'rent'}` },
// // // // // // //         { "@type": "ListItem", "position": 3, "name": `منطقه ${property.regionName}`, "item": `${baseUrl}/region/${regionSlug}` },
// // // // // // //         { "@type": "ListItem", "position": 4, "name": truncateText(property.title || 'جزئیات ملک', 80), "item": window.location.href }
// // // // // // //       ]
// // // // // // //     };
// // // // // // //     const script = document.createElement('script');
// // // // // // //     script.id = 'json-ld-breadcrumb';
// // // // // // //     script.type = 'application/ld+json';
// // // // // // //     script.textContent = JSON.stringify(breadcrumbData);
// // // // // // //     document.head.appendChild(script);
// // // // // // //     return () => removeOldScript();
// // // // // // //   }, [property, isForSale]);
// // // // // // //   return null;
// // // // // // // };

// // // // // // // // ========== Skeleton ==========
// // // // // // // const DetailSkeleton = () => (
// // // // // // //   <div className="detail-skeleton">
// // // // // // //     <div className="skeleton-header"><div className="skeleton-circle"></div><div className="skeleton-title"></div><div className="skeleton-circle"></div></div>
// // // // // // //     <div className="skeleton-gallery"><div className="skeleton-image"></div></div>
// // // // // // //     <div className="skeleton-content"><div className="skeleton-price"></div><div className="skeleton-info">{[]}</div><div className="skeleton-tabs">{[]}</div><div className="skeleton-text">{[]}</div></div>
// // // // // // //   </div>
// // // // // // // );

// // // // // // // // ========== کامپوننت اصلی ==========
// // // // // // // const RealEstateDetailPageItem = memo(() => {
// // // // // // //   const location = useLocation();
// // // // // // //   const navigate = useNavigate();
// // // // // // //   const { id: paramId } = useParams();
// // // // // // //   const queryParams = new URLSearchParams(location.search);
// // // // // // //   const id = paramId || queryParams.get('id');
// // // // // // //   const [property, setProperty] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [error, setError] = useState(null);
// // // // // // //   const [copied, setCopied] = useState(false);
// // // // // // //   const [selectedImage, setSelectedImage] = useState(0);
// // // // // // //   const [activeTab, setActiveTab] = useState('details');
// // // // // // //   const [isFavorite, setIsFavorite] = useState(false);
// // // // // // //   const [imagesLoaded, setImagesLoaded] = useState({});
// // // // // // //   const [showStoryPopup, setShowStoryPopup] = useState(false);
// // // // // // //   const [storyUserId, setStoryUserId] = useState(null);

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchPropertyData = async () => {
// // // // // // //       if (!id) { setError('شناسه ملک یافت نشد'); setLoading(false); return; }
// // // // // // //       setLoading(true); setError(null);
// // // // // // //       try {
// // // // // // //         const controller = new AbortController();
// // // // // // //         const timeoutId = setTimeout(() => controller.abort(), 10000);
// // // // // // //         const response = await fetch(`https://localhost:7178/api/RealEstatePage/GetRealEstateDetails?id=${id}`, { signal: controller.signal });
// // // // // // //         clearTimeout(timeoutId);
// // // // // // //         if (!response.ok) throw new Error(`HTTP ${response.status}`);
// // // // // // //         const result = await response.json();
        
// // // // // // //         console.log('📦 Full API response:', result);
        
// // // // // // //         if (result.status === 200 && result.data) {
// // // // // // //           const data = result.data;
          
// // // // // // //           const agentImage = data.agents?.image 
// // // // // // //             ? `https://localhost:7178/${data.agents.image}` 
// // // // // // //             : "https://randomuser.me/api/portraits/men/32.jpg";
          
// // // // // // //           const userId = data.agents?.userId || null;
// // // // // // //           const hasStory = data.agents?.hasStory || false;
          
// // // // // // //           console.log('👤 Agent UserId:', userId);
// // // // // // //           console.log('📱 HasStory:', hasStory);
          
// // // // // // //           // ✅ فقط اگر hasStory=true باشه، userId رو ست کن
// // // // // // //           setStoryUserId(hasStory ? userId : null);
          
// // // // // // //           setProperty({
// // // // // // //             id: data.id, 
// // // // // // //             title: data.title || `ملک در ${data.regionName || 'منطقه'} `, 
// // // // // // //             price: data.price?.toLocaleString("fa-IR") || "۰",
// // // // // // //             priceMeter: data.priceMeter?.toLocaleString("fa-IR") || "۰", 
// // // // // // //             rentPrice: data.rent?.toLocaleString("fa-IR") || null,
// // // // // // //             depositPrice: data.deposit?.toLocaleString("fa-IR") || null, 
// // // // // // //             mortgagePrice: data.mortgagePrice?.toLocaleString("fa-IR") || null,
// // // // // // //             type: data.categoryType, 
// // // // // // //             area: parseInt(data.additionalInformation?.match(/\d+/)?.[0]) || 0, 
// // // // // // //             rooms: data.rooms || 0,
// // // // // // //             floor: data.floor || 1, 
// // // // // // //             regionName: data.regionName || "منطقه نامشخص", 
// // // // // // //             totalFloors: data.countFloor || 1,
// // // // // // //             year: data.constructionYear || "نامشخص", 
// // // // // // //             address: data.address || "آدرس درج نشده", 
// // // // // // //             showExactLocation: data.showExactLocation,
// // // // // // //             location: { lat: data.lat || 35.7199363, lng: data.lng || 51.4334842 },
// // // // // // //             description: data.descriptionRows || "توضیحاتی برای این ملک ثبت نشده است.", 
// // // // // // //             features: data.facilities || [],
// // // // // // //             warnings: data.warnings || ["استعلام خلافی", "بررسی سند مالکیت", "استعلام پایان کار", "بررسی مفاصا حساب"],
// // // // // // //             images: (data.images || []).map(img => `https://localhost:7178/${img}`),
// // // // // // //             agent: { 
// // // // // // //               name: data.agents?.name || "مشاور املاک", 
// // // // // // //               phone: data.agents?.phone || "۰۲۱۹۱۰۰۰۰۰۰", 
// // // // // // //               whatsapp: data.agents?.connectSocialMedia || "", 
// // // // // // //               address: data.agents?.address || "آدرس دفتر درج نشده", 
// // // // // // //               rating: data.agents?.rating || 4.5, 
// // // // // // //               deals: data.agents?.deals || 120, 
// // // // // // //               image: agentImage,
// // // // // // //               hasStory: hasStory, // ✅ ذخیره مقدار hasStory در agent
// // // // // // //               userId: userId
// // // // // // //             },
// // // // // // //             views: data.views || 0, 
// // // // // // //             saved: data.saved || 0, 
// // // // // // //             createdAt: data.createdAtPersianRelative || "امروز", 
// // // // // // //             certificate: data.isHasLoan ? "قابل وام" : "سند رسمی", 
// // // // // // //             mortgage: data.isHasLoan ? "امکان وام" : "بدون وام",
// // // // // // //             nearby: [{ name: "مترو", distance: "۵۰۰ متر" }, { name: "مرکز خرید", distance: "۳۰۰ متر" }, { name: "پارک", distance: "۲۰۰ متر" }, { name: "مدرسه", distance: "۴۰۰ متر" }]
// // // // // // //           });
// // // // // // //         } else throw new Error(result.message || 'ملک یافت نشد');
// // // // // // //       } catch (error) { 
// // // // // // //         console.error('خطا:', error); 
// // // // // // //         setError(error.name === 'AbortError' ? 'مدت زمان درخواست به پایان رسید' : 'مشکل در ارتباط با سرور'); 
// // // // // // //       } finally { 
// // // // // // //         setLoading(false); 
// // // // // // //       }
// // // // // // //     };
// // // // // // //     fetchPropertyData();
// // // // // // //     window.scrollTo({ top: 0, behavior: 'smooth' });
// // // // // // //   }, [id]);

// // // // // // //   const isForSale = useMemo(() => property?.type === 1, [property]);
// // // // // // //   const isForRent = useMemo(() => property?.type === 2, [property]);
// // // // // // //   const formattedPricePerMeter = useMemo(() => { if (!property?.priceMeter || property.priceMeter === "۰") return null; return `${property.priceMeter} تومان`; }, [property]);
// // // // // // //   const shareUrl = useMemo(() => window.location.href, []);

// // // // // // //   const handleCopyLink = useCallback(() => { navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }, [shareUrl]);
// // // // // // //   const handleShare = useCallback(async () => { if (!property) return; const shareData = { title: property.title, text: `${property.title} - ${property.area} متری - ${isForSale ? `قیمت ${property.price}` : `رهن ${property.mortgagePrice}`} تومان`, url: shareUrl }; if (navigator.share && /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)) { try { await navigator.share(shareData); } catch (error) { if (error.name !== 'AbortError') handleCopyLink(); } } else handleCopyLink(); }, [property, isForSale, shareUrl, handleCopyLink]);
// // // // // // //   const handleCopyPhone = useCallback(() => { if (!property?.agent?.phone) return; navigator.clipboard.writeText(property.agent.phone); setCopied(true); setTimeout(() => setCopied(false), 2000); }, [property]);
// // // // // // //   const handleImageLoad = useCallback((index) => { setImagesLoaded(prev => ({ ...prev, [index]: true })); }, []);
// // // // // // //   const handleFavoriteToggle = useCallback(() => { setIsFavorite(prev => !prev); }, []);
  
// // // // // // //   // ✅ رفتن به پروفایل کاربر
// // // // // // //   const goToProfile = useCallback(() => {
// // // // // // //     if (property?.agent?.userId) {
// // // // // // //       console.log('👤 رفتن به پروفایل کاربر:', property.agent.userId);
// // // // // // //       navigate(`/profile/${property.agent.userId}`);
// // // // // // //     }
// // // // // // //   }, [property, navigate]);

// // // // // // //   // ✅ باز کردن استوری
// // // // // // //   const handleStoryClick = useCallback((e) => {
// // // // // // //     if (e) {
// // // // // // //       e.stopPropagation();
// // // // // // //     }
    
// // // // // // //     console.log('🖱️ کلیک روی استوری');
// // // // // // //     console.log('🆔 storyUserId:', storyUserId);
// // // // // // //     console.log('📱 hasStory:', property?.agent?.hasStory);
    
// // // // // // //     // ✅ فقط اگر storyUserId وجود داشته باشه (یعنی hasStory=true)
// // // // // // //     if (storyUserId) {
// // // // // // //       console.log('✅ باز کردن استوری برای userId:', storyUserId);
// // // // // // //       setShowStoryPopup(true);
// // // // // // //       document.body.style.overflow = 'hidden';
// // // // // // //     } else {
// // // // // // //       console.log('❌ این کاربر استوری ندارد');
// // // // // // //     }
// // // // // // //   }, [storyUserId, property]);

// // // // // // //   // ✅ بستن استوری
// // // // // // //   const handleStoryClose = useCallback(() => {
// // // // // // //     setShowStoryPopup(false);
// // // // // // //     document.body.style.overflow = '';
// // // // // // //   }, []);

// // // // // // //   if (error) return ( 
// // // // // // //     <> 
// // // // // // //       <PageMetadata property={null} /> 
// // // // // // //       <div className="detail-container realestate-detail">
// // // // // // //         <div className="detail-header">
// // // // // // //           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
// // // // // // //           <h1 className="header-title">خطا</h1>
// // // // // // //           <div className="header-btn"></div>
// // // // // // //         </div>
// // // // // // //         <div className="error-message">
// // // // // // //           <h2>متاسفانه خطایی رخ داده است</h2>
// // // // // // //           <p>{error}</p>
// // // // // // //           <button onClick={() => window.location.reload()}>تلاش مجدد</button>
// // // // // // //           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </> 
// // // // // // //   );
  
// // // // // // //   if (loading) return <DetailSkeleton />;
  
// // // // // // //   if (!property) return ( 
// // // // // // //     <> 
// // // // // // //       <PageMetadata property={null} /> 
// // // // // // //       <div className="detail-container realestate-detail">
// // // // // // //         <div className="detail-header">
// // // // // // //           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
// // // // // // //           <h1 className="header-title">ملک یافت نشد</h1>
// // // // // // //           <div className="header-btn"></div>
// // // // // // //         </div>
// // // // // // //         <div className="error-message">
// // // // // // //           <p>متاسفانه ملک مورد نظر یافت نشد</p>
// // // // // // //           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </> 
// // // // // // //   );

// // // // // // //   return ( 
// // // // // // //     <>
// // // // // // //       <PageMetadata property={property} isForSale={isForSale} isForRent={isForRent} />
// // // // // // //       <StructuredData property={property} isForSale={isForSale} isForRent={isForRent} />
// // // // // // //       <BreadcrumbStructuredData property={property} isForSale={isForSale} />
      
// // // // // // //       {/* ✅ پاپ‌آپ استوری */}
// // // // // // //       {showStoryPopup && (
// // // // // // //         <StoryPopup 
// // // // // // //           agentName={property.agent.name}
// // // // // // //           agentImage={property.agent.image}
// // // // // // //           userId={storyUserId}
// // // // // // //           onClose={handleStoryClose}
// // // // // // //         />
// // // // // // //       )}
      
// // // // // // //       <div className="detail-container realestate-detail">
// // // // // // //         <nav className="breadcrumb-nav">
// // // // // // //           <ol className="breadcrumb-list">
// // // // // // //             <li className="breadcrumb-item"><a href="/">خانه</a></li>
// // // // // // //             <li className="breadcrumb-item"><a href={isForSale ? '/sale' : '/rent'}>{isForSale ? 'فروش آپارتمان' : 'رهن و اجاره آپارتمان'}</a></li>
// // // // // // //             <li className="breadcrumb-item"><a href={`/region/${encodeURIComponent(property.regionName)}`}>منطقه {property.regionName}</a></li>
// // // // // // //             <li className="breadcrumb-item active">{truncateText(property.title, 50)}</li>
// // // // // // //           </ol>
// // // // // // //         </nav>
        
// // // // // // //         <div className="detail-header">
// // // // // // //           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
// // // // // // //           <h1 className="header-title">{property.title}</h1>
// // // // // // //           <button className="header-btn" onClick={handleShare}><FaShare /></button>
// // // // // // //         </div>
        
// // // // // // //         <div className="detail-gallery">
// // // // // // //           <Swiper 
// // // // // // //             modules={[Navigation, Pagination, Autoplay]} 
// // // // // // //             navigation 
// // // // // // //             pagination={{ clickable: true }} 
// // // // // // //             autoplay={{ delay: 4000, disableOnInteraction: false }} 
// // // // // // //             spaceBetween={0} 
// // // // // // //             slidesPerView={1} 
// // // // // // //             onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)} 
// // // // // // //             className="gallery-swiper"
// // // // // // //           >
// // // // // // //             {property.images.length > 0 ? 
// // // // // // //               property.images.map((img, index) => (
// // // // // // //                 <SwiperSlide key={index}>
// // // // // // //                   <div className="gallery-slide">
// // // // // // //                     {!imagesLoaded[index] && <div className="image-placeholder"><FaHome /></div>}
// // // // // // //                     <img 
// // // // // // //                       src={img} 
// // // // // // //                       alt={`${property.title} - ${index === 0 ? 'نمای اصلی' : `تصویر ${index + 1}`}`} 
// // // // // // //                       loading={index === 0 ? 'eager' : 'lazy'} 
// // // // // // //                       onLoad={() => handleImageLoad(index)} 
// // // // // // //                       style={{ display: imagesLoaded[index] ? 'block' : 'none' }} 
// // // // // // //                     />
// // // // // // //                   </div>
// // // // // // //                 </SwiperSlide>
// // // // // // //               )) : 
// // // // // // //               (<SwiperSlide>
// // // // // // //                 <div className="gallery-slide no-image">
// // // // // // //                   <FaHome />
// // // // // // //                   <span>تصویری موجود نیست</span>
// // // // // // //                 </div>
// // // // // // //               </SwiperSlide>)
// // // // // // //             }
// // // // // // //           </Swiper>
// // // // // // //           <button className={`favorite-btn ${isFavorite ? 'active' : ''}`} onClick={handleFavoriteToggle}>
// // // // // // //             {isFavorite ? <FaHeart /> : <FaRegHeart />}
// // // // // // //           </button>
// // // // // // //           <div className="image-counter">{selectedImage + 1} / {property.images.length || 1}</div>
// // // // // // //         </div>
        
// // // // // // //         <div className="detail-main">
// // // // // // //           <div className="detail-title-section">
// // // // // // //             <div className="title-row">
// // // // // // //               <div className="property-stats">
// // // // // // //                 <span className="stat-badge"><FaEye /> {property.views.toLocaleString('fa-IR')} بازدید</span>
// // // // // // //                 <span className="stat-badge"><FaBookmark /> {property.saved.toLocaleString('fa-IR')} ذخیره</span>
// // // // // // //                 <span className="stat-badge"><FaClock /> {property.createdAt}</span>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>
          
// // // // // // //           <div className="price-section">
// // // // // // //             {isForSale && (
// // // // // // //               <div className="price-card sale-price">
// // // // // // //                 <div className="price-card-icon"><FaTag /></div>
// // // // // // //                 <div className="price-card-content">
// // // // // // //                   <span className="price-label">قیمت فروش</span>
// // // // // // //                   <div className="price-value-wrapper">
// // // // // // //                     <span className="price-number">{property.price}</span>
// // // // // // //                     <span className="price-unit">تومان</span>
// // // // // // //                   </div>
// // // // // // //                   {formattedPricePerMeter && 
// // // // // // //                     <div className="price-meta">
// // // // // // //                       <FaRuler />
// // // // // // //                       <span>متری {formattedPricePerMeter}</span>
// // // // // // //                     </div>
// // // // // // //                   }
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             )}
            
// // // // // // //             {isForRent && (
// // // // // // //               <div className="rent-price-group">
// // // // // // //                 {property.mortgagePrice && property.mortgagePrice !== "۰" && (
// // // // // // //                   <div className="price-card mortgage-price">
// // // // // // //                     <div className="price-card-icon"><FaBuilding /></div>
// // // // // // //                     <div className="price-card-content">
// // // // // // //                       <span className="price-label">مبلغ رهن</span>
// // // // // // //                       <div className="price-value-wrapper">
// // // // // // //                         <span className="price-number">{property.mortgagePrice}</span>
// // // // // // //                         <span className="price-unit">تومان</span>
// // // // // // //                       </div>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 )}
// // // // // // //                 {property.rentPrice && property.rentPrice !== "۰" && (
// // // // // // //                   <div className="price-card rent-price">
// // // // // // //                     <div className="price-card-icon"><FaHome /></div>
// // // // // // //                     <div className="price-card-content">
// // // // // // //                       <span className="price-label">اجاره ماهانه</span>
// // // // // // //                       <div className="price-value-wrapper">
// // // // // // //                         <span className="price-number">{property.rentPrice}</span>
// // // // // // //                         <span className="price-unit">تومان</span>
// // // // // // //                       </div>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 )}
// // // // // // //               </div>
// // // // // // //             )}
// // // // // // //           </div>
          
// // // // // // //           <div className="quick-specs">
// // // // // // //             <div className="spec-item">
// // // // // // //               <FaRulerCombined />
// // // // // // //               <span className="spec-label">متراژ</span>
// // // // // // //               <span className="spec-value">{property.area} متر²</span>
// // // // // // //             </div>
// // // // // // //             <div className="spec-item">
// // // // // // //               <FaBath />
// // // // // // //               <span className="spec-label">اتاق‌خواب</span>
// // // // // // //               <span className="spec-value">{property.rooms} خواب</span>
// // // // // // //             </div>
// // // // // // //             <div className="spec-item">
// // // // // // //               <FaLayerGroup />
// // // // // // //               <span className="spec-label">طبقه</span>
// // // // // // //               <span className="spec-value">{property.floor} از {property.totalFloors}</span>
// // // // // // //             </div>
// // // // // // //             <div className="spec-item">
// // // // // // //               <FaCalendarAlt />
// // // // // // //               <span className="spec-label">سال ساخت</span>
// // // // // // //               <span className="spec-value">{property.year}</span>
// // // // // // //             </div>
// // // // // // //           </div>
          
// // // // // // //           <div className="info-chips">
// // // // // // //             <span className="info-chip">کد ملک: {property.id}</span>
// // // // // // //             <span className="info-chip"><FaShieldAlt /> {property.certificate}</span>
// // // // // // //             <span className="info-chip type-chip">{isForSale ? 'فروش' : 'رهن و اجاره'}</span>
// // // // // // //           </div>
          
// // // // // // //           <div className="detail-tabs">
// // // // // // //             <button className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`} onClick={() => setActiveTab('details')}>جزئیات ملک</button>
// // // // // // //             <button className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`} onClick={() => setActiveTab('features')}>امکانات ({property.features.length})</button>
// // // // // // //             <button className={`tab-btn ${activeTab === 'warnings' ? 'active' : ''}`} onClick={() => setActiveTab('warnings')}>هشدارهای معامله</button>
// // // // // // //             <button className={`tab-btn ${activeTab === 'nearby' ? 'active' : ''}`} onClick={() => setActiveTab('nearby')}>امکانات اطراف</button>
// // // // // // //           </div>
          
// // // // // // //           <div className="tab-content">
// // // // // // //             {activeTab === 'details' && (
// // // // // // //               <div className="details-tab">
// // // // // // //                 <div className="address-card">
// // // // // // //                   <FaMapMarkerAlt />
// // // // // // //                   <div className="address-info">
// // // // // // //                     <h3>آدرس ملک</h3>
// // // // // // //                     <div>منطقه {property.regionName}</div>
// // // // // // //                     <p>{property.address}</p>
// // // // // // //                     <span className="post-date">تاریخ درج: {property.createdAt}</span>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //                 <div className="description-card">
// // // // // // //                   <h3>توضیحات کامل {property.title}</h3>
// // // // // // //                   <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(property.description, { ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'a', 'blockquote'], ALLOWED_ATTR: ['href', 'target'] }) }} />
// // // // // // //                 </div>
// // // // // // //                 <div className="map-card">
// // // // // // //                   <h3><FaMapMarkerAlt /> موقعیت مکانی ملک در منطقه {property.regionName}</h3>
// // // // // // //                   <div className="map-location-badge">
// // // // // // //                     {property.showExactLocation ? 
// // // // // // //                       <span className="badge exact">📍 نمایش موقعیت دقیق ملک</span> : 
// // // // // // //                       <span className="badge approximate">🔵 نمایش محدوده تقریبی</span>
// // // // // // //                     }
// // // // // // //                   </div>
// // // // // // //                   <div className="map-container">
// // // // // // //                     <NeshanMap 
// // // // // // //                       mapKey="web.31c5ea6c425e40cc9b30620a84a8be90" 
// // // // // // //                       center={{ latitude: property.location.lat, longitude: property.location.lng }} 
// // // // // // //                       zoom={property.showExactLocation ? 17 : 15.9} 
// // // // // // //                       defaultType="dreamy" 
// // // // // // //                       poi={true} 
// // // // // // //                       traffic={false} 
// // // // // // //                       style={{ height: '100%', width: '100%', pointerEvents: 'none' }} 
// // // // // // //                     />
// // // // // // //                     <div className="map-marker-overlay">
// // // // // // //                       {property.showExactLocation ? 
// // // // // // //                         <><div className="location-dot"></div><div className="location-ripple"></div></> : 
// // // // // // //                         <div className="location-circles"><div className="circle-3"></div></div>
// // // // // // //                       }
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                   <div className="map-privacy-note">
// // // // // // //                     <small>{property.showExactLocation ? '📍 موقعیت دقیق ملک' : '📍 محدوده تقریبی ملک'}</small>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             )}
            
// // // // // // //             {activeTab === 'features' && (
// // // // // // //               <div className="features-tab">
// // // // // // //                 <h3>امکانات و ویژگی‌ها</h3>
// // // // // // //                 <div className="features-grid">
// // // // // // //                   {property.features.length > 0 ? 
// // // // // // //                     property.features.map((feature, idx) => {
// // // // // // //                       let Icon = FaCheckCircle;
// // // // // // //                       if (feature.includes('پارکینگ')) Icon = FaParking;
// // // // // // //                       else if (feature.includes('انباری')) Icon = FaWarehouse;
// // // // // // //                       else if (feature.includes('آسانسور')) Icon = FaArrowUp;
// // // // // // //                       else if (feature.includes('استخر')) Icon = FaSwimmingPool;
// // // // // // //                       return (
// // // // // // //                         <div key={idx} className="feature-card">
// // // // // // //                           <Icon />
// // // // // // //                           <span>{feature}</span>
// // // // // // //                         </div>
// // // // // // //                       );
// // // // // // //                     }) : 
// // // // // // //                     <p className="no-data">امکاناتی ثبت نشده است</p>
// // // // // // //                   }
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             )}
            
// // // // // // //             {activeTab === 'warnings' && (
// // // // // // //               <div className="warnings-tab">
// // // // // // //                 <h3>⚠️ هشدارهای مهم</h3>
// // // // // // //                 <ul className="warnings-list">
// // // // // // //                   {property.warnings.map((w, idx) => (
// // // // // // //                     <li key={idx} className="warning-item">
// // // // // // //                       <span className="warning-bullet"></span>
// // // // // // //                       <span>{w}</span>
// // // // // // //                     </li>
// // // // // // //                   ))}
// // // // // // //                 </ul>
// // // // // // //                 <div className="warning-footer">
// // // // // // //                   <p>⚠️ قبل از معامله مدارک را بررسی کنید</p>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             )}
            
// // // // // // //             {activeTab === 'nearby' && (
// // // // // // //               <div className="nearby-tab">
// // // // // // //                 <h3>امکانات اطراف</h3>
// // // // // // //                 <div className="nearby-list">
// // // // // // //                   {property.nearby.map((item, idx) => (
// // // // // // //                     <div key={idx} className="nearby-item">
// // // // // // //                       <span className="nearby-name">{item.name}</span>
// // // // // // //                       <span className="nearby-distance">{item.distance}</span>
// // // // // // //                     </div>
// // // // // // //                   ))}
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             )}
// // // // // // //           </div>
          
// // // // // // //           {/* ========== کارت مشاور (مثل اینستاگرام) ========== */}
// // // // // // //           <div className="agent-card">
// // // // // // //             <div className="agent-header">
// // // // // // //               {/* آواتار با قابلیت کلیک برای پروفایل و رینگ استوری */}
// // // // // // //               <div 
// // // // // // //                 className={`agent-avatar-wrapper ${property.agent.hasStory ? 'has-story' : ''}`}
// // // // // // //                 style={{ 
// // // // // // //                   position: 'relative',
// // // // // // //                   display: 'inline-block',
// // // // // // //                   flexShrink: 0,
// // // // // // //                   cursor: property.agent.userId ? 'pointer' : 'default'
// // // // // // //                 }}
// // // // // // //                 onClick={property.agent.userId ? goToProfile : undefined}
// // // // // // //               >
// // // // // // //                 <SafeImage 
// // // // // // //                   src={property.agent.image} 
// // // // // // //                   alt={property.agent.name} 
// // // // // // //                   className={`agent-avatar ${property.agent.hasStory ? 'has-story' : ''}`}
// // // // // // //                   fallbackSrc="https://randomuser.me/api/portraits/men/32.jpg"
// // // // // // //                 />
                
// // // // // // //                 {/* ✅ رینگ قرمز - فقط در صورتی که hasStory=true باشد */}
// // // // // // //                 {property.agent.hasStory && (
// // // // // // //                   <div 
// // // // // // //                     className="story-ring-indicator"
// // // // // // //                     onClick={(e) => {
// // // // // // //                       e.stopPropagation();
// // // // // // //                       handleStoryClick(e);
// // // // // // //                     }}
// // // // // // //                   >
// // // // // // //                     <div className="story-ring-gradient"></div>
// // // // // // //                   </div>
// // // // // // //                 )}
// // // // // // //               </div>
              
// // // // // // //               <div className="agent-info">
// // // // // // //                 <div className="agent-name-wrapper">
// // // // // // //                   <h3 
// // // // // // //                     style={{ cursor: property.agent.userId ? 'pointer' : 'default' }}
// // // // // // //                     onClick={property.agent.userId ? goToProfile : undefined}
// // // // // // //                   >
// // // // // // //                     {property.agent.name}
// // // // // // //                   </h3>
                  
// // // // // // //                   {/* ✅ برچسب استوری - فقط در صورتی که hasStory=true باشد */}
// // // // // // //                   {property.agent.hasStory && (
// // // // // // //                     <span 
// // // // // // //                       className="story-label" 
// // // // // // //                       onClick={(e) => {
// // // // // // //                         e.stopPropagation();
// // // // // // //                         handleStoryClick(e);
// // // // // // //                       }}
// // // // // // //                       style={{ cursor: 'pointer' }}
// // // // // // //                     >
// // // // // // //                       <span className="story-dot"></span>
// // // // // // //                       استوری
// // // // // // //                     </span>
// // // // // // //                   )}
// // // // // // //                 </div>
// // // // // // //                 <p>{property.agent.address}</p>
// // // // // // //                 <div className="agent-rating">
// // // // // // //                   <FaStar />
// // // // // // //                   <span>{property.agent.rating}</span>
// // // // // // //                   <span>({property.agent.deals} معامله)</span>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </div>
            
// // // // // // //             <div className="agent-actions">
// // // // // // //               <button className="agent-action-btn phone" onClick={handleCopyPhone}>
// // // // // // //                 <FaPhone /> {copied ? 'کپی شد!' : 'کپی شماره'}
// // // // // // //               </button>
// // // // // // //               <a 
// // // // // // //                 href={`https://wa.me/${property.agent.whatsapp}`} 
// // // // // // //                 target="_blank" 
// // // // // // //                 rel="noopener noreferrer" 
// // // // // // //                 className="agent-action-btn whatsapp"
// // // // // // //               >
// // // // // // //                 <FaWhatsapp /> واتساپ
// // // // // // //               </a>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
        
// // // // // // //         <DoubleSidebarBanners />
// // // // // // //         <RelatedPropertiesSlider 
// // // // // // //           currentPropertyId={property.id} 
// // // // // // //           regionName={property.regionName} 
// // // // // // //           propertyType={property.type} 
// // // // // // //         />
        
// // // // // // //         {copied && (
// // // // // // //           <div className="toast-notification">
// // // // // // //             <FaCheckCircle /> لینک کپی شد
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </> 
// // // // // // //   );
// // // // // // // });

// // // // // // // RealEstateDetailPageItem.displayName = 'RealEstateDetailPageItem';
// // // // // // // export default RealEstateDetailPageItem;









// // // // // // import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
// // // // // // import CryptoJS from 'crypto-js';
// // // // // // import DOMPurify from 'dompurify';
// // // // // // import { useNavigate, useLocation, useParams } from 'react-router-dom';
// // // // // // import RelatedPropertiesSlider from './RelatedPropertiesSlider';
// // // // // // import DoubleSidebarBanners from './SidebarBanner';
// // // // // // import { 
// // // // // //   FaMapMarkerAlt, FaPhone, FaWhatsapp, FaShare, FaArrowRight, FaHeart, FaRegHeart,
// // // // // //   FaStar, FaParking, FaWarehouse, FaSwimmingPool, FaBath, FaRulerCombined,
// // // // // //   FaCalendarAlt, FaLayerGroup, FaArrowUp, FaCheckCircle, FaTag, FaHome,
// // // // // //   FaBuilding, FaRuler, FaShieldAlt, FaClock, FaEye, FaBookmark, FaLink,
// // // // // //   FaLock, FaUser
// // // // // // } from 'react-icons/fa';
// // // // // // import { Swiper, SwiperSlide } from 'swiper/react';
// // // // // // import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// // // // // // import NeshanMap from "@neshan-maps-platform/react-openlayers";
// // // // // // import "@neshan-maps-platform/react-openlayers/dist/style.css";
// // // // // // import 'swiper/css';
// // // // // // import 'swiper/css/navigation';
// // // // // // import 'swiper/css/pagination';
// // // // // // import './RealEstateDetailPageItem.css';

// // // // // // // ============================================================
// // // // // // // ========== کامپوننت پاپ‌آپ استوری ==========
// // // // // // // ============================================================
// // // // // // const StoryPopup = ({ agentName, agentImage, userId, onClose }) => {
// // // // // //   const [stories, setStories] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
// // // // // //   const [progress, setProgress] = useState(0);
// // // // // //   const [isPaused, setIsPaused] = useState(false);
// // // // // //   const [error, setError] = useState(null);

// // // // // //   useEffect(() => {
// // // // // //     const fetchStories = async () => {
// // // // // //       if (!userId) {
// // // // // //         setError('شناسه کاربر یافت نشد');
// // // // // //         setLoading(false);
// // // // // //         return;
// // // // // //       }

// // // // // //       try {
// // // // // //         setLoading(true);
// // // // // //         console.log('📡 در حال دریافت استوری برای userId:', userId);
        
// // // // // //         const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${userId}`);
        
// // // // // //         console.log('📡 Response status:', response.status);
        
// // // // // //         if (!response.ok) {
// // // // // //           throw new Error(`HTTP ${response.status}`);
// // // // // //         }
        
// // // // // //         const result = await response.json();
// // // // // //         console.log('📦 نتیجه استوری:', result);
        
// // // // // //         if (result.status === 200 && result.data && result.data.length > 0) {
// // // // // //           const userStories = result.data[0]?.storyUser || [];
// // // // // //           console.log('📸 تعداد استوری‌ها:', userStories.length);
          
// // // // // //           const formattedStories = userStories.map(story => ({
// // // // // //             ...story,
// // // // // //             url: `https://localhost:7178${story.url}`
// // // // // //           }));
// // // // // //           setStories(formattedStories);
// // // // // //         } else {
// // // // // //           console.log('⚠️ هیچ استوری پیدا نشد');
// // // // // //           setStories([]);
// // // // // //         }
// // // // // //       } catch (error) {
// // // // // //         console.error('❌ خطا در دریافت استوری:', error);
// // // // // //         setError('مشکل در دریافت استوری‌ها');
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchStories();
// // // // // //   }, [userId]);

// // // // // //   useEffect(() => {
// // // // // //     if (isPaused || loading || stories.length === 0) return;

// // // // // //     const timer = setInterval(() => {
// // // // // //       setProgress(prev => {
// // // // // //         const newProgress = prev + 1;
// // // // // //         if (newProgress >= 100) {
// // // // // //           if (currentStoryIndex < stories.length - 1) {
// // // // // //             setCurrentStoryIndex(prev => prev + 1);
// // // // // //             return 0;
// // // // // //           } else {
// // // // // //             onClose();
// // // // // //             return 0;
// // // // // //           }
// // // // // //         }
// // // // // //         return newProgress;
// // // // // //       });
// // // // // //     }, 50);

// // // // // //     return () => clearInterval(timer);
// // // // // //   }, [currentStoryIndex, isPaused, loading, stories, onClose]);

// // // // // //   const handlePrevStory = useCallback((e) => {
// // // // // //     e.stopPropagation();
// // // // // //     if (currentStoryIndex > 0) {
// // // // // //       setCurrentStoryIndex(prev => prev - 1);
// // // // // //       setProgress(0);
// // // // // //     }
// // // // // //   }, [currentStoryIndex]);

// // // // // //   const handleNextStory = useCallback((e) => {
// // // // // //     e.stopPropagation();
// // // // // //     if (currentStoryIndex < stories.length - 1) {
// // // // // //       setCurrentStoryIndex(prev => prev + 1);
// // // // // //       setProgress(0);
// // // // // //     } else {
// // // // // //       onClose();
// // // // // //     }
// // // // // //   }, [currentStoryIndex, stories.length, onClose]);

// // // // // //   const handleStoryLink = useCallback((link) => {
// // // // // //     if (link) {
// // // // // //       window.location.href = link;
// // // // // //     }
// // // // // //   }, []);

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <div className="realestate-detail story-popup-overlay" onClick={onClose}>
// // // // // //         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // // // // //           <div style={{ 
// // // // // //             display: 'flex', 
// // // // // //             alignItems: 'center', 
// // // // // //             justifyContent: 'center', 
// // // // // //             height: '100%',
// // // // // //             color: 'white',
// // // // // //             fontSize: '18px',
// // // // // //             fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
// // // // // //           }}>
// // // // // //             در حال بارگذاری استوری‌ها...
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (error || stories.length === 0) {
// // // // // //     return (
// // // // // //       <div className="realestate-detail story-popup-overlay" onClick={onClose}>
// // // // // //         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // // // // //           <div style={{ 
// // // // // //             display: 'flex', 
// // // // // //             flexDirection: 'column',
// // // // // //             alignItems: 'center', 
// // // // // //             justifyContent: 'center', 
// // // // // //             height: '100%',
// // // // // //             color: 'white',
// // // // // //             fontSize: '16px',
// // // // // //             padding: '20px',
// // // // // //             textAlign: 'center',
// // // // // //             fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
// // // // // //           }}>
// // // // // //             <p>{error || 'هیچ استوری برای این کاربر وجود ندارد'}</p>
// // // // // //             <button 
// // // // // //               onClick={onClose}
// // // // // //               style={{
// // // // // //                 marginTop: '20px',
// // // // // //                 padding: '10px 30px',
// // // // // //                 background: '#ff0000',
// // // // // //                 color: 'white',
// // // // // //                 border: 'none',
// // // // // //                 borderRadius: '8px',
// // // // // //                 cursor: 'pointer',
// // // // // //                 fontSize: '14px',
// // // // // //                 fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
// // // // // //               }}
// // // // // //             >
// // // // // //               بستن
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   const currentStory = stories[currentStoryIndex];

// // // // // //   return (
// // // // // //     <div 
// // // // // //       className="realestate-detail story-popup-overlay"
// // // // // //       onClick={onClose}
// // // // // //       onMouseEnter={() => setIsPaused(true)}
// // // // // //       onMouseLeave={() => setIsPaused(false)}
// // // // // //     >
// // // // // //       <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // // // // //         <div className="story-progress-container">
// // // // // //           {stories.map((_, index) => (
// // // // // //             <div 
// // // // // //               key={index} 
// // // // // //               className="story-progress-bar"
// // // // // //             >
// // // // // //               <div 
// // // // // //                 className="story-progress-fill"
// // // // // //                 style={{
// // // // // //                   width: index < currentStoryIndex ? '100%' : 
// // // // // //                          index === currentStoryIndex ? `${progress}%` : '0%'
// // // // // //                 }}
// // // // // //               />
// // // // // //             </div>
// // // // // //           ))}
// // // // // //         </div>

// // // // // //         <div className="story-header">
// // // // // //           <div className="story-user-info">
// // // // // //             <img 
// // // // // //               src={agentImage} 
// // // // // //               alt={agentName} 
// // // // // //               className="story-user-avatar"
// // // // // //             />
// // // // // //             <span className="story-user-name">{agentName}</span>
// // // // // //             <span className="story-time">لحظاتی پیش</span>
// // // // // //           </div>
// // // // // //           <button className="story-close-btn" onClick={onClose}>✕</button>
// // // // // //         </div>

// // // // // //         <div className="story-content">
// // // // // //           <img 
// // // // // //             src={currentStory.url} 
// // // // // //             alt={currentStory.caption || 'استوری'} 
// // // // // //             className="story-image"
// // // // // //           />
          
// // // // // //           {currentStory.caption && (
// // // // // //             <div className="story-caption">
// // // // // //               {currentStory.caption}
// // // // // //             </div>
// // // // // //           )}

// // // // // //           {currentStory.link && (
// // // // // //             <div 
// // // // // //               className="story-link-button"
// // // // // //               onClick={() => handleStoryLink(currentStory.link)}
// // // // // //             >
// // // // // //               <FaLink />
// // // // // //               <span>{currentStory.linkText || 'مشاهده بیشتر'}</span>
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>

// // // // // //         <div 
// // // // // //           className="story-nav-left"
// // // // // //           onClick={handlePrevStory}
// // // // // //         />
// // // // // //         <div 
// // // // // //           className="story-nav-right"
// // // // // //           onClick={handleNextStory}
// // // // // //         />
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // // ============================================================
// // // // // // // ========== کامپوننت SafeImage ==========
// // // // // // // ============================================================
// // // // // // const SafeImage = ({ src, alt, className, fallbackSrc, ...props }) => {
// // // // // //   const [error, setError] = useState(false);

// // // // // //   if (!src || error) {
// // // // // //     return (
// // // // // //       <img 
// // // // // //         src={fallbackSrc || 'https://randomuser.me/api/portraits/men/32.jpg'} 
// // // // // //         alt={alt || 'تصویر'} 
// // // // // //         className={className}
// // // // // //         {...props}
// // // // // //       />
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <img
// // // // // //       src={src}
// // // // // //       alt={alt}
// // // // // //       className={className}
// // // // // //       onError={() => {
// // // // // //         setError(true);
// // // // // //       }}
// // // // // //       {...props}
// // // // // //     />
// // // // // //   );
// // // // // // };

// // // // // // // ============================================================
// // // // // // // ========== توابع کمکی ==========
// // // // // // // ============================================================
// // // // // // const stripHtml = (html) => {
// // // // // //   if (!html) return '';
// // // // // //   const temp = document.createElement('div');
// // // // // //   temp.innerHTML = html;
// // // // // //   return temp.textContent || temp.innerText || '';
// // // // // // };

// // // // // // const truncateText = (text, maxLength) => {
// // // // // //   if (!text) return '';
// // // // // //   if (text.length <= maxLength) return text;
// // // // // //   return text.substring(0, maxLength - 2) + '…';
// // // // // // };

// // // // // // // ============================================================
// // // // // // // ========== کامپوننت‌های متا ==========
// // // // // // // ============================================================
// // // // // // const PageMetadata = ({ property, isForSale, isForRent }) => {
// // // // // //   useEffect(() => {
// // // // // //     if (!property) return;
// // // // // //     let title = property.title 
// // // // // //       ? `${truncateText(property.title, 40)} | ${isForSale ? 'فروش' : 'رهن و اجاره'} ${property.area}م ${property.regionName}`
// // // // // //       : `ملک ${property.area} متری ${property.regionName}`;
// // // // // //     title = truncateText(title, 65);
// // // // // //     document.title = title;
// // // // // //     const plainDescription = stripHtml(property.description || '');
// // // // // //     const priceText = isForSale ? `قیمت: ${property.price} تومان` : `رهن: ${property.mortgagePrice || property.depositPrice || 'تماس بگیرید'} تومان`;
// // // // // //     let description = plainDescription ? truncateText(plainDescription, 120) + `... ${priceText}` : `ملک ${isForSale ? 'فروش' : 'رهن و اجاره'} در ${property.regionName}، ${property.area} متری، ${property.rooms} خوابه - ${priceText}`;
// // // // // //     description = truncateText(description, 155);
// // // // // //     const keywords = [property.title, `${property.regionName} ملک`, isForSale ? 'فروش آپارتمان' : 'رهن آپارتمان', `${property.area} متری`, `${property.rooms} خوابه`, `طبقه ${property.floor}`, property.year !== "نامشخص" ? `ساخت ${property.year}` : '', ...property.features.slice(0, 5)].filter(Boolean).join(',');
// // // // // //     const updateOrCreateMeta = (name, content, isProperty = false) => {
// // // // // //       const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
// // // // // //       let meta = document.querySelector(selector);
// // // // // //       if (!meta) {
// // // // // //         meta = document.createElement('meta');
// // // // // //         if (isProperty) meta.setAttribute('property', name);
// // // // // //         else meta.setAttribute('name', name);
// // // // // //         document.head.appendChild(meta);
// // // // // //       }
// // // // // //       meta.setAttribute('content', content);
// // // // // //     };
// // // // // //     updateOrCreateMeta('description', description);
// // // // // //     updateOrCreateMeta('keywords', keywords);
// // // // // //     updateOrCreateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1');
// // // // // //     let canonical = document.querySelector('link[rel="canonical"]');
// // // // // //     if (!canonical) {
// // // // // //       canonical = document.createElement('link');
// // // // // //       canonical.rel = 'canonical';
// // // // // //       document.head.appendChild(canonical);
// // // // // //     }
// // // // // //     canonical.href = window.location.href;
// // // // // //     updateOrCreateMeta('og:title', title, true);
// // // // // //     updateOrCreateMeta('og:description', truncateText(description, 200), true);
// // // // // //     updateOrCreateMeta('og:image', property.images?.[0] || '/default-property-image.jpg', true);
// // // // // //     updateOrCreateMeta('og:url', window.location.href, true);
// // // // // //     updateOrCreateMeta('og:type', 'product', true);
// // // // // //     updateOrCreateMeta('og:locale', 'fa_IR', true);
// // // // // //     updateOrCreateMeta('og:site_name', 'مشاور املاک', true);
// // // // // //     updateOrCreateMeta('twitter:card', 'summary_large_image');
// // // // // //     updateOrCreateMeta('twitter:title', title);
// // // // // //     updateOrCreateMeta('twitter:description', truncateText(description, 200));
// // // // // //     updateOrCreateMeta('twitter:image', property.images?.[0] || '/default-property-image.jpg');
// // // // // //     document.documentElement.lang = 'fa';
// // // // // //     document.documentElement.dir = 'rtl';
// // // // // //   }, [property, isForSale, isForRent]);
// // // // // //   return null;
// // // // // // };

// // // // // // const StructuredData = ({ property, isForSale, isForRent }) => {
// // // // // //   useEffect(() => {
// // // // // //     if (!property) return;
// // // // // //     const removeOldScript = () => { const oldScript = document.getElementById('json-ld-structured-data'); if (oldScript) oldScript.remove(); };
// // // // // //     removeOldScript();
// // // // // //     const parsePriceToNumber = (priceStr) => { if (!priceStr || priceStr === '۰') return '0'; return String(priceStr).replace(/[^0-9]/g, '') || '0'; };
// // // // // //     const structuredData = {
// // // // // //       "@context": "https://schema.org", "@type": isForSale ? "Product" : "RealEstateListing", "name": property.title,
// // // // // //       "description": stripHtml(property.description || '').substring(0, 500), "image": property.images.slice(0, 10), "url": window.location.href,
// // // // // //       "datePublished": new Date().toISOString(), "dateModified": new Date().toISOString(),
// // // // // //       ...(isForSale && { "offers": { "@type": "Offer", "price": parsePriceToNumber(property.price), "priceCurrency": "IRR", "availability": "https://schema.org/InStock", "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] } }),
// // // // // //       ...(isForRent && { "offers": { "@type": "Offer", "price": parsePriceToNumber(property.mortgagePrice || property.rentPrice || '0'), "priceCurrency": "IRR", "description": "ملک رهن و اجاره" } }),
// // // // // //       "address": { "@type": "PostalAddress", "addressLocality": property.regionName, "streetAddress": property.address, "addressCountry": "IR", "addressRegion": "تهران" },
// // // // // //       "floorSize": { "@type": "QuantitativeValue", "value": property.area || 0, "unitCode": "MTK", "unitText": "متر مربع" },
// // // // // //       "numberOfRooms": property.rooms || 0,
// // // // // //       "additionalProperty": [{ "@type": "PropertyValue", "name": "طبقه", "value": `${property.floor || 1} از ${property.totalFloors || 1}` }, { "@type": "PropertyValue", "name": "سال ساخت", "value": property.year !== "نامشخص" ? property.year : "نامشخص" }, ...property.features.slice(0, 15).map(feature => ({ "@type": "PropertyValue", "name": "امکانات", "value": feature }))],
// // // // // //       "potentialAction": { "@type": "CommunicateAction", "name": "تماس با مشاور", "target": { "@type": "EntryPoint", "urlTemplate": `tel:${property.agent?.phone || ''}`, "inLanguage": "fa-IR", "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"] } }
// // // // // //     };
// // // // // //     const script = document.createElement('script');
// // // // // //     script.id = 'json-ld-structured-data';
// // // // // //     script.type = 'application/ld+json';
// // // // // //     script.textContent = JSON.stringify(structuredData);
// // // // // //     document.head.appendChild(script);
// // // // // //     return () => removeOldScript();
// // // // // //   }, [property, isForSale, isForRent]);
// // // // // //   return null;
// // // // // // };

// // // // // // const BreadcrumbStructuredData = ({ property, isForSale }) => {
// // // // // //   useEffect(() => {
// // // // // //     if (!property) return;
// // // // // //     const removeOldScript = () => { const oldScript = document.getElementById('json-ld-breadcrumb'); if (oldScript) oldScript.remove(); };
// // // // // //     removeOldScript();
// // // // // //     const baseUrl = window.location.origin;
// // // // // //     const regionSlug = encodeURIComponent(property.regionName || 'منطقه');
// // // // // //     const breadcrumbData = {
// // // // // //       "@context": "https://schema.org", "@type": "BreadcrumbList",
// // // // // //       "itemListElement": [
// // // // // //         { "@type": "ListItem", "position": 1, "name": "صفحه اصلی", "item": `${baseUrl}/` },
// // // // // //         { "@type": "ListItem", "position": 2, "name": isForSale ? "آپارتمان‌های فروش" : "آپارتمان‌های رهن و اجاره", "item": `${baseUrl}/${isForSale ? 'RealEstatePageDetail' : 'rent'}` },
// // // // // //         { "@type": "ListItem", "position": 3, "name": `منطقه ${property.regionName}`, "item": `${baseUrl}/region/${regionSlug}` },
// // // // // //         { "@type": "ListItem", "position": 4, "name": truncateText(property.title || 'جزئیات ملک', 80), "item": window.location.href }
// // // // // //       ]
// // // // // //     };
// // // // // //     const script = document.createElement('script');
// // // // // //     script.id = 'json-ld-breadcrumb';
// // // // // //     script.type = 'application/ld+json';
// // // // // //     script.textContent = JSON.stringify(breadcrumbData);
// // // // // //     document.head.appendChild(script);
// // // // // //     return () => removeOldScript();
// // // // // //   }, [property, isForSale]);
// // // // // //   return null;
// // // // // // };

// // // // // // // ============================================================
// // // // // // // ========== Skeleton ==========
// // // // // // // ============================================================
// // // // // // const DetailSkeleton = () => (
// // // // // //   <div className="detail-skeleton">
// // // // // //     <div className="skeleton-header"><div className="skeleton-circle"></div><div className="skeleton-title"></div><div className="skeleton-circle"></div></div>
// // // // // //     <div className="skeleton-gallery"><div className="skeleton-image"></div></div>
// // // // // //     <div className="skeleton-content"><div className="skeleton-price"></div><div className="skeleton-info">{[]}</div><div className="skeleton-tabs">{[]}</div><div className="skeleton-text">{[]}</div></div>
// // // // // //   </div>
// // // // // // );

// // // // // // // ============================================================
// // // // // // // ========== کامپوننت مودال لاگین ==========
// // // // // // // ============================================================
// // // // // // const LoginModal = ({ onClose, onLogin }) => {
// // // // // //   const navigate = useNavigate();

// // // // // //   const goToLogin = () => {
// // // // // //     navigate('/login', { 
// // // // // //       state: { 
// // // // // //         from: window.location.pathname,
// // // // // //         message: 'برای مشاهده شماره تماس مشاور وارد سامانه شوید'
// // // // // //       } 
// // // // // //     });
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="login-modal-overlay" onClick={onClose}>
// // // // // //       <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
// // // // // //         <button className="modal-close-btn" onClick={onClose}>✕</button>
        
// // // // // //         <div className="modal-icon">
// // // // // //           <FaLock className="modal-lock-icon" />
// // // // // //         </div>
        
// // // // // //         <h2 className="modal-title">برای مشاهده شماره تماس</h2>
// // // // // //         <p className="modal-description">
// // // // // //           برای مشاهده شماره تماس مشاور و ارتباط مستقیم با او،
// // // // // //           <br />
// // // // // //           <strong>وارد سامانه شوید</strong>
// // // // // //         </p>
        
// // // // // //         <div className="modal-benefits">
// // // // // //           <div className="benefit-item">
// // // // // //             <span className="benefit-icon">📞</span>
// // // // // //             <span>مشاهده شماره تماس</span>
// // // // // //           </div>
// // // // // //           <div className="benefit-item">
// // // // // //             <span className="benefit-icon">💬</span>
// // // // // //             <span>ارسال پیام مستقیم</span>
// // // // // //           </div>
// // // // // //           <div className="benefit-item">
// // // // // //             <span className="benefit-icon">❤️</span>
// // // // // //             <span>ذخیره در علاقه‌مندی‌ها</span>
// // // // // //           </div>
// // // // // //           <div className="benefit-item">
// // // // // //             <span className="benefit-icon">📊</span>
// // // // // //             <span>مشاهده تاریخچه بازدید</span>
// // // // // //           </div>
// // // // // //         </div>
        
// // // // // //         <div className="modal-actions">
// // // // // //           <button className="modal-login-btn" onClick={goToLogin}>
// // // // // //             <FaUser /> ورود به سامانه
// // // // // //           </button>
// // // // // //           <button className="modal-guest-btn" onClick={onClose}>
// // // // // //             بازگشت
// // // // // //           </button>
// // // // // //         </div>
        
// // // // // //         <p className="modal-footer-text">
// // // // // //           عضویت در سامانه رایگان است و کمتر از ۱ دقیقه زمان می‌برد
// // // // // //         </p>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // // ============================================================
// // // // // // // ========== کامپوننت اصلی ==========
// // // // // // // ============================================================
// // // // // // const RealEstateDetailPageItem = memo(() => {
// // // // // //   const location = useLocation();
// // // // // //   const navigate = useNavigate();
// // // // // //   const { id: paramId } = useParams();
// // // // // //   const queryParams = new URLSearchParams(location.search);
// // // // // //   const id = paramId || queryParams.get('id');
  
// // // // // //   const [property, setProperty] = useState(null);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState(null);
// // // // // //   const [copied, setCopied] = useState(false);
// // // // // //   const [selectedImage, setSelectedImage] = useState(0);
// // // // // //   const [activeTab, setActiveTab] = useState('details');
// // // // // //   const [isFavorite, setIsFavorite] = useState(false);
// // // // // //   const [imagesLoaded, setImagesLoaded] = useState({});
// // // // // //   const [showStoryPopup, setShowStoryPopup] = useState(false);
// // // // // //   const [storyUserId, setStoryUserId] = useState(null);
  
// // // // // //   // ===== STATE برای لاگین و مودال =====
// // // // // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // // // // //   const [showLoginModal, setShowLoginModal] = useState(false);

// // // // // //   // ===== بررسی لاگین =====
// // // // // //   useEffect(() => {
// // // // // //     const token = localStorage.getItem('auth_token');
// // // // // //     // const user = localStorage.getItem('user');
     
// // // // // //     if (token ) {
// // // // // //       setIsLoggedIn(true);
// // // // // //     } else {
// // // // // //       setIsLoggedIn(false);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   // ============================================================
// // // // // //   // ===== دریافت اطلاعات ملک =====
// // // // // //   // ============================================================
// // // // // //   useEffect(() => {
// // // // // //     const fetchPropertyData = async () => {
// // // // // //       if (!id) { setError('شناسه ملک یافت نشد'); setLoading(false); return; }
// // // // // //       setLoading(true); setError(null);
// // // // // //       try {
// // // // // //         const controller = new AbortController();
// // // // // //         const timeoutId = setTimeout(() => controller.abort(), 10000);
// // // // // //         const response = await fetch(`https://localhost:7178/api/RealEstatePage/GetRealEstateDetails?id=${id}`, { signal: controller.signal });
// // // // // //         clearTimeout(timeoutId);
// // // // // //         if (!response.ok) throw new Error(`HTTP ${response.status}`);
// // // // // //         const result = await response.json();
        
// // // // // //         console.log('📦 Full API response:', result);
        
// // // // // //         if (result.status === 200 && result.data) {
// // // // // //           const data = result.data;
          
// // // // // //           const agentImage = data.agents?.image 
// // // // // //             ? `https://localhost:7178/${data.agents.image}` 
// // // // // //             : "https://randomuser.me/api/portraits/men/32.jpg";
          
// // // // // //           const userId = data.agents?.userId || null;
// // // // // //           const hasStory = data.agents?.hasStory || false;
          
// // // // // //           console.log('👤 Agent UserId:', userId);
// // // // // //           console.log('📱 HasStory:', hasStory);
          
// // // // // //           setStoryUserId(hasStory ? userId : null);
          
// // // // // //           setProperty({
// // // // // //             id: data.id, 
// // // // // //             title: data.title || `ملک در ${data.regionName || 'منطقه'} `, 
// // // // // //             price: data.price?.toLocaleString("fa-IR") || "۰",
// // // // // //             priceMeter: data.priceMeter?.toLocaleString("fa-IR") || "۰", 
// // // // // //             rentPrice: data.rent?.toLocaleString("fa-IR") || null,
// // // // // //             depositPrice: data.deposit?.toLocaleString("fa-IR") || null, 
// // // // // //             mortgagePrice: data.mortgagePrice?.toLocaleString("fa-IR") || null,
// // // // // //             type: data.categoryType, 
// // // // // //             area: parseInt(data.additionalInformation?.match(/\d+/)?.[0]) || 0, 
// // // // // //             rooms: data.rooms || 0,
// // // // // //             floor: data.floor || 1, 
// // // // // //             regionName: data.regionName || "منطقه نامشخص", 
// // // // // //             totalFloors: data.countFloor || 1,
// // // // // //             year: data.constructionYear || "نامشخص", 
// // // // // //             address: data.address || "آدرس درج نشده", 
// // // // // //             showExactLocation: data.showExactLocation,
// // // // // //             location: { lat: data.lat || 35.7199363, lng: data.lng || 51.4334842 },
// // // // // //             description: data.descriptionRows || "توضیحاتی برای این ملک ثبت نشده است.", 
// // // // // //             features: data.facilities || [],
// // // // // //             warnings: data.warnings || ["استعلام خلافی", "بررسی سند مالکیت", "استعلام پایان کار", "بررسی مفاصا حساب"],
// // // // // //             images: (data.images || []).map(img => `https://localhost:7178/${img}`),
// // // // // //             agent: { 
// // // // // //               name: data.agents?.name || "مشاور املاک", 
// // // // // //               phone: data.agents?.phone || "۰۲۱۹۱۰۰۰۰۰۰", 
// // // // // //               whatsapp: data.agents?.connectSocialMedia || "", 
// // // // // //               address: data.agents?.address || "آدرس دفتر درج نشده", 
// // // // // //               rating: data.agents?.rating || 4.5, 
// // // // // //               deals: data.agents?.deals || 120, 
// // // // // //               image: agentImage,
// // // // // //               hasStory: hasStory,
// // // // // //               userId: userId
// // // // // //             },
// // // // // //             views: data.views || 0, 
// // // // // //             saved: data.saved || 0, 
// // // // // //             createdAt: data.createdAtPersianRelative || "امروز", 
// // // // // //             certificate: data.isHasLoan ? "قابل وام" : "سند رسمی", 
// // // // // //             mortgage: data.isHasLoan ? "امکان وام" : "بدون وام",
// // // // // //             nearby: [{ name: "مترو", distance: "۵۰۰ متر" }, { name: "مرکز خرید", distance: "۳۰۰ متر" }, { name: "پارک", distance: "۲۰۰ متر" }, { name: "مدرسه", distance: "۴۰۰ متر" }]
// // // // // //           });
// // // // // //         } else throw new Error(result.message || 'ملک یافت نشد');
// // // // // //       } catch (error) { 
// // // // // //         console.error('خطا:', error); 
// // // // // //         setError(error.name === 'AbortError' ? 'مدت زمان درخواست به پایان رسید' : 'مشکل در ارتباط با سرور'); 
// // // // // //       } finally { 
// // // // // //         setLoading(false); 
// // // // // //       }
// // // // // //     };
// // // // // //     fetchPropertyData();
// // // // // //     window.scrollTo({ top: 0, behavior: 'smooth' });
// // // // // //   }, [id]);

// // // // // //   // ============================================================
// // // // // //   // ===== توابع تماس با قفل لاگین =====
// // // // // //   // ============================================================
// // // // // //   const handlePhoneClick = useCallback(() => {
// // // // // //     if (!isLoggedIn) {
// // // // // //       setShowLoginModal(true);
// // // // // //       return;
// // // // // //     }
// // // // // //     if (!property?.agent?.phone) {
// // // // // //       alert('شماره تماس در دسترس نیست');
// // // // // //       return;
// // // // // //     }
// // // // // //     navigator.clipboard.writeText(property.agent.phone);
// // // // // //     setCopied(true);
// // // // // //     setTimeout(() => setCopied(false), 2000);
// // // // // //   }, [isLoggedIn, property]);

// // // // // //   const handleWhatsAppClick = useCallback(() => {
// // // // // //     if (!isLoggedIn) {
// // // // // //       setShowLoginModal(true);
// // // // // //       return;
// // // // // //     }
// // // // // //     if (!property?.agent?.whatsapp) {
// // // // // //       alert('شماره واتساپ در دسترس نیست');
// // // // // //       return;
// // // // // //     }
// // // // // //     window.open(`https://wa.me/${property.agent.whatsapp.replace(/\s/g, '')}`, '_blank');
// // // // // //   }, [isLoggedIn, property]);

// // // // // //   // ============================================================
// // // // // //   // ===== سایر توابع =====
// // // // // //   // ============================================================
// // // // // //   const isForSale = useMemo(() => property?.type === 1, [property]);
// // // // // //   const isForRent = useMemo(() => property?.type === 2, [property]);
// // // // // //   const formattedPricePerMeter = useMemo(() => { if (!property?.priceMeter || property.priceMeter === "۰") return null; return `${property.priceMeter} تومان`; }, [property]);
// // // // // //   const shareUrl = useMemo(() => window.location.href, []);

// // // // // //   const handleCopyLink = useCallback(() => { navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }, [shareUrl]);
// // // // // //   const handleShare = useCallback(async () => { if (!property) return; const shareData = { title: property.title, text: `${property.title} - ${property.area} متری - ${isForSale ? `قیمت ${property.price}` : `رهن ${property.mortgagePrice}`} تومان`, url: shareUrl }; if (navigator.share && /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)) { try { await navigator.share(shareData); } catch (error) { if (error.name !== 'AbortError') handleCopyLink(); } } else handleCopyLink(); }, [property, isForSale, shareUrl, handleCopyLink]);
// // // // // //   const handleImageLoad = useCallback((index) => { setImagesLoaded(prev => ({ ...prev, [index]: true })); }, []);
// // // // // //   const handleFavoriteToggle = useCallback(() => { setIsFavorite(prev => !prev); }, []);
  
// // // // // //   const goToProfile = useCallback(() => {
// // // // // //     if (property?.agent?.userId) {
// // // // // //       console.log('👤 رفتن به پروفایل کاربر:', property.agent.userId);
// // // // // //       navigate(`/profile/${property.agent.userId}`);
// // // // // //     }
// // // // // //   }, [property, navigate]);

// // // // // //   const handleStoryClick = useCallback((e) => {
// // // // // //     if (e) {
// // // // // //       e.stopPropagation();
// // // // // //     }
    
// // // // // //     console.log('🖱️ کلیک روی استوری');
// // // // // //     console.log('🆔 storyUserId:', storyUserId);
// // // // // //     console.log('📱 hasStory:', property?.agent?.hasStory);
    
// // // // // //     if (storyUserId) {
// // // // // //       console.log('✅ باز کردن استوری برای userId:', storyUserId);
// // // // // //       setShowStoryPopup(true);
// // // // // //       document.body.style.overflow = 'hidden';
// // // // // //     } else {
// // // // // //       console.log('❌ این کاربر استوری ندارد');
// // // // // //     }
// // // // // //   }, [storyUserId, property]);

// // // // // //   const handleStoryClose = useCallback(() => {
// // // // // //     setShowStoryPopup(false);
// // // // // //     document.body.style.overflow = '';
// // // // // //   }, []);

// // // // // //   const handleLoginModalClose = useCallback(() => {
// // // // // //     setShowLoginModal(false);
// // // // // //   }, []);

// // // // // //   // ============================================================
// // // // // //   // ===== رندر =====
// // // // // //   // ============================================================
// // // // // //   if (error) return ( 
// // // // // //     <> 
// // // // // //       <PageMetadata property={null} /> 
// // // // // //       <div className="detail-container realestate-detail">
// // // // // //         <div className="detail-header">
// // // // // //           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
// // // // // //           <h1 className="header-title">خطا</h1>
// // // // // //           <div className="header-btn"></div>
// // // // // //         </div>
// // // // // //         <div className="error-message">
// // // // // //           <h2>متاسفانه خطایی رخ داده است</h2>
// // // // // //           <p>{error}</p>
// // // // // //           <button onClick={() => window.location.reload()}>تلاش مجدد</button>
// // // // // //           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </> 
// // // // // //   );
  
// // // // // //   if (loading) return <DetailSkeleton />;
  
// // // // // //   if (!property) return ( 
// // // // // //     <> 
// // // // // //       <PageMetadata property={null} /> 
// // // // // //       <div className="detail-container realestate-detail">
// // // // // //         <div className="detail-header">
// // // // // //           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
// // // // // //           <h1 className="header-title">ملک یافت نشد</h1>
// // // // // //           <div className="header-btn"></div>
// // // // // //         </div>
// // // // // //         <div className="error-message">
// // // // // //           <p>متاسفانه ملک مورد نظر یافت نشد</p>
// // // // // //           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </> 
// // // // // //   );

// // // // // //   return ( 
// // // // // //     <>
// // // // // //       <PageMetadata property={property} isForSale={isForSale} isForRent={isForRent} />
// // // // // //       <StructuredData property={property} isForSale={isForSale} isForRent={isForRent} />
// // // // // //       <BreadcrumbStructuredData property={property} isForSale={isForSale} />
      
// // // // // //       {/* ===== پاپ‌آپ استوری ===== */}
// // // // // //       {showStoryPopup && (
// // // // // //         <StoryPopup 
// // // // // //           agentName={property.agent.name}
// // // // // //           agentImage={property.agent.image}
// // // // // //           userId={storyUserId}
// // // // // //           onClose={handleStoryClose}
// // // // // //         />
// // // // // //       )}

// // // // // //       {/* ===== مودال لاگین ===== */}
// // // // // //       {showLoginModal && (
// // // // // //         <LoginModal 
// // // // // //           onClose={handleLoginModalClose}
// // // // // //         />
// // // // // //       )}
      
// // // // // //       <div className="detail-container realestate-detail">
// // // // // //         <nav className="breadcrumb-nav">
// // // // // //           <ol className="breadcrumb-list">
// // // // // //             <li className="breadcrumb-item"><a href="/">خانه</a></li>
// // // // // //             <li className="breadcrumb-item"><a href={isForSale ? '/sale' : '/rent'}>{isForSale ? 'فروش آپارتمان' : 'رهن و اجاره آپارتمان'}</a></li>
// // // // // //             <li className="breadcrumb-item"><a href={`/region/${encodeURIComponent(property.regionName)}`}>منطقه {property.regionName}</a></li>
// // // // // //             <li className="breadcrumb-item active">{truncateText(property.title, 50)}</li>
// // // // // //           </ol>
// // // // // //         </nav>
        
// // // // // //         <div className="detail-header">
// // // // // //           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
// // // // // //           <h1 className="header-title">{property.title}</h1>
// // // // // //           <button className="header-btn" onClick={handleShare}><FaShare /></button>
// // // // // //         </div>
        
// // // // // //         <div className="detail-gallery">
// // // // // //           <Swiper 
// // // // // //             modules={[Navigation, Pagination, Autoplay]} 
// // // // // //             navigation 
// // // // // //             pagination={{ clickable: true }} 
// // // // // //             autoplay={{ delay: 4000, disableOnInteraction: false }} 
// // // // // //             spaceBetween={0} 
// // // // // //             slidesPerView={1} 
// // // // // //             onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)} 
// // // // // //             className="gallery-swiper"
// // // // // //           >
// // // // // //             {property.images.length > 0 ? 
// // // // // //               property.images.map((img, index) => (
// // // // // //                 <SwiperSlide key={index}>
// // // // // //                   <div className="gallery-slide">
// // // // // //                     {!imagesLoaded[index] && <div className="image-placeholder"><FaHome /></div>}
// // // // // //                     <img 
// // // // // //                       src={img} 
// // // // // //                       alt={`${property.title} - ${index === 0 ? 'نمای اصلی' : `تصویر ${index + 1}`}`} 
// // // // // //                       loading={index === 0 ? 'eager' : 'lazy'} 
// // // // // //                       onLoad={() => handleImageLoad(index)} 
// // // // // //                       style={{ display: imagesLoaded[index] ? 'block' : 'none' }} 
// // // // // //                     />
// // // // // //                   </div>
// // // // // //                 </SwiperSlide>
// // // // // //               )) : 
// // // // // //               (<SwiperSlide>
// // // // // //                 <div className="gallery-slide no-image">
// // // // // //                   <FaHome />
// // // // // //                   <span>تصویری موجود نیست</span>
// // // // // //                 </div>
// // // // // //               </SwiperSlide>)
// // // // // //             }
// // // // // //           </Swiper>
// // // // // //           <button className={`favorite-btn ${isFavorite ? 'active' : ''}`} onClick={handleFavoriteToggle}>
// // // // // //             {isFavorite ? <FaHeart /> : <FaRegHeart />}
// // // // // //           </button>
// // // // // //           <div className="image-counter">{selectedImage + 1} / {property.images.length || 1}</div>
// // // // // //         </div>
        
// // // // // //         <div className="detail-main">
// // // // // //           <div className="detail-title-section">
// // // // // //             <div className="title-row">
// // // // // //               <div className="property-stats">
// // // // // //                 <span className="stat-badge"><FaEye /> {property.views.toLocaleString('fa-IR')} بازدید</span>
// // // // // //                 <span className="stat-badge"><FaBookmark /> {property.saved.toLocaleString('fa-IR')} ذخیره</span>
// // // // // //                 <span className="stat-badge"><FaClock /> {property.createdAt}</span>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
          
// // // // // //           <div className="price-section">
// // // // // //             {isForSale && (
// // // // // //               <div className="price-card sale-price">
// // // // // //                 <div className="price-card-icon"><FaTag /></div>
// // // // // //                 <div className="price-card-content">
// // // // // //                   <span className="price-label">قیمت فروش</span>
// // // // // //                   <div className="price-value-wrapper">
// // // // // //                     <span className="price-number">{property.price}</span>
// // // // // //                     <span className="price-unit">تومان</span>
// // // // // //                   </div>
// // // // // //                   {formattedPricePerMeter && 
// // // // // //                     <div className="price-meta">
// // // // // //                       <FaRuler />
// // // // // //                       <span>متری {formattedPricePerMeter}</span>
// // // // // //                     </div>
// // // // // //                   }
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             )}
            
// // // // // //             {isForRent && (
// // // // // //               <div className="rent-price-group">
// // // // // //                 {property.mortgagePrice && property.mortgagePrice !== "۰" && (
// // // // // //                   <div className="price-card mortgage-price">
// // // // // //                     <div className="price-card-icon"><FaBuilding /></div>
// // // // // //                     <div className="price-card-content">
// // // // // //                       <span className="price-label">مبلغ رهن</span>
// // // // // //                       <div className="price-value-wrapper">
// // // // // //                         <span className="price-number">{property.mortgagePrice}</span>
// // // // // //                         <span className="price-unit">تومان</span>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 )}
// // // // // //                 {property.rentPrice && property.rentPrice !== "۰" && (
// // // // // //                   <div className="price-card rent-price">
// // // // // //                     <div className="price-card-icon"><FaHome /></div>
// // // // // //                     <div className="price-card-content">
// // // // // //                       <span className="price-label">اجاره ماهانه</span>
// // // // // //                       <div className="price-value-wrapper">
// // // // // //                         <span className="price-number">{property.rentPrice}</span>
// // // // // //                         <span className="price-unit">تومان</span>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>
          
// // // // // //           <div className="quick-specs">
// // // // // //             <div className="spec-item">
// // // // // //               <FaRulerCombined />
// // // // // //               <span className="spec-label">متراژ</span>
// // // // // //               <span className="spec-value">{property.area} متر²</span>
// // // // // //             </div>
// // // // // //             <div className="spec-item">
// // // // // //               <FaBath />
// // // // // //               <span className="spec-label">اتاق‌خواب</span>
// // // // // //               <span className="spec-value">{property.rooms} خواب</span>
// // // // // //             </div>
// // // // // //             <div className="spec-item">
// // // // // //               <FaLayerGroup />
// // // // // //               <span className="spec-label">طبقه</span>
// // // // // //               <span className="spec-value">{property.floor} از {property.totalFloors}</span>
// // // // // //             </div>
// // // // // //             <div className="spec-item">
// // // // // //               <FaCalendarAlt />
// // // // // //               <span className="spec-label">سال ساخت</span>
// // // // // //               <span className="spec-value">{property.year}</span>
// // // // // //             </div>
// // // // // //           </div>
          
// // // // // //           <div className="info-chips">
// // // // // //             <span className="info-chip">کد ملک: {property.id}</span>
// // // // // //             <span className="info-chip"><FaShieldAlt /> {property.certificate}</span>
// // // // // //             <span className="info-chip type-chip">{isForSale ? 'فروش' : 'رهن و اجاره'}</span>
// // // // // //           </div>
          
// // // // // //           <div className="detail-tabs">
// // // // // //             <button className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`} onClick={() => setActiveTab('details')}>جزئیات ملک</button>
// // // // // //             <button className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`} onClick={() => setActiveTab('features')}>امکانات ({property.features.length})</button>
// // // // // //             <button className={`tab-btn ${activeTab === 'warnings' ? 'active' : ''}`} onClick={() => setActiveTab('warnings')}>هشدارهای معامله</button>
// // // // // //             <button className={`tab-btn ${activeTab === 'nearby' ? 'active' : ''}`} onClick={() => setActiveTab('nearby')}>امکانات اطراف</button>
// // // // // //           </div>
          
// // // // // //           <div className="tab-content">
// // // // // //             {activeTab === 'details' && (
// // // // // //               <div className="details-tab">
// // // // // //                 <div className="address-card">
// // // // // //                   <FaMapMarkerAlt />
// // // // // //                   <div className="address-info">
// // // // // //                     <h3>آدرس ملک</h3>
// // // // // //                     <div>منطقه {property.regionName}</div>
// // // // // //                     <p>{property.address}</p>
// // // // // //                     <span className="post-date">تاریخ درج: {property.createdAt}</span>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //                 <div className="description-card">
// // // // // //                   <h3>توضیحات کامل {property.title}</h3>
// // // // // //                   <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(property.description, { ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'a', 'blockquote'], ALLOWED_ATTR: ['href', 'target'] }) }} />
// // // // // //                 </div>
// // // // // //                 <div className="map-card">
// // // // // //                   <h3><FaMapMarkerAlt /> موقعیت مکانی ملک در منطقه {property.regionName}</h3>
// // // // // //                   <div className="map-location-badge">
// // // // // //                     {property.showExactLocation ? 
// // // // // //                       <span className="badge exact">📍 نمایش موقعیت دقیق ملک</span> : 
// // // // // //                       <span className="badge approximate">🔵 نمایش محدوده تقریبی</span>
// // // // // //                     }
// // // // // //                   </div>
// // // // // //                   <div className="map-container">
// // // // // //                     <NeshanMap 
// // // // // //                       mapKey="web.31c5ea6c425e40cc9b30620a84a8be90" 
// // // // // //                       center={{ latitude: property.location.lat, longitude: property.location.lng }} 
// // // // // //                       zoom={property.showExactLocation ? 17 : 15.9} 
// // // // // //                       defaultType="dreamy" 
// // // // // //                       poi={true} 
// // // // // //                       traffic={false} 
// // // // // //                       style={{ height: '100%', width: '100%', pointerEvents: 'none' }} 
// // // // // //                     />
// // // // // //                     <div className="map-marker-overlay">
// // // // // //                       {property.showExactLocation ? 
// // // // // //                         <><div className="location-dot"></div><div className="location-ripple"></div></> : 
// // // // // //                         <div className="location-circles"><div className="circle-3"></div></div>
// // // // // //                       }
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                   <div className="map-privacy-note">
// // // // // //                     <small>{property.showExactLocation ? '📍 موقعیت دقیق ملک' : '📍 محدوده تقریبی ملک'}</small>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             )}
            
// // // // // //             {activeTab === 'features' && (
// // // // // //               <div className="features-tab">
// // // // // //                 <h3>امکانات و ویژگی‌ها</h3>
// // // // // //                 <div className="features-grid">
// // // // // //                   {property.features.length > 0 ? 
// // // // // //                     property.features.map((feature, idx) => {
// // // // // //                       let Icon = FaCheckCircle;
// // // // // //                       if (feature.includes('پارکینگ')) Icon = FaParking;
// // // // // //                       else if (feature.includes('انباری')) Icon = FaWarehouse;
// // // // // //                       else if (feature.includes('آسانسور')) Icon = FaArrowUp;
// // // // // //                       else if (feature.includes('استخر')) Icon = FaSwimmingPool;
// // // // // //                       return (
// // // // // //                         <div key={idx} className="feature-card">
// // // // // //                           <Icon />
// // // // // //                           <span>{feature}</span>
// // // // // //                         </div>
// // // // // //                       );
// // // // // //                     }) : 
// // // // // //                     <p className="no-data">امکاناتی ثبت نشده است</p>
// // // // // //                   }
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             )}
            
// // // // // //             {activeTab === 'warnings' && (
// // // // // //               <div className="warnings-tab">
// // // // // //                 <h3>⚠️ هشدارهای مهم</h3>
// // // // // //                 <ul className="warnings-list">
// // // // // //                   {property.warnings.map((w, idx) => (
// // // // // //                     <li key={idx} className="warning-item">
// // // // // //                       <span className="warning-bullet"></span>
// // // // // //                       <span>{w}</span>
// // // // // //                     </li>
// // // // // //                   ))}
// // // // // //                 </ul>
// // // // // //                 <div className="warning-footer">
// // // // // //                   <p>⚠️ قبل از معامله مدارک را بررسی کنید</p>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             )}
            
// // // // // //             {activeTab === 'nearby' && (
// // // // // //               <div className="nearby-tab">
// // // // // //                 <h3>امکانات اطراف</h3>
// // // // // //                 <div className="nearby-list">
// // // // // //                   {property.nearby.map((item, idx) => (
// // // // // //                     <div key={idx} className="nearby-item">
// // // // // //                       <span className="nearby-name">{item.name}</span>
// // // // // //                       <span className="nearby-distance">{item.distance}</span>
// // // // // //                     </div>
// // // // // //                   ))}
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>
          
// // // // // //           {/* ============================================================ */}
// // // // // //           {/* ========== کارت مشاور با دکمه‌های قفل شده ========== */}
// // // // // //           {/* ============================================================ */}
// // // // // //           <div className="agent-card">
// // // // // //             <div className="agent-header">
// // // // // //               {/* آواتار */}
// // // // // //               <div 
// // // // // //                 className={`agent-avatar-wrapper ${property.agent.hasStory ? 'has-story' : ''}`}
// // // // // //                 style={{ 
// // // // // //                   position: 'relative',
// // // // // //                   display: 'inline-block',
// // // // // //                   flexShrink: 0,
// // // // // //                   cursor: property.agent.userId ? 'pointer' : 'default'
// // // // // //                 }}
// // // // // //                 onClick={property.agent.userId ? goToProfile : undefined}
// // // // // //               >
// // // // // //                 <SafeImage 
// // // // // //                   src={property.agent.image} 
// // // // // //                   alt={property.agent.name} 
// // // // // //                   className={`agent-avatar ${property.agent.hasStory ? 'has-story' : ''}`}
// // // // // //                   fallbackSrc="https://randomuser.me/api/portraits/men/32.jpg"
// // // // // //                 />
                
// // // // // //                 {property.agent.hasStory && (
// // // // // //                   <div 
// // // // // //                     className="story-ring-indicator"
// // // // // //                     onClick={(e) => {
// // // // // //                       e.stopPropagation();
// // // // // //                       handleStoryClick(e);
// // // // // //                     }}
// // // // // //                   >
// // // // // //                     <div className="story-ring-gradient"></div>
// // // // // //                   </div>
// // // // // //                 )}
// // // // // //               </div>
              
// // // // // //               <div className="agent-info">
// // // // // //                 <div className="agent-name-wrapper">
// // // // // //                   <h3 
// // // // // //                     style={{ cursor: property.agent.userId ? 'pointer' : 'default' }}
// // // // // //                     onClick={property.agent.userId ? goToProfile : undefined}
// // // // // //                   >
// // // // // //                     {property.agent.name}
// // // // // //                   </h3>
                  
// // // // // //                   {property.agent.hasStory && (
// // // // // //                     <span 
// // // // // //                       className="story-label" 
// // // // // //                       onClick={(e) => {
// // // // // //                         e.stopPropagation();
// // // // // //                         handleStoryClick(e);
// // // // // //                       }}
// // // // // //                       style={{ cursor: 'pointer' }}
// // // // // //                     >
// // // // // //                       <span className="story-dot"></span>
// // // // // //                       استوری
// // // // // //                     </span>
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //                 <p>{property.agent.address}</p>
// // // // // //                 <div className="agent-rating">
// // // // // //                   <FaStar />
// // // // // //                   <span>{property.agent.rating}</span>
// // // // // //                   <span>({property.agent.deals} معامله)</span>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </div>
            
// // // // // //             {/* ============================================================ */}
// // // // // //             {/* ===== دکمه‌های تماس با شرط لاگین ===== */}
// // // // // //             {/* ============================================================ */}
// // // // // //             <div className="agent-actions-wrapper">
              
// // // // // //               {/* دکمه تماس تلفنی */}
// // // // // //               <button 
// // // // // //                 className={`agent-action-btn phone ${!isLoggedIn ? 'locked' : ''}`}
// // // // // //                 onClick={handlePhoneClick}
// // // // // //               >
// // // // // //                 <FaPhone /> 
// // // // // //                 <span className="btn-label">
// // // // // //                   {isLoggedIn ? property.agent.phone : 'شماره تماس'}
// // // // // //                 </span>
                
// // // // // //                 {!isLoggedIn && (
// // // // // //                   <>
// // // // // //                     <span className="lock-badge">
// // // // // //                       <FaLock className="lock-icon-small" />
// // // // // //                     </span>
// // // // // //                     <div className="lock-overlay">
// // // // // //                       <FaLock className="lock-icon" />
// // // // // //                       <span className="lock-text">برای مشاهده شماره</span>
// // // // // //                       <span className="lock-subtext">وارد سامانه شوید</span>
// // // // // //                     </div>
// // // // // //                   </>
// // // // // //                 )}
// // // // // //               </button>

// // // // // //               {/* دکمه واتساپ */}
// // // // // //               <button 
// // // // // //                 className={`agent-action-btn whatsapp ${!isLoggedIn ? 'locked' : ''}`}
// // // // // //                 onClick={handleWhatsAppClick}
// // // // // //               >
// // // // // //                 <FaWhatsapp /> 
// // // // // //                 <span className="btn-label">واتساپ</span>
                
// // // // // //                 {!isLoggedIn && (
// // // // // //                   <>
// // // // // //                     <span className="lock-badge">
// // // // // //                       <FaLock className="lock-icon-small" />
// // // // // //                     </span>
// // // // // //                     <div className="lock-overlay">
// // // // // //                       <FaLock className="lock-icon" />
// // // // // //                       <span className="lock-text">برای مشاهده شماره</span>
// // // // // //                       <span className="lock-subtext">وارد سامانه شوید</span>
// // // // // //                     </div>
// // // // // //                   </>
// // // // // //                 )}
// // // // // //               </button>
// // // // // //             </div>

// // // // // //             {/* دکمه ورود - فقط برای کاربران غیرلاگین */}
// // // // // //             {!isLoggedIn && (
// // // // // //               <button 
// // // // // //                 className="login-prompt-btn" 
// // // // // //                 onClick={() => setShowLoginModal(true)}
// // // // // //                 style={{ marginTop: '10px' }}
// // // // // //               >
// // // // // //                 <FaUser className="login-icon" />
// // // // // //                 ورود / ثبت‌نام
// // // // // //                 <FaArrowRight className="arrow-icon" />
// // // // // //               </button>
// // // // // //             )}
// // // // // //             {/* ============================================================ */}
            
// // // // // //           </div>
// // // // // //         </div>
        
// // // // // //         <DoubleSidebarBanners />
// // // // // //         <RelatedPropertiesSlider 
// // // // // //           currentPropertyId={property.id} 
// // // // // //           regionName={property.regionName} 
// // // // // //           propertyType={property.type} 
// // // // // //         />
        
// // // // // //         {copied && (
// // // // // //           <div className="toast-notification">
// // // // // //             <FaCheckCircle /> لینک کپی شد
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </> 
// // // // // //   );
// // // // // // });

// // // // // // RealEstateDetailPageItem.displayName = 'RealEstateDetailPageItem';
// // // // // // export default RealEstateDetailPageItem;


// // // // // import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
// // // // // import CryptoJS from 'crypto-js';
// // // // // import DOMPurify from 'dompurify';
// // // // // import { useNavigate, useLocation, useParams } from 'react-router-dom';
// // // // // import RelatedPropertiesSlider from './RelatedPropertiesSlider';
// // // // // import DoubleSidebarBanners from './SidebarBanner';
// // // // // import { 
// // // // //   FaMapMarkerAlt, FaPhone, FaWhatsapp, FaShare, FaArrowRight, FaHeart, FaRegHeart,
// // // // //   FaStar, FaParking, FaWarehouse, FaSwimmingPool, FaBath, FaRulerCombined,
// // // // //   FaCalendarAlt, FaLayerGroup, FaArrowUp, FaCheckCircle, FaTag, FaHome,
// // // // //   FaBuilding, FaRuler, FaShieldAlt, FaClock, FaEye, FaBookmark, FaLink,
// // // // //   FaLock, FaUser, FaSpinner
// // // // // } from 'react-icons/fa';
// // // // // import { Swiper, SwiperSlide } from 'swiper/react';
// // // // // import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// // // // // import NeshanMap from "@neshan-maps-platform/react-openlayers";
// // // // // import "@neshan-maps-platform/react-openlayers/dist/style.css";
// // // // // import 'swiper/css';
// // // // // import 'swiper/css/navigation';
// // // // // import 'swiper/css/pagination';
// // // // // import './RealEstateDetailPageItem.css';

// // // // // // ============================================================
// // // // // // ========== کامپوننت پاپ‌آپ استوری ==========
// // // // // // ============================================================
// // // // // const StoryPopup = ({ agentName, agentImage, userId, onClose }) => {
// // // // //   const [stories, setStories] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
// // // // //   const [progress, setProgress] = useState(0);
// // // // //   const [isPaused, setIsPaused] = useState(false);
// // // // //   const [error, setError] = useState(null);

// // // // //   useEffect(() => {
// // // // //     const fetchStories = async () => {
// // // // //       if (!userId) {
// // // // //         setError('شناسه کاربر یافت نشد');
// // // // //         setLoading(false);
// // // // //         return;
// // // // //       }

// // // // //       try {
// // // // //         setLoading(true);
// // // // //         console.log('📡 در حال دریافت استوری برای userId:', userId);
        
// // // // //         const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${userId}`);
        
// // // // //         console.log('📡 Response status:', response.status);
        
// // // // //         if (!response.ok) {
// // // // //           throw new Error(`HTTP ${response.status}`);
// // // // //         }
        
// // // // //         const result = await response.json();
// // // // //         console.log('📦 نتیجه استوری:', result);
        
// // // // //         if (result.status === 200 && result.data && result.data.length > 0) {
// // // // //           const userStories = result.data[0]?.storyUser || [];
// // // // //           console.log('📸 تعداد استوری‌ها:', userStories.length);
          
// // // // //           const formattedStories = userStories.map(story => ({
// // // // //             ...story,
// // // // //             url: `https://localhost:7178${story.url}`
// // // // //           }));
// // // // //           setStories(formattedStories);
// // // // //         } else {
// // // // //           console.log('⚠️ هیچ استوری پیدا نشد');
// // // // //           setStories([]);
// // // // //         }
// // // // //       } catch (error) {
// // // // //         console.error('❌ خطا در دریافت استوری:', error);
// // // // //         setError('مشکل در دریافت استوری‌ها');
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchStories();
// // // // //   }, [userId]);

// // // // //   useEffect(() => {
// // // // //     if (isPaused || loading || stories.length === 0) return;

// // // // //     const timer = setInterval(() => {
// // // // //       setProgress(prev => {
// // // // //         const newProgress = prev + 1;
// // // // //         if (newProgress >= 100) {
// // // // //           if (currentStoryIndex < stories.length - 1) {
// // // // //             setCurrentStoryIndex(prev => prev + 1);
// // // // //             return 0;
// // // // //           } else {
// // // // //             onClose();
// // // // //             return 0;
// // // // //           }
// // // // //         }
// // // // //         return newProgress;
// // // // //       });
// // // // //     }, 50);

// // // // //     return () => clearInterval(timer);
// // // // //   }, [currentStoryIndex, isPaused, loading, stories, onClose]);

// // // // //   const handlePrevStory = useCallback((e) => {
// // // // //     e.stopPropagation();
// // // // //     if (currentStoryIndex > 0) {
// // // // //       setCurrentStoryIndex(prev => prev - 1);
// // // // //       setProgress(0);
// // // // //     }
// // // // //   }, [currentStoryIndex]);

// // // // //   const handleNextStory = useCallback((e) => {
// // // // //     e.stopPropagation();
// // // // //     if (currentStoryIndex < stories.length - 1) {
// // // // //       setCurrentStoryIndex(prev => prev + 1);
// // // // //       setProgress(0);
// // // // //     } else {
// // // // //       onClose();
// // // // //     }
// // // // //   }, [currentStoryIndex, stories.length, onClose]);

// // // // //   const handleStoryLink = useCallback((link) => {
// // // // //     if (link) {
// // // // //       window.location.href = link;
// // // // //     }
// // // // //   }, []);

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="realestate-detail story-popup-overlay" onClick={onClose}>
// // // // //         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // // // //           <div style={{ 
// // // // //             display: 'flex', 
// // // // //             alignItems: 'center', 
// // // // //             justifyContent: 'center', 
// // // // //             height: '100%',
// // // // //             color: 'white',
// // // // //             fontSize: '18px',
// // // // //             fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
// // // // //           }}>
// // // // //             در حال بارگذاری استوری‌ها...
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (error || stories.length === 0) {
// // // // //     return (
// // // // //       <div className="realestate-detail story-popup-overlay" onClick={onClose}>
// // // // //         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // // // //           <div style={{ 
// // // // //             display: 'flex', 
// // // // //             flexDirection: 'column',
// // // // //             alignItems: 'center', 
// // // // //             justifyContent: 'center', 
// // // // //             height: '100%',
// // // // //             color: 'white',
// // // // //             fontSize: '16px',
// // // // //             padding: '20px',
// // // // //             textAlign: 'center',
// // // // //             fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
// // // // //           }}>
// // // // //             <p>{error || 'هیچ استوری برای این کاربر وجود ندارد'}</p>
// // // // //             <button 
// // // // //               onClick={onClose}
// // // // //               style={{
// // // // //                 marginTop: '20px',
// // // // //                 padding: '10px 30px',
// // // // //                 background: '#ff0000',
// // // // //                 color: 'white',
// // // // //                 border: 'none',
// // // // //                 borderRadius: '8px',
// // // // //                 cursor: 'pointer',
// // // // //                 fontSize: '14px',
// // // // //                 fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
// // // // //               }}
// // // // //             >
// // // // //               بستن
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   const currentStory = stories[currentStoryIndex];

// // // // //   return (
// // // // //     <div 
// // // // //       className="realestate-detail story-popup-overlay"
// // // // //       onClick={onClose}
// // // // //       onMouseEnter={() => setIsPaused(true)}
// // // // //       onMouseLeave={() => setIsPaused(false)}
// // // // //     >
// // // // //       <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // // // //         <div className="story-progress-container">
// // // // //           {stories.map((_, index) => (
// // // // //             <div 
// // // // //               key={index} 
// // // // //               className="story-progress-bar"
// // // // //             >
// // // // //               <div 
// // // // //                 className="story-progress-fill"
// // // // //                 style={{
// // // // //                   width: index < currentStoryIndex ? '100%' : 
// // // // //                          index === currentStoryIndex ? `${progress}%` : '0%'
// // // // //                 }}
// // // // //               />
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>

// // // // //         <div className="story-header">
// // // // //           <div className="story-user-info">
// // // // //             <img 
// // // // //               src={agentImage} 
// // // // //               alt={agentName} 
// // // // //               className="story-user-avatar"
// // // // //             />
// // // // //             <span className="story-user-name">{agentName}</span>
// // // // //             <span className="story-time">لحظاتی پیش</span>
// // // // //           </div>
// // // // //           <button className="story-close-btn" onClick={onClose}>✕</button>
// // // // //         </div>

// // // // //         <div className="story-content">
// // // // //           <img 
// // // // //             src={currentStory.url} 
// // // // //             alt={currentStory.caption || 'استوری'} 
// // // // //             className="story-image"
// // // // //           />
          
// // // // //           {currentStory.caption && (
// // // // //             <div className="story-caption">
// // // // //               {currentStory.caption}
// // // // //             </div>
// // // // //           )}

// // // // //           {currentStory.link && (
// // // // //             <div 
// // // // //               className="story-link-button"
// // // // //               onClick={() => handleStoryLink(currentStory.link)}
// // // // //             >
// // // // //               <FaLink />
// // // // //               <span>{currentStory.linkText || 'مشاهده بیشتر'}</span>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>

// // // // //         <div 
// // // // //           className="story-nav-left"
// // // // //           onClick={handlePrevStory}
// // // // //         />
// // // // //         <div 
// // // // //           className="story-nav-right"
// // // // //           onClick={handleNextStory}
// // // // //         />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // // ============================================================
// // // // // // ========== کامپوننت SafeImage ==========
// // // // // // ============================================================
// // // // // const SafeImage = ({ src, alt, className, fallbackSrc, ...props }) => {
// // // // //   const [error, setError] = useState(false);

// // // // //   if (!src || error) {
// // // // //     return (
// // // // //       <img 
// // // // //         src={fallbackSrc || 'https://randomuser.me/api/portraits/men/32.jpg'} 
// // // // //         alt={alt || 'تصویر'} 
// // // // //         className={className}
// // // // //         {...props}
// // // // //       />
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <img
// // // // //       src={src}
// // // // //       alt={alt}
// // // // //       className={className}
// // // // //       onError={() => {
// // // // //         setError(true);
// // // // //       }}
// // // // //       {...props}
// // // // //     />
// // // // //   );
// // // // // };

// // // // // // ============================================================
// // // // // // ========== توابع کمکی ==========
// // // // // // ============================================================
// // // // // const stripHtml = (html) => {
// // // // //   if (!html) return '';
// // // // //   const temp = document.createElement('div');
// // // // //   temp.innerHTML = html;
// // // // //   return temp.textContent || temp.innerText || '';
// // // // // };

// // // // // const truncateText = (text, maxLength) => {
// // // // //   if (!text) return '';
// // // // //   if (text.length <= maxLength) return text;
// // // // //   return text.substring(0, maxLength - 2) + '…';
// // // // // };

// // // // // // ============================================================
// // // // // // ========== کامپوننت‌های متا ==========
// // // // // // ============================================================
// // // // // const PageMetadata = ({ property, isForSale, isForRent }) => {
// // // // //   useEffect(() => {
// // // // //     if (!property) return;
// // // // //     let title = property.title 
// // // // //       ? `${truncateText(property.title, 40)} | ${isForSale ? 'فروش' : 'رهن و اجاره'} ${property.area}م ${property.regionName}`
// // // // //       : `ملک ${property.area} متری ${property.regionName}`;
// // // // //     title = truncateText(title, 65);
// // // // //     document.title = title;
// // // // //     const plainDescription = stripHtml(property.description || '');
// // // // //     const priceText = isForSale ? `قیمت: ${property.price} تومان` : `رهن: ${property.mortgagePrice || property.depositPrice || 'تماس بگیرید'} تومان`;
// // // // //     let description = plainDescription ? truncateText(plainDescription, 120) + `... ${priceText}` : `ملک ${isForSale ? 'فروش' : 'رهن و اجاره'} در ${property.regionName}، ${property.area} متری، ${property.rooms} خوابه - ${priceText}`;
// // // // //     description = truncateText(description, 155);
// // // // //     const keywords = [property.title, `${property.regionName} ملک`, isForSale ? 'فروش آپارتمان' : 'رهن آپارتمان', `${property.area} متری`, `${property.rooms} خوابه`, `طبقه ${property.floor}`, property.year !== "نامشخص" ? `ساخت ${property.year}` : '', ...property.features.slice(0, 5)].filter(Boolean).join(',');
// // // // //     const updateOrCreateMeta = (name, content, isProperty = false) => {
// // // // //       const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
// // // // //       let meta = document.querySelector(selector);
// // // // //       if (!meta) {
// // // // //         meta = document.createElement('meta');
// // // // //         if (isProperty) meta.setAttribute('property', name);
// // // // //         else meta.setAttribute('name', name);
// // // // //         document.head.appendChild(meta);
// // // // //       }
// // // // //       meta.setAttribute('content', content);
// // // // //     };
// // // // //     updateOrCreateMeta('description', description);
// // // // //     updateOrCreateMeta('keywords', keywords);
// // // // //     updateOrCreateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1');
// // // // //     let canonical = document.querySelector('link[rel="canonical"]');
// // // // //     if (!canonical) {
// // // // //       canonical = document.createElement('link');
// // // // //       canonical.rel = 'canonical';
// // // // //       document.head.appendChild(canonical);
// // // // //     }
// // // // //     canonical.href = window.location.href;
// // // // //     updateOrCreateMeta('og:title', title, true);
// // // // //     updateOrCreateMeta('og:description', truncateText(description, 200), true);
// // // // //     updateOrCreateMeta('og:image', property.images?.[0] || '/default-property-image.jpg', true);
// // // // //     updateOrCreateMeta('og:url', window.location.href, true);
// // // // //     updateOrCreateMeta('og:type', 'product', true);
// // // // //     updateOrCreateMeta('og:locale', 'fa_IR', true);
// // // // //     updateOrCreateMeta('og:site_name', 'مشاور املاک', true);
// // // // //     updateOrCreateMeta('twitter:card', 'summary_large_image');
// // // // //     updateOrCreateMeta('twitter:title', title);
// // // // //     updateOrCreateMeta('twitter:description', truncateText(description, 200));
// // // // //     updateOrCreateMeta('twitter:image', property.images?.[0] || '/default-property-image.jpg');
// // // // //     document.documentElement.lang = 'fa';
// // // // //     document.documentElement.dir = 'rtl';
// // // // //   }, [property, isForSale, isForRent]);
// // // // //   return null;
// // // // // };

// // // // // const StructuredData = ({ property, isForSale, isForRent }) => {
// // // // //   useEffect(() => {
// // // // //     if (!property) return;
// // // // //     const removeOldScript = () => { const oldScript = document.getElementById('json-ld-structured-data'); if (oldScript) oldScript.remove(); };
// // // // //     removeOldScript();
// // // // //     const parsePriceToNumber = (priceStr) => { if (!priceStr || priceStr === '۰') return '0'; return String(priceStr).replace(/[^0-9]/g, '') || '0'; };
// // // // //     const structuredData = {
// // // // //       "@context": "https://schema.org", "@type": isForSale ? "Product" : "RealEstateListing", "name": property.title,
// // // // //       "description": stripHtml(property.description || '').substring(0, 500), "image": property.images.slice(0, 10), "url": window.location.href,
// // // // //       "datePublished": new Date().toISOString(), "dateModified": new Date().toISOString(),
// // // // //       ...(isForSale && { "offers": { "@type": "Offer", "price": parsePriceToNumber(property.price), "priceCurrency": "IRR", "availability": "https://schema.org/InStock", "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] } }),
// // // // //       ...(isForRent && { "offers": { "@type": "Offer", "price": parsePriceToNumber(property.mortgagePrice || property.rentPrice || '0'), "priceCurrency": "IRR", "description": "ملک رهن و اجاره" } }),
// // // // //       "address": { "@type": "PostalAddress", "addressLocality": property.regionName, "streetAddress": property.address, "addressCountry": "IR", "addressRegion": "تهران" },
// // // // //       "floorSize": { "@type": "QuantitativeValue", "value": property.area || 0, "unitCode": "MTK", "unitText": "متر مربع" },
// // // // //       "numberOfRooms": property.rooms || 0,
// // // // //       "additionalProperty": [{ "@type": "PropertyValue", "name": "طبقه", "value": `${property.floor || 1} از ${property.totalFloors || 1}` }, { "@type": "PropertyValue", "name": "سال ساخت", "value": property.year !== "نامشخص" ? property.year : "نامشخص" }, ...property.features.slice(0, 15).map(feature => ({ "@type": "PropertyValue", "name": "امکانات", "value": feature }))],
// // // // //       "potentialAction": { "@type": "CommunicateAction", "name": "تماس با مشاور", "target": { "@type": "EntryPoint", "urlTemplate": `tel:${property.agent?.phone || ''}`, "inLanguage": "fa-IR", "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"] } }
// // // // //     };
// // // // //     const script = document.createElement('script');
// // // // //     script.id = 'json-ld-structured-data';
// // // // //     script.type = 'application/ld+json';
// // // // //     script.textContent = JSON.stringify(structuredData);
// // // // //     document.head.appendChild(script);
// // // // //     return () => removeOldScript();
// // // // //   }, [property, isForSale, isForRent]);
// // // // //   return null;
// // // // // };

// // // // // const BreadcrumbStructuredData = ({ property, isForSale }) => {
// // // // //   useEffect(() => {
// // // // //     if (!property) return;
// // // // //     const removeOldScript = () => { const oldScript = document.getElementById('json-ld-breadcrumb'); if (oldScript) oldScript.remove(); };
// // // // //     removeOldScript();
// // // // //     const baseUrl = window.location.origin;
// // // // //     const regionSlug = encodeURIComponent(property.regionName || 'منطقه');
// // // // //     const breadcrumbData = {
// // // // //       "@context": "https://schema.org", "@type": "BreadcrumbList",
// // // // //       "itemListElement": [
// // // // //         { "@type": "ListItem", "position": 1, "name": "صفحه اصلی", "item": `${baseUrl}/` },
// // // // //         { "@type": "ListItem", "position": 2, "name": isForSale ? "آپارتمان‌های فروش" : "آپارتمان‌های رهن و اجاره", "item": `${baseUrl}/${isForSale ? 'RealEstatePageDetail' : 'rent'}` },
// // // // //         { "@type": "ListItem", "position": 3, "name": `منطقه ${property.regionName}`, "item": `${baseUrl}/region/${regionSlug}` },
// // // // //         { "@type": "ListItem", "position": 4, "name": truncateText(property.title || 'جزئیات ملک', 80), "item": window.location.href }
// // // // //       ]
// // // // //     };
// // // // //     const script = document.createElement('script');
// // // // //     script.id = 'json-ld-breadcrumb';
// // // // //     script.type = 'application/ld+json';
// // // // //     script.textContent = JSON.stringify(breadcrumbData);
// // // // //     document.head.appendChild(script);
// // // // //     return () => removeOldScript();
// // // // //   }, [property, isForSale]);
// // // // //   return null;
// // // // // };

// // // // // // ============================================================
// // // // // // ========== Skeleton ==========
// // // // // // ============================================================
// // // // // const DetailSkeleton = () => (
// // // // //   <div className="detail-skeleton">
// // // // //     <div className="skeleton-header"><div className="skeleton-circle"></div><div className="skeleton-title"></div><div className="skeleton-circle"></div></div>
// // // // //     <div className="skeleton-gallery"><div className="skeleton-image"></div></div>
// // // // //     <div className="skeleton-content"><div className="skeleton-price"></div><div className="skeleton-info">{[]}</div><div className="skeleton-tabs">{[]}</div><div className="skeleton-text">{[]}</div></div>
// // // // //   </div>
// // // // // );

// // // // // // ============================================================
// // // // // // ========== کامپوننت مودال لاگین/ثبت‌نام پیشرفته ==========
// // // // // // ============================================================
// // // // // const LoginModal = ({ onClose }) => {
// // // // //   const navigate = useNavigate();
  
// // // // //   // ===== State‌ها =====
// // // // //   const [step, setStep] = useState('phone'); // 'phone' | 'login' | 'register' | 'loading'
// // // // //   const [phoneNumber, setPhoneNumber] = useState('');
// // // // //   const [username, setUsername] = useState('');
// // // // //   const [password, setPassword] = useState('');
// // // // //   const [confirmPassword, setConfirmPassword] = useState('');
// // // // //   const [error, setError] = useState('');
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [userExists, setUserExists] = useState(null);

// // // // //   // ===== تابع بررسی شماره موبایل =====
// // // // //   const checkPhoneNumber = async () => {
// // // // //     // اعتبارسنجی شماره
// // // // //     if (!phoneNumber || phoneNumber.length < 10) {
// // // // //       setError('لطفاً شماره موبایل معتبر وارد کنید');
// // // // //       return;
// // // // //     }

// // // // //     setLoading(true);
// // // // //     setError('');
    
// // // // //     try {
// // // // //       console.log('📡 بررسی شماره:', phoneNumber);
      
// // // // //       // ===== درخواست به API برای بررسی وجود کاربر =====
// // // // //       const response = await fetch(`https://localhost:7178/api/User/CheckUserByPhone?phone=${phoneNumber}`, {
// // // // //         method: 'GET',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //       });

// // // // //       const result = await response.json();
// // // // //       console.log('📦 نتیجه بررسی:', result);

// // // // //       if (result.status === 200 && result.data === true) {
// // // // //         // ✅ کاربر وجود دارد -> برو به مرحله لاگین
// // // // //         setUserExists(true);
// // // // //         setStep('login');
// // // // //         setError('');
// // // // //       } else {
// // // // //         // ❌ کاربر وجود ندارد -> برو به مرحله ثبت‌نام
// // // // //         setUserExists(false);
// // // // //         setStep('register');
// // // // //         setError('');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('❌ خطا در بررسی شماره:', error);
// // // // //       setError('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // ===== تابع لاگین =====
// // // // //   const handleLogin = async () => {
// // // // //     if (!username || !password) {
// // // // //       setError('لطفاً نام کاربری و رمز عبور را وارد کنید');
// // // // //       return;
// // // // //     }

// // // // //     setLoading(true);
// // // // //     setError('');

// // // // //     try {
// // // // //       console.log('📡 درخواست لاگین:', { username, phone: phoneNumber });

// // // // //       const response = await fetch('https://localhost:7178/api/Auth/Login', {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //         body: JSON.stringify({
// // // // //           username: username,
// // // // //           password: password,
// // // // //           phone: phoneNumber
// // // // //         }),
// // // // //       });

// // // // //       const result = await response.json();
// // // // //       console.log('📦 نتیجه لاگین:', result);

// // // // //       if (result.status === 200 && result.data) {
// // // // //         // ✅ لاگین موفق
// // // // //         localStorage.setItem('auth_token', result.data.token);
// // // // //         localStorage.setItem('user', JSON.stringify(result.data.user));
        
// // // // //         // ارسال رویداد برای به‌روزرسانی وضعیت
// // // // //         window.dispatchEvent(new Event('authChange'));
        
// // // // //         onClose();
// // // // //         // رفرش صفحه برای اعمال تغییرات
// // // // //         window.location.reload();
// // // // //       } else {
// // // // //         setError(result.message || 'نام کاربری یا رمز عبور اشتباه است');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('❌ خطا در لاگین:', error);
// // // // //       setError('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // ===== تابع ثبت‌نام =====
// // // // //   const handleRegister = async () => {
// // // // //     // اعتبارسنجی
// // // // //     if (!username || username.length < 3) {
// // // // //       setError('نام کاربری باید حداقل ۳ کاراکتر باشد');
// // // // //       return;
// // // // //     }
// // // // //     if (!password || password.length < 6) {
// // // // //       setError('رمز عبور باید حداقل ۶ کاراکتر باشد');
// // // // //       return;
// // // // //     }
// // // // //     if (password !== confirmPassword) {
// // // // //       setError('رمز عبور و تکرار آن مطابقت ندارند');
// // // // //       return;
// // // // //     }

// // // // //     setLoading(true);
// // // // //     setError('');

// // // // //     try {
// // // // //       console.log('📡 درخواست ثبت‌نام:', { username, phone: phoneNumber });

// // // // //       const response = await fetch('https://localhost:7178/api/Auth/Register', {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //         body: JSON.stringify({
// // // // //           username: username,
// // // // //           password: password,
// // // // //           phone: phoneNumber,
// // // // //           name: username
// // // // //         }),
// // // // //       });

// // // // //       const result = await response.json();
// // // // //       console.log('📦 نتیجه ثبت‌نام:', result);

// // // // //       if (result.status === 200 || result.status === 201) {
// // // // //         // ✅ ثبت‌نام موفق
// // // // //         // لاگین خودکار
// // // // //         const loginResponse = await fetch('https://localhost:7178/api/Auth/Login', {
// // // // //           method: 'POST',
// // // // //           headers: {
// // // // //             'Content-Type': 'application/json',
// // // // //           },
// // // // //           body: JSON.stringify({
// // // // //             username: username,
// // // // //             password: password,
// // // // //             phone: phoneNumber
// // // // //           }),
// // // // //         });

// // // // //         const loginResult = await loginResponse.json();

// // // // //         if (loginResult.status === 200 && loginResult.data) {
// // // // //           localStorage.setItem('auth_token', loginResult.data.token);
// // // // //           localStorage.setItem('user', JSON.stringify(loginResult.data.user));
          
// // // // //           window.dispatchEvent(new Event('authChange'));
// // // // //           onClose();
// // // // //           window.location.reload();
// // // // //         } else {
// // // // //           // ثبت‌نام موفق اما لاگین خودکار نشد
// // // // //           setError('ثبت‌نام موفق بود. لطفاً وارد شوید.');
// // // // //           setStep('login');
// // // // //         }
// // // // //       } else {
// // // // //         setError(result.message || 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('❌ خطا در ثبت‌نام:', error);
// // // // //       setError('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // ===== بازگشت به مرحله قبل =====
// // // // //   const handleBack = () => {
// // // // //     setStep('phone');
// // // // //     setError('');
// // // // //     setUserExists(null);
// // // // //   };

// // // // //   // ===== رفتن به صفحه ثبت‌نام اصلی =====
// // // // //   const goToRegisterPage = () => {
// // // // //     onClose();
// // // // //     navigate('/register', { 
// // // // //       state: { 
// // // // //         from: window.location.pathname,
// // // // //         phone: phoneNumber
// // // // //       } 
// // // // //     });
// // // // //   };

// // // // //   // ============================================================
// // // // //   // ===== رندر مرحله شماره موبایل =====
// // // // //   // ============================================================
// // // // //   const renderPhoneStep = () => (
// // // // //     <>
// // // // //       <div className="modal-icon">
// // // // //         <FaPhone className="modal-phone-icon" />
// // // // //       </div>
      
// // // // //       <h2 className="modal-title">ورود / ثبت‌نام</h2>
// // // // //       <p className="modal-description">
// // // // //         برای مشاهده شماره تماس مشاور،
// // // // //         <br />
// // // // //         لطفاً شماره موبایل خود را وارد کنید
// // // // //       </p>

// // // // //       <div className="phone-input-wrapper">
// // // // //         <div className="phone-prefix">+98</div>
// // // // //         <input
// // // // //           type="tel"
// // // // //           className="phone-input"
// // // // //           placeholder="۹۱۲۳۴۵۶۷۸۹"
// // // // //           value={phoneNumber}
// // // // //           onChange={(e) => {
// // // // //             const value = e.target.value.replace(/\D/g, '');
// // // // //             if (value.length <= 10) {
// // // // //               setPhoneNumber(value);
// // // // //             }
// // // // //           }}
// // // // //           maxLength="10"
// // // // //           autoFocus
// // // // //           onKeyDown={(e) => {
// // // // //             if (e.key === 'Enter') {
// // // // //               checkPhoneNumber();
// // // // //             }
// // // // //           }}
// // // // //         />
// // // // //       </div>

// // // // //       {error && <div className="error-message-text">{error}</div>}

// // // // //       <button 
// // // // //         className="modal-submit-btn"
// // // // //         onClick={checkPhoneNumber}
// // // // //         disabled={loading || phoneNumber.length < 10}
// // // // //       >
// // // // //         {loading ? (
// // // // //           <>
// // // // //             <FaSpinner className="spinner" />
// // // // //             در حال بررسی...
// // // // //           </>
// // // // //         ) : (
// // // // //           <>
// // // // //             ادامه
// // // // //             <FaArrowRight />
// // // // //           </>
// // // // //         )}
// // // // //       </button>

// // // // //       <p className="modal-footer-text">
// // // // //         با ادامه، شما با <a href="/terms">قوانین</a> موافقت می‌کنید
// // // // //       </p>
// // // // //     </>
// // // // //   );

// // // // //   // ============================================================
// // // // //   // ===== رندر مرحله لاگین =====
// // // // //   // ============================================================
// // // // //   const renderLoginStep = () => (
// // // // //     <>
// // // // //       <button className="modal-back-btn" onClick={handleBack}>
// // // // //         ← بازگشت
// // // // //       </button>

// // // // //       <div className="modal-icon">
// // // // //         <FaUser className="modal-login-icon" />
// // // // //       </div>
      
// // // // //       <h2 className="modal-title">خوش آمدید</h2>
// // // // //       <p className="modal-description">
// // // // //         شماره <strong>{phoneNumber}</strong> در سامانه ثبت شده است
// // // // //         <br />
// // // // //         لطفاً وارد شوید
// // // // //       </p>

// // // // //       <div className="input-group">
// // // // //         <div className="input-wrapper">
// // // // //           <FaUser className="input-icon" />
// // // // //           <input
// // // // //             type="text"
// // // // //             className="modal-input"
// // // // //             placeholder="نام کاربری"
// // // // //             value={username}
// // // // //             onChange={(e) => setUsername(e.target.value)}
// // // // //             onKeyDown={(e) => {
// // // // //               if (e.key === 'Enter') {
// // // // //                 handleLogin();
// // // // //               }
// // // // //             }}
// // // // //           />
// // // // //         </div>

// // // // //         <div className="input-wrapper">
// // // // //           <FaLock className="input-icon" />
// // // // //           <input
// // // // //             type="password"
// // // // //             className="modal-input"
// // // // //             placeholder="رمز عبور"
// // // // //             value={password}
// // // // //             onChange={(e) => setPassword(e.target.value)}
// // // // //             onKeyDown={(e) => {
// // // // //               if (e.key === 'Enter') {
// // // // //                 handleLogin();
// // // // //               }
// // // // //             }}
// // // // //           />
// // // // //         </div>
// // // // //       </div>

// // // // //       {error && <div className="error-message-text">{error}</div>}

// // // // //       <button 
// // // // //         className="modal-submit-btn"
// // // // //         onClick={handleLogin}
// // // // //         disabled={loading || !username || !password}
// // // // //       >
// // // // //         {loading ? (
// // // // //           <>
// // // // //             <FaSpinner className="spinner" />
// // // // //             در حال ورود...
// // // // //           </>
// // // // //         ) : (
// // // // //           <>
// // // // //             ورود
// // // // //             <FaArrowRight />
// // // // //           </>
// // // // //         )}
// // // // //       </button>

// // // // //       <button className="modal-guest-btn" onClick={onClose}>
// // // // //         ادامه به عنوان مهمان
// // // // //       </button>
// // // // //     </>
// // // // //   );

// // // // //   // ============================================================
// // // // //   // ===== رندر مرحله ثبت‌نام =====
// // // // //   // ============================================================
// // // // //   const renderRegisterStep = () => (
// // // // //     <>
// // // // //       <button className="modal-back-btn" onClick={handleBack}>
// // // // //         ← بازگشت
// // // // //       </button>

// // // // //       <div className="modal-icon">
// // // // //         <FaUser className="modal-register-icon" />
// // // // //       </div>
      
// // // // //       <h2 className="modal-title">ثبت‌نام</h2>
// // // // //       <p className="modal-description">
// // // // //         شماره <strong>{phoneNumber}</strong> در سامانه ثبت نشده است
// // // // //         <br />
// // // // //         لطفاً ثبت‌نام کنید
// // // // //       </p>

// // // // //       <div className="input-group">
// // // // //         <div className="input-wrapper">
// // // // //           <FaUser className="input-icon" />
// // // // //           <input
// // // // //             type="text"
// // // // //             className="modal-input"
// // // // //             placeholder="نام کاربری (حداقل ۳ کاراکتر)"
// // // // //             value={username}
// // // // //             onChange={(e) => setUsername(e.target.value)}
// // // // //             onKeyDown={(e) => {
// // // // //               if (e.key === 'Enter') {
// // // // //                 handleRegister();
// // // // //               }
// // // // //             }}
// // // // //           />
// // // // //         </div>

// // // // //         <div className="input-wrapper">
// // // // //           <FaLock className="input-icon" />
// // // // //           <input
// // // // //             type="password"
// // // // //             className="modal-input"
// // // // //             placeholder="رمز عبور (حداقل ۶ کاراکتر)"
// // // // //             value={password}
// // // // //             onChange={(e) => setPassword(e.target.value)}
// // // // //             onKeyDown={(e) => {
// // // // //               if (e.key === 'Enter') {
// // // // //                 handleRegister();
// // // // //               }
// // // // //             }}
// // // // //           />
// // // // //         </div>

// // // // //         <div className="input-wrapper">
// // // // //           <FaCheckCircle className="input-icon" />
// // // // //           <input
// // // // //             type="password"
// // // // //             className="modal-input"
// // // // //             placeholder="تکرار رمز عبور"
// // // // //             value={confirmPassword}
// // // // //             onChange={(e) => setConfirmPassword(e.target.value)}
// // // // //             onKeyDown={(e) => {
// // // // //               if (e.key === 'Enter') {
// // // // //                 handleRegister();
// // // // //               }
// // // // //             }}
// // // // //           />
// // // // //         </div>
// // // // //       </div>

// // // // //       {error && <div className="error-message-text">{error}</div>}

// // // // //       <button 
// // // // //         className="modal-submit-btn"
// // // // //         onClick={handleRegister}
// // // // //         disabled={loading || !username || !password || !confirmPassword}
// // // // //       >
// // // // //         {loading ? (
// // // // //           <>
// // // // //             <FaSpinner className="spinner" />
// // // // //             در حال ثبت‌نام...
// // // // //           </>
// // // // //         ) : (
// // // // //           <>
// // // // //             ثبت‌نام
// // // // //             <FaArrowRight />
// // // // //           </>
// // // // //         )}
// // // // //       </button>

// // // // //       <button 
// // // // //         className="modal-guest-btn" 
// // // // //         onClick={goToRegisterPage}
// // // // //       >
// // // // //         ثبت‌نام کامل در صفحه جداگانه
// // // // //       </button>
// // // // //     </>
// // // // //   );

// // // // //   // ============================================================
// // // // //   // ===== رندر اصلی =====
// // // // //   // ============================================================
// // // // //   return (
// // // // //     <div className="login-modal-overlay" onClick={onClose}>
// // // // //       <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
// // // // //         <button className="modal-close-btn" onClick={onClose}>✕</button>
        
// // // // //         {step === 'phone' && renderPhoneStep()}
// // // // //         {step === 'login' && renderLoginStep()}
// // // // //         {step === 'register' && renderRegisterStep()}
        
// // // // //         <div className="modal-benefits-mini">
// // // // //           <span>✅ ثبت‌نام رایگان</span>
// // // // //           <span>🔒 امن و مطمئن</span>
// // // // //           <span>⚡ کمتر از ۱ دقیقه</span>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // // ============================================================
// // // // // // ========== کامپوننت اصلی ==========
// // // // // // ============================================================
// // // // // const RealEstateDetailPageItem = memo(() => {
// // // // //   const location = useLocation();
// // // // //   const navigate = useNavigate();
// // // // //   const { id: paramId } = useParams();
// // // // //   const queryParams = new URLSearchParams(location.search);
// // // // //   const id = paramId || queryParams.get('id');
  
// // // // //   const [property, setProperty] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [copied, setCopied] = useState(false);
// // // // //   const [selectedImage, setSelectedImage] = useState(0);
// // // // //   const [activeTab, setActiveTab] = useState('details');
// // // // //   const [isFavorite, setIsFavorite] = useState(false);
// // // // //   const [imagesLoaded, setImagesLoaded] = useState({});
// // // // //   const [showStoryPopup, setShowStoryPopup] = useState(false);
// // // // //   const [storyUserId, setStoryUserId] = useState(null);
  
// // // // //   // ===== STATE برای لاگین و مودال =====
// // // // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // // // //   const [showLoginModal, setShowLoginModal] = useState(false);

// // // // //   // ===== بررسی لاگین =====
// // // // //   useEffect(() => {
// // // // //     const checkLogin = () => {
// // // // //       const token = localStorage.getItem('auth_token');
// // // // //       if (token) {
// // // // //         setIsLoggedIn(true);
// // // // //       } else {
// // // // //         setIsLoggedIn(false);
// // // // //       }
// // // // //     };
    
// // // // //     checkLogin();
    
// // // // //     // گوش دادن به تغییرات
// // // // //     window.addEventListener('authChange', checkLogin);
// // // // //     window.addEventListener('storage', checkLogin);
    
// // // // //     return () => {
// // // // //       window.removeEventListener('authChange', checkLogin);
// // // // //       window.removeEventListener('storage', checkLogin);
// // // // //     };
// // // // //   }, []);

// // // // //   // ============================================================
// // // // //   // ===== دریافت اطلاعات ملک =====
// // // // //   // ============================================================
// // // // //   useEffect(() => {
// // // // //     const fetchPropertyData = async () => {
// // // // //       if (!id) { setError('شناسه ملک یافت نشد'); setLoading(false); return; }
// // // // //       setLoading(true); setError(null);
// // // // //       try {
// // // // //         const controller = new AbortController();
// // // // //         const timeoutId = setTimeout(() => controller.abort(), 10000);
// // // // //         const response = await fetch(`https://localhost:7178/api/RealEstatePage/GetRealEstateDetails?id=${id}`, { signal: controller.signal });
// // // // //         clearTimeout(timeoutId);
// // // // //         if (!response.ok) throw new Error(`HTTP ${response.status}`);
// // // // //         const result = await response.json();
        
// // // // //         console.log('📦 Full API response:', result);
        
// // // // //         if (result.status === 200 && result.data) {
// // // // //           const data = result.data;
          
// // // // //           const agentImage = data.agents?.image 
// // // // //             ? `https://localhost:7178/${data.agents.image}` 
// // // // //             : "https://randomuser.me/api/portraits/men/32.jpg";
          
// // // // //           const userId = data.agents?.userId || null;
// // // // //           const hasStory = data.agents?.hasStory || false;
          
// // // // //           console.log('👤 Agent UserId:', userId);
// // // // //           console.log('📱 HasStory:', hasStory);
          
// // // // //           setStoryUserId(hasStory ? userId : null);
          
// // // // //           setProperty({
// // // // //             id: data.id, 
// // // // //             title: data.title || `ملک در ${data.regionName || 'منطقه'} `, 
// // // // //             price: data.price?.toLocaleString("fa-IR") || "۰",
// // // // //             priceMeter: data.priceMeter?.toLocaleString("fa-IR") || "۰", 
// // // // //             rentPrice: data.rent?.toLocaleString("fa-IR") || null,
// // // // //             depositPrice: data.deposit?.toLocaleString("fa-IR") || null, 
// // // // //             mortgagePrice: data.mortgagePrice?.toLocaleString("fa-IR") || null,
// // // // //             type: data.categoryType, 
// // // // //             area: parseInt(data.additionalInformation?.match(/\d+/)?.[0]) || 0, 
// // // // //             rooms: data.rooms || 0,
// // // // //             floor: data.floor || 1, 
// // // // //             regionName: data.regionName || "منطقه نامشخص", 
// // // // //             totalFloors: data.countFloor || 1,
// // // // //             year: data.constructionYear || "نامشخص", 
// // // // //             address: data.address || "آدرس درج نشده", 
// // // // //             showExactLocation: data.showExactLocation,
// // // // //             location: { lat: data.lat || 35.7199363, lng: data.lng || 51.4334842 },
// // // // //             description: data.descriptionRows || "توضیحاتی برای این ملک ثبت نشده است.", 
// // // // //             features: data.facilities || [],
// // // // //             warnings: data.warnings || ["استعلام خلافی", "بررسی سند مالکیت", "استعلام پایان کار", "بررسی مفاصا حساب"],
// // // // //             images: (data.images || []).map(img => `https://localhost:7178/${img}`),
// // // // //             agent: { 
// // // // //               name: data.agents?.name || "مشاور املاک", 
// // // // //               phone: data.agents?.phone || "۰۲۱۹۱۰۰۰۰۰۰", 
// // // // //               whatsapp: data.agents?.connectSocialMedia || "", 
// // // // //               address: data.agents?.address || "آدرس دفتر درج نشده", 
// // // // //               rating: data.agents?.rating || 4.5, 
// // // // //               deals: data.agents?.deals || 120, 
// // // // //               image: agentImage,
// // // // //               hasStory: hasStory,
// // // // //               userId: userId
// // // // //             },
// // // // //             views: data.views || 0, 
// // // // //             saved: data.saved || 0, 
// // // // //             createdAt: data.createdAtPersianRelative || "امروز", 
// // // // //             certificate: data.isHasLoan ? "قابل وام" : "سند رسمی", 
// // // // //             mortgage: data.isHasLoan ? "امکان وام" : "بدون وام",
// // // // //             nearby: [{ name: "مترو", distance: "۵۰۰ متر" }, { name: "مرکز خرید", distance: "۳۰۰ متر" }, { name: "پارک", distance: "۲۰۰ متر" }, { name: "مدرسه", distance: "۴۰۰ متر" }]
// // // // //           });
// // // // //         } else throw new Error(result.message || 'ملک یافت نشد');
// // // // //       } catch (error) { 
// // // // //         console.error('خطا:', error); 
// // // // //         setError(error.name === 'AbortError' ? 'مدت زمان درخواست به پایان رسید' : 'مشکل در ارتباط با سرور'); 
// // // // //       } finally { 
// // // // //         setLoading(false); 
// // // // //       }
// // // // //     };
// // // // //     fetchPropertyData();
// // // // //     window.scrollTo({ top: 0, behavior: 'smooth' });
// // // // //   }, [id]);

// // // // //   // ============================================================
// // // // //   // ===== توابع تماس با قفل لاگین =====
// // // // //   // ============================================================
// // // // //   const handlePhoneClick = useCallback(() => {
// // // // //     if (!isLoggedIn) {
// // // // //       setShowLoginModal(true);
// // // // //       return;
// // // // //     }
// // // // //     if (!property?.agent?.phone) {
// // // // //       alert('شماره تماس در دسترس نیست');
// // // // //       return;
// // // // //     }
// // // // //     navigator.clipboard.writeText(property.agent.phone);
// // // // //     setCopied(true);
// // // // //     setTimeout(() => setCopied(false), 2000);
// // // // //   }, [isLoggedIn, property]);

// // // // //   const handleWhatsAppClick = useCallback(() => {
// // // // //     if (!isLoggedIn) {
// // // // //       setShowLoginModal(true);
// // // // //       return;
// // // // //     }
// // // // //     if (!property?.agent?.whatsapp) {
// // // // //       alert('شماره واتساپ در دسترس نیست');
// // // // //       return;
// // // // //     }
// // // // //     window.open(`https://wa.me/${property.agent.whatsapp.replace(/\s/g, '')}`, '_blank');
// // // // //   }, [isLoggedIn, property]);

// // // // //   // ============================================================
// // // // //   // ===== سایر توابع =====
// // // // //   // ============================================================
// // // // //   const isForSale = useMemo(() => property?.type === 1, [property]);
// // // // //   const isForRent = useMemo(() => property?.type === 2, [property]);
// // // // //   const formattedPricePerMeter = useMemo(() => { if (!property?.priceMeter || property.priceMeter === "۰") return null; return `${property.priceMeter} تومان`; }, [property]);
// // // // //   const shareUrl = useMemo(() => window.location.href, []);

// // // // //   const handleCopyLink = useCallback(() => { navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }, [shareUrl]);
// // // // //   const handleShare = useCallback(async () => { if (!property) return; const shareData = { title: property.title, text: `${property.title} - ${property.area} متری - ${isForSale ? `قیمت ${property.price}` : `رهن ${property.mortgagePrice}`} تومان`, url: shareUrl }; if (navigator.share && /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)) { try { await navigator.share(shareData); } catch (error) { if (error.name !== 'AbortError') handleCopyLink(); } } else handleCopyLink(); }, [property, isForSale, shareUrl, handleCopyLink]);
// // // // //   const handleImageLoad = useCallback((index) => { setImagesLoaded(prev => ({ ...prev, [index]: true })); }, []);
// // // // //   const handleFavoriteToggle = useCallback(() => { setIsFavorite(prev => !prev); }, []);
  
// // // // //   const goToProfile = useCallback(() => {
// // // // //     if (property?.agent?.userId) {
// // // // //       console.log('👤 رفتن به پروفایل کاربر:', property.agent.userId);
// // // // //       navigate(`/profile/${property.agent.userId}`);
// // // // //     }
// // // // //   }, [property, navigate]);

// // // // //   const handleStoryClick = useCallback((e) => {
// // // // //     if (e) {
// // // // //       e.stopPropagation();
// // // // //     }
    
// // // // //     console.log('🖱️ کلیک روی استوری');
// // // // //     console.log('🆔 storyUserId:', storyUserId);
// // // // //     console.log('📱 hasStory:', property?.agent?.hasStory);
    
// // // // //     if (storyUserId) {
// // // // //       console.log('✅ باز کردن استوری برای userId:', storyUserId);
// // // // //       setShowStoryPopup(true);
// // // // //       document.body.style.overflow = 'hidden';
// // // // //     } else {
// // // // //       console.log('❌ این کاربر استوری ندارد');
// // // // //     }
// // // // //   }, [storyUserId, property]);

// // // // //   const handleStoryClose = useCallback(() => {
// // // // //     setShowStoryPopup(false);
// // // // //     document.body.style.overflow = '';
// // // // //   }, []);

// // // // //   const handleLoginModalClose = useCallback(() => {
// // // // //     setShowLoginModal(false);
// // // // //     // بعد از بستن مودال، دوباره وضعیت لاگین رو بررسی کن
// // // // //     const token = localStorage.getItem('auth_token');
// // // // //     if (token) {
// // // // //       setIsLoggedIn(true);
// // // // //     }
// // // // //   }, []);

// // // // //   // ============================================================
// // // // //   // ===== رندر =====
// // // // //   // ============================================================
// // // // //   if (error) return ( 
// // // // //     <> 
// // // // //       <PageMetadata property={null} /> 
// // // // //       <div className="detail-container realestate-detail">
// // // // //         <div className="detail-header">
// // // // //           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
// // // // //           <h1 className="header-title">خطا</h1>
// // // // //           <div className="header-btn"></div>
// // // // //         </div>
// // // // //         <div className="error-message">
// // // // //           <h2>متاسفانه خطایی رخ داده است</h2>
// // // // //           <p>{error}</p>
// // // // //           <button onClick={() => window.location.reload()}>تلاش مجدد</button>
// // // // //           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </> 
// // // // //   );
  
// // // // //   if (loading) return <DetailSkeleton />;
  
// // // // //   if (!property) return ( 
// // // // //     <> 
// // // // //       <PageMetadata property={null} /> 
// // // // //       <div className="detail-container realestate-detail">
// // // // //         <div className="detail-header">
// // // // //           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
// // // // //           <h1 className="header-title">ملک یافت نشد</h1>
// // // // //           <div className="header-btn"></div>
// // // // //         </div>
// // // // //         <div className="error-message">
// // // // //           <p>متاسفانه ملک مورد نظر یافت نشد</p>
// // // // //           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </> 
// // // // //   );

// // // // //   return ( 
// // // // //     <>
// // // // //       <PageMetadata property={property} isForSale={isForSale} isForRent={isForRent} />
// // // // //       <StructuredData property={property} isForSale={isForSale} isForRent={isForRent} />
// // // // //       <BreadcrumbStructuredData property={property} isForSale={isForSale} />
      
// // // // //       {/* ===== پاپ‌آپ استوری ===== */}
// // // // //       {showStoryPopup && (
// // // // //         <StoryPopup 
// // // // //           agentName={property.agent.name}
// // // // //           agentImage={property.agent.image}
// // // // //           userId={storyUserId}
// // // // //           onClose={handleStoryClose}
// // // // //         />
// // // // //       )}

// // // // //       {/* ===== مودال لاگین/ثبت‌نام ===== */}
// // // // //       {showLoginModal && (
// // // // //         <LoginModal 
// // // // //           onClose={handleLoginModalClose}
// // // // //         />
// // // // //       )}
      
// // // // //       <div className="detail-container realestate-detail">
// // // // //         <nav className="breadcrumb-nav">
// // // // //           <ol className="breadcrumb-list">
// // // // //             <li className="breadcrumb-item"><a href="/">خانه</a></li>
// // // // //             <li className="breadcrumb-item"><a href={isForSale ? '/sale' : '/rent'}>{isForSale ? 'فروش آپارتمان' : 'رهن و اجاره آپارتمان'}</a></li>
// // // // //             <li className="breadcrumb-item"><a href={`/region/${encodeURIComponent(property.regionName)}`}>منطقه {property.regionName}</a></li>
// // // // //             <li className="breadcrumb-item active">{truncateText(property.title, 50)}</li>
// // // // //           </ol>
// // // // //         </nav>
        
// // // // //         <div className="detail-header">
// // // // //           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
// // // // //           <h1 className="header-title">{property.title}</h1>
// // // // //           <button className="header-btn" onClick={handleShare}><FaShare /></button>
// // // // //         </div>
        
// // // // //         <div className="detail-gallery">
// // // // //           <Swiper 
// // // // //             modules={[Navigation, Pagination, Autoplay]} 
// // // // //             navigation 
// // // // //             pagination={{ clickable: true }} 
// // // // //             autoplay={{ delay: 4000, disableOnInteraction: false }} 
// // // // //             spaceBetween={0} 
// // // // //             slidesPerView={1} 
// // // // //             onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)} 
// // // // //             className="gallery-swiper"
// // // // //           >
// // // // //             {property.images.length > 0 ? 
// // // // //               property.images.map((img, index) => (
// // // // //                 <SwiperSlide key={index}>
// // // // //                   <div className="gallery-slide">
// // // // //                     {!imagesLoaded[index] && <div className="image-placeholder"><FaHome /></div>}
// // // // //                     <img 
// // // // //                       src={img} 
// // // // //                       alt={`${property.title} - ${index === 0 ? 'نمای اصلی' : `تصویر ${index + 1}`}`} 
// // // // //                       loading={index === 0 ? 'eager' : 'lazy'} 
// // // // //                       onLoad={() => handleImageLoad(index)} 
// // // // //                       style={{ display: imagesLoaded[index] ? 'block' : 'none' }} 
// // // // //                     />
// // // // //                   </div>
// // // // //                 </SwiperSlide>
// // // // //               )) : 
// // // // //               (<SwiperSlide>
// // // // //                 <div className="gallery-slide no-image">
// // // // //                   <FaHome />
// // // // //                   <span>تصویری موجود نیست</span>
// // // // //                 </div>
// // // // //               </SwiperSlide>)
// // // // //             }
// // // // //           </Swiper>
// // // // //           <button className={`favorite-btn ${isFavorite ? 'active' : ''}`} onClick={handleFavoriteToggle}>
// // // // //             {isFavorite ? <FaHeart /> : <FaRegHeart />}
// // // // //           </button>
// // // // //           <div className="image-counter">{selectedImage + 1} / {property.images.length || 1}</div>
// // // // //         </div>
        
// // // // //         <div className="detail-main">
// // // // //           <div className="detail-title-section">
// // // // //             <div className="title-row">
// // // // //               <div className="property-stats">
// // // // //                 <span className="stat-badge"><FaEye /> {property.views.toLocaleString('fa-IR')} بازدید</span>
// // // // //                 <span className="stat-badge"><FaBookmark /> {property.saved.toLocaleString('fa-IR')} ذخیره</span>
// // // // //                 <span className="stat-badge"><FaClock /> {property.createdAt}</span>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
          
// // // // //           <div className="price-section">
// // // // //             {isForSale && (
// // // // //               <div className="price-card sale-price">
// // // // //                 <div className="price-card-icon"><FaTag /></div>
// // // // //                 <div className="price-card-content">
// // // // //                   <span className="price-label">قیمت فروش</span>
// // // // //                   <div className="price-value-wrapper">
// // // // //                     <span className="price-number">{property.price}</span>
// // // // //                     <span className="price-unit">تومان</span>
// // // // //                   </div>
// // // // //                   {formattedPricePerMeter && 
// // // // //                     <div className="price-meta">
// // // // //                       <FaRuler />
// // // // //                       <span>متری {formattedPricePerMeter}</span>
// // // // //                     </div>
// // // // //                   }
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}
            
// // // // //             {isForRent && (
// // // // //               <div className="rent-price-group">
// // // // //                 {property.mortgagePrice && property.mortgagePrice !== "۰" && (
// // // // //                   <div className="price-card mortgage-price">
// // // // //                     <div className="price-card-icon"><FaBuilding /></div>
// // // // //                     <div className="price-card-content">
// // // // //                       <span className="price-label">مبلغ رهن</span>
// // // // //                       <div className="price-value-wrapper">
// // // // //                         <span className="price-number">{property.mortgagePrice}</span>
// // // // //                         <span className="price-unit">تومان</span>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 )}
// // // // //                 {property.rentPrice && property.rentPrice !== "۰" && (
// // // // //                   <div className="price-card rent-price">
// // // // //                     <div className="price-card-icon"><FaHome /></div>
// // // // //                     <div className="price-card-content">
// // // // //                       <span className="price-label">اجاره ماهانه</span>
// // // // //                       <div className="price-value-wrapper">
// // // // //                         <span className="price-number">{property.rentPrice}</span>
// // // // //                         <span className="price-unit">تومان</span>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
          
// // // // //           <div className="quick-specs">
// // // // //             <div className="spec-item">
// // // // //               <FaRulerCombined />
// // // // //               <span className="spec-label">متراژ</span>
// // // // //               <span className="spec-value">{property.area} متر²</span>
// // // // //             </div>
// // // // //             <div className="spec-item">
// // // // //               <FaBath />
// // // // //               <span className="spec-label">اتاق‌خواب</span>
// // // // //               <span className="spec-value">{property.rooms} خواب</span>
// // // // //             </div>
// // // // //             <div className="spec-item">
// // // // //               <FaLayerGroup />
// // // // //               <span className="spec-label">طبقه</span>
// // // // //               <span className="spec-value">{property.floor} از {property.totalFloors}</span>
// // // // //             </div>
// // // // //             <div className="spec-item">
// // // // //               <FaCalendarAlt />
// // // // //               <span className="spec-label">سال ساخت</span>
// // // // //               <span className="spec-value">{property.year}</span>
// // // // //             </div>
// // // // //           </div>
          
// // // // //           <div className="info-chips">
// // // // //             <span className="info-chip">کد ملک: {property.id}</span>
// // // // //             <span className="info-chip"><FaShieldAlt /> {property.certificate}</span>
// // // // //             <span className="info-chip type-chip">{isForSale ? 'فروش' : 'رهن و اجاره'}</span>
// // // // //           </div>
          
// // // // //           <div className="detail-tabs">
// // // // //             <button className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`} onClick={() => setActiveTab('details')}>جزئیات ملک</button>
// // // // //             <button className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`} onClick={() => setActiveTab('features')}>امکانات ({property.features.length})</button>
// // // // //             <button className={`tab-btn ${activeTab === 'warnings' ? 'active' : ''}`} onClick={() => setActiveTab('warnings')}>هشدارهای معامله</button>
// // // // //             <button className={`tab-btn ${activeTab === 'nearby' ? 'active' : ''}`} onClick={() => setActiveTab('nearby')}>امکانات اطراف</button>
// // // // //           </div>
          
// // // // //           <div className="tab-content">
// // // // //             {activeTab === 'details' && (
// // // // //               <div className="details-tab">
// // // // //                 <div className="address-card">
// // // // //                   <FaMapMarkerAlt />
// // // // //                   <div className="address-info">
// // // // //                     <h3>آدرس ملک</h3>
// // // // //                     <div>منطقه {property.regionName}</div>
// // // // //                     <p>{property.address}</p>
// // // // //                     <span className="post-date">تاریخ درج: {property.createdAt}</span>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="description-card">
// // // // //                   <h3>توضیحات کامل {property.title}</h3>
// // // // //                   <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(property.description, { ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'a', 'blockquote'], ALLOWED_ATTR: ['href', 'target'] }) }} />
// // // // //                 </div>
// // // // //                 <div className="map-card">
// // // // //                   <h3><FaMapMarkerAlt /> موقعیت مکانی ملک در منطقه {property.regionName}</h3>
// // // // //                   <div className="map-location-badge">
// // // // //                     {property.showExactLocation ? 
// // // // //                       <span className="badge exact">📍 نمایش موقعیت دقیق ملک</span> : 
// // // // //                       <span className="badge approximate">🔵 نمایش محدوده تقریبی</span>
// // // // //                     }
// // // // //                   </div>
// // // // //                   <div className="map-container">
// // // // //                     <NeshanMap 
// // // // //                       mapKey="web.31c5ea6c425e40cc9b30620a84a8be90" 
// // // // //                       center={{ latitude: property.location.lat, longitude: property.location.lng }} 
// // // // //                       zoom={property.showExactLocation ? 17 : 15.9} 
// // // // //                       defaultType="dreamy" 
// // // // //                       poi={true} 
// // // // //                       traffic={false} 
// // // // //                       style={{ height: '100%', width: '100%', pointerEvents: 'none' }} 
// // // // //                     />
// // // // //                     <div className="map-marker-overlay">
// // // // //                       {property.showExactLocation ? 
// // // // //                         <><div className="location-dot"></div><div className="location-ripple"></div></> : 
// // // // //                         <div className="location-circles"><div className="circle-3"></div></div>
// // // // //                       }
// // // // //                     </div>
// // // // //                   </div>
// // // // //                   <div className="map-privacy-note">
// // // // //                     <small>{property.showExactLocation ? '📍 موقعیت دقیق ملک' : '📍 محدوده تقریبی ملک'}</small>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}
            
// // // // //             {activeTab === 'features' && (
// // // // //               <div className="features-tab">
// // // // //                 <h3>امکانات و ویژگی‌ها</h3>
// // // // //                 <div className="features-grid">
// // // // //                   {property.features.length > 0 ? 
// // // // //                     property.features.map((feature, idx) => {
// // // // //                       let Icon = FaCheckCircle;
// // // // //                       if (feature.includes('پارکینگ')) Icon = FaParking;
// // // // //                       else if (feature.includes('انباری')) Icon = FaWarehouse;
// // // // //                       else if (feature.includes('آسانسور')) Icon = FaArrowUp;
// // // // //                       else if (feature.includes('استخر')) Icon = FaSwimmingPool;
// // // // //                       return (
// // // // //                         <div key={idx} className="feature-card">
// // // // //                           <Icon />
// // // // //                           <span>{feature}</span>
// // // // //                         </div>
// // // // //                       );
// // // // //                     }) : 
// // // // //                     <p className="no-data">امکاناتی ثبت نشده است</p>
// // // // //                   }
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}
            
// // // // //             {activeTab === 'warnings' && (
// // // // //               <div className="warnings-tab">
// // // // //                 <h3>⚠️ هشدارهای مهم</h3>
// // // // //                 <ul className="warnings-list">
// // // // //                   {property.warnings.map((w, idx) => (
// // // // //                     <li key={idx} className="warning-item">
// // // // //                       <span className="warning-bullet"></span>
// // // // //                       <span>{w}</span>
// // // // //                     </li>
// // // // //                   ))}
// // // // //                 </ul>
// // // // //                 <div className="warning-footer">
// // // // //                   <p>⚠️ قبل از معامله مدارک را بررسی کنید</p>
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}
            
// // // // //             {activeTab === 'nearby' && (
// // // // //               <div className="nearby-tab">
// // // // //                 <h3>امکانات اطراف</h3>
// // // // //                 <div className="nearby-list">
// // // // //                   {property.nearby.map((item, idx) => (
// // // // //                     <div key={idx} className="nearby-item">
// // // // //                       <span className="nearby-name">{item.name}</span>
// // // // //                       <span className="nearby-distance">{item.distance}</span>
// // // // //                     </div>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
          
// // // // //           {/* ============================================================ */}
// // // // //           {/* ========== کارت مشاور با دکمه‌های قفل شده ========== */}
// // // // //           {/* ============================================================ */}
// // // // //           <div className="agent-card">
// // // // //             <div className="agent-header">
// // // // //               {/* آواتار */}
// // // // //               <div 
// // // // //                 className={`agent-avatar-wrapper ${property.agent.hasStory ? 'has-story' : ''}`}
// // // // //                 style={{ 
// // // // //                   position: 'relative',
// // // // //                   display: 'inline-block',
// // // // //                   flexShrink: 0,
// // // // //                   cursor: property.agent.userId ? 'pointer' : 'default'
// // // // //                 }}
// // // // //                 onClick={property.agent.userId ? goToProfile : undefined}
// // // // //               >
// // // // //                 <SafeImage 
// // // // //                   src={property.agent.image} 
// // // // //                   alt={property.agent.name} 
// // // // //                   className={`agent-avatar ${property.agent.hasStory ? 'has-story' : ''}`}
// // // // //                   fallbackSrc="https://randomuser.me/api/portraits/men/32.jpg"
// // // // //                 />
                
// // // // //                 {property.agent.hasStory && (
// // // // //                   <div 
// // // // //                     className="story-ring-indicator"
// // // // //                     onClick={(e) => {
// // // // //                       e.stopPropagation();
// // // // //                       handleStoryClick(e);
// // // // //                     }}
// // // // //                   >
// // // // //                     <div className="story-ring-gradient"></div>
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>
              
// // // // //               <div className="agent-info">
// // // // //                 <div className="agent-name-wrapper">
// // // // //                   <h3 
// // // // //                     style={{ cursor: property.agent.userId ? 'pointer' : 'default' }}
// // // // //                     onClick={property.agent.userId ? goToProfile : undefined}
// // // // //                   >
// // // // //                     {property.agent.name}
// // // // //                   </h3>
                  
// // // // //                   {property.agent.hasStory && (
// // // // //                     <span 
// // // // //                       className="story-label" 
// // // // //                       onClick={(e) => {
// // // // //                         e.stopPropagation();
// // // // //                         handleStoryClick(e);
// // // // //                       }}
// // // // //                       style={{ cursor: 'pointer' }}
// // // // //                     >
// // // // //                       <span className="story-dot"></span>
// // // // //                       استوری
// // // // //                     </span>
// // // // //                   )}
// // // // //                 </div>
// // // // //                 <p>{property.agent.address}</p>
// // // // //                 <div className="agent-rating">
// // // // //                   <FaStar />
// // // // //                   <span>{property.agent.rating}</span>
// // // // //                   <span>({property.agent.deals} معامله)</span>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
            
// // // // //             {/* ============================================================ */}
// // // // //             {/* ===== دکمه‌های تماس با شرط لاگین ===== */}
// // // // //             {/* ============================================================ */}
// // // // //             <div className="agent-actions-wrapper">
              
// // // // //               {/* دکمه تماس تلفنی */}
// // // // //               <button 
// // // // //                 className={`agent-action-btn phone ${!isLoggedIn ? 'locked' : ''}`}
// // // // //                 onClick={handlePhoneClick}
// // // // //               >
// // // // //                 <FaPhone /> 
// // // // //                 <span className="btn-label">
// // // // //                   {isLoggedIn ? property.agent.phone : 'شماره تماس'}
// // // // //                 </span>
                
// // // // //                 {!isLoggedIn && (
// // // // //                   <>
// // // // //                     <span className="lock-badge">
// // // // //                       <FaLock className="lock-icon-small" />
// // // // //                     </span>
// // // // //                     <div className="lock-overlay">
// // // // //                       <FaLock className="lock-icon" />
// // // // //                       <span className="lock-text">برای مشاهده شماره</span>
// // // // //                       <span className="lock-subtext">وارد سامانه شوید</span>
// // // // //                     </div>
// // // // //                   </>
// // // // //                 )}
// // // // //               </button>

// // // // //               {/* دکمه واتساپ */}
// // // // //               <button 
// // // // //                 className={`agent-action-btn whatsapp ${!isLoggedIn ? 'locked' : ''}`}
// // // // //                 onClick={handleWhatsAppClick}
// // // // //               >
// // // // //                 <FaWhatsapp /> 
// // // // //                 <span className="btn-label">واتساپ</span>
                
// // // // //                 {!isLoggedIn && (
// // // // //                   <>
// // // // //                     <span className="lock-badge">
// // // // //                       <FaLock className="lock-icon-small" />
// // // // //                     </span>
// // // // //                     <div className="lock-overlay">
// // // // //                       <FaLock className="lock-icon" />
// // // // //                       <span className="lock-text">برای مشاهده شماره</span>
// // // // //                       <span className="lock-subtext">وارد سامانه شوید</span>
// // // // //                     </div>
// // // // //                   </>
// // // // //                 )}
// // // // //               </button>
// // // // //             </div>

// // // // //             {/* دکمه ورود - فقط برای کاربران غیرلاگین */}
// // // // //             {!isLoggedIn && (
// // // // //               <button 
// // // // //                 className="login-prompt-btn" 
// // // // //                 onClick={() => setShowLoginModal(true)}
// // // // //                 style={{ marginTop: '10px' }}
// // // // //               >
// // // // //                 <FaUser className="login-icon" />
// // // // //                 ورود / ثبت‌نام
// // // // //                 <FaArrowRight className="arrow-icon" />
// // // // //               </button>
// // // // //             )}
// // // // //             {/* ============================================================ */}
            
// // // // //           </div>
// // // // //         </div>
        
// // // // //         <DoubleSidebarBanners />
// // // // //         <RelatedPropertiesSlider 
// // // // //           currentPropertyId={property.id} 
// // // // //           regionName={property.regionName} 
// // // // //           propertyType={property.type} 
// // // // //         />
        
// // // // //         {copied && (
// // // // //           <div className="toast-notification">
// // // // //             <FaCheckCircle /> لینک کپی شد
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </> 
// // // // //   );
// // // // // });

// // // // // RealEstateDetailPageItem.displayName = 'RealEstateDetailPageItem';
// // // // // export default RealEstateDetailPageItem;


// // // // import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
// // // // import CryptoJS from 'crypto-js';
// // // // import DOMPurify from 'dompurify';
// // // // import { useNavigate, useLocation, useParams } from 'react-router-dom';
// // // // import RelatedPropertiesSlider from './RelatedPropertiesSlider';
// // // // import DoubleSidebarBanners from './SidebarBanner';
// // // // import { 
// // // //   FaMapMarkerAlt, FaPhone, FaWhatsapp, FaShare, FaArrowRight, FaHeart, FaRegHeart,
// // // //   FaStar, FaParking, FaWarehouse, FaSwimmingPool, FaBath, FaRulerCombined,
// // // //   FaCalendarAlt, FaLayerGroup, FaArrowUp, FaCheckCircle, FaTag, FaHome,
// // // //   FaBuilding, FaRuler, FaShieldAlt, FaClock, FaEye, FaBookmark, FaLink,
// // // //   FaLock, FaUser, FaSpinner, FaSync
// // // // } from 'react-icons/fa';
// // // // import { Swiper, SwiperSlide } from 'swiper/react';
// // // // import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// // // // import NeshanMap from "@neshan-maps-platform/react-openlayers";
// // // // import "@neshan-maps-platform/react-openlayers/dist/style.css";
// // // // import 'swiper/css';
// // // // import 'swiper/css/navigation';
// // // // import 'swiper/css/pagination';
// // // // import './RealEstateDetailPageItem.css';

// // // // // ============================================================
// // // // // ========== کامپوننت پاپ‌آپ استوری ==========
// // // // // ============================================================
// // // // const StoryPopup = ({ agentName, agentImage, userId, onClose }) => {
// // // //   const [stories, setStories] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
// // // //   const [progress, setProgress] = useState(0);
// // // //   const [isPaused, setIsPaused] = useState(false);
// // // //   const [error, setError] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchStories = async () => {
// // // //       if (!userId) {
// // // //         setError('شناسه کاربر یافت نشد');
// // // //         setLoading(false);
// // // //         return;
// // // //       }

// // // //       try {
// // // //         setLoading(true);
// // // //         console.log('📡 در حال دریافت استوری برای userId:', userId);
        
// // // //         const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${userId}`);
        
// // // //         console.log('📡 Response status:', response.status);
        
// // // //         if (!response.ok) {
// // // //           throw new Error(`HTTP ${response.status}`);
// // // //         }
        
// // // //         const result = await response.json();
// // // //         console.log('📦 نتیجه استوری:', result);
        
// // // //         if (result.status === 200 && result.data && result.data.length > 0) {
// // // //           const userStories = result.data[0]?.storyUser || [];
// // // //           console.log('📸 تعداد استوری‌ها:', userStories.length);
          
// // // //           const formattedStories = userStories.map(story => ({
// // // //             ...story,
// // // //             url: `https://localhost:7178${story.url}`
// // // //           }));
// // // //           setStories(formattedStories);
// // // //         } else {
// // // //           console.log('⚠️ هیچ استوری پیدا نشد');
// // // //           setStories([]);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error('❌ خطا در دریافت استوری:', error);
// // // //         setError('مشکل در دریافت استوری‌ها');
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchStories();
// // // //   }, [userId]);

// // // //   useEffect(() => {
// // // //     if (isPaused || loading || stories.length === 0) return;

// // // //     const timer = setInterval(() => {
// // // //       setProgress(prev => {
// // // //         const newProgress = prev + 1;
// // // //         if (newProgress >= 100) {
// // // //           if (currentStoryIndex < stories.length - 1) {
// // // //             setCurrentStoryIndex(prev => prev + 1);
// // // //             return 0;
// // // //           } else {
// // // //             onClose();
// // // //             return 0;
// // // //           }
// // // //         }
// // // //         return newProgress;
// // // //       });
// // // //     }, 50);

// // // //     return () => clearInterval(timer);
// // // //   }, [currentStoryIndex, isPaused, loading, stories, onClose]);

// // // //   const handlePrevStory = useCallback((e) => {
// // // //     e.stopPropagation();
// // // //     if (currentStoryIndex > 0) {
// // // //       setCurrentStoryIndex(prev => prev - 1);
// // // //       setProgress(0);
// // // //     }
// // // //   }, [currentStoryIndex]);

// // // //   const handleNextStory = useCallback((e) => {
// // // //     e.stopPropagation();
// // // //     if (currentStoryIndex < stories.length - 1) {
// // // //       setCurrentStoryIndex(prev => prev + 1);
// // // //       setProgress(0);
// // // //     } else {
// // // //       onClose();
// // // //     }
// // // //   }, [currentStoryIndex, stories.length, onClose]);

// // // //   const handleStoryLink = useCallback((link) => {
// // // //     if (link) {
// // // //       window.location.href = link;
// // // //     }
// // // //   }, []);

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="realestate-detail story-popup-overlay" onClick={onClose}>
// // // //         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // // //           <div style={{ 
// // // //             display: 'flex', 
// // // //             alignItems: 'center', 
// // // //             justifyContent: 'center', 
// // // //             height: '100%',
// // // //             color: 'white',
// // // //             fontSize: '18px',
// // // //             fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
// // // //           }}>
// // // //             در حال بارگذاری استوری‌ها...
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error || stories.length === 0) {
// // // //     return (
// // // //       <div className="realestate-detail story-popup-overlay" onClick={onClose}>
// // // //         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // // //           <div style={{ 
// // // //             display: 'flex', 
// // // //             flexDirection: 'column',
// // // //             alignItems: 'center', 
// // // //             justifyContent: 'center', 
// // // //             height: '100%',
// // // //             color: 'white',
// // // //             fontSize: '16px',
// // // //             padding: '20px',
// // // //             textAlign: 'center',
// // // //             fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
// // // //           }}>
// // // //             <p>{error || 'هیچ استوری برای این کاربر وجود ندارد'}</p>
// // // //             <button 
// // // //               onClick={onClose}
// // // //               style={{
// // // //                 marginTop: '20px',
// // // //                 padding: '10px 30px',
// // // //                 background: '#ff0000',
// // // //                 color: 'white',
// // // //                 border: 'none',
// // // //                 borderRadius: '8px',
// // // //                 cursor: 'pointer',
// // // //                 fontSize: '14px',
// // // //                 fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
// // // //               }}
// // // //             >
// // // //               بستن
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const currentStory = stories[currentStoryIndex];

// // // //   return (
// // // //     <div 
// // // //       className="realestate-detail story-popup-overlay"
// // // //       onClick={onClose}
// // // //       onMouseEnter={() => setIsPaused(true)}
// // // //       onMouseLeave={() => setIsPaused(false)}
// // // //     >
// // // //       <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // // //         <div className="story-progress-container">
// // // //           {stories.map((_, index) => (
// // // //             <div 
// // // //               key={index} 
// // // //               className="story-progress-bar"
// // // //             >
// // // //               <div 
// // // //                 className="story-progress-fill"
// // // //                 style={{
// // // //                   width: index < currentStoryIndex ? '100%' : 
// // // //                          index === currentStoryIndex ? `${progress}%` : '0%'
// // // //                 }}
// // // //               />
// // // //             </div>
// // // //           ))}
// // // //         </div>

// // // //         <div className="story-header">
// // // //           <div className="story-user-info">
// // // //             <img 
// // // //               src={agentImage} 
// // // //               alt={agentName} 
// // // //               className="story-user-avatar"
// // // //             />
// // // //             <span className="story-user-name">{agentName}</span>
// // // //             <span className="story-time">لحظاتی پیش</span>
// // // //           </div>
// // // //           <button className="story-close-btn" onClick={onClose}>✕</button>
// // // //         </div>

// // // //         <div className="story-content">
// // // //           <img 
// // // //             src={currentStory.url} 
// // // //             alt={currentStory.caption || 'استوری'} 
// // // //             className="story-image"
// // // //           />
          
// // // //           {currentStory.caption && (
// // // //             <div className="story-caption">
// // // //               {currentStory.caption}
// // // //             </div>
// // // //           )}

// // // //           {currentStory.link && (
// // // //             <div 
// // // //               className="story-link-button"
// // // //               onClick={() => handleStoryLink(currentStory.link)}
// // // //             >
// // // //               <FaLink />
// // // //               <span>{currentStory.linkText || 'مشاهده بیشتر'}</span>
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         <div 
// // // //           className="story-nav-left"
// // // //           onClick={handlePrevStory}
// // // //         />
// // // //         <div 
// // // //           className="story-nav-right"
// // // //           onClick={handleNextStory}
// // // //         />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // // ============================================================
// // // // // ========== کامپوننت SafeImage ==========
// // // // // ============================================================
// // // // const SafeImage = ({ src, alt, className, fallbackSrc, ...props }) => {
// // // //   const [error, setError] = useState(false);

// // // //   if (!src || error) {
// // // //     return (
// // // //       <img 
// // // //         src={fallbackSrc || 'https://randomuser.me/api/portraits/men/32.jpg'} 
// // // //         alt={alt || 'تصویر'} 
// // // //         className={className}
// // // //         {...props}
// // // //       />
// // // //     );
// // // //   }

// // // //   return (
// // // //     <img
// // // //       src={src}
// // // //       alt={alt}
// // // //       className={className}
// // // //       onError={() => {
// // // //         setError(true);
// // // //       }}
// // // //       {...props}
// // // //     />
// // // //   );
// // // // };

// // // // // ============================================================
// // // // // ========== توابع کمکی ==========
// // // // // ============================================================
// // // // const stripHtml = (html) => {
// // // //   if (!html) return '';
// // // //   const temp = document.createElement('div');
// // // //   temp.innerHTML = html;
// // // //   return temp.textContent || temp.innerText || '';
// // // // };

// // // // const truncateText = (text, maxLength) => {
// // // //   if (!text) return '';
// // // //   if (text.length <= maxLength) return text;
// // // //   return text.substring(0, maxLength - 2) + '…';
// // // // };

// // // // // ============================================================
// // // // // ========== کامپوننت‌های متا ==========
// // // // // ============================================================
// // // // const PageMetadata = ({ property, isForSale, isForRent }) => {
// // // //   useEffect(() => {
// // // //     if (!property) return;
// // // //     let title = property.title 
// // // //       ? `${truncateText(property.title, 40)} | ${isForSale ? 'فروش' : 'رهن و اجاره'} ${property.area}م ${property.regionName}`
// // // //       : `ملک ${property.area} متری ${property.regionName}`;
// // // //     title = truncateText(title, 65);
// // // //     document.title = title;
// // // //     const plainDescription = stripHtml(property.description || '');
// // // //     const priceText = isForSale ? `قیمت: ${property.price} تومان` : `رهن: ${property.mortgagePrice || property.depositPrice || 'تماس بگیرید'} تومان`;
// // // //     let description = plainDescription ? truncateText(plainDescription, 120) + `... ${priceText}` : `ملک ${isForSale ? 'فروش' : 'رهن و اجاره'} در ${property.regionName}، ${property.area} متری، ${property.rooms} خوابه - ${priceText}`;
// // // //     description = truncateText(description, 155);
// // // //     const keywords = [property.title, `${property.regionName} ملک`, isForSale ? 'فروش آپارتمان' : 'رهن آپارتمان', `${property.area} متری`, `${property.rooms} خوابه`, `طبقه ${property.floor}`, property.year !== "نامشخص" ? `ساخت ${property.year}` : '', ...property.features.slice(0, 5)].filter(Boolean).join(',');
// // // //     const updateOrCreateMeta = (name, content, isProperty = false) => {
// // // //       const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
// // // //       let meta = document.querySelector(selector);
// // // //       if (!meta) {
// // // //         meta = document.createElement('meta');
// // // //         if (isProperty) meta.setAttribute('property', name);
// // // //         else meta.setAttribute('name', name);
// // // //         document.head.appendChild(meta);
// // // //       }
// // // //       meta.setAttribute('content', content);
// // // //     };
// // // //     updateOrCreateMeta('description', description);
// // // //     updateOrCreateMeta('keywords', keywords);
// // // //     updateOrCreateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1');
// // // //     let canonical = document.querySelector('link[rel="canonical"]');
// // // //     if (!canonical) {
// // // //       canonical = document.createElement('link');
// // // //       canonical.rel = 'canonical';
// // // //       document.head.appendChild(canonical);
// // // //     }
// // // //     canonical.href = window.location.href;
// // // //     updateOrCreateMeta('og:title', title, true);
// // // //     updateOrCreateMeta('og:description', truncateText(description, 200), true);
// // // //     updateOrCreateMeta('og:image', property.images?.[0] || '/default-property-image.jpg', true);
// // // //     updateOrCreateMeta('og:url', window.location.href, true);
// // // //     updateOrCreateMeta('og:type', 'product', true);
// // // //     updateOrCreateMeta('og:locale', 'fa_IR', true);
// // // //     updateOrCreateMeta('og:site_name', 'مشاور املاک', true);
// // // //     updateOrCreateMeta('twitter:card', 'summary_large_image');
// // // //     updateOrCreateMeta('twitter:title', title);
// // // //     updateOrCreateMeta('twitter:description', truncateText(description, 200));
// // // //     updateOrCreateMeta('twitter:image', property.images?.[0] || '/default-property-image.jpg');
// // // //     document.documentElement.lang = 'fa';
// // // //     document.documentElement.dir = 'rtl';
// // // //   }, [property, isForSale, isForRent]);
// // // //   return null;
// // // // };

// // // // const StructuredData = ({ property, isForSale, isForRent }) => {
// // // //   useEffect(() => {
// // // //     if (!property) return;
// // // //     const removeOldScript = () => { const oldScript = document.getElementById('json-ld-structured-data'); if (oldScript) oldScript.remove(); };
// // // //     removeOldScript();
// // // //     const parsePriceToNumber = (priceStr) => { if (!priceStr || priceStr === '۰') return '0'; return String(priceStr).replace(/[^0-9]/g, '') || '0'; };
// // // //     const structuredData = {
// // // //       "@context": "https://schema.org", "@type": isForSale ? "Product" : "RealEstateListing", "name": property.title,
// // // //       "description": stripHtml(property.description || '').substring(0, 500), "image": property.images.slice(0, 10), "url": window.location.href,
// // // //       "datePublished": new Date().toISOString(), "dateModified": new Date().toISOString(),
// // // //       ...(isForSale && { "offers": { "@type": "Offer", "price": parsePriceToNumber(property.price), "priceCurrency": "IRR", "availability": "https://schema.org/InStock", "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] } }),
// // // //       ...(isForRent && { "offers": { "@type": "Offer", "price": parsePriceToNumber(property.mortgagePrice || property.rentPrice || '0'), "priceCurrency": "IRR", "description": "ملک رهن و اجاره" } }),
// // // //       "address": { "@type": "PostalAddress", "addressLocality": property.regionName, "streetAddress": property.address, "addressCountry": "IR", "addressRegion": "تهران" },
// // // //       "floorSize": { "@type": "QuantitativeValue", "value": property.area || 0, "unitCode": "MTK", "unitText": "متر مربع" },
// // // //       "numberOfRooms": property.rooms || 0,
// // // //       "additionalProperty": [{ "@type": "PropertyValue", "name": "طبقه", "value": `${property.floor || 1} از ${property.totalFloors || 1}` }, { "@type": "PropertyValue", "name": "سال ساخت", "value": property.year !== "نامشخص" ? property.year : "نامشخص" }, ...property.features.slice(0, 15).map(feature => ({ "@type": "PropertyValue", "name": "امکانات", "value": feature }))],
// // // //       "potentialAction": { "@type": "CommunicateAction", "name": "تماس با مشاور", "target": { "@type": "EntryPoint", "urlTemplate": `tel:${property.agent?.phone || ''}`, "inLanguage": "fa-IR", "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"] } }
// // // //     };
// // // //     const script = document.createElement('script');
// // // //     script.id = 'json-ld-structured-data';
// // // //     script.type = 'application/ld+json';
// // // //     script.textContent = JSON.stringify(structuredData);
// // // //     document.head.appendChild(script);
// // // //     return () => removeOldScript();
// // // //   }, [property, isForSale, isForRent]);
// // // //   return null;
// // // // };

// // // // const BreadcrumbStructuredData = ({ property, isForSale }) => {
// // // //   useEffect(() => {
// // // //     if (!property) return;
// // // //     const removeOldScript = () => { const oldScript = document.getElementById('json-ld-breadcrumb'); if (oldScript) oldScript.remove(); };
// // // //     removeOldScript();
// // // //     const baseUrl = window.location.origin;
// // // //     const regionSlug = encodeURIComponent(property.regionName || 'منطقه');
// // // //     const breadcrumbData = {
// // // //       "@context": "https://schema.org", "@type": "BreadcrumbList",
// // // //       "itemListElement": [
// // // //         { "@type": "ListItem", "position": 1, "name": "صفحه اصلی", "item": `${baseUrl}/` },
// // // //         { "@type": "ListItem", "position": 2, "name": isForSale ? "آپارتمان‌های فروش" : "آپارتمان‌های رهن و اجاره", "item": `${baseUrl}/${isForSale ? 'RealEstatePageDetail' : 'rent'}` },
// // // //         { "@type": "ListItem", "position": 3, "name": `منطقه ${property.regionName}`, "item": `${baseUrl}/region/${regionSlug}` },
// // // //         { "@type": "ListItem", "position": 4, "name": truncateText(property.title || 'جزئیات ملک', 80), "item": window.location.href }
// // // //       ]
// // // //     };
// // // //     const script = document.createElement('script');
// // // //     script.id = 'json-ld-breadcrumb';
// // // //     script.type = 'application/ld+json';
// // // //     script.textContent = JSON.stringify(breadcrumbData);
// // // //     document.head.appendChild(script);
// // // //     return () => removeOldScript();
// // // //   }, [property, isForSale]);
// // // //   return null;
// // // // };

// // // // // ============================================================
// // // // // ========== Skeleton ==========
// // // // // ============================================================
// // // // const DetailSkeleton = () => (
// // // //   <div className="detail-skeleton">
// // // //     <div className="skeleton-header"><div className="skeleton-circle"></div><div className="skeleton-title"></div><div className="skeleton-circle"></div></div>
// // // //     <div className="skeleton-gallery"><div className="skeleton-image"></div></div>
// // // //     <div className="skeleton-content"><div className="skeleton-price"></div><div className="skeleton-info">{[]}</div><div className="skeleton-tabs">{[]}</div><div className="skeleton-text">{[]}</div></div>
// // // //   </div>
// // // // );

// // // // // ============================================================
// // // // // ========== کامپوننت مودال لاگین/ثبت‌نام با کپچا ==========
// // // // // ============================================================
// // // // const LoginModal = ({ onClose }) => {
// // // //   const navigate = useNavigate();
  
// // // //   // ===== State‌ها =====
// // // //   const [step, setStep] = useState('phone'); // 'phone' | 'login' | 'register'
// // // //   const [phoneNumber, setPhoneNumber] = useState('');
// // // //   const [username, setUsername] = useState('');
// // // //   const [password, setPassword] = useState('');
// // // //   const [confirmPassword, setConfirmPassword] = useState('');
// // // //   const [error, setError] = useState('');
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [userExists, setUserExists] = useState(null);
  
// // // //   // ===== State کپچا =====
// // // //   const [captchaId, setCaptchaId] = useState('');
// // // //   const [captchaImage, setCaptchaImage] = useState('');
// // // //   const [captchaValue, setCaptchaValue] = useState('');
// // // //   const [captchaLoading, setCaptchaLoading] = useState(false);

// // // //   // ===== دریافت کپچا =====
// // // //   const fetchCaptcha = useCallback(async () => {
// // // //     setCaptchaLoading(true);
// // // //     try {
// // // //       const response = await fetch('https://localhost:7178/api/Auth/captcha', {
// // // //         method: 'GET',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //       });
      
// // // //       const result = await response.json();
// // // //       console.log('📦 کپچا دریافت شد:', result);
      
// // // //       if (result.captchaId && result.image) {
// // // //         setCaptchaId(result.captchaId);
// // // //         setCaptchaImage(result.image);
// // // //         setCaptchaValue('');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('❌ خطا در دریافت کپچا:', error);
// // // //     } finally {
// // // //       setCaptchaLoading(false);
// // // //     }
// // // //   }, []);

// // // //   // ===== دریافت کپچا هنگام باز شدن مودال =====
// // // //   useEffect(() => {
// // // //     fetchCaptcha();
// // // //   }, [fetchCaptcha]);

// // // //   // ===== تابع بررسی شماره موبایل با کپچا =====
// // // //   const checkPhoneNumber = async () => {
// // // //     // اعتبارسنجی شماره
// // // //     if (!phoneNumber || phoneNumber.length < 10) {
// // // //       setError('لطفاً شماره موبایل معتبر وارد کنید');
// // // //       return;
// // // //     }

// // // //     // اعتبارسنجی کپچا
// // // //     if (!captchaValue || captchaValue.length < 4) {
// // // //       setError('لطفاً کد امنیتی را وارد کنید');
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     setError('');
    
// // // //     try {
// // // //       console.log('📡 بررسی شماره با کپچا:', { phone: phoneNumber, captchaId, captchaValue });

// // // //       // ===== درخواست به API برای بررسی وجود کاربر =====
// // // //       const response = await fetch('https://localhost:7178/api/Auth/CheckUser', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify({
// // // //           mobile: phoneNumber,
// // // //           captchaId: captchaId,
// // // //           captchaValue: captchaValue
// // // //         }),
// // // //       });

// // // //       const result = await response.json();
// // // //       console.log('📦 نتیجه بررسی:', result);

// // // //       if (result.success === true) {
// // // //         // ✅ کاربر وجود دارد -> برو به مرحله لاگین
// // // //         setUserExists(true);
// // // //         setStep('login');
// // // //         setError('');
// // // //       } else if (result.success === false && result.message === 'کاربر یافت نشد') {
// // // //         // ❌ کاربر وجود ندارد -> برو به مرحله ثبت‌نام
// // // //         setUserExists(false);
// // // //         setStep('register');
// // // //         setError('');
// // // //       } else {
// // // //         // ❌ خطای دیگر (کپچا اشتباه، منقضی شده و...)
// // // //         setError(result.message || 'خطا در بررسی اطلاعات');
// // // //         fetchCaptcha(); // دریافت کپچای جدید
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('❌ خطا در بررسی شماره:', error);
// // // //       setError('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
// // // //       fetchCaptcha();
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // ===== تابع لاگین =====
// // // //   const handleLogin = async () => {
// // // //     if (!username || !password) {
// // // //       setError('لطفاً نام کاربری و رمز عبور را وارد کنید');
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     setError('');

// // // //     try {
// // // //       console.log('📡 درخواست لاگین:', { username, phone: phoneNumber });

// // // //       const response = await fetch('https://localhost:7178/api/Auth/Login', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify({
// // // //           username: username,
// // // //           password: password,
// // // //           phone: phoneNumber
// // // //         }),
// // // //       });

// // // //       const result = await response.json();
// // // //       console.log('📦 نتیجه لاگین:', result);

// // // //       if (result.status === 200 && result.data) {
// // // //         // ✅ لاگین موفق
// // // //         localStorage.setItem('auth_token', result.data.token);
// // // //         localStorage.setItem('user', JSON.stringify(result.data.user));
        
// // // //         // ارسال رویداد برای به‌روزرسانی وضعیت
// // // //         window.dispatchEvent(new Event('authChange'));
        
// // // //         onClose();
// // // //         // رفرش صفحه برای اعمال تغییرات
// // // //         window.location.reload();
// // // //       } else {
// // // //         setError(result.message || 'نام کاربری یا رمز عبور اشتباه است');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('❌ خطا در لاگین:', error);
// // // //       setError('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // ===== تابع ثبت‌نام =====
// // // //   const handleRegister = async () => {
// // // //     // اعتبارسنجی
// // // //     if (!username || username.length < 3) {
// // // //       setError('نام کاربری باید حداقل ۳ کاراکتر باشد');
// // // //       return;
// // // //     }
// // // //     if (!password || password.length < 6) {
// // // //       setError('رمز عبور باید حداقل ۶ کاراکتر باشد');
// // // //       return;
// // // //     }
// // // //     if (password !== confirmPassword) {
// // // //       setError('رمز عبور و تکرار آن مطابقت ندارند');
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     setError('');

// // // //     try {
// // // //       console.log('📡 درخواست ثبت‌نام:', { username, phone: phoneNumber });

// // // //       const response = await fetch('https://localhost:7178/api/Auth/Register', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify({
// // // //           username: username,
// // // //           password: password,
// // // //           phone: phoneNumber,
// // // //           name: username
// // // //         }),
// // // //       });

// // // //       const result = await response.json();
// // // //       console.log('📦 نتیجه ثبت‌نام:', result);

// // // //       if (result.status === 200 || result.status === 201) {
// // // //         // ✅ ثبت‌نام موفق
// // // //         // لاگین خودکار
// // // //         const loginResponse = await fetch('https://localhost:7178/api/Auth/Login', {
// // // //           method: 'POST',
// // // //           headers: {
// // // //             'Content-Type': 'application/json',
// // // //           },
// // // //           body: JSON.stringify({
// // // //             username: username,
// // // //             password: password,
// // // //             phone: phoneNumber
// // // //           }),
// // // //         });

// // // //         const loginResult = await loginResponse.json();

// // // //         if (loginResult.status === 200 && loginResult.data) {
// // // //           localStorage.setItem('auth_token', loginResult.data.token);
// // // //           localStorage.setItem('user', JSON.stringify(loginResult.data.user));
          
// // // //           window.dispatchEvent(new Event('authChange'));
// // // //           onClose();
// // // //           window.location.reload();
// // // //         } else {
// // // //           // ثبت‌نام موفق اما لاگین خودکار نشد
// // // //           setError('ثبت‌نام موفق بود. لطفاً وارد شوید.');
// // // //           setStep('login');
// // // //         }
// // // //       } else {
// // // //         setError(result.message || 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('❌ خطا در ثبت‌نام:', error);
// // // //       setError('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // ===== بازگشت به مرحله قبل =====
// // // //   const handleBack = () => {
// // // //     setStep('phone');
// // // //     setError('');
// // // //     setUserExists(null);
// // // //     setCaptchaValue('');
// // // //     fetchCaptcha();
// // // //   };

// // // //   // ===== رفتن به صفحه ثبت‌نام اصلی =====
// // // //   const goToRegisterPage = () => {
// // // //     onClose();
// // // //     navigate('/register', { 
// // // //       state: { 
// // // //         from: window.location.pathname,
// // // //         phone: phoneNumber
// // // //       } 
// // // //     });
// // // //   };

// // // //   // ============================================================
// // // //   // ===== رندر مرحله شماره موبایل با کپچا =====
// // // //   // ============================================================
// // // //   const renderPhoneStep = () => (
// // // //     <>
// // // //       <div className="modal-icon">
// // // //         <FaPhone className="modal-phone-icon" />
// // // //       </div>
      
// // // //       <h2 className="modal-title">ورود / ثبت‌نام</h2>
// // // //       <p className="modal-description">
// // // //         برای مشاهده شماره تماس مشاور،
// // // //         <br />
// // // //         لطفاً شماره موبایل خود را وارد کنید
// // // //       </p>

// // // //       <div className="phone-input-wrapper">
// // // //         <div className="phone-prefix">+98</div>
// // // //         <input
// // // //           type="tel"
// // // //           className="phone-input"
// // // //           placeholder=".۹۱۲۳۴۵۶۷۸۹"
// // // //           value={phoneNumber}
// // // //           onChange={(e) => {
// // // //             const value = e.target.value.replace(/\D/g, '');
// // // //             if (value.length <= 11) {
// // // //               setPhoneNumber(value);
// // // //             }
// // // //           }}
// // // //           maxLength="11"
// // // //           autoFocus
// // // //           onKeyDown={(e) => {
// // // //             if (e.key === 'Enter') {
// // // //               checkPhoneNumber();
// // // //             }
// // // //           }}
// // // //         />
// // // //       </div>

// // // //       {/* ===== بخش کپچا ===== */}
// // // //       <div className="captcha-container">
// // // //         <div className="captcha-image-wrapper">
// // // //           {captchaLoading ? (
// // // //             <div className="captcha-loading">
// // // //               <FaSpinner className="spinner" />
// // // //             </div>
// // // //           ) : (
// // // //             <img 
// // // //               src={captchaImage} 
// // // //               alt="کد امنیتی" 
// // // //               className="captcha-image"
// // // //             />
// // // //           )}
// // // //           <button 
// // // //             className="captcha-refresh-btn"
// // // //             onClick={fetchCaptcha}
// // // //             disabled={captchaLoading}
// // // //             title="تغییر کد امنیتی"
// // // //           >
// // // //             <FaSync className={captchaLoading ? 'spinner' : ''} />
// // // //           </button>
// // // //         </div>
        
// // // //         <input
// // // //           type="text"
// // // //           className="captcha-input"
// // // //           placeholder="کد امنیتی را وارد کنید"
// // // //           value={captchaValue}
// // // //           onChange={(e) => {
// // // //             const value = e.target.value.replace(/\D/g, '');
// // // //             if (value.length <= 4) {
// // // //               setCaptchaValue(value);
// // // //             }
// // // //           }}
// // // //           maxLength="4"
// // // //           onKeyDown={(e) => {
// // // //             if (e.key === 'Enter') {
// // // //               checkPhoneNumber();
// // // //             }
// // // //           }}
// // // //         />
// // // //       </div>

// // // //       {error && <div className="error-message-text">{error}</div>}

// // // //       <button 
// // // //         className="modal-submit-btn"
// // // //         onClick={checkPhoneNumber}
// // // //         disabled={loading || phoneNumber.length < 10 || captchaValue.length < 4}
// // // //       >
// // // //         {loading ? (
// // // //           <>
// // // //             <FaSpinner className="spinner" />
// // // //             در حال بررسی...
// // // //           </>
// // // //         ) : (
// // // //           <>
// // // //             ادامه
// // // //             <FaArrowRight />
// // // //           </>
// // // //         )}
// // // //       </button>

// // // //       <p className="modal-footer-text">
// // // //         با ادامه، شما با <a href="/terms">قوانین</a> موافقت می‌کنید
// // // //       </p>
// // // //     </>
// // // //   );

// // // //   // ============================================================
// // // //   // ===== رندر مرحله لاگین =====
// // // //   // ============================================================
// // // //   const renderLoginStep = () => (
// // // //     <>
// // // //       <button className="modal-back-btn" onClick={handleBack}>
// // // //         ← بازگشت
// // // //       </button>

// // // //       <div className="modal-icon">
// // // //         <FaUser className="modal-login-icon" />
// // // //       </div>
      
// // // //       <h2 className="modal-title">خوش آمدید</h2>
// // // //       <p className="modal-description">
// // // //         شماره <strong>{phoneNumber}</strong> در سامانه ثبت شده است
// // // //         <br />
// // // //         لطفاً وارد شوید
// // // //       </p>

// // // //       <div className="input-group">
// // // //         <div className="input-wrapper">
// // // //           <FaUser className="input-icon" />
// // // //           <input
// // // //             type="text"
// // // //             className="modal-input"
// // // //             placeholder="نام کاربری"
// // // //             value={username}
// // // //             onChange={(e) => setUsername(e.target.value)}
// // // //             onKeyDown={(e) => {
// // // //               if (e.key === 'Enter') {
// // // //                 handleLogin();
// // // //               }
// // // //             }}
// // // //           />
// // // //         </div>

// // // //         <div className="input-wrapper">
// // // //           <FaLock className="input-icon" />
// // // //           <input
// // // //             type="password"
// // // //             className="modal-input"
// // // //             placeholder="رمز عبور"
// // // //             value={password}
// // // //             onChange={(e) => setPassword(e.target.value)}
// // // //             onKeyDown={(e) => {
// // // //               if (e.key === 'Enter') {
// // // //                 handleLogin();
// // // //               }
// // // //             }}
// // // //           />
// // // //         </div>
// // // //       </div>

// // // //       {error && <div className="error-message-text">{error}</div>}

// // // //       <button 
// // // //         className="modal-submit-btn"
// // // //         onClick={handleLogin}
// // // //         disabled={loading || !username || !password}
// // // //       >
// // // //         {loading ? (
// // // //           <>
// // // //             <FaSpinner className="spinner" />
// // // //             در حال ورود...
// // // //           </>
// // // //         ) : (
// // // //           <>
// // // //             ورود
// // // //             <FaArrowRight />
// // // //           </>
// // // //         )}
// // // //       </button>

// // // //       <button className="modal-guest-btn" onClick={onClose}>
// // // //         ادامه به عنوان مهمان
// // // //       </button>
// // // //     </>
// // // //   );

// // // //   // ============================================================
// // // //   // ===== رندر مرحله ثبت‌نام =====
// // // //   // ============================================================
// // // //   const renderRegisterStep = () => (
// // // //     <>
// // // //       <button className="modal-back-btn" onClick={handleBack}>
// // // //         ← بازگشت
// // // //       </button>

// // // //       <div className="modal-icon">
// // // //         <FaUser className="modal-register-icon" />
// // // //       </div>
      
// // // //       <h2 className="modal-title">ثبت‌نام</h2>
// // // //       <p className="modal-description">
// // // //         شماره <strong>{phoneNumber}</strong> در سامانه ثبت نشده است
// // // //         <br />
// // // //         لطفاً ثبت‌نام کنید
// // // //       </p>

// // // //       <div className="input-group">
// // // //         <div className="input-wrapper">
// // // //           <FaUser className="input-icon" />
// // // //           <input
// // // //             type="text"
// // // //             className="modal-input"
// // // //             placeholder="نام کاربری (حداقل ۳ کاراکتر)"
// // // //             value={username}
// // // //             onChange={(e) => setUsername(e.target.value)}
// // // //             onKeyDown={(e) => {
// // // //               if (e.key === 'Enter') {
// // // //                 handleRegister();
// // // //               }
// // // //             }}
// // // //           />
// // // //         </div>

// // // //         <div className="input-wrapper">
// // // //           <FaLock className="input-icon" />
// // // //           <input
// // // //             type="password"
// // // //             className="modal-input"
// // // //             placeholder="رمز عبور (حداقل ۶ کاراکتر)"
// // // //             value={password}
// // // //             onChange={(e) => setPassword(e.target.value)}
// // // //             onKeyDown={(e) => {
// // // //               if (e.key === 'Enter') {
// // // //                 handleRegister();
// // // //               }
// // // //             }}
// // // //           />
// // // //         </div>

// // // //         <div className="input-wrapper">
// // // //           <FaCheckCircle className="input-icon" />
// // // //           <input
// // // //             type="password"
// // // //             className="modal-input"
// // // //             placeholder="تکرار رمز عبور"
// // // //             value={confirmPassword}
// // // //             onChange={(e) => setConfirmPassword(e.target.value)}
// // // //             onKeyDown={(e) => {
// // // //               if (e.key === 'Enter') {
// // // //                 handleRegister();
// // // //               }
// // // //             }}
// // // //           />
// // // //         </div>
// // // //       </div>

// // // //       {error && <div className="error-message-text">{error}</div>}

// // // //       <button 
// // // //         className="modal-submit-btn"
// // // //         onClick={handleRegister}
// // // //         disabled={loading || !username || !password || !confirmPassword}
// // // //       >
// // // //         {loading ? (
// // // //           <>
// // // //             <FaSpinner className="spinner" />
// // // //             در حال ثبت‌نام...
// // // //           </>
// // // //         ) : (
// // // //           <>
// // // //             ثبت‌نام
// // // //             <FaArrowRight />
// // // //           </>
// // // //         )}
// // // //       </button>

// // // //       <button 
// // // //         className="modal-guest-btn" 
// // // //         onClick={goToRegisterPage}
// // // //       >
// // // //         ثبت‌نام کامل در صفحه جداگانه
// // // //       </button>
// // // //     </>
// // // //   );

// // // //   // ============================================================
// // // //   // ===== رندر اصلی =====
// // // //   // ============================================================
// // // //   return (
// // // //     <div className="login-modal-overlay" onClick={onClose}>
// // // //       <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
// // // //         <button className="modal-close-btn" onClick={onClose}>✕</button>
        
// // // //         {step === 'phone' && renderPhoneStep()}
// // // //         {step === 'login' && renderLoginStep()}
// // // //         {step === 'register' && renderRegisterStep()}
        
// // // //         <div className="modal-benefits-mini">
// // // //           <span>✅ ثبت‌نام رایگان</span>
// // // //           <span>🔒 امن و مطمئن</span>
// // // //           <span>⚡ کمتر از ۱ دقیقه</span>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // // ============================================================
// // // // // ========== کامپوننت اصلی ==========
// // // // // ============================================================
// // // // const RealEstateDetailPageItem = memo(() => {
// // // //   const location = useLocation();
// // // //   const navigate = useNavigate();
// // // //   const { id: paramId } = useParams();
// // // //   const queryParams = new URLSearchParams(location.search);
// // // //   const id = paramId || queryParams.get('id');
  
// // // //   const [property, setProperty] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [copied, setCopied] = useState(false);
// // // //   const [selectedImage, setSelectedImage] = useState(0);
// // // //   const [activeTab, setActiveTab] = useState('details');
// // // //   const [isFavorite, setIsFavorite] = useState(false);
// // // //   const [imagesLoaded, setImagesLoaded] = useState({});
// // // //   const [showStoryPopup, setShowStoryPopup] = useState(false);
// // // //   const [storyUserId, setStoryUserId] = useState(null);
  
// // // //   // ===== STATE برای لاگین و مودال =====
// // // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // // //   const [showLoginModal, setShowLoginModal] = useState(false);

// // // //   // ===== بررسی لاگین =====
// // // //   useEffect(() => {
// // // //     const checkLogin = () => {
// // // //       const token = localStorage.getItem('auth_token');
// // // //       if (token) {
// // // //         setIsLoggedIn(true);
// // // //       } else {
// // // //         setIsLoggedIn(false);
// // // //       }
// // // //     };
    
// // // //     checkLogin();
    
// // // //     // گوش دادن به تغییرات
// // // //     window.addEventListener('authChange', checkLogin);
// // // //     window.addEventListener('storage', checkLogin);
    
// // // //     return () => {
// // // //       window.removeEventListener('authChange', checkLogin);
// // // //       window.removeEventListener('storage', checkLogin);
// // // //     };
// // // //   }, []);

// // // //   // ============================================================
// // // //   // ===== دریافت اطلاعات ملک =====
// // // //   // ============================================================
// // // //   useEffect(() => {
// // // //     const fetchPropertyData = async () => {
// // // //       if (!id) { setError('شناسه ملک یافت نشد'); setLoading(false); return; }
// // // //       setLoading(true); setError(null);
// // // //       try {
// // // //         const controller = new AbortController();
// // // //         const timeoutId = setTimeout(() => controller.abort(), 10000);
// // // //         const response = await fetch(`https://localhost:7178/api/RealEstatePage/GetRealEstateDetails?id=${id}`, { signal: controller.signal });
// // // //         clearTimeout(timeoutId);
// // // //         if (!response.ok) throw new Error(`HTTP ${response.status}`);
// // // //         const result = await response.json();
        
// // // //         console.log('📦 Full API response:', result);
        
// // // //         if (result.status === 200 && result.data) {
// // // //           const data = result.data;
          
// // // //           const agentImage = data.agents?.image 
// // // //             ? `https://localhost:7178/${data.agents.image}` 
// // // //             : "https://randomuser.me/api/portraits/men/32.jpg";
          
// // // //           const userId = data.agents?.userId || null;
// // // //           const hasStory = data.agents?.hasStory || false;
          
// // // //           console.log('👤 Agent UserId:', userId);
// // // //           console.log('📱 HasStory:', hasStory);
          
// // // //           setStoryUserId(hasStory ? userId : null);
          
// // // //           setProperty({
// // // //             id: data.id, 
// // // //             title: data.title || `ملک در ${data.regionName || 'منطقه'} `, 
// // // //             price: data.price?.toLocaleString("fa-IR") || "۰",
// // // //             priceMeter: data.priceMeter?.toLocaleString("fa-IR") || "۰", 
// // // //             rentPrice: data.rent?.toLocaleString("fa-IR") || null,
// // // //             depositPrice: data.deposit?.toLocaleString("fa-IR") || null, 
// // // //             mortgagePrice: data.mortgagePrice?.toLocaleString("fa-IR") || null,
// // // //             type: data.categoryType, 
// // // //             area: parseInt(data.additionalInformation?.match(/\d+/)?.[0]) || 0, 
// // // //             rooms: data.rooms || 0,
// // // //             floor: data.floor || 1, 
// // // //             regionName: data.regionName || "منطقه نامشخص", 
// // // //             totalFloors: data.countFloor || 1,
// // // //             year: data.constructionYear || "نامشخص", 
// // // //             address: data.address || "آدرس درج نشده", 
// // // //             showExactLocation: data.showExactLocation,
// // // //             location: { lat: data.lat || 35.7199363, lng: data.lng || 51.4334842 },
// // // //             description: data.descriptionRows || "توضیحاتی برای این ملک ثبت نشده است.", 
// // // //             features: data.facilities || [],
// // // //             warnings: data.warnings || ["استعلام خلافی", "بررسی سند مالکیت", "استعلام پایان کار", "بررسی مفاصا حساب"],
// // // //             images: (data.images || []).map(img => `https://localhost:7178/${img}`),
// // // //             agent: { 
// // // //               name: data.agents?.name || "مشاور املاک", 
// // // //               phone: data.agents?.phone || "۰۲۱۹۱۰۰۰۰۰۰", 
// // // //               whatsapp: data.agents?.connectSocialMedia || "", 
// // // //               address: data.agents?.address || "آدرس دفتر درج نشده", 
// // // //               rating: data.agents?.rating || 4.5, 
// // // //               deals: data.agents?.deals || 120, 
// // // //               image: agentImage,
// // // //               hasStory: hasStory,
// // // //               userId: userId
// // // //             },
// // // //             views: data.views || 0, 
// // // //             saved: data.saved || 0, 
// // // //             createdAt: data.createdAtPersianRelative || "امروز", 
// // // //             certificate: data.isHasLoan ? "قابل وام" : "سند رسمی", 
// // // //             mortgage: data.isHasLoan ? "امکان وام" : "بدون وام",
// // // //             nearby: [{ name: "مترو", distance: "۵۰۰ متر" }, { name: "مرکز خرید", distance: "۳۰۰ متر" }, { name: "پارک", distance: "۲۰۰ متر" }, { name: "مدرسه", distance: "۴۰۰ متر" }]
// // // //           });
// // // //         } else throw new Error(result.message || 'ملک یافت نشد');
// // // //       } catch (error) { 
// // // //         console.error('خطا:', error); 
// // // //         setError(error.name === 'AbortError' ? 'مدت زمان درخواست به پایان رسید' : 'مشکل در ارتباط با سرور'); 
// // // //       } finally { 
// // // //         setLoading(false); 
// // // //       }
// // // //     };
// // // //     fetchPropertyData();
// // // //     window.scrollTo({ top: 0, behavior: 'smooth' });
// // // //   }, [id]);

// // // //   // ============================================================
// // // //   // ===== توابع تماس با قفل لاگین =====
// // // //   // ============================================================
// // // //   const handlePhoneClick = useCallback(() => {
// // // //     if (!isLoggedIn) {
// // // //       setShowLoginModal(true);
// // // //       return;
// // // //     }
// // // //     if (!property?.agent?.phone) {
// // // //       alert('شماره تماس در دسترس نیست');
// // // //       return;
// // // //     }
// // // //     navigator.clipboard.writeText(property.agent.phone);
// // // //     setCopied(true);
// // // //     setTimeout(() => setCopied(false), 2000);
// // // //   }, [isLoggedIn, property]);

// // // //   const handleWhatsAppClick = useCallback(() => {
// // // //     if (!isLoggedIn) {
// // // //       setShowLoginModal(true);
// // // //       return;
// // // //     }
// // // //     if (!property?.agent?.whatsapp) {
// // // //       alert('شماره واتساپ در دسترس نیست');
// // // //       return;
// // // //     }
// // // //     window.open(`https://wa.me/${property.agent.whatsapp.replace(/\s/g, '')}`, '_blank');
// // // //   }, [isLoggedIn, property]);

// // // //   // ============================================================
// // // //   // ===== سایر توابع =====
// // // //   // ============================================================
// // // //   const isForSale = useMemo(() => property?.type === 1, [property]);
// // // //   const isForRent = useMemo(() => property?.type === 2, [property]);
// // // //   const formattedPricePerMeter = useMemo(() => { if (!property?.priceMeter || property.priceMeter === "۰") return null; return `${property.priceMeter} تومان`; }, [property]);
// // // //   const shareUrl = useMemo(() => window.location.href, []);

// // // //   const handleCopyLink = useCallback(() => { navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }, [shareUrl]);
// // // //   const handleShare = useCallback(async () => { if (!property) return; const shareData = { title: property.title, text: `${property.title} - ${property.area} متری - ${isForSale ? `قیمت ${property.price}` : `رهن ${property.mortgagePrice}`} تومان`, url: shareUrl }; if (navigator.share && /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)) { try { await navigator.share(shareData); } catch (error) { if (error.name !== 'AbortError') handleCopyLink(); } } else handleCopyLink(); }, [property, isForSale, shareUrl, handleCopyLink]);
// // // //   const handleImageLoad = useCallback((index) => { setImagesLoaded(prev => ({ ...prev, [index]: true })); }, []);
// // // //   const handleFavoriteToggle = useCallback(() => { setIsFavorite(prev => !prev); }, []);
  
// // // //   const goToProfile = useCallback(() => {
// // // //     if (property?.agent?.userId) {
// // // //       console.log('👤 رفتن به پروفایل کاربر:', property.agent.userId);
// // // //       navigate(`/profile/${property.agent.userId}`);
// // // //     }
// // // //   }, [property, navigate]);

// // // //   const handleStoryClick = useCallback((e) => {
// // // //     if (e) {
// // // //       e.stopPropagation();
// // // //     }
    
// // // //     console.log('🖱️ کلیک روی استوری');
// // // //     console.log('🆔 storyUserId:', storyUserId);
// // // //     console.log('📱 hasStory:', property?.agent?.hasStory);
    
// // // //     if (storyUserId) {
// // // //       console.log('✅ باز کردن استوری برای userId:', storyUserId);
// // // //       setShowStoryPopup(true);
// // // //       document.body.style.overflow = 'hidden';
// // // //     } else {
// // // //       console.log('❌ این کاربر استوری ندارد');
// // // //     }
// // // //   }, [storyUserId, property]);

// // // //   const handleStoryClose = useCallback(() => {
// // // //     setShowStoryPopup(false);
// // // //     document.body.style.overflow = '';
// // // //   }, []);

// // // //   const handleLoginModalClose = useCallback(() => {
// // // //     setShowLoginModal(false);
// // // //     // بعد از بستن مودال، دوباره وضعیت لاگین رو بررسی کن
// // // //     const token = localStorage.getItem('auth_token');
// // // //     if (token) {
// // // //       setIsLoggedIn(true);
// // // //     }
// // // //   }, []);

// // // //   // ============================================================
// // // //   // ===== رندر =====
// // // //   // ============================================================
// // // //   if (error) return ( 
// // // //     <> 
// // // //       <PageMetadata property={null} /> 
// // // //       <div className="detail-container realestate-detail">
// // // //         <div className="detail-header">
// // // //           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
// // // //           <h1 className="header-title">خطا</h1>
// // // //           <div className="header-btn"></div>
// // // //         </div>
// // // //         <div className="error-message">
// // // //           <h2>متاسفانه خطایی رخ داده است</h2>
// // // //           <p>{error}</p>
// // // //           <button onClick={() => window.location.reload()}>تلاش مجدد</button>
// // // //           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
// // // //         </div>
// // // //       </div>
// // // //     </> 
// // // //   );
  
// // // //   if (loading) return <DetailSkeleton />;
  
// // // //   if (!property) return ( 
// // // //     <> 
// // // //       <PageMetadata property={null} /> 
// // // //       <div className="detail-container realestate-detail">
// // // //         <div className="detail-header">
// // // //           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
// // // //           <h1 className="header-title">ملک یافت نشد</h1>
// // // //           <div className="header-btn"></div>
// // // //         </div>
// // // //         <div className="error-message">
// // // //           <p>متاسفانه ملک مورد نظر یافت نشد</p>
// // // //           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
// // // //         </div>
// // // //       </div>
// // // //     </> 
// // // //   );

// // // //   return ( 
// // // //     <>
// // // //       <PageMetadata property={property} isForSale={isForSale} isForRent={isForRent} />
// // // //       <StructuredData property={property} isForSale={isForSale} isForRent={isForRent} />
// // // //       <BreadcrumbStructuredData property={property} isForSale={isForSale} />
      
// // // //       {/* ===== پاپ‌آپ استوری ===== */}
// // // //       {showStoryPopup && (
// // // //         <StoryPopup 
// // // //           agentName={property.agent.name}
// // // //           agentImage={property.agent.image}
// // // //           userId={storyUserId}
// // // //           onClose={handleStoryClose}
// // // //         />
// // // //       )}

// // // //       {/* ===== مودال لاگین/ثبت‌نام ===== */}
// // // //       {showLoginModal && (
// // // //         <LoginModal 
// // // //           onClose={handleLoginModalClose}
// // // //         />
// // // //       )}
      
// // // //       <div className="detail-container realestate-detail">
// // // //         <nav className="breadcrumb-nav">
// // // //           <ol className="breadcrumb-list">
// // // //             <li className="breadcrumb-item"><a href="/">خانه</a></li>
// // // //             <li className="breadcrumb-item"><a href={isForSale ? '/sale' : '/rent'}>{isForSale ? 'فروش آپارتمان' : 'رهن و اجاره آپارتمان'}</a></li>
// // // //             <li className="breadcrumb-item"><a href={`/region/${encodeURIComponent(property.regionName)}`}>منطقه {property.regionName}</a></li>
// // // //             <li className="breadcrumb-item active">{truncateText(property.title, 50)}</li>
// // // //           </ol>
// // // //         </nav>
        
// // // //         <div className="detail-header">
// // // //           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
// // // //           <h1 className="header-title">{property.title}</h1>
// // // //           <button className="header-btn" onClick={handleShare}><FaShare /></button>
// // // //         </div>
        
// // // //         <div className="detail-gallery">
// // // //           <Swiper 
// // // //             modules={[Navigation, Pagination, Autoplay]} 
// // // //             navigation 
// // // //             pagination={{ clickable: true }} 
// // // //             autoplay={{ delay: 4000, disableOnInteraction: false }} 
// // // //             spaceBetween={0} 
// // // //             slidesPerView={1} 
// // // //             onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)} 
// // // //             className="gallery-swiper"
// // // //           >
// // // //             {property.images.length > 0 ? 
// // // //               property.images.map((img, index) => (
// // // //                 <SwiperSlide key={index}>
// // // //                   <div className="gallery-slide">
// // // //                     {!imagesLoaded[index] && <div className="image-placeholder"><FaHome /></div>}
// // // //                     <img 
// // // //                       src={img} 
// // // //                       alt={`${property.title} - ${index === 0 ? 'نمای اصلی' : `تصویر ${index + 1}`}`} 
// // // //                       loading={index === 0 ? 'eager' : 'lazy'} 
// // // //                       onLoad={() => handleImageLoad(index)} 
// // // //                       style={{ display: imagesLoaded[index] ? 'block' : 'none' }} 
// // // //                     />
// // // //                   </div>
// // // //                 </SwiperSlide>
// // // //               )) : 
// // // //               (<SwiperSlide>
// // // //                 <div className="gallery-slide no-image">
// // // //                   <FaHome />
// // // //                   <span>تصویری موجود نیست</span>
// // // //                 </div>
// // // //               </SwiperSlide>)
// // // //             }
// // // //           </Swiper>
// // // //           <button className={`favorite-btn ${isFavorite ? 'active' : ''}`} onClick={handleFavoriteToggle}>
// // // //             {isFavorite ? <FaHeart /> : <FaRegHeart />}
// // // //           </button>
// // // //           <div className="image-counter">{selectedImage + 1} / {property.images.length || 1}</div>
// // // //         </div>
        
// // // //         <div className="detail-main">
// // // //           <div className="detail-title-section">
// // // //             <div className="title-row">
// // // //               <div className="property-stats">
// // // //                 <span className="stat-badge"><FaEye /> {property.views.toLocaleString('fa-IR')} بازدید</span>
// // // //                 <span className="stat-badge"><FaBookmark /> {property.saved.toLocaleString('fa-IR')} ذخیره</span>
// // // //                 <span className="stat-badge"><FaClock /> {property.createdAt}</span>
// // // //               </div>
// // // //             </div>
// // // //           </div>
          
// // // //           <div className="price-section">
// // // //             {isForSale && (
// // // //               <div className="price-card sale-price">
// // // //                 <div className="price-card-icon"><FaTag /></div>
// // // //                 <div className="price-card-content">
// // // //                   <span className="price-label">قیمت فروش</span>
// // // //                   <div className="price-value-wrapper">
// // // //                     <span className="price-number">{property.price}</span>
// // // //                     <span className="price-unit">تومان</span>
// // // //                   </div>
// // // //                   {formattedPricePerMeter && 
// // // //                     <div className="price-meta">
// // // //                       <FaRuler />
// // // //                       <span>متری {formattedPricePerMeter}</span>
// // // //                     </div>
// // // //                   }
// // // //                 </div>
// // // //               </div>
// // // //             )}
            
// // // //             {isForRent && (
// // // //               <div className="rent-price-group">
// // // //                 {property.mortgagePrice && property.mortgagePrice !== "۰" && (
// // // //                   <div className="price-card mortgage-price">
// // // //                     <div className="price-card-icon"><FaBuilding /></div>
// // // //                     <div className="price-card-content">
// // // //                       <span className="price-label">مبلغ رهن</span>
// // // //                       <div className="price-value-wrapper">
// // // //                         <span className="price-number">{property.mortgagePrice}</span>
// // // //                         <span className="price-unit">تومان</span>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 )}
// // // //                 {property.rentPrice && property.rentPrice !== "۰" && (
// // // //                   <div className="price-card rent-price">
// // // //                     <div className="price-card-icon"><FaHome /></div>
// // // //                     <div className="price-card-content">
// // // //                       <span className="price-label">اجاره ماهانه</span>
// // // //                       <div className="price-value-wrapper">
// // // //                         <span className="price-number">{property.rentPrice}</span>
// // // //                         <span className="price-unit">تومان</span>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             )}
// // // //           </div>
          
// // // //           <div className="quick-specs">
// // // //             <div className="spec-item">
// // // //               <FaRulerCombined />
// // // //               <span className="spec-label">متراژ</span>
// // // //               <span className="spec-value">{property.area} متر²</span>
// // // //             </div>
// // // //             <div className="spec-item">
// // // //               <FaBath />
// // // //               <span className="spec-label">اتاق‌خواب</span>
// // // //               <span className="spec-value">{property.rooms} خواب</span>
// // // //             </div>
// // // //             <div className="spec-item">
// // // //               <FaLayerGroup />
// // // //               <span className="spec-label">طبقه</span>
// // // //               <span className="spec-value">{property.floor} از {property.totalFloors}</span>
// // // //             </div>
// // // //             <div className="spec-item">
// // // //               <FaCalendarAlt />
// // // //               <span className="spec-label">سال ساخت</span>
// // // //               <span className="spec-value">{property.year}</span>
// // // //             </div>
// // // //           </div>
          
// // // //           <div className="info-chips">
// // // //             <span className="info-chip">کد ملک: {property.id}</span>
// // // //             <span className="info-chip"><FaShieldAlt /> {property.certificate}</span>
// // // //             <span className="info-chip type-chip">{isForSale ? 'فروش' : 'رهن و اجاره'}</span>
// // // //           </div>
          
// // // //           <div className="detail-tabs">
// // // //             <button className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`} onClick={() => setActiveTab('details')}>جزئیات ملک</button>
// // // //             <button className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`} onClick={() => setActiveTab('features')}>امکانات ({property.features.length})</button>
// // // //             <button className={`tab-btn ${activeTab === 'warnings' ? 'active' : ''}`} onClick={() => setActiveTab('warnings')}>هشدارهای معامله</button>
// // // //             <button className={`tab-btn ${activeTab === 'nearby' ? 'active' : ''}`} onClick={() => setActiveTab('nearby')}>امکانات اطراف</button>
// // // //           </div>
          
// // // //           <div className="tab-content">
// // // //             {activeTab === 'details' && (
// // // //               <div className="details-tab">
// // // //                 <div className="address-card">
// // // //                   <FaMapMarkerAlt />
// // // //                   <div className="address-info">
// // // //                     <h3>آدرس ملک</h3>
// // // //                     <div>منطقه {property.regionName}</div>
// // // //                     <p>{property.address}</p>
// // // //                     <span className="post-date">تاریخ درج: {property.createdAt}</span>
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="description-card">
// // // //                   <h3>توضیحات کامل {property.title}</h3>
// // // //                   <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(property.description, { ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'a', 'blockquote'], ALLOWED_ATTR: ['href', 'target'] }) }} />
// // // //                 </div>
// // // //                 <div className="map-card">
// // // //                   <h3><FaMapMarkerAlt /> موقعیت مکانی ملک در منطقه {property.regionName}</h3>
// // // //                   <div className="map-location-badge">
// // // //                     {property.showExactLocation ? 
// // // //                       <span className="badge exact">📍 نمایش موقعیت دقیق ملک</span> : 
// // // //                       <span className="badge approximate">🔵 نمایش محدوده تقریبی</span>
// // // //                     }
// // // //                   </div>
// // // //                   <div className="map-container">
// // // //                     <NeshanMap 
// // // //                       mapKey="web.31c5ea6c425e40cc9b30620a84a8be90" 
// // // //                       center={{ latitude: property.location.lat, longitude: property.location.lng }} 
// // // //                       zoom={property.showExactLocation ? 17 : 15.9} 
// // // //                       defaultType="dreamy" 
// // // //                       poi={true} 
// // // //                       traffic={false} 
// // // //                       style={{ height: '100%', width: '100%', pointerEvents: 'none' }} 
// // // //                     />
// // // //                     <div className="map-marker-overlay">
// // // //                       {property.showExactLocation ? 
// // // //                         <><div className="location-dot"></div><div className="location-ripple"></div></> : 
// // // //                         <div className="location-circles"><div className="circle-3"></div></div>
// // // //                       }
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="map-privacy-note">
// // // //                     <small>{property.showExactLocation ? '📍 موقعیت دقیق ملک' : '📍 محدوده تقریبی ملک'}</small>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             )}
            
// // // //             {activeTab === 'features' && (
// // // //               <div className="features-tab">
// // // //                 <h3>امکانات و ویژگی‌ها</h3>
// // // //                 <div className="features-grid">
// // // //                   {property.features.length > 0 ? 
// // // //                     property.features.map((feature, idx) => {
// // // //                       let Icon = FaCheckCircle;
// // // //                       if (feature.includes('پارکینگ')) Icon = FaParking;
// // // //                       else if (feature.includes('انباری')) Icon = FaWarehouse;
// // // //                       else if (feature.includes('آسانسور')) Icon = FaArrowUp;
// // // //                       else if (feature.includes('استخر')) Icon = FaSwimmingPool;
// // // //                       return (
// // // //                         <div key={idx} className="feature-card">
// // // //                           <Icon />
// // // //                           <span>{feature}</span>
// // // //                         </div>
// // // //                       );
// // // //                     }) : 
// // // //                     <p className="no-data">امکاناتی ثبت نشده است</p>
// // // //                   }
// // // //                 </div>
// // // //               </div>
// // // //             )}
            
// // // //             {activeTab === 'warnings' && (
// // // //               <div className="warnings-tab">
// // // //                 <h3>⚠️ هشدارهای مهم</h3>
// // // //                 <ul className="warnings-list">
// // // //                   {property.warnings.map((w, idx) => (
// // // //                     <li key={idx} className="warning-item">
// // // //                       <span className="warning-bullet"></span>
// // // //                       <span>{w}</span>
// // // //                     </li>
// // // //                   ))}
// // // //                 </ul>
// // // //                 <div className="warning-footer">
// // // //                   <p>⚠️ قبل از معامله مدارک را بررسی کنید</p>
// // // //                 </div>
// // // //               </div>
// // // //             )}
            
// // // //             {activeTab === 'nearby' && (
// // // //               <div className="nearby-tab">
// // // //                 <h3>امکانات اطراف</h3>
// // // //                 <div className="nearby-list">
// // // //                   {property.nearby.map((item, idx) => (
// // // //                     <div key={idx} className="nearby-item">
// // // //                       <span className="nearby-name">{item.name}</span>
// // // //                       <span className="nearby-distance">{item.distance}</span>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               </div>
// // // //             )}
// // // //           </div>
          
// // // //           {/* ============================================================ */}
// // // //           {/* ========== کارت مشاور با دکمه‌های قفل شده ========== */}
// // // //           {/* ============================================================ */}
// // // //           <div className="agent-card">
// // // //             <div className="agent-header">
// // // //               {/* آواتار */}
// // // //               <div 
// // // //                 className={`agent-avatar-wrapper ${property.agent.hasStory ? 'has-story' : ''}`}
// // // //                 style={{ 
// // // //                   position: 'relative',
// // // //                   display: 'inline-block',
// // // //                   flexShrink: 0,
// // // //                   cursor: property.agent.userId ? 'pointer' : 'default'
// // // //                 }}
// // // //                 onClick={property.agent.userId ? goToProfile : undefined}
// // // //               >
// // // //                 <SafeImage 
// // // //                   src={property.agent.image} 
// // // //                   alt={property.agent.name} 
// // // //                   className={`agent-avatar ${property.agent.hasStory ? 'has-story' : ''}`}
// // // //                   fallbackSrc="https://randomuser.me/api/portraits/men/32.jpg"
// // // //                 />
                
// // // //                 {property.agent.hasStory && (
// // // //                   <div 
// // // //                     className="story-ring-indicator"
// // // //                     onClick={(e) => {
// // // //                       e.stopPropagation();
// // // //                       handleStoryClick(e);
// // // //                     }}
// // // //                   >
// // // //                     {/* <div className="story-ring-gradient"></div> */}
// // // //                   </div>
// // // //                 )}
// // // //               </div>
              
// // // //               <div className="agent-info">
// // // //                 <div className="agent-name-wrapper">
// // // //                   <h3 
// // // //                     style={{ cursor: property.agent.userId ? 'pointer' : 'default' }}
// // // //                     onClick={property.agent.userId ? goToProfile : undefined}
// // // //                   >
// // // //                     {property.agent.name}
// // // //                   </h3>
                  
// // // //                   {property.agent.hasStory && (
// // // //                     <span 
// // // //                       className="story-label" 
// // // //                       onClick={(e) => {
// // // //                         e.stopPropagation();
// // // //                         handleStoryClick(e);
// // // //                       }}
// // // //                       style={{ cursor: 'pointer' }}
// // // //                     >
// // // //                       <span className="story-dot"></span>
// // // //                       استوری
// // // //                     </span>
// // // //                   )}
// // // //                 </div>
// // // //                 <p>{property.agent.address}</p>
// // // //                 <div className="agent-rating">
// // // //                   <FaStar />
// // // //                   <span>{property.agent.rating}</span>
// // // //                   <span>({property.agent.deals} معامله)</span>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
            
// // // //             {/* ============================================================ */}
// // // //             {/* ===== دکمه‌های تماس با شرط لاگین ===== */}
// // // //             {/* ============================================================ */}
// // // //             <div className="agent-actions-wrapper">
              
// // // //               {/* دکمه تماس تلفنی */}
// // // //               <button 
// // // //                 className={`agent-action-btn phone ${!isLoggedIn ? 'locked' : ''}`}
// // // //                 onClick={handlePhoneClick}
// // // //               >
// // // //                 <FaPhone /> 
// // // //                 <span className="btn-label">
// // // //                   {isLoggedIn ? property.agent.phone : 'شماره تماس'}
// // // //                 </span>
                
// // // //                 {!isLoggedIn && (
// // // //                   <>
// // // //                     <span className="lock-badge">
// // // //                       <FaLock className="lock-icon-small" />
// // // //                     </span>
// // // //                     <div className="lock-overlay">
// // // //                       <FaLock className="lock-icon" />
// // // //                       <span className="lock-text">برای مشاهده شماره</span>
// // // //                       <span className="lock-subtext">وارد سامانه شوید</span>
// // // //                     </div>
// // // //                   </>
// // // //                 )}
// // // //               </button>

// // // //               {/* دکمه واتساپ */}
// // // //               <button 
// // // //                 className={`agent-action-btn whatsapp ${!isLoggedIn ? 'locked' : ''}`}
// // // //                 onClick={handleWhatsAppClick}
// // // //               >
// // // //                 <FaWhatsapp /> 
// // // //                 <span className="btn-label">واتساپ</span>
                
// // // //                 {!isLoggedIn && (
// // // //                   <>
// // // //                     <span className="lock-badge">
// // // //                       <FaLock className="lock-icon-small" />
// // // //                     </span>
// // // //                     <div className="lock-overlay">
// // // //                       <FaLock className="lock-icon" />
// // // //                       <span className="lock-text">برای مشاهده شماره</span>
// // // //                       <span className="lock-subtext">وارد سامانه شوید</span>
// // // //                     </div>
// // // //                   </>
// // // //                 )}
// // // //               </button>
// // // //             </div>

// // // //             {/* دکمه ورود - فقط برای کاربران غیرلاگین */}
// // // //             {!isLoggedIn && (
// // // //               <button 
// // // //                 className="login-prompt-btn" 
// // // //                 onClick={() => setShowLoginModal(true)}
// // // //                 style={{ marginTop: '10px' }}
// // // //               >
// // // //                 <FaUser className="login-icon" />
// // // //                 ورود / ثبت‌نام
// // // //                 <FaArrowRight className="arrow-icon" />
// // // //               </button>
// // // //             )}
// // // //             {/* ============================================================ */}
            
// // // //           </div>
// // // //         </div>
        
// // // //         <DoubleSidebarBanners />
// // // //         <RelatedPropertiesSlider 
// // // //           currentPropertyId={property.id} 
// // // //           regionName={property.regionName} 
// // // //           propertyType={property.type} 
// // // //         />
        
// // // //         {copied && (
// // // //           <div className="toast-notification">
// // // //             <FaCheckCircle /> لینک کپی شد
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </> 
// // // //   );
// // // // });

// // // // RealEstateDetailPageItem.displayName = 'RealEstateDetailPageItem';
// // // // export default RealEstateDetailPageItem;


// // // import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
// // // import CryptoJS from 'crypto-js';
// // // import DOMPurify from 'dompurify';
// // // import { useNavigate, useLocation, useParams } from 'react-router-dom';
// // // import RelatedPropertiesSlider from './RelatedPropertiesSlider';
// // // import DoubleSidebarBanners from './SidebarBanner';
// // // import { 
// // //   FaMapMarkerAlt, FaPhone, FaWhatsapp, FaShare, FaArrowRight, 
// // //   FaStar, FaParking, FaWarehouse, FaSwimmingPool, FaBath, FaRulerCombined,
// // //   FaCalendarAlt, FaLayerGroup, FaArrowUp, FaCheckCircle, FaTag, FaHome,
// // //   FaBuilding, FaRuler, FaShieldAlt, FaClock, FaEye, FaLink,
// // //   FaLock, FaUser, FaSpinner, FaSync, 
// // //   FaBookmark, FaRegBookmark
// // // } from 'react-icons/fa';
// // // import { Swiper, SwiperSlide } from 'swiper/react';
// // // import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// // // import NeshanMap from "@neshan-maps-platform/react-openlayers";
// // // import "@neshan-maps-platform/react-openlayers/dist/style.css";
// // // import 'swiper/css';
// // // import 'swiper/css/navigation';
// // // import 'swiper/css/pagination';
// // // import './RealEstateDetailPageItem.css';

// // // // ============================================================
// // // // ========== کامپوننت پاپ‌آپ استوری ==========
// // // // ============================================================
// // // const StoryPopup = ({ agentName, agentImage, userId, onClose }) => {
// // //   const [stories, setStories] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
// // //   const [progress, setProgress] = useState(0);
// // //   const [isPaused, setIsPaused] = useState(false);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     const fetchStories = async () => {
// // //       if (!userId) {
// // //         setError('شناسه کاربر یافت نشد');
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       try {
// // //         setLoading(true);
// // //         console.log('📡 در حال دریافت استوری برای userId:', userId);
        
// // //         const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${userId}`);
        
// // //         console.log('📡 Response status:', response.status);
        
// // //         if (!response.ok) {
// // //           throw new Error(`HTTP ${response.status}`);
// // //         }
        
// // //         const result = await response.json();
// // //         console.log('📦 نتیجه استوری:', result);
        
// // //         if (result.status === 200 && result.data && result.data.length > 0) {
// // //           const userStories = result.data[0]?.storyUser || [];
// // //           console.log('📸 تعداد استوری‌ها:', userStories.length);
          
// // //           const formattedStories = userStories.map(story => ({
// // //             ...story,
// // //             url: `https://localhost:7178${story.url}`
// // //           }));
// // //           setStories(formattedStories);
// // //         } else {
// // //           console.log('⚠️ هیچ استوری پیدا نشد');
// // //           setStories([]);
// // //         }
// // //       } catch (error) {
// // //         console.error('❌ خطا در دریافت استوری:', error);
// // //         setError('مشکل در دریافت استوری‌ها');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchStories();
// // //   }, [userId]);

// // //   useEffect(() => {
// // //     if (isPaused || loading || stories.length === 0) return;

// // //     const timer = setInterval(() => {
// // //       setProgress(prev => {
// // //         const newProgress = prev + 1;
// // //         if (newProgress >= 100) {
// // //           if (currentStoryIndex < stories.length - 1) {
// // //             setCurrentStoryIndex(prev => prev + 1);
// // //             return 0;
// // //           } else {
// // //             onClose();
// // //             return 0;
// // //           }
// // //         }
// // //         return newProgress;
// // //       });
// // //     }, 50);

// // //     return () => clearInterval(timer);
// // //   }, [currentStoryIndex, isPaused, loading, stories, onClose]);

// // //   const handlePrevStory = useCallback((e) => {
// // //     e.stopPropagation();
// // //     if (currentStoryIndex > 0) {
// // //       setCurrentStoryIndex(prev => prev - 1);
// // //       setProgress(0);
// // //     }
// // //   }, [currentStoryIndex]);

// // //   const handleNextStory = useCallback((e) => {
// // //     e.stopPropagation();
// // //     if (currentStoryIndex < stories.length - 1) {
// // //       setCurrentStoryIndex(prev => prev + 1);
// // //       setProgress(0);
// // //     } else {
// // //       onClose();
// // //     }
// // //   }, [currentStoryIndex, stories.length, onClose]);

// // //   const handleStoryLink = useCallback((link) => {
// // //     if (link) {
// // //       window.location.href = link;
// // //     }
// // //   }, []);

// // //   if (loading) {
// // //     return (
// // //       <div className="realestate-detail story-popup-overlay" onClick={onClose}>
// // //         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // //           <div style={{ 
// // //             display: 'flex', 
// // //             alignItems: 'center', 
// // //             justifyContent: 'center', 
// // //             height: '100%',
// // //             color: 'white',
// // //             fontSize: '18px',
// // //             fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
// // //           }}>
// // //             در حال بارگذاری استوری‌ها...
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error || stories.length === 0) {
// // //     return (
// // //       <div className="realestate-detail story-popup-overlay" onClick={onClose}>
// // //         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // //           <div style={{ 
// // //             display: 'flex', 
// // //             flexDirection: 'column',
// // //             alignItems: 'center', 
// // //             justifyContent: 'center', 
// // //             height: '100%',
// // //             color: 'white',
// // //             fontSize: '16px',
// // //             padding: '20px',
// // //             textAlign: 'center',
// // //             fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
// // //           }}>
// // //             <p>{error || 'هیچ استوری برای این کاربر وجود ندارد'}</p>
// // //             <button 
// // //               onClick={onClose}
// // //               style={{
// // //                 marginTop: '20px',
// // //                 padding: '10px 30px',
// // //                 background: '#ff0000',
// // //                 color: 'white',
// // //                 border: 'none',
// // //                 borderRadius: '8px',
// // //                 cursor: 'pointer',
// // //                 fontSize: '14px',
// // //                 fontFamily: 'IRANSans, Vazir, Tahoma, sans-serif'
// // //               }}
// // //             >
// // //               بستن
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   const currentStory = stories[currentStoryIndex];

// // //   return (
// // //     <div 
// // //       className="realestate-detail story-popup-overlay"
// // //       onClick={onClose}
// // //       onMouseEnter={() => setIsPaused(true)}
// // //       onMouseLeave={() => setIsPaused(false)}
// // //     >
// // //       <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // //         <div className="story-progress-container">
// // //           {stories.map((_, index) => (
// // //             <div 
// // //               key={index} 
// // //               className="story-progress-bar"
// // //             >
// // //               <div 
// // //                 className="story-progress-fill"
// // //                 style={{
// // //                   width: index < currentStoryIndex ? '100%' : 
// // //                          index === currentStoryIndex ? `${progress}%` : '0%'
// // //                 }}
// // //               />
// // //             </div>
// // //           ))}
// // //         </div>

// // //         <div className="story-header">
// // //           <div className="story-user-info">
// // //             <img 
// // //               src={agentImage} 
// // //               alt={agentName} 
// // //               className="story-user-avatar"
// // //             />
// // //             <span className="story-user-name">{agentName}</span>
// // //             <span className="story-time">لحظاتی پیش</span>
// // //           </div>
// // //           <button className="story-close-btn" onClick={onClose}>✕</button>
// // //         </div>

// // //         <div className="story-content">
// // //           <img 
// // //             src={currentStory.url} 
// // //             alt={currentStory.caption || 'استوری'} 
// // //             className="story-image"
// // //           />
          
// // //           {currentStory.caption && (
// // //             <div className="story-caption">
// // //               {currentStory.caption}
// // //             </div>
// // //           )}

// // //           {currentStory.link && (
// // //             <div 
// // //               className="story-link-button"
// // //               onClick={() => handleStoryLink(currentStory.link)}
// // //             >
// // //               <FaLink />
// // //               <span>{currentStory.linkText || 'مشاهده بیشتر'}</span>
// // //             </div>
// // //           )}
// // //         </div>

// // //         <div 
// // //           className="story-nav-left"
// // //           onClick={handlePrevStory}
// // //         />
// // //         <div 
// // //           className="story-nav-right"
// // //           onClick={handleNextStory}
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // ============================================================
// // // // ========== کامپوننت SafeImage ==========
// // // // ============================================================
// // // const SafeImage = ({ src, alt, className, fallbackSrc, ...props }) => {
// // //   const [error, setError] = useState(false);

// // //   if (!src || error) {
// // //     return (
// // //       <img 
// // //         src={fallbackSrc || 'https://randomuser.me/api/portraits/men/32.jpg'} 
// // //         alt={alt || 'تصویر'} 
// // //         className={className}
// // //         {...props}
// // //       />
// // //     );
// // //   }

// // //   return (
// // //     <img
// // //       src={src}
// // //       alt={alt}
// // //       className={className}
// // //       onError={() => {
// // //         setError(true);
// // //       }}
// // //       {...props}
// // //     />
// // //   );
// // // };

// // // // ============================================================
// // // // ========== توابع کمکی ==========
// // // // ============================================================
// // // const stripHtml = (html) => {
// // //   if (!html) return '';
// // //   const temp = document.createElement('div');
// // //   temp.innerHTML = html;
// // //   return temp.textContent || temp.innerText || '';
// // // };

// // // const truncateText = (text, maxLength) => {
// // //   if (!text) return '';
// // //   if (text.length <= maxLength) return text;
// // //   return text.substring(0, maxLength - 2) + '…';
// // // };

// // // // ============================================================
// // // // ========== کامپوننت‌های متا ==========
// // // // ============================================================
// // // const PageMetadata = ({ property, isForSale, isForRent }) => {
// // //   useEffect(() => {
// // //     if (!property) return;
// // //     let title = property.title 
// // //       ? `${truncateText(property.title, 40)} | ${isForSale ? 'فروش' : 'رهن و اجاره'} ${property.area}م ${property.regionName}`
// // //       : `ملک ${property.area} متری ${property.regionName}`;
// // //     title = truncateText(title, 65);
// // //     document.title = title;
// // //     const plainDescription = stripHtml(property.description || '');
// // //     const priceText = isForSale ? `قیمت: ${property.price} تومان` : `رهن: ${property.mortgagePrice || property.depositPrice || 'تماس بگیرید'} تومان`;
// // //     let description = plainDescription ? truncateText(plainDescription, 120) + `... ${priceText}` : `ملک ${isForSale ? 'فروش' : 'رهن و اجاره'} در ${property.regionName}، ${property.area} متری، ${property.rooms} خوابه - ${priceText}`;
// // //     description = truncateText(description, 155);
// // //     const keywords = [property.title, `${property.regionName} ملک`, isForSale ? 'فروش آپارتمان' : 'رهن آپارتمان', `${property.area} متری`, `${property.rooms} خوابه`, `طبقه ${property.floor}`, property.year !== "نامشخص" ? `ساخت ${property.year}` : '', ...property.features.slice(0, 5)].filter(Boolean).join(',');
// // //     const updateOrCreateMeta = (name, content, isProperty = false) => {
// // //       const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
// // //       let meta = document.querySelector(selector);
// // //       if (!meta) {
// // //         meta = document.createElement('meta');
// // //         if (isProperty) meta.setAttribute('property', name);
// // //         else meta.setAttribute('name', name);
// // //         document.head.appendChild(meta);
// // //       }
// // //       meta.setAttribute('content', content);
// // //     };
// // //     updateOrCreateMeta('description', description);
// // //     updateOrCreateMeta('keywords', keywords);
// // //     updateOrCreateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1');
// // //     let canonical = document.querySelector('link[rel="canonical"]');
// // //     if (!canonical) {
// // //       canonical = document.createElement('link');
// // //       canonical.rel = 'canonical';
// // //       document.head.appendChild(canonical);
// // //     }
// // //     canonical.href = window.location.href;
// // //     updateOrCreateMeta('og:title', title, true);
// // //     updateOrCreateMeta('og:description', truncateText(description, 200), true);
// // //     updateOrCreateMeta('og:image', property.images?.[0] || '/default-property-image.jpg', true);
// // //     updateOrCreateMeta('og:url', window.location.href, true);
// // //     updateOrCreateMeta('og:type', 'product', true);
// // //     updateOrCreateMeta('og:locale', 'fa_IR', true);
// // //     updateOrCreateMeta('og:site_name', 'مشاور املاک', true);
// // //     updateOrCreateMeta('twitter:card', 'summary_large_image');
// // //     updateOrCreateMeta('twitter:title', title);
// // //     updateOrCreateMeta('twitter:description', truncateText(description, 200));
// // //     updateOrCreateMeta('twitter:image', property.images?.[0] || '/default-property-image.jpg');
// // //     document.documentElement.lang = 'fa';
// // //     document.documentElement.dir = 'rtl';
// // //   }, [property, isForSale, isForRent]);
// // //   return null;
// // // };

// // // const StructuredData = ({ property, isForSale, isForRent }) => {
// // //   useEffect(() => {
// // //     if (!property) return;
// // //     const removeOldScript = () => { const oldScript = document.getElementById('json-ld-structured-data'); if (oldScript) oldScript.remove(); };
// // //     removeOldScript();
// // //     const parsePriceToNumber = (priceStr) => { if (!priceStr || priceStr === '۰') return '0'; return String(priceStr).replace(/[^0-9]/g, '') || '0'; };
// // //     const structuredData = {
// // //       "@context": "https://schema.org", "@type": isForSale ? "Product" : "RealEstateListing", "name": property.title,
// // //       "description": stripHtml(property.description || '').substring(0, 500), "image": property.images.slice(0, 10), "url": window.location.href,
// // //       "datePublished": new Date().toISOString(), "dateModified": new Date().toISOString(),
// // //       ...(isForSale && { "offers": { "@type": "Offer", "price": parsePriceToNumber(property.price), "priceCurrency": "IRR", "availability": "https://schema.org/InStock", "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] } }),
// // //       ...(isForRent && { "offers": { "@type": "Offer", "price": parsePriceToNumber(property.mortgagePrice || property.rentPrice || '0'), "priceCurrency": "IRR", "description": "ملک رهن و اجاره" } }),
// // //       "address": { "@type": "PostalAddress", "addressLocality": property.regionName, "streetAddress": property.address, "addressCountry": "IR", "addressRegion": "تهران" },
// // //       "floorSize": { "@type": "QuantitativeValue", "value": property.area || 0, "unitCode": "MTK", "unitText": "متر مربع" },
// // //       "numberOfRooms": property.rooms || 0,
// // //       "additionalProperty": [{ "@type": "PropertyValue", "name": "طبقه", "value": `${property.floor || 1} از ${property.totalFloors || 1}` }, { "@type": "PropertyValue", "name": "سال ساخت", "value": property.year !== "نامشخص" ? property.year : "نامشخص" }, ...property.features.slice(0, 15).map(feature => ({ "@type": "PropertyValue", "name": "امکانات", "value": feature }))],
// // //       "potentialAction": { "@type": "CommunicateAction", "name": "تماس با مشاور", "target": { "@type": "EntryPoint", "urlTemplate": `tel:${property.agent?.phone || ''}`, "inLanguage": "fa-IR", "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"] } }
// // //     };
// // //     const script = document.createElement('script');
// // //     script.id = 'json-ld-structured-data';
// // //     script.type = 'application/ld+json';
// // //     script.textContent = JSON.stringify(structuredData);
// // //     document.head.appendChild(script);
// // //     return () => removeOldScript();
// // //   }, [property, isForSale, isForRent]);
// // //   return null;
// // // };

// // // const BreadcrumbStructuredData = ({ property, isForSale }) => {
// // //   useEffect(() => {
// // //     if (!property) return;
// // //     const removeOldScript = () => { const oldScript = document.getElementById('json-ld-breadcrumb'); if (oldScript) oldScript.remove(); };
// // //     removeOldScript();
// // //     const baseUrl = window.location.origin;
// // //     const regionSlug = encodeURIComponent(property.regionName || 'منطقه');
// // //     const breadcrumbData = {
// // //       "@context": "https://schema.org", "@type": "BreadcrumbList",
// // //       "itemListElement": [
// // //         { "@type": "ListItem", "position": 1, "name": "صفحه اصلی", "item": `${baseUrl}/` },
// // //         { "@type": "ListItem", "position": 2, "name": isForSale ? "آپارتمان‌های فروش" : "آپارتمان‌های رهن و اجاره", "item": `${baseUrl}/${isForSale ? 'RealEstatePageDetail' : 'rent'}` },
// // //         { "@type": "ListItem", "position": 3, "name": `منطقه ${property.regionName}`, "item": `${baseUrl}/region/${regionSlug}` },
// // //         { "@type": "ListItem", "position": 4, "name": truncateText(property.title || 'جزئیات ملک', 80), "item": window.location.href }
// // //       ]
// // //     };
// // //     const script = document.createElement('script');
// // //     script.id = 'json-ld-breadcrumb';
// // //     script.type = 'application/ld+json';
// // //     script.textContent = JSON.stringify(breadcrumbData);
// // //     document.head.appendChild(script);
// // //     return () => removeOldScript();
// // //   }, [property, isForSale]);
// // //   return null;
// // // };

// // // // ============================================================
// // // // ========== Skeleton ==========
// // // // ============================================================
// // // const DetailSkeleton = () => (
// // //   <div className="detail-skeleton">
// // //     <div className="skeleton-header"><div className="skeleton-circle"></div><div className="skeleton-title"></div><div className="skeleton-circle"></div></div>
// // //     <div className="skeleton-gallery"><div className="skeleton-image"></div></div>
// // //     <div className="skeleton-content"><div className="skeleton-price"></div><div className="skeleton-info">{[]}</div><div className="skeleton-tabs">{[]}</div><div className="skeleton-text">{[]}</div></div>
// // //   </div>
// // // );

// // // // ============================================================
// // // // ========== کامپوننت مودال لاگین/ثبت‌نام با کپچا ==========
// // // // ============================================================
// // // const LoginModal = ({ onClose }) => {
// // //   const navigate = useNavigate();
  
// // //   // ===== State‌ها =====
// // //   const [step, setStep] = useState('phone'); // 'phone' | 'login' | 'register'
// // //   const [phoneNumber, setPhoneNumber] = useState('');
// // //   const [username, setUsername] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const [confirmPassword, setConfirmPassword] = useState('');
// // //   const [error, setError] = useState('');
// // //   const [loading, setLoading] = useState(false);
// // //   const [userExists, setUserExists] = useState(null);
  
// // //   // ===== State کپچا =====
// // //   const [captchaId, setCaptchaId] = useState('');
// // //   const [captchaImage, setCaptchaImage] = useState('');
// // //   const [captchaValue, setCaptchaValue] = useState('');
// // //   const [captchaLoading, setCaptchaLoading] = useState(false);

// // //   // ===== دریافت کپچا =====
// // //   const fetchCaptcha = useCallback(async () => {
// // //     setCaptchaLoading(true);
// // //     try {
// // //       const response = await fetch('https://localhost:7178/api/Auth/captcha', {
// // //         method: 'GET',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //       });
      
// // //       const result = await response.json();
// // //       console.log('📦 کپچا دریافت شد:', result);
      
// // //       if (result.captchaId && result.image) {
// // //         setCaptchaId(result.captchaId);
// // //         setCaptchaImage(result.image);
// // //         setCaptchaValue('');
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ خطا در دریافت کپچا:', error);
// // //     } finally {
// // //       setCaptchaLoading(false);
// // //     }
// // //   }, []);

// // //   // ===== دریافت کپچا هنگام باز شدن مودال =====
// // //   useEffect(() => {
// // //     fetchCaptcha();
// // //   }, [fetchCaptcha]);

// // //   // ===== تابع بررسی شماره موبایل با کپچا =====
// // //   const checkPhoneNumber = async () => {
// // //     if (!phoneNumber || phoneNumber.length < 10) {
// // //       setError('لطفاً شماره موبایل معتبر وارد کنید');
// // //       return;
// // //     }

// // //     if (!captchaValue || captchaValue.length < 4) {
// // //       setError('لطفاً کد امنیتی را وارد کنید');
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setError('');
    
// // //     try {
// // //       console.log('📡 بررسی شماره با کپچا:', { phone: phoneNumber, captchaId, captchaValue });

// // //       const response = await fetch('https://localhost:7178/api/Auth/CheckUser', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({
// // //           mobile: phoneNumber,
// // //           captchaId: captchaId,
// // //           captchaValue: captchaValue
// // //         }),
// // //       });

// // //       const result = await response.json();
// // //       console.log('📦 نتیجه بررسی:', result);

// // //       if (result.success === true) {
// // //         setUserExists(true);
// // //         setStep('login');
// // //         setError('');
// // //       } else if (result.success === false && result.message === 'کاربر یافت نشد') {
// // //         setUserExists(false);
// // //         setStep('register');
// // //         setError('');
// // //       } else {
// // //         setError(result.message || 'خطا در بررسی اطلاعات');
// // //         fetchCaptcha();
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ خطا در بررسی شماره:', error);
// // //       setError('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
// // //       fetchCaptcha();
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // ===== تابع لاگین =====
// // //   const handleLogin = async () => {
// // //     if (!username || !password) {
// // //       setError('لطفاً نام کاربری و رمز عبور را وارد کنید');
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setError('');

// // //     try {
// // //       console.log('📡 درخواست لاگین:', { username, phone: phoneNumber });

// // //       const response = await fetch('https://localhost:7178/api/Auth/Login', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({
// // //           username: username,
// // //           password: password,
// // //           phone: phoneNumber
// // //         }),
// // //       });

// // //       const result = await response.json();
// // //       console.log('📦 نتیجه لاگین:', result);

// // //       if (result.status === 200 && result.data) {
// // //         localStorage.setItem('auth_token', result.data.token);
// // //         localStorage.setItem('user', JSON.stringify(result.data.user));
        
// // //         window.dispatchEvent(new Event('authChange'));
        
// // //         onClose();
// // //         window.location.reload();
// // //       } else {
// // //         setError(result.message || 'نام کاربری یا رمز عبور اشتباه است');
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ خطا در لاگین:', error);
// // //       setError('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // ===== تابع ثبت‌نام =====
// // //   const handleRegister = async () => {
// // //     if (!username || username.length < 3) {
// // //       setError('نام کاربری باید حداقل ۳ کاراکتر باشد');
// // //       return;
// // //     }
// // //     if (!password || password.length < 6) {
// // //       setError('رمز عبور باید حداقل ۶ کاراکتر باشد');
// // //       return;
// // //     }
// // //     if (password !== confirmPassword) {
// // //       setError('رمز عبور و تکرار آن مطابقت ندارند');
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setError('');

// // //     try {
// // //       console.log('📡 درخواست ثبت‌نام:', { username, phone: phoneNumber });

// // //       const response = await fetch('https://localhost:7178/api/Auth/Register', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({
// // //           username: username,
// // //           password: password,
// // //           phone: phoneNumber,
// // //           name: username
// // //         }),
// // //       });

// // //       const result = await response.json();
// // //       console.log('📦 نتیجه ثبت‌نام:', result);

// // //       if (result.status === 200 || result.status === 201) {
// // //         const loginResponse = await fetch('https://localhost:7178/api/Auth/Login', {
// // //           method: 'POST',
// // //           headers: {
// // //             'Content-Type': 'application/json',
// // //           },
// // //           body: JSON.stringify({
// // //             username: username,
// // //             password: password,
// // //             phone: phoneNumber
// // //           }),
// // //         });

// // //         const loginResult = await loginResponse.json();

// // //         if (loginResult.status === 200 && loginResult.data) {
// // //           localStorage.setItem('auth_token', loginResult.data.token);
// // //           localStorage.setItem('user', JSON.stringify(loginResult.data.user));
          
// // //           window.dispatchEvent(new Event('authChange'));
// // //           onClose();
// // //           window.location.reload();
// // //         } else {
// // //           setError('ثبت‌نام موفق بود. لطفاً وارد شوید.');
// // //           setStep('login');
// // //         }
// // //       } else {
// // //         setError(result.message || 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.');
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ خطا در ثبت‌نام:', error);
// // //       setError('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // ===== بازگشت به مرحله قبل =====
// // //   const handleBack = () => {
// // //     setStep('phone');
// // //     setError('');
// // //     setUserExists(null);
// // //     setCaptchaValue('');
// // //     fetchCaptcha();
// // //   };

// // //   // ===== رفتن به صفحه ثبت‌نام اصلی =====
// // //   const goToRegisterPage = () => {
// // //     onClose();
// // //     navigate('/register', { 
// // //       state: { 
// // //         from: window.location.pathname,
// // //         phone: phoneNumber
// // //       } 
// // //     });
// // //   };

// // //   // ============================================================
// // //   // ===== رندر مرحله شماره موبایل با کپچا =====
// // //   // ============================================================
// // //   const renderPhoneStep = () => (
// // //     <>
// // //       <div className="modal-icon">
// // //         <FaPhone className="modal-phone-icon" />
// // //       </div>
      
// // //       <h2 className="modal-title">ورود / ثبت‌نام</h2>
// // //       <p className="modal-description">
// // //         برای مشاهده شماره تماس مشاور،
// // //         <br />
// // //         لطفاً شماره موبایل خود را وارد کنید
// // //       </p>

// // //       <div className="phone-input-wrapper">
// // //         <div className="phone-prefix">+98</div>
// // //         <input
// // //           type="tel"
// // //           className="phone-input"
// // //           placeholder="۹۱۲۳۴۵۶۷۸۹"
// // //           value={phoneNumber}
// // //           onChange={(e) => {
// // //             const value = e.target.value.replace(/\D/g, '');
// // //             if (value.length <= 11) {
// // //               setPhoneNumber(value);
// // //             }
// // //           }}
// // //           maxLength="11"
// // //           autoFocus
// // //           onKeyDown={(e) => {
// // //             if (e.key === 'Enter') {
// // //               checkPhoneNumber();
// // //             }
// // //           }}
// // //         />
// // //       </div>

// // //       {/* ===== بخش کپچا ===== */}
// // //       <div className="captcha-container">
// // //         <div className="captcha-image-wrapper">
// // //           {captchaLoading ? (
// // //             <div className="captcha-loading">
// // //               <FaSpinner className="spinner" />
// // //             </div>
// // //           ) : (
// // //             <img 
// // //               src={captchaImage} 
// // //               alt="کد امنیتی" 
// // //               className="captcha-image"
// // //             />
// // //           )}
// // //           <button 
// // //             className="captcha-refresh-btn"
// // //             onClick={fetchCaptcha}
// // //             disabled={captchaLoading}
// // //             title="تغییر کد امنیتی"
// // //           >
// // //             <FaSync className={captchaLoading ? 'spinner' : ''} />
// // //           </button>
// // //         </div>
        
// // //         <input
// // //           type="text"
// // //           className="captcha-input"
// // //           placeholder="کد امنیتی را وارد کنید"
// // //           value={captchaValue}
// // //           onChange={(e) => {
// // //             const value = e.target.value.replace(/\D/g, '');
// // //             if (value.length <= 4) {
// // //               setCaptchaValue(value);
// // //             }
// // //           }}
// // //           maxLength="4"
// // //           onKeyDown={(e) => {
// // //             if (e.key === 'Enter') {
// // //               checkPhoneNumber();
// // //             }
// // //           }}
// // //         />
// // //       </div>

// // //       {error && <div className="error-message-text">{error}</div>}

// // //       <button 
// // //         className="modal-submit-btn"
// // //         onClick={checkPhoneNumber}
// // //         disabled={loading || phoneNumber.length < 10 || captchaValue.length < 4}
// // //       >
// // //         {loading ? (
// // //           <>
// // //             <FaSpinner className="spinner" />
// // //             در حال بررسی...
// // //           </>
// // //         ) : (
// // //           <>
// // //             ادامه
// // //             <FaArrowRight />
// // //           </>
// // //         )}
// // //       </button>

// // //       <p className="modal-footer-text">
// // //         با ادامه، شما با <a href="/terms">قوانین</a> موافقت می‌کنید
// // //       </p>
// // //     </>
// // //   );

// // //   // ============================================================
// // //   // ===== رندر مرحله لاگین =====
// // //   // ============================================================
// // //   const renderLoginStep = () => (
// // //     <>
// // //       <button className="modal-back-btn" onClick={handleBack}>
// // //         ← بازگشت
// // //       </button>

// // //       <div className="modal-icon">
// // //         <FaUser className="modal-login-icon" />
// // //       </div>
      
// // //       <h2 className="modal-title">خوش آمدید</h2>
// // //       <p className="modal-description">
// // //         شماره <strong>{phoneNumber}</strong> در سامانه ثبت شده است
// // //         <br />
// // //         لطفاً وارد شوید
// // //       </p>

// // //       <div className="input-group">
// // //         <div className="input-wrapper">
// // //           <FaUser className="input-icon" />
// // //           <input
// // //             type="text"
// // //             className="modal-input"
// // //             placeholder="نام کاربری"
// // //             value={username}
// // //             onChange={(e) => setUsername(e.target.value)}
// // //             onKeyDown={(e) => {
// // //               if (e.key === 'Enter') {
// // //                 handleLogin();
// // //               }
// // //             }}
// // //           />
// // //         </div>

// // //         <div className="input-wrapper">
// // //           <FaLock className="input-icon" />
// // //           <input
// // //             type="password"
// // //             className="modal-input"
// // //             placeholder="رمز عبور"
// // //             value={password}
// // //             onChange={(e) => setPassword(e.target.value)}
// // //             onKeyDown={(e) => {
// // //               if (e.key === 'Enter') {
// // //                 handleLogin();
// // //               }
// // //             }}
// // //           />
// // //         </div>
// // //       </div>

// // //       {error && <div className="error-message-text">{error}</div>}

// // //       <button 
// // //         className="modal-submit-btn"
// // //         onClick={handleLogin}
// // //         disabled={loading || !username || !password}
// // //       >
// // //         {loading ? (
// // //           <>
// // //             <FaSpinner className="spinner" />
// // //             در حال ورود...
// // //           </>
// // //         ) : (
// // //           <>
// // //             ورود
// // //             <FaArrowRight />
// // //           </>
// // //         )}
// // //       </button>

// // //       <button className="modal-guest-btn" onClick={onClose}>
// // //         ادامه به عنوان مهمان
// // //       </button>
// // //     </>
// // //   );

// // //   // ============================================================
// // //   // ===== رندر مرحله ثبت‌نام =====
// // //   // ============================================================
// // //   const renderRegisterStep = () => (
// // //     <>
// // //       <button className="modal-back-btn" onClick={handleBack}>
// // //         ← بازگشت
// // //       </button>

// // //       <div className="modal-icon">
// // //         <FaUser className="modal-register-icon" />
// // //       </div>
      
// // //       <h2 className="modal-title">ثبت‌نام</h2>
// // //       <p className="modal-description">
// // //         شماره <strong>{phoneNumber}</strong> در سامانه ثبت نشده است
// // //         <br />
// // //         لطفاً ثبت‌نام کنید
// // //       </p>

// // //       <div className="input-group">
// // //         <div className="input-wrapper">
// // //           <FaUser className="input-icon" />
// // //           <input
// // //             type="text"
// // //             className="modal-input"
// // //             placeholder="نام کاربری (حداقل ۳ کاراکتر)"
// // //             value={username}
// // //             onChange={(e) => setUsername(e.target.value)}
// // //             onKeyDown={(e) => {
// // //               if (e.key === 'Enter') {
// // //                 handleRegister();
// // //               }
// // //             }}
// // //           />
// // //         </div>

// // //         <div className="input-wrapper">
// // //           <FaLock className="input-icon" />
// // //           <input
// // //             type="password"
// // //             className="modal-input"
// // //             placeholder="رمز عبور (حداقل ۶ کاراکتر)"
// // //             value={password}
// // //             onChange={(e) => setPassword(e.target.value)}
// // //             onKeyDown={(e) => {
// // //               if (e.key === 'Enter') {
// // //                 handleRegister();
// // //               }
// // //             }}
// // //           />
// // //         </div>

// // //         <div className="input-wrapper">
// // //           <FaCheckCircle className="input-icon" />
// // //           <input
// // //             type="password"
// // //             className="modal-input"
// // //             placeholder="تکرار رمز عبور"
// // //             value={confirmPassword}
// // //             onChange={(e) => setConfirmPassword(e.target.value)}
// // //             onKeyDown={(e) => {
// // //               if (e.key === 'Enter') {
// // //                 handleRegister();
// // //               }
// // //             }}
// // //           />
// // //         </div>
// // //       </div>

// // //       {error && <div className="error-message-text">{error}</div>}

// // //       <button 
// // //         className="modal-submit-btn"
// // //         onClick={handleRegister}
// // //         disabled={loading || !username || !password || !confirmPassword}
// // //       >
// // //         {loading ? (
// // //           <>
// // //             <FaSpinner className="spinner" />
// // //             در حال ثبت‌نام...
// // //           </>
// // //         ) : (
// // //           <>
// // //             ثبت‌نام
// // //             <FaArrowRight />
// // //           </>
// // //         )}
// // //       </button>

// // //       <button 
// // //         className="modal-guest-btn" 
// // //         onClick={goToRegisterPage}
// // //       >
// // //         ثبت‌نام کامل در صفحه جداگانه
// // //       </button>
// // //     </>
// // //   );

// // //   // ============================================================
// // //   // ===== رندر اصلی =====
// // //   // ============================================================
// // //   return (
// // //     <div className="login-modal-overlay" onClick={onClose}>
// // //       <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
// // //         <button className="modal-close-btn" onClick={onClose}>✕</button>
        
// // //         {step === 'phone' && renderPhoneStep()}
// // //         {step === 'login' && renderLoginStep()}
// // //         {step === 'register' && renderRegisterStep()}
        
// // //         <div className="modal-benefits-mini">
// // //           <span>✅ ثبت‌نام رایگان</span>
// // //           <span>🔒 امن و مطمئن</span>
// // //           <span>⚡ کمتر از ۱ دقیقه</span>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // ============================================================
// // // // ========== کامپوننت اصلی ==========
// // // // ============================================================
// // // const RealEstateDetailPageItem = memo(() => {
// // //   const location = useLocation();
// // //   const navigate = useNavigate();
// // //   const { id: paramId } = useParams();
// // //   const queryParams = new URLSearchParams(location.search);
// // //   const id = paramId || queryParams.get('id');
  
// // //   const [property, setProperty] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [copied, setCopied] = useState(false);
// // //   const [selectedImage, setSelectedImage] = useState(0);
// // //   const [activeTab, setActiveTab] = useState('details');
  
// // //   // ===== STATE برای بوک‌مارک =====
// // //   const [isBookmarked, setIsBookmarked] = useState(false);
// // //   const [bookmarkLoading, setBookmarkLoading] = useState(false);
  
// // //   const [imagesLoaded, setImagesLoaded] = useState({});
// // //   const [showStoryPopup, setShowStoryPopup] = useState(false);
// // //   const [storyUserId, setStoryUserId] = useState(null);
  
// // //   // ===== STATE برای لاگین و مودال =====
// // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // //   const [showLoginModal, setShowLoginModal] = useState(false);

// // //   // ===== بررسی لاگین =====
// // //   useEffect(() => {
// // //     const checkLogin = () => {
// // //       const token = localStorage.getItem('auth_token');
// // //       if (token) {
// // //         setIsLoggedIn(true);
// // //       } else {
// // //         setIsLoggedIn(false);
// // //       }
// // //     };
    
// // //     checkLogin();
    
// // //     window.addEventListener('authChange', checkLogin);
// // //     window.addEventListener('storage', checkLogin);
    
// // //     return () => {
// // //       window.removeEventListener('authChange', checkLogin);
// // //       window.removeEventListener('storage', checkLogin);
// // //     };
// // //   }, []);

// // //   // ============================================================
// // //   // ===== دریافت اطلاعات ملک =====
// // //   // ============================================================
// // //   useEffect(() => {
// // //     const fetchPropertyData = async () => {
// // //       if (!id) { setError('شناسه ملک یافت نشد'); setLoading(false); return; }
// // //       setLoading(true); setError(null);
// // //       try {
// // //            const token = localStorage.getItem('auth_token');
// // //         const controller = new AbortController();
// // //         const timeoutId = setTimeout(() => controller.abort(), 10000);
// // //        // const response = await fetch(`https://localhost:7178/api/RealEstatePage/GetRealEstateDetails?id=${id}`, { signal: controller.signal });
// // //   //        const response="";
// // //   //      if(token)
// // //   //      {
// // //   //                 response = await fetch(`https://localhost:7178/api/RealEstatePage/GetRealEstateDetails?id=${id}`, {
// // //   //   signal: controller.signal,
// // //   //   headers: {
// // //   //     'Authorization': `Bearer ${token}`
// // //   //   }
// // //   // });
// // //   //      }
// // //   //      else{
// // //   //        response = await fetch(`https://localhost:7178/api/RealEstatePage/GetRealEstateDetails?id=${id}`, { signal: controller.signal });
// // //   //      }
// // //   const API_BASE_URL = 'https://localhost:7178/api'
// // //   const fetchWithAuth = (endpoint, options = {}) => {
// // //   const headers = { ...options.headers };
  
// // //   if (token) {
// // //     headers['Authorization'] = `Bearer ${token}`;
// // //   }
  
// // //   return fetch(`${API_BASE_URL}${endpoint}`, {
// // //     ...options,
// // //     headers
// // //   });
// // // };

// // // // Usage
// // // const response = await fetchWithAuth(
// // //   `/RealEstatePage/GetRealEstateDetails?id=${id}`,
// // //   { signal: controller.signal }
// // // );

// // //         clearTimeout(timeoutId);
// // //         if (!response.ok) throw new Error(`HTTP ${response.status}`);
// // //         const result = await response.json();
        
// // //         console.log('📦 Full API response:', result);
        
// // //         if (result.status === 200 && result.data) {
// // //           const data = result.data;
          
// // //           const agentImage = data.agents?.image 
// // //             ? `https://localhost:7178/${data.agents.image}` 
// // //             : "https://randomuser.me/api/portraits/men/32.jpg";
          
// // //           const userId = data.agents?.userId || null;
// // //           const hasStory = data.agents?.hasStory || false;
          
// // //           console.log('👤 Agent UserId:', userId);
// // //           console.log('📱 HasStory:', hasStory);
// // //           console.log('📕 inBookMark:', data.inBookMark);
          
// // //           // ===== مقداردهی بوک‌مارک =====
// // //           setIsBookmarked(data.inBookMark || false);
          
// // //           setStoryUserId(hasStory ? userId : null);
          
// // //           setProperty({
// // //             id: data.id, 
// // //             title: data.title || `ملک در ${data.regionName || 'منطقه'} `, 
// // //             price: data.price?.toLocaleString("fa-IR") || "۰",
// // //             priceMeter: data.priceMeter?.toLocaleString("fa-IR") || "۰", 
// // //             rentPrice: data.rent?.toLocaleString("fa-IR") || null,
// // //             depositPrice: data.deposit?.toLocaleString("fa-IR") || null, 
// // //             mortgagePrice: data.mortgagePrice?.toLocaleString("fa-IR") || null,
// // //             type: data.categoryType, 
// // //             area: parseInt(data.additionalInformation?.match(/\d+/)?.[0]) || 0, 
// // //             rooms: data.rooms || 0,
// // //             floor: data.floor || 1, 
// // //             regionName: data.regionName || "منطقه نامشخص", 
// // //             totalFloors: data.countFloor || 1,
// // //             year: data.constructionYear || "نامشخص", 
// // //             address: data.address || "آدرس درج نشده", 
// // //             showExactLocation: data.showExactLocation,
// // //             location: { lat: data.lat || 35.7199363, lng: data.lng || 51.4334842 },
// // //             description: data.descriptionRows || "توضیحاتی برای این ملک ثبت نشده است.", 
// // //             features: data.facilities || [],
// // //             warnings: data.warnings || ["استعلام خلافی", "بررسی سند مالکیت", "استعلام پایان کار", "بررسی مفاصا حساب"],
// // //             images: (data.images || []).map(img => `https://localhost:7178/${img}`),
// // //             agent: { 
// // //               name: data.agents?.name || "مشاور املاک", 
// // //               phone: data.agents?.phone || "۰۲۱۹۱۰۰۰۰۰۰", 
// // //               whatsapp: data.agents?.connectSocialMedia || "", 
// // //               address: data.agents?.address || "آدرس دفتر درج نشده", 
// // //               rating: data.agents?.rating || 4.5, 
// // //               deals: data.agents?.deals || 120, 
// // //               image: agentImage,
// // //               hasStory: hasStory,
// // //               userId: userId
// // //             },
// // //             views: data.views || 0, 
// // //             saved: data.saved || 0, 
// // //             createdAt: data.createdAtPersianRelative || "امروز", 
// // //             certificate: data.isHasLoan ? "قابل وام" : "سند رسمی", 
// // //             mortgage: data.isHasLoan ? "امکان وام" : "بدون وام",
// // //             nearby: [{ name: "مترو", distance: "۵۰۰ متر" }, { name: "مرکز خرید", distance: "۳۰۰ متر" }, { name: "پارک", distance: "۲۰۰ متر" }, { name: "مدرسه", distance: "۴۰۰ متر" }]
// // //           });
// // //         } else throw new Error(result.message || 'ملک یافت نشد');
// // //       } catch (error) { 
// // //         console.error('خطا:', error); 
// // //         setError(error.name === 'AbortError' ? 'مدت زمان درخواست به پایان رسید' : 'مشکل در ارتباط با سرور'); 
// // //       } finally { 
// // //         setLoading(false); 
// // //       }
// // //     };
// // //     fetchPropertyData();
// // //     window.scrollTo({ top: 0, behavior: 'smooth' });
// // //   }, [id]);

// // //   // ============================================================
// // //   // ===== تابع بوک‌مارک =====
// // //   // ============================================================
// // //   const handleBookmarkToggle = useCallback(async () => {
// // //     // اگر لاگین نبود، مودال لاگین باز کن
// // //     if (!isLoggedIn) {
// // //       setShowLoginModal(true);
// // //       return;
// // //     }

// // //     // اگر در حال بارگذاری است، کاری نکن
// // //     if (bookmarkLoading) return;

// // //     setBookmarkLoading(true);
    
// // //     try {
// // //       const token = localStorage.getItem('auth_token');
      
// // //       console.log('📡 درخواست بوک‌مارک برای ملک:', property?.id);
// // //       console.log('📡 وضعیت فعلی:', isBookmarked ? 'حذف' : 'افزودن');

// // //       const response = await fetch('https://localhost:7178/api/RealEstatePage/ToggleBookMark', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'Authorization': `Bearer ${token}`
// // //         },
// // //         body: JSON.stringify(property?.id),
// // //       });

// // //       if (response.ok) {
// // //         // تغییر وضعیت بوک‌مارک
// // //         setIsBookmarked(prev => !prev);
// // //         console.log('✅ بوک‌مارک با موفقیت تغییر کرد');
// // //       } else {
// // //         const errorData = await response.json();
// // //         console.error('❌ خطا در بوک‌مارک:', errorData);
// // //         alert('مشکل در ذخیره بوک‌مارک. لطفاً دوباره تلاش کنید.');
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ خطا در ارتباط با سرور:', error);
// // //       alert('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
// // //     } finally {
// // //       setBookmarkLoading(false);
// // //     }
// // //   }, [isLoggedIn, property, isBookmarked, bookmarkLoading]);

// // //   // ============================================================
// // //   // ===== توابع تماس با قفل لاگین =====
// // //   // ============================================================
// // //   const handlePhoneClick = useCallback(() => {
// // //     if (!isLoggedIn) {
// // //       setShowLoginModal(true);
// // //       return;
// // //     }
// // //     if (!property?.agent?.phone) {
// // //       alert('شماره تماس در دسترس نیست');
// // //       return;
// // //     }
// // //     navigator.clipboard.writeText(property.agent.phone);
// // //     setCopied(true);
// // //     setTimeout(() => setCopied(false), 2000);
// // //   }, [isLoggedIn, property]);

// // //   const handleWhatsAppClick = useCallback(() => {
// // //     if (!isLoggedIn) {
// // //       setShowLoginModal(true);
// // //       return;
// // //     }
// // //     if (!property?.agent?.whatsapp) {
// // //       alert('شماره واتساپ در دسترس نیست');
// // //       return;
// // //     }
// // //     window.open(`https://wa.me/${property.agent.whatsapp.replace(/\s/g, '')}`, '_blank');
// // //   }, [isLoggedIn, property]);

// // //   // ============================================================
// // //   // ===== سایر توابع =====
// // //   // ============================================================
// // //   const isForSale = useMemo(() => property?.type === 1, [property]);
// // //   const isForRent = useMemo(() => property?.type === 2, [property]);
// // //   const formattedPricePerMeter = useMemo(() => { if (!property?.priceMeter || property.priceMeter === "۰") return null; return `${property.priceMeter} تومان`; }, [property]);
// // //   const shareUrl = useMemo(() => window.location.href, []);

// // //   const handleCopyLink = useCallback(() => { navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }, [shareUrl]);
// // //   const handleShare = useCallback(async () => { if (!property) return; const shareData = { title: property.title, text: `${property.title} - ${property.area} متری - ${isForSale ? `قیمت ${property.price}` : `رهن ${property.mortgagePrice}`} تومان`, url: shareUrl }; if (navigator.share && /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)) { try { await navigator.share(shareData); } catch (error) { if (error.name !== 'AbortError') handleCopyLink(); } } else handleCopyLink(); }, [property, isForSale, shareUrl, handleCopyLink]);
// // //   const handleImageLoad = useCallback((index) => { setImagesLoaded(prev => ({ ...prev, [index]: true })); }, []);
  
// // //   const goToProfile = useCallback(() => {
// // //     if (property?.agent?.userId) {
// // //       console.log('👤 رفتن به پروفایل کاربر:', property.agent.userId);
// // //       navigate(`/profile/${property.agent.userId}`);
// // //     }
// // //   }, [property, navigate]);

// // //   const handleStoryClick = useCallback((e) => {
// // //     if (e) {
// // //       e.stopPropagation();
// // //     }
    
// // //     console.log('🖱️ کلیک روی استوری');
// // //     console.log('🆔 storyUserId:', storyUserId);
// // //     console.log('📱 hasStory:', property?.agent?.hasStory);
    
// // //     if (storyUserId) {
// // //       console.log('✅ باز کردن استوری برای userId:', storyUserId);
// // //       setShowStoryPopup(true);
// // //       document.body.style.overflow = 'hidden';
// // //     } else {
// // //       console.log('❌ این کاربر استوری ندارد');
// // //     }
// // //   }, [storyUserId, property]);

// // //   const handleStoryClose = useCallback(() => {
// // //     setShowStoryPopup(false);
// // //     document.body.style.overflow = '';
// // //   }, []);

// // //   const handleLoginModalClose = useCallback(() => {
// // //     setShowLoginModal(false);
// // //     const token = localStorage.getItem('auth_token');
// // //     if (token) {
// // //       setIsLoggedIn(true);
// // //     }
// // //   }, []);

// // //   // ============================================================
// // //   // ===== رندر =====
// // //   // ============================================================
// // //   if (error) return ( 
// // //     <> 
// // //       <PageMetadata property={null} /> 
// // //       <div className="detail-container realestate-detail">
// // //         <div className="detail-header">
// // //           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
// // //           <h1 className="header-title">خطا</h1>
// // //           <div className="header-btn"></div>
// // //         </div>
// // //         <div className="error-message">
// // //           <h2>متاسفانه خطایی رخ داده است</h2>
// // //           <p>{error}</p>
// // //           <button onClick={() => window.location.reload()}>تلاش مجدد</button>
// // //           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
// // //         </div>
// // //       </div>
// // //     </> 
// // //   );
  
// // //   if (loading) return <DetailSkeleton />;
  
// // //   if (!property) return ( 
// // //     <> 
// // //       <PageMetadata property={null} /> 
// // //       <div className="detail-container realestate-detail">
// // //         <div className="detail-header">
// // //           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
// // //           <h1 className="header-title">ملک یافت نشد</h1>
// // //           <div className="header-btn"></div>
// // //         </div>
// // //         <div className="error-message">
// // //           <p>متاسفانه ملک مورد نظر یافت نشد</p>
// // //           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
// // //         </div>
// // //       </div>
// // //     </> 
// // //   );

// // //   return ( 
// // //     <>
// // //       <PageMetadata property={property} isForSale={isForSale} isForRent={isForRent} />
// // //       <StructuredData property={property} isForSale={isForSale} isForRent={isForRent} />
// // //       <BreadcrumbStructuredData property={property} isForSale={isForSale} />
      
// // //       {/* ===== پاپ‌آپ استوری ===== */}
// // //       {showStoryPopup && (
// // //         <StoryPopup 
// // //           agentName={property.agent.name}
// // //           agentImage={property.agent.image}
// // //           userId={storyUserId}
// // //           onClose={handleStoryClose}
// // //         />
// // //       )}

// // //       {/* ===== مودال لاگین/ثبت‌نام ===== */}
// // //       {showLoginModal && (
// // //         <LoginModal 
// // //           onClose={handleLoginModalClose}
// // //         />
// // //       )}
      
// // //       <div className="detail-container realestate-detail">
// // //         <nav className="breadcrumb-nav">
// // //           <ol className="breadcrumb-list">
// // //             <li className="breadcrumb-item"><a href="/">خانه</a></li>
// // //             <li className="breadcrumb-item"><a href={isForSale ? '/sale' : '/rent'}>{isForSale ? 'فروش آپارتمان' : 'رهن و اجاره آپارتمان'}</a></li>
// // //             <li className="breadcrumb-item"><a href={`/region/${encodeURIComponent(property.regionName)}`}>منطقه {property.regionName}</a></li>
// // //             <li className="breadcrumb-item active">{truncateText(property.title, 50)}</li>
// // //           </ol>
// // //         </nav>
        
// // //         <div className="detail-header">
// // //           <button className="header-btn" onClick={() => navigate(-1)}><FaArrowRight /></button>
// // //           <h1 className="header-title">{property.title}</h1>
// // //           <button className="header-btn" onClick={handleShare}><FaShare /></button>
// // //         </div>
        
// // //         <div className="detail-gallery">
// // //           <Swiper 
// // //             modules={[Navigation, Pagination, Autoplay]} 
// // //             navigation 
// // //             pagination={{ clickable: true }} 
// // //             autoplay={{ delay: 4000, disableOnInteraction: false }} 
// // //             spaceBetween={0} 
// // //             slidesPerView={1} 
// // //             onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)} 
// // //             className="gallery-swiper"
// // //           >
// // //             {property.images.length > 0 ? 
// // //               property.images.map((img, index) => (
// // //                 <SwiperSlide key={index}>
// // //                   <div className="gallery-slide">
// // //                     {!imagesLoaded[index] && <div className="image-placeholder"><FaHome /></div>}
// // //                     <img 
// // //                       src={img} 
// // //                       alt={`${property.title} - ${index === 0 ? 'نمای اصلی' : `تصویر ${index + 1}`}`} 
// // //                       loading={index === 0 ? 'eager' : 'lazy'} 
// // //                       onLoad={() => handleImageLoad(index)} 
// // //                       style={{ display: imagesLoaded[index] ? 'block' : 'none' }} 
// // //                     />
// // //                   </div>
// // //                 </SwiperSlide>
// // //               )) : 
// // //               (<SwiperSlide>
// // //                 <div className="gallery-slide no-image">
// // //                   <FaHome />
// // //                   <span>تصویری موجود نیست</span>
// // //                 </div>
// // //               </SwiperSlide>)
// // //             }
// // //           </Swiper>
          
// // //           {/* ===== دکمه بوک‌مارک ===== */}
// // //           <button 
// // //             className={`bookmark-btn ${isBookmarked ? 'active' : ''}`} 
// // //             onClick={handleBookmarkToggle}
// // //             disabled={bookmarkLoading}
// // //             title={isBookmarked ? 'حذف از بوک‌مارک‌ها' : 'افزودن به بوک‌مارک‌ها'}
// // //           >
// // //             {bookmarkLoading ? (
// // //               <FaSpinner className="spinner" />
// // //             ) : (
// // //               isBookmarked ? <FaBookmark /> : <FaRegBookmark />
// // //             )}
// // //           </button>
          
// // //           <div className="image-counter">{selectedImage + 1} / {property.images.length || 1}</div>
// // //         </div>
        
// // //         <div className="detail-main">
// // //           <div className="detail-title-section">
// // //             <div className="title-row">
// // //               <div className="property-stats">
// // //                 <span className="stat-badge"><FaEye /> {property.views.toLocaleString('fa-IR')} بازدید</span>
// // //                 <span className="stat-badge">
// // //                   <FaBookmark /> {property.saved.toLocaleString('fa-IR')} ذخیره
// // //                 </span>
// // //                 <span className="stat-badge"><FaClock /> {property.createdAt}</span>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           <div className="price-section">
// // //             {isForSale && (
// // //               <div className="price-card sale-price">
// // //                 <div className="price-card-icon"><FaTag /></div>
// // //                 <div className="price-card-content">
// // //                   <span className="price-label">قیمت فروش</span>
// // //                   <div className="price-value-wrapper">
// // //                     <span className="price-number">{property.price}</span>
// // //                     <span className="price-unit">تومان</span>
// // //                   </div>
// // //                   {formattedPricePerMeter && 
// // //                     <div className="price-meta">
// // //                       <FaRuler />
// // //                       <span>متری {formattedPricePerMeter}</span>
// // //                     </div>
// // //                   }
// // //                 </div>
// // //               </div>
// // //             )}
            
// // //             {isForRent && (
// // //               <div className="rent-price-group">
// // //                 {property.mortgagePrice && property.mortgagePrice !== "۰" && (
// // //                   <div className="price-card mortgage-price">
// // //                     <div className="price-card-icon"><FaBuilding /></div>
// // //                     <div className="price-card-content">
// // //                       <span className="price-label">مبلغ رهن</span>
// // //                       <div className="price-value-wrapper">
// // //                         <span className="price-number">{property.mortgagePrice}</span>
// // //                         <span className="price-unit">تومان</span>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //                 {property.rentPrice && property.rentPrice !== "۰" && (
// // //                   <div className="price-card rent-price">
// // //                     <div className="price-card-icon"><FaHome /></div>
// // //                     <div className="price-card-content">
// // //                       <span className="price-label">اجاره ماهانه</span>
// // //                       <div className="price-value-wrapper">
// // //                         <span className="price-number">{property.rentPrice}</span>
// // //                         <span className="price-unit">تومان</span>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             )}
// // //           </div>
          
// // //           <div className="quick-specs">
// // //             <div className="spec-item">
// // //               <FaRulerCombined />
// // //               <span className="spec-label">متراژ</span>
// // //               <span className="spec-value">{property.area} متر²</span>
// // //             </div>
// // //             <div className="spec-item">
// // //               <FaBath />
// // //               <span className="spec-label">اتاق‌خواب</span>
// // //               <span className="spec-value">{property.rooms} خواب</span>
// // //             </div>
// // //             <div className="spec-item">
// // //               <FaLayerGroup />
// // //               <span className="spec-label">طبقه</span>
// // //               <span className="spec-value">{property.floor} از {property.totalFloors}</span>
// // //             </div>
// // //             <div className="spec-item">
// // //               <FaCalendarAlt />
// // //               <span className="spec-label">سال ساخت</span>
// // //               <span className="spec-value">{property.year}</span>
// // //             </div>
// // //           </div>
          
// // //           <div className="info-chips">
// // //             <span className="info-chip">کد ملک: {property.id}</span>
// // //             <span className="info-chip"><FaShieldAlt /> {property.certificate}</span>
// // //             <span className="info-chip type-chip">{isForSale ? 'فروش' : 'رهن و اجاره'}</span>
// // //           </div>
          
// // //           <div className="detail-tabs">
// // //             <button className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`} onClick={() => setActiveTab('details')}>جزئیات ملک</button>
// // //             <button className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`} onClick={() => setActiveTab('features')}>امکانات ({property.features.length})</button>
// // //             <button className={`tab-btn ${activeTab === 'warnings' ? 'active' : ''}`} onClick={() => setActiveTab('warnings')}>هشدارهای معامله</button>
// // //             <button className={`tab-btn ${activeTab === 'nearby' ? 'active' : ''}`} onClick={() => setActiveTab('nearby')}>امکانات اطراف</button>
// // //           </div>
          
// // //           <div className="tab-content">
// // //             {activeTab === 'details' && (
// // //               <div className="details-tab">
// // //                 <div className="address-card">
// // //                   <FaMapMarkerAlt />
// // //                   <div className="address-info">
// // //                     <h3>آدرس ملک</h3>
// // //                     <div>منطقه {property.regionName}</div>
// // //                     <p>{property.address}</p>
// // //                     <span className="post-date">تاریخ درج: {property.createdAt}</span>
// // //                   </div>
// // //                 </div>
// // //                 <div className="description-card">
// // //                   <h3>توضیحات کامل {property.title}</h3>
// // //                   <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(property.description, { ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'a', 'blockquote'], ALLOWED_ATTR: ['href', 'target'] }) }} />
// // //                 </div>
// // //                 <div className="map-card">
// // //                   <h3><FaMapMarkerAlt /> موقعیت مکانی ملک در منطقه {property.regionName}</h3>
// // //                   <div className="map-location-badge">
// // //                     {property.showExactLocation ? 
// // //                       <span className="badge exact">📍 نمایش موقعیت دقیق ملک</span> : 
// // //                       <span className="badge approximate">🔵 نمایش محدوده تقریبی</span>
// // //                     }
// // //                   </div>
// // //                   <div className="map-container">
// // //                     <NeshanMap 
// // //                       mapKey="web.31c5ea6c425e40cc9b30620a84a8be90" 
// // //                       center={{ latitude: property.location.lat, longitude: property.location.lng }} 
// // //                       zoom={property.showExactLocation ? 17 : 15.9} 
// // //                       defaultType="dreamy" 
// // //                       poi={true} 
// // //                       traffic={false} 
// // //                       style={{ height: '100%', width: '100%', pointerEvents: 'none' }} 
// // //                     />
// // //                     <div className="map-marker-overlay">
// // //                       {property.showExactLocation ? 
// // //                         <><div className="location-dot"></div><div className="location-ripple"></div></> : 
// // //                         <div className="location-circles"><div className="circle-3"></div></div>
// // //                       }
// // //                     </div>
// // //                   </div>
// // //                   <div className="map-privacy-note">
// // //                     <small>{property.showExactLocation ? '📍 موقعیت دقیق ملک' : '📍 محدوده تقریبی ملک'}</small>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}
            
// // //             {activeTab === 'features' && (
// // //               <div className="features-tab">
// // //                 <h3>امکانات و ویژگی‌ها</h3>
// // //                 <div className="features-grid">
// // //                   {property.features.length > 0 ? 
// // //                     property.features.map((feature, idx) => {
// // //                       let Icon = FaCheckCircle;
// // //                       if (feature.includes('پارکینگ')) Icon = FaParking;
// // //                       else if (feature.includes('انباری')) Icon = FaWarehouse;
// // //                       else if (feature.includes('آسانسور')) Icon = FaArrowUp;
// // //                       else if (feature.includes('استخر')) Icon = FaSwimmingPool;
// // //                       return (
// // //                         <div key={idx} className="feature-card">
// // //                           <Icon />
// // //                           <span>{feature}</span>
// // //                         </div>
// // //                       );
// // //                     }) : 
// // //                     <p className="no-data">امکاناتی ثبت نشده است</p>
// // //                   }
// // //                 </div>
// // //               </div>
// // //             )}
            
// // //             {activeTab === 'warnings' && (
// // //               <div className="warnings-tab">
// // //                 <h3>⚠️ هشدارهای مهم</h3>
// // //                 <ul className="warnings-list">
// // //                   {property.warnings.map((w, idx) => (
// // //                     <li key={idx} className="warning-item">
// // //                       <span className="warning-bullet"></span>
// // //                       <span>{w}</span>
// // //                     </li>
// // //                   ))}
// // //                 </ul>
// // //                 <div className="warning-footer">
// // //                   <p>⚠️ قبل از معامله مدارک را بررسی کنید</p>
// // //                 </div>
// // //               </div>
// // //             )}
            
// // //             {activeTab === 'nearby' && (
// // //               <div className="nearby-tab">
// // //                 <h3>امکانات اطراف</h3>
// // //                 <div className="nearby-list">
// // //                   {property.nearby.map((item, idx) => (
// // //                     <div key={idx} className="nearby-item">
// // //                       <span className="nearby-name">{item.name}</span>
// // //                       <span className="nearby-distance">{item.distance}</span>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
          
// // //           {/* ============================================================ */}
// // //           {/* ========== کارت مشاور با دکمه‌های قفل شده ========== */}
// // //           {/* ============================================================ */}
// // //           <div className="agent-card">
// // //             <div className="agent-header">
// // //               {/* آواتار */}
// // //               <div 
// // //                 className={`agent-avatar-wrapper ${property.agent.hasStory ? 'has-story' : ''}`}
// // //                 style={{ 
// // //                   position: 'relative',
// // //                   display: 'inline-block',
// // //                   flexShrink: 0,
// // //                   cursor: property.agent.userId ? 'pointer' : 'default'
// // //                 }}
// // //                 onClick={property.agent.userId ? goToProfile : undefined}
// // //               >
// // //                 <SafeImage 
// // //                   src={property.agent.image} 
// // //                   alt={property.agent.name} 
// // //                   className={`agent-avatar ${property.agent.hasStory ? 'has-story' : ''}`}
// // //                   fallbackSrc="https://randomuser.me/api/portraits/men/32.jpg"
// // //                 />
                
// // //                 {property.agent.hasStory && (
// // //                   <div 
// // //                     className="story-ring-indicator"
// // //                     onClick={(e) => {
// // //                       e.stopPropagation();
// // //                       handleStoryClick(e);
// // //                     }}
// // //                   >
// // //                     <div className="story-ring-gradient"></div>
// // //                   </div>
// // //                 )}
// // //               </div>
              
// // //               <div className="agent-info">
// // //                 <div className="agent-name-wrapper">
// // //                   <h3 
// // //                     style={{ cursor: property.agent.userId ? 'pointer' : 'default' }}
// // //                     onClick={property.agent.userId ? goToProfile : undefined}
// // //                   >
// // //                     {property.agent.name}
// // //                   </h3>
                  
// // //                   {property.agent.hasStory && (
// // //                     <span 
// // //                       className="story-label" 
// // //                       onClick={(e) => {
// // //                         e.stopPropagation();
// // //                         handleStoryClick(e);
// // //                       }}
// // //                       style={{ cursor: 'pointer' }}
// // //                     >
// // //                       <span className="story-dot"></span>
// // //                       استوری
// // //                     </span>
// // //                   )}
// // //                 </div>
// // //                 <p>{property.agent.address}</p>
// // //                 <div className="agent-rating">
// // //                   <FaStar />
// // //                   <span>{property.agent.rating}</span>
// // //                   <span>({property.agent.deals} معامله)</span>
// // //                 </div>
// // //               </div>
// // //             </div>
            
// // //             {/* ============================================================ */}
// // //             {/* ===== دکمه‌های تماس با شرط لاگین ===== */}
// // //             {/* ============================================================ */}
// // //             <div className="agent-actions-wrapper">
              
// // //               {/* دکمه تماس تلفنی */}
// // //               <button 
// // //                 className={`agent-action-btn phone ${!isLoggedIn ? 'locked' : ''}`}
// // //                 onClick={handlePhoneClick}
// // //               >
// // //                 <FaPhone /> 
// // //                 <span className="btn-label">
// // //                   {isLoggedIn ? property.agent.phone : 'شماره تماس'}
// // //                 </span>
                
// // //                 {!isLoggedIn && (
// // //                   <>
// // //                     <span className="lock-badge">
// // //                       <FaLock className="lock-icon-small" />
// // //                     </span>
// // //                     <div className="lock-overlay">
// // //                       <FaLock className="lock-icon" />
// // //                       <span className="lock-text">برای مشاهده شماره</span>
// // //                       <span className="lock-subtext">وارد سامانه شوید</span>
// // //                     </div>
// // //                   </>
// // //                 )}
// // //               </button>

// // //               {/* دکمه واتساپ */}
// // //               <button 
// // //                 className={`agent-action-btn whatsapp ${!isLoggedIn ? 'locked' : ''}`}
// // //                 onClick={handleWhatsAppClick}
// // //               >
// // //                 <FaWhatsapp /> 
// // //                 <span className="btn-label">واتساپ</span>
                
// // //                 {!isLoggedIn && (
// // //                   <>
// // //                     <span className="lock-badge">
// // //                       <FaLock className="lock-icon-small" />
// // //                     </span>
// // //                     <div className="lock-overlay">
// // //                       <FaLock className="lock-icon" />
// // //                       <span className="lock-text">برای مشاهده شماره</span>
// // //                       <span className="lock-subtext">وارد سامانه شوید</span>
// // //                     </div>
// // //                   </>
// // //                 )}
// // //               </button>
// // //             </div>

// // //             {/* دکمه ورود - فقط برای کاربران غیرلاگین */}
// // //             {!isLoggedIn && (
// // //               <button 
// // //                 className="login-prompt-btn" 
// // //                 onClick={() => setShowLoginModal(true)}
// // //                 style={{ marginTop: '10px' }}
// // //               >
// // //                 <FaUser className="login-icon" />
// // //                 ورود / ثبت‌نام
// // //                 <FaArrowRight className="arrow-icon" />
// // //               </button>
// // //             )}
// // //             {/* ============================================================ */}
            
// // //           </div>
// // //         </div>
        
// // //         <DoubleSidebarBanners />
// // //         <RelatedPropertiesSlider 
// // //           currentPropertyId={property.id} 
// // //           regionName={property.regionName} 
// // //           propertyType={property.type} 
// // //         />
        
// // //         {copied && (
// // //           <div className="toast-notification">
// // //             <FaCheckCircle /> لینک کپی شد
// // //           </div>
// // //         )}
// // //       </div>
// // //     </> 
// // //   );
// // // });

// // // RealEstateDetailPageItem.displayName = 'RealEstateDetailPageItem';
// // // export default RealEstateDetailPageItem;


// // import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
// // import CryptoJS from 'crypto-js';
// // import DOMPurify from 'dompurify';
// // import { useNavigate, useLocation, useParams } from 'react-router-dom';
// // import RelatedPropertiesSlider from './RelatedPropertiesSlider';
// // import DoubleSidebarBanners from './SidebarBanner';
// // import { 
// //   FaMapMarkerAlt, FaPhone, FaWhatsapp, FaShare, FaArrowRight, 
// //   FaStar, FaParking, FaWarehouse, FaSwimmingPool, FaBath, FaRulerCombined,
// //   FaCalendarAlt, FaLayerGroup, FaArrowUp, FaCheckCircle, FaTag, FaHome,
// //   FaBuilding, FaRuler, FaShieldAlt, FaClock, FaEye, FaLink,
// //   FaLock, FaUser, FaSpinner, FaSync, 
// //   FaBookmark, FaRegBookmark
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
// //         console.log('📡 در حال دریافت استوری برای userId:', userId);
        
// //         const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${userId}`);
        
// //         console.log('📡 Response status:', response.status);
        
// //         if (!response.ok) {
// //           throw new Error(`HTTP ${response.status}`);
// //         }
        
// //         const result = await response.json();
// //         console.log('📦 نتیجه استوری:', result);
        
// //         if (result.status === 200 && result.data && result.data.length > 0) {
// //           const userStories = result.data[0]?.storyUser || [];
// //           console.log('📸 تعداد استوری‌ها:', userStories.length);
          
// //           const formattedStories = userStories.map(story => ({
// //             ...story,
// //             url: `https://localhost:7178${story.url}`
// //           }));
// //           setStories(formattedStories);
// //         } else {
// //           console.log('⚠️ هیچ استوری پیدا نشد');
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
// //             <div 
// //               key={index} 
// //               className="story-progress-bar"
// //             >
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
// //             <img 
// //               src={agentImage} 
// //               alt={agentName} 
// //               className="story-user-avatar"
// //             />
// //             <span className="story-user-name">{agentName}</span>
// //             <span className="story-time">لحظاتی پیش</span>
// //           </div>
// //           <button className="story-close-btn" onClick={onClose}>✕</button>
// //         </div>

// //         <div className="story-content">
// //           <img 
// //             src={currentStory.url} 
// //             alt={currentStory.caption || 'استوری'} 
// //             className="story-image"
// //           />
          
// //           {currentStory.caption && (
// //             <div className="story-caption">
// //               {currentStory.caption}
// //             </div>
// //           )}

// //           {currentStory.link && (
// //             <div 
// //               className="story-link-button"
// //               onClick={() => handleStoryLink(currentStory.link)}
// //             >
// //               <FaLink />
// //               <span>{currentStory.linkText || 'مشاهده بیشتر'}</span>
// //             </div>
// //           )}
// //         </div>

// //         <div 
// //           className="story-nav-left"
// //           onClick={handlePrevStory}
// //         />
// //         <div 
// //           className="story-nav-right"
// //           onClick={handleNextStory}
// //         />
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
// // // ========== کامپوننت مودال لاگین/ثبت‌نام با کپچا ==========
// // // ============================================================
// // const LoginModal = ({ onClose }) => {
// //   const navigate = useNavigate();
  
// //   // ===== State‌ها =====
// //   const [step, setStep] = useState('phone'); // 'phone' | 'login' | 'register'
// //   const [phoneNumber, setPhoneNumber] = useState('');
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [userExists, setUserExists] = useState(null);
  
// //   // ===== State کپچا =====
// //   const [captchaId, setCaptchaId] = useState('');
// //   const [captchaImage, setCaptchaImage] = useState('');
// //   const [captchaValue, setCaptchaValue] = useState('');
// //   const [captchaLoading, setCaptchaLoading] = useState(false);

// //   // ===== دریافت کپچا =====
// //   const fetchCaptcha = useCallback(async () => {
// //     setCaptchaLoading(true);
// //     try {
// //       const response = await fetch('https://localhost:7178/api/Auth/captcha', {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //       });
      
// //       const result = await response.json();
// //       console.log('📦 کپچا دریافت شد:', result);
      
// //       if (result.captchaId && result.image) {
// //         setCaptchaId(result.captchaId);
// //         setCaptchaImage(result.image);
// //         setCaptchaValue('');
// //       }
// //     } catch (error) {
// //       console.error('❌ خطا در دریافت کپچا:', error);
// //     } finally {
// //       setCaptchaLoading(false);
// //     }
// //   }, []);

// //   // ===== دریافت کپچا هنگام باز شدن مودال =====
// //   useEffect(() => {
// //     fetchCaptcha();
// //   }, [fetchCaptcha]);

// //   // ===== تابع بررسی شماره موبایل با کپچا =====
// //   const checkPhoneNumber = async () => {
// //     if (!phoneNumber || phoneNumber.length < 10) {
// //       setError('لطفاً شماره موبایل معتبر وارد کنید');
// //       return;
// //     }

// //     if (!captchaValue || captchaValue.length < 4) {
// //       setError('لطفاً کد امنیتی را وارد کنید');
// //       return;
// //     }

// //     setLoading(true);
// //     setError('');
    
// //     try {
// //       console.log('📡 بررسی شماره با کپچا:', { phone: phoneNumber, captchaId, captchaValue });

// //       const response = await fetch('https://localhost:7178/api/Auth/CheckUser', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           mobile: phoneNumber,
// //           captchaId: captchaId,
// //           captchaValue: captchaValue
// //         }),
// //       });

// //       const result = await response.json();
// //       console.log('📦 نتیجه بررسی:', result);

// //       if (result.success === true) {
// //         setUserExists(true);
// //         setStep('login');
// //         setError('');
// //       } else if (result.success === false && result.message === 'کاربر یافت نشد') {
// //         setUserExists(false);
// //         setStep('register');
// //         setError('');
// //       } else {
// //         setError(result.message || 'خطا در بررسی اطلاعات');
// //         fetchCaptcha();
// //       }
// //     } catch (error) {
// //       console.error('❌ خطا در بررسی شماره:', error);
// //       setError('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
// //       fetchCaptcha();
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ===== تابع لاگین =====
// //   const handleLogin = async () => {
// //     if (!username || !password) {
// //       setError('لطفاً نام کاربری و رمز عبور را وارد کنید');
// //       return;
// //     }

// //     setLoading(true);
// //     setError('');

// //     try {
// //       console.log('📡 درخواست لاگین:', { username, phone: phoneNumber });

// //       const response = await fetch('https://localhost:7178/api/Auth/Login', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           username: username,
// //           password: password,
// //           phone: phoneNumber
// //         }),
// //       });

// //       const result = await response.json();
// //       console.log('📦 نتیجه لاگین:', result);

// //       if (result.status === 200 && result.data) {
// //         localStorage.setItem('auth_token', result.data.token);
// //         localStorage.setItem('user', JSON.stringify(result.data.user));
        
// //         window.dispatchEvent(new Event('authChange'));
        
// //         onClose();
// //         window.location.reload();
// //       } else {
// //         setError(result.message || 'نام کاربری یا رمز عبور اشتباه است');
// //       }
// //     } catch (error) {
// //       console.error('❌ خطا در لاگین:', error);
// //       setError('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ===== تابع ثبت‌نام =====
// //   const handleRegister = async () => {
// //     if (!username || username.length < 3) {
// //       setError('نام کاربری باید حداقل ۳ کاراکتر باشد');
// //       return;
// //     }
// //     if (!password || password.length < 6) {
// //       setError('رمز عبور باید حداقل ۶ کاراکتر باشد');
// //       return;
// //     }
// //     if (password !== confirmPassword) {
// //       setError('رمز عبور و تکرار آن مطابقت ندارند');
// //       return;
// //     }

// //     setLoading(true);
// //     setError('');

// //     try {
// //       console.log('📡 درخواست ثبت‌نام:', { username, phone: phoneNumber });

// //       const response = await fetch('https://localhost:7178/api/Auth/Register', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           username: username,
// //           password: password,
// //           phone: phoneNumber,
// //           name: username
// //         }),
// //       });

// //       const result = await response.json();
// //       console.log('📦 نتیجه ثبت‌نام:', result);

// //       if (result.status === 200 || result.status === 201) {
// //         const loginResponse = await fetch('https://localhost:7178/api/Auth/Login', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify({
// //             username: username,
// //             password: password,
// //             phone: phoneNumber
// //           }),
// //         });

// //         const loginResult = await loginResponse.json();

// //         if (loginResult.status === 200 && loginResult.data) {
// //           localStorage.setItem('auth_token', loginResult.data.token);
// //           localStorage.setItem('user', JSON.stringify(loginResult.data.user));
          
// //           window.dispatchEvent(new Event('authChange'));
// //           onClose();
// //           window.location.reload();
// //         } else {
// //           setError('ثبت‌نام موفق بود. لطفاً وارد شوید.');
// //           setStep('login');
// //         }
// //       } else {
// //         setError(result.message || 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.');
// //       }
// //     } catch (error) {
// //       console.error('❌ خطا در ثبت‌نام:', error);
// //       setError('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ===== بازگشت به مرحله قبل =====
// //   const handleBack = () => {
// //     setStep('phone');
// //     setError('');
// //     setUserExists(null);
// //     setCaptchaValue('');
// //     fetchCaptcha();
// //   };

// //   // ===== رفتن به صفحه ثبت‌نام اصلی =====
// //   const goToRegisterPage = () => {
// //     onClose();
// //     navigate('/register', { 
// //       state: { 
// //         from: window.location.pathname,
// //         phone: phoneNumber
// //       } 
// //     });
// //   };

// //   // ============================================================
// //   // ===== رندر مرحله شماره موبایل با کپچا =====
// //   // ============================================================
// //   const renderPhoneStep = () => (
// //     <>
// //       <div className="modal-icon">
// //         <FaPhone className="modal-phone-icon" />
// //       </div>
      
// //       <h2 className="modal-title">ورود / ثبت‌نام</h2>
// //       <p className="modal-description">
// //         برای مشاهده شماره تماس مشاور،
// //         <br />
// //         لطفاً شماره موبایل خود را وارد کنید
// //       </p>

// //       <div className="phone-input-wrapper">
// //         <div className="phone-prefix">+98</div>
// //         <input
// //           type="tel"
// //           className="phone-input"
// //           placeholder="۹۱۲۳۴۵۶۷۸۹"
// //           value={phoneNumber}
// //           onChange={(e) => {
// //             const value = e.target.value.replace(/\D/g, '');
// //             if (value.length <= 11) {
// //               setPhoneNumber(value);
// //             }
// //           }}
// //           maxLength="11"
// //           autoFocus
// //           onKeyDown={(e) => {
// //             if (e.key === 'Enter') {
// //               checkPhoneNumber();
// //             }
// //           }}
// //         />
// //       </div>

// //       {/* ===== بخش کپچا ===== */}
// //       <div className="captcha-container">
// //         <div className="captcha-image-wrapper">
// //           {captchaLoading ? (
// //             <div className="captcha-loading">
// //               <FaSpinner className="spinner" />
// //             </div>
// //           ) : (
// //             <img 
// //               src={captchaImage} 
// //               alt="کد امنیتی" 
// //               className="captcha-image"
// //             />
// //           )}
// //           <button 
// //             className="captcha-refresh-btn"
// //             onClick={fetchCaptcha}
// //             disabled={captchaLoading}
// //             title="تغییر کد امنیتی"
// //           >
// //             <FaSync className={captchaLoading ? 'spinner' : ''} />
// //           </button>
// //         </div>
        
// //         <input
// //           type="text"
// //           className="captcha-input"
// //           placeholder="کد امنیتی را وارد کنید"
// //           value={captchaValue}
// //           onChange={(e) => {
// //             const value = e.target.value.replace(/\D/g, '');
// //             if (value.length <= 4) {
// //               setCaptchaValue(value);
// //             }
// //           }}
// //           maxLength="4"
// //           onKeyDown={(e) => {
// //             if (e.key === 'Enter') {
// //               checkPhoneNumber();
// //             }
// //           }}
// //         />
// //       </div>

// //       {error && <div className="error-message-text">{error}</div>}

// //       <button 
// //         className="modal-submit-btn"
// //         onClick={checkPhoneNumber}
// //         disabled={loading || phoneNumber.length < 10 || captchaValue.length < 4}
// //       >
// //         {loading ? (
// //           <>
// //             <FaSpinner className="spinner" />
// //             در حال بررسی...
// //           </>
// //         ) : (
// //           <>
// //             ادامه
// //             <FaArrowRight />
// //           </>
// //         )}
// //       </button>

// //       <p className="modal-footer-text">
// //         با ادامه، شما با <a href="/terms">قوانین</a> موافقت می‌کنید
// //       </p>
// //     </>
// //   );

// //   // ============================================================
// //   // ===== رندر مرحله لاگین =====
// //   // ============================================================
// //   const renderLoginStep = () => (
// //     <>
// //       <button className="modal-back-btn" onClick={handleBack}>
// //         ← بازگشت
// //       </button>

// //       <div className="modal-icon">
// //         <FaUser className="modal-login-icon" />
// //       </div>
      
// //       <h2 className="modal-title">خوش آمدید</h2>
// //       <p className="modal-description">
// //         شماره <strong>{phoneNumber}</strong> در سامانه ثبت شده است
// //         <br />
// //         لطفاً وارد شوید
// //       </p>

// //       <div className="input-group">
// //         <div className="input-wrapper">
// //           <FaUser className="input-icon" />
// //           <input
// //             type="text"
// //             className="modal-input"
// //             placeholder="نام کاربری"
// //             value={username}
// //             onChange={(e) => setUsername(e.target.value)}
// //             onKeyDown={(e) => {
// //               if (e.key === 'Enter') {
// //                 handleLogin();
// //               }
// //             }}
// //           />
// //         </div>

// //         <div className="input-wrapper">
// //           <FaLock className="input-icon" />
// //           <input
// //             type="password"
// //             className="modal-input"
// //             placeholder="رمز عبور"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             onKeyDown={(e) => {
// //               if (e.key === 'Enter') {
// //                 handleLogin();
// //               }
// //             }}
// //           />
// //         </div>
// //       </div>

// //       {error && <div className="error-message-text">{error}</div>}

// //       <button 
// //         className="modal-submit-btn"
// //         onClick={handleLogin}
// //         disabled={loading || !username || !password}
// //       >
// //         {loading ? (
// //           <>
// //             <FaSpinner className="spinner" />
// //             در حال ورود...
// //           </>
// //         ) : (
// //           <>
// //             ورود
// //             <FaArrowRight />
// //           </>
// //         )}
// //       </button>

// //       <button className="modal-guest-btn" onClick={onClose}>
// //         ادامه به عنوان مهمان
// //       </button>
// //     </>
// //   );

// //   // ============================================================
// //   // ===== رندر مرحله ثبت‌نام =====
// //   // ============================================================
// //   const renderRegisterStep = () => (
// //     <>
// //       <button className="modal-back-btn" onClick={handleBack}>
// //         ← بازگشت
// //       </button>

// //       <div className="modal-icon">
// //         <FaUser className="modal-register-icon" />
// //       </div>
      
// //       <h2 className="modal-title">ثبت‌نام</h2>
// //       <p className="modal-description">
// //         شماره <strong>{phoneNumber}</strong> در سامانه ثبت نشده است
// //         <br />
// //         لطفاً ثبت‌نام کنید
// //       </p>

// //       <div className="input-group">
// //         <div className="input-wrapper">
// //           <FaUser className="input-icon" />
// //           <input
// //             type="text"
// //             className="modal-input"
// //             placeholder="نام کاربری (حداقل ۳ کاراکتر)"
// //             value={username}
// //             onChange={(e) => setUsername(e.target.value)}
// //             onKeyDown={(e) => {
// //               if (e.key === 'Enter') {
// //                 handleRegister();
// //               }
// //             }}
// //           />
// //         </div>

// //         <div className="input-wrapper">
// //           <FaLock className="input-icon" />
// //           <input
// //             type="password"
// //             className="modal-input"
// //             placeholder="رمز عبور (حداقل ۶ کاراکتر)"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             onKeyDown={(e) => {
// //               if (e.key === 'Enter') {
// //                 handleRegister();
// //               }
// //             }}
// //           />
// //         </div>

// //         <div className="input-wrapper">
// //           <FaCheckCircle className="input-icon" />
// //           <input
// //             type="password"
// //             className="modal-input"
// //             placeholder="تکرار رمز عبور"
// //             value={confirmPassword}
// //             onChange={(e) => setConfirmPassword(e.target.value)}
// //             onKeyDown={(e) => {
// //               if (e.key === 'Enter') {
// //                 handleRegister();
// //               }
// //             }}
// //           />
// //         </div>
// //       </div>

// //       {error && <div className="error-message-text">{error}</div>}

// //       <button 
// //         className="modal-submit-btn"
// //         onClick={handleRegister}
// //         disabled={loading || !username || !password || !confirmPassword}
// //       >
// //         {loading ? (
// //           <>
// //             <FaSpinner className="spinner" />
// //             در حال ثبت‌نام...
// //           </>
// //         ) : (
// //           <>
// //             ثبت‌نام
// //             <FaArrowRight />
// //           </>
// //         )}
// //       </button>

// //       <button 
// //         className="modal-guest-btn" 
// //         onClick={goToRegisterPage}
// //       >
// //         ثبت‌نام کامل در صفحه جداگانه
// //       </button>
// //     </>
// //   );

// //   // ============================================================
// //   // ===== رندر اصلی =====
// //   // ============================================================
// //   return (
// //     <div className="login-modal-overlay" onClick={onClose}>
// //       <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
// //         <button className="modal-close-btn" onClick={onClose}>✕</button>
        
// //         {step === 'phone' && renderPhoneStep()}
// //         {step === 'login' && renderLoginStep()}
// //         {step === 'register' && renderRegisterStep()}
        
// //         <div className="modal-benefits-mini">
// //           <span>✅ ثبت‌نام رایگان</span>
// //           <span>🔒 امن و مطمئن</span>
// //           <span>⚡ کمتر از ۱ دقیقه</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

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
  
// //   // ===== STATE برای بوک‌مارک =====
// //   const [isBookmarked, setIsBookmarked] = useState(false);
// //   const [bookmarkLoading, setBookmarkLoading] = useState(false);
  
// //   const [imagesLoaded, setImagesLoaded] = useState({});
// //   const [showStoryPopup, setShowStoryPopup] = useState(false);
// //   const [storyUserId, setStoryUserId] = useState(null);
  
// //   // ===== STATE برای لاگین و مودال =====
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [showLoginModal, setShowLoginModal] = useState(false);

// //   // ===== بررسی لاگین =====
// //   useEffect(() => {
// //     const checkLogin = () => {
// //       const token = localStorage.getItem('auth_token');
// //       if (token) {
// //         setIsLoggedIn(true);
// //       } else {
// //         setIsLoggedIn(false);
// //         // اگر کاربر لاگین نیست، حتماً بوک‌مارک false است
// //     setIsBookmarked(false)
// //       }
// //     };
    
// //     checkLogin();
    
// //     window.addEventListener('authChange', checkLogin);
// //     window.addEventListener('storage', checkLogin);
    
// //     return () => {
// //       window.removeEventListener('authChange', checkLogin);
// //       window.removeEventListener('storage', checkLogin);
// //     };
// //   }, []);

// //   // ============================================================
// //   // ===== دریافت اطلاعات ملک =====
// //   // ============================================================
// //   useEffect(() => {
// //     const fetchPropertyData = async () => {
// //       if (!id) { setError('شناسه ملک یافت نشد'); setLoading(false); return; }
// //       setLoading(true); setError(null);
// //       try {
// //         const token = localStorage.getItem('auth_token');
// //         const controller = new AbortController();
// //         const timeoutId = setTimeout(() => controller.abort(), 10000);
        
// //         const API_BASE_URL = 'https://localhost:7178/api';
// //         const fetchWithAuth = (endpoint, options = {}) => {
// //           const headers = { ...options.headers };
          
// //           if (token) {
// //             headers['Authorization'] = `Bearer ${token}`;
// //           }
          
// //           return fetch(`${API_BASE_URL}${endpoint}`, {
// //             ...options,
// //             headers
// //           });
// //         };

// //         const response = await fetchWithAuth(
// //           `/RealEstatePage/GetRealEstateDetails?id=${id}`,
// //           { signal: controller.signal }
// //         );

// //         clearTimeout(timeoutId);
// //         if (!response.ok) throw new Error(`HTTP ${response.status}`);
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
          
// //           // ===== مقداردهی بوک‌مارک با بررسی دقیق =====
// //           // اگر کاربر لاگین نباشد، حتماً false
// //           // اگر لاگین است، مقدار از سرور بیاید
// //           // const bookmarkedValue = isLoggedIn ? (data.inBookMark === true) : false;
// //           const bookmarkedValue = isLoggedIn ? !!data.inBookMark : false;
// //           console.log('📕 inBookMark از سرور:', data.inBookMark);
// //               console.log('📕 inBookMark از سرور:', data);
// //           console.log('📕 isLoggedIn:', isLoggedIn);
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
// //             inBookMark:data.inBookMark,
// //             createdAt: data.createdAtPersianRelative || "امروز", 
// //             certificate: data.isHasLoan ? "قابل وام" : "سند رسمی", 
// //             mortgage: data.isHasLoan ? "امکان وام" : "بدون وام",
// //             nearby: [{ name: "مترو", distance: "۵۰۰ متر" }, { name: "مرکز خرید", distance: "۳۰۰ متر" }, { name: "پارک", distance: "۲۰۰ متر" }, { name: "مدرسه", distance: "۴۰۰ متر" }]
// //           });
// //         } else throw new Error(result.message || 'ملک یافت نشد');
// //       } catch (error) { 
// //         console.error('خطا:', error); 
// //         setError(error.name === 'AbortError' ? 'مدت زمان درخواست به پایان رسید' : 'مشکل در ارتباط با سرور'); 
// //       } finally { 
// //         setLoading(false); 
// //       }
// //     };
// //     fetchPropertyData();
// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //   }, [id, isLoggedIn]); // ✅ اضافه کردن isLoggedIn به وابستگی‌ها

// //   // ============================================================
// //   // ===== تابع بوک‌مارک =====
// //   // ============================================================
// //   const handleBookmarkToggle = useCallback(async () => {
// //     // اگر لاگین نبود، مودال لاگین باز کن
// //     if (!isLoggedIn) {
// //       setShowLoginModal(true);
// //       return;
// //     }

// //     // اگر در حال بارگذاری است، کاری نکن
// //     if (bookmarkLoading) return;

// //     setBookmarkLoading(true);
    
// //     try {
// //       const token = localStorage.getItem('auth_token');
      
// //       console.log('📡 درخواست بوک‌مارک برای ملک:', property?.id);
// //       console.log('📡 وضعیت فعلی:', isBookmarked ? 'حذف' : 'افزودن');

// //       const response = await fetch('https://localhost:7178/api/RealEstatePage/ToggleBookMark', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`
// //         },
// //         body: JSON.stringify(property?.id),
// //       });

// //       if (response.ok) {
// //         // تغییر وضعیت بوک‌مارک
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

// //   // ============================================================
// //   // ===== توابع تماس با قفل لاگین =====
// //   // ============================================================
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

// //   // ============================================================
// //   // ===== سایر توابع =====
// //   // ============================================================
// //   const isForSale = useMemo(() => property?.type === 1, [property]);
// //   const isForRent = useMemo(() => property?.type === 2, [property]);
// //   const formattedPricePerMeter = useMemo(() => { if (!property?.priceMeter || property.priceMeter === "۰") return null; return `${property.priceMeter} تومان`; }, [property]);
// //   const shareUrl = useMemo(() => window.location.href, []);

// //   const handleCopyLink = useCallback(() => { navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }, [shareUrl]);
// //   const handleShare = useCallback(async () => { if (!property) return; const shareData = { title: property.title, text: `${property.title} - ${property.area} متری - ${isForSale ? `قیمت ${property.price}` : `رهن ${property.mortgagePrice}`} تومان`, url: shareUrl }; if (navigator.share && /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)) { try { await navigator.share(shareData); } catch (error) { if (error.name !== 'AbortError') handleCopyLink(); } } else handleCopyLink(); }, [property, isForSale, shareUrl, handleCopyLink]);
// //   const handleImageLoad = useCallback((index) => { setImagesLoaded(prev => ({ ...prev, [index]: true })); }, []);
  
// //   const goToProfile = useCallback(() => {
// //     if (property?.agent?.userId) {
// //       console.log('👤 رفتن به پروفایل کاربر:', property.agent.userId);
// //       navigate(`/profile/${property.agent.userId}`);
// //     }
// //   }, [property, navigate]);

// //   const handleStoryClick = useCallback((e) => {
// //     if (e) {
// //       e.stopPropagation();
// //     }
    
// //     console.log('🖱️ کلیک روی استوری');
// //     console.log('🆔 storyUserId:', storyUserId);
// //     console.log('📱 hasStory:', property?.agent?.hasStory);
    
// //     if (storyUserId) {
// //       console.log('✅ باز کردن استوری برای userId:', storyUserId);
// //       setShowStoryPopup(true);
// //       document.body.style.overflow = 'hidden';
// //     } else {
// //       console.log('❌ این کاربر استوری ندارد');
// //     }
// //   }, [storyUserId, property]);

// //   const handleStoryClose = useCallback(() => {
// //     setShowStoryPopup(false);
// //     document.body.style.overflow = '';
// //   }, []);

// //   const handleLoginModalClose = useCallback(() => {
// //     setShowLoginModal(false);
// //     const token = localStorage.getItem('auth_token');
// //     if (token) {
// //       setIsLoggedIn(true);
// //       // بعد از لاگین، دوباره اطلاعات بوک‌مارک را دریافت کن
// //       // این کار با useEffect که به isLoggedin وابسته است انجام می‌شود
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
      
// //       {/* ===== پاپ‌آپ استوری ===== */}
// //       {showStoryPopup && (
// //         <StoryPopup 
// //           agentName={property.agent.name}
// //           agentImage={property.agent.image}
// //           userId={storyUserId}
// //           onClose={handleStoryClose}
// //         />
// //       )}

// //       {/* ===== مودال لاگین/ثبت‌نام ===== */}
// //       {showLoginModal && (
// //         <LoginModal 
// //           onClose={handleLoginModalClose}
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
// //           <button className="header-btn" onClick={handleShare}><FaShare /></button>
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
// //                   <div className="gallery-slide">
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
          
// //           {/* ===== دکمه بوک‌مارک ===== */}
// //           <button 
// //             className={`bookmark-btn ${isBookmarked ? 'active' : ''}`} 
// //             onClick={handleBookmarkToggle}
// //             disabled={bookmarkLoading || !isLoggedIn}
// //             title={!isLoggedIn ? 'برای افزودن به بوک‌مارک وارد شوید' : (isBookmarked ? 'حذف از بوک‌مارک‌ها' : 'افزودن به بوک‌مارک‌ها')}
// //           >
// //             {bookmarkLoading ? (
// //               <FaSpinner className="spinner" />
// //             ) : (
// //               isBookmarked ? <FaBookmark /> : <FaRegBookmark />
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
          
// //           {/* ============================================================ */}
// //           {/* ========== کارت مشاور با دکمه‌های قفل شده ========== */}
// //           {/* ============================================================ */}
// //           <div className="agent-card">
// //             <div className="agent-header">
// //               {/* آواتار */}
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
// //                     <div className="story-ring-gradient"></div>
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
            
// //             {/* ============================================================ */}
// //             {/* ===== دکمه‌های تماس با شرط لاگین ===== */}
// //             {/* ============================================================ */}
// //             <div className="agent-actions-wrapper">
              
// //               {/* دکمه تماس تلفنی */}
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

// //               {/* دکمه واتساپ */}
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

// //             {/* دکمه ورود - فقط برای کاربران غیرلاگین */}
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
// //             {/* ============================================================ */}
            
// //           </div>
// //         </div>
        
// //         <DoubleSidebarBanners />
// //         <RelatedPropertiesSlider 
// //           currentPropertyId={property.id} 
// //           regionName={property.regionName} 
// //           propertyType={property.type} 
// //         />
        
// //         {copied && (
// //           <div className="toast-notification">
// //             <FaCheckCircle /> لینک کپی شد
// //           </div>
// //         )}
// //       </div>
// //     </> 
// //   );
// // });

// // RealEstateDetailPageItem.displayName = 'RealEstateDetailPageItem';
// // export default RealEstateDetailPageItem;

// import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
// import CryptoJS from 'crypto-js';
// import DOMPurify from 'dompurify';
// import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import RelatedPropertiesSlider from './RelatedPropertiesSlider';
// import DoubleSidebarBanners from './SidebarBanner';
// import { 
//   FaMapMarkerAlt, FaPhone, FaWhatsapp, FaShare, FaArrowRight, 
//   FaStar, FaParking, FaWarehouse, FaSwimmingPool, FaBath, FaRulerCombined,
//   FaCalendarAlt, FaLayerGroup, FaArrowUp, FaCheckCircle, FaTag, FaHome,
//   FaBuilding, FaRuler, FaShieldAlt, FaClock, FaEye, FaLink,
//   FaLock, FaUser, FaSpinner, FaSync, 
//   FaBookmark, FaRegBookmark
// } from 'react-icons/fa';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import NeshanMap from "@neshan-maps-platform/react-openlayers";
// import "@neshan-maps-platform/react-openlayers/dist/style.css";
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import './RealEstateDetailPageItem.css';

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
//         console.log('📡 در حال دریافت استوری برای userId:', userId);
        
//         const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${userId}`);
        
//         console.log('📡 Response status:', response.status);
        
//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }
        
//         const result = await response.json();
//         console.log('📦 نتیجه استوری:', result);
        
//         if (result.status === 200 && result.data && result.data.length > 0) {
//           const userStories = result.data[0]?.storyUser || [];
//           console.log('📸 تعداد استوری‌ها:', userStories.length);
          
//           const formattedStories = userStories.map(story => ({
//             ...story,
//             url: `https://localhost:7178${story.url}`
//           }));
//           setStories(formattedStories);
//         } else {
//           console.log('⚠️ هیچ استوری پیدا نشد');
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
//             <div 
//               key={index} 
//               className="story-progress-bar"
//             >
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
//             <img 
//               src={agentImage} 
//               alt={agentName} 
//               className="story-user-avatar"
//             />
//             <span className="story-user-name">{agentName}</span>
//             <span className="story-time">لحظاتی پیش</span>
//           </div>
//           <button className="story-close-btn" onClick={onClose}>✕</button>
//         </div>

//         <div className="story-content">
//           <img 
//             src={currentStory.url} 
//             alt={currentStory.caption || 'استوری'} 
//             className="story-image"
//           />
          
//           {currentStory.caption && (
//             <div className="story-caption">
//               {currentStory.caption}
//             </div>
//           )}

//           {currentStory.link && (
//             <div 
//               className="story-link-button"
//               onClick={() => handleStoryLink(currentStory.link)}
//             >
//               <FaLink />
//               <span>{currentStory.linkText || 'مشاهده بیشتر'}</span>
//             </div>
//           )}
//         </div>

//         <div 
//           className="story-nav-left"
//           onClick={handlePrevStory}
//         />
//         <div 
//           className="story-nav-right"
//           onClick={handleNextStory}
//         />
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
// // ========== کامپوننت مودال لاگین/ثبت‌نام با کپچا ==========
// // ============================================================
// const LoginModal = ({ onClose }) => {
//   const navigate = useNavigate();
  
//   const [step, setStep] = useState('phone');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
  
//   const [captchaId, setCaptchaId] = useState('');
//   const [captchaImage, setCaptchaImage] = useState('');
//   const [captchaValue, setCaptchaValue] = useState('');
//   const [captchaLoading, setCaptchaLoading] = useState(false);

//   const fetchCaptcha = useCallback(async () => {
//     setCaptchaLoading(true);
//     try {
//       const response = await fetch('https://localhost:7178/api/Auth/captcha', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
      
//       const result = await response.json();
//       console.log('📦 کپچا دریافت شد:', result);
      
//       if (result.captchaId && result.image) {
//         setCaptchaId(result.captchaId);
//         setCaptchaImage(result.image);
//         setCaptchaValue('');
//       }
//     } catch (error) {
//       console.error('❌ خطا در دریافت کپچا:', error);
//     } finally {
//       setCaptchaLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCaptcha();
//   }, [fetchCaptcha]);

//   const checkPhoneNumber = async () => {
//     if (!phoneNumber || phoneNumber.length < 10) {
//       setError('لطفاً شماره موبایل معتبر وارد کنید');
//       return;
//     }

//     if (!captchaValue || captchaValue.length < 4) {
//       setError('لطفاً کد امنیتی را وارد کنید');
//       return;
//     }

//     setLoading(true);
//     setError('');
    
//     try {
//       console.log('📡 بررسی شماره با کپچا:', { phone: phoneNumber, captchaId, captchaValue });

//       const response = await fetch('https://localhost:7178/api/Auth/CheckUser', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           mobile: phoneNumber,
//           captchaId: captchaId,
//           captchaValue: captchaValue
//         }),
//       });

//       const result = await response.json();
//       console.log('📦 نتیجه بررسی:', result);

//       if (result.success === true) {
//         setStep('login');
//         setError('');
//       } else if (result.success === false && result.message === 'کاربر یافت نشد') {
//         setStep('register');
//         setError('');
//       } else {
//         setError(result.message || 'خطا در بررسی اطلاعات');
//         fetchCaptcha();
//       }
//     } catch (error) {
//       console.error('❌ خطا در بررسی شماره:', error);
//       setError('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
//       fetchCaptcha();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogin = async () => {
//     if (!username || !password) {
//       setError('لطفاً نام کاربری و رمز عبور را وارد کنید');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       console.log('📡 درخواست لاگین:', { username, phone: phoneNumber });

//       const response = await fetch('https://localhost:7178/api/Auth/Login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: username,
//           password: password,
//           phone: phoneNumber
//         }),
//       });

//       const result = await response.json();
//       console.log('📦 نتیجه لاگین:', result);

//       if (result.status === 200 && result.data) {
//         localStorage.setItem('auth_token', result.data.token);
//         localStorage.setItem('user', JSON.stringify(result.data.user));
        
//         window.dispatchEvent(new Event('authChange'));
        
//         onClose();
//         window.location.reload();
//       } else {
//         setError(result.message || 'نام کاربری یا رمز عبور اشتباه است');
//       }
//     } catch (error) {
//       console.error('❌ خطا در لاگین:', error);
//       setError('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegister = async () => {
//     if (!username || username.length < 3) {
//       setError('نام کاربری باید حداقل ۳ کاراکتر باشد');
//       return;
//     }
//     if (!password || password.length < 6) {
//       setError('رمز عبور باید حداقل ۶ کاراکتر باشد');
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError('رمز عبور و تکرار آن مطابقت ندارند');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       console.log('📡 درخواست ثبت‌نام:', { username, phone: phoneNumber });

//       const response = await fetch('https://localhost:7178/api/Auth/Register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: username,
//           password: password,
//           phone: phoneNumber,
//           name: username
//         }),
//       });

//       const result = await response.json();
//       console.log('📦 نتیجه ثبت‌نام:', result);

//       if (result.status === 200 || result.status === 201) {
//         const loginResponse = await fetch('https://localhost:7178/api/Auth/Login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             username: username,
//             password: password,
//             phone: phoneNumber
//           }),
//         });

//         const loginResult = await loginResponse.json();

//         if (loginResult.status === 200 && loginResult.data) {
//           localStorage.setItem('auth_token', loginResult.data.token);
//           localStorage.setItem('user', JSON.stringify(loginResult.data.user));
          
//           window.dispatchEvent(new Event('authChange'));
//           onClose();
//           window.location.reload();
//         } else {
//           setError('ثبت‌نام موفق بود. لطفاً وارد شوید.');
//           setStep('login');
//         }
//       } else {
//         setError(result.message || 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.');
//       }
//     } catch (error) {
//       console.error('❌ خطا در ثبت‌نام:', error);
//       setError('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     setStep('phone');
//     setError('');
//     setCaptchaValue('');
//     fetchCaptcha();
//   };

//   const goToRegisterPage = () => {
//     onClose();
//     navigate('/register', { 
//       state: { 
//         from: window.location.pathname,
//         phone: phoneNumber
//       } 
//     });
//   };

//   const renderPhoneStep = () => (
//     <>
//       <div className="modal-icon">
//         <FaPhone className="modal-phone-icon" />
//       </div>
      
//       <h2 className="modal-title">ورود / ثبت‌نام</h2>
//       <p className="modal-description">
//         برای ادامه، لطفاً شماره موبایل خود را وارد کنید
//       </p>

//       <div className="phone-input-wrapper">
//         <div className="phone-prefix">+98</div>
//         <input
//           type="tel"
//           className="phone-input"
//           placeholder="۹۱۲۳۴۵۶۷۸۹"
//           value={phoneNumber}
//           onChange={(e) => {
//             const value = e.target.value.replace(/\D/g, '');
//             if (value.length <= 11) {
//               setPhoneNumber(value);
//             }
//           }}
//           maxLength="11"
//           autoFocus
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') {
//               checkPhoneNumber();
//             }
//           }}
//         />
//       </div>

//       <div className="captcha-container">
//         <div className="captcha-image-wrapper">
//           {captchaLoading ? (
//             <div className="captcha-loading">
//               <FaSpinner className="spinner" />
//             </div>
//           ) : (
//             <img 
//               src={captchaImage} 
//               alt="کد امنیتی" 
//               className="captcha-image"
//             />
//           )}
//           <button 
//             className="captcha-refresh-btn"
//             onClick={fetchCaptcha}
//             disabled={captchaLoading}
//             title="تغییر کد امنیتی"
//           >
//             <FaSync className={captchaLoading ? 'spinner' : ''} />
//           </button>
//         </div>
        
//         <input
//           type="text"
//           className="captcha-input"
//           placeholder="کد امنیتی را وارد کنید"
//           value={captchaValue}
//           onChange={(e) => {
//             const value = e.target.value.replace(/\D/g, '');
//             if (value.length <= 4) {
//               setCaptchaValue(value);
//             }
//           }}
//           maxLength="4"
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') {
//               checkPhoneNumber();
//             }
//           }}
//         />
//       </div>

//       {error && <div className="error-message-text">{error}</div>}

//       <button 
//         className="modal-submit-btn"
//         onClick={checkPhoneNumber}
//         disabled={loading || phoneNumber.length < 10 || captchaValue.length < 4}
//       >
//         {loading ? (
//           <>
//             <FaSpinner className="spinner" />
//             در حال بررسی...
//           </>
//         ) : (
//           <>
//             ادامه
//             <FaArrowRight />
//           </>
//         )}
//       </button>

//       <p className="modal-footer-text">
//         با ادامه، شما با <a href="/terms">قوانین</a> موافقت می‌کنید
//       </p>
//     </>
//   );

//   const renderLoginStep = () => (
//     <>
//       <button className="modal-back-btn" onClick={handleBack}>
//         ← بازگشت
//       </button>

//       <div className="modal-icon">
//         <FaUser className="modal-login-icon" />
//       </div>
      
//       <h2 className="modal-title">خوش آمدید</h2>
//       <p className="modal-description">
//         شماره <strong>{phoneNumber}</strong> در سامانه ثبت شده است
//         <br />
//         لطفاً وارد شوید
//       </p>

//       <div className="input-group">
//         <div className="input-wrapper">
//           <FaUser className="input-icon" />
//           <input
//             type="text"
//             className="modal-input"
//             placeholder="نام کاربری"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') {
//                 handleLogin();
//               }
//             }}
//           />
//         </div>

//         <div className="input-wrapper">
//           <FaLock className="input-icon" />
//           <input
//             type="password"
//             className="modal-input"
//             placeholder="رمز عبور"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') {
//                 handleLogin();
//               }
//             }}
//           />
//         </div>
//       </div>

//       {error && <div className="error-message-text">{error}</div>}

//       <button 
//         className="modal-submit-btn"
//         onClick={handleLogin}
//         disabled={loading || !username || !password}
//       >
//         {loading ? (
//           <>
//             <FaSpinner className="spinner" />
//             در حال ورود...
//           </>
//         ) : (
//           <>
//             ورود
//             <FaArrowRight />
//           </>
//         )}
//       </button>

//       <button className="modal-guest-btn" onClick={onClose}>
//         ادامه به عنوان مهمان
//       </button>
//     </>
//   );

//   const renderRegisterStep = () => (
//     <>
//       <button className="modal-back-btn" onClick={handleBack}>
//         ← بازگشت
//       </button>

//       <div className="modal-icon">
//         <FaUser className="modal-register-icon" />
//       </div>
      
//       <h2 className="modal-title">ثبت‌نام</h2>
//       <p className="modal-description">
//         شماره <strong>{phoneNumber}</strong> در سامانه ثبت نشده است
//         <br />
//         لطفاً ثبت‌نام کنید
//       </p>

//       <div className="input-group">
//         <div className="input-wrapper">
//           <FaUser className="input-icon" />
//           <input
//             type="text"
//             className="modal-input"
//             placeholder="نام کاربری (حداقل ۳ کاراکتر)"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') {
//                 handleRegister();
//               }
//             }}
//           />
//         </div>

//         <div className="input-wrapper">
//           <FaLock className="input-icon" />
//           <input
//             type="password"
//             className="modal-input"
//             placeholder="رمز عبور (حداقل ۶ کاراکتر)"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') {
//                 handleRegister();
//               }
//             }}
//           />
//         </div>

//         <div className="input-wrapper">
//           <FaCheckCircle className="input-icon" />
//           <input
//             type="password"
//             className="modal-input"
//             placeholder="تکرار رمز عبور"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') {
//                 handleRegister();
//               }
//             }}
//           />
//         </div>
//       </div>

//       {error && <div className="error-message-text">{error}</div>}

//       <button 
//         className="modal-submit-btn"
//         onClick={handleRegister}
//         disabled={loading || !username || !password || !confirmPassword}
//       >
//         {loading ? (
//           <>
//             <FaSpinner className="spinner" />
//             در حال ثبت‌نام...
//           </>
//         ) : (
//           <>
//             ثبت‌نام
//             <FaArrowRight />
//           </>
//         )}
//       </button>

//       <button 
//         className="modal-guest-btn" 
//         onClick={goToRegisterPage}
//       >
//         ثبت‌نام کامل در صفحه جداگانه
//       </button>
//     </>
//   );

//   return (
//     <div className="login-modal-overlay" onClick={onClose}>
//       <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
//         <button className="modal-close-btn" onClick={onClose}>✕</button>
        
//         {step === 'phone' && renderPhoneStep()}
//         {step === 'login' && renderLoginStep()}
//         {step === 'register' && renderRegisterStep()}
        
//         <div className="modal-benefits-mini">
//           <span>✅ ثبت‌نام رایگان</span>
//           <span>🔒 امن و مطمئن</span>
//           <span>⚡ کمتر از ۱ دقیقه</span>
//         </div>
//       </div>
//     </div>
//   );
// };

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
  
//   // ===== STATE برای بوک‌مارک =====
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [bookmarkLoading, setBookmarkLoading] = useState(false);
  
//   const [imagesLoaded, setImagesLoaded] = useState({});
//   const [showStoryPopup, setShowStoryPopup] = useState(false);
//   const [storyUserId, setStoryUserId] = useState(null);
  
//   // ===== STATE برای لاگین و مودال =====
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);

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

//   // ============================================================
//   // ===== دریافت اطلاعات ملک =====
//   // ============================================================
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
          
//           // ===== مقداردهی بوک‌مارک =====
//           // اگر کاربر لاگین باشد، مقدار inBookMark از سرور استفاده می‌شود
//           // اگر کاربر لاگین نباشد، همیشه false
//           const bookmarkedValue = isLoggedIn ? (data.inBookMark === true) : false;
//           console.log('📕 مقدار نهایی بوک‌مارک:', bookmarkedValue);
          
//           setIsBookmarked(bookmarkedValue);
//           setStoryUserId(hasStory ? userId : null);
          
//           setProperty({
//             id: data.id, 
//             title: data.title || `ملک در ${data.regionName || 'منطقه'} `, 
//             price: data.price?.toLocaleString("fa-IR") || "۰",
//             priceMeter: data.priceMeter?.toLocaleString("fa-IR") || "۰", 
//             rentPrice: data.rent?.toLocaleString("fa-IR") || null,
//             depositPrice: data.deposit?.toLocaleString("fa-IR") || null, 
//             mortgagePrice: data.mortgagePrice?.toLocaleString("fa-IR") || null,
//             type: data.categoryType, 
//             area: parseInt(data.additionalInformation?.match(/\d+/)?.[0]) || 0, 
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
//           });
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
    
//     fetchPropertyData();
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [id, isLoggedIn]);

//   // ============================================================
//   // ===== تابع بوک‌مارک =====
//   // ============================================================
//   const handleBookmarkToggle = useCallback(async () => {
//     // اگر لاگین نبود، مودال لاگین باز کن
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//       return;
//     }

//     // اگر در حال بارگذاری است، کاری نکن
//     if (bookmarkLoading) return;

//     setBookmarkLoading(true);
    
//     try {
//       const token = localStorage.getItem('auth_token');
      
//       console.log('📡 درخواست بوک‌مارک برای ملک:', property?.id);
//       console.log('📡 وضعیت فعلی:', isBookmarked ? 'حذف' : 'افزودن');

//       const response = await fetch('https://localhost:7178/api/RealEstatePage/ToggleBookMark', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(property?.id),
//       });

//       if (response.ok) {
//         // تغییر وضعیت بوک‌مارک
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

//   // ============================================================
//   // ===== توابع تماس با قفل لاگین =====
//   // ============================================================
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

//   // ============================================================
//   // ===== سایر توابع =====
//   // ============================================================
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
  
//   const goToProfile = useCallback(() => {
//     if (property?.agent?.userId) {
//       console.log('👤 رفتن به پروفایل کاربر:', property.agent.userId);
//       navigate(`/profile/${property.agent.userId}`);
//     }
//   }, [property, navigate]);

//   const handleStoryClick = useCallback((e) => {
//     if (e) {
//       e.stopPropagation();
//     }
    
//     console.log('🖱️ کلیک روی استوری');
//     console.log('🆔 storyUserId:', storyUserId);
//     console.log('📱 hasStory:', property?.agent?.hasStory);
    
//     if (storyUserId) {
//       console.log('✅ باز کردن استوری برای userId:', storyUserId);
//       setShowStoryPopup(true);
//       document.body.style.overflow = 'hidden';
//     } else {
//       console.log('❌ این کاربر استوری ندارد');
//     }
//   }, [storyUserId, property]);

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
      
//       {/* ===== پاپ‌آپ استوری ===== */}
//       {showStoryPopup && (
//         <StoryPopup 
//           agentName={property.agent.name}
//           agentImage={property.agent.image}
//           userId={storyUserId}
//           onClose={handleStoryClose}
//         />
//       )}

//       {/* ===== مودال لاگین/ثبت‌نام ===== */}
//       {showLoginModal && (
//         <LoginModal 
//           onClose={handleLoginModalClose}
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
//           <button className="header-btn" onClick={handleShare}><FaShare /></button>
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
//                   <div className="gallery-slide">
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
          
//           {/* ===== دکمه بوک‌مارک ===== */}
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
//                 {property.mortgagePrice && property.mortgagePrice !== "۰" && (
//                   <div className="price-card mortgage-price">
//                     <div className="price-card-icon"><FaBuilding /></div>
//                     <div className="price-card-content">
//                       <span className="price-label">مبلغ رهن</span>
//                       <div className="price-value-wrapper">
//                         <span className="price-number">{property.mortgagePrice}</span>
//                         <span className="price-unit">تومان</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 {property.rentPrice && property.rentPrice !== "۰" && (
//                   <div className="price-card rent-price">
//                     <div className="price-card-icon"><FaHome /></div>
//                     <div className="price-card-content">
//                       <span className="price-label">اجاره ماهانه</span>
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
          
//           {/* ============================================================ */}
//           {/* ========== کارت مشاور با دکمه‌های قفل شده ========== */}
//           {/* ============================================================ */}
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
//                     <div className="story-ring-gradient"></div>
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
        
//         {copied && (
//           <div className="toast-notification">
//             <FaCheckCircle /> لینک کپی شد
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
  FaLock, FaUser, FaSpinner,
  FaBookmark, FaRegBookmark
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import NeshanMap from "@neshan-maps-platform/react-openlayers";
import "@neshan-maps-platform/react-openlayers/dist/style.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './RealEstateDetailPageItem.css';

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
      "additionalProperty": [{ "@type": "PropertyValue", "name": "طبقه", "value": `${property.floor || 1} از ${property.totalFloors || 1}` }, { "@type": "PropertyValue", "name": "سال ساخت", "value": property.year !== "نامشخص" ? property.year : "نامشخص" }, ...property.features.slice(0, 15).map(feature => ({ "@type": "PropertyValue", "name": "امکانات", "value": feature }))],
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

  // ===== بررسی لاگین =====
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
          
          setProperty({
            id: data.id, 
            title: data.title || `ملک در ${data.regionName || 'منطقه'} `, 
            price: data.price?.toLocaleString("fa-IR") || "۰",
            priceMeter: data.priceMeter?.toLocaleString("fa-IR") || "۰", 
            rentPrice: data.rent?.toLocaleString("fa-IR") || null,
            depositPrice: data.deposit?.toLocaleString("fa-IR") || null, 
            mortgagePrice: data.mortgagePrice?.toLocaleString("fa-IR") || null,
            type: data.categoryType, 
            area: parseInt(data.additionalInformation?.match(/\d+/)?.[0]) || 0, 
            rooms: data.rooms || 0,
            floor: data.floor || 1, 
            regionName: data.regionName || "منطقه نامشخص", 
            totalFloors: data.countFloor || 1,
            year: data.constructionYear || "نامشخص", 
            address: data.address || "آدرس درج نشده", 
            showExactLocation: data.showExactLocation,
            location: { lat: data.lat || 35.7199363, lng: data.lng || 51.4334842 },
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
            certificate: data.isHasLoan ? "قابل وام" : "سند رسمی", 
            mortgage: data.isHasLoan ? "امکان وام" : "بدون وام",
            nearby: [{ name: "مترو", distance: "۵۰۰ متر" }, { name: "مرکز خرید", distance: "۳۰۰ متر" }, { name: "پارک", distance: "۲۰۰ متر" }, { name: "مدرسه", distance: "۴۰۰ متر" }]
          });
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
    
    fetchPropertyData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, isLoggedIn]);

  // ===== تابع بوک‌مارک =====
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

  // ===== توابع تماس =====
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

  // ===== سایر توابع =====
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
    if (property?.agent?.userId) {
      navigate(`/profile/${property.agent.userId}`);
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
          <button className="header-btn" onClick={handleShare}><FaShare /></button>
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
                  <div className="gallery-slide">
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
                  <span className="price-label">قیمت فروش</span>
                  <div className="price-value-wrapper">
                    <span className="price-number">{property.price}</span>
                    <span className="price-unit">تومان</span>
                  </div>
                  {formattedPricePerMeter && 
                    <div className="price-meta">
                      <FaRuler />
                      <span>متری {formattedPricePerMeter}</span>
                    </div>
                  }
                </div>
              </div>
            )}
            
            {isForRent && (
              <div className="rent-price-group">
                {property.mortgagePrice && property.mortgagePrice !== "۰" && (
                  <div className="price-card mortgage-price">
                    <div className="price-card-icon"><FaBuilding /></div>
                    <div className="price-card-content">
                      <span className="price-label">مبلغ رهن</span>
                      <div className="price-value-wrapper">
                        <span className="price-number">{property.mortgagePrice}</span>
                        <span className="price-unit">تومان</span>
                      </div>
                    </div>
                  </div>
                )}
                {property.rentPrice && property.rentPrice !== "۰" && (
                  <div className="price-card rent-price">
                    <div className="price-card-icon"><FaHome /></div>
                    <div className="price-card-content">
                      <span className="price-label">اجاره ماهانه</span>
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
          </div>
          
          <div className="info-chips">
            <span className="info-chip">کد ملک: {property.id}</span>
            <span className="info-chip"><FaShieldAlt /> {property.certificate}</span>
            <span className="info-chip type-chip">{isForSale ? 'فروش' : 'رهن و اجاره'}</span>
          </div>
          
          <div className="detail-tabs">
            <button className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`} onClick={() => setActiveTab('details')}>جزئیات ملک</button>
            <button className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`} onClick={() => setActiveTab('features')}>امکانات ({property.features.length})</button>
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
                    <p className="no-data">امکاناتی ثبت نشده است</p>
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
          
          <div className="agent-card">
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
                  >
                    {/* <div className="story-ring-gradient"></div> */}
                  </div>
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
        
        {copied && (
          <div className="toast-notification">
            <FaCheckCircle /> لینک کپی شد
          </div>
        )}
      </div>
    </> 
  );
});

RealEstateDetailPageItem.displayName = 'RealEstateDetailPageItem';
export default RealEstateDetailPageItem;