// // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // import { FaHome, FaMapMarkerAlt, FaCalendarAlt, FaTag, FaEye, FaArrowRight, FaCheckCircle, FaTimes, FaPhone, FaLock, FaSpinner } from 'react-icons/fa';
// // // // // // // import './ApplicantPropertiesPage.css';

// // // // // // // const ApplicantPropertiesPage = () => {
// // // // // // //   const [properties, setProperties] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [error, setError] = useState(null);
// // // // // // //   const [selectedProperty, setSelectedProperty] = useState(null);
// // // // // // //   const [showDetailModal, setShowDetailModal] = useState(false);
// // // // // // //   const [paymentLoading, setPaymentLoading] = useState({});
// // // // // // //   const [pagination, setPagination] = useState({
// // // // // // //     pageNumber: 1,
// // // // // // //     pageSize: 10,
// // // // // // //     totalCount: 0,
// // // // // // //     totalPages: 0,
// // // // // // //     hasNextPage: false,
// // // // // // //     hasPreviousPage: false
// // // // // // //   });

// // // // // // //   // دریافت لیست درخواست‌ها
// // // // // // //   const fetchProperties = useCallback(async (pageNumber = 1) => {
// // // // // // //     try {
// // // // // // //       setLoading(true);
// // // // // // //       const token = localStorage.getItem('auth_token');
      
// // // // // // //       const response = await fetch(
// // // // // // //         `https://localhost:7178/api/RealEstatePage/RealEstatesesApplicationsDtosAsync?pageNumber=${pageNumber}&pageSize=${pagination.pageSize}`,
// // // // // // //         {
// // // // // // //           headers: {
// // // // // // //             'Authorization': `Bearer ${token}`,
// // // // // // //             'Content-Type': 'application/json'
// // // // // // //           }
// // // // // // //         }
// // // // // // //       );

// // // // // // //       if (!response.ok) {
// // // // // // //         throw new Error(`HTTP ${response.status}`);
// // // // // // //       }

// // // // // // //       const result = await response.json();
      
// // // // // // //       if (result.status === 200 && result.data) {
// // // // // // //         setProperties(result.data.items || []);
// // // // // // //         setPagination({
// // // // // // //           pageNumber: result.data.pageNumber,
// // // // // // //           pageSize: result.data.pageSize,
// // // // // // //           totalCount: result.data.totalCount,
// // // // // // //           totalPages: result.data.totalPages,
// // // // // // //           hasNextPage: result.data.hasNextPage,
// // // // // // //           hasPreviousPage: result.data.hasPreviousPage
// // // // // // //         });
// // // // // // //       } else {
// // // // // // //         throw new Error(result.message || 'خطا در دریافت اطلاعات');
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error('❌ خطا:', error);
// // // // // // //       setError('مشکل در دریافت اطلاعات');
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   }, [pagination.pageSize]);

// // // // // // //   useEffect(() => {
// // // // // // //     fetchProperties();
// // // // // // //   }, [fetchProperties]);

// // // // // // //   // پرداخت
// // // // // // //   const handlePayment = async (property) => {
// // // // // // //     try {
// // // // // // //       setPaymentLoading(prev => ({ ...prev, [property.code]: true }));
      
// // // // // // //       // اینجا کد پرداخت شما قرار می‌گیرد
// // // // // // //       // مثلاً هدایت به درگاه پرداخت
// // // // // // //       alert(`شما در حال پرداخت برای "${property.title}" هستید`);
      
// // // // // // //       // بعد از پرداخت موفق، لیست را به‌روز می‌کنیم
// // // // // // //       await fetchProperties(pagination.pageNumber);
      
// // // // // // //     } catch (error) {
// // // // // // //       console.error('❌ خطا در پرداخت:', error);
// // // // // // //       alert('مشکل در پرداخت. لطفاً دوباره تلاش کنید.');
// // // // // // //     } finally {
// // // // // // //       setPaymentLoading(prev => ({ ...prev, [property.code]: false }));
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // جزئیات
// // // // // // //   const handleShowDetails = (property) => {
// // // // // // //     setSelectedProperty(property);
// // // // // // //     setShowDetailModal(true);
// // // // // // //     document.body.style.overflow = 'hidden';
// // // // // // //   };

// // // // // // //   const handleCloseModal = () => {
// // // // // // //     setShowDetailModal(false);
// // // // // // //     setSelectedProperty(null);
// // // // // // //     document.body.style.overflow = '';
// // // // // // //   };

// // // // // // //   // تغییر صفحه
// // // // // // //   const handlePageChange = (newPage) => {
// // // // // // //     if (newPage >= 1 && newPage <= pagination.totalPages) {
// // // // // // //       fetchProperties(newPage);
// // // // // // //       window.scrollTo({ top: 0, behavior: 'smooth' });
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // فرمت تاریخ
// // // // // // //   const formatDate = (dateString) => {
// // // // // // //     if (!dateString) return 'تاریخ نامشخص';
// // // // // // //     const date = new Date(dateString);
// // // // // // //     return new Intl.DateTimeFormat('fa-IR', {
// // // // // // //       year: 'numeric',
// // // // // // //       month: 'long',
// // // // // // //       day: 'numeric',
// // // // // // //       hour: '2-digit',
// // // // // // //       minute: '2-digit'
// // // // // // //     }).format(date);
// // // // // // //   };

// // // // // // //   if (loading) {
// // // // // // //     return (
// // // // // // //       <div className="applicant-page-container">
// // // // // // //         <div className="applicant-header">
// // // // // // //           <h1 className="applicant-title">درخواست‌های من</h1>
// // // // // // //         </div>
// // // // // // //         <div className="applicant-loading">
// // // // // // //           <FaSpinner className="loading-spinner" />
// // // // // // //           <span>در حال بارگذاری...</span>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   if (error) {
// // // // // // //     return (
// // // // // // //       <div className="applicant-page-container">
// // // // // // //         <div className="applicant-header">
// // // // // // //           <h1 className="applicant-title">درخواست‌های من</h1>
// // // // // // //         </div>
// // // // // // //         <div className="applicant-error">
// // // // // // //           <FaTimes className="error-icon" />
// // // // // // //           <p>{error}</p>
// // // // // // //           <button onClick={() => fetchProperties()} className="retry-btn">
// // // // // // //             تلاش مجدد
// // // // // // //           </button>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="applicant-page-container">
// // // // // // //       {/* هدر */}
// // // // // // //       <div className="applicant-header">
// // // // // // //         <div className="header-content">
// // // // // // //           <h1 className="applicant-title">
// // // // // // //             <FaHome className="title-icon" />
// // // // // // //             درخواست‌های من
// // // // // // //           </h1>
// // // // // // //           <span className="total-count">{pagination.totalCount} درخواست</span>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* لیست درخواست‌ها */}
// // // // // // //       {properties.length === 0 ? (
// // // // // // //         <div className="applicant-empty">
// // // // // // //           <FaHome className="empty-icon" />
// // // // // // //           <h3>هیچ درخواستی یافت نشد</h3>
// // // // // // //           <p>شما هنوز درخواستی ثبت نکرده‌اید</p>
// // // // // // //         </div>
// // // // // // //       ) : (
// // // // // // //         <>
// // // // // // //           <div className="applicant-grid">
// // // // // // //             {properties.map((property) => (
// // // // // // //               <div key={property.code} className="applicant-card">
// // // // // // //                 {/* وضعیت پرداخت */}
// // // // // // //                 <div className={`payment-status ${property.isPaid ? 'paid' : 'unpaid'}`}>
// // // // // // //                   {property.isPaid ? (
// // // // // // //                     <span className="status-badge paid">
// // // // // // //                       <FaCheckCircle /> پرداخت شده
// // // // // // //                     </span>
// // // // // // //                   ) : (
// // // // // // //                     <span className="status-badge unpaid">
// // // // // // //                       <FaLock /> پرداخت نشده
// // // // // // //                     </span>
// // // // // // //                   )}
// // // // // // //                 </div>

// // // // // // //                 {/* محتوای کارت */}
// // // // // // //                 <div className="card-body">
// // // // // // //                   <h3 className="property-title">{property.title}</h3>
                  
// // // // // // //                   <div className="property-info">
// // // // // // //                     <div className="info-item">
// // // // // // //                       <FaTag className="info-icon" />
// // // // // // //                       <span>{property.categoryName || 'بدون دسته‌بندی'}</span>
// // // // // // //                     </div>
                    
// // // // // // //                     <div className="info-item">
// // // // // // //                       <FaMapMarkerAlt className="info-icon" />
// // // // // // //                       <span>{property.regionName || 'منطقه نامشخص'}</span>
// // // // // // //                     </div>

// // // // // // //                     {property.regions && property.regions.length > 0 && (
// // // // // // //                       <div className="info-item regions">
// // // // // // //                         <FaMapMarkerAlt className="info-icon" />
// // // // // // //                         <div className="regions-tags">
// // // // // // //                           {property.regions.slice(0, 3).map((region, idx) => (
// // // // // // //                             <span key={idx} className="region-tag">{region}</span>
// // // // // // //                           ))}
// // // // // // //                           {property.regions.length > 3 && (
// // // // // // //                             <span className="region-tag more">+{property.regions.length - 3}</span>
// // // // // // //                           )}
// // // // // // //                         </div>
// // // // // // //                       </div>
// // // // // // //                     )}

// // // // // // //                     <div className="info-item">
// // // // // // //                       <FaCalendarAlt className="info-icon" />
// // // // // // //                       <span>{property.createdAtPersianRelative || formatDate(property.createdAt)}</span>
// // // // // // //                     </div>
// // // // // // //                   </div>

// // // // // // //                   {/* شماره موبایل - فقط در صورت پرداخت */}
// // // // // // //                   {property.isPaid && property.mobileNumber ? (
// // // // // // //                     <div className="phone-display">
// // // // // // //                       <FaPhone className="phone-icon" />
// // // // // // //                       <span className="phone-number">{property.mobileNumber}</span>
// // // // // // //                     </div>
// // // // // // //                   ) : (
// // // // // // //                     <div className="phone-locked">
// // // // // // //                       <FaLock className="lock-icon" />
// // // // // // //                       <span>برای مشاهده شماره تماس، پرداخت کنید</span>
// // // // // // //                     </div>
// // // // // // //                   )}
// // // // // // //                 </div>

// // // // // // //                 {/* دکمه‌های اقدام */}
// // // // // // //                 <div className="card-actions">
// // // // // // //                   {!property.isPaid && (
// // // // // // //                     <button 
// // // // // // //                       className="action-btn payment-btn"
// // // // // // //                       onClick={() => handlePayment(property)}
// // // // // // //                       disabled={paymentLoading[property.code]}
// // // // // // //                     >
// // // // // // //                       {paymentLoading[property.code] ? (
// // // // // // //                         <FaSpinner className="spinner" />
// // // // // // //                       ) : (
// // // // // // //                         'پرداخت'
// // // // // // //                       )}
// // // // // // //                     </button>
// // // // // // //                   )}
// // // // // // //                   <button 
// // // // // // //                     className="action-btn details-btn"
// // // // // // //                     onClick={() => handleShowDetails(property)}
// // // // // // //                   >
// // // // // // //                     جزئیات
// // // // // // //                     <FaArrowRight className="btn-arrow" />
// // // // // // //                   </button>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             ))}
// // // // // // //           </div>

// // // // // // //           {/* صفحه‌بندی */}
// // // // // // //           {pagination.totalPages > 1 && (
// // // // // // //             <div className="pagination">
// // // // // // //               <button
// // // // // // //                 className="page-btn"
// // // // // // //                 onClick={() => handlePageChange(pagination.pageNumber - 1)}
// // // // // // //                 disabled={!pagination.hasPreviousPage}
// // // // // // //               >
// // // // // // //                 قبلی
// // // // // // //               </button>
              
// // // // // // //               {[...Array(pagination.totalPages)].map((_, index) => {
// // // // // // //                 const pageNum = index + 1;
// // // // // // //                 const isActive = pageNum === pagination.pageNumber;
// // // // // // //                 // نمایش حداکثر ۵ صفحه
// // // // // // //                 if (
// // // // // // //                   pageNum === 1 ||
// // // // // // //                   pageNum === pagination.totalPages ||
// // // // // // //                   (pageNum >= pagination.pageNumber - 1 && pageNum <= pagination.pageNumber + 1)
// // // // // // //                 ) {
// // // // // // //                   return (
// // // // // // //                     <button
// // // // // // //                       key={pageNum}
// // // // // // //                       className={`page-btn ${isActive ? 'active' : ''}`}
// // // // // // //                       onClick={() => handlePageChange(pageNum)}
// // // // // // //                     >
// // // // // // //                       {pageNum}
// // // // // // //                     </button>
// // // // // // //                   );
// // // // // // //                 }
// // // // // // //                 if (pageNum === pagination.pageNumber - 2 || pageNum === pagination.pageNumber + 2) {
// // // // // // //                   return <span key={pageNum} className="page-dots">...</span>;
// // // // // // //                 }
// // // // // // //                 return null;
// // // // // // //               })}
              
// // // // // // //               <button
// // // // // // //                 className="page-btn"
// // // // // // //                 onClick={() => handlePageChange(pagination.pageNumber + 1)}
// // // // // // //                 disabled={!pagination.hasNextPage}
// // // // // // //               >
// // // // // // //                 بعدی
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           )}
// // // // // // //         </>
// // // // // // //       )}

// // // // // // //       {/* مودال جزئیات */}
// // // // // // //       {showDetailModal && selectedProperty && (
// // // // // // //         <div className="detail-modal-overlay" onClick={handleCloseModal}>
// // // // // // //           <div className="detail-modal-content" onClick={(e) => e.stopPropagation()}>
// // // // // // //             <button className="modal-close-btn" onClick={handleCloseModal}>
// // // // // // //               <FaTimes />
// // // // // // //             </button>

// // // // // // //             <div className="modal-header">
// // // // // // //               <h2 className="modal-title">{selectedProperty.title}</h2>
// // // // // // //               <span className={`modal-status ${selectedProperty.isPaid ? 'paid' : 'unpaid'}`}>
// // // // // // //                 {selectedProperty.isPaid ? '✓ پرداخت شده' : '🔒 پرداخت نشده'}
// // // // // // //               </span>
// // // // // // //             </div>

// // // // // // //             <div className="modal-body">
// // // // // // //               <div className="detail-row">
// // // // // // //                 <span className="detail-label">دسته‌بندی:</span>
// // // // // // //                 <span className="detail-value">{selectedProperty.categoryName || 'نامشخص'}</span>
// // // // // // //               </div>

// // // // // // //               <div className="detail-row">
// // // // // // //                 <span className="detail-label">منطقه:</span>
// // // // // // //                 <span className="detail-value">{selectedProperty.regionName || 'نامشخص'}</span>
// // // // // // //               </div>

// // // // // // //               {selectedProperty.regions && selectedProperty.regions.length > 0 && (
// // // // // // //                 <div className="detail-row">
// // // // // // //                   <span className="detail-label">مناطق:</span>
// // // // // // //                   <div className="detail-value regions-list">
// // // // // // //                     {selectedProperty.regions.map((region, idx) => (
// // // // // // //                       <span key={idx} className="region-badge">{region}</span>
// // // // // // //                     ))}
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               )}

// // // // // // //               <div className="detail-row">
// // // // // // //                 <span className="detail-label">کد درخواست:</span>
// // // // // // //                 <span className="detail-value">{selectedProperty.code}</span>
// // // // // // //               </div>

// // // // // // //               <div className="detail-row">
// // // // // // //                 <span className="detail-label">تاریخ ثبت:</span>
// // // // // // //                 <span className="detail-value">{formatDate(selectedProperty.createdAt)}</span>
// // // // // // //               </div>

// // // // // // //               <div className="detail-row">
// // // // // // //                 <span className="detail-label">نسبت به الان:</span>
// // // // // // //                 <span className="detail-value">{selectedProperty.createdAtPersianRelative || 'نامشخص'}</span>
// // // // // // //               </div>

// // // // // // //               {/* شماره تماس */}
// // // // // // //               <div className="detail-row phone-row">
// // // // // // //                 <span className="detail-label">شماره تماس:</span>
// // // // // // //                 {selectedProperty.isPaid && selectedProperty.mobileNumber ? (
// // // // // // //                   <span className="detail-value phone-value">
// // // // // // //                     <FaPhone className="phone-icon-modal" />
// // // // // // //                     {selectedProperty.mobileNumber}
// // // // // // //                   </span>
// // // // // // //                 ) : (
// // // // // // //                   <span className="detail-value phone-locked-modal">
// // // // // // //                     <FaLock className="lock-icon-modal" />
// // // // // // //                     برای مشاهده شماره تماس باید پرداخت کنید
// // // // // // //                   </span>
// // // // // // //                 )}
// // // // // // //               </div>
// // // // // // //             </div>

// // // // // // //             {!selectedProperty.isPaid && (
// // // // // // //               <div className="modal-footer">
// // // // // // //                 <button 
// // // // // // //                   className="payment-btn-modal"
// // // // // // //                   onClick={() => {
// // // // // // //                     handleCloseModal();
// // // // // // //                     handlePayment(selectedProperty);
// // // // // // //                   }}
// // // // // // //                 >
// // // // // // //                   پرداخت برای مشاهده شماره تماس
// // // // // // //                 </button>
// // // // // // //               </div>
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default ApplicantPropertiesPage;

// // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // import { FaHome, FaMapMarkerAlt, FaCalendarAlt, FaTag, FaEye, FaArrowRight, FaCheckCircle, FaTimes, FaPhone, FaLock, FaSpinner } from 'react-icons/fa';
// // // // // // import './ApplicantPropertiesPage.css';

// // // // // // const ApplicantPropertiesPage = () => {
// // // // // //   const [properties, setProperties] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState(null);
// // // // // //   const [selectedProperty, setSelectedProperty] = useState(null);
// // // // // //   const [showDetailModal, setShowDetailModal] = useState(false);
// // // // // //   const [paymentLoading, setPaymentLoading] = useState({});
// // // // // //   const [pagination, setPagination] = useState({
// // // // // //     pageNumber: 1,
// // // // // //     pageSize: 10,
// // // // // //     totalCount: 0,
// // // // // //     totalPages: 0,
// // // // // //     hasNextPage: false,
// // // // // //     hasPreviousPage: false
// // // // // //   });

// // // // // //   const fetchProperties = useCallback(async (pageNumber = 1) => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       const token = localStorage.getItem('auth_token');
      
// // // // // //       const response = await fetch(
// // // // // //         `https://localhost:7178/api/RealEstatePage/RealEstatesesApplicationsDtosAsync?pageNumber=${pageNumber}&pageSize=${pagination.pageSize}`,
// // // // // //         {
// // // // // //           headers: {
// // // // // //             'Authorization': `Bearer ${token}`,
// // // // // //             'Content-Type': 'application/json'
// // // // // //           }
// // // // // //         }
// // // // // //       );

// // // // // //       if (!response.ok) {
// // // // // //         throw new Error(`HTTP ${response.status}`);
// // // // // //       }

// // // // // //       const result = await response.json();
      
// // // // // //       if (result.status === 200 && result.data) {
// // // // // //         setProperties(result.data.items || []);
// // // // // //         setPagination({
// // // // // //           pageNumber: result.data.pageNumber,
// // // // // //           pageSize: result.data.pageSize,
// // // // // //           totalCount: result.data.totalCount,
// // // // // //           totalPages: result.data.totalPages,
// // // // // //           hasNextPage: result.data.hasNextPage,
// // // // // //           hasPreviousPage: result.data.hasPreviousPage
// // // // // //         });
// // // // // //       } else {
// // // // // //         throw new Error(result.message || 'خطا در دریافت اطلاعات');
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('❌ خطا:', error);
// // // // // //       setError('مشکل در دریافت اطلاعات');
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   }, [pagination.pageSize]);

// // // // // //   useEffect(() => {
// // // // // //     fetchProperties();
// // // // // //   }, [fetchProperties]);

// // // // // //   const handlePayment = async (property) => {
// // // // // //     try {
// // // // // //       setPaymentLoading(prev => ({ ...prev, [property.code]: true }));
// // // // // //       alert(`شما در حال پرداخت برای "${property.title}" هستید`);
// // // // // //       await fetchProperties(pagination.pageNumber);
// // // // // //     } catch (error) {
// // // // // //       console.error('❌ خطا در پرداخت:', error);
// // // // // //       alert('مشکل در پرداخت. لطفاً دوباره تلاش کنید.');
// // // // // //     } finally {
// // // // // //       setPaymentLoading(prev => ({ ...prev, [property.code]: false }));
// // // // // //     }
// // // // // //   };

// // // // // //   const handleShowDetails = (property) => {
// // // // // //     setSelectedProperty(property);
// // // // // //     setShowDetailModal(true);
// // // // // //     document.body.style.overflow = 'hidden';
// // // // // //   };

// // // // // //   const handleCloseModal = () => {
// // // // // //     setShowDetailModal(false);
// // // // // //     setSelectedProperty(null);
// // // // // //     document.body.style.overflow = '';
// // // // // //   };

// // // // // //   const handlePageChange = (newPage) => {
// // // // // //     if (newPage >= 1 && newPage <= pagination.totalPages) {
// // // // // //       fetchProperties(newPage);
// // // // // //       window.scrollTo({ top: 0, behavior: 'smooth' });
// // // // // //     }
// // // // // //   };

// // // // // //   const formatDate = (dateString) => {
// // // // // //     if (!dateString) return 'تاریخ نامشخص';
// // // // // //     const date = new Date(dateString);
// // // // // //     return new Intl.DateTimeFormat('fa-IR', {
// // // // // //       year: 'numeric',
// // // // // //       month: 'long',
// // // // // //       day: 'numeric',
// // // // // //       hour: '2-digit',
// // // // // //       minute: '2-digit'
// // // // // //     }).format(date);
// // // // // //   };

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <div className="applicant-page-container">
// // // // // //         <div className="applicant-header">
// // // // // //           <h1 className="applicant-title">درخواست‌های من</h1>
// // // // // //         </div>
// // // // // //         <div className="applicant-loading">
// // // // // //           <FaSpinner className="loading-spinner" />
// // // // // //           <span>در حال بارگذاری...</span>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (error) {
// // // // // //     return (
// // // // // //       <div className="applicant-page-container">
// // // // // //         <div className="applicant-header">
// // // // // //           <h1 className="applicant-title">درخواست‌های من</h1>
// // // // // //         </div>
// // // // // //         <div className="applicant-error">
// // // // // //           <FaTimes className="error-icon" />
// // // // // //           <p>{error}</p>
// // // // // //           <button onClick={() => fetchProperties()} className="retry-btn">
// // // // // //             تلاش مجدد
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="applicant-page-container">
// // // // // //       {/* هدر */}
// // // // // //       <div className="applicant-header">
// // // // // //         <div className="header-content">
// // // // // //           <h1 className="applicant-title">
// // // // // //             <FaHome className="title-icon" />
// // // // // //             درخواست‌های من
// // // // // //           </h1>
// // // // // //           <span className="total-count">{pagination.totalCount} درخواست</span>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* لیست درخواست‌ها */}
// // // // // //       {properties.length === 0 ? (
// // // // // //         <div className="applicant-empty">
// // // // // //           <FaHome className="empty-icon" />
// // // // // //           <h3>هیچ درخواستی یافت نشد</h3>
// // // // // //           <p>شما هنوز درخواستی ثبت نکرده‌اید</p>
// // // // // //         </div>
// // // // // //       ) : (
// // // // // //         <>
// // // // // //           <div className="applicant-grid">
// // // // // //             {properties.map((property) => (
// // // // // //               <div key={property.code} className="applicant-card">
// // // // // //                 <div className="card-top">
// // // // // //                   <div className="card-header">
// // // // // //                     <h3 className="property-title">{property.title}</h3>
// // // // // //                     <span className={`status-badge ${property.isPaid ? 'paid' : 'unpaid'}`}>
// // // // // //                       {property.isPaid ? (
// // // // // //                         <><FaCheckCircle /> پرداخت شده</>
// // // // // //                       ) : (
// // // // // //                         <><FaLock /> پرداخت نشده</>
// // // // // //                       )}
// // // // // //                     </span>
// // // // // //                   </div>
                  
// // // // // //                   <div className="property-info-compact">
// // // // // //                     <span className="info-tag">
// // // // // //                       <FaTag className="info-icon-small" />
// // // // // //                       {property.categoryName || 'نامشخص'}
// // // // // //                     </span>
// // // // // //                     <span className="info-tag">
// // // // // //                       <FaMapMarkerAlt className="info-icon-small" />
// // // // // //                       {property.regionName || 'منطقه نامشخص'}
// // // // // //                     </span>
// // // // // //                     <span className="info-tag">
// // // // // //                       <FaCalendarAlt className="info-icon-small" />
// // // // // //                       {property.createdAtPersianRelative || 'نامشخص'}
// // // // // //                     </span>
// // // // // //                   </div>

// // // // // //                   {property.regions && property.regions.length > 0 && (
// // // // // //                     <div className="regions-compact">
// // // // // //                       {property.regions.slice(0, 3).map((region, idx) => (
// // // // // //                         <span key={idx} className="region-tag-small">{region}</span>
// // // // // //                       ))}
// // // // // //                       {property.regions.length > 3 && (
// // // // // //                         <span className="region-tag-small more">+{property.regions.length - 3}</span>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                   )}

// // // // // //                   {/* شماره موبایل */}
// // // // // //                   {property.isPaid && property.mobileNumber ? (
// // // // // //                     <div className="phone-display-compact">
// // // // // //                       <FaPhone className="phone-icon-small" />
// // // // // //                       <span className="phone-number-small">{property.mobileNumber}</span>
// // // // // //                     </div>
// // // // // //                   ) : (
// // // // // //                     <div className="phone-locked-compact">
// // // // // //                       <FaLock className="lock-icon-small" />
// // // // // //                       <span>برای مشاهده شماره، پرداخت کنید</span>
// // // // // //                     </div>
// // // // // //                   )}
// // // // // //                 </div>

// // // // // //                 <div className="card-actions-compact">
// // // // // //                   {!property.isPaid && (
// // // // // //                     <button 
// // // // // //                       className="action-btn-small payment-btn-small"
// // // // // //                       onClick={() => handlePayment(property)}
// // // // // //                       disabled={paymentLoading[property.code]}
// // // // // //                     >
// // // // // //                       {paymentLoading[property.code] ? (
// // // // // //                         <FaSpinner className="spinner-small" />
// // // // // //                       ) : (
// // // // // //                         'پرداخت'
// // // // // //                       )}
// // // // // //                     </button>
// // // // // //                   )}
// // // // // //                   <button 
// // // // // //                     className="action-btn-small details-btn-small"
// // // // // //                     onClick={() => handleShowDetails(property)}
// // // // // //                   >
// // // // // //                     جزئیات
// // // // // //                     <FaArrowRight className="btn-arrow-small" />
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>

// // // // // //           {/* صفحه‌بندی */}
// // // // // //           {pagination.totalPages > 1 && (
// // // // // //             <div className="pagination-compact">
// // // // // //               <button
// // // // // //                 className="page-btn-small"
// // // // // //                 onClick={() => handlePageChange(pagination.pageNumber - 1)}
// // // // // //                 disabled={!pagination.hasPreviousPage}
// // // // // //               >
// // // // // //                 قبلی
// // // // // //               </button>
              
// // // // // //               {[...Array(pagination.totalPages)].map((_, index) => {
// // // // // //                 const pageNum = index + 1;
// // // // // //                 const isActive = pageNum === pagination.pageNumber;
// // // // // //                 if (
// // // // // //                   pageNum === 1 ||
// // // // // //                   pageNum === pagination.totalPages ||
// // // // // //                   (pageNum >= pagination.pageNumber - 1 && pageNum <= pagination.pageNumber + 1)
// // // // // //                 ) {
// // // // // //                   return (
// // // // // //                     <button
// // // // // //                       key={pageNum}
// // // // // //                       className={`page-btn-small ${isActive ? 'active' : ''}`}
// // // // // //                       onClick={() => handlePageChange(pageNum)}
// // // // // //                     >
// // // // // //                       {pageNum}
// // // // // //                     </button>
// // // // // //                   );
// // // // // //                 }
// // // // // //                 if (pageNum === pagination.pageNumber - 2 || pageNum === pagination.pageNumber + 2) {
// // // // // //                   return <span key={pageNum} className="page-dots-small">...</span>;
// // // // // //                 }
// // // // // //                 return null;
// // // // // //               })}
              
// // // // // //               <button
// // // // // //                 className="page-btn-small"
// // // // // //                 onClick={() => handlePageChange(pagination.pageNumber + 1)}
// // // // // //                 disabled={!pagination.hasNextPage}
// // // // // //               >
// // // // // //                 بعدی
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </>
// // // // // //       )}

// // // // // //       {/* مودال جزئیات */}
// // // // // //       {showDetailModal && selectedProperty && (
// // // // // //         <div className="detail-modal-overlay" onClick={handleCloseModal}>
// // // // // //           <div className="detail-modal-content" onClick={(e) => e.stopPropagation()}>
// // // // // //             <button className="modal-close-btn" onClick={handleCloseModal}>
// // // // // //               <FaTimes />
// // // // // //             </button>

// // // // // //             <div className="modal-header">
// // // // // //               <h2 className="modal-title">{selectedProperty.title}</h2>
// // // // // //               <span className={`modal-status ${selectedProperty.isPaid ? 'paid' : 'unpaid'}`}>
// // // // // //                 {selectedProperty.isPaid ? '✓ پرداخت شده' : '🔒 پرداخت نشده'}
// // // // // //               </span>
// // // // // //             </div>

// // // // // //             <div className="modal-body">
// // // // // //               <div className="detail-row">
// // // // // //                 <span className="detail-label">دسته‌بندی:</span>
// // // // // //                 <span className="detail-value">{selectedProperty.categoryName || 'نامشخص'}</span>
// // // // // //               </div>

// // // // // //               <div className="detail-row">
// // // // // //                 <span className="detail-label">منطقه:</span>
// // // // // //                 <span className="detail-value">{selectedProperty.regionName || 'نامشخص'}</span>
// // // // // //               </div>

// // // // // //               {selectedProperty.regions && selectedProperty.regions.length > 0 && (
// // // // // //                 <div className="detail-row">
// // // // // //                   <span className="detail-label">مناطق:</span>
// // // // // //                   <div className="detail-value regions-list">
// // // // // //                     {selectedProperty.regions.map((region, idx) => (
// // // // // //                       <span key={idx} className="region-badge">{region}</span>
// // // // // //                     ))}
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               )}

// // // // // //               <div className="detail-row">
// // // // // //                 <span className="detail-label">کد درخواست:</span>
// // // // // //                 <span className="detail-value">{selectedProperty.code}</span>
// // // // // //               </div>

// // // // // //               <div className="detail-row">
// // // // // //                 <span className="detail-label">تاریخ ثبت:</span>
// // // // // //                 <span className="detail-value">{formatDate(selectedProperty.createdAt)}</span>
// // // // // //               </div>

// // // // // //               <div className="detail-row phone-row">
// // // // // //                 <span className="detail-label">شماره تماس:</span>
// // // // // //                 {selectedProperty.isPaid && selectedProperty.mobileNumber ? (
// // // // // //                   <span className="detail-value phone-value">
// // // // // //                     <FaPhone className="phone-icon-modal" />
// // // // // //                     {selectedProperty.mobileNumber}
// // // // // //                   </span>
// // // // // //                 ) : (
// // // // // //                   <span className="detail-value phone-locked-modal">
// // // // // //                     <FaLock className="lock-icon-modal" />
// // // // // //                     برای مشاهده شماره تماس باید پرداخت کنید
// // // // // //                   </span>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             {!selectedProperty.isPaid && (
// // // // // //               <div className="modal-footer">
// // // // // //                 <button 
// // // // // //                   className="payment-btn-modal"
// // // // // //                   onClick={() => {
// // // // // //                     handleCloseModal();
// // // // // //                     handlePayment(selectedProperty);
// // // // // //                   }}
// // // // // //                 >
// // // // // //                   پرداخت برای مشاهده شماره تماس
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default ApplicantPropertiesPage;

// // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // import { FaHome, FaMapMarkerAlt, FaCalendarAlt, FaTag, FaArrowRight, FaCheckCircle, FaTimes, FaPhone, FaLock, FaSpinner, FaAlignLeft, FaMoneyBill } from 'react-icons/fa';
// // // // // import './ApplicantPropertiesPage.css';

// // // // // const ApplicantPropertiesPage = () => {
// // // // //   const [properties, setProperties] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [selectedProperty, setSelectedProperty] = useState(null);
// // // // //   const [showDetailModal, setShowDetailModal] = useState(false);
// // // // //   const [paymentLoading, setPaymentLoading] = useState({});
// // // // //   const [pagination, setPagination] = useState({
// // // // //     pageNumber: 1,
// // // // //     pageSize: 10,
// // // // //     totalCount: 0,
// // // // //     totalPages: 0,
// // // // //     hasNextPage: false,
// // // // //     hasPreviousPage: false
// // // // //   });

// // // // //   const fetchProperties = useCallback(async (pageNumber = 1) => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       const token = localStorage.getItem('auth_token');
      
// // // // //       const response = await fetch(
// // // // //         `https://localhost:7178/api/RealEstatePage/RealEstatesesApplicationsDtosAsync?pageNumber=${pageNumber}&pageSize=${pagination.pageSize}`,
// // // // //         {
// // // // //           headers: {
// // // // //             'Authorization': `Bearer ${token}`,
// // // // //             'Content-Type': 'application/json'
// // // // //           }
// // // // //         }
// // // // //       );

// // // // //       if (!response.ok) {
// // // // //         throw new Error(`HTTP ${response.status}`);
// // // // //       }

// // // // //       const result = await response.json();
      
// // // // //       if (result.status === 200 && result.data) {
// // // // //         setProperties(result.data.items || []);
// // // // //         setPagination({
// // // // //           pageNumber: result.data.pageNumber,
// // // // //           pageSize: result.data.pageSize,
// // // // //           totalCount: result.data.totalCount,
// // // // //           totalPages: result.data.totalPages,
// // // // //           hasNextPage: result.data.hasNextPage,
// // // // //           hasPreviousPage: result.data.hasPreviousPage
// // // // //         });
// // // // //       } else {
// // // // //         throw new Error(result.message || 'خطا در دریافت اطلاعات');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('❌ خطا:', error);
// // // // //       setError('مشکل در دریافت اطلاعات');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   }, [pagination.pageSize]);

// // // // //   useEffect(() => {
// // // // //     fetchProperties();
// // // // //   }, [fetchProperties]);

// // // // //   const handlePayment = async (property) => {
// // // // //     try {
// // // // //       setPaymentLoading(prev => ({ ...prev, [property.code]: true }));
// // // // //       alert(`شما در حال پرداخت برای "${property.title}" هستید`);
// // // // //       await fetchProperties(pagination.pageNumber);
// // // // //     } catch (error) {
// // // // //       console.error('❌ خطا در پرداخت:', error);
// // // // //       alert('مشکل در پرداخت. لطفاً دوباره تلاش کنید.');
// // // // //     } finally {
// // // // //       setPaymentLoading(prev => ({ ...prev, [property.code]: false }));
// // // // //     }
// // // // //   };

// // // // //   const handleShowDetails = (property) => {
// // // // //     setSelectedProperty(property);
// // // // //     setShowDetailModal(true);
// // // // //     document.body.style.overflow = 'hidden';
// // // // //   };

// // // // //   const handleCloseModal = () => {
// // // // //     setShowDetailModal(false);
// // // // //     setSelectedProperty(null);
// // // // //     document.body.style.overflow = '';
// // // // //   };

// // // // //   const handlePageChange = (newPage) => {
// // // // //     if (newPage >= 1 && newPage <= pagination.totalPages) {
// // // // //       fetchProperties(newPage);
// // // // //       window.scrollTo({ top: 0, behavior: 'smooth' });
// // // // //     }
// // // // //   };

// // // // //   const formatDate = (dateString) => {
// // // // //     if (!dateString) return 'تاریخ نامشخص';
// // // // //     const date = new Date(dateString);
// // // // //     return new Intl.DateTimeFormat('fa-IR', {
// // // // //       year: 'numeric',
// // // // //       month: 'long',
// // // // //       day: 'numeric',
// // // // //       hour: '2-digit',
// // // // //       minute: '2-digit'
// // // // //     }).format(date);
// // // // //   };

// // // // //   const formatBudget = (budget) => {
// // // // //     if (!budget || budget === 0) return 'نامشخص';
// // // // //     return budget.toLocaleString('fa-IR') + ' تومان';
// // // // //   };

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="applicant-page-container">
// // // // //         <div className="applicant-header">
// // // // //           <h1 className="applicant-title">درخواست‌های من</h1>
// // // // //         </div>
// // // // //         <div className="applicant-loading">
// // // // //           <FaSpinner className="loading-spinner" />
// // // // //           <span>در حال بارگذاری...</span>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (error) {
// // // // //     return (
// // // // //       <div className="applicant-page-container">
// // // // //         <div className="applicant-header">
// // // // //           <h1 className="applicant-title">درخواست‌های من</h1>
// // // // //         </div>
// // // // //         <div className="applicant-error">
// // // // //           <FaTimes className="error-icon" />
// // // // //           <p>{error}</p>
// // // // //           <button onClick={() => fetchProperties()} className="retry-btn">
// // // // //             تلاش مجدد
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="applicant-page-container">
// // // // //       {/* هدر */}
// // // // //       <div className="applicant-header">
// // // // //         <div className="header-content">
// // // // //           <h1 className="applicant-title">
// // // // //             <FaHome className="title-icon" />
// // // // //             درخواست‌های من
// // // // //           </h1>
// // // // //           <span className="total-count">{pagination.totalCount} درخواست</span>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* لیست درخواست‌ها */}
// // // // //       {properties.length === 0 ? (
// // // // //         <div className="applicant-empty">
// // // // //           <FaHome className="empty-icon" />
// // // // //           <h3>هیچ درخواستی یافت نشد</h3>
// // // // //           <p>شما هنوز درخواستی ثبت نکرده‌اید</p>
// // // // //         </div>
// // // // //       ) : (
// // // // //         <>
// // // // //           <div className="applicant-grid">
// // // // //             {properties.map((property) => (
// // // // //               <div key={property.code} className="applicant-card">
// // // // //                 <div className="card-top">
// // // // //                   <div className="card-header">
// // // // //                     <h3 className="property-title">{property.title}</h3>
// // // // //                     <span className={`status-badge ${property.isPaid ? 'paid' : 'unpaid'}`}>
// // // // //                       {property.isPaid ? (
// // // // //                         <><FaCheckCircle /> پرداخت شده</>
// // // // //                       ) : (
// // // // //                         <><FaLock /> پرداخت نشده</>
// // // // //                       )}
// // // // //                     </span>
// // // // //                   </div>
                  
// // // // //                   <div className="property-info-compact">
// // // // //                     <span className="info-tag">
// // // // //                       <FaTag className="info-icon-small" />
// // // // //                       {property.categoryName || 'نامشخص'}
// // // // //                     </span>
// // // // //                     <span className="info-tag">
// // // // //                       <FaMapMarkerAlt className="info-icon-small" />
// // // // //                       {property.regionName || 'منطقه نامشخص'}
// // // // //                     </span>
// // // // //                     <span className="info-tag">
// // // // //                       <FaCalendarAlt className="info-icon-small" />
// // // // //                       {property.createdAtPersianRelative || 'نامشخص'}
// // // // //                     </span>
// // // // //                   </div>

// // // // //                   {/* مناطق با بک‌گراند مشخص */}
// // // // //                   {property.regions && property.regions.length > 0 && (
// // // // //                     <div className="regions-compact">
// // // // //                       <span className="regions-label">مناطق:</span>
// // // // //                       {property.regions.slice(0, 4).map((region, idx) => (
// // // // //                         <span key={idx} className="region-tag-small">{region}</span>
// // // // //                       ))}
// // // // //                       {property.regions.length > 4 && (
// // // // //                         <span className="region-tag-small more">+{property.regions.length - 4}</span>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   )}

// // // // //                   {/* توضیحات */}
// // // // //                   {property.desc && (
// // // // //                     <div className="desc-compact">
// // // // //                       <FaAlignLeft className="desc-icon-small" />
// // // // //                       <span className="desc-text">{property.desc}</span>
// // // // //                     </div>
// // // // //                   )}

// // // // //                   {/* شماره موبایل */}
// // // // //                   {property.isPaid && property.mobileNumber ? (
// // // // //                     <div className="phone-display-compact">
// // // // //                       <FaPhone className="phone-icon-small" />
// // // // //                       <span className="phone-number-small">{property.mobileNumber}</span>
// // // // //                     </div>
// // // // //                   ) : (
// // // // //                     <div className="phone-locked-compact">
// // // // //                       <FaLock className="lock-icon-small" />
// // // // //                       <span>برای مشاهده شماره، پرداخت کنید</span>
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </div>

// // // // //                 <div className="card-actions-compact">
// // // // //                   {!property.isPaid && (
// // // // //                     <button 
// // // // //                       className="action-btn-small payment-btn-small"
// // // // //                       onClick={() => handlePayment(property)}
// // // // //                       disabled={paymentLoading[property.code]}
// // // // //                     >
// // // // //                       {paymentLoading[property.code] ? (
// // // // //                         <FaSpinner className="spinner-small" />
// // // // //                       ) : (
// // // // //                         'پرداخت'
// // // // //                       )}
// // // // //                     </button>
// // // // //                   )}
// // // // //                   <button 
// // // // //                     className="action-btn-small details-btn-small"
// // // // //                     onClick={() => handleShowDetails(property)}
// // // // //                   >
// // // // //                     جزئیات
// // // // //                     <FaArrowRight className="btn-arrow-small" />
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>

// // // // //           {/* صفحه‌بندی */}
// // // // //           {pagination.totalPages > 1 && (
// // // // //             <div className="pagination-compact">
// // // // //               <button
// // // // //                 className="page-btn-small"
// // // // //                 onClick={() => handlePageChange(pagination.pageNumber - 1)}
// // // // //                 disabled={!pagination.hasPreviousPage}
// // // // //               >
// // // // //                 قبلی
// // // // //               </button>
              
// // // // //               {[...Array(pagination.totalPages)].map((_, index) => {
// // // // //                 const pageNum = index + 1;
// // // // //                 const isActive = pageNum === pagination.pageNumber;
// // // // //                 if (
// // // // //                   pageNum === 1 ||
// // // // //                   pageNum === pagination.totalPages ||
// // // // //                   (pageNum >= pagination.pageNumber - 1 && pageNum <= pagination.pageNumber + 1)
// // // // //                 ) {
// // // // //                   return (
// // // // //                     <button
// // // // //                       key={pageNum}
// // // // //                       className={`page-btn-small ${isActive ? 'active' : ''}`}
// // // // //                       onClick={() => handlePageChange(pageNum)}
// // // // //                     >
// // // // //                       {pageNum}
// // // // //                     </button>
// // // // //                   );
// // // // //                 }
// // // // //                 if (pageNum === pagination.pageNumber - 2 || pageNum === pagination.pageNumber + 2) {
// // // // //                   return <span key={pageNum} className="page-dots-small">...</span>;
// // // // //                 }
// // // // //                 return null;
// // // // //               })}
              
// // // // //               <button
// // // // //                 className="page-btn-small"
// // // // //                 onClick={() => handlePageChange(pagination.pageNumber + 1)}
// // // // //                 disabled={!pagination.hasNextPage}
// // // // //               >
// // // // //                 بعدی
// // // // //               </button>
// // // // //             </div>
// // // // //           )}
// // // // //         </>
// // // // //       )}

// // // // //       {/* مودال جزئیات */}
// // // // //       {showDetailModal && selectedProperty && (
// // // // //         <div className="detail-modal-overlay" onClick={handleCloseModal}>
// // // // //           <div className="detail-modal-content" onClick={(e) => e.stopPropagation()}>
// // // // //             <button className="modal-close-btn" onClick={handleCloseModal}>
// // // // //               <FaTimes />
// // // // //             </button>

// // // // //             <div className="modal-header">
// // // // //               <h2 className="modal-title">{selectedProperty.title}</h2>
// // // // //               <span className={`modal-status ${selectedProperty.isPaid ? 'paid' : 'unpaid'}`}>
// // // // //                 {selectedProperty.isPaid ? '✓ پرداخت شده' : '🔒 پرداخت نشده'}
// // // // //               </span>
// // // // //             </div>

// // // // //             <div className="modal-body">
// // // // //               <div className="detail-row">
// // // // //                 <span className="detail-label">دسته‌بندی:</span>
// // // // //                 <span className="detail-value">{selectedProperty.categoryName || 'نامشخص'}</span>
// // // // //               </div>

// // // // //               <div className="detail-row">
// // // // //                 <span className="detail-label">منطقه اصلی:</span>
// // // // //                 <span className="detail-value">{selectedProperty.regionName || 'نامشخص'}</span>
// // // // //               </div>

// // // // //               {selectedProperty.regions && selectedProperty.regions.length > 0 && (
// // // // //                 <div className="detail-row">
// // // // //                   <span className="detail-label">مناطق مورد نظر:</span>
// // // // //                   <div className="detail-value regions-list">
// // // // //                     {selectedProperty.regions.map((region, idx) => (
// // // // //                       <span key={idx} className="region-badge">{region}</span>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               )}

// // // // //               {selectedProperty.desc && (
// // // // //                 <div className="detail-row desc-row">
// // // // //                   <span className="detail-label">توضیحات:</span>
// // // // //                   <span className="detail-value desc-value">{selectedProperty.desc}</span>
// // // // //                 </div>
// // // // //               )}

// // // // //               {selectedProperty.budget > 0 && (
// // // // //                 <div className="detail-row">
// // // // //                   <span className="detail-label">بودجه:</span>
// // // // //                   <span className="detail-value budget-value">
// // // // //                     <FaMoneyBill className="budget-icon" />
// // // // //                     {formatBudget(selectedProperty.budget)}
// // // // //                   </span>
// // // // //                 </div>
// // // // //               )}

// // // // //               <div className="detail-row">
// // // // //                 <span className="detail-label">کد درخواست:</span>
// // // // //                 <span className="detail-value">{selectedProperty.code}</span>
// // // // //               </div>

// // // // //               <div className="detail-row">
// // // // //                 <span className="detail-label">تاریخ ثبت:</span>
// // // // //                 <span className="detail-value">{formatDate(selectedProperty.createdAt)}</span>
// // // // //               </div>

// // // // //               <div className="detail-row phone-row">
// // // // //                 <span className="detail-label">شماره تماس:</span>
// // // // //                 {selectedProperty.isPaid && selectedProperty.mobileNumber ? (
// // // // //                   <span className="detail-value phone-value">
// // // // //                     <FaPhone className="phone-icon-modal" />
// // // // //                     {selectedProperty.mobileNumber}
// // // // //                   </span>
// // // // //                 ) : (
// // // // //                   <span className="detail-value phone-locked-modal">
// // // // //                     <FaLock className="lock-icon-modal" />
// // // // //                     برای مشاهده شماره تماس باید پرداخت کنید
// // // // //                   </span>
// // // // //                 )}
// // // // //               </div>
// // // // //             </div>

// // // // //             {!selectedProperty.isPaid && (
// // // // //               <div className="modal-footer">
// // // // //                 <button 
// // // // //                   className="payment-btn-modal"
// // // // //                   onClick={() => {
// // // // //                     handleCloseModal();
// // // // //                     handlePayment(selectedProperty);
// // // // //                   }}
// // // // //                 >
// // // // //                   پرداخت برای مشاهده شماره تماس
// // // // //                 </button>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default ApplicantPropertiesPage;

// // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // import { FaHome, FaMapMarkerAlt, FaCalendarAlt, FaTag, FaArrowRight, FaCheckCircle, FaTimes, FaPhone, FaLock, FaSpinner, FaAlignLeft, FaMoneyBill, FaBed, FaRulerCombined, FaBuilding, FaUser } from 'react-icons/fa';
// // // // import './ApplicantPropertiesPage.css';

// // // // const ApplicantPropertiesPage = () => {
// // // //   const [properties, setProperties] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [selectedProperty, setSelectedProperty] = useState(null);
// // // //   const [showDetailModal, setShowDetailModal] = useState(false);
// // // //   const [detailLoading, setDetailLoading] = useState(false);
// // // //   const [paymentLoading, setPaymentLoading] = useState({});
// // // //   const [pagination, setPagination] = useState({
// // // //     pageNumber: 1,
// // // //     pageSize: 10,
// // // //     totalCount: 0,
// // // //     totalPages: 0,
// // // //     hasNextPage: false,
// // // //     hasPreviousPage: false
// // // //   });

// // // //   const fetchProperties = useCallback(async (pageNumber = 1) => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const token = localStorage.getItem('auth_token');
      
// // // //       const response = await fetch(
// // // //         `https://localhost:7178/api/RealEstatePage/RealEstatesesApplicationsDtosAsync?pageNumber=${pageNumber}&pageSize=${pagination.pageSize}`,
// // // //         {
// // // //           headers: {
// // // //             'Authorization': `Bearer ${token}`,
// // // //             'Content-Type': 'application/json'
// // // //           }
// // // //         }
// // // //       );

// // // //       if (!response.ok) {
// // // //         throw new Error(`HTTP ${response.status}`);
// // // //       }

// // // //       const result = await response.json();
      
// // // //       if (result.status === 200 && result.data) {
// // // //         setProperties(result.data.items || []);
// // // //         setPagination({
// // // //           pageNumber: result.data.pageNumber,
// // // //           pageSize: result.data.pageSize,
// // // //           totalCount: result.data.totalCount,
// // // //           totalPages: result.data.totalPages,
// // // //           hasNextPage: result.data.hasNextPage,
// // // //           hasPreviousPage: result.data.hasPreviousPage
// // // //         });
// // // //       } else {
// // // //         throw new Error(result.message || 'خطا در دریافت اطلاعات');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('❌ خطا:', error);
// // // //       setError('مشکل در دریافت اطلاعات');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, [pagination.pageSize]);

// // // //   useEffect(() => {
// // // //     fetchProperties();
// // // //   }, [fetchProperties]);

// // // //   // دریافت جزئیات کامل
// // // //   const fetchDetail = async (id) => {
// // // //     try {
// // // //       setDetailLoading(true);
// // // //       const token = localStorage.getItem('auth_token');
      
// // // //       const response = await fetch(
// // // //         `https://localhost:7178/api/RealEstatePage/GetRealEstatesesApplicationsDetails`,
// // // //         {
// // // //           method: 'POST',
// // // //           headers: {
// // // //             'Authorization': `Bearer ${token}`,
// // // //             'Content-Type': 'application/json'
// // // //           },
// // // //           body: JSON.stringify(id)
// // // //         }
// // // //       );

// // // //       if (!response.ok) {
// // // //         throw new Error(`HTTP ${response.status}`);
// // // //       }

// // // //       const result = await response.json();
      
// // // //       if (result.status === 200 && result.data) {
// // // //         setSelectedProperty(result.data);
// // // //         setShowDetailModal(true);
// // // //         document.body.style.overflow = 'hidden';
// // // //       } else {
// // // //         throw new Error(result.message || 'خطا در دریافت جزئیات');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('❌ خطا در دریافت جزئیات:', error);
// // // //       alert('مشکل در دریافت جزئیات. لطفاً دوباره تلاش کنید.');
// // // //     } finally {
// // // //       setDetailLoading(false);
// // // //     }
// // // //   };

// // // //   const handlePayment = async (property) => {
// // // //     try {
// // // //       setPaymentLoading(prev => ({ ...prev, [property.code]: true }));
// // // //       alert(`شما در حال پرداخت برای "${property.title}" هستید`);
// // // //       await fetchProperties(pagination.pageNumber);
// // // //     } catch (error) {
// // // //       console.error('❌ خطا در پرداخت:', error);
// // // //       alert('مشکل در پرداخت. لطفاً دوباره تلاش کنید.');
// // // //     } finally {
// // // //       setPaymentLoading(prev => ({ ...prev, [property.code]: false }));
// // // //     }
// // // //   };

// // // //   const handleShowDetails = (property) => {
// // // //     fetchDetail(property.id);
// // // //   };

// // // //   const handleCloseModal = () => {
// // // //     setShowDetailModal(false);
// // // //     setSelectedProperty(null);
// // // //     document.body.style.overflow = '';
// // // //   };

// // // //   const handlePageChange = (newPage) => {
// // // //     if (newPage >= 1 && newPage <= pagination.totalPages) {
// // // //       fetchProperties(newPage);
// // // //       window.scrollTo({ top: 0, behavior: 'smooth' });
// // // //     }
// // // //   };

// // // //   const formatDate = (dateString) => {
// // // //     if (!dateString) return 'تاریخ نامشخص';
// // // //     const date = new Date(dateString);
// // // //     return new Intl.DateTimeFormat('fa-IR', {
// // // //       year: 'numeric',
// // // //       month: 'long',
// // // //       day: 'numeric',
// // // //       hour: '2-digit',
// // // //       minute: '2-digit'
// // // //     }).format(date);
// // // //   };

// // // //   const formatBudget = (budget) => {
// // // //     if (!budget || budget === 0) return 'نامشخص';
// // // //     return budget.toLocaleString('fa-IR') + ' تومان';
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="applicant-page-container">
// // // //         <div className="applicant-header">
// // // //           <h1 className="applicant-title">ملک های درخواستی</h1>
// // // //         </div>
// // // //         <div className="applicant-loading">
// // // //           <FaSpinner className="loading-spinner" />
// // // //           <span>در حال بارگذاری...</span>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <div className="applicant-page-container">
// // // //         <div className="applicant-header">
// // // //                <h1 className="applicant-title">ملک های درخواستی</h1>
// // // //         </div>
// // // //         <div className="applicant-error">
// // // //           <FaTimes className="error-icon" />
// // // //           <p>{error}</p>
// // // //           <button onClick={() => fetchProperties()} className="retry-btn">
// // // //             تلاش مجدد
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="applicant-page-container">
// // // //       {/* هدر */}
// // // //       <div className="applicant-header">
// // // //         <div className="header-content">
// // // //           <h1 className="applicant-title">
// // // //             <FaHome className="title-icon" />
// // // //             متقاضیان ملک
// // // //           </h1>
// // // //           <span className="total-count">{pagination.totalCount} درخواست</span>
// // // //         </div>
// // // //       </div>

// // // //       {/* لیست درخواست‌ها */}
// // // //       {properties.length === 0 ? (
// // // //         <div className="applicant-empty">
// // // //           <FaHome className="empty-icon" />
// // // //           <h3>هیچ درخواستی یافت نشد</h3>
// // // //           <p>شما هنوز درخواستی ثبت نکرده‌اید</p>
// // // //         </div>
// // // //       ) : (
// // // //         <>
// // // //           <div className="applicant-grid">
// // // //             {properties.map((property) => (
// // // //               <div key={property.id} className="applicant-card">
// // // //                 <div className="card-top">
// // // //                   <div className="card-header">
// // // //                     <h3 className="property-title">{property.title}</h3>
// // // //                     <span className={`status-badge ${property.isPaid ? 'paid' : 'unpaid'}`}>
// // // //                       {property.isPaid ? (
// // // //                         <><FaCheckCircle /> پرداخت شده</>
// // // //                       ) : (
// // // //                         <><FaLock /> پرداخت نشده</>
// // // //                       )}
// // // //                     </span>
// // // //                   </div>
                  
// // // //                   <div className="property-info-compact">
// // // //                     <span className="info-tag">
// // // //                       <FaTag className="info-icon-small" />
// // // //                       {property.categoryName || 'نامشخص'}
// // // //                     </span>
// // // //                     <span className="info-tag">
// // // //                       <FaMapMarkerAlt className="info-icon-small" />
// // // //                       {property.regionName || 'منطقه نامشخص'}
// // // //                     </span>
// // // //                     <span className="info-tag">
// // // //                       <FaCalendarAlt className="info-icon-small" />
// // // //                       {property.createdAtPersianRelative || 'نامشخص'}
// // // //                     </span>
// // // //                   </div>

// // // //                   {/* مناطق با بک‌گراند مشخص */}
// // // //                   {property.regions && property.regions.length > 0 && (
// // // //                     <div className="regions-compact">
// // // //                       <span className="regions-label">مناطق:</span>
// // // //                       {property.regions.slice(0, 4).map((region, idx) => (
// // // //                         <span key={idx} className="region-tag-small">{region}</span>
// // // //                       ))}
// // // //                       {property.regions.length > 4 && (
// // // //                         <span className="region-tag-small more">+{property.regions.length - 4}</span>
// // // //                       )}
// // // //                     </div>
// // // //                   )}

// // // //                   {/* توضیحات */}
// // // //                   {property.desc && (
// // // //                     <div className="desc-compact">
// // // //                       <FaAlignLeft className="desc-icon-small" />
// // // //                       <span className="desc-text">{property.desc}</span>
// // // //                     </div>
// // // //                   )}

// // // //                   {/* شماره موبایل */}
// // // //                   {property.isPaid && property.mobileNumber ? (
// // // //                     <div className="phone-display-compact">
// // // //                       <FaPhone className="phone-icon-small" />
// // // //                       <span className="phone-number-small">{property.mobileNumber}</span>
// // // //                     </div>
// // // //                   ) : (
// // // //                     <div className="phone-locked-compact">
// // // //                       <FaLock className="lock-icon-small" />
// // // //                       <span>برای مشاهده شماره، پرداخت کنید</span>
// // // //                     </div>
// // // //                   )}
// // // //                 </div>

// // // //                 <div className="card-actions-compact">
// // // //                   {!property.isPaid && (
// // // //                     <button 
// // // //                       className="action-btn-small payment-btn-small"
// // // //                       onClick={() => handlePayment(property)}
// // // //                       disabled={paymentLoading[property.id]}
// // // //                     >
// // // //                       {paymentLoading[property.id] ? (
// // // //                         <FaSpinner className="spinner-small" />
// // // //                       ) : (
// // // //                         'پرداخت'
// // // //                       )}
// // // //                     </button>
// // // //                   )}
// // // //                   <button 
// // // //                     className="action-btn-small details-btn-small"
// // // //                     onClick={() => handleShowDetails(property)}
// // // //                     disabled={detailLoading}
// // // //                   >
// // // //                     {detailLoading ? (
// // // //                       <FaSpinner className="spinner-small" />
// // // //                     ) : (
// // // //                       <>
// // // //                         جزئیات
// // // //                         <FaArrowRight className="btn-arrow-small" />
// // // //                       </>
// // // //                     )}
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>

// // // //           {/* صفحه‌بندی */}
// // // //           {pagination.totalPages > 1 && (
// // // //             <div className="pagination-compact">
// // // //               <button
// // // //                 className="page-btn-small"
// // // //                 onClick={() => handlePageChange(pagination.pageNumber - 1)}
// // // //                 disabled={!pagination.hasPreviousPage}
// // // //               >
// // // //                 قبلی
// // // //               </button>
              
// // // //               {[...Array(pagination.totalPages)].map((_, index) => {
// // // //                 const pageNum = index + 1;
// // // //                 const isActive = pageNum === pagination.pageNumber;
// // // //                 if (
// // // //                   pageNum === 1 ||
// // // //                   pageNum === pagination.totalPages ||
// // // //                   (pageNum >= pagination.pageNumber - 1 && pageNum <= pagination.pageNumber + 1)
// // // //                 ) {
// // // //                   return (
// // // //                     <button
// // // //                       key={pageNum}
// // // //                       className={`page-btn-small ${isActive ? 'active' : ''}`}
// // // //                       onClick={() => handlePageChange(pageNum)}
// // // //                     >
// // // //                       {pageNum}
// // // //                     </button>
// // // //                   );
// // // //                 }
// // // //                 if (pageNum === pagination.pageNumber - 2 || pageNum === pagination.pageNumber + 2) {
// // // //                   return <span key={pageNum} className="page-dots-small">...</span>;
// // // //                 }
// // // //                 return null;
// // // //               })}
              
// // // //               <button
// // // //                 className="page-btn-small"
// // // //                 onClick={() => handlePageChange(pagination.pageNumber + 1)}
// // // //                 disabled={!pagination.hasNextPage}
// // // //               >
// // // //                 بعدی
// // // //               </button>
// // // //             </div>
// // // //           )}
// // // //         </>
// // // //       )}

// // // //       {/* مودال جزئیات */}
// // // //       {showDetailModal && selectedProperty && (
// // // //         <div className="detail-modal-overlay-applicant" onClick={handleCloseModal}>
// // // //           <div className="detail-modal-content-applicant" onClick={(e) => e.stopPropagation()}>
// // // //             <button className="modal-close-btn-applicant" onClick={handleCloseModal}>
// // // //               <FaTimes />
// // // //             </button>

// // // //             <div className="modal-header-applicant">
// // // //               <div className="modal-title-section">
// // // //                 <h2 className="modal-title-applicant">{selectedProperty.title}</h2>
// // // //                 <span className={`modal-status-applicant ${selectedProperty.isPaid ? 'paid' : 'unpaid'}`}>
// // // //                   {selectedProperty.isPaid ? '✓ پرداخت شده' : '🔒 پرداخت نشده'}
// // // //                 </span>
// // // //               </div>
// // // //               <div className="modal-code">
// // // //                 کد: {selectedProperty.code}
// // // //               </div>
// // // //             </div>

// // // //             <div className="modal-body-applicant">
// // // //               {/* ردیف اول: دسته‌بندی و منطقه */}
// // // //               <div className="detail-grid-applicant">
// // // //                 <div className="detail-item-applicant">
// // // //                   <div className="detail-icon-applicant"><FaTag /></div>
// // // //                   <div>
// // // //                     <div className="detail-label-applicant">دسته‌بندی</div>
// // // //                     <div className="detail-value-applicant">{selectedProperty.categoryName || 'نامشخص'}</div>
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="detail-item-applicant">
// // // //                   <div className="detail-icon-applicant"><FaMapMarkerAlt /></div>
// // // //                   <div>
// // // //                     <div className="detail-label-applicant">منطقه اصلی</div>
// // // //                     <div className="detail-value-applicant">{selectedProperty.regionName || 'نامشخص'}</div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               {/* مناطق مورد نظر */}
// // // //               {selectedProperty.regions && selectedProperty.regions.length > 0 && (
// // // //                 <div className="detail-section-applicant regions-section">
// // // //                   <div className="detail-section-label-applicant">
// // // //                     <FaMapMarkerAlt className="section-icon" />
// // // //                     مناطق مورد نظر
// // // //                   </div>
// // // //                   <div className="regions-list-applicant">
// // // //                     {selectedProperty.regions.map((region, idx) => (
// // // //                       <span key={idx} className="region-badge-applicant">{region}</span>
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               {/* مشخصات ملک */}
// // // //               <div className="detail-grid-applicant specs-grid">
// // // //                 {selectedProperty.minCountRoom > 0 && (
// // // //                   <div className="spec-item-applicant">
// // // //                     <FaBed className="spec-icon-applicant" />
// // // //                     <div>
// // // //                       <div className="spec-label-applicant">حداقل اتاق</div>
// // // //                       <div className="spec-value-applicant">{selectedProperty.minCountRoom} خواب</div>
// // // //                     </div>
// // // //                   </div>
// // // //                 )}
// // // //                 {selectedProperty.minSquareMeter > 0 && (
// // // //                   <div className="spec-item-applicant">
// // // //                     <FaRulerCombined className="spec-icon-applicant" />
// // // //                     <div>
// // // //                       <div className="spec-label-applicant">متراژ</div>
// // // //                       <div className="spec-value-applicant">
// // // //                         {selectedProperty.minSquareMeter}
// // // //                         {selectedProperty.maxSquareMeter ? ` - ${selectedProperty.maxSquareMeter}` : ' به بالا'}
// // // //                         {' متر'}
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 )}
// // // //                 {(selectedProperty.minConstructionYear > 0 || selectedProperty.maxConstructionYear > 0) && (
// // // //                   <div className="spec-item-applicant">
// // // //                     <FaBuilding className="spec-icon-applicant" />
// // // //                     <div>
// // // //                       <div className="spec-label-applicant">سال ساخت</div>
// // // //                       <div className="spec-value-applicant">
// // // //                         {selectedProperty.minConstructionYear || '?'}
// // // //                         {selectedProperty.maxConstructionYear ? ` - ${selectedProperty.maxConstructionYear}` : ' به بعد'}
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 )}
// // // //                 {selectedProperty.budget > 0 && (
// // // //                   <div className="spec-item-applicant">
// // // //                     <FaMoneyBill className="spec-icon-applicant" />
// // // //                     <div>
// // // //                       <div className="spec-label-applicant">بودجه</div>
// // // //                       <div className="spec-value-applicant budget">{formatBudget(selectedProperty.budget)}</div>
// // // //                     </div>
// // // //                   </div>
// // // //                 )}
// // // //               </div>

// // // //               {/* توضیحات */}
// // // //               {selectedProperty.desc && (
// // // //                 <div className="detail-section-applicant desc-section">
// // // //                   <div className="detail-section-label-applicant">
// // // //                     <FaAlignLeft className="section-icon" />
// // // //                     توضیحات تکمیلی
// // // //                   </div>
// // // //                   <div className="desc-content-applicant">{selectedProperty.desc}</div>
// // // //                 </div>
// // // //               )}

// // // //               {/* نام متقاضی */}
// // // //               {selectedProperty.fullNameCustomer && (
// // // //                 <div className="detail-section-applicant customer-section">
// // // //                   <div className="detail-section-label-applicant">
// // // //                     <FaUser className="section-icon" />
// // // //                     اطلاعات متقاضی
// // // //                   </div>
// // // //                   <div className="customer-name-applicant">{selectedProperty.fullNameCustomer}</div>
// // // //                 </div>
// // // //               )}

// // // //               {/* تاریخ ثبت */}
// // // //               <div className="detail-footer-applicant">
// // // //                 <div className="footer-item">
// // // //                   <FaCalendarAlt className="footer-icon" />
// // // //                   <span>تاریخ ثبت: {formatDate(selectedProperty.createdAt)}</span>
// // // //                 </div>
// // // //                 <div className="footer-item">
// // // //                   <span className="relative-time">{selectedProperty.createdAtPersianRelative || 'نامشخص'}</span>
// // // //                 </div>
// // // //               </div>

// // // //               {/* شماره تماس */}
// // // //               <div className={`phone-section-applicant ${selectedProperty.isPaid ? 'paid' : 'unpaid'}`}>
// // // //                 <div className="phone-label-applicant">
// // // //                   <FaPhone className="phone-icon-section" />
// // // //                   شماره تماس
// // // //                 </div>
// // // //                 {selectedProperty.isPaid && selectedProperty.mobileNumber ? (
// // // //                   <div className="phone-number-applicant">{selectedProperty.mobileNumber}</div>
// // // //                 ) : (
// // // //                   <div className="phone-locked-applicant">
// // // //                     <FaLock className="lock-icon-section" />
// // // //                     برای مشاهده شماره تماس باید پرداخت کنید
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             </div>

// // // //             {!selectedProperty.isPaid && (
// // // //               <div className="modal-footer-applicant">
// // // //                 <button 
// // // //                   className="payment-btn-modal-applicant"
// // // //                   onClick={() => {
// // // //                     handleCloseModal();
// // // //                     handlePayment(selectedProperty);
// // // //                   }}
// // // //                 >
// // // //                   <FaLock className="btn-lock-icon" />
// // // //                   پرداخت برای مشاهده شماره تماس
// // // //                 </button>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ApplicantPropertiesPage;

// // // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // // import { 
// // //   FaHome, FaMapMarkerAlt, FaCalendarAlt, FaTag, FaArrowRight, 
// // //   FaCheckCircle, FaTimes, FaPhone, FaLock, FaSpinner, 
// // //   FaAlignLeft, FaMoneyBill, FaBed, FaRulerCombined, 
// // //   FaBuilding, FaUser, FaSearch, FaTimesCircle 
// // // } from 'react-icons/fa';
// // // import './ApplicantPropertiesPage.css';

// // // const ApplicantPropertiesPage = () => {
// // //   const [properties, setProperties] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [selectedProperty, setSelectedProperty] = useState(null);
// // //   const [showDetailModal, setShowDetailModal] = useState(false);
// // //   const [detailLoading, setDetailLoading] = useState(false);
// // //   const [paymentLoading, setPaymentLoading] = useState({});
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [searchInput, setSearchInput] = useState('');
// // //   const [isSearching, setIsSearching] = useState(false);
// // //   const searchTimeout = useRef(null);
  
// // //   const [pagination, setPagination] = useState({
// // //     pageNumber: 1,
// // //     pageSize: 10,
// // //     totalCount: 0,
// // //     totalPages: 0,
// // //     hasNextPage: false,
// // //     hasPreviousPage: false
// // //   });

// // //   // دریافت لیست درخواست‌ها با سرچ
// // //   const fetchProperties = useCallback(async (pageNumber = 1, search = '') => {
// // //     try {
// // //       setLoading(true);
// // //       setIsSearching(!!search);
// // //       const token = localStorage.getItem('auth_token');
      
// // //       // ساخت URL با پارامترها
// // //       let url = `https://localhost:7178/api/RealEstatePage/RealEstatesesApplicationsDtosAsync?pageNumber=${pageNumber}&pageSize=${pagination.pageSize}`;
// // //       if (search && search.trim()) {
// // //         url += `&searchTrem=${encodeURIComponent(search.trim())}`;
// // //       }
      
// // //       const response = await fetch(url, {
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`,
// // //           'Content-Type': 'application/json'
// // //         }
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error(`HTTP ${response.status}`);
// // //       }

// // //       const result = await response.json();
      
// // //       if (result.status === 200 && result.data) {
// // //         setProperties(result.data.items || []);
// // //         setPagination({
// // //           pageNumber: result.data.pageNumber,
// // //           pageSize: result.data.pageSize,
// // //           totalCount: result.data.totalCount,
// // //           totalPages: result.data.totalPages,
// // //           hasNextPage: result.data.hasNextPage,
// // //           hasPreviousPage: result.data.hasPreviousPage
// // //         });
// // //       } else {
// // //         throw new Error(result.message || 'خطا در دریافت اطلاعات');
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ خطا:', error);
// // //       setError('مشکل در دریافت اطلاعات');
// // //     } finally {
// // //       setLoading(false);
// // //       setIsSearching(false);
// // //     }
// // //   }, [pagination.pageSize]);

// // //   // بارگذاری اولیه
// // //   useEffect(() => {
// // //     fetchProperties(1, '');
// // //   }, []);

// // //   // جستجو با تاخیر (debounce)
// // //   const handleSearchChange = (e) => {
// // //     const value = e.target.value;
// // //     setSearchInput(value);
    
// // //     // پاک کردن تایمر قبلی
// // //     if (searchTimeout.current) {
// // //       clearTimeout(searchTimeout.current);
// // //     }
    
// // //     // تایمر جدید برای جستجو بعد از 500ms
// // //     searchTimeout.current = setTimeout(() => {
// // //       setSearchTerm(value);
// // //       if (value.trim()) {
// // //         fetchProperties(1, value);
// // //       } else {
// // //         fetchProperties(1, '');
// // //       }
// // //     }, 500);
// // //   };

// // //   // پاک کردن جستجو
// // //   const handleClearSearch = () => {
// // //     setSearchInput('');
// // //     setSearchTerm('');
// // //     fetchProperties(1, '');
// // //   };

// // //   // جستجو با Enter
// // //   const handleSearchKeyDown = (e) => {
// // //     if (e.key === 'Enter') {
// // //       if (searchTimeout.current) {
// // //         clearTimeout(searchTimeout.current);
// // //       }
// // //       setSearchTerm(searchInput);
// // //       if (searchInput.trim()) {
// // //         fetchProperties(1, searchInput);
// // //       } else {
// // //         fetchProperties(1, '');
// // //       }
// // //     }
// // //   };

// // //   // دریافت جزئیات کامل
// // //   const fetchDetail = async (code) => {
// // //     try {
// // //       setDetailLoading(true);
// // //       const token = localStorage.getItem('auth_token');
      
// // //       const response = await fetch(
// // //         `https://localhost:7178/api/RealEstatePage/GetRealEstatesesApplicationsDetails`,
// // //         {
// // //           method: 'POST',
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`,
// // //             'Content-Type': 'application/json'
// // //           },
// // //           body: JSON.stringify(code)
// // //         }
// // //       );

// // //       if (!response.ok) {
// // //         throw new Error(`HTTP ${response.status}`);
// // //       }

// // //       const result = await response.json();
      
// // //       if (result.status === 200 && result.data) {
// // //         setSelectedProperty(result.data);
// // //         setShowDetailModal(true);
// // //         document.body.style.overflow = 'hidden';
// // //       } else {
// // //         throw new Error(result.message || 'خطا در دریافت جزئیات');
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ خطا در دریافت جزئیات:', error);
// // //       alert('مشکل در دریافت جزئیات. لطفاً دوباره تلاش کنید.');
// // //     } finally {
// // //       setDetailLoading(false);
// // //     }
// // //   };

// // //   const handlePayment = async (property) => {
// // //     try {
// // //       setPaymentLoading(prev => ({ ...prev, [property.code]: true }));
// // //       alert(`شما در حال پرداخت برای "${property.title}" هستید`);
// // //       await fetchProperties(pagination.pageNumber, searchTerm);
// // //     } catch (error) {
// // //       console.error('❌ خطا در پرداخت:', error);
// // //       alert('مشکل در پرداخت. لطفاً دوباره تلاش کنید.');
// // //     } finally {
// // //       setPaymentLoading(prev => ({ ...prev, [property.code]: false }));
// // //     }
// // //   };

// // //   const handleShowDetails = (property) => {
// // //     fetchDetail(property.code);
// // //   };

// // //   const handleCloseModal = () => {
// // //     setShowDetailModal(false);
// // //     setSelectedProperty(null);
// // //     document.body.style.overflow = '';
// // //   };

// // //   const handlePageChange = (newPage) => {
// // //     if (newPage >= 1 && newPage <= pagination.totalPages) {
// // //       fetchProperties(newPage, searchTerm);
// // //       window.scrollTo({ top: 0, behavior: 'smooth' });
// // //     }
// // //   };

// // //   const formatDate = (dateString) => {
// // //     if (!dateString) return 'تاریخ نامشخص';
// // //     const date = new Date(dateString);
// // //     return new Intl.DateTimeFormat('fa-IR', {
// // //       year: 'numeric',
// // //       month: 'long',
// // //       day: 'numeric',
// // //       hour: '2-digit',
// // //       minute: '2-digit'
// // //     }).format(date);
// // //   };

// // //   const formatBudget = (budget) => {
// // //     if (!budget || budget === 0) return 'نامشخص';
// // //     return budget.toLocaleString('fa-IR') + ' تومان';
// // //   };

// // //   if (loading && !isSearching) {
// // //     return (
// // //       <div className="applicant-page-container">
// // //         <div className="applicant-header">
// // //           <h1 className="applicant-title">درخواست‌های من</h1>
// // //           <div className="total-count">{pagination.totalCount} درخواست</div>
// // //         </div>
// // //         <div className="applicant-loading">
// // //           <FaSpinner className="loading-spinner" />
// // //           <span>در حال بارگذاری...</span>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="applicant-page-container">
// // //         <div className="applicant-header">
// // //           <h1 className="applicant-title">درخواست‌های من</h1>
// // //           <div className="total-count">{pagination.totalCount} درخواست</div>
// // //         </div>
// // //         <div className="applicant-error">
// // //           <FaTimes className="error-icon" />
// // //           <p>{error}</p>
// // //           <button onClick={() => fetchProperties(1, searchTerm)} className="retry-btn">
// // //             تلاش مجدد
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="applicant-page-container">
// // //       {/* هدر */}
// // //       <div className="applicant-header">
// // //         <div className="header-content">
// // //           <h1 className="applicant-title">
// // //             <FaHome className="title-icon" />
// // //             درخواست‌های من
// // //           </h1>
// // //           <span className="total-count">{pagination.totalCount} درخواست</span>
// // //         </div>
// // //       </div>

// // //       {/* نوار جستجو */}
// // //       <div className="search-container">
// // //         <div className="search-wrapper">
// // //           <FaSearch className="search-icon" />
// // //           <input
// // //             type="text"
// // //             className="search-input"
// // //             placeholder="جستجو در درخواست‌ها..."
// // //             value={searchInput}
// // //             onChange={handleSearchChange}
// // //             onKeyDown={handleSearchKeyDown}
// // //           />
// // //           {searchInput && (
// // //             <button className="search-clear" onClick={handleClearSearch}>
// // //               <FaTimesCircle />
// // //             </button>
// // //           )}
// // //           {isSearching && (
// // //             <FaSpinner className="search-spinner" />
// // //           )}
// // //         </div>
// // //         {searchTerm && (
// // //           <div className="search-result-info">
// // //             <span>نتیجه جستجو برای: <strong>"{searchTerm}"</strong></span>
// // //             <span className="result-count">{properties.length} مورد</span>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* لیست درخواست‌ها */}
// // //       {properties.length === 0 ? (
// // //         <div className="applicant-empty">
// // //           {searchTerm ? (
// // //             <>
// // //               <FaSearch className="empty-icon" />
// // //               <h3>نتیجه‌ای یافت نشد</h3>
// // //               <p>برای عبارت "{searchTerm}" هیچ نتیجه‌ای پیدا نشد</p>
// // //               <button onClick={handleClearSearch} className="clear-search-btn">
// // //                 پاک کردن جستجو
// // //               </button>
// // //             </>
// // //           ) : (
// // //             <>
// // //               <FaHome className="empty-icon" />
// // //               <h3>هیچ درخواستی یافت نشد</h3>
// // //               <p>شما هنوز درخواستی ثبت نکرده‌اید</p>
// // //             </>
// // //           )}
// // //         </div>
// // //       ) : (
// // //         <>
// // //           <div className="applicant-grid">
// // //             {properties.map((property) => (
// // //               <div key={property.code} className="applicant-card">
// // //                 <div className="card-top">
// // //                   <div className="card-header">
// // //                     <h3 className="property-title">{property.title}</h3>
// // //                     <span className={`status-badge ${property.isPaid ? 'paid' : 'unpaid'}`}>
// // //                       {property.isPaid ? (
// // //                         <><FaCheckCircle /> پرداخت شده</>
// // //                       ) : (
// // //                         <><FaLock /> پرداخت نشده</>
// // //                       )}
// // //                     </span>
// // //                   </div>
                  
// // //                   <div className="property-info-compact">
// // //                     <span className="info-tag">
// // //                       <FaTag className="info-icon-small" />
// // //                       {property.categoryName || 'نامشخص'}
// // //                     </span>
// // //                     <span className="info-tag">
// // //                       <FaMapMarkerAlt className="info-icon-small" />
// // //                       {property.regionName || 'منطقه نامشخص'}
// // //                     </span>
// // //                     <span className="info-tag">
// // //                       <FaCalendarAlt className="info-icon-small" />
// // //                       {property.createdAtPersianRelative || 'نامشخص'}
// // //                     </span>
// // //                   </div>

// // //                   {/* مناطق با بک‌گراند مشخص */}
// // //                   {property.regions && property.regions.length > 0 && (
// // //                     <div className="regions-compact">
// // //                       <span className="regions-label">مناطق:</span>
// // //                       {property.regions.slice(0, 4).map((region, idx) => (
// // //                         <span key={idx} className="region-tag-small">{region}</span>
// // //                       ))}
// // //                       {property.regions.length > 4 && (
// // //                         <span className="region-tag-small more">+{property.regions.length - 4}</span>
// // //                       )}
// // //                     </div>
// // //                   )}

// // //                   {/* توضیحات */}
// // //                   {property.desc && (
// // //                     <div className="desc-compact">
// // //                       <FaAlignLeft className="desc-icon-small" />
// // //                       <span className="desc-text">{property.desc}</span>
// // //                     </div>
// // //                   )}

// // //                   {/* شماره موبایل */}
// // //                   {property.isPaid && property.mobileNumber ? (
// // //                     <div className="phone-display-compact">
// // //                       <FaPhone className="phone-icon-small" />
// // //                       <span className="phone-number-small">{property.mobileNumber}</span>
// // //                     </div>
// // //                   ) : (
// // //                     <div className="phone-locked-compact">
// // //                       <FaLock className="lock-icon-small" />
// // //                       <span>برای مشاهده شماره، پرداخت کنید</span>
// // //                     </div>
// // //                   )}
// // //                 </div>

// // //                 <div className="card-actions-compact">
// // //                   {!property.isPaid && (
// // //                     <button 
// // //                       className="action-btn-small payment-btn-small"
// // //                       onClick={() => handlePayment(property)}
// // //                       disabled={paymentLoading[property.code]}
// // //                     >
// // //                       {paymentLoading[property.code] ? (
// // //                         <FaSpinner className="spinner-small" />
// // //                       ) : (
// // //                         'پرداخت'
// // //                       )}
// // //                     </button>
// // //                   )}
// // //                   <button 
// // //                     className="action-btn-small details-btn-small"
// // //                     onClick={() => handleShowDetails(property)}
// // //                     disabled={detailLoading}
// // //                   >
// // //                     {detailLoading ? (
// // //                       <FaSpinner className="spinner-small" />
// // //                     ) : (
// // //                       <>
// // //                         جزئیات
// // //                         <FaArrowRight className="btn-arrow-small" />
// // //                       </>
// // //                     )}
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* صفحه‌بندی */}
// // //           {pagination.totalPages > 1 && (
// // //             <div className="pagination-compact">
// // //               <button
// // //                 className="page-btn-small"
// // //                 onClick={() => handlePageChange(pagination.pageNumber - 1)}
// // //                 disabled={!pagination.hasPreviousPage}
// // //               >
// // //                 قبلی
// // //               </button>
              
// // //               {[...Array(pagination.totalPages)].map((_, index) => {
// // //                 const pageNum = index + 1;
// // //                 const isActive = pageNum === pagination.pageNumber;
// // //                 if (
// // //                   pageNum === 1 ||
// // //                   pageNum === pagination.totalPages ||
// // //                   (pageNum >= pagination.pageNumber - 1 && pageNum <= pagination.pageNumber + 1)
// // //                 ) {
// // //                   return (
// // //                     <button
// // //                       key={pageNum}
// // //                       className={`page-btn-small ${isActive ? 'active' : ''}`}
// // //                       onClick={() => handlePageChange(pageNum)}
// // //                     >
// // //                       {pageNum}
// // //                     </button>
// // //                   );
// // //                 }
// // //                 if (pageNum === pagination.pageNumber - 2 || pageNum === pagination.pageNumber + 2) {
// // //                   return <span key={pageNum} className="page-dots-small">...</span>;
// // //                 }
// // //                 return null;
// // //               })}
              
// // //               <button
// // //                 className="page-btn-small"
// // //                 onClick={() => handlePageChange(pagination.pageNumber + 1)}
// // //                 disabled={!pagination.hasNextPage}
// // //               >
// // //                 بعدی
// // //               </button>
// // //             </div>
// // //           )}
// // //         </>
// // //       )}

// // //       {/* مودال جزئیات */}
// // //       {showDetailModal && selectedProperty && (
// // //         <div className="detail-modal-overlay-applicant" onClick={handleCloseModal}>
// // //           <div className="detail-modal-content-applicant" onClick={(e) => e.stopPropagation()}>
// // //             <button className="modal-close-btn-applicant" onClick={handleCloseModal}>
// // //               <FaTimes />
// // //             </button>

// // //             <div className="modal-header-applicant">
// // //               <div className="modal-title-section">
// // //                 <h2 className="modal-title-applicant">{selectedProperty.title}</h2>
// // //                 <span className={`modal-status-applicant ${selectedProperty.isPaid ? 'paid' : 'unpaid'}`}>
// // //                   {selectedProperty.isPaid ? '✓ پرداخت شده' : '🔒 پرداخت نشده'}
// // //                 </span>
// // //               </div>
// // //               <div className="modal-code">
// // //                 کد: {selectedProperty.code}
// // //               </div>
// // //             </div>

// // //             <div className="modal-body-applicant">
// // //               {/* ردیف اول: دسته‌بندی و منطقه */}
// // //               <div className="detail-grid-applicant">
// // //                 <div className="detail-item-applicant">
// // //                   <div className="detail-icon-applicant"><FaTag /></div>
// // //                   <div>
// // //                     <div className="detail-label-applicant">دسته‌بندی</div>
// // //                     <div className="detail-value-applicant">{selectedProperty.categoryName || 'نامشخص'}</div>
// // //                   </div>
// // //                 </div>
// // //                 <div className="detail-item-applicant">
// // //                   <div className="detail-icon-applicant"><FaMapMarkerAlt /></div>
// // //                   <div>
// // //                     <div className="detail-label-applicant">منطقه اصلی</div>
// // //                     <div className="detail-value-applicant">{selectedProperty.regionName || 'نامشخص'}</div>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* مناطق مورد نظر */}
// // //               {selectedProperty.regions && selectedProperty.regions.length > 0 && (
// // //                 <div className="detail-section-applicant regions-section">
// // //                   <div className="detail-section-label-applicant">
// // //                     <FaMapMarkerAlt className="section-icon" />
// // //                     مناطق مورد نظر
// // //                   </div>
// // //                   <div className="regions-list-applicant">
// // //                     {selectedProperty.regions.map((region, idx) => (
// // //                       <span key={idx} className="region-badge-applicant">{region}</span>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               {/* مشخصات ملک */}
// // //               <div className="detail-grid-applicant specs-grid">
// // //                 {selectedProperty.minCountRoom > 0 && (
// // //                   <div className="spec-item-applicant">
// // //                     <FaBed className="spec-icon-applicant" />
// // //                     <div>
// // //                       <div className="spec-label-applicant">حداقل اتاق</div>
// // //                       <div className="spec-value-applicant">{selectedProperty.minCountRoom} خواب</div>
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //                 {selectedProperty.minSquareMeter > 0 && (
// // //                   <div className="spec-item-applicant">
// // //                     <FaRulerCombined className="spec-icon-applicant" />
// // //                     <div>
// // //                       <div className="spec-label-applicant">متراژ</div>
// // //                       <div className="spec-value-applicant">
// // //                         {selectedProperty.minSquareMeter}
// // //                         {selectedProperty.maxSquareMeter ? ` - ${selectedProperty.maxSquareMeter}` : ' به بالا'}
// // //                         {' متر'}
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //                 {(selectedProperty.minConstructionYear > 0 || selectedProperty.maxConstructionYear > 0) && (
// // //                   <div className="spec-item-applicant">
// // //                     <FaBuilding className="spec-icon-applicant" />
// // //                     <div>
// // //                       <div className="spec-label-applicant">سال ساخت</div>
// // //                       <div className="spec-value-applicant">
// // //                         {selectedProperty.minConstructionYear || '?'}
// // //                         {selectedProperty.maxConstructionYear ? ` - ${selectedProperty.maxConstructionYear}` : ' به بعد'}
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //                 {selectedProperty.budget > 0 && (
// // //                   <div className="spec-item-applicant">
// // //                     <FaMoneyBill className="spec-icon-applicant" />
// // //                     <div>
// // //                       <div className="spec-label-applicant">بودجه</div>
// // //                       <div className="spec-value-applicant budget">{formatBudget(selectedProperty.budget)}</div>
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* توضیحات */}
// // //               {selectedProperty.desc && (
// // //                 <div className="detail-section-applicant desc-section">
// // //                   <div className="detail-section-label-applicant">
// // //                     <FaAlignLeft className="section-icon" />
// // //                     توضیحات تکمیلی
// // //                   </div>
// // //                   <div className="desc-content-applicant">{selectedProperty.desc}</div>
// // //                 </div>
// // //               )}

// // //               {/* نام متقاضی */}
// // //               {selectedProperty.fullNameCustomer && (
// // //                 <div className="detail-section-applicant customer-section">
// // //                   <div className="detail-section-label-applicant">
// // //                     <FaUser className="section-icon" />
// // //                     اطلاعات متقاضی
// // //                   </div>
// // //                   <div className="customer-name-applicant">{selectedProperty.fullNameCustomer}</div>
// // //                 </div>
// // //               )}

// // //               {/* تاریخ ثبت */}
// // //               <div className="detail-footer-applicant">
// // //                 <div className="footer-item">
// // //                   <FaCalendarAlt className="footer-icon" />
// // //                   <span>تاریخ ثبت: {formatDate(selectedProperty.createdAt)}</span>
// // //                 </div>
// // //                 <div className="footer-item">
// // //                   <span className="relative-time">{selectedProperty.createdAtPersianRelative || 'نامشخص'}</span>
// // //                 </div>
// // //               </div>

// // //               {/* شماره تماس */}
// // //               <div className={`phone-section-applicant ${selectedProperty.isPaid ? 'paid' : 'unpaid'}`}>
// // //                 <div className="phone-label-applicant">
// // //                   <FaPhone className="phone-icon-section" />
// // //                   شماره تماس
// // //                 </div>
// // //                 {selectedProperty.isPaid && selectedProperty.mobileNumber ? (
// // //                   <div className="phone-number-applicant">{selectedProperty.mobileNumber}</div>
// // //                 ) : (
// // //                   <div className="phone-locked-applicant">
// // //                     <FaLock className="lock-icon-section" />
// // //                     برای مشاهده شماره تماس باید پرداخت کنید
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {!selectedProperty.isPaid && (
// // //               <div className="modal-footer-applicant">
// // //                 <button 
// // //                   className="payment-btn-modal-applicant"
// // //                   onClick={() => {
// // //                     handleCloseModal();
// // //                     handlePayment(selectedProperty);
// // //                   }}
// // //                 >
// // //                   <FaLock className="btn-lock-icon" />
// // //                   پرداخت برای مشاهده شماره تماس
// // //                 </button>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default ApplicantPropertiesPage;

// // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // import { 
// //   FaHome, FaMapMarkerAlt, FaCalendarAlt, FaTag, FaArrowRight, 
// //   FaCheckCircle, FaTimes, FaPhone, FaLock, FaSpinner, 
// //   FaAlignLeft, FaMoneyBill, FaBed, FaRulerCombined, 
// //   FaBuilding, FaUser, FaSearch, FaTimesCircle 
// // } from 'react-icons/fa';
// // import PaymentModalApp from './PaymentModalApp';
// // import './ApplicantPropertiesPage.css';

// // const ApplicantPropertiesPage = () => {
// //   const [properties, setProperties] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [selectedProperty, setSelectedProperty] = useState(null);
// //   const [showDetailModal, setShowDetailModal] = useState(false);
// //   const [detailLoading, setDetailLoading] = useState(false);
// //   const [paymentLoading, setPaymentLoading] = useState({});
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [searchInput, setSearchInput] = useState('');
// //   const [isSearching, setIsSearching] = useState(false);
// //   const searchTimeout = useRef(null);
  
// //   // State های مودال پرداخت
// //   const [showPaymentModal, setShowPaymentModal] = useState(false);
// //   const [paymentProperty, setPaymentProperty] = useState(null);
  
// //   const [pagination, setPagination] = useState({
// //     pageNumber: 1,
// //     pageSize: 15,
// //     totalCount: 0,
// //     totalPages: 0,
// //     hasNextPage: false,
// //     hasPreviousPage: false
// //   });

// //   // دریافت لیست درخواست‌ها با سرچ
// //   const fetchProperties = useCallback(async (pageNumber = 1, search = '') => {
// //     try {
// //       setLoading(true);
// //       setIsSearching(!!search);
// //       const token = localStorage.getItem('auth_token');
      
// //       let url = `https://localhost:7178/api/RealEstatePage/RealEstatesesApplicationsDtosAsync?pageNumber=${pageNumber}&pageSize=${pagination.pageSize}`;
// //       if (search && search.trim()) {
// //         url += `&searchTrem=${encodeURIComponent(search.trim())}`;
// //       }
      
// //       const response = await fetch(url, {
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         }
// //       });

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
// //       setIsSearching(false);
// //     }
// //   }, [pagination.pageSize]);

// //   // بارگذاری اولیه
// //   useEffect(() => {
// //     fetchProperties(1, '');
// //   }, []);

// //   // جستجو با تاخیر (debounce)
// //   const handleSearchChange = (e) => {
// //     const value = e.target.value;
// //     setSearchInput(value);
    
// //     if (searchTimeout.current) {
// //       clearTimeout(searchTimeout.current);
// //     }
    
// //     searchTimeout.current = setTimeout(() => {
// //       setSearchTerm(value);
// //       if (value.trim()) {
// //         fetchProperties(1, value);
// //       } else {
// //         fetchProperties(1, '');
// //       }
// //     }, 500);
// //   };

// //   // پاک کردن جستجو
// //   const handleClearSearch = () => {
// //     setSearchInput('');
// //     setSearchTerm('');
// //     fetchProperties(1, '');
// //   };

// //   // جستجو با Enter
// //   const handleSearchKeyDown = (e) => {
// //     if (e.key === 'Enter') {
// //       if (searchTimeout.current) {
// //         clearTimeout(searchTimeout.current);
// //       }
// //       setSearchTerm(searchInput);
// //       if (searchInput.trim()) {
// //         fetchProperties(1, searchInput);
// //       } else {
// //         fetchProperties(1, '');
// //       }
// //     }
// //   };

// //   // دریافت جزئیات کامل
// //   const fetchDetail = async (id) => {
// //     try {
// //       setDetailLoading(true);
// //       const token = localStorage.getItem('auth_token');
      
// //       const response = await fetch(
// //         `https://localhost:7178/api/RealEstatePage/GetRealEstatesesApplicationsDetails`,
// //         {
// //           method: 'POST',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           },
// //           body: JSON.stringify(id)
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error(`HTTP ${response.status}`);
// //       }

// //       const result = await response.json();
      
// //       if (result.status === 200 && result.data) {
// //         setSelectedProperty(result.data);
// //         setShowDetailModal(true);
// //         document.body.style.overflow = 'hidden';
// //       } else {
// //         throw new Error(result.message || 'خطا در دریافت جزئیات');
// //       }
// //     } catch (error) {
// //       console.error('❌ خطا در دریافت جزئیات:', error);
// //       alert('مشکل در دریافت جزئیات. لطفاً دوباره تلاش کنید.');
// //     } finally {
// //       setDetailLoading(false);
// //     }
// //   };

// //   // باز کردن مودال پرداخت
// //   const handleOpenPayment = (property) => {
// //     setPaymentProperty(property);
// //     setShowPaymentModal(true);
// //     document.body.style.overflow = 'hidden';
// //   };

// //   // بستن مودال پرداخت
// //   const handleClosePayment = () => {
// //     setShowPaymentModal(false);
// //     setPaymentProperty(null);
// //     document.body.style.overflow = '';
// //   };

// //   // پس از پرداخت موفق
// //   const handlePaymentSuccess = async () => {
// //     // به‌روزرسانی لیست
// //     await fetchProperties(pagination.pageNumber, searchTerm);
// //     // بستن مودال پرداخت
// //     handleClosePayment();
// //   };

// //   const handleShowDetails = (property) => {
// //     fetchDetail(property.id);
// //   };

// //   const handleCloseModal = () => {
// //     setShowDetailModal(false);
// //     setSelectedProperty(null);
// //     document.body.style.overflow = '';
// //   };

// //   const handlePageChange = (newPage) => {
// //     if (newPage >= 1 && newPage <= pagination.totalPages) {
// //       fetchProperties(newPage, searchTerm);
// //       window.scrollTo({ top: 0, behavior: 'smooth' });
// //     }
// //   };

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

// //   const formatBudget = (budget) => {
// //     if (!budget || budget === 0) return 'نامشخص';
// //     return budget.toLocaleString('fa-IR') + ' تومان';
// //   };

// //   if (loading && !isSearching) {
// //     return (
// //       <div className="applicant-page-container">
// //         <div className="applicant-header">
// //        <h1 className="applicant-title"> متقاضیان ملک</h1>
// //           <div className="total-count">{pagination.totalCount} درخواست</div>
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
// //           <h1 className="applicant-title"> متقاضیان ملک</h1>
// //           <div className="total-count">{pagination.totalCount} درخواست</div>
// //         </div>
// //         <div className="applicant-error">
// //           <FaTimes className="error-icon" />
// //           <p>{error}</p>
// //           <button onClick={() => fetchProperties(1, searchTerm)} className="retry-btn">
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
// //            متقاضیان ملک
// //           </h1>
// //           <span className="total-count">{pagination.totalCount} درخواست</span>
// //         </div>
// //       </div>

// //       {/* نوار جستجو */}
// //       <div className="search-container">
// //         <div className="search-wrapper">
// //           <FaSearch className="search-icon" />
// //           <input
// //             type="text"
// //             className="search-input"
// //             placeholder="جستجو در درخواست‌ها..."
// //             value={searchInput}
// //             onChange={handleSearchChange}
// //             onKeyDown={handleSearchKeyDown}
// //           />
// //           {searchInput && (
// //             <button className="search-clear" onClick={handleClearSearch}>
// //               <FaTimesCircle />
// //             </button>
// //           )}
// //           {isSearching && (
// //             <FaSpinner className="search-spinner" />
// //           )}
// //         </div>
// //         {searchTerm && (
// //           <div className="search-result-info">
// //             <span>نتیجه جستجو برای: <strong>"{searchTerm}"</strong></span>
// //             <span className="result-count">{properties.length} مورد</span>
// //           </div>
// //         )}
// //       </div>

// //       {/* لیست درخواست‌ها */}
// //       {properties.length === 0 ? (
// //         <div className="applicant-empty">
// //           {searchTerm ? (
// //             <>
// //               <FaSearch className="empty-icon" />
// //               <h3>نتیجه‌ای یافت نشد</h3>
// //               <p>برای عبارت "{searchTerm}" هیچ نتیجه‌ای پیدا نشد</p>
// //               <button onClick={handleClearSearch} className="clear-search-btn">
// //                 پاک کردن جستجو
// //               </button>
// //             </>
// //           ) : (
// //             <>
// //               <FaHome className="empty-icon" />
// //               <h3>هیچ درخواستی یافت نشد</h3>
// //               <p>شما هنوز درخواستی ثبت نکرده‌اید</p>
// //             </>
// //           )}
// //         </div>
// //       ) : (
// //         <>
// //           <div className="applicant-grid">
// //             {properties.map((property) => (
// //               <div key={property.code} className="applicant-card">
// //                 <div className="card-top">
// //                   <div className="card-header">
// //                     <h4 className="property-title">{property.title}</h4>
// //                     <span className={`status-badge ${property.isPaid ? 'paid' : 'unpaid'}`}>
// //                       {property.isPaid ? (
// //                         <><FaCheckCircle /> پرداخت شده</>
// //                       ) : (
// //                         <><FaLock /> پرداخت نشده</>
// //                       )}
// //                     </span>
// //                   </div>
                  
// //                   <div className="property-info-compact">
// //                     <span className="info-tag">
// //                       <FaTag className="info-icon-small" />
// //                       {property.categoryName || 'نامشخص'}
// //                     </span>
// //                     <span className="info-tag">
// //                       <FaMapMarkerAlt className="info-icon-small" />
// //                       {property.regionName || 'منطقه نامشخص'}
// //                     </span>
// //                     <span className="info-tag">
// //                       <FaCalendarAlt className="info-icon-small" />
// //                       {property.createdAtPersianRelative || 'نامشخص'}
// //                     </span>
// //                   </div>

// //                   {/* مناطق با بک‌گراند مشخص */}
// //                   {property.regions && property.regions.length > 0 && (
// //                     <div className="regions-compact">
// //                       <span className="regions-label">مناطق:</span>
// //                       {property.regions.slice(0, 4).map((region, idx) => (
// //                         <span key={idx} className="region-tag-small">{region}</span>
// //                       ))}
// //                       {property.regions.length > 4 && (
// //                         <span className="region-tag-small more">+{property.regions.length - 4}</span>
// //                       )}
// //                     </div>
// //                   )}

// //                   {/* توضیحات */}
// //                   {property.desc && (
// //                     <div className="desc-compact">
// //                       <FaAlignLeft className="desc-icon-small" />
// //                       <span className="desc-text">{property.desc}</span>
// //                     </div>
// //                   )}

// //                   {/* شماره موبایل */}
// //                   {property.isPaid && property.mobileNumber ? (
// //                     <div className="phone-display-compact">
// //                       <FaPhone className="phone-icon-small" />
// //                       <span className="phone-number-small">{property.mobileNumber}</span>
// //                     </div>
// //                   ) : (
// //                     <div className="phone-locked-compact">
// //                       <FaLock className="lock-icon-small" />
// //                       <span>برای مشاهده شماره، پرداخت کنید</span>
// //                     </div>
// //                   )}
// //                 </div>

// //                 <div className="card-actions-compact">
// //                   {!property.isPaid && (
// //                     <button 
// //                       className="action-btn-small payment-btn-small"
// //                       onClick={() => handleOpenPayment(property)}
// //                     >
// //                       پرداخت
// //                     </button>
// //                   )}
// //                   <button 
// //                     className="action-btn-small details-btn-small"
// //                     onClick={() => handleShowDetails(property)}
// //                     disabled={detailLoading}
// //                   >
// //                     {detailLoading ? (
// //                       <FaSpinner className="spinner-small" />
// //                     ) : (
// //                       <>
// //                         جزئیات
// //                         <FaArrowRight className="btn-arrow-small" />
// //                       </>
// //                     )}
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* صفحه‌بندی */}
// //           {pagination.totalPages > 1 && (
// //             <div className="pagination-compact">
// //               <button
// //                 className="page-btn-small"
// //                 onClick={() => handlePageChange(pagination.pageNumber - 1)}
// //                 disabled={!pagination.hasPreviousPage}
// //               >
// //                 قبلی
// //               </button>
              
// //               {[...Array(pagination.totalPages)].map((_, index) => {
// //                 const pageNum = index + 1;
// //                 const isActive = pageNum === pagination.pageNumber;
// //                 if (
// //                   pageNum === 1 ||
// //                   pageNum === pagination.totalPages ||
// //                   (pageNum >= pagination.pageNumber - 1 && pageNum <= pagination.pageNumber + 1)
// //                 ) {
// //                   return (
// //                     <button
// //                       key={pageNum}
// //                       className={`page-btn-small ${isActive ? 'active' : ''}`}
// //                       onClick={() => handlePageChange(pageNum)}
// //                     >
// //                       {pageNum}
// //                     </button>
// //                   );
// //                 }
// //                 if (pageNum === pagination.pageNumber - 2 || pageNum === pagination.pageNumber + 2) {
// //                   return <span key={pageNum} className="page-dots-small">...</span>;
// //                 }
// //                 return null;
// //               })}
              
// //               <button
// //                 className="page-btn-small"
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
// //         <div className="detail-modal-overlay-applicant" onClick={handleCloseModal}>
// //           <div className="detail-modal-content-applicant" onClick={(e) => e.stopPropagation()}>
// //             <button className="modal-close-btn-applicant" onClick={handleCloseModal}>
// //               <FaTimes />
// //             </button>

// //             <div className="modal-header-applicant">
// //               <div className="modal-title-section">
// //                 <h2 className="modal-title-applicant">{selectedProperty.title}</h2>
// //                 <span className={`modal-status-applicant ${selectedProperty.isPaid ? 'paid' : 'unpaid'}`}>
// //                   {selectedProperty.isPaid ? '✓ پرداخت شده' : '🔒 پرداخت نشده'}
// //                 </span>
// //               </div>
// //               <div className="modal-code">
// //                 کد: {selectedProperty.code}
// //               </div>
// //             </div>

// //             <div className="modal-body-applicant">
// //               {/* ردیف اول: دسته‌بندی و منطقه */}
// //               <div className="detail-grid-applicant">
// //                 <div className="detail-item-applicant">
// //                   <div className="detail-icon-applicant"><FaTag /></div>
// //                   <div>
// //                     <div className="detail-label-applicant">دسته‌بندی</div>
// //                     <div className="detail-value-applicant">{selectedProperty.categoryName || 'نامشخص'}</div>
// //                   </div>
// //                 </div>
// //                 <div className="detail-item-applicant">
// //                   <div className="detail-icon-applicant"><FaMapMarkerAlt /></div>
// //                   <div>
// //                     <div className="detail-label-applicant">منطقه اصلی</div>
// //                     <div className="detail-value-applicant">{selectedProperty.regionName || 'نامشخص'}</div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* مناطق مورد نظر */}
// //               {selectedProperty.regions && selectedProperty.regions.length > 0 && (
// //                 <div className="detail-section-applicant regions-section">
// //                   <div className="detail-section-label-applicant">
// //                     <FaMapMarkerAlt className="section-icon" />
// //                     مناطق مورد نظر
// //                   </div>
// //                   <div className="regions-list-applicant">
// //                     {selectedProperty.regions.map((region, idx) => (
// //                       <span key={idx} className="region-badge-applicant">{region}</span>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               {/* مشخصات ملک */}
// //               <div className="detail-grid-applicant specs-grid">
// //                 {selectedProperty.minCountRoom > 0 && (
// //                   <div className="spec-item-applicant">
// //                     <FaBed className="spec-icon-applicant" />
// //                     <div>
// //                       <div className="spec-label-applicant">حداقل اتاق</div>
// //                       <div className="spec-value-applicant">{selectedProperty.minCountRoom} خواب</div>
// //                     </div>
// //                   </div>
// //                 )}
// //                 {selectedProperty.minSquareMeter > 0 && (
// //                   <div className="spec-item-applicant">
// //                     <FaRulerCombined className="spec-icon-applicant" />
// //                     <div>
// //                       <div className="spec-label-applicant">متراژ</div>
// //                       <div className="spec-value-applicant">
// //                         {selectedProperty.minSquareMeter}
// //                         {selectedProperty.maxSquareMeter ? ` - ${selectedProperty.maxSquareMeter}` : ' به بالا'}
// //                         {' متر'}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //                 {(selectedProperty.minConstructionYear > 0 || selectedProperty.maxConstructionYear > 0) && (
// //                   <div className="spec-item-applicant">
// //                     <FaBuilding className="spec-icon-applicant" />
// //                     <div>
// //                       <div className="spec-label-applicant">سال ساخت</div>
// //                       <div className="spec-value-applicant">
// //                         {selectedProperty.minConstructionYear || '?'}
// //                         {selectedProperty.maxConstructionYear ? ` - ${selectedProperty.maxConstructionYear}` : ' به بعد'}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //                 {selectedProperty.budget > 0 && (
// //                   <div className="spec-item-applicant">
// //                     <FaMoneyBill className="spec-icon-applicant" />
// //                     <div>
// //                       <div className="spec-label-applicant">بودجه</div>
// //                       <div className="spec-value-applicant budget">{formatBudget(selectedProperty.budget)}</div>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* توضیحات */}
// //               {selectedProperty.desc && (
// //                 <div className="detail-section-applicant desc-section">
// //                   <div className="detail-section-label-applicant">
// //                     <FaAlignLeft className="section-icon" />
// //                     توضیحات تکمیلی
// //                   </div>
// //                   <div className="desc-content-applicant">{selectedProperty.desc}</div>
// //                 </div>
// //               )}

// //               {/* نام متقاضی */}
// //               {selectedProperty.fullNameCustomer && (
// //                 <div className="detail-section-applicant customer-section">
// //                   <div className="detail-section-label-applicant">
// //                     <FaUser className="section-icon" />
// //                     اطلاعات متقاضی
// //                   </div>
// //                   <div className="customer-name-applicant">{selectedProperty.fullNameCustomer}</div>
// //                 </div>
// //               )}

// //               {/* تاریخ ثبت */}
// //               <div className="detail-footer-applicant">
// //                 <div className="footer-item">
// //                   <FaCalendarAlt className="footer-icon" />
// //                   <span>تاریخ ثبت: {formatDate(selectedProperty.createdAt)}</span>
// //                 </div>
// //                 <div className="footer-item">
// //                   <span className="relative-time">{selectedProperty.createdAtPersianRelative || 'نامشخص'}</span>
// //                 </div>
// //               </div>

// //               {/* شماره تماس */}
// //               <div className={`phone-section-applicant ${selectedProperty.isPaid ? 'paid' : 'unpaid'}`}>
// //                 <div className="phone-label-applicant">
// //                   <FaPhone className="phone-icon-section" />
// //                   شماره تماس
// //                 </div>
// //                 {selectedProperty.isPaid && selectedProperty.mobileNumber ? (
// //                   <div className="phone-number-applicant">{selectedProperty.mobileNumber}</div>
// //                 ) : (
// //                   <div className="phone-locked-applicant">
// //                     <FaLock className="lock-icon-section" />
// //                     برای مشاهده شماره تماس باید پرداخت کنید
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {!selectedProperty.isPaid && (
// //               <div className="modal-footer-applicant">
// //                 <button 
// //                   className="payment-btn-modal-applicant"
// //                   onClick={() => {
// //                     handleCloseModal();
// //                     handleOpenPayment(selectedProperty);
// //                   }}
// //                 >
// //                   <FaLock className="btn-lock-icon" />
// //                   پرداخت برای مشاهده شماره تماس
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )}

// //       {/* مودال پرداخت */}
// //       <PaymentModalApp
// //         isOpen={showPaymentModal}
// //         onClose={handleClosePayment}
// //         property={paymentProperty}
// //         onSuccess={handlePaymentSuccess}
// //       />
// //     </div>
// //   );
// // };

// // export default ApplicantPropertiesPage;

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { 
//   FaHome, FaMapMarkerAlt, FaCalendarAlt, FaTag, FaArrowRight, 
//   FaCheckCircle, FaTimes, FaPhone, FaLock, FaSpinner, 
//   FaAlignLeft, FaMoneyBill, FaBed, FaRulerCombined, 
//   FaBuilding, FaUser, FaSearch, FaTimesCircle, FaBookmark, FaRegBookmark
// } from 'react-icons/fa';
// import PaymentModalApp from './PaymentModalApp';
// import BookmarkModal from './BookmarkModal';
// import './ApplicantPropertiesPage.css';

// const ApplicantPropertiesPage = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [detailLoading, setDetailLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchInput, setSearchInput] = useState('');
//   const [isSearching, setIsSearching] = useState(false);
//   const searchTimeout = useRef(null);
  
//   // State های مودال پرداخت
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [paymentProperty, setPaymentProperty] = useState(null);
  
//   // State های مودال بوکمارک
//   const [showBookmarkModal, setShowBookmarkModal] = useState(false);
//   const [bookmarkProperty, setBookmarkProperty] = useState(null);
//   const [bookmarkStates, setBookmarkStates] = useState({});
  
//   const [pagination, setPagination] = useState({
//     pageNumber: 1,
//     pageSize: 15,
//     totalCount: 0,
//     totalPages: 0,
//     hasNextPage: false,
//     hasPreviousPage: false
//   });

//   // دریافت لیست درخواست‌ها با سرچ
//   const fetchProperties = useCallback(async (pageNumber = 1, search = '') => {
//     try {
//       setLoading(true);
//       setIsSearching(!!search);
//       const token = localStorage.getItem('auth_token');
      
//       let url = `https://localhost:7178/api/RealEstatePage/RealEstatesesApplicationsDtosAsync?pageNumber=${pageNumber}&pageSize=${pagination.pageSize}`;
//       if (search && search.trim()) {
//         url += `&searchTrem=${encodeURIComponent(search.trim())}`;
//       }
      
//       const response = await fetch(url, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

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
        
//         // بررسی وضعیت بوکمارک برای هر آیتم
//         if (result.data.items && result.data.items.length > 0) {
//           result.data.items.forEach(item => {
//             checkBookmarkStatus(item.id);
//           });
//         }
//       } else {
//         throw new Error(result.message || 'خطا در دریافت اطلاعات');
//       }
//     } catch (error) {
//       console.error('❌ خطا:', error);
//       setError('مشکل در دریافت اطلاعات');
//     } finally {
//       setLoading(false);
//       setIsSearching(false);
//     }
//   }, [pagination.pageSize]);

//   // بررسی وضعیت بوکمارک
//   const checkBookmarkStatus = async (propertyId) => {
//     try {
//       const token = localStorage.getItem('auth_token');
//       const response = await fetch(
//         `https://localhost:7178/api/Bookmark/CheckBookmark?propertyId=${propertyId}`,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.ok) {
//         const result = await response.json();
//         setBookmarkStates(prev => ({
//           ...prev,
//           [propertyId]: result.data !== null
//         }));
//       }
//     } catch (error) {
//       console.error('Error checking bookmark:', error);
//     }
//   };

//   // بارگذاری اولیه
//   useEffect(() => {
//     fetchProperties(1, '');
//   }, []);

//   // جستجو با تاخیر (debounce)
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchInput(value);
    
//     if (searchTimeout.current) {
//       clearTimeout(searchTimeout.current);
//     }
    
//     searchTimeout.current = setTimeout(() => {
//       setSearchTerm(value);
//       if (value.trim()) {
//         fetchProperties(1, value);
//       } else {
//         fetchProperties(1, '');
//       }
//     }, 500);
//   };

//   // پاک کردن جستجو
//   const handleClearSearch = () => {
//     setSearchInput('');
//     setSearchTerm('');
//     fetchProperties(1, '');
//   };

//   // جستجو با Enter
//   const handleSearchKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       if (searchTimeout.current) {
//         clearTimeout(searchTimeout.current);
//       }
//       setSearchTerm(searchInput);
//       if (searchInput.trim()) {
//         fetchProperties(1, searchInput);
//       } else {
//         fetchProperties(1, '');
//       }
//     }
//   };

//   // دریافت جزئیات کامل
//   const fetchDetail = async (id) => {
//     try {
//       setDetailLoading(true);
//       const token = localStorage.getItem('auth_token');
      
//       const response = await fetch(
//         `https://localhost:7178/api/RealEstatePage/GetRealEstatesesApplicationsDetails`,
//         {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(id)
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}`);
//       }

//       const result = await response.json();
      
//       if (result.status === 200 && result.data) {
//         setSelectedProperty(result.data);
//         setShowDetailModal(true);
//         document.body.style.overflow = 'hidden';
//       } else {
//         throw new Error(result.message || 'خطا در دریافت جزئیات');
//       }
//     } catch (error) {
//       console.error('❌ خطا در دریافت جزئیات:', error);
//       alert('مشکل در دریافت جزئیات. لطفاً دوباره تلاش کنید.');
//     } finally {
//       setDetailLoading(false);
//     }
//   };

//   // باز کردن مودال پرداخت
//   const handleOpenPayment = (property) => {
//     setPaymentProperty(property);
//     setShowPaymentModal(true);
//     document.body.style.overflow = 'hidden';
//   };

//   // بستن مودال پرداخت
//   const handleClosePayment = () => {
//     setShowPaymentModal(false);
//     setPaymentProperty(null);
//     document.body.style.overflow = '';
//   };

//   // پس از پرداخت موفق
//   const handlePaymentSuccess = async () => {
//     await fetchProperties(pagination.pageNumber, searchTerm);
//     handleClosePayment();
//   };

//   // باز کردن مودال بوکمارک
//   const handleOpenBookmark = (property) => {
//     setBookmarkProperty(property);
//     setShowBookmarkModal(true);
//     document.body.style.overflow = 'hidden';
//   };

//   // بستن مودال بوکمارک
//   const handleCloseBookmark = () => {
//     setShowBookmarkModal(false);
//     setBookmarkProperty(null);
//     document.body.style.overflow = '';
//   };

//   // پس از ذخیره بوکمارک
//   const handleBookmarkSaved = (propertyId, note) => {
//     setBookmarkStates(prev => ({
//       ...prev,
//       [propertyId]: true
//     }));
//     fetchProperties(pagination.pageNumber, searchTerm);
//   };

//   // پس از حذف بوکمارک
//   const handleBookmarkDeleted = (propertyId) => {
//     setBookmarkStates(prev => ({
//       ...prev,
//       [propertyId]: false
//     }));
//     fetchProperties(pagination.pageNumber, searchTerm);
//   };

//   // نمایش جزئیات
//   const handleShowDetails = (property) => {
//     fetchDetail(property.id);
//   };

//   // بستن مودال جزئیات
//   const handleCloseModal = () => {
//     setShowDetailModal(false);
//     setSelectedProperty(null);
//     document.body.style.overflow = '';
//   };

//   // تغییر صفحه
//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       fetchProperties(newPage, searchTerm);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   // فرمت تاریخ
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

//   // فرمت بودجه
//   const formatBudget = (budget) => {
//     if (!budget || budget === 0) return 'نامشخص';
//     return budget.toLocaleString('fa-IR') + ' تومان';
//   };

//   // رندر لودینگ
//   if (loading && !isSearching) {
//     return (
//       <div className="applicant-page-container">
//         <div className="applicant-header">
//           <h1 className="applicant-title">متقاضیان ملک</h1>
//           <div className="total-count">{pagination.totalCount} درخواست</div>
//         </div>
//         <div className="applicant-loading">
//           <FaSpinner className="loading-spinner" />
//           <span>در حال بارگذاری...</span>
//         </div>
//       </div>
//     );
//   }

//   // رندر خطا
//   if (error) {
//     return (
//       <div className="applicant-page-container">
//         <div className="applicant-header">
//           <h1 className="applicant-title">متقاضیان ملک</h1>
//           <div className="total-count">{pagination.totalCount} درخواست</div>
//         </div>
//         <div className="applicant-error">
//           <FaTimes className="error-icon" />
//           <p>{error}</p>
//           <button onClick={() => fetchProperties(1, searchTerm)} className="retry-btn">
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
//             متقاضیان ملک
//           </h1>
//           <span className="total-count">{pagination.totalCount} درخواست</span>
//         </div>
//       </div>

//       {/* نوار جستجو */}
//       <div className="search-container">
//         <div className="search-wrapper">
//           <FaSearch className="search-icon" />
//           <input
//             type="text"
//             className="search-input"
//             placeholder="جستجو در درخواست‌ها..."
//             value={searchInput}
//             onChange={handleSearchChange}
//             onKeyDown={handleSearchKeyDown}
//           />
//           {searchInput && (
//             <button className="search-clear" onClick={handleClearSearch}>
//               <FaTimesCircle />
//             </button>
//           )}
//           {isSearching && (
//             <FaSpinner className="search-spinner" />
//           )}
//         </div>
//         {searchTerm && (
//           <div className="search-result-info">
//             <span>نتیجه جستجو برای: <strong>"{searchTerm}"</strong></span>
//             <span className="result-count">{properties.length} مورد</span>
//           </div>
//         )}
//       </div>

//       {/* لیست درخواست‌ها */}
//       {properties.length === 0 ? (
//         <div className="applicant-empty">
//           {searchTerm ? (
//             <>
//               <FaSearch className="empty-icon" />
//               <h3>نتیجه‌ای یافت نشد</h3>
//               <p>برای عبارت "{searchTerm}" هیچ نتیجه‌ای پیدا نشد</p>
//               <button onClick={handleClearSearch} className="clear-search-btn">
//                 پاک کردن جستجو
//               </button>
//             </>
//           ) : (
//             <>
//               <FaHome className="empty-icon" />
//               <h3>هیچ درخواستی یافت نشد</h3>
//               <p>شما هنوز درخواستی ثبت نکرده‌اید</p>
//             </>
//           )}
//         </div>
//       ) : (
//         <>
//           <div className="applicant-grid">
//             {properties.map((property) => (
//               <div key={property.code} className="applicant-card">
//                 <div className="card-top">
//                   <div className="card-header">
//                     <h4 className="property-title">{property.title}</h4>
//                     <div className="card-actions-header">
//                       <button 
//                         className={`bookmark-btn ${bookmarkStates[property.id] ? 'active' : ''}`}
//                         onClick={() => handleOpenBookmark(property)}
//                         title={bookmarkStates[property.id] ? 'ویرایش بوکمارک' : 'افزودن به بوکمارک'}
//                       >
//                         {bookmarkStates[property.id] ? (
//                           <FaBookmark className="bookmark-icon filled" />
//                         ) : (
//                           <FaRegBookmark className="bookmark-icon empty" />
//                         )}
//                       </button>
//                       <span className={`status-badge ${property.isPaid ? 'paid' : 'unpaid'}`}>
//                         {property.isPaid ? (
//                           <><FaCheckCircle /> پرداخت شده</>
//                         ) : (
//                           <><FaLock /> پرداخت نشده</>
//                         )}
//                       </span>
//                     </div>
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

//                   {/* مناطق با بک‌گراند مشخص */}
//                   {property.regions && property.regions.length > 0 && (
//                     <div className="regions-compact">
//                       <span className="regions-label">مناطق:</span>
//                       {property.regions.slice(0, 4).map((region, idx) => (
//                         <span key={idx} className="region-tag-small">{region}</span>
//                       ))}
//                       {property.regions.length > 4 && (
//                         <span className="region-tag-small more">+{property.regions.length - 4}</span>
//                       )}
//                     </div>
//                   )}

//                   {/* توضیحات */}
//                   {property.desc && (
//                     <div className="desc-compact">
//                       <FaAlignLeft className="desc-icon-small" />
//                       <span className="desc-text">{property.desc}</span>
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
//                       onClick={() => handleOpenPayment(property)}
//                     >
//                       پرداخت
//                     </button>
//                   )}
//                   <button 
//                     className="action-btn-small details-btn-small"
//                     onClick={() => handleShowDetails(property)}
//                     disabled={detailLoading}
//                   >
//                     {detailLoading ? (
//                       <FaSpinner className="spinner-small" />
//                     ) : (
//                       <>
//                         جزئیات
//                         <FaArrowRight className="btn-arrow-small" />
//                       </>
//                     )}
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
//         <div className="detail-modal-overlay-applicant" onClick={handleCloseModal}>
//           <div className="detail-modal-content-applicant" onClick={(e) => e.stopPropagation()}>
//             <button className="modal-close-btn-applicant" onClick={handleCloseModal}>
//               <FaTimes />
//             </button>

//             <div className="modal-header-applicant">
//               <div className="modal-title-section">
//                 <h2 className="modal-title-applicant">{selectedProperty.title}</h2>
//                 <span className={`modal-status-applicant ${selectedProperty.isPaid ? 'paid' : 'unpaid'}`}>
//                   {selectedProperty.isPaid ? '✓ پرداخت شده' : '🔒 پرداخت نشده'}
//                 </span>
//               </div>
//               <div className="modal-code">
//                 کد: {selectedProperty.code}
//               </div>
//             </div>

//             <div className="modal-body-applicant">
//               {/* ردیف اول: دسته‌بندی و منطقه */}
//               <div className="detail-grid-applicant">
//                 <div className="detail-item-applicant">
//                   <div className="detail-icon-applicant"><FaTag /></div>
//                   <div>
//                     <div className="detail-label-applicant">دسته‌بندی</div>
//                     <div className="detail-value-applicant">{selectedProperty.categoryName || 'نامشخص'}</div>
//                   </div>
//                 </div>
//                 <div className="detail-item-applicant">
//                   <div className="detail-icon-applicant"><FaMapMarkerAlt /></div>
//                   <div>
//                     <div className="detail-label-applicant">منطقه اصلی</div>
//                     <div className="detail-value-applicant">{selectedProperty.regionName || 'نامشخص'}</div>
//                   </div>
//                 </div>
//               </div>

//               {/* مناطق مورد نظر */}
//               {selectedProperty.regions && selectedProperty.regions.length > 0 && (
//                 <div className="detail-section-applicant regions-section">
//                   <div className="detail-section-label-applicant">
//                     <FaMapMarkerAlt className="section-icon" />
//                     مناطق مورد نظر
//                   </div>
//                   <div className="regions-list-applicant">
//                     {selectedProperty.regions.map((region, idx) => (
//                       <span key={idx} className="region-badge-applicant">{region}</span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* مشخصات ملک */}
//               <div className="detail-grid-applicant specs-grid">
//                 {selectedProperty.minCountRoom > 0 && (
//                   <div className="spec-item-applicant">
//                     <FaBed className="spec-icon-applicant" />
//                     <div>
//                       <div className="spec-label-applicant">حداقل اتاق</div>
//                       <div className="spec-value-applicant">{selectedProperty.minCountRoom} خواب</div>
//                     </div>
//                   </div>
//                 )}
//                 {selectedProperty.minSquareMeter > 0 && (
//                   <div className="spec-item-applicant">
//                     <FaRulerCombined className="spec-icon-applicant" />
//                     <div>
//                       <div className="spec-label-applicant">متراژ</div>
//                       <div className="spec-value-applicant">
//                         {selectedProperty.minSquareMeter}
//                         {selectedProperty.maxSquareMeter ? ` - ${selectedProperty.maxSquareMeter}` : ' به بالا'}
//                         {' متر'}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 {(selectedProperty.minConstructionYear > 0 || selectedProperty.maxConstructionYear > 0) && (
//                   <div className="spec-item-applicant">
//                     <FaBuilding className="spec-icon-applicant" />
//                     <div>
//                       <div className="spec-label-applicant">سال ساخت</div>
//                       <div className="spec-value-applicant">
//                         {selectedProperty.minConstructionYear || '?'}
//                         {selectedProperty.maxConstructionYear ? ` - ${selectedProperty.maxConstructionYear}` : ' به بعد'}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 {selectedProperty.budget > 0 && (
//                   <div className="spec-item-applicant">
//                     <FaMoneyBill className="spec-icon-applicant" />
//                     <div>
//                       <div className="spec-label-applicant">بودجه</div>
//                       <div className="spec-value-applicant budget">{formatBudget(selectedProperty.budget)}</div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* توضیحات */}
//               {selectedProperty.desc && (
//                 <div className="detail-section-applicant desc-section">
//                   <div className="detail-section-label-applicant">
//                     <FaAlignLeft className="section-icon" />
//                     توضیحات تکمیلی
//                   </div>
//                   <div className="desc-content-applicant">{selectedProperty.desc}</div>
//                 </div>
//               )}

//               {/* نام متقاضی */}
//               {selectedProperty.fullNameCustomer && (
//                 <div className="detail-section-applicant customer-section">
//                   <div className="detail-section-label-applicant">
//                     <FaUser className="section-icon" />
//                     اطلاعات متقاضی
//                   </div>
//                   <div className="customer-name-applicant">{selectedProperty.fullNameCustomer}</div>
//                 </div>
//               )}

//               {/* تاریخ ثبت */}
//               <div className="detail-footer-applicant">
//                 <div className="footer-item">
//                   <FaCalendarAlt className="footer-icon" />
//                   <span>تاریخ ثبت: {formatDate(selectedProperty.createdAt)}</span>
//                 </div>
//                 <div className="footer-item">
//                   <span className="relative-time">{selectedProperty.createdAtPersianRelative || 'نامشخص'}</span>
//                 </div>
//               </div>

//               {/* شماره تماس */}
//               <div className={`phone-section-applicant ${selectedProperty.isPaid ? 'paid' : 'unpaid'}`}>
//                 <div className="phone-label-applicant">
//                   <FaPhone className="phone-icon-section" />
//                   شماره تماس
//                 </div>
//                 {selectedProperty.isPaid && selectedProperty.mobileNumber ? (
//                   <div className="phone-number-applicant">{selectedProperty.mobileNumber}</div>
//                 ) : (
//                   <div className="phone-locked-applicant">
//                     <FaLock className="lock-icon-section" />
//                     برای مشاهده شماره تماس باید پرداخت کنید
//                   </div>
//                 )}
//               </div>
//             </div>

//             {!selectedProperty.isPaid && (
//               <div className="modal-footer-applicant">
//                 <button 
//                   className="payment-btn-modal-applicant"
//                   onClick={() => {
//                     handleCloseModal();
//                     handleOpenPayment(selectedProperty);
//                   }}
//                 >
//                   <FaLock className="btn-lock-icon" />
//                   پرداخت برای مشاهده شماره تماس
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* مودال پرداخت */}
//       <PaymentModalApp
//         isOpen={showPaymentModal}
//         onClose={handleClosePayment}
//         property={paymentProperty}
//         onSuccess={handlePaymentSuccess}
//       />

//       {/* مودال بوکمارک */}
//       <BookmarkModal
//         isOpen={showBookmarkModal}
//         onClose={handleCloseBookmark}
//         property={bookmarkProperty}
//         onBookmarkSaved={handleBookmarkSaved}
//         onBookmarkDeleted={handleBookmarkDeleted}
//       />
//     </div>
//   );
// };

// export default ApplicantPropertiesPage;

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  FaHome, FaMapMarkerAlt, FaCalendarAlt, FaTag, FaArrowRight, 
  FaCheckCircle, FaTimes, FaPhone, FaLock, FaSpinner, 
  FaAlignLeft, FaMoneyBill, FaBed, FaRulerCombined, 
  FaBuilding, FaUser, FaSearch, FaTimesCircle, FaBookmark, FaRegBookmark
} from 'react-icons/fa';
import PaymentModalApp from './PaymentModalApp';
import BookmarkModal from './BookmarkModal';
import './ApplicantPropertiesPage.css';

const ApplicantPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeout = useRef(null);
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProperty, setPaymentProperty] = useState(null);
  
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const [bookmarkProperty, setBookmarkProperty] = useState(null);
  const [bookmarkStates, setBookmarkStates] = useState({});
  
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 40,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false
  });

  const fetchProperties = useCallback(async (pageNumber = 1, search = '') => {
    try {
      setLoading(true);
      setIsSearching(!!search);
      const token = localStorage.getItem('auth_token');
      
      let url = `https://localhost:7178/api/RealEstatePage/RealEstatesesApplicationsDtosAsync?pageNumber=${pageNumber}&pageSize=${pagination.pageSize}`;
      if (search && search.trim()) {
        url += `&searchTrem=${encodeURIComponent(search.trim())}`;
      }
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

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
        
        if (result.data.items && result.data.items.length > 0) {
          result.data.items.forEach(item => {
            checkBookmarkStatus(item.id);
          });
        }
      } else {
        throw new Error(result.message || 'خطا در دریافت اطلاعات');
      }
    } catch (error) {
      console.error('❌ خطا:', error);
      setError('مشکل در دریافت اطلاعات');
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  }, [pagination.pageSize]);

  const checkBookmarkStatus = async (propertyId) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(
        `https://localhost:7178/api/Bookmark/CheckBookmark?propertyId=${propertyId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const result = await response.json();
        setBookmarkStates(prev => ({
          ...prev,
          [propertyId]: result.data !== null
        }));
      }
    } catch (error) {
      console.error('Error checking bookmark:', error);
    }
  };

  useEffect(() => {
    fetchProperties(1, '');
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    
    searchTimeout.current = setTimeout(() => {
      setSearchTerm(value);
      if (value.trim()) {
        fetchProperties(1, value);
      } else {
        fetchProperties(1, '');
      }
    }, 500);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
    fetchProperties(1, '');
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      setSearchTerm(searchInput);
      if (searchInput.trim()) {
        fetchProperties(1, searchInput);
      } else {
        fetchProperties(1, '');
      }
    }
  };

  const fetchDetail = async (id) => {
    try {
      setDetailLoading(true);
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch(
        `https://localhost:7178/api/RealEstatePage/GetRealEstatesesApplicationsDetails`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(id)
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === 200 && result.data) {
        setSelectedProperty(result.data);
        setShowDetailModal(true);
        document.body.style.overflow = 'hidden';
      } else {
        throw new Error(result.message || 'خطا در دریافت جزئیات');
      }
    } catch (error) {
      console.error('❌ خطا در دریافت جزئیات:', error);
      alert('مشکل در دریافت جزئیات. لطفاً دوباره تلاش کنید.');
    } finally {
      setDetailLoading(false);
    }
  };

  const handleOpenPayment = (property) => {
    setPaymentProperty(property);
    setShowPaymentModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleClosePayment = () => {
    setShowPaymentModal(false);
    setPaymentProperty(null);
    document.body.style.overflow = '';
  };

  const handlePaymentSuccess = async () => {
    await fetchProperties(pagination.pageNumber, searchTerm);
    handleClosePayment();
  };

  const handleOpenBookmark = (property) => {
    setBookmarkProperty(property);
    setShowBookmarkModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseBookmark = () => {
    setShowBookmarkModal(false);
    setBookmarkProperty(null);
    document.body.style.overflow = '';
  };

  const handleBookmarkSaved = (propertyId, note) => {
    setBookmarkStates(prev => ({
      ...prev,
      [propertyId]: true
    }));
    fetchProperties(pagination.pageNumber, searchTerm);
  };

  const handleBookmarkDeleted = (propertyId) => {
    setBookmarkStates(prev => ({
      ...prev,
      [propertyId]: false
    }));
    fetchProperties(pagination.pageNumber, searchTerm);
  };

  const handleShowDetails = (property) => {
    fetchDetail(property.id);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedProperty(null);
    document.body.style.overflow = '';
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchProperties(newPage, searchTerm);
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

  if (loading && !isSearching) {
    return (
      <div className="applicant-page-container">
        <div className="applicant-header">
          <h1 className="applicant-title">متقاضیان ملک</h1>
          <div className="total-count">{pagination.totalCount} درخواست</div>
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
          <h1 className="applicant-title">متقاضیان ملک</h1>
          <div className="total-count">{pagination.totalCount} درخواست</div>
        </div>
        <div className="applicant-error">
          <FaTimes className="error-icon" />
          <p>{error}</p>
          <button onClick={() => fetchProperties(1, searchTerm)} className="retry-btn">
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="applicant-page-container">
      <div className="applicant-header">
        <div className="header-content">
          <h1 className="applicant-title">
            <FaHome className="title-icon" />
            متقاضیان ملک
          </h1>
          <span className="total-count">{pagination.totalCount} درخواست</span>
        </div>
      </div>

      <div className="search-container">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="جستجو در درخواست‌ها..."
            value={searchInput}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
          {searchInput && (
            <button className="search-clear" onClick={handleClearSearch}>
              <FaTimesCircle />
            </button>
          )}
          {isSearching && (
            <FaSpinner className="search-spinner" />
          )}
        </div>
        {searchTerm && (
          <div className="search-result-info">
            <span>نتیجه جستجو برای: <strong>"{searchTerm}"</strong></span>
            <span className="result-count">{properties.length} مورد</span>
          </div>
        )}
      </div>

      {properties.length === 0 ? (
        <div className="applicant-empty">
          {searchTerm ? (
            <>
              <FaSearch className="empty-icon" />
              <h3>نتیجه‌ای یافت نشد</h3>
              <p>برای عبارت "{searchTerm}" هیچ نتیجه‌ای پیدا نشد</p>
              <button onClick={handleClearSearch} className="clear-search-btn">
                پاک کردن جستجو
              </button>
            </>
          ) : (
            <>
              <FaHome className="empty-icon" />
              <h3>هیچ درخواستی یافت نشد</h3>
              <p>شما هنوز درخواستی ثبت نکرده‌اید</p>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="applicant-grid">
            {properties.map((property) => (
              <div key={property.code} className="applicant-card">
                <div className="card-top">
                  <div className="card-header">
                    <h4 className="property-title">{property.title}</h4>
                 
                    <div className="card-actions-header">
                 <button 
                        className={`bookmark-btn ${bookmarkStates[property.id] ? 'active' : ''}`}
                        onClick={() => handleOpenBookmark(property)}
                        title={bookmarkStates[property.id] ? 'ویرایش بوکمارک' : 'افزودن به بوکمارک'}
                      >
                        {bookmarkStates[property.id] ? (
                          <FaBookmark className="bookmark-icon filled" />
                        ) : (
                          <FaRegBookmark className="bookmark-icon empty" />
                        )}
                      </button>
                      <span className={`status-badge ${property.isPaid ? 'paid' : 'unpaid'}`}>
                        {property.isPaid ? (
                          <><FaCheckCircle /> پرداخت شده</>
                        ) : (
                          <><FaLock /> پرداخت نشده</>
                        )}
                      </span>
                      
                    </div>
                    
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

                  {property.desc && (
                    <div className="desc-compact">
                      <FaAlignLeft className="desc-icon-small" />
                      <span className="desc-text">{property.desc}</span>
                    </div>
                  )}

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
                      onClick={() => handleOpenPayment(property)}
                    >
                      پرداخت
                    </button>
                  )}
                  <button 
                    className="action-btn-small details-btn-small"
                    onClick={() => handleShowDetails(property)}
                    disabled={detailLoading}
                  >
                    {detailLoading ? (
                      <FaSpinner className="spinner-small" />
                    ) : (
                      <>
                        جزئیات
                        <FaArrowRight className="btn-arrow-small" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

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

      {showDetailModal && selectedProperty && (
        <div className="detail-modal-overlay-applicant" onClick={handleCloseModal}>
          <div className="detail-modal-content-applicant" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn-applicant" onClick={handleCloseModal}>
              <FaTimes />
            </button>

            <div className="modal-header-applicant">
              <div className="modal-title-section">
                <h2 className="modal-title-applicant">{selectedProperty.title}</h2>
                <span className={`modal-status-applicant ${selectedProperty.isPaid ? 'paid' : 'unpaid'}`}>
                  {selectedProperty.isPaid ? '✓ پرداخت شده' : '🔒 پرداخت نشده'}
                </span>
              </div>
              <div className="modal-code">
                کد: {selectedProperty.code}
              </div>
            </div>

            <div className="modal-body-applicant">
              <div className="detail-grid-applicant">
                <div className="detail-item-applicant">
                  <div className="detail-icon-applicant"><FaTag /></div>
                  <div>
                    <div className="detail-label-applicant">دسته‌بندی</div>
                    <div className="detail-value-applicant">{selectedProperty.categoryName || 'نامشخص'}</div>
                  </div>
                </div>
                <div className="detail-item-applicant">
                  <div className="detail-icon-applicant"><FaMapMarkerAlt /></div>
                  <div>
                    <div className="detail-label-applicant">منطقه اصلی</div>
                    <div className="detail-value-applicant">{selectedProperty.regionName || 'نامشخص'}</div>
                  </div>
                </div>
              </div>

              {selectedProperty.regions && selectedProperty.regions.length > 0 && (
                <div className="detail-section-applicant regions-section">
                  <div className="detail-section-label-applicant">
                    <FaMapMarkerAlt className="section-icon" />
                    مناطق مورد نظر
                  </div>
                  <div className="regions-list-applicant">
                    {selectedProperty.regions.map((region, idx) => (
                      <span key={idx} className="region-badge-applicant">{region}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="detail-grid-applicant specs-grid">
                {selectedProperty.minCountRoom > 0 && (
                  <div className="spec-item-applicant">
                    <FaBed className="spec-icon-applicant" />
                    <div>
                      <div className="spec-label-applicant">حداقل اتاق</div>
                      <div className="spec-value-applicant">{selectedProperty.minCountRoom} خواب</div>
                    </div>
                  </div>
                )}
                {selectedProperty.minSquareMeter > 0 && (
                  <div className="spec-item-applicant">
                    <FaRulerCombined className="spec-icon-applicant" />
                    <div>
                      <div className="spec-label-applicant">متراژ</div>
                      <div className="spec-value-applicant">
                        {selectedProperty.minSquareMeter}
                        {selectedProperty.maxSquareMeter ? ` - ${selectedProperty.maxSquareMeter}` : ' به بالا'}
                        {' متر'}
                      </div>
                    </div>
                  </div>
                )}
                {(selectedProperty.minConstructionYear > 0 || selectedProperty.maxConstructionYear > 0) && (
                  <div className="spec-item-applicant">
                    <FaBuilding className="spec-icon-applicant" />
                    <div>
                      <div className="spec-label-applicant">سال ساخت</div>
                      <div className="spec-value-applicant">
                        {selectedProperty.minConstructionYear || '?'}
                        {selectedProperty.maxConstructionYear ? ` - ${selectedProperty.maxConstructionYear}` : ' به بعد'}
                      </div>
                    </div>
                  </div>
                )}
                {selectedProperty.budget > 0 && (
                  <div className="spec-item-applicant">
                    <FaMoneyBill className="spec-icon-applicant" />
                    <div>
                      <div className="spec-label-applicant">بودجه</div>
                      <div className="spec-value-applicant budget">{formatBudget(selectedProperty.budget)}</div>
                    </div>
                  </div>
                )}
              </div>

              {selectedProperty.desc && (
                <div className="detail-section-applicant desc-section">
                  <div className="detail-section-label-applicant">
                    <FaAlignLeft className="section-icon" />
                    توضیحات تکمیلی
                  </div>
                  <div className="desc-content-applicant">{selectedProperty.desc}</div>
                </div>
              )}

              {selectedProperty.fullNameCustomer && (
                <div className="detail-section-applicant customer-section">
                  <div className="detail-section-label-applicant">
                    <FaUser className="section-icon" />
                    اطلاعات متقاضی
                  </div>
                  <div className="customer-name-applicant">{selectedProperty.fullNameCustomer}</div>
                </div>
              )}

              <div className="detail-footer-applicant">
                <div className="footer-item">
                  <FaCalendarAlt className="footer-icon" />
                  <span>تاریخ ثبت: {formatDate(selectedProperty.createdAt)}</span>
                </div>
                <div className="footer-item">
                  <span className="relative-time">{selectedProperty.createdAtPersianRelative || 'نامشخص'}</span>
                </div>
              </div>

              <div className={`phone-section-applicant ${selectedProperty.isPaid ? 'paid' : 'unpaid'}`}>
                <div className="phone-label-applicant">
                  <FaPhone className="phone-icon-section" />
                  شماره تماس
                </div>
                {selectedProperty.isPaid && selectedProperty.mobileNumber ? (
                  <div className="phone-number-applicant">{selectedProperty.mobileNumber}</div>
                ) : (
                  <div className="phone-locked-applicant">
                    <FaLock className="lock-icon-section" />
                    برای مشاهده شماره تماس باید پرداخت کنید
                  </div>
                )}
              </div>
            </div>

            {!selectedProperty.isPaid && (
              <div className="modal-footer-applicant">
                <button 
                  className="payment-btn-modal-applicant"
                  onClick={() => {
                    handleCloseModal();
                    handleOpenPayment(selectedProperty);
                  }}
                >
                  <FaLock className="btn-lock-icon" />
                  پرداخت برای مشاهده شماره تماس
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <PaymentModalApp
        isOpen={showPaymentModal}
        onClose={handleClosePayment}
        property={paymentProperty}
        onSuccess={handlePaymentSuccess}
      />

      <BookmarkModal
        isOpen={showBookmarkModal}
        onClose={handleCloseBookmark}
        property={bookmarkProperty}
        onBookmarkSaved={handleBookmarkSaved}
        onBookmarkDeleted={handleBookmarkDeleted}
      />
    </div>
  );
};

export default ApplicantPropertiesPage;