
// // import React, { useState, useEffect, useRef } from 'react';
// // import './Stories.css';

// // const Stories = ({ 
// //   storiesData, 
// //   onStoryClick, 
// //   onProfileClick,
// //   onSaveStory,
// //   autoPlayInterval = 5000,
// //   className = '' 
// // }) => {
// //   const [selectedStory, setSelectedStory] = useState(null);
// //   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
// //   const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
// //   const [progress, setProgress] = useState(0);
// //   const [isPaused, setIsPaused] = useState(false);
// //   const [savedStories, setSavedStories] = useState({});
// //   const progressIntervalRef = useRef(null);
// //   const videoRef = useRef(null);

// //   // باز کردن استوری
// //   const openStory = (story, storyIdx, mediaIdx = 0) => {
// //     setSelectedStory(story);
// //     setCurrentStoryIndex(storyIdx);
// //     setCurrentMediaIndex(mediaIdx);
// //     setProgress(0);
// //     setIsPaused(false);
// //     if (onStoryClick) onStoryClick(story);
// //   };

// //   // بستن استوری
// //   const closeStory = () => {
// //     setSelectedStory(null);
// //     setCurrentStoryIndex(0);
// //     setCurrentMediaIndex(0);
// //     setProgress(0);
// //     setIsPaused(false);
// //     if (progressIntervalRef.current) {
// //       clearInterval(progressIntervalRef.current);
// //     }
// //   };

// //   // رفتن به مدیای بعدی
// //   const nextMedia = () => {
// //     if (!selectedStory) return;
    
// //     const currentStoryMedia = selectedStory.stories;
// //     const isLastMedia = currentMediaIndex >= currentStoryMedia.length - 1;
    
// //     if (!isLastMedia) {
// //       setCurrentMediaIndex(prev => prev + 1);
// //       setProgress(0);
// //     } else {
// //       nextStory();
// //     }
// //   };

// //   // رفتن به مدیای قبلی
// //   const prevMedia = () => {
// //     if (!selectedStory) return;
    
// //     const isFirstMedia = currentMediaIndex <= 0;
    
// //     if (!isFirstMedia) {
// //       setCurrentMediaIndex(prev => prev - 1);
// //       setProgress(0);
// //     } else {
// //       prevStory();
// //     }
// //   };

// //   // رفتن به استوری بعدی
// //   const nextStory = () => {
// //     if (!selectedStory) return;
    
// //     const isLastStory = currentStoryIndex >= storiesData.length - 1;
    
// //     if (!isLastStory) {
// //       const nextStoryData = storiesData[currentStoryIndex + 1];
// //       openStory(nextStoryData, currentStoryIndex + 1, 0);
// //     } else {
// //       closeStory();
// //     }
// //   };

// //   // رفتن به استوری قبلی
// //   const prevStory = () => {
// //     if (!selectedStory) return;
    
// //     const isFirstStory = currentStoryIndex <= 0;
    
// //     if (!isFirstStory) {
// //       const prevStoryData = storiesData[currentStoryIndex - 1];
// //       const lastMediaIndex = (prevStoryData.stories?.length || 1) - 1;
// //       openStory(prevStoryData, currentStoryIndex - 1, lastMediaIndex);
// //     }
// //   };

// //   // ذخیره کردن استوری
// //   const handleSaveStory = (e, story) => {
// //     e.stopPropagation();
// //     const isSaved = savedStories[story.id];
    
// //     if (isSaved) {
// //       setSavedStories(prev => {
// //         const newSaved = { ...prev };
// //         delete newSaved[story.id];
// //         return newSaved;
// //       });
// //     } else {
// //       setSavedStories(prev => ({ ...prev, [story.id]: true }));
// //     }
    
// //     if (onSaveStory) {
// //       onSaveStory(story, !isSaved);
// //     }
// //   };

// //   // کلیک روی پروفایل
// //   const handleProfileClick = (e, story) => {
// //     e.stopPropagation();
// //     if (onProfileClick) {
// //       onProfileClick(story);
// //     }
// //   };

// //   // مدیریت تایمر پیشرفت
// //   useEffect(() => {
// //     if (!selectedStory) return;
    
// //     const currentMedia = selectedStory.stories[currentMediaIndex];
    
// //     if (currentMedia?.type === 'video') {
// //       if (progressIntervalRef.current) {
// //         clearInterval(progressIntervalRef.current);
// //       }
// //       return;
// //     }
    
// //     if (!isPaused) {
// //       if (progressIntervalRef.current) {
// //         clearInterval(progressIntervalRef.current);
// //       }
      
// //       const interval = setInterval(() => {
// //         setProgress(prev => {
// //           if (prev >= 100) {
// //             clearInterval(interval);
// //             nextMedia();
// //             return 0;
// //           }
// //           return prev + (100 / (autoPlayInterval / 100));
// //         });
// //       }, 100);
      
// //       progressIntervalRef.current = interval;
      
// //       return () => {
// //         clearInterval(interval);
// //       };
// //     }
// //   }, [selectedStory, currentMediaIndex, isPaused, autoPlayInterval]);

// //   // ریست پیشرفت
// //   useEffect(() => {
// //     setProgress(0);
// //     if (videoRef.current && selectedStory?.stories[currentMediaIndex]?.type === 'video') {
// //       videoRef.current.currentTime = 0;
// //       videoRef.current.play().catch(e => console.log('Video play error:', e));
// //     }
// //   }, [currentMediaIndex, selectedStory]);

// //   // هندلر پایان ویدیو
// //   const handleVideoEnded = () => {
// //     nextMedia();
// //   };

// //   if (!storiesData || storiesData.length === 0) {
// //     return null;
// //   }

// //   const currentMedia = selectedStory?.stories?.[currentMediaIndex];
// //   const isVideo = currentMedia?.type === 'video';
// //   const hasNextMedia = selectedStory && currentMediaIndex < (selectedStory.stories?.length || 0) - 1;
// //   const hasNextStory = selectedStory && currentStoryIndex < storiesData.length - 1;
// //   const hasPrevMedia = selectedStory && currentMediaIndex > 0;
// //   const hasPrevStory = selectedStory && currentStoryIndex > 0;
// //   const isSaved = selectedStory ? savedStories[selectedStory.id] : false;

// //   return (
// //     <>
// //       <script type="application/ld+json">
// //         {JSON.stringify({
// //           "@context": "https://schema.org",
// //           "@type": "ItemList",
// //           "name": "استوری‌های املاک",
// //           "description": "جدیدترین استوری‌های آژانس‌های املاک و مشاوران املاک",
// //           "numberOfItems": storiesData.length,
// //           "itemListElement": storiesData.slice(0, 10).map((story, index) => ({
// //             "@type": "ListItem",
// //             "position": index + 1,
// //             "name": story.name,
// //             "image": story.avatar || story.stories?.[0]?.image,
// //           }))
// //         })}
// //       </script>

// //       {/* بخش استوری‌ها */}
// //       <section className={`stories-section ${className}`} aria-label="استوری‌های املاک">
// //         <div className="stories-container">
// //           <div className="stories-header">
// //             <h2 className="sr-only">استوری‌های امروز آژانس‌های املاک</h2>
// //           </div>
          
// //           <div className="stories-slider" role="region" aria-label="لیست استوری‌ها">
// //             {storiesData.map((story, idx) => (
// //               <div 
// //                 key={story.id} 
// //                 className="story-item"
// //                 onClick={() => openStory(story, idx, 0)}
// //                 role="button"
// //                 tabIndex={0}
// //                 aria-label={`مشاهده استوری ${story.name}`}
// //                 onKeyPress={(e) => {
// //                   if (e.key === 'Enter' || e.key === ' ') {
// //                     openStory(story, idx, 0);
// //                   }
// //                 }}
// //               >
// //                 <div className={`story-avatar-wrapper ${story.isViewed ? 'viewed' : ''}`}>
// //                   <img 
// //                     src={story.avatar || story.stories?.[0]?.image} 
// //                     alt={`آواتار ${story.name}`}
// //                     className="story-avatar"
// //                     loading="lazy"
// //                     width="80"
// //                     height="80"
// //                     onError={(e) => {
// //                       e.target.src = 'https://via.placeholder.com/80x80?text=User';
// //                     }}
// //                   />
// //                   {story.isLive && (
// //                     <div className="story-live-badge" aria-label="پخش زنده">
// //                       <span aria-hidden="true">●</span> زنده
// //                     </div>
// //                   )}
// //                   {!story.isViewed && !story.isLive && (
// //                     <div className="story-unread-badge" aria-label="استوری جدید"></div>
// //                   )}
// //                 </div>
// //                 <span className="story-name">{story.name}</span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* مودال استوری */}
// //       {selectedStory && selectedStory.stories && currentMedia && (
// //         <div 
// //           className="story-modal"
// //           onClick={closeStory}
// //           role="dialog"
// //           aria-label={`استوری ${selectedStory.name}`}
// //           aria-modal="true"
// //         >
// //           <div className="story-modal-content" onClick={(e) => e.stopPropagation()}>
            
// //             {/* نوار پیشرفت */}
// //             <div className="story-progress-container">
// //               {selectedStory.stories.map((_, idx) => (
// //                 <div 
// //                   key={idx} 
// //                   className={`story-progress-bar ${idx === currentMediaIndex ? 'active' : ''} ${idx < currentMediaIndex ? 'completed' : ''}`}
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     if (idx !== currentMediaIndex) {
// //                       setCurrentMediaIndex(idx);
// //                       setProgress(0);
// //                     }
// //                   }}
// //                 >
// //                   <div 
// //                     className="story-progress-fill"
// //                     style={{ 
// //                       width: idx === currentMediaIndex ? `${progress}%` : idx < currentMediaIndex ? '100%' : '0%'
// //                     }}
// //                   />
// //                 </div>
// //               ))}
// //             </div>

// //             {/* دکمه بستن - بالا وسط */}
// //             <button 
// //               className="story-modal-close-top"
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 closeStory();
// //               }}
// //               aria-label="بستن استوری"
// //             >
// //               ✕
// //             </button>

// //             {/* دکمه سیو/ذخیره - سمت چپ */}
// //             <button 
// //               className={`story-save-btn ${isSaved ? 'saved' : ''}`}
// //               onClick={(e) => handleSaveStory(e, selectedStory)}
// //               aria-label={isSaved ? 'حذف از ذخیره شده‌ها' : 'ذخیره استوری'}
// //             >
// //               <svg width="20" height="20" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                 <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
// //               </svg>
// //             </button>

// //             {/* هدر با اطلاعات کاربر - فقط عکس و اسم لینک داره */}
// //             <div className="story-modal-header">
// //               <div 
// //                 className="story-profile-link"
// //                 onClick={(e) => handleProfileClick(e, selectedStory)}
// //                 role="button"
// //                 tabIndex={0}
// //                 onKeyPress={(e) => {
// //                   if (e.key === 'Enter' || e.key === ' ') {
// //                     handleProfileClick(e, selectedStory);
// //                   }
// //                 }}
// //                 aria-label={`مشاهده پروفایل ${selectedStory.name}`}
// //               >
// //                 <img 
// //                   src={selectedStory.avatar || selectedStory.stories[0]?.image} 
// //                   alt={selectedStory.name}
// //                   className="story-modal-avatar"
// //                   width="40"
// //                   height="40"
// //                 />
// //                 <div className="story-modal-info">
// //                   <div className="story-modal-name">{selectedStory.name}</div>
// //                   <div className="story-modal-time">
// //                     {new Date(currentMedia.timestamp || Date.now()).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* محتوای استوری */}
// //             <div 
// //               className="story-content"
// //               onMouseEnter={() => setIsPaused(true)}
// //               onMouseLeave={() => setIsPaused(false)}
// //             >
// //               {isVideo ? (
// //                 <video 
// //                   ref={videoRef}
// //                   src={currentMedia.url}
// //                   className="story-media"
// //                   autoPlay
// //                   muted
// //                   playsInline
// //                   onEnded={handleVideoEnded}
// //                   aria-label={`ویدیوی استوری ${selectedStory.name}`}
// //                 />
// //               ) : (
// //                 <img 
// //                   src={currentMedia.url} 
// //                   alt={currentMedia.caption || `استوری ${selectedStory.name}`}
// //                   className="story-media"
// //                   loading="lazy"
// //                   onError={(e) => {
// //                     e.target.src = 'https://via.placeholder.com/400x700?text=Story+Not+Found';
// //                   }}
// //                 />
// //               )}
              
// //               {currentMedia.caption && (
// //                 <div className="story-caption">
// //                   <p>{currentMedia.caption}</p>
// //                 </div>
// //               )}

// //               {currentMedia.link && (
// //                 <a 
// //                   href={currentMedia.link}
// //                   className="story-link-btn"
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   aria-label={currentMedia.linkText || 'مشاهده بیشتر'}
// //                   onClick={(e) => e.stopPropagation()}
// //                 >
// //                   {currentMedia.linkText || 'مشاهده بیشتر ←'}
// //                 </a>
// //               )}
// //             </div>

// //             {/* دکمه‌های ناوبری */}
// //             <button 
// //               className={`story-nav-btn story-nav-prev ${(!hasPrevMedia && !hasPrevStory) ? 'hidden' : ''}`}
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 prevMedia();
// //               }}
// //               aria-label="قبلی"
// //             >
// //                       <span aria-hidden="true">‹</span>
              
// //             </button>

// //             <button 
// //               className={`story-nav-btn story-nav-next ${(!hasNextMedia && !hasNextStory) ? 'hidden' : ''}`}
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 nextMedia();
// //               }}
// //               aria-label="بعدی"
// //             >
// //         <span aria-hidden="true">›</span>
// //             </button>

// //             {/* مناطق لمسی */}
// //             <div className="story-touch-left" onClick={(e) => {
// //               e.stopPropagation();
// //               prevMedia();
// //             }} />
// //             <div className="story-touch-right" onClick={(e) => {
// //               e.stopPropagation();
// //               nextMedia();
// //             }} />
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default Stories;

// // src/components/page/Stories/Stories.jsx - نسخه کامل بدون خطا

// import React, { useState, useEffect, useRef } from 'react';
// import './Stories.css';

// // اگر siteConfig رو نداری، این رو تعریف کن یا از پروژه import کن
// const siteConfig = {
//   name: 'سایت املاک',
//   title: 'خرید و اجاره ملک',
//   description: 'بهترین ملک‌های ایران',
//   url: 'https://yourdomain.com',
//   image: '/logo.png',
//   phone: '021-12345678',
//   email: 'info@example.com',
//   keywords: 'ملک, خرید ملک, اجاره ملک'
// };

// const Stories = ({ 
//   storiesData, 
//   onStoryClick, 
//   onProfileClick,
//   onSaveStory,
//   autoPlayInterval = 5000,
//   className = '' 
// }) => {
//   const [selectedStory, setSelectedStory] = useState(null);
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [savedStories, setSavedStories] = useState(() => {
//     try {
//       const saved = localStorage.getItem('savedStories');
//       return saved ? JSON.parse(saved) : {};
//     } catch {
//       return {};
//     }
//   });
//   const progressIntervalRef = useRef(null);
//   const videoRef = useRef(null);

//   // ذخیره کردن در localStorage وقتی تغییر می‌کنه
//   useEffect(() => {
//     localStorage.setItem('savedStories', JSON.stringify(savedStories));
//   }, [savedStories]);

//   // باز کردن استوری
//   const openStory = (story, storyIdx, mediaIdx = 0) => {
//     setSelectedStory(story);
//     setCurrentStoryIndex(storyIdx);
//     setCurrentMediaIndex(mediaIdx);
//     setProgress(0);
//     setIsPaused(false);
    
//     // آپدیت عنوان صفحه برای سئو
//     if (story && story.stories && story.stories[mediaIdx]) {
//       const mediaTitle = story.stories[mediaIdx].caption || story.name;
//       document.title = `${mediaTitle} | استوری ${story.name} - ${siteConfig.name}`;
//     }
    
//     if (onStoryClick) onStoryClick(story);
//   };

//   // بستن استوری
//   const closeStory = () => {
//     setSelectedStory(null);
//     setCurrentStoryIndex(0);
//     setCurrentMediaIndex(0);
//     setProgress(0);
//     setIsPaused(false);
    
//     // برگردوندن عنوان اصلی صفحه
//     document.title = siteConfig.title || 'خرید و اجاره ملک';
    
//     if (progressIntervalRef.current) {
//       clearInterval(progressIntervalRef.current);
//     }
//   };

//   // رفتن به مدیای بعدی
//   const nextMedia = () => {
//     if (!selectedStory) return;
    
//     const currentStoryMedia = selectedStory.stories;
//     const isLastMedia = currentMediaIndex >= currentStoryMedia.length - 1;
    
//     if (!isLastMedia) {
//       setCurrentMediaIndex(prev => prev + 1);
//       setProgress(0);
//     } else {
//       nextStory();
//     }
//   };

//   // رفتن به مدیای قبلی
//   const prevMedia = () => {
//     if (!selectedStory) return;
    
//     const isFirstMedia = currentMediaIndex <= 0;
    
//     if (!isFirstMedia) {
//       setCurrentMediaIndex(prev => prev - 1);
//       setProgress(0);
//     } else {
//       prevStory();
//     }
//   };

//   // رفتن به استوری بعدی
//   const nextStory = () => {
//     if (!selectedStory) return;
    
//     const isLastStory = currentStoryIndex >= storiesData.length - 1;
    
//     if (!isLastStory) {
//       const nextStoryData = storiesData[currentStoryIndex + 1];
//       openStory(nextStoryData, currentStoryIndex + 1, 0);
//     } else {
//       closeStory();
//     }
//   };

//   // رفتن به استوری قبلی
//   const prevStory = () => {
//     if (!selectedStory) return;
    
//     const isFirstStory = currentStoryIndex <= 0;
    
//     if (!isFirstStory) {
//       const prevStoryData = storiesData[currentStoryIndex - 1];
//       const lastMediaIndex = (prevStoryData.stories?.length || 1) - 1;
//       openStory(prevStoryData, currentStoryIndex - 1, lastMediaIndex);
//     }
//   };

//   // ذخیره کردن استوری
//   const handleSaveStory = (e, story) => {
//     e.stopPropagation();
//     const isSaved = savedStories[story.id];
    
//     if (isSaved) {
//       setSavedStories(prev => {
//         const newSaved = { ...prev };
//         delete newSaved[story.id];
//         return newSaved;
//       });
//     } else {
//       setSavedStories(prev => ({ ...prev, [story.id]: true }));
//     }
    
//     if (onSaveStory) {
//       onSaveStory(story, !isSaved);
//     }
//   };

//   // کلیک روی پروفایل
//   const handleProfileClick = (e, story) => {
//     e.stopPropagation();
//     if (onProfileClick) {
//       onProfileClick(story);
//     }
//   };

//   // هندلر پایان ویدیو
//   const handleVideoEnded = () => {
//     nextMedia();
//   };

//   // بهبود سئو با آپدیت عنوان هنگام تغییر مدیا
//   useEffect(() => {
//     if (selectedStory && selectedStory.stories && selectedStory.stories[currentMediaIndex]) {
//       const currentMedia = selectedStory.stories[currentMediaIndex];
//       const mediaTitle = currentMedia.caption || selectedStory.name;
//       document.title = `${mediaTitle} | استوری ${selectedStory.name} - ${siteConfig.name}`;
//     }
//   }, [currentMediaIndex, selectedStory]);

//   // مدیریت تایمر پیشرفت
//   useEffect(() => {
//     if (!selectedStory) return;
    
//     const currentMedia = selectedStory.stories[currentMediaIndex];
    
//     if (currentMedia?.type === 'video') {
//       if (progressIntervalRef.current) {
//         clearInterval(progressIntervalRef.current);
//       }
//       return;
//     }
    
//     if (!isPaused) {
//       if (progressIntervalRef.current) {
//         clearInterval(progressIntervalRef.current);
//       }
      
//       const interval = setInterval(() => {
//         setProgress(prev => {
//           if (prev >= 100) {
//             clearInterval(interval);
//             nextMedia();
//             return 0;
//           }
//           return prev + (100 / (autoPlayInterval / 100));
//         });
//       }, 100);
      
//       progressIntervalRef.current = interval;
      
//       return () => {
//         clearInterval(interval);
//       };
//     }
//   }, [selectedStory, currentMediaIndex, isPaused, autoPlayInterval]);

//   // ریست پیشرفت
//   useEffect(() => {
//     setProgress(0);
//     if (videoRef.current && selectedStory?.stories[currentMediaIndex]?.type === 'video') {
//       videoRef.current.currentTime = 0;
//       videoRef.current.play().catch(e => console.log('Video play error:', e));
//     }
//   }, [currentMediaIndex, selectedStory]);

//   if (!storiesData || storiesData.length === 0) {
//     return null;
//   }

//   const currentMedia = selectedStory?.stories?.[currentMediaIndex];
//   const isVideo = currentMedia?.type === 'video';
//   const hasNextMedia = selectedStory && currentMediaIndex < (selectedStory.stories?.length || 0) - 1;
//   const hasNextStory = selectedStory && currentStoryIndex < storiesData.length - 1;
//   const hasPrevMedia = selectedStory && currentMediaIndex > 0;
//   const hasPrevStory = selectedStory && currentStoryIndex > 0;
//   const isSaved = selectedStory ? savedStories[selectedStory.id] : false;

//   return (
//     <>
//       {/* Structured Data برای کل استوری‌ها */}
//       <script type="application/ld+json">
//         {JSON.stringify({
//           "@context": "https://schema.org",
//           "@type": "ItemList",
//           "name": "استوری‌های املاک",
//           "description": "جدیدترین استوری‌های آژانس‌های املاک و مشاوران املاک در تهران",
//           "numberOfItems": storiesData.length,
//           "itemListElement": storiesData.slice(0, 10).map((story, index) => ({
//             "@type": "ListItem",
//             "position": index + 1,
//             "name": story.name,
//             "url": story.profileUrl || undefined,
//             "image": story.avatar || story.stories?.[0]?.image,
//             "description": story.stories?.map(s => s.caption).filter(Boolean).join(' - ') || `استوری ${story.name}`
//           }))
//         })}
//       </script>

//       {/* Structured Data برای استوری در حال نمایش */}
//       {selectedStory && currentMedia && (
//         <script type="application/ld+json">
//           {JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "MediaObject",
//             "name": currentMedia.caption || `استوری ${selectedStory.name}`,
//             "description": currentMedia.caption || `مشاهده استوری ${selectedStory.name} در سایت املاک`,
//             "contentUrl": currentMedia.url,
//             "thumbnailUrl": selectedStory.avatar,
//             "uploadDate": currentMedia.timestamp || new Date().toISOString(),
//             "author": {
//               "@type": "Person",
//               "name": selectedStory.name,
//               "url": selectedStory.profileUrl
//             }
//           })}
//         </script>
//       )}

//       {/* بخش استوری‌ها */}
//       <section className={`stories-section ${className}`} aria-label="استوری‌های املاک">
//         <div className="stories-container">
//           <div className="stories-header">
//             {/* <h2 className="stories-title">
//               <span className="stories-title-icon">📸</span>
//               استوری‌های امروز
//             </h2>
//             <button className="stories-watch-all" aria-label="مشاهده همه استوری‌ها">
//               مشاهده همه
//             </button> */}
//           </div>
          
//           <div className="stories-slider" role="region" aria-label="لیست استوری‌ها">
//             {storiesData.map((story, idx) => (
//               <div 
//                 key={story.id} 
//                 className="story-item"
//                 onClick={() => openStory(story, idx, 0)}
//                 role="button"
//                 tabIndex={0}
//                 aria-label={`مشاهده استوری ${story.name}`}
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter' || e.key === ' ') {
//                     openStory(story, idx, 0);
//                   }
//                 }}
//               >
//                 <div className={`story-avatar-wrapper ${story.isViewed ? 'viewed' : ''}`}>
//                   <img 
//                     src={story.avatar || story.stories?.[0]?.image} 
//                     alt={`آواتار ${story.name}`}
//                     className="story-avatar"
//                     loading="lazy"
//                     width="80"
//                     height="80"
//                     onError={(e) => {
//                       e.target.src = 'https://via.placeholder.com/80x80?text=User';
//                     }}
//                   />
//                   {/* {
//                   story.isLive && (
//                     <div className="story-live-badge" aria-label="پخش زنده">
//                       <span aria-hidden="true">●</span> زنده
//                     </div>
//                   )} */}
//                   {!story.isViewed && !story.isLive && (
//                     <div className="story-unread-badge" aria-label="استوری جدید"></div>
//                   )}
//                 </div>
//                 <span className="story-name">{story.name}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* مودال استوری */}
//       {selectedStory && selectedStory.stories && currentMedia && (
//         <div 
//           className="story-modal"
//           onClick={closeStory}
//           role="dialog"
//           aria-label={`استوری ${selectedStory.name}`}
//           aria-modal="true"
//         >
//           <div className="story-modal-content" onClick={(e) => e.stopPropagation()}>
            
//             {/* نوار پیشرفت */}
//             <div className="story-progress-container" role="progressbar" aria-label="پیشرفت استوری">
//               {selectedStory.stories.map((_, idx) => (
//                 <div 
//                   key={idx} 
//                   className={`story-progress-bar ${idx === currentMediaIndex ? 'active' : ''} ${idx < currentMediaIndex ? 'completed' : ''}`}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     if (idx !== currentMediaIndex) {
//                       setCurrentMediaIndex(idx);
//                       setProgress(0);
//                     }
//                   }}
//                   aria-label={`بخش ${idx + 1} از ${selectedStory.stories.length}`}
//                 >
//                   <div 
//                     className="story-progress-fill"
//                     style={{ 
//                       width: idx === currentMediaIndex ? `${progress}%` : idx < currentMediaIndex ? '100%' : '0%'
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* دکمه بستن */}
//             <button 
//               className="story-modal-close-top"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 closeStory();
//               }}
//               aria-label="بستن استوری"
//             >
//               ✕
//             </button>

//             {/* دکمه سیو */}
//             <button 
//               className={`story-save-btn ${isSaved ? 'saved' : ''}`}
//               onClick={(e) => handleSaveStory(e, selectedStory)}
//               aria-label={isSaved ? 'حذف از ذخیره شده‌ها' : 'ذخیره استوری'}
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//                 <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
//               </svg>
//               <span className="sr-only">{isSaved ? 'ذخیره شده' : 'ذخیره استوری'}</span>
//             </button>

//             {/* هدر با اطلاعات کاربر */}
//             <div className="story-modal-header">
//               <div 
//                 className="story-profile-link"
//                 onClick={(e) => handleProfileClick(e, selectedStory)}
//                 role="link"
//                 tabIndex={0}
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter' || e.key === ' ') {
//                     handleProfileClick(e, selectedStory);
//                   }
//                 }}
//                 aria-label={`مشاهده پروفایل ${selectedStory.name}`}
//               >
//                 <img 
//                   src={selectedStory.avatar || selectedStory.stories[0]?.image} 
//                   alt={selectedStory.name}
//                   className="story-modal-avatar"
//                   width="40"
//                   height="40"
//                 />
//                 <div className="story-modal-info">
//                   <div className="story-modal-name">{selectedStory.name}</div>
//                   <div className="story-modal-time">
//                     {new Date(currentMedia.timestamp || Date.now()).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* محتوای استوری */}
//             <div 
//               className="story-content"
//               onMouseEnter={() => setIsPaused(true)}
//               onMouseLeave={() => setIsPaused(false)}
//             >
//               {isVideo ? (
//                 <video 
//                   ref={videoRef}
//                   src={currentMedia.url}
//                   className="story-media"
//                   autoPlay
//                   muted
//                   playsInline
//                   onEnded={handleVideoEnded}
//                   aria-label={`ویدیوی استوری ${selectedStory.name}: ${currentMedia.caption || ''}`}
//                   title={currentMedia.caption || `ویدیوی استوری ${selectedStory.name}`}
//                 />
//               ) : (
//                 <img 
//                   src={currentMedia.url} 
//                   alt={currentMedia.caption || `استوری ${selectedStory.name}`}
//                   className="story-media"
//                   loading="lazy"
//                   title={currentMedia.caption || `استوری ${selectedStory.name}`}
//                   onError={(e) => {
//                     e.target.src = 'https://via.placeholder.com/400x700?text=Story+Not+Found';
//                   }}
//                 />
//               )}
              
//               {/* کپشن استوری */}
//               {currentMedia.caption && (
//                 <div className="story-caption">
//                   <p>{currentMedia.caption}</p>
//                 </div>
//               )}

//               {/* لینک استوری */}
//               {currentMedia.link && (
//                 <a 
//                   href={currentMedia.link}
//                   className="story-link-btn"
//                   target="_blank"
//                   rel="noopener noreferrer nofollow"
//                   aria-label={currentMedia.linkText || 'مشاهده بیشتر'}
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   {currentMedia.linkText || 'مشاهده بیشتر ←'}
//                 </a>
//               )}
//             </div>

//             {/* دکمه‌های ناوبری */}
//             <button 
//               className={`story-nav-btn story-nav-prev ${(!hasPrevMedia && !hasPrevStory) ? 'hidden' : ''}`}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 prevMedia();
//               }}
//               aria-label="استوری قبلی"
//             >
//              <span aria-hidden="true">‹</span>
//               <span className="sr-only">قبلی</span>
//             </button>

//             <button 
//               className={`story-nav-btn story-nav-next ${(!hasNextMedia && !hasNextStory) ? 'hidden' : ''}`}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 nextMedia();
//               }}
//               aria-label="استوری بعدی"
//             >
          
//                    <span aria-hidden="true">›</span>
//               <span className="sr-only">بعدی</span>
//             </button>

//             {/* مناطق لمسی */}
//             <div 
//               className="story-touch-left" 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 prevMedia();
//               }}
//               aria-label="کلیک برای استوری قبلی"
//               role="button"
//               tabIndex={0}
//               onKeyPress={(e) => {
//                 if (e.key === 'Enter' || e.key === ' ') {
//                   prevMedia();
//                 }
//               }}
//             />
//             <div 
//               className="story-touch-right" 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 nextMedia();
//               }}
//               aria-label="کلیک برای استوری بعدی"
//               role="button"
//               tabIndex={0}
//               onKeyPress={(e) => {
//                 if (e.key === 'Enter' || e.key === ' ') {
//                   nextMedia();
//                 }
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Stories;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Stories.css';

const siteConfig = {
  name: 'سایت املاک',
  title: 'خرید و اجاره ملک',
  description: 'بهترین ملک‌های ایران',
  url: 'https://yourdomain.com',
  image: '/logo.png',
  phone: '021-12345678',
  email: 'info@example.com',
  keywords: 'ملک, خرید ملک, اجاره ملک'
};

const Stories = ({ 
  storiesData, 
  onStoryClick, 
  onProfileClick,
  onSaveStory,
  autoPlayInterval = 5000,
  className = '' 
}) => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [savedStories, setSavedStories] = useState(() => {
    try {
      const saved = localStorage.getItem('savedStories');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const timeoutRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const videoRef = useRef(null);

  // ذخیره کردن در localStorage
  useEffect(() => {
    localStorage.setItem('savedStories', JSON.stringify(savedStories));
  }, [savedStories]);

  // بستن استوری
  const closeStory = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    setSelectedStory(null);
    setCurrentStoryIndex(0);
    setCurrentMediaIndex(0);
    setProgress(0);
    setIsPaused(false);
    document.title = siteConfig.title || 'خرید و اجاره ملک';
  }, []);

  // رفتن به استوری بعدی
  const nextStory = useCallback(() => {
    if (!selectedStory) return;
    
    const isLastStory = currentStoryIndex >= storiesData.length - 1;
    
    if (!isLastStory) {
      const nextStoryData = storiesData[currentStoryIndex + 1];
      setSelectedStory(nextStoryData);
      setCurrentStoryIndex(currentStoryIndex + 1);
      setCurrentMediaIndex(0);
      setProgress(0);
      setIsPaused(false);
    } else {
      closeStory();
    }
  }, [selectedStory, currentStoryIndex, storiesData, closeStory]);

  // رفتن به مدیای بعدی
  const nextMedia = useCallback(() => {
    if (!selectedStory) return;
    
    const currentStoryMedia = selectedStory.stories;
    const isLastMedia = currentMediaIndex >= currentStoryMedia.length - 1;
    
    // پاک کردن تایمرها
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    if (!isLastMedia) {
      setCurrentMediaIndex(prev => prev + 1);
      setProgress(0);
    } else {
      nextStory();
    }
  }, [selectedStory, currentMediaIndex, nextStory]);

  // رفتن به مدیای قبلی
  const prevMedia = useCallback(() => {
    if (!selectedStory) return;
    
    const isFirstMedia = currentMediaIndex <= 0;
    
    // پاک کردن تایمرها
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    if (!isFirstMedia) {
      setCurrentMediaIndex(prev => prev - 1);
      setProgress(0);
    } else {
      const isFirstStory = currentStoryIndex <= 0;
      if (!isFirstStory) {
        const prevStoryData = storiesData[currentStoryIndex - 1];
        const lastMediaIndex = (prevStoryData.stories?.length || 1) - 1;
        setSelectedStory(prevStoryData);
        setCurrentStoryIndex(currentStoryIndex - 1);
        setCurrentMediaIndex(lastMediaIndex);
        setProgress(0);
        setIsPaused(false);
      }
    }
  }, [selectedStory, currentMediaIndex, currentStoryIndex, storiesData]);

  // باز کردن استوری
  const openStory = useCallback((story, storyIdx, mediaIdx = 0) => {
    // پاک کردن تایمرها
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    setSelectedStory(story);
    setCurrentStoryIndex(storyIdx);
    setCurrentMediaIndex(mediaIdx);
    setProgress(0);
    setIsPaused(false);
    
    if (story && story.stories && story.stories[mediaIdx]) {
      const mediaTitle = story.stories[mediaIdx].caption || story.name;
      document.title = `${mediaTitle} | استوری ${story.name} - ${siteConfig.name}`;
    }
    
    if (onStoryClick) onStoryClick(story);
  }, [onStoryClick]);

  // هندلر پایان ویدیو
  const handleVideoEnded = useCallback(() => {
    nextMedia();
  }, [nextMedia]);

  // مدیریت تایمر اتوماتیک برای تصاویر
  useEffect(() => {
    if (!selectedStory) return;
    
    const currentMedia = selectedStory.stories[currentMediaIndex];
    
    // اگه ویدیو بود، تایمر نزن
    if (currentMedia?.type === 'video') {
      return;
    }
    
    // اگه پیاز شده بود، تایمر رو پاک کن
    if (isPaused) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      return;
    }
    
    // تنظیم تایمر جدید
    timeoutRef.current = setTimeout(() => {
      nextMedia();
    }, autoPlayInterval);
    
    // آپدیت progress bar
    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / autoPlayInterval) * 100;
      if (newProgress <= 100) {
        setProgress(newProgress);
      }
    }, 50);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [selectedStory, currentMediaIndex, isPaused, autoPlayInterval, nextMedia]);

  // ریست پیشرفت و ویدیو هنگام تغییر مدیا
  useEffect(() => {
    setProgress(0);
    if (videoRef.current && selectedStory?.stories[currentMediaIndex]?.type === 'video') {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(e => console.log('Video play error:', e));
    }
  }, [currentMediaIndex, selectedStory]);

  // آپدیت عنوان صفحه
  useEffect(() => {
    if (selectedStory && selectedStory.stories && selectedStory.stories[currentMediaIndex]) {
      const currentMedia = selectedStory.stories[currentMediaIndex];
      const mediaTitle = currentMedia.caption || selectedStory.name;
      document.title = `${mediaTitle} | استوری ${selectedStory.name} - ${siteConfig.name}`;
    }
  }, [currentMediaIndex, selectedStory]);

  // ذخیره کردن استوری
  const handleSaveStory = (e, story) => {
    e.stopPropagation();
    const isSaved = savedStories[story.id];
    
    if (isSaved) {
      setSavedStories(prev => {
        const newSaved = { ...prev };
        delete newSaved[story.id];
        return newSaved;
      });
    } else {
      setSavedStories(prev => ({ ...prev, [story.id]: true }));
    }
    
    if (onSaveStory) {
      onSaveStory(story, !isSaved);
    }
  };

  // کلیک روی پروفایل
  const handleProfileClick = (e, story) => {
    e.stopPropagation();
    if (onProfileClick) {
      onProfileClick(story);
    }
  };

  if (!storiesData || storiesData.length === 0) {
    return null;
  }

  const currentMedia = selectedStory?.stories?.[currentMediaIndex];
  const isVideo = currentMedia?.type === 'video';
  const hasNextMedia = selectedStory && currentMediaIndex < (selectedStory.stories?.length || 0) - 1;
  const hasNextStory = selectedStory && currentStoryIndex < storiesData.length - 1;
  const hasPrevMedia = selectedStory && currentMediaIndex > 0;
  const hasPrevStory = selectedStory && currentStoryIndex > 0;
  const isSaved = selectedStory ? savedStories[selectedStory.id] : false;

  return (
    <>
      {/* Structured Data برای کل استوری‌ها */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "استوری‌های املاک",
          "description": "جدیدترین استوری‌های آژانس‌های املاک و مشاوران املاک در تهران",
          "numberOfItems": storiesData.length,
          "itemListElement": storiesData.slice(0, 10).map((story, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": story.name,
            "url": story.profileUrl || undefined,
            "image": story.avatar || story.stories?.[0]?.image,
            "description": story.stories?.map(s => s.caption).filter(Boolean).join(' - ') || `استوری ${story.name}`
          }))
        })}
      </script>

      {/* Structured Data برای استوری در حال نمایش */}
      {selectedStory && currentMedia && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MediaObject",
            "name": currentMedia.caption || `استوری ${selectedStory.name}`,
            "description": currentMedia.caption || `مشاهده استوری ${selectedStory.name} در سایت املاک`,
            "contentUrl": currentMedia.url,
            "thumbnailUrl": selectedStory.avatar,
            "uploadDate": currentMedia.timestamp || new Date().toISOString(),
            "author": {
              "@type": "Person",
              "name": selectedStory.name,
              "url": selectedStory.profileUrl
            }
          })}
        </script>
      )}

      {/* بخش استوری‌ها */}
      <section className={`stories-section ${className}`} aria-label="استوری‌های املاک">
        <div className="stories-container">
          <div className="stories-header">
            {/* <h2 className="stories-title">
              <span className="stories-title-icon">📸</span>
              استوری‌های امروز
            </h2>
            <button className="stories-watch-all" aria-label="مشاهده همه استوری‌ها">
              مشاهده همه
            </button> */}
          </div>
          
          <div className="stories-slider" role="region" aria-label="لیست استوری‌ها">
            {storiesData.map((story, idx) => (
              <div 
                key={story.id} 
                className="story-item"
                onClick={() => openStory(story, idx, 0)}
                role="button"
                tabIndex={0}
                aria-label={`مشاهده استوری ${story.name}`}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    openStory(story, idx, 0);
                  }
                }}
              >
                <div className={`story-avatar-wrapper ${story.isViewed ? 'viewed' : ''}`}>
                  <img 
                    src={story.avatar || story.stories?.[0]?.url} 
                    alt={`آواتار ${story.name}`}
                    className="story-avatar"
                    loading="lazy"
                    width="80"
                    height="80"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x80?text=User';
                    }}
                  />
                  {!story.isViewed && !story.isLive && (
                    <div className="story-unread-badge" aria-label="استوری جدید"></div>
                  )}
                </div>
                <span className="story-name">{story.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* مودال استوری */}
      {selectedStory && selectedStory.stories && currentMedia && (
        <div 
          className="story-modal"
          onClick={closeStory}
          role="dialog"
          aria-label={`استوری ${selectedStory.name}`}
          aria-modal="true"
        >
          <div className="story-modal-content" onClick={(e) => e.stopPropagation()}>
            
            {/* نوار پیشرفت */}
            <div className="story-progress-container" role="progressbar" aria-label="پیشرفت استوری">
              {selectedStory.stories.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`story-progress-bar ${idx === currentMediaIndex ? 'active' : ''} ${idx < currentMediaIndex ? 'completed' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (idx !== currentMediaIndex) {
                      // پاک کردن تایمرها
                      if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                        timeoutRef.current = null;
                      }
                      if (progressIntervalRef.current) {
                        clearInterval(progressIntervalRef.current);
                        progressIntervalRef.current = null;
                      }
                      setCurrentMediaIndex(idx);
                      setProgress(0);
                      setIsPaused(false);
                    }
                  }}
                  aria-label={`بخش ${idx + 1} از ${selectedStory.stories.length}`}
                >
                  <div 
                    className="story-progress-fill"
                    style={{ 
                      width: idx === currentMediaIndex ? `${progress}%` : idx < currentMediaIndex ? '100%' : '0%'
                    }}
                  />
                </div>
              ))}
            </div>

            {/* دکمه بستن */}
            <button 
              className="story-modal-close-top"
              onClick={(e) => {
                e.stopPropagation();
                closeStory();
              }}
              aria-label="بستن استوری"
            >
              ✕
            </button>

            {/* دکمه سیو */}
            <button 
              className={`story-save-btn ${isSaved ? 'saved' : ''}`}
              onClick={(e) => handleSaveStory(e, selectedStory)}
              aria-label={isSaved ? 'حذف از ذخیره شده‌ها' : 'ذخیره استوری'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
              <span className="sr-only">{isSaved ? 'ذخیره شده' : 'ذخیره استوری'}</span>
            </button>

            {/* هدر با اطلاعات کاربر */}
            <div className="story-modal-header">
              <div 
                className="story-profile-link"
                onClick={(e) => handleProfileClick(e, selectedStory)}
                role="link"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleProfileClick(e, selectedStory);
                  }
                }}
                aria-label={`مشاهده پروفایل ${selectedStory.name}`}
              >
                <img 
                  src={selectedStory.avatar || selectedStory.stories[0]?.url} 
                  alt={selectedStory.name}
                  className="story-modal-avatar"
                  width="40"
                  height="40"
                />
                <div className="story-modal-info">
                  <div className="story-modal-name">{selectedStory.name}</div>
                  <div className="story-modal-time">
                    {new Date(currentMedia.timestamp || Date.now()).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>

            {/* محتوای استوری */}
            <div 
              className="story-content"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {isVideo ? (
                <video 
                  ref={videoRef}
                  src={currentMedia.url}
                  className="story-media"
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnded}
                  aria-label={`ویدیوی استوری ${selectedStory.name}: ${currentMedia.caption || ''}`}
                  title={currentMedia.caption || `ویدیوی استوری ${selectedStory.name}`}
                />
              ) : (
                <img 
                  src={currentMedia.url} 
                  alt={currentMedia.caption || `استوری ${selectedStory.name}`}
                  className="story-media"
                  loading="lazy"
                  title={currentMedia.caption || `استوری ${selectedStory.name}`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x700?text=Story+Not+Found';
                  }}
                />
              )}
              
              {/* کپشن استوری */}
              {currentMedia.caption && (
                <div className="story-caption">
                  <p>{currentMedia.caption}</p>
                </div>
              )}

              {/* لینک استوری */}
              {currentMedia.link && (
                <a 
                  href={currentMedia.link}
                  className="story-link-btn"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={currentMedia.linkText || 'مشاهده بیشتر'}
                  onClick={(e) => e.stopPropagation()}
                >
                  {currentMedia.linkText || 'مشاهده بیشتر ←'}
                </a>
              )}
            </div>

            {/* دکمه‌های ناوبری */}
            <button 
              className={`story-nav-btn story-nav-prev ${(!hasPrevMedia && !hasPrevStory) ? 'hidden' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                prevMedia();
              }}
              aria-label="استوری قبلی"
            >
              <span aria-hidden="true">‹</span>
              <span className="sr-only">قبلی</span>
            </button>

            <button 
              className={`story-nav-btn story-nav-next ${(!hasNextMedia && !hasNextStory) ? 'hidden' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                nextMedia();
              }}
              aria-label="استوری بعدی"
            >
              <span aria-hidden="true">›</span>
              <span className="sr-only">بعدی</span>
            </button>

            {/* مناطق لمسی */}
            <div 
              className="story-touch-left" 
              onClick={(e) => {
                e.stopPropagation();
                prevMedia();
              }}
              aria-label="کلیک برای استوری قبلی"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  prevMedia();
                }
              }}
            />
            <div 
              className="story-touch-right" 
              onClick={(e) => {
                e.stopPropagation();
                nextMedia();
              }}
              aria-label="کلیک برای استوری بعدی"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  nextMedia();
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Stories;