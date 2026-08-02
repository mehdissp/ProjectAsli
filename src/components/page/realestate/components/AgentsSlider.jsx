// // // src/components/AgentsSlider.jsx
// // import React, { useState, useEffect } from 'react';
// // import Slider from 'react-slick';
// // import 'slick-carousel/slick/slick.css';
// // import 'slick-carousel/slick/slick-theme.css';
// // import { FaStar, FaHome, FaPhone, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// // import './AgentsSlider.css';

// // const AgentsSlider = () => {
// //   const [agents, setAgents] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchAgents = async () => {
// //       try {
// //         const response = await fetch('https://localhost:7178/api/RealEstatePage/GetIndependentAgent');
// //         const result = await response.json();
        
// //         if (result.status === 200 && result.data) {
// //           setAgents(result.data);
// //         }
// //       } catch (error) {
// //         console.error('خطا در دریافت مشاوران:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchAgents();
// //   }, []);

// //   // دکمه‌های سفارشی اسلایدر
// //   const NextArrow = ({ onClick }) => (
// //     <button className="slick-arrow slick-next-custom" onClick={onClick}>
// //       <FaArrowLeft />
// //     </button>
// //   );

// //   const PrevArrow = ({ onClick }) => (
// //     <button className="slick-arrow slick-prev-custom" onClick={onClick}>
// //       <FaArrowRight />
// //     </button>
// //   );

// //   const sliderSettings = {
// //     dots: true,
// //     infinite: true,
// //     speed: 500,
// //     slidesToShow: 5,
// //     slidesToScroll: 1,
// //     autoplay: true,
// //     autoplaySpeed: 3500,
// //     pauseOnHover: true,
// //     arrows: true,
// //     rtl: true,
// //     nextArrow: <NextArrow />,
// //     prevArrow: <PrevArrow />,
// //     responsive: [
// //       {
// //         breakpoint: 1280,
// //         settings: {
// //           slidesToShow: 4,
// //           slidesToScroll: 1,
// //         }
// //       },
// //       {
// //         breakpoint: 1024,
// //         settings: {
// //           slidesToShow: 3,
// //           slidesToScroll: 1,
// //           arrows: true
// //         }
// //       },
// //       {
// //         breakpoint: 768,
// //         settings: {
// //           slidesToShow: 2,
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
// //           dots: true,
// //           centerMode: true,
// //           centerPadding: '30px'
// //         }
// //       }
// //     ]
// //   };

// //   if (loading) {
// //     return (
// //       <div className="agents-slider-container">
// //         <div className="agents-header">
// //           <span className="header-badge">👨‍💼 متخصصین</span>
// //           <h2 className="agents-title">مشاوران <span>مستقل</span></h2>
// //         </div>
// //         <div className="agents-skeleton">
// //           {[1, 2, 3, 4, 5].map(n => (
// //             <div key={n} className="skeleton-item">
// //               <div className="skeleton-avatar"></div>
// //               <div className="skeleton-name"></div>
// //               <div className="skeleton-stats"></div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="agents-slider-container">
// //       <div className="agents-header">
// //         <span className="header-badge">👨‍💼 متخصصین</span>
// //         <h2 className="agents-title">
// //           مشاوران <span>مستقل</span>
// //         </h2>
// //         <p className="agents-subtitle">حرفه‌ای‌ترین مشاوران املاک</p>
// //       </div>

// //       {agents.length > 0 ? (
// //         <div className="agents-slider-wrapper">
// //           <Slider {...sliderSettings}>
// //             {agents.map((agent) => (
// //               <div key={agent.userId} className="agent-slide">
// //                 <div className="agent-card">
// //                   <div className="agent-avatar-container">
              
// //                       <img 
// //                         src={`https://localhost:7178${agent.avatar}`}
// //                         alt={agent.fullName}
// //                         className="agent-avatar"
// //                         onError={(e) => {
// //                           e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23667eea"/%3E%3Ctext x="50" y="58" text-anchor="middle" fill="white" font-size="40" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E';
// //                         }}
// //                       />
            
// //                     <div className="agent-score">
// //                       <FaStar className="score-icon" />
// //                       <span>{agent.score || '۵۰'}</span>
// //                     </div>
// //                   </div>
                  
// //                   <h3 className="agent-name">{agent.fullName}</h3>
                  
// //                   <div className="agent-info-row">
// //                     <div className="agent-info-item">
// //                       <FaHome className="info-icon" />
// //                       <span className="info-number">{agent.totalRealEstate}</span>
// //                       <span className="info-label">ملک</span>
// //                     </div>
// //                     <div className="agent-info-divider"></div>
// //                     <div className="agent-info-item">
// //                       <span className="info-number">۱۲+</span>
// //                       <span className="info-label">مشتری</span>
// //                     </div>
// //                   </div>

// //                   <button className="agent-call-btn">
// //                     <FaPhone className="call-icon" />
// //                     تماس با مشاور
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </Slider>
// //         </div>
// //       ) : (
// //         <div className="agents-empty">
// //           <p>هیچ مشاوری یافت نشد</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AgentsSlider;

// // src/components/AgentsSlider.jsx
// import React, { useState, useEffect } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { FaStar, FaHome, FaPhone, FaArrowLeft, FaArrowRight, FaUserCheck } from 'react-icons/fa';
// import './AgentsSlider.css';

// const AgentsSlider = () => {
//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         const response = await fetch('https://localhost:7178/api/RealEstatePage/GetIndependentAgent');
//         const result = await response.json();
        
//         if (result.status === 200 && result.data) {
//           setAgents(result.data);
//         }
//       } catch (error) {
//         console.error('خطا در دریافت مشاوران:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAgents();
//   }, []);

//   const NextArrow = ({ onClick }) => (
//     <button className="slick-arrow slick-next-custom" onClick={onClick} aria-label="Next">
//       <FaArrowLeft />
//     </button>
//   );

//   const PrevArrow = ({ onClick }) => (
//     <button className="slick-arrow slick-prev-custom" onClick={onClick} aria-label="Previous">
//       <FaArrowRight />
//     </button>
//   );

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 600,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     pauseOnHover: true,
//     arrows: true,
//     rtl: true,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1280,
//         settings: {
//           slidesToShow: 4,
//           slidesToScroll: 1,
//         }
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           arrows: true
//         }
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
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
//           dots: true,
//           centerMode: false, // غیرفعال کردن centerMode
//           centerPadding: '0px' // حذف padding اضافی
//         }
//       }
//     ]
//   };

//   if (loading) {
//     return (
//       <section className="agents-slider-container">
//         <div className="agents-header">
//           <span className="header-badge">🏆 متخصصین</span>
//           <h2 className="agents-title">مشاوران <span>مستقل</span></h2>
//           <p className="agents-subtitle">حرفه‌ای‌ترین مشاوران املاک</p>
//         </div>
//         <div className="agents-skeleton-grid">
//           {[1, 2, 3, 4, 5].map(n => (
//             <div key={n} className="skeleton-card">
//               <div className="skeleton-avatar"></div>
//               <div className="skeleton-name"></div>
//               <div className="skeleton-stats"></div>
//               <div className="skeleton-button"></div>
//             </div>
//           ))}
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="agents-slider-container">
//       <div className="agents-header">
//         <span className="header-badge">🏆 متخصصین</span>
//         <h2 className="agents-title">
//           مشاوران <span>مستقل</span>
//         </h2>
//         <p className="agents-subtitle">حرفه‌ای‌ترین مشاوران املاک</p>
//         <div className="header-decoration">
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </div>

//       {agents.length > 0 ? (
//         <div className="agents-slider-wrapper">
//           <Slider {...sliderSettings}>
//             {agents.map((agent) => (
//               <div key={agent.userId} className="agent-slide">
//                 <div className="agent-card">
//                   <div className="agent-card-glow"></div>
                  
//                   <div className="agent-avatar-container">
//                     <div className="agent-avatar-ring">
//                       <img 
//                         src={`https://localhost:7178${agent.avatar}`}
//                         alt={agent.fullName}
//                         className="agent-avatar"
//                         loading="lazy"
//                         onError={(e) => {
//                           e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23667eea"/%3E%3Ctext x="50" y="58" text-anchor="middle" fill="white" font-size="40" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E';
//                         }}
//                       />
//                     </div>
//                     <div className="agent-score">
//                       <FaStar className="score-icon" />
//                       <span>{agent.score || '۵۰'}</span>
//                     </div>
//                   </div>
                  
//                   <h3 className="agent-name">{agent.fullName}</h3>
                  
//                   <div className="agent-info-row">
//                     <div className="agent-info-item">
//                       <FaHome className="info-icon" />
//                       <span className="info-number">{agent.totalRealEstate}</span>
//                       <span className="info-label">ملک</span>
//                     </div>
//                     <div className="agent-info-divider"></div>
//                     <div className="agent-info-item">
//                       <FaUserCheck className="info-icon" />
//                       <span className="info-number">۱۲+</span>
//                       <span className="info-label">مشتری</span>
//                     </div>
//                   </div>

//                   <button className="agent-call-btn">
//                     <FaPhone className="call-icon" />
//                     تماس با مشاور
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       ) : (
//         <div className="agents-empty">
//           <p>هیچ مشاوری یافت نشد</p>
//         </div>
//       )}
//     </section>
//   );
// };

// export default AgentsSlider;

// src/components/AgentsSlider.jsx
import React, { useState, useEffect,useCallback, useRef } from 'react';
import { FaStar, FaHome, FaPhone, FaUserCheck, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
// ایمپورت Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// ایمپورت CSSهای اصلی
import 'swiper/css';
import 'swiper/css/navigation';
import './AgentsSlider.css';

const AgentsSlider = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const navigate = useNavigate();
    const goToProfile = (agent) => {
    console.error(agents)
      if (!agent) {
        console.warn('اطلاعات کاربر برای رفتن به پروفایل موجود نیست');
        return;
      }
      
      try {
     
        const agentName = agent.fullName || 'مشاور';
        const userId = agent.userId;

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
    }

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('https://localhost:7178/api/RealEstatePage/GetIndependentAgent');
        const result = await response.json();
        
        if (result.status === 200 && result.data) {
          setAgents(result.data);
        }
      } catch (error) {
        console.error('خطا در دریافت مشاوران:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (loading) {
    return (
      <section className="agents-section">
        <div className="agents-container">
          <div className="agents-header">
            <span className="header-badge">🏆 متخصصین</span>
            <h2 className="agents-title">مشاوران <span>مستقل</span></h2>
            <p className="agents-subtitle">حرفه‌ای‌ترین مشاوران املاک</p>
          </div>
          <div className="agents-skeleton-grid">
            {[1, 2, 3, 4, 5].map(n => (
              <div key={n} className="skeleton-card">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-name"></div>
                <div className="skeleton-stats"></div>
                <div className="skeleton-button"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="agents-section">
      <div className="agents-container">
        <div className="agents-header">
          <span className="header-badge">🏆 متخصصین</span>
          <h2 className="agents-title">
            مشاوران <span>مستقل</span>
          </h2>
          <p className="agents-subtitle">حرفه‌ای‌ترین مشاوران املاک</p>
          <div className="header-decoration">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {agents.length > 0 ? (
          <div className="agents-slider-wrapper">
            <div className="agents-nav-buttons">
              <button ref={prevRef} className="nav-btn prev-btn" aria-label="قبلی">
                <FaChevronRight />
              </button>
              <button ref={nextRef} className="nav-btn next-btn" aria-label="بعدی">
                <FaChevronLeft />
              </button>
            </div>

            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={16}
              slidesPerView={1}

              autoplay={{
                delay: 4000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                480: { slidesPerView: 1, spaceBetween: 12 },
                576: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 4, spaceBetween: 24 },
                1440: { slidesPerView: 5, spaceBetween: 24 }
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              onInit={(swiper) => {
                if (swiper.params.navigation) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              }}
              className="agents-swiper"
            >
              {agents.map((agent) => (
                <SwiperSlide key={agent.userId}>
                  <div className="agent-card">
                    <div className="agent-card-glow"></div>
                    
                    <div className="agent-avatar-container">
                      <div className="">
                        <img 
                          src={`https://localhost:7178${agent.avatar}`}
                          alt={agent.fullName}
                          className="agent-avatar"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23667eea"/%3E%3Ctext x="50" y="58" text-anchor="middle" fill="white" font-size="40" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                      <div className="agent-score">
                        <FaStar className="score-icon" />
                        <span>{agent.score || '۵۰'}</span>
                      </div>
                    </div>
                    
                    <h3 className="agent-name">{agent.fullName}</h3>
                    
                    <div className="agent-info-row">
                      <div className="agent-info-item">
                        <FaHome className="info-icon" />
                        <span className="info-number">{agent.totalRealEstate}</span>
                        <span className="info-label">ملک</span>
                      </div>
                      <div className="agent-info-divider"></div>
                      {/* <div className="agent-info-item">
                        <FaUserCheck className="info-icon" />
                        <span className="info-number">۱۲+</span>
                        <span className="info-label">مشتری</span>
                      </div> */}
                    </div>

                    <button className="agent-call-btn"
                       onClick={() => agent.userId && goToProfile(agent)}
                    >
                      <FaPhone className="call-icon" />
                      تماس با مشاور
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="agents-empty">
            <p>هیچ مشاوری یافت نشد</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AgentsSlider;