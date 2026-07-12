// // import React, { useState, useEffect, useCallback } from 'react';
// // import { FaHome, FaMapMarkerAlt, FaCalendarAlt, FaTag, FaEye, FaArrowRight, FaCheckCircle, FaTimes, FaPhone, FaLock, FaSpinner } from 'react-icons/fa';
// // import './ApplicantPropertiesPage.css';

// // const ApplicantPropertiesPage = () => {
// //   const [properties, setProperties] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [selectedProperty, setSelectedProperty] = useState(null);
// //   const [showDetailModal, setShowDetailModal] = useState(false);
// //   const [paymentLoading, setPaymentLoading] = useState({});
// //   const [pagination, setPagination] = useState({
// //     pageNumber: 1,
// //     pageSize: 10,
// //     totalCount: 0,
// //     totalPages: 0,
// //     hasNextPage: false,
// //     hasPreviousPage: false
// //   });

// //   // دریافت لیست درخواست‌ها
// //   const fetchProperties = useCallback(async (pageNumber = 1) => {
// //     try {
// //       setLoading(true);
// //       const token = localStorage.getItem('auth_token');
      
// //       const response = await fetch(
// //         `https://localhost:7178/api/RealEstatePage/RealEstatesesApplicationsDtosAsync?pageNumber=${pageNumber}&pageSize=${pagination.pageSize}`,
// //         {
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           }
// //         }
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
// //         throw new Error(result.message || 'خطا در دریافت اطلاعات');
// //       }
// //     } catch (error) {
// //       console.error('❌ خطا:', error);
// //       setError('مشکل در دریافت اطلاعات');
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [pagination.pageSize]);

// //   useEffect(() => {
// //     fetchProperties();
// //   }, [fetchProperties]);

// //   // پرداخت
// //   const handlePayment = async (property) => {
// //     try {
// //       setPaymentLoading(prev => ({ ...prev, [property.code]: true }));
      
// //       // اینجا کد پرداخت شما قرار می‌گیرد
// //       // مثلاً هدایت به درگاه پرداخت
// //       alert(`شما در حال پرداخت برای "${property.title}" هستید`);
      
// //       // بعد از پرداخت موفق، لیست را به‌روز می‌کنیم
// //       await fetchProperties(pagination.pageNumber);
      
// //     } catch (error) {
// //       console.error('❌ خطا در پرداخت:', error);
// //       alert('مشکل در پرداخت. لطفاً دوباره تلاش کنید.');
// //     } finally {
// //       setPaymentLoading(prev => ({ ...prev, [property.code]: false }));
// //     }
// //   };

// //   // جزئیات
// //   const handleShowDetails = (property) => {
// //     setSelectedProperty(property);
// //     setShowDetailModal(true);
// //     document.body.style.overflow = 'hidden';
// //   };

// //   const handleCloseModal = () => {
// //     setShowDetailModal(false);
// //     setSelectedProperty(null);
// //     document.body.style.overflow = '';
// //   };

// //   // تغییر صفحه
// //   const handlePageChange = (newPage) => {
// //     if (newPage >= 1 && newPage <= pagination.totalPages) {
// //       fetchProperties(newPage);
// //       window.scrollTo({ top: 0, behavior: 'smooth' });
// //     }
// //   };

// //   // فرمت تاریخ
// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'تاریخ نامشخص';
// //     const date = new Date(dateString);
// //     return new Intl.DateTimeFormat('fa-IR', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     }).format(date);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="applicant-page-container">
// //         <div className="applicant-header">
// //           <h1 className="applicant-title">درخواست‌های من</h1>
// //         </div>
// //         <div className="applicant-loading">
// //           <FaSpinner className="loading-spinner" />
// //           <span>در حال بارگذاری...</span>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="applicant-page-container">
// //         <div className="applicant-header">
// //           <h1 className="applicant-title">درخواست‌های من</h1>
// //         </div>
// //         <div className="applicant-error">
// //           <FaTimes className="error-icon" />
// //           <p>{error}</p>
// //           <button onClick={() => fetchProperties()} className="retry-btn">
// //             تلاش مجدد
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="applicant-page-container">
// //       {/* هدر */}
// //       <div className="applicant-header">
// //         <div className="header-content">
// //           <h1 className="applicant-title">
// //             <FaHome className="title-icon" />
// //             درخواست‌های من
// //           </h1>
// //           <span className="total-count">{pagination.totalCount} درخواست</span>
// //         </div>
// //       </div>

// //       {/* لیست درخواست‌ها */}
// //       {properties.length === 0 ? (
// //         <div className="applicant-empty">
// //           <FaHome className="empty-icon" />
// //           <h3>هیچ درخواستی یافت نشد</h3>
// //           <p>شما هنوز درخواستی ثبت نکرده‌اید</p>
// //         </div>
// //       ) : (
// //         <>
// //           <div className="applicant-grid">
// //             {properties.map((property) => (
// //               <div key={property.code} className="applicant-card">
// //                 {/* وضعیت پرداخت */}
// //                 <div className={`payment-status ${property.isPaid ? 'paid' : 'unpaid'}`}>
// //                   {property.isPaid ? (
// //                     <span className="status-badge paid">
// //                       <FaCheckCircle /> پرداخت شده
// //                     </span>
// //                   ) : (
// //                     <span className="status-badge unpaid">
// //                       <FaLock /> پرداخت نشده
// //                     </span>
// //                   )}
// //                 </div>

// //                 {/* محتوای کارت */}
// //                 <div className="card-body">
// //                   <h3 className="property-title">{property.title}</h3>
                  
// //                   <div className="property-info">
// //                     <div className="info-item">
// //                       <FaTag className="info-icon" />
// //                       <span>{property.categoryName || 'بدون دسته‌بندی'}</span>
// //                     </div>
                    
// //                     <div className="info-item">
// //                       <FaMapMarkerAlt className="info-icon" />
// //                       <span>{property.regionName || 'منطقه نامشخص'}</span>
// //                     </div>

// //                     {property.regions && property.regions.length > 0 && (
// //                       <div className="info-item regions">
// //                         <FaMapMarkerAlt className="info-icon" />
// //                         <div className="regions-tags">
// //                           {property.regions.slice(0, 3).map((region, idx) => (
// //                             <span key={idx} className="region-tag">{region}</span>
// //                           ))}
// //                           {property.regions.length > 3 && (
// //                             <span className="region-tag more">+{property.regions.length - 3}</span>
// //                           )}
// //                         </div>
// //                       </div>
// //                     )}

// //                     <div className="info-item">
// //                       <FaCalendarAlt className="info-icon" />
// //                       <span>{property.createdAtPersianRelative || formatDate(property.createdAt)}</span>
// //                     </div>
// //                   </div>

// //                   {/* شماره موبایل - فقط در صورت پرداخت */}
// //                   {property.isPaid && property.mobileNumber ? (
// //                     <div className="phone-display">
// //                       <FaPhone className="phone-icon" />
// //                       <span className="phone-number">{property.mobileNumber}</span>
// //                     </div>
// //                   ) : (
// //                     <div className="phone-locked">
// //                       <FaLock className="lock-icon" />
// //                       <span>برای مشاهده شماره تماس، پرداخت کنید</span>
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* دکمه‌های اقدام */}
// //                 <div className="card-actions">
// //                   {!property.isPaid && (
// //                     <button 
// //                       className="action-btn payment-btn"
// //                       onClick={() => handlePayment(property)}
// //                       disabled={paymentLoading[property.code]}
// //                     >
// //                       {paymentLoading[property.code] ? (
// //                         <FaSpinner className="spinner" />
// //                       ) : (
// //                         'پرداخت'
// //                       )}
// //                     </button>
// //                   )}
// //                   <button 
// //                     className="action-btn details-btn"
// //                     onClick={() => handleShowDetails(property)}
// //                   >
// //                     جزئیات
// //                     <FaArrowRight className="btn-arrow" />
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* صفحه‌بندی */}
// //           {pagination.totalPages > 1 && (
// //             <div className="pagination">
// //               <button
// //                 className="page-btn"
// //                 onClick={() => handlePageChange(pagination.pageNumber - 1)}
// //                 disabled={!pagination.hasPreviousPage}
// //               >
// //                 قبلی
// //               </button>
              
// //               {[...Array(pagination.totalPages)].map((_, index) => {
// //                 const pageNum = index + 1;
// //                 const isActive = pageNum === pagination.pageNumber;
// //                 // نمایش حداکثر ۵ صفحه
// //                 if (
// //                   pageNum === 1 ||
// //                   pageNum === pagination.totalPages ||
// //                   (pageNum >= pagination.pageNumber - 1 && pageNum <= pagination.pageNumber + 1)
// //                 ) {
// //                   return (
// //                     <button
// //                       key={pageNum}
// //                       className={`page-btn ${isActive ? 'active' : ''}`}
// //                       onClick={() => handlePageChange(pageNum)}
// //                     >
// //                       {pageNum}
// //                     </button>
// //                   );
// //                 }
// //                 if (pageNum === pagination.pageNumber - 2 || pageNum === pagination.pageNumber + 2) {
// //                   return <span key={pageNum} className="page-dots">...</span>;
// //                 }
// //                 return null;
// //               })}
              
// //               <button
// //                 className="page-btn"
// //                 onClick={() => handlePageChange(pagination.pageNumber + 1)}
// //                 disabled={!pagination.hasNextPage}
// //               >
// //                 بعدی
// //               </button>
// //             </div>
// //           )}
// //         </>
// //       )}

// //       {/* مودال جزئیات */}
// //       {showDetailModal && selectedProperty && (
// //         <div className="detail-modal-overlay" onClick={handleCloseModal}>
// //           <div className="detail-modal-content" onClick={(e) => e.stopPropagation()}>
// //             <button className="modal-close-btn" onClick={handleCloseModal}>
// //               <FaTimes />
// //             </button>

// //             <div className="modal-header">
// //               <h2 className="modal-title">{selectedProperty.title}</h2>
// //               <span className={`modal-status ${selectedProperty.isPaid ? 'paid' : 'unpaid'}`}>
// //                 {selectedProperty.isPaid ? '✓ پرداخت شده' : '🔒 پرداخت نشده'}
// //               </span>
// //             </div>

// //             <div className="modal-body">
// //               <div className="detail-row">
// //                 <span className="detail-label">دسته‌بندی:</span>
// //                 <span className="detail-value">{selectedProperty.categoryName || 'نامشخص'}</span>
// //               </div>

// //               <div className="detail-row">
// //                 <span className="detail-label">منطقه:</span>
// //                 <span className="detail-value">{selectedProperty.regionName || 'نامشخص'}</span>
// //               </div>

// //               {selectedProperty.regions && selectedProperty.regions.length > 0 && (
// //                 <div className="detail-row">
// //                   <span className="detail-label">مناطق:</span>
// //                   <div className="detail-value regions-list">
// //                     {selectedProperty.regions.map((region, idx) => (
// //                       <span key={idx} className="region-badge">{region}</span>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               <div className="detail-row">
// //                 <span className="detail-label">کد درخواست:</span>
// //                 <span className="detail-value">{selectedProperty.code}</span>
// //               </div>

// //               <div className="detail-row">
// //                 <span className="detail-label">تاریخ ثبت:</span>
// //                 <span className="detail-value">{formatDate(selectedProperty.createdAt)}</span>
// //               </div>

// //               <div className="detail-row">
// //                 <span className="detail-label">نسبت به الان:</span>
// //                 <span className="detail-value">{selectedProperty.createdAtPersianRelative || 'نامشخص'}</span>
// //               </div>

// //               {/* شماره تماس */}
// //               <div className="detail-row phone-row">
// //                 <span className="detail-label">شماره تماس:</span>
// //                 {selectedProperty.isPaid && selectedProperty.mobileNumber ? (
// //                   <span className="detail-value phone-value">
// //                     <FaPhone className="phone-icon-modal" />
// //                     {selectedProperty.mobileNumber}
// //                   </span>
// //                 ) : (
// //                   <span className="detail-value phone-locked-modal">
// //                     <FaLock className="lock-icon-modal" />
// //                     برای مشاهده شماره تماس باید پرداخت کنید
// //                   </span>
// //                 )}
// //               </div>
// //             </div>

// //             {!selectedProperty.isPaid && (
// //               <div className="modal-footer">
// //                 <button 
// //                   className="payment-btn-modal"
// //                   onClick={() => {
// //                     handleCloseModal();
// //                     handlePayment(selectedProperty);
// //                   }}
// //                 >
// //                   پرداخت برای مشاهده شماره تماس
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ApplicantPropertiesPage;

// import React, { useState, useEffect, useCallback } from 'react';
// import { FaHome, FaMapMarkerAlt, FaCalendarAlt, FaTag, FaEye, FaArrowRight, FaCheckCircle, FaTimes, FaPhone, FaLock, FaSpinner } from 'react-icons/fa';
// import './ApplicantPropertiesPage.css';

// const ApplicantPropertiesPage = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [paymentLoading, setPaymentLoading] = useState({});
//   const [pagination, setPagination] = useState({
//     pageNumber: 1,
//     pageSize: 10,
//     totalCount: 0,
//     totalPages: 0,
//     hasNextPage: false,
//     hasPreviousPage: false
//   });

//   const fetchProperties = useCallback(async (pageNumber = 1) => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('auth_token');
      
//       const response = await fetch(
//         `https://localhost:7178/api/RealEstatePage/RealEstatesesApplicationsDtosAsync?pageNumber=${pageNumber}&pageSize=${pagination.pageSize}`,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
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
//         throw new Error(result.message || 'خطا در دریافت اطلاعات');
//       }
//     } catch (error) {
//       console.error('❌ خطا:', error);
//       setError('مشکل در دریافت اطلاعات');
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.pageSize]);

//   useEffect(() => {
//     fetchProperties();
//   }, [fetchProperties]);

//   const handlePayment = async (property) => {
//     try {
//       setPaymentLoading(prev => ({ ...prev, [property.code]: true }));
//       alert(`شما در حال پرداخت برای "${property.title}" هستید`);
//       await fetchProperties(pagination.pageNumber);
//     } catch (error) {
//       console.error('❌ خطا در پرداخت:', error);
//       alert('مشکل در پرداخت. لطفاً دوباره تلاش کنید.');
//     } finally {
//       setPaymentLoading(prev => ({ ...prev, [property.code]: false }));
//     }
//   };

//   const handleShowDetails = (property) => {
//     setSelectedProperty(property);
//     setShowDetailModal(true);
//     document.body.style.overflow = 'hidden';
//   };

//   const handleCloseModal = () => {
//     setShowDetailModal(false);
//     setSelectedProperty(null);
//     document.body.style.overflow = '';
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       fetchProperties(newPage);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'تاریخ نامشخص';
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('fa-IR', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     }).format(date);
//   };

//   if (loading) {
//     return (
//       <div className="applicant-page-container">
//         <div className="applicant-header">
//           <h1 className="applicant-title">درخواست‌های من</h1>
//         </div>
//         <div className="applicant-loading">
//           <FaSpinner className="loading-spinner" />
//           <span>در حال بارگذاری...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="applicant-page-container">
//         <div className="applicant-header">
//           <h1 className="applicant-title">درخواست‌های من</h1>
//         </div>
//         <div className="applicant-error">
//           <FaTimes className="error-icon" />
//           <p>{error}</p>
//           <button onClick={() => fetchProperties()} className="retry-btn">
//             تلاش مجدد
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="applicant-page-container">
//       {/* هدر */}
//       <div className="applicant-header">
//         <div className="header-content">
//           <h1 className="applicant-title">
//             <FaHome className="title-icon" />
//             درخواست‌های من
//           </h1>
//           <span className="total-count">{pagination.totalCount} درخواست</span>
//         </div>
//       </div>

//       {/* لیست درخواست‌ها */}
//       {properties.length === 0 ? (
//         <div className="applicant-empty">
//           <FaHome className="empty-icon" />
//           <h3>هیچ درخواستی یافت نشد</h3>
//           <p>شما هنوز درخواستی ثبت نکرده‌اید</p>
//         </div>
//       ) : (
//         <>
//           <div className="applicant-grid">
//             {properties.map((property) => (
//               <div key={property.code} className="applicant-card">
//                 <div className="card-top">
//                   <div className="card-header">
//                     <h3 className="property-title">{property.title}</h3>
//                     <span className={`status-badge ${property.isPaid ? 'paid' : 'unpaid'}`}>
//                       {property.isPaid ? (
//                         <><FaCheckCircle /> پرداخت شده</>
//                       ) : (
//                         <><FaLock /> پرداخت نشده</>
//                       )}
//                     </span>
//                   </div>
                  
//                   <div className="property-info-compact">
//                     <span className="info-tag">
//                       <FaTag className="info-icon-small" />
//                       {property.categoryName || 'نامشخص'}
//                     </span>
//                     <span className="info-tag">
//                       <FaMapMarkerAlt className="info-icon-small" />
//                       {property.regionName || 'منطقه نامشخص'}
//                     </span>
//                     <span className="info-tag">
//                       <FaCalendarAlt className="info-icon-small" />
//                       {property.createdAtPersianRelative || 'نامشخص'}
//                     </span>
//                   </div>

//                   {property.regions && property.regions.length > 0 && (
//                     <div className="regions-compact">
//                       {property.regions.slice(0, 3).map((region, idx) => (
//                         <span key={idx} className="region-tag-small">{region}</span>
//                       ))}
//                       {property.regions.length > 3 && (
//                         <span className="region-tag-small more">+{property.regions.length - 3}</span>
//                       )}
//                     </div>
//                   )}

//                   {/* شماره موبایل */}
//                   {property.isPaid && property.mobileNumber ? (
//                     <div className="phone-display-compact">
//                       <FaPhone className="phone-icon-small" />
//                       <span className="phone-number-small">{property.mobileNumber}</span>
//                     </div>
//                   ) : (
//                     <div className="phone-locked-compact">
//                       <FaLock className="lock-icon-small" />
//                       <span>برای مشاهده شماره، پرداخت کنید</span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="card-actions-compact">
//                   {!property.isPaid && (
//                     <button 
//                       className="action-btn-small payment-btn-small"
//                       onClick={() => handlePayment(property)}
//                       disabled={paymentLoading[property.code]}
//                     >
//                       {paymentLoading[property.code] ? (
//                         <FaSpinner className="spinner-small" />
//                       ) : (
//                         'پرداخت'
//                       )}
//                     </button>
//                   )}
//                   <button 
//                     className="action-btn-small details-btn-small"
//                     onClick={() => handleShowDetails(property)}
//                   >
//                     جزئیات
//                     <FaArrowRight className="btn-arrow-small" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* صفحه‌بندی */}
//           {pagination.totalPages > 1 && (
//             <div className="pagination-compact">
//               <button
//                 className="page-btn-small"
//                 onClick={() => handlePageChange(pagination.pageNumber - 1)}
//                 disabled={!pagination.hasPreviousPage}
//               >
//                 قبلی
//               </button>
              
//               {[...Array(pagination.totalPages)].map((_, index) => {
//                 const pageNum = index + 1;
//                 const isActive = pageNum === pagination.pageNumber;
//                 if (
//                   pageNum === 1 ||
//                   pageNum === pagination.totalPages ||
//                   (pageNum >= pagination.pageNumber - 1 && pageNum <= pagination.pageNumber + 1)
//                 ) {
//                   return (
//                     <button
//                       key={pageNum}
//                       className={`page-btn-small ${isActive ? 'active' : ''}`}
//                       onClick={() => handlePageChange(pageNum)}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 }
//                 if (pageNum === pagination.pageNumber - 2 || pageNum === pagination.pageNumber + 2) {
//                   return <span key={pageNum} className="page-dots-small">...</span>;
//                 }
//                 return null;
//               })}
              
//               <button
//                 className="page-btn-small"
//                 onClick={() => handlePageChange(pagination.pageNumber + 1)}
//                 disabled={!pagination.hasNextPage}
//               >
//                 بعدی
//               </button>
//             </div>
//           )}
//         </>
//       )}

//       {/* مودال جزئیات */}
//       {showDetailModal && selectedProperty && (
//         <div className="detail-modal-overlay" onClick={handleCloseModal}>
//           <div className="detail-modal-content" onClick={(e) => e.stopPropagation()}>
//             <button className="modal-close-btn" onClick={handleCloseModal}>
//               <FaTimes />
//             </button>

//             <div className="modal-header">
//               <h2 className="modal-title">{selectedProperty.title}</h2>
//               <span className={`modal-status ${selectedProperty.isPaid ? 'paid' : 'unpaid'}`}>
//                 {selectedProperty.isPaid ? '✓ پرداخت شده' : '🔒 پرداخت نشده'}
//               </span>
//             </div>

//             <div className="modal-body">
//               <div className="detail-row">
//                 <span className="detail-label">دسته‌بندی:</span>
//                 <span className="detail-value">{selectedProperty.categoryName || 'نامشخص'}</span>
//               </div>

//               <div className="detail-row">
//                 <span className="detail-label">منطقه:</span>
//                 <span className="detail-value">{selectedProperty.regionName || 'نامشخص'}</span>
//               </div>

//               {selectedProperty.regions && selectedProperty.regions.length > 0 && (
//                 <div className="detail-row">
//                   <span className="detail-label">مناطق:</span>
//                   <div className="detail-value regions-list">
//                     {selectedProperty.regions.map((region, idx) => (
//                       <span key={idx} className="region-badge">{region}</span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <div className="detail-row">
//                 <span className="detail-label">کد درخواست:</span>
//                 <span className="detail-value">{selectedProperty.code}</span>
//               </div>

//               <div className="detail-row">
//                 <span className="detail-label">تاریخ ثبت:</span>
//                 <span className="detail-value">{formatDate(selectedProperty.createdAt)}</span>
//               </div>

//               <div className="detail-row phone-row">
//                 <span className="detail-label">شماره تماس:</span>
//                 {selectedProperty.isPaid && selectedProperty.mobileNumber ? (
//                   <span className="detail-value phone-value">
//                     <FaPhone className="phone-icon-modal" />
//                     {selectedProperty.mobileNumber}
//                   </span>
//                 ) : (
//                   <span className="detail-value phone-locked-modal">
//                     <FaLock className="lock-icon-modal" />
//                     برای مشاهده شماره تماس باید پرداخت کنید
//                   </span>
//                 )}
//               </div>
//             </div>

//             {!selectedProperty.isPaid && (
//               <div className="modal-footer">
//                 <button 
//                   className="payment-btn-modal"
//                   onClick={() => {
//                     handleCloseModal();
//                     handlePayment(selectedProperty);
//                   }}
//                 >
//                   پرداخت برای مشاهده شماره تماس
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ApplicantPropertiesPage;

import React, { useState, useEffect, useCallback } from 'react';
import { FaHome, FaMapMarkerAlt, FaCalendarAlt, FaTag, FaArrowRight, FaCheckCircle, FaTimes, FaPhone, FaLock, FaSpinner, FaAlignLeft, FaMoneyBill } from 'react-icons/fa';
import './ApplicantPropertiesPage.css';

const ApplicantPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState({});
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false
  });

  const fetchProperties = useCallback(async (pageNumber = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch(
        `https://localhost:7178/api/RealEstatePage/RealEstatesesApplicationsDtosAsync?pageNumber=${pageNumber}&pageSize=${pagination.pageSize}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
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
        throw new Error(result.message || 'خطا در دریافت اطلاعات');
      }
    } catch (error) {
      console.error('❌ خطا:', error);
      setError('مشکل در دریافت اطلاعات');
    } finally {
      setLoading(false);
    }
  }, [pagination.pageSize]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handlePayment = async (property) => {
    try {
      setPaymentLoading(prev => ({ ...prev, [property.code]: true }));
      alert(`شما در حال پرداخت برای "${property.title}" هستید`);
      await fetchProperties(pagination.pageNumber);
    } catch (error) {
      console.error('❌ خطا در پرداخت:', error);
      alert('مشکل در پرداخت. لطفاً دوباره تلاش کنید.');
    } finally {
      setPaymentLoading(prev => ({ ...prev, [property.code]: false }));
    }
  };

  const handleShowDetails = (property) => {
    setSelectedProperty(property);
    setShowDetailModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedProperty(null);
    document.body.style.overflow = '';
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchProperties(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'تاریخ نامشخص';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatBudget = (budget) => {
    if (!budget || budget === 0) return 'نامشخص';
    return budget.toLocaleString('fa-IR') + ' تومان';
  };

  if (loading) {
    return (
      <div className="applicant-page-container">
        <div className="applicant-header">
          <h1 className="applicant-title">درخواست‌های من</h1>
        </div>
        <div className="applicant-loading">
          <FaSpinner className="loading-spinner" />
          <span>در حال بارگذاری...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="applicant-page-container">
        <div className="applicant-header">
          <h1 className="applicant-title">درخواست‌های من</h1>
        </div>
        <div className="applicant-error">
          <FaTimes className="error-icon" />
          <p>{error}</p>
          <button onClick={() => fetchProperties()} className="retry-btn">
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="applicant-page-container">
      {/* هدر */}
      <div className="applicant-header">
        <div className="header-content">
          <h1 className="applicant-title">
            <FaHome className="title-icon" />
            درخواست‌های من
          </h1>
          <span className="total-count">{pagination.totalCount} درخواست</span>
        </div>
      </div>

      {/* لیست درخواست‌ها */}
      {properties.length === 0 ? (
        <div className="applicant-empty">
          <FaHome className="empty-icon" />
          <h3>هیچ درخواستی یافت نشد</h3>
          <p>شما هنوز درخواستی ثبت نکرده‌اید</p>
        </div>
      ) : (
        <>
          <div className="applicant-grid">
            {properties.map((property) => (
              <div key={property.code} className="applicant-card">
                <div className="card-top">
                  <div className="card-header">
                    <h3 className="property-title">{property.title}</h3>
                    <span className={`status-badge ${property.isPaid ? 'paid' : 'unpaid'}`}>
                      {property.isPaid ? (
                        <><FaCheckCircle /> پرداخت شده</>
                      ) : (
                        <><FaLock /> پرداخت نشده</>
                      )}
                    </span>
                  </div>
                  
                  <div className="property-info-compact">
                    <span className="info-tag">
                      <FaTag className="info-icon-small" />
                      {property.categoryName || 'نامشخص'}
                    </span>
                    <span className="info-tag">
                      <FaMapMarkerAlt className="info-icon-small" />
                      {property.regionName || 'منطقه نامشخص'}
                    </span>
                    <span className="info-tag">
                      <FaCalendarAlt className="info-icon-small" />
                      {property.createdAtPersianRelative || 'نامشخص'}
                    </span>
                  </div>

                  {/* مناطق با بک‌گراند مشخص */}
                  {property.regions && property.regions.length > 0 && (
                    <div className="regions-compact">
                      <span className="regions-label">مناطق:</span>
                      {property.regions.slice(0, 4).map((region, idx) => (
                        <span key={idx} className="region-tag-small">{region}</span>
                      ))}
                      {property.regions.length > 4 && (
                        <span className="region-tag-small more">+{property.regions.length - 4}</span>
                      )}
                    </div>
                  )}

                  {/* توضیحات */}
                  {property.desc && (
                    <div className="desc-compact">
                      <FaAlignLeft className="desc-icon-small" />
                      <span className="desc-text">{property.desc}</span>
                    </div>
                  )}

                  {/* شماره موبایل */}
                  {property.isPaid && property.mobileNumber ? (
                    <div className="phone-display-compact">
                      <FaPhone className="phone-icon-small" />
                      <span className="phone-number-small">{property.mobileNumber}</span>
                    </div>
                  ) : (
                    <div className="phone-locked-compact">
                      <FaLock className="lock-icon-small" />
                      <span>برای مشاهده شماره، پرداخت کنید</span>
                    </div>
                  )}
                </div>

                <div className="card-actions-compact">
                  {!property.isPaid && (
                    <button 
                      className="action-btn-small payment-btn-small"
                      onClick={() => handlePayment(property)}
                      disabled={paymentLoading[property.code]}
                    >
                      {paymentLoading[property.code] ? (
                        <FaSpinner className="spinner-small" />
                      ) : (
                        'پرداخت'
                      )}
                    </button>
                  )}
                  <button 
                    className="action-btn-small details-btn-small"
                    onClick={() => handleShowDetails(property)}
                  >
                    جزئیات
                    <FaArrowRight className="btn-arrow-small" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* صفحه‌بندی */}
          {pagination.totalPages > 1 && (
            <div className="pagination-compact">
              <button
                className="page-btn-small"
                onClick={() => handlePageChange(pagination.pageNumber - 1)}
                disabled={!pagination.hasPreviousPage}
              >
                قبلی
              </button>
              
              {[...Array(pagination.totalPages)].map((_, index) => {
                const pageNum = index + 1;
                const isActive = pageNum === pagination.pageNumber;
                if (
                  pageNum === 1 ||
                  pageNum === pagination.totalPages ||
                  (pageNum >= pagination.pageNumber - 1 && pageNum <= pagination.pageNumber + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      className={`page-btn-small ${isActive ? 'active' : ''}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                }
                if (pageNum === pagination.pageNumber - 2 || pageNum === pagination.pageNumber + 2) {
                  return <span key={pageNum} className="page-dots-small">...</span>;
                }
                return null;
              })}
              
              <button
                className="page-btn-small"
                onClick={() => handlePageChange(pagination.pageNumber + 1)}
                disabled={!pagination.hasNextPage}
              >
                بعدی
              </button>
            </div>
          )}
        </>
      )}

      {/* مودال جزئیات */}
      {showDetailModal && selectedProperty && (
        <div className="detail-modal-overlay" onClick={handleCloseModal}>
          <div className="detail-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal}>
              <FaTimes />
            </button>

            <div className="modal-header">
              <h2 className="modal-title">{selectedProperty.title}</h2>
              <span className={`modal-status ${selectedProperty.isPaid ? 'paid' : 'unpaid'}`}>
                {selectedProperty.isPaid ? '✓ پرداخت شده' : '🔒 پرداخت نشده'}
              </span>
            </div>

            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">دسته‌بندی:</span>
                <span className="detail-value">{selectedProperty.categoryName || 'نامشخص'}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">منطقه اصلی:</span>
                <span className="detail-value">{selectedProperty.regionName || 'نامشخص'}</span>
              </div>

              {selectedProperty.regions && selectedProperty.regions.length > 0 && (
                <div className="detail-row">
                  <span className="detail-label">مناطق مورد نظر:</span>
                  <div className="detail-value regions-list">
                    {selectedProperty.regions.map((region, idx) => (
                      <span key={idx} className="region-badge">{region}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedProperty.desc && (
                <div className="detail-row desc-row">
                  <span className="detail-label">توضیحات:</span>
                  <span className="detail-value desc-value">{selectedProperty.desc}</span>
                </div>
              )}

              {selectedProperty.budget > 0 && (
                <div className="detail-row">
                  <span className="detail-label">بودجه:</span>
                  <span className="detail-value budget-value">
                    <FaMoneyBill className="budget-icon" />
                    {formatBudget(selectedProperty.budget)}
                  </span>
                </div>
              )}

              <div className="detail-row">
                <span className="detail-label">کد درخواست:</span>
                <span className="detail-value">{selectedProperty.code}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">تاریخ ثبت:</span>
                <span className="detail-value">{formatDate(selectedProperty.createdAt)}</span>
              </div>

              <div className="detail-row phone-row">
                <span className="detail-label">شماره تماس:</span>
                {selectedProperty.isPaid && selectedProperty.mobileNumber ? (
                  <span className="detail-value phone-value">
                    <FaPhone className="phone-icon-modal" />
                    {selectedProperty.mobileNumber}
                  </span>
                ) : (
                  <span className="detail-value phone-locked-modal">
                    <FaLock className="lock-icon-modal" />
                    برای مشاهده شماره تماس باید پرداخت کنید
                  </span>
                )}
              </div>
            </div>

            {!selectedProperty.isPaid && (
              <div className="modal-footer">
                <button 
                  className="payment-btn-modal"
                  onClick={() => {
                    handleCloseModal();
                    handlePayment(selectedProperty);
                  }}
                >
                  پرداخت برای مشاهده شماره تماس
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantPropertiesPage;