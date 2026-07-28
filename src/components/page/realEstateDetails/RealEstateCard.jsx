
// // // // // export default RealEstateCard;
// // // // import React, { useState } from 'react';
// // // // import ImageSlider from './ImageSlider';
// // // // import { useNavigate } from 'react-router-dom';
// // // // // ایمپورت FontAwesome
// // // // import { library } from '@fortawesome/fontawesome-svg-core';
// // // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // // import { 
// // // //   faElevator, 
// // // //   faParking, 
// // // //   faSwimmingPool, 
// // // //   faBoxes, 
// // // //   faLocationDot,
// // // //   faRuler,
// // // //   faBuilding,
// // // //   faCalendar,
// // // //   faCamera,
// // // //   faTag,
// // // //   faBookmark as fasBookmark,
// // // //   faStar as fasStar
// // // // } from '@fortawesome/free-solid-svg-icons';
// // // // import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';

// // // // library.add(faElevator, faParking, faSwimmingPool, faBoxes, faLocationDot, faRuler, faBuilding, faCalendar, faCamera, faTag, fasStar, fasBookmark, farBookmark);

// // // // const RealEstateCard = ({ property }) => {
// // // //     const navigate = useNavigate();
// // // //   const [isBookmarked, setIsBookmarked] = useState(false);

// // // //   if (!property) return null;

// // // //   const currentYear = new Date().getFullYear() - 621;
// // // //   const age = property.constructionYear ? currentYear - property.constructionYear : null;

// // // //   const getAgeBadge = () => {
// // // //     if (!age || age < 0) return null;
// // // //     return null;
// // // //   };

// // // //   const ageBadge = getAgeBadge();

// // // //   const formatPrice = (price) => {
// // // //     if (!price) return null;
// // // //     return new Intl.NumberFormat('fa-IR').format(price);
// // // //   };

// // // //   const getPropertyImages = () => {
// // // //     if (property.imageUrl && Array.isArray(property.imageUrl) && property.imageUrl.length > 0) {
// // // //       return property.imageUrl;
// // // //     }
// // // //     if (property.imageUrl && typeof property.imageUrl === 'string') {
// // // //       return [property.imageUrl];
// // // //     }
// // // //     if (property.images && Array.isArray(property.images) && property.images.length > 0) {
// // // //       return property.images;
// // // //     }
// // // //     return ['https://via.placeholder.com/400x300?text=ملک+مسکونی'];
// // // //   };

// // // //   const toggleBookmark = (e) => {
// // // //     e.stopPropagation();
// // // //     setIsBookmarked(!isBookmarked);
// // // //   };

// // // //   const cardStyle = {
// // // //     backgroundColor: 'white',
// // // //     borderRadius: '16px',
// // // //     overflow: 'hidden',
// // // //     boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
// // // //     transition: 'all 0.3s ease',
// // // //     cursor: 'pointer',
// // // //     height: '100%',
// // // //     display: 'flex',
// // // //     flexDirection: 'column',
// // // //     position: 'relative',
// // // //     border: '1px solid #e9ecef'
// // // //   };
// // // //   // ساخت اسلاگ (slug) از عنوان ملک
// // // // const getPropertyLink = () => {
// // // //   // ساخت slug از عنوان ملک
// // // //   const createSlug = (title) => {
// // // //     if (!title) return '';
// // // //     return title
// // // //       .replace(/[^\w\s\u0600-\u06FF]/g, '') // حذف علائم (پشتیبانی از فارسی)
// // // //       .replace(/\s+/g, '-')
// // // //       .substring(0, 50);
// // // //   };
  
// // // //   const slug = createSlug(property.title);
  
// // // //   // اولویت با آدرس جدید سئو شده (اگر روتر اضافه شده باشد)
// // // //   // در غیر این صورت آدرس قبلی کار می‌کند
// // // //   return `/property/${property.id}/${slug}`;
// // // // };
// // // // console.log('******************************************************************')

// // // //   return (
// // // //     <article 
// // // //       style={cardStyle}
// // // //       // onClick={() => navigate(`/realEstateDetailPageItem?id=${property.id}`)}
// // // //       onClick={() => navigate(getPropertyLink())}
// // // //       onMouseEnter={(e) => {
// // // //         e.currentTarget.style.transform = 'translateY(-5px)';
// // // //         e.currentTarget.style.boxShadow = '0 12px 24px rgba(125, 0, 0, 0.12)';
// // // //         e.currentTarget.style.borderColor = '#7d0000';
// // // //       }}
// // // //       onMouseLeave={(e) => {
// // // //         e.currentTarget.style.transform = 'translateY(0)';
// // // //         e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
// // // //         e.currentTarget.style.borderColor = '#e9ecef';
// // // //       }}
// // // //     >
// // // //       {/* میکرو‌داده‌های مخفی برای SEO */}
// // // //       <meta itemProp="name" content={property.title} />
// // // //       <meta itemProp="description" content={`${property.additionalInformation} متری در ${property.regionName}`} />
// // // //       {property.price && <meta itemProp="offers" content={property.price.toString()} />}

// // // //       {/* میکرو‌دیتای اصلی محصول */}
// // // //       <meta itemProp="name" content={property.title} />
// // // //       <meta itemProp="description" content={`${property.additionalInformation} متری در ${property.regionName}${property.constructionYear ? ' - ساخت ' + property.constructionYear : ''}`} />
// // // //       <meta itemProp="sku" content={property.id} />
// // // //       <meta itemProp="brand" content="املاک مستربلیط" />
// // // //       <meta itemProp="category" content="آپارتمان فروشی" />
      
// // // //       {/* تصویر محصول */}
// // // //       {property.imageUrl && property.imageUrl[0] && (
// // // //         <meta itemProp="image" content={property.imageUrl[0]} />
// // // //       )}
      
// // // //       {/* آدرس کامل */}
// // // //       <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
// // // //         <meta itemProp="addressLocality" content={property.regionName || ''} />
// // // //         <meta itemProp="addressRegion" content={property.parentName || ''} />
// // // //         <meta itemProp="addressCountry" content="IR" />
// // // //       </div>

// // // //       {/* قیمت و اطلاعات مالی */}
// // // //       {property.price && (
// // // //         <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
// // // //           <meta itemProp="price" content={property.price.toString()} />
// // // //           <meta itemProp="priceCurrency" content="IRR" />
// // // //           <meta itemProp="availability" content="https://schema.org/InStock" />
// // // //           <meta itemProp="priceValidUntil" content={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]} />
// // // //         </div>
// // // //       )}

// // // //       {/* ویژگی‌های ملک */}
// // // //       <div itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
// // // //         <meta itemProp="name" content="متراژ" />
// // // //         <meta itemProp="value" content={property.additionalInformation || ''} />
// // // //       </div>
      
// // // //       <div itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
// // // //         <meta itemProp="name" content="سال ساخت" />
// // // //         <meta itemProp="value" content={property.constructionYear || ''} />
// // // //       </div>
      
// // // //       {property.countFloor > 0 && (
// // // //         <div itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
// // // //           <meta itemProp="name" content="تعداد طبقات" />
// // // //           <meta itemProp="value" content={property.countFloor.toString()} />
// // // //         </div>
// // // //       )}

// // // //       {/* امکانات */}
// // // //       {property.isHasElevator && (
// // // //         <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
// // // //           <meta itemProp="name" content="آسانسور" />
// // // //           <meta itemProp="value" content="true" />
// // // //         </div>
// // // //       )}
      
// // // //       {property.isHasParking && (
// // // //         <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
// // // //           <meta itemProp="name" content="پارکینگ" />
// // // //           <meta itemProp="value" content="true" />
// // // //         </div>
// // // //       )}
      
// // // //       {property.isHasPool && (
// // // //         <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
// // // //           <meta itemProp="name" content="استخر" />
// // // //           <meta itemProp="value" content="true" />
// // // //         </div>
// // // //       )}
      
// // // //       {property.isHasStoreRoom && (
// // // //         <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
// // // //           <meta itemProp="name" content="انباری" />
// // // //           <meta itemProp="value" content="true" />
// // // //         </div>
// // // //       )}

// // // //       {/* Open Graph tags برای شبکه‌های اجتماعی */}
// // // //       <meta property="og:type" content="product" />
// // // //       <meta property="og:title" content={property.title} />
// // // //       <meta property="og:description" content={`${property.additionalInformation} متری در ${property.regionName}`} />
// // // //       {property.imageUrl && property.imageUrl[0] && (
// // // //         <meta property="og:image" content={property.imageUrl[0]} />
// // // //       )}
// // // //       <meta property="og:url" content={`https://yourdomain.com/property/${property.id}`} />
// // // //       <meta property="og:locale" content="fa_IR" />
      
// // // //       {/* Twitter Card tags */}
// // // //       <meta name="twitter:card" content="summary_large_image" />
// // // //       <meta name="twitter:title" content={property.title} />
// // // //       <meta name="twitter:description" content={`${property.additionalInformation} متری در ${property.regionName}`} />
// // // //       {property.imageUrl && property.imageUrl[0] && (
// // // //         <meta name="twitter:image" content={property.imageUrl[0]} />
// // // //       )}

// // // //       {/* برچسب سن */}
// // // //       {ageBadge && (
// // // //         <div style={{
// // // //           position: 'absolute',
// // // //           top: '10px',
// // // //           right: '10px',
// // // //           backgroundColor: '#10b981',
// // // //           color: 'white',
// // // //           padding: '4px 8px',
// // // //           borderRadius: '20px',
// // // //           fontSize: '11px',
// // // //           fontWeight: '600',
// // // //           zIndex: 20,
// // // //           display: 'flex',
// // // //           alignItems: 'center',
// // // //           gap: '4px',
// // // //           boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
// // // //         }}>
// // // //           <FontAwesomeIcon icon={fasStar} size="xs" />
// // // //           <span>{ageBadge.text}</span>
// // // //         </div>
// // // //       )}

// // // //       {/* آیکون بوکمارک روی عکس */}
// // // //       <div style={{
// // // //         position: 'absolute',
// // // //         top: '10px',
// // // //         left: '10px',
// // // //         zIndex: 20,
// // // //         cursor: 'pointer',
// // // //         backgroundColor: 'white',
// // // //         width: '32px',
// // // //         height: '32px',
// // // //         borderRadius: '50%',
// // // //         display: 'flex',
// // // //         alignItems: 'center',
// // // //         justifyContent: 'center',
// // // //         boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
// // // //         transition: 'all 0.2s ease'
// // // //       }}
// // // //       onClick={toggleBookmark}
// // // //       onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
// // // //       onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
// // // //         <FontAwesomeIcon 
// // // //           icon={isBookmarked ? fasBookmark : farBookmark} 
// // // //           color={isBookmarked ? '#7d0000' : '#94a3b8'}
// // // //           size="sm"
// // // //         />
// // // //       </div>

// // // //       {/* بخش عکس با افکت زوم */}
// // // //       <div style={{ 
// // // //         position: 'relative', 
// // // //         overflow: 'hidden',
// // // //         height: '200px'
// // // //       }}>
// // // //         <div style={{ 
// // // //           position: 'relative', 
// // // //           overflow: 'hidden',
// // // //           height: '200px'
// // // //         }}>
// // // //           <div style={{
// // // //             transition: 'transform 0.6s cubic-bezier(0.25, 0.45, 0.45, 0.95)',
// // // //             height: '100%',
// // // //             width: '100%',
// // // //             transformOrigin: 'center center'
// // // //           }}
// // // //           onMouseEnter={(e) => {
// // // //             e.currentTarget.style.transform = 'scale(1.1)';
// // // //           }}
// // // //           onMouseLeave={(e) => {
// // // //             e.currentTarget.style.transform = 'scale(1)';
// // // //           }}>
// // // //             <ImageSlider 
// // // //               images={getPropertyImages()} 
// // // //               hotelName={property.title || ''}
// // // //               propertyId={property.id}
// // // //               alt={`${property.title || 'ملک'} - ${property.additionalInformation || ''} متری - ${property.regionName || ''}`}
// // // //             />
// // // //           </div>
// // // //         </div>
        
// // // //         {/* تعداد عکس‌ها */}
// // // //         {property.imageCount > 0 && (
// // // //           <div style={{
// // // //             position: 'absolute',
// // // //             bottom: '8px',
// // // //             left: '8px',
// // // //             backgroundColor: 'rgba(0,0,0,0.6)',
// // // //             color: 'white',
// // // //             padding: '3px 8px',
// // // //             borderRadius: '20px',
// // // //             fontSize: '10px',
// // // //             display: 'flex',
// // // //             alignItems: 'center',
// // // //             gap: '4px',
// // // //             zIndex: 15,
// // // //             backdropFilter: 'blur(2px)'
// // // //           }}>
// // // //             <FontAwesomeIcon icon={faCamera} size="xs" />
// // // //             <span>{property.imageCount}</span>
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {/* محتوای کارت */}
// // // //       <div style={{ padding: '12px 14px 14px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
// // // //         {/* عنوان */}
// // // //         <h3 style={{
// // // //           fontSize: '15px',
// // // //           fontWeight: '700',
// // // //           margin: 0,
// // // //           color: '#1e293b',
// // // //           overflow: 'hidden',
// // // //           textOverflow: 'ellipsis',
// // // //           whiteSpace: 'nowrap'
// // // //         }}>
// // // //           {property.title || 'ملک مسکونی'}
// // // //         </h3>
        
// // // //         {/* تاریخ ایجاد - زیر عنوان */}
// // // //         {property.createdAtPersianRelative && (
// // // //           <div style={{
// // // //             display: 'flex',
// // // //             alignItems: 'center',
// // // //             gap: '4px',
// // // //             fontSize: '10px',
// // // //             color: '#94a3b8',
// // // //             marginTop: '2px'
// // // //           }}>
// // // //             <span>🕒</span>
// // // //             <span>{property.createdAtPersianRelative}</span>
// // // //           </div>
// // // //         )}
        
// // // //         {/* موقعیت */}
// // // //         <div style={{
// // // //           display: 'flex',
// // // //           alignItems: 'center',
// // // //           gap: '4px',
// // // //           color: '#64748b',
// // // //           fontSize: '12px',
// // // //           marginBottom: '2px'
// // // //         }}>
// // // //           <FontAwesomeIcon icon={faLocationDot} size="xs" color="#7d0000" />
// // // //           <span style={{
// // // //             whiteSpace: 'nowrap',
// // // //             overflow: 'hidden',
// // // //             textOverflow: 'ellipsis'
// // // //           }}>
// // // //             {property.regionName || 'منطقه نامشخص'}
// // // //             {property.parentName && `, ${property.parentName}`}
// // // //           </span>
// // // //         </div>
        
// // // //         {/* مشخصات */}
// // // //         <div style={{
// // // //           display: 'grid',
// // // //           gridTemplateColumns: 'repeat(3, 1fr)',
// // // //           gap: '4px',
// // // //           backgroundColor: '#f8fafc',
// // // //           padding: '8px 6px',
// // // //           borderRadius: '8px',
// // // //           border: '1px solid #eef2f6',
// // // //           marginBottom: '2px'
// // // //         }}>
// // // //           <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#1e293b' }}>
// // // //             <FontAwesomeIcon icon={faRuler} color="#7d0000" size="xs" />
// // // //             <span>{property.additionalInformation || '---'}</span>
// // // //           </div>
          
// // // //           <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#1e293b' }}>
// // // //             <FontAwesomeIcon icon={faCalendar} color="#7d0000" size="xs" />
// // // //             <span>{property.constructionYear || '---'}</span>
// // // //           </div>
          
// // // //           {property.countFloor > 0 && (
// // // //             <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#1e293b' }}>
// // // //               <FontAwesomeIcon icon={faBuilding} color="#7d0000" size="xs" />
// // // //               <span>{property.countFloor}</span>
// // // //             </div>
// // // //           )}
// // // //         </div>
        
// // // //         {/* امکانات */}
// // // //         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '2px' }}>
// // // //           {property.isHasElevator && (
// // // //             <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
// // // //               <FontAwesomeIcon icon={faElevator} color="#7d0000" size="xs" />
// // // //               <span>آسانسور</span>
// // // //             </span>
// // // //           )}
// // // //           {property.isHasParking && (
// // // //             <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
// // // //               <FontAwesomeIcon icon={faParking} color="#7d0000" size="xs" />
// // // //               <span>پارکینگ</span>
// // // //             </span>
// // // //           )}
// // // //           {property.isHasPool && (
// // // //             <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
// // // //               <FontAwesomeIcon icon={faSwimmingPool} color="#7d0000" size="xs" />
// // // //               <span>استخر</span>
// // // //             </span>
// // // //           )}
// // // //           {property.isHasStoreRoom && (
// // // //             <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
// // // //               <FontAwesomeIcon icon={faBoxes} color="#7d0000" size="xs" />
// // // //               <span>انباری</span>
// // // //             </span>
// // // //           )}
// // // //         </div>
        
// // // //         {/* قیمت */}
// // // //         <div style={{
// // // //           display: 'flex',
// // // //           justifyContent: 'space-between',
// // // //           alignItems: 'center',
// // // //           borderTop: '1px solid #eef2f6',
// // // //           paddingTop: '10px',
// // // //           marginTop: '4px'
// // // //         }}>
// // // //           <div>
// // // //             <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
// // // //               <FontAwesomeIcon icon={faTag} size="xs" color="#94a3b8" />
// // // //               <span style={{ fontSize: '10px', color: '#64748b' }}>قیمت</span>
// // // //             </div>
// // // //             <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px', flexWrap: 'wrap' }}>
// // // //               <span style={{ fontSize: '16px', fontWeight: '800', color: '#7d0000' }}>
// // // //                 {property.price ? formatPrice(property.price) : 'تماس بگیرید'}
// // // //               </span>
// // // //               {property.price && (
// // // //                 <span style={{ fontSize: '9px', color: '#94a3b8' }}>تومان</span>
// // // //               )}
// // // //             </div>
// // // //           </div>
          
// // // //           <button style={{
// // // //             backgroundColor: '#7d0000',
// // // //             color: 'white',
// // // //             border: 'none',
// // // //             borderRadius: '30px',
// // // //             padding: '7px 16px',
// // // //             fontSize: '11px',
// // // //             fontWeight: '600',
// // // //             cursor: 'pointer',
// // // //             transition: 'all 0.3s ease',
// // // //             display: 'flex',
// // // //             alignItems: 'center',
// // // //             gap: '4px'
// // // //           }}
// // // //           onMouseEnter={(e) => {
// // // //             e.target.style.backgroundColor = '#a30000';
// // // //             e.target.style.transform = 'translateY(-2px)';
// // // //             e.target.style.boxShadow = '0 4px 12px rgba(125, 0, 0, 0.3)';
// // // //           }}
// // // //           onMouseLeave={(e) => {
// // // //             e.target.style.backgroundColor = '#7d0000';
// // // //             e.target.style.transform = 'translateY(0)';
// // // //             e.target.style.boxShadow = 'none';
// // // //           }}>
// // // //             <span>📞</span>
// // // //             تماس
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </article>
// // // //   );
// // // // };

// // // // export default RealEstateCard;
// // // // RealEstateCard.jsx
// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import ImageSlider from './ImageSlider';
// // // import { useNavigate } from 'react-router-dom';
// // // import { FaSpinner } from 'react-icons/fa';
// // // import LoginModal from '../RealEstateDetailPageItem/LoginModal/LoginModal'; // ایمپورت مودال لاگین

// // // // ایمپورت FontAwesome
// // // import { library } from '@fortawesome/fontawesome-svg-core';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { 
// // //   faElevator, 
// // //   faParking, 
// // //   faSwimmingPool, 
// // //   faBoxes, 
// // //   faLocationDot,
// // //   faRuler,
// // //   faBuilding,
// // //   faCalendar,
// // //   faCamera,
// // //   faTag,
// // //   faStar as fasStar,
// // //   faBookmark as fasBookmark // آیکون بوکمارک پر
// // // } from '@fortawesome/free-solid-svg-icons';
// // // import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';

// // // library.add(faElevator, faParking, faSwimmingPool, faBoxes, faLocationDot, faRuler, faBuilding, faCalendar, faCamera, faTag, fasStar, fasBookmark);

// // // const RealEstateCard = ({ property }) => {
// // //   const navigate = useNavigate();
  
// // //   // ===== state بوک‌مارک =====
// // //   const [isBookmarked, setIsBookmarked] = useState(false);
// // //   const [bookmarkLoading, setBookmarkLoading] = useState(false);
// // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // //   const [showLoginModal, setShowLoginModal] = useState(false);

// // //   // ===== بررسی لاگین =====
// // //   useEffect(() => {
// // //     const checkLogin = () => {
// // //       const token = localStorage.getItem('auth_token');
// // //       setIsLoggedIn(!!token);
// // //     };
    
// // //     checkLogin();
    
// // //     // تنظیم مقدار اولیه بوک‌مارک از property
// // //     if (property && property.inBookMark !== undefined) {
// // //       setIsBookmarked(property.inBookMark === true);
// // //     }
    
// // //     window.addEventListener('authChange', checkLogin);
// // //     window.addEventListener('storage', checkLogin);
    
// // //     return () => {
// // //       window.removeEventListener('authChange', checkLogin);
// // //       window.removeEventListener('storage', checkLogin);
// // //     };
// // //   }, [property]);

// // //   // ===== بستن مودال لاگین =====
// // //   const handleLoginModalClose = useCallback(() => {
// // //     setShowLoginModal(false);
// // //     const token = localStorage.getItem('auth_token');
// // //     if (token) {
// // //       setIsLoggedIn(true);
// // //     }
// // //   }, []);

// // //   // ===== تابع بوک‌مارک =====
// // //   const toggleBookmark = useCallback(async (e) => {
// // //     e.stopPropagation();
    
// // //     // اگر لاگین نیست، مودال لاگین را نشان بده
// // //     if (!isLoggedIn) {
// // //       setShowLoginModal(true);
// // //       return;
// // //     }

// // //     if (bookmarkLoading) return;

// // //     setBookmarkLoading(true);
    
// // //     try {
// // //       const token = localStorage.getItem('auth_token');
      
// // //       const response = await fetch('https://localhost:7178/api/RealEstatePage/ToggleBookMark', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'Authorization': `Bearer ${token}`
// // //         },
// // //         body: JSON.stringify(property?.id),
// // //       });

// // //       if (response.ok) {
// // //         setIsBookmarked(prev => !prev);
// // //         console.log('✅ بوک‌مارک با موفقیت تغییر کرد');
// // //       } else {
// // //         const errorData = await response.json().catch(() => ({}));
// // //         console.error('❌ خطا در بوک‌مارک:', errorData);
// // //         alert('مشکل در ذخیره بوک‌مارک. لطفاً دوباره تلاش کنید.');
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ خطا در ارتباط با سرور:', error);
// // //       alert('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
// // //     } finally {
// // //       setBookmarkLoading(false);
// // //     }
// // //   }, [isLoggedIn, property, bookmarkLoading]);

// // //   if (!property) return null;

// // //   const currentYear = new Date().getFullYear() - 621;
// // //   const age = property.constructionYear ? currentYear - property.constructionYear : null;

// // //   const getAgeBadge = () => {
// // //     if (!age || age < 0) return null;
// // //     return null;
// // //   };

// // //   const ageBadge = getAgeBadge();

// // //   const formatPrice = (price) => {
// // //     if (!price) return null;
// // //     return new Intl.NumberFormat('fa-IR').format(price);
// // //   };

// // //   const getPropertyImages = () => {
// // //     if (property.imageUrl && Array.isArray(property.imageUrl) && property.imageUrl.length > 0) {
// // //       return property.imageUrl;
// // //     }
// // //     if (property.imageUrl && typeof property.imageUrl === 'string') {
// // //       return [property.imageUrl];
// // //     }
// // //     if (property.images && Array.isArray(property.images) && property.images.length > 0) {
// // //       return property.images;
// // //     }
// // //     return ['https://via.placeholder.com/400x300?text=ملک+مسکونی'];
// // //   };

// // //   const cardStyle = {
// // //     backgroundColor: 'white',
// // //     borderRadius: '16px',
// // //     overflow: 'hidden',
// // //     boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
// // //     transition: 'all 0.3s ease',
// // //     cursor: 'pointer',
// // //     height: '100%',
// // //     display: 'flex',
// // //     flexDirection: 'column',
// // //     position: 'relative',
// // //     border: '1px solid #e9ecef'
// // //   };

// // //   const getPropertyLink = () => {
// // //     const createSlug = (title) => {
// // //       if (!title) return '';
// // //       return title
// // //         .replace(/[^\w\s\u0600-\u06FF]/g, '')
// // //         .replace(/\s+/g, '-')
// // //         .substring(0, 50);
// // //     };
    
// // //     const slug = createSlug(property.title);
// // //     return `/property/${property.id}/${slug}`;
// // //   };

// // //   return (
// // //     <>
// // //       {/* مودال لاگین */}
// // //       {showLoginModal && (
// // //         <LoginModal 
// // //           onClose={handleLoginModalClose}
// // //           triggerSource="real-estate-card"
// // //         />
// // //       )}

// // //       <article 
// // //         style={cardStyle}
// // //         onClick={() => navigate(getPropertyLink())}
// // //         onMouseEnter={(e) => {
// // //           e.currentTarget.style.transform = 'translateY(-5px)';
// // //           e.currentTarget.style.boxShadow = '0 12px 24px rgba(125, 0, 0, 0.12)';
// // //           e.currentTarget.style.borderColor = '#7d0000';
// // //         }}
// // //         onMouseLeave={(e) => {
// // //           e.currentTarget.style.transform = 'translateY(0)';
// // //           e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
// // //           e.currentTarget.style.borderColor = '#e9ecef';
// // //         }}
// // //       >
// // //         {/* میکرو‌داده‌های مخفی برای SEO */}
// // //         <meta itemProp="name" content={property.title} />
// // //         <meta itemProp="description" content={`${property.additionalInformation} متری در ${property.regionName}`} />
// // //         {property.price && <meta itemProp="offers" content={property.price.toString()} />}

// // //         <meta itemProp="name" content={property.title} />
// // //         <meta itemProp="description" content={`${property.additionalInformation} متری در ${property.regionName}${property.constructionYear ? ' - ساخت ' + property.constructionYear : ''}`} />
// // //         <meta itemProp="sku" content={property.id} />
// // //         <meta itemProp="brand" content="املاک مستربلیط" />
// // //         <meta itemProp="category" content="آپارتمان فروشی" />
        
// // //         {property.imageUrl && property.imageUrl[0] && (
// // //           <meta itemProp="image" content={property.imageUrl[0]} />
// // //         )}
        
// // //         <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
// // //           <meta itemProp="addressLocality" content={property.regionName || ''} />
// // //           <meta itemProp="addressRegion" content={property.parentName || ''} />
// // //           <meta itemProp="addressCountry" content="IR" />
// // //         </div>

// // //         {property.price && (
// // //           <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
// // //             <meta itemProp="price" content={property.price.toString()} />
// // //             <meta itemProp="priceCurrency" content="IRR" />
// // //             <meta itemProp="availability" content="https://schema.org/InStock" />
// // //             <meta itemProp="priceValidUntil" content={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]} />
// // //           </div>
// // //         )}

// // //         <div itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
// // //           <meta itemProp="name" content="متراژ" />
// // //           <meta itemProp="value" content={property.additionalInformation || ''} />
// // //         </div>
        
// // //         <div itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
// // //           <meta itemProp="name" content="سال ساخت" />
// // //           <meta itemProp="value" content={property.constructionYear || ''} />
// // //         </div>
        
// // //         {property.countFloor > 0 && (
// // //           <div itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
// // //             <meta itemProp="name" content="تعداد طبقات" />
// // //             <meta itemProp="value" content={property.countFloor.toString()} />
// // //           </div>
// // //         )}

// // //         {property.isHasElevator && (
// // //           <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
// // //             <meta itemProp="name" content="آسانسور" />
// // //             <meta itemProp="value" content="true" />
// // //           </div>
// // //         )}
        
// // //         {property.isHasParking && (
// // //           <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
// // //             <meta itemProp="name" content="پارکینگ" />
// // //             <meta itemProp="value" content="true" />
// // //           </div>
// // //         )}
        
// // //         {property.isHasPool && (
// // //           <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
// // //             <meta itemProp="name" content="استخر" />
// // //             <meta itemProp="value" content="true" />
// // //           </div>
// // //         )}
        
// // //         {property.isHasStoreRoom && (
// // //           <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
// // //             <meta itemProp="name" content="انباری" />
// // //             <meta itemProp="value" content="true" />
// // //           </div>
// // //         )}

// // //         <meta property="og:type" content="product" />
// // //         <meta property="og:title" content={property.title} />
// // //         <meta property="og:description" content={`${property.additionalInformation} متری در ${property.regionName}`} />
// // //         {property.imageUrl && property.imageUrl[0] && (
// // //           <meta property="og:image" content={property.imageUrl[0]} />
// // //         )}
// // //         <meta property="og:url" content={`https://yourdomain.com/property/${property.id}`} />
// // //         <meta property="og:locale" content="fa_IR" />
        
// // //         <meta name="twitter:card" content="summary_large_image" />
// // //         <meta name="twitter:title" content={property.title} />
// // //         <meta name="twitter:description" content={`${property.additionalInformation} متری در ${property.regionName}`} />
// // //         {property.imageUrl && property.imageUrl[0] && (
// // //           <meta name="twitter:image" content={property.imageUrl[0]} />
// // //         )}

// // //         {/* برچسب سن */}
// // //         {ageBadge && (
// // //           <div style={{
// // //             position: 'absolute',
// // //             top: '10px',
// // //             right: '10px',
// // //             backgroundColor: '#10b981',
// // //             color: 'white',
// // //             padding: '4px 8px',
// // //             borderRadius: '20px',
// // //             fontSize: '11px',
// // //             fontWeight: '600',
// // //             zIndex: 20,
// // //             display: 'flex',
// // //             alignItems: 'center',
// // //             gap: '4px',
// // //             boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
// // //           }}>
// // //             <FontAwesomeIcon icon={fasStar} size="xs" />
// // //             <span>{ageBadge.text}</span>
// // //           </div>
// // //         )}

// // //         {/* ===== آیکون بوکمارک با پشتیبانی از لودینگ و لاگین ===== */}
// // //         <div 
// // //           style={{
// // //             position: 'absolute',
// // //             top: '10px',
// // //             left: '10px',
// // //             zIndex: 20,
// // //             cursor: bookmarkLoading ? 'default' : 'pointer',
// // //             backgroundColor: 'white',
// // //             width: '32px',
// // //             height: '32px',
// // //             borderRadius: '50%',
// // //             display: 'flex',
// // //             alignItems: 'center',
// // //             justifyContent: 'center',
// // //             boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
// // //             transition: 'all 0.2s ease',
// // //             opacity: bookmarkLoading ? 0.7 : 1
// // //           }}
// // //           onClick={toggleBookmark}
// // //           onMouseEnter={(e) => {
// // //             if (!bookmarkLoading) {
// // //               e.currentTarget.style.transform = 'scale(1.1)';
// // //             }
// // //           }}
// // //           onMouseLeave={(e) => {
// // //             if (!bookmarkLoading) {
// // //               e.currentTarget.style.transform = 'scale(1)';
// // //             }
// // //           }}
// // //           title={isLoggedIn ? (isBookmarked ? 'حذف از بوک‌مارک‌ها' : 'افزودن به بوک‌مارک‌ها') : 'برای افزودن به بوک‌مارک وارد شوید'}
// // //         >
// // //           {bookmarkLoading ? (
// // //             <FaSpinner className="spinner" style={{ color: '#7d0000', fontSize: '14px' }} />
// // //           ) : (
// // //             <FontAwesomeIcon 
// // //               icon={isBookmarked ? fasBookmark : farBookmark} 
// // //               color={isBookmarked ? '#7d0000' : '#94a3b8'}
// // //               size="sm"
// // //             />
// // //           )}
// // //         </div>

// // //         {/* بخش عکس با افکت زوم */}
// // //         <div style={{ 
// // //           position: 'relative', 
// // //           overflow: 'hidden',
// // //           height: '200px'
// // //         }}>
// // //           <div style={{ 
// // //             position: 'relative', 
// // //             overflow: 'hidden',
// // //             height: '200px'
// // //           }}>
// // //             <div style={{
// // //               transition: 'transform 0.6s cubic-bezier(0.25, 0.45, 0.45, 0.95)',
// // //               height: '100%',
// // //               width: '100%',
// // //               transformOrigin: 'center center'
// // //             }}
// // //             onMouseEnter={(e) => {
// // //               e.currentTarget.style.transform = 'scale(1.1)';
// // //             }}
// // //             onMouseLeave={(e) => {
// // //               e.currentTarget.style.transform = 'scale(1)';
// // //             }}>
// // //               <ImageSlider 
// // //                 images={getPropertyImages()} 
// // //                 hotelName={property.title || ''}
// // //                 propertyId={property.id}
// // //                 alt={`${property.title || 'ملک'} - ${property.additionalInformation || ''} متری - ${property.regionName || ''}`}
// // //               />
// // //             </div>
// // //           </div>
          
// // //           {/* تعداد عکس‌ها */}
// // //           {property.imageCount > 0 && (
// // //             <div style={{
// // //               position: 'absolute',
// // //               bottom: '8px',
// // //               left: '8px',
// // //               backgroundColor: 'rgba(0,0,0,0.6)',
// // //               color: 'white',
// // //               padding: '3px 8px',
// // //               borderRadius: '20px',
// // //               fontSize: '10px',
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               gap: '4px',
// // //               zIndex: 15,
// // //               backdropFilter: 'blur(2px)'
// // //             }}>
// // //               <FontAwesomeIcon icon={faCamera} size="xs" />
// // //               <span>{property.imageCount}</span>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* محتوای کارت */}
// // //         <div style={{ padding: '12px 14px 14px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
// // //           {/* عنوان */}
// // //           <h3 style={{
// // //             fontSize: '15px',
// // //             fontWeight: '700',
// // //             margin: 0,
// // //             color: '#1e293b',
// // //             overflow: 'hidden',
// // //             textOverflow: 'ellipsis',
// // //             whiteSpace: 'nowrap'
// // //           }}>
// // //             {property.title || 'ملک مسکونی'}
// // //           </h3>
          
// // //           {/* تاریخ ایجاد - زیر عنوان */}
// // //           {property.createdAtPersianRelative && (
// // //             <div style={{
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               gap: '4px',
// // //               fontSize: '10px',
// // //               color: '#94a3b8',
// // //               marginTop: '2px'
// // //             }}>
// // //               <span>🕒</span>
// // //               <span>{property.createdAtPersianRelative}</span>
// // //             </div>
// // //           )}
          
// // //           {/* موقعیت */}
// // //           <div style={{
// // //             display: 'flex',
// // //             alignItems: 'center',
// // //             gap: '4px',
// // //             color: '#64748b',
// // //             fontSize: '12px',
// // //             marginBottom: '2px'
// // //           }}>
// // //             <FontAwesomeIcon icon={faLocationDot} size="xs" color="#7d0000" />
// // //             <span style={{
// // //               whiteSpace: 'nowrap',
// // //               overflow: 'hidden',
// // //               textOverflow: 'ellipsis'
// // //             }}>
// // //               {property.regionName || 'منطقه نامشخص'}
// // //               {property.parentName && `, ${property.parentName}`}
// // //             </span>
// // //           </div>
          
// // //           {/* مشخصات */}
// // //           <div style={{
// // //             display: 'grid',
// // //             gridTemplateColumns: 'repeat(3, 1fr)',
// // //             gap: '4px',
// // //             backgroundColor: '#f8fafc',
// // //             padding: '8px 6px',
// // //             borderRadius: '8px',
// // //             border: '1px solid #eef2f6',
// // //             marginBottom: '2px'
// // //           }}>
// // //             <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#1e293b' }}>
// // //               <FontAwesomeIcon icon={faRuler} color="#7d0000" size="xs" />
// // //               <span>{property.additionalInformation || '---'}</span>
// // //             </div>
            
// // //             <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#1e293b' }}>
// // //               <FontAwesomeIcon icon={faCalendar} color="#7d0000" size="xs" />
// // //               <span>{property.constructionYear || '---'}</span>
// // //             </div>
            
// // //             {property.countFloor > 0 && (
// // //               <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#1e293b' }}>
// // //                 <FontAwesomeIcon icon={faBuilding} color="#7d0000" size="xs" />
// // //                 <span>{property.countFloor}</span>
// // //               </div>
// // //             )}
// // //           </div>
          
// // //           {/* امکانات */}
// // //           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '2px' }}>
// // //             {property.isHasElevator && (
// // //               <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
// // //                 <FontAwesomeIcon icon={faElevator} color="#7d0000" size="xs" />
// // //                 <span>آسانسور</span>
// // //               </span>
// // //             )}
// // //             {property.isHasParking && (
// // //               <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
// // //                 <FontAwesomeIcon icon={faParking} color="#7d0000" size="xs" />
// // //                 <span>پارکینگ</span>
// // //               </span>
// // //             )}
// // //             {property.isHasPool && (
// // //               <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
// // //                 <FontAwesomeIcon icon={faSwimmingPool} color="#7d0000" size="xs" />
// // //                 <span>استخر</span>
// // //               </span>
// // //             )}
// // //             {property.isHasStoreRoom && (
// // //               <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
// // //                 <FontAwesomeIcon icon={faBoxes} color="#7d0000" size="xs" />
// // //                 <span>انباری</span>
// // //               </span>
// // //             )}
// // //           </div>
          
// // //           {/* قیمت */}
// // //           <div style={{
// // //             display: 'flex',
// // //             justifyContent: 'space-between',
// // //             alignItems: 'center',
// // //             borderTop: '1px solid #eef2f6',
// // //             paddingTop: '10px',
// // //             marginTop: '4px'
// // //           }}>
// // //             <div>
// // //               <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
// // //                 <FontAwesomeIcon icon={faTag} size="xs" color="#94a3b8" />
// // //                 <span style={{ fontSize: '10px', color: '#64748b' }}>قیمت</span>
// // //               </div>
// // //               <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px', flexWrap: 'wrap' }}>
// // //                 <span style={{ fontSize: '16px', fontWeight: '800', color: '#7d0000' }}>
// // //                   {property.price ? formatPrice(property.price) : 'تماس بگیرید'}
// // //                 </span>
// // //                 {property.price && (
// // //                   <span style={{ fontSize: '9px', color: '#94a3b8' }}>تومان</span>
// // //                 )}
// // //               </div>
// // //             </div>
            
// // //             <button style={{
// // //               backgroundColor: '#7d0000',
// // //               color: 'white',
// // //               border: 'none',
// // //               borderRadius: '30px',
// // //               padding: '7px 16px',
// // //               fontSize: '11px',
// // //               fontWeight: '600',
// // //               cursor: 'pointer',
// // //               transition: 'all 0.3s ease',
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               gap: '4px'
// // //             }}
// // //             onMouseEnter={(e) => {
// // //               e.target.style.backgroundColor = '#a30000';
// // //               e.target.style.transform = 'translateY(-2px)';
// // //               e.target.style.boxShadow = '0 4px 12px rgba(125, 0, 0, 0.3)';
// // //             }}
// // //             onMouseLeave={(e) => {
// // //               e.target.style.backgroundColor = '#7d0000';
// // //               e.target.style.transform = 'translateY(0)';
// // //               e.target.style.boxShadow = 'none';
// // //             }}>
// // //               <span>📞</span>
// // //               تماس
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </article>
// // //     </>
// // //   );
// // // };

// // // export default RealEstateCard;

// // // RealEstateCard.jsx
// // import React, { useState, useEffect, useCallback } from 'react';
// // import ImageSlider from './ImageSlider';
// // import { useNavigate } from 'react-router-dom';
// // import { FaSpinner } from 'react-icons/fa';

// // // ایمپورت FontAwesome
// // import { library } from '@fortawesome/fontawesome-svg-core';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { 
// //   faElevator, 
// //   faParking, 
// //   faSwimmingPool, 
// //   faBoxes, 
// //   faLocationDot,
// //   faRuler,
// //   faBuilding,
// //   faCalendar,
// //   faCamera,
// //   faTag,
// //   faStar as fasStar,
// //   faBookmark as fasBookmark
// // } from '@fortawesome/free-solid-svg-icons';
// // import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';

// // library.add(faElevator, faParking, faSwimmingPool, faBoxes, faLocationDot, faRuler, faBuilding, faCalendar, faCamera, faTag, fasStar, fasBookmark);

// // const RealEstateCard = ({ property, onOpenLoginModal }) => {
// //   const navigate = useNavigate();
  
// //   // ===== state بوک‌مارک =====
// //   const [isBookmarked, setIsBookmarked] = useState(false);
// //   const [bookmarkLoading, setBookmarkLoading] = useState(false);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);

// //   // ===== بررسی لاگین =====
// //   useEffect(() => {
// //     const checkLogin = () => {
// //       const token = localStorage.getItem('auth_token');
// //       setIsLoggedIn(!!token);
// //     };
    
// //     checkLogin();
    
// //     // تنظیم مقدار اولیه بوک‌مارک از property
// //     if (property && property.inBookMark !== undefined) {
// //       setIsBookmarked(property.inBookMark === true);
// //     }
    
// //     window.addEventListener('authChange', checkLogin);
// //     window.addEventListener('storage', checkLogin);
    
// //     return () => {
// //       window.removeEventListener('authChange', checkLogin);
// //       window.removeEventListener('storage', checkLogin);
// //     };
// //   }, [property]);

// //   // ===== تابع بوک‌مارک =====
// //   const toggleBookmark = useCallback(async (e) => {
// //     e.stopPropagation();
    
// //     // اگر لاگین نیست، مودال لاگین را از والد باز کن
// //     if (!isLoggedIn) {
// //       if (onOpenLoginModal) {
// //         onOpenLoginModal('real-estate-card');
// //       }
// //       return;
// //     }

// //     if (bookmarkLoading) return;

// //     setBookmarkLoading(true);
    
// //     try {
// //       const token = localStorage.getItem('auth_token');
      
// //       const response = await fetch('https://localhost:7178/api/RealEstatePage/ToggleBookMark', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`
// //         },
// //         body: JSON.stringify(property?.id),
// //       });

// //       if (response.ok) {
// //         setIsBookmarked(prev => !prev);
// //         console.log('✅ بوک‌مارک با موفقیت تغییر کرد');
// //       } else {
// //         const errorData = await response.json().catch(() => ({}));
// //         console.error('❌ خطا در بوک‌مارک:', errorData);
// //         alert('مشکل در ذخیره بوک‌مارک. لطفاً دوباره تلاش کنید.');
// //       }
// //     } catch (error) {
// //       console.error('❌ خطا در ارتباط با سرور:', error);
// //       alert('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
// //     } finally {
// //       setBookmarkLoading(false);
// //     }
// //   }, [isLoggedIn, property, bookmarkLoading, onOpenLoginModal]);

// //   if (!property) return null;

// //   const currentYear = new Date().getFullYear() - 621;
// //   const age = property.constructionYear ? currentYear - property.constructionYear : null;

// //   const getAgeBadge = () => {
// //     if (!age || age < 0) return null;
// //     return null;
// //   };

// //   const ageBadge = getAgeBadge();

// //   const formatPrice = (price) => {
// //     if (!price) return null;
// //     return new Intl.NumberFormat('fa-IR').format(price);
// //   };

// //   const getPropertyImages = () => {
// //     if (property.imageUrl && Array.isArray(property.imageUrl) && property.imageUrl.length > 0) {
// //       return property.imageUrl;
// //     }
// //     if (property.imageUrl && typeof property.imageUrl === 'string') {
// //       return [property.imageUrl];
// //     }
// //     if (property.images && Array.isArray(property.images) && property.images.length > 0) {
// //       return property.images;
// //     }
// //     return ['https://via.placeholder.com/400x300?text=ملک+مسکونی'];
// //   };

// //   const cardStyle = {
// //     backgroundColor: 'white',
// //     borderRadius: '16px',
// //     overflow: 'hidden',
// //     boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
// //     transition: 'all 0.3s ease',
// //     cursor: 'pointer',
// //     height: '100%',
// //     display: 'flex',
// //     flexDirection: 'column',
// //     position: 'relative',
// //     border: '1px solid #e9ecef'
// //   };

// //   const getPropertyLink = () => {
// //     const createSlug = (title) => {
// //       if (!title) return '';
// //       return title
// //         .replace(/[^\w\s\u0600-\u06FF]/g, '')
// //         .replace(/\s+/g, '-')
// //         .substring(0, 50);
// //     };
    
// //     const slug = createSlug(property.title);
// //     return `/property/${property.id}/${slug}`;
// //   };

// //   return (
// //     <article 
// //       style={cardStyle}
// //       onClick={() => navigate(getPropertyLink())}
// //       onMouseEnter={(e) => {
// //         e.currentTarget.style.transform = 'translateY(-5px)';
// //         e.currentTarget.style.boxShadow = '0 12px 24px rgba(125, 0, 0, 0.12)';
// //         e.currentTarget.style.borderColor = '#7d0000';
// //       }}
// //       onMouseLeave={(e) => {
// //         e.currentTarget.style.transform = 'translateY(0)';
// //         e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
// //         e.currentTarget.style.borderColor = '#e9ecef';
// //       }}
// //     >
// //       {/* میکرو‌داده‌های مخفی برای SEO */}
// //       <meta itemProp="name" content={property.title} />
// //       <meta itemProp="description" content={`${property.additionalInformation} متری در ${property.regionName}`} />
// //       {property.price && <meta itemProp="offers" content={property.price.toString()} />}

// //       <meta itemProp="name" content={property.title} />
// //       <meta itemProp="description" content={`${property.additionalInformation} متری در ${property.regionName}${property.constructionYear ? ' - ساخت ' + property.constructionYear : ''}`} />
// //       <meta itemProp="sku" content={property.id} />
// //       <meta itemProp="brand" content="املاک مستربلیط" />
// //       <meta itemProp="category" content="آپارتمان فروشی" />
      
// //       {property.imageUrl && property.imageUrl[0] && (
// //         <meta itemProp="image" content={property.imageUrl[0]} />
// //       )}
      
// //       <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
// //         <meta itemProp="addressLocality" content={property.regionName || ''} />
// //         <meta itemProp="addressRegion" content={property.parentName || ''} />
// //         <meta itemProp="addressCountry" content="IR" />
// //       </div>

// //       {property.price && (
// //         <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
// //           <meta itemProp="price" content={property.price.toString()} />
// //           <meta itemProp="priceCurrency" content="IRR" />
// //           <meta itemProp="availability" content="https://schema.org/InStock" />
// //           <meta itemProp="priceValidUntil" content={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]} />
// //         </div>
// //       )}

// //       <div itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
// //         <meta itemProp="name" content="متراژ" />
// //         <meta itemProp="value" content={property.additionalInformation || ''} />
// //       </div>
      
// //       <div itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
// //         <meta itemProp="name" content="سال ساخت" />
// //         <meta itemProp="value" content={property.constructionYear || ''} />
// //       </div>
      
// //       {property.countFloor > 0 && (
// //         <div itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
// //           <meta itemProp="name" content="تعداد طبقات" />
// //           <meta itemProp="value" content={property.countFloor.toString()} />
// //         </div>
// //       )}

// //       {property.isHasElevator && (
// //         <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
// //           <meta itemProp="name" content="آسانسور" />
// //           <meta itemProp="value" content="true" />
// //         </div>
// //       )}
      
// //       {property.isHasParking && (
// //         <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
// //           <meta itemProp="name" content="پارکینگ" />
// //           <meta itemProp="value" content="true" />
// //         </div>
// //       )}
      
// //       {property.isHasPool && (
// //         <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
// //           <meta itemProp="name" content="استخر" />
// //           <meta itemProp="value" content="true" />
// //         </div>
// //       )}
      
// //       {property.isHasStoreRoom && (
// //         <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
// //           <meta itemProp="name" content="انباری" />
// //           <meta itemProp="value" content="true" />
// //         </div>
// //       )}

// //       <meta property="og:type" content="product" />
// //       <meta property="og:title" content={property.title} />
// //       <meta property="og:description" content={`${property.additionalInformation} متری در ${property.regionName}`} />
// //       {property.imageUrl && property.imageUrl[0] && (
// //         <meta property="og:image" content={property.imageUrl[0]} />
// //       )}
// //       <meta property="og:url" content={`https://yourdomain.com/property/${property.id}`} />
// //       <meta property="og:locale" content="fa_IR" />
      
// //       <meta name="twitter:card" content="summary_large_image" />
// //       <meta name="twitter:title" content={property.title} />
// //       <meta name="twitter:description" content={`${property.additionalInformation} متری در ${property.regionName}`} />
// //       {property.imageUrl && property.imageUrl[0] && (
// //         <meta name="twitter:image" content={property.imageUrl[0]} />
// //       )}

// //       {/* برچسب سن */}
// //       {ageBadge && (
// //         <div style={{
// //           position: 'absolute',
// //           top: '10px',
// //           right: '10px',
// //           backgroundColor: '#10b981',
// //           color: 'white',
// //           padding: '4px 8px',
// //           borderRadius: '20px',
// //           fontSize: '11px',
// //           fontWeight: '600',
// //           zIndex: 20,
// //           display: 'flex',
// //           alignItems: 'center',
// //           gap: '4px',
// //           boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
// //         }}>
// //           <FontAwesomeIcon icon={fasStar} size="xs" />
// //           <span>{ageBadge.text}</span>
// //         </div>
// //       )}

// //       {/* ===== آیکون بوکمارک با پشتیبانی از لودینگ و لاگین ===== */}
// //       <div 
// //         style={{
// //           position: 'absolute',
// //           top: '10px',
// //           left: '10px',
// //           zIndex: 20,
// //           cursor: bookmarkLoading ? 'default' : 'pointer',
// //           backgroundColor: 'white',
// //           width: '32px',
// //           height: '32px',
// //           borderRadius: '50%',
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
// //           transition: 'all 0.2s ease',
// //           opacity: bookmarkLoading ? 0.7 : 1
// //         }}
// //         onClick={toggleBookmark}
// //         onMouseEnter={(e) => {
// //           if (!bookmarkLoading) {
// //             e.currentTarget.style.transform = 'scale(1.1)';
// //           }
// //         }}
// //         onMouseLeave={(e) => {
// //           if (!bookmarkLoading) {
// //             e.currentTarget.style.transform = 'scale(1)';
// //           }
// //         }}
// //         title={isLoggedIn ? (isBookmarked ? 'حذف از بوک‌مارک‌ها' : 'افزودن به بوک‌مارک‌ها') : 'برای افزودن به بوک‌مارک وارد شوید'}
// //       >
// //         {bookmarkLoading ? (
// //           <FaSpinner className="spinner" style={{ color: '#7d0000', fontSize: '14px' }} />
// //         ) : (
// //           <FontAwesomeIcon 
// //             icon={isBookmarked ? fasBookmark : farBookmark} 
// //             color={isBookmarked ? '#7d0000' : '#94a3b8'}
// //             size="sm"
// //           />
// //         )}
// //       </div>

// //       {/* بخش عکس با افکت زوم */}
// //       <div style={{ 
// //         position: 'relative', 
// //         overflow: 'hidden',
// //         height: '200px'
// //       }}>
// //         <div style={{ 
// //           position: 'relative', 
// //           overflow: 'hidden',
// //           height: '200px'
// //         }}>
// //           <div style={{
// //             transition: 'transform 0.6s cubic-bezier(0.25, 0.45, 0.45, 0.95)',
// //             height: '100%',
// //             width: '100%',
// //             transformOrigin: 'center center'
// //           }}
// //           onMouseEnter={(e) => {
// //             e.currentTarget.style.transform = 'scale(1.1)';
// //           }}
// //           onMouseLeave={(e) => {
// //             e.currentTarget.style.transform = 'scale(1)';
// //           }}>
// //             <ImageSlider 
// //               images={getPropertyImages()} 
// //               hotelName={property.title || ''}
// //               propertyId={property.id}
// //               alt={`${property.title || 'ملک'} - ${property.additionalInformation || ''} متری - ${property.regionName || ''}`}
// //             />
// //           </div>
// //         </div>
        
// //         {/* تعداد عکس‌ها */}
// //         {property.imageCount > 0 && (
// //           <div style={{
// //             position: 'absolute',
// //             bottom: '8px',
// //             left: '8px',
// //             backgroundColor: 'rgba(0,0,0,0.6)',
// //             color: 'white',
// //             padding: '3px 8px',
// //             borderRadius: '20px',
// //             fontSize: '10px',
// //             display: 'flex',
// //             alignItems: 'center',
// //             gap: '4px',
// //             zIndex: 15,
// //             backdropFilter: 'blur(2px)'
// //           }}>
// //             <FontAwesomeIcon icon={faCamera} size="xs" />
// //             <span>{property.imageCount}</span>
// //           </div>
// //         )}
// //       </div>

// //       {/* محتوای کارت */}
// //       <div style={{ padding: '12px 14px 14px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
// //         {/* عنوان */}
// //         <h3 style={{
// //           fontSize: '15px',
// //           fontWeight: '700',
// //           margin: 0,
// //           color: '#1e293b',
// //           overflow: 'hidden',
// //           textOverflow: 'ellipsis',
// //           whiteSpace: 'nowrap'
// //         }}>
// //           {property.title || 'ملک مسکونی'}
// //         </h3>
        
// //         {/* تاریخ ایجاد - زیر عنوان */}
// //         {property.createdAtPersianRelative && (
// //           <div style={{
// //             display: 'flex',
// //             alignItems: 'center',
// //             gap: '4px',
// //             fontSize: '10px',
// //             color: '#94a3b8',
// //             marginTop: '2px'
// //           }}>
// //             <span>🕒</span>
// //             <span>{property.createdAtPersianRelative}</span>
// //           </div>
// //         )}
        
// //         {/* موقعیت */}
// //         <div style={{
// //           display: 'flex',
// //           alignItems: 'center',
// //           gap: '4px',
// //           color: '#64748b',
// //           fontSize: '12px',
// //           marginBottom: '2px'
// //         }}>
// //           <FontAwesomeIcon icon={faLocationDot} size="xs" color="#7d0000" />
// //           <span style={{
// //             whiteSpace: 'nowrap',
// //             overflow: 'hidden',
// //             textOverflow: 'ellipsis'
// //           }}>
// //             {property.regionName || 'منطقه نامشخص'}
// //             {property.parentName && `, ${property.parentName}`}
// //           </span>
// //         </div>
        
// //         {/* مشخصات */}
// //         <div style={{
// //           display: 'grid',
// //           gridTemplateColumns: 'repeat(3, 1fr)',
// //           gap: '4px',
// //           backgroundColor: '#f8fafc',
// //           padding: '8px 6px',
// //           borderRadius: '8px',
// //           border: '1px solid #eef2f6',
// //           marginBottom: '2px'
// //         }}>
// //           <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#1e293b' }}>
// //             <FontAwesomeIcon icon={faRuler} color="#7d0000" size="xs" />
// //             <span>{property.additionalInformation || '---'}</span>
// //           </div>
          
// //           <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#1e293b' }}>
// //             <FontAwesomeIcon icon={faCalendar} color="#7d0000" size="xs" />
// //             <span>{property.constructionYear || '---'}</span>
// //           </div>
          
// //           {property.countFloor > 0 && (
// //             <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#1e293b' }}>
// //               <FontAwesomeIcon icon={faBuilding} color="#7d0000" size="xs" />
// //               <span>{property.countFloor}</span>
// //             </div>
// //           )}
// //         </div>
        
// //         {/* امکانات */}
// //         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '2px' }}>
// //           {property.isHasElevator && (
// //             <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
// //               <FontAwesomeIcon icon={faElevator} color="#7d0000" size="xs" />
// //               <span>آسانسور</span>
// //             </span>
// //           )}
// //           {property.isHasParking && (
// //             <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
// //               <FontAwesomeIcon icon={faParking} color="#7d0000" size="xs" />
// //               <span>پارکینگ</span>
// //             </span>
// //           )}
// //           {property.isHasPool && (
// //             <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
// //               <FontAwesomeIcon icon={faSwimmingPool} color="#7d0000" size="xs" />
// //               <span>استخر</span>
// //             </span>
// //           )}
// //           {property.isHasStoreRoom && (
// //             <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
// //               <FontAwesomeIcon icon={faBoxes} color="#7d0000" size="xs" />
// //               <span>انباری</span>
// //             </span>
// //           )}
// //         </div>
        
// //         {/* قیمت */}
// //         <div style={{
// //           display: 'flex',
// //           justifyContent: 'space-between',
// //           alignItems: 'center',
// //           borderTop: '1px solid #eef2f6',
// //           paddingTop: '10px',
// //           marginTop: '4px'
// //         }}>
// //           <div>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
// //               <FontAwesomeIcon icon={faTag} size="xs" color="#94a3b8" />
// //               <span style={{ fontSize: '10px', color: '#64748b' }}>قیمت</span>
// //             </div>
// //             <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px', flexWrap: 'wrap' }}>
// //               <span style={{ fontSize: '16px', fontWeight: '800', color: '#7d0000' }}>
// //                 {property.price ? formatPrice(property.price) : 'تماس بگیرید'}
// //               </span>
// //               {property.price && (
// //                 <span style={{ fontSize: '9px', color: '#94a3b8' }}>تومان</span>
// //               )}
// //             </div>
// //           </div>
          
// //           <button style={{
// //             backgroundColor: '#7d0000',
// //             color: 'white',
// //             border: 'none',
// //             borderRadius: '30px',
// //             padding: '7px 16px',
// //             fontSize: '11px',
// //             fontWeight: '600',
// //             cursor: 'pointer',
// //             transition: 'all 0.3s ease',
// //             display: 'flex',
// //             alignItems: 'center',
// //             gap: '4px'
// //           }}
// //           onMouseEnter={(e) => {
// //             e.target.style.backgroundColor = '#a30000';
// //             e.target.style.transform = 'translateY(-2px)';
// //             e.target.style.boxShadow = '0 4px 12px rgba(125, 0, 0, 0.3)';
// //           }}
// //           onMouseLeave={(e) => {
// //             e.target.style.backgroundColor = '#7d0000';
// //             e.target.style.transform = 'translateY(0)';
// //             e.target.style.boxShadow = 'none';
// //           }}>
// //             <span>📞</span>
// //             تماس
// //           </button>
// //         </div>
// //       </div>
// //     </article>
// //   );
// // };

// // export default RealEstateCard;

// // RealEstateCard.jsx - نسخه بهینه شده برای سئو
// import React, { useState, useEffect, useCallback } from 'react';
// import { Link } from 'react-router-dom'; // اضافه کردن Link
// import ImageSlider from './ImageSlider';
// import { FaSpinner } from 'react-icons/fa';

// // ایمپورت FontAwesome
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faElevator, 
//   faParking, 
//   faSwimmingPool, 
//   faBoxes, 
//   faLocationDot,
//   faRuler,
//   faBuilding,
//   faCalendar,
//   faCamera,
//   faTag,
//   faStar as fasStar,
//   faBookmark as fasBookmark
// } from '@fortawesome/free-solid-svg-icons';
// import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';

// library.add(faElevator, faParking, faSwimmingPool, faBoxes, faLocationDot, faRuler, faBuilding, faCalendar, faCamera, faTag, fasStar, fasBookmark);

// const RealEstateCard = ({ property, onOpenLoginModal }) => {
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [bookmarkLoading, setBookmarkLoading] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // ===== بررسی لاگین =====
//   useEffect(() => {
//     const checkLogin = () => {
//       const token = localStorage.getItem('auth_token');
//       setIsLoggedIn(!!token);
//     };
    
//     checkLogin();
    
//     if (property && property.inBookMark !== undefined) {
//       setIsBookmarked(property.inBookMark === true);
//     }
    
//     window.addEventListener('authChange', checkLogin);
//     window.addEventListener('storage', checkLogin);
    
//     return () => {
//       window.removeEventListener('authChange', checkLogin);
//       window.removeEventListener('storage', checkLogin);
//     };
//   }, [property]);

//   // ===== تابع بوک‌مارک =====
//   const toggleBookmark = useCallback(async (e) => {
//     e.stopPropagation();
//     e.preventDefault(); // جلوگیری از Navigate در Link
    
//     if (!isLoggedIn) {
//       if (onOpenLoginModal) {
//         onOpenLoginModal('real-estate-card');
//       }
//       return;
//     }

//     if (bookmarkLoading) return;

//     setBookmarkLoading(true);
    
//     try {
//       const token = localStorage.getItem('auth_token');
      
//       const response = await fetch('https://localhost:7178/api/RealEstatePage/ToggleBookMark', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(property?.id),
//       });

//       if (response.ok) {
//         setIsBookmarked(prev => !prev);
//         console.log('✅ بوک‌مارک با موفقیت تغییر کرد');
//       } else {
//         const errorData = await response.json().catch(() => ({}));
//         console.error('❌ خطا در بوک‌مارک:', errorData);
//         alert('مشکل در ذخیره بوک‌مارک. لطفاً دوباره تلاش کنید.');
//       }
//     } catch (error) {
//       console.error('❌ خطا در ارتباط با سرور:', error);
//       alert('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
//     } finally {
//       setBookmarkLoading(false);
//     }
//   }, [isLoggedIn, property, bookmarkLoading, onOpenLoginModal]);

//   if (!property) return null;

//   const currentYear = new Date().getFullYear() - 621;
//   const age = property.constructionYear ? currentYear - property.constructionYear : null;

//   const formatPrice = (price) => {
//     if (!price) return null;
//     return new Intl.NumberFormat('fa-IR').format(price);
//   };

//   const getPropertyImages = () => {
//     if (property.imageUrl && Array.isArray(property.imageUrl) && property.imageUrl.length > 0) {
//       return property.imageUrl;
//     }
//     if (property.imageUrl && typeof property.imageUrl === 'string') {
//       return [property.imageUrl];
//     }
//     if (property.images && Array.isArray(property.images) && property.images.length > 0) {
//       return property.images;
//     }
//     return ['https://via.placeholder.com/400x300?text=ملک+مسکونی'];
//   };

//   const cardStyle = {
//     backgroundColor: 'white',
//     borderRadius: '16px',
//     overflow: 'hidden',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
//     transition: 'all 0.3s ease',
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     position: 'relative',
//     border: '1px solid #e9ecef',
//     textDecoration: 'none',
//     color: 'inherit'
//   };

//   const getPropertyLink = () => {
//     const createSlug = (title) => {
//       if (!title) return '';
//       return title
//         .replace(/[^\w\s\u0600-\u06FF]/g, '')
//         .replace(/\s+/g, '-')
//         .substring(0, 50);
//     };
    
//     const slug = createSlug(property.title);
//     return `/property/${property.id}/${slug}`;
//   };

//   // ===== ساخت JSON-LD برای Schema.org =====
//   const getJsonLd = () => {
//     const jsonLd = {
//       "@context": "https://schema.org",
//       "@type": "Product",
//       "name": property.title,
//       "description": `خرید و فروش ${property.title} با ${property.additionalInformation} متر مربع مساحت در منطقه ${property.regionName}${property.constructionYear ? ` ساخته شده در سال ${property.constructionYear}` : ''}`,
//       "sku": property.id,
//       "brand": {
//         "@type": "Brand",
//         "name": "املاک مستربلیط"
//       },
//       "category": "آپارتمان فروشی"
//     };

//     if (property.price) {
//       jsonLd.offers = {
//         "@type": "Offer",
//         "price": property.price,
//         "priceCurrency": "IRR",
//         "availability": "https://schema.org/InStock",
//         "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
//       };
//     }

//     if (property.imageUrl && property.imageUrl[0]) {
//       jsonLd.image = property.imageUrl[0];
//     }

//     if (property.regionName) {
//       jsonLd.address = {
//         "@type": "PostalAddress",
//         "addressLocality": property.regionName,
//         "addressRegion": property.parentName || '',
//         "addressCountry": "IR"
//       };
//     }

//     if (property.latitude && property.longitude) {
//       jsonLd.geo = {
//         "@type": "GeoCoordinates",
//         "latitude": property.latitude,
//         "longitude": property.longitude
//       };
//     }

//     return jsonLd;
//   };

//   return (
//     <>
//       {/* ===== JSON-LD برای سئو پیشرفته ===== */}
//       <script type="application/ld+json">
//         {JSON.stringify(getJsonLd())}
//       </script>

//       {/* ===== تگ Canonical ===== */}
//       <link rel="canonical" href={`https://yourdomain.com${getPropertyLink()}`} />

//       {/* ===== لینک کارت ===== */}
//       <Link 
//         to={getPropertyLink()}
//         style={cardStyle}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.transform = 'translateY(-5px)';
//           e.currentTarget.style.boxShadow = '0 12px 24px rgba(125, 0, 0, 0.12)';
//           e.currentTarget.style.borderColor = '#7d0000';
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.transform = 'translateY(0)';
//           e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
//           e.currentTarget.style.borderColor = '#e9ecef';
//         }}
//       >
//         {/* ===== میکرو‌داده‌های Schema.org ===== */}
//         <div itemScope itemType="https://schema.org/Product">
          
//           {/* عنوان و توضیحات بهینه */}
//           <meta itemProp="name" content={property.title} />
//           <meta itemProp="description" content={`خرید و فروش ${property.title} با ${property.additionalInformation} متر مربع مساحت در منطقه ${property.regionName}${property.constructionYear ? ` ساخته شده در سال ${property.constructionYear}` : ''}`} />
//           <meta itemProp="sku" content={property.id} />
//           <meta itemProp="brand" content="املاک مستربلیط" />
//           <meta itemProp="category" content="آپارتمان فروشی" />
          
//           {/* تصویر */}
//           {property.imageUrl && property.imageUrl[0] && (
//             <meta itemProp="image" content={property.imageUrl[0]} />
//           )}
          
//           {/* آدرس */}
//           <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
//             <meta itemProp="addressLocality" content={property.regionName || ''} />
//             <meta itemProp="addressRegion" content={property.parentName || ''} />
//             <meta itemProp="addressCountry" content="IR" />
//           </div>

//           {/* موقعیت جغرافیایی */}
//           {property.latitude && property.longitude && (
//             <div itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates">
//               <meta itemProp="latitude" content={property.latitude} />
//               <meta itemProp="longitude" content={property.longitude} />
//             </div>
//           )}

//           {/* تاریخ انتشار */}
//           {property.createdAt && (
//             <meta itemProp="datePublished" content={property.createdAt} />
//           )}
//           {property.updatedAt && (
//             <meta itemProp="dateModified" content={property.updatedAt} />
//           )}

//           {/* قیمت */}
//           {property.price && (
//             <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
//               <meta itemProp="price" content={property.price.toString()} />
//               <meta itemProp="priceCurrency" content="IRR" />
//               <meta itemProp="availability" content="https://schema.org/InStock" />
//               <meta itemProp="priceValidUntil" content={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]} />
//             </div>
//           )}

//           {/* مشخصات اضافی */}
//           <div itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
//             <meta itemProp="name" content="متراژ" />
//             <meta itemProp="value" content={property.additionalInformation || ''} />
//           </div>
          
//           <div itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
//             <meta itemProp="name" content="سال ساخت" />
//             <meta itemProp="value" content={property.constructionYear || ''} />
//           </div>
          
//           {property.countFloor > 0 && (
//             <div itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
//               <meta itemProp="name" content="تعداد طبقات" />
//               <meta itemProp="value" content={property.countFloor.toString()} />
//             </div>
//           )}

//           {/* امکانات */}
//           {property.isHasElevator && (
//             <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
//               <meta itemProp="name" content="آسانسور" />
//               <meta itemProp="value" content="true" />
//             </div>
//           )}
          
//           {property.isHasParking && (
//             <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
//               <meta itemProp="name" content="پارکینگ" />
//               <meta itemProp="value" content="true" />
//             </div>
//           )}
          
//           {property.isHasPool && (
//             <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
//               <meta itemProp="name" content="استخر" />
//               <meta itemProp="value" content="true" />
//             </div>
//           )}
          
//           {property.isHasStoreRoom && (
//             <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
//               <meta itemProp="name" content="انباری" />
//               <meta itemProp="value" content="true" />
//             </div>
//           )}
//         </div>

//         {/* ===== Open Graph و Twitter Cards ===== */}
//         <meta property="og:type" content="product" />
//         <meta property="og:title" content={property.title} />
//         <meta property="og:description" content={`خرید و فروش ${property.title} با ${property.additionalInformation} متر مربع مساحت در منطقه ${property.regionName}`} />
//         {property.imageUrl && property.imageUrl[0] && (
//           <meta property="og:image" content={property.imageUrl[0]} />
//         )}
//         <meta property="og:url" content={`https://yourdomain.com${getPropertyLink()}`} />
//         <meta property="og:locale" content="fa_IR" />
        
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={property.title} />
//         <meta name="twitter:description" content={`${property.additionalInformation} متری در ${property.regionName}`} />
//         {property.imageUrl && property.imageUrl[0] && (
//           <meta name="twitter:image" content={property.imageUrl[0]} />
//         )}

//         {/* ===== آیکون بوکمارک ===== */}
//         <div 
//           style={{
//             position: 'absolute',
//             top: '10px',
//             left: '10px',
//             zIndex: 20,
//             cursor: bookmarkLoading ? 'default' : 'pointer',
//             backgroundColor: 'white',
//             width: '32px',
//             height: '32px',
//             borderRadius: '50%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
//             transition: 'all 0.2s ease',
//             opacity: bookmarkLoading ? 0.7 : 1
//           }}
//           onClick={toggleBookmark}
//           onMouseEnter={(e) => {
//             if (!bookmarkLoading) {
//               e.currentTarget.style.transform = 'scale(1.1)';
//             }
//           }}
//           onMouseLeave={(e) => {
//             if (!bookmarkLoading) {
//               e.currentTarget.style.transform = 'scale(1)';
//             }
//           }}
//           title={isLoggedIn ? (isBookmarked ? 'حذف از بوک‌مارک‌ها' : 'افزودن به بوک‌مارک‌ها') : 'برای افزودن به بوک‌مارک وارد شوید'}
//         >
//           {bookmarkLoading ? (
//             <FaSpinner className="spinner" style={{ color: '#7d0000', fontSize: '14px' }} />
//           ) : (
//             <FontAwesomeIcon 
//               icon={isBookmarked ? fasBookmark : farBookmark} 
//               color={isBookmarked ? '#7d0000' : '#94a3b8'}
//               size="sm"
//             />
//           )}
//         </div>

//         {/* ===== بخش عکس ===== */}
//         <div style={{ 
//           position: 'relative', 
//           overflow: 'hidden',
//           height: '200px'
//         }}>
//           <div style={{ 
//             position: 'relative', 
//             overflow: 'hidden',
//             height: '200px'
//           }}>
//             <div style={{
//               transition: 'transform 0.6s cubic-bezier(0.25, 0.45, 0.45, 0.95)',
//               height: '100%',
//               width: '100%',
//               transformOrigin: 'center center'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = 'scale(1.1)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = 'scale(1)';
//             }}>
//               <ImageSlider 
//                 images={getPropertyImages()} 
//                 hotelName={property.title || ''}
//                 propertyId={property.id}
//                 alt={`تصویر ${property.title} به مساحت ${property.additionalInformation} متر مربع در منطقه ${property.regionName}`}
//               />
//             </div>
//           </div>
          
//           {/* تعداد عکس‌ها */}
//           {property.imageCount > 0 && (
//             <div style={{
//               position: 'absolute',
//               bottom: '8px',
//               left: '8px',
//               backgroundColor: 'rgba(0,0,0,0.6)',
//               color: 'white',
//               padding: '3px 8px',
//               borderRadius: '20px',
//               fontSize: '10px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '4px',
//               zIndex: 15,
//               backdropFilter: 'blur(2px)'
//             }}>
//               <FontAwesomeIcon icon={faCamera} size="xs" />
//               <span>{property.imageCount}</span>
//             </div>
//           )}
//         </div>

//         {/* ===== محتوای کارت ===== */}
//         <div style={{ padding: '12px 14px 14px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          
//           {/* عنوان - بهینه برای سئو */}
//           <h3 style={{
//             fontSize: '15px',
//             fontWeight: '700',
//             margin: 0,
//             color: '#1e293b',
//             overflow: 'hidden',
//             textOverflow: 'ellipsis',
//             whiteSpace: 'nowrap'
//           }}>
//             {property.title || `ملک مسکونی در ${property.regionName}`}
//           </h3>
          
//           {/* تاریخ ایجاد */}
//           {property.createdAtPersianRelative && (
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '4px',
//               fontSize: '10px',
//               color: '#94a3b8',
//               marginTop: '2px'
//             }}>
//               <span>🕒</span>
//               <span>{property.createdAtPersianRelative}</span>
//             </div>
//           )}
          
//           {/* موقعیت */}
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '4px',
//             color: '#64748b',
//             fontSize: '12px',
//             marginBottom: '2px'
//           }}>
//             <FontAwesomeIcon icon={faLocationDot} size="xs" color="#7d0000" />
//             <span style={{
//               whiteSpace: 'nowrap',
//               overflow: 'hidden',
//               textOverflow: 'ellipsis'
//             }}>
//               {property.regionName || 'منطقه نامشخص'}
//               {property.parentName && `, ${property.parentName}`}
//             </span>
//           </div>
          
//           {/* مشخصات */}
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(3, 1fr)',
//             gap: '4px',
//             backgroundColor: '#f8fafc',
//             padding: '8px 6px',
//             borderRadius: '8px',
//             border: '1px solid #eef2f6',
//             marginBottom: '2px'
//           }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#1e293b' }}>
//               <FontAwesomeIcon icon={faRuler} color="#7d0000" size="xs" />
//               <span>{property.additionalInformation || '---'}</span>
//             </div>
            
//             <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#1e293b' }}>
//               <FontAwesomeIcon icon={faCalendar} color="#7d0000" size="xs" />
//               <span>{property.constructionYear || '---'}</span>
//             </div>
            
//             {property.countFloor > 0 && (
//               <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#1e293b' }}>
//                 <FontAwesomeIcon icon={faBuilding} color="#7d0000" size="xs" />
//                 <span>{property.countFloor}</span>
//               </div>
//             )}
//           </div>
          
//           {/* امکانات */}
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '2px' }}>
//             {property.isHasElevator && (
//               <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
//                 <FontAwesomeIcon icon={faElevator} color="#7d0000" size="xs" />
//                 <span>آسانسور</span>
//               </span>
//             )}
//             {property.isHasParking && (
//               <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
//                 <FontAwesomeIcon icon={faParking} color="#7d0000" size="xs" />
//                 <span>پارکینگ</span>
//               </span>
//             )}
//             {property.isHasPool && (
//               <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
//                 <FontAwesomeIcon icon={faSwimmingPool} color="#7d0000" size="xs" />
//                 <span>استخر</span>
//               </span>
//             )}
//             {property.isHasStoreRoom && (
//               <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
//                 <FontAwesomeIcon icon={faBoxes} color="#7d0000" size="xs" />
//                 <span>انباری</span>
//               </span>
//             )}
//           </div>
          
//           {/* قیمت */}
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             borderTop: '1px solid #eef2f6',
//             paddingTop: '10px',
//             marginTop: '4px'
//           }}>
//             <div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
//                 <FontAwesomeIcon icon={faTag} size="xs" color="#94a3b8" />
//                 <span style={{ fontSize: '10px', color: '#64748b' }}>قیمت</span>
//               </div>
//               <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px', flexWrap: 'wrap' }}>
//                 <span style={{ fontSize: '16px', fontWeight: '800', color: '#7d0000' }}>
//                   {property.price ? formatPrice(property.price) : 'تماس بگیرید'}
//                 </span>
//                 {property.price && (
//                   <span style={{ fontSize: '9px', color: '#94a3b8' }}>تومان</span>
//                 )}
//               </div>
//             </div>
            
//             <button 
//               style={{
//                 backgroundColor: '#7d0000',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '30px',
//                 padding: '7px 16px',
//                 fontSize: '11px',
//                 fontWeight: '600',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s ease',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '4px'
//               }}
//               onClick={(e) => {
//                 e.preventDefault();
//                 // تابع تماس
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.backgroundColor = '#a30000';
//                 e.target.style.transform = 'translateY(-2px)';
//                 e.target.style.boxShadow = '0 4px 12px rgba(125, 0, 0, 0.3)';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.backgroundColor = '#7d0000';
//                 e.target.style.transform = 'translateY(0)';
//                 e.target.style.boxShadow = 'none';
//               }}
//             >
//               <span>📞</span>
//               تماس
//             </button>
//           </div>
//         </div>
//       </Link>
//     </>
//   );
// };

// export default RealEstateCard;

// RealEstateCard.jsx - نسخه نهایی بهینه
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import { FaSpinner } from 'react-icons/fa';

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
  faTag,
  faStar as fasStar,
  faBookmark as fasBookmark  ,faKey,           // ← جدید - آیکون کلید برای رهن و اجاره
  faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';

// library.add(faElevator, faParking, faSwimmingPool, faBoxes, faLocationDot, faRuler, faBuilding, faCalendar, faCamera, faTag, fasStar, fasBookmark);
library.add(faElevator, faParking, faSwimmingPool, faBoxes, faLocationDot, faRuler, faBuilding, faCalendar, faCamera, faTag, fasStar, fasBookmark, faKey, faMoneyBillWave);

const RealEstateCard = ({ property, onOpenLoginModal }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ===== بررسی لاگین =====
  useEffect(() => {

//     if (property.title == "لوکس سنتر"){
// alert(1)
// console.log(property)
//     }
       if (property && property.hasBookMark !== undefined && property.hasBookMark == true) {
        
      setIsBookmarked(true);
    }
    const checkLogin = () => {
      const token = localStorage.getItem('auth_token');
      setIsLoggedIn(!!token);
    };
    
    checkLogin();
    
    if (property && property.inBookMark !== undefined) {
      setIsBookmarked(property.inBookMark === true);
    }
    
    window.addEventListener('authChange', checkLogin);
    window.addEventListener('storage', checkLogin);
    
    return () => {
      window.removeEventListener('authChange', checkLogin);
      window.removeEventListener('storage', checkLogin);
    };
  }, [property]);

  // ===== تابع بوک‌مارک =====
  const toggleBookmark = useCallback(async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!isLoggedIn) {
      if (onOpenLoginModal) {
        onOpenLoginModal('real-estate-card');
      }
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
        // دیسپچ ایونت برای به‌روزرسانی سایر کامپوننت‌ها
        window.dispatchEvent(new Event('bookmarkChanged'));
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ خطا در بوک‌مارک:', errorData);
        alert('مشکل در ذخیره بوک‌مارک. لطفاً دوباره تلاش کنید.');
      }
    } catch (error) {
      console.error('❌ خطا در ارتباط با سرور:', error);
      alert('مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
    } finally {
      setBookmarkLoading(false);
    }
  }, [isLoggedIn, property, bookmarkLoading, onOpenLoginModal]);

  // ===== تابع تماس =====
  const handleContact = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (property.phoneNumber) {
      window.location.href = `tel:${property.phoneNumber}`;
    } else {
      // هدایت به صفحه تماس با مشاور
      navigate(`/contact/${property.id}`);
    }
  }, [property, navigate]);

  if (!property) return null;

  const formatPrice = (price) => {
    if (!price) return null;
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  // ===== تشخیص نوع ملک =====
  const isRental = property.categoryType === 2;
  const isSale = property.categoryType === 1;

  // ===== عنوان قیمت =====
  const getPriceLabel = () => {
    if (isRental) return 'رهن ';
    if (isSale) return 'قیمت فروش';
    return 'قیمت';
  };
    // ===== نمایش قیمت بر اساس نوع =====
  const getPriceDisplay = () => {
    if (isRental) {
      const deposit = property.deposit || 0;
      const rent = property.rent || 0;
      
      if (deposit === 0 && rent === 0) {
        return 'تماس بگیرید';
      }
      
      let parts = [];
      if (deposit > 0) {
        parts.push(`${formatPrice(deposit)} رهن`);
      }
      // if (rent > 0) {
      //   parts.push(`${formatPrice(rent)} اجاره`);
      // }
      
      return parts.length > 0 ? parts.join(' + ') : 'تماس بگیرید';
    }
    
    // فروش
    if (!property.price || property.price === 0) {
      return 'تماس بگیرید';
    }
    return formatPrice(property.price);
  };
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

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    transition: 'all 0.3s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    border: '1px solid #e9ecef',
    textDecoration: 'none',
    color: 'inherit'
  };

  const getPropertyLink = () => {
    const createSlug = (title) => {
      if (!title) return '';
      return title
        .replace(/[^\w\s\u0600-\u06FF]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);
    };
    
    const slug = createSlug(property.title);
    return `/property/${property.id}/${slug}`;
  };

  // ===== ساخت عنوان بهینه برای سئو =====
  const getSeoTitle = () => {
    const parts = [];
    if (property.title) parts.push(property.title);
    if (property.additionalInformation) parts.push(`${property.additionalInformation} متری`);
    if (property.regionName) parts.push(property.regionName);
    return parts.join(' - ') || 'ملک مسکونی';
  };

  // ===== ساخت توضیحات بهینه برای سئو =====
  const getSeoDescription = () => {
    const parts = [];
    if (property.title) parts.push(property.title);
    if (property.additionalInformation) parts.push(`مساحت ${property.additionalInformation} متر مربع`);
    if (property.regionName) parts.push(`منطقه ${property.regionName}`);
    if (property.constructionYear) parts.push(`ساخت ${property.constructionYear}`);
        if (isRental) parts.push('رهن و اجاره');
    if (isSale) parts.push('فروش');
    return `خرید و فروش ${parts.join(' - ')}`;
  };

  return (
    <article 
      style={{ height: '100%' }}
      itemScope 
      itemType="https://schema.org/Product"
    >
      {/* ===== میکرو‌داده‌های Schema.org ===== */}
      <meta itemProp="name" content={getSeoTitle()} />
      <meta itemProp="description" content={getSeoDescription()} />
      <meta itemProp="sku" content={property.id} />
      <meta itemProp="brand" content="املاک مستربلیط" />
      <meta itemProp="category" content="آپارتمان فروشی" />
      
      {/* تصویر */}
      {property.imageUrl && property.imageUrl[0] && (
        <meta itemProp="image" content={property.imageUrl[0]} />
      )}
      
      {/* آدرس */}
      <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
        <meta itemProp="addressLocality" content={property.regionName || ''} />
        <meta itemProp="addressRegion" content={property.parentName || ''} />
        <meta itemProp="addressCountry" content="IR" />
      </div>

      {/* موقعیت جغرافیایی */}
      {property.latitude && property.longitude && (
        <div itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates">
          <meta itemProp="latitude" content={property.latitude} />
          <meta itemProp="longitude" content={property.longitude} />
        </div>
      )}

      {/* تاریخ انتشار */}
      {property.createdAt && (
        <meta itemProp="datePublished" content={property.createdAt} />
      )}
      {property.updatedAt && (
        <meta itemProp="dateModified" content={property.updatedAt} />
      )}

      {/* قیمت */}
      {property.price && (
        <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <meta itemProp="price" content={property.price.toString()} />
          <meta itemProp="priceCurrency" content="IRR" />
          <meta itemProp="availability" content="https://schema.org/InStock" />
          <meta itemProp="priceValidUntil" content={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]} />
        </div>
      )}

      {/* مشخصات اضافی */}
      <div itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
        <meta itemProp="name" content="متراژ" />
        <meta itemProp="value" content={property.additionalInformation || ''} />
      </div>
      
      <div itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
        <meta itemProp="name" content="سال ساخت" />
        <meta itemProp="value" content={property.constructionYear || ''} />
      </div>
      
      {property.countFloor > 0 && (
        <div itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
          <meta itemProp="name" content="تعداد طبقات" />
          <meta itemProp="value" content={property.countFloor.toString()} />
        </div>
      )}

      {/* امکانات */}
      {property.isHasElevator && (
        <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
          <meta itemProp="name" content="آسانسور" />
          <meta itemProp="value" content="true" />
        </div>
      )}
      
      {property.isHasParking && (
        <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
          <meta itemProp="name" content="پارکینگ" />
          <meta itemProp="value" content="true" />
        </div>
      )}
      
      {property.isHasPool && (
        <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
          <meta itemProp="name" content="استخر" />
          <meta itemProp="value" content="true" />
        </div>
      )}
      
      {property.isHasStoreRoom && (
        <div itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
          <meta itemProp="name" content="انباری" />
          <meta itemProp="value" content="true" />
        </div>
      )}

      {/* ===== لینک کارت ===== */}
      <Link 
        to={getPropertyLink()}
        style={cardStyle}
        aria-label={`مشاهده ${getSeoTitle()}`}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(125, 0, 0, 0.12)';
          e.currentTarget.style.borderColor = '#7d0000';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
          e.currentTarget.style.borderColor = '#e9ecef';
        }}
      >
        {/* ===== آیکون بوکمارک ===== */}
        <div 
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 20,
            cursor: bookmarkLoading ? 'default' : 'pointer',
            backgroundColor: 'white',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            transition: 'all 0.2s ease',
            opacity: bookmarkLoading ? 0.7 : 1
          }}
          onClick={toggleBookmark}
          onMouseEnter={(e) => {
            if (!bookmarkLoading) {
              e.currentTarget.style.transform = 'scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (!bookmarkLoading) {
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
          title={isLoggedIn ? (isBookmarked ? 'حذف از بوک‌مارک‌ها' : 'افزودن به بوک‌مارک‌ها') : 'برای افزودن به بوک‌مارک وارد شوید'}
          role="button"
          aria-label={isLoggedIn ? (isBookmarked ? 'حذف از بوک‌مارک' : 'افزودن به بوک‌مارک') : 'ورود برای بوک‌مارک'}
        >
          {bookmarkLoading ? (
            <FaSpinner className="spinner" style={{ color: '#7d0000', fontSize: '14px' }} />
          ) : (
            <FontAwesomeIcon 
              icon={isBookmarked ? fasBookmark : farBookmark} 
              color={isBookmarked ? '#7d0000' : '#94a3b8'}
              size="sm"
            />
          )}
        </div>

        {/* ===== بخش عکس ===== */}
        <div style={{ 
          position: 'relative', 
          overflow: 'hidden',
          height: '200px'
        }}>
          <div style={{ 
            position: 'relative', 
            overflow: 'hidden',
            height: '200px'
          }}>
            <div style={{
              transition: 'transform 0.6s cubic-bezier(0.25, 0.45, 0.45, 0.95)',
              height: '100%',
              width: '100%',
              transformOrigin: 'center center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}>
              <ImageSlider 
                images={getPropertyImages()} 
                hotelName={property.title || ''}
                propertyId={property.id}
                alt={`تصویر ${getSeoTitle()}`}
                loading="lazy"
              />
            </div>
          </div>
          
          {/* تعداد عکس‌ها */}
          {property.imageCount > 0 && (
            <div 
              style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white',
                padding: '3px 8px',
                borderRadius: '20px',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                zIndex: 15,
                backdropFilter: 'blur(2px)'
              }}
              aria-label={`${property.imageCount} تصویر`}
            >
              <FontAwesomeIcon icon={faCamera} size="xs" aria-hidden="true" />
              <span>{property.imageCount}</span>
            </div>
          )}
        </div>

        {/* ===== محتوای کارت ===== */}
        <div style={{ padding: '12px 14px 14px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          
          {/* عنوان - بهینه برای سئو */}
          <h3 style={{
            fontSize: '15px',
            fontWeight: '700',
            margin: 0,
            color: '#1e293b',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {getSeoTitle()}
          </h3>
          
          {/* تاریخ ایجاد */}
          {property.createdAtPersianRelative && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '10px',
              color: '#94a3b8',
              marginTop: '2px'
            }}>
              <span role="img" aria-label="تاریخ">🕒</span>
              <span>{property.createdAtPersianRelative}</span>
            </div>
          )}
          
          {/* موقعیت */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#64748b',
            fontSize: '12px',
            marginBottom: '2px'
          }}>
            <FontAwesomeIcon icon={faLocationDot} size="xs" color="#7d0000" aria-hidden="true" />
            <span style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {property.regionName || 'منطقه نامشخص'}
              {property.parentName && `, ${property.parentName}`}
            </span>
          </div>
          
          {/* مشخصات */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '4px',
            backgroundColor: '#f8fafc',
            padding: '8px 6px',
            borderRadius: '8px',
            border: '1px solid #eef2f6',
            marginBottom: '2px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#1e293b' }}>
              <FontAwesomeIcon icon={faRuler} color="#7d0000" size="xs" aria-hidden="true" />
              <span>{property.squareMeter || '---'}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#1e293b' }}>
              <FontAwesomeIcon icon={faCalendar} color="#7d0000" size="xs" aria-hidden="true" />
              <span>{property.constructionYear || '---'}</span>
            </div>
            
            {property.countFloor > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#1e293b' }}>
                <FontAwesomeIcon icon={faBuilding} color="#7d0000" size="xs" aria-hidden="true" />
                <span>{property.countFloor}</span>
              </div>
            )}
          </div>
          
          {/* امکانات */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '2px' }}>
            {property.isHasElevator && (
              <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
                <FontAwesomeIcon icon={faElevator} color="#7d0000" size="xs" aria-hidden="true" />
                <span>آسانسور</span>
              </span>
            )}
            {property.isHasParking && (
              <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
                <FontAwesomeIcon icon={faParking} color="#7d0000" size="xs" aria-hidden="true" />
                <span>پارکینگ</span>
              </span>
            )}
            {property.isHasPool && (
              <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
                <FontAwesomeIcon icon={faSwimmingPool} color="#7d0000" size="xs" aria-hidden="true" />
                <span>استخر</span>
              </span>
            )}
            {property.isHasStoreRoom && (
              <span style={{ backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '16px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0' }}>
                <FontAwesomeIcon icon={faBoxes} color="#7d0000" size="xs" aria-hidden="true" />
                <span>انباری</span>
              </span>
            )}
          </div>
          
          {/* قیمت */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #eef2f6',
            paddingTop: '10px',
            marginTop: '4px'
          }}>
    
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
      <FontAwesomeIcon 
                  icon={isRental ? faKey : faTag} 
                  size="xs" 
                  color="#94a3b8" 
                  aria-hidden="true" 
                  style={{ flexShrink: 0 }}
                />
                <span style={{ fontSize: '10px', color: '#64748b' }}>{getPriceLabel()}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#7d0000' }}>
                    {getPriceDisplay()}
                </span>
                {property.price && (
                  <span style={{ fontSize: '9px', color: '#94a3b8' }}>تومان</span>
                )}
                              {isRental && property.rent && property.rent > 0 && (
                <div style={{ 
                  fontSize: '10px', 
                  color: '#64748b', 
                  marginTop: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  overflow: 'hidden',
                  width: '100%'
                }}>
                  <FontAwesomeIcon icon={faMoneyBillWave} size="xs" color="#94a3b8" style={{ flexShrink: 0 }} />
                  <span style={{ 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    اجاره ماهانه: {formatPrice(property.rent)} تومان
                  </span>
                </div>
              )}
              </div>
        

    
           
         
            
            {/* <button 
              style={{
                backgroundColor: '#7d0000',
                color: 'white',
                border: 'none',
                borderRadius: '30px',
                padding: '7px 16px',
                fontSize: '11px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              onClick={handleContact}
              aria-label={`تماس با مشاور برای ${getSeoTitle()}`}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#a30000';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(125, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#7d0000';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span aria-hidden="true">📞</span>
              تماس
            </button> */}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default RealEstateCard;