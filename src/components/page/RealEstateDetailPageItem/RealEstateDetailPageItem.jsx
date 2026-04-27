// // RealEstateDetailPageItem.jsx
// import React, { useState, useEffect } from 'react';

// import { useNavigate, useParams,useLocation  } from 'react-router-dom';
// import { 
//   FaMapMarkerAlt, 
//   FaPhone, 
//   FaWhatsapp, 
//   FaShare, 
//   FaArrowRight, 
//   FaCopy, 
//   FaCheckCircle,
//   FaHeart,
//   FaRegHeart,
//   FaStar,
//   FaParking,
//   FaWarehouse,
//   FaSwimmingPool,
//   FaFire,
//   FaBath,
//   FaRulerCombined,
//   FaCalendarAlt,
//   FaLayerGroup,
//   FaArrowUp // بجای FaElevator
// } from 'react-icons/fa';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import './RealEstateDetailPageItem.css';

// const RealEstateDetailPageItem = () => {
//   //const { id } = useParams();
//     const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const id = queryParams.get('id');  // ← اینطوری id رو بگیر
//     console.log(id); // مقدار id رو نشون میده
//   const navigate = useNavigate();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [copied, setCopied] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [activeTab, setActiveTab] = useState('details');
//   const [isFavorite, setIsFavorite] = useState(false);

//   // شبیه‌سازی دریافت داده از API
//   useEffect(() => {
// //     const fetchPropertyData = async () => {
// //       setLoading(true);
// //       try {
// //         // شبیه‌سازی تاخیر شبکه
// //         await new Promise(resolve => setTimeout(resolve, 2000));
        
// //         setProperty({
// //           id: id || 12345,
// //           title: "آپارتمان لوکس کلید نخورده جردن",
// //           price: "۹,۰۰۰,۰۰۰,۰۰۰",
// //           rent: "۳۰,۰۰۰,۰۰۰",
// //           type: "فروش",
// //           area: 190,
// //           rooms: 3,
// //           floor: 6,
// //           totalFloors: 8,
// //           year: 1403,
// //           address: "تهران، امانیه، خیابان جردن، کوچه روشن",
// //           location: {
// //             lat: 35.7704892,
// //             lng: 51.3017382
// //           },
// //           description: `واحد بسیار لوکس و کلید نخورده در بهترین نقطه جردن
// // با بهترین مصالح و طراحی مدرن
// // مناسب برای خانواده‌های محترم
// // دسترسی عالی به مراکز خرید و خدمات شهری

// // ویژگی‌های خاص:
// // • نمای تمام شیشه
// // • نورگیری عالی
// // • سقف بلند
// // • کفپوش چوبی`,
// //           features: [
// //             "پارکینگ",
// //             "انباری",
// //             "آسانسور",
// //             "کابینت‌های مدرن",
// //             "شیشه‌های دوجداره",
// //             "نورگیر",
// //             "سرویس فرنگی",
// //             "بالکن",
// //             "شوفاژ",
// //             "کولر مرکزی",
// //             "جکوزی",
// //             "سونا"
// //           ],
// //           warnings: [
// //             "استعلام خلافی",
// //             "بررسی سند مالکیت",
// //             "استعلام پایان کار",
// //             "بررسی مفاصا حساب",
// //             "استعلام از شهرداری",
// //             "بررسی مدارک شناسایی"
// //           ],
// //           images: [
// //             "https://localhost:7178/uploads/images/noHome.png",
// //             "https://localhost:7178/uploads/images/noHome.png",
// //             "https://localhost:7178/uploads/images/noHome.png",
// //             "https://localhost:7178/uploads/images/noHome.png",
// //             "https://localhost:7178/uploads/images/noHome.png"
// //           ],
// //           agent: {
// //             name: "مشاور املاک رویال",
// //             phone: "۰۲۱۲۲۳۳۴۴۵۵",
// //             whatsapp: "۰۹۱۲۳۴۵۶۷۸۹",
// //             address: "تهران، جردن، نبش کوچه روشن",
// //             rating: 4.8,
// //             deals: 342,
// //             image: "https://randomuser.me/api/portraits/men/32.jpg"
// //           },
// //           views: 1234,
// //           saved: 89,
// //           createdAt: "۲ روز پیش",
// //           certificate: "دارای سند رسمی",
// //           mortgage: "قابل وام",
// //           nearby: [
// //             { name: "مترو", distance: "۵۰۰ متر" },
// //             { name: "مرکز خرید", distance: "۳۰۰ متر" },
// //             { name: "پارک", distance: "۲۰۰ متر" },
// //             { name: "مدرسه", distance: "۴۰۰ متر" }
// //           ]
// //         });
// //       } catch (error) {
// //         console.error('خطا در دریافت اطلاعات:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// const fetchPropertyData = async () => {
//   setLoading(true);
//   try {
//     const response = await fetch(
//       `https://localhost:7178/api/RealEstatePage/GetRealEstateDetails?id=${id}`
//     );
//     const result = await response.json();

//     if (result.status === 200 && result.data) {
//       const data = result.data;
//       setProperty({
//         id: data.id,
//         title: data.title,
//         price: data.price?.toLocaleString("fa-IR") || "۰",
//         rent: null,
//         type: data.categoryType,
//         area: parseInt(data.additionalInformation?.match(/\d+/)?.[0]) || 0,
//         rooms: data.rooms,
//         floor: data.floor,
//         totalFloors: data.countFloor,
//         year: data.constructionYear,
//         priceMeter:data.priceMeter?.toLocaleString("fa-IR") || "۰",
//         address: data.address || "آدرس درج نشده",
//         location: {
//           lat: data.lat || null,
//           lng: data.lng || null,
//         },
//         description: data.additionalInformation || "",
//         features: data.facilities || [],
//         warnings: data.warnings || [],
//         images: (data.images || []).map(
//           (img) => `https://localhost:7178/uploads/images/${img}`
//         ),
//         agent: {
//           name: data.agents?.name || "",
//           phone: data.agents?.phone || "",
//           whatsapp: data.agents?.connectSocialMedia || "",
//           address: data.agents?.address || "",
//           rating: null,
//           deals: null,
//           image: data.agents?.image || "",
//         },
//         views: data.views,
//         saved: data.saved,
//         createdAt: data.createdAtPersianRelative || "چند وقت پیش",
//         certificate: data.isHasLoan ? "قابل وام" : "سند رسمی",
//         mortgage: data.isHasLoan ? "قابل وام" : "بدون وام",
//         nearby: []
//       });
//     }
//   } catch (error) {
//     console.error('خطا در دریافت اطلاعات:', error);
//   } finally {
//     setLoading(false);
//   }
// };

//     fetchPropertyData();
//   }, [id]);

//   const formatPrice = (price) => {
//     if (!price) return '';
//     return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };

//   const handleShare = async () => {
//     if (!property) return;
    
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: property.title,
//           text: property.description,
//           url: window.location.href
//         });
//       } catch (error) {
//         console.log('Error sharing:', error);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const handleCopyPhone = () => {
//     if (!property?.agent?.phone) return;
    
//     navigator.clipboard.writeText(property.agent.phone);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // Skeleton Component
//   const DetailSkeleton = () => (
//     <div className="detail-skeleton">
//       {/* Header Skeleton */}
//       <div className="skeleton-header">
//         <div className="skeleton-circle"></div>
//         <div className="skeleton-title"></div>
//         <div className="skeleton-circle"></div>
//       </div>

//       {/* Gallery Skeleton */}
//       <div className="skeleton-gallery">
//         <div className="skeleton-image"></div>
//       </div>

//       {/* Content Skeleton */}
//       <div className="skeleton-content">
//         <div className="skeleton-price"></div>
        
//         <div className="skeleton-info">
//           <div className="skeleton-chip"></div>
//           <div className="skeleton-chip"></div>
//           <div className="skeleton-chip"></div>
//           <div className="skeleton-chip"></div>
//           <div className="skeleton-chip"></div>
//         </div>

//         <div className="skeleton-tabs">
//           <div className="skeleton-tab"></div>
//           <div className="skeleton-tab"></div>
//           <div className="skeleton-tab"></div>
//         </div>

//         <div className="skeleton-text">
//           <div className="skeleton-line"></div>
//           <div className="skeleton-line"></div>
//           <div className="skeleton-line"></div>
//           <div className="skeleton-line-short"></div>
//         </div>

//         <div className="skeleton-features">
//           <div className="skeleton-feature"></div>
//           <div className="skeleton-feature"></div>
//           <div className="skeleton-feature"></div>
//           <div className="skeleton-feature"></div>
//         </div>
//       </div>

//       {/* Agent Skeleton */}
//       <div className="skeleton-agent">
//         <div className="skeleton-agent-info">
//           <div className="skeleton-avatar"></div>
//           <div className="skeleton-agent-details">
//             <div className="skeleton-agent-name"></div>
//             <div className="skeleton-agent-address"></div>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons Skeleton */}
//       <div className="skeleton-actions">
//         <div className="skeleton-button"></div>
//         <div className="skeleton-button"></div>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return <DetailSkeleton />;
//   }

//   if (!property) {
//     return (
//       <div className="detail-container">
//         <div className="detail-header">
//           <button className="header-btn" onClick={() => navigate(-1)}>
//             <FaArrowRight />
//           </button>
//           <h1 className="header-title">خطا</h1>
//           <div className="header-btn"></div>
//         </div>
//         <div className="error-message">
//           <p>متاسفانه ملک مورد نظر یافت نشد</p>
//           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="detail-container">
//       {/* Header */}
//       <div className="detail-header">
//         <button className="header-btn" onClick={() => navigate(-1)}>
//           <FaArrowRight />
//         </button>
//         <h1 className="header-title">جزئیات ملک</h1>
//         <button className="header-btn" onClick={handleShare}>
//           <FaShare />
//         </button>
//       </div>

//       {/* Image Gallery */}
//       <div className="detail-gallery">
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 3000 }}
//           spaceBetween={0}
//           slidesPerView={1}
//           onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)}
//           className="gallery-swiper"
//         >
//           {property.images.map((img, index) => (
//             <SwiperSlide key={index}>
//               <div className="gallery-slide">
//                 <img 
//                   src={img} 
//                   alt={`${property.title} - تصویر ${index + 1}`}
//                   loading={index === 0 ? 'eager' : 'lazy'}
//                 />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
        
//         <button 
//           className={`favorite-btn ${isFavorite ? 'active' : ''}`}
//           onClick={() => setIsFavorite(!isFavorite)}
//           aria-label={isFavorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
//         >
//           {isFavorite ? <FaHeart /> : <FaRegHeart />}
//         </button>
        
//         <div className="image-counter">
//           {selectedImage + 1} / {property.images.length}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="detail-main">
//         {/* Title & Price */}
//         <div className="detail-title-section">
//           <div className="title-row">
//             <h1 className="detail-title">{property.title}</h1>
//             <div className="property-stats">
//               <span className="stat-badge">
//                 <FaFire className="stat-icon" />
//                 {property.views} بازدید
//               </span>
//               <span className="stat-badge">
//                 <FaStar className="stat-icon" />
//                 {property.saved} ذخیره
//               </span>
//             </div>
//           </div>
          
//           <div className="detail-price-box">

//         {property.type==1 && (
//           <div>
//       <div className="price-row main-price">
//               <span className="price-label">قیمت فروش:</span>
//               <span className="price-value">{formatPrice(property.price)}</span>
//               <span className="price-currency">تومان</span>
//               </div> <div className="price-row main-price">
//                        <span className="price-label">قیمت هرمتر:</span>
//               <span className="price-value">{formatPrice(property.priceMeter)}</span>
//               <span className="price-currency">تومان</span>
//               </div>
//             </div>
          
          
//             )}

//             {property.type==0 && (
//               <div className="price-row rent-price">
//                 <span className="price-label">رهن و اجاره:</span>
//                 <span className="price-value">{formatPrice(property.rent)}</span>
//                 <span className="price-currency">تومان</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Quick Specs */}
//         <div className="quick-specs">
//           <div className="spec-item">
//             <FaRulerCombined className="spec-icon" />
//             <span className="spec-label">متراژ</span>
//             <span className="spec-value">{property.area} متر²</span>
//           </div>
//           <div className="spec-item">
//             <FaBath className="spec-icon" />
//             <span className="spec-label">اتاق</span>
//             <span className="spec-value">{property.rooms} خواب</span>
//           </div>
//           <div className="spec-item">
//             <FaLayerGroup className="spec-icon" />
//             <span className="spec-label">طبقه</span>
//             <span className="spec-value">{property.floor} از {property.totalFloors}</span>
//           </div>
//           <div className="spec-item">
//             <FaCalendarAlt className="spec-icon" />
//             <span className="spec-label">ساخت</span>
//             <span className="spec-value">{property.year}</span>
//           </div>
//         </div>

//         {/* Info Chips */}
//         <div className="info-chips">
//           <span className="info-chip">کد ملک: {property.id}</span>
//           <span className="info-chip">{property.certificate}</span>
//           <span className="info-chip">{property.mortgage}</span>
//         </div>

//         {/* Tabs */}
//         <div className="detail-tabs">
//           <button 
//             className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
//             onClick={() => setActiveTab('details')}
//           >
//             جزئیات
//           </button>
//           <button 
//             className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
//             onClick={() => setActiveTab('features')}
//           >
//             امکانات
//           </button>
//           <button 
//             className={`tab-btn ${activeTab === 'warnings' ? 'active' : ''}`}
//             onClick={() => setActiveTab('warnings')}
//           >
//             هشدارها
//           </button>
//           <button 
//             className={`tab-btn ${activeTab === 'nearby' ? 'active' : ''}`}
//             onClick={() => setActiveTab('nearby')}
//           >
//             امکانات اطراف
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div className="tab-content">
//           {activeTab === 'details' && (
//             <div className="details-tab">
//               <div className="address-card">
//                 <FaMapMarkerAlt className="address-icon" />
//                 <div className="address-info">
//                   <h3>آدرس ملک</h3>
//                   <p>{property.address}</p>
//                   <span className="post-date">درج: {property.createdAt}</span>
//                 </div>
//               </div>
              
//               <div className="description-card">
//                 <h3>توضیحات کامل</h3>
//                 <p className="description-text">{property.description}</p>
//               </div>

//               <div className="map-card">
//                 <h3>موقعیت مکانی</h3>
//                 <div className="map-container">
//                   <iframe
//                     title="موقعیت ملک"
//                     width="100%"
//                     height="200"
//                     frameBorder="10"
//                     style={{ border: 10, borderRadius: '12px' }}
//                     src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.location.lng - 0.01},${property.location.lat - 0.01},${property.location.lng + 0.01},${property.location.lat + 0.01}&layer=mapnik&marker=${property.location.lat},${property.location.lng}`}
//                     allowFullScreen
//                   ></iframe>
//                   <a 
//                     href={`https://www.openstreetmap.org/?mlat=${property.location.lat}&mlon=${property.location.lng}#map=16/${property.location.lat}/${property.location.lng}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="map-link"
//                   >
//                     مشاهده در نقشه بزرگتر
//                   </a>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'features' && (
//             <div className="features-tab">
//               <h3>امکانات و ویژگی‌ها</h3>
//               <div className="features-grid">
//                 {property.features.map((feature, index) => {
//                   // انتخاب آیکون مناسب
//                   let IconComponent = FaCheckCircle;
//                   if (feature === 'پارکینگ') IconComponent = FaParking;
//                   else if (feature === 'انباری') IconComponent = FaWarehouse;
//                   else if (feature === 'آسانسور') IconComponent = FaArrowUp;
//                   else if (feature === 'استخر') IconComponent = FaSwimmingPool;
                  
//                   return (
//                     <div key={index} className="feature-card">
//                       <IconComponent className="feature-icon" />
//                       <span>{feature}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {activeTab === 'warnings' && (
//             <div className="warnings-tab">
//               <h3>⚠️ هشدارهای مهم قبل از معامله</h3>
//               <ul className="warnings-list">
//                 {property.warnings.map((warning, index) => (
//                   <li key={index} className="warning-item">
//                     <span className="warning-bullet"></span>
//                     <span>{warning}</span>
//                   </li>
//                 ))}
//               </ul>
//               <div className="warning-footer">
//                 <p>توجه: لطفاً قبل از هرگونه معامله، مدارک ملک را به دقت بررسی کنید</p>
//               </div>
//             </div>
//           )}

//           {activeTab === 'nearby' && (
//             <div className="nearby-tab">
//               <h3>امکانات اطراف ملک</h3>
//               <div className="nearby-list">
//                 {property.nearby.map((item, index) => (
//                   <div key={index} className="nearby-item">
//                     <span className="nearby-name">{item.name}</span>
//                     <span className="nearby-distance">{item.distance}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Agent Info */}
//         <div className="agent-card">
//           <div className="agent-header">
//             <img src={property.agent.image} alt={property.agent.name} className="agent-avatar" />
//             <div className="agent-info">
//               <h3 className="agent-name">{property.agent.name}</h3>
//               <p className="agent-address">{property.agent.address}</p>
//               <div className="agent-rating">
//                 <FaStar className="rating-star" />
//                 <span>{property.agent.rating}</span>
//                 <span className="rating-count">({property.agent.deals} معامله)</span>
//               </div>
//             </div>
//           </div>
          
//           <div className="agent-actions">
//             <button className="agent-action-btn phone" onClick={handleCopyPhone}>
//               <FaPhone />
//               {copied ? 'کپی شد!' : 'کپی شماره'}
//             </button>
//             <a 
//               href={`https://wa.me/${property.agent.whatsapp}`} 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="agent-action-btn whatsapp"
//             >
//               <FaWhatsapp />
//               واتساپ
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Action Buttons */}
//       <div className="bottom-actions">
//         <button className="action-btn primary" onClick={handleCopyPhone}>
//           <FaPhone />
//           تماس با مشاور
//         </button>
//         <a 
//           href={`https://wa.me/${property.agent.whatsapp}`} 
//           target="_blank" 
//           rel="noopener noreferrer"
//           className="action-btn secondary"
//         >
//           <FaWhatsapp />
//           پیام در واتساپ
//         </a>
//       </div>

//       {/* Copy Toast */}
//       {copied && (
//         <div className="toast-notification">
//           شماره تلفن کپی شد
//         </div>
//       )}
//     </div>
//   );
// };

// export default RealEstateDetailPageItem;

// // RealEstateDetailPageItem.jsx
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import { 
// //   FaMapMarkerAlt, 
// //   FaPhone, 
// //   FaWhatsapp, 
// //   FaShare, 
// //   FaArrowRight, 
// //   FaCopy, 
// //   FaCheckCircle,
// //   FaHeart,
// //   FaRegHeart,
// //   FaStar,
// //   FaParking,
// //   FaWarehouse,
// //   FaSwimmingPool,
// //   FaFire,
// //   FaBath,
// //   FaRulerCombined,
// //   FaCalendarAlt,
// //   FaLayerGroup,
// //   FaArrowUp
// // } from 'react-icons/fa';
// // import { Swiper, SwiperSlide } from 'swiper/react';
// // import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// // import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// // import L from 'leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import NeshanMap from "@neshan-maps-platform/react-openlayers";
// // import "@neshan-maps-platform/react-openlayers/dist/style.css";

// // Import Swiper styles
// // import 'swiper/css';
// // import 'swiper/css/navigation';
// // import 'swiper/css/pagination';
// // import './RealEstateDetailPageItem.css';

// // Fix for Leaflet marker icons in React
// // delete L.Icon.Default.prototype._getIconUrl;
// // L.Icon.Default.mergeOptions({
// //   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
// //   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
// //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// // });

// // const RealEstateDetailPage = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [property, setProperty] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [copied, setCopied] = useState(false);
// //   const [selectedImage, setSelectedImage] = useState(0);
// //   const [activeTab, setActiveTab] = useState('details');
// //   const [isFavorite, setIsFavorite] = useState(false);
// //   const [mapReady, setMapReady] = useState(false);

// //   شبیه‌سازی دریافت داده از API
// //   useEffect(() => {
// //     const fetchPropertyData = async () => {
// //       setLoading(true);
// //       try {
// //         شبیه‌سازی تاخیر شبکه
// //         await new Promise(resolve => setTimeout(resolve, 2000));
        
// //         setProperty({
// //           id: id || 12345,
// //           title: "آپارتمان لوکس کلید نخورده جردن",
// //           price: "۹,۰۰۰,۰۰۰,۰۰۰",
// //           rent: "۳۰,۰۰۰,۰۰۰",
// //           type: "فروش",
// //           area: 190,
// //           rooms: 3,
// //           floor: 6,
// //           totalFloors: 8,
// //           year: 1403,
// //           address: "تهران، امانیه، خیابان جردن، کوچه روشن",
// //           location: {
// //             lat: 35.7199363,
// //             lng: 51.4334842
// //           },
// //           description: `واحد بسیار لوکس و کلید نخورده در بهترین نقطه جردن
// // با بهترین مصالح و طراحی مدرن
// // مناسب برای خانواده‌های محترم
// // دسترسی عالی به مراکز خرید و خدمات شهری

// // ویژگی‌های خاص:
// // • نمای تمام شیشه
// // • نورگیری عالی
// // • سقف بلند
// // • کفپوش چوبی`,
// //           features: [
// //             "پارکینگ",
// //             "انباری",
// //             "آسانسور",
// //             "کابینت‌های مدرن",
// //             "شیشه‌های دوجداره",
// //             "نورگیر",
// //             "سرویس فرنگی",
// //             "بالکن",
// //             "شوفاژ",
// //             "کولر مرکزی",
// //             "جکوزی",
// //             "سونا"
// //           ],
// //           warnings: [
// //             "استعلام خلافی",
// //             "بررسی سند مالکیت",
// //             "استعلام پایان کار",
// //             "بررسی مفاصا حساب",
// //             "استعلام از شهرداری",
// //             "بررسی مدارک شناسایی"
// //           ],
// //           images: [
// //             "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800",
// //             "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800",
// //             "https://images.unsplash.com/photo-1560448204-31e104c7cf0d?w=800",
// //             "https://images.unsplash.com/photo-1560448204-3e5a2b93fc6b?w=800",
// //             "https://images.unsplash.com/photo-1560448204-1c4d36b9a0b0?w=800"
// //           ],
// //           agent: {
// //             name: "مشاور املاک رویال",
// //             phone: "۰۲۱۲۲۳۳۴۴۵۵",
// //             whatsapp: "۰۹۱۲۳۴۵۶۷۸۹",
// //             address: "تهران، جردن، نبش کوچه روشن",
// //             rating: 4.8,
// //             deals: 342,
// //             image: "https://randomuser.me/api/portraits/men/32.jpg"
// //           },
// //           views: 1234,
// //           saved: 89,
// //           createdAt: "۲ روز پیش",
// //           certificate: "دارای سند رسمی",
// //           mortgage: "قابل وام",
// //           nearby: [
// //             { name: "مترو", distance: "۵۰۰ متر" },
// //             { name: "مرکز خرید", distance: "۳۰۰ متر" },
// //             { name: "پارک", distance: "۲۰۰ متر" },
// //             { name: "مدرسه", distance: "۴۰۰ متر" }
// //           ]
// //         });
// //         setMapReady(true);
// //       } catch (error) {
// //         console.error('خطا در دریافت اطلاعات:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchPropertyData();
// //   }, [id]);

// //   const formatPrice = (price) => {
// //     if (!price) return '';
// //     return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// //   };

// //   const handleShare = async () => {
// //     if (!property) return;
    
// //     if (navigator.share) {
// //       try {
// //         await navigator.share({
// //           title: property.title,
// //           text: property.description,
// //           url: window.location.href
// //         });
// //       } catch (error) {
// //         console.log('Error sharing:', error);
// //       }
// //     } else {
// //       navigator.clipboard.writeText(window.location.href);
// //       setCopied(true);
// //       setTimeout(() => setCopied(false), 2000);
// //     }
// //   };

// //   const handleCopyPhone = () => {
// //     if (!property?.agent?.phone) return;
    
// //     navigator.clipboard.writeText(property.agent.phone);
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 2000);
// //   };

// //   Skeleton Component
// //   const DetailSkeleton = () => (
// //     <div className="detail-skeleton">
// //       <div className="skeleton-header">
// //         <div className="skeleton-circle"></div>
// //         <div className="skeleton-title"></div>
// //         <div className="skeleton-circle"></div>
// //       </div>
// //       <div className="skeleton-gallery">
// //         <div className="skeleton-image"></div>
// //       </div>
// //       <div className="skeleton-content">
// //         <div className="skeleton-price"></div>
// //         <div className="skeleton-info">
// //           <div className="skeleton-chip"></div>
// //           <div className="skeleton-chip"></div>
// //           <div className="skeleton-chip"></div>
// //           <div className="skeleton-chip"></div>
// //           <div className="skeleton-chip"></div>
// //         </div>
// //         <div className="skeleton-tabs">
// //           <div className="skeleton-tab"></div>
// //           <div className="skeleton-tab"></div>
// //           <div className="skeleton-tab"></div>
// //         </div>
// //         <div className="skeleton-text">
// //           <div className="skeleton-line"></div>
// //           <div className="skeleton-line"></div>
// //           <div className="skeleton-line"></div>
// //           <div className="skeleton-line-short"></div>
// //         </div>
// //         <div className="skeleton-features">
// //           <div className="skeleton-feature"></div>
// //           <div className="skeleton-feature"></div>
// //           <div className="skeleton-feature"></div>
// //           <div className="skeleton-feature"></div>
// //         </div>
// //       </div>
// //       <div className="skeleton-agent">
// //         <div className="skeleton-agent-info">
// //           <div className="skeleton-avatar"></div>
// //           <div className="skeleton-agent-details">
// //             <div className="skeleton-agent-name"></div>
// //             <div className="skeleton-agent-address"></div>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="skeleton-actions">
// //         <div className="skeleton-button"></div>
// //         <div className="skeleton-button"></div>
// //       </div>
// //     </div>
// //   );

// //   if (loading) {
// //     return <DetailSkeleton />;
// //   }

// //   if (!property) {
// //     return (
// //       <div className="detail-container">
// //         <div className="detail-header">
// //           <button className="header-btn" onClick={() => navigate(-1)}>
// //             <FaArrowRight />
// //           </button>
// //           <h1 className="header-title">خطا</h1>
// //           <div className="header-btn"></div>
// //         </div>
// //         <div className="error-message">
// //           <p>متاسفانه ملک مورد نظر یافت نشد</p>
// //           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="detail-container">
// //       {/* Header */}
// //       <div className="detail-header">
// //         <button className="header-btn" onClick={() => navigate(-1)}>
// //           <FaArrowRight />
// //         </button>
// //         <h1 className="header-title">جزئیات ملک</h1>
// //         <button className="header-btn" onClick={handleShare}>
// //           <FaShare />
// //         </button>
// //       </div>

// //       {/* Image Gallery */}
// //       <div className="detail-gallery">
// //         <Swiper
// //           modules={[Navigation, Pagination, Autoplay]}
// //           navigation
// //           pagination={{ clickable: true }}
// //           autoplay={{ delay: 3000 }}
// //           spaceBetween={0}
// //           slidesPerView={1}
// //           onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)}
// //           className="gallery-swiper"
// //         >
// //           {property.images.map((img, index) => (
// //             <SwiperSlide key={index}>
// //               <div className="gallery-slide">
// //                 <img 
// //                   src={img} 
// //                   alt={`${property.title} - تصویر ${index + 1}`}
// //                   loading={index === 0 ? 'eager' : 'lazy'}
// //                 />
// //               </div>
// //             </SwiperSlide>
// //           ))}
// //         </Swiper>
        
// //         <button 
// //           className={`favorite-btn ${isFavorite ? 'active' : ''}`}
// //           onClick={() => setIsFavorite(!isFavorite)}
// //           aria-label={isFavorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
// //         >
// //           {isFavorite ? <FaHeart /> : <FaRegHeart />}
// //         </button>
        
// //         <div className="image-counter">
// //           {selectedImage + 1} / {property.images.length}
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="detail-main">
// //         {/* Title & Price */}
// //         <div className="detail-title-section">
// //           <div className="title-row">
// //             <h1 className="detail-title">{property.title}</h1>
// //             <div className="property-stats">
// //               <span className="stat-badge">
// //                 <FaFire className="stat-icon" />
// //                 {property.views} بازدید
// //               </span>
// //               <span className="stat-badge">
// //                 <FaStar className="stat-icon" />
// //                 {property.saved} ذخیره
// //               </span>
// //             </div>
// //           </div>
          
// //           <div className="detail-price-box">
// //             <div className="price-row main-price">
// //               <span className="price-label">قیمت فروش:</span>
// //               <span className="price-value">{formatPrice(property.price)}</span>
// //               <span className="price-currency">تومان</span>
// //             </div>
// //             {property.rent && (
// //               <div className="price-row rent-price">
// //                 <span className="price-label">رهن و اجاره:</span>
// //                 <span className="price-value">{formatPrice(property.rent)}</span>
// //                 <span className="price-currency">تومان</span>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Quick Specs */}
// //         <div className="quick-specs">
// //           <div className="spec-item">
// //             <FaRulerCombined className="spec-icon" />
// //             <span className="spec-label">متراژ</span>
// //             <span className="spec-value">{property.area} متر²</span>
// //           </div>
// //           <div className="spec-item">
// //             <FaBath className="spec-icon" />
// //             <span className="spec-label">اتاق</span>
// //             <span className="spec-value">{property.rooms} خواب</span>
// //           </div>
// //           <div className="spec-item">
// //             <FaLayerGroup className="spec-icon" />
// //             <span className="spec-label">طبقه</span>
// //             <span className="spec-value">{property.floor} از {property.totalFloors}</span>
// //           </div>
// //           <div className="spec-item">
// //             <FaCalendarAlt className="spec-icon" />
// //             <span className="spec-label">ساخت</span>
// //             <span className="spec-value">{property.year}</span>
// //           </div>
// //         </div>

// //         {/* Info Chips */}
// //         <div className="info-chips">
// //           <span className="info-chip">کد ملک: {property.id}</span>
// //           <span className="info-chip">{property.certificate}</span>
// //           <span className="info-chip">{property.mortgage}</span>
// //         </div>

// //         {/* Tabs */}
// //         <div className="detail-tabs">
// //           <button 
// //             className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
// //             onClick={() => setActiveTab('details')}
// //           >
// //             جزئیات
// //           </button>
// //           <button 
// //             className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
// //             onClick={() => setActiveTab('features')}
// //           >
// //             امکانات
// //           </button>
// //           <button 
// //             className={`tab-btn ${activeTab === 'warnings' ? 'active' : ''}`}
// //             onClick={() => setActiveTab('warnings')}
// //           >
// //             هشدارها
// //           </button>
// //           <button 
// //             className={`tab-btn ${activeTab === 'nearby' ? 'active' : ''}`}
// //             onClick={() => setActiveTab('nearby')}
// //           >
// //             امکانات اطراف
// //           </button>
// //         </div>

// //         {/* Tab Content */}
// //         <div className="tab-content">
// //           {activeTab === 'details' && (
// //             <div className="details-tab">
// //               <div className="address-card">
// //                 <FaMapMarkerAlt className="address-icon" />
// //                 <div className="address-info">
// //                   <h3>آدرس ملک</h3>
// //                   <p>{property.address}</p>
// //                   <span className="post-date">درج: {property.createdAt}</span>
// //                 </div>
// //               </div>
              
// //               <div className="description-card">
// //                 <h3>توضیحات کامل</h3>
// //                 <p className="description-text">{property.description}</p>
// //               </div>

           

// // <div className="map-card">
// //   <h3>موقعیت مکانی</h3>
// //   <div 
// //     className="map-container" 
// //     style={{ 
// //       height: '300px', 
// //       width: '100%', 
// //       position: 'relative',
// //       overflow: 'hidden'  // مهم
// //     }}
// //   >
// //     {/* نقشه نشان - این حرکت می‌کنه */}
// //     <NeshanMap
// //       mapKey="web.31c5ea6c425e40cc9b30620a84a8be90"
// //       center={{ 
// //         latitude: property.location.lat, 
// //         longitude: property.location.lng 
// //       }}
// //       zoom={15}
// //       defaultType="dreamy"
// //       poi={true}
// //       traffic={false}
// //       style={{ 
// //         height: '100%', 
// //         width: '100%',
// //         position: 'relative',
// //         zIndex: 1
// //       }}
// //     />
    
// //     {/* این دیو رو روی کل نقشه می‌ذاریم تا هیچ حرکتی نکنه */}
// //     <div style={{
// //       position: 'absolute',
// //       top: 0,
// //       left: 0,
// //       right: 0,
// //       bottom: 0,
// //       zIndex: 2,
// //       pointerEvents: 'none',  // این خیلی مهمه - باعث میشه موس به نقشه برسه
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //     }}>
// //       {/* آیکون ثابت - این هرگز تکون نمی‌خوره */}
// //       <div style={{
// //         width: '50px',
// //         height: '50px',
// //         marginTop: '-25px',  // تنظیم برای اینکه نوک پین دقیق روی نقطه باشه
// //         transform: 'translateY(-25%)', // تنظیم بیشتر برای دقت
// //       }}>
// //         {/* آیکون لوکیشن آبی */}
// //         <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
// //           <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#3498db" stroke="white" strokeWidth="2"/>
// //           <circle cx="12" cy="9" r="3" fill="white"/>
// //         </svg>
// //       </div>
// //     </div>
// //   </div>
  
// //   {/* لینک گوگل مپ */}
// //   <a 
// //     href={`https://www.google.com/maps/search/?api=1&query=${property.location.lat},${property.location.lng}`}
// //     target="_blank"
// //     rel="noopener noreferrer"
// //     style={{
// //       display: 'inline-flex',
// //       alignItems: 'center',
// //       gap: '8px',
// //       marginTop: '12px',
// //       padding: '10px 20px',
// //       backgroundColor: '#3498db',
// //       color: 'white',
// //       textDecoration: 'none',
// //       borderRadius: '8px',
// //       fontSize: '14px',
// //       border: 'none',
// //       cursor: 'pointer',
// //     }}
// //   >
// //     <FaMapMarkerAlt />
// //     مشاهده در Google Maps
// //   </a>
// // </div>
// //             </div>
// //           )}

// //           {activeTab === 'features' && (
// //             <div className="features-tab">
// //               <h3>امکانات و ویژگی‌ها</h3>
// //               <div className="features-grid">
// //                 {property.features.map((feature, index) => {
// //                   let IconComponent = FaCheckCircle;
// //                   if (feature === 'پارکینگ') IconComponent = FaParking;
// //                   else if (feature === 'انباری') IconComponent = FaWarehouse;
// //                   else if (feature === 'آسانسور') IconComponent = FaArrowUp;
// //                   else if (feature === 'استخر') IconComponent = FaSwimmingPool;
                  
// //                   return (
// //                     <div key={index} className="feature-card">
// //                       <IconComponent className="feature-icon" />
// //                       <span>{feature}</span>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             </div>
// //           )}

// //           {activeTab === 'warnings' && (
// //             <div className="warnings-tab">
// //               <h3>⚠️ هشدارهای مهم قبل از معامله</h3>
// //               <ul className="warnings-list">
// //                 {property.warnings.map((warning, index) => (
// //                   <li key={index} className="warning-item">
// //                     <span className="warning-bullet"></span>
// //                     <span>{warning}</span>
// //                   </li>
// //                 ))}
// //               </ul>
// //               <div className="warning-footer">
// //                 <p>توجه: لطفاً قبل از هرگونه معامله، مدارک ملک را به دقت بررسی کنید</p>
// //               </div>
// //             </div>
// //           )}

// //           {activeTab === 'nearby' && (
// //             <div className="nearby-tab">
// //               <h3>امکانات اطراف ملک</h3>
// //               <div className="nearby-list">
// //                 {property.nearby.map((item, index) => (
// //                   <div key={index} className="nearby-item">
// //                     <span className="nearby-name">{item.name}</span>
// //                     <span className="nearby-distance">{item.distance}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Agent Info */}
// //         <div className="agent-card">
// //           <div className="agent-header">
// //             <img src={property.agent.image} alt={property.agent.name} className="agent-avatar" />
// //             <div className="agent-info">
// //               <h3 className="agent-name">{property.agent.name}</h3>
// //               <p className="agent-address">{property.agent.address}</p>
// //               <div className="agent-rating">
// //                 <FaStar className="rating-star" />
// //                 <span>{property.agent.rating}</span>
// //                 <span className="rating-count">({property.agent.deals} معامله)</span>
// //               </div>
// //             </div>
// //           </div>
          
// //           <div className="agent-actions">
// //             <button className="agent-action-btn phone" onClick={handleCopyPhone}>
// //               <FaPhone />
// //               {copied ? 'کپی شد!' : 'کپی شماره'}
// //             </button>
// //             <a 
// //               href={`https://wa.me/${property.agent.whatsapp}`} 
// //               target="_blank" 
// //               rel="noopener noreferrer"
// //               className="agent-action-btn whatsapp"
// //             >
// //               <FaWhatsapp />
// //               واتساپ
// //             </a>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Bottom Action Buttons */}
// //       <div className="bottom-actions">
// //         <button className="action-btn primary" onClick={handleCopyPhone}>
// //           <FaPhone />
// //           تماس با مشاور
// //         </button>
// //         <a 
// //           href={`https://wa.me/${property.agent.whatsapp}`} 
// //           target="_blank" 
// //           rel="noopener noreferrer"
// //           className="action-btn secondary"
// //         >
// //           <FaWhatsapp />
// //           پیام در واتساپ
// //         </a>
// //       </div>

// //       {/* Copy Toast */}
// //       {copied && (
// //         <div className="toast-notification">
// //           شماره تلفن کپی شد
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default RealEstateDetailPage;
// RealEstateDetailPageItem.jsx - نسخه بهبود یافته

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { 
//   FaMapMarkerAlt, 
//   FaPhone, 
//   FaWhatsapp, 
//   FaShare, 
//   FaArrowRight, 
//   FaHeart,
//   FaRegHeart,
//   FaStar,
//   FaParking,
//   FaWarehouse,
//   FaSwimmingPool,
//   FaFire,
//   FaBath,
//   FaRulerCombined,
//   FaCalendarAlt,
//   FaLayerGroup,
//   FaArrowUp,
//   FaCheckCircle,
//   FaTag,
//   FaHome,
//   FaBuilding,
//   FaRuler
// } from 'react-icons/fa';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import NeshanMap from "@neshan-maps-platform/react-openlayers";
// import "@neshan-maps-platform/react-openlayers/dist/style.css";

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import './RealEstateDetailPageItem.css';

// const RealEstateDetailPageItem = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const id = queryParams.get('id');
//   const navigate = useNavigate();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [copied, setCopied] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [activeTab, setActiveTab] = useState('details');
//   const [isFavorite, setIsFavorite] = useState(false);

//   useEffect(() => {
//     const fetchPropertyData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           `https://localhost:7178/api/RealEstatePage/GetRealEstateDetails?id=${id}`
//         );
//         const result = await response.json();

//         if (result.status === 200 && result.data) {
//           const data = result.data;
//           setProperty({
//             id: data.id,
//             title: data.title,
//             price: data.price?.toLocaleString("fa-IR") || "۰",
//             priceMeter: data.priceMeter?.toLocaleString("fa-IR") || "۰",
//             rentPrice: data.rent?.toLocaleString("fa-IR") || null,
//             depositPrice: data.deposit?.toLocaleString("fa-IR") || null,
//             mortgagePrice: data.mortgagePrice?.toLocaleString("fa-IR") || null,
//             type: data.categoryType, // 0: اجاره, 1: فروش
//             area: parseInt(data.additionalInformation?.match(/\d+/)?.[0]) || 0,
//             rooms: data.rooms || 0,
//             floor: data.floor || 1,
//             regionName:data.regionName,
//             totalFloors: data.countFloor || 1,
//             year: data.constructionYear || "نامشخص",
//             address: data.address || "آدرس درج نشده",
//             showExactLocation:data.showExactLocation,
//             location: {
//               lat: data.lat || 35.7199363,
//               lng: data.lng || 51.4334842,
//             },
//             description: data.additionalInformation || "توضیحاتی برای این ملک ثبت نشده است.",
//             features: data.facilities || [],
//             warnings: data.warnings || [
//               "استعلام خلافی",
//               "بررسی سند مالکیت",
//               "استعلام پایان کار",
//               "بررسی مفاصا حساب"
//             ],
//             images: (data.images || []).map(
//               (img) => `https://localhost:7178/uploads/images/${img}`
//             ),
//             agent: {
//               name: data.agents?.name || "مشاور املاک",
//               phone: data.agents?.phone || "۰۲۱۹۱۰۰۰۰۰۰",
//               whatsapp: data.agents?.connectSocialMedia || "",
//               address: data.agents?.address || "آدرس دفتر درج نشده",
//               rating: 4.5,
//               deals: 120,
//               image: data.agents?.image || "https://randomuser.me/api/portraits/men/32.jpg",
//             },
//             views: data.views || 0,
//             saved: data.saved || 0,
//             createdAt: data.createdAtPersianRelative || "امروز",
//             certificate: data.isHasLoan ? "قابل وام" : "سند رسمی",
//             mortgage: data.isHasLoan ? "امکان وام" : "بدون وام",
//             nearby: [
//               { name: "مترو", distance: "۵۰۰ متر" },
//               { name: "مرکز خرید", distance: "۳۰۰ متر" },
//               { name: "پارک", distance: "۲۰۰ متر" },
//               { name: "مدرسه", distance: "۴۰۰ متر" }
//             ]
//           });
//         }
//       } catch (error) {
//         console.error('خطا در دریافت اطلاعات:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchPropertyData();
//     }
//   }, [id]);

//   const formatPrice = (price) => {
//     if (!price || price === "۰") return '۰';
//     return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };

//   const handleShare = async () => {
//     if (!property) return;
    
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: property.title,
//           text: property.description,
//           url: window.location.href
//         });
//       } catch (error) {
//         console.log('Error sharing:', error);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const handleCopyPhone = () => {
//     if (!property?.agent?.phone) return;
//     navigator.clipboard.writeText(property.agent.phone);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const DetailSkeleton = () => (
//     <div className="detail-skeleton">
//       <div className="skeleton-header">
//         <div className="skeleton-circle"></div>
//         <div className="skeleton-title"></div>
//         <div className="skeleton-circle"></div>
//       </div>
//       <div className="skeleton-gallery">
//         <div className="skeleton-image"></div>
//       </div>
//       <div className="skeleton-content">
//         <div className="skeleton-price"></div>
//         <div className="skeleton-info">
//           {[1,2,3,4].map(i => <div key={i} className="skeleton-chip"></div>)}
//         </div>
//         <div className="skeleton-tabs">
//           {[1,2,3,4].map(i => <div key={i} className="skeleton-tab"></div>)}
//         </div>
//         <div className="skeleton-text">
//           {[1,2,3].map(i => <div key={i} className="skeleton-line"></div>)}
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) return <DetailSkeleton />;
//   if (!property) {
//     return (
//       <div className="detail-container">
//         <div className="detail-header">
//           <button className="header-btn" onClick={() => navigate(-1)}>
//             <FaArrowRight />
//           </button>
//           <h1 className="header-title">خطا</h1>
//           <div className="header-btn"></div>
//         </div>
//         <div className="error-message">
//           <p>متاسفانه ملک مورد نظر یافت نشد</p>
//           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
//         </div>
//       </div>
//     );
//   }

//   const isForSale = property.type === 1;
//   const isForRent = property.type === 2;

//   return (
//     <div className="detail-container">
//       {/* Header */}
//       <div className="detail-header">
//         <button className="header-btn" onClick={() => navigate(-1)}>
//           <FaArrowRight />
//         </button>
//         <h1 className="header-title">جزئیات ملک</h1>
//         <button className="header-btn" onClick={handleShare}>
//           <FaShare />
//         </button>
//       </div>

//       {/* Image Gallery */}
//       <div className="detail-gallery">
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 3000 }}
//           spaceBetween={0}
//           slidesPerView={1}
//           onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)}
//           className="gallery-swiper"
//         >
//           {property.images.length > 0 ? property.images.map((img, index) => (
//             <SwiperSlide key={index}>
//               <div className="gallery-slide">
//                 <img 
//                   src={img} 
//                   alt={`${property.title} - تصویر ${index + 1}`}
//                   loading={index === 0 ? 'eager' : 'lazy'}
//                   onError={(e) => { e.target.src = '/placeholder-image.jpg'; }}
//                 />
//               </div>
//             </SwiperSlide>
//           )) : (
//             <SwiperSlide>
//               <div className="gallery-slide no-image">
//                 <FaHome className="no-image-icon" />
//                 <span>تصویری موجود نیست</span>
//               </div>
//             </SwiperSlide>
//           )}
//         </Swiper>
        
//         <button 
//           className={`favorite-btn ${isFavorite ? 'active' : ''}`}
//           onClick={() => setIsFavorite(!isFavorite)}
//         >
//           {isFavorite ? <FaHeart /> : <FaRegHeart />}
//         </button>
        
//         <div className="image-counter">
//           {selectedImage + 1} / {property.images.length || 1}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="detail-main">
//         {/* Title Section */}
//         <div className="detail-title-section">
//           <div className="title-row">
//             <h1 className="detail-title">{property.title}</h1>
//             <div className="property-stats">
//               <span className="stat-badge">
//                 <FaFire className="stat-icon" />
//                 {property.views} بازدید
//               </span>
//               <span className="stat-badge">
//                 <FaStar className="stat-icon" />
//                 {property.saved} ذخیره
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* ===== قیمت‌ها - بخش بهبود یافته ===== */}
//         <div className="price-section">
//           {isForSale && (
//             <div className="price-card sale-price">
//               <div className="price-card-icon">
//                 <FaTag />
//               </div>
//               <div className="price-card-content">
//                 <span className="price-label">قیمت فروش</span>
//                 <div className="price-value-wrapper">
//                   <span className="price-number">{property.price}</span>
//                   <span className="price-unit">تومان</span>
//                 </div>
//                 {property.priceMeter !== "۰" && (
//                   <div className="price-meta">
//                     <FaRuler />
//                     <span>متری {property.priceMeter} تومان</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {isForRent && (
//             <div className="rent-price-group">
//               {property.mortgagePrice && property.mortgagePrice !== "۰" && (
//                 <div className="price-card mortgage-price">
//                   <div className="price-card-icon">
//                     <FaBuilding />
//                   </div>
//                   <div className="price-card-content">
//                     <span className="price-label">مبلغ رهن</span>
//                     <div className="price-value-wrapper">
//                       <span className="price-number">{property.mortgagePrice}</span>
//                       <span className="price-unit">تومان</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
              
//               {property.rentPrice && property.rentPrice !== "۰" && (
//                 <div className="price-card rent-price">
//                   <div className="price-card-icon">
//                     <FaHome />
//                   </div>
//                   <div className="price-card-content">
//                     <span className="price-label">اجاره ماهانه</span>
//                     <div className="price-value-wrapper">
//                       <span className="price-number">{property.rentPrice}</span>
//                       <span className="price-unit">تومان</span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {(!property.mortgagePrice || property.mortgagePrice === "۰") && 
//                (!property.rentPrice || property.rentPrice === "۰") && (
//         <div className="price-card rent-price">
//                   <div className="price-card-icon">
//                     <FaHome />
//                   </div>
//                   <div className="price-card-content">
//                     <span className="price-label"> ودیه</span>
//                     <div className="price-value-wrapper">
//                       <span className="price-number">{property.rentPrice}</span>
//                       <span className="price-unit">تومان</span>
//                     </div>
//                   </div>
//                           <div className="price-card-content">
//                     <span className="price-label"> اجاره</span>
//                     <div className="price-value-wrapper">
//                       <span className="price-number">{property.depositPrice}</span>
//                       <span className="price-unit">تومان</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Quick Specs */}
//         <div className="quick-specs">
//           <div className="spec-item">
//             <FaRulerCombined className="spec-icon" />
//             <span className="spec-label">متراژ</span>
//             <span className="spec-value">{property.area} متر²</span>
//           </div>
//           <div className="spec-item">
//             <FaBath className="spec-icon" />
//             <span className="spec-label">اتاق</span>
//             <span className="spec-value">{property.rooms} خواب</span>
//           </div>
//           <div className="spec-item">
//             <FaLayerGroup className="spec-icon" />
//             <span className="spec-label">طبقه</span>
//             <span className="spec-value">{property.floor} از {property.totalFloors}</span>
//           </div>
//           <div className="spec-item">
//             <FaCalendarAlt className="spec-icon" />
//             <span className="spec-label">ساخت</span>
//             <span className="spec-value">{property.year}</span>
//           </div>
//         </div>

//         {/* Info Chips */}
//         <div className="info-chips">
//           <span className="info-chip">کد ملک: {property.id}</span>
//           <span className="info-chip">{property.certificate}</span>
//           <span className="info-chip">{property.mortgage}</span>
//           <span className="info-chip type-chip">
//             {isForSale ? 'فروش' : 'رهن و اجاره'}
//           </span>
//         </div>

//         {/* Tabs */}
//         <div className="detail-tabs">
//           <button className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`} onClick={() => setActiveTab('details')}>جزئیات</button>
//           <button className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`} onClick={() => setActiveTab('features')}>امکانات</button>
//           <button className={`tab-btn ${activeTab === 'warnings' ? 'active' : ''}`} onClick={() => setActiveTab('warnings')}>هشدارها</button>
//           <button className={`tab-btn ${activeTab === 'nearby' ? 'active' : ''}`} onClick={() => setActiveTab('nearby')}>امکانات اطراف</button>
//         </div>

//         {/* Tab Content */}
//         <div className="tab-content">
//           {activeTab === 'details' && (
//             <div className="details-tab">
//               <div className="address-card">
//                 <FaMapMarkerAlt className="address-icon" />
//                 <div className="address-info">
//                   <h3>آدرس ملک</h3> 
//                   <h4>{property.regionName}</h4>
//                   <p>{property.address}</p>
//                   <span className="post-date">درج: {property.createdAt}</span>
//                 </div>
//               </div>
              
//               <div className="description-card">
//                 <h3>توضیحات کامل</h3>
//                 <p className="description-text">{property.description}</p>
//               </div>


// <div className="map-card">
//         <h3>
//           <FaMapMarkerAlt />
//           موقعیت مکانی
//         </h3>
        
//         {/* فقط اگه میخوای به کاربر نشون بدی که چه حالتی فعاله */}
//         <div className="map-location-badge">
//           {property.showExactLocation ? (
//             <span className="badge exact">📍 نمایش موقعیت دقیق</span>
//           ) : (
//             <span className="badge approximate">🔵 نمایش محدوده تقریبی</span>
//           )}
//         </div>
        
//         <div className="map-container" style={{ position: 'relative', overflow: 'hidden' }}>
          
//           <NeshanMap
//             mapKey="web.31c5ea6c425e40cc9b30620a84a8be90"
//             center={{ 
//               latitude: property.location.lat, 
//               longitude: property.location.lng 
//             }}
//             zoom={property.showExactLocation ? 17 : 14} // اگه دقیق باشه زوم بیشتر
//             defaultType="dreamy"
//             poi={true}
//             traffic={false}
//             style={{ 
//               height: '100%', 
//               width: '100%',
//               pointerEvents: 'none'
//             }}
//           />
          
//           {/* مارکرها - شرطی بر اساس showExactLocation از دیتابیس */}
//           <div className="map-marker-overlay">
            
//             {/* دایره محدوده - همیشه نمایش داده میشه */}
//             <div className="location-circle"></div>
            
//             {/* نقطه دقیق - فقط اگه showExactLocation از دیتابیس true باشه */}
//             {property.showExactLocation && (
//               <>
//                 <div className="location-dot"></div>
//                 <div className="location-ripple"></div>
//               </>
//             )}
            
//             {/* دایره‌های متحدالمرکز - فقط حالت محدوده */}
//             {!property.showExactLocation && (
//               <div className="location-circles">
//                 <div className="circle-1"></div>
//                 <div className="circle-2"></div>
//                 <div className="circle-3"></div>
//               </div>
//             )}
            
//           </div>
//         </div>
        
//         <div className="map-privacy-note">
//           <small>
//             {property.showExactLocation 
//               ? '📍 موقعیت دقیق ملک - با تایید مالک نمایش داده می‌شود' 
//               : '📍 محدوده تقریبی ملک برای حفظ حریم خصوصی'}
//           </small>
//         </div>
        
//         {/* <a 
//           href={`https://www.google.com/maps/search/?api=1&query=${property.location.lat},${property.location.lng}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="map-link"
//         >
//           <FaMapMarkerAlt />
//           مشاهده در نقشه بزرگتر
//         </a> */}
//       </div>
//             </div>
//           )}

//           {activeTab === 'features' && (
//             <div className="features-tab">
//               <h3>امکانات و ویژگی‌ها</h3>
//               <div className="features-grid">
//                 {property.features.length > 0 ? property.features.map((feature, index) => {
//                   let IconComponent = FaCheckCircle;
//                   if (feature.includes('پارکینگ')) IconComponent = FaParking;
//                   else if (feature.includes('انباری')) IconComponent = FaWarehouse;
//                   else if (feature.includes('آسانسور')) IconComponent = FaArrowUp;
//                   else if (feature.includes('استخر')) IconComponent = FaSwimmingPool;
                  
//                   return (
//                     <div key={index} className="feature-card">
//                       <IconComponent className="feature-icon" />
//                       <span>{feature}</span>
//                     </div>
//                   );
//                 }) : (
//                   <p className="no-data">امکاناتی برای این ملک ثبت نشده است</p>
//                 )}
//               </div>
//             </div>
//           )}

//           {activeTab === 'warnings' && (
//             <div className="warnings-tab">
//               <h3>⚠️ هشدارهای مهم قبل از معامله</h3>
//               <ul className="warnings-list">
//                 {property.warnings.map((warning, index) => (
//                   <li key={index} className="warning-item">
//                     <span className="warning-bullet"></span>
//                     <span>{warning}</span>
//                   </li>
//                 ))}
//               </ul>
//               <div className="warning-footer">
//                 <p>توجه: لطفاً قبل از هرگونه معامله، مدارک ملک را به دقت بررسی کنید</p>
//               </div>
//             </div>
//           )}

//           {activeTab === 'nearby' && (
//             <div className="nearby-tab">
//               <h3>امکانات اطراف ملک</h3>
//               <div className="nearby-list">
//                 {property.nearby.map((item, index) => (
//                   <div key={index} className="nearby-item">
//                     <span className="nearby-name">{item.name}</span>
//                     <span className="nearby-distance">{item.distance}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Agent Info */}
//         <div className="agent-card">
//           <div className="agent-header">
//             <img src={property.agent.image} alt={property.agent.name} className="agent-avatar" />
//             <div className="agent-info">
//               <h3 className="agent-name">{property.agent.name}</h3>
//               <p className="agent-address">{property.agent.address}</p>
//               <div className="agent-rating">
//                 <FaStar className="rating-star" />
//                 <span>{property.agent.rating}</span>
//                 <span className="rating-count">({property.agent.deals} معامله)</span>
//               </div>
//             </div>
//           </div>
          
//           <div className="agent-actions">
//             <button className="agent-action-btn phone" onClick={handleCopyPhone}>
//               <FaPhone />
//               {copied ? 'کپی شد!' : 'کپی شماره'}
//             </button>
//             <a 
//               href={`https://wa.me/${property.agent.whatsapp}`} 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="agent-action-btn whatsapp"
//             >
//               <FaWhatsapp />
//               واتساپ
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Action Buttons */}
    

//       {copied && (
//         <div className="toast-notification">
//           شماره تلفن کپی شد
//         </div>
//       )}
//     </div>
//   );
// };

// export default RealEstateDetailPageItem;
import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import CryptoJS from 'crypto-js';
import DOMPurify from 'dompurify';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaWhatsapp, 
  FaShare, 
  FaArrowRight, 
  FaHeart,
  FaRegHeart,
  FaStar,
  FaParking,
  FaWarehouse,
  FaSwimmingPool,
  FaBath,
  FaRulerCombined,
  FaCalendarAlt,
  FaLayerGroup,
  FaArrowUp,
  FaCheckCircle,
  FaTag,
  FaHome,
  FaBuilding,
  FaRuler,
  FaShieldAlt,
  FaClock,
  FaEye,
  FaBookmark
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import NeshanMap from "@neshan-maps-platform/react-openlayers";
import "@neshan-maps-platform/react-openlayers/dist/style.css";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './RealEstateDetailPageItem.css';

// ==================== هِلمت جایگزین با استفاده از useEffect ====================
const PageMetadata = ({ property, isForSale, isForRent }) => {
  useEffect(() => {
    if (!property) return;

    // تایتل داینامیک
    const title = property.title 
      ? `${property.title} | ${isForSale ? 'فروش' : 'رهن و اجاره'} | ${property.area} متری ${property.regionName}`
      : 'جزئیات ملک | مشاور املاک';
    
    // توضیحات متا - 150-160 کاراکتر
    const description = property.description
      ? `${property.description.substring(0, 150)}... ${isForSale ? 'قیمت: ' + property.price : 'رهن: ' + property.mortgagePrice} تومان - تماس بگیرید`
      : `ملک ${isForSale ? 'فروش' : 'رهن و اجاره'} در منطقه ${property.regionName} با ${property.area} متر مربع و ${property.rooms} خواب - ${property.address}`;
    
    // کلمات کلیدی
    const keywords = [
      property.title,
      `${property.regionName} ملک`,
      isForSale ? 'فروش آپارتمان' : 'رهن آپارتمان',
      `${property.area} متری`,
      `${property.rooms} خوابه`,
      `طبقه ${property.floor}`,
      property.year !== "نامشخص" ? `ساخت ${property.year}` : '',
      ...property.features.slice(0, 5)
    ].filter(Boolean).join(',');
    
    // متاتگ‌های پایه
    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);
    
    // روبات‌ها
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'index, follow, max-image-preview:large');
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href.split('?')[0];
    
    // Open Graph - Facebook, LinkedIn
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);
    
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description.substring(0, 200));
    
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', property.images?.[0] || '/default-property-image.jpg');
    
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', window.location.href);
    
    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      document.head.appendChild(ogType);
    }
    ogType.setAttribute('content', 'product');
    
    // Twitter Card
    let twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      twitterCard = document.createElement('meta');
      twitterCard.name = 'twitter:card';
      document.head.appendChild(twitterCard);
    }
    twitterCard.setAttribute('content', 'summary_large_image');
    
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.name = 'twitter:title';
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', title);
    
    let twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImage) {
      twitterImage = document.createElement('meta');
      twitterImage.name = 'twitter:image';
      document.head.appendChild(twitterImage);
    }
    twitterImage.setAttribute('content', property.images?.[0] || '/default-property-image.jpg');
    
    // زبان و دایرکشن
    document.documentElement.lang = 'fa';
    document.documentElement.dir = 'rtl';
    
  }, [property, isForSale, isForRent]);
  
  return null;
};

// ==================== JSON-LD Structured Data ====================
const StructuredData = ({ property, isForSale, isForRent }) => {
  useEffect(() => {
    if (!property) return;
    
    const removeOldScript = () => {
      const oldScript = document.getElementById('json-ld-structured-data');
      if (oldScript) oldScript.remove();
    };
    
    removeOldScript();
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": isForSale ? "Product" : "RealEstateListing",
      "name": property.title,
      "description": property.description?.substring(0, 500),
      "image": property.images,
      "url": window.location.href,
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      ...(isForSale && {
        "offers": {
          "@type": "Offer",
          "price": property.price.replace(/[^0-9]/g, ''),
          "priceCurrency": "IRR",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      }),
      ...(isForRent && {
        "offers": {
          "@type": "RentalCarReservation",
          "rentalPrice": property.rentPrice?.replace(/[^0-9]/g, ''),
          "deposit": property.mortgagePrice?.replace(/[^0-9]/g, '')
        }
      }),
      "address": {
        "@type": "PostalAddress",
        "addressLocality": property.regionName,
        "streetAddress": property.address,
        "addressCountry": "IR"
      },
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": property.area,
        "unitCode": "MTK",
        "unitText": "متر مربع"
      },
      "numberOfRooms": property.rooms,
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "طبقه",
          "value": `${property.floor} از ${property.totalFloors}`
        },
        {
          "@type": "PropertyValue",
          "name": "سال ساخت",
          "value": property.year
        },
        ...property.features.map(feature => ({
          "@type": "PropertyValue",
          "name": "امکانات",
          "value": feature
        }))
      ],
      "potentialAction": {
        "@type": "CommunicateAction",
        "name": "تماس با مشاور",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `tel:${property.agent?.phone}`,
          "inLanguage": "fa-IR",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        }
      }
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

// ==================== Breadcrumb Structured Data ====================
const BreadcrumbStructuredData = ({ property, isForSale }) => {
  useEffect(() => {
    if (!property) return;
    
    const removeOldScript = () => {
      const oldScript = document.getElementById('json-ld-breadcrumb');
      if (oldScript) oldScript.remove();
    };
    
    removeOldScript();
    
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "خانه",
          "item": `${window.location.origin}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": isForSale ? "ملک‌های فروش" : "ملک‌های رهن و اجاره",
          "item": `${window.location.origin}/${isForSale ? 'RealEstatePageDetail' : 'rent'}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `منطقه ${property.regionName}`,
          "item": `${window.location.origin}/region/${encodeURIComponent(property.regionName)}`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": property.title?.substring(0, 100),
          "item": window.location.href
        }
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

// ==================== کامپوننت اسکلتون ====================
const DetailSkeleton = () => (
  <div className="detail-skeleton" aria-label="در حال بارگذاری اطلاعات ملک">
    <div className="skeleton-header">
      <div className="skeleton-circle"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-circle"></div>
    </div>
    <div className="skeleton-gallery">
      <div className="skeleton-image"></div>
    </div>
    <div className="skeleton-content">
      <div className="skeleton-price"></div>
      <div className="skeleton-info">
        {[1,2,3,4].map(i => <div key={i} className="skeleton-chip"></div>)}
      </div>
      <div className="skeleton-tabs">
        {[1,2,3,4].map(i => <div key={i} className="skeleton-tab"></div>)}
      </div>
      <div className="skeleton-text">
        {[1,2,3].map(i => <div key={i} className="skeleton-line"></div>)}
      </div>
    </div>
  </div>
);

// ==================== کامپوننت اصلی ====================
const RealEstateDetailPageItem = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  
  // پشتیبانی از هر دو روش (query param و param)
  const queryParams = new URLSearchParams(location.search);
  const id = paramId || queryParams.get('id');
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('details');
  const [isFavorite, setIsFavorite] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});

const ENCRYPTION_KEY = "xK9mN2pQ5rS7uV8wX1yZ3aB4cD6eF0gH2jK5lL8nP9qR1sT3uV5wX7yZ9="; // کلید 256 بیتی

// تابع رمزگشایی
const decryptResponse = (encryptedData, iv) => {
  try {
    // تبدیل IV از Base64
    const ivWordArray = CryptoJS.enc.Base64.parse(iv);
    
    // رمزگشایی
    const decrypted = CryptoJS.AES.decrypt(
      encryptedData,
      CryptoJS.enc.Base64.parse(ENCRYPTION_KEY),
      {
        iv: ivWordArray,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );
    
    // تبدیل به متن
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedText) {
      throw new Error("Decryption resulted in empty text");
    }
    
    // تبدیل به JSON
    return JSON.parse(decryptedText);
  } catch (error) {
    console.error("Decryption failed:", error);
    throw error;
  }
};

  // ==================== فراخوانی داده ====================
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
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(
          `https://localhost:7178/api/RealEstatePage/GetRealEstateDetails?id=${id}`,
          { signal: controller.signal }
        );
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const result = await response.json();

        if (result.status === 200 && result.data) {
          const data = result.data;
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
            location: {
              lat: data.lat || 35.7199363,
              lng: data.lng || 51.4334842,
            },
            description: data.descriptionRows || "توضیحاتی برای این ملک ثبت نشده است.",
            features: data.facilities || [],
            warnings: data.warnings || [
              "استعلام خلافی",
              "بررسی سند مالکیت",
              "استعلام پایان کار",
              "بررسی مفاصا حساب"
            ],
            images: (data.images || []).map(
              
              (img) => `https://localhost:7178/${img}`
            ),
            agent: {
              name: data.agents?.name || "مشاور املاک",
              phone: data.agents?.phone || "۰۲۱۹۱۰۰۰۰۰۰",
              whatsapp: data.agents?.connectSocialMedia || "",
              address: data.agents?.address || "آدرس دفتر درج نشده",
              rating: data.agents?.rating || 4.5,
              deals: data.agents?.deals || 120,
              image: data.agents?.image || "https://randomuser.me/api/portraits/men/32.jpg",
            },
            views: data.views || 0,
            saved: data.saved || 0,
            createdAt: data.createdAtPersianRelative || "امروز",
            certificate: data.isHasLoan ? "قابل وام" : "سند رسمی",
            mortgage: data.isHasLoan ? "امکان وام" : "بدون وام",
            nearby: [
              { name: "مترو", distance: "۵۰۰ متر" },
              { name: "مرکز خرید", distance: "۳۰۰ متر" },
              { name: "پارک", distance: "۲۰۰ متر" },
              { name: "مدرسه", distance: "۴۰۰ متر" }
            ]
          });
        } else {
          throw new Error(result.message || 'ملک یافت نشد');
        }
      } catch (error) {
        console.error('خطا در دریافت اطلاعات:', error);
        setError(error.name === 'AbortError' ? 'مدت زمان درخواست به پایان رسید' : 'مشکل در ارتباط با سرور');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
    
    // اسکرول به بالای صفحه
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // ==================== محاسبات memoized ====================
  const isForSale = useMemo(() => property?.type === 1, [property]);
  const isForRent = useMemo(() => property?.type === 2, [property]);
  
  const formattedPricePerMeter = useMemo(() => {
    if (!property?.priceMeter || property.priceMeter === "۰") return null;
    return `${property.priceMeter} تومان`;
  }, [property]);
  
  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return window.location.href;
  }, []);

  // ==================== هندلرها ====================
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
        if (error.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  }, [property, isForSale, shareUrl, handleCopyLink]);
  
  const handleCopyPhone = useCallback(() => {
    if (!property?.agent?.phone) return;
    navigator.clipboard.writeText(property.agent.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [property]);
  
  const handleImageLoad = useCallback((index) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }));
  }, []);
  
  const handleFavoriteToggle = useCallback(() => {
    setIsFavorite(prev => !prev);
  }, []);

  // ==================== رندر خطا ====================
  if (error) {
    return (
      <>
        <PageMetadata property={null} />
        <div className="detail-container">
          <div className="detail-header">
            <button className="header-btn" onClick={() => navigate(-1)} aria-label="بازگشت">
              <FaArrowRight />
            </button>
            <h1 className="header-title">خطا</h1>
            <div className="header-btn"></div>
          </div>
          <div className="error-message" role="alert">
            <h2>متاسفانه خطایی رخ داده است</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-btn">
              تلاش مجدد
            </button>
            <button onClick={() => navigate('/')} className="home-btn">
              بازگشت به صفحه اصلی
            </button>
          </div>
        </div>
      </>
    );
  }
  
  if (loading) return <DetailSkeleton />;
  if (!property) {
    return (
      <>
        <PageMetadata property={null} />
        <div className="detail-container">
          <div className="detail-header">
            <button className="header-btn" onClick={() => navigate(-1)}>
              <FaArrowRight />
            </button>
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
  }

  // ==================== رندر اصلی ====================
  return (
    <>
      {/* متادیتای سئو */}
      <PageMetadata property={property} isForSale={isForSale} isForRent={isForRent} />
      
      {/* Structured Data */}
      <StructuredData property={property} isForSale={isForSale} isForRent={isForRent} />
      <BreadcrumbStructuredData property={property} isForSale={isForSale} />
      
      {/* کامپوننت اصلی */}
      <div className="detail-container" itemScope itemType="https://schema.org/Product">
        
        {/* ===== Breadcrumb Navigation ===== */}
        <nav aria-label="مسیر راهنما" className="breadcrumb-nav">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item">
              <a href="/" className="breadcrumb-link">خانه</a>
            </li>
            <li className="breadcrumb-item">
              <a href={isForSale ? '/sale' : '/rent'} className="breadcrumb-link">
                {isForSale ? 'فروش' : 'رهن و اجاره'}
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href={`/region/${encodeURIComponent(property.regionName)}`} className="breadcrumb-link">
                منطقه {property.regionName}
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {property.title.substring(0, 50)}...
            </li>
          </ol>
        </nav>
        
        {/* ===== Header ===== */}
        <div className="detail-header">
          <button className="header-btn" onClick={() => navigate(-1)} aria-label="بازگشت به صفحه قبل">
            <FaArrowRight aria-hidden="true" />
          </button>
          <h1 className="header-title" itemProp="name">{property.title}</h1>
          <button className="header-btn" onClick={handleShare} aria-label="اشتراک‌گذاری">
            <FaShare aria-hidden="true" />
          </button>
        </div>

        {/* ===== Image Gallery بدون Lazy module ===== */}
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
            {property.images.length > 0 ? property.images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="gallery-slide">
                  {!imagesLoaded[index] && (
                    <div className="image-placeholder" aria-label="در حال بارگذاری تصویر">
                      <FaHome className="placeholder-icon" />
                    </div>
                  )}
                  <img 
                    src={img} 
                    alt={`${property.title} - ${index === 0 ? 'نمای اصلی' : index === 1 ? 'داخلی' : `تصویر ${index + 1}`} - ${property.area} متری ${property.regionName}`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    onLoad={() => handleImageLoad(index)}
                    style={{ display: imagesLoaded[index] ? 'block' : 'none' }}
                    itemProp="image"
                  />
                </div>
              </SwiperSlide>
            )) : (
              <SwiperSlide>
                <div className="gallery-slide no-image">
                  <FaHome className="no-image-icon" />
                  <span>تصویری موجود نیست</span>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
          
          <button 
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteToggle}
            aria-label={isFavorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
            aria-pressed={isFavorite}
          >
            {isFavorite ? <FaHeart aria-hidden="true" /> : <FaRegHeart aria-hidden="true" />}
          </button>
          
          <div className="image-counter" aria-label={`تصویر ${selectedImage + 1} از ${property.images.length || 1}`}>
            {selectedImage + 1} / {property.images.length || 1}
          </div>
        </div>

        {/* ===== Main Content ===== */}
        <div className="detail-main">
          
          {/* Title Section با stats */}
          <div className="detail-title-section">
            <div className="title-row">
              <h2 className="detail-subtitle" itemProp="name">{property.title}</h2>
              <div className="property-stats">
                <span className="stat-badge" title="تعداد بازدید">
                  <FaEye className="stat-icon" aria-hidden="true" />
                  {property.views.toLocaleString('fa-IR')} بازدید
                </span>
                <span className="stat-badge" title="تعداد ذخیره شده">
                  <FaBookmark className="stat-icon" aria-hidden="true" />
                  {property.saved.toLocaleString('fa-IR')} ذخیره
                </span>
                <span className="stat-badge" title="تاریخ درج">
                  <FaClock className="stat-icon" aria-hidden="true" />
                  {property.createdAt}
                </span>
              </div>
            </div>
          </div>

          {/* ===== قیمت‌ها ===== */}
          <div className="price-section" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            {isForSale && (
              <div className="price-card sale-price">
                <div className="price-card-icon">
                  <FaTag aria-hidden="true" />
                </div>
                <div className="price-card-content">
                  <span className="price-label">قیمت فروش</span>
                  <div className="price-value-wrapper">
                    <span className="price-number" itemProp="price">{property.price}</span>
                    <span className="price-unit" itemProp="priceCurrency" content="IRR">تومان</span>
                  </div>
                  {formattedPricePerMeter && (
                    <div className="price-meta">
                      <FaRuler aria-hidden="true" />
                      <span>متری {formattedPricePerMeter}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {isForRent && (
              <div className="rent-price-group">
                {property.mortgagePrice && property.mortgagePrice !== "۰" && (
                  <div className="price-card mortgage-price">
                    <div className="price-card-icon">
                      <FaBuilding aria-hidden="true" />
                    </div>
                    <div className="price-card-content">
                      <span className="price-label">مبلغ رهن (قرض‌الحسنه)</span>
                      <div className="price-value-wrapper">
                        <span className="price-number">{property.mortgagePrice}</span>
                        <span className="price-unit">تومان</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {property.rentPrice && property.rentPrice !== "۰" && (
                  <div className="price-card rent-price">
                    <div className="price-card-icon">
                      <FaHome aria-hidden="true" />
                    </div>
                    <div className="price-card-content">
                      <span className="price-label">اجاره ماهانه</span>
                      <div className="price-value-wrapper">
                        <span className="price-number">{property.rentPrice}</span>
                        <span className="price-unit">تومان</span>
                      </div>
                    </div>
                  </div>
                )}

                {(!property.mortgagePrice || property.mortgagePrice === "۰") && 
                 (!property.rentPrice || property.rentPrice === "۰") && property.depositPrice && (
                  <div className="price-card deposit-price">
                    <div className="price-card-icon">
                      <FaShieldAlt aria-hidden="true" />
                    </div>
                    <div className="price-card-content">
                      <span className="price-label">ودیعه</span>
                      <div className="price-value-wrapper">
                        <span className="price-number">{property.depositPrice}</span>
                        <span className="price-unit">تومان</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ===== مشخصات سریع ===== */}
          <div className="quick-specs">
            <div className="spec-item" itemProp="floorSize" itemScope itemType="https://schema.org/QuantitativeValue">
              <FaRulerCombined className="spec-icon" aria-hidden="true" />
              <span className="spec-label">متراژ</span>
              <span className="spec-value" itemProp="value">{property.area} متر²</span>
            </div>
            <div className="spec-item">
              <FaBath className="spec-icon" aria-hidden="true" />
              <span className="spec-label">اتاق‌خواب</span>
              <span className="spec-value" itemProp="numberOfRooms">{property.rooms} خواب</span>
            </div>
            <div className="spec-item">
              <FaLayerGroup className="spec-icon" aria-hidden="true" />
              <span className="spec-label">طبقه</span>
              <span className="spec-value">{property.floor} از {property.totalFloors}</span>
            </div>
            <div className="spec-item">
              <FaCalendarAlt className="spec-icon" aria-hidden="true" />
              <span className="spec-label">سال ساخت</span>
              <span className="spec-value">{property.year}</span>
            </div>
          </div>

          {/* ===== چیپ‌های اطلاعاتی ===== */}
          <div className="info-chips">
            <span className="info-chip">کد ملک: {property.id}</span>
            <span className="info-chip">
              <FaShieldAlt aria-hidden="true" /> {property.certificate}
            </span>
            <span className="info-chip type-chip">
              {isForSale ? 'فروش' : 'رهن و اجاره'}
            </span>
          </div>

          {/* ===== تب‌ها ===== */}
          <div className="detail-tabs" role="tablist">
            <button 
              className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`} 
              onClick={() => setActiveTab('details')}
              role="tab"
              aria-selected={activeTab === 'details'}
              id="tab-details"
            >
              جزئیات ملک
            </button>
            <button 
              className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`} 
              onClick={() => setActiveTab('features')}
              role="tab"
              aria-selected={activeTab === 'features'}
              id="tab-features"
            >
              امکانات ({property.features.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'warnings' ? 'active' : ''}`} 
              onClick={() => setActiveTab('warnings')}
              role="tab"
              aria-selected={activeTab === 'warnings'}
              id="tab-warnings"
            >
              هشدارهای معامله
            </button>
            <button 
              className={`tab-btn ${activeTab === 'nearby' ? 'active' : ''}`} 
              onClick={() => setActiveTab('nearby')}
              role="tab"
              aria-selected={activeTab === 'nearby'}
              id="tab-nearby"
            >
              امکانات اطراف
            </button>
          </div>

          {/* ===== محتوای تب‌ها ===== */}
          <div className="tab-content" role="tabpanel">
            {activeTab === 'details' && (
              <div className="details-tab">
                {/* آدرس و موقعیت */}
                <div className="address-card">
                  <FaMapMarkerAlt className="address-icon" aria-hidden="true" />
                  <div className="address-info">
                    <h3>آدرس ملک</h3> 
                    <h4>منطقه {property.regionName}</h4>
                    <p itemProp="address">{property.address}</p>
                    <span className="post-date">تاریخ درج: {property.createdAt}</span>
                  </div>
                </div>
                
                {/* توضیحات کامل با کلمات کلیدی */}
                <div className="description-card">
                  <h3>توضیحات کامل ملک {property.title}</h3>
                  <div className="description-highlights">
                    <ul>
                      <li><strong>نوع ملک:</strong> {isForSale ? 'فروش' : 'رهن و اجاره'}</li>
                      <li><strong>موقعیت:</strong> منطقه {property.regionName}، تهران</li>
                      <li><strong>متراژ:</strong> {property.area} متر مربع</li>
                      <li><strong>تعداد اتاق:</strong> {property.rooms} خواب</li>
                      {property.year !== "نامشخص" && <li><strong>سال ساخت:</strong> {property.year}</li>}
                      <li><strong>طبقه:</strong> {property.floor} از {property.totalFloors}</li>
                    </ul>
                  </div>
                  {/* <p className="description-text" itemProp="description">
                    {property.description}
                  </p> */}
<div 
  className="description-text" 
  itemProp="description"
  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(property.description, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'h1', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'a', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'img'],
    ALLOWED_ATTR: ['href', 'target', 'src', 'alt', 'width', 'height']
  }) }}
/>
                </div>

                {/* نقشه */}
                <div className="map-card">
                  <h3>
                    <FaMapMarkerAlt aria-hidden="true" />
                    موقعیت مکانی ملک در منطقه {property.regionName}
                  </h3>
                  
                  <div className="map-location-badge">
                    {property.showExactLocation ? (
                      <span className="badge exact">📍 نمایش موقعیت دقیق ملک</span>
                    ) : (
                      <span className="badge approximate">🔵 نمایش محدوده تقریبی برای حفظ حریم خصوصی</span>
                    )}
                  </div>
                  
                  <div className="map-container" style={{ position: 'relative', overflow: 'hidden' }}>
                    <NeshanMap
                      mapKey="web.31c5ea6c425e40cc9b30620a84a8be90"
                      center={{ 
                        latitude: property.location.lat, 
                        longitude: property.location.lng 
                      }}
                      zoom={property.showExactLocation ? 17 : 15.9}
                      defaultType="dreamy"
                      poi={true}
                      traffic={false}
                      style={{ height: '100%', width: '100%', pointerEvents: 'none' }}
                    />
                    
                    <div className="map-marker-overlay">
                      {property.showExactLocation && (
                        <>
                          <div className="location-dot"></div>
                          <div className="location-ripple"></div>
                        </>
                      )}
                      {!property.showExactLocation && (
                        <div className="location-circles">
                          {/* <div className="circle-1"></div>
                          <div className="circle-2"></div> */}
                          <div className="circle-3"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="map-privacy-note">
                    <small>
                      {property.showExactLocation 
                        ? '📍 موقعیت دقیق ملک - با تایید مالک نمایش داده می‌شود' 
                        : '📍 محدوده تقریبی ملک برای حفظ حریم خصوصی'}
                    </small>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="features-tab">
                <h3>امکانات و ویژگی‌های {property.title}</h3>
                <div className="features-grid">
                  {property.features.length > 0 ? property.features.map((feature, index) => {
                    let IconComponent = FaCheckCircle;
                    if (feature.includes('پارکینگ')) IconComponent = FaParking;
                    else if (feature.includes('انباری')) IconComponent = FaWarehouse;
                    else if (feature.includes('آسانسور')) IconComponent = FaArrowUp;
                    else if (feature.includes('استخر')) IconComponent = FaSwimmingPool;
                    
                    return (
                      <div key={index} className="feature-card">
                        <IconComponent className="feature-icon" aria-hidden="true" />
                        <span>{feature}</span>
                      </div>
                    );
                  }) : (
                    <p className="no-data">امکاناتی برای این ملک ثبت نشده است</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'warnings' && (
              <div className="warnings-tab">
                <h3>⚠️ هشدارهای مهم قبل از معامله ملک</h3>
                <ul className="warnings-list">
                  {property.warnings.map((warning, index) => (
                    <li key={index} className="warning-item">
                      <span className="warning-bullet"></span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
                <div className="warning-footer">
                  <p>⚠️ توجه: لطفاً قبل از هرگونه معامله، مدارک ملک را به دقت بررسی کنید و از مشاور حقوقی کمک بگیرید</p>
                </div>
              </div>
            )}

            {activeTab === 'nearby' && (
              <div className="nearby-tab">
                <h3>امکانات اطراف ملک در منطقه {property.regionName}</h3>
                <div className="nearby-list">
                  {property.nearby.map((item, index) => (
                    <div key={index} className="nearby-item">
                      <span className="nearby-name">{item.name}</span>
                      <span className="nearby-distance">{item.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ===== اطلاعات مشاور املاک ===== */}
          <div className="agent-card" itemScope itemType="https://schema.org/RealEstateAgent">
            <div className="agent-header">
              <img 
                src={property.agent.image} 
                alt={property.agent.name} 
                className="agent-avatar"
                loading="lazy"
                width="64"
                height="64"
              />
              <div className="agent-info">
                <h3 className="agent-name" itemProp="name">{property.agent.name}</h3>
                <p className="agent-address" itemProp="address">{property.agent.address}</p>
                <div className="agent-rating" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                  <FaStar className="rating-star" aria-hidden="true" />
                  <span itemProp="ratingValue">{property.agent.rating}</span>
                  <span className="rating-count" itemProp="reviewCount">({property.agent.deals} معامله موفق)</span>
                </div>
              </div>
            </div>
            
            <div className="agent-actions">
              <button className="agent-action-btn phone" onClick={handleCopyPhone} aria-label="کپی شماره تماس">
                <FaPhone aria-hidden="true" />
                {copied ? 'کپی شد!' : 'کپی شماره'}
              </button>
              <a 
                href={`https://wa.me/${property.agent.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer nofollow"
                className="agent-action-btn whatsapp"
                aria-label="ارسال پیام در واتساپ"
              >
                <FaWhatsapp aria-hidden="true" />
                واتساپ
              </a>
            </div>
          </div>
        </div>

        {/* ===== نوتیفیکیشن ===== */}
        {copied && (
          <div className="toast-notification" role="status" aria-live="polite">
            <FaCheckCircle aria-hidden="true" />
            لینک با موفقیت کپی شد
          </div>
        )}
      </div>
    </>
  );
});

RealEstateDetailPageItem.displayName = 'RealEstateDetailPageItem';

export default RealEstateDetailPageItem;