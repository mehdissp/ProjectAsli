
// // // // import React, { useState, useEffect, useCallback, useMemo } from 'react';
// // // // import { useNavigate, useParams, useLocation } from 'react-router-dom';
// // // // import { 
// // // //   FaUser, FaPhone, FaStar, FaHome, FaBuilding, FaMapMarkerAlt, 
// // // //   FaClock, FaCheckCircle, FaArrowLeft, FaShare, FaCopy,
// // // //   FaWhatsapp, FaEnvelope, FaCalendarAlt, FaAward, FaShieldAlt,
// // // //   FaSpinner, FaTimes, FaUsers, FaChartLine, FaBriefcase,FaArrowRight,
// // // //   FaLock, FaEye, FaRegEye, FaLink
// // // // } from 'react-icons/fa';
// // // // import LoginModal from '../LoginModal/LoginModal';
// // // // import './ConsultantProfilePage.css';

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
// // // //         const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${userId}`);
        
// // // //         if (!response.ok) {
// // // //           throw new Error(`HTTP ${response.status}`);
// // // //         }
        
// // // //         const result = await response.json();
        
// // // //         if (result.status === 200 && result.data && result.data.length > 0) {
// // // //           const userStories = result.data[0]?.storyUser || [];
// // // //           const formattedStories = userStories.map(story => ({
// // // //             ...story,
// // // //             url: `https://localhost:7178${story.url}`
// // // //           }));
// // // //           setStories(formattedStories);
// // // //         } else {
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
// // // //       <div className="story-popup-overlay" onClick={onClose}>
// // // //         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // // //           <div className="story-loading">
// // // //             <FaSpinner className="spinner" />
// // // //             <span>در حال بارگذاری استوری‌ها...</span>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error || stories.length === 0) {
// // // //     return (
// // // //       <div className="story-popup-overlay" onClick={onClose}>
// // // //         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // // //           <div className="story-error">
// // // //             <p>{error || 'هیچ استوری برای این کاربر وجود ندارد'}</p>
// // // //             <button onClick={onClose}>بستن</button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const currentStory = stories[currentStoryIndex];

// // // //   return (
// // // //     <div 
// // // //       className="story-popup-overlay"
// // // //       onClick={onClose}
// // // //       onMouseEnter={() => setIsPaused(true)}
// // // //       onMouseLeave={() => setIsPaused(false)}
// // // //     >
// // // //       <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // // //         <div className="story-progress-container">
// // // //           {stories.map((_, index) => (
// // // //             <div key={index} className="story-progress-bar">
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
// // // //             <img src={agentImage} alt={agentName} className="story-user-avatar" />
// // // //             <span className="story-user-name">{agentName}</span>
// // // //             <span className="story-time">لحظاتی پیش</span>
// // // //           </div>
// // // //           <button className="story-close-btn" onClick={onClose}>✕</button>
// // // //         </div>

// // // //         <div className="story-content">
// // // //           <img src={currentStory.url} alt={currentStory.caption || 'استوری'} className="story-image" />
          
// // // //           {currentStory.caption && (
// // // //             <div className="story-caption">{currentStory.caption}</div>
// // // //           )}

// // // //           {currentStory.link && (
// // // //             <div className="story-link-button" onClick={() => handleStoryLink(currentStory.link)}>
// // // //               <FaLink />
// // // //               <span>{currentStory.linkText || 'مشاهده بیشتر'}</span>
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         <div className="story-nav-left" onClick={handlePrevStory} />
// // // //         <div className="story-nav-right" onClick={handleNextStory} />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // // ============================================================
// // // // // ========== کامپوننت Skeleton ==========
// // // // // ============================================================
// // // // const ProfileSkeleton = () => (
// // // //   <div className="consultant-profile-skeleton">
// // // //     <div className="skeleton-header">
// // // //       <div className="skeleton-back"></div>
// // // //       <div className="skeleton-title"></div>
// // // //     </div>
// // // //     <div className="skeleton-body">
// // // //       <div className="skeleton-avatar"></div>
// // // //       <div className="skeleton-info">
// // // //         <div className="skeleton-line"></div>
// // // //         <div className="skeleton-line"></div>
// // // //         <div className="skeleton-line short"></div>
// // // //       </div>
// // // //     </div>
// // // //   </div>
// // // // );

// // // // // ============================================================
// // // // // ========== کامپوننت اصلی ==========
// // // // // ============================================================
// // // // const ConsultantProfilePage = () => {
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation();
// // // //   const { name } = useParams();
  
// // // //   const [profile, setProfile] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [copied, setCopied] = useState(false);
// // // //   const [activeTab, setActiveTab] = useState('properties');
  
// // // //   // ===== State های لاگین =====
// // // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // // //   const [showLoginModal, setShowLoginModal] = useState(false);
// // // //   const [showPhone, setShowPhone] = useState(false);

// // // //   // ===== State های استوری =====
// // // //   const [showStoryPopup, setShowStoryPopup] = useState(false);
// // // //   const [hasStory, setHasStory] = useState(false);

// // // //   // ===== بررسی لاگین =====
// // // //   useEffect(() => {
// // // //     const checkLogin = () => {
// // // //       const token = localStorage.getItem('auth_token');
// // // //       setIsLoggedIn(!!token);
// // // //     };
    
// // // //     checkLogin();
    
// // // //     window.addEventListener('authChange', checkLogin);
// // // //     window.addEventListener('storage', checkLogin);
    
// // // //     return () => {
// // // //       window.removeEventListener('authChange', checkLogin);
// // // //       window.removeEventListener('storage', checkLogin);
// // // //     };
// // // //   }, []);

// // // //   // ===== دریافت userId از state (مخفی) =====
// // // //   useEffect(() => {
// // // //     const state = location.state;
// // // //     let userId = state?.userId;
    
// // // //     if (!userId) {
// // // //       const savedUserId = localStorage.getItem('temp_profile_userId');
// // // //       if (savedUserId) {
// // // //         userId = savedUserId;
// // // //         localStorage.removeItem('temp_profile_userId');
// // // //       }
// // // //     }

// // // //     if (!userId) {
// // // //       setError('شناسه کاربر یافت نشد');
// // // //       setLoading(false);
// // // //       return;
// // // //     }

// // // //     fetchProfile(userId);
// // // //   }, [location]);

// // // //   // ===== دریافت اطلاعات پروفایل =====
// // // //   const fetchProfile = async (userId) => {
// // // //     setLoading(true);
// // // //     setError(null);

// // // //     try {
// // // //       const token = localStorage.getItem('auth_token');
// // // //       const headers = {};
      
// // // //       if (token) {
// // // //         headers['Authorization'] = `Bearer ${token}`;
// // // //       }

// // // //       const response = await fetch(
// // // //         `https://localhost:7178/api/RealEstatePage/GetUserForSite?userId=${userId}`,
// // // //         { headers }
// // // //       );

// // // //       if (!response.ok) {
// // // //         throw new Error(`HTTP ${response.status}`);
// // // //       }

// // // //       const result = await response.json();
// // // //       console.log('📦 پروفایل مشاور:', result);

// // // //       if (result.status === 200 && result.data) {
// // // //         const profileData = {
// // // //           ...result.data,
// // // //           avatar: result.data.avatar 
// // // //             ? `https://localhost:7178${result.data.avatar}` 
// // // //             : 'https://randomuser.me/api/portraits/men/32.jpg',
// // // //           regionOfWork: result.data.regionOfWork || [],
// // // //           score: parseInt(result.data.score) || 0,
// // // //           _userId: userId,
// // // //           // بررسی وجود استوری - اگر API این رو برگردونه
// // // //           hasStory: result.data.hasStory || false
// // // //         };
        
// // // //         setProfile(profileData);
// // // //         setHasStory(profileData.hasStory);
        
// // // //         document.title = `مشاور املاک ${profileData.fullName} | املاک تهران`;
        
// // // //       } else {
// // // //         throw new Error(result.message || 'پروفایل یافت نشد');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('❌ خطا در دریافت پروفایل:', error);
// // // //       setError(error.message || 'مشکل در دریافت اطلاعات');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // ===== توابع =====
// // // //   const handleBack = useCallback(() => {
// // // //     navigate(-1);
// // // //   }, [navigate]);

// // // //   const handleShare = useCallback(async () => {
// // // //     const shareData = {
// // // //       title: `مشاور املاک ${profile?.fullName}`,
// // // //       text: `مشاور املاک ${profile?.fullName} با ${profile?.score} امتیاز و ${profile?.countOfRealEtates} ملک فعال`,
// // // //       url: window.location.href
// // // //     };

// // // //     if (navigator.share && /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)) {
// // // //       try {
// // // //         await navigator.share(shareData);
// // // //       } catch (error) {
// // // //         if (error.name !== 'AbortError') {
// // // //           handleCopyLink();
// // // //         }
// // // //       }
// // // //     } else {
// // // //       handleCopyLink();
// // // //     }
// // // //   }, [profile]);

// // // //   const handleCopyLink = useCallback(() => {
// // // //     navigator.clipboard.writeText(window.location.href);
// // // //     setCopied(true);
// // // //     setTimeout(() => setCopied(false), 3000);
// // // //   }, []);

// // // //   // ===== توابع تماس با قفل =====
// // // //   const handlePhoneClick = useCallback(() => {
// // // //     if (!isLoggedIn) {
// // // //       setShowLoginModal(true);
// // // //       return;
// // // //     }
// // // //     setShowPhone(true);
// // // //   }, [isLoggedIn]);

// // // //   const handleCall = useCallback(() => {
// // // //     if (!isLoggedIn) {
// // // //       setShowLoginModal(true);
// // // //       return;
// // // //     }
// // // //     if (profile?.mobileNumber) {
// // // //       window.location.href = `tel:${profile.mobileNumber.replace(/\s/g, '')}`;
// // // //     }
// // // //   }, [isLoggedIn, profile]);

// // // //   const handleWhatsApp = useCallback(() => {
// // // //     if (!isLoggedIn) {
// // // //       setShowLoginModal(true);
// // // //       return;
// // // //     }
// // // //     if (profile?.mobileNumber) {
// // // //       window.open(`https://wa.me/${profile.mobileNumber.replace(/\s/g, '')}`, '_blank');
// // // //     }
// // // //   }, [isLoggedIn, profile]);

// // // //   const handleLoginModalClose = useCallback(() => {
// // // //     setShowLoginModal(false);
// // // //     const token = localStorage.getItem('auth_token');
// // // //     if (token) {
// // // //       setIsLoggedIn(true);
// // // //     }
// // // //   }, []);

// // // //   // ===== توابع استوری =====
// // // //   const handleStoryClick = useCallback((e) => {
// // // //     if (e) {
// // // //       e.stopPropagation();
// // // //     }
    
// // // //     if (profile?._userId) {
// // // //       setShowStoryPopup(true);
// // // //       document.body.style.overflow = 'hidden';
// // // //     }
// // // //   }, [profile]);

// // // //   const handleStoryClose = useCallback(() => {
// // // //     setShowStoryPopup(false);
// // // //     document.body.style.overflow = '';
// // // //   }, []);

// // // //   // ===== متادیتا برای سئو =====
// // // //   useEffect(() => {
// // // //     if (!profile) return;

// // // //     const metaDescription = `صفحه رسمی ${profile.fullName}، مشاور املاک حرفه‌ای با ${profile.score} امتیاز و ${profile.countOfRealEtates} ملک فعال در مناطق ${profile.regionOfWork.join('، ')}. برای مشاوره رایگان خرید و فروش ملک تماس بگیرید.`;
// // // //     const metaKeywords = `${profile.fullName}, مشاور املاک, املاک تهران, خرید و فروش ملک, ${profile.regionOfWork.join(', ')}, مشاوره املاک`;

// // // //     const updateMeta = (name, content, isProperty = false) => {
// // // //       const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
// // // //       let meta = document.querySelector(selector);
// // // //       if (!meta) {
// // // //         meta = document.createElement('meta');
// // // //         if (isProperty) {
// // // //           meta.setAttribute('property', name);
// // // //         } else {
// // // //           meta.setAttribute('name', name);
// // // //         }
// // // //         document.head.appendChild(meta);
// // // //       }
// // // //       meta.setAttribute('content', content);
// // // //     };

// // // //     updateMeta('description', metaDescription);
// // // //     updateMeta('keywords', metaKeywords);
// // // //     updateMeta('robots', 'index, follow, max-image-preview:large');
    
// // // //     updateMeta('og:title', `مشاور املاک ${profile.fullName} | املاک تهران`, true);
// // // //     updateMeta('og:description', metaDescription, true);
// // // //     updateMeta('og:image', profile.avatar, true);
// // // //     updateMeta('og:url', window.location.href, true);
// // // //     updateMeta('og:type', 'profile', true);
// // // //     updateMeta('og:locale', 'fa_IR', true);
// // // //     updateMeta('og:site_name', 'املاک تهران', true);
    
// // // //     updateMeta('twitter:card', 'summary_large_image');
// // // //     updateMeta('twitter:title', `مشاور املاک ${profile.fullName}`);
// // // //     updateMeta('twitter:description', metaDescription);
// // // //     updateMeta('twitter:image', profile.avatar);

// // // //     // Structured Data
// // // //     const removeOldScript = () => {
// // // //       const oldScript = document.getElementById('json-ld-profile');
// // // //       if (oldScript) oldScript.remove();
// // // //     };
// // // //     removeOldScript();

// // // //     const structuredData = {
// // // //       "@context": "https://schema.org",
// // // //       "@type": "Person",
// // // //       "name": profile.fullName,
// // // //       "jobTitle": "مشاور املاک",
// // // //       "url": window.location.href,
// // // //       "image": profile.avatar,
// // // //       "telephone": profile.mobileNumber,
// // // //       "address": {
// // // //         "@type": "PostalAddress",
// // // //         "addressLocality": profile.regionOfWork.join('، '),
// // // //         "addressCountry": "IR"
// // // //       },
// // // //       "aggregateRating": {
// // // //         "@type": "AggregateRating",
// // // //         "ratingValue": Math.min(5, (profile.score / 20) || 4.5),
// // // //         "ratingCount": profile.countOfRealEtates * 2 || 10,
// // // //         "bestRating": 5,
// // // //         "worstRating": 1
// // // //       },
// // // //       "makesOffer": {
// // // //         "@type": "Offer",
// // // //         "itemOffered": {
// // // //           "@type": "Service",
// // // //           "name": "مشاوره خرید و فروش ملک",
// // // //           "description": `خدمات مشاوره املاک در مناطق ${profile.regionOfWork.join('، ')}`
// // // //         }
// // // //       }
// // // //     };

// // // //     const script = document.createElement('script');
// // // //     script.id = 'json-ld-profile';
// // // //     script.type = 'application/ld+json';
// // // //     script.textContent = JSON.stringify(structuredData);
// // // //     document.head.appendChild(script);

// // // //     return () => {
// // // //       removeOldScript();
// // // //     };
// // // //   }, [profile]);

// // // //   // ===== رندر =====
// // // //   if (error) {
// // // //     return (
// // // //       <div className="consultant-profile-page">
// // // //         <div className="profile-error">
// // // //           <div className="error-icon">
// // // //             <FaTimes />
// // // //           </div>
// // // //           <h2>متاسفانه خطایی رخ داده است</h2>
// // // //           <p>{error}</p>
// // // //           <div className="error-actions">
// // // //             <button onClick={() => window.location.reload()}>تلاش مجدد</button>
// // // //             <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="consultant-profile-page">
// // // //         <ProfileSkeleton />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (!profile) {
// // // //     return (
// // // //       <div className="consultant-profile-page">
// // // //         <div className="profile-not-found">
// // // //           <h2>مشاور یافت نشد</h2>
// // // //           <p>متاسفانه پروفایل مورد نظر یافت نشد</p>
// // // //           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // محاسبه امتیاز به ستاره
// // // //   const starRating = Math.min(5, Math.round(profile.score / 20));
// // // //   const fullStars = Math.floor(starRating);
// // // //   const hasHalfStar = starRating % 1 >= 0.5;

// // // //   // ماسک کردن شماره موبایل
// // // //   const maskPhoneNumber = (phone) => {
// // // //     if (!phone) return '**********';
// // // //     if (phone.length <= 4) return '****';
// // // //     const visible = phone.slice(-4);
// // // //     return `*****${visible}`;
// // // //   };

// // // //   return (
// // // //     <div className="consultant-profile-page">
// // // //       {/* مودال لاگین */}
// // // //       {showLoginModal && (
// // // //         <LoginModal 
// // // //           onClose={handleLoginModalClose}
// // // //           triggerSource="consultant-profile"
// // // //         />
// // // //       )}

// // // //       {/* مودال استوری */}
// // // //       {showStoryPopup && (
// // // //         <StoryPopup 
// // // //           agentName={profile.fullName}
// // // //           agentImage={profile.avatar}
// // // //           userId={profile._userId}
// // // //           onClose={handleStoryClose}
// // // //         />
// // // //       )}

// // // //       {/* هدر */}
// // // //       <div className="profile-header">
// // // //         <div className="profile-header-content">
// // // //           <button className="back-btn" onClick={handleBack}>
// // // //             <FaArrowRight />
// // // //             <span>بازگشت</span>
// // // //           </button>
// // // //           <h1 className="profile-title">
// // // //             پروفایل {profile.fullName}
// // // //           </h1>
// // // //           <div className="header-actions">
// // // //             <button className="share-btn" onClick={handleShare} title="اشتراک‌گذاری">
// // // //               <FaShare />
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* بخش اصلی پروفایل */}
// // // //       <div className="profile-main">
// // // //         {/* کارت پروفایل */}
// // // //         <div className="profile-card">
// // // //           <div className="profile-avatar-section">
// // // //             <div className="avatar-wrapper">
// // // //               <div 
// // // //                 className={`profile-avatar-container ${hasStory ? 'has-story' : ''}`}
// // // //                 onClick={hasStory ? handleStoryClick : undefined}
// // // //                 style={{ cursor: hasStory ? 'pointer' : 'default' }}
// // // //               >
// // // //                 <img 
// // // //                   src={profile.avatar} 
// // // //                   alt={`${profile.fullName} - مشاور املاک حرفه‌ای`}
// // // //                   className="profile-avatar"
// // // //                   onError={(e) => {
// // // //                     e.target.src = 'https://randomuser.me/api/portraits/men/32.jpg';
// // // //                   }}
// // // //                 />
// // // //                 {hasStory && (
// // // //                   <div className="story-ring">
// // // //                     <div className="story-ring-inner"></div>
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //               <div className="avatar-status online">
// // // //                 <span className="status-dot"></span>
// // // //               </div>
// // // //             </div>
            
// // // //             {/* برچسب استوری */}
// // // //             {hasStory && (
// // // //               <div className="story-label-badge" onClick={handleStoryClick}>
// // // //                 <span className="story-dot"></span>
// // // //                 <span>استوری</span>
// // // //               </div>
// // // //             )}

// // // //             <div className="profile-badges">
// // // //               {profile.score >= 50 && (
// // // //                 <span className="badge gold">
// // // //                   <FaAward /> طلایی
// // // //                 </span>
// // // //               )}
// // // //               {profile.score >= 30 && profile.score < 50 && (
// // // //                 <span className="badge silver">
// // // //                   <FaAward /> نقره‌ای
// // // //                 </span>
// // // //               )}
// // // //               <span className="badge verified">
// // // //                 <FaShieldAlt /> تأیید شده
// // // //               </span>
// // // //             </div>
// // // //           </div>

// // // //           <div className="profile-info">
// // // //             <h2 className="consultant-name">{profile.fullName}</h2>
// // // //             <div className="consultant-title">
// // // //               <FaBriefcase className="title-icon" />
// // // //               <span>مشاور املاک حرفه‌ای</span>
// // // //               {hasStory && (
// // // //                 <span 
// // // //                   className="story-label-inline" 
// // // //                   onClick={handleStoryClick}
// // // //                 >
// // // //                   <span className="story-dot"></span>
// // // //                   استوری
// // // //                 </span>
// // // //               )}
// // // //             </div>

// // // //             {/* امتیاز ستاره‌ای */}
// // // //             <div className="rating-section">
// // // //               <div className="stars">
// // // //                 {[...Array(5)].map((_, i) => (
// // // //                   <FaStar 
// // // //                     key={i}
// // // //                     className={
// // // //                       i < fullStars ? 'star filled' :
// // // //                       i === fullStars && hasHalfStar ? 'star half' :
// // // //                       'star empty'
// // // //                     }
// // // //                   />
// // // //                 ))}
// // // //               </div>
// // // //               <span className="rating-score">{profile.score} امتیاز</span>
// // // //               <span className="rating-count">({profile.countOfRealEtates * 2 || 0} نظر)</span>
// // // //             </div>

// // // //             {/* اطلاعات تماس - با قفل برای کاربران لاگین نشده */}
// // // //             <div className="contact-info">
// // // //               <div className="contact-item">
// // // //                 <FaPhone className="contact-icon" />
// // // //                 <span className="contact-label">شماره تماس</span>
// // // //                 <div className="contact-value-wrapper">
// // // //                   {isLoggedIn && showPhone ? (
// // // //                     <span className="contact-value">{profile.mobileNumber}</span>
// // // //                   ) : (
// // // //                     <span className="contact-value masked">
// // // //                       {isLoggedIn ? (
// // // //                         <button 
// // // //                           className="show-phone-btn"
// // // //                           onClick={() => setShowPhone(true)}
// // // //                         >
// // // //                           <FaEye /> نمایش شماره
// // // //                         </button>
// // // //                       ) : (
// // // //                         <span className="phone-masked">
// // // //                           {maskPhoneNumber(profile.mobileNumber)}
// // // //                           <FaLock className="lock-icon" />
// // // //                         </span>
// // // //                       )}
// // // //                     </span>
// // // //                   )}
// // // //                 </div>
// // // //               </div>
// // // //               <div className="contact-item">
// // // //                 <FaClock className="contact-icon" />
// // // //                 <span className="contact-label">عضویت</span>
// // // //                 <span className="contact-value">{profile.dateTimeOfSite}</span>
// // // //               </div>
// // // //             </div>

// // // //             {/* دکمه‌های اقدام */}
// // // //             <div className="action-buttons">
// // // //               <button 
// // // //                 className={`action-btn call ${!isLoggedIn ? 'locked' : ''}`}
// // // //                 onClick={handleCall}
// // // //               >
// // // //                 <FaPhone /> 
// // // //                 <span>{isLoggedIn ? 'تماس فوری' : 'تماس'}</span>
// // // //                 {!isLoggedIn && (
// // // //                   <span className="lock-badge">
// // // //                     <FaLock className="lock-icon-small" />
// // // //                   </span>
// // // //                 )}
// // // //               </button>

// // // //               <button 
// // // //                 className={`action-btn whatsapp ${!isLoggedIn ? 'locked' : ''}`}
// // // //                 onClick={handleWhatsApp}
// // // //               >
// // // //                 <FaWhatsapp /> 
// // // //                 <span>واتساپ</span>
// // // //                 {!isLoggedIn && (
// // // //                   <span className="lock-badge">
// // // //                     <FaLock className="lock-icon-small" />
// // // //                   </span>
// // // //                 )}
// // // //               </button>

// // // //               <button className="action-btn share" onClick={handleCopyLink}>
// // // //                 <FaCopy />
// // // //                 <span>کپی لینک</span>
// // // //               </button>
// // // //             </div>

// // // //             {/* دکمه ورود برای کاربران لاگین نشده */}
// // // //             {!isLoggedIn && (
// // // //               <button 
// // // //                 className="login-prompt-btn" 
// // // //                 onClick={() => setShowLoginModal(true)}
// // // //               >
// // // //                 <FaUser className="login-icon" />
// // // //                 برای مشاهده شماره تماس وارد شوید
// // // //                 <FaArrowRight className="arrow-icon" />
// // // //               </button>
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         {/* آمار */}
// // // //         <div className="stats-grid">
// // // //           <div className="stat-card">
// // // //             <div className="stat-icon home">
// // // //               <FaHome />
// // // //             </div>
// // // //             <div className="stat-info">
// // // //               <span className="stat-value">{profile.countOfRealEtates}</span>
// // // //               <span className="stat-label">ملک فعال</span>
// // // //             </div>
// // // //           </div>
// // // //           <div className="stat-card">
// // // //             <div className="stat-icon rent">
// // // //               <FaBuilding />
// // // //             </div>
// // // //             <div className="stat-info">
// // // //               <span className="stat-value">{profile.countOfRent}</span>
// // // //               <span className="stat-label">ملک اجاره‌ای</span>
// // // //             </div>
// // // //           </div>
// // // //           <div className="stat-card">
// // // //             <div className="stat-icon score">
// // // //               <FaChartLine />
// // // //             </div>
// // // //             <div className="stat-info">
// // // //               <span className="stat-value">{profile.score}</span>
// // // //               <span className="stat-label">امتیاز</span>
// // // //             </div>
// // // //           </div>
// // // //           <div className="stat-card">
// // // //             <div className="stat-icon total">
// // // //               <FaUsers />
// // // //             </div>
// // // //             <div className="stat-info">
// // // //               <span className="stat-value">{profile.countOfRealEtates + profile.countOfRent}</span>
// // // //               <span className="stat-label">کل معاملات</span>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* مناطق فعالیت */}
// // // //         <div className="regions-section">
// // // //           <h3 className="section-title">
// // // //             <FaMapMarkerAlt className="section-icon" />
// // // //             مناطق فعالیت
// // // //           </h3>
// // // //           <div className="regions-tags">
// // // //             {profile.regionOfWork.length > 0 ? (
// // // //               profile.regionOfWork.map((region, index) => (
// // // //                 <span key={index} className="region-tag">
// // // //                   <FaMapMarkerAlt />
// // // //                   {region}
// // // //                 </span>
// // // //               ))
// // // //             ) : (
// // // //               <span className="no-region">منطقه‌ای ثبت نشده</span>
// // // //             )}
// // // //           </div>
// // // //           <p className="region-description">
// // // //             {profile.fullName} با سابقه درخشان در حوزه مشاوره املاک، در مناطق {profile.regionOfWork.join('، ')} آماده ارائه خدمات تخصصی خرید، فروش و اجاره ملک به شما عزیزان است.
// // // //           </p>
// // // //         </div>

// // // //         {/* تب‌ها */}
// // // //         <div className="profile-tabs">
// // // //           <button 
// // // //             className={`tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
// // // //             onClick={() => setActiveTab('properties')}
// // // //           >
// // // //             <FaHome />
// // // //             <span>ملک‌های مشاور</span>
// // // //             <span className="tab-badge">{profile.countOfRealEtates}</span>
// // // //           </button>
// // // //           <button 
// // // //             className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
// // // //             onClick={() => setActiveTab('about')}
// // // //           >
// // // //             <FaUser />
// // // //             <span>درباره مشاور</span>
// // // //           </button>
// // // //         </div>

// // // //         {/* محتوای تب‌ها */}
// // // //         <div className="tab-content">
// // // //           {activeTab === 'properties' && (
// // // //             <div className="properties-tab">
// // // //               <div className="properties-placeholder">
// // // //                 <FaHome className="placeholder-icon" />
// // // //                 <h3>ملک‌های {profile.fullName}</h3>
// // // //                 <p>در حال بارگذاری لیست ملک‌های این مشاور...</p>
// // // //                 <p className="placeholder-note">
// // // //                   {profile.countOfRealEtates} ملک فعال برای فروش
// // // //                 </p>
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           {activeTab === 'about' && (
// // // //             <div className="about-tab">
// // // //               <div className="about-card">
// // // //                 <h3>درباره {profile.fullName}</h3>
// // // //                 <div className="about-content">
// // // //                   <p>
// // // //                     <strong>{profile.fullName}</strong> یکی از مشاوران املاک حرفه‌ای و با تجربه در 
// // // //                     مناطق {profile.regionOfWork.join('، ')} می‌باشد. با کسب {profile.score} امتیاز 
// // // //                     و ثبت {profile.countOfRealEtates} ملک فعال، این مشاور املاک آماده ارائه 
// // // //                     مشاوره تخصصی در زمینه خرید، فروش و اجاره ملک به شما عزیزان است.
// // // //                   </p>
// // // //                   <div className="about-details">
// // // //                     <div className="about-item">
// // // //                       <FaCalendarAlt />
// // // //                       <span>عضویت: {profile.dateTimeOfSite}</span>
// // // //                     </div>
                    
// // // //                     {/* بخش شماره تماس - فقط برای کاربران لاگین شده */}
// // // //                     <div className="about-item">
// // // //                       <FaPhone />
// // // //                       <span className="about-phone-wrapper">
// // // //                         {isLoggedIn && showPhone ? (
// // // //                           <span className="about-phone-value">{profile.mobileNumber}</span>
// // // //                         ) : (
// // // //                           <span className="about-phone-masked">
// // // //                             {isLoggedIn ? (
// // // //                               <button 
// // // //                                 className="show-phone-btn about-show-phone"
// // // //                                 onClick={() => setShowPhone(true)}
// // // //                               >
// // // //                                 <FaEye /> نمایش شماره تماس
// // // //                               </button>
// // // //                             ) : (
// // // //                               <>
// // // //                                 <span className="masked-text">برای مشاهده شماره وارد شوید</span>
// // // //                                 <FaLock className="lock-icon about-lock" />
// // // //                               </>
// // // //                             )}
// // // //                           </span>
// // // //                         )}
// // // //                       </span>
// // // //                     </div>
                    
// // // //                     <div className="about-item">
// // // //                       <FaMapMarkerAlt />
// // // //                       <span>مناطق: {profile.regionOfWork.join('، ')}</span>
// // // //                     </div>
// // // //                     <div className="about-item">
// // // //                       <FaAward />
// // // //                       <span>امتیاز: {profile.score}</span>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {/* فوتر */}
// // // //       <div className="profile-footer">
// // // //         <p>
// // // //           صفحه رسمی {profile.fullName} در املاک تهران
// // // //         </p>
// // // //       </div>

// // // //       {/* توست نوتیفیکیشن */}
// // // //       {copied && (
// // // //         <div className="toast-notification">
// // // //           <FaCheckCircle />
// // // //           <span>لینک پروفایل کپی شد</span>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ConsultantProfilePage;

// // // import React, { useState, useEffect, useCallback, useMemo } from 'react';
// // // import { useNavigate, useParams, useLocation } from 'react-router-dom';
// // // import { 
// // //   FaUser, FaPhone, FaStar, FaHome, FaBuilding, FaMapMarkerAlt, 
// // //   FaClock, FaCheckCircle, FaArrowLeft, FaShare, FaCopy,
// // //   FaWhatsapp, FaEnvelope, FaCalendarAlt, FaAward, FaShieldAlt,
// // //   FaSpinner, FaTimes, FaUsers, FaChartLine, FaBriefcase,FaArrowRight,
// // //   FaLock, FaEye, FaRegEye, FaLink
// // // } from 'react-icons/fa';
// // // import LoginModal from '../LoginModal/LoginModal';
// // // import './ConsultantProfilePage.css';

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
// // //         const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${userId}`);
        
// // //         if (!response.ok) {
// // //           throw new Error(`HTTP ${response.status}`);
// // //         }
        
// // //         const result = await response.json();
// // //         console.log('📱 استوری‌های دریافتی:', result);
        
// // //         if (result.status === 200 && result.data && result.data.length > 0) {
// // //           const userStories = result.data[0]?.storyUser || [];
// // //           const formattedStories = userStories.map(story => ({
// // //             ...story,
// // //             url: `https://localhost:7178${story.url}`
// // //           }));
// // //           setStories(formattedStories);
// // //           if (formattedStories.length === 0) {
// // //             setError('هیچ استوری برای این کاربر وجود ندارد');
// // //           }
// // //         } else {
// // //           setStories([]);
// // //           setError('هیچ استوری برای این کاربر وجود ندارد');
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
// // //     console.log(link)
// // //     if (link) {
// // //       window.location.href = link;
// // //     }
// // //   }, []);

// // //   if (loading) {
// // //     return (
// // //       <div className="story-popup-overlay" onClick={onClose}>
// // //         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // //           <div className="story-loading">
// // //             <FaSpinner className="spinner" />
// // //             <span>در حال بارگذاری استوری‌ها...</span>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error || stories.length === 0) {
// // //     return (
// // //       <div className="story-popup-overlay" onClick={onClose}>
// // //         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // //           <div className="story-error">
// // //             <p>{error || 'هیچ استوری برای این کاربر وجود ندارد'}</p>
// // //             <button onClick={onClose}>بستن</button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   const currentStory = stories[currentStoryIndex];

// // //   return (
// // //     <div 
// // //       className="story-popup-overlay"
// // //       onClick={onClose}
// // //       onMouseEnter={() => setIsPaused(true)}
// // //       onMouseLeave={() => setIsPaused(false)}
// // //     >
// // //       <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// // //         <div className="story-progress-container">
// // //           {stories.map((_, index) => (
// // //             <div key={index} className="story-progress-bar">
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
// // //             <img src={agentImage} alt={agentName} className="story-user-avatar" />
// // //             <span className="story-user-name">{agentName}</span>
// // //             <span className="story-time">لحظاتی پیش</span>
// // //           </div>
// // //           <button className="story-close-btn" onClick={onClose}>✕</button>
// // //         </div>

// // //         <div className="story-content">
// // //           <img src={currentStory.url} alt={currentStory.caption || 'استوری'} className="story-image" />
          
// // //           {currentStory.caption && (
// // //             <div className="story-caption">{currentStory.caption}</div>
// // //           )}

// // //           {currentStory.link && (
// // //             <div className="story-link-button" onClick={() => handleStoryLink(currentStory.link)}>
// // //               <FaLink />
// // //               <span>{currentStory.linkText || 'مشاهده بیشتر'}</span>
// // //             </div>
// // //           )}
// // //         </div>

// // //         <div className="story-nav-left" onClick={handlePrevStory} />
// // //         <div className="story-nav-right" onClick={handleNextStory} />
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // ============================================================
// // // // ========== کامپوننت Skeleton ==========
// // // // ============================================================
// // // const ProfileSkeleton = () => (
// // //   <div className="consultant-profile-skeleton">
// // //     <div className="skeleton-header">
// // //       <div className="skeleton-back"></div>
// // //       <div className="skeleton-title"></div>
// // //     </div>
// // //     <div className="skeleton-body">
// // //       <div className="skeleton-avatar"></div>
// // //       <div className="skeleton-info">
// // //         <div className="skeleton-line"></div>
// // //         <div className="skeleton-line"></div>
// // //         <div className="skeleton-line short"></div>
// // //       </div>
// // //     </div>
// // //   </div>
// // // );

// // // // ============================================================
// // // // ========== کامپوننت اصلی ==========
// // // // ============================================================
// // // const ConsultantProfilePage = () => {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const { name } = useParams();
  
// // //   const [profile, setProfile] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [copied, setCopied] = useState(false);
// // //   const [activeTab, setActiveTab] = useState('properties');
  
// // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // //   const [showLoginModal, setShowLoginModal] = useState(false);
// // //   const [showPhone, setShowPhone] = useState(false);

// // //   const [showStoryPopup, setShowStoryPopup] = useState(false);
// // //   const [hasStory, setHasStory] = useState(false);
// // //   const [storyLoading, setStoryLoading] = useState(false);

// // //   // ===== بررسی لاگین =====
// // //   useEffect(() => {
// // //     const checkLogin = () => {
// // //       const token = localStorage.getItem('auth_token');
// // //       setIsLoggedIn(!!token);
// // //     };
    
// // //     checkLogin();
    
// // //     window.addEventListener('authChange', checkLogin);
// // //     window.addEventListener('storage', checkLogin);
    
// // //     return () => {
// // //       window.removeEventListener('authChange', checkLogin);
// // //       window.removeEventListener('storage', checkLogin);
// // //     };
// // //   }, []);

// // //   // ===== دریافت userId از state =====
// // //   useEffect(() => {
// // //     const state = location.state;
// // //     let userId = state?.userId;
    
// // //     if (!userId) {
// // //       const savedUserId = localStorage.getItem('temp_profile_userId');
// // //       if (savedUserId) {
// // //         userId = savedUserId;
// // //         localStorage.removeItem('temp_profile_userId');
// // //       }
// // //     }

// // //     if (!userId) {
// // //       setError('شناسه کاربر یافت نشد');
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     fetchProfile(userId);
// // //   }, [location]);

// // //   // ===== دریافت اطلاعات پروفایل =====
// // //   const fetchProfile = async (userId) => {
// // //     setLoading(true);
// // //     setError(null);

// // //     try {
// // //       const token = localStorage.getItem('auth_token');
// // //       const headers = {};
      
// // //       if (token) {
// // //         headers['Authorization'] = `Bearer ${token}`;
// // //       }

// // //       const response = await fetch(
// // //         `https://localhost:7178/api/RealEstatePage/GetUserForSite?userId=${userId}`,
// // //         { headers }
// // //       );

// // //       if (!response.ok) {
// // //         throw new Error(`HTTP ${response.status}`);
// // //       }

// // //       const result = await response.json();
// // //       console.log('📦 پروفایل مشاور:', result);

// // //       if (result.status === 200 && result.data) {
// // //         const profileData = {
// // //           ...result.data,
// // //           avatar: result.data.avatar 
// // //             ? `https://localhost:7178${result.data.avatar}` 
// // //             : 'https://randomuser.me/api/portraits/men/32.jpg',
// // //           regionOfWork: result.data.regionOfWork || [],
// // //           score: parseInt(result.data.score) || 0,
// // //           _userId: userId
// // //         };
        
// // //         setProfile(profileData);
// // //         document.title = `مشاور املاک ${profileData.fullName} | املاک تهران`;
        
// // //         // بررسی استوری
// // //         checkHasStory(userId);
        
// // //       } else {
// // //         throw new Error(result.message || 'پروفایل یافت نشد');
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ خطا در دریافت پروفایل:', error);
// // //       setError(error.message || 'مشکل در دریافت اطلاعات');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // ===== بررسی وجود استوری =====
// // //   const checkHasStory = async (userId) => {
// // //     try {
// // //       console.log('🔍 بررسی استوری برای userId:', userId);
      
// // //       const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${userId}`);
      
// // //       if (!response.ok) {
// // //         console.warn('⚠️ خطا در دریافت استوری:', response.status);
// // //         setHasStory(false);
// // //         return;
// // //       }
      
// // //       const result = await response.json();
// // //       console.log('📱 نتیجه استوری:', result);
      
// // //       let hasStoryResult = false;
// // //       if (result.status === 200 && result.data && result.data.length > 0) {
// // //         const userStories = result.data[0]?.storyUser || [];
// // //         hasStoryResult = userStories.length > 0;
// // //         console.log('📊 تعداد استوری‌ها:', userStories.length);
// // //       }
      
// // //       setHasStory(hasStoryResult);
// // //       console.log('✅ hasStory نهایی:', hasStoryResult);
      
// // //     } catch (error) {
// // //       console.error('❌ خطا در بررسی استوری:', error);
// // //       setHasStory(false);
// // //     }
// // //   };

// // //   // ===== توابع =====
// // //   const handleBack = useCallback(() => {
// // //     navigate(-1);
// // //   }, [navigate]);

// // //   const handleShare = useCallback(async () => {
// // //     const shareData = {
// // //       title: `مشاور املاک ${profile?.fullName}`,
// // //       text: `مشاور املاک ${profile?.fullName} با ${profile?.score} امتیاز و ${profile?.countOfRealEtates} ملک فعال`,
// // //       url: window.location.href
// // //     };

// // //     if (navigator.share && /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)) {
// // //       try {
// // //         await navigator.share(shareData);
// // //       } catch (error) {
// // //         if (error.name !== 'AbortError') {
// // //           handleCopyLink();
// // //         }
// // //       }
// // //     } else {
// // //       handleCopyLink();
// // //     }
// // //   }, [profile]);

// // //   const handleCopyLink = useCallback(() => {
// // //     navigator.clipboard.writeText(window.location.href);
// // //     setCopied(true);
// // //     setTimeout(() => setCopied(false), 3000);
// // //   }, []);

// // //   const handlePhoneClick = useCallback(() => {
// // //     if (!isLoggedIn) {
// // //       setShowLoginModal(true);
// // //       return;
// // //     }
// // //     setShowPhone(true);
// // //   }, [isLoggedIn]);

// // //   const handleCall = useCallback(() => {
// // //     if (!isLoggedIn) {
// // //       setShowLoginModal(true);
// // //       return;
// // //     }
// // //     if (profile?.mobileNumber) {
// // //       window.location.href = `tel:${profile.mobileNumber.replace(/\s/g, '')}`;
// // //     }
// // //   }, [isLoggedIn, profile]);

// // //   const handleWhatsApp = useCallback(() => {
// // //     if (!isLoggedIn) {
// // //       setShowLoginModal(true);
// // //       return;
// // //     }
// // //     if (profile?.mobileNumber) {
// // //       window.open(`https://wa.me/${profile.mobileNumber.replace(/\s/g, '')}`, '_blank');
// // //     }
// // //   }, [isLoggedIn, profile]);

// // //   const handleLoginModalClose = useCallback(() => {
// // //     setShowLoginModal(false);
// // //     const token = localStorage.getItem('auth_token');
// // //     if (token) {
// // //       setIsLoggedIn(true);
// // //     }
// // //   }, []);

// // //   // ===== توابع استوری =====
// // //   const handleStoryClick = useCallback(async (e) => {
// // //     if (e) {
// // //       e.stopPropagation();
// // //     }
    
// // //     if (!profile?._userId) {
// // //       console.warn('شناسه کاربر موجود نیست');
// // //       return;
// // //     }

// // //     // اگر قبلاً استوری چک نشده یا false بوده، دوباره چک کن
// // //     if (!hasStory) {
// // //       setStoryLoading(true);
// // //       try {
// // //         const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${profile._userId}`);
// // //         const result = await response.json();
        
// // //         if (result.status === 200 && result.data && result.data.length > 0) {
// // //           const userStories = result.data[0]?.storyUser || [];
// // //           if (userStories.length > 0) {
// // //             setHasStory(true);
// // //             setShowStoryPopup(true);
// // //             document.body.style.overflow = 'hidden';
// // //             setStoryLoading(false);
// // //             return;
// // //           }
// // //         }
// // //         setHasStory(false);
// // //         setStoryLoading(false);
// // //         alert('این کاربر استوری ندارد');
// // //       } catch (error) {
// // //         console.error('خطا در بررسی استوری:', error);
// // //         setStoryLoading(false);
// // //         alert('مشکل در بررسی استوری');
// // //       }
// // //       return;
// // //     }

// // //     // اگر استوری داشت، نمایش بده
// // //     setShowStoryPopup(true);
// // //     document.body.style.overflow = 'hidden';
// // //   }, [profile, hasStory]);

// // //   const handleStoryClose = useCallback(() => {
// // //     setShowStoryPopup(false);
// // //     document.body.style.overflow = '';
// // //   }, []);

// // //   // ===== متادیتا برای سئو =====
// // //   useEffect(() => {
// // //     if (!profile) return;

// // //     const metaDescription = `صفحه رسمی ${profile.fullName}، مشاور املاک حرفه‌ای با ${profile.score} امتیاز و ${profile.countOfRealEtates} ملک فعال در مناطق ${profile.regionOfWork.join('، ')}. برای مشاوره رایگان خرید و فروش ملک تماس بگیرید.`;
// // //     const metaKeywords = `${profile.fullName}, مشاور املاک, املاک تهران, خرید و فروش ملک, ${profile.regionOfWork.join(', ')}, مشاوره املاک`;

// // //     const updateMeta = (name, content, isProperty = false) => {
// // //       const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
// // //       let meta = document.querySelector(selector);
// // //       if (!meta) {
// // //         meta = document.createElement('meta');
// // //         if (isProperty) {
// // //           meta.setAttribute('property', name);
// // //         } else {
// // //           meta.setAttribute('name', name);
// // //         }
// // //         document.head.appendChild(meta);
// // //       }
// // //       meta.setAttribute('content', content);
// // //     };

// // //     updateMeta('description', metaDescription);
// // //     updateMeta('keywords', metaKeywords);
// // //     updateMeta('robots', 'index, follow, max-image-preview:large');
    
// // //     updateMeta('og:title', `مشاور املاک ${profile.fullName} | املاک تهران`, true);
// // //     updateMeta('og:description', metaDescription, true);
// // //     updateMeta('og:image', profile.avatar, true);
// // //     updateMeta('og:url', window.location.href, true);
// // //     updateMeta('og:type', 'profile', true);
// // //     updateMeta('og:locale', 'fa_IR', true);
// // //     updateMeta('og:site_name', 'املاک تهران', true);
    
// // //     updateMeta('twitter:card', 'summary_large_image');
// // //     updateMeta('twitter:title', `مشاور املاک ${profile.fullName}`);
// // //     updateMeta('twitter:description', metaDescription);
// // //     updateMeta('twitter:image', profile.avatar);

// // //     const removeOldScript = () => {
// // //       const oldScript = document.getElementById('json-ld-profile');
// // //       if (oldScript) oldScript.remove();
// // //     };
// // //     removeOldScript();

// // //     const structuredData = {
// // //       "@context": "https://schema.org",
// // //       "@type": "Person",
// // //       "name": profile.fullName,
// // //       "jobTitle": "مشاور املاک",
// // //       "url": window.location.href,
// // //       "image": profile.avatar,
// // //       "telephone": profile.mobileNumber,
// // //       "address": {
// // //         "@type": "PostalAddress",
// // //         "addressLocality": profile.regionOfWork.join('، '),
// // //         "addressCountry": "IR"
// // //       },
// // //       "aggregateRating": {
// // //         "@type": "AggregateRating",
// // //         "ratingValue": Math.min(5, (profile.score / 20) || 4.5),
// // //         "ratingCount": profile.countOfRealEtates * 2 || 10,
// // //         "bestRating": 5,
// // //         "worstRating": 1
// // //       },
// // //       "makesOffer": {
// // //         "@type": "Offer",
// // //         "itemOffered": {
// // //           "@type": "Service",
// // //           "name": "مشاوره خرید و فروش ملک",
// // //           "description": `خدمات مشاوره املاک در مناطق ${profile.regionOfWork.join('، ')}`
// // //         }
// // //       }
// // //     };

// // //     const script = document.createElement('script');
// // //     script.id = 'json-ld-profile';
// // //     script.type = 'application/ld+json';
// // //     script.textContent = JSON.stringify(structuredData);
// // //     document.head.appendChild(script);

// // //     return () => {
// // //       removeOldScript();
// // //     };
// // //   }, [profile]);

// // //   // ===== رندر =====
// // //   if (error) {
// // //     return (
// // //       <div className="consultant-profile-page">
// // //         <div className="profile-error">
// // //           <div className="error-icon">
// // //             <FaTimes />
// // //           </div>
// // //           <h2>متاسفانه خطایی رخ داده است</h2>
// // //           <p>{error}</p>
// // //           <div className="error-actions">
// // //             <button onClick={() => window.location.reload()}>تلاش مجدد</button>
// // //             <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <div className="consultant-profile-page">
// // //         <ProfileSkeleton />
// // //       </div>
// // //     );
// // //   }

// // //   if (!profile) {
// // //     return (
// // //       <div className="consultant-profile-page">
// // //         <div className="profile-not-found">
// // //           <h2>مشاور یافت نشد</h2>
// // //           <p>متاسفانه پروفایل مورد نظر یافت نشد</p>
// // //           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   const starRating = Math.min(5, Math.round(profile.score / 20));
// // //   const fullStars = Math.floor(starRating);
// // //   const hasHalfStar = starRating % 1 >= 0.5;

// // //   const maskPhoneNumber = (phone) => {
// // //     if (!phone) return '**********';
// // //     if (phone.length <= 4) return '****';
// // //     const visible = phone.slice(-4);
// // //     return `*****${visible}`;
// // //   };

// // //   return (
// // //     <div className="consultant-profile-page">
// // //       {showLoginModal && (
// // //         <LoginModal 
// // //           onClose={handleLoginModalClose}
// // //           triggerSource="consultant-profile"
// // //         />
// // //       )}

// // //       {showStoryPopup && (
// // //         <StoryPopup 
// // //           agentName={profile.fullName}
// // //           agentImage={profile.avatar}
// // //           userId={profile._userId}
// // //           onClose={handleStoryClose}
// // //         />
// // //       )}

// // //       <div className="profile-header">
// // //         <div className="profile-header-content">
// // //           <button className="back-btn" onClick={handleBack}>
// // //             <FaArrowRight />
// // //             <span>بازگشت</span>
// // //           </button>
// // //           <h1 className="profile-title">
// // //             پروفایل {profile.fullName}
// // //           </h1>
// // //           <div className="header-actions">
// // //             <button className="share-btn" onClick={handleShare} title="اشتراک‌گذاری">
// // //               <FaShare />
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="profile-main">
// // //         <div className="profile-card">
// // //           <div className="profile-avatar-section">
// // //             <div className="avatar-wrapper">
// // //               <div 
// // //                 className={`profile-avatar-container ${hasStory ? 'has-story' : ''}`}
// // //                 onClick={hasStory ? handleStoryClick : undefined}
// // //                 style={{ cursor: hasStory ? 'pointer' : 'default' }}
// // //               >
// // //                 <img 
// // //                   src={profile.avatar} 
// // //                   alt={`${profile.fullName} - مشاور املاک حرفه‌ای`}
// // //                   className="profile-avatar"
// // //                   onError={(e) => {
// // //                     e.target.src = 'https://randomuser.me/api/portraits/men/32.jpg';
// // //                   }}
// // //                 />
// // //                 {/* {hasStory && (
// // //                   <div className="story-ring">
// // //                     <div className="story-ring-inner"></div>
// // //                   </div>
// // //                 )} */}
// // //               </div>
// // //               <div className="avatar-status online">
// // //                 <span className="status-dot"></span>
// // //               </div>
// // //             </div>
            
// // //             {hasStory && (
// // //               <div className="story-label-badge" onClick={handleStoryClick}>
// // //                 <span className="story-dot"></span>
// // //                 <span>استوری</span>
// // //               </div>
// // //             )}

// // //             <div className="profile-badges">
// // //               {profile.score >= 50 && (
// // //                 <span className="badge gold">
// // //                   <FaAward /> طلایی
// // //                 </span>
// // //               )}
// // //               {profile.score >= 30 && profile.score < 50 && (
// // //                 <span className="badge silver">
// // //                   <FaAward /> نقره‌ای
// // //                 </span>
// // //               )}
// // //               <span className="badge verified">
// // //                 <FaShieldAlt /> تأیید شده
// // //               </span>
// // //             </div>
// // //           </div>

// // //           <div className="profile-info">
// // //             <h2 className="consultant-name">{profile.fullName}</h2>
// // //             <div className="consultant-title">
// // //               <FaBriefcase className="title-icon" />
// // //               <span>مشاور املاک حرفه‌ای</span>
// // //               {hasStory && (
// // //                 <span 
// // //                   className="story-label-inline" 
// // //                   onClick={handleStoryClick}
// // //                 >
// // //                   <span className="story-dot"></span>
// // //                   استوری
// // //                 </span>
// // //               )}
// // //             </div>

// // //             <div className="rating-section">
// // //               <div className="stars">
// // //                 {[...Array(5)].map((_, i) => (
// // //                   <FaStar 
// // //                     key={i}
// // //                     className={
// // //                       i < fullStars ? 'star filled' :
// // //                       i === fullStars && hasHalfStar ? 'star half' :
// // //                       'star empty'
// // //                     }
// // //                   />
// // //                 ))}
// // //               </div>
// // //               <span className="rating-score">{profile.score} امتیاز</span>
// // //               <span className="rating-count">({profile.countOfRealEtates * 2 || 0} نظر)</span>
// // //             </div>

// // //             <div className="contact-info">
// // //               <div className="contact-item">
// // //                 <FaPhone className="contact-icon" />
// // //                 <span className="contact-label">شماره تماس</span>
// // //                 <div className="contact-value-wrapper">
// // //                   {isLoggedIn && showPhone ? (
// // //                     <span className="contact-value">{profile.mobileNumber}</span>
// // //                   ) : (
// // //                     <span className="contact-value masked">
// // //                       {isLoggedIn ? (
// // //                         <button 
// // //                           className="show-phone-btn"
// // //                           onClick={() => setShowPhone(true)}
// // //                         >
// // //                           <FaEye /> نمایش شماره
// // //                         </button>
// // //                       ) : (
// // //                         <span className="phone-masked">
// // //                           {maskPhoneNumber(profile.mobileNumber)}
// // //                           <FaLock className="lock-icon" />
// // //                         </span>
// // //                       )}
// // //                     </span>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //               <div className="contact-item">
// // //                 <FaClock className="contact-icon" />
// // //                 <span className="contact-label">عضویت</span>
// // //                 <span className="contact-value">{profile.dateTimeOfSite}</span>
// // //               </div>
// // //             </div>

// // //             <div className="action-buttons">
// // //               <button 
// // //                 className={`action-btn call ${!isLoggedIn ? 'locked' : ''}`}
// // //                 onClick={handleCall}
// // //               >
// // //                 <FaPhone /> 
// // //                 <span>{isLoggedIn ? 'تماس فوری' : 'تماس'}</span>
// // //                 {!isLoggedIn && (
// // //                   <span className="lock-badge">
// // //                     <FaLock className="lock-icon-small" />
// // //                   </span>
// // //                 )}
// // //               </button>

// // //               <button 
// // //                 className={`action-btn whatsapp ${!isLoggedIn ? 'locked' : ''}`}
// // //                 onClick={handleWhatsApp}
// // //               >
// // //                 <FaWhatsapp /> 
// // //                 <span>واتساپ</span>
// // //                 {!isLoggedIn && (
// // //                   <span className="lock-badge">
// // //                     <FaLock className="lock-icon-small" />
// // //                   </span>
// // //                 )}
// // //               </button>

// // //               <button className="action-btn share" onClick={handleCopyLink}>
// // //                 <FaCopy />
// // //                 <span>کپی لینک</span>
// // //               </button>
// // //             </div>

// // //             {!isLoggedIn && (
// // //               <button 
// // //                 className="login-prompt-btn" 
// // //                 onClick={() => setShowLoginModal(true)}
// // //               >
// // //                 <FaUser className="login-icon" />
// // //                 برای مشاهده شماره تماس وارد شوید
// // //                 <FaArrowRight className="arrow-icon" />
// // //               </button>
// // //             )}
// // //           </div>
// // //         </div>

// // //         <div className="stats-grid">
// // //           <div className="stat-card">
// // //             <div className="stat-icon home">
// // //               <FaHome />
// // //             </div>
// // //             <div className="stat-info">
// // //               <span className="stat-value">{profile.countOfRealEtates}</span>
// // //               <span className="stat-label">ملک فعال</span>
// // //             </div>
// // //           </div>
// // //           <div className="stat-card">
// // //             <div className="stat-icon rent">
// // //               <FaBuilding />
// // //             </div>
// // //             <div className="stat-info">
// // //               <span className="stat-value">{profile.countOfRent}</span>
// // //               <span className="stat-label">ملک اجاره‌ای</span>
// // //             </div>
// // //           </div>
// // //           <div className="stat-card">
// // //             <div className="stat-icon score">
// // //               <FaChartLine />
// // //             </div>
// // //             <div className="stat-info">
// // //               <span className="stat-value">{profile.score}</span>
// // //               <span className="stat-label">امتیاز</span>
// // //             </div>
// // //           </div>
// // //           <div className="stat-card">
// // //             <div className="stat-icon total">
// // //               <FaUsers />
// // //             </div>
// // //             <div className="stat-info">
// // //               <span className="stat-value">{profile.countOfRealEtates + profile.countOfRent}</span>
// // //               <span className="stat-label">کل معاملات</span>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="regions-section">
// // //           <h3 className="section-title">
// // //             <FaMapMarkerAlt className="section-icon" />
// // //             مناطق فعالیت
// // //           </h3>
// // //           <div className="regions-tags">
// // //             {profile.regionOfWork.length > 0 ? (
// // //               profile.regionOfWork.map((region, index) => (
// // //                 <span key={index} className="region-tag">
// // //                   <FaMapMarkerAlt />
// // //                   {region}
// // //                 </span>
// // //               ))
// // //             ) : (
// // //               <span className="no-region">منطقه‌ای ثبت نشده</span>
// // //             )}
// // //           </div>
// // //           <p className="region-description">
// // //             {profile.fullName} با سابقه درخشان در حوزه مشاوره املاک، در مناطق {profile.regionOfWork.join('، ')} آماده ارائه خدمات تخصصی خرید، فروش و اجاره ملک به شما عزیزان است.
// // //           </p>
// // //         </div>

// // //         <div className="profile-tabs">
// // //           <button 
// // //             className={`tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
// // //             onClick={() => setActiveTab('properties')}
// // //           >
// // //             <FaHome />
// // //             <span>ملک‌های مشاور</span>
// // //             <span className="tab-badge">{profile.countOfRealEtates}</span>
// // //           </button>
// // //           <button 
// // //             className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
// // //             onClick={() => setActiveTab('about')}
// // //           >
// // //             <FaUser />
// // //             <span>درباره مشاور</span>
// // //           </button>
// // //         </div>

// // //         <div className="tab-content">
// // //           {activeTab === 'properties' && (
// // //             <div className="properties-tab">
// // //               <div className="properties-placeholder">
// // //                 <FaHome className="placeholder-icon" />
// // //                 <h3>ملک‌های {profile.fullName}</h3>
// // //                 <p>در حال بارگذاری لیست ملک‌های این مشاور...</p>
// // //                 <p className="placeholder-note">
// // //                   {profile.countOfRealEtates} ملک فعال برای فروش
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           )}

// // //           {activeTab === 'about' && (
// // //             <div className="about-tab">
// // //               <div className="about-card">
// // //                 <h3>درباره {profile.fullName}</h3>
// // //                 <div className="about-content">
// // //                   <p>
// // //                     <strong>{profile.fullName}</strong> یکی از مشاوران املاک حرفه‌ای و با تجربه در 
// // //                     مناطق {profile.regionOfWork.join('، ')} می‌باشد. با کسب {profile.score} امتیاز 
// // //                     و ثبت {profile.countOfRealEtates} ملک فعال، این مشاور املاک آماده ارائه 
// // //                     مشاوره تخصصی در زمینه خرید، فروش و اجاره ملک به شما عزیزان است.
// // //                   </p>
// // //                   <div className="about-details">
// // //                     <div className="about-item">
// // //                       <FaCalendarAlt />
// // //                       <span>عضویت: {profile.dateTimeOfSite}</span>
// // //                     </div>
                    
// // //                     <div className="about-item">
// // //                       <FaPhone />
// // //                       <span className="about-phone-wrapper">
// // //                         {isLoggedIn && showPhone ? (
// // //                           <span className="about-phone-value">{profile.mobileNumber}</span>
// // //                         ) : (
// // //                           <span className="about-phone-masked">
// // //                             {isLoggedIn ? (
// // //                               <button 
// // //                                 className="show-phone-btn about-show-phone"
// // //                                 onClick={() => setShowPhone(true)}
// // //                               >
// // //                                 <FaEye /> نمایش شماره تماس
// // //                               </button>
// // //                             ) : (
// // //                               <>
// // //                                 <span className="masked-text">برای مشاهده شماره وارد شوید</span>
// // //                                 <FaLock className="lock-icon about-lock" />
// // //                               </>
// // //                             )}
// // //                           </span>
// // //                         )}
// // //                       </span>
// // //                     </div>
                    
// // //                     <div className="about-item">
// // //                       <FaMapMarkerAlt />
// // //                       <span>مناطق: {profile.regionOfWork.join('، ')}</span>
// // //                     </div>
// // //                     <div className="about-item">
// // //                       <FaAward />
// // //                       <span>امتیاز: {profile.score}</span>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       <div className="profile-footer">
// // //         <p>
// // //           صفحه رسمی {profile.fullName} در املاک تهران
// // //         </p>
// // //       </div>

// // //       {copied && (
// // //         <div className="toast-notification">
// // //           <FaCheckCircle />
// // //           <span>لینک پروفایل کپی شد</span>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default ConsultantProfilePage;

// // import React, { useState, useEffect, useCallback } from 'react';
// // import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
// // import { 
// //   FaUser, FaPhone, FaStar, FaHome, FaBuilding, FaMapMarkerAlt, 
// //   FaClock, FaCheckCircle, FaArrowLeft, FaShare, FaCopy,
// //   FaWhatsapp, FaCalendarAlt, FaAward, FaShieldAlt,
// //   FaSpinner, FaTimes, FaUsers, FaChartLine, FaBriefcase, FaArrowRight,
// //   FaLock, FaEye, FaLink, FaRulerCombined, FaBed,
// //   FaCar, FaArrowUp, FaSwimmingPool, FaWarehouse, FaImage
// // } from 'react-icons/fa';
// // import LoginModal from '../LoginModal/LoginModal';
// // import './ConsultantProfilePage.css';

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
// //           if (formattedStories.length === 0) {
// //             setError('هیچ استوری برای این کاربر وجود ندارد');
// //           }
// //         } else {
// //           setStories([]);
// //           setError('هیچ استوری برای این کاربر وجود ندارد');
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
// //       <div className="story-popup-overlay" onClick={onClose}>
// //         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// //           <div className="story-loading">
// //             <FaSpinner className="spinner" />
// //             <span>در حال بارگذاری استوری‌ها...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error || stories.length === 0) {
// //     return (
// //       <div className="story-popup-overlay" onClick={onClose}>
// //         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
// //           <div className="story-error">
// //             <p>{error || 'هیچ استوری برای این کاربر وجود ندارد'}</p>
// //             <button onClick={onClose}>بستن</button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const currentStory = stories[currentStoryIndex];

// //   return (
// //     <div 
// //       className="story-popup-overlay"
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
// // // ========== کامپوننت کارت ملک ==========
// // // ============================================================
// // const PropertyCard = ({ property }) => {
// //   const navigate = useNavigate();
  
// //   const formatPrice = (price) => {
// //     if (!price) return '۰';
// //     return price.toLocaleString('fa-IR');
// //   };

// //   const getAmenityIcon = (amenity, hasAmenity) => {
// //     if (!hasAmenity) return null;
// //     const icons = {
// //       isHasElevator: <FaArrowUp className="amenity-icon active" title="آسانسور" />,
// //       isHasParking: <FaCar className="amenity-icon active" title="پارکینگ" />,
// //       isHasPool: <FaSwimmingPool className="amenity-icon active" title="استخر" />,
// //       isHasStoreRoom: <FaWarehouse className="amenity-icon active" title="انباری" />
// //     };
// //     return icons[amenity] || null;
// //   };

// //   const handleCardClick = () => {
// //     navigate(`/property/${property.id}`);
// //   };

// //   return (
// //     <div className="property-card-item" onClick={handleCardClick}>
// //       <div className="property-card-image">
// //         {property.address ? (
// //           <img 
// //             src={`https://localhost:7178${property.address}`} 
// //             alt={property.title}
// //             onError={(e) => {
// //               e.target.src = '/images/no-image.jpg';
// //             }}
// //           />
// //         ) : (
// //           <div className="no-image-placeholder">
// //             <FaHome />
// //           </div>
// //         )}
// //         <div className="property-card-badge">
// //           {property.imageCount > 0 && (
// //             <span className="image-count-badge">
// //               <FaImage /> {property.imageCount}
// //             </span>
// //           )}
// //         </div>
// //       </div>

// //       <div className="property-card-body">
// //         <div className="property-card-header">
// //           <h3 className="property-card-title">{property.title || 'ملک'}</h3>
// //           <span className="property-card-region">
// //             <FaMapMarkerAlt />
// //             {property.regionName}
// //           </span>
// //         </div>

// //         <div className="property-card-price">
// //           <span className="price-amount">{formatPrice(property.price)}</span>
// //           <span className="price-unit">تومان</span>
// //         </div>

// //         <div className="property-card-details">
// //           <div className="detail-item">
// //             <FaRulerCombined />
// //             <span>متراژ نامشخص</span>
// //           </div>
// //           <div className="detail-item">
// //             <FaBed />
// //             <span>نامشخص</span>
// //           </div>
// //           <div className="detail-item">
// //             <FaCalendarAlt />
// //             <span>{property.constructionYear || 'نامشخص'}</span>
// //           </div>
// //         </div>

// //         <div className="property-card-amenities">
// //           {getAmenityIcon('isHasElevator', property.isHasElevator)}
// //           {getAmenityIcon('isHasParking', property.isHasParking)}
// //           {getAmenityIcon('isHasPool', property.isHasPool)}
// //           {getAmenityIcon('isHasStoreRoom', property.isHasStoreRoom)}
// //           {!property.isHasElevator && !property.isHasParking && !property.isHasPool && !property.isHasStoreRoom && (
// //             <span className="no-amenities">بدون امکانات</span>
// //           )}
// //         </div>

// //         <div className="property-card-footer">
// //           <span className="property-date">
// //             <FaClock />
// //             {property.createdAtPersianRelative}
// //           </span>
// //           <button 
// //             className="view-property-btn"
// //             onClick={(e) => {
// //               e.stopPropagation();
// //               handleCardClick();
// //             }}
// //           >
// //             مشاهده ملک
// //             <FaArrowLeft />
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ============================================================
// // // ========== کامپوننت Skeleton ==========
// // // ============================================================
// // const ProfileSkeleton = () => (
// //   <div className="consultant-profile-skeleton">
// //     <div className="skeleton-header">
// //       <div className="skeleton-back"></div>
// //       <div className="skeleton-title"></div>
// //     </div>
// //     <div className="skeleton-body">
// //       <div className="skeleton-avatar"></div>
// //       <div className="skeleton-info">
// //         <div className="skeleton-line"></div>
// //         <div className="skeleton-line"></div>
// //         <div className="skeleton-line short"></div>
// //       </div>
// //     </div>
// //   </div>
// // );

// // // ============================================================
// // // ========== کامپوننت اصلی ==========
// // // ============================================================
// // const ConsultantProfilePage = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { name } = useParams();
  
// //   const [profile, setProfile] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [copied, setCopied] = useState(false);
// //   const [activeTab, setActiveTab] = useState('properties');
  
// //   const [properties, setProperties] = useState([]);
// //   const [propertiesLoading, setPropertiesLoading] = useState(false);
// //   const [pagination, setPagination] = useState({
// //     pageNumber: 1,
// //     pageSize: 10,
// //     totalCount: 0,
// //     totalPages: 0,
// //     hasNextPage: false,
// //     hasPreviousPage: false
// //   });

// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [showLoginModal, setShowLoginModal] = useState(false);
// //   const [showPhone, setShowPhone] = useState(false);

// //   const [showStoryPopup, setShowStoryPopup] = useState(false);
// //   const [hasStory, setHasStory] = useState(false);

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

// //   // ===== دریافت userId =====
// //   useEffect(() => {
// //     const state = location.state;
// //     let userId = state?.userId;
    
// //     if (!userId) {
// //       const savedUserId = localStorage.getItem('temp_profile_userId');
// //       if (savedUserId) {
// //         userId = savedUserId;
// //         localStorage.removeItem('temp_profile_userId');
// //       }
// //     }

// //     if (!userId) {
// //       setError('شناسه کاربر یافت نشد');
// //       setLoading(false);
// //       return;
// //     }

// //     fetchProfile(userId);
// //     fetchProperties(userId, 1);
// //   }, [location]);

// //   // ===== دریافت اطلاعات پروفایل =====
// //   const fetchProfile = async (userId) => {
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       const token = localStorage.getItem('auth_token');
// //       const headers = {};
      
// //       if (token) {
// //         headers['Authorization'] = `Bearer ${token}`;
// //       }

// //       const response = await fetch(
// //         `https://localhost:7178/api/RealEstatePage/GetUserForSite?userId=${userId}`,
// //         { headers }
// //       );

// //       if (!response.ok) {
// //         throw new Error(`HTTP ${response.status}`);
// //       }

// //       const result = await response.json();

// //       if (result.status === 200 && result.data) {
// //         const profileData = {
// //           ...result.data,
// //           avatar: result.data.avatar 
// //             ? `https://localhost:7178${result.data.avatar}` 
// //             : 'https://randomuser.me/api/portraits/men/32.jpg',
// //           regionOfWork: result.data.regionOfWork || [],
// //           score: parseInt(result.data.score) || 0,
// //           _userId: userId
// //         };
        
// //         setProfile(profileData);
// //         document.title = `مشاور املاک ${profileData.fullName} | املاک تهران`;
        
// //         checkHasStory(userId);
        
// //       } else {
// //         throw new Error(result.message || 'پروفایل یافت نشد');
// //       }
// //     } catch (error) {
// //       console.error('❌ خطا در دریافت پروفایل:', error);
// //       setError(error.message || 'مشکل در دریافت اطلاعات');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ===== دریافت املاک کاربر =====
// //   const fetchProperties = async (userId, pageNumber = 1) => {
// //     setPropertiesLoading(true);
    
// //     try {
// //       const response = await fetch(
// //         `https://localhost:7178/api/RealEstatePage/GetRandomLastItemRealEstatesWithUser?userId=${userId}&pageNumber=${pageNumber}&pageSize=10`
// //       );

// //       if (!response.ok) {
// //         throw new Error(`HTTP ${response.status}`);
// //       }

// //       const result = await response.json();

// //       if (result.status === 200 && result.data) {
// //         setProperties(result.data.items || []);
// //         setPagination({
// //           pageNumber: result.data.pageNumber,
// //           pageSize: result.data.pageSize,
// //           totalCount: result.data.totalCount,
// //           totalPages: result.data.totalPages,
// //           hasNextPage: result.data.hasNextPage,
// //           hasPreviousPage: result.data.hasPreviousPage
// //         });
// //       } else {
// //         setProperties([]);
// //       }
// //     } catch (error) {
// //       console.error('❌ خطا در دریافت املاک:', error);
// //       setProperties([]);
// //     } finally {
// //       setPropertiesLoading(false);
// //     }
// //   };

// //   // ===== بررسی وجود استوری =====
// //   const checkHasStory = async (userId) => {
// //     try {
// //       const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${userId}`);
      
// //       if (!response.ok) {
// //         setHasStory(false);
// //         return;
// //       }
      
// //       const result = await response.json();
      
// //       let hasStoryResult = false;
// //       if (result.status === 200 && result.data && result.data.length > 0) {
// //         const userStories = result.data[0]?.storyUser || [];
// //         hasStoryResult = userStories.length > 0;
// //       }
      
// //       setHasStory(hasStoryResult);
      
// //     } catch (error) {
// //       console.error('❌ خطا در بررسی استوری:', error);
// //       setHasStory(false);
// //     }
// //   };

// //   // ===== تغییر صفحه =====
// //   const handlePageChange = (newPage) => {
// //     if (profile?._userId) {
// //       fetchProperties(profile._userId, newPage);
// //     }
// //   };

// //   // ===== توابع =====
// //   const handleBack = useCallback(() => {
// //     navigate(-1);
// //   }, [navigate]);

// //   const handleShare = useCallback(async () => {
// //     const shareData = {
// //       title: `مشاور املاک ${profile?.fullName}`,
// //       text: `مشاور املاک ${profile?.fullName} با ${profile?.score} امتیاز و ${profile?.countOfRealEtates} ملک فعال`,
// //       url: window.location.href
// //     };

// //     if (navigator.share && /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)) {
// //       try {
// //         await navigator.share(shareData);
// //       } catch (error) {
// //         if (error.name !== 'AbortError') {
// //           handleCopyLink();
// //         }
// //       }
// //     } else {
// //       handleCopyLink();
// //     }
// //   }, [profile]);

// //   const handleCopyLink = useCallback(() => {
// //     navigator.clipboard.writeText(window.location.href);
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 3000);
// //   }, []);

// //   const handleCall = useCallback(() => {
// //     if (!isLoggedIn) {
// //       setShowLoginModal(true);
// //       return;
// //     }
// //     if (profile?.mobileNumber) {
// //       window.location.href = `tel:${profile.mobileNumber.replace(/\s/g, '')}`;
// //     }
// //   }, [isLoggedIn, profile]);

// //   const handleWhatsApp = useCallback(() => {
// //     if (!isLoggedIn) {
// //       setShowLoginModal(true);
// //       return;
// //     }
// //     if (profile?.mobileNumber) {
// //       window.open(`https://wa.me/${profile.mobileNumber.replace(/\s/g, '')}`, '_blank');
// //     }
// //   }, [isLoggedIn, profile]);

// //   const handleLoginModalClose = useCallback(() => {
// //     setShowLoginModal(false);
// //     const token = localStorage.getItem('auth_token');
// //     if (token) {
// //       setIsLoggedIn(true);
// //     }
// //   }, []);

// //   const handleStoryClick = useCallback(async (e) => {
// //     if (e) {
// //       e.stopPropagation();
// //     }
    
// //     if (!profile?._userId) {
// //       return;
// //     }

// //     if (!hasStory) {
// //       try {
// //         const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${profile._userId}`);
// //         const result = await response.json();
        
// //         if (result.status === 200 && result.data && result.data.length > 0) {
// //           const userStories = result.data[0]?.storyUser || [];
// //           if (userStories.length > 0) {
// //             setHasStory(true);
// //             setShowStoryPopup(true);
// //             document.body.style.overflow = 'hidden';
// //             return;
// //           }
// //         }
// //         setHasStory(false);
// //         alert('این کاربر استوری ندارد');
// //       } catch (error) {
// //         console.error('خطا در بررسی استوری:', error);
// //         alert('مشکل در بررسی استوری');
// //       }
// //       return;
// //     }

// //     setShowStoryPopup(true);
// //     document.body.style.overflow = 'hidden';
// //   }, [profile, hasStory]);

// //   const handleStoryClose = useCallback(() => {
// //     setShowStoryPopup(false);
// //     document.body.style.overflow = '';
// //   }, []);

// //   // ===== رندر =====
// //   if (error) {
// //     return (
// //       <div className="consultant-profile-page">
// //         <div className="profile-error">
// //           <div className="error-icon">
// //             <FaTimes />
// //           </div>
// //           <h2>متاسفانه خطایی رخ داده است</h2>
// //           <p>{error}</p>
// //           <div className="error-actions">
// //             <button onClick={() => window.location.reload()}>تلاش مجدد</button>
// //             <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (loading) {
// //     return (
// //       <div className="consultant-profile-page">
// //         <ProfileSkeleton />
// //       </div>
// //     );
// //   }

// //   if (!profile) {
// //     return (
// //       <div className="consultant-profile-page">
// //         <div className="profile-not-found">
// //           <h2>مشاور یافت نشد</h2>
// //           <p>متاسفانه پروفایل مورد نظر یافت نشد</p>
// //           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const starRating = Math.min(5, Math.round(profile.score / 20));
// //   const fullStars = Math.floor(starRating);
// //   const hasHalfStar = starRating % 1 >= 0.5;

// //   const maskPhoneNumber = (phone) => {
// //     if (!phone) return '**********';
// //     if (phone.length <= 4) return '****';
// //     const visible = phone.slice(-4);
// //     return `*****${visible}`;
// //   };

// //   return (
// //     <div className="consultant-profile-page">
// //       {showLoginModal && (
// //         <LoginModal 
// //           onClose={handleLoginModalClose}
// //           triggerSource="consultant-profile"
// //         />
// //       )}

// //       {showStoryPopup && (
// //         <StoryPopup 
// //           agentName={profile.fullName}
// //           agentImage={profile.avatar}
// //           userId={profile._userId}
// //           onClose={handleStoryClose}
// //         />
// //       )}

// //       <div className="profile-header">
// //         <div className="profile-header-content">
// //           <button className="back-btn" onClick={handleBack}>
// //             <FaArrowRight />
// //             <span>بازگشت</span>
// //           </button>
// //           <h1 className="profile-title">
// //             پروفایل {profile.fullName}
// //           </h1>
// //           <div className="header-actions">
// //             <button className="share-btn" onClick={handleShare} title="اشتراک‌گذاری">
// //               <FaShare />
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="profile-main">
// //         {/* کارت پروفایل */}
// //         <div className="profile-card">
// //           <div className="profile-avatar-section">
// //             <div className="avatar-wrapper">
// //               <div 
// //                 className={`profile-avatar-container ${hasStory ? 'has-story' : ''}`}
// //                 onClick={hasStory ? handleStoryClick : undefined}
// //                 style={{ cursor: hasStory ? 'pointer' : 'default' }}
// //               >
// //                 <img 
// //                   src={profile.avatar} 
// //                   alt={`${profile.fullName} - مشاور املاک حرفه‌ای`}
// //                   className="profile-avatar"
// //                   onError={(e) => {
// //                     e.target.src = 'https://randomuser.me/api/portraits/men/32.jpg';
// //                   }}
// //                 />
// //                 {/* {hasStory && (
// //                   <div className="story-ring">
// //                     <div className="story-ring-inner"></div>
// //                   </div>
// //                 )} */}
// //               </div>
// //               <div className="avatar-status online">
// //                 <span className="status-dot"></span>
// //               </div>
// //             </div>
            
// //             {hasStory && (
// //               <div className="story-label-badge" onClick={handleStoryClick}>
// //                 <span className="story-dot"></span>
// //                 <span>استوری</span>
// //               </div>
// //             )}

// //             <div className="profile-badges">
// //               {profile.score >= 50 && (
// //                 <span className="badge gold">
// //                   <FaAward /> طلایی
// //                 </span>
// //               )}
// //               {profile.score >= 30 && profile.score < 50 && (
// //                 <span className="badge silver">
// //                   <FaAward /> نقره‌ای
// //                 </span>
// //               )}
// //               <span className="badge verified">
// //                 <FaShieldAlt /> تأیید شده
// //               </span>
// //             </div>
// //           </div>

// //           <div className="profile-info">
// //             <h2 className="consultant-name">{profile.fullName}</h2>
// //             <div className="consultant-title">
// //               <FaBriefcase className="title-icon" />
// //               <span>مشاور املاک حرفه‌ای</span>
// //               {hasStory && (
// //                 <span 
// //                   className="story-label-inline" 
// //                   onClick={handleStoryClick}
// //                 >
// //                   <span className="story-dot"></span>
// //                   استوری
// //                 </span>
// //               )}
// //             </div>

// //             <div className="rating-section">
// //               <div className="stars">
// //                 {[...Array(5)].map((_, i) => (
// //                   <FaStar 
// //                     key={i}
// //                     className={
// //                       i < fullStars ? 'star filled' :
// //                       i === fullStars && hasHalfStar ? 'star half' :
// //                       'star empty'
// //                     }
// //                   />
// //                 ))}
// //               </div>
// //               <span className="rating-score">{profile.score} امتیاز</span>
// //               <span className="rating-count">({profile.countOfRealEtates * 2 || 0} نظر)</span>
// //             </div>

// //             <div className="contact-info">
// //               <div className="contact-item">
// //                 <FaPhone className="contact-icon" />
// //                 <span className="contact-label">شماره تماس</span>
// //                 <div className="contact-value-wrapper">
// //                   {isLoggedIn && showPhone ? (
// //                     <span className="contact-value">{profile.mobileNumber}</span>
// //                   ) : (
// //                     <span className="contact-value masked">
// //                       {isLoggedIn ? (
// //                         <button 
// //                           className="show-phone-btn"
// //                           onClick={() => setShowPhone(true)}
// //                         >
// //                           <FaEye /> نمایش شماره
// //                         </button>
// //                       ) : (
// //                         <span className="phone-masked">
// //                           {maskPhoneNumber(profile.mobileNumber)}
// //                           <FaLock className="lock-icon" />
// //                         </span>
// //                       )}
// //                     </span>
// //                   )}
// //                 </div>
// //               </div>
// //               <div className="contact-item">
// //                 <FaClock className="contact-icon" />
// //                 <span className="contact-label">عضویت</span>
// //                 <span className="contact-value">{profile.dateTimeOfSite}</span>
// //               </div>
// //             </div>

// //             <div className="action-buttons">
// //               <button 
// //                 className={`action-btn call ${!isLoggedIn ? 'locked' : ''}`}
// //                 onClick={handleCall}
// //               >
// //                 <FaPhone /> 
// //                 <span>{isLoggedIn ? 'تماس فوری' : 'تماس'}</span>
// //                 {!isLoggedIn && (
// //                   <span className="lock-badge">
// //                     <FaLock className="lock-icon-small" />
// //                   </span>
// //                 )}
// //               </button>

// //               <button 
// //                 className={`action-btn whatsapp ${!isLoggedIn ? 'locked' : ''}`}
// //                 onClick={handleWhatsApp}
// //               >
// //                 <FaWhatsapp /> 
// //                 <span>واتساپ</span>
// //                 {!isLoggedIn && (
// //                   <span className="lock-badge">
// //                     <FaLock className="lock-icon-small" />
// //                   </span>
// //                 )}
// //               </button>

// //               <button className="action-btn share" onClick={handleCopyLink}>
// //                 <FaCopy />
// //                 <span>کپی لینک</span>
// //               </button>
// //             </div>

// //             {!isLoggedIn && (
// //               <button 
// //                 className="login-prompt-btn" 
// //                 onClick={() => setShowLoginModal(true)}
// //               >
// //                 <FaUser className="login-icon" />
// //                 برای مشاهده شماره تماس وارد شوید
// //                 <FaArrowRight className="arrow-icon" />
// //               </button>
// //             )}
// //           </div>
// //         </div>

// //         {/* آمار */}
// //         <div className="stats-grid">
// //           <div className="stat-card">
// //             <div className="stat-icon home">
// //               <FaHome />
// //             </div>
// //             <div className="stat-info">
// //               <span className="stat-value">{profile.countOfRealEtates}</span>
// //               <span className="stat-label">ملک فعال</span>
// //             </div>
// //           </div>
// //           <div className="stat-card">
// //             <div className="stat-icon rent">
// //               <FaBuilding />
// //             </div>
// //             <div className="stat-info">
// //               <span className="stat-value">{profile.countOfRent}</span>
// //               <span className="stat-label">ملک اجاره‌ای</span>
// //             </div>
// //           </div>
// //           <div className="stat-card">
// //             <div className="stat-icon score">
// //               <FaChartLine />
// //             </div>
// //             <div className="stat-info">
// //               <span className="stat-value">{profile.score}</span>
// //               <span className="stat-label">امتیاز</span>
// //             </div>
// //           </div>
// //           <div className="stat-card">
// //             <div className="stat-icon total">
// //               <FaUsers />
// //             </div>
// //             <div className="stat-info">
// //               <span className="stat-value">{profile.countOfRealEtates + profile.countOfRent}</span>
// //               <span className="stat-label">کل معاملات</span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* مناطق فعالیت */}
// //         <div className="regions-section">
// //           <h3 className="section-title">
// //             <FaMapMarkerAlt className="section-icon" />
// //             مناطق فعالیت
// //           </h3>
// //           <div className="regions-tags">
// //             {profile.regionOfWork.length > 0 ? (
// //               profile.regionOfWork.map((region, index) => (
// //                 <span key={index} className="region-tag">
// //                   <FaMapMarkerAlt />
// //                   {region}
// //                 </span>
// //               ))
// //             ) : (
// //               <span className="no-region">منطقه‌ای ثبت نشده</span>
// //             )}
// //           </div>
// //           <p className="region-description">
// //             {profile.fullName} با سابقه درخشان در حوزه مشاوره املاک، در مناطق {profile.regionOfWork.join('، ')} آماده ارائه خدمات تخصصی خرید، فروش و اجاره ملک به شما عزیزان است.
// //           </p>
// //         </div>

// //         {/* تب‌ها */}
// //         <div className="profile-tabs">
// //           <button 
// //             className={`tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
// //             onClick={() => setActiveTab('properties')}
// //           >
// //             <FaHome />
// //             <span>ملک‌های مشاور</span>
// //             <span className="tab-badge">{pagination.totalCount}</span>
// //           </button>
// //           <button 
// //             className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
// //             onClick={() => setActiveTab('about')}
// //           >
// //             <FaUser />
// //             <span>درباره مشاور</span>
// //           </button>
// //         </div>

// //         {/* محتوای تب‌ها */}
// //         <div className="tab-content">
// //           {activeTab === 'properties' && (
// //             <div className="properties-tab">
// //               {propertiesLoading ? (
// //                 <div className="properties-loading">
// //                   <FaSpinner className="spinner" />
// //                   <span>در حال بارگذاری ملک‌ها...</span>
// //                 </div>
// //               ) : properties.length > 0 ? (
// //                 <>
// //                   <div className="properties-grid">
// //                     {properties.map((property) => (
// //                       <PropertyCard 
// //                         key={property.id} 
// //                         property={property}
// //                       />
// //                     ))}
// //                   </div>

// //                   {pagination.totalPages > 1 && (
// //                     <div className="pagination-container">
// //                       <button 
// //                         className="pagination-btn"
// //                         onClick={() => handlePageChange(pagination.pageNumber - 1)}
// //                         disabled={!pagination.hasPreviousPage}
// //                       >
// //                         <FaArrowRight />
// //                         قبلی
// //                       </button>
                      
// //                       <span className="pagination-info">
// //                         صفحه {pagination.pageNumber} از {pagination.totalPages}
// //                       </span>
                      
// //                       <button 
// //                         className="pagination-btn"
// //                         onClick={() => handlePageChange(pagination.pageNumber + 1)}
// //                         disabled={!pagination.hasNextPage}
// //                       >
// //                         بعدی
// //                         <FaArrowLeft />
// //                       </button>
// //                     </div>
// //                   )}
// //                 </>
// //               ) : (
// //                 <div className="properties-empty">
// //                   <FaHome className="empty-icon" />
// //                   <h3>هیچ ملکی یافت نشد</h3>
// //                   <p>{profile.fullName} هنوز هیچ ملکی ثبت نکرده است</p>
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {activeTab === 'about' && (
// //             <div className="about-tab">
// //               <div className="about-card">
// //                 <h3>درباره {profile.fullName}</h3>
// //                 <div className="about-content">
// //                   <p>
// //                     <strong>{profile.fullName}</strong> یکی از مشاوران املاک حرفه‌ای و با تجربه در 
// //                     مناطق {profile.regionOfWork.join('، ')} می‌باشد. با کسب {profile.score} امتیاز 
// //                     و ثبت {profile.countOfRealEtates} ملک فعال، این مشاور املاک آماده ارائه 
// //                     مشاوره تخصصی در زمینه خرید، فروش و اجاره ملک به شما عزیزان است.
// //                   </p>
// //                   <div className="about-details">
// //                     <div className="about-item">
// //                       <FaCalendarAlt />
// //                       <span>عضویت: {profile.dateTimeOfSite}</span>
// //                     </div>
                    
// //                     <div className="about-item">
// //                       <FaPhone />
// //                       <span className="about-phone-wrapper">
// //                         {isLoggedIn && showPhone ? (
// //                           <span className="about-phone-value">{profile.mobileNumber}</span>
// //                         ) : (
// //                           <span className="about-phone-masked">
// //                             {isLoggedIn ? (
// //                               <button 
// //                                 className="show-phone-btn about-show-phone"
// //                                 onClick={() => setShowPhone(true)}
// //                               >
// //                                 <FaEye /> نمایش شماره تماس
// //                               </button>
// //                             ) : (
// //                               <>
// //                                 <span className="masked-text">برای مشاهده شماره وارد شوید</span>
// //                                 <FaLock className="lock-icon about-lock" />
// //                               </>
// //                             )}
// //                           </span>
// //                         )}
// //                       </span>
// //                     </div>
                    
// //                     <div className="about-item">
// //                       <FaMapMarkerAlt />
// //                       <span>مناطق: {profile.regionOfWork.join('، ')}</span>
// //                     </div>
// //                     <div className="about-item">
// //                       <FaAward />
// //                       <span>امتیاز: {profile.score}</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       <div className="profile-footer">
// //         <p>
// //           صفحه رسمی {profile.fullName} در املاک تهران
// //         </p>
// //       </div>

// //       {copied && (
// //         <div className="toast-notification">
// //           <FaCheckCircle />
// //           <span>لینک پروفایل کپی شد</span>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ConsultantProfilePage;

// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import { 
//   FaUser, FaPhone, FaStar, FaHome, FaBuilding, FaMapMarkerAlt, 
//   FaClock, FaCheckCircle, FaArrowLeft, FaShare, FaCopy,
//   FaWhatsapp, FaCalendarAlt, FaAward, FaShieldAlt,
//   FaSpinner, FaTimes, FaUsers, FaChartLine, FaBriefcase, FaArrowRight,
//   FaLock, FaEye, FaLink, FaRulerCombined, FaBed,
//   FaCar, FaArrowUp, FaSwimmingPool, FaWarehouse, FaImage
// } from 'react-icons/fa';
// import LoginModal from '../LoginModal/LoginModal';
// import './ConsultantProfilePage.css';

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
//           if (formattedStories.length === 0) {
//             setError('هیچ استوری برای این کاربر وجود ندارد');
//           }
//         } else {
//           setStories([]);
//           setError('هیچ استوری برای این کاربر وجود ندارد');
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
//       <div className="story-popup-overlay" onClick={onClose}>
//         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
//           <div className="story-loading">
//             <FaSpinner className="spinner" />
//             <span>در حال بارگذاری استوری‌ها...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || stories.length === 0) {
//     return (
//       <div className="story-popup-overlay" onClick={onClose}>
//         <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
//           <div className="story-error">
//             <p>{error || 'هیچ استوری برای این کاربر وجود ندارد'}</p>
//             <button onClick={onClose}>بستن</button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const currentStory = stories[currentStoryIndex];

//   return (
//     <div 
//       className="story-popup-overlay"
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
// // ========== کامپوننت کارت ملک ==========
// // ============================================================
// const PropertyCard = ({ property, consultantName }) => {
//   const navigate = useNavigate();
  
//   const formatPrice = (price) => {
//     if (!price) return '۰';
//     return price.toLocaleString('fa-IR');
//   };

//   const getAmenityIcon = (amenity, hasAmenity) => {
//     if (!hasAmenity) return null;
//     const icons = {
//       isHasElevator: <FaArrowUp className="amenity-icon active" title="آسانسور" />,
//       isHasParking: <FaCar className="amenity-icon active" title="پارکینگ" />,
//       isHasPool: <FaSwimmingPool className="amenity-icon active" title="استخر" />,
//       isHasStoreRoom: <FaWarehouse className="amenity-icon active" title="انباری" />
//     };
//     return icons[amenity] || null;
//   };

//   const handleCardClick = () => {
//     navigate(`/property/${property.id}`);
//   };

//   return (
//     <article className="property-card-item" onClick={handleCardClick} aria-label={`ملک ${property.title}`}>
//       <div className="property-card-image">
//         {property.address ? (
//           <img 
//             src={`https://localhost:7178${property.address}`} 
//             alt={`${property.title} - ملک ${consultantName}`}
//             loading="lazy"
//             decoding="async"
//             onError={(e) => {
//               e.target.src = '/images/no-image.jpg';
//             }}
//           />
//         ) : (
//           <div className="no-image-placeholder">
//             <FaHome />
//           </div>
//         )}
//         <div className="property-card-badge">
//           {property.imageCount > 0 && (
//             <span className="image-count-badge">
//               <FaImage /> {property.imageCount}
//             </span>
//           )}
//         </div>
//       </div>

//       <div className="property-card-body">
//         <div className="property-card-header">
//           <h3 className="property-card-title">{property.title || 'ملک'}</h3>
//           <span className="property-card-region">
//             <FaMapMarkerAlt aria-hidden="true" />
//             {property.regionName}
//           </span>
//         </div>

//         <div className="property-card-price">
//           <span className="price-amount">{formatPrice(property.price)}</span>
//           <span className="price-unit">تومان</span>
//         </div>

//         <div className="property-card-details">
//           <div className="detail-item">
//             <FaRulerCombined aria-hidden="true" />
//             <span>متراژ نامشخص</span>
//           </div>
//           <div className="detail-item">
//             <FaBed aria-hidden="true" />
//             <span>نامشخص</span>
//           </div>
//           <div className="detail-item">
//             <FaCalendarAlt aria-hidden="true" />
//             <span>{property.constructionYear || 'نامشخص'}</span>
//           </div>
//         </div>

//         <div className="property-card-amenities">
//           {getAmenityIcon('isHasElevator', property.isHasElevator)}
//           {getAmenityIcon('isHasParking', property.isHasParking)}
//           {getAmenityIcon('isHasPool', property.isHasPool)}
//           {getAmenityIcon('isHasStoreRoom', property.isHasStoreRoom)}
//           {!property.isHasElevator && !property.isHasParking && !property.isHasPool && !property.isHasStoreRoom && (
//             <span className="no-amenities">بدون امکانات</span>
//           )}
//         </div>

//         <div className="property-card-footer">
//           <span className="property-date">
//             <FaClock aria-hidden="true" />
//             {property.createdAtPersianRelative}
//           </span>
//           <Link 
//             to={`/property/${property.id}`}
//             className="view-property-btn"
//             title={`مشاهده جزئیات ${property.title} توسط ${consultantName}`}
//             onClick={(e) => e.stopPropagation()}
//           >
//             مشاهده ملک
//             <FaArrowLeft aria-hidden="true" />
//           </Link>
//         </div>
//       </div>
//     </article>
//   );
// };

// // ============================================================
// // ========== کامپوننت Skeleton ==========
// // ============================================================
// const ProfileSkeleton = () => (
//   <div className="consultant-profile-skeleton" aria-label="در حال بارگذاری">
//     <div className="skeleton-header">
//       <div className="skeleton-back"></div>
//       <div className="skeleton-title"></div>
//     </div>
//     <div className="skeleton-body">
//       <div className="skeleton-avatar"></div>
//       <div className="skeleton-info">
//         <div className="skeleton-line"></div>
//         <div className="skeleton-line"></div>
//         <div className="skeleton-line short"></div>
//       </div>
//     </div>
//   </div>
// );

// // ============================================================
// // ========== کامپوننت Breadcrumb ==========
// // ============================================================
// const Breadcrumb = ({ consultantName }) => (
//   <nav aria-label="مسیر راهنما" className="breadcrumb-nav">
//     <ol className="breadcrumb">
//       <li>
//         <Link to="/" title="صفحه اصلی املاک تهران">صفحه اصلی</Link>
//       </li>
//       <li>
//         <Link to="/consultants" title="لیست مشاوران املاک">مشاوران املاک</Link>
//       </li>
//       <li className="active" aria-current="page">
//         {consultantName}
//       </li>
//     </ol>
//   </nav>
// );

// // ============================================================
// // ========== کامپوننت اصلی ==========
// // ============================================================
// const ConsultantProfilePage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { name } = useParams();
  
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [copied, setCopied] = useState(false);
//   const [activeTab, setActiveTab] = useState('properties');
  
//   const [properties, setProperties] = useState([]);
//   const [propertiesLoading, setPropertiesLoading] = useState(false);
//   const [pagination, setPagination] = useState({
//     pageNumber: 1,
//     pageSize: 10,
//     totalCount: 0,
//     totalPages: 0,
//     hasNextPage: false,
//     hasPreviousPage: false
//   });

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showPhone, setShowPhone] = useState(false);

//   const [showStoryPopup, setShowStoryPopup] = useState(false);
//   const [hasStory, setHasStory] = useState(false);

//   // ===== SEO Meta Tags =====
//   const [seoData, setSeoData] = useState({
//     title: 'مشاور املاک | املاک تهران',
//     description: 'مشاور املاک حرفه‌ای در تهران - خرید، فروش و اجاره ملک',
//     keywords: 'مشاور املاک, خرید ملک, فروش ملک, اجاره ملک, املاک تهران',
//     image: '/images/default-avatar.jpg',
//     url: window.location.href
//   });

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

//   // ===== دریافت userId =====
//   useEffect(() => {
//     const state = location.state;
//     let userId = state?.userId;
    
//     if (!userId) {
//       const savedUserId = localStorage.getItem('temp_profile_userId');
//       if (savedUserId) {
//         userId = savedUserId;
//         localStorage.removeItem('temp_profile_userId');
//       }
//     }

//     if (!userId) {
//       setError('شناسه کاربر یافت نشد');
//       setLoading(false);
//       return;
//     }

//     fetchProfile(userId);
//     fetchProperties(userId, 1);
//   }, [location]);

//   // ===== دریافت اطلاعات پروفایل =====
//   const fetchProfile = async (userId) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem('auth_token');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       }

//       const response = await fetch(
//         `https://localhost:7178/api/RealEstatePage/GetUserForSite?userId=${userId}`,
//         { headers }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}`);
//       }

//       const result = await response.json();

//       if (result.status === 200 && result.data) {
//         const profileData = {
//           ...result.data,
//           avatar: result.data.avatar 
//             ? `https://localhost:7178${result.data.avatar}` 
//             : 'https://randomuser.me/api/portraits/men/32.jpg',
//           regionOfWork: result.data.regionOfWork || [],
//           score: parseInt(result.data.score) || 0,
//           _userId: userId
//         };
        
//         setProfile(profileData);
        
//         // به‌روزرسانی SEO
//         const regionNames = profileData.regionOfWork.join('، ');
//         const seoTitle = `مشاور املاک ${profileData.fullName} | خرید و فروش ملک در ${regionNames || 'تهران'}`;
//         const seoDescription = `${profileData.fullName}، مشاور املاک مجرب در مناطق ${regionNames || 'تهران'} با ${profileData.countOfRealEtates} ملک فعال و ${profileData.score} امتیاز. برای مشاوره خرید، فروش و اجاره ملک تماس بگیرید.`;
//         const seoKeywords = `مشاور املاک ${profileData.fullName}, خرید ملک ${regionNames}, فروش ملک ${regionNames}, اجاره ملک ${regionNames}, املاک تهران`;
        
//         setSeoData({
//           title: seoTitle,
//           description: seoDescription,
//           keywords: seoKeywords,
//           image: profileData.avatar,
//           url: window.location.href
//         });
        
//         checkHasStory(userId);
        
//       } else {
//         throw new Error(result.message || 'پروفایل یافت نشد');
//       }
//     } catch (error) {
//       console.error('❌ خطا در دریافت پروفایل:', error);
//       setError(error.message || 'مشکل در دریافت اطلاعات');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ===== دریافت املاک کاربر =====
//   const fetchProperties = async (userId, pageNumber = 1) => {
//     setPropertiesLoading(true);
    
//     try {
//       const response = await fetch(
//         `https://localhost:7178/api/RealEstatePage/GetRandomLastItemRealEstatesWithUser?userId=${userId}&pageNumber=${pageNumber}&pageSize=10`
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}`);
//       }

//       const result = await response.json();

//       if (result.status === 200 && result.data) {
//         setProperties(result.data.items || []);
//         setPagination({
//           pageNumber: result.data.pageNumber,
//           pageSize: result.data.pageSize,
//           totalCount: result.data.totalCount,
//           totalPages: result.data.totalPages,
//           hasNextPage: result.data.hasNextPage,
//           hasPreviousPage: result.data.hasPreviousPage
//         });
//       } else {
//         setProperties([]);
//       }
//     } catch (error) {
//       console.error('❌ خطا در دریافت املاک:', error);
//       setProperties([]);
//     } finally {
//       setPropertiesLoading(false);
//     }
//   };

//   // ===== بررسی وجود استوری =====
//   const checkHasStory = async (userId) => {
//     try {
//       const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${userId}`);
      
//       if (!response.ok) {
//         setHasStory(false);
//         return;
//       }
      
//       const result = await response.json();
      
//       let hasStoryResult = false;
//       if (result.status === 200 && result.data && result.data.length > 0) {
//         const userStories = result.data[0]?.storyUser || [];
//         hasStoryResult = userStories.length > 0;
//       }
      
//       setHasStory(hasStoryResult);
      
//     } catch (error) {
//       console.error('❌ خطا در بررسی استوری:', error);
//       setHasStory(false);
//     }
//   };

//   // ===== تغییر صفحه =====
//   const handlePageChange = (newPage) => {
//     if (profile?._userId) {
//       fetchProperties(profile._userId, newPage);
//       // اسکرول به بالای لیست
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   // ===== توابع =====
//   const handleBack = useCallback(() => {
//     navigate(-1);
//   }, [navigate]);

//   const handleShare = useCallback(async () => {
//     const shareData = {
//       title: seoData.title,
//       text: seoData.description,
//       url: window.location.href
//     };

//     if (navigator.share && /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)) {
//       try {
//         await navigator.share(shareData);
//       } catch (error) {
//         if (error.name !== 'AbortError') {
//           handleCopyLink();
//         }
//       }
//     } else {
//       handleCopyLink();
//     }
//   }, [seoData]);

//   const handleCopyLink = useCallback(() => {
//     navigator.clipboard.writeText(window.location.href);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 3000);
//   }, []);

//   const handleCall = useCallback(() => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//       return;
//     }
//     if (profile?.mobileNumber) {
//       window.location.href = `tel:${profile.mobileNumber.replace(/\s/g, '')}`;
//     }
//   }, [isLoggedIn, profile]);

//   const handleWhatsApp = useCallback(() => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//       return;
//     }
//     if (profile?.mobileNumber) {
//       window.open(`https://wa.me/${profile.mobileNumber.replace(/\s/g, '')}`, '_blank');
//     }
//   }, [isLoggedIn, profile]);

//   const handleLoginModalClose = useCallback(() => {
//     setShowLoginModal(false);
//     const token = localStorage.getItem('auth_token');
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleStoryClick = useCallback(async (e) => {
//     if (e) {
//       e.stopPropagation();
//     }
    
//     if (!profile?._userId) {
//       return;
//     }

//     if (!hasStory) {
//       try {
//         const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${profile._userId}`);
//         const result = await response.json();
        
//         if (result.status === 200 && result.data && result.data.length > 0) {
//           const userStories = result.data[0]?.storyUser || [];
//           if (userStories.length > 0) {
//             setHasStory(true);
//             setShowStoryPopup(true);
//             document.body.style.overflow = 'hidden';
//             return;
//           }
//         }
//         setHasStory(false);
//         alert('این کاربر استوری ندارد');
//       } catch (error) {
//         console.error('خطا در بررسی استوری:', error);
//         alert('مشکل در بررسی استوری');
//       }
//       return;
//     }

//     setShowStoryPopup(true);
//     document.body.style.overflow = 'hidden';
//   }, [profile, hasStory]);

//   const handleStoryClose = useCallback(() => {
//     setShowStoryPopup(false);
//     document.body.style.overflow = '';
//   }, []);

//   // ===== رندر =====
//   if (error) {
//     return (
//       <>
//         <Helmet>
//           <title>خطا | املاک تهران</title>
//           <meta name="description" content="متاسفانه خطایی در نمایش پروفایل مشاور رخ داده است" />
//         </Helmet>
//         <div className="consultant-profile-page">
//           <div className="profile-error">
//             <div className="error-icon">
//               <FaTimes />
//             </div>
//             <h2>متاسفانه خطایی رخ داده است</h2>
//             <p>{error}</p>
//             <div className="error-actions">
//               <button onClick={() => window.location.reload()}>تلاش مجدد</button>
//               <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (loading) {
//     return (
//       <>
//         <Helmet>
//           <title>بارگذاری پروفایل مشاور | املاک تهران</title>
//         </Helmet>
//         <div className="consultant-profile-page">
//           <ProfileSkeleton />
//         </div>
//       </>
//     );
//   }

//   if (!profile) {
//     return (
//       <>
//         <Helmet>
//           <title>مشاور یافت نشد | املاک تهران</title>
//           <meta name="description" content="متاسفانه پروفایل مشاور مورد نظر یافت نشد" />
//         </Helmet>
//         <div className="consultant-profile-page">
//           <div className="profile-not-found">
//             <h1>مشاور یافت نشد</h1>
//             <p>متاسفانه پروفایل مورد نظر یافت نشد</p>
//             <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   // محاسبه امتیاز ستاره
//   const starRating = Math.min(5, Math.round(profile.score / 20));
//   const fullStars = Math.floor(starRating);
//   const hasHalfStar = starRating % 1 >= 0.5;

//   // ماسک شماره تلفن
//   const maskPhoneNumber = (phone) => {
//     if (!phone) return '**********';
//     if (phone.length <= 4) return '****';
//     const visible = phone.slice(-4);
//     return `*****${visible}`;
//   };

//   // تولید Schema Markup
//   const getSchemaMarkup = () => {
//     const regionNames = profile.regionOfWork.join('، ');
//     return {
//       "@context": "https://schema.org",
//       "@type": "RealEstateAgent",
//       "name": profile.fullName,
//       "image": profile.avatar,
//       "telephone": profile.mobileNumber,
//       "description": `${profile.fullName} مشاور املاک حرفه‌ای در مناطق ${regionNames} با ${profile.countOfRealEtates} ملک فعال و ${profile.score} امتیاز`,
//       "address": {
//         "@type": "PostalAddress",
//         "addressLocality": regionNames || "تهران",
//         "addressCountry": "IR"
//       },
//       "aggregateRating": {
//         "@type": "AggregateRating",
//         "ratingValue": Math.min(5, profile.score / 20).toFixed(1),
//         "reviewCount": profile.countOfRealEtates * 2 || 1
//       },
//       "makesOffer": {
//         "@type": "Offer",
//         "itemOffered": {
//           "@type": "Service",
//           "name": "مشاوره خرید، فروش و اجاره ملک",
//           "description": `خدمات مشاوره املاک در مناطق ${regionNames}`
//         }
//       }
//     };
//   };

//   return (
//     <>
//       <Helmet>
//         {/* Title */}
//         <title>{seoData.title}</title>
        
//         {/* Meta Tags */}
//         <meta name="description" content={seoData.description} />
//         <meta name="keywords" content={seoData.keywords} />
//         <meta name="robots" content="index, follow" />
//         <link rel="canonical" href={seoData.url} />
        
//         {/* Open Graph */}
//         <meta property="og:title" content={seoData.title} />
//         <meta property="og:description" content={seoData.description} />
//         <meta property="og:image" content={seoData.image} />
//         <meta property="og:url" content={seoData.url} />
//         <meta property="og:type" content="profile" />
//         <meta property="og:locale" content="fa_IR" />
//         <meta property="og:site_name" content="املاک تهران" />
        
//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={seoData.title} />
//         <meta name="twitter:description" content={seoData.description} />
//         <meta name="twitter:image" content={seoData.image} />
        
//         {/* Schema Markup */}
//         <script type="application/ld+json">
//           {JSON.stringify(getSchemaMarkup())}
//         </script>
//       </Helmet>

//       <div className="consultant-profile-page">
//         {showLoginModal && (
//           <LoginModal 
//             onClose={handleLoginModalClose}
//             triggerSource="consultant-profile"
//           />
//         )}

//         {showStoryPopup && (
//           <StoryPopup 
//             agentName={profile.fullName}
//             agentImage={profile.avatar}
//             userId={profile._userId}
//             onClose={handleStoryClose}
//           />
//         )}

//         {/* Breadcrumb */}
//         <Breadcrumb consultantName={profile.fullName} />

//         {/* Header */}
//         <header className="profile-header">
//           <div className="profile-header-content">
//             <button className="back-btn" onClick={handleBack} aria-label="بازگشت">
//               <FaArrowRight aria-hidden="true" />
//               <span>بازگشت</span>
//             </button>
//             <h1 className="profile-title">
//               پروفایل {profile.fullName}
//             </h1>
//             <div className="header-actions">
//               <button className="share-btn" onClick={handleShare} aria-label="اشتراک‌گذاری">
//                 <FaShare aria-hidden="true" />
//               </button>
//             </div>
//           </div>
//         </header>

//         <main className="profile-main">
//           {/* کارت پروفایل */}
//           <section className="profile-card" aria-label="اطلاعات مشاور">
//             <div className="profile-avatar-section">
//               <div className="avatar-wrapper">
//                 <div 
//                   className={`profile-avatar-container ${hasStory ? 'has-story' : ''}`}
//                   onClick={hasStory ? handleStoryClick : undefined}
//                   style={{ cursor: hasStory ? 'pointer' : 'default' }}
//                   role={hasStory ? "button" : "img"}
//                   aria-label={hasStory ? "مشاهده استوری" : `آواتار ${profile.fullName}`}
//                   tabIndex={hasStory ? 0 : -1}
//                 >
//                   <img 
//                     src={profile.avatar} 
//                     alt={`${profile.fullName} - مشاور املاک حرفه‌ای در تهران`}
//                     className="profile-avatar"
//                     loading="lazy"
//                     decoding="async"
//                     onError={(e) => {
//                       e.target.src = 'https://randomuser.me/api/portraits/men/32.jpg';
//                     }}
//                   />
//                   {hasStory && (
//                     <div className="story-ring" aria-hidden="true">
//                       <div className="story-ring-inner"></div>
//                     </div>
//                   )}
//                 </div>
//                 <div className="avatar-status online" aria-label="آنلاین">
//                   <span className="status-dot"></span>
//                 </div>
//               </div>
              
//               {hasStory && (
//                 <button className="story-label-badge" onClick={handleStoryClick} aria-label="مشاهده استوری">
//                   <span className="story-dot" aria-hidden="true"></span>
//                   <span>استوری</span>
//                 </button>
//               )}

//               <div className="profile-badges">
//                 {profile.score >= 50 && (
//                   <span className="badge gold" aria-label="مشاور طلایی">
//                     <FaAward aria-hidden="true" /> طلایی
//                   </span>
//                 )}
//                 {profile.score >= 30 && profile.score < 50 && (
//                   <span className="badge silver" aria-label="مشاور نقره‌ای">
//                     <FaAward aria-hidden="true" /> نقره‌ای
//                   </span>
//                 )}
//                 <span className="badge verified" aria-label="تأیید شده">
//                   <FaShieldAlt aria-hidden="true" /> تأیید شده
//                 </span>
//               </div>
//             </div>

//             <div className="profile-info">
//               <h2 className="consultant-name">{profile.fullName}</h2>
//               <div className="consultant-title">
//                 <FaBriefcase className="title-icon" aria-hidden="true" />
//                 <span>مشاور املاک حرفه‌ای</span>
//                 {hasStory && (
//                   <button 
//                     className="story-label-inline" 
//                     onClick={handleStoryClick}
//                     aria-label="مشاهده استوری"
//                   >
//                     <span className="story-dot" aria-hidden="true"></span>
//                     استوری
//                   </button>
//                 )}
//               </div>

//               <div className="rating-section" aria-label={`امتیاز ${profile.score} از ۱۰۰`}>
//                 <div className="stars" aria-hidden="true">
//                   {[...Array(5)].map((_, i) => (
//                     <FaStar 
//                       key={i}
//                       className={
//                         i < fullStars ? 'star filled' :
//                         i === fullStars && hasHalfStar ? 'star half' :
//                         'star empty'
//                       }
//                     />
//                   ))}
//                 </div>
//                 <span className="rating-score">{profile.score} امتیاز</span>
//                 <span className="rating-count">({profile.countOfRealEtates * 2 || 0} نظر)</span>
//               </div>

//               <div className="contact-info">
//                 <div className="contact-item">
//                   <FaPhone className="contact-icon" aria-hidden="true" />
//                   <span className="contact-label">شماره تماس</span>
//                   <div className="contact-value-wrapper">
//                     {isLoggedIn && showPhone ? (
//                       <span className="contact-value">{profile.mobileNumber}</span>
//                     ) : (
//                       <span className="contact-value masked">
//                         {isLoggedIn ? (
//                           <button 
//                             className="show-phone-btn"
//                             onClick={() => setShowPhone(true)}
//                             aria-label="نمایش شماره تماس"
//                           >
//                             <FaEye aria-hidden="true" /> نمایش شماره
//                           </button>
//                         ) : (
//                           <span className="phone-masked">
//                             {maskPhoneNumber(profile.mobileNumber)}
//                             <FaLock className="lock-icon" aria-hidden="true" />
//                           </span>
//                         )}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 <div className="contact-item">
//                   <FaClock className="contact-icon" aria-hidden="true" />
//                   <span className="contact-label">عضویت</span>
//                   <span className="contact-value">{profile.dateTimeOfSite}</span>
//                 </div>
//               </div>

//               <div className="action-buttons">
//                 <button 
//                   className={`action-btn call ${!isLoggedIn ? 'locked' : ''}`}
//                   onClick={handleCall}
//                   aria-label={isLoggedIn ? "تماس فوری با مشاور" : "برای تماس وارد شوید"}
//                 >
//                   <FaPhone aria-hidden="true" /> 
//                   <span>{isLoggedIn ? 'تماس فوری' : 'تماس'}</span>
//                   {!isLoggedIn && (
//                     <span className="lock-badge" aria-hidden="true">
//                       <FaLock className="lock-icon-small" />
//                     </span>
//                   )}
//                 </button>

//                 <button 
//                   className={`action-btn whatsapp ${!isLoggedIn ? 'locked' : ''}`}
//                   onClick={handleWhatsApp}
//                   aria-label={isLoggedIn ? "ارسال پیام در واتساپ" : "برای واتساپ وارد شوید"}
//                 >
//                   <FaWhatsapp aria-hidden="true" /> 
//                   <span>واتساپ</span>
//                   {!isLoggedIn && (
//                     <span className="lock-badge" aria-hidden="true">
//                       <FaLock className="lock-icon-small" />
//                     </span>
//                   )}
//                 </button>

//                 <button className="action-btn share" onClick={handleCopyLink} aria-label="کپی لینک پروفایل">
//                   <FaCopy aria-hidden="true" />
//                   <span>کپی لینک</span>
//                 </button>
//               </div>

//               {!isLoggedIn && (
//                 <button 
//                   className="login-prompt-btn" 
//                   onClick={() => setShowLoginModal(true)}
//                   aria-label="ورود برای مشاهده شماره تماس"
//                 >
//                   <FaUser className="login-icon" aria-hidden="true" />
//                   برای مشاهده شماره تماس وارد شوید
//                   <FaArrowRight className="arrow-icon" aria-hidden="true" />
//                 </button>
//               )}
//             </div>
//           </section>

//           {/* آمار */}
//           <section className="stats-grid" aria-label="آمار و عملکرد مشاور">
//             <div className="stat-card">
//               <div className="stat-icon home" aria-hidden="true">
//                 <FaHome />
//               </div>
//               <div className="stat-info">
//                 <span className="stat-value">{profile.countOfRealEtates}</span>
//                 <span className="stat-label">ملک فعال</span>
//               </div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon rent" aria-hidden="true">
//                 <FaBuilding />
//               </div>
//               <div className="stat-info">
//                 <span className="stat-value">{profile.countOfRent}</span>
//                 <span className="stat-label">ملک اجاره‌ای</span>
//               </div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon score" aria-hidden="true">
//                 <FaChartLine />
//               </div>
//               <div className="stat-info">
//                 <span className="stat-value">{profile.score}</span>
//                 <span className="stat-label">امتیاز</span>
//               </div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon total" aria-hidden="true">
//                 <FaUsers />
//               </div>
//               <div className="stat-info">
//                 <span className="stat-value">{profile.countOfRealEtates + profile.countOfRent}</span>
//                 <span className="stat-label">کل معاملات</span>
//               </div>
//             </div>
//           </section>

//           {/* مناطق فعالیت */}
//           <section className="regions-section" aria-label="مناطق فعالیت مشاور">
//             <h3 className="section-title">
//               <FaMapMarkerAlt className="section-icon" aria-hidden="true" />
//               مناطق فعالیت
//             </h3>
//             <div className="regions-tags">
//               {profile.regionOfWork.length > 0 ? (
//                 profile.regionOfWork.map((region, index) => (
//                   <span key={index} className="region-tag">
//                     <FaMapMarkerAlt aria-hidden="true" />
//                     {region}
//                   </span>
//                 ))
//               ) : (
//                 <span className="no-region">منطقه‌ای ثبت نشده</span>
//               )}
//             </div>
//             <p className="region-description">
//               <strong>{profile.fullName}</strong>، مشاور املاک حرفه‌ای با بیش از <strong>{profile.countOfRealEtates}</strong> ملک فعال و <strong>{profile.countOfRent}</strong> فقره اجاره موفق، در مناطق استراتژیک <strong>{profile.regionOfWork.join('، ') || 'تهران'}</strong> به خریداران و فروشندگان محترم خدمات مشاوره تخصصی خرید، فروش و اجاره ملک ارائه می‌دهد. 
//               {profile.score >= 50 && ' این مشاور با کسب نشان طلایی و امتیاز بالا، یکی از بهترین گزینه‌های سرمایه‌گذاری ملکی در تهران محسوب می‌شود.'}
//               {profile.score >= 30 && profile.score < 50 && ' این مشاور با سابقه درخشان و امتیاز مناسب، گزینه‌ای قابل اعتماد برای معاملات ملکی شماست.'}
//             </p>
//           </section>

//           {/* تب‌ها */}
//           <div className="profile-tabs" role="tablist">
//             <button 
//               className={`tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
//               onClick={() => setActiveTab('properties')}
//               role="tab"
//               aria-selected={activeTab === 'properties'}
//               aria-controls="properties-tab"
//               id="tab-properties"
//             >
//               <FaHome aria-hidden="true" />
//               <span>ملک‌های مشاور</span>
//               <span className="tab-badge">{pagination.totalCount}</span>
//             </button>
//             <button 
//               className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
//               onClick={() => setActiveTab('about')}
//               role="tab"
//               aria-selected={activeTab === 'about'}
//               aria-controls="about-tab"
//               id="tab-about"
//             >
//               <FaUser aria-hidden="true" />
//               <span>درباره مشاور</span>
//             </button>
//           </div>

//           {/* محتوای تب‌ها */}
//           <div className="tab-content">
//             {activeTab === 'properties' && (
//               <div className="properties-tab" id="properties-tab" role="tabpanel" aria-labelledby="tab-properties">
//                 {propertiesLoading ? (
//                   <div className="properties-loading">
//                     <FaSpinner className="spinner" aria-hidden="true" />
//                     <span>در حال بارگذاری ملک‌ها...</span>
//                   </div>
//                 ) : properties.length > 0 ? (
//                   <>
//                     <div className="properties-grid">
//                       {properties.map((property) => (
//                         <PropertyCard 
//                           key={property.id} 
//                           property={property}
//                           consultantName={profile.fullName}
//                         />
//                       ))}
//                     </div>

//                     {pagination.totalPages > 1 && (
//                       <nav className="pagination-container" aria-label="صفحه‌بندی">
//                         <button 
//                           className="pagination-btn"
//                           onClick={() => handlePageChange(pagination.pageNumber - 1)}
//                           disabled={!pagination.hasPreviousPage}
//                           aria-label="صفحه قبلی"
//                         >
//                           <FaArrowRight aria-hidden="true" />
//                           قبلی
//                         </button>
                        
//                         <span className="pagination-info">
//                           صفحه {pagination.pageNumber} از {pagination.totalPages}
//                         </span>
                        
//                         <button 
//                           className="pagination-btn"
//                           onClick={() => handlePageChange(pagination.pageNumber + 1)}
//                           disabled={!pagination.hasNextPage}
//                           aria-label="صفحه بعدی"
//                         >
//                           بعدی
//                           <FaArrowLeft aria-hidden="true" />
//                         </button>
//                       </nav>
//                     )}
//                   </>
//                 ) : (
//                   <div className="properties-empty">
//                     <FaHome className="empty-icon" aria-hidden="true" />
//                     <h3>هیچ ملکی یافت نشد</h3>
//                     <p>{profile.fullName} هنوز هیچ ملکی ثبت نکرده است</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {activeTab === 'about' && (
//               <div className="about-tab" id="about-tab" role="tabpanel" aria-labelledby="tab-about">
//                 <article className="about-card">
//                   <h3>درباره {profile.fullName}</h3>
//                   <div className="about-content">
//                     <p>
//                       <strong>{profile.fullName}</strong> یکی از مشاوران املاک حرفه‌ای و با تجربه در 
//                       مناطق <strong>{profile.regionOfWork.join('، ') || 'تهران'}</strong> می‌باشد. 
//                       با کسب <strong>{profile.score} امتیاز</strong> و ثبت <strong>{profile.countOfRealEtates} ملک فعال</strong>، 
//                       این مشاور املاک آماده ارائه مشاوره تخصصی در زمینه خرید، فروش و اجاره ملک به شما عزیزان است.
//                     </p>
//                     <div className="about-details">
//                       <div className="about-item">
//                         <FaCalendarAlt aria-hidden="true" />
//                         <span>عضویت: {profile.dateTimeOfSite}</span>
//                       </div>
                      
//                       <div className="about-item">
//                         <FaPhone aria-hidden="true" />
//                         <span className="about-phone-wrapper">
//                           {isLoggedIn && showPhone ? (
//                             <span className="about-phone-value">{profile.mobileNumber}</span>
//                           ) : (
//                             <span className="about-phone-masked">
//                               {isLoggedIn ? (
//                                 <button 
//                                   className="show-phone-btn about-show-phone"
//                                   onClick={() => setShowPhone(true)}
//                                   aria-label="نمایش شماره تماس"
//                                 >
//                                   <FaEye aria-hidden="true" /> نمایش شماره تماس
//                                 </button>
//                               ) : (
//                                 <>
//                                   <span className="masked-text">برای مشاهده شماره وارد شوید</span>
//                                   <FaLock className="lock-icon about-lock" aria-hidden="true" />
//                                 </>
//                               )}
//                             </span>
//                           )}
//                         </span>
//                       </div>
                      
//                       <div className="about-item">
//                         <FaMapMarkerAlt aria-hidden="true" />
//                         <span>مناطق: {profile.regionOfWork.join('، ') || 'تهران'}</span>
//                       </div>
//                       <div className="about-item">
//                         <FaAward aria-hidden="true" />
//                         <span>امتیاز: {profile.score}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               </div>
//             )}
//           </div>
//         </main>

//         <footer className="profile-footer">
//           <p>
//             صفحه رسمی {profile.fullName} در املاک تهران - مشاور املاک حرفه‌ای
//           </p>
//         </footer>

//         {copied && (
//           <div className="toast-notification" role="alert" aria-live="polite">
//             <FaCheckCircle aria-hidden="true" />
//             <span>لینک پروفایل کپی شد</span>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ConsultantProfilePage;

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { 
  FaUser, FaPhone, FaStar, FaHome, FaBuilding, FaMapMarkerAlt, 
  FaClock, FaCheckCircle, FaArrowLeft, FaShare, FaCopy,
  FaWhatsapp, FaCalendarAlt, FaAward, FaShieldAlt,
  FaSpinner, FaTimes, FaUsers, FaChartLine, FaBriefcase, FaArrowRight,
  FaLock, FaEye, FaLink, FaRulerCombined, FaBed,
  FaCar, FaArrowUp, FaSwimmingPool, FaWarehouse, FaImage
} from 'react-icons/fa';
import LoginModal from '../LoginModal/LoginModal';
import './ConsultantProfilePage.css';

// ============================================================
// ========== هوک مدیریت SEO (بدون پکیج) ==========
// ============================================================
const useSEO = (profile, url) => {
  useEffect(() => {
    if (!profile) return;

    // تابع پاک کردن تگ‌های قبلی
    const clearOldTags = () => {
      const selectors = [
        'meta[name="description"]',
        'meta[name="keywords"]',
        'meta[name="robots"]',
        'link[rel="canonical"]',
        'meta[property^="og:"]',
        'meta[name^="twitter:"]',
        'script[type="application/ld+json"]'
      ];
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove());
      });
    };

    clearOldTags();

    // اطلاعات پایه
    const regionNames = profile.regionOfWork?.join('، ') || 'تهران';
    const fullName = profile.fullName || 'مشاور املاک';
    const score = profile.score || 0;
    const propertiesCount = profile.countOfRealEtates || 0;
    const rentCount = profile.countOfRent || 0;

    // ===== 1. Title =====
    document.title = `مشاور املاک ${fullName} | خرید و فروش ملک در ${regionNames} | املاک تهران`;

    // ===== 2. Meta Description =====
    const desc = document.createElement('meta');
    desc.name = 'description';
    desc.content = `${fullName}، مشاور املاک مجرب در مناطق ${regionNames} با ${propertiesCount} ملک فعال و ${score} امتیاز. برای مشاوره خرید، فروش و اجاره ملک در ${regionNames} تماس بگیرید.`;
    document.head.appendChild(desc);

    // ===== 3. Meta Keywords =====
    const keywords = document.createElement('meta');
    keywords.name = 'keywords';
    keywords.content = `مشاور املاک ${fullName}, خرید ملک ${regionNames}, فروش ملک ${regionNames}, اجاره ملک ${regionNames}, مشاوره املاک, املاک تهران`;
    document.head.appendChild(keywords);

    // ===== 4. Robots =====
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'index, follow, max-snippet:-1, max-image-preview:large';
    document.head.appendChild(robots);

    // ===== 5. Canonical =====
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = url || window.location.href;
    document.head.appendChild(canonical);

    // ===== 6. Open Graph =====
    const ogTags = {
      'og:title': `مشاور املاک ${fullName} | املاک تهران`,
      'og:description': `${fullName}، مشاور املاک حرفه‌ای با ${score} امتیاز و ${propertiesCount} ملک فعال در ${regionNames}`,
      'og:image': profile.avatar || '/images/default-og.jpg',
      'og:url': url || window.location.href,
      'og:type': 'profile',
      'og:locale': 'fa_IR',
      'og:site_name': 'املاک تهران'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      const tag = document.createElement('meta');
      tag.setAttribute('property', property);
      tag.content = content;
      document.head.appendChild(tag);
    });

    // ===== 7. Twitter Card =====
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': `مشاور املاک ${fullName} | املاک تهران`,
      'twitter:description': `${fullName}، مشاور املاک حرفه‌ای با ${score} امتیاز`,
      'twitter:image': profile.avatar || '/images/default-og.jpg'
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      const tag = document.createElement('meta');
      tag.name = name;
      tag.content = content;
      document.head.appendChild(tag);
    });

    // ===== 8. Schema Markup (JSON-LD) =====
    const schema = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": fullName,
      "image": profile.avatar,
      "telephone": profile.mobileNumber,
      "description": `${fullName} مشاور املاک حرفه‌ای در مناطق ${regionNames} با ${propertiesCount} ملک فعال و ${score} امتیاز`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": regionNames,
        "addressCountry": "IR"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": Math.min(5, (score / 20)).toFixed(1),
        "reviewCount": propertiesCount * 2 || 1,
        "bestRating": "5",
        "worstRating": "1"
      },
      "makesOffer": {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "مشاوره خرید، فروش و اجاره ملک",
          "description": `خدمات مشاوره املاک در مناطق ${regionNames}`
        }
      },
      "areaServed": {
        "@type": "City",
        "name": regionNames
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    // ===== 9. Viewport =====
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(viewport);
    }

    // ===== 10. Language =====
    document.documentElement.lang = 'fa';
    document.documentElement.dir = 'rtl';

  }, [profile, url]);
};

// ============================================================
// ========== کامپوننت Breadcrumb ==========
// ============================================================
const Breadcrumb = ({ consultantName }) => (
  <nav aria-label="مسیر راهنما" className="breadcrumb-nav">
    <ol className="breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
      <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
        <Link to="/" itemProp="item" title="صفحه اصلی املاک تهران">
          <span itemProp="name">صفحه اصلی</span>
        </Link>
        <meta itemProp="position" content="1" />
      </li>
      <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
        <Link to="/consultants" itemProp="item" title="لیست مشاوران املاک">
          <span itemProp="name">مشاوران املاک</span>
        </Link>
        <meta itemProp="position" content="2" />
      </li>
      <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="active">
        <span itemProp="name" aria-current="page">{consultantName}</span>
        <meta itemProp="position" content="3" />
      </li>
    </ol>
  </nav>
);

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
          if (formattedStories.length === 0) {
            setError('هیچ استوری برای این کاربر وجود ندارد');
          }
        } else {
          setStories([]);
          setError('هیچ استوری برای این کاربر وجود ندارد');
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
      <div className="story-popup-overlay" onClick={onClose}>
        <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
          <div className="story-loading">
            <FaSpinner className="spinner" />
            <span>در حال بارگذاری استوری‌ها...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || stories.length === 0) {
    return (
      <div className="story-popup-overlay" onClick={onClose}>
        <div className="story-popup-content" onClick={(e) => e.stopPropagation()}>
          <div className="story-error">
            <p>{error || 'هیچ استوری برای این کاربر وجود ندارد'}</p>
            <button onClick={onClose}>بستن</button>
          </div>
        </div>
      </div>
    );
  }

  const currentStory = stories[currentStoryIndex];

  return (
    <div 
      className="story-popup-overlay"
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
// ========== کامپوننت کارت ملک ==========
// ============================================================
const PropertyCard = ({ property, consultantName }) => {
  const navigate = useNavigate();
  
  const formatPrice = (price) => {
    if (!price) return '۰';
    return price.toLocaleString('fa-IR');
  };

  const getAmenityIcon = (amenity, hasAmenity) => {
    if (!hasAmenity) return null;
    const icons = {
      isHasElevator: <FaArrowUp className="amenity-icon active" title="آسانسور" />,
      isHasParking: <FaCar className="amenity-icon active" title="پارکینگ" />,
      isHasPool: <FaSwimmingPool className="amenity-icon active" title="استخر" />,
      isHasStoreRoom: <FaWarehouse className="amenity-icon active" title="انباری" />
    };
    return icons[amenity] || null;
  };

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <article className="property-card-item" onClick={handleCardClick} aria-label={`ملک ${property.title}`}>
      <div className="property-card-image">
        {property.address ? (
          <img 
            src={`https://localhost:7178${property.address}`} 
            alt={`${property.title} - ملک ${consultantName} در ${property.regionName}`}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.src = '/images/no-image.jpg';
            }}
          />
        ) : (
          <div className="no-image-placeholder">
            <FaHome />
          </div>
        )}
        <div className="property-card-badge">
          {property.imageCount > 0 && (
            <span className="image-count-badge">
              <FaImage /> {property.imageCount}
            </span>
          )}
        </div>
      </div>

      <div className="property-card-body">
        <div className="property-card-header">
          <h3 className="property-card-title">{property.title || 'ملک'}</h3>
          <span className="property-card-region">
            <FaMapMarkerAlt aria-hidden="true" />
            {property.regionName}
          </span>
        </div>

        <div className="property-card-price">
          <span className="price-amount">{formatPrice(property.price)}</span>
          <span className="price-unit">تومان</span>
        </div>

        <div className="property-card-details">
          <div className="detail-item">
            <FaRulerCombined aria-hidden="true" />
            <span>متراژ نامشخص</span>
          </div>
          <div className="detail-item">
            <FaBed aria-hidden="true" />
            <span>نامشخص</span>
          </div>
          <div className="detail-item">
            <FaCalendarAlt aria-hidden="true" />
            <span>{property.constructionYear || 'نامشخص'}</span>
          </div>
        </div>

        <div className="property-card-amenities">
          {getAmenityIcon('isHasElevator', property.isHasElevator)}
          {getAmenityIcon('isHasParking', property.isHasParking)}
          {getAmenityIcon('isHasPool', property.isHasPool)}
          {getAmenityIcon('isHasStoreRoom', property.isHasStoreRoom)}
          {!property.isHasElevator && !property.isHasParking && !property.isHasPool && !property.isHasStoreRoom && (
            <span className="no-amenities">بدون امکانات</span>
          )}
        </div>

        <div className="property-card-footer">
          <span className="property-date">
            <FaClock aria-hidden="true" />
            {property.createdAtPersianRelative}
          </span>
          <Link 
            to={`/property/${property.id}`}
            className="view-property-btn"
            title={`مشاهده جزئیات ${property.title} - مشاور املاک ${consultantName}`}
            onClick={(e) => e.stopPropagation()}
          >
            مشاهده ملک
            <FaArrowLeft aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};

// ============================================================
// ========== کامپوننت Skeleton ==========
// ============================================================
const ProfileSkeleton = () => (
  <div className="consultant-profile-skeleton" aria-label="در حال بارگذاری">
    <div className="skeleton-header">
      <div className="skeleton-back"></div>
      <div className="skeleton-title"></div>
    </div>
    <div className="skeleton-body">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-info">
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
      </div>
    </div>
  </div>
);

// ============================================================
// ========== کامپوننت اصلی ==========
// ============================================================
const ConsultantProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = useParams();
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('properties');
  
  const [properties, setProperties] = useState([]);
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const [showStoryPopup, setShowStoryPopup] = useState(false);
  const [hasStory, setHasStory] = useState(false);

  // ===== استفاده از هوک SEO =====
  useSEO(profile, window.location.href);

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

  // ===== دریافت userId =====
  useEffect(() => {
    const state = location.state;
    let userId = state?.userId;
    
    if (!userId) {
      const savedUserId = localStorage.getItem('temp_profile_userId');
      if (savedUserId) {
        userId = savedUserId;
        localStorage.removeItem('temp_profile_userId');
      }
    }

    if (!userId) {
      setError('شناسه کاربر یافت نشد');
      setLoading(false);
      return;
    }

    fetchProfile(userId);
    fetchProperties(userId, 1);
  }, [location]);

  // ===== دریافت اطلاعات پروفایل =====
  const fetchProfile = async (userId) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('auth_token');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(
        `https://localhost:7178/api/RealEstatePage/GetUserForSite?userId=${userId}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();

      if (result.status === 200 && result.data) {
        const profileData = {
          ...result.data,
          avatar: result.data.avatar 
            ? `https://localhost:7178${result.data.avatar}` 
            : 'https://randomuser.me/api/portraits/men/32.jpg',
          regionOfWork: result.data.regionOfWork || [],
          score: parseInt(result.data.score) || 0,
          _userId: userId
        };
        
        setProfile(profileData);
        checkHasStory(userId);
        
      } else {
        throw new Error(result.message || 'پروفایل یافت نشد');
      }
    } catch (error) {
      console.error('❌ خطا در دریافت پروفایل:', error);
      setError(error.message || 'مشکل در دریافت اطلاعات');
    } finally {
      setLoading(false);
    }
  };

  // ===== دریافت املاک کاربر =====
  const fetchProperties = async (userId, pageNumber = 1) => {
    setPropertiesLoading(true);
    
    try {
      const response = await fetch(
        `https://localhost:7178/api/RealEstatePage/GetRandomLastItemRealEstatesWithUser?userId=${userId}&pageNumber=${pageNumber}&pageSize=10`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();

      if (result.status === 200 && result.data) {
        setProperties(result.data.items || []);
        setPagination({
          pageNumber: result.data.pageNumber,
          pageSize: result.data.pageSize,
          totalCount: result.data.totalCount,
          totalPages: result.data.totalPages,
          hasNextPage: result.data.hasNextPage,
          hasPreviousPage: result.data.hasPreviousPage
        });
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.error('❌ خطا در دریافت املاک:', error);
      setProperties([]);
    } finally {
      setPropertiesLoading(false);
    }
  };

  // ===== بررسی وجود استوری =====
  const checkHasStory = async (userId) => {
    try {
      const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${userId}`);
      
      if (!response.ok) {
        setHasStory(false);
        return;
      }
      
      const result = await response.json();
      
      let hasStoryResult = false;
      if (result.status === 200 && result.data && result.data.length > 0) {
        const userStories = result.data[0]?.storyUser || [];
        hasStoryResult = userStories.length > 0;
      }
      
      setHasStory(hasStoryResult);
      
    } catch (error) {
      console.error('❌ خطا در بررسی استوری:', error);
      setHasStory(false);
    }
  };

  // ===== تغییر صفحه =====
  const handlePageChange = (newPage) => {
    if (profile?._userId) {
      fetchProperties(profile._userId, newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ===== توابع =====
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: document.title,
      text: document.querySelector('meta[name="description"]')?.content || '',
      url: window.location.href
    };

    if (navigator.share && /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if (error.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  }, []);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }, []);

  const handleCall = useCallback(() => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (profile?.mobileNumber) {
      window.location.href = `tel:${profile.mobileNumber.replace(/\s/g, '')}`;
    }
  }, [isLoggedIn, profile]);

  const handleWhatsApp = useCallback(() => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (profile?.mobileNumber) {
      window.open(`https://wa.me/${profile.mobileNumber.replace(/\s/g, '')}`, '_blank');
    }
  }, [isLoggedIn, profile]);

  const handleLoginModalClose = useCallback(() => {
    setShowLoginModal(false);
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleStoryClick = useCallback(async (e) => {
    if (e) {
      e.stopPropagation();
    }
    
    if (!profile?._userId) {
      return;
    }

    if (!hasStory) {
      try {
        const response = await fetch(`https://localhost:7178/api/Story/StoryForSiteForUser?userId=${profile._userId}`);
        const result = await response.json();
        
        if (result.status === 200 && result.data && result.data.length > 0) {
          const userStories = result.data[0]?.storyUser || [];
          if (userStories.length > 0) {
            setHasStory(true);
            setShowStoryPopup(true);
            document.body.style.overflow = 'hidden';
            return;
          }
        }
        setHasStory(false);
        alert('این کاربر استوری ندارد');
      } catch (error) {
        console.error('خطا در بررسی استوری:', error);
        alert('مشکل در بررسی استوری');
      }
      return;
    }

    setShowStoryPopup(true);
    document.body.style.overflow = 'hidden';
  }, [profile, hasStory]);

  const handleStoryClose = useCallback(() => {
    setShowStoryPopup(false);
    document.body.style.overflow = '';
  }, []);

  // ===== رندر =====
  if (error) {
    return (
      <div className="consultant-profile-page">
        <div className="profile-error">
          <div className="error-icon">
            <FaTimes />
          </div>
          <h1>متاسفانه خطایی رخ داده است</h1>
          <p>{error}</p>
          <div className="error-actions">
            <button onClick={() => window.location.reload()}>تلاش مجدد</button>
            <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="consultant-profile-page">
        <ProfileSkeleton />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="consultant-profile-page">
        <div className="profile-not-found">
          <h1>مشاور یافت نشد</h1>
          <p>متاسفانه پروفایل مورد نظر یافت نشد</p>
          <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
        </div>
      </div>
    );
  }

  // محاسبه امتیاز ستاره
  const starRating = Math.min(5, Math.round(profile.score / 20));
  const fullStars = Math.floor(starRating);
  const hasHalfStar = starRating % 1 >= 0.5;

  // ماسک شماره تلفن
  const maskPhoneNumber = (phone) => {
    if (!phone) return '**********';
    if (phone.length <= 4) return '****';
    const visible = phone.slice(-4);
    return `*****${visible}`;
  };

  return (
    <div className="consultant-profile-page">
      {showLoginModal && (
        <LoginModal 
          onClose={handleLoginModalClose}
          triggerSource="consultant-profile"
        />
      )}

      {showStoryPopup && (
        <StoryPopup 
          agentName={profile.fullName}
          agentImage={profile.avatar}
          userId={profile._userId}
          onClose={handleStoryClose}
        />
      )}

      {/* Breadcrumb */}
      <Breadcrumb consultantName={profile.fullName} />

      {/* Header */}
      <header className="profile-header">
        <div className="profile-header-content">
          <button className="back-btn" onClick={handleBack} aria-label="بازگشت">
            <FaArrowRight aria-hidden="true" />
            <span>بازگشت</span>
          </button>
          <h1 className="profile-title">
            پروفایل {profile.fullName}
          </h1>
          <div className="header-actions">
            <button className="share-btn" onClick={handleShare} aria-label="اشتراک‌گذاری">
              <FaShare aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <main className="profile-main">
        {/* کارت پروفایل */}
        <section className="profile-card" aria-label="اطلاعات مشاور">
          <div className="profile-avatar-section">
            <div className="avatar-wrapper">
              <div 
                className={`profile-avatar-container ${hasStory ? 'has-story' : ''}`}
                onClick={hasStory ? handleStoryClick : undefined}
                style={{ cursor: hasStory ? 'pointer' : 'default' }}
                role={hasStory ? "button" : "img"}
                aria-label={hasStory ? "مشاهده استوری" : `آواتار ${profile.fullName}`}
                tabIndex={hasStory ? 0 : -1}
              >
                <img 
                  src={profile.avatar} 
                  alt={`${profile.fullName} - مشاور املاک حرفه‌ای در ${profile.regionOfWork.join('، ') || 'تهران'}`}
                  className="profile-avatar"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.src = 'https://randomuser.me/api/portraits/men/32.jpg';
                  }}
                />
                {hasStory && (
                  <div className="story-ring" aria-hidden="true">
                    <div className="story-ring-inner"></div>
                  </div>
                )}
              </div>
              <div className="avatar-status online" aria-label="آنلاین">
                <span className="status-dot"></span>
              </div>
            </div>
            
            {hasStory && (
              <button className="story-label-badge" onClick={handleStoryClick} aria-label="مشاهده استوری">
                <span className="story-dot" aria-hidden="true"></span>
                <span>استوری</span>
              </button>
            )}

            <div className="profile-badges">
              {profile.score >= 50 && (
                <span className="badge gold" aria-label="مشاور طلایی">
                  <FaAward aria-hidden="true" /> طلایی
                </span>
              )}
              {profile.score >= 30 && profile.score < 50 && (
                <span className="badge silver" aria-label="مشاور نقره‌ای">
                  <FaAward aria-hidden="true" /> نقره‌ای
                </span>
              )}
              <span className="badge verified" aria-label="تأیید شده">
                <FaShieldAlt aria-hidden="true" /> تأیید شده
              </span>
            </div>
          </div>

          <div className="profile-info">
            <h2 className="consultant-name">{profile.fullName}</h2>
            <div className="consultant-title">
              <FaBriefcase className="title-icon" aria-hidden="true" />
              <span>مشاور املاک حرفه‌ای در {profile.regionOfWork.join('، ') || 'تهران'}</span>
              {hasStory && (
                <button 
                  className="story-label-inline" 
                  onClick={handleStoryClick}
                  aria-label="مشاهده استوری"
                >
                  <span className="story-dot" aria-hidden="true"></span>
                  استوری
                </button>
              )}
            </div>

            <div className="rating-section" aria-label={`امتیاز ${profile.score} از ۱۰۰`}>
              <div className="stars" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i}
                    className={
                      i < fullStars ? 'star filled' :
                      i === fullStars && hasHalfStar ? 'star half' :
                      'star empty'
                    }
                  />
                ))}
              </div>
              <span className="rating-score">{profile.score} امتیاز</span>
              <span className="rating-count">({profile.countOfRealEtates * 2 || 0} نظر)</span>
            </div>

            <div className="contact-info">
              <div className="contact-item">
                <FaPhone className="contact-icon" aria-hidden="true" />
                <span className="contact-label">شماره تماس</span>
                <div className="contact-value-wrapper">
                  {isLoggedIn && showPhone ? (
                    <span className="contact-value">{profile.mobileNumber}</span>
                  ) : (
                    <span className="contact-value masked">
                      {isLoggedIn ? (
                        <button 
                          className="show-phone-btn"
                          onClick={() => setShowPhone(true)}
                          aria-label="نمایش شماره تماس"
                        >
                          <FaEye aria-hidden="true" /> نمایش شماره
                        </button>
                      ) : (
                        <span className="phone-masked">
                          {maskPhoneNumber(profile.mobileNumber)}
                          <FaLock className="lock-icon" aria-hidden="true" />
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </div>
              <div className="contact-item">
                <FaClock className="contact-icon" aria-hidden="true" />
                <span className="contact-label">عضویت</span>
                <span className="contact-value">{profile.dateTimeOfSite}</span>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className={`action-btn call ${!isLoggedIn ? 'locked' : ''}`}
                onClick={handleCall}
                aria-label={isLoggedIn ? "تماس فوری با مشاور" : "برای تماس وارد شوید"}
              >
                <FaPhone aria-hidden="true" /> 
                <span>{isLoggedIn ? 'تماس فوری' : 'تماس'}</span>
                {!isLoggedIn && (
                  <span className="lock-badge" aria-hidden="true">
                    <FaLock className="lock-icon-small" />
                  </span>
                )}
              </button>

              <button 
                className={`action-btn whatsapp ${!isLoggedIn ? 'locked' : ''}`}
                onClick={handleWhatsApp}
                aria-label={isLoggedIn ? "ارسال پیام در واتساپ" : "برای واتساپ وارد شوید"}
              >
                <FaWhatsapp aria-hidden="true" /> 
                <span>واتساپ</span>
                {!isLoggedIn && (
                  <span className="lock-badge" aria-hidden="true">
                    <FaLock className="lock-icon-small" />
                  </span>
                )}
              </button>

              <button className="action-btn share" onClick={handleCopyLink} aria-label="کپی لینک پروفایل">
                <FaCopy aria-hidden="true" />
                <span>کپی لینک</span>
              </button>
            </div>

            {!isLoggedIn && (
              <button 
                className="login-prompt-btn" 
                onClick={() => setShowLoginModal(true)}
                aria-label="ورود برای مشاهده شماره تماس"
              >
                <FaUser className="login-icon" aria-hidden="true" />
                برای مشاهده شماره تماس وارد شوید
                <FaArrowRight className="arrow-icon" aria-hidden="true" />
              </button>
            )}
          </div>
        </section>

        {/* آمار */}
        <section className="stats-grid" aria-label="آمار و عملکرد مشاور">
          <div className="stat-card">
            <div className="stat-icon home" aria-hidden="true">
              <FaHome />
            </div>
            <div className="stat-info">
              <span className="stat-value">{profile.countOfRealEtates}</span>
              <span className="stat-label">ملک فعال</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon rent" aria-hidden="true">
              <FaBuilding />
            </div>
            <div className="stat-info">
              <span className="stat-value">{profile.countOfRent}</span>
              <span className="stat-label">ملک اجاره‌ای</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon score" aria-hidden="true">
              <FaChartLine />
            </div>
            <div className="stat-info">
              <span className="stat-value">{profile.score}</span>
              <span className="stat-label">امتیاز</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon total" aria-hidden="true">
              <FaUsers />
            </div>
            <div className="stat-info">
              <span className="stat-value">{profile.countOfRealEtates + profile.countOfRent}</span>
              <span className="stat-label">کل معاملات</span>
            </div>
          </div>
        </section>

        {/* مناطق فعالیت - با محتوای غنی */}
        <section className="regions-section" aria-label="مناطق فعالیت مشاور">
          <h3 className="section-title">
            <FaMapMarkerAlt className="section-icon" aria-hidden="true" />
            مناطق فعالیت
          </h3>
          <div className="regions-tags">
            {profile.regionOfWork.length > 0 ? (
              profile.regionOfWork.map((region, index) => (
                <span key={index} className="region-tag">
                  <FaMapMarkerAlt aria-hidden="true" />
                  {region}
                </span>
              ))
            ) : (
              <span className="no-region">منطقه‌ای ثبت نشده</span>
            )}
          </div>
          <p className="region-description">
            <strong>{profile.fullName}</strong>، <strong>مشاور املاک حرفه‌ای</strong> با بیش از <strong>{profile.countOfRealEtates} ملک فعال</strong> و <strong>{profile.countOfRent} فقره اجاره موفق</strong>، در مناطق استراتژیک <strong>{profile.regionOfWork.join('، ') || 'تهران'}</strong> به خریداران و فروشندگان محترم خدمات <strong>مشاوره تخصصی خرید، فروش و اجاره ملک</strong> ارائه می‌دهد. 
            {profile.score >= 50 && ' این مشاور با کسب <strong>نشان طلایی</strong> و امتیاز بالا، یکی از بهترین گزینه‌های <strong>سرمایه‌گذاری ملکی در تهران</strong> محسوب می‌شود.'}
            {profile.score >= 30 && profile.score < 50 && ' این مشاور با سابقه درخشان و امتیاز مناسب، گزینه‌ای قابل اعتماد برایمعاملات ملکی  شماست.'}
            برای <strong>خرید ملک</strong>، <strong>فروش ملک</strong> یا <strong>اجاره ملک</strong> در {profile.regionOfWork.join('، ') || 'تهران'}، با <strong>{profile.fullName}</strong> تماس بگیرید.
          </p>
        </section>

        {/* تب‌ها */}
        <div className="profile-tabs" role="tablist">
          <button 
            className={`tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties')}
            role="tab"
            aria-selected={activeTab === 'properties'}
            aria-controls="properties-tab"
            id="tab-properties"
          >
            <FaHome aria-hidden="true" />
            <span>ملک‌های مشاور</span>
            <span className="tab-badge">{pagination.totalCount}</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
            role="tab"
            aria-selected={activeTab === 'about'}
            aria-controls="about-tab"
            id="tab-about"
          >
            <FaUser aria-hidden="true" />
            <span>درباره مشاور</span>
          </button>
        </div>

        {/* محتوای تب‌ها */}
        <div className="tab-content">
          {activeTab === 'properties' && (
            <div className="properties-tab" id="properties-tab" role="tabpanel" aria-labelledby="tab-properties">
              {propertiesLoading ? (
                <div className="properties-loading">
                  <FaSpinner className="spinner" aria-hidden="true" />
                  <span>در حال بارگذاری ملک‌ها...</span>
                </div>
              ) : properties.length > 0 ? (
                <>
                  <div className="properties-grid">
                    {properties.map((property) => (
                      <PropertyCard 
                        key={property.id} 
                        property={property}
                        consultantName={profile.fullName}
                      />
                    ))}
                  </div>

                  {pagination.totalPages > 1 && (
                    <nav className="pagination-container" aria-label="صفحه‌بندی">
                      <button 
                        className="pagination-btn"
                        onClick={() => handlePageChange(pagination.pageNumber - 1)}
                        disabled={!pagination.hasPreviousPage}
                        aria-label="صفحه قبلی"
                      >
                        <FaArrowRight aria-hidden="true" />
                        قبلی
                      </button>
                      
                      <span className="pagination-info">
                        صفحه {pagination.pageNumber} از {pagination.totalPages}
                      </span>
                      
                      <button 
                        className="pagination-btn"
                        onClick={() => handlePageChange(pagination.pageNumber + 1)}
                        disabled={!pagination.hasNextPage}
                        aria-label="صفحه بعدی"
                      >
                        بعدی
                        <FaArrowLeft aria-hidden="true" />
                      </button>
                    </nav>
                  )}
                </>
              ) : (
                <div className="properties-empty">
                  <FaHome className="empty-icon" aria-hidden="true" />
                  <h3>هیچ ملکی یافت نشد</h3>
                  <p>{profile.fullName} هنوز هیچ ملکی ثبت نکرده است</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="about-tab" id="about-tab" role="tabpanel" aria-labelledby="tab-about">
              <article className="about-card">
                <h3>درباره {profile.fullName}</h3>
                <div className="about-content">
                  <p>
                    <strong>{profile.fullName}</strong> یکی از <strong>مشاوران املاک حرفه‌ای</strong> و با تجربه در 
                    مناطق <strong>{profile.regionOfWork.join('، ') || 'تهران'}</strong> می‌باشد. 
                    با کسب <strong>{profile.score} امتیاز</strong> و ثبت <strong>{profile.countOfRealEtates} ملک فعال</strong>، 
                    این مشاور املاک آماده ارائه <strong>مشاوره تخصصی در زمینه خرید، فروش و اجاره ملک</strong> به شما عزیزان است.
                  </p>
                  <div className="about-details">
                    <div className="about-item">
                      <FaCalendarAlt aria-hidden="true" />
                      <span>عضویت: {profile.dateTimeOfSite}</span>
                    </div>
                    
                    <div className="about-item">
                      <FaPhone aria-hidden="true" />
                      <span className="about-phone-wrapper">
                        {isLoggedIn && showPhone ? (
                          <span className="about-phone-value">{profile.mobileNumber}</span>
                        ) : (
                          <span className="about-phone-masked">
                            {isLoggedIn ? (
                              <button 
                                className="show-phone-btn about-show-phone"
                                onClick={() => setShowPhone(true)}
                                aria-label="نمایش شماره تماس"
                              >
                                <FaEye aria-hidden="true" /> نمایش شماره تماس
                              </button>
                            ) : (
                              <>
                                <span className="masked-text">برای مشاهده شماره وارد شوید</span>
                                <FaLock className="lock-icon about-lock" aria-hidden="true" />
                              </>
                            )}
                          </span>
                        )}
                      </span>
                    </div>
                    
                    <div className="about-item">
                      <FaMapMarkerAlt aria-hidden="true" />
                      <span>مناطق: {profile.regionOfWork.join('، ') || 'تهران'}</span>
                    </div>
                    <div className="about-item">
                      <FaAward aria-hidden="true" />
                      <span>امتیاز: {profile.score}</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          )}
        </div>
      </main>

      <footer className="profile-footer">
        <p>
          صفحه رسمی {profile.fullName} در املاک تهران - مشاور املاک حرفه‌ای
        </p>
      </footer>

      {copied && (
        <div className="toast-notification" role="alert" aria-live="polite">
          <FaCheckCircle aria-hidden="true" />
          <span>لینک پروفایل کپی شد</span>
        </div>
      )}
    </div>
  );
};

export default ConsultantProfilePage;