
// // // // src/pages/RealEstatePage.jsx
// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import Slider from 'react-slick';
// // // import 'slick-carousel/slick/slick.css';
// // // import 'slick-carousel/slick/slick-theme.css';
// // // import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
// // // import { useAuth } from '../../../context/AuthContext';
// // // import DoubleSidebarBanners  from '../RealEstateDetailPageItem/SidebarBanner';
// // // import { 
// // //   buyCategoriesData, 
// // //   rentCategoriesData, 
// // //   agenciesData
// // // } from './data';
// // // import SEO from '../seo/SEO';
// // // import { siteConfig } from '../seo/seoConfig'; // اضافه شد
// // // import './RealEstatePage.css';

// // // const RealEstatePage = () => {
// // //   const navigate = useNavigate();
// // //   const [activeTab, setActiveTab] = useState('buy');
// // //   const [categories, setCategories] = useState([]);
// // //   const [agencies, setAgencies] = useState([]);
// // //   const [properties, setProperties] = useState([]);
// // //   const [tab, settabs] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [hoveredCard, setHoveredCard] = useState(null);
// // //   const [searchText, setSearchText] = useState('');
// // //   const { user } = useAuth();

// // //   // دریافت داده‌های دسته‌بندی و آژانس
// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       setLoading(true);
// // //       await new Promise(resolve => setTimeout(resolve, 1500));
      
// // //       setCategories(activeTab === 'buy' ? buyCategoriesData : rentCategoriesData);
// // //       setAgencies(agenciesData);
// // //       setLoading(false);
// // //     };

// // //     fetchData();
// // //   }, [activeTab]);

// // //   // دریافت داده‌های ملک از API
// // //   useEffect(() => {
// // //     const fetchPropertiesTab = async () => {
// // //       try {
// // //         const categoryType = activeTab === 'buy' ? 1 : 2;
// // //         console.log('دریافت ملک‌ها برای تب:', activeTab, 'نوع:', categoryType);
        
// // //         const response = await fetch(`https://localhost:7178/api/RealEstatePage/GetCategoryDtos?tabId=${categoryType}`);
// // //         const result = await response.json();
        
// // //         if (result.status === 200 && result.data) {
// // //           settabs(result.data);
// // //         }
// // //       } catch (error) {
// // //         console.error('خطا در دریافت اطلاعات ملک‌ها:', error);
// // //       }
// // //     };

// // //     fetchPropertiesTab();
// // //   }, [activeTab]);
  
// // //   // دریافت داده‌های ملک از API
// // //   useEffect(() => {
// // //     const fetchProperties = async () => {
// // //       try {
// // //         const categoryType = activeTab === 'buy' ? 1 : 2;
// // //         console.log('دریافت ملک‌ها برای تب:', activeTab, 'نوع:', categoryType);
        
// // //         const response = await fetch(`https://localhost:7178/api/RealEstatePage/GetRandomLastItemRealEstates?tabId=${categoryType}`);
// // //         const result = await response.json();
        
// // //         if (result.status === 200 && result.data) {
// // //           setProperties(result.data);
// // //         }
// // //       } catch (error) {
// // //         console.error('خطا در دریافت اطلاعات ملک‌ها:', error);
// // //       }
// // //     };

// // //     fetchProperties();
// // //   }, [activeTab]);

// // //   const handleTabChange = (tab) => {
// // //     setActiveTab(tab);
// // //   };

// // //   const goToHotelPage = () => {
// // //     navigate('/hotel');
// // //   };

// // //   const goToHotelPageWithCategory = (category) => {
// // //     navigate('/RealEstatePageDetail', {
// // //         state: { 
// // //             tabId: category.id,
// // //             type: activeTab 
// // //         }
// // //     });
// // //   };

// // //   const formatpropertiesTab=(property)=>{
// // //      console.log(property)
// // //         return {
// // //       id: property.id,
// // //       name: property.title,
// // //       icon: property.icon,
// // //     };
// // //   }

// // //   // تابع تبدیل داده‌های API به فرمت مناسب
// // //   const formatPropertyData = (property) => {
// // //     console.log(property.categoryType)
// // //     const type = property.categoryType === 1 ? 'فروش' : 'رهن و اجاره';
    
// // //     const imageUrl = property.address 
// // //       ? `https://localhost:7178/${property.address}` 
// // //       : 'https://localhost:7178/uploads/images/noHome.png';
    
// // //     const price = Math.floor(Math.random() * 5000000000) + 2000000000;
// // //     const formatLocation = (parentName, name) => {
// // //       if (!parentName && !name) return 'تهران';
// // //       if (!parentName) return name;
// // //       if (!name) return parentName;
// // //       return `${parentName} / ${name}`;
// // //     };
// // //     return {
// // //       id: property.id,
// // //       title: property.title,
// // //       location: formatLocation(property.parentName, property.name),
// // //       price: price,
// // //       area: parseInt(property.additionalInformation) || 80,
// // //       rooms: property.countFloor || 2,
// // //       type: type,
// // //       image: imageUrl,
// // //       constructionYear: property.constructionYear,
// // //       hasElevator: property.isHasElevator,
// // //       hasParking: property.isHasParking,
// // //       hasPool: property.isHasPool,
// // //       hasStoreRoom: property.isHasStoreRoom,
// // //       year: property.constructionYear
// // //     };
// // //   };

// // //   const sliderSettings = {
// // //     dots: true,
// // //     infinite: true,
// // //     speed: 500,
// // //     slidesToShow: 3,
// // //     slidesToScroll: 1,
// // //     autoplay: true,
// // //     autoplaySpeed: 3000,
// // //     pauseOnHover: true,
// // //     arrows: true,
// // //     rtl: true,
// // //     responsive: [
// // //       {
// // //         breakpoint: 1024,
// // //         settings: {
// // //           slidesToShow: 2,
// // //           slidesToScroll: 1,
// // //           arrows: false
// // //         }
// // //       },
// // //       {
// // //         breakpoint: 768,
// // //         settings: {
// // //           slidesToShow: 1,
// // //           slidesToScroll: 1,
// // //           arrows: false,
// // //           dots: true
// // //         }
// // //       },
// // //       {
// // //         breakpoint: 480,
// // //         settings: {
// // //           slidesToShow: 1,
// // //           slidesToScroll: 1,
// // //           arrows: false,
// // //           dots: true
// // //         }
// // //       }
// // //     ]
// // //   };

// // //   const sliderSettingsAjans = {
// // //     dots: true,
// // //     infinite: true,
// // //     speed: 500,
// // //     slidesToShow: 4,
// // //     slidesToScroll: 1,
// // //     autoplay: true,
// // //     autoplaySpeed: 3000,
// // //     pauseOnHover: true,
// // //     arrows: true,
// // //     rtl: true,
// // //     responsive: [
// // //       {
// // //         breakpoint: 1280,
// // //         settings: {
// // //           slidesToShow: 3,
// // //           slidesToScroll: 1,
// // //         }
// // //       },
// // //       {
// // //         breakpoint: 1024,
// // //         settings: {
// // //           slidesToShow: 2,
// // //           slidesToScroll: 1,
// // //         }
// // //       },
// // //       {
// // //         breakpoint: 768,
// // //         settings: {
// // //           slidesToShow: 1,
// // //           slidesToScroll: 1,
// // //           arrows: false
// // //         }
// // //       },
// // //       {
// // //         breakpoint: 640,
// // //         settings: {
// // //           slidesToShow: 1,
// // //           slidesToScroll: 1,
// // //           arrows: false,
// // //           dots: true
// // //         }
// // //       },
// // //       {
// // //         breakpoint: 480,
// // //         settings: {
// // //           slidesToShow: 1,
// // //           slidesToScroll: 1,
// // //           arrows: false,
// // //           dots: true
// // //         }
// // //       }
// // //     ]
// // //   };

// // //   // ========== استفاده از siteConfig برای دیتای سئو ==========
// // //   const seoData = {
// // //     // استفاده از siteConfig به عنوان پایه
// // //     title: activeTab === 'buy' 
// // //       ? 'خرید ملک در تهران | آپارتمان، ویلا و زمین' 
// // //       : 'اجاره ملک در تهران | آپارتمان مبله و ویلا',
    
// // //     description: activeTab === 'buy'
// // //       ? `بیش از ${properties.length || '۱۰,۰۰۰'} ملک برای خرید در تهران و شهرهای بزرگ. ${siteConfig.description}`
// // //       : `بهترین ملک‌های اجاره در تهران. ${properties.length || '۲,۰۰۰'} آپارتمان مبله و غیرمبله. ${siteConfig.description}`,
    
// // //     keywords: activeTab === 'buy'
// // //       ? `خرید ملک, خرید آپارتمان, خرید ویلا, ${siteConfig.keywords}`
// // //       : `اجاره ملک, اجاره آپارتمان, رهن و اجاره, ${siteConfig.keywords}`,
    
// // //     image: `${siteConfig.url}${siteConfig.image}`,
// // //     url: `${siteConfig.url}/realestate?type=${activeTab}`,
// // //     type: 'website',
// // //     noIndex: false,
    
// // //     // Open Graph
// // //     ogTitle: activeTab === 'buy' 
// // //       ? `خرید ملک در تهران - ${siteConfig.name}` 
// // //       : `اجاره ملک در تهران - ${siteConfig.name}`,
// // //     ogDescription: activeTab === 'buy'
// // //       ? `با ${siteConfig.name} بهترین ملک را برای خرید پیدا کنید. ضمانت نامه معتبر و مشاوره رایگان`
// // //       : `اجاره آپارتمان با بهترین قیمت در ${siteConfig.name}. تنوع بالا و عقد قرارداد رسمی`,
    
// // //     // Twitter
// // //     twitterTitle: activeTab === 'buy' ? 'خرید ملک' : 'اجاره ملک',
// // //     twitterDescription: siteConfig.description,
// // //     twitterImage: `${siteConfig.url}${siteConfig.image}`,
    
// // //     // Canonical
// // //     canonicalUrl: `${siteConfig.url}/realestate`,
// // //   };

// // //   return (
// // //     <>
// // //       {/* کامپوننت سئو */}
// // //       <SEO {...seoData} />
      
// // //       {/* Structured Data با استفاده از siteConfig */}
// // //       <script type="application/ld+json">
// // //         {JSON.stringify({
// // //           "@context": "https://schema.org",
// // //           "@type": "RealEstateAgent",
// // //           "name": siteConfig.name,
// // //           "url": siteConfig.url,
// // //           "logo": `${siteConfig.url}/logo.png`,
// // //           "description": siteConfig.description,
// // //           "address": {
// // //             "@type": "PostalAddress",
// // //             "addressLocality": "Tehran",
// // //             "addressCountry": "IR"
// // //           },
// // //           "priceRange": "$$",
// // //           "telephone": siteConfig.phone,
// // //           "email": siteConfig.email,
// // //           "areaServed": {
// // //             "@type": "City",
// // //             "name": "Tehran"
// // //           }
// // //         })}
// // //       </script>

// // //       {/* schema برای ملک‌ها */}
// // //       {properties.length > 0 && (
// // //         <script type="application/ld+json">
// // //           {JSON.stringify({
// // //             "@context": "https://schema.org",
// // //             "@type": "ItemList",
// // //             "name": activeTab === 'buy' ? "لیست ملک‌های برای فروش" : "لیست ملک‌های برای اجاره",
// // //             "description": `لیست ${properties.length} ملک ${activeTab === 'buy' ? 'فروش' : 'اجاره'} در ${siteConfig.name}`,
// // //             "numberOfItems": properties.length,
// // //             "itemListElement": properties.slice(0, 5).map((property, index) => ({
// // //               "@type": "ListItem",
// // //               "position": index + 1,
// // //               "url": `${siteConfig.url}/property/${property.id}`
// // //             }))
// // //           })}
// // //         </script>
// // //       )}

// // //       {/* بقیه UI شما - کاملاً بدون تغییر */}
// // //       <div className="realestate-page">
// // //         {/* هدر اصلی با پس‌زمینه سینمایی */}
// // //         <div className="hero-section">
// // //           <div className="hero-video-bg">
// // //             <div className="hero-overlay"></div>
// // //             <div className="hero-pattern"></div>
// // //           </div>
          
// // //           <div className="container">
// // //             <div className="hero-content">
// // //               <span className="hero-badge">✨ اعتماد شما، افتخار ما</span>
// // //               <h1 className="hero-title">
// // //                 <span className="hero-title-main">خانه رویایی‌تان</span>
// // //                 <span className="hero-title-gradient">همینجاست!</span>
// // //               </h1>
// // //               <p className="hero-description">
// // //                 {siteConfig.description}
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* تب‌های خرید و اجاره با طراحی جدید */}
// // //         <div className="tabs-section">
// // //           <div className="container">
// // //             <div className="section-header">
// // //               <h2 className="section-title">
// // //                 {activeTab === 'buy' ? 'خرید ملک' : 'اجاره ملک'}
// // //                 <span className="section-subtitle">انتخاب هوشمندانه، زندگی بهتر</span>
// // //               </h2>
// // //             </div>

// // //             <div className="tabs-wrapper">
// // //               <div className="tabs-header">
// // //                 <button 
// // //                   className={`tab-btn ${activeTab === 'buy' ? 'active' : ''}`}
// // //                   onClick={() => handleTabChange('buy')}
// // //                 >
// // //                   <span className="tab-icon">🏠</span>
// // //                   <span className="tab-text">خرید ملک</span>
// // //                   <span className="tab-count">۱۲,۳۴۵</span>
// // //                 </button>
// // //                 <button 
// // //                   className={`tab-btn ${activeTab === 'rent' ? 'active' : ''}`}
// // //                   onClick={() => handleTabChange('rent')}
// // //                 >
// // //                   <span className="tab-icon">🔑</span>
// // //                   <span className="tab-text">اجاره ملک</span>
// // //                   <span className="tab-count">۲,۸۹۰</span>
// // //                 </button>
// // //               </div>

// // //               {/* دسته‌بندی‌ها با طراحی کارت مدرن */}
// // //               <div className="categories-section">
// // //                 {loading ? (
// // //                   <div className="categories-skeleton">
// // //                     {[1,2,3,4,5,6].map(n => (
// // //                       <div key={n} className="skeleton-card">
// // //                         <div className="skeleton-shine"></div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 ) : (
// // //                   <div className="categories-grid">
// // //                     {tab.map((cat, index) => (
// // //                       <div 
// // //                         key={cat.id} 
// // //                         className="category-card"
// // //                         onClick={() => goToHotelPageWithCategory(cat)}
// // //                         onMouseEnter={() => setHoveredCard(cat.id)}
// // //                         onMouseLeave={() => setHoveredCard(null)}
// // //                         style={{ '--delay': `${index * 0.1}s` }}
// // //                       >
// // //                         <div className="category-icon-wrapper">
// // //                           <span className="category-icon">{cat.icon}</span>
// // //                           <div className="category-icon-bg"></div>
// // //                         </div>
// // //                         <h3 className="category-title">{cat.name}</h3>
// // //                         <div className="category-hover-effect"></div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //    <DoubleSidebarBanners  />
// // //         {/* آژانس‌های برگزیده با اسلایدر حرفه‌ای */}
// // //         <div className="agencies-section">
// // //           <div className="container">
// // //             <div className="section-header">
// // //               <h2 className="section-title">
// // //                 آژانس‌های برگزیده
// // //                 <span className="section-subtitle">معتبرترین مشاوران املاک تهران</span>
// // //               </h2>
// // //               <button className="section-more-btn" onClick={() => navigate('/agencies')}>
// // //                 مشاهده همه آژانس‌ها
// // //                 <span className="more-icon">←</span>
// // //               </button>
// // //             </div>

// // //             {loading ? (
// // //               <div className="agencies-skeleton">
// // //                 {[1,2,3,4].map(n => (
// // //                   <div key={n} className="skeleton-agency">
// // //                     <div className="skeleton-shine"></div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             ) : (
// // //               <div className="agencies-slider-wrapper compact"> 
// // //                 <Slider {...sliderSettingsAjans}>
// // //                   {agencies.map(agency => (
// // //                     <div key={agency.id} className="agency-card-wrapper">
// // //                       <div className="agency-card">
// // //                         <div className="agency-info">
// // //                           <h3 className="agency-name">{agency.name}</h3>
// // //                           <p className="agency-location">
// // //                             <span className="location-icon">📍</span>
// // //                             {agency.location}
// // //                           </p>
// // //                           <div className="agency-stats">
// // //                             <span className="agency-stat">
// // //                               <span className="stat-icon">🏠</span>
// // //                               {agency.agentCount} ملک
// // //                             </span>
// // //                             <span className="agency-stat">
// // //                               <span className="stat-icon">👥</span>
// // //                               ۱۵ مشاور
// // //                             </span>
// // //                           </div>
// // //                           <button 
// // //                             className="agency-btn"
// // //                             onClick={() => navigate(`/hotel?agency=${agency.id}`)}
// // //                           >
// // //                             مشاهده آگهی‌ها
// // //                           </button>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </Slider>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* آگهی‌های ویژه از API */}
// // //         <div className="properties-section">
// // //           <div className="container">
// // //             <div className="section-header">
// // //               <h2 className="section-title">
// // //                 آگهی‌های ویژه {activeTab === 'buy' ? 'خرید' : 'اجاره'}
// // //                 <span className="section-subtitle">برترین پیشنهادهای امروز</span>
// // //               </h2>
// // //             </div>

// // //             {properties.length > 0 ? (
// // //               <div className="properties-slider-wrapper">
// // //                 <Slider {...sliderSettings}>
// // //                   {properties.map((property, index) => {
// // //                     const formattedProperty = formatPropertyData(property);
// // //                     return (
// // //                       <div key={property.id} className="property-slide">
// // //                         <div 
// // //                           className="property-card"
// // //                           onClick={() => navigate(`/hotel?property=${property.id}`)}
// // //                           style={{ '--delay': `${index * 0.1}s` }}
// // //                         >
// // //                           <div className="property-image">
// // //                             <img 
// // //                               src={formattedProperty.image} 
// // //                               alt={`${formattedProperty.title} - ${formattedProperty.location} - ${siteConfig.name}`}
// // //                               onError={(e) => {}}
// // //                             />
// // //                             <div className="property-image-overlay"></div>
// // //                             <button className="property-favorite" aria-label="افزودن به علاقه‌مندی‌ها">
// // //                               <span>
// // //                                 {user ? <FaRegBookmark /> : <FaBookmark />}
// // //                               </span>
// // //                             </button>
// // //                           </div>
// // //                           <div className="property-info">
// // //                             <h3 className="property-title">{formattedProperty.title}</h3>
// // //                             <p className="property-location">
// // //                               <span className="location-icon">📍</span>
// // //                               {formattedProperty.location}
// // //                             </p>
// // //                             <div className="property-price-section">
// // //                               <span className="property-price-label">قیمت:</span>
// // //                               <span className="property-price">{formattedProperty.price.toLocaleString()} تومان</span>
// // //                             </div>
// // //                             <div className="property-features">
// // //                               <span className="extra-feature">{formattedProperty.area} متر</span>
// // //                               <span className="extra-feature">{formattedProperty.rooms} خواب</span>
// // //                               <span className="extra-feature">{formattedProperty.hasParking ? 'پارکینگ' : 'بدون پارکینگ'}</span>
// // //                               <span className="extra-feature">{formattedProperty.year || '۱۴۰۳'}</span>
// // //                             </div>
                            
// // //                             <div className="property-extra-features">
// // //                               {formattedProperty.hasElevator && <span className="extra-feature">🛗 آسانسور</span>}
// // //                               {formattedProperty.hasPool && <span className="extra-feature">🏊 استخر</span>}
// // //                               {formattedProperty.hasStoreRoom && <span className="extra-feature">📦 انباری</span>}
// // //                             </div>
                            
// // //                             <div className="property-footer">
// // //                               <span className="property-code">کد: {property.id}</span>
// // //                               <button className="property-view-btn" aria-label={`مشاهده جزییات ${formattedProperty.title}`}>
// // //                                 مشاهده جزییات
// // //                               </button>
// // //                             </div>
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     );
// // //                   })}
// // //                 </Slider>
// // //               </div>
// // //             ) : (
// // //               <div className="no-properties">
// // //                 <p>در حال بارگذاری آگهی‌ها...</p>
// // //               </div>
// // //             )}

// // //             <div className="view-all-container">
// // //               <button className="view-all-btn" onClick={goToHotelPage}>
// // //                 مشاهده همه {activeTab === 'buy' ? 'ملک‌های خرید' : 'ملک‌های اجاره'}
// // //                 <span className="view-all-icon">←</span>
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* بخش مشاوره تخصصی */}
// // //         <div className="consult-section">
// // //           <div className="container">
// // //             <div className="consult-card">
// // //               <div className="consult-content">
// // //                 <h3 className="consult-title">نیاز به مشاوره تخصصی دارید؟</h3>
// // //                 <p className="consult-description">
// // //                   کارشناسان ما آماده پاسخگویی به سوالات شما هستند
// // //                 </p>
// // //                 <div className="consult-buttons">
// // //                   <button className="consult-btn consult-phone">
// // //                     <span>📞</span>
// // //                     تماس با {siteConfig.phone}
// // //                   </button>
// // //                   <button className="consult-btn consult-chat">
// // //                     <span>💬</span>
// // //                     چت آنلاین
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //               <div className="consult-image">
// // //                 <div className="consult-avatar-group">
// // //                   <div className="consult-avatar"></div>
// // //                   <div className="consult-avatar"></div>
// // //                   <div className="consult-avatar"></div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default RealEstatePage;

// // // src/pages/RealEstatePage.jsx
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import Slider from 'react-slick';
// // import 'slick-carousel/slick/slick.css';
// // import 'slick-carousel/slick/slick-theme.css';
// // import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
// // import { useAuth } from '../../../context/AuthContext';
// // import StoriesFooter from '../Stories/StoriesFooter';
// // import DoubleSidebarBanners  from '../RealEstateDetailPageItem/SidebarBanner';
// // import AgentsSlider from './components/AgentsSlider';

// // import { 
// //   buyCategoriesData, 
// //   rentCategoriesData, 
// //   agenciesData
// // } from './data';
// // import SEO from '../seo/SEO';
// // import { siteConfig } from '../seo/seoConfig';
// // import Stories from '../Stories/Stories';
// // import useStories from '../../../hooks/userStories';
// // import './RealEstatePage.css';

// // const RealEstatePage = () => {
// //   const navigate = useNavigate();
// //   const [activeTab, setActiveTab] = useState('buy');
// //   const [categories, setCategories] = useState([]);
// //   const [agencies, setAgencies] = useState([]);
// //   const [properties, setProperties] = useState([]);
// //   const [tab, settabs] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [hoveredCard, setHoveredCard] = useState(null);
// //   const [searchText, setSearchText] = useState('');
// //   const { user } = useAuth();

// //   // هوک استوری
// //   const { stories, loading: storiesLoading, markAsViewed } = useStories();

// //   // هندلر کلیک روی استوری
// //   const handleStoryClick = (story) => {
// //     console.log('استوری باز شد:', story.name);
// //     markAsViewed(story.id);
// //   };

// //   // دریافت داده‌های دسته‌بندی و آژانس
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       setLoading(true);
// //       await new Promise(resolve => setTimeout(resolve, 1500));
      
// //       setCategories(activeTab === 'buy' ? buyCategoriesData : rentCategoriesData);
// //       setAgencies(agenciesData);
// //       setLoading(false);
// //     };

// //     fetchData();
// //   }, [activeTab]);

// //   // دریافت داده‌های ملک از API
// //   useEffect(() => {
// //     const fetchPropertiesTab = async () => {
// //       try {
// //         const categoryType = activeTab === 'buy' ? 1 : 2;
// //         console.log('دریافت ملک‌ها برای تب:', activeTab, 'نوع:', categoryType);
        
// //         const response = await fetch(`https://localhost:7178/api/RealEstatePage/GetCategoryDtos?tabId=${categoryType}`);
// //         const result = await response.json();
        
// //         if (result.status === 200 && result.data) {
// //           settabs(result.data);
// //         }
// //       } catch (error) {
// //         console.error('خطا در دریافت اطلاعات ملک‌ها:', error);
// //       }
// //     };

// //     fetchPropertiesTab();
// //   }, [activeTab]);
  
// //   // دریافت داده‌های ملک از API
// //   useEffect(() => {
// //     const fetchProperties = async () => {
// //       try {
// //         const categoryType = activeTab === 'buy' ? 1 : 2;
// //         console.log('دریافت ملک‌ها برای تب:', activeTab, 'نوع:', categoryType);
        
// //         const response = await fetch(`https://localhost:7178/api/RealEstatePage/GetRandomLastItemRealEstates?tabId=${categoryType}`);
// //         const result = await response.json();
        
// //         if (result.status === 200 && result.data) {
// //           setProperties(result.data);
// //         }
// //       } catch (error) {
// //         console.error('خطا در دریافت اطلاعات ملک‌ها:', error);
// //       }
// //     };

// //     fetchProperties();
// //   }, [activeTab]);

// //   const handleTabChange = (tab) => {
// //     setActiveTab(tab);
// //   };

// //   const goToHotelPage = () => {
// //     navigate('/hotel');
// //   };

// //   const goToHotelPageWithCategory = (category) => {
// //     navigate('/RealEstatePageDetail', {
// //         state: { 
// //             tabId: category.id,
// //             type: activeTab 
// //         }
// //     });
// //   };

// //   const formatpropertiesTab=(property)=>{
// //      console.log(property)
// //         return {
// //       id: property.id,
// //       name: property.title,
// //       icon: property.icon,
// //     };
// //   }

// //   // تابع تبدیل داده‌های API به فرمت مناسب
// //   const formatPropertyData = (property) => {
// //     console.log(property.categoryType)
// //     const type = property.categoryType === 1 ? 'فروش' : 'رهن و اجاره';
    
// //     const imageUrl = property.address 
// //       ? `https://localhost:7178/${property.address}` 
// //       : 'https://localhost:7178/uploads/images/noHome.png';
    
// //     const price = Math.floor(Math.random() * 5000000000) + 2000000000;
// //     const formatLocation = (parentName, name) => {
// //       if (!parentName && !name) return 'تهران';
// //       if (!parentName) return name;
// //       if (!name) return parentName;
// //       return `${parentName} / ${name}`;
// //     };
// //     return {
// //       id: property.id,
// //       title: property.title,
// //       location: formatLocation(property.parentName, property.name),
// //       price: price,
// //       area: parseInt(property.additionalInformation) || 80,
// //       rooms: property.countFloor || 2,
// //       type: type,
// //       image: imageUrl,
// //       constructionYear: property.constructionYear,
// //       hasElevator: property.isHasElevator,
// //       hasParking: property.isHasParking,
// //       hasPool: property.isHasPool,
// //       hasStoreRoom: property.isHasStoreRoom,
// //       year: property.constructionYear
// //     };
// //   };

// //   const sliderSettings = {
// //     dots: true,
// //     infinite: true,
// //     speed: 500,
// //     slidesToShow: 3,
// //     slidesToScroll: 1,
// //     autoplay: true,
// //     autoplaySpeed: 3000,
// //     pauseOnHover: true,
// //     arrows: true,
// //     rtl: true,
// //     responsive: [
// //       {
// //         breakpoint: 1024,
// //         settings: {
// //           slidesToShow: 2,
// //           slidesToScroll: 1,
// //           arrows: false
// //         }
// //       },
// //       {
// //         breakpoint: 768,
// //         settings: {
// //           slidesToShow: 1,
// //           slidesToScroll: 1,
// //           arrows: false,
// //           dots: true
// //         }
// //       },
// //       {
// //         breakpoint: 480,
// //         settings: {
// //           slidesToShow: 1,
// //           slidesToScroll: 1,
// //           arrows: false,
// //           dots: true
// //         }
// //       }
// //     ]
// //   };

// //   const sliderSettingsAjans = {
// //     dots: true,
// //     infinite: true,
// //     speed: 500,
// //     slidesToShow: 4,
// //     slidesToScroll: 1,
// //     autoplay: true,
// //     autoplaySpeed: 3000,
// //     pauseOnHover: true,
// //     arrows: true,
// //     rtl: true,
// //     responsive: [
// //       {
// //         breakpoint: 1280,
// //         settings: {
// //           slidesToShow: 3,
// //           slidesToScroll: 1,
// //         }
// //       },
// //       {
// //         breakpoint: 1024,
// //         settings: {
// //           slidesToShow: 2,
// //           slidesToScroll: 1,
// //         }
// //       },
// //       {
// //         breakpoint: 768,
// //         settings: {
// //           slidesToShow: 1,
// //           slidesToScroll: 1,
// //           arrows: false
// //         }
// //       },
// //       {
// //         breakpoint: 640,
// //         settings: {
// //           slidesToShow: 1,
// //           slidesToScroll: 1,
// //           arrows: false,
// //           dots: true
// //         }
// //       },
// //       {
// //         breakpoint: 480,
// //         settings: {
// //           slidesToShow: 1,
// //           slidesToScroll: 1,
// //           arrows: false,
// //           dots: true
// //         }
// //       }
// //     ]
// //   };

// //   // ========== استفاده از siteConfig برای دیتای سئو ==========
// //   const seoData = {
// //     // استفاده از siteConfig به عنوان پایه
// //     title: activeTab === 'buy' 
// //       ? 'خرید ملک در تهران | آپارتمان، ویلا و زمین' 
// //       : 'اجاره ملک در تهران | آپارتمان مبله و ویلا',
    
// //     description: activeTab === 'buy'
// //       ? `بیش از ${properties.length || '۱۰,۰۰۰'} ملک برای خرید در تهران و شهرهای بزرگ. ${siteConfig.description}`
// //       : `بهترین ملک‌های اجاره در تهران. ${properties.length || '۲,۰۰۰'} آپارتمان مبله و غیرمبله. ${siteConfig.description}`,
    
// //     keywords: activeTab === 'buy'
// //       ? `خرید ملک, خرید آپارتمان, خرید ویلا, ${siteConfig.keywords}`
// //       : `اجاره ملک, اجاره آپارتمان, رهن و اجاره, ${siteConfig.keywords}`,
    
// //     image: `${siteConfig.url}${siteConfig.image}`,
// //     url: `${siteConfig.url}/realestate?type=${activeTab}`,
// //     type: 'website',
// //     noIndex: false,
    
// //     // Open Graph
// //     ogTitle: activeTab === 'buy' 
// //       ? `خرید ملک در تهران - ${siteConfig.name}` 
// //       : `اجاره ملک در تهران - ${siteConfig.name}`,
// //     ogDescription: activeTab === 'buy'
// //       ? `با ${siteConfig.name} بهترین ملک را برای خرید پیدا کنید. ضمانت نامه معتبر و مشاوره رایگان`
// //       : `اجاره آپارتمان با بهترین قیمت در ${siteConfig.name}. تنوع بالا و عقد قرارداد رسمی`,
    
// //     // Twitter
// //     twitterTitle: activeTab === 'buy' ? 'خرید ملک' : 'اجاره ملک',
// //     twitterDescription: siteConfig.description,
// //     twitterImage: `${siteConfig.url}${siteConfig.image}`,
    
// //     // Canonical
// //     canonicalUrl: `${siteConfig.url}/realestate`,
// //   };

// //   return (
// //     <>
// //       {/* کامپوننت سئو */}
// //       <SEO {...seoData} />
      
// //       {/* Structured Data با استفاده از siteConfig */}
// //       <script type="application/ld+json">
// //         {JSON.stringify({
// //           "@context": "https://schema.org",
// //           "@type": "RealEstateAgent",
// //           "name": siteConfig.name,
// //           "url": siteConfig.url,
// //           "logo": `${siteConfig.url}/logo.png`,
// //           "description": siteConfig.description,
// //           "address": {
// //             "@type": "PostalAddress",
// //             "addressLocality": "Tehran",
// //             "addressCountry": "IR"
// //           },
// //           "priceRange": "$$",
// //           "telephone": siteConfig.phone,
// //           "email": siteConfig.email,
// //           "areaServed": {
// //             "@type": "City",
// //             "name": "Tehran"
// //           }
// //         })}
// //       </script>

// //       {/* schema برای ملک‌ها */}
// //       {properties.length > 0 && (
// //         <script type="application/ld+json">
// //           {JSON.stringify({
// //             "@context": "https://schema.org",
// //             "@type": "ItemList",
// //             "name": activeTab === 'buy' ? "لیست ملک‌های برای فروش" : "لیست ملک‌های برای اجاره",
// //             "description": `لیست ${properties.length} ملک ${activeTab === 'buy' ? 'فروش' : 'اجاره'} در ${siteConfig.name}`,
// //             "numberOfItems": properties.length,
// //             "itemListElement": properties.slice(0, 5).map((property, index) => ({
// //               "@type": "ListItem",
// //               "position": index + 1,
// //               "url": `${siteConfig.url}/property/${property.id}`
// //             }))
// //           })}
// //         </script>
// //       )}

// //       {/* بقیه UI شما - کاملاً بدون تغییر */}
// //       <div className="realestate-page">
// //                 {/* بخش استوری‌ها - دقیقاً زیر هدر سینمایی */}
// //         {!storiesLoading && stories.length > 0 && (
// //           <Stories 
// //             storiesData={stories}
// //             onStoryClick={handleStoryClick}
// //             autoPlayInterval={5000}
// //           />
// //         )}
// //         {/* هدر اصلی با پس‌زمینه سینمایی */}
// //         <div className="hero-section">
// //           <div className="hero-video-bg">
// //             <div className="hero-overlay"></div>
// //             <div className="hero-pattern"></div>
// //           </div>
          
// //           <div className="container">
// //             <div className="hero-content">
// //               <span className="hero-badge">✨ اعتماد شما، افتخار ما</span>
// //               <h1 className="hero-title">
// //                 <span className="hero-title-main">خانه رویایی‌تان</span>
// //                 <span className="hero-title-gradient">همینجاست!</span>
// //               </h1>
// //               <p className="hero-description">
// //                 {siteConfig.description}
// //               </p>
// //             </div>
// //           </div>
// //         </div>



// //         {/* تب‌های خرید و اجاره با طراحی جدید */}
// //         <div className="tabs-section">
// //           <div className="container">
// //             <div className="section-header">
// //               <h2 className="section-title">
// //                 {activeTab === 'buy' ? 'خرید ملک' : 'اجاره ملک'}
// //                 <span className="section-subtitle">انتخاب هوشمندانه، زندگی بهتر</span>
// //               </h2>
// //             </div>

// //             <div className="tabs-wrapper">
// //               <div className="tabs-header">
// //                 <button 
// //                   className={`tab-btn ${activeTab === 'buy' ? 'active' : ''}`}
// //                   onClick={() => handleTabChange('buy')}
// //                 >
// //                   <span className="tab-icon">🏠</span>
// //                   <span className="tab-text">خرید ملک</span>
// //                   <span className="tab-count">۱۲,۳۴۵</span>
// //                 </button>
// //                 <button 
// //                   className={`tab-btn ${activeTab === 'rent' ? 'active' : ''}`}
// //                   onClick={() => handleTabChange('rent')}
// //                 >
// //                   <span className="tab-icon">🔑</span>
// //                   <span className="tab-text">اجاره ملک</span>
// //                   <span className="tab-count">۲,۸۹۰</span>
// //                 </button>
// //               </div>

// //               {/* دسته‌بندی‌ها با طراحی کارت مدرن */}
// //               <div className="categories-section">
// //                 {loading ? (
// //                   <div className="categories-skeleton">
// //                     {[1,2,3,4,5,6].map(n => (
// //                       <div key={n} className="skeleton-card">
// //                         <div className="skeleton-shine"></div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="categories-grid">
// //                     {tab.map((cat, index) => (
// //                       <div 
// //                         key={cat.id} 
// //                         className="category-card"
// //                         onClick={() => goToHotelPageWithCategory(cat)}
// //                         onMouseEnter={() => setHoveredCard(cat.id)}
// //                         onMouseLeave={() => setHoveredCard(null)}
// //                         style={{ '--delay': `${index * 0.1}s` }}
// //                       >
// //                         <div className="category-icon-wrapper">
// //                           <span className="category-icon">{cat.icon}</span>
// //                           <div className="category-icon-bg"></div>
// //                         </div>
// //                         <h3 className="category-title">{cat.name}</h3>
// //                         <div className="category-hover-effect"></div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //         <DoubleSidebarBanners  />

// //         {/* آژانس‌های برگزیده با اسلایدر حرفه‌ای */}
// //         <div className="agencies-section">
// //           <div className="container">
// //             <div className="section-header">
// //               <h2 className="section-title">
// //                 آژانس‌های برگزیده
// //                 <span className="section-subtitle">معتبرترین مشاوران املاک تهران</span>
// //               </h2>
// //               <button className="section-more-btn" onClick={() => navigate('/agencies')}>
// //                 مشاهده همه آژانس‌ها
// //                 <span className="more-icon">←</span>
// //               </button>
// //             </div>

// //             {loading ? (
// //               <div className="agencies-skeleton">
// //                 {[1,2,3,4].map(n => (
// //                   <div key={n} className="skeleton-agency">
// //                     <div className="skeleton-shine"></div>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <div className="agencies-slider-wrapper compact"> 
// //                 <Slider {...sliderSettingsAjans}>
// //                   {agencies.map(agency => (
// //                     <div key={agency.id} className="agency-card-wrapper">
// //                       <div className="agency-card">
// //                         <div className="agency-info">
// //                           <h3 className="agency-name">{agency.name}</h3>
// //                           <p className="agency-location">
// //                             <span className="location-icon">📍</span>
// //                             {agency.location}
// //                           </p>
// //                           <div className="agency-stats">
// //                             <span className="agency-stat">
// //                               <span className="stat-icon">🏠</span>
// //                               {agency.agentCount} ملک
// //                             </span>
// //                             <span className="agency-stat">
// //                               <span className="stat-icon">👥</span>
// //                               ۱۵ مشاور
// //                             </span>
// //                           </div>
// //                           <button 
// //                             className="agency-btn"
// //                             onClick={() => navigate(`/hotel?agency=${agency.id}`)}
// //                           >
// //                             مشاهده آگهی‌ها
// //                           </button>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </Slider>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* آگهی‌های ویژه از API */}
// //         <div className="properties-section">
// //           <div className="container">
// //             <div className="section-header">
// //               <h2 className="section-title">
// //                 آگهی‌های ویژه {activeTab === 'buy' ? 'خرید' : 'اجاره'}
// //                 <span className="section-subtitle">برترین پیشنهادهای امروز</span>
// //               </h2>
// //             </div>

// //             {properties.length > 0 ? (
// //               <div className="properties-slider-wrapper">
// //                 <Slider {...sliderSettings}>
// //                   {properties.map((property, index) => {
// //                     const formattedProperty = formatPropertyData(property);
// //                     return (
// //                       <div key={property.id} className="property-slide">
// //                         <div 
// //                           className="property-card"
// //                           onClick={() => navigate(`/hotel?property=${property.id}`)}
// //                           style={{ '--delay': `${index * 0.1}s` }}
// //                         >
// //                           <div className="property-image">
// //                             <img 
// //                               src={formattedProperty.image} 
// //                               alt={`${formattedProperty.title} - ${formattedProperty.location} - ${siteConfig.name}`}
// //                               onError={(e) => {}}
// //                             />
// //                             <div className="property-image-overlay"></div>
// //                             <button className="property-favorite" aria-label="افزودن به علاقه‌مندی‌ها">
// //                               <span>
// //                                 {user ? <FaRegBookmark /> : <FaBookmark />}
// //                               </span>
// //                             </button>
// //                           </div>
// //                           <div className="property-info">
// //                             <h3 className="property-title">{formattedProperty.title}</h3>
// //                             <p className="property-location">
// //                               <span className="location-icon">📍</span>
// //                               {formattedProperty.location}
// //                             </p>
// //                             <div className="property-price-section">
// //                               <span className="property-price-label">قیمت:</span>
// //                               <span className="property-price">{formattedProperty.price.toLocaleString()} تومان</span>
// //                             </div>
// //                             <div className="property-features">
// //                               <span className="extra-feature">{formattedProperty.area} متر</span>
// //                               <span className="extra-feature">{formattedProperty.rooms} خواب</span>
// //                               <span className="extra-feature">{formattedProperty.hasParking ? 'پارکینگ' : 'بدون پارکینگ'}</span>
// //                               <span className="extra-feature">{formattedProperty.year || '۱۴۰۳'}</span>
// //                             </div>
                            
// //                             <div className="property-extra-features">
// //                               {formattedProperty.hasElevator && <span className="extra-feature">🛗 آسانسور</span>}
// //                               {formattedProperty.hasPool && <span className="extra-feature">🏊 استخر</span>}
// //                               {formattedProperty.hasStoreRoom && <span className="extra-feature">📦 انباری</span>}
// //                             </div>
                            
// //                             <div className="property-footer">
// //                               <span className="property-code">کد: {property.id}</span>
// //                               <button className="property-view-btn" aria-label={`مشاهده جزییات ${formattedProperty.title}`}>
// //                                 مشاهده جزییات
// //                               </button>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     );
// //                   })}
// //                 </Slider>
// //               </div>
// //             ) : (
// //               <div className="no-properties">
// //                 <p>در حال بارگذاری آگهی‌ها...</p>
// //               </div>
// //             )}

// //             <div className="view-all-container">
// //               <button className="view-all-btn" onClick={goToHotelPage}>
// //                 مشاهده همه {activeTab === 'buy' ? 'ملک‌های خرید' : 'ملک‌های اجاره'}
// //                 <span className="view-all-icon">←</span>
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //   {/* بخش مشاوران مستقل - جدید */}
// //   <AgentsSlider />
// //         {/* بخش مشاوره تخصصی */}
// //         <div className="consult-section">
// //           <div className="container">
// //             <div className="consult-card">
// //               <div className="consult-content">
// //                 <h3 className="consult-title">نیاز به مشاوره تخصصی دارید؟</h3>
// //                 <p className="consult-description">
// //                   کارشناسان ما آماده پاسخگویی به سوالات شما هستند
// //                 </p>
// //                 <div className="consult-buttons">
// //                   <button className="consult-btn consult-phone">
// //                     <span>📞</span>
// //                     تماس با {siteConfig.phone}
// //                   </button>
// //                   <button className="consult-btn consult-chat">
// //                     <span>💬</span>
// //                     چت آنلاین
// //                   </button>
// //                 </div>
// //               </div>
// //               <div className="consult-image">
// //                 <div className="consult-avatar-group">
// //                   <div className="consult-avatar"></div>
// //                   <div className="consult-avatar"></div>
// //                   <div className="consult-avatar"></div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //             {/* فوتر استوری‌ها برای سئو */}
// //         {stories && stories.length > 0 && (
// //           <StoriesFooter storiesData={stories} />
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default RealEstatePage;

// // src/pages/RealEstatePage.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { FaBookmark, FaRegBookmark, FaNewspaper, FaArrowLeft, FaCalendarAlt, FaEye } from 'react-icons/fa';
// import { useAuth } from '../../../context/AuthContext';
// import StoriesFooter from '../Stories/StoriesFooter';
// import DoubleSidebarBanners from '../RealEstateDetailPageItem/SidebarBanner';
// import AgentsSlider from './components/AgentsSlider';

// import { 
//   buyCategoriesData, 
//   rentCategoriesData, 
//   agenciesData
// } from './data';
// import SEO from '../seo/SEO';
// import { siteConfig } from '../seo/seoConfig';
// import Stories from '../Stories/Stories';
// import useStories from '../../../hooks/userStories';
// import './RealEstatePage.css';

// const RealEstatePage = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('buy');
//   const [categories, setCategories] = useState([]);
//   const [agencies, setAgencies] = useState([]);
//   const [properties, setProperties] = useState([]);
//   const [tab, settabs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [searchText, setSearchText] = useState('');
//   const [topPosts, setTopPosts] = useState([]);
//   const [loadingPosts, setLoadingPosts] = useState(false);
//   const { user } = useAuth();

//   // هوک استوری
//   const { stories, loading: storiesLoading, markAsViewed } = useStories();

//   // دریافت مقالات پربازدید
//   useEffect(() => {
//     const fetchTopPosts = async () => {
//       try {
//         setLoadingPosts(true);
//         const response = await fetch('https://localhost:7178/api/Post/GetTopViewedPostsAsync');
//         const result = await response.json();
        
//         if (result.status === 200 && result.data) {
//           setTopPosts(result.data.slice(0, 5));
//         }
//       } catch (error) {
//         console.error('❌ خطا در دریافت مقالات:', error);
//       } finally {
//         setLoadingPosts(false);
//       }
//     };

//     fetchTopPosts();
//   }, []);

//   // هندلر کلیک روی استوری
//   const handleStoryClick = (story) => {
//     console.log('استوری باز شد:', story.name);
//     markAsViewed(story.id);
//   };

//   // دریافت داده‌های دسته‌بندی و آژانس
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       setCategories(activeTab === 'buy' ? buyCategoriesData : rentCategoriesData);
//       setAgencies(agenciesData);
//       setLoading(false);
//     };

//     fetchData();
//   }, [activeTab]);

//   // دریافت داده‌های ملک از API
//   useEffect(() => {
//     const fetchPropertiesTab = async () => {
//       try {
//         const categoryType = activeTab === 'buy' ? 1 : 2;
//         console.log('دریافت ملک‌ها برای تب:', activeTab, 'نوع:', categoryType);
        
//         const response = await fetch(`https://localhost:7178/api/RealEstatePage/GetCategoryDtos?tabId=${categoryType}`);
//         const result = await response.json();
        
//         if (result.status === 200 && result.data) {
//           settabs(result.data);
//         }
//       } catch (error) {
//         console.error('خطا در دریافت اطلاعات ملک‌ها:', error);
//       }
//     };

//     fetchPropertiesTab();
//   }, [activeTab]);
  
//   // دریافت داده‌های ملک از API
//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const categoryType = activeTab === 'buy' ? 1 : 2;
//         console.log('دریافت ملک‌ها برای تب:', activeTab, 'نوع:', categoryType);
        
//         const response = await fetch(`https://localhost:7178/api/RealEstatePage/GetRandomLastItemRealEstates?tabId=${categoryType}`);
//         const result = await response.json();
        
//         if (result.status === 200 && result.data) {
//           setProperties(result.data);
//         }
//       } catch (error) {
//         console.error('خطا در دریافت اطلاعات ملک‌ها:', error);
//       }
//     };

//     fetchProperties();
//   }, [activeTab]);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const goToHotelPage = () => {
//     navigate('/hotel');
//   };

//   const goToHotelPageWithCategory = (category) => {
//     navigate('/RealEstatePageDetail', {
//         state: { 
//             tabId: category.id,
//             type: activeTab 
//         }
//     });
//   };

//   const formatpropertiesTab=(property)=>{
//      console.log(property)
//         return {
//       id: property.id,
//       name: property.title,
//       icon: property.icon,
//     };
//   }

//   // تابع تبدیل داده‌های API به فرمت مناسب
//   const formatPropertyData = (property) => {
//     console.log(property.categoryType)
//     const type = property.categoryType === 1 ? 'فروش' : 'رهن و اجاره';
    
//     const imageUrl = property.address 
//       ? `https://localhost:7178/${property.address}` 
//       : 'https://localhost:7178/uploads/images/noHome.png';
    
//     const price = Math.floor(Math.random() * 5000000000) + 2000000000;
//     const formatLocation = (parentName, name) => {
//       if (!parentName && !name) return 'تهران';
//       if (!parentName) return name;
//       if (!name) return parentName;
//       return `${parentName} / ${name}`;
//     };
//     return {
//       id: property.id,
//       title: property.title,
//       location: formatLocation(property.parentName, property.name),
//       price: price,
//       area: parseInt(property.additionalInformation) || 80,
//       rooms: property.countFloor || 2,
//       type: type,
//       image: imageUrl,
//       constructionYear: property.constructionYear,
//       hasElevator: property.isHasElevator,
//       hasParking: property.isHasParking,
//       hasPool: property.isHasPool,
//       hasStoreRoom: property.isHasStoreRoom,
//       year: property.constructionYear
//     };
//   };

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,
//     arrows: true,
//     rtl: true,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           arrows: false
//         }
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           arrows: false,
//           dots: true
//         }
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           arrows: false,
//           dots: true
//         }
//       }
//     ]
//   };

//   const sliderSettingsAjans = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,
//     arrows: true,
//     rtl: true,
//     responsive: [
//       {
//         breakpoint: 1280,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         }
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         }
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           arrows: false
//         }
//       },
//       {
//         breakpoint: 640,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           arrows: false,
//           dots: true
//         }
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           arrows: false,
//           dots: true
//         }
//       }
//     ]
//   };

//   // ========== استفاده از siteConfig برای دیتای سئو ==========
//   const seoData = {
//     title: activeTab === 'buy' 
//       ? 'خرید ملک در تهران | آپارتمان، ویلا و زمین' 
//       : 'اجاره ملک در تهران | آپارتمان مبله و ویلا',
    
//     description: activeTab === 'buy'
//       ? `بیش از ${properties.length || '۱۰,۰۰۰'} ملک برای خرید در تهران و شهرهای بزرگ. ${siteConfig.description}`
//       : `بهترین ملک‌های اجاره در تهران. ${properties.length || '۲,۰۰۰'} آپارتمان مبله و غیرمبله. ${siteConfig.description}`,
    
//     keywords: activeTab === 'buy'
//       ? `خرید ملک, خرید آپارتمان, خرید ویلا, ${siteConfig.keywords}`
//       : `اجاره ملک, اجاره آپارتمان, رهن و اجاره, ${siteConfig.keywords}`,
    
//     image: `${siteConfig.url}${siteConfig.image}`,
//     url: `${siteConfig.url}/realestate?type=${activeTab}`,
//     type: 'website',
//     noIndex: false,
    
//     ogTitle: activeTab === 'buy' 
//       ? `خرید ملک در تهران - ${siteConfig.name}` 
//       : `اجاره ملک در تهران - ${siteConfig.name}`,
//     ogDescription: activeTab === 'buy'
//       ? `با ${siteConfig.name} بهترین ملک را برای خرید پیدا کنید. ضمانت نامه معتبر و مشاوره رایگان`
//       : `اجاره آپارتمان با بهترین قیمت در ${siteConfig.name}. تنوع بالا و عقد قرارداد رسمی`,
    
//     twitterTitle: activeTab === 'buy' ? 'خرید ملک' : 'اجاره ملک',
//     twitterDescription: siteConfig.description,
//     twitterImage: `${siteConfig.url}${siteConfig.image}`,
    
//     canonicalUrl: `${siteConfig.url}/realestate`,
//   };

//   return (
//     <>
//       <SEO {...seoData} />
      
//       <script type="application/ld+json">
//         {JSON.stringify({
//           "@context": "https://schema.org",
//           "@type": "RealEstateAgent",
//           "name": siteConfig.name,
//           "url": siteConfig.url,
//           "logo": `${siteConfig.url}/logo.png`,
//           "description": siteConfig.description,
//           "address": {
//             "@type": "PostalAddress",
//             "addressLocality": "Tehran",
//             "addressCountry": "IR"
//           },
//           "priceRange": "$$",
//           "telephone": siteConfig.phone,
//           "email": siteConfig.email,
//           "areaServed": {
//             "@type": "City",
//             "name": "Tehran"
//           }
//         })}
//       </script>

//       {properties.length > 0 && (
//         <script type="application/ld+json">
//           {JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "ItemList",
//             "name": activeTab === 'buy' ? "لیست ملک‌های برای فروش" : "لیست ملک‌های برای اجاره",
//             "description": `لیست ${properties.length} ملک ${activeTab === 'buy' ? 'فروش' : 'اجاره'} در ${siteConfig.name}`,
//             "numberOfItems": properties.length,
//             "itemListElement": properties.slice(0, 5).map((property, index) => ({
//               "@type": "ListItem",
//               "position": index + 1,
//               "url": `${siteConfig.url}/property/${property.id}`
//             }))
//           })}
//         </script>
//       )}

//       <div className="realestate-page">
//         {/* بخش استوری‌ها */}
//         {!storiesLoading && stories.length > 0 && (
//           <Stories 
//             storiesData={stories}
//             onStoryClick={handleStoryClick}
//             autoPlayInterval={5000}
//           />
//         )}
        
//         {/* هدر اصلی */}
//         <div className="hero-section">
//           <div className="hero-video-bg">
//             <div className="hero-overlay"></div>
//             <div className="hero-pattern"></div>
//           </div>
          
//           <div className="container">
//             <div className="hero-content">
//               <span className="hero-badge">✨ اعتماد شما، افتخار ما</span>
//               <h1 className="hero-title">
//                 <span className="hero-title-main">خانه رویایی‌تان</span>
//                 <span className="hero-title-gradient">همینجاست!</span>
//               </h1>
//               <p className="hero-description">
//                 {siteConfig.description}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* تب‌های خرید و اجاره */}
//         <div className="tabs-section">
//           <div className="container">
//             <div className="section-header">
//               <h2 className="section-title">
//                 {activeTab === 'buy' ? 'خرید ملک' : 'اجاره ملک'}
//                 <span className="section-subtitle">انتخاب هوشمندانه، زندگی بهتر</span>
//               </h2>
//             </div>

//             <div className="tabs-wrapper">
//               <div className="tabs-header">
//                 <button 
//                   className={`tab-btn ${activeTab === 'buy' ? 'active' : ''}`}
//                   onClick={() => handleTabChange('buy')}
//                 >
//                   <span className="tab-icon">🏠</span>
//                   <span className="tab-text">خرید ملک</span>
//                   <span className="tab-count">۱۲,۳۴۵</span>
//                 </button>
//                 <button 
//                   className={`tab-btn ${activeTab === 'rent' ? 'active' : ''}`}
//                   onClick={() => handleTabChange('rent')}
//                 >
//                   <span className="tab-icon">🔑</span>
//                   <span className="tab-text">اجاره ملک</span>
//                   <span className="tab-count">۲,۸۹۰</span>
//                 </button>
//               </div>

//               <div className="categories-section">
//                 {loading ? (
//                   <div className="categories-skeleton">
//                     {[1,2,3,4,5,6].map(n => (
//                       <div key={n} className="skeleton-card">
//                         <div className="skeleton-shine"></div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="categories-grid">
//                     {tab.map((cat, index) => (
//                       <div 
//                         key={cat.id} 
//                         className="category-card"
//                         onClick={() => goToHotelPageWithCategory(cat)}
//                         onMouseEnter={() => setHoveredCard(cat.id)}
//                         onMouseLeave={() => setHoveredCard(null)}
//                         style={{ '--delay': `${index * 0.1}s` }}
//                       >
//                         <div className="category-icon-wrapper">
//                           <span className="category-icon">{cat.icon}</span>
//                           <div className="category-icon-bg"></div>
//                         </div>
//                         <h3 className="category-title">{cat.name}</h3>
//                         <div className="category-hover-effect"></div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <DoubleSidebarBanners />

//         {/* آژانس‌های برگزیده */}
//         <div className="agencies-section">
//           <div className="container">
//             <div className="section-header">
//               <h2 className="section-title">
//                 آژانس‌های برگزیده
//                 <span className="section-subtitle">معتبرترین مشاوران املاک تهران</span>
//               </h2>
//               <button className="section-more-btn" onClick={() => navigate('/agencies')}>
//                 مشاهده همه آژانس‌ها
//                 <span className="more-icon">←</span>
//               </button>
//             </div>

//             {loading ? (
//               <div className="agencies-skeleton">
//                 {[1,2,3,4].map(n => (
//                   <div key={n} className="skeleton-agency">
//                     <div className="skeleton-shine"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="agencies-slider-wrapper compact"> 
//                 <Slider {...sliderSettingsAjans}>
//                   {agencies.map(agency => (
//                     <div key={agency.id} className="agency-card-wrapper">
//                       <div className="agency-card">
//                         <div className="agency-info">
//                           <h3 className="agency-name">{agency.name}</h3>
//                           <p className="agency-location">
//                             <span className="location-icon">📍</span>
//                             {agency.location}
//                           </p>
//                           <div className="agency-stats">
//                             <span className="agency-stat">
//                               <span className="stat-icon">🏠</span>
//                               {agency.agentCount} ملک
//                             </span>
//                             <span className="agency-stat">
//                               <span className="stat-icon">👥</span>
//                               ۱۵ مشاور
//                             </span>
//                           </div>
//                           <button 
//                             className="agency-btn"
//                             onClick={() => navigate(`/hotel?agency=${agency.id}`)}
//                           >
//                             مشاهده آگهی‌ها
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </Slider>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* آگهی‌های ویژه */}
//         <div className="properties-section">
//           <div className="container">
//             <div className="section-header">
//               <h2 className="section-title">
//                 آگهی‌های ویژه {activeTab === 'buy' ? 'خرید' : 'اجاره'}
//                 <span className="section-subtitle">برترین پیشنهادهای امروز</span>
//               </h2>
//             </div>

//             {properties.length > 0 ? (
//               <div className="properties-slider-wrapper">
//                 <Slider {...sliderSettings}>
//                   {properties.map((property, index) => {
//                     const formattedProperty = formatPropertyData(property);
//                     return (
//                       <div key={property.id} className="property-slide">
//                         <div 
//                           className="property-card"
//                           onClick={() => navigate(`/hotel?property=${property.id}`)}
//                           style={{ '--delay': `${index * 0.1}s` }}
//                         >
//                           <div className="property-image">
//                             <img 
//                               src={formattedProperty.image} 
//                               alt={`${formattedProperty.title} - ${formattedProperty.location} - ${siteConfig.name}`}
//                               onError={(e) => {}}
//                             />
//                             <div className="property-image-overlay"></div>
//                             <button className="property-favorite" aria-label="افزودن به علاقه‌مندی‌ها">
//                               <span>
//                                 {user ? <FaRegBookmark /> : <FaBookmark />}
//                               </span>
//                             </button>
//                           </div>
//                           <div className="property-info">
//                             <h3 className="property-title">{formattedProperty.title}</h3>
//                             <p className="property-location">
//                               <span className="location-icon">📍</span>
//                               {formattedProperty.location}
//                             </p>
//                             <div className="property-price-section">
//                               <span className="property-price-label">قیمت:</span>
//                               <span className="property-price">{formattedProperty.price.toLocaleString()} تومان</span>
//                             </div>
//                             <div className="property-features">
//                               <span className="extra-feature">{formattedProperty.area} متر</span>
//                               <span className="extra-feature">{formattedProperty.rooms} خواب</span>
//                               <span className="extra-feature">{formattedProperty.hasParking ? 'پارکینگ' : 'بدون پارکینگ'}</span>
//                               <span className="extra-feature">{formattedProperty.year || '۱۴۰۳'}</span>
//                             </div>
                            
//                             <div className="property-extra-features">
//                               {formattedProperty.hasElevator && <span className="extra-feature">🛗 آسانسور</span>}
//                               {formattedProperty.hasPool && <span className="extra-feature">🏊 استخر</span>}
//                               {formattedProperty.hasStoreRoom && <span className="extra-feature">📦 انباری</span>}
//                             </div>
                            
//                             <div className="property-footer">
//                               <span className="property-code">کد: {property.id}</span>
//                               <button className="property-view-btn" aria-label={`مشاهده جزییات ${formattedProperty.title}`}>
//                                 مشاهده جزییات
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </Slider>
//               </div>
//             ) : (
//               <div className="no-properties">
//                 <p>در حال بارگذاری آگهی‌ها...</p>
//               </div>
//             )}

//             <div className="view-all-container">
//               <button className="view-all-btn" onClick={goToHotelPage}>
//                 مشاهده همه {activeTab === 'buy' ? 'ملک‌های خرید' : 'ملک‌های اجاره'}
//                 <span className="view-all-icon">←</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* بخش مشاوران مستقل */}
//         <AgentsSlider />

//         {/* ===== بخش مقالات پربازدید (اینجا قرار گرفته) ===== */}
//         <div className="blog-posts-section">
//           <div className="container">
//             <div className="section-header">
//               <h2 className="section-title">
//                 مقالات پربازدید
//                 <span className="section-subtitle">مطالب تخصصی و کاربردی حوزه املاک</span>
//               </h2>
//               <Link to="/blog" className="section-more-btn">
//                 مشاهده همه مقالات
//                 <span className="more-icon">←</span>
//               </Link>
//             </div>

//             {loadingPosts ? (
//               <div className="blog-posts-skeleton">
//                 {[1, 2, 3, 4, 5].map(n => (
//                   <div key={n} className="skeleton-blog-card">
//                     <div className="skeleton-shine"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : topPosts.length === 0 ? (
//               <div className="no-posts">
//                 <FaNewspaper className="no-posts-icon" />
//                 <p>هیچ مقاله‌ای یافت نشد</p>
//               </div>
//             ) : (
//               <div className="blog-posts-grid">
//                 {topPosts.map((post, index) => (
//                   <article 
//                     key={post.id} 
//                     className="blog-post-card"
//                     onClick={() => navigate(`/blog/post/${post.slug || post.id}/${post.id}`)}
//                     style={{ '--delay': `${index * 0.1}s` }}
//                   >
//                     {post.imageUrl && (
//                       <figure className="blog-post-image-wrapper">
//                         <img 
//                           src={`https://localhost:7178/uploads/posts/${post.imageUrl}`}
//                           alt={post.title}
//                           className="blog-post-image"
//                           loading="lazy"
//                           onError={(e) => {
//                             e.target.src = 'https://via.placeholder.com/400x250/7d0000/ffffff?text=وبلاگ';
//                           }}
//                         />
//                         {post.categoryPostName && (
//                           <figcaption className="blog-post-category">
//                             {post.categoryPostName}
//                           </figcaption>
//                         )}
//                       </figure>
//                     )}
                    
//                     <div className="blog-post-content">
//                       <h3 className="blog-post-title">
//                         <Link to={`/blog/post/${post.slug || post.id}/${post.id}`}>
//                           {post.title}
//                         </Link>
//                       </h3>
                      
//                       <p className="blog-post-summary">
//                         {post.summary || post.title}
//                       </p>
                      
//                       <div className="blog-post-meta">
//                         <span>
//                           <FaCalendarAlt />
//                           <time dateTime={post.createdAt}>
//                             {post.createdAtPersianRelative || post.createdAt}
//                           </time>
//                         </span>
//                         <span>
//                           <FaEye /> {post.countView || 0}
//                         </span>
//                       </div>
                      
//                       <div className="blog-post-read-more">
//                         <Link to={`/blog/post/${post.slug || post.id}/${post.id}`}>
//                           ادامه مطلب <FaArrowLeft />
//                         </Link>
//                       </div>
//                     </div>
//                   </article>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* بخش مشاوره تخصصی */}
//         <div className="consult-section">
//           <div className="container">
//             <div className="consult-card">
//               <div className="consult-content">
//                 <h3 className="consult-title">نیاز به مشاوره تخصصی دارید؟</h3>
//                 <p className="consult-description">
//                   کارشناسان ما آماده پاسخگویی به سوالات شما هستند
//                 </p>
//                 <div className="consult-buttons">
//                   <button className="consult-btn consult-phone">
//                     <span>📞</span>
//                     تماس با {siteConfig.phone}
//                   </button>
//                   <button className="consult-btn consult-chat">
//                     <span>💬</span>
//                     چت آنلاین
//                   </button>
//                 </div>
//               </div>
//               <div className="consult-image">
//                 <div className="consult-avatar-group">
//                   <div className="consult-avatar"></div>
//                   <div className="consult-avatar"></div>
//                   <div className="consult-avatar"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* فوتر استوری‌ها */}
//         {stories && stories.length > 0 && (
//           <StoriesFooter storiesData={stories} />
//         )}
//       </div>
//     </>
//   );
// };

// export default RealEstatePage;

// src/pages/RealEstatePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaBookmark, FaRegBookmark, FaNewspaper, FaArrowLeft, FaCalendarAlt, FaEye } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import StoriesFooter from '../Stories/StoriesFooter';
import DoubleSidebarBanners from '../RealEstateDetailPageItem/SidebarBanner';
import AgentsSlider from './components/AgentsSlider';
import RelatedPropertiesSlider from '../RealEstateDetailPageItem/RelatedPropertiesSlider';

import { 
  buyCategoriesData, 
  rentCategoriesData, 
  agenciesData
} from './data';
import SEO from '../seo/SEO';
import { siteConfig } from '../seo/seoConfig';
import Stories from '../Stories/Stories';
import useStories from '../../../hooks/userStories';
import './RealEstatePage.css';

const RealEstatePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('buy');
  const [categories, setCategories] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [properties, setProperties] = useState([]);
  const [tab, setTabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTabs, setLoadingTabs] = useState(false); // ← جدید
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [topPosts, setTopPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const { user } = useAuth();

  // هوک استوری
  const { stories, loading: storiesLoading, markAsViewed } = useStories();

  // دریافت مقالات پربازدید
  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        setLoadingPosts(true);
        const response = await fetch('https://localhost:7178/api/Post/GetTopViewedPostsAsync');
        const result = await response.json();
        
        if (result.status === 200 && result.data) {
          setTopPosts(result.data.slice(0, 5));
        }
      } catch (error) {
        console.error('❌ خطا در دریافت مقالات:', error);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchTopPosts();
  }, []);

  // هندلر کلیک روی استوری
  const handleStoryClick = (story) => {
    console.log('استوری باز شد:', story.name);
    markAsViewed(story.id);
  };

  // دریافت داده‌های دسته‌بندی و آژانس
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCategories(activeTab === 'buy' ? buyCategoriesData : rentCategoriesData);
      setAgencies(agenciesData);
      setLoading(false);
    };

    fetchData();
  }, [activeTab]);

  // ===== دریافت تب‌ها و ملک‌ها به ترتیب =====
  useEffect(() => {
    const fetchAllData = async () => {
      const categoryType = activeTab === 'buy' ? 1 : 2;
      console.log('🔄 شروع دریافت داده‌ها برای تب:', activeTab, 'نوع:', categoryType);
      
      try {
        // ===== مرحله 1: دریافت تب‌ها (دسته‌بندی‌ها) =====
        setLoadingTabs(true);
        console.log('📡 مرحله 1: دریافت دسته‌بندی‌ها...');
        
        const tabsResponse = await fetch(`https://localhost:7178/api/RealEstatePage/GetCategoryDtos?tabId=${categoryType}`);
        const tabsResult = await tabsResponse.json();
        
        if (tabsResult.status === 200 && tabsResult.data) {
          console.log('✅ دسته‌بندی‌ها دریافت شد:', tabsResult.data.length, 'مورد');
          setTabs(tabsResult.data);
        } else {
          console.warn('⚠️ دسته‌بندی‌ها دریافت نشد:', tabsResult);
        }
        
        // ===== مرحله 2: دریافت ملک‌ها (بعد از دریافت تب‌ها) =====
        console.log('📡 مرحله 2: دریافت ملک‌ها...');
        
        const propertiesResponse = await fetch(`https://localhost:7178/api/RealEstatePage/GetRandomLastItemRealEstates?tabId=${categoryType}`);
        const propertiesResult = await propertiesResponse.json();
        
        if (propertiesResult.status === 200 && propertiesResult.data) {
          console.log('✅ ملک‌ها دریافت شد:', propertiesResult.data.length, 'مورد');
          setProperties(propertiesResult.data);
        } else {
          console.warn('⚠️ ملک‌ها دریافت نشد:', propertiesResult);
        }
        
        console.log('🎯 تمام داده‌ها با موفقیت دریافت شدند!');
        
      } catch (error) {
        console.error('❌ خطا در دریافت اطلاعات:', error);
      } finally {
        setLoadingTabs(false);
        setLoading(false);
      }
    };

    fetchAllData();
  }, [activeTab]); // ← فقط با تغییر تب اجرا میشه

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const goToHotelPage = () => {
    navigate('/hotel');
  };

  const goToHotelPageWithCategory = (category) => {
    navigate('/RealEstatePageDetail', {
        state: { 
            tabId: category.id,
            type: activeTab 
        }
    });
  };

  // تابع تبدیل داده‌های API به فرمت مناسب
  const formatPropertyData = (property) => {
    const type = property.categoryType === 1 ? 'فروش' : 'رهن و اجاره';
    
    const imageUrl = property.address 
      ? `https://localhost:7178/${property.address}` 
      : 'https://localhost:7178/uploads/images/noHome.png';
    
    const price = Math.floor(Math.random() * 5000000000) + 2000000000;
    const formatLocation = (parentName, name) => {
      if (!parentName && !name) return 'تهران';
      if (!parentName) return name;
      if (!name) return parentName;
      return `${parentName} / ${name}`;
    };
    return {
      id: property.id,
      title: property.title,
      location: formatLocation(property.parentName, property.name),
      price: price,
      area: parseInt(property.additionalInformation) || 80,
      rooms: property.countFloor || 2,
      type: type,
      image: imageUrl,
      constructionYear: property.constructionYear,
      hasElevator: property.isHasElevator,
      hasParking: property.isHasParking,
      hasPool: property.isHasPool,
      hasStoreRoom: property.isHasStoreRoom,
      year: property.constructionYear
    };
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true
        }
      }
    ]
  };

  const sliderSettingsAjans = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    rtl: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true
        }
      }
    ]
  };

  // ========== استفاده از siteConfig برای دیتای سئو ==========
  const seoData = {
    title: activeTab === 'buy' 
      ? 'خرید ملک در تهران | آپارتمان، ویلا و زمین' 
      : 'اجاره ملک در تهران | آپارتمان مبله و ویلا',
    
    description: activeTab === 'buy'
      ? `بیش از ${properties.length || '۱۰,۰۰۰'} ملک برای خرید در تهران و شهرهای بزرگ. ${siteConfig.description}`
      : `بهترین ملک‌های اجاره در تهران. ${properties.length || '۲,۰۰۰'} آپارتمان مبله و غیرمبله. ${siteConfig.description}`,
    
    keywords: activeTab === 'buy'
      ? `خرید ملک, خرید آپارتمان, خرید ویلا, ${siteConfig.keywords}`
      : `اجاره ملک, اجاره آپارتمان, رهن و اجاره, ${siteConfig.keywords}`,
    
    image: `${siteConfig.url}${siteConfig.image}`,
    url: `${siteConfig.url}/realestate?type=${activeTab}`,
    type: 'website',
    noIndex: false,
    
    ogTitle: activeTab === 'buy' 
      ? `خرید ملک در تهران - ${siteConfig.name}` 
      : `اجاره ملک در تهران - ${siteConfig.name}`,
    ogDescription: activeTab === 'buy'
      ? `با ${siteConfig.name} بهترین ملک را برای خرید پیدا کنید. ضمانت نامه معتبر و مشاوره رایگان`
      : `اجاره آپارتمان با بهترین قیمت در ${siteConfig.name}. تنوع بالا و عقد قرارداد رسمی`,
    
    twitterTitle: activeTab === 'buy' ? 'خرید ملک' : 'اجاره ملک',
    twitterDescription: siteConfig.description,
    twitterImage: `${siteConfig.url}${siteConfig.image}`,
    
    canonicalUrl: `${siteConfig.url}/realestate`,
  };

  return (
    <>
      <SEO {...seoData} />
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": siteConfig.name,
          "url": siteConfig.url,
          "logo": `${siteConfig.url}/logo.png`,
          "description": siteConfig.description,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Tehran",
            "addressCountry": "IR"
          },
          "priceRange": "$$",
          "telephone": siteConfig.phone,
          "email": siteConfig.email,
          "areaServed": {
            "@type": "City",
            "name": "Tehran"
          }
        })}
      </script>

      {properties.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": activeTab === 'buy' ? "لیست ملک‌های برای فروش" : "لیست ملک‌های برای اجاره",
            "description": `لیست ${properties.length} ملک ${activeTab === 'buy' ? 'فروش' : 'اجاره'} در ${siteConfig.name}`,
            "numberOfItems": properties.length,
            "itemListElement": properties.slice(0, 5).map((property, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `${siteConfig.url}/property/${property.id}`
            }))
          })}
        </script>
      )}

      <div className="realestate-page">
        {/* بخش استوری‌ها */}
        {!storiesLoading && stories.length > 0 && (
          <Stories 
            storiesData={stories}
            onStoryClick={handleStoryClick}
            autoPlayInterval={5000}
          />
        )}
        
        {/* هدر اصلی */}
        <div className="hero-section">
          <div className="hero-video-bg">
            <div className="hero-overlay"></div>
            <div className="hero-pattern"></div>
          </div>
          
          <div className="container">
            <div className="hero-content">
              <span className="hero-badge">✨ اعتماد شما، افتخار ما</span>
              <h1 className="hero-title">
                <span className="hero-title-main">خانه رویایی‌تان</span>
                <span className="hero-title-gradient">همینجاست!</span>
              </h1>
              <p className="hero-description">
                {siteConfig.description}
              </p>
            </div>
          </div>
        </div>

        {/* تب‌های خرید و اجاره */}
        <div className="tabs-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                {activeTab === 'buy' ? 'خرید ملک' : 'اجاره ملک'}
                <span className="section-subtitle">انتخاب هوشمندانه، زندگی بهتر</span>
              </h2>
            </div>

            <div className="tabs-wrapper">
              <div className="tabs-header">
                <button 
                  className={`tab-btn ${activeTab === 'buy' ? 'active' : ''}`}
                  onClick={() => handleTabChange('buy')}
                >
                  <span className="tab-icon">🏠</span>
                  <span className="tab-text">خرید ملک</span>
                  <span className="tab-count">۱۲,۳۴۵</span>
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'rent' ? 'active' : ''}`}
                  onClick={() => handleTabChange('rent')}
                >
                  <span className="tab-icon">🔑</span>
                  <span className="tab-text">اجاره ملک</span>
                  <span className="tab-count">۲,۸۹۰</span>
                </button>
              </div>

              <div className="categories-section">
                {loadingTabs ? (
                  <div className="categories-skeleton">
                    {[1,2,3,4,5,6].map(n => (
                      <div key={n} className="skeleton-card">
                        <div className="skeleton-shine"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="categories-grid">
                    {tab.map((cat, index) => (
                      <div 
                        key={cat.id} 
                        className="category-card"
                        onClick={() => goToHotelPageWithCategory(cat)}
                        onMouseEnter={() => setHoveredCard(cat.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        style={{ '--delay': `${index * 0.1}s` }}
                      >
                        <div className="category-icon-wrapper">
                          <span className="category-icon">{cat.icon}</span>
                          <div className="category-icon-bg"></div>
                        </div>
                        <h3 className="category-title">{cat.name}</h3>
                        <div className="category-hover-effect"></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <DoubleSidebarBanners />

        {/* آژانس‌های برگزیده */}
        <div className="agencies-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                آژانس‌های برگزیده
                <span className="section-subtitle">معتبرترین مشاوران املاک تهران</span>
              </h2>
              <button className="section-more-btn" onClick={() => navigate('/agencies')}>
                مشاهده همه آژانس‌ها
                <span className="more-icon">←</span>
              </button>
            </div>

            {loading ? (
              <div className="agencies-skeleton">
                {[1,2,3,4].map(n => (
                  <div key={n} className="skeleton-agency">
                    <div className="skeleton-shine"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="agencies-slider-wrapper compact"> 
                <Slider {...sliderSettingsAjans}>
                  {agencies.map(agency => (
                    <div key={agency.id} className="agency-card-wrapper">
                      <div className="agency-card">
                        <div className="agency-info">
                          <h3 className="agency-name">{agency.name}</h3>
                          <p className="agency-location">
                            <span className="location-icon">📍</span>
                            {agency.location}
                          </p>
                          <div className="agency-stats">
                            <span className="agency-stat">
                              <span className="stat-icon">🏠</span>
                              {agency.agentCount} ملک
                            </span>
                            <span className="agency-stat">
                              <span className="stat-icon">👥</span>
                              ۱۵ مشاور
                            </span>
                          </div>
                          <button 
                            className="agency-btn"
                            onClick={() => navigate(`/hotel?agency=${agency.id}`)}
                          >
                            مشاهده آگهی‌ها
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </div>
        </div>

        {/* آگهی‌های ویژه */}
        <div className="properties-section">
          <div className="container">
            {/* <div className="section-header">
              <h2 className="section-title">
                آگهی‌های ویژه {activeTab === 'buy' ? 'خرید' : 'اجاره'}
                <span className="section-subtitle">برترین پیشنهادهای امروز</span>
              </h2>
            </div> */}

                    <RelatedPropertiesSlider 
          currentPropertyId={null} 
          regionName={activeTab === 'buy' ? 'خرید' : 'اجاره'}
          propertyType={1} 
        />
        
{/* 
            {properties.length > 0 ? (
              <div className="properties-slider-wrapper">
                <Slider {...sliderSettings}>
                  {properties.map((property, index) => {
                    const formattedProperty = formatPropertyData(property);
                    return (
                      <div key={property.id} className="property-slide">
                        <div 
                          className="property-card"
                          onClick={() => navigate(`/hotel?property=${property.id}`)}
                          style={{ '--delay': `${index * 0.1}s` }}
                        >
                          <div className="property-image">
                            <img 
                              src={formattedProperty.image} 
                              alt={`${formattedProperty.title} - ${formattedProperty.location} - ${siteConfig.name}`}
                              onError={(e) => {}}
                            />
                            <div className="property-image-overlay"></div>
                            <button className="property-favorite" aria-label="افزودن به علاقه‌مندی‌ها">
                              <span>
                                {user ? <FaRegBookmark /> : <FaBookmark />}
                              </span>
                            </button>
                          </div>
                          <div className="property-info">
                            <h3 className="property-title">{formattedProperty.title}</h3>
                            <p className="property-location">
                              <span className="location-icon">📍</span>
                              {formattedProperty.location}
                            </p>
                            <div className="property-price-section">
                              <span className="property-price-label">قیمت:</span>
                              <span className="property-price">{formattedProperty.price.toLocaleString()} تومان</span>
                            </div>
                            <div className="property-features">
                              <span className="extra-feature">{formattedProperty.area} متر</span>
                              <span className="extra-feature">{formattedProperty.rooms} خواب</span>
                              <span className="extra-feature">{formattedProperty.hasParking ? 'پارکینگ' : 'بدون پارکینگ'}</span>
                              <span className="extra-feature">{formattedProperty.year || '۱۴۰۳'}</span>
                            </div>
                            
                            <div className="property-extra-features">
                              {formattedProperty.hasElevator && <span className="extra-feature">🛗 آسانسور</span>}
                              {formattedProperty.hasPool && <span className="extra-feature">🏊 استخر</span>}
                              {formattedProperty.hasStoreRoom && <span className="extra-feature">📦 انباری</span>}
                            </div>
                            
                            <div className="property-footer">
                              <span className="property-code">کد: {property.id}</span>
                              <button className="property-view-btn" aria-label={`مشاهده جزییات ${formattedProperty.title}`}>
                                مشاهده جزییات
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            ) : (
              <div className="no-properties">
                <p>در حال بارگذاری آگهی‌ها...</p>
              </div>
            )} */}

            {/* <div className="view-all-container">
              <button className="view-all-btn" onClick={goToHotelPage}>
                مشاهده همه {activeTab === 'buy' ? 'ملک‌های خرید' : 'ملک‌های اجاره'}
                <span className="view-all-icon">←</span>
              </button>
            </div> */}
          </div>
        </div>

        {/* بخش مشاوران مستقل */}
        <AgentsSlider />

        {/* ===== بخش مقالات پربازدید ===== */}
        <div className="blog-posts-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                مقالات پربازدید
                <span className="section-subtitle">مطالب تخصصی و کاربردی حوزه املاک</span>
              </h2>
              <Link to="/blog" className="section-more-btn">
                مشاهده همه مقالات
                <span className="more-icon">←</span>
              </Link>
            </div>

            {loadingPosts ? (
              <div className="blog-posts-skeleton">
                {[1, 2, 3, 4, 5].map(n => (
                  <div key={n} className="skeleton-blog-card">
                    <div className="skeleton-shine"></div>
                  </div>
                ))}
              </div>
            ) : topPosts.length === 0 ? (
              <div className="no-posts">
                <FaNewspaper className="no-posts-icon" />
                <p>هیچ مقاله‌ای یافت نشد</p>
              </div>
            ) : (
              <div className="blog-posts-grid">
                {topPosts.map((post, index) => (
                  <article 
                    key={post.id} 
                    className="blog-post-card"
                    onClick={() => navigate(`/blog/post/${post.slug || post.id}/${post.id}`)}
                    style={{ '--delay': `${index * 0.1}s` }}
                  >
                    {post.imageUrl && (
                      <figure className="blog-post-image-wrapper">
                        <img 
                          src={`https://localhost:7178/uploads/posts/${post.imageUrl}`}
                          alt={post.title}
                          className="blog-post-image"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x250/7d0000/ffffff?text=وبلاگ';
                          }}
                        />
                        {post.categoryPostName && (
                          <figcaption className="blog-post-category">
                            {post.categoryPostName}
                          </figcaption>
                        )}
                      </figure>
                    )}
                    
                    <div className="blog-post-content">
                      <h3 className="blog-post-title">
                        <Link to={`/blog/post/${post.slug || post.id}/${post.id}`}>
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="blog-post-summary">
                        {post.summary || post.title}
                      </p>
                      
                      <div className="blog-post-meta">
                        <span>
                          <FaCalendarAlt />
                          <time dateTime={post.createdAt}>
                            {post.createdAtPersianRelative || post.createdAt}
                          </time>
                        </span>
                        <span>
                          <FaEye /> {post.countView || 0}
                        </span>
                      </div>
                      
                      <div className="blog-post-read-more">
                        <Link to={`/blog/post/${post.slug || post.id}/${post.id}`}>
                          ادامه مطلب <FaArrowLeft />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* بخش مشاوره تخصصی */}
        <div className="consult-section">
          <div className="container">
            <div className="consult-card">
              <div className="consult-content">
                <h3 className="consult-title">نیاز به مشاوره تخصصی دارید؟</h3>
                <p className="consult-description">
                  کارشناسان ما آماده پاسخگویی به سوالات شما هستند
                </p>
                <div className="consult-buttons">
                  <button className="consult-btn consult-phone">
                    <span>📞</span>
                    تماس با {siteConfig.phone}
                  </button>
                  <button className="consult-btn consult-chat">
                    <span>💬</span>
                    چت آنلاین
                  </button>
                </div>
              </div>
              <div className="consult-image">
                <div className="consult-avatar-group">
                  <div className="consult-avatar"></div>
                  <div className="consult-avatar"></div>
                  <div className="consult-avatar"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* فوتر استوری‌ها */}
        {stories && stories.length > 0 && (
          <StoriesFooter storiesData={stories} />
        )}
      </div>
    </>
  );
};

export default RealEstatePage;