// // // // // // // // // // src/components/Stories/Stories.jsx
// // // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // // import './Stories.css';

// // // // // // // // // const Stories = ({ 
// // // // // // // // //   storiesData, 
// // // // // // // // //   onStoryClick, 
// // // // // // // // //   autoPlayInterval = 5000,
// // // // // // // // //   className = '' 
// // // // // // // // // }) => {
// // // // // // // // //   const [selectedStory, setSelectedStory] = useState(null);
// // // // // // // // //   const [currentIndex, setCurrentIndex] = useState(0);
// // // // // // // // //   const [progress, setProgress] = useState(0);
// // // // // // // // //   const [isPaused, setIsPaused] = useState(false);
// // // // // // // // //   const progressIntervalRef = useRef(null);
// // // // // // // // //   const timeoutRef = useRef(null);

// // // // // // // // //   // باز کردن استوری
// // // // // // // // //   const openStory = (story, index) => {
// // // // // // // // //     setSelectedStory(story);
// // // // // // // // //     setCurrentIndex(index);
// // // // // // // // //     setProgress(0);
// // // // // // // // //     if (onStoryClick) onStoryClick(story);
// // // // // // // // //   };

// // // // // // // // //   // بستن استوری
// // // // // // // // //   const closeStory = () => {
// // // // // // // // //     setSelectedStory(null);
// // // // // // // // //     setCurrentIndex(0);
// // // // // // // // //     setProgress(0);
// // // // // // // // //     if (progressIntervalRef.current) {
// // // // // // // // //       clearInterval(progressIntervalRef.current);
// // // // // // // // //     }
// // // // // // // // //     if (timeoutRef.current) {
// // // // // // // // //       clearTimeout(timeoutRef.current);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // رفتن به استوری بعدی
// // // // // // // // //   const nextStory = () => {
// // // // // // // // //     if (currentIndex < (selectedStory?.stories?.length || 0) - 1) {
// // // // // // // // //       setCurrentIndex(prev => prev + 1);
// // // // // // // // //       setProgress(0);
// // // // // // // // //     } else {
// // // // // // // // //       // اگر استوری بعدی در آرایه اصلی وجود داشت
// // // // // // // // //       const currentStoryIndex = storiesData.findIndex(s => s.id === selectedStory?.id);
// // // // // // // // //       if (currentStoryIndex < storiesData.length - 1) {
// // // // // // // // //         openStory(storiesData[currentStoryIndex + 1], 0);
// // // // // // // // //       } else {
// // // // // // // // //         closeStory();
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // رفتن به استوری قبلی
// // // // // // // // //   const prevStory = () => {
// // // // // // // // //     if (currentIndex > 0) {
// // // // // // // // //       setCurrentIndex(prev => prev - 1);
// // // // // // // // //       setProgress(0);
// // // // // // // // //     } else {
// // // // // // // // //       const currentStoryIndex = storiesData.findIndex(s => s.id === selectedStory?.id);
// // // // // // // // //       if (currentStoryIndex > 0) {
// // // // // // // // //         openStory(storiesData[currentStoryIndex - 1], storiesData[currentStoryIndex - 1]?.stories?.length - 1 || 0);
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // مدیریت تایمر پیشرفت
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (selectedStory && !isPaused) {
// // // // // // // // //       if (progressIntervalRef.current) {
// // // // // // // // //         clearInterval(progressIntervalRef.current);
// // // // // // // // //       }
      
// // // // // // // // //       const interval = setInterval(() => {
// // // // // // // // //         setProgress(prev => {
// // // // // // // // //           if (prev >= 100) {
// // // // // // // // //             clearInterval(interval);
// // // // // // // // //             nextStory();
// // // // // // // // //             return 0;
// // // // // // // // //           }
// // // // // // // // //           return prev + (100 / (autoPlayInterval / 100));
// // // // // // // // //         });
// // // // // // // // //       }, 100);
      
// // // // // // // // //       progressIntervalRef.current = interval;
      
// // // // // // // // //       return () => {
// // // // // // // // //         clearInterval(interval);
// // // // // // // // //       };
// // // // // // // // //     }
// // // // // // // // //   }, [selectedStory, currentIndex, isPaused, autoPlayInterval]);

// // // // // // // // //   // ریست تایمر هنگام تغییر استوری
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (selectedStory) {
// // // // // // // // //       setProgress(0);
// // // // // // // // //     }
// // // // // // // // //   }, [currentIndex, selectedStory]);

// // // // // // // // //   return (
// // // // // // // // //     <>
// // // // // // // // //       {/* بخش استوری‌ها */}
// // // // // // // // //       <div className={`stories-section ${className}`}>
// // // // // // // // //         <div className="stories-container">
// // // // // // // // //           <div className="stories-header">
// // // // // // // // //             {/* <h3 className="stories-title">
// // // // // // // // //               <span className="stories-title-icon">📸</span>
// // // // // // // // //               استوری‌های امروز
// // // // // // // // //             </h3>
// // // // // // // // //             <button className="stories-watch-all">مشاهده همه</button> */}
// // // // // // // // //           </div>
          
// // // // // // // // //           <div className="stories-slider">
// // // // // // // // //             {storiesData.map((story, index) => (
// // // // // // // // //               <div 
// // // // // // // // //                 key={story.id} 
// // // // // // // // //                 className="story-item"
// // // // // // // // //                 onClick={() => openStory(story, 0)}
// // // // // // // // //               >
// // // // // // // // //                 <div className={`story-avatar-wrapper ${story.isViewed ? 'viewed' : ''}`}>
// // // // // // // // //                   <img 
// // // // // // // // //                     src={story.avatar || story.stories?.[0]?.image} 
// // // // // // // // //                     alt={story.name}
// // // // // // // // //                     className="story-avatar"
// // // // // // // // //                     onError={(e) => {
// // // // // // // // //                       e.target.src = 'https://via.placeholder.com/80x80?text=User';
// // // // // // // // //                     }}
// // // // // // // // //                   />
// // // // // // // // //                   {story.isLive && (
// // // // // // // // //                     <div className="story-live-badge">
// // // // // // // // //                       <span>●</span> زنده
// // // // // // // // //                     </div>
// // // // // // // // //                   )}
// // // // // // // // //                   {!story.isViewed && !story.isLive && (
// // // // // // // // //                     <div className="story-unread-badge"></div>
// // // // // // // // //                   )}
// // // // // // // // //                 </div>
// // // // // // // // //                 <span className="story-name">{story.name}</span>
// // // // // // // // //               </div>
// // // // // // // // //             ))}
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* مودال نمایش استوری */}
// // // // // // // // //       {selectedStory && selectedStory.stories && (
// // // // // // // // //         <div 
// // // // // // // // //           className="story-modal"
// // // // // // // // //           onClick={(e) => {
// // // // // // // // //             if (e.target === e.currentTarget) closeStory();
// // // // // // // // //           }}
// // // // // // // // //         >
// // // // // // // // //           <div className="story-modal-content">
// // // // // // // // //             {/* هدر مودال */}
// // // // // // // // //             <div className="story-modal-header">
// // // // // // // // //               <img 
// // // // // // // // //                 src={selectedStory.avatar || selectedStory.stories[0]?.image} 
// // // // // // // // //                 alt={selectedStory.name}
// // // // // // // // //                 className="story-modal-avatar"
// // // // // // // // //               />
// // // // // // // // //               <div className="story-modal-info">
// // // // // // // // //                 <div className="story-modal-name">{selectedStory.name}</div>
// // // // // // // // //                 <div className="story-modal-time">
// // // // // // // // //                   {new Date(selectedStory.stories[currentIndex]?.timestamp || Date.now()).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
// // // // // // // // //                 </div>
// // // // // // // // //               </div>
// // // // // // // // //               <button className="story-modal-close" onClick={closeStory}>✕</button>
// // // // // // // // //             </div>

// // // // // // // // //             {/* نوار پیشرفت */}
// // // // // // // // //             <div className="story-progress-container">
// // // // // // // // //               {selectedStory.stories.map((_, idx) => (
// // // // // // // // //                 <div 
// // // // // // // // //                   key={idx} 
// // // // // // // // //                   className={`story-progress-bar ${idx === currentIndex ? 'active' : ''} ${idx < currentIndex ? 'completed' : ''}`}
// // // // // // // // //                 >
// // // // // // // // //                   <div 
// // // // // // // // //                     className="story-progress-fill"
// // // // // // // // //                     style={{ 
// // // // // // // // //                       width: idx === currentIndex ? `${progress}%` : idx < currentIndex ? '100%' : '0%'
// // // // // // // // //                     }}
// // // // // // // // //                   />
// // // // // // // // //                 </div>
// // // // // // // // //               ))}
// // // // // // // // //             </div>

// // // // // // // // //             {/* محتوای استوری */}
// // // // // // // // //             <div 
// // // // // // // // //               className="story-content"
// // // // // // // // //               onMouseEnter={() => setIsPaused(true)}
// // // // // // // // //               onMouseLeave={() => setIsPaused(false)}
// // // // // // // // //             >
// // // // // // // // //               {selectedStory.stories[currentIndex]?.type === 'video' ? (
// // // // // // // // //                 <video 
// // // // // // // // //                   src={selectedStory.stories[currentIndex].url}
// // // // // // // // //                   className="story-media"
// // // // // // // // //                   autoPlay
// // // // // // // // //                   muted
// // // // // // // // //                   onEnded={nextStory}
// // // // // // // // //                 />
// // // // // // // // //               ) : (
// // // // // // // // //                 <img 
// // // // // // // // //                   src={selectedStory.stories[currentIndex]?.url} 
// // // // // // // // //                   alt={`استوری ${selectedStory.name}`}
// // // // // // // // //                   className="story-media"
// // // // // // // // //                   onError={(e) => {
// // // // // // // // //                     e.target.src = 'https://via.placeholder.com/400x700?text=Story+Not+Found';
// // // // // // // // //                   }}
// // // // // // // // //                 />
// // // // // // // // //               )}
              
// // // // // // // // //               {/* کپشن استوری */}
// // // // // // // // //               {selectedStory.stories[currentIndex]?.caption && (
// // // // // // // // //                 <div className="story-caption">
// // // // // // // // //                   {selectedStory.stories[currentIndex].caption}
// // // // // // // // //                 </div>
// // // // // // // // //               )}

// // // // // // // // //               {/* دکمه لینک (اگر وجود داشته باشد) */}
// // // // // // // // //               {selectedStory.stories[currentIndex]?.link && (
// // // // // // // // //                 <a 
// // // // // // // // //                   href={selectedStory.stories[currentIndex].link}
// // // // // // // // //                   className="story-link-btn"
// // // // // // // // //                   target="_blank"
// // // // // // // // //                   rel="noopener noreferrer"
// // // // // // // // //                 >
// // // // // // // // //                   {selectedStory.stories[currentIndex].linkText || 'مشاهده بیشتر ←'}
// // // // // // // // //                 </a>
// // // // // // // // //               )}
// // // // // // // // //             </div>

// // // // // // // // //             {/* ناوبری لمسی */}
// // // // // // // // //             <div className="story-navigation">
// // // // // // // // //               <div className="story-nav-left" onClick={prevStory}>
// // // // // // // // //                 <div className="story-nav-hint">‹</div>
// // // // // // // // //               </div>
// // // // // // // // //               <div className="story-nav-right" onClick={nextStory}>
// // // // // // // // //                 <div className="story-nav-hint">›</div>
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       )}
// // // // // // // // //     </>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default Stories;

// // // // // // // // // src/components/Stories/Stories.jsx
// // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // import './Stories.css';

// // // // // // // // const Stories = ({ 
// // // // // // // //   storiesData, 
// // // // // // // //   onStoryClick, 
// // // // // // // //   autoPlayInterval = 5000,
// // // // // // // //   className = '' 
// // // // // // // // }) => {
// // // // // // // //   const [selectedStory, setSelectedStory] = useState(null);
// // // // // // // //   const [currentIndex, setCurrentIndex] = useState(0);
// // // // // // // //   const [progress, setProgress] = useState(0);
// // // // // // // //   const [isPaused, setIsPaused] = useState(false);
// // // // // // // //   const progressIntervalRef = useRef(null);
// // // // // // // //   const timeoutRef = useRef(null);

// // // // // // // //   // باز کردن استوری
// // // // // // // //   const openStory = (story, index) => {
// // // // // // // //     setSelectedStory(story);
// // // // // // // //     setCurrentIndex(index);
// // // // // // // //     setProgress(0);
// // // // // // // //     if (onStoryClick) onStoryClick(story);
// // // // // // // //   };

// // // // // // // //   // بستن استوری
// // // // // // // //   const closeStory = () => {
// // // // // // // //     setSelectedStory(null);
// // // // // // // //     setCurrentIndex(0);
// // // // // // // //     setProgress(0);
// // // // // // // //     if (progressIntervalRef.current) {
// // // // // // // //       clearInterval(progressIntervalRef.current);
// // // // // // // //     }
// // // // // // // //     if (timeoutRef.current) {
// // // // // // // //       clearTimeout(timeoutRef.current);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // رفتن به استوری بعدی
// // // // // // // //   const nextStory = () => {
// // // // // // // //     if (currentIndex < (selectedStory?.stories?.length || 0) - 1) {
// // // // // // // //       setCurrentIndex(prev => prev + 1);
// // // // // // // //       setProgress(0);
// // // // // // // //     } else {
// // // // // // // //       const currentStoryIndex = storiesData.findIndex(s => s.id === selectedStory?.id);
// // // // // // // //       if (currentStoryIndex < storiesData.length - 1) {
// // // // // // // //         openStory(storiesData[currentStoryIndex + 1], 0);
// // // // // // // //       } else {
// // // // // // // //         closeStory();
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // رفتن به استوری قبلی
// // // // // // // //   const prevStory = () => {
// // // // // // // //     if (currentIndex > 0) {
// // // // // // // //       setCurrentIndex(prev => prev - 1);
// // // // // // // //       setProgress(0);
// // // // // // // //     } else {
// // // // // // // //       const currentStoryIndex = storiesData.findIndex(s => s.id === selectedStory?.id);
// // // // // // // //       if (currentStoryIndex > 0) {
// // // // // // // //         openStory(storiesData[currentStoryIndex - 1], storiesData[currentStoryIndex - 1]?.stories?.length - 1 || 0);
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // مدیریت تایمر پیشرفت
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (selectedStory && !isPaused) {
// // // // // // // //       if (progressIntervalRef.current) {
// // // // // // // //         clearInterval(progressIntervalRef.current);
// // // // // // // //       }
      
// // // // // // // //       const interval = setInterval(() => {
// // // // // // // //         setProgress(prev => {
// // // // // // // //           if (prev >= 100) {
// // // // // // // //             clearInterval(interval);
// // // // // // // //             nextStory();
// // // // // // // //             return 0;
// // // // // // // //           }
// // // // // // // //           return prev + (100 / (autoPlayInterval / 100));
// // // // // // // //         });
// // // // // // // //       }, 100);
      
// // // // // // // //       progressIntervalRef.current = interval;
      
// // // // // // // //       return () => {
// // // // // // // //         clearInterval(interval);
// // // // // // // //       };
// // // // // // // //     }
// // // // // // // //   }, [selectedStory, currentIndex, isPaused, autoPlayInterval]);

// // // // // // // //   // ریست تایمر هنگام تغییر استوری
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (selectedStory) {
// // // // // // // //       setProgress(0);
// // // // // // // //     }
// // // // // // // //   }, [currentIndex, selectedStory]);

// // // // // // // //   // Structured Data برای استوری‌ها
// // // // // // // //   const storiesSchema = {
// // // // // // // //     "@context": "https://schema.org",
// // // // // // // //     "@type": "ItemList",
// // // // // // // //     "name": "استوری‌های املاک",
// // // // // // // //     "description": "جدیدترین استوری‌های آژانس‌های املاک و مشاوران املاک",
// // // // // // // //     "numberOfItems": storiesData.length,
// // // // // // // //     "itemListElement": storiesData.slice(0, 10).map((story, index) => ({
// // // // // // // //       "@type": "ListItem",
// // // // // // // //       "position": index + 1,
// // // // // // // //       "name": story.name,
// // // // // // // //       "url": story.stories?.[0]?.link || undefined,
// // // // // // // //       "image": story.avatar || story.stories?.[0]?.image,
// // // // // // // //       "description": story.stories?.map(s => s.caption).filter(Boolean).join(' - ')
// // // // // // // //     }))
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <>
// // // // // // // //       {/* Structured Data برای سئو */}
// // // // // // // //       <script type="application/ld+json">
// // // // // // // //         {JSON.stringify(storiesSchema)}
// // // // // // // //       </script>

// // // // // // // //       {/* بخش استوری‌ها */}
// // // // // // // //       <section className={`stories-section ${className}`} aria-label="استوری‌های املاک">
// // // // // // // //         <div className="stories-container">
// // // // // // // //           <div className="stories-header">
// // // // // // // //             {/* هدر برای سئو بهتر - hidden but accessible */}
// // // // // // // //             <h2 className="sr-only">استوری‌های امروز آژانس‌های املاک</h2>
// // // // // // // //           </div>
          
// // // // // // // //           <div className="stories-slider" role="region" aria-label="لیست استوری‌ها">
// // // // // // // //             {storiesData.map((story, index) => (
// // // // // // // //               <div 
// // // // // // // //                 key={story.id} 
// // // // // // // //                 className="story-item"
// // // // // // // //                 onClick={() => openStory(story, 0)}
// // // // // // // //                 role="button"
// // // // // // // //                 tabIndex={0}
// // // // // // // //                 aria-label={`مشاهده استوری ${story.name}`}
// // // // // // // //                 onKeyPress={(e) => {
// // // // // // // //                   if (e.key === 'Enter' || e.key === ' ') {
// // // // // // // //                     openStory(story, 0);
// // // // // // // //                   }
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 <div className={`story-avatar-wrapper ${story.isViewed ? 'viewed' : ''}`}>
// // // // // // // //                   <img 
// // // // // // // //                     src={story.avatar || story.stories?.[0]?.image} 
// // // // // // // //                     alt={`آواتار ${story.name}`}
// // // // // // // //                     className="story-avatar"
// // // // // // // //                     loading="lazy"
// // // // // // // //                     width="80"
// // // // // // // //                     height="80"
// // // // // // // //                     onError={(e) => {
// // // // // // // //                       e.target.src = 'https://via.placeholder.com/80x80?text=User';
// // // // // // // //                     }}
// // // // // // // //                   />
// // // // // // // //                   {story.isLive && (
// // // // // // // //                     <div className="story-live-badge" aria-label="پخش زنده">
// // // // // // // //                       <span aria-hidden="true">●</span> زنده
// // // // // // // //                     </div>
// // // // // // // //                   )}
// // // // // // // //                   {!story.isViewed && !story.isLive && (
// // // // // // // //                     <div className="story-unread-badge" aria-label="استوری جدید"></div>
// // // // // // // //                   )}
// // // // // // // //                 </div>
// // // // // // // //                 <span className="story-name">{story.name}</span>
// // // // // // // //               </div>
// // // // // // // //             ))}
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </section>

// // // // // // // //       {/* مودال نمایش استوری */}
// // // // // // // //       {selectedStory && selectedStory.stories && (
// // // // // // // //         <div 
// // // // // // // //           className="story-modal"
// // // // // // // //           onClick={(e) => {
// // // // // // // //             if (e.target === e.currentTarget) closeStory();
// // // // // // // //           }}
// // // // // // // //           role="dialog"
// // // // // // // //           aria-label={`استوری ${selectedStory.name}`}
// // // // // // // //           aria-modal="true"
// // // // // // // //         >
// // // // // // // //           <div className="story-modal-content">
// // // // // // // //             {/* هدر مودال */}
// // // // // // // //             <div className="story-modal-header">
// // // // // // // //               <img 
// // // // // // // //                 src={selectedStory.avatar || selectedStory.stories[0]?.image} 
// // // // // // // //                 alt={selectedStory.name}
// // // // // // // //                 className="story-modal-avatar"
// // // // // // // //                 width="40"
// // // // // // // //                 height="40"
// // // // // // // //               />
// // // // // // // //               <div className="story-modal-info">
// // // // // // // //                 <div className="story-modal-name">{selectedStory.name}</div>
// // // // // // // //                 <div className="story-modal-time">
// // // // // // // //                   {new Date(selectedStory.stories[currentIndex]?.timestamp || Date.now()).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
// // // // // // // //                 </div>
// // // // // // // //               </div>
// // // // // // // //               <button 
// // // // // // // //                 className="story-modal-close" 
// // // // // // // //                 onClick={closeStory}
// // // // // // // //                 aria-label="بستن استوری"
// // // // // // // //               >
// // // // // // // //                 ✕
// // // // // // // //               </button>
// // // // // // // //             </div>

// // // // // // // //             {/* نوار پیشرفت */}
// // // // // // // //             <div className="story-progress-container" role="progressbar" aria-label="پیشرفت استوری">
// // // // // // // //               {selectedStory.stories.map((_, idx) => (
// // // // // // // //                 <div 
// // // // // // // //                   key={idx} 
// // // // // // // //                   className={`story-progress-bar ${idx === currentIndex ? 'active' : ''} ${idx < currentIndex ? 'completed' : ''}`}
// // // // // // // //                 >
// // // // // // // //                   <div 
// // // // // // // //                     className="story-progress-fill"
// // // // // // // //                     style={{ 
// // // // // // // //                       width: idx === currentIndex ? `${progress}%` : idx < currentIndex ? '100%' : '0%'
// // // // // // // //                     }}
// // // // // // // //                   />
// // // // // // // //                 </div>
// // // // // // // //               ))}
// // // // // // // //             </div>

// // // // // // // //             {/* محتوای استوری */}
// // // // // // // //             <div 
// // // // // // // //               className="story-content"
// // // // // // // //               onMouseEnter={() => setIsPaused(true)}
// // // // // // // //               onMouseLeave={() => setIsPaused(false)}
// // // // // // // //             >
// // // // // // // //               {selectedStory.stories[currentIndex]?.type === 'video' ? (
// // // // // // // //                 <video 
// // // // // // // //                   src={selectedStory.stories[currentIndex].url}
// // // // // // // //                   className="story-media"
// // // // // // // //                   autoPlay
// // // // // // // //                   muted
// // // // // // // //                   onEnded={nextStory}
// // // // // // // //                   aria-label={`ویدیوی استوری ${selectedStory.name}`}
// // // // // // // //                 />
// // // // // // // //               ) : (
// // // // // // // //                 <img 
// // // // // // // //                   src={selectedStory.stories[currentIndex]?.url} 
// // // // // // // //                   alt={selectedStory.stories[currentIndex]?.caption || `استوری ${selectedStory.name}`}
// // // // // // // //                   className="story-media"
// // // // // // // //                   loading="lazy"
// // // // // // // //                   onError={(e) => {
// // // // // // // //                     e.target.src = 'https://via.placeholder.com/400x700?text=Story+Not+Found';
// // // // // // // //                   }}
// // // // // // // //                 />
// // // // // // // //               )}
              
// // // // // // // //               {/* کپشن استوری */}
// // // // // // // //               {selectedStory.stories[currentIndex]?.caption && (
// // // // // // // //                 <div className="story-caption">
// // // // // // // //                   <p>{selectedStory.stories[currentIndex].caption}</p>
// // // // // // // //                 </div>
// // // // // // // //               )}

// // // // // // // //               {/* دکمه لینک (اگر وجود داشته باشد) */}
// // // // // // // //               {selectedStory.stories[currentIndex]?.link && (
// // // // // // // //                 <a 
// // // // // // // //                   href={selectedStory.stories[currentIndex].link}
// // // // // // // //                   className="story-link-btn"
// // // // // // // //                   target="_blank"
// // // // // // // //                   rel="noopener noreferrer"
// // // // // // // //                   aria-label={selectedStory.stories[currentIndex].linkText || 'مشاهده بیشتر'}
// // // // // // // //                 >
// // // // // // // //                   {selectedStory.stories[currentIndex].linkText || 'مشاهده بیشتر ←'}
// // // // // // // //                 </a>
// // // // // // // //               )}
// // // // // // // //             </div>

// // // // // // // //             {/* ناوبری لمسی */}
// // // // // // // //             <div className="story-navigation">
// // // // // // // //               <button 
// // // // // // // //                 className="story-nav-left" 
// // // // // // // //                 onClick={prevStory}
// // // // // // // //                 aria-label="استوری قبلی"
// // // // // // // //               >
// // // // // // // //                 <div className="story-nav-hint" aria-hidden="true">‹</div>
// // // // // // // //               </button>
// // // // // // // //               <button 
// // // // // // // //                 className="story-nav-right" 
// // // // // // // //                 onClick={nextStory}
// // // // // // // //                 aria-label="استوری بعدی"
// // // // // // // //               >
// // // // // // // //                 <div className="story-nav-hint" aria-hidden="true">›</div>
// // // // // // // //               </button>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       )}
// // // // // // // //     </>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default Stories;
// // // // // // // // src/components/Stories/Stories.jsx
// // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // import './Stories.css';

// // // // // // // const Stories = ({ 
// // // // // // //   storiesData, 
// // // // // // //   onStoryClick, 
// // // // // // //   autoPlayInterval = 5000,
// // // // // // //   className = '' 
// // // // // // // }) => {
// // // // // // //   const [selectedStory, setSelectedStory] = useState(null);
// // // // // // //   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
// // // // // // //   const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
// // // // // // //   const [progress, setProgress] = useState(0);
// // // // // // //   const [isPaused, setIsPaused] = useState(false);
// // // // // // //   const progressIntervalRef = useRef(null);
// // // // // // //   const videoRef = useRef(null);

// // // // // // //   // باز کردن استوری
// // // // // // //   const openStory = (story, storyIdx, mediaIdx = 0) => {
// // // // // // //     setSelectedStory(story);
// // // // // // //     setCurrentStoryIndex(storyIdx);
// // // // // // //     setCurrentMediaIndex(mediaIdx);
// // // // // // //     setProgress(0);
// // // // // // //     setIsPaused(false);
// // // // // // //     if (onStoryClick) onStoryClick(story);
// // // // // // //   };

// // // // // // //   // بستن استوری
// // // // // // //   const closeStory = () => {
// // // // // // //     setSelectedStory(null);
// // // // // // //     setCurrentStoryIndex(0);
// // // // // // //     setCurrentMediaIndex(0);
// // // // // // //     setProgress(0);
// // // // // // //     setIsPaused(false);
// // // // // // //     if (progressIntervalRef.current) {
// // // // // // //       clearInterval(progressIntervalRef.current);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // رفتن به مدیای بعدی در استوری فعلی
// // // // // // //   const nextMedia = () => {
// // // // // // //     if (!selectedStory) return;
    
// // // // // // //     const currentStoryMedia = selectedStory.stories;
// // // // // // //     const isLastMedia = currentMediaIndex >= currentStoryMedia.length - 1;
    
// // // // // // //     if (!isLastMedia) {
// // // // // // //       // برو به مدیای بعدی در همان استوری
// // // // // // //       setCurrentMediaIndex(prev => prev + 1);
// // // // // // //       setProgress(0);
// // // // // // //     } else {
// // // // // // //       // استوری فعلی تموم شد، برو به استوری بعدی
// // // // // // //       nextStory();
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // رفتن به مدیای قبلی در استوری فعلی
// // // // // // //   const prevMedia = () => {
// // // // // // //     if (!selectedStory) return;
    
// // // // // // //     const isFirstMedia = currentMediaIndex <= 0;
    
// // // // // // //     if (!isFirstMedia) {
// // // // // // //       // برو به مدیای قبلی در همان استوری
// // // // // // //       setCurrentMediaIndex(prev => prev - 1);
// // // // // // //       setProgress(0);
// // // // // // //     } else {
// // // // // // //       // برو به استوری قبلی
// // // // // // //       prevStory();
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // رفتن به استوری بعدی
// // // // // // //   const nextStory = () => {
// // // // // // //     if (!selectedStory) return;
    
// // // // // // //     const isLastStory = currentStoryIndex >= storiesData.length - 1;
    
// // // // // // //     if (!isLastStory) {
// // // // // // //       // برو به استوری بعدی از اول
// // // // // // //       const nextStoryData = storiesData[currentStoryIndex + 1];
// // // // // // //       openStory(nextStoryData, currentStoryIndex + 1, 0);
// // // // // // //     } else {
// // // // // // //       // آخرین استوری بود، ببند
// // // // // // //       closeStory();
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // رفتن به استوری قبلی
// // // // // // //   const prevStory = () => {
// // // // // // //     if (!selectedStory) return;
    
// // // // // // //     const isFirstStory = currentStoryIndex <= 0;
    
// // // // // // //     if (!isFirstStory) {
// // // // // // //       // برو به استوری قبلی، آخرین مدیای اون
// // // // // // //       const prevStoryData = storiesData[currentStoryIndex - 1];
// // // // // // //       const lastMediaIndex = (prevStoryData.stories?.length || 1) - 1;
// // // // // // //       openStory(prevStoryData, currentStoryIndex - 1, lastMediaIndex);
// // // // // // //     }
// // // // // // //     // اگر اولین استوری بود، هیچ کاری نکن
// // // // // // //   };

// // // // // // //   // مدیریت تایمر پیشرفت برای تصاویر
// // // // // // //   useEffect(() => {
// // // // // // //     if (!selectedStory) return;
    
// // // // // // //     const currentMedia = selectedStory.stories[currentMediaIndex];
    
// // // // // // //     // اگه ویدیو بود، تایمر دستی نداریم (از event video استفاده می‌کنیم)
// // // // // // //     if (currentMedia?.type === 'video') {
// // // // // // //       if (progressIntervalRef.current) {
// // // // // // //         clearInterval(progressIntervalRef.current);
// // // // // // //       }
// // // // // // //       return;
// // // // // // //     }
    
// // // // // // //     // برای تصاویر، تایمر پیشرفت راه میندازیم
// // // // // // //     if (!isPaused) {
// // // // // // //       if (progressIntervalRef.current) {
// // // // // // //         clearInterval(progressIntervalRef.current);
// // // // // // //       }
      
// // // // // // //       const interval = setInterval(() => {
// // // // // // //         setProgress(prev => {
// // // // // // //           if (prev >= 100) {
// // // // // // //             clearInterval(interval);
// // // // // // //             nextMedia();
// // // // // // //             return 0;
// // // // // // //           }
// // // // // // //           return prev + (100 / (autoPlayInterval / 100));
// // // // // // //         });
// // // // // // //       }, 100);
      
// // // // // // //       progressIntervalRef.current = interval;
      
// // // // // // //       return () => {
// // // // // // //         clearInterval(interval);
// // // // // // //       };
// // // // // // //     }
// // // // // // //   }, [selectedStory, currentMediaIndex, isPaused, autoPlayInterval]);

// // // // // // //   // وقتی مدیا عوض میشه، progress رو ریست کن
// // // // // // //   useEffect(() => {
// // // // // // //     setProgress(0);
// // // // // // //     // اگر مدیا جدید ویدیو بود و ref داریم، پخش کن
// // // // // // //     if (videoRef.current && selectedStory?.stories[currentMediaIndex]?.type === 'video') {
// // // // // // //       videoRef.current.currentTime = 0;
// // // // // // //       videoRef.current.play().catch(e => console.log('Video play error:', e));
// // // // // // //     }
// // // // // // //   }, [currentMediaIndex, selectedStory]);

// // // // // // //   // هندلر پایان ویدیو
// // // // // // //   const handleVideoEnded = () => {
// // // // // // //     nextMedia();
// // // // // // //   };

// // // // // // //   if (!storiesData || storiesData.length === 0) {
// // // // // // //     return null;
// // // // // // //   }

// // // // // // //   const currentMedia = selectedStory?.stories?.[currentMediaIndex];
// // // // // // //   const isVideo = currentMedia?.type === 'video';

// // // // // // //   return (
// // // // // // //     <>
// // // // // // //       {/* Structured Data برای سئو */}
// // // // // // //       <script type="application/ld+json">
// // // // // // //         {JSON.stringify({
// // // // // // //           "@context": "https://schema.org",
// // // // // // //           "@type": "ItemList",
// // // // // // //           "name": "استوری‌های املاک",
// // // // // // //           "description": "جدیدترین استوری‌های آژانس‌های املاک و مشاوران املاک",
// // // // // // //           "numberOfItems": storiesData.length,
// // // // // // //           "itemListElement": storiesData.slice(0, 10).map((story, index) => ({
// // // // // // //             "@type": "ListItem",
// // // // // // //             "position": index + 1,
// // // // // // //             "name": story.name,
// // // // // // //             "image": story.avatar || story.stories?.[0]?.image,
// // // // // // //           }))
// // // // // // //         })}
// // // // // // //       </script>

// // // // // // //       {/* بخش استوری‌ها */}
// // // // // // //       <section className={`stories-section ${className}`} aria-label="استوری‌های املاک">
// // // // // // //         <div className="stories-container">
// // // // // // //           <div className="stories-header">
// // // // // // //             <h2 className="sr-only">استوری‌های امروز آژانس‌های املاک</h2>
// // // // // // //           </div>
          
// // // // // // //           <div className="stories-slider" role="region" aria-label="لیست استوری‌ها">
// // // // // // //             {storiesData.map((story, idx) => (
// // // // // // //               <div 
// // // // // // //                 key={story.id} 
// // // // // // //                 className="story-item"
// // // // // // //                 onClick={() => openStory(story, idx, 0)}
// // // // // // //                 role="button"
// // // // // // //                 tabIndex={0}
// // // // // // //                 aria-label={`مشاهده استوری ${story.name}`}
// // // // // // //                 onKeyPress={(e) => {
// // // // // // //                   if (e.key === 'Enter' || e.key === ' ') {
// // // // // // //                     openStory(story, idx, 0);
// // // // // // //                   }
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 <div className={`story-avatar-wrapper ${story.isViewed ? 'viewed' : ''}`}>
// // // // // // //                   <img 
// // // // // // //                     src={story.avatar || story.stories?.[0]?.image} 
// // // // // // //                     alt={`آواتار ${story.name}`}
// // // // // // //                     className="story-avatar"
// // // // // // //                     loading="lazy"
// // // // // // //                     width="80"
// // // // // // //                     height="80"
// // // // // // //                     onError={(e) => {
// // // // // // //                       e.target.src = 'https://via.placeholder.com/80x80?text=User';
// // // // // // //                     }}
// // // // // // //                   />
// // // // // // //                   {story.isLive && (
// // // // // // //                     <div className="story-live-badge" aria-label="پخش زنده">
// // // // // // //                       <span aria-hidden="true">●</span> زنده
// // // // // // //                     </div>
// // // // // // //                   )}
// // // // // // //                   {!story.isViewed && !story.isLive && (
// // // // // // //                     <div className="story-unread-badge" aria-label="استوری جدید"></div>
// // // // // // //                   )}
// // // // // // //                 </div>
// // // // // // //                 <span className="story-name">{story.name}</span>
// // // // // // //               </div>
// // // // // // //             ))}
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </section>

// // // // // // //       {/* مودال نمایش استوری */}
// // // // // // //       {selectedStory && selectedStory.stories && currentMedia && (
// // // // // // //         <div 
// // // // // // //           className="story-modal"
// // // // // // //           onClick={(e) => {
// // // // // // //             if (e.target === e.currentTarget) closeStory();
// // // // // // //           }}
// // // // // // //           role="dialog"
// // // // // // //           aria-label={`استوری ${selectedStory.name}`}
// // // // // // //           aria-modal="true"
// // // // // // //         >
// // // // // // //           <div className="story-modal-content">
// // // // // // //             {/* هدر مودال */}
// // // // // // //             <div className="story-modal-header">
// // // // // // //               <img 
// // // // // // //                 src={selectedStory.avatar || selectedStory.stories[0]?.image} 
// // // // // // //                 alt={selectedStory.name}
// // // // // // //                 className="story-modal-avatar"
// // // // // // //                 width="40"
// // // // // // //                 height="40"
// // // // // // //               />
// // // // // // //               <div className="story-modal-info">
// // // // // // //                 <div className="story-modal-name">{selectedStory.name}</div>
// // // // // // //                 <div className="story-modal-time">
// // // // // // //                   {new Date(currentMedia.timestamp || Date.now()).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //               <button 
// // // // // // //                 className="story-modal-close" 
// // // // // // //                 onClick={closeStory}
// // // // // // //                 aria-label="بستن استوری"
// // // // // // //               >
// // // // // // //                 ✕
// // // // // // //               </button>
// // // // // // //             </div>

// // // // // // //             {/* نوار پیشرفت */}
// // // // // // //             <div className="story-progress-container" role="progressbar" aria-label="پیشرفت استوری">
// // // // // // //               {selectedStory.stories.map((_, idx) => (
// // // // // // //                 <div 
// // // // // // //                   key={idx} 
// // // // // // //                   className={`story-progress-bar ${idx === currentMediaIndex ? 'active' : ''} ${idx < currentMediaIndex ? 'completed' : ''}`}
// // // // // // //                   onClick={(e) => {
// // // // // // //                     e.stopPropagation();
// // // // // // //                     if (idx !== currentMediaIndex) {
// // // // // // //                       setCurrentMediaIndex(idx);
// // // // // // //                       setProgress(0);
// // // // // // //                     }
// // // // // // //                   }}
// // // // // // //                 >
// // // // // // //                   <div 
// // // // // // //                     className="story-progress-fill"
// // // // // // //                     style={{ 
// // // // // // //                       width: idx === currentMediaIndex ? `${progress}%` : idx < currentMediaIndex ? '100%' : '0%'
// // // // // // //                     }}
// // // // // // //                   />
// // // // // // //                 </div>
// // // // // // //               ))}
// // // // // // //             </div>

// // // // // // //             {/* محتوای استوری */}
// // // // // // //             <div 
// // // // // // //               className="story-content"
// // // // // // //               onMouseEnter={() => setIsPaused(true)}
// // // // // // //               onMouseLeave={() => setIsPaused(false)}
// // // // // // //               onClick={(e) => {
// // // // // // //                 // کلیک وسط برای جلو/عقب
// // // // // // //                 const rect = e.currentTarget.getBoundingClientRect();
// // // // // // //                 const x = e.clientX - rect.left;
// // // // // // //                 if (x < rect.width / 2) {
// // // // // // //                   prevMedia();
// // // // // // //                 } else {
// // // // // // //                   nextMedia();
// // // // // // //                 }
// // // // // // //               }}
// // // // // // //             >
// // // // // // //               {isVideo ? (
// // // // // // //                 <video 
// // // // // // //                   ref={videoRef}
// // // // // // //                   src={currentMedia.url}
// // // // // // //                   className="story-media"
// // // // // // //                   autoPlay
// // // // // // //                   muted
// // // // // // //                   playsInline
// // // // // // //                   onEnded={handleVideoEnded}
// // // // // // //                   onPause={() => setIsPaused(true)}
// // // // // // //                   onPlay={() => setIsPaused(false)}
// // // // // // //                   aria-label={`ویدیوی استوری ${selectedStory.name}`}
// // // // // // //                 />
// // // // // // //               ) : (
// // // // // // //                 <img 
// // // // // // //                   src={currentMedia.url} 
// // // // // // //                   alt={currentMedia.caption || `استوری ${selectedStory.name}`}
// // // // // // //                   className="story-media"
// // // // // // //                   loading="lazy"
// // // // // // //                   onError={(e) => {
// // // // // // //                     e.target.src = 'https://via.placeholder.com/400x700?text=Story+Not+Found';
// // // // // // //                   }}
// // // // // // //                 />
// // // // // // //               )}
              
// // // // // // //               {/* کپشن استوری */}
// // // // // // //               {currentMedia.caption && (
// // // // // // //                 <div className="story-caption">
// // // // // // //                   <p>{currentMedia.caption}</p>
// // // // // // //                 </div>
// // // // // // //               )}

// // // // // // //               {/* دکمه لینک (اگر وجود داشته باشد) */}
// // // // // // //               {currentMedia.link && (
// // // // // // //                 <a 
// // // // // // //                   href={currentMedia.link}
// // // // // // //                   className="story-link-btn"
// // // // // // //                   target="_blank"
// // // // // // //                   rel="noopener noreferrer"
// // // // // // //                   aria-label={currentMedia.linkText || 'مشاهده بیشتر'}
// // // // // // //                   onClick={(e) => e.stopPropagation()}
// // // // // // //                 >
// // // // // // //                   {currentMedia.linkText || 'مشاهده بیشتر ←'}
// // // // // // //                 </a>
// // // // // // //               )}
// // // // // // //             </div>

// // // // // // //             {/* ناوبری لمسی - دکمه‌های چپ و راست */}
// // // // // // //             <div className="story-navigation">
// // // // // // //               <button 
// // // // // // //                 className="story-nav-left" 
// // // // // // //                 onClick={(e) => {
// // // // // // //                   e.stopPropagation();
// // // // // // //                   prevMedia();
// // // // // // //                 }}
// // // // // // //                 aria-label="قبلی"
// // // // // // //               >
// // // // // // //                 <div className="story-nav-hint" aria-hidden="true">‹</div>
// // // // // // //               </button>
// // // // // // //               <button 
// // // // // // //                 className="story-nav-right" 
// // // // // // //                 onClick={(e) => {
// // // // // // //                   e.stopPropagation();
// // // // // // //                   nextMedia();
// // // // // // //                 }}
// // // // // // //                 aria-label="بعدی"
// // // // // // //               >
// // // // // // //                 <div className="story-nav-hint" aria-hidden="true">›</div>
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Stories;

// // // // // // // src/components/Stories/Stories.jsx
// // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // import './Stories.css';

// // // // // // const Stories = ({ 
// // // // // //   storiesData, 
// // // // // //   onStoryClick, 
// // // // // //   autoPlayInterval = 5000,
// // // // // //   className = '' 
// // // // // // }) => {
// // // // // //   const [selectedStory, setSelectedStory] = useState(null);
// // // // // //   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
// // // // // //   const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
// // // // // //   const [progress, setProgress] = useState(0);
// // // // // //   const [isPaused, setIsPaused] = useState(false);
// // // // // //   const progressIntervalRef = useRef(null);
// // // // // //   const videoRef = useRef(null);

// // // // // //   // باز کردن استوری
// // // // // //   const openStory = (story, storyIdx, mediaIdx = 0) => {
// // // // // //     setSelectedStory(story);
// // // // // //     setCurrentStoryIndex(storyIdx);
// // // // // //     setCurrentMediaIndex(mediaIdx);
// // // // // //     setProgress(0);
// // // // // //     setIsPaused(false);
// // // // // //     if (onStoryClick) onStoryClick(story);
// // // // // //   };

// // // // // //   // بستن استوری
// // // // // //   const closeStory = () => {
// // // // // //     setSelectedStory(null);
// // // // // //     setCurrentStoryIndex(0);
// // // // // //     setCurrentMediaIndex(0);
// // // // // //     setProgress(0);
// // // // // //     setIsPaused(false);
// // // // // //     if (progressIntervalRef.current) {
// // // // // //       clearInterval(progressIntervalRef.current);
// // // // // //     }
// // // // // //   };

// // // // // //   // رفتن به مدیای بعدی
// // // // // //   const nextMedia = () => {
// // // // // //     if (!selectedStory) return;
    
// // // // // //     const currentStoryMedia = selectedStory.stories;
// // // // // //     const isLastMedia = currentMediaIndex >= currentStoryMedia.length - 1;
    
// // // // // //     if (!isLastMedia) {
// // // // // //       setCurrentMediaIndex(prev => prev + 1);
// // // // // //       setProgress(0);
// // // // // //     } else {
// // // // // //       nextStory();
// // // // // //     }
// // // // // //   };

// // // // // //   // رفتن به مدیای قبلی
// // // // // //   const prevMedia = () => {
// // // // // //     if (!selectedStory) return;
    
// // // // // //     const isFirstMedia = currentMediaIndex <= 0;
    
// // // // // //     if (!isFirstMedia) {
// // // // // //       setCurrentMediaIndex(prev => prev - 1);
// // // // // //       setProgress(0);
// // // // // //     } else {
// // // // // //       prevStory();
// // // // // //     }
// // // // // //   };

// // // // // //   // رفتن به استوری بعدی
// // // // // //   const nextStory = () => {
// // // // // //     if (!selectedStory) return;
    
// // // // // //     const isLastStory = currentStoryIndex >= storiesData.length - 1;
    
// // // // // //     if (!isLastStory) {
// // // // // //       const nextStoryData = storiesData[currentStoryIndex + 1];
// // // // // //       openStory(nextStoryData, currentStoryIndex + 1, 0);
// // // // // //     } else {
// // // // // //       closeStory();
// // // // // //     }
// // // // // //   };

// // // // // //   // رفتن به استوری قبلی
// // // // // //   const prevStory = () => {
// // // // // //     if (!selectedStory) return;
    
// // // // // //     const isFirstStory = currentStoryIndex <= 0;
    
// // // // // //     if (!isFirstStory) {
// // // // // //       const prevStoryData = storiesData[currentStoryIndex - 1];
// // // // // //       const lastMediaIndex = (prevStoryData.stories?.length || 1) - 1;
// // // // // //       openStory(prevStoryData, currentStoryIndex - 1, lastMediaIndex);
// // // // // //     }
// // // // // //   };

// // // // // //   // مدیریت تایمر پیشرفت
// // // // // //   useEffect(() => {
// // // // // //     if (!selectedStory) return;
    
// // // // // //     const currentMedia = selectedStory.stories[currentMediaIndex];
    
// // // // // //     if (currentMedia?.type === 'video') {
// // // // // //       if (progressIntervalRef.current) {
// // // // // //         clearInterval(progressIntervalRef.current);
// // // // // //       }
// // // // // //       return;
// // // // // //     }
    
// // // // // //     if (!isPaused) {
// // // // // //       if (progressIntervalRef.current) {
// // // // // //         clearInterval(progressIntervalRef.current);
// // // // // //       }
      
// // // // // //       const interval = setInterval(() => {
// // // // // //         setProgress(prev => {
// // // // // //           if (prev >= 100) {
// // // // // //             clearInterval(interval);
// // // // // //             nextMedia();
// // // // // //             return 0;
// // // // // //           }
// // // // // //           return prev + (100 / (autoPlayInterval / 100));
// // // // // //         });
// // // // // //       }, 100);
      
// // // // // //       progressIntervalRef.current = interval;
      
// // // // // //       return () => {
// // // // // //         clearInterval(interval);
// // // // // //       };
// // // // // //     }
// // // // // //   }, [selectedStory, currentMediaIndex, isPaused, autoPlayInterval]);

// // // // // //   // ریست پیشرفت
// // // // // //   useEffect(() => {
// // // // // //     setProgress(0);
// // // // // //     if (videoRef.current && selectedStory?.stories[currentMediaIndex]?.type === 'video') {
// // // // // //       videoRef.current.currentTime = 0;
// // // // // //       videoRef.current.play().catch(e => console.log('Video play error:', e));
// // // // // //     }
// // // // // //   }, [currentMediaIndex, selectedStory]);

// // // // // //   // هندلر پایان ویدیو
// // // // // //   const handleVideoEnded = () => {
// // // // // //     nextMedia();
// // // // // //   };

// // // // // //   if (!storiesData || storiesData.length === 0) {
// // // // // //     return null;
// // // // // //   }

// // // // // //   const currentMedia = selectedStory?.stories?.[currentMediaIndex];
// // // // // //   const isVideo = currentMedia?.type === 'video';
// // // // // //   const hasNextMedia = selectedStory && currentMediaIndex < (selectedStory.stories?.length || 0) - 1;
// // // // // //   const hasNextStory = selectedStory && currentStoryIndex < storiesData.length - 1;
// // // // // //   const hasPrevMedia = selectedStory && currentMediaIndex > 0;
// // // // // //   const hasPrevStory = selectedStory && currentStoryIndex > 0;

// // // // // //   return (
// // // // // //     <>
// // // // // //       <script type="application/ld+json">
// // // // // //         {JSON.stringify({
// // // // // //           "@context": "https://schema.org",
// // // // // //           "@type": "ItemList",
// // // // // //           "name": "استوری‌های املاک",
// // // // // //           "description": "جدیدترین استوری‌های آژانس‌های املاک و مشاوران املاک",
// // // // // //           "numberOfItems": storiesData.length,
// // // // // //           "itemListElement": storiesData.slice(0, 10).map((story, index) => ({
// // // // // //             "@type": "ListItem",
// // // // // //             "position": index + 1,
// // // // // //             "name": story.name,
// // // // // //             "image": story.avatar || story.stories?.[0]?.image,
// // // // // //           }))
// // // // // //         })}
// // // // // //       </script>

// // // // // //       {/* بخش استوری‌ها */}
// // // // // //       <section className={`stories-section ${className}`} aria-label="استوری‌های املاک">
// // // // // //         <div className="stories-container">
// // // // // //           <div className="stories-header">
// // // // // //             <h2 className="sr-only">استوری‌های امروز آژانس‌های املاک</h2>
// // // // // //           </div>
          
// // // // // //           <div className="stories-slider" role="region" aria-label="لیست استوری‌ها">
// // // // // //             {storiesData.map((story, idx) => (
// // // // // //               <div 
// // // // // //                 key={story.id} 
// // // // // //                 className="story-item"
// // // // // //                 onClick={() => openStory(story, idx, 0)}
// // // // // //                 role="button"
// // // // // //                 tabIndex={0}
// // // // // //                 aria-label={`مشاهده استوری ${story.name}`}
// // // // // //                 onKeyPress={(e) => {
// // // // // //                   if (e.key === 'Enter' || e.key === ' ') {
// // // // // //                     openStory(story, idx, 0);
// // // // // //                   }
// // // // // //                 }}
// // // // // //               >
// // // // // //                 <div className={`story-avatar-wrapper ${story.isViewed ? 'viewed' : ''}`}>
// // // // // //                   <img 
// // // // // //                     src={story.avatar || story.stories?.[0]?.image} 
// // // // // //                     alt={`آواتار ${story.name}`}
// // // // // //                     className="story-avatar"
// // // // // //                     loading="lazy"
// // // // // //                     width="80"
// // // // // //                     height="80"
// // // // // //                     onError={(e) => {
// // // // // //                       e.target.src = 'https://via.placeholder.com/80x80?text=User';
// // // // // //                     }}
// // // // // //                   />
// // // // // //                   {story.isLive && (
// // // // // //                     <div className="story-live-badge" aria-label="پخش زنده">
// // // // // //                       <span aria-hidden="true">●</span> زنده
// // // // // //                     </div>
// // // // // //                   )}
// // // // // //                   {!story.isViewed && !story.isLive && (
// // // // // //                     <div className="story-unread-badge" aria-label="استوری جدید"></div>
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //                 <span className="story-name">{story.name}</span>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </section>

// // // // // //       {/* مودال استوری */}
// // // // // //       {selectedStory && selectedStory.stories && currentMedia && (
// // // // // //         <div 
// // // // // //           className="story-modal"
// // // // // //           onClick={(e) => {
// // // // // //             if (e.target === e.currentTarget) closeStory();
// // // // // //           }}
// // // // // //           role="dialog"
// // // // // //           aria-label={`استوری ${selectedStory.name}`}
// // // // // //           aria-modal="true"
// // // // // //         >
// // // // // //           <div className="story-modal-content">
// // // // // //             {/* هدر */}
// // // // // //             <div className="story-modal-header">
// // // // // //               <img 
// // // // // //                 src={selectedStory.avatar || selectedStory.stories[0]?.image} 
// // // // // //                 alt={selectedStory.name}
// // // // // //                 className="story-modal-avatar"
// // // // // //                 width="40"
// // // // // //                 height="40"
// // // // // //               />
// // // // // //               <div className="story-modal-info">
// // // // // //                 <div className="story-modal-name">{selectedStory.name}</div>
// // // // // //                 <div className="story-modal-time">
// // // // // //                   {new Date(currentMedia.timestamp || Date.now()).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //               <button 
// // // // // //                 className="story-modal-close" 
// // // // // //                 onClick={closeStory}
// // // // // //                 aria-label="بستن استوری"
// // // // // //               >
// // // // // //                 ✕
// // // // // //               </button>
// // // // // //             </div>

// // // // // //             {/* نوار پیشرفت */}
// // // // // //             <div className="story-progress-container">
// // // // // //               {selectedStory.stories.map((_, idx) => (
// // // // // //                 <div 
// // // // // //                   key={idx} 
// // // // // //                   className={`story-progress-bar ${idx === currentMediaIndex ? 'active' : ''} ${idx < currentMediaIndex ? 'completed' : ''}`}
// // // // // //                   onClick={(e) => {
// // // // // //                     e.stopPropagation();
// // // // // //                     if (idx !== currentMediaIndex) {
// // // // // //                       setCurrentMediaIndex(idx);
// // // // // //                       setProgress(0);
// // // // // //                     }
// // // // // //                   }}
// // // // // //                 >
// // // // // //                   <div 
// // // // // //                     className="story-progress-fill"
// // // // // //                     style={{ 
// // // // // //                       width: idx === currentMediaIndex ? `${progress}%` : idx < currentMediaIndex ? '100%' : '0%'
// // // // // //                     }}
// // // // // //                   />
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>

// // // // // //             {/* دکمه بعدی و قبلی */}
// // // // // //             <button 
// // // // // //               className="story-nav-btn story-nav-prev"
// // // // // //               onClick={(e) => {
// // // // // //                 e.stopPropagation();
// // // // // //                 prevMedia();
// // // // // //               }}
// // // // // //               aria-label="قبلی"
// // // // // //               style={{ 
// // // // // //                 display: (hasPrevMedia || hasPrevStory) ? 'flex' : 'none'
// // // // // //               }}
// // // // // //             >
// // // // // //               <span aria-hidden="true">‹</span>
// // // // // //             </button>

// // // // // //             <button 
// // // // // //               className="story-nav-btn story-nav-next"
// // // // // //               onClick={(e) => {
// // // // // //                 e.stopPropagation();
// // // // // //                 nextMedia();
// // // // // //               }}
// // // // // //               aria-label="بعدی"
// // // // // //               style={{ 
// // // // // //                 display: (hasNextMedia || hasNextStory) ? 'flex' : 'none'
// // // // // //               }}
// // // // // //             >
// // // // // //               <span aria-hidden="true">›</span>
// // // // // //             </button>

// // // // // //             {/* محتوای استوری */}
// // // // // //             <div 
// // // // // //               className="story-content"
// // // // // //               onMouseEnter={() => setIsPaused(true)}
// // // // // //               onMouseLeave={() => setIsPaused(false)}
// // // // // //             >
// // // // // //               {isVideo ? (
// // // // // //                 <video 
// // // // // //                   ref={videoRef}
// // // // // //                   src={currentMedia.url}
// // // // // //                   className="story-media"
// // // // // //                   autoPlay
// // // // // //                   muted
// // // // // //                   playsInline
// // // // // //                   onEnded={handleVideoEnded}
// // // // // //                   aria-label={`ویدیوی استوری ${selectedStory.name}`}
// // // // // //                 />
// // // // // //               ) : (
// // // // // //                 <img 
// // // // // //                   src={currentMedia.url} 
// // // // // //                   alt={currentMedia.caption || `استوری ${selectedStory.name}`}
// // // // // //                   className="story-media"
// // // // // //                   loading="lazy"
// // // // // //                   onError={(e) => {
// // // // // //                     e.target.src = 'https://via.placeholder.com/400x700?text=Story+Not+Found';
// // // // // //                   }}
// // // // // //                 />
// // // // // //               )}
              
// // // // // //               {currentMedia.caption && (
// // // // // //                 <div className="story-caption">
// // // // // //                   <p>{currentMedia.caption}</p>
// // // // // //                 </div>
// // // // // //               )}

// // // // // //               {currentMedia.link && (
// // // // // //                 <a 
// // // // // //                   href={currentMedia.link}
// // // // // //                   className="story-link-btn"
// // // // // //                   target="_blank"
// // // // // //                   rel="noopener noreferrer"
// // // // // //                   aria-label={currentMedia.linkText || 'مشاهده بیشتر'}
// // // // // //                   onClick={(e) => e.stopPropagation()}
// // // // // //                 >
// // // // // //                   {currentMedia.linkText || 'مشاهده بیشتر ←'}
// // // // // //                 </a>
// // // // // //               )}
// // // // // //             </div>

// // // // // //             {/* مناطق کلیک لمسی چپ و راست */}
// // // // // //             <div className="story-touch-areas">
// // // // // //               <div 
// // // // // //                 className="story-touch-left"
// // // // // //                 onClick={(e) => {
// // // // // //                   e.stopPropagation();
// // // // // //                   prevMedia();
// // // // // //                 }}
// // // // // //               />
// // // // // //               <div 
// // // // // //                 className="story-touch-right"
// // // // // //                 onClick={(e) => {
// // // // // //                   e.stopPropagation();
// // // // // //                   nextMedia();
// // // // // //                 }}
// // // // // //               />
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </>
// // // // // //   );
// // // // // // };

// // // // // // export default Stories;

// // // // // // src/components/Stories/Stories.jsx - نسخه اصلاح شده

// // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // import './Stories.css';

// // // // // const Stories = ({ 
// // // // //   storiesData, 
// // // // //   onStoryClick, 
// // // // //   autoPlayInterval = 5000,
// // // // //   className = '' 
// // // // // }) => {
// // // // //   const [selectedStory, setSelectedStory] = useState(null);
// // // // //   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
// // // // //   const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
// // // // //   const [progress, setProgress] = useState(0);
// // // // //   const [isPaused, setIsPaused] = useState(false);
// // // // //   const progressIntervalRef = useRef(null);
// // // // //   const videoRef = useRef(null);

// // // // //   // باز کردن استوری
// // // // //   const openStory = (story, storyIdx, mediaIdx = 0) => {
// // // // //     setSelectedStory(story);
// // // // //     setCurrentStoryIndex(storyIdx);
// // // // //     setCurrentMediaIndex(mediaIdx);
// // // // //     setProgress(0);
// // // // //     setIsPaused(false);
// // // // //     if (onStoryClick) onStoryClick(story);
// // // // //   };

// // // // //   // بستن استوری - با stopPropagation
// // // // //   const closeStory = (e) => {
// // // // //     if (e) {
// // // // //       e.stopPropagation();
// // // // //       e.preventDefault();
// // // // //     }
// // // // //     setSelectedStory(null);
// // // // //     setCurrentStoryIndex(0);
// // // // //     setCurrentMediaIndex(0);
// // // // //     setProgress(0);
// // // // //     setIsPaused(false);
// // // // //     if (progressIntervalRef.current) {
// // // // //       clearInterval(progressIntervalRef.current);
// // // // //     }
// // // // //   };

// // // // //   // رفتن به مدیای بعدی
// // // // //   const nextMedia = (e) => {
// // // // //     if (e) {
// // // // //       e.stopPropagation();
// // // // //     }
// // // // //     if (!selectedStory) return;
    
// // // // //     const currentStoryMedia = selectedStory.stories;
// // // // //     const isLastMedia = currentMediaIndex >= currentStoryMedia.length - 1;
    
// // // // //     if (!isLastMedia) {
// // // // //       setCurrentMediaIndex(prev => prev + 1);
// // // // //       setProgress(0);
// // // // //     } else {
// // // // //       nextStory();
// // // // //     }
// // // // //   };

// // // // //   // رفتن به مدیای قبلی
// // // // //   const prevMedia = (e) => {
// // // // //     if (e) {
// // // // //       e.stopPropagation();
// // // // //     }
// // // // //     if (!selectedStory) return;
    
// // // // //     const isFirstMedia = currentMediaIndex <= 0;
    
// // // // //     if (!isFirstMedia) {
// // // // //       setCurrentMediaIndex(prev => prev - 1);
// // // // //       setProgress(0);
// // // // //     } else {
// // // // //       prevStory();
// // // // //     }
// // // // //   };

// // // // //   // رفتن به استوری بعدی
// // // // //   const nextStory = () => {
// // // // //     if (!selectedStory) return;
    
// // // // //     const isLastStory = currentStoryIndex >= storiesData.length - 1;
    
// // // // //     if (!isLastStory) {
// // // // //       const nextStoryData = storiesData[currentStoryIndex + 1];
// // // // //       openStory(nextStoryData, currentStoryIndex + 1, 0);
// // // // //     } else {
// // // // //       closeStory();
// // // // //     }
// // // // //   };

// // // // //   // رفتن به استوری قبلی
// // // // //   const prevStory = () => {
// // // // //     if (!selectedStory) return;
    
// // // // //     const isFirstStory = currentStoryIndex <= 0;
    
// // // // //     if (!isFirstStory) {
// // // // //       const prevStoryData = storiesData[currentStoryIndex - 1];
// // // // //       const lastMediaIndex = (prevStoryData.stories?.length || 1) - 1;
// // // // //       openStory(prevStoryData, currentStoryIndex - 1, lastMediaIndex);
// // // // //     }
// // // // //   };

// // // // //   // مدیریت تایمر پیشرفت
// // // // //   useEffect(() => {
// // // // //     if (!selectedStory) return;
    
// // // // //     const currentMedia = selectedStory.stories[currentMediaIndex];
    
// // // // //     if (currentMedia?.type === 'video') {
// // // // //       if (progressIntervalRef.current) {
// // // // //         clearInterval(progressIntervalRef.current);
// // // // //       }
// // // // //       return;
// // // // //     }
    
// // // // //     if (!isPaused) {
// // // // //       if (progressIntervalRef.current) {
// // // // //         clearInterval(progressIntervalRef.current);
// // // // //       }
      
// // // // //       const interval = setInterval(() => {
// // // // //         setProgress(prev => {
// // // // //           if (prev >= 100) {
// // // // //             clearInterval(interval);
// // // // //             nextMedia();
// // // // //             return 0;
// // // // //           }
// // // // //           return prev + (100 / (autoPlayInterval / 100));
// // // // //         });
// // // // //       }, 100);
      
// // // // //       progressIntervalRef.current = interval;
      
// // // // //       return () => {
// // // // //         clearInterval(interval);
// // // // //       };
// // // // //     }
// // // // //   }, [selectedStory, currentMediaIndex, isPaused, autoPlayInterval]);

// // // // //   // ریست پیشرفت
// // // // //   useEffect(() => {
// // // // //     setProgress(0);
// // // // //     if (videoRef.current && selectedStory?.stories[currentMediaIndex]?.type === 'video') {
// // // // //       videoRef.current.currentTime = 0;
// // // // //       videoRef.current.play().catch(e => console.log('Video play error:', e));
// // // // //     }
// // // // //   }, [currentMediaIndex, selectedStory]);

// // // // //   // هندلر پایان ویدیو
// // // // //   const handleVideoEnded = () => {
// // // // //     nextMedia();
// // // // //   };

// // // // //   if (!storiesData || storiesData.length === 0) {
// // // // //     return null;
// // // // //   }

// // // // //   const currentMedia = selectedStory?.stories?.[currentMediaIndex];
// // // // //   const isVideo = currentMedia?.type === 'video';
// // // // //   const hasNextMedia = selectedStory && currentMediaIndex < (selectedStory.stories?.length || 0) - 1;
// // // // //   const hasNextStory = selectedStory && currentStoryIndex < storiesData.length - 1;
// // // // //   const hasPrevMedia = selectedStory && currentMediaIndex > 0;
// // // // //   const hasPrevStory = selectedStory && currentStoryIndex > 0;

// // // // //   return (
// // // // //     <>
// // // // //       <script type="application/ld+json">
// // // // //         {JSON.stringify({
// // // // //           "@context": "https://schema.org",
// // // // //           "@type": "ItemList",
// // // // //           "name": "استوری‌های املاک",
// // // // //           "description": "جدیدترین استوری‌های آژانس‌های املاک و مشاوران املاک",
// // // // //           "numberOfItems": storiesData.length,
// // // // //           "itemListElement": storiesData.slice(0, 10).map((story, index) => ({
// // // // //             "@type": "ListItem",
// // // // //             "position": index + 1,
// // // // //             "name": story.name,
// // // // //             "image": story.avatar || story.stories?.[0]?.image,
// // // // //           }))
// // // // //         })}
// // // // //       </script>

// // // // //       {/* بخش استوری‌ها */}
// // // // //       <section className={`stories-section ${className}`} aria-label="استوری‌های املاک">
// // // // //         <div className="stories-container">
// // // // //           <div className="stories-header">
// // // // //             <h2 className="sr-only">استوری‌های امروز آژانس‌های املاک</h2>
// // // // //           </div>
          
// // // // //           <div className="stories-slider" role="region" aria-label="لیست استوری‌ها">
// // // // //             {storiesData.map((story, idx) => (
// // // // //               <div 
// // // // //                 key={story.id} 
// // // // //                 className="story-item"
// // // // //                 onClick={() => openStory(story, idx, 0)}
// // // // //                 role="button"
// // // // //                 tabIndex={0}
// // // // //                 aria-label={`مشاهده استوری ${story.name}`}
// // // // //                 onKeyPress={(e) => {
// // // // //                   if (e.key === 'Enter' || e.key === ' ') {
// // // // //                     openStory(story, idx, 0);
// // // // //                   }
// // // // //                 }}
// // // // //               >
// // // // //                 <div className={`story-avatar-wrapper ${story.isViewed ? 'viewed' : ''}`}>
// // // // //                   <img 
// // // // //                     src={story.avatar || story.stories?.[0]?.image} 
// // // // //                     alt={`آواتار ${story.name}`}
// // // // //                     className="story-avatar"
// // // // //                     loading="lazy"
// // // // //                     width="80"
// // // // //                     height="80"
// // // // //                     onError={(e) => {
// // // // //                       e.target.src = 'https://via.placeholder.com/80x80?text=User';
// // // // //                     }}
// // // // //                   />
// // // // //                   {story.isLive && (
// // // // //                     <div className="story-live-badge" aria-label="پخش زنده">
// // // // //                       <span aria-hidden="true">●</span> زنده
// // // // //                     </div>
// // // // //                   )}
// // // // //                   {!story.isViewed && !story.isLive && (
// // // // //                     <div className="story-unread-badge" aria-label="استوری جدید"></div>
// // // // //                   )}
// // // // //                 </div>
// // // // //                 <span className="story-name">{story.name}</span>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>
// // // // //       </section>

// // // // //       {/* مودال استوری */}
// // // // //       {selectedStory && selectedStory.stories && currentMedia && (
// // // // //         <div 
// // // // //           className="story-modal"
// // // // //           onClick={(e) => {
// // // // //             if (e.target === e.currentTarget) {
// // // // //               closeStory(e);
// // // // //             }
// // // // //           }}
// // // // //           role="dialog"
// // // // //           aria-label={`استوری ${selectedStory.name}`}
// // // // //           aria-modal="true"
// // // // //         >
// // // // //           <div className="story-modal-content">
// // // // //             {/* هدر */}
// // // // //             <div className="story-modal-header">
// // // // //               <img 
// // // // //                 src={selectedStory.avatar || selectedStory.stories[0]?.image} 
// // // // //                 alt={selectedStory.name}
// // // // //                 className="story-modal-avatar"
// // // // //                 width="40"
// // // // //                 height="40"
// // // // //               />
// // // // //               <div className="story-modal-info">
// // // // //                 <div className="story-modal-name">{selectedStory.name}</div>
// // // // //                 <div className="story-modal-time">
// // // // //                   {new Date(currentMedia.timestamp || Date.now()).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
// // // // //                 </div>
// // // // //               </div>
// // // // //               <button 
// // // // //                 className="story-modal-close" 
// // // // //                 onClick={(e) => {
// // // // //                   e.stopPropagation();
// // // // //                   closeStory(e);
// // // // //                 }}
// // // // //                 aria-label="بستن استوری"
// // // // //               >
// // // // //                 ✕
// // // // //               </button>
// // // // //             </div>

// // // // //             {/* نوار پیشرفت */}
// // // // //             <div className="story-progress-container">
// // // // //               {selectedStory.stories.map((_, idx) => (
// // // // //                 <div 
// // // // //                   key={idx} 
// // // // //                   className={`story-progress-bar ${idx === currentMediaIndex ? 'active' : ''} ${idx < currentMediaIndex ? 'completed' : ''}`}
// // // // //                   onClick={(e) => {
// // // // //                     e.stopPropagation();
// // // // //                     if (idx !== currentMediaIndex) {
// // // // //                       setCurrentMediaIndex(idx);
// // // // //                       setProgress(0);
// // // // //                     }
// // // // //                   }}
// // // // //                 >
// // // // //                   <div 
// // // // //                     className="story-progress-fill"
// // // // //                     style={{ 
// // // // //                       width: idx === currentMediaIndex ? `${progress}%` : idx < currentMediaIndex ? '100%' : '0%'
// // // // //                     }}
// // // // //                   />
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>

// // // // //             {/* دکمه ناوبری */}
// // // // //             <button 
// // // // //               className="story-nav-btn story-nav-prev"
// // // // //               onClick={(e) => {
// // // // //                 prevMedia(e);
// // // // //               }}
// // // // //               aria-label="قبلی"
// // // // //               style={{ 
// // // // //                 display: (hasPrevMedia || hasPrevStory) ? 'flex' : 'none'
// // // // //               }}
// // // // //             >
// // // // //               <span aria-hidden="true">›</span>
// // // // //             </button>

// // // // //             <button 
// // // // //               className="story-nav-btn story-nav-next"
// // // // //               onClick={(e) => {
// // // // //                 nextMedia(e);
// // // // //               }}
// // // // //               aria-label="بعدی"
// // // // //               style={{ 
// // // // //                 display: (hasNextMedia || hasNextStory) ? 'flex' : 'none'
// // // // //               }}
// // // // //             >
// // // // //               <span aria-hidden="true">‹</span>
// // // // //             </button>

// // // // //             {/* محتوای استوری */}
// // // // //             <div 
// // // // //               className="story-content"
// // // // //               onMouseEnter={() => setIsPaused(true)}
// // // // //               onMouseLeave={() => setIsPaused(false)}
// // // // //             >
// // // // //               {isVideo ? (
// // // // //                 <video 
// // // // //                   ref={videoRef}
// // // // //                   src={currentMedia.url}
// // // // //                   className="story-media"
// // // // //                   autoPlay
// // // // //                   muted
// // // // //                   playsInline
// // // // //                   onEnded={handleVideoEnded}
// // // // //                   aria-label={`ویدیوی استوری ${selectedStory.name}`}
// // // // //                 />
// // // // //               ) : (
// // // // //                 <img 
// // // // //                   src={currentMedia.url} 
// // // // //                   alt={currentMedia.caption || `استوری ${selectedStory.name}`}
// // // // //                   className="story-media"
// // // // //                   loading="lazy"
// // // // //                   onError={(e) => {
// // // // //                     e.target.src = 'https://via.placeholder.com/400x700?text=Story+Not+Found';
// // // // //                   }}
// // // // //                 />
// // // // //               )}
              
// // // // //               {currentMedia.caption && (
// // // // //                 <div className="story-caption">
// // // // //                   <p>{currentMedia.caption}</p>
// // // // //                 </div>
// // // // //               )}

// // // // //               {currentMedia.link && (
// // // // //                 <a 
// // // // //                   href={currentMedia.link}
// // // // //                   className="story-link-btn"
// // // // //                   target="_blank"
// // // // //                   rel="noopener noreferrer"
// // // // //                   aria-label={currentMedia.linkText || 'مشاهده بیشتر'}
// // // // //                   onClick={(e) => e.stopPropagation()}
// // // // //                 >
// // // // //                   {currentMedia.linkText || 'مشاهده بیشتر ←'}
// // // // //                 </a>
// // // // //               )}
// // // // //             </div>

// // // // //             {/* مناطق لمسی */}
// // // // //             <div className="story-touch-areas">
// // // // //               <div 
// // // // //                 className="story-touch-left"
// // // // //                 onClick={(e) => {
// // // // //                   prevMedia(e);
// // // // //                 }}
// // // // //               />
// // // // //               <div 
// // // // //                 className="story-touch-right"
// // // // //                 onClick={(e) => {
// // // // //                   nextMedia(e);
// // // // //                 }}
// // // // //               />
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // export default Stories;
// // // // // src/components/Stories/Stories.jsx - نسخه نهایی

// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import './Stories.css';

// // // // const Stories = ({ 
// // // //   storiesData, 
// // // //   onStoryClick, 
// // // //   autoPlayInterval = 5000,
// // // //   className = '' 
// // // // }) => {
// // // //   const [selectedStory, setSelectedStory] = useState(null);
// // // //   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
// // // //   const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
// // // //   const [progress, setProgress] = useState(0);
// // // //   const [isPaused, setIsPaused] = useState(false);
// // // //   const progressIntervalRef = useRef(null);
// // // //   const videoRef = useRef(null);
// // // //   const modalContentRef = useRef(null);

// // // //   // باز کردن استوری
// // // //   const openStory = (story, storyIdx, mediaIdx = 0) => {
// // // //     setSelectedStory(story);
// // // //     setCurrentStoryIndex(storyIdx);
// // // //     setCurrentMediaIndex(mediaIdx);
// // // //     setProgress(0);
// // // //     setIsPaused(false);
// // // //     if (onStoryClick) onStoryClick(story);
// // // //   };

// // // //   // بستن استوری
// // // //   const closeStory = () => {
// // // //     setSelectedStory(null);
// // // //     setCurrentStoryIndex(0);
// // // //     setCurrentMediaIndex(0);
// // // //     setProgress(0);
// // // //     setIsPaused(false);
// // // //     if (progressIntervalRef.current) {
// // // //       clearInterval(progressIntervalRef.current);
// // // //     }
// // // //   };

// // // //   // رفتن به مدیای بعدی
// // // //   const nextMedia = () => {
// // // //     if (!selectedStory) return;
    
// // // //     const currentStoryMedia = selectedStory.stories;
// // // //     const isLastMedia = currentMediaIndex >= currentStoryMedia.length - 1;
    
// // // //     if (!isLastMedia) {
// // // //       setCurrentMediaIndex(prev => prev + 1);
// // // //       setProgress(0);
// // // //     } else {
// // // //       nextStory();
// // // //     }
// // // //   };

// // // //   // رفتن به مدیای قبلی
// // // //   const prevMedia = () => {
// // // //     if (!selectedStory) return;
    
// // // //     const isFirstMedia = currentMediaIndex <= 0;
    
// // // //     if (!isFirstMedia) {
// // // //       setCurrentMediaIndex(prev => prev - 1);
// // // //       setProgress(0);
// // // //     } else {
// // // //       prevStory();
// // // //     }
// // // //   };

// // // //   // رفتن به استوری بعدی
// // // //   const nextStory = () => {
// // // //     if (!selectedStory) return;
    
// // // //     const isLastStory = currentStoryIndex >= storiesData.length - 1;
    
// // // //     if (!isLastStory) {
// // // //       const nextStoryData = storiesData[currentStoryIndex + 1];
// // // //       openStory(nextStoryData, currentStoryIndex + 1, 0);
// // // //     } else {
// // // //       closeStory();
// // // //     }
// // // //   };

// // // //   // رفتن به استوری قبلی
// // // //   const prevStory = () => {
// // // //     if (!selectedStory) return;
    
// // // //     const isFirstStory = currentStoryIndex <= 0;
    
// // // //     if (!isFirstStory) {
// // // //       const prevStoryData = storiesData[currentStoryIndex - 1];
// // // //       const lastMediaIndex = (prevStoryData.stories?.length || 1) - 1;
// // // //       openStory(prevStoryData, currentStoryIndex - 1, lastMediaIndex);
// // // //     }
// // // //   };

// // // //   // مدیریت تایمر پیشرفت
// // // //   useEffect(() => {
// // // //     if (!selectedStory) return;
    
// // // //     const currentMedia = selectedStory.stories[currentMediaIndex];
    
// // // //     if (currentMedia?.type === 'video') {
// // // //       if (progressIntervalRef.current) {
// // // //         clearInterval(progressIntervalRef.current);
// // // //       }
// // // //       return;
// // // //     }
    
// // // //     if (!isPaused) {
// // // //       if (progressIntervalRef.current) {
// // // //         clearInterval(progressIntervalRef.current);
// // // //       }
      
// // // //       const interval = setInterval(() => {
// // // //         setProgress(prev => {
// // // //           if (prev >= 100) {
// // // //             clearInterval(interval);
// // // //             nextMedia();
// // // //             return 0;
// // // //           }
// // // //           return prev + (100 / (autoPlayInterval / 100));
// // // //         });
// // // //       }, 100);
      
// // // //       progressIntervalRef.current = interval;
      
// // // //       return () => {
// // // //         clearInterval(interval);
// // // //       };
// // // //     }
// // // //   }, [selectedStory, currentMediaIndex, isPaused, autoPlayInterval]);

// // // //   // ریست پیشرفت
// // // //   useEffect(() => {
// // // //     setProgress(0);
// // // //     if (videoRef.current && selectedStory?.stories[currentMediaIndex]?.type === 'video') {
// // // //       videoRef.current.currentTime = 0;
// // // //       videoRef.current.play().catch(e => console.log('Video play error:', e));
// // // //     }
// // // //   }, [currentMediaIndex, selectedStory]);

// // // //   // هندلر پایان ویدیو
// // // //   const handleVideoEnded = () => {
// // // //     nextMedia();
// // // //   };

// // // //   if (!storiesData || storiesData.length === 0) {
// // // //     return null;
// // // //   }

// // // //   const currentMedia = selectedStory?.stories?.[currentMediaIndex];
// // // //   const isVideo = currentMedia?.type === 'video';
// // // //   const hasNextMedia = selectedStory && currentMediaIndex < (selectedStory.stories?.length || 0) - 1;
// // // //   const hasNextStory = selectedStory && currentStoryIndex < storiesData.length - 1;
// // // //   const hasPrevMedia = selectedStory && currentMediaIndex > 0;
// // // //   const hasPrevStory = selectedStory && currentStoryIndex > 0;

// // // //   return (
// // // //     <>
// // // //       <script type="application/ld+json">
// // // //         {JSON.stringify({
// // // //           "@context": "https://schema.org",
// // // //           "@type": "ItemList",
// // // //           "name": "استوری‌های املاک",
// // // //           "description": "جدیدترین استوری‌های آژانس‌های املاک و مشاوران املاک",
// // // //           "numberOfItems": storiesData.length,
// // // //           "itemListElement": storiesData.slice(0, 10).map((story, index) => ({
// // // //             "@type": "ListItem",
// // // //             "position": index + 1,
// // // //             "name": story.name,
// // // //             "image": story.avatar || story.stories?.[0]?.image,
// // // //           }))
// // // //         })}
// // // //       </script>

// // // //       {/* بخش استوری‌ها */}
// // // //       <section className={`stories-section ${className}`} aria-label="استوری‌های املاک">
// // // //         <div className="stories-container">
// // // //           <div className="stories-header">
// // // //             <h2 className="sr-only">استوری‌های امروز آژانس‌های املاک</h2>
// // // //           </div>
          
// // // //           <div className="stories-slider" role="region" aria-label="لیست استوری‌ها">
// // // //             {storiesData.map((story, idx) => (
// // // //               <div 
// // // //                 key={story.id} 
// // // //                 className="story-item"
// // // //                 onClick={() => openStory(story, idx, 0)}
// // // //                 role="button"
// // // //                 tabIndex={0}
// // // //                 aria-label={`مشاهده استوری ${story.name}`}
// // // //                 onKeyPress={(e) => {
// // // //                   if (e.key === 'Enter' || e.key === ' ') {
// // // //                     openStory(story, idx, 0);
// // // //                   }
// // // //                 }}
// // // //               >
// // // //                 <div className={`story-avatar-wrapper ${story.isViewed ? 'viewed' : ''}`}>
// // // //                   <img 
// // // //                     src={story.avatar || story.stories?.[0]?.image} 
// // // //                     alt={`آواتار ${story.name}`}
// // // //                     className="story-avatar"
// // // //                     loading="lazy"
// // // //                     width="80"
// // // //                     height="80"
// // // //                     onError={(e) => {
// // // //                       e.target.src = 'https://via.placeholder.com/80x80?text=User';
// // // //                     }}
// // // //                   />
// // // //                   {story.isLive && (
// // // //                     <div className="story-live-badge" aria-label="پخش زنده">
// // // //                       <span aria-hidden="true">●</span> زنده
// // // //                     </div>
// // // //                   )}
// // // //                   {!story.isViewed && !story.isLive && (
// // // //                     <div className="story-unread-badge" aria-label="استوری جدید"></div>
// // // //                   )}
// // // //                 </div>
// // // //                 <span className="story-name">{story.name}</span>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       </section>

// // // //       {/* مودال استوری */}
// // // //       {selectedStory && selectedStory.stories && currentMedia && (
// // // //         <div 
// // // //           className="story-modal"
// // // //           onClick={closeStory}
// // // //           role="dialog"
// // // //           aria-label={`استوری ${selectedStory.name}`}
// // // //           aria-modal="true"
// // // //         >
// // // //           <div className="story-modal-content" ref={modalContentRef}>
// // // //             {/* هدر */}
// // // //             <div className="story-modal-header">
// // // //               <img 
// // // //                 src={selectedStory.avatar || selectedStory.stories[0]?.image} 
// // // //                 alt={selectedStory.name}
// // // //                 className="story-modal-avatar"
// // // //                 width="40"
// // // //                 height="40"
// // // //               />
// // // //               <div className="story-modal-info">
// // // //                 <div className="story-modal-name">{selectedStory.name}</div>
// // // //                 <div className="story-modal-time">
// // // //                   {new Date(currentMedia.timestamp || Date.now()).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
// // // //                 </div>
// // // //               </div>
// // // //               <button 
// // // //                 className="story-modal-close" 
// // // //                 onClick={(e) => {
// // // //                   e.stopPropagation();
// // // //                   closeStory();
// // // //                 }}
// // // //                 aria-label="بستن استوری"
// // // //               >
// // // //                 ✕
// // // //               </button>
// // // //             </div>

// // // //             {/* نوار پیشرفت */}
// // // //             <div className="story-progress-container" onClick={(e) => e.stopPropagation()}>
// // // //               {selectedStory.stories.map((_, idx) => (
// // // //                 <div 
// // // //                   key={idx} 
// // // //                   className={`story-progress-bar ${idx === currentMediaIndex ? 'active' : ''} ${idx < currentMediaIndex ? 'completed' : ''}`}
// // // //                   onClick={(e) => {
// // // //                     e.stopPropagation();
// // // //                     if (idx !== currentMediaIndex) {
// // // //                       setCurrentMediaIndex(idx);
// // // //                       setProgress(0);
// // // //                     }
// // // //                   }}
// // // //                 >
// // // //                   <div 
// // // //                     className="story-progress-fill"
// // // //                     style={{ 
// // // //                       width: idx === currentMediaIndex ? `${progress}%` : idx < currentMediaIndex ? '100%' : '0%'
// // // //                     }}
// // // //                   />
// // // //                 </div>
// // // //               ))}
// // // //             </div>

// // // //             {/* دکمه ناوبری */}
// // // //             <button 
// // // //               className="story-nav-btn story-nav-prev"
// // // //               onClick={(e) => {
// // // //                 e.stopPropagation();
// // // //                 prevMedia();
// // // //               }}
// // // //               aria-label="قبلی"
// // // //               style={{ 
// // // //                 display: (hasPrevMedia || hasPrevStory) ? 'flex' : 'none'
// // // //               }}
// // // //             >
// // // //               <span aria-hidden="true">›</span>
// // // //             </button>

// // // //             <button 
// // // //               className="story-nav-btn story-nav-next"
// // // //               onClick={(e) => {
// // // //                 e.stopPropagation();
// // // //                 nextMedia();
// // // //               }}
// // // //               aria-label="بعدی"
// // // //               style={{ 
// // // //                 display: (hasNextMedia || hasNextStory) ? 'flex' : 'none'
// // // //               }}
// // // //             >
// // // //               <span aria-hidden="true">‹</span>
// // // //             </button>

// // // //             {/* محتوای استوری */}
// // // //             <div 
// // // //               className="story-content"
// // // //               onMouseEnter={() => setIsPaused(true)}
// // // //               onMouseLeave={() => setIsPaused(false)}
// // // //               onClick={(e) => e.stopPropagation()}
// // // //             >
// // // //               {isVideo ? (
// // // //                 <video 
// // // //                   ref={videoRef}
// // // //                   src={currentMedia.url}
// // // //                   className="story-media"
// // // //                   autoPlay
// // // //                   muted
// // // //                   playsInline
// // // //                   onEnded={handleVideoEnded}
// // // //                   aria-label={`ویدیوی استوری ${selectedStory.name}`}
// // // //                 />
// // // //               ) : (
// // // //                 <img 
// // // //                   src={currentMedia.url} 
// // // //                   alt={currentMedia.caption || `استوری ${selectedStory.name}`}
// // // //                   className="story-media"
// // // //                   loading="lazy"
// // // //                   onError={(e) => {
// // // //                     e.target.src = 'https://via.placeholder.com/400x700?text=Story+Not+Found';
// // // //                   }}
// // // //                 />
// // // //               )}
              
// // // //               {currentMedia.caption && (
// // // //                 <div className="story-caption">
// // // //                   <p>{currentMedia.caption}</p>
// // // //                 </div>
// // // //               )}

// // // //               {currentMedia.link && (
// // // //                 <a 
// // // //                   href={currentMedia.link}
// // // //                   className="story-link-btn"
// // // //                   target="_blank"
// // // //                   rel="noopener noreferrer"
// // // //                   aria-label={currentMedia.linkText || 'مشاهده بیشتر'}
// // // //                   onClick={(e) => e.stopPropagation()}
// // // //                 >
// // // //                   {currentMedia.linkText || 'مشاهده بیشتر ←'}
// // // //                 </a>
// // // //               )}
// // // //             </div>

// // // //             {/* مناطق لمسی */}
// // // //             <div className="story-touch-areas">
// // // //               <div 
// // // //                 className="story-touch-left"
// // // //                 onClick={(e) => {
// // // //                   e.stopPropagation();
// // // //                   prevMedia();
// // // //                 }}
// // // //               />
// // // //               <div 
// // // //                 className="story-touch-right"
// // // //                 onClick={(e) => {
// // // //                   e.stopPropagation();
// // // //                   prevMedia();
// // // //                 }}
// // // //               />
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </>
// // // //   );
// // // // };

// // // // export default Stories;

// // // // src/components/Stories/Stories.jsx - نسخه نهایی با دکمه بستن درست

// // // import React, { useState, useEffect, useRef } from 'react';
// // // import './Stories.css';

// // // const Stories = ({ 
// // //   storiesData, 
// // //   onStoryClick, 
// // //   autoPlayInterval = 5000,
// // //   className = '' 
// // // }) => {
// // //   const [selectedStory, setSelectedStory] = useState(null);
// // //   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
// // //   const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
// // //   const [progress, setProgress] = useState(0);
// // //   const [isPaused, setIsPaused] = useState(false);
// // //   const progressIntervalRef = useRef(null);
// // //   const videoRef = useRef(null);

// // //   // باز کردن استوری
// // //   const openStory = (story, storyIdx, mediaIdx = 0) => {
// // //     setSelectedStory(story);
// // //     setCurrentStoryIndex(storyIdx);
// // //     setCurrentMediaIndex(mediaIdx);
// // //     setProgress(0);
// // //     setIsPaused(false);
// // //     if (onStoryClick) onStoryClick(story);
// // //   };

// // //   // بستن استوری
// // //   const closeStory = () => {
// // //     setSelectedStory(null);
// // //     setCurrentStoryIndex(0);
// // //     setCurrentMediaIndex(0);
// // //     setProgress(0);
// // //     setIsPaused(false);
// // //     if (progressIntervalRef.current) {
// // //       clearInterval(progressIntervalRef.current);
// // //     }
// // //   };

// // //   // رفتن به مدیای بعدی
// // //   const nextMedia = () => {
// // //     if (!selectedStory) return;
    
// // //     const currentStoryMedia = selectedStory.stories;
// // //     const isLastMedia = currentMediaIndex >= currentStoryMedia.length - 1;
    
// // //     if (!isLastMedia) {
// // //       setCurrentMediaIndex(prev => prev + 1);
// // //       setProgress(0);
// // //     } else {
// // //       nextStory();
// // //     }
// // //   };

// // //   // رفتن به مدیای قبلی
// // //   const prevMedia = () => {
// // //     if (!selectedStory) return;
    
// // //     const isFirstMedia = currentMediaIndex <= 0;
    
// // //     if (!isFirstMedia) {
// // //       setCurrentMediaIndex(prev => prev - 1);
// // //       setProgress(0);
// // //     } else {
// // //       prevStory();
// // //     }
// // //   };

// // //   // رفتن به استوری بعدی
// // //   const nextStory = () => {
// // //     if (!selectedStory) return;
    
// // //     const isLastStory = currentStoryIndex >= storiesData.length - 1;
    
// // //     if (!isLastStory) {
// // //       const nextStoryData = storiesData[currentStoryIndex + 1];
// // //       openStory(nextStoryData, currentStoryIndex + 1, 0);
// // //     } else {
// // //       closeStory();
// // //     }
// // //   };

// // //   // رفتن به استوری قبلی
// // //   const prevStory = () => {
// // //     if (!selectedStory) return;
    
// // //     const isFirstStory = currentStoryIndex <= 0;
    
// // //     if (!isFirstStory) {
// // //       const prevStoryData = storiesData[currentStoryIndex - 1];
// // //       const lastMediaIndex = (prevStoryData.stories?.length || 1) - 1;
// // //       openStory(prevStoryData, currentStoryIndex - 1, lastMediaIndex);
// // //     }
// // //   };

// // //   // مدیریت تایمر پیشرفت
// // //   useEffect(() => {
// // //     if (!selectedStory) return;
    
// // //     const currentMedia = selectedStory.stories[currentMediaIndex];
    
// // //     if (currentMedia?.type === 'video') {
// // //       if (progressIntervalRef.current) {
// // //         clearInterval(progressIntervalRef.current);
// // //       }
// // //       return;
// // //     }
    
// // //     if (!isPaused) {
// // //       if (progressIntervalRef.current) {
// // //         clearInterval(progressIntervalRef.current);
// // //       }
      
// // //       const interval = setInterval(() => {
// // //         setProgress(prev => {
// // //           if (prev >= 100) {
// // //             clearInterval(interval);
// // //             nextMedia();
// // //             return 0;
// // //           }
// // //           return prev + (100 / (autoPlayInterval / 100));
// // //         });
// // //       }, 100);
      
// // //       progressIntervalRef.current = interval;
      
// // //       return () => {
// // //         clearInterval(interval);
// // //       };
// // //     }
// // //   }, [selectedStory, currentMediaIndex, isPaused, autoPlayInterval]);

// // //   // ریست پیشرفت
// // //   useEffect(() => {
// // //     setProgress(0);
// // //     if (videoRef.current && selectedStory?.stories[currentMediaIndex]?.type === 'video') {
// // //       videoRef.current.currentTime = 0;
// // //       videoRef.current.play().catch(e => console.log('Video play error:', e));
// // //     }
// // //   }, [currentMediaIndex, selectedStory]);

// // //   // هندلر پایان ویدیو
// // //   const handleVideoEnded = () => {
// // //     nextMedia();
// // //   };

// // //   if (!storiesData || storiesData.length === 0) {
// // //     return null;
// // //   }

// // //   const currentMedia = selectedStory?.stories?.[currentMediaIndex];
// // //   const isVideo = currentMedia?.type === 'video';
// // //   const hasNextMedia = selectedStory && currentMediaIndex < (selectedStory.stories?.length || 0) - 1;
// // //   const hasNextStory = selectedStory && currentStoryIndex < storiesData.length - 1;
// // //   const hasPrevMedia = selectedStory && currentMediaIndex > 0;
// // //   const hasPrevStory = selectedStory && currentStoryIndex > 0;

// // //   return (
// // //     <>
// // //       <script type="application/ld+json">
// // //         {JSON.stringify({
// // //           "@context": "https://schema.org",
// // //           "@type": "ItemList",
// // //           "name": "استوری‌های املاک",
// // //           "description": "جدیدترین استوری‌های آژانس‌های املاک و مشاوران املاک",
// // //           "numberOfItems": storiesData.length,
// // //           "itemListElement": storiesData.slice(0, 10).map((story, index) => ({
// // //             "@type": "ListItem",
// // //             "position": index + 1,
// // //             "name": story.name,
// // //             "image": story.avatar || story.stories?.[0]?.image,
// // //           }))
// // //         })}
// // //       </script>

// // //       {/* بخش استوری‌ها */}
// // //       <section className={`stories-section ${className}`} aria-label="استوری‌های املاک">
// // //         <div className="stories-container">
// // //           <div className="stories-header">
// // //             <h2 className="sr-only">استوری‌های امروز آژانس‌های املاک</h2>
// // //           </div>
          
// // //           <div className="stories-slider" role="region" aria-label="لیست استوری‌ها">
// // //             {storiesData.map((story, idx) => (
// // //               <div 
// // //                 key={story.id} 
// // //                 className="story-item"
// // //                 onClick={() => openStory(story, idx, 0)}
// // //                 role="button"
// // //                 tabIndex={0}
// // //                 aria-label={`مشاهده استوری ${story.name}`}
// // //                 onKeyPress={(e) => {
// // //                   if (e.key === 'Enter' || e.key === ' ') {
// // //                     openStory(story, idx, 0);
// // //                   }
// // //                 }}
// // //               >
// // //                 <div className={`story-avatar-wrapper ${story.isViewed ? 'viewed' : ''}`}>
// // //                   <img 
// // //                     src={story.avatar || story.stories?.[0]?.image} 
// // //                     alt={`آواتار ${story.name}`}
// // //                     className="story-avatar"
// // //                     loading="lazy"
// // //                     width="80"
// // //                     height="80"
// // //                     onError={(e) => {
// // //                       e.target.src = 'https://via.placeholder.com/80x80?text=User';
// // //                     }}
// // //                   />
// // //                   {story.isLive && (
// // //                     <div className="story-live-badge" aria-label="پخش زنده">
// // //                       <span aria-hidden="true">●</span> زنده
// // //                     </div>
// // //                   )}
// // //                   {!story.isViewed && !story.isLive && (
// // //                     <div className="story-unread-badge" aria-label="استوری جدید"></div>
// // //                   )}
// // //                 </div>
// // //                 <span className="story-name">{story.name}</span>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* مودال استوری */}
// // //       {selectedStory && selectedStory.stories && currentMedia && (
// // //         <div 
// // //           className="story-modal"
// // //           onClick={closeStory}
// // //           role="dialog"
// // //           aria-label={`استوری ${selectedStory.name}`}
// // //           aria-modal="true"
// // //         >
// // //           <div className="story-modal-content" onClick={(e) => e.stopPropagation()}>
            
// // //             {/* نوار پیشرفت - در بالا */}
// // //             <div className="story-progress-container">
// // //               {selectedStory.stories.map((_, idx) => (
// // //                 <div 
// // //                   key={idx} 
// // //                   className={`story-progress-bar ${idx === currentMediaIndex ? 'active' : ''} ${idx < currentMediaIndex ? 'completed' : ''}`}
// // //                   onClick={(e) => {
// // //                     e.stopPropagation();
// // //                     if (idx !== currentMediaIndex) {
// // //                       setCurrentMediaIndex(idx);
// // //                       setProgress(0);
// // //                     }
// // //                   }}
// // //                 >
// // //                   <div 
// // //                     className="story-progress-fill"
// // //                     style={{ 
// // //                       width: idx === currentMediaIndex ? `${progress}%` : idx < currentMediaIndex ? '100%' : '0%'
// // //                     }}
// // //                   />
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             {/* هدر با دکمه بستن */}
// // //             <div className="story-modal-header">
// // //               <img 
// // //                 src={selectedStory.avatar || selectedStory.stories[0]?.image} 
// // //                 alt={selectedStory.name}
// // //                 className="story-modal-avatar"
// // //                 width="40"
// // //                 height="40"
// // //               />
// // //               <div className="story-modal-info">
// // //                 <div className="story-modal-name">{selectedStory.name}</div>
// // //                 <div className="story-modal-time">
// // //                   {new Date(currentMedia.timestamp || Date.now()).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
// // //                 </div>
// // //               </div>
// // //               <button 
// // //                 className="story-modal-close" 
// // //                 onClick={(e) => {
// // //                   e.stopPropagation();
// // //                   closeStory();
// // //                 }}
// // //                 aria-label="بستن استوری"
// // //               >
// // //                 ✕
// // //               </button>
// // //             </div>

// // //             {/* محتوای استوری */}
// // //             <div 
// // //               className="story-content"
// // //               onMouseEnter={() => setIsPaused(true)}
// // //               onMouseLeave={() => setIsPaused(false)}
// // //             >
// // //               {isVideo ? (
// // //                 <video 
// // //                   ref={videoRef}
// // //                   src={currentMedia.url}
// // //                   className="story-media"
// // //                   autoPlay
// // //                   muted
// // //                   playsInline
// // //                   onEnded={handleVideoEnded}
// // //                   aria-label={`ویدیوی استوری ${selectedStory.name}`}
// // //                 />
// // //               ) : (
// // //                 <img 
// // //                   src={currentMedia.url} 
// // //                   alt={currentMedia.caption || `استوری ${selectedStory.name}`}
// // //                   className="story-media"
// // //                   loading="lazy"
// // //                   onError={(e) => {
// // //                     e.target.src = 'https://via.placeholder.com/400x700?text=Story+Not+Found';
// // //                   }}
// // //                 />
// // //               )}
              
// // //               {currentMedia.caption && (
// // //                 <div className="story-caption">
// // //                   <p>{currentMedia.caption}</p>
// // //                 </div>
// // //               )}

// // //               {currentMedia.link && (
// // //                 <a 
// // //                   href={currentMedia.link}
// // //                   className="story-link-btn"
// // //                   target="_blank"
// // //                   rel="noopener noreferrer"
// // //                   aria-label={currentMedia.linkText || 'مشاهده بیشتر'}
// // //                   onClick={(e) => e.stopPropagation()}
// // //                 >
// // //                   {currentMedia.linkText || 'مشاهده بیشتر ←'}
// // //                 </a>
// // //               )}
// // //             </div>

// // //             {/* دکمه‌های ناوبری - جدا از مناطق لمسی */}
// // //             <button 
// // //               className="story-nav-btn story-nav-prev"
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 prevMedia();
// // //               }}
// // //               aria-label="قبلی"
// // //             >
// // //               <span aria-hidden="true">›</span>
// // //             </button>

// // //             <button 
// // //               className="story-nav-btn story-nav-next"
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 nextMedia();
// // //               }}
// // //               aria-label="بعدی"
// // //             >
// // //               <span aria-hidden="true">‹</span>
// // //             </button>

// // //             {/* مناطق لمسی فقط برای کلیک چپ/راست */}
// // //             <div className="story-touch-left" onClick={(e) => {
// // //               e.stopPropagation();
// // //               prevMedia();
// // //             }} />
// // //             <div className="story-touch-right" onClick={(e) => {
// // //               e.stopPropagation();
// // //               nextMedia();
// // //             }} />
// // //           </div>
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // };

// // // export default Stories;

// // // src/components/Stories/Stories.jsx - نسخه نهایی با دکمه بستن بالا وسط

// // import React, { useState, useEffect, useRef } from 'react';
// // import './Stories.css';

// // const Stories = ({ 
// //   storiesData, 
// //   onStoryClick, 
// //   autoPlayInterval = 5000,
// //   className = '' 
// // }) => {
// //   const [selectedStory, setSelectedStory] = useState(null);
// //   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
// //   const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
// //   const [progress, setProgress] = useState(0);
// //   const [isPaused, setIsPaused] = useState(false);
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

// //             {/* هدر با اطلاعات کاربر */}
// //             <div className="story-modal-header">
// //               <img 
// //                 src={selectedStory.avatar || selectedStory.stories[0]?.image} 
// //                 alt={selectedStory.name}
// //                 className="story-modal-avatar"
// //                 width="40"
// //                 height="40"
// //               />
// //               <div className="story-modal-info">
// //                 <div className="story-modal-name">{selectedStory.name}</div>
// //                 <div className="story-modal-time">
// //                   {new Date(currentMedia.timestamp || Date.now()).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
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

// //       {/* دکمه‌های ناوبری چپ و راست */}
// // <button 
// //   className={`story-nav-btn story-nav-prev ${(!hasPrevMedia && !hasPrevStory) ? 'hidden' : ''}`}
// //   onClick={(e) => {
// //     e.stopPropagation();
// //     prevMedia();
// //   }}
// //   aria-label="قبلی"
// // >
// //   <span aria-hidden="true">‹</span>
// // </button>

// //      <button 
// //   className={`story-nav-btn story-nav-next ${(!hasNextMedia && !hasNextStory) ? 'hidden' : ''}`}
// //   onClick={(e) => {
// //     e.stopPropagation();
// //     nextMedia();
// //   }}
// //   aria-label="بعدی"
// // >
// //   <span aria-hidden="true">›</span>
// // </button>

// //             {/* مناطق لمسی کلیک */}
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

// // src/components/Stories/Stories.jsx - نسخه نهایی با دکمه سیو و کلیک روی پروفایل

// import React, { useState, useEffect, useRef } from 'react';
// import './Stories.css';

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
//   const [savedStories, setSavedStories] = useState({});
//   const progressIntervalRef = useRef(null);
//   const videoRef = useRef(null);

//   // باز کردن استوری
//   const openStory = (story, storyIdx, mediaIdx = 0) => {
//     setSelectedStory(story);
//     setCurrentStoryIndex(storyIdx);
//     setCurrentMediaIndex(mediaIdx);
//     setProgress(0);
//     setIsPaused(false);
//     if (onStoryClick) onStoryClick(story);
//   };

//   // بستن استوری
//   const closeStory = () => {
//     setSelectedStory(null);
//     setCurrentStoryIndex(0);
//     setCurrentMediaIndex(0);
//     setProgress(0);
//     setIsPaused(false);
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
//       // حذف از ذخیره شده‌ها
//       setSavedStories(prev => {
//         const newSaved = { ...prev };
//         delete newSaved[story.id];
//         return newSaved;
//       });
//     } else {
//       // اضافه به ذخیره شده‌ها
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

//   // هندلر پایان ویدیو
//   const handleVideoEnded = () => {
//     nextMedia();
//   };

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
//       <script type="application/ld+json">
//         {JSON.stringify({
//           "@context": "https://schema.org",
//           "@type": "ItemList",
//           "name": "استوری‌های املاک",
//           "description": "جدیدترین استوری‌های آژانس‌های املاک و مشاوران املاک",
//           "numberOfItems": storiesData.length,
//           "itemListElement": storiesData.slice(0, 10).map((story, index) => ({
//             "@type": "ListItem",
//             "position": index + 1,
//             "name": story.name,
//             "image": story.avatar || story.stories?.[0]?.image,
//           }))
//         })}
//       </script>

//       {/* بخش استوری‌ها */}
//       <section className={`stories-section ${className}`} aria-label="استوری‌های املاک">
//         <div className="stories-container">
//           <div className="stories-header">
//             <h2 className="sr-only">استوری‌های امروز آژانس‌های املاک</h2>
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
//                   {story.isLive && (
//                     <div className="story-live-badge" aria-label="پخش زنده">
//                       <span aria-hidden="true">●</span> زنده
//                     </div>
//                   )}
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
//             <div className="story-progress-container">
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

//             {/* دکمه بستن - بالا وسط */}
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

//             {/* دکمه سیو/ذخیره - بالا راست */}
//             <button 
//               className={`story-save-btn ${isSaved ? 'saved' : ''}`}
//               onClick={(e) => handleSaveStory(e, selectedStory)}
//               aria-label={isSaved ? 'حذف از ذخیره شده‌ها' : 'ذخیره استوری'}
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
//               </svg>
//             </button>

//             {/* هدر با اطلاعات کاربر - قابل کلیک */}
//             <div 
//               className="story-modal-header clickable"
//               onClick={(e) => handleProfileClick(e, selectedStory)}
//               role="button"
//               tabIndex={0}
//               onKeyPress={(e) => {
//                 if (e.key === 'Enter' || e.key === ' ') {
//                   handleProfileClick(e, selectedStory);
//                 }
//               }}
//               aria-label={`مشاهده پروفایل ${selectedStory.name}`}
//             >
//               <img 
//                 src={selectedStory.avatar || selectedStory.stories[0]?.image} 
//                 alt={selectedStory.name}
//                 className="story-modal-avatar"
//                 width="40"
//                 height="40"
//               />
//               <div className="story-modal-info">
//                 <div className="story-modal-name">{selectedStory.name}</div>
//                 <div className="story-modal-time">
//                   {new Date(currentMedia.timestamp || Date.now()).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
//                 </div>
//               </div>
//               <div className="profile-arrow">›</div>
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
//                   aria-label={`ویدیوی استوری ${selectedStory.name}`}
//                 />
//               ) : (
//                 <img 
//                   src={currentMedia.url} 
//                   alt={currentMedia.caption || `استوری ${selectedStory.name}`}
//                   className="story-media"
//                   loading="lazy"
//                   onError={(e) => {
//                     e.target.src = 'https://via.placeholder.com/400x700?text=Story+Not+Found';
//                   }}
//                 />
//               )}
              
//               {currentMedia.caption && (
//                 <div className="story-caption">
//                   <p>{currentMedia.caption}</p>
//                 </div>
//               )}

//               {currentMedia.link && (
//                 <a 
//                   href={currentMedia.link}
//                   className="story-link-btn"
//                   target="_blank"
//                   rel="noopener noreferrer"
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
//               aria-label="قبلی"
//             >
//               <span aria-hidden="true">›</span>
//             </button>

//             <button 
//               className={`story-nav-btn story-nav-next ${(!hasNextMedia && !hasNextStory) ? 'hidden' : ''}`}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 nextMedia();
//               }}
//               aria-label="بعدی"
//             >
//               <span aria-hidden="true">‹</span>
//             </button>

//             {/* مناطق لمسی */}
//             <div className="story-touch-left" onClick={(e) => {
//               e.stopPropagation();
//               prevMedia();
//             }} />
//             <div className="story-touch-right" onClick={(e) => {
//               e.stopPropagation();
//               nextMedia();
//             }} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Stories;

// src/components/Stories/Stories.jsx - نسخه نهایی

import React, { useState, useEffect, useRef } from 'react';
import './Stories.css';

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
  const [savedStories, setSavedStories] = useState({});
  const progressIntervalRef = useRef(null);
  const videoRef = useRef(null);

  // باز کردن استوری
  const openStory = (story, storyIdx, mediaIdx = 0) => {
    setSelectedStory(story);
    setCurrentStoryIndex(storyIdx);
    setCurrentMediaIndex(mediaIdx);
    setProgress(0);
    setIsPaused(false);
    if (onStoryClick) onStoryClick(story);
  };

  // بستن استوری
  const closeStory = () => {
    setSelectedStory(null);
    setCurrentStoryIndex(0);
    setCurrentMediaIndex(0);
    setProgress(0);
    setIsPaused(false);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  // رفتن به مدیای بعدی
  const nextMedia = () => {
    if (!selectedStory) return;
    
    const currentStoryMedia = selectedStory.stories;
    const isLastMedia = currentMediaIndex >= currentStoryMedia.length - 1;
    
    if (!isLastMedia) {
      setCurrentMediaIndex(prev => prev + 1);
      setProgress(0);
    } else {
      nextStory();
    }
  };

  // رفتن به مدیای قبلی
  const prevMedia = () => {
    if (!selectedStory) return;
    
    const isFirstMedia = currentMediaIndex <= 0;
    
    if (!isFirstMedia) {
      setCurrentMediaIndex(prev => prev - 1);
      setProgress(0);
    } else {
      prevStory();
    }
  };

  // رفتن به استوری بعدی
  const nextStory = () => {
    if (!selectedStory) return;
    
    const isLastStory = currentStoryIndex >= storiesData.length - 1;
    
    if (!isLastStory) {
      const nextStoryData = storiesData[currentStoryIndex + 1];
      openStory(nextStoryData, currentStoryIndex + 1, 0);
    } else {
      closeStory();
    }
  };

  // رفتن به استوری قبلی
  const prevStory = () => {
    if (!selectedStory) return;
    
    const isFirstStory = currentStoryIndex <= 0;
    
    if (!isFirstStory) {
      const prevStoryData = storiesData[currentStoryIndex - 1];
      const lastMediaIndex = (prevStoryData.stories?.length || 1) - 1;
      openStory(prevStoryData, currentStoryIndex - 1, lastMediaIndex);
    }
  };

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

  // مدیریت تایمر پیشرفت
  useEffect(() => {
    if (!selectedStory) return;
    
    const currentMedia = selectedStory.stories[currentMediaIndex];
    
    if (currentMedia?.type === 'video') {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      return;
    }
    
    if (!isPaused) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            nextMedia();
            return 0;
          }
          return prev + (100 / (autoPlayInterval / 100));
        });
      }, 100);
      
      progressIntervalRef.current = interval;
      
      return () => {
        clearInterval(interval);
      };
    }
  }, [selectedStory, currentMediaIndex, isPaused, autoPlayInterval]);

  // ریست پیشرفت
  useEffect(() => {
    setProgress(0);
    if (videoRef.current && selectedStory?.stories[currentMediaIndex]?.type === 'video') {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(e => console.log('Video play error:', e));
    }
  }, [currentMediaIndex, selectedStory]);

  // هندلر پایان ویدیو
  const handleVideoEnded = () => {
    nextMedia();
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
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "استوری‌های املاک",
          "description": "جدیدترین استوری‌های آژانس‌های املاک و مشاوران املاک",
          "numberOfItems": storiesData.length,
          "itemListElement": storiesData.slice(0, 10).map((story, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": story.name,
            "image": story.avatar || story.stories?.[0]?.image,
          }))
        })}
      </script>

      {/* بخش استوری‌ها */}
      <section className={`stories-section ${className}`} aria-label="استوری‌های املاک">
        <div className="stories-container">
          <div className="stories-header">
            <h2 className="sr-only">استوری‌های امروز آژانس‌های املاک</h2>
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
                    src={story.avatar || story.stories?.[0]?.image} 
                    alt={`آواتار ${story.name}`}
                    className="story-avatar"
                    loading="lazy"
                    width="80"
                    height="80"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x80?text=User';
                    }}
                  />
                  {story.isLive && (
                    <div className="story-live-badge" aria-label="پخش زنده">
                      <span aria-hidden="true">●</span> زنده
                    </div>
                  )}
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
            <div className="story-progress-container">
              {selectedStory.stories.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`story-progress-bar ${idx === currentMediaIndex ? 'active' : ''} ${idx < currentMediaIndex ? 'completed' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (idx !== currentMediaIndex) {
                      setCurrentMediaIndex(idx);
                      setProgress(0);
                    }
                  }}
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

            {/* دکمه بستن - بالا وسط */}
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

            {/* دکمه سیو/ذخیره - سمت چپ */}
            <button 
              className={`story-save-btn ${isSaved ? 'saved' : ''}`}
              onClick={(e) => handleSaveStory(e, selectedStory)}
              aria-label={isSaved ? 'حذف از ذخیره شده‌ها' : 'ذخیره استوری'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>

            {/* هدر با اطلاعات کاربر - فقط عکس و اسم لینک داره */}
            <div className="story-modal-header">
              <div 
                className="story-profile-link"
                onClick={(e) => handleProfileClick(e, selectedStory)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleProfileClick(e, selectedStory);
                  }
                }}
                aria-label={`مشاهده پروفایل ${selectedStory.name}`}
              >
                <img 
                  src={selectedStory.avatar || selectedStory.stories[0]?.image} 
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
                  aria-label={`ویدیوی استوری ${selectedStory.name}`}
                />
              ) : (
                <img 
                  src={currentMedia.url} 
                  alt={currentMedia.caption || `استوری ${selectedStory.name}`}
                  className="story-media"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x700?text=Story+Not+Found';
                  }}
                />
              )}
              
              {currentMedia.caption && (
                <div className="story-caption">
                  <p>{currentMedia.caption}</p>
                </div>
              )}

              {currentMedia.link && (
                <a 
                  href={currentMedia.link}
                  className="story-link-btn"
                  target="_blank"
                  rel="noopener noreferrer"
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
              aria-label="قبلی"
            >
                      <span aria-hidden="true">‹</span>
              
            </button>

            <button 
              className={`story-nav-btn story-nav-next ${(!hasNextMedia && !hasNextStory) ? 'hidden' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                nextMedia();
              }}
              aria-label="بعدی"
            >
        <span aria-hidden="true">›</span>
            </button>

            {/* مناطق لمسی */}
            <div className="story-touch-left" onClick={(e) => {
              e.stopPropagation();
              prevMedia();
            }} />
            <div className="story-touch-right" onClick={(e) => {
              e.stopPropagation();
              nextMedia();
            }} />
          </div>
        </div>
      )}
    </>
  );
};

export default Stories;