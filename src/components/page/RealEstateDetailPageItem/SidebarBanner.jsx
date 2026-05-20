// // // // // // SidebarBanner.jsx
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import './SidebarBanner.css';

// // // // // const SidebarBanner = () => {
// // // // //   const [banners, setBanners] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [currentBanner, setCurrentBanner] = useState(0);

// // // // //   // دریافت بنرها از API
// // // // //   useEffect(() => {
// // // // //     const fetchBanners = async () => {
// // // // //       try {
// // // // //         // API فرضی - با API واقعی خودت جایگزین کن
// // // // //         // const response = await fetch('https://your-api.com/api/banners');
// // // // //         // const data = await response.json();
        
// // // // //         // داده نمونه
// // // // //         const sampleBanners = [
// // // // //           {
// // // // //             id: 1,
// // // // //             imageUrl: 'https://localhost:7178//uploads/properties/1/0b0fff66-d17e-4958-bb1c-ae38a9eb7272/b54fc421-8a01-4b22-a5be-9995d089ceea-20260426-154607-1.webp',
// // // // //             link: '/realestate?type=sale',
// // // // //             title: 'خرید خانه',
// // // // //             description: 'بهترین ملک‌های فروش تهران',
// // // // //             alt: 'بنر فروش ملک'
// // // // //           },
// // // // //           {
// // // // //             id: 2,
// // // // //             imageUrl: 'https://picsum.photos/id/15/300/400',
// // // // //             link: '/realestate?type=rent',
// // // // //             title: 'رهن و اجاره',
// // // // //             description: 'ملک‌های رهن و اجاره با بهترین قیمت',
// // // // //             alt: 'بنر رهن و اجاره'
// // // // //           },
// // // // //           {
// // // // //             id: 3,
// // // // //             imageUrl: 'https://picsum.photos/id/42/300/400',
// // // // //             link: '/register',
// // // // //             title: 'ثبت آگهی',
// // // // //             description: 'ملک خود را رایگان ثبت کنید',
// // // // //             alt: 'بنر ثبت آگهی'
// // // // //           }
// // // // //         ];
        
// // // // //         setBanners(sampleBanners);
// // // // //         setLoading(false);
// // // // //       } catch (error) {
// // // // //         console.error('خطا در دریافت بنرها:', error);
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchBanners();

// // // // //     // چرخش خودکار بنرها هر 5 ثانیه
// // // // //     const interval = setInterval(() => {
// // // // //       setCurrentBanner(prev => (prev + 1) % banners.length);
// // // // //     }, 5000);

// // // // //     return () => clearInterval(interval);
// // // // //   }, [banners.length]);

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="sidebar-banner loading">
// // // // //         <div className="banner-skeleton"></div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (banners.length === 0) return null;

// // // // //   const currentBannerData = banners[currentBanner];

// // // // //   return (
// // // // //     <div className="sidebar-banner">
// // // // //       <a href={currentBannerData.link} className="banner-link">
// // // // //         <img 
// // // // //           src={currentBannerData.imageUrl}
// // // // //           alt={currentBannerData.alt}
// // // // //           className="banner-image"
// // // // //           loading="lazy"
// // // // //         />
// // // // //         <div className="banner-overlay">
// // // // //           <h3 className="banner-title">{currentBannerData.title}</h3>
// // // // //           <p className="banner-description">{currentBannerData.description}</p>
// // // // //           <span className="banner-btn">مشاهده بیشتر</span>
// // // // //         </div>
// // // // //       </a>
      
// // // // //       {/* دکمه‌های نویگیشن بنر */}
// // // // //       {banners.length > 1 && (
// // // // //         <div className="banner-dots">
// // // // //           {banners.map((_, index) => (
// // // // //             <button
// // // // //               key={index}
// // // // //               className={`banner-dot ${index === currentBanner ? 'active' : ''}`}
// // // // //               onClick={() => setCurrentBanner(index)}
// // // // //               aria-label={`بنر ${index + 1}`}
// // // // //             />
// // // // //           ))}
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default SidebarBanner;

// // // // // SidebarBanner.jsx
// // // // import React, { useState, useEffect } from 'react';
// // // // import './SidebarBanner.css';

// // // // const SidebarBanner = () => {
// // // //   const [banners, setBanners] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [currentBanner, setCurrentBanner] = useState(0);
// // // //   const [imageErrors, setImageErrors] = useState({});

// // // //   // دریافت بنرها از API
// // // //   useEffect(() => {
// // // //     const fetchBanners = async () => {
// // // //       try {
// // // //         // API فرضی - با API واقعی خودت جایگزین کن
// // // //         // const response = await fetch('https://your-api.com/api/banners');
// // // //         // const data = await response.json();
        
// // // //         // داده نمونه
// // // //         const sampleBanners = [
// // // //           {
// // // //             id: 1,
// // // //             imageUrl: 'https://localhost:7178//uploads/properties/1/0b0fff66-d17e-4958-bb1c-ae38a9eb7272/b54fc421-8a01-4b22-a5be-9995d089ceea-20260426-154607-1.webp',
// // // //             fallbackImage: 'https://via.placeholder.com/300x400/7d0000/white?text=خرید+خانه',
// // // //             link: '/realestate?type=sale',
// // // //             title: 'خرید خانه',
// // // //             description: 'بهترین ملک‌های فروش تهران',
// // // //             alt: 'بنر فروش ملک'
// // // //           },
// // // //           {
// // // //             id: 2,
// // // //             imageUrl: 'https://picsum.photos/id/15/300/400',
// // // //             fallbackImage: 'https://via.placeholder.com/300x400/7d0000/white?text=رهن+و+اجاره',
// // // //             link: '/realestate?type=rent',
// // // //             title: 'رهن و اجاره',
// // // //             description: 'ملک‌های رهن و اجاره با بهترین قیمت',
// // // //             alt: 'بنر رهن و اجاره'
// // // //           },
// // // //           {
// // // //             id: 3,
// // // //             imageUrl: 'https://picsum.photos/id/42/300/400',
// // // //             fallbackImage: 'https://via.placeholder.com/300x400/7d0000/white?text=ثبت+آگهی',
// // // //             link: '/register',
// // // //             title: 'ثبت آگهی',
// // // //             description: 'ملک خود را رایگان ثبت کنید',
// // // //             alt: 'بنر ثبت آگهی'
// // // //           }
// // // //         ];
        
// // // //         setBanners(sampleBanners);
// // // //         setLoading(false);
// // // //       } catch (error) {
// // // //         console.error('خطا در دریافت بنرها:', error);
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchBanners();
// // // //   }, []);

// // // //   // چرخش خودکار بنرها
// // // //   useEffect(() => {
// // // //     if (banners.length === 0) return;
    
// // // //     const interval = setInterval(() => {
// // // //       setCurrentBanner(prev => (prev + 1) % banners.length);
// // // //     }, 5000);

// // // //     return () => clearInterval(interval);
// // // //   }, [banners.length]);

// // // //   const handleImageError = (bannerId) => {
// // // //     setImageErrors(prev => ({ ...prev, [bannerId]: true }));
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="sidebar-banner loading">
// // // //         <div className="banner-skeleton"></div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (banners.length === 0) return null;

// // // //   const currentBannerData = banners[currentBanner];
// // // //   const hasError = imageErrors[currentBannerData.id];
// // // //   const imageSrc = hasError ? currentBannerData.fallbackImage : currentBannerData.imageUrl;

// // // //   return (
// // // //     <div className="sidebar-banner">
// // // //       <a href={currentBannerData.link} className="banner-link">
// // // //         <div className="banner-image-container">
// // // //           <img 
// // // //             src={imageSrc}
// // // //             alt={currentBannerData.alt}
// // // //             className="banner-image"
// // // //             loading="lazy"
// // // //             onError={() => handleImageError(currentBannerData.id)}
// // // //           />
// // // //         </div>
// // // //         <div className="banner-overlay">
// // // //           <h3 className="banner-title">{currentBannerData.title}</h3>
// // // //           <p className="banner-description">{currentBannerData.description}</p>
// // // //           <span className="banner-btn">مشاهده بیشتر</span>
// // // //         </div>
// // // //       </a>
      
// // // //       {/* دکمه‌های نویگیشن بنر */}
// // // //       {banners.length > 1 && (
// // // //         <div className="banner-dots">
// // // //           {banners.map((_, index) => (
// // // //             <button
// // // //               key={index}
// // // //               className={`banner-dot ${index === currentBanner ? 'active' : ''}`}
// // // //               onClick={() => setCurrentBanner(index)}
// // // //               aria-label={`بنر ${index + 1}`}
// // // //             />
// // // //           ))}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SidebarBanner;

// // // // SidebarBanner.jsx
// // // import React, { useState, useEffect } from 'react';
// // // import './SidebarBanner.css';

// // // const SidebarBanner = ({ position = 'right' }) => {
// // //   const [banners, setBanners] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [currentBanner, setCurrentBanner] = useState(0);
// // //   const [imageErrors, setImageErrors] = useState({});

// // //   // دریافت بنرها از API
// // //   useEffect(() => {
// // //     const fetchBanners = async () => {
// // //       try {
// // //         // داده نمونه برای بنرهای سمت راست و چپ
// // //         const allBanners = {
// // //           right: [
// // //             {
// // //               id: 1,
// // //               imageUrl: 'https://localhost:7178//uploads/properties/1/0b0fff66-d17e-4958-bb1c-ae38a9eb7272/b54fc421-8a01-4b22-a5be-9995d089ceea-20260426-154607-1.webp',
// // //               fallbackImage: 'https://via.placeholder.com/300x400/7d0000/white?text=خرید+خانه',
// // //               link: '/realestate?type=sale',
// // //               title: 'خرید خانه',
// // //               description: 'بهترین ملک‌های فروش تهران',
// // //               alt: 'بنر فروش ملک'
// // //             },
// // //             {
// // //               id: 2,
// // //               imageUrl: 'https://picsum.photos/id/15/300/400',
// // //               fallbackImage: 'https://via.placeholder.com/300x400/7d0000/white?text=رهن+و+اجاره',
// // //               link: '/realestate?type=rent',
// // //               title: 'رهن و اجاره',
// // //               description: 'ملک‌های رهن و اجاره با بهترین قیمت',
// // //               alt: 'بنر رهن و اجاره'
// // //             }
// // //           ],
// // //           left: [
// // //             {
// // //               id: 3,
// // //               imageUrl: 'https://picsum.photos/id/42/300/400',
// // //               fallbackImage: 'https://via.placeholder.com/300x400/7d0000/white?text=ثبت+آگهی',
// // //               link: '/register',
// // //               title: 'ثبت آگهی',
// // //               description: 'ملک خود را رایگان ثبت کنید',
// // //               alt: 'بنر ثبت آگهی'
// // //             },
// // //             {
// // //               id: 4,
// // //               imageUrl: 'https://picsum.photos/id/26/300/400',
// // //               fallbackImage: 'https://via.placeholder.com/300x400/7d0000/white?text=مشاوره+رایگان',
// // //               link: '/consultation',
// // //               title: 'مشاوره رایگان',
// // //               description: 'مشاوره تخصصی خرید و فروش ملک',
// // //               alt: 'بنر مشاوره رایگان'
// // //             }
// // //           ]
// // //         };
        
// // //         setBanners(allBanners[position] || allBanners.right);
// // //         setLoading(false);
// // //       } catch (error) {
// // //         console.error('خطا در دریافت بنرها:', error);
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchBanners();
// // //   }, [position]);

// // //   // چرخش خودکار بنرها
// // //   useEffect(() => {
// // //     if (banners.length === 0) return;
    
// // //     const interval = setInterval(() => {
// // //       setCurrentBanner(prev => (prev + 1) % banners.length);
// // //     }, 5000);

// // //     return () => clearInterval(interval);
// // //   }, [banners.length]);

// // //   const handleImageError = (bannerId) => {
// // //     setImageErrors(prev => ({ ...prev, [bannerId]: true }));
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className={`sidebar-banner ${position} loading`}>
// // //         <div className="banner-skeleton"></div>
// // //       </div>
// // //     );
// // //   }

// // //   if (banners.length === 0) return null;

// // //   const currentBannerData = banners[currentBanner];
// // //   const hasError = imageErrors[currentBannerData.id];
// // //   const imageSrc = hasError ? currentBannerData.fallbackImage : currentBannerData.imageUrl;

// // //   return (
// // //     <div className={`sidebar-banner ${position}`}>
// // //       <a href={currentBannerData.link} className="banner-link">
// // //         <div className="banner-image-container">
// // //           <img 
// // //             src={imageSrc}
// // //             alt={currentBannerData.alt}
// // //             className="banner-image"
// // //             loading="lazy"
// // //             onError={() => handleImageError(currentBannerData.id)}
// // //           />
// // //         </div>
// // //         <div className="banner-overlay">
// // //           <h3 className="banner-title">{currentBannerData.title}</h3>
// // //           <p className="banner-description">{currentBannerData.description}</p>
// // //           <span className="banner-btn">مشاهده بیشتر</span>
// // //         </div>
// // //       </a>
      
// // //       {/* دکمه‌های نویگیشن بنر */}
// // //       {banners.length > 1 && (
// // //         <div className="banner-dots">
// // //           {banners.map((_, index) => (
// // //             <button
// // //               key={index}
// // //               className={`banner-dot ${index === currentBanner ? 'active' : ''}`}
// // //               onClick={() => setCurrentBanner(index)}
// // //               aria-label={`بنر ${index + 1}`}
// // //             />
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // // کامپوننت برای نمایش ۲ بنر سمت راست و ۲ بنر سمت چپ
// // // export const DoubleSidebarBanners = () => {
// // //   return (
// // //     <div className="double-sidebar-banners">
// // //       <div className="left-banners">
// // //         <SidebarBanner position="left" />
// // //         <SidebarBanner position="left" />
// // //       </div>
// // //       <div className="right-banners">
// // //         <SidebarBanner position="right" />
// // //         <SidebarBanner position="right" />
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default SidebarBanner;

// // // SidebarBanner.jsx
// // import React, { useState, useEffect } from 'react';
// // import './SidebarBanner.css';

// // const SidebarBanner = ({ position = 'right', bannerIndex = 0 }) => {
// //   const [banners, setBanners] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [currentBanner, setCurrentBanner] = useState(0);
// //   const [imageErrors, setImageErrors] = useState({});

// //   // دریافت بنرها از API
// //   useEffect(() => {
// //     const fetchBanners = async () => {
// //       try {
// //         // بنرهای سمت راست و چپ جداگانه
// //         const allBanners = {
// //           right: [
// //             {
// //               id: 1,
// //               imageUrl: 'https://picsum.photos/id/15/300/400',
// //               fallbackImage: 'https://via.placeholder.com/300x400/7d0000/white?text=خرید+خانه',
// //               link: '/realestate?type=sale',
// //               title: 'خرید خانه',
// //               description: 'بهترین ملک‌های فروش تهران',
// //               alt: 'بنر فروش ملک'
// //             },
// //             {
// //               id: 2,
// //               imageUrl: 'https://picsum.photos/id/42/300/400',
// //               fallbackImage: 'https://via.placeholder.com/300x400/7d0000/white?text=ثبت+آگهی',
// //               link: '/register',
// //               title: 'ثبت آگهی',
// //               description: 'ملک خود را رایگان ثبت کنید',
// //               alt: 'بنر ثبت آگهی'
// //             }
// //           ],
// //           left: [
// //             {
// //               id: 3,
// //               imageUrl: 'https://picsum.photos/id/26/300/400',
// //               fallbackImage: 'https://via.placeholder.com/300x400/7d0000/white?text=مشاوره+رایگان',
// //               link: '/consultation',
// //               title: 'مشاوره رایگان',
// //               description: 'مشاوره تخصصی خرید و فروش ملک',
// //               alt: 'بنر مشاوره رایگان'
// //             },
// //             {
// //               id: 4,
// //               imageUrl: 'https://picsum.photos/id/20/300/400',
// //               fallbackImage: 'https://via.placeholder.com/300x400/7d0000/white?text=تخفیف+ویژه',
// //               link: '/discount',
// //               title: 'تخفیف ویژه',
// //               description: 'کمیسیون ۵۰٪ تخفیف تا پایان فصل',
// //               alt: 'بنر تخفیف ویژه'
// //             }
// //           ]
// //         };
        
// //         setBanners(allBanners[position] || allBanners.right);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error('خطا در دریافت بنرها:', error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchBanners();
// //   }, [position]);

// //   // چرخش خودکار بنرها
// //   useEffect(() => {
// //     if (banners.length === 0) return;
    
// //     const interval = setInterval(() => {
// //       setCurrentBanner(prev => (prev + 1) % banners.length);
// //     }, 5000);

// //     return () => clearInterval(interval);
// //   }, [banners.length]);

// //   const handleImageError = (bannerId) => {
// //     setImageErrors(prev => ({ ...prev, [bannerId]: true }));
// //   };

// //   if (loading) {
// //     return (
// //       <div className={`sidebar-banner ${position} loading`}>
// //         <div className="banner-skeleton"></div>
// //       </div>
// //     );
// //   }

// //   if (banners.length === 0) return null;

// //   const currentBannerData = banners[currentBanner];
// //   const hasError = imageErrors[currentBannerData.id];
// //   const imageSrc = hasError ? currentBannerData.fallbackImage : currentBannerData.imageUrl;

// //   return (
// //     <div className={`sidebar-banner sidebar-banner-${position}`}>
// //       <a href={currentBannerData.link} className="banner-link">
// //         <div className="banner-image-container">
// //           <img 
// //             src={imageSrc}
// //             alt={currentBannerData.alt}
// //             className="banner-image"
// //             loading="lazy"
// //             onError={() => handleImageError(currentBannerData.id)}
// //           />
// //         </div>
// //         <div className="banner-overlay">
// //           <h3 className="banner-title">{currentBannerData.title}</h3>
// //           <p className="banner-description">{currentBannerData.description}</p>
// //           <span className="banner-btn">مشاهده بیشتر</span>
// //         </div>
// //       </a>
      
// //       {banners.length > 1 && (
// //         <div className="banner-dots">
// //           {banners.map((_, index) => (
// //             <button
// //               key={index}
// //               className={`banner-dot ${index === currentBanner ? 'active' : ''}`}
// //               onClick={() => setCurrentBanner(index)}
// //               aria-label={`بنر ${index + 1}`}
// //             />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // // کامپوننت برای نمایش ۲ بنر سمت راست و ۲ بنر سمت چپ
// // export const DoubleSidebarBanners = () => {
// //   return (
// //     <div className="double-sidebar-banners">
// //       <div className="banners-left">
// //         <SidebarBanner position="left" />
// //         <SidebarBanner position="left" />
// //       </div>
// //       <div className="banners-right">
// //         <SidebarBanner position="right" />
// //         <SidebarBanner position="right" />
// //       </div>
// //     </div>
// //   );
// // };

// // export default SidebarBanner;

// // SidebarBanner.jsx
// import React, { useState, useEffect } from 'react';
// import './SidebarBanner.css';

// const SidebarBanner = ({ position = 'right' }) => {
//   const [banners, setBanners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [imageErrors, setImageErrors] = useState({});

//   useEffect(() => {
//     // داده نمونه
//     const bannerData = {
//       right: [
//         {
//           id: 1,
//              imageUrl: 'https://localhost:7178//uploads/properties/1/0b0fff66-d17e-4958-bb1c-ae38a9eb7272/b54fc421-8a01-4b22-a5be-9995d089ceea-20260426-154607-1.webp',
//           fallbackImage: 'https://via.placeholder.com/400x300/7d0000/white?text=خرید+خانه',
//           link: '/sale',
//           title: 'خرید خانه',
//           description: 'بهترین ملک‌های فروش',
//           alt: 'بنر فروش'
//         },
//         {
//           id: 2,
//           imageUrl: 'https://picsum.photos/id/42/400/300',
//           fallbackImage: 'https://via.placeholder.com/400x300/7d0000/white?text=رهن+و+اجاره',
//           link: '/rent',
//           title: 'رهن و اجاره',
//           description: 'ملک‌های رهن و اجاره',
//           alt: 'بنر رهن'
//         }
//       ],
//       left: [
//         {
//           id: 3,
//             imageUrl: 'https://localhost:7178//uploads/properties/1/0b0fff66-d17e-4958-bb1c-ae38a9eb7272/b54fc421-8a01-4b22-a5be-9995d089ceea-20260426-154607-1.webp',
//           fallbackImage: 'https://via.placeholder.com/400x300/7d0000/white?text=ثبت+آگهی',
//           link: '/register',
//           title: 'ثبت آگهی',
//           description: 'ملک خود را ثبت کنید',
//           alt: 'بنر ثبت'
//         },
//         {
//           id: 4,
//           imageUrl: 'https://picsum.photos/id/20/400/300',
//           fallbackImage: 'https://via.placeholder.com/400x300/7d0000/white?text=مشاوره',
//           link: '/consult',
//           title: 'مشاوره رایگان',
//           description: 'مشاوره تخصصی',
//           alt: 'بنر مشاوره'
//         }
//       ]
//     };

//     setBanners(bannerData[position] || bannerData.right);
//     setLoading(false);
//   }, [position]);

//   useEffect(() => {
//     if (banners.length <= 1) return;
    
//     const timer = setInterval(() => {
//       setCurrentIndex(prev => (prev + 1) % banners.length);
//     }, 5000);
    
//     return () => clearInterval(timer);
//   }, [banners.length]);

//   const handleError = (id) => {
//     setImageErrors(prev => ({ ...prev, [id]: true }));
//   };

//   if (loading) {
//     return <div className="banner-skeleton"></div>;
//   }

//   if (banners.length === 0) return null;

//   const current = banners[currentIndex];
//   const imgSrc = imageErrors[current.id] ? current.fallbackImage : current.imageUrl;

//   return (
//     <div className="sidebar-banner">
//       <a href={current.link} className="banner-link">
//         <div className="banner-image-container">
//           <img 
//             src={imgSrc}
//             alt={current.alt}
//             className="banner-image"
//             onError={() => handleError(current.id)}
//           />
//         </div>
//         <div className="banner-overlay">
//           <h3 className="banner-title">{current.title}</h3>
//           <p className="banner-description">{current.description}</p>
//           <span className="banner-btn">مشاهده بیشتر</span>
//         </div>
//       </a>
      
//       {banners.length > 1 && (
//         <div className="banner-dots">
//           {banners.map((_, idx) => (
//             <button
//               key={idx}
//               className={`banner-dot ${idx === currentIndex ? 'active' : ''}`}
//               onClick={() => setCurrentIndex(idx)}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // کامپوننت اصلی - 2 تا راست و 2 تا چپ
// export const DoubleSidebarBanners = () => {
//   return (
//     <div className="double-sidebar-banners">
//       <div className="banners-left">
//         <SidebarBanner position="left" />
//         <SidebarBanner position="left" />
//       </div>
//       <div className="banners-right">
//         <SidebarBanner position="right" />
//         <SidebarBanner position="right" />
//       </div>
//     </div>
//   );
// };

// export default SidebarBanner;

// SidebarBanner.jsx
import React, { useState, useEffect } from 'react';
import './SidebarBanner.css';

const SidebarBanner = ({ side = 'right' }) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState({});

  useEffect(() => {
    // بنرهای سمت راست و چپ
    const bannersData = {
      right: [
        {
          id: 'r1',
          imageUrl: 'https://picsum.photos/id/15/400/500',
          link: '/sale',
          title: 'خرید خانه',
          description: 'بهترین ملک‌های فروش تهران',
          alt: 'بنر فروش ملک'
        },
        {
          id: 'r2',
          imageUrl: 'https://picsum.photos/id/42/400/500',
          link: '/rent',
          title: 'رهن و اجاره',
          description: 'ملک‌های رهن و اجاره با بهترین قیمت',
          alt: 'بنر رهن و اجاره'
        }
      ],
      left: [
        {
          id: 'l1',
          imageUrl: 'https://picsum.photos/id/26/400/500',
          link: '/register',
          title: 'ثبت آگهی',
          description: 'ملک خود را رایگان ثبت کنید',
          alt: 'بنر ثبت آگهی'
        },
        {
          id: 'l2',
          imageUrl: 'https://picsum.photos/id/20/400/500',
          link: '/consult',
          title: 'مشاوره رایگان',
          description: 'مشاوره تخصصی خرید و فروش',
          alt: 'بنر مشاوره'
        }
      ]
    };

    setBanners(bannersData[side]);
    setLoading(false);
  }, [side]);

  // چرخش خودکار
  useEffect(() => {
    if (banners.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleImageLoad = (id) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };

  if (loading) {
    return (
      <div className="banner-wrapper">
        <div className="banner-skeleton"></div>
      </div>
    );
  }

  if (banners.length === 0) return null;

  const currentBanner = banners[currentIndex];
  const isImageLoaded = imagesLoaded[currentBanner.id];

  return (
    <div className="banner-wrapper">
      <a href={currentBanner.link} className="banner-link">
        <div className="banner-image-container">
          {/* همیشه یک placeholder وجود داره تا لرزش نداشته باشه */}
          <div 
            className="banner-placeholder"
            style={{ display: isImageLoaded ? 'none' : 'flex' }}
          >
            <span>{currentBanner.title}</span>
          </div>
          <img 
            src={currentBanner.imageUrl}
            alt={currentBanner.alt}
            className="banner-image"
            onLoad={() => handleImageLoad(currentBanner.id)}
            style={{ opacity: isImageLoaded ? 1 : 0 }}
          />
        </div>
        <div className="banner-overlay">
          <h3 className="banner-title">{currentBanner.title}</h3>
          <p className="banner-description">{currentBanner.description}</p>
          <span className="banner-btn">مشاهده بیشتر</span>
        </div>
      </a>
      
      {banners.length > 1 && (
        <div className="banner-dots">
          {banners.map((_, idx) => (
            <button
              key={idx}
              className={`banner-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// کامپوننت اصلی - 2 تا راست و 2 تا چپ
const DoubleSidebarBanners = () => {
  return (
    <div className="double-banners-container">
      <div className="banners-side left-side">
        <SidebarBanner side="left" />
        <SidebarBanner side="left" />
      </div>
      <div className="banners-side right-side">
        <SidebarBanner side="right" />
        <SidebarBanner side="right" />
      </div>
    </div>
  );
};

export default DoubleSidebarBanners;