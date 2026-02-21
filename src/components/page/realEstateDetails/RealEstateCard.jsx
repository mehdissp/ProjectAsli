// // // RealEstateCard.jsx
// // import React from 'react';
// // import './RealEstateCard.css';

// // const RealEstateCard = ({ property }) => {
// //   const {
// //     title,
// //     additionalInformation,
// //     regionName,
// //     parentName,
// //     constructionYear,
// //     countFloor,
// //     isHasElevator,
// //     isHasParking,
// //     isHasPool,
// //     isHasStoreRoom,
// //     imageCount
// //   } = property;

// //   // محاسبه سن ملک
// //   const currentYear = new Date().getFullYear();
// //   const persianYear = currentYear - 621; // تبدیل به سال شمسی
// //   const age = persianYear - constructionYear;

// //   const getAmenityIcon = (amenity) => {
// //     const icons = {
// //       elevator: '🛗',
// //       parking: '🅿️',
// //       pool: '🏊',
// //       storeRoom: '📦'
// //     };
// //     return icons[amenity] || '';
// //   };

// //   const amenities = [];
// //   if (isHasElevator) amenities.push({ name: 'آسانسور', icon: getAmenityIcon('elevator') });
// //   if (isHasParking) amenities.push({ name: 'پارکینگ', icon: getAmenityIcon('parking') });
// //   if (isHasPool) amenities.push({ name: 'استخر', icon: getAmenityIcon('pool') });
// //   if (isHasStoreRoom) amenities.push({ name: 'انباری', icon: getAmenityIcon('storeRoom') });

// //   const formatPrice = (price) => {
// //     if (!price) return 'تماس بگیرید';
// //     return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
// //   };

// //   return (
// //     <div className="real-estate-card">
// //       <div className="card-image">
// //         <div className="image-placeholder">
// //           {imageCount > 0 ? (
// //             <span>{imageCount} عکس</span>
// //           ) : (
// //             <span>بدون عکس</span>
// //           )}
// //         </div>
// //         {age >= 0 && age <= 5 && (
// //           <span className="badge new-badge">نوساز</span>
// //         )}
// //       </div>

// //       <div className="card-content">
// //         <h3 className="property-title">{title}</h3>
        
// //         <div className="property-location">
// //           <span className="location-icon">📍</span>
// //           <span className="location-text">
// //             {regionName}
// //             {parentName && `, ${parentName}`}
// //           </span>
// //         </div>

// //         <div className="property-details">
// //           <div className="detail-item">
// //             <span className="detail-icon">📏</span>
// //             <span>{additionalInformation}</span>
// //           </div>
          
// //           <div className="detail-item">
// //             <span className="detail-icon">🏗️</span>
// //             <span>ساخت {constructionYear}</span>
// //             {age > 0 && (
// //               <span className="age-badge">
// //                 ({age} سال)
// //               </span>
// //             )}
// //           </div>

// //           {countFloor > 0 && (
// //             <div className="detail-item">
// //               <span className="detail-icon">🏢</span>
// //               <span>{countFloor} طبقه</span>
// //             </div>
// //           )}
// //         </div>

// //         {amenities.length > 0 && (
// //           <div className="amenities-list">
// //             {amenities.map((amenity, index) => (
// //               <span key={index} className="amenity-tag" title={amenity.name}>
// //                 {amenity.icon}
// //               </span>
// //             ))}
// //           </div>
// //         )}

// //         <div className="card-footer">
// //           <span className="price">قیمت: تماس بگیرید</span>
// //           <button className="contact-button">تماس</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RealEstateCard;

// // RealEstateCard.jsx

// import React from 'react';
// import ImageSlider from './ImageSlider';

// const RealEstateCard = ({ property }) => {
//     console.log(property,'*****************************************************************************')
//   // اگه property تعریف نشده بود، چیزی نشون نده
//   if (!property) return null;

//   // محاسبه سن ملک
//   const currentYear = new Date().getFullYear() - 621;
//   const age = currentYear - property.constructionYear;

//   // ساخت برچسب سن
//   const getAgeBadge = () => {
//     if (age <= 2) return { text: 'نوساز', color: '#4caf50' };
//     // if (age <= 5) return { text: 'ممتاز', color: '#2196f3' };
//     // if (age >= 30) return { text: 'قدیمی', color: '#ff9800' };
//     return null;
//   };

//   const ageBadge = getAgeBadge();

//   // آماده‌سازی عکس‌ها برای اسلایدر
//   const getPropertyImages = () => {
//     console.log(property.imageUrl ,"1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
//     // اگه property عکس داشت از اون استفاده کن
//     if (property.imageUrl && property.imageUrl.length > 0) {
//       return property.imageUrl;
//     }
    
//     // در غیر این صورت عکس پیش‌فرض بر اساس id
//     const defaultImages = {
//       11: ['https://img.varzesh3.com/Images/Uploaded/640/2024/07/15/95868178-c6b9-48a9-a5b1-60f95711d21d.jpg'],
//       6: ['https://img.varzesh3.com/Images/Uploaded/640/2024/07/15/5bb89062-47ee-4b78-a4c2-64fa8eb4430a.jpg'],
//       4: ['https://img.varzesh3.com/Images/Uploaded/640/2024/07/15/91f53a77-70a6-469b-9eea-03c65829d7c0.jpg'],
//       3: ['https://img.varzesh3.com/Images/Uploaded/640/2024/07/15/53fcd788-08c4-44b6-9d53-37e30232b8bc.jpg']
//     };
    
//     return defaultImages[property.id] || ['https://img.varzesh3.com/Images/Uploaded/640/2024/07/15/95868178-c6b9-48a9-a5b1-60f95711d21d.jpg'];
//   };

//   const cardStyle = {
//     backgroundColor: 'white',
//     borderRadius: '10px',
//     overflow: 'hidden',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//     transition: 'transform 0.2s, boxShadow 0.2s',
//     cursor: 'pointer',
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     position: 'relative'
//   };

//   return (
//     <div 
//       style={cardStyle}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = 'translateY(-4px)';
//         e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = 'translateY(0)';
//         e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
//       }}
//     >
//       {/* برچسب سن */}
//       {ageBadge && (
//         <div style={{
//           position: 'absolute',
//           top: '10px',
//           right: '10px',
//           backgroundColor: ageBadge.color,
//           color: 'white',
//           padding: '4px 10px',
//           borderRadius: '20px',
//           fontSize: '11px',
//           fontWeight: 'bold',
//           zIndex: 10,
//           boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
//         }}>
//           {ageBadge.text}
//         </div>
//       )}

//       {/* تعداد عکس‌ها */}

      
//       {/* اسلایدر عکس */}
// <div style={{ position: 'relative' }}>
//   <ImageSlider images={getPropertyImages()} hotelName={property.title || ''} />
  
//   {/* تعداد عکس‌ها - حالا روی عکس */}
//   {property.imageCount > 0 && (
//     <div style={{
//       position: 'absolute',
//       bottom: '10px',
//       left: '10px',
//       backgroundColor: 'rgba(0,0,0,0.6)',
//       color: 'white',
//       padding: '4px 8px',
//       borderRadius: '16px',
//       fontSize: '11px',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '4px',
//       zIndex: 10,
//       backdropFilter: 'blur(2px)'
//     }}>
//       <span>📸</span>
//       <span>{property.imageCount}</span>
//     </div>
//   )}
// </div>
      
//       <div style={{ padding: '12px', flex: 1 }}>
//         {/* عنوان ملک */}
//         <h3 style={{
//           fontSize: '16px',
//           fontWeight: 'bold',
//           marginBottom: '5px',
//           color: '#2c3e50',
//           whiteSpace: 'nowrap',
//           overflow: 'hidden',
//           textOverflow: 'ellipsis'
//         }}>
//           {property.title || 'بدون نام'}
//         </h3>
        
//         {/* موقعیت */}
//         <p style={{
//           fontSize: '12px',
//           color: '#7f8c8d',
//           marginBottom: '8px',
//           whiteSpace: 'nowrap',
//           overflow: 'hidden',
//           textOverflow: 'ellipsis'
//         }}>
//           📍 {property.regionName || 'نامشخص'}
//           {property.parentName && `, ${property.parentName}`}
//         </p>
        
//         {/* مشخصات */}
//         <div style={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           gap: '8px',
//           marginBottom: '10px',
//           backgroundColor: '#f8f9fa',
//           padding: '8px',
//           borderRadius: '8px'
//         }}>
//           {/* متراژ */}
//           <span style={{
//             fontSize: '11px',
//             color: '#34495e',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '3px'
//           }}>
//             📏 {property.additionalInformation || 'نامشخص'}
//           </span>
          
//           {/* سال ساخت */}
//           <span style={{
//             fontSize: '11px',
//             color: '#34495e',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '3px'
//           }}>
//             🏗️ {property.constructionYear || '---'}
//           </span>
          
//           {/* طبقات */}
//           {property.countFloor > 0 && (
//             <span style={{
//               fontSize: '11px',
//               color: '#34495e',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '3px'
//             }}>
//               🏢 {property.countFloor} طبقه
//             </span>
//           )}
//         </div>
        
//         {/* امکانات */}
//         <div style={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           gap: '4px',
//           marginBottom: '12px'
//         }}>
//           {property.isHasElevator && (
//             <span style={{
//               backgroundColor: '#ecf0f1',
//               padding: '2px 8px',
//               borderRadius: '12px',
//               fontSize: '10px',
//               color: '#34495e',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '2px'
//             }}>
//               🛗 آسانسور
//             </span>
//           )}
//           {property.isHasParking && (
//             <span style={{
//               backgroundColor: '#ecf0f1',
//               padding: '2px 8px',
//               borderRadius: '12px',
//               fontSize: '10px',
//               color: '#34495e',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '2px'
//             }}>
//               🅿️ پارکینگ
//             </span>
//           )}
//           {property.isHasPool && (
//             <span style={{
//               backgroundColor: '#ecf0f1',
//               padding: '2px 8px',
//               borderRadius: '12px',
//               fontSize: '10px',
//               color: '#34495e',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '2px'
//             }}>
//               🏊 استخر
//             </span>
//           )}
//           {property.isHasStoreRoom && (
//             <span style={{
//               backgroundColor: '#ecf0f1',
//               padding: '2px 8px',
//               borderRadius: '12px',
//               fontSize: '10px',
//               color: '#34495e',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '2px'
//             }}>
//               📦 انباری
//             </span>
//           )}
          
//           {/* اگه امکانات زیاد بود */}
//           {[property.isHasElevator, property.isHasParking, property.isHasPool, property.isHasStoreRoom].filter(Boolean).length > 3 && (
//             <span style={{
//               backgroundColor: '#ecf0f1',
//               padding: '2px 8px',
//               borderRadius: '12px',
//               fontSize: '10px',
//               color: '#34495e'
//             }}>
//               +{[property.isHasElevator, property.isHasParking, property.isHasPool, property.isHasStoreRoom].filter(Boolean).length - 3}
//             </span>
//           )}
//         </div>
        
//         {/* قیمت و دکمه تماس */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           borderTop: '1px solid #ecf0f1',
//           paddingTop: '10px',
//           marginTop: 'auto'
//         }}>
//        <div>
//   <span style={{
//     fontSize: '10px',
//     color: '#95a5a6',
//     display: 'block'
//   }}>
//     قیمت
//   </span>
//   <span style={{
//     fontSize: '14px',
//     fontWeight: 'bold',
//     color: '#3498db' // آبی شد
//   }}>
//     {property.price ? new Intl.NumberFormat('fa-IR').format(property.price) : 'تماس بگیرید'}
//   </span>
// </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default RealEstateCard;
// RealEstateCard.jsx
import React from 'react';
import ImageSlider from './ImageSlider';

// ایمپورت FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faElevator, 
  faParking, 
  faSwimmingPool, 
  faBoxes, 
  faLocationDot,
  faRuler,
  faBuilding,
  faCalendar,
  faCamera,
  faPhone,
  faTag,
  faStar as fasStar
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

// اضافه کردن آیکون‌ها به کتابخانه
library.add(faElevator, faParking, faSwimmingPool, faBoxes, faLocationDot, faRuler, faBuilding, faCalendar, faCamera, faPhone, faTag, fasStar, farStar);

const RealEstateCard = ({ property }) => {
  console.log(property, '*****************************************************************************');
  
  if (!property) return null;

  // محاسبه سن ملک با اعتبارسنجی
  const currentYear = new Date().getFullYear() - 621;
  const age = property.constructionYear ? currentYear - property.constructionYear : null;

  // ساخت برچسب سن با میکرو‌داده برای SEO
  const getAgeBadge = () => {
    if (!age || age < 0) return null;
    if (age <= 2) return { text: 'نوساز', color: '#4caf50', schema: 'new' };
    // if (age <= 5) return { text: 'ممتاز', color: '#2196f3', schema: 'good' };
    // if (age >= 30) return { text: 'قدیمی', color: '#ff9800', schema: 'old' };
    return null;
  };

  const ageBadge = getAgeBadge();

  // فرمت قیمت با میکرو‌داده
  const formatPrice = (price) => {
    if (!price) return null;
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  // آماده‌سازی عکس‌ها
  const getPropertyImages = () => {
    if (property.imageUrl && Array.isArray(property.imageUrl) && property.imageUrl.length > 0) {
      return property.imageUrl;
    }
    if (property.imageUrl && typeof property.imageUrl === 'string') {
      return [property.imageUrl];
    }
    if (property.images && Array.isArray(property.images) && property.images.length > 0) {
      return property.images;
    }
    return ['https://via.placeholder.com/400x300?text=ملک+مسکونی'];
  };

  // ساختار میکرو‌داده برای SEO
  const seoMicrodata = {
    itemType: "https://schema.org/Product",
    itemScope: true,
    itemProp: "itemListElement"
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    border: '1px solid rgba(0,0,0,0.05)'
  };

  return (
    <article 
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
      }}
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* میکرو‌داده‌های مخفی برای SEO */}
      <meta itemProp="name" content={property.title} />
      <meta itemProp="description" content={`${property.additionalInformation} متری در ${property.regionName}`} />
      {property.price && <meta itemProp="offers" content={property.price.toString()} />}

      {/* برچسب سن با آیکون */}
      {ageBadge && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: ageBadge.color,
          color: 'white',
          padding: '6px 12px',
          borderRadius: '30px',
          fontSize: '12px',
          fontWeight: '600',
          zIndex: 10,
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <FontAwesomeIcon icon={fasStar} size="sm" />
          <span>{ageBadge.text}</span>
        </div>
      )}

      {/* بخش عکس */}
  {/* اسلایدر عکس با ارسال propertyId */}
<div style={{ position: 'relative' }}>
  <ImageSlider 
    images={getPropertyImages()} 
    hotelName={property.title || ''}
    propertyId={property.id}
  />
  
  {/* تعداد عکس‌ها با آیکون FontAwesome */}
  {property.imageCount > 0 && (
    <div style={{
      position: 'absolute',
      bottom: '12px',
      left: '12px',
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: 'white',
      padding: '6px 12px',
      borderRadius: '30px',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      zIndex: 10,
      backdropFilter: 'blur(4px)',
      border: '1px solid rgba(255,255,255,0.2)',
      fontWeight: '500',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    }}>
      <FontAwesomeIcon icon={faCamera} size="sm" />
      <span>{property.imageCount}</span>
    </div>
  )}
</div>

      {/* محتوای کارت */}
      <div style={{ padding: '16px', flex: 1 }}>
        {/* عنوان ملک با لینک */}
        <h3 style={{
          fontSize: '16px',
          fontWeight: '700',
          marginBottom: '8px',
          color: '#1a2634',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          height: '44px'
        }}>
          <a href={`/property/${property.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {property.title || 'ملک مسکونی'}
          </a>
        </h3>
        
        {/* موقعیت با آیکون لوکیشن */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '12px',
          color: '#5d6d7e',
          fontSize: '13px'
        }}>
          <FontAwesomeIcon icon={faLocationDot} size="sm" color="#3498db" />
          <span style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {property.regionName || 'منطقه نامشخص'}
            {property.parentName && `, ${property.parentName}`}
          </span>
        </div>
        
        {/* مشخصات با آیکون‌های رنگی */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginBottom: '16px',
          backgroundColor: '#f8fafc',
          padding: '12px',
          borderRadius: '12px',
          border: '1px solid #e9ecef'
        }}>
          {/* متراژ */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: '#2c3e50'
          }}>
            <FontAwesomeIcon icon={faRuler} color="#3498db" />
            <span>{property.additionalInformation || '---'}</span>
          </div>
          
          {/* سال ساخت */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: '#2c3e50'
          }}>
            <FontAwesomeIcon icon={faCalendar} color="#e67e22" />
            <span>{property.constructionYear || '---'}</span>
          </div>
          
          {/* طبقات */}
          {property.countFloor > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: '#2c3e50'
            }}>
              <FontAwesomeIcon icon={faBuilding} color="#27ae60" />
              <span>{property.countFloor}</span>
            </div>
          )}
        </div>
        
        {/* امکانات با آیکون‌های FontAwesome */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '16px'
        }}>
          {property.isHasElevator && (
            <span style={{
              backgroundColor: '#e8f0fe',
              padding: '4px 10px',
              borderRadius: '30px',
              fontSize: '12px',
              color: '#2c3e50',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid #cbd5e0'
            }}>
              <FontAwesomeIcon icon={faElevator} color="#7f8c8d" size="sm" />
              <span>آسانسور</span>
            </span>
          )}
          {property.isHasParking && (
            <span style={{
              backgroundColor: '#e8f0fe',
              padding: '4px 10px',
              borderRadius: '30px',
              fontSize: '12px',
              color: '#2c3e50',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid #cbd5e0'
            }}>
              <FontAwesomeIcon icon={faParking} color="#7f8c8d" size="sm" />
              <span>پارکینگ</span>
            </span>
          )}
          {property.isHasPool && (
            <span style={{
              backgroundColor: '#e8f0fe',
              padding: '4px 10px',
              borderRadius: '30px',
              fontSize: '12px',
              color: '#2c3e50',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid #cbd5e0'
            }}>
              <FontAwesomeIcon icon={faSwimmingPool} color="#7f8c8d" size="sm" />
              <span>استخر</span>
            </span>
          )}
          {property.isHasStoreRoom && (
            <span style={{
              backgroundColor: '#e8f0fe',
              padding: '4px 10px',
              borderRadius: '30px',
              fontSize: '12px',
              color: '#2c3e50',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid #cbd5e0'
            }}>
              <FontAwesomeIcon icon={faBoxes} color="#7f8c8d" size="sm" />
              <span>انباری</span>
            </span>
          )}
        </div>
        
        {/* قیمت و دکمه تماس - طراحی شده‌تر */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #edf2f7',
          paddingTop: '16px',
          marginTop: '8px'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '4px'
            }}>
              <FontAwesomeIcon icon={faTag} size="sm" color="#95a5a6" />
              <span style={{
                fontSize: '12px',
                color: '#7f8c8d',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                قیمت
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '4px'
            }}>
              <span style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#3498db'
              }}>
                {property.price ? formatPrice(property.price) : 'تماس بگیرید'}
              </span>
              {property.price && (
                <span style={{
                  fontSize: '11px',
                  color: '#95a5a6',
                  fontWeight: '400'
                }}>
                  تومان
                </span>
              )}
            </div>
          </div>
          
     
        </div>
      </div>
    </article>
  );
};

export default RealEstateCard;