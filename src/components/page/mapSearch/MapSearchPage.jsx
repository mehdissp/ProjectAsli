
// // // // export default MapSearchPage;

// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
// // // import L from 'leaflet';
// // // import 'leaflet/dist/leaflet.css';
// // // import { 
// // //   FaArrowRight, 
// // //   FaMapMarkerAlt, 
// // //   FaSpinner, 
// // //   FaHome, 
// // //   FaRuler, 
// // //   FaBed, 
// // //   FaBath, 
// // //   FaImage, 
// // //   FaMapPin,
// // //   FaRulerCombined 
// // // } from 'react-icons/fa';
// // // import { realEstateService } from '../../../services/realEstate';
// // // import './MapSearchPage.css';

// // // // رفع مشکل آیکون‌های Leaflet
// // // delete L.Icon.Default.prototype._getIconUrl;
// // // L.Icon.Default.mergeOptions({
// // //   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
// // //   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
// // //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// // // });

// // // // آیکون قرمز خوشگل
// // // const redMarker = new L.Icon({
// // //   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
// // //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// // //   iconSize: [25, 41],
// // //   iconAnchor: [12, 41],
// // //   popupAnchor: [1, -34],
// // //   shadowSize: [41, 41]
// // // });

// // // // Base URL برای تصاویر
// // // const baseImageUrl = 'https://localhost:7178';

// // // const MapSearchPage = () => {
// // //   const navigate = useNavigate();
// // //   const [properties, setProperties] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [selectedProperty, setSelectedProperty] = useState(null);
// // //   const [selectedCity, setSelectedCity] = useState(null);
// // //   const [totalCount, setTotalCount] = useState(0);
// // //   const [mapCenter, setMapCenter] = useState([35.7436, 51.4095]);

// // //   // تابع برای ساخت آدرس کامل تصویر
// // //   const getFullImageUrl = (imagePath) => {
// // //     if (!imagePath) return null;
// // //     // اگر آدرس کامل است (با http یا https شروع می‌شود) همان را برگردان
// // //     if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
// // //       return imagePath;
// // //     }
// // //     // در غیر این صورت baseUrl را به اول آن اضافه کن
// // //     return `${baseImageUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
// // //   };

// // //   useEffect(() => {
// // //     const savedCity = localStorage.getItem('selectedCity');
// // //     if (savedCity) {
// // //       try {
// // //         const city = JSON.parse(savedCity);
// // //         setSelectedCity(city);
// // //       } catch (e) {
// // //         setSelectedCity({ id: 1, name: 'تهران' });
// // //       }
// // //     } else {
// // //       setSelectedCity({ id: 1, name: 'تهران' });
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     if (selectedCity && selectedCity.id) {
// // //       loadProperties();
// // //     }
// // //   }, [selectedCity]);

// // //   const loadProperties = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await realEstateService.GetrealEstateMap(selectedCity.id, 1, 50);
// // //       const responseData = response.data || response;
      
// // //       if (responseData && responseData.items) {
// // //         const items = responseData.items || [];
// // //         const totalCountValue = responseData.totalCount || 0;
        
// // //         const propertiesWithLocation = items.filter(item => {
// // //           const lat = parseFloat(item.lat);
// // //           const lng = parseFloat(item.lng);
// // //           return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
// // //         }).map(item => ({
// // //           id: item.id,
// // //           title: item.title || 'بدون عنوان',
// // //           lat: parseFloat(item.lat),
// // //           lng: parseFloat(item.lng),
// // //           price: item.price || 0,
// // //           priceFormatted: item.price ? item.price.toLocaleString("fa-IR") : "۰",
// // //           area: item.meterage || item.area || 0,
// // //           rooms: item.roomCount || 0,
// // //           bathrooms: item.bathroomCount || 1,
// // //           regionName: item.regionName || item.neighborhood || 'نامشخص',
// // //           type: item.typeCate || 'فروش',
// // //           image: getFullImageUrl(item.address || item.imageUrl || item.mainImage || null),
// // //           description: item.description || 'توضیحاتی برای این ملک موجود نیست.',
// // //           constructionYear: item.constructionYear || '---',
// // //           floorCount: item.countFloor || '---'
// // //         }));
        
// // //         if (propertiesWithLocation.length > 0) {
// // //           setMapCenter([propertiesWithLocation[0].lat, propertiesWithLocation[0].lng]);
// // //         }
        
// // //         setProperties(propertiesWithLocation);
// // //         setTotalCount(totalCountValue);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error loading properties:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleMarkerClick = (property) => {
// // //     setSelectedProperty(property);
// // //   };
// // //   const getPropertyLink = (propertyId) => {
// // //   // ساخت slug از عنوان ملک
// // //   const createSlug = (title) => {
// // //     if (!title) return '';
// // //     return title
// // //       .replace(/[^\w\s\u0600-\u06FF]/g, '') // حذف علائم (پشتیبانی از فارسی)
// // //       .replace(/\s+/g, '-')
// // //       .substring(0, 50);
// // //   };
  
// // //   const slug = createSlug(propertyId.title);
  
// // //   // اولویت با آدرس جدید سئو شده (اگر روتر اضافه شده باشد)
// // //   // در غیر این صورت آدرس قبلی کار می‌کند
// // //   return `/property/${propertyId.id}/${slug}`;
// // // };

// // //   const handleViewDetail = (propertyId) => {
// // //     navigate(getPropertyLink(propertyId))
// // //    // navigate(`/RealEstateDetailPageItem?id=${propertyId}`);
// // //   };

// // //   if (!selectedCity) {
// // //     return (
// // //       <div className="map-page">
// // //         <div className="map-header">
// // //           <button className="back-btn" onClick={() => navigate(-1)}>← بازگشت</button>
// // //           <div className="city-name">
// // //             <FaMapMarkerAlt />
// // //             <span>در حال بارگذاری...</span>
// // //           </div>
// // //         </div>
// // //         <div className="loading-container">
// // //           <FaSpinner className="spinner" />
// // //           <p>در حال بارگذاری...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="map-page">
// // //       <div className="map-header">
// // //         <button className="back-btn" onClick={() => navigate(-1)}>← بازگشت</button>
// // //         <div className="city-name">
// // //           <FaMapMarkerAlt />
// // //           <span>{selectedCity.name}</span>
// // //         </div>
// // //         <div className="property-count">
// // //           {totalCount} ملک
// // //         </div>
// // //       </div>

// // //       <div className="map-container">
// // //         {loading ? (
// // //           <div className="loading-container">
// // //             <FaSpinner className="spinner" />
// // //             <p>در حال بارگذاری املاک...</p>
// // //           </div>
// // //         ) : (
// // //           <MapContainer
// // //             key={mapCenter.join(',')}
// // //             center={mapCenter}
// // //             zoom={13}
// // //             style={{ height: '100%', width: '100%' }}
// // //             zoomControl={true}
// // //           >
// // //             <TileLayer
// // //               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// // //               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // //             />
            
// // //             {properties.map((property) => (
// // //               <Marker
// // //                 key={property.id}
// // //                 position={[property.lat, property.lng]}
// // //                 icon={redMarker}
// // //                 eventHandlers={{
// // //                   click: () => handleMarkerClick(property)
// // //                 }}
// // //               >
// // //                 {/* تولتیپ خوشگل با اسم و قیمت */}
// // //                 <Tooltip 
// // //                   direction="top" 
// // //                   offset={[0, -20]} 
// // //                   opacity={0.9}
// // //                   className="custom-tooltip"
// // //                   permanent={false}
// // //                   sticky
// // //                 >
// // //                   <span className="tooltip-title">{property.title}</span>
// // //                   <br />
// // //                   <span className="tooltip-price">{property.priceFormatted} تومان</span>
// // //                 </Tooltip>
                
// // //                 {/* پاپاپ خوشگل */}
// // //                 <Popup>
// // //                   <div className="custom-popup">
// // //                     <div className="popup-image">
// // //                       {property.image ? (
// // //                         <img src={property.image} alt={property.title} />
// // //                       ) : (
// // //                         <div className="popup-image-placeholder">
// // //                           <FaImage />
// // //                           <span>{property.title}</span>
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                     <div className="popup-title">{property.title}</div>
// // //                     <div className="popup-price">{property.priceFormatted} تومان</div>
// // //                     <div className="popup-info">
// // //                       {property.area > 0 && (
// // //                         <span><FaRulerCombined /> {property.area} متر</span>
// // //                       )}
// // //                       {property.rooms > 0 && (
// // //                         <span><FaBed /> {property.rooms} خواب</span>
// // //                       )}
// // //                     </div>
// // //                     <div className="popup-location">
// // //                       <FaMapPin /> {property.regionName}
// // //                     </div>
// // //                     <button 
// // //                       className="popup-btn-custom"
// // //                       onClick={() => handleViewDetail(property)}
// // //                     >
// // //                       مشاهده جزئیات <FaArrowRight />
// // //                     </button>
// // //                   </div>
// // //                 </Popup>
// // //               </Marker>
// // //             ))}
// // //           </MapContainer>
// // //         )}
// // //       </div>

// // //       {/* پنل پایین */}
// // //       {selectedProperty && (
// // //         <div className="bottom-panel">
// // //           <div className="panel-header">
// // //             <h3>{selectedProperty.title}</h3>
// // //             <button className="panel-close" onClick={() => setSelectedProperty(null)}>✕</button>
// // //           </div>
          
// // //           <div className="panel-content">
// // //             <div className="property-image">
// // //               {selectedProperty.image ? (
// // //                 <img src={selectedProperty.image} alt={selectedProperty.title} />
// // //               ) : (
// // //                 <div className="image-placeholder">
// // //                   <div>
// // //                     <FaImage />
// // //                     <span>بدون تصویر</span>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>
            
// // //             <div className="property-tags">
// // //               <span className="tag primary">{selectedProperty.type}</span>
// // //               <span className="tag">{selectedProperty.regionName}</span>
// // //             </div>
            
// // //             <div className="price-section">
// // //               <div className="price-label">قیمت کل</div>
// // //               <div className="price-value">
// // //                 {selectedProperty.priceFormatted}
// // //                 <span className="price-unit">تومان</span>
// // //               </div>
// // //             </div>
            
// // //             <div className="features-grid">
// // //               <div className="feature-item">
// // //                 <span className="feature-icon">📏</span>
// // //                 <div className="feature-label">متراژ</div>
// // //                 <div className="feature-value">{selectedProperty.area} متر</div>
// // //               </div>
// // //               <div className="feature-item">
// // //                 <span className="feature-icon">🛏️</span>
// // //                 <div className="feature-label">اتاق</div>
// // //                 <div className="feature-value">{selectedProperty.rooms} عدد</div>
// // //               </div>
// // //               <div className="feature-item">
// // //                 <span className="feature-icon">🚽</span>
// // //                 <div className="feature-label">سرویس بهداشتی</div>
// // //                 <div className="feature-value">{selectedProperty.bathrooms} عدد</div>
// // //               </div>
// // //               <div className="feature-item">
// // //                 <span className="feature-icon">🏗️</span>
// // //                 <div className="feature-label">سال ساخت</div>
// // //                 <div className="feature-value">{selectedProperty.constructionYear}</div>
// // //               </div>
// // //             </div>
            
// // //             <div className="info-row">
// // //               <span className="info-label">منطقه</span>
// // //               <span className="info-value">{selectedProperty.regionName}</span>
// // //             </div>
// // //             <div className="info-row">
// // //               <span className="info-label">طبقات</span>
// // //               <span className="info-value">{selectedProperty.floorCount}</span>
// // //             </div>
            
// // //             <div className="description">
// // //               {selectedProperty.description}
// // //             </div>
            
// // //             <button 
// // //               className="detail-btn"
// // //               onClick={() => handleViewDetail(selectedProperty.id)}
// // //             >
// // //               مشاهده جزئیات بیشتر
// // //               <FaArrowRight />
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default MapSearchPage;

// // // import React, { useState, useEffect, useCallback, useMemo } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
// // // import L from 'leaflet';
// // // import 'leaflet/dist/leaflet.css';
// // // import { 
// // //   FaArrowRight, 
// // //   FaMapMarkerAlt, 
// // //   FaSpinner, 
// // //   FaHome, 
// // //   FaRuler, 
// // //   FaBed, 
// // //   FaBath, 
// // //   FaImage, 
// // //   FaMapPin,
// // //   FaRulerCombined 
// // // } from 'react-icons/fa';
// // // import { realEstateService } from '../../../services/realEstate';
// // // import './MapSearchPage.css';

// // // // رفع مشکل آیکون‌های Leaflet
// // // delete L.Icon.Default.prototype._getIconUrl;
// // // L.Icon.Default.mergeOptions({
// // //   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
// // //   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
// // //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// // // });

// // // // آیکون قرمز خوشگل
// // // const redMarker = new L.Icon({
// // //   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
// // //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// // //   iconSize: [25, 41],
// // //   iconAnchor: [12, 41],
// // //   popupAnchor: [1, -34],
// // //   shadowSize: [41, 41]
// // // });

// // // // Base URL برای تصاویر
// // // const baseImageUrl = 'https://localhost:7178';

// // // const MapSearchPage = () => {
// // //   const navigate = useNavigate();
// // //   const [properties, setProperties] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [selectedProperty, setSelectedProperty] = useState(null);
// // //   const [selectedCity, setSelectedCity] = useState(null);
// // //   const [totalCount, setTotalCount] = useState(0);
// // //   const [mapCenter, setMapCenter] = useState([35.7436, 51.4095]);

// // //   // تابع برای ساخت slug بهینه برای سئو
// // //   const createSeoSlug = useCallback((title, id) => {
// // //     if (!title) return `${id}`;
    
// // //     // حذف کاراکترهای خاص و تبدیل به فرمت مناسب برای سئو
// // //     const slug = title
// // //       .replace(/[^\w\s\u0600-\u06FF]/g, '') // حذف علائم نگارشی
// // //       .replace(/\s+/g, '-') // تبدیل فاصله به خط تیره
// // //       .replace(/-+/g, '-') // حذف خط تیره‌های تکراری
// // //       .trim()
// // //       .substring(0, 60); // محدودیت طول برای سئو
    
// // //     return `${slug}-${id}`;
// // //   }, []);

// // //   // تابع برای ساخت آدرس کامل تصویر
// // //   const getFullImageUrl = useCallback((imagePath) => {
// // //     if (!imagePath) return null;
// // //     if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
// // //       return imagePath;
// // //     }
// // //     return `${baseImageUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
// // //   }, []);


// // //   const getPropertyLink = (propertyId) => {
// // //   // ساخت slug از عنوان ملک
// // //   const createSlug = (title) => {
// // //     if (!title) return '';
// // //     return title
// // //       .replace(/[^\w\s\u0600-\u06FF]/g, '') // حذف علائم (پشتیبانی از فارسی)
// // //       .replace(/\s+/g, '-')
// // //       .substring(0, 50);
// // //   };
  
// // //   const slug = createSlug(propertyId.title);
  
// // //   // اولویت با آدرس جدید سئو شده (اگر روتر اضافه شده باشد)
// // //   // در غیر این صورت آدرس قبلی کار می‌کند
// // //   return `/property/${propertyId.id}/${slug}`;
// // // };

// // //   // تابع برای ساخت لینک سئو شده
// // //   // const getPropertyLink = useCallback((property) => {
// // //   //   const slug = createSeoSlug(property.title, property.id);
// // //   //   return `/property/${slug}`;
// // //   // }, [createSeoSlug]);

// // //   // تابع برای فرمت قیمت
// // //   const formatPrice = useCallback((price) => {
// // //     if (!price || price === 0) return 'تماس بگیرید';
// // //     return price.toLocaleString("fa-IR");
// // //   }, []);

// // //   useEffect(() => {
// // //     const savedCity = localStorage.getItem('selectedCity');
// // //     if (savedCity) {
// // //       try {
// // //         const city = JSON.parse(savedCity);
// // //         setSelectedCity(city);
// // //         // به روزرسانی title صفحه برای سئو
// // //         document.title = `نقشه املاک ${city.name} | سامانه املاک`;
// // //       } catch (e) {
// // //         setSelectedCity({ id: 1, name: 'تهران' });
// // //         document.title = 'نقشه املاک تهران | سامانه املاک';
// // //       }
// // //     } else {
// // //       setSelectedCity({ id: 1, name: 'تهران' });
// // //       document.title = 'نقشه املاک تهران | سامانه املاک';
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     if (selectedCity && selectedCity.id) {
// // //       loadProperties();
// // //     }
// // //   }, [selectedCity]);

// // //   const loadProperties = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await realEstateService.GetrealEstateMap(selectedCity.id, 1, 50);
// // //       const responseData = response.data || response;
      
// // //       if (responseData && responseData.items) {
// // //         const items = responseData.items || [];
// // //         const totalCountValue = responseData.totalCount || 0;
        
// // //         const propertiesWithLocation = items.filter(item => {
// // //           const lat = parseFloat(item.lat);
// // //           const lng = parseFloat(item.lng);
// // //           return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
// // //         }).map(item => ({
// // //           id: item.id,
// // //           title: item.title || 'بدون عنوان',
// // //           lat: parseFloat(item.lat),
// // //           lng: parseFloat(item.lng),
// // //           price: item.price || 0,
// // //           priceFormatted: formatPrice(item.price),
// // //           area: item.meterage || item.area || 0,
// // //           rooms: item.roomCount || 0,
// // //           bathrooms: item.bathroomCount || 1,
// // //           regionName: item.regionName || item.neighborhood || 'نامشخص',
// // //           type: item.typeCate || 'فروش',
// // //           image: getFullImageUrl(item.address || item.imageUrl || item.mainImage || null),
// // //           description: item.description || `خرید و فروش ${item.title} در منطقه ${item.regionName || selectedCity.name}`,
// // //           constructionYear: item.constructionYear || '---',
// // //           floorCount: item.countFloor || '---',
// // //           slug: createSeoSlug(item.title, item.id)
// // //         }));
        
// // //         if (propertiesWithLocation.length > 0) {
// // //           setMapCenter([propertiesWithLocation[0].lat, propertiesWithLocation[0].lng]);
// // //         }
        
// // //         setProperties(propertiesWithLocation);
// // //         setTotalCount(totalCountValue);
        
// // //         // به روزرسانی meta description برای سئو
// // //         const metaDescription = document.querySelector('meta[name="description"]');
// // //         if (metaDescription) {
// // //           metaDescription.setAttribute('content', `نمایش ${totalCountValue} ملک در نقشه ${selectedCity.name} | مشاهده آگهی‌های خرید و فروش و اجاره ملک`);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Error loading properties:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleMarkerClick = useCallback((property) => {
// // //     setSelectedProperty(property);
// // //     // به روزرسانی title هنگام انتخاب ملک
// // //     document.title = `${property.title} | نقشه املاک ${selectedCity?.name}`;
// // //   }, [selectedCity]);

// // //   // const handleViewDetail = useCallback((property) => {
// // //   //   const link = getPropertyLink(property);
// // //   //   navigate(link);
// // //   // }, [getPropertyLink, navigate]);
// // //     const handleViewDetail = (propertyId) => {
// // //     navigate(getPropertyLink(propertyId))
// // //    // navigate(`/RealEstateDetailPageItem?id=${propertyId}`);
// // //   };

// // //   // متادیتاهای سئو برای صفحه
// // //   const seoData = useMemo(() => ({
// // //     title: `نقشه املاک ${selectedCity?.name || 'تهران'} | جستجوی پیشرفته ملک`,
// // //     description: `جستجوی آسان املاک در نقشه ${selectedCity?.name}. مشاهده موقعیت دقیق ملک‌های فروش و رهن و اجاره با امکانات پیشرفته`,
// // //     keywords: `نقشه املاک, خرید ملک در ${selectedCity?.name}, فروش آپارتمان, رهن و اجاره, مشاور املاک`
// // //   }), [selectedCity]);

// // //   // به روزرسانی متادیتاها
// // //   useEffect(() => {
// // //     document.title = seoData.title;
    
// // //     let metaDescription = document.querySelector('meta[name="description"]');
// // //     if (!metaDescription) {
// // //       metaDescription = document.createElement('meta');
// // //       metaDescription.setAttribute('name', 'description');
// // //       document.head.appendChild(metaDescription);
// // //     }
// // //     metaDescription.setAttribute('content', seoData.description);
    
// // //     let metaKeywords = document.querySelector('meta[name="keywords"]');
// // //     if (!metaKeywords) {
// // //       metaKeywords = document.createElement('meta');
// // //       metaKeywords.setAttribute('name', 'keywords');
// // //       document.head.appendChild(metaKeywords);
// // //     }
// // //     metaKeywords.setAttribute('content', seoData.keywords);
// // //   }, [seoData]);

// // //   if (!selectedCity) {
// // //     return (
// // //       <div className="map-page">
// // //         <div className="map-header">
// // //           <button className="back-btn" onClick={() => navigate(-1)}>← بازگشت</button>
// // //           <div className="city-name">
// // //             <FaMapMarkerAlt />
// // //             <span>در حال بارگذاری...</span>
// // //           </div>
// // //         </div>
// // //         <div className="loading-container">
// // //           <FaSpinner className="spinner" />
// // //           <p>در حال بارگذاری...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="map-page">
// // //       {/* هدر با ساختار سئو */}
// // //       <div className="map-header">
// // //         <button className="back-btn" onClick={() => navigate(-1)} aria-label="بازگشت به صفحه قبل">
// // //           ← بازگشت
// // //         </button>
// // //         <div className="city-name">
// // //           <FaMapMarkerAlt aria-hidden="true" />
// // //           <span>{selectedCity.name}</span>
// // //         </div>
// // //         <div className="property-count">
// // //           {totalCount.toLocaleString("fa-IR")} ملک
// // //         </div>
// // //       </div>

// // //       {/* محتوای اصلی */}
// // //       <div className="map-container">
// // //         {loading ? (
// // //           <div className="loading-container">
// // //             <FaSpinner className="spinner" />
// // //             <p>در حال بارگذاری املاک...</p>
// // //           </div>
// // //         ) : (
// // //           <>
// // //             {/* توضیحات سئو برای موتورهای جستجو */}
// // //             <div className="seo-description" style={{ display: 'none' }} aria-hidden="true">
// // //               <h1>نقشه املاک {selectedCity.name}</h1>
// // //               <p>نمایش {totalCount} ملک در نقشه {selectedCity.name}. شامل آگهی‌های خرید و فروش آپارتمان، خانه، ویلا و زمین در بهترین مناطق {selectedCity.name}.</p>
// // //             </div>
            
// // //             <MapContainer
// // //               key={mapCenter.join(',')}
// // //               center={mapCenter}
// // //               zoom={13}
// // //               style={{ height: '100%', width: '100%' }}
// // //               zoomControl={true}
// // //             >
// // //               <TileLayer
// // //                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// // //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // //               />
              
// // //               {properties.map((property) => (
// // //                 <Marker
// // //                   key={property.id}
// // //                   position={[property.lat, property.lng]}
// // //                   icon={redMarker}
// // //                   eventHandlers={{
// // //                     click: () => handleMarkerClick(property)
// // //                   }}
// // //                   aria-label={`مشاهده ملک ${property.title}`}
// // //                 >
// // //                   <Tooltip 
// // //                     direction="top" 
// // //                     offset={[0, -20]} 
// // //                     opacity={0.9}
// // //                     className="custom-tooltip"
// // //                     permanent={false}
// // //                     sticky
// // //                   >
// // //                     <span className="tooltip-title">{property.title}</span>
// // //                     <br />
// // //                     <span className="tooltip-price">{property.priceFormatted} تومان</span>
// // //                   </Tooltip>
                  
// // //                   <Popup>
// // //                     <div className="custom-popup">
// // //                       <div className="popup-image">
// // //                         {property.image ? (
// // //                           <img 
// // //                             src={property.image} 
// // //                             alt={property.title}
// // //                             loading="lazy"
// // //                           />
// // //                         ) : (
// // //                           <div className="popup-image-placeholder">
// // //                             <FaImage />
// // //                             <span>{property.title}</span>
// // //                           </div>
// // //                         )}
// // //                       </div>
// // //                       <div className="popup-title">{property.title}</div>
// // //                       <div className="popup-price">{property.priceFormatted} تومان</div>
// // //                       <div className="popup-info">
// // //                         {property.area > 0 && (
// // //                           <span><FaRulerCombined /> {property.area} متر</span>
// // //                         )}
// // //                         {property.rooms > 0 && (
// // //                           <span><FaBed /> {property.rooms} خواب</span>
// // //                         )}
// // //                       </div>
// // //                       <div className="popup-location">
// // //                         <FaMapPin /> {property.regionName}
// // //                       </div>
// // //                       <button 
// // //                         className="popup-btn-custom"
// // //                         onClick={() => handleViewDetail(property)}
// // //                         aria-label={`مشاهده جزئیات ${property.title}`}
// // //                       >
// // //                         مشاهده جزئیات <FaArrowRight />
// // //                       </button>
// // //                     </div>
// // //                   </Popup>
// // //                 </Marker>
// // //               ))}
// // //             </MapContainer>
// // //           </>
// // //         )}
// // //       </div>

// // //       {/* پنل پایین با دیتاهای ساختاریافته */}
// // //       {selectedProperty && (
// // //         <div className="bottom-panel" itemScope itemType="https://schema.org/Product">
// // //           <div className="panel-header">
// // //             <h3 itemProp="name">{selectedProperty.title}</h3>
// // //             <button className="panel-close" onClick={() => setSelectedProperty(null)} aria-label="بستن">
// // //               ✕
// // //             </button>
// // //           </div>
          
// // //           <div className="panel-content">
// // //             <div className="property-image">
// // //               {selectedProperty.image ? (
// // //                 <img 
// // //                   src={selectedProperty.image} 
// // //                   alt={selectedProperty.title}
// // //                   itemProp="image"
// // //                   loading="lazy"
// // //                 />
// // //               ) : (
// // //                 <div className="image-placeholder">
// // //                   <div>
// // //                     <FaImage />
// // //                     <span>بدون تصویر</span>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>
            
// // //             <div className="property-tags">
// // //               <span className="tag primary">{selectedProperty.type}</span>
// // //               <span className="tag">{selectedProperty.regionName}</span>
// // //             </div>
            
// // //             <div className="price-section" itemProp="offers" itemScope itemType="https://schema.org/Offer">
// // //               <div className="price-label">قیمت کل</div>
// // //               <div className="price-value" itemProp="price">
// // //                 {selectedProperty.priceFormatted}
// // //                 <span className="price-unit">تومان</span>
// // //               </div>
// // //               <meta itemProp="priceCurrency" content="IRT" />
// // //             </div>
            
// // //             <div className="features-grid">
// // //               <div className="feature-item">
// // //                 <span className="feature-icon">📏</span>
// // //                 <div className="feature-label">متراژ</div>
// // //                 <div className="feature-value">{selectedProperty.area} متر</div>
// // //               </div>
// // //               <div className="feature-item">
// // //                 <span className="feature-icon">🛏️</span>
// // //                 <div className="feature-label">اتاق</div>
// // //                 <div className="feature-value">{selectedProperty.rooms} عدد</div>
// // //               </div>
// // //               <div className="feature-item">
// // //                 <span className="feature-icon">🚽</span>
// // //                 <div className="feature-label">سرویس بهداشتی</div>
// // //                 <div className="feature-value">{selectedProperty.bathrooms} عدد</div>
// // //               </div>
// // //               <div className="feature-item">
// // //                 <span className="feature-icon">🏗️</span>
// // //                 <div className="feature-label">سال ساخت</div>
// // //                 <div className="feature-value">{selectedProperty.constructionYear}</div>
// // //               </div>
// // //             </div>
            
// // //             <div className="info-row">
// // //               <span className="info-label">منطقه</span>
// // //               <span className="info-value">{selectedProperty.regionName}</span>
// // //             </div>
// // //             <div className="info-row">
// // //               <span className="info-label">طبقات</span>
// // //               <span className="info-value">{selectedProperty.floorCount}</span>
// // //             </div>
            
// // //             <div className="description" itemProp="description">
// // //               {selectedProperty.description}
// // //             </div>
            
// // //             <button 
// // //               className="detail-btn"
// // //               onClick={() => handleViewDetail(selectedProperty)}
// // //               aria-label={`مشاهده جزئیات بیشتر ${selectedProperty.title}`}
// // //             >
// // //               مشاهده جزئیات بیشتر
// // //               <FaArrowRight />
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default MapSearchPage;

// // import React, { useState, useEffect, useCallback, useMemo } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
// // import L from 'leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import { 
// //   FaArrowRight, 
// //   FaMapMarkerAlt, 
// //   FaSpinner, 
// //   FaHome, 
// //   FaRuler, 
// //   FaBed, 
// //   FaBath, 
// //   FaImage, 
// //   FaMapPin,
// //   FaRulerCombined 
// // } from 'react-icons/fa';
// // import { realEstateService } from '../../../services/realEstate';
// // import './MapSearchPage.css';

// // // رفع مشکل آیکون‌های Leaflet
// // delete L.Icon.Default.prototype._getIconUrl;
// // const baseImageUrl = 'https://localhost:7178';
// // // ساخت آیکون خونه سفارشی با SVG
// // const createHouseIcon = (color = '#e74c3c') => {
// //   return L.divIcon({
// //     html: `<div style="
// //       position: relative;
// //       width: 40px;
// //       height: 40px;
// //       display: flex;
// //       align-items: center;
// //       justify-content: center;
// //       filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
// //       transition: all 0.2s ease;
// //       cursor: pointer;
// //     ">
// //       <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// //         <path d="M12 3L2 9L12 15L22 9L12 3Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="white"/>
// //         <path d="M5 12V18L12 22L19 18V12" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="white"/>
// //         <circle cx="12" cy="12" r="2" fill="${color}"/>
// //         <path d="M12 15V18" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
// //       </svg>
// //       <div style="
// //         position: absolute;
// //         bottom: -2px;
// //         left: 50%;
// //         transform: translateX(-50%);
// //         width: 8px;
// //         height: 8px;
// //         background: ${color};
// //         border-radius: 50%;
// //         box-shadow: 0 0 0 2px white;
// //       "></div>
// //     </div>`,
// //     className: 'custom-house-marker',
// //     iconSize: [40, 40],
// //     iconAnchor: [20, 40],
// //     popupAnchor: [0, -40],
// //     tooltipAnchor: [0, -40]
// //   });
// // };

// // // آیکون خونه قرمز برای املاک عادی
// // const houseMarker = createHouseIcon('#e74c3c');

// // // آیکون خونه طلایی برای ملک انتخاب شده
// // const goldHouseMarker = createHouseIcon('#f39c12');

// // const MapSearchPage = () => {
// //   const navigate = useNavigate();
// //   const [properties, setProperties] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedProperty, setSelectedProperty] = useState(null);
// //   const [selectedCity, setSelectedCity] = useState(null);
// //   const [totalCount, setTotalCount] = useState(0);
// //   const [mapCenter, setMapCenter] = useState([35.7436, 51.4095]);

// //   // تابع برای ساخت slug بهینه برای سئو
// //   const createSeoSlug = useCallback((title, id) => {
// //     if (!title) return `${id}`;
    
// //     const slug = title
// //       .replace(/[^\w\s\u0600-\u06FF]/g, '')
// //       .replace(/\s+/g, '-')
// //       .replace(/-+/g, '-')
// //       .trim()
// //       .substring(0, 60);
    
// //     return `${slug}-${id}`;
// //   }, []);

// //   // تابع برای ساخت آدرس کامل تصویر
// //   const getFullImageUrl = useCallback((imagePath) => {
// //     if (!imagePath) return null;
// //     if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
// //       return imagePath;
// //     }
// //     return `${baseImageUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
// //   }, []);

// //   const getPropertyLink = (propertyId) => {
// //     const createSlug = (title) => {
// //       if (!title) return '';
// //       return title
// //         .replace(/[^\w\s\u0600-\u06FF]/g, '')
// //         .replace(/\s+/g, '-')
// //         .substring(0, 50);
// //     };
    
// //     const slug = createSlug(propertyId.title);
// //     return `/property/${propertyId.id}/${slug}`;
// //   };

// //   // تابع برای فرمت قیمت
// //   const formatPrice = useCallback((price) => {
// //     if (!price || price === 0) return 'تماس بگیرید';
// //     return price.toLocaleString("fa-IR");
// //   }, []);

// //   useEffect(() => {
// //     const savedCity = localStorage.getItem('selectedCity');
// //     if (savedCity) {
// //       try {
// //         const city = JSON.parse(savedCity);
// //         setSelectedCity(city);
// //         document.title = `نقشه املاک ${city.name} | سامانه املاک`;
// //       } catch (e) {
// //         setSelectedCity({ id: 1, name: 'تهران' });
// //         document.title = 'نقشه املاک تهران | سامانه املاک';
// //       }
// //     } else {
// //       setSelectedCity({ id: 1, name: 'تهران' });
// //       document.title = 'نقشه املاک تهران | سامانه املاک';
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (selectedCity && selectedCity.id) {
// //       loadProperties();
// //     }
// //   }, [selectedCity]);

// //   const loadProperties = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await realEstateService.GetrealEstateMap(selectedCity.id, 1, 50);
// //       const responseData = response.data || response;
      
// //       if (responseData && responseData.items) {
// //         const items = responseData.items || [];
// //         const totalCountValue = responseData.totalCount || 0;
        
// //         const propertiesWithLocation = items.filter(item => {
// //           const lat = parseFloat(item.lat);
// //           const lng = parseFloat(item.lng);
// //           return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
// //         }).map(item => ({
// //           id: item.id,
// //           title: item.title || 'بدون عنوان',
// //           lat: parseFloat(item.lat),
// //           lng: parseFloat(item.lng),
// //           price: item.price || 0,
// //           priceFormatted: formatPrice(item.price),
// //           area: item.meterage || item.area || 0,
// //           rooms: item.roomCount || 0,
// //           bathrooms: item.bathroomCount || 1,
// //           regionName: item.regionName || item.neighborhood || 'نامشخص',
// //           type: item.typeCate || 'فروش',
// //           image: getFullImageUrl(item.address || item.imageUrl || item.mainImage || null),
// //           description: item.description || `خرید و فروش ${item.title} در منطقه ${item.regionName || selectedCity.name}`,
// //           constructionYear: item.constructionYear || '---',
// //           floorCount: item.countFloor || '---',
// //           slug: createSeoSlug(item.title, item.id)
// //         }));
        
// //         if (propertiesWithLocation.length > 0) {
// //           setMapCenter([propertiesWithLocation[0].lat, propertiesWithLocation[0].lng]);
// //         }
        
// //         setProperties(propertiesWithLocation);
// //         setTotalCount(totalCountValue);
        
// //         const metaDescription = document.querySelector('meta[name="description"]');
// //         if (metaDescription) {
// //           metaDescription.setAttribute('content', `نمایش ${totalCountValue} ملک در نقشه ${selectedCity.name} | مشاهده آگهی‌های خرید و فروش و اجاره ملک`);
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error loading properties:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleMarkerClick = useCallback((property) => {
// //     setSelectedProperty(property);
// //     document.title = `${property.title} | نقشه املاک ${selectedCity?.name}`;
// //   }, [selectedCity]);

// //   const handleViewDetail = (propertyId) => {
// //     navigate(getPropertyLink(propertyId));
// //   };

// //   // متادیتاهای سئو برای صفحه
// //   const seoData = useMemo(() => ({
// //     title: `نقشه املاک ${selectedCity?.name || 'تهران'} | جستجوی پیشرفته ملک`,
// //     description: `جستجوی آسان املاک در نقشه ${selectedCity?.name}. مشاهده موقعیت دقیق ملک‌های فروش و رهن و اجاره با امکانات پیشرفته`,
// //     keywords: `نقشه املاک, خرید ملک در ${selectedCity?.name}, فروش آپارتمان, رهن و اجاره, مشاور املاک`
// //   }), [selectedCity]);

// //   // به روزرسانی متادیتاها
// //   useEffect(() => {
// //     document.title = seoData.title;
    
// //     let metaDescription = document.querySelector('meta[name="description"]');
// //     if (!metaDescription) {
// //       metaDescription = document.createElement('meta');
// //       metaDescription.setAttribute('name', 'description');
// //       document.head.appendChild(metaDescription);
// //     }
// //     metaDescription.setAttribute('content', seoData.description);
    
// //     let metaKeywords = document.querySelector('meta[name="keywords"]');
// //     if (!metaKeywords) {
// //       metaKeywords = document.createElement('meta');
// //       metaKeywords.setAttribute('name', 'keywords');
// //       document.head.appendChild(metaKeywords);
// //     }
// //     metaKeywords.setAttribute('content', seoData.keywords);
// //   }, [seoData]);

// //   if (!selectedCity) {
// //     return (
// //       <div className="map-page">
// //         <div className="map-header">
// //           <button className="back-btn" onClick={() => navigate(-1)}>← بازگشت</button>
// //           <div className="city-name">
// //             <FaMapMarkerAlt />
// //             <span>در حال بارگذاری...</span>
// //           </div>
// //         </div>
// //         <div className="loading-container">
// //           <FaSpinner className="spinner" />
// //           <p>در حال بارگذاری...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="map-page">
// //       {/* هدر با ساختار سئو */}
// //       <div className="map-header">
// //         <button className="back-btn" onClick={() => navigate(-1)} aria-label="بازگشت به صفحه قبل">
// //           ← بازگشت
// //         </button>
// //         <div className="city-name">
// //           <FaMapMarkerAlt aria-hidden="true" />
// //           <span>{selectedCity.name}</span>
// //         </div>
// //         <div className="property-count">
// //           {totalCount.toLocaleString("fa-IR")} ملک
// //         </div>
// //       </div>

// //       {/* محتوای اصلی */}
// //       <div className="map-container">
// //         {loading ? (
// //           <div className="loading-container">
// //             <FaSpinner className="spinner" />
// //             <p>در حال بارگذاری املاک...</p>
// //           </div>
// //         ) : (
// //           <>
// //             {/* توضیحات سئو برای موتورهای جستجو */}
// //             <div className="seo-description" style={{ display: 'none' }} aria-hidden="true">
// //               <h1>نقشه املاک {selectedCity.name}</h1>
// //               <p>نمایش {totalCount} ملک در نقشه {selectedCity.name}. شامل آگهی‌های خرید و فروش آپارتمان، خانه، ویلا و زمین در بهترین مناطق {selectedCity.name}.</p>
// //             </div>
            
// //             <MapContainer
// //               key={mapCenter.join(',')}
// //               center={mapCenter}
// //               zoom={13}
// //               style={{ height: '100%', width: '100%' }}
// //               zoomControl={true}
// //             >
// //               <TileLayer
// //                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //               />
              
// //               {properties.map((property) => (
// //                 <Marker
// //                   key={property.id}
// //                   position={[property.lat, property.lng]}
// //                   icon={selectedProperty?.id === property.id ? goldHouseMarker : houseMarker}
// //                   eventHandlers={{
// //                     click: () => handleMarkerClick(property)
// //                   }}
// //                   aria-label={`مشاهده ملک ${property.title}`}
// //                 >
// //                   <Tooltip 
// //                     direction="top" 
// //                     offset={[0, -20]} 
// //                     opacity={0.9}
// //                     className="custom-tooltip"
// //                     permanent={false}
// //                     sticky
// //                   >
// //                     <span className="tooltip-title">{property.title}</span>
// //                     <br />
// //                     <span className="tooltip-price">{property.priceFormatted} تومان</span>
// //                   </Tooltip>
                  
// //                   <Popup>
// //                     <div className="custom-popup">
// //                       <div className="popup-image">
// //                         {property.image ? (
// //                           <img 
// //                             src={property.image} 
// //                             alt={property.title}
// //                             loading="lazy"
// //                           />
// //                         ) : (
// //                           <div className="popup-image-placeholder">
// //                             <FaImage />
// //                             <span>{property.title}</span>
// //                           </div>
// //                         )}
// //                       </div>
// //                       <div className="popup-title">{property.title}</div>
// //                       <div className="popup-price">{property.priceFormatted} تومان</div>
// //                       <div className="popup-info">
// //                         {property.area > 0 && (
// //                           <span><FaRulerCombined /> {property.area} متر</span>
// //                         )}
// //                         {property.rooms > 0 && (
// //                           <span><FaBed /> {property.rooms} خواب</span>
// //                         )}
// //                       </div>
// //                       <div className="popup-location">
// //                         <FaMapPin /> {property.regionName}
// //                       </div>
// //                       <button 
// //                         className="popup-btn-custom"
// //                         onClick={() => handleViewDetail(property)}
// //                         aria-label={`مشاهده جزئیات ${property.title}`}
// //                       >
// //                         مشاهده جزئیات <FaArrowRight />
// //                       </button>
// //                     </div>
// //                   </Popup>
// //                 </Marker>
// //               ))}
// //             </MapContainer>
// //           </>
// //         )}
// //       </div>

// //       {/* پنل پایین با دیتاهای ساختاریافته */}
// //       {selectedProperty && (
// //         <div className="bottom-panel" itemScope itemType="https://schema.org/Product">
// //           <div className="panel-header">
// //             <h3 itemProp="name">{selectedProperty.title}</h3>
// //             <button className="panel-close" onClick={() => setSelectedProperty(null)} aria-label="بستن">
// //               ✕
// //             </button>
// //           </div>
          
// //           <div className="panel-content">
// //             <div className="property-image">
// //               {selectedProperty.image ? (
// //                 <img 
// //                   src={selectedProperty.image} 
// //                   alt={selectedProperty.title}
// //                   itemProp="image"
// //                   loading="lazy"
// //                 />
// //               ) : (
// //                 <div className="image-placeholder">
// //                   <div>
// //                     <FaImage />
// //                     <span>بدون تصویر</span>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
            
// //             <div className="property-tags">
// //               <span className="tag primary">{selectedProperty.type}</span>
// //               <span className="tag">{selectedProperty.regionName}</span>
// //             </div>
            
// //             <div className="price-section" itemProp="offers" itemScope itemType="https://schema.org/Offer">
// //               <div className="price-label">قیمت کل</div>
// //               <div className="price-value" itemProp="price">
// //                 {selectedProperty.priceFormatted}
// //                 <span className="price-unit">تومان</span>
// //               </div>
// //               <meta itemProp="priceCurrency" content="IRT" />
// //             </div>
            
// //             <div className="features-grid">
// //               <div className="feature-item">
// //                 <span className="feature-icon">📏</span>
// //                 <div className="feature-label">متراژ</div>
// //                 <div className="feature-value">{selectedProperty.area} متر</div>
// //               </div>
// //               <div className="feature-item">
// //                 <span className="feature-icon">🛏️</span>
// //                 <div className="feature-label">اتاق</div>
// //                 <div className="feature-value">{selectedProperty.rooms} عدد</div>
// //               </div>
// //               <div className="feature-item">
// //                 <span className="feature-icon">🚽</span>
// //                 <div className="feature-label">سرویس بهداشتی</div>
// //                 <div className="feature-value">{selectedProperty.bathrooms} عدد</div>
// //               </div>
// //               <div className="feature-item">
// //                 <span className="feature-icon">🏗️</span>
// //                 <div className="feature-label">سال ساخت</div>
// //                 <div className="feature-value">{selectedProperty.constructionYear}</div>
// //               </div>
// //             </div>
            
// //             <div className="info-row">
// //               <span className="info-label">منطقه</span>
// //               <span className="info-value">{selectedProperty.regionName}</span>
// //             </div>
// //             <div className="info-row">
// //               <span className="info-label">طبقات</span>
// //               <span className="info-value">{selectedProperty.floorCount}</span>
// //             </div>
            
// //             <div className="description" itemProp="description">
// //               {selectedProperty.description}
// //             </div>
            
// //             <button 
// //               className="detail-btn"
// //               onClick={() => handleViewDetail(selectedProperty)}
// //               aria-label={`مشاهده جزئیات بیشتر ${selectedProperty.title}`}
// //             >
// //               مشاهده جزئیات بیشتر
// //               <FaArrowRight />
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default MapSearchPage;

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { 
//   FaArrowRight, 
//   FaMapMarkerAlt, 
//   FaSpinner, 
//   FaHome, 
//   FaRuler, 
//   FaBed, 
//   FaBath, 
//   FaImage, 
//   FaMapPin,
//   FaRulerCombined 
// } from 'react-icons/fa';
// import { realEstateService } from '../../../services/realEstate';
// import './MapSearchPage.css';

// // رفع مشکل آیکون‌های Leaflet
// delete L.Icon.Default.prototype._getIconUrl;

// // ساخت آیکون خونه سفارشی با SVG
// const createHouseIcon = (color = '#e74c3c') => {
//   return L.divIcon({
//     html: `<div style="
//       position: relative;
//       width: 40px;
//       height: 40px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
//       transition: all 0.2s ease;
//       cursor: pointer;
//     ">
//       <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 3L2 9L12 15L22 9L12 3Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="white"/>
//         <path d="M5 12V18L12 22L19 18V12" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="white"/>
//         <circle cx="12" cy="12" r="2" fill="${color}"/>
//         <path d="M12 15V18" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
//       </svg>
//       <div style="
//         position: absolute;
//         bottom: -2px;
//         left: 50%;
//         transform: translateX(-50%);
//         width: 8px;
//         height: 8px;
//         background: ${color};
//         border-radius: 50%;
//         box-shadow: 0 0 0 2px white;
//       "></div>
//     </div>`,
//     className: 'custom-house-marker',
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//     popupAnchor: [0, -40],
//     tooltipAnchor: [0, -40]
//   });
// };

// // آیکون خونه قرمز برای املاک عادی
// const houseMarker = createHouseIcon('#e74c3c');

// // آیکون خونه طلایی برای ملک انتخاب شده
// const goldHouseMarker = createHouseIcon('#f39c12');

// // Base URL برای تصاویر
// const baseImageUrl = 'https://localhost:7178';

// const MapSearchPage = () => {
//   const navigate = useNavigate();
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [totalCount, setTotalCount] = useState(0);
//   const [mapCenter, setMapCenter] = useState([35.7436, 51.4095]);

//   // تابع برای ساخت slug بهینه برای سئو
//   const createSeoSlug = useCallback((title, id) => {
//     if (!title) return `${id}`;
    
//     const slug = title
//       .replace(/[^\w\s\u0600-\u06FF]/g, '')
//       .replace(/\s+/g, '-')
//       .replace(/-+/g, '-')
//       .trim()
//       .substring(0, 60);
    
//     return `${slug}-${id}`;
//   }, []);

//   // تابع برای ساخت آدرس کامل تصویر
//   const getFullImageUrl = useCallback((imagePath) => {
//     if (!imagePath) return null;
//     if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
//       return imagePath;
//     }
//     return `${baseImageUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
//   }, []);

//   // تابع برای ساخت لینک سئو شده
//   const getPropertyLink = useCallback((property) => {
//     const createSlug = (title) => {
//       if (!title) return '';
//       return title
//         .replace(/[^\w\s\u0600-\u06FF]/g, '')
//         .replace(/\s+/g, '-')
//         .substring(0, 50);
//     };
    
//     const slug = createSlug(property.title);
//     return `/property/${property.id}/${slug}`;
//   }, []);

//   // تابع برای فرمت قیمت
//   const formatPrice = useCallback((price) => {
//     if (!price || price === 0) return 'تماس بگیرید';
//     return price.toLocaleString("fa-IR");
//   }, []);

//   // متادیتاهای سئو برای صفحه
//   const seoData = useMemo(() => ({
//     title: `نقشه املاک ${selectedCity?.name || 'تهران'} | جستجوی پیشرفته ملک`,
//     description: `جستجوی آسان املاک در نقشه ${selectedCity?.name}. مشاهده موقعیت دقیق ملک‌های فروش و رهن و اجاره با امکانات پیشرفته`,
//     keywords: `نقشه املاک, خرید ملک در ${selectedCity?.name}, فروش آپارتمان, رهن و اجاره, مشاور املاک`
//   }), [selectedCity]);

//   // تابع برای اضافه کردن تگ‌های سئو
//   const addSeoTags = useCallback(() => {
//     // متا دیسکریپشن
//     let metaDescription = document.querySelector('meta[name="description"]');
//     if (!metaDescription) {
//       metaDescription = document.createElement('meta');
//       metaDescription.setAttribute('name', 'description');
//       document.head.appendChild(metaDescription);
//     }
//     metaDescription.setAttribute('content', seoData.description);
    
//     // متا کلمات کلیدی
//     let metaKeywords = document.querySelector('meta[name="keywords"]');
//     if (!metaKeywords) {
//       metaKeywords = document.createElement('meta');
//       metaKeywords.setAttribute('name', 'keywords');
//       document.head.appendChild(metaKeywords);
//     }
//     metaKeywords.setAttribute('content', seoData.keywords);
    
//     // رباتس
//     let robots = document.querySelector('meta[name="robots"]');
//     if (!robots) {
//       robots = document.createElement('meta');
//       robots.setAttribute('name', 'robots');
//       robots.setAttribute('content', 'index, follow');
//       document.head.appendChild(robots);
//     }
    
//     // ویوپورت
//     let viewport = document.querySelector('meta[name="viewport"]');
//     if (!viewport) {
//       viewport = document.createElement('meta');
//       viewport.setAttribute('name', 'viewport');
//       viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
//       document.head.appendChild(viewport);
//     }
    
//     // کنونیکال لینک
//     let canonicalLink = document.querySelector("link[rel='canonical']");
//     if (!canonicalLink) {
//       canonicalLink = document.createElement('link');
//       canonicalLink.setAttribute('rel', 'canonical');
//       canonicalLink.setAttribute('href', window.location.href.split('?')[0]);
//       document.head.appendChild(canonicalLink);
//     }
    
//     // Open Graph تگ‌ها
//     const ogTags = [
//       { property: 'og:title', content: seoData.title },
//       { property: 'og:description', content: seoData.description },
//       { property: 'og:type', content: 'website' },
//       { property: 'og:url', content: window.location.href },
//       { property: 'og:image', content: 'https://yourdomain.com/logo.png' },
//       { property: 'og:locale', content: 'fa_IR' },
//       { property: 'og:site_name', content: 'سامانه املاک' }
//     ];
    
//     ogTags.forEach(tag => {
//       let meta = document.querySelector(`meta[property="${tag.property}"]`);
//       if (!meta) {
//         meta = document.createElement('meta');
//         meta.setAttribute('property', tag.property);
//         document.head.appendChild(meta);
//       }
//       meta.setAttribute('content', tag.content);
//     });
    
//     // Twitter Card تگ‌ها
//     const twitterTags = [
//       { name: 'twitter:card', content: 'summary_large_image' },
//       { name: 'twitter:title', content: seoData.title },
//       { name: 'twitter:description', content: seoData.description },
//       { name: 'twitter:image', content: 'https://yourdomain.com/logo.png' }
//     ];
    
//     twitterTags.forEach(tag => {
//       let meta = document.querySelector(`meta[name="${tag.name}"]`);
//       if (!meta) {
//         meta = document.createElement('meta');
//         meta.setAttribute('name', tag.name);
//         document.head.appendChild(meta);
//       }
//       meta.setAttribute('content', tag.content);
//     });
    
//     // Breadcrumb Schema
//     const existingScript = document.querySelector('script[type="application/ld+json"][data-type="breadcrumb"]');
//     if (existingScript) {
//       existingScript.remove();
//     }
    
//     const breadcrumbScript = document.createElement('script');
//     breadcrumbScript.type = 'application/ld+json';
//     breadcrumbScript.setAttribute('data-type', 'breadcrumb');
//     breadcrumbScript.textContent = JSON.stringify({
//       "@context": "https://schema.org",
//       "@type": "BreadcrumbList",
//       "itemListElement": [
//         {
//           "@type": "ListItem",
//           "position": 1,
//           "name": "خانه",
//           "item": window.location.origin
//         },
//         {
//           "@type": "ListItem",
//           "position": 2,
//           "name": `نقشه املاک ${selectedCity?.name || 'تهران'}`,
//           "item": window.location.href
//         }
//       ]
//     });
//     document.head.appendChild(breadcrumbScript);
    
//   }, [seoData, selectedCity]);

//   // بارگذاری شهر از localStorage
//   useEffect(() => {
//     const savedCity = localStorage.getItem('selectedCity');
//     if (savedCity) {
//       try {
//         const city = JSON.parse(savedCity);
//         setSelectedCity(city);
//       } catch (e) {
//         setSelectedCity({ id: 1, name: 'تهران' });
//       }
//     } else {
//       setSelectedCity({ id: 1, name: 'تهران' });
//     }
//   }, []);

//   // بارگذاری املاک
//   useEffect(() => {
//     if (selectedCity && selectedCity.id) {
//       loadProperties();
//     }
//   }, [selectedCity]);

//   // به روزرسانی سئو هنگام تغییر شهر
//   useEffect(() => {
//     if (selectedCity) {
//       document.title = seoData.title;
//       addSeoTags();
//     }
//   }, [seoData, selectedCity, addSeoTags]);

//   const loadProperties = async () => {
//     setLoading(true);
//     try {
//       const response = await realEstateService.GetrealEstateMap(selectedCity.id, 1, 50);
//       const responseData = response.data || response;
      
//       if (responseData && responseData.items) {
//         const items = responseData.items || [];
//         const totalCountValue = responseData.totalCount || 0;
        
//         const propertiesWithLocation = items.filter(item => {
//           const lat = parseFloat(item.lat);
//           const lng = parseFloat(item.lng);
//           return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
//         }).map(item => ({
//           id: item.id,
//           title: item.title || 'بدون عنوان',
//           lat: parseFloat(item.lat),
//           lng: parseFloat(item.lng),
//           price: item.price || 0,
//           priceFormatted: formatPrice(item.price),
//           area: item.meterage || item.area || 0,
//           rooms: item.roomCount || 0,
//           bathrooms: item.bathroomCount || 1,
//           regionName: item.regionName || item.neighborhood || 'نامشخص',
//           type: item.typeCate || 'فروش',
//           image: getFullImageUrl(item.address || item.imageUrl || item.mainImage || null),
//           description: item.description || `خرید و فروش ${item.title} در منطقه ${item.regionName || selectedCity.name}`,
//           constructionYear: item.constructionYear || '---',
//           floorCount: item.countFloor || '---',
//           slug: createSeoSlug(item.title, item.id)
//         }));
        
//         if (propertiesWithLocation.length > 0) {
//           setMapCenter([propertiesWithLocation[0].lat, propertiesWithLocation[0].lng]);
//         }
        
//         setProperties(propertiesWithLocation);
//         setTotalCount(totalCountValue);
//       }
//     } catch (error) {
//       console.error('Error loading properties:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMarkerClick = useCallback((property) => {
//     setSelectedProperty(property);
//     document.title = `${property.title} | نقشه املاک ${selectedCity?.name}`;
//   }, [selectedCity]);

//   const handleViewDetail = useCallback((property) => {
//     const link = getPropertyLink(property);
//     navigate(link);
//   }, [getPropertyLink, navigate]);

//   if (!selectedCity) {
//     return (
//       <div className="map-page">
//         <div className="map-header">
//           <button className="back-btn" onClick={() => navigate(-1)}>← بازگشت</button>
//           <div className="city-name">
//             <FaMapMarkerAlt />
//             <span>در حال بارگذاری...</span>
//           </div>
//         </div>
//         <div className="loading-container">
//           <FaSpinner className="spinner" />
//           <p>در حال بارگذاری...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="map-page">
//       {/* هدر */}
//       <div className="map-header">
//         <button className="back-btn" onClick={() => navigate(-1)} aria-label="بازگشت به صفحه قبل">
//           ← بازگشت
//         </button>
//         <div className="city-name">
//           <FaMapMarkerAlt aria-hidden="true" />
//           <span>{selectedCity.name}</span>
//         </div>
//         <div className="property-count">
//           {totalCount.toLocaleString("fa-IR")} ملک
//         </div>
//       </div>

//       {/* محتوای اصلی */}
//       <div className="map-container">
//         {loading ? (
//           <div className="loading-container">
//             <FaSpinner className="spinner" />
//             <p>در حال بارگذاری املاک...</p>
//           </div>
//         ) : (
//           <>
//             {/* توضیحات مخفی برای سئو */}
//             <div className="seo-description" style={{ display: 'none' }} aria-hidden="true">
//               <h1>نقشه املاک {selectedCity.name}</h1>
//               <p>نمایش {totalCount} ملک در نقشه {selectedCity.name}. شامل آگهی‌های خرید و فروش آپارتمان، خانه، ویلا و زمین در بهترین مناطق {selectedCity.name}.</p>
//             </div>
            
//             <MapContainer
//               key={mapCenter.join(',')}
//               center={mapCenter}
//               zoom={13}
//               style={{ height: '100%', width: '100%' }}
//               zoomControl={true}
//             >
//               <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />
              
//               {properties.map((property) => (
//                 <Marker
//                   key={property.id}
//                   position={[property.lat, property.lng]}
//                   icon={selectedProperty?.id === property.id ? goldHouseMarker : houseMarker}
//                   eventHandlers={{
//                     click: () => handleMarkerClick(property)
//                   }}
//                   aria-label={`مشاهده ملک ${property.title}`}
//                 >
//                   <Tooltip 
//                     direction="top" 
//                     offset={[0, -20]} 
//                     opacity={0.9}
//                     className="custom-tooltip"
//                     permanent={false}
//                     sticky
//                   >
//                     <span className="tooltip-title">{property.title}</span>
//                     <br />
//                     <span className="tooltip-price">{property.priceFormatted} تومان</span>
//                   </Tooltip>
                  
//                   <Popup>
//                     <div className="custom-popup">
//                       <div className="popup-image">
//                         {property.image ? (
//                           <img 
//                             src={property.image} 
//                             alt={property.title}
//                             loading="lazy"
//                           />
//                         ) : (
//                           <div className="popup-image-placeholder">
//                             <FaImage />
//                             <span>{property.title}</span>
//                           </div>
//                         )}
//                       </div>
//                       <div className="popup-title">{property.title}</div>
//                       <div className="popup-price">{property.priceFormatted} تومان</div>
//                       <div className="popup-info">
//                         {property.area > 0 && (
//                           <span><FaRulerCombined /> {property.area} متر</span>
//                         )}
//                         {property.rooms > 0 && (
//                           <span><FaBed /> {property.rooms} خواب</span>
//                         )}
//                       </div>
//                       <div className="popup-location">
//                         <FaMapPin /> {property.regionName}
//                       </div>
//                       <button 
//                         className="popup-btn-custom"
//                         onClick={() => handleViewDetail(property)}
//                         aria-label={`مشاهده جزئیات ${property.title}`}
//                       >
//                         مشاهده جزئیات <FaArrowRight />
//                       </button>
//                     </div>
//                   </Popup>
//                 </Marker>
//               ))}
//             </MapContainer>
//           </>
//         )}
//       </div>

//       {/* پنل پایین */}
//       {selectedProperty && (
//         <div className="bottom-panel" itemScope itemType="https://schema.org/Product">
//           <div className="panel-header">
//             <h3 itemProp="name">{selectedProperty.title}</h3>
//             <button className="panel-close" onClick={() => setSelectedProperty(null)} aria-label="بستن">
//               ✕
//             </button>
//           </div>
          
//           <div className="panel-content">
//             <div className="property-image">
//               {selectedProperty.image ? (
//                 <img 
//                   src={selectedProperty.image} 
//                   alt={selectedProperty.title}
//                   itemProp="image"
//                   loading="lazy"
//                 />
//               ) : (
//                 <div className="image-placeholder">
//                   <div>
//                     <FaImage />
//                     <span>بدون تصویر</span>
//                   </div>
//                 </div>
//               )}
//             </div>
            
//             <div className="property-tags">
//               <span className="tag primary">{selectedProperty.type}</span>
//               <span className="tag">{selectedProperty.regionName}</span>
//             </div>
            
//             <div className="price-section" itemProp="offers" itemScope itemType="https://schema.org/Offer">
//               <div className="price-label">قیمت کل</div>
//               <div className="price-value" itemProp="price">
//                 {selectedProperty.priceFormatted}
//                 <span className="price-unit">تومان</span>
//               </div>
//               <meta itemProp="priceCurrency" content="IRT" />
//             </div>
            
//             <div className="features-grid">
//               <div className="feature-item">
//                 <span className="feature-icon">📏</span>
//                 <div className="feature-label">متراژ</div>
//                 <div className="feature-value">{selectedProperty.area} متر</div>
//               </div>
//               <div className="feature-item">
//                 <span className="feature-icon">🛏️</span>
//                 <div className="feature-label">اتاق</div>
//                 <div className="feature-value">{selectedProperty.rooms} عدد</div>
//               </div>
//               <div className="feature-item">
//                 <span className="feature-icon">🚽</span>
//                 <div className="feature-label">سرویس بهداشتی</div>
//                 <div className="feature-value">{selectedProperty.bathrooms} عدد</div>
//               </div>
//               <div className="feature-item">
//                 <span className="feature-icon">🏗️</span>
//                 <div className="feature-label">سال ساخت</div>
//                 <div className="feature-value">{selectedProperty.constructionYear}</div>
//               </div>
//             </div>
            
//             <div className="info-row">
//               <span className="info-label">منطقه</span>
//               <span className="info-value">{selectedProperty.regionName}</span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">طبقات</span>
//               <span className="info-value">{selectedProperty.floorCount}</span>
//             </div>
            
//             <div className="description" itemProp="description">
//               {selectedProperty.description}
//             </div>
            
//             <button 
//               className="detail-btn"
//               onClick={() => handleViewDetail(selectedProperty)}
//               aria-label={`مشاهده جزئیات بیشتر ${selectedProperty.title}`}
//             >
//               مشاهده جزئیات بیشتر
//               <FaArrowRight />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MapSearchPage;

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  FaArrowRight, 
  FaMapMarkerAlt, 
  FaSpinner, 
  FaHome, 
  FaRuler, 
  FaBed, 
  FaBath, 
  FaImage, 
  FaMapPin,
  FaRulerCombined 
} from 'react-icons/fa';
import { realEstateService } from '../../../services/realEstate';
import './MapSearchPage.css';

// رفع مشکل آیکون‌های Leaflet
delete L.Icon.Default.prototype._getIconUrl;

// ساخت آیکون خونه سفارشی با SVG
const createHouseIcon = (color = '#e74c3c') => {
  return L.divIcon({
    html: `<div style="
      position: relative;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
      transition: all 0.2s ease;
      cursor: pointer;
    ">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L2 9L12 15L22 9L12 3Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="white"/>
        <path d="M5 12V18L12 22L19 18V12" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="white"/>
        <circle cx="12" cy="12" r="2" fill="${color}"/>
        <path d="M12 15V18" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <div style="
        position: absolute;
        bottom: -2px;
        left: 50%;
        transform: translateX(-50%);
        width: 8px;
        height: 8px;
        background: ${color};
        border-radius: 50%;
        box-shadow: 0 0 0 2px white;
      "></div>
    </div>`,
    className: 'custom-house-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    tooltipAnchor: [0, -40]
  });
};

// آیکون خونه قرمز برای املاک عادی
const houseMarker = createHouseIcon('#e74c3c');

// آیکون خونه طلایی برای ملک انتخاب شده
const goldHouseMarker = createHouseIcon('#f39c12');

// Base URL برای تصاویر
const baseImageUrl = 'https://localhost:7178';

const MapSearchPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [mapCenter, setMapCenter] = useState([35.689198, 51.388973]); // مرکز تهران
  const [mapZoom, setMapZoom] = useState(13);

  // تابع برای ساخت slug بهینه برای سئو
  const createSeoSlug = useCallback((title, id) => {
    if (!title) return `${id}`;
    
    const slug = title
      .replace(/[^\w\s\u0600-\u06FF]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
      .substring(0, 60);
    
    return `${slug}-${id}`;
  }, []);

  // تابع برای ساخت آدرس کامل تصویر
  const getFullImageUrl = useCallback((imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    return `${baseImageUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  }, []);

  // تابع برای ساخت لینک سئو شده
  const getPropertyLink = useCallback((property) => {
    const createSlug = (title) => {
      if (!title) return '';
      return title
        .replace(/[^\w\s\u0600-\u06FF]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);
    };
    
    const slug = createSlug(property.title);
    return `/property/${property.id}/${slug}`;
  }, []);

  // تابع برای فرمت قیمت
  const formatPrice = useCallback((price) => {
    if (!price || price === 0) return 'تماس بگیرید';
    return price.toLocaleString("fa-IR");
  }, []);

  // متادیتاهای سئو برای صفحه
  const seoData = useMemo(() => ({
    title: `نقشه املاک ${selectedCity?.name || 'تهران'} | جستجوی پیشرفته ملک`,
    description: `جستجوی آسان املاک در نقشه ${selectedCity?.name}. مشاهده موقعیت دقیق ملک‌های فروش و رهن و اجاره با امکانات پیشرفته`,
    keywords: `نقشه املاک, خرید ملک در ${selectedCity?.name}, فروش آپارتمان, رهن و اجاره, مشاور املاک`
  }), [selectedCity]);

  // تابع برای اضافه کردن تگ‌های سئو
  const addSeoTags = useCallback(() => {
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seoData.description);
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', seoData.keywords);
    
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      robots.setAttribute('content', 'index, follow');
      document.head.appendChild(robots);
    }
    
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      document.head.appendChild(viewport);
    }
    
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', window.location.href.split('?')[0]);
      document.head.appendChild(canonicalLink);
    }
    
    const ogTags = [
      { property: 'og:title', content: seoData.title },
      { property: 'og:description', content: seoData.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:image', content: 'https://yourdomain.com/logo.png' },
      { property: 'og:locale', content: 'fa_IR' },
      { property: 'og:site_name', content: 'سامانه املاک' }
    ];
    
    ogTags.forEach(tag => {
      let meta = document.querySelector(`meta[property="${tag.property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', tag.property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', tag.content);
    });
    
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seoData.title },
      { name: 'twitter:description', content: seoData.description },
      { name: 'twitter:image', content: 'https://yourdomain.com/logo.png' }
    ];
    
    twitterTags.forEach(tag => {
      let meta = document.querySelector(`meta[name="${tag.name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', tag.name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', tag.content);
    });
    
    const existingScript = document.querySelector('script[type="application/ld+json"][data-type="breadcrumb"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.setAttribute('data-type', 'breadcrumb');
    breadcrumbScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "خانه",
          "item": window.location.origin
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": `نقشه املاک ${selectedCity?.name || 'تهران'}`,
          "item": window.location.href
        }
      ]
    });
    document.head.appendChild(breadcrumbScript);
    
  }, [seoData, selectedCity]);

  // بارگذاری شهر از localStorage با مختصات
  useEffect(() => {
    const savedCity = localStorage.getItem('selectedCity');

    if (savedCity) {
      try {
        const city = JSON.parse(savedCity);
        setSelectedCity(city);
        
        // تنظیم مرکز نقشه بر اساس مختصات شهر انتخاب شده
        if (city.latitude && city.longitude) {
          setMapCenter([city.latitude, city.longitude]);
          // تنظیم زوم براساس نوع شهر (شهرهای بزرگ زوم کمتر، شهرهای کوچک زوم بیشتر)
          const zoomLevel = city.name === 'تهران' ? 13 : 12;
          setMapZoom(zoomLevel);
        }
      } catch (e) {
        setSelectedCity({ id: 1, name: 'تهران', latitude: 35.689198, longitude: 51.388973 });
        setMapCenter([35.689198, 51.388973]);
      }
    } else {
      setSelectedCity({ id: 1, name: 'تهران', latitude: 35.689198, longitude: 51.388973 });
      setMapCenter([35.689198, 51.388973]);
    }
  }, []);

  // بارگذاری املاک وقتی شهر تغییر کرد
  useEffect(() => {
    if (selectedCity && selectedCity.id) {
      loadProperties();
    }
  }, [selectedCity]);

  // به روزرسانی سئو هنگام تغییر شهر
  useEffect(() => {
    if (selectedCity) {
      document.title = seoData.title;
      addSeoTags();
    }
  }, [seoData, selectedCity, addSeoTags]);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const response = await realEstateService.GetrealEstateMap(selectedCity.id, 1, 50);
      const responseData = response.data || response;
      
      if (responseData && responseData.items) {
        const items = responseData.items || [];
        const totalCountValue = responseData.totalCount || 0;
        
        const propertiesWithLocation = items.filter(item => {
          const lat = parseFloat(item.lat);
          const lng = parseFloat(item.lng);
          return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
        }).map(item => ({
          id: item.id,
          title: item.title || 'بدون عنوان',
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lng),
          price: item.price || 0,
          priceFormatted: formatPrice(item.price),
          area: item.meterage || item.area || 0,
          rooms: item.roomCount || 0,
          bathrooms: item.bathroomCount || 1,
          regionName: item.regionName || item.neighborhood || 'نامشخص',
          type: item.typeCate || 'فروش',
          image: getFullImageUrl(item.address || item.imageUrl || item.mainImage || null),
          description: item.description || `خرید و فروش ${item.title} در منطقه ${item.regionName || selectedCity.name}`,
          constructionYear: item.constructionYear || '---',
          floorCount: item.countFloor || '---',
          slug: createSeoSlug(item.title, item.id)
        }));
        
        // اگر ملکی با موقعیت وجود داشت، مرکز نقشه را روی اولین ملک تنظیم کن
        // در غیر این صورت مرکز روی شهر بماند
        if (propertiesWithLocation.length > 0) {
          // میتونیم مرکز رو روی اولین ملک ببریم یا روی شهر نگه داریم
          // اینجا رو طبق نیازت میتونی تغییر بدی
          // setMapCenter([propertiesWithLocation[0].lat, propertiesWithLocation[0].lng]);
        }
        
        setProperties(propertiesWithLocation);
        setTotalCount(totalCountValue);
      }
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerClick = useCallback((property) => {
    setSelectedProperty(property);
    document.title = `${property.title} | نقشه املاک ${selectedCity?.name}`;
  }, [selectedCity]);

  const handleViewDetail = useCallback((property) => {
    const link = getPropertyLink(property);
    navigate(link);
  }, [getPropertyLink, navigate]);

  if (!selectedCity) {
    return (
      <div className="map-page">
        <div className="map-header">
          <button className="back-btn" onClick={() => navigate(-1)}>← بازگشت</button>
          <div className="city-name">
            <FaMapMarkerAlt />
            <span>در حال بارگذاری...</span>
          </div>
        </div>
        <div className="loading-container">
          <FaSpinner className="spinner" />
          <p>در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="map-page">
      {/* هدر */}
      <div className="map-header">
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="بازگشت به صفحه قبل">
          ← بازگشت
        </button>
        <div className="city-name">
          <FaMapMarkerAlt aria-hidden="true" />
          <span>{selectedCity.name}</span>
        </div>
        <div className="property-count">
          {totalCount.toLocaleString("fa-IR")} ملک
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="map-container">
        {loading ? (
          <div className="loading-container">
            <FaSpinner className="spinner" />
            <p>در حال بارگذاری املاک...</p>
          </div>
        ) : (
          <>
            {/* توضیحات مخفی برای سئو */}
            <div className="seo-description" style={{ display: 'none' }} aria-hidden="true">
              <h1>نقشه املاک {selectedCity.name}</h1>
              <p>نمایش {totalCount} ملک در نقشه {selectedCity.name}. شامل آگهی‌های خرید و فروش آپارتمان، خانه، ویلا و زمین در بهترین مناطق {selectedCity.name}.</p>
            </div>
            
            <MapContainer
              key={`${mapCenter[0]}-${mapCenter[1]}-${selectedCity?.id}`}
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: '100%', width: '100%' }}
              zoomControl={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {properties.map((property) => (
                <Marker
                  key={property.id}
                  position={[property.lat, property.lng]}
                  icon={selectedProperty?.id === property.id ? goldHouseMarker : houseMarker}
                  eventHandlers={{
                    click: () => handleMarkerClick(property)
                  }}
                  aria-label={`مشاهده ملک ${property.title}`}
                >
                  <Tooltip 
                    direction="top" 
                    offset={[0, -20]} 
                    opacity={0.9}
                    className="custom-tooltip"
                    permanent={false}
                    sticky
                  >
                    <span className="tooltip-title">{property.title}</span>
                    <br />
                    <span className="tooltip-price">{property.priceFormatted} تومان</span>
                  </Tooltip>
                  
                  <Popup>
                    <div className="custom-popup">
                      <div className="popup-image">
                        {property.image ? (
                          <img 
                            src={property.image} 
                            alt={property.title}
                            loading="lazy"
                          />
                        ) : (
                          <div className="popup-image-placeholder">
                            <FaImage />
                            <span>{property.title}</span>
                          </div>
                        )}
                      </div>
                      <div className="popup-title">{property.title}</div>
                      <div className="popup-price">{property.priceFormatted} تومان</div>
                      <div className="popup-info">
                        {property.area > 0 && (
                          <span><FaRulerCombined /> {property.area} متر</span>
                        )}
                        {property.rooms > 0 && (
                          <span><FaBed /> {property.rooms} خواب</span>
                        )}
                      </div>
                      <div className="popup-location">
                        <FaMapPin /> {property.regionName}
                      </div>
                      <button 
                        className="popup-btn-custom"
                        onClick={() => handleViewDetail(property)}
                        aria-label={`مشاهده جزئیات ${property.title}`}
                      >
                        مشاهده جزئیات <FaArrowRight />
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </>
        )}
      </div>

      {/* پنل پایین */}
      {selectedProperty && (
        <div className="bottom-panel" itemScope itemType="https://schema.org/Product">
          <div className="panel-header">
            <h3 itemProp="name">{selectedProperty.title}</h3>
            <button className="panel-close" onClick={() => setSelectedProperty(null)} aria-label="بستن">
              ✕
            </button>
          </div>
          
          <div className="panel-content">
            <div className="property-image">
              {selectedProperty.image ? (
                <img 
                  src={selectedProperty.image} 
                  alt={selectedProperty.title}
                  itemProp="image"
                  loading="lazy"
                />
              ) : (
                <div className="image-placeholder">
                  <div>
                    <FaImage />
                    <span>بدون تصویر</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="property-tags">
              <span className="tag primary">{selectedProperty.type}</span>
              <span className="tag">{selectedProperty.regionName}</span>
            </div>
            
            <div className="price-section" itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <div className="price-label">قیمت کل</div>
              <div className="price-value" itemProp="price">
                {selectedProperty.priceFormatted}
                <span className="price-unit">تومان</span>
              </div>
              <meta itemProp="priceCurrency" content="IRT" />
            </div>
            
            <div className="features-grid">
              <div className="feature-item">
                <span className="feature-icon">📏</span>
                <div className="feature-label">متراژ</div>
                <div className="feature-value">{selectedProperty.area} متر</div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🛏️</span>
                <div className="feature-label">اتاق</div>
                <div className="feature-value">{selectedProperty.rooms} عدد</div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🚽</span>
                <div className="feature-label">سرویس بهداشتی</div>
                <div className="feature-value">{selectedProperty.bathrooms} عدد</div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🏗️</span>
                <div className="feature-label">سال ساخت</div>
                <div className="feature-value">{selectedProperty.constructionYear}</div>
              </div>
            </div>
            
            <div className="info-row">
              <span className="info-label">منطقه</span>
              <span className="info-value">{selectedProperty.regionName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">طبقات</span>
              <span className="info-value">{selectedProperty.floorCount}</span>
            </div>
            
            <div className="description" itemProp="description">
              {selectedProperty.description}
            </div>
            
            <button 
              className="detail-btn"
              onClick={() => handleViewDetail(selectedProperty)}
              aria-label={`مشاهده جزئیات بیشتر ${selectedProperty.title}`}
            >
              مشاهده جزئیات بیشتر
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapSearchPage;