// // // // src/components/Stories/StoriesFooter.jsx
// // // import React from 'react';
// // // import { Link } from 'react-router-dom';
// // // import './StoriesFooter.css';

// // // const StoriesFooter = ({ storiesData }) => {
// // //   if (!storiesData || storiesData.length === 0) {
// // //     return null;
// // //   }

// // //   // گرفتن 6 آژانس آخر برای نمایش
// // //   const recentAgencies = storiesData.slice(0, 6);

// // //   return (
// // //     <div className="stories-footer">
// // //       <div className="container">
// // //         <div className="stories-footer-content">
// // //           <div className="stories-footer-header">
// // //             <h3 className="stories-footer-title">
// // //               <span className="title-icon">📸</span>
// // //               آژانس‌های املاک فعال در استوری
// // //             </h3>
// // //             <p className="stories-footer-description">
// // //               جدیدترین استوری‌های آژانس‌های معتبر املاک تهران و شهرهای بزرگ
// // //             </p>
// // //           </div>

// // //           <div className="stories-footer-grid">
// // //             {recentAgencies.map((story) => (
// // //               <div key={story.id} className="stories-footer-card">
// // //                 <Link to={story.profileUrl || `/agency/${story.id}`} className="footer-card-link">
// // //                   <div className="footer-card-image">
// // //                     <img 
// // //                       src={story.avatar || story.stories?.[0]?.image} 
// // //                       alt={story.name}
// // //                       loading="lazy"
// // //                       width="60"
// // //                       height="60"
// // //                     />
// // //                     {story.isLive && <span className="live-badge">زنده</span>}
// // //                   </div>
// // //                   <div className="footer-card-info">
// // //                     <h4 className="footer-card-name">{story.name}</h4>
// // //                     <p className="footer-card-stats">
// // //                       <span>📷 {story.stories?.length || 0} استوری</span>
// // //                       {story.isViewed ? <span className="viewed-badge">✓ بازدید شده</span> : <span className="new-badge">جدید</span>}
// // //                     </p>
// // //                     {story.stories?.[0]?.caption && (
// // //                       <p className="footer-card-caption">
// // //                         {story.stories[0].caption.length > 60 
// // //                           ? `${story.stories[0].caption.substring(0, 60)}...` 
// // //                           : story.stories[0].caption}
// // //                       </p>
// // //                     )}
// // //                   </div>
// // //                 </Link>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           <div className="stories-footer-bottom">
// // //             <Link to="/stories" className="view-all-stories-btn">
// // //               مشاهده همه استوری‌های آژانس‌ها
// // //               <span className="btn-arrow">←</span>
// // //             </Link>
// // //           </div>

// // //           {/* متن سئو - قابل مشاهده برای کاربر و گوگل */}
// // //           <div className="stories-seo-text">
// // //             <p>
// // //               آژانس‌های املاک برتر تهران با ارائه خدمات خرید، فروش و اجاره ملک در 
// // //               مناطق مختلف تهران از جمله شمال تهران، غرب تهران، شرق تهران و جنوب تهران. 
// // //               مشاهده جدیدترین استوری‌های آژانس‌های معتبر املاک و مشاوران املاک با 
// // //               بهترین پیشنهادات مسکن در <strong>سایت املاک</strong>.
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default StoriesFooter;

// // // src/components/Stories/StoriesFooter.jsx - نسخه اسلایدر
// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import Slider from 'react-slick';
// // import './StoriesFooter.css';

// // const StoriesFooter = ({ storiesData }) => {
// //   if (!storiesData || storiesData.length === 0) {
// //     return null;
// //   }

// //   const sliderSettings = {
// //     dots: false,
// //     infinite: false,
// //     speed: 500,
// //     slidesToShow: 5,
// //     slidesToScroll: 1,
// //     autoplay: false,
// //     arrows: true,
// //     rtl: true,
// //     responsive: [
// //       { breakpoint: 1024, settings: { slidesToShow: 4 } },
// //       { breakpoint: 768, settings: { slidesToShow: 3 } },
// //       { breakpoint: 480, settings: { slidesToShow: 2 } }
// //     ]
// //   };

// //   return (
// //     <div className="stories-footer">
// //       <div className="container">
// //         <div className="stories-footer-header">
// //           <h3 className="stories-footer-title">
// //             <span className="title-icon">📸</span>
// //             استوری‌های جدید آژانس‌های املاک
// //           </h3>
// //           <Link to="/stories" className="stories-footer-more">
// //             مشاهده همه ({storiesData.length})
// //           </Link>
// //         </div>

// //         <div className="stories-footer-slider">
// //           <Slider {...sliderSettings}>
// //             {storiesData.slice(0, 15).map((story) => (
// //               <div key={story.id} className="footer-slide">
// //                 <Link to={story.profileUrl || `/agency/${story.id}`} className="footer-slide-link">
// //                   <div className="footer-slide-image">
// //                     <img 
// //                       src={story.avatar || story.stories?.[0]?.image} 
// //                       alt={story.name}
// //                       loading="lazy"
// //                     />
// //                     {story.isLive && <span className="live-dot"></span>}
// //                   </div>
// //                   <h4 className="footer-slide-name">{story.name}</h4>
// //                   <span className="footer-slide-count">{story.stories?.length || 0} استوری</span>
// //                 </Link>
// //               </div>
// //             ))}
// //           </Slider>
// //         </div>

// //         {/* متن سئو - جمع و جور */}
// //         <div className="stories-seo-text">
// //           <p>
// //             {storiesData.length}+ آژانس املاک معتبر | خرید و فروش و اجاره ملک در تهران
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default StoriesFooter;

// // src/components/Stories/StoriesFooter.jsx - نسخه اصلاح شده
// import React from 'react';
// import { Link } from 'react-router-dom';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import './StoriesFooter.css';

// const StoriesFooter = ({ storiesData }) => {
//   // بررسی کامل داده‌ها
//   if (!storiesData || !Array.isArray(storiesData) || storiesData.length === 0) {
//     return null;
//   }

//   // فیلتر کردن استوری‌های معتبر
//   const validStories = storiesData.filter(story => story && story.id && (story.avatar || story.stories?.[0]?.image));
  
//   if (validStories.length === 0) {
//     return null;
//   }

//   // حداکثر 20 آیتم برای نمایش در اسلایدر
//   const displayStories = validStories.slice(0, 20);

//   const sliderSettings = {
//     dots: false,
//     infinite: displayStories.length > 5,
//     speed: 500,
//     slidesToShow: Math.min(5, displayStories.length),
//     slidesToScroll: 1,
//     autoplay: false,
//     arrows: displayStories.length > 5,
//     rtl: false, // تغییر به false برای جلوگیری از مشکل
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: Math.min(4, displayStories.length) } },
//       { breakpoint: 768, settings: { slidesToShow: Math.min(3, displayStories.length) } },
//       { breakpoint: 480, settings: { slidesToShow: Math.min(2, displayStories.length) } }
//     ]
//   };

//   return (
//     <div className="stories-footer">
//       <div className="container">
//         <div className="stories-footer-header">
//           <h3 className="stories-footer-title">
//             <span className="title-icon">📸</span>
//             استوری‌های جدید آژانس‌های املاک
//           </h3>
//           <Link to="/stories" className="stories-footer-more">
//             مشاهده همه <span className="more-count">({validStories.length})</span>
//           </Link>
//         </div>

//         {displayStories.length > 0 && (
//           <div className="stories-footer-slider">
//             <Slider {...sliderSettings}>
//               {displayStories.map((story) => (
//                 <div key={story.id} className="footer-slide">
//                   <Link 
//                     to={story.profileUrl || `/agency/${story.id}`} 
//                     className="footer-slide-link"
//                   >
//                     <div className="footer-slide-image">
//                       <img 
//                         src={story.avatar || story.stories?.[0]?.image} 
//                         alt={story.name || 'آژانس املاک'}
//                         loading="lazy"
//                         onError={(e) => {
//                           e.target.src = 'https://via.placeholder.com/70x70?text=Agent';
//                         }}
//                       />
//                       {story.isLive && <span className="live-dot"></span>}
//                     </div>
//                     <h4 className="footer-slide-name">{story.name || 'آژانس املاک'}</h4>
//                     <span className="footer-slide-count">{story.stories?.length || 0} استوری</span>
//                   </Link>
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         )}

//         {/* متن سئو */}
//         <div className="stories-seo-text">
//           <p>
//             {validStories.length}+ آژانس املاک معتبر | خرید و فروش و اجاره ملک در تهران | 
//             مشاوره رایگان و بهترین قیمت‌های مسکن
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StoriesFooter;

// src/components/Stories/StoriesFooter.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './StoriesFooter.css';

const StoriesFooter = ({ storiesData, onStoryClick }) => {
  // بررسی کامل داده‌ها
  if (!storiesData || !Array.isArray(storiesData) || storiesData.length === 0) {
    return null;
  }

  // فیلتر کردن استوری‌های معتبر
  const validStories = storiesData.filter(story => story && story.id && (story.avatar || story.stories?.[0]?.image));
  
  if (validStories.length === 0) {
    return null;
  }

  // حداکثر 20 آیتم برای نمایش در اسلایدر
  const displayStories = validStories.slice(0, 20);

  // تابع باز کردن استوری
  const handleOpenStory = (story, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onStoryClick) {
      onStoryClick(story);
    }
  };

  const sliderSettings = {
    dots: false,
    infinite: displayStories.length > 5,
    speed: 500,
    slidesToShow: Math.min(5, displayStories.length),
    slidesToScroll: 1,
    autoplay: false,
    arrows: displayStories.length > 5,
    rtl: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(4, displayStories.length) } },
      { breakpoint: 768, settings: { slidesToShow: Math.min(3, displayStories.length) } },
      { breakpoint: 480, settings: { slidesToShow: Math.min(2, displayStories.length) } }
    ]
  };

  return (
    <div className="stories-footer">
      <div className="container">
        <div className="stories-footer-header">
          <h3 className="stories-footer-title">
            <span className="title-icon">📸</span>
            استوری‌های جدید آژانس‌های املاک
          </h3>
          <Link to="/stories" className="stories-footer-more">
            مشاهده همه <span className="more-count">({validStories.length})</span>
          </Link>
        </div>

        {displayStories.length > 0 && (
          <div className="stories-footer-slider">
            <Slider {...sliderSettings}>
              {displayStories.map((story) => (
                <div key={story.id} className="footer-slide">
                  <div 
                    className="footer-slide-link"
                    onClick={(e) => handleOpenStory(story, e)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleOpenStory(story, e);
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="footer-slide-image">
                      <img 
                        src={`https://localhost:7178${story.avatar}` || story.stories?.[0]?.image} 
                        alt={story.name || 'آژانس املاک'}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/70x70?text=Agent';
                        }}
                      />
                      {story.isLive && <span className="live-dot"></span>}
                    </div>
                    <h4 className="footer-slide-name">{story.name || 'آژانس املاک'}</h4>
                    <span className="footer-slide-count">{story.stories?.length || 0} استوری</span>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}

        {/* متن سئو */}
        <div className="stories-seo-text">
          <p>
            برای مشاهده استوری هر آژانس، روی نام آن کلیک کنید | {validStories.length}+ آژانس املاک معتبر در تهران
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoriesFooter;