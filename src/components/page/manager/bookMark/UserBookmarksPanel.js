// // // UserBookmarksPanel.js
// // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import './UserBookmarksPanel.css';
// // import ImageWithSafeError from '../../../common/ImageWithSafeError/ImageWithSafeError';

// // const UserBookmarksPanel = () => {
// //   const navigate = useNavigate();
// //   const [bookmarks, setBookmarks] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [viewMode, setViewMode] = useState('grid');
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [statusFilter, setStatusFilter] = useState('all');
// //   const [toast, setToast] = useState(null);
// //   const [pagination, setPagination] = useState({
// //     pageNumber: 1,
// //     pageSize: 10,
// //     totalCount: 0,
// //     totalPages: 0,
// //     hasPreviousPage: false,
// //     hasNextPage: false
// //   });
// //   const [showRemoveConfirm, setShowRemoveConfirm] = useState(null);

// //   const showToast = (message, type = 'success') => {
// //     setToast({ message, type });
// //     setTimeout(() => setToast(null), 3000);
// //   };

// //   const getToken = () => {
// //     const token = localStorage.getItem('auth_token');
// //     if (!token) {
// //       console.warn('توکن یافت نشد');
// //       return null;
// //     }
// //     return token;
// //   };

// //   const fetchBookmarks = useCallback(async (pageNumber = 1) => {
// //     setLoading(true);
// //     setError(null);
    
// //     const token = getToken();
// //     if (!token) {
// //       setError('لطفاً ابتدا وارد شوید');
// //       setTimeout(() => navigate('/login'), 2000);
// //       setLoading(false);
// //       return;
// //     }
    
// //     try {
// //       const response = await fetch(
// //         `https://localhost:7178/api/RealEstatePage/GetRealEstateBookMark?pageNumber=${pageNumber}&pageSize=${pagination.pageSize}`,
// //         {
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           }
// //         }
// //       );

// //       if (!response.ok) {
// //         if (response.status === 401) {
// //           throw new Error('نشست شما منقضی شده است');
// //         }
// //         throw new Error(`HTTP ${response.status}`);
// //       }

// //       const result = await response.json();
      
// //       if (result.status === 200 && result.data) {
// //         const mappedBookmarks = result.data.items.map(item => ({
// //           id: item.id,
// //           title: item.title,
// //           address: item.address || `${item.region} - آدرس مشخص نشده`,
// //           price: item.price,
// //           area: item.area,
// //           rooms: item.countRooms,
// //           hasParking: item.isHasParking,
// //           hasElevator: item.isHasElavator,
// //           hasPool: false,
// //           hasLoan: item.isHasLoan,
// //           images: (item.images || []).map(img => `https://localhost:7178${img}`),
// //           status: mapStatusToEnglish(item.status),
// //           views: parseInt(item.views) || 0,
// //           createdAt: item.createdAt,
// //           createdAtPersianRelative: item.createdAtPersianRelative,
// //           region: item.region,
// //           countFloor: item.countFloor,
// //           floor: item.floor,
// //           originalStatus: item.status,
// //         }));

// //         setBookmarks(mappedBookmarks);
// //         setPagination({
// //           pageNumber: result.data.pageNumber,
// //           pageSize: result.data.pageSize,
// //           totalCount: result.data.totalCount,
// //           totalPages: result.data.totalPages,
// //           hasPreviousPage: result.data.hasPreviousPage,
// //           hasNextPage: result.data.hasNextPage,
// //         });
// //       } else {
// //         setBookmarks([]);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching bookmarks:', error);
// //       if (error.message?.includes('منقضی')) {
// //         setError(error.message);
// //         setTimeout(() => navigate('/login'), 2000);
// //       } else {
// //         setError(error.message || 'خطا در دریافت نشان‌شده‌ها');
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [navigate, pagination.pageSize]);

// //   const mapStatusToEnglish = (persianStatus) => {
// //     switch(persianStatus) {
// //       case 'منتشر شد':
// //       case 'فعال':
// //         return 'active';
// //       case 'انتظار':
// //       case 'در انتظار':
// //         return 'pending';
// //       case 'در انتظارپرداخت':
// //         return 'payment_pending';
// //       case 'فروخته شده':
// //         return 'sold';
// //       case 'بایگانی شده':
// //         return 'archived';
// //       default:
// //         return 'pending';
// //     }
// //   };

// //   const getStatusLabel = (status) => {
// //     switch(status) {
// //       case 'active': return { text: 'منتشر شده', class: 'status-active', icon: '✅' };
// //       case 'pending': return { text: 'در انتظار', class: 'status-pending', icon: '⏳' };
// //       case 'payment_pending': return { text: 'در انتظار پرداخت', class: 'status-payment-pending', icon: '💰' };
// //       case 'sold': return { text: 'فروخته شده', class: 'status-sold', icon: '💰' };
// //       case 'archived': return { text: 'بایگانی شده', class: 'status-archived', icon: '📦' };
// //       default: return { text: 'نامشخص', class: 'status-inactive', icon: '❓' };
// //     }
// //   };

// //   const handleRemoveBookmark = async (propertyId) => {
// //     const token = getToken();
// //     if (!token) {
// //       showToast('لطفاً ابتدا وارد شوید', 'error');
// //       setTimeout(() => navigate('/login'), 2000);
// //       return;
// //     }

// //     try {
// //       // فرض می‌کنیم API مشابه حذف نشان‌شده وجود دارد
// //       // اگر API خاصی برای حذف نشان‌شده ندارید، این بخش را تطبیق دهید
// //       const response = await fetch(
// //         `https://localhost:7178/api/RealEstatePage/RemoveBookmark/${propertyId}`,
// //         {
// //           method: 'DELETE',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           }
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error(`HTTP ${response.status}`);
// //       }

// //       setBookmarks(prev => prev.filter(p => p.id !== propertyId));
// //       showToast('نشان‌شده با موفقیت حذف شد', 'success');
      
// //       // به‌روزرسانی تعداد کل
// //       setPagination(prev => ({
// //         ...prev,
// //         totalCount: prev.totalCount - 1
// //       }));

// //     } catch (error) {
// //       console.error('Remove bookmark error:', error);
// //       showToast(error.message || 'خطا در حذف نشان‌شده', 'error');
// //     }
// //     setShowRemoveConfirm(null);
// //   };

// //   useEffect(() => {
// //     fetchBookmarks();
// //   }, [fetchBookmarks]);

// //   const handlePageChange = (newPage) => {
// //     if (newPage >= 1 && newPage <= pagination.totalPages) {
// //       fetchBookmarks(newPage);
// //       window.scrollTo({ top: 0, behavior: 'smooth' });
// //     }
// //   };

// //   const formatPrice = (price) => {
// //     if (price >= 1000000000000) {
// //       return (price / 1000000000000).toFixed(1) + ' هزار میلیارد تومان';
// //     }
// //     if (price >= 1000000000) {
// //       return (price / 1000000000).toFixed(1) + ' میلیارد تومان';
// //     }
// //     if (price >= 1000000) {
// //       return (price / 1000000).toFixed(1) + ' میلیون تومان';
// //     }
// //     return price.toLocaleString() + ' تومان';
// //   };

// //   const filteredBookmarks = bookmarks.filter(property => {
// //     const matchesSearch = property.title?.includes(searchTerm) || 
// //                          property.address?.includes(searchTerm) ||
// //                          property.region?.includes(searchTerm);
// //     const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
// //     return matchesSearch && matchesStatus;
// //   });

// //   const statistics = {
// //     total: bookmarks.length,
// //     active: bookmarks.filter(p => p.status === 'active').length,
// //     pending: bookmarks.filter(p => p.status === 'pending').length,
// //     payment_pending: bookmarks.filter(p => p.status === 'payment_pending').length,
// //     totalViews: bookmarks.reduce((sum, p) => sum + (p.views || 0), 0),
// //   };

// //   if (loading) {
// //     return (
// //       <div className="bookmarks-panel">
// //         <div className="bookmarks-loading">
// //           <div className="bookmarks-spinner"></div>
// //           <p>در حال بارگذاری نشان‌شده‌ها...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bookmarks-panel">
// //       {toast && (
// //         <div className={`bookmarks-toast ${toast.type}`}>
// //           <span className="toast-icon">{toast.type === 'success' ? '✅' : '❌'}</span>
// //           {toast.message}
// //         </div>
// //       )}

// //       {showRemoveConfirm && (
// //         <div className="bookmarks-modal-overlay" onClick={() => setShowRemoveConfirm(null)}>
// //           <div className="bookmarks-modal" onClick={(e) => e.stopPropagation()}>
// //             <div className="bookmarks-modal-icon">⭐</div>
// //             <h4>حذف نشان‌شده</h4>
// //             <p>آیا از حذف "{showRemoveConfirm.title}" از نشان‌شده‌ها مطمئن هستید؟</p>
// //             <div className="bookmarks-modal-actions">
// //               <button className="bookmarks-confirm-btn" onClick={() => handleRemoveBookmark(showRemoveConfirm.id)}>
// //                 حذف
// //               </button>
// //               <button className="bookmarks-cancel-btn" onClick={() => setShowRemoveConfirm(null)}>
// //                 انصراف
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <div className="bookmarks-header">
// //         <div className="bookmarks-header-content">
// //           <div className="bookmarks-title-section">
// //             <span className="bookmarks-icon">⭐</span>
// //             <div>
// //               <h2>نشان‌شده‌های من</h2>
// //               <p className="bookmarks-subtitle">املاکی که ذخیره کرده‌اید</p>
// //             </div>
// //           </div>
// //           <div className="bookmarks-total">
// //             <span>{pagination.totalCount} ملک</span>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="bookmarks-stats">
// //         <div className="bookmarks-stat">
// //           <span className="bookmarks-stat-icon">⭐</span>
// //           <div>
// //             <div className="bookmarks-stat-number">{statistics.total}</div>
// //             <div className="bookmarks-stat-label">کل نشان‌شده‌ها</div>
// //           </div>
// //         </div>
// //         <div className="bookmarks-stat">
// //           <span className="bookmarks-stat-icon">✅</span>
// //           <div>
// //             <div className="bookmarks-stat-number">{statistics.active}</div>
// //             <div className="bookmarks-stat-label">فعال</div>
// //           </div>
// //         </div>
// //         <div className="bookmarks-stat">
// //           <span className="bookmarks-stat-icon">⏳</span>
// //           <div>
// //             <div className="bookmarks-stat-number">{statistics.pending}</div>
// //             <div className="bookmarks-stat-label">در انتظار</div>
// //           </div>
// //         </div>
// //         <div className="bookmarks-stat">
// //           <span className="bookmarks-stat-icon">💰</span>
// //           <div>
// //             <div className="bookmarks-stat-number">{statistics.payment_pending}</div>
// //             <div className="bookmarks-stat-label">در انتظار پرداخت</div>
// //           </div>
// //         </div>
// //         <div className="bookmarks-stat">
// //           <span className="bookmarks-stat-icon">👁</span>
// //           <div>
// //             <div className="bookmarks-stat-number">{statistics.totalViews}</div>
// //             <div className="bookmarks-stat-label">بازدید کل</div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="bookmarks-toolbar">
// //         <div className="bookmarks-search">
// //           <input
// //             type="text"
// //             placeholder="جستجو در نشان‌شده‌ها..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //           <span className="search-icon">🔍</span>
// //         </div>
        
// //         <div className="bookmarks-controls">
// //           <select 
// //             value={statusFilter}
// //             onChange={(e) => setStatusFilter(e.target.value)}
// //             className="bookmarks-filter-select"
// //           >
// //             <option value="all">همه</option>
// //             <option value="active">فعال</option>
// //             <option value="pending">در انتظار تایید</option>
// //             <option value="payment_pending">در انتظار پرداخت</option>
// //             <option value="sold">فروخته شده</option>
// //             <option value="archived">بایگانی شده</option>
// //           </select>
          
// //           <div className="bookmarks-view-toggle">
// //             <button 
// //               className={viewMode === 'grid' ? 'active' : ''}
// //               onClick={() => setViewMode('grid')}
// //               title="نمایش شبکه‌ای"
// //             >
// //               <span>▦</span>
// //             </button>
// //             <button 
// //               className={viewMode === 'list' ? 'active' : ''}
// //               onClick={() => setViewMode('list')}
// //               title="نمایش لیستی"
// //             >
// //               <span>☰</span>
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {error ? (
// //         <div className="bookmarks-error">
// //           <span className="error-icon">⚠️</span>
// //           <p>{error}</p>
// //           <button onClick={() => fetchBookmarks(pagination.pageNumber)}>تلاش مجدد</button>
// //         </div>
// //       ) : filteredBookmarks.length === 0 ? (
// //         <div className="bookmarks-empty">
// //           <div className="empty-icon">⭐</div>
// //           <h4>نشان‌شده‌ای یافت نشد</h4>
// //           <p>هنوز هیچ ملکی را نشان‌نکرده‌اید</p>
// //           <button onClick={() => navigate('/RealEstate')} className="bookmarks-explore-btn">
// //             🏠 جستجوی املاک
// //           </button>
// //         </div>
// //       ) : (
// //         <>
// //           <div className={`bookmarks-properties ${viewMode}`}>
// //             {viewMode === 'grid' 
// //               ? filteredBookmarks.map(property => {
// //                   const statusInfo = getStatusLabel(property.status);
// //                   return (
// //                     <div key={property.id} className="bookmarks-card">
// //                       <div 
// //                         className="bookmarks-card-image"
// //                         onClick={() => navigate('/RealEstateDetailPageItemForDemo', { state: { propertyId: property.id } })}
// //                       >
// //                         <ImageWithSafeError
// //                           src={property.images?.[0] || '/images/placeholder-property.jpg'}
// //                           alt={property.title}
// //                           className="bookmarks-card-img"
// //                         />
// //                         <div className={`bookmarks-card-status ${statusInfo.class}`}>
// //                           {statusInfo.icon} {statusInfo.text}
// //                         </div>
// //                         <button 
// //                           className="bookmarks-remove-btn"
// //                           onClick={(e) => {
// //                             e.stopPropagation();
// //                             setShowRemoveConfirm(property);
// //                           }}
// //                           title="حذف از نشان‌شده‌ها"
// //                         >
// //                           ⭐
// //                         </button>
// //                       </div>
                      
// //                       <div className="bookmarks-card-content">
// //                         <h4 
// //                           className="bookmarks-card-title"
// //                           onClick={() => navigate('/RealEstateDetailPageItemForDemo', { state: { propertyId: property.id } })}
// //                         >
// //                           {property.title}
// //                         </h4>
// //                         <div className="bookmarks-card-address">{property.address}</div>
// //                         <div className="bookmarks-card-price">{formatPrice(property.price)}</div>
                        
// //                         <div className="bookmarks-card-features">
// //                           <span>📐 {property.area} m²</span>
// //                           <span>🛏 {property.rooms} خواب</span>
// //                           {property.hasParking && <span>🚗 پارکینگ</span>}
// //                           {property.hasElevator && <span>🛗 آسانسور</span>}
// //                           {property.hasLoan && <span>🏦 تسهیلات</span>}
// //                         </div>
                        
// //                         <div className="bookmarks-card-footer">
// //                           <div className="bookmarks-card-stats">
// //                             <span>👁 {property.views}</span>
// //                             <span>📅 {property.createdAtPersianRelative || new Date(property.createdAt).toLocaleDateString('fa-IR')}</span>
// //                           </div>
// //                           <button 
// //                             className="bookmarks-detail-btn"
// //                             onClick={() => navigate('/RealEstateDetailPageItemForDemo', { state: { propertyId: property.id } })}
// //                           >
// //                             مشاهده
// //                           </button>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   );
// //                 })
// //               : filteredBookmarks.map(property => {
// //                   const statusInfo = getStatusLabel(property.status);
// //                   return (
// //                     <div 
// //                       key={property.id} 
// //                       className="bookmarks-list-item"
// //                       onClick={() => navigate('/RealEstateDetailPageItemForDemo', { state: { propertyId: property.id } })}
// //                     >
// //                       <div className="bookmarks-list-image">
// //                         <ImageWithSafeError
// //                           src={property.images?.[0] || '/images/placeholder-property.jpg'}
// //                           alt={property.title}
// //                           className="bookmarks-list-img"
// //                         />
// //                       </div>
// //                       <div className="bookmarks-list-content">
// //                         <div className="bookmarks-list-header">
// //                           <div className="bookmarks-list-title-group">
// //                             <h4>{property.title}</h4>
// //                             <div className="bookmarks-list-address">{property.address}</div>
// //                           </div>
// //                           <div className="bookmarks-list-status-group">
// //                             <div className={`bookmarks-list-status ${statusInfo.class}`}>
// //                               {statusInfo.icon} {statusInfo.text}
// //                             </div>
// //                             <button 
// //                               className="bookmarks-list-remove"
// //                               onClick={(e) => {
// //                                 e.stopPropagation();
// //                                 setShowRemoveConfirm(property);
// //                               }}
// //                               title="حذف از نشان‌شده‌ها"
// //                             >
// //                               ⭐
// //                             </button>
// //                           </div>
// //                         </div>
                        
// //                         <div className="bookmarks-list-info">
// //                           <span className="price">{formatPrice(property.price)}</span>
// //                           <span>📐 {property.area}m²</span>
// //                           <span>🛏 {property.rooms} خواب</span>
// //                           <span>👁 {property.views} بازدید</span>
// //                           <span>📅 {property.createdAtPersianRelative || new Date(property.createdAt).toLocaleDateString('fa-IR')}</span>
// //                         </div>
                        
// //                         <div className="bookmarks-list-features">
// //                           {property.hasParking && <span>🚗 پارکینگ</span>}
// //                           {property.hasElevator && <span>🛗 آسانسور</span>}
// //                           {property.hasLoan && <span>🏦 تسهیلات</span>}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   );
// //                 })
// //             }
// //           </div>

// //           {pagination.totalPages > 1 && (
// //             <div className="bookmarks-pagination">
// //               <button 
// //                 className="bookmarks-pagination-btn"
// //                 onClick={() => handlePageChange(pagination.pageNumber - 1)}
// //                 disabled={!pagination.hasPreviousPage}
// //               >
// //                 ‹ قبلی
// //               </button>
              
// //               <div className="bookmarks-pagination-pages">
// //                 {[...Array(pagination.totalPages)].map((_, i) => {
// //                   const pageNum = i + 1;
// //                   const isActive = pageNum === pagination.pageNumber;
// //                   const isNearCurrent = Math.abs(pageNum - pagination.pageNumber) <= 2;
// //                   const isFirst = pageNum === 1;
// //                   const isLast = pageNum === pagination.totalPages;
                  
// //                   if (isNearCurrent || isFirst || isLast) {
// //                     return (
// //                       <button
// //                         key={pageNum}
// //                         className={`bookmarks-pagination-page ${isActive ? 'active' : ''}`}
// //                         onClick={() => handlePageChange(pageNum)}
// //                       >
// //                         {pageNum}
// //                       </button>
// //                     );
// //                   } else if (pageNum === pagination.pageNumber - 3 || pageNum === pagination.pageNumber + 3) {
// //                     return <span key={pageNum} className="bookmarks-pagination-dots">…</span>;
// //                   }
// //                   return null;
// //                 })}
// //               </div>

// //               <button 
// //                 className="bookmarks-pagination-btn"
// //                 onClick={() => handlePageChange(pagination.pageNumber + 1)}
// //                 disabled={!pagination.hasNextPage}
// //               >
// //                 بعدی ›
// //               </button>
// //             </div>
// //           )}
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default UserBookmarksPanel;

// // UserBookmarksPanel.js
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './UserBookmarksPanel.css';
// import ImageWithSafeError from '../../../common/ImageWithSafeError/ImageWithSafeError';

// const UserBookmarksPanel = () => {
//   const navigate = useNavigate();
//   const [bookmarks, setBookmarks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [viewMode, setViewMode] = useState('grid');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [toast, setToast] = useState(null);
//   const [currentSlide, setCurrentSlide] = useState({});
//   const [pagination, setPagination] = useState({
//     pageNumber: 1,
//     pageSize: 10,
//     totalCount: 0,
//     totalPages: 0,
//     hasPreviousPage: false,
//     hasNextPage: false
//   });
//   const [showRemoveConfirm, setShowRemoveConfirm] = useState(null);
//   const slideIntervalRef = useRef({});

//   const showToast = (message, type = 'success') => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const getToken = () => {
//     const token = localStorage.getItem('auth_token');
//     if (!token) {
//       console.warn('توکن یافت نشد');
//       return null;
//     }
//     return token;
//   };

//   const fetchBookmarks = useCallback(async (pageNumber = 1) => {
//     setLoading(true);
//     setError(null);
    
//     const token = getToken();
//     if (!token) {
//       setError('لطفاً ابتدا وارد شوید');
//       setTimeout(() => navigate('/login'), 2000);
//       setLoading(false);
//       return;
//     }
    
//     try {
//       const response = await fetch(
//         `https://localhost:7178/api/RealEstatePage/GetRealEstateBookMark?pageNumber=${pageNumber}&pageSize=${pagination.pageSize}`,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           }
//         }
//       );

//       if (!response.ok) {
//         if (response.status === 401) {
//           throw new Error('نشست شما منقضی شده است');
//         }
//         throw new Error(`HTTP ${response.status}`);
//       }

//       const result = await response.json();
      
//       if (result.status === 200 && result.data) {
//         const mappedBookmarks = result.data.items.map(item => ({
//           id: item.id,
//           title: item.title,
//           address: item.address || `${item.region} - آدرس مشخص نشده`,
//           price: item.price,
//           area: item.area,
//           rooms: item.countRooms,
//           hasParking: item.isHasParking,
//           hasElevator: item.isHasElavator,
//           hasPool: false,
//           hasLoan: item.isHasLoan,
//           images: (item.images || []).map(img => `https://localhost:7178${img}`),
//           status: mapStatusToEnglish(item.status),
//           views: parseInt(item.views) || 0,
//           createdAt: item.createdAt,
//           createdAtPersianRelative: item.createdAtPersianRelative,
//           region: item.region,
//           countFloor: item.countFloor,
//           floor: item.floor,
//           originalStatus: item.status,
//         }));

//         setBookmarks(mappedBookmarks);
//         setPagination({
//           pageNumber: result.data.pageNumber,
//           pageSize: result.data.pageSize,
//           totalCount: result.data.totalCount,
//           totalPages: result.data.totalPages,
//           hasPreviousPage: result.data.hasPreviousPage,
//           hasNextPage: result.data.hasNextPage,
//         });

//         // تنظیم اسلایدر اولیه
//         const initialSlides = {};
//         mappedBookmarks.forEach(item => {
//           initialSlides[item.id] = 0;
//         });
//         setCurrentSlide(initialSlides);

//         // شروع اسلایدر خودکار
//         startAutoSlide(mappedBookmarks);
//       } else {
//         setBookmarks([]);
//       }
//     } catch (error) {
//       console.error('Error fetching bookmarks:', error);
//       if (error.message?.includes('منقضی')) {
//         setError(error.message);
//         setTimeout(() => navigate('/login'), 2000);
//       } else {
//         setError(error.message || 'خطا در دریافت نشان‌شده‌ها');
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [navigate, pagination.pageSize]);

//   const startAutoSlide = (items) => {
//     // پاک کردن تایمرهای قبلی
//     Object.values(slideIntervalRef.current).forEach(clearInterval);
//     slideIntervalRef.current = {};

//     items.forEach(item => {
//       if (item.images && item.images.length > 1) {
//         const intervalId = setInterval(() => {
//           setCurrentSlide(prev => ({
//             ...prev,
//             [item.id]: ((prev[item.id] || 0) + 1) % item.images.length
//           }));
//         }, 4000);
//         slideIntervalRef.current[item.id] = intervalId;
//       }
//     });
//   };

//   const mapStatusToEnglish = (persianStatus) => {
//     switch(persianStatus) {
//       case 'منتشر شد':
//       case 'فعال':
//         return 'active';
//       case 'انتظار':
//       case 'در انتظار':
//         return 'pending';
//       case 'در انتظارپرداخت':
//         return 'payment_pending';
//       case 'فروخته شده':
//         return 'sold';
//       case 'بایگانی شده':
//         return 'archived';
//       default:
//         return 'pending';
//     }
//   };

//   const getStatusLabel = (status) => {
//     switch(status) {
//       case 'active': return { text: 'منتشر شده', class: 'status-active', icon: '✅' };
//       case 'pending': return { text: 'در انتظار', class: 'status-pending', icon: '⏳' };
//       case 'payment_pending': return { text: 'در انتظار پرداخت', class: 'status-payment-pending', icon: '💰' };
//       case 'sold': return { text: 'فروخته شده', class: 'status-sold', icon: '💰' };
//       case 'archived': return { text: 'بایگانی شده', class: 'status-archived', icon: '📦' };
//       default: return { text: 'نامشخص', class: 'status-inactive', icon: '❓' };
//     }
//   };

//   const handleRemoveBookmark = async (propertyId) => {
//     const token = getToken();
//     if (!token) {
//       showToast('لطفاً ابتدا وارد شوید', 'error');
//       setTimeout(() => navigate('/login'), 2000);
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://localhost:7178/api/RealEstatePage/RemoveBookmark/${propertyId}`,
//         {
//           method: 'DELETE',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           }
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}`);
//       }

//       // پاک کردن تایمر اسلایدر
//       if (slideIntervalRef.current[propertyId]) {
//         clearInterval(slideIntervalRef.current[propertyId]);
//         delete slideIntervalRef.current[propertyId];
//       }

//       setBookmarks(prev => prev.filter(p => p.id !== propertyId));
//       showToast('نشان‌شده با موفقیت حذف شد', 'success');
      
//       setPagination(prev => ({
//         ...prev,
//         totalCount: prev.totalCount - 1
//       }));

//     } catch (error) {
//       console.error('Remove bookmark error:', error);
//       showToast(error.message || 'خطا در حذف نشان‌شده', 'error');
//     }
//     setShowRemoveConfirm(null);
//   };

//   useEffect(() => {
//     fetchBookmarks();
    
//     return () => {
//       // پاک کردن تایمرها هنگام unmount
//       Object.values(slideIntervalRef.current).forEach(clearInterval);
//     };
//   }, [fetchBookmarks]);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       fetchBookmarks(newPage);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const formatPrice = (price) => {
//     if (price >= 1000000000000) {
//       return (price / 1000000000000).toFixed(1) + ' هزار میلیارد تومان';
//     }
//     if (price >= 1000000000) {
//       return (price / 1000000000).toFixed(1) + ' میلیارد تومان';
//     }
//     if (price >= 1000000) {
//       return (price / 1000000).toFixed(1) + ' میلیون تومان';
//     }
//     return price.toLocaleString() + ' تومان';
//   };

//   const goToSlide = (propertyId, index, e) => {
//     e.stopPropagation();
//     setCurrentSlide(prev => ({
//       ...prev,
//       [propertyId]: index
//     }));
    
//     // ریست تایمر اسلایدر
//     if (slideIntervalRef.current[propertyId]) {
//       clearInterval(slideIntervalRef.current[propertyId]);
//       const property = bookmarks.find(p => p.id === propertyId);
//       if (property && property.images && property.images.length > 1) {
//         const intervalId = setInterval(() => {
//           setCurrentSlide(prev => ({
//             ...prev,
//             [propertyId]: ((prev[propertyId] || 0) + 1) % property.images.length
//           }));
//         }, 4000);
//         slideIntervalRef.current[propertyId] = intervalId;
//       }
//     }
//   };

//   const filteredBookmarks = bookmarks.filter(property => {
//     const matchesSearch = property.title?.includes(searchTerm) || 
//                          property.address?.includes(searchTerm) ||
//                          property.region?.includes(searchTerm);
//     const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const statistics = {
//     total: bookmarks.length,
//     active: bookmarks.filter(p => p.status === 'active').length,
//     pending: bookmarks.filter(p => p.status === 'pending').length,
//     payment_pending: bookmarks.filter(p => p.status === 'payment_pending').length,
//     totalViews: bookmarks.reduce((sum, p) => sum + (p.views || 0), 0),
//   };

//   if (loading) {
//     return (
//       <div className="bookmarks-panel">
//         <div className="bookmarks-loading">
//           <div className="bookmarks-spinner"></div>
//           <p>در حال بارگذاری نشان‌شده‌ها...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bookmarks-panel">
//       {toast && (
//         <div className={`bookmarks-toast ${toast.type}`}>
//           <span className="toast-icon">{toast.type === 'success' ? '✅' : '❌'}</span>
//           {toast.message}
//         </div>
//       )}

//       {showRemoveConfirm && (
//         <div className="bookmarks-modal-overlay" onClick={() => setShowRemoveConfirm(null)}>
//           <div className="bookmarks-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="bookmarks-modal-icon">⭐</div>
//             <h4>حذف از نشان‌شده‌ها</h4>
//             <p>آیا از حذف "{showRemoveConfirm.title}" از لیست نشان‌شده‌ها مطمئن هستید؟</p>
//             <div className="bookmarks-modal-actions">
//               <button className="bookmarks-confirm-btn" onClick={() => handleRemoveBookmark(showRemoveConfirm.id)}>
//                 حذف
//               </button>
//               <button className="bookmarks-cancel-btn" onClick={() => setShowRemoveConfirm(null)}>
//                 انصراف
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="bookmarks-header">
//         <div className="bookmarks-header-content">
//           <div className="bookmarks-title-section">
//             <span className="bookmarks-icon">⭐</span>
//             <div>
//               <h2>نشان‌شده‌های من</h2>
//               <p className="bookmarks-subtitle">املاکی که ذخیره کرده‌اید</p>
//             </div>
//           </div>
//           <div className="bookmarks-total">
//             <span>{pagination.totalCount} ملک</span>
//           </div>
//         </div>
//       </div>

//       <div className="bookmarks-stats">
//         <div className="bookmarks-stat">
//           <span className="bookmarks-stat-icon">⭐</span>
//           <div>
//             <div className="bookmarks-stat-number">{statistics.total}</div>
//             <div className="bookmarks-stat-label">کل نشان‌شده‌ها</div>
//           </div>
//         </div>
//         <div className="bookmarks-stat">
//           <span className="bookmarks-stat-icon">✅</span>
//           <div>
//             <div className="bookmarks-stat-number">{statistics.active}</div>
//             <div className="bookmarks-stat-label">فعال</div>
//           </div>
//         </div>
//         <div className="bookmarks-stat">
//           <span className="bookmarks-stat-icon">⏳</span>
//           <div>
//             <div className="bookmarks-stat-number">{statistics.pending}</div>
//             <div className="bookmarks-stat-label">در انتظار</div>
//           </div>
//         </div>
//         <div className="bookmarks-stat">
//           <span className="bookmarks-stat-icon">💰</span>
//           <div>
//             <div className="bookmarks-stat-number">{statistics.payment_pending}</div>
//             <div className="bookmarks-stat-label">در انتظار پرداخت</div>
//           </div>
//         </div>
//         <div className="bookmarks-stat">
//           <span className="bookmarks-stat-icon">👁</span>
//           <div>
//             <div className="bookmarks-stat-number">{statistics.totalViews}</div>
//             <div className="bookmarks-stat-label">بازدید کل</div>
//           </div>
//         </div>
//       </div>

//       <div className="bookmarks-toolbar">
//         <div className="bookmarks-search">
//           <input
//             type="text"
//             placeholder="جستجو در نشان‌شده‌ها..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <span className="search-icon">🔍</span>
//         </div>
        
//         <div className="bookmarks-controls">
//           <select 
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="bookmarks-filter-select"
//           >
//             <option value="all">همه</option>
//             <option value="active">فعال</option>
//             <option value="pending">در انتظار تایید</option>
//             <option value="payment_pending">در انتظار پرداخت</option>
//             <option value="sold">فروخته شده</option>
//             <option value="archived">بایگانی شده</option>
//           </select>
          
//           <div className="bookmarks-view-toggle">
//             <button 
//               className={viewMode === 'grid' ? 'active' : ''}
//               onClick={() => setViewMode('grid')}
//               title="نمایش شبکه‌ای"
//             >
//               <span>▦</span>
//             </button>
//             <button 
//               className={viewMode === 'list' ? 'active' : ''}
//               onClick={() => setViewMode('list')}
//               title="نمایش لیستی"
//             >
//               <span>☰</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {error ? (
//         <div className="bookmarks-error">
//           <span className="error-icon">⚠️</span>
//           <p>{error}</p>
//           <button onClick={() => fetchBookmarks(pagination.pageNumber)}>تلاش مجدد</button>
//         </div>
//       ) : filteredBookmarks.length === 0 ? (
//         <div className="bookmarks-empty">
//           <div className="empty-icon">⭐</div>
//           <h4>نشان‌شده‌ای یافت نشد</h4>
//           <p>هنوز هیچ ملکی را نشان‌نکرده‌اید</p>
//           <button onClick={() => navigate('/RealEstate')} className="bookmarks-explore-btn">
//             🏠 جستجوی املاک
//           </button>
//         </div>
//       ) : (
//         <>
//           <div className={`bookmarks-properties ${viewMode}`}>
//             {viewMode === 'grid' 
//               ? filteredBookmarks.map(property => {
//                   const statusInfo = getStatusLabel(property.status);
//                   const images = property.images || [];
//                   const currentIndex = currentSlide[property.id] || 0;
//                   const hasMultipleImages = images.length > 1;

//                   return (
//                     <div key={property.id} className="bookmarks-card">
//                       <div 
//                         className="bookmarks-card-image"
//                         onClick={() => navigate('/RealEstateDetailPageItemForDemo', { state: { propertyId: property.id } })}
//                       >
//                         {images.length > 0 ? (
//                           <>
//                             <img 
//                               src={images[currentIndex] || '/images/placeholder-property.jpg'} 
//                               alt={property.title}
//                               className="bookmarks-card-img"
//                             />
//                             {hasMultipleImages && (
//                               <>
//                                 <button 
//                                   className="bookmarks-slide-btn prev"
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     goToSlide(property.id, (currentIndex - 1 + images.length) % images.length, e);
//                                   }}
//                                 >
//                                   ‹
//                                 </button>
//                                 <button 
//                                   className="bookmarks-slide-btn next"
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     goToSlide(property.id, (currentIndex + 1) % images.length, e);
//                                   }}
//                                 >
//                                   ›
//                                 </button>
//                                 <div className="bookmarks-slide-dots">
//                                   {images.map((_, idx) => (
//                                     <span 
//                                       key={idx}
//                                       className={`bookmarks-dot ${idx === currentIndex ? 'active' : ''}`}
//                                       onClick={(e) => goToSlide(property.id, idx, e)}
//                                     />
//                                   ))}
//                                 </div>
//                                 <div className="bookmarks-image-counter">
//                                   {currentIndex + 1} / {images.length}
//                                 </div>
//                               </>
//                             )}
//                           </>
//                         ) : (
//                           <div className="bookmarks-no-image">
//                             <span>📷</span>
//                             <p>تصویر موجود نیست</p>
//                           </div>
//                         )}
                        
//                         <div className={`bookmarks-card-status ${statusInfo.class}`}>
//                           {statusInfo.icon} {statusInfo.text}
//                         </div>
                        
//                         <button 
//                           className="bookmarks-remove-btn"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setShowRemoveConfirm(property);
//                           }}
//                           title="حذف از نشان‌شده‌ها"
//                         >
//                           ⭐
//                         </button>
//                       </div>
                      
//                       <div className="bookmarks-card-content">
//                         <h4 
//                           className="bookmarks-card-title"
//                           onClick={() => navigate('/RealEstateDetailPageItemForDemo', { state: { propertyId: property.id } })}
//                         >
//                           {property.title}
//                         </h4>
//                         <div className="bookmarks-card-address">{property.address}</div>
//                         <div className="bookmarks-card-price">{formatPrice(property.price)}</div>
                        
//                         <div className="bookmarks-card-features">
//                           <span>📐 {property.area} m²</span>
//                           <span>🛏 {property.rooms} خواب</span>
//                           {property.hasParking && <span>🚗 پارکینگ</span>}
//                           {property.hasElevator && <span>🛗 آسانسور</span>}
//                           {property.hasLoan && <span>🏦 تسهیلات</span>}
//                         </div>
                        
//                         <div className="bookmarks-card-footer">
//                           <div className="bookmarks-card-stats">
//                             <span>👁 {property.views}</span>
//                             <span>📅 {property.createdAtPersianRelative || new Date(property.createdAt).toLocaleDateString('fa-IR')}</span>
//                           </div>
//                           <button 
//                             className="bookmarks-detail-btn"
//                             onClick={() => navigate('/RealEstateDetailPageItemForDemo', { state: { propertyId: property.id } })}
//                           >
//                             مشاهده جزئیات
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })
//               : filteredBookmarks.map(property => {
//                   const statusInfo = getStatusLabel(property.status);
//                   const images = property.images || [];
//                   const currentIndex = currentSlide[property.id] || 0;
//                   const hasMultipleImages = images.length > 1;

//                   return (
//                     <div 
//                       key={property.id} 
//                       className="bookmarks-list-item"
//                       onClick={() => navigate('/RealEstateDetailPageItemForDemo', { state: { propertyId: property.id } })}
//                     >
//                       <div className="bookmarks-list-image">
//                         {images.length > 0 ? (
//                           <>
//                             <img 
//                               src={images[currentIndex] || '/images/placeholder-property.jpg'} 
//                               alt={property.title}
//                               className="bookmarks-list-img"
//                             />
//                             {hasMultipleImages && (
//                               <div className="bookmarks-list-slide-dots">
//                                 {images.map((_, idx) => (
//                                   <span 
//                                     key={idx}
//                                     className={`bookmarks-list-dot ${idx === currentIndex ? 'active' : ''}`}
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       goToSlide(property.id, idx, e);
//                                     }}
//                                   />
//                                 ))}
//                               </div>
//                             )}
//                           </>
//                         ) : (
//                           <div className="bookmarks-list-no-image">
//                             <span>📷</span>
//                           </div>
//                         )}
//                       </div>
//                       <div className="bookmarks-list-content">
//                         <div className="bookmarks-list-header">
//                           <div className="bookmarks-list-title-group">
//                             <h4>{property.title}</h4>
//                             <div className="bookmarks-list-address">{property.address}</div>
//                           </div>
//                           <div className="bookmarks-list-status-group">
//                             <div className={`bookmarks-list-status ${statusInfo.class}`}>
//                               {statusInfo.icon} {statusInfo.text}
//                             </div>
//                             <button 
//                               className="bookmarks-list-remove"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setShowRemoveConfirm(property);
//                               }}
//                               title="حذف از نشان‌شده‌ها"
//                             >
//                               ⭐
//                             </button>
//                           </div>
//                         </div>
                        
//                         <div className="bookmarks-list-info">
//                           <span className="price">{formatPrice(property.price)}</span>
//                           <span>📐 {property.area}m²</span>
//                           <span>🛏 {property.rooms} خواب</span>
//                           <span>👁 {property.views} بازدید</span>
//                           <span>📅 {property.createdAtPersianRelative || new Date(property.createdAt).toLocaleDateString('fa-IR')}</span>
//                         </div>
                        
//                         <div className="bookmarks-list-features">
//                           {property.hasParking && <span>🚗 پارکینگ</span>}
//                           {property.hasElevator && <span>🛗 آسانسور</span>}
//                           {property.hasLoan && <span>🏦 تسهیلات</span>}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })
//             }
//           </div>

//           {pagination.totalPages > 1 && (
//             <div className="bookmarks-pagination">
//               <button 
//                 className="bookmarks-pagination-btn"
//                 onClick={() => handlePageChange(pagination.pageNumber - 1)}
//                 disabled={!pagination.hasPreviousPage}
//               >
//                 ‹ قبلی
//               </button>
              
//               <div className="bookmarks-pagination-pages">
//                 {[...Array(pagination.totalPages)].map((_, i) => {
//                   const pageNum = i + 1;
//                   const isActive = pageNum === pagination.pageNumber;
//                   const isNearCurrent = Math.abs(pageNum - pagination.pageNumber) <= 2;
//                   const isFirst = pageNum === 1;
//                   const isLast = pageNum === pagination.totalPages;
                  
//                   if (isNearCurrent || isFirst || isLast) {
//                     return (
//                       <button
//                         key={pageNum}
//                         className={`bookmarks-pagination-page ${isActive ? 'active' : ''}`}
//                         onClick={() => handlePageChange(pageNum)}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   } else if (pageNum === pagination.pageNumber - 3 || pageNum === pagination.pageNumber + 3) {
//                     return <span key={pageNum} className="bookmarks-pagination-dots">…</span>;
//                   }
//                   return null;
//                 })}
//               </div>

//               <button 
//                 className="bookmarks-pagination-btn"
//                 onClick={() => handlePageChange(pagination.pageNumber + 1)}
//                 disabled={!pagination.hasNextPage}
//               >
//                 بعدی ›
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default UserBookmarksPanel;


// UserBookmarksPanel.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserBookmarksPanel.css';
import ImageWithSafeError from '../../../common/ImageWithSafeError/ImageWithSafeError';

const UserBookmarksPanel = () => {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toast, setToast] = useState(null);
  const [currentSlide, setCurrentSlide] = useState({});
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false
  });
  const [removingId, setRemovingId] = useState(null);
  const slideIntervalRef = useRef({});

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getToken = () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.warn('توکن یافت نشد');
      return null;
    }
    return token;
  };

  const fetchBookmarks = useCallback(async (pageNumber = 1) => {
    setLoading(true);
    setError(null);
    
    const token = getToken();
    if (!token) {
      setError('لطفاً ابتدا وارد شوید');
      setTimeout(() => navigate('/login'), 2000);
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch(
        `https://localhost:7178/api/RealEstatePage/GetRealEstateBookMark?pageNumber=${pageNumber}&pageSize=${pagination.pageSize}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('نشست شما منقضی شده است');
        }
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === 200 && result.data) {
        const mappedBookmarks = result.data.items.map(item => ({
          id: item.id,
          title: item.title,
          address: item.address || `${item.region} - آدرس مشخص نشده`,
          price: item.price,
          area: item.area,
          rooms: item.countRooms,
          hasParking: item.isHasParking,
          hasElevator: item.isHasElavator,
          hasPool: false,
          hasLoan: item.isHasLoan,
          images: (item.images || []).map(img => `https://localhost:7178${img}`),
          status: mapStatusToEnglish(item.status),
          views: parseInt(item.views) || 0,
          createdAt: item.createdAt,
          createdAtPersianRelative: item.createdAtPersianRelative,
          region: item.region,
          countFloor: item.countFloor,
          floor: item.floor,
          originalStatus: item.status,
        }));

        setBookmarks(mappedBookmarks);
        setPagination({
          pageNumber: result.data.pageNumber,
          pageSize: result.data.pageSize,
          totalCount: result.data.totalCount,
          totalPages: result.data.totalPages,
          hasPreviousPage: result.data.hasPreviousPage,
          hasNextPage: result.data.hasNextPage,
        });

        // تنظیم اسلایدر اولیه
        const initialSlides = {};
        mappedBookmarks.forEach(item => {
          initialSlides[item.id] = 0;
        });
        setCurrentSlide(initialSlides);

        // شروع اسلایدر خودکار
        startAutoSlide(mappedBookmarks);
      } else {
        setBookmarks([]);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      if (error.message?.includes('منقضی')) {
        setError(error.message);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(error.message || 'خطا در دریافت نشان‌شده‌ها');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate, pagination.pageSize]);

  const startAutoSlide = (items) => {
    // پاک کردن تایمرهای قبلی
    Object.values(slideIntervalRef.current).forEach(clearInterval);
    slideIntervalRef.current = {};

    items.forEach(item => {
      if (item.images && item.images.length > 1) {
        const intervalId = setInterval(() => {
          setCurrentSlide(prev => ({
            ...prev,
            [item.id]: ((prev[item.id] || 0) + 1) % item.images.length
          }));
        }, 4000);
        slideIntervalRef.current[item.id] = intervalId;
      }
    });
  };

  const mapStatusToEnglish = (persianStatus) => {
    switch(persianStatus) {
      case 'منتشر شد':
      case 'فعال':
        return 'active';
      case 'انتظار':
      case 'در انتظار':
        return 'pending';
      case 'در انتظارپرداخت':
        return 'payment_pending';
      case 'فروخته شده':
        return 'sold';
      case 'بایگانی شده':
        return 'archived';
      default:
        return 'pending';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'active': return { text: 'منتشر شده', class: 'status-active', icon: '✅' };
      case 'pending': return { text: 'در انتظار', class: 'status-pending', icon: '⏳' };
      case 'payment_pending': return { text: 'در انتظار پرداخت', class: 'status-payment-pending', icon: '💰' };
      case 'sold': return { text: 'فروخته شده', class: 'status-sold', icon: '💰' };
      case 'archived': return { text: 'بایگانی شده', class: 'status-archived', icon: '📦' };
      default: return { text: 'نامشخص', class: 'status-inactive', icon: '❓' };
    }
  };

  // ✅ تابع جدید برای ToggleBookMark
  const handleToggleBookmark = async (propertyId, e) => {
    e.stopPropagation();
    
    const token = getToken();
    if (!token) {
      showToast('لطفاً ابتدا وارد شوید', 'error');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    setRemovingId(propertyId);

    try {
      const response = await fetch(
        `https://localhost:7178/api/RealEstatePage/ToggleBookMark`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(propertyId)
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('نشست شما منقضی شده است');
        }
        throw new Error(`HTTP ${response.status}`);
      }

      // پاک کردن تایمر اسلایدر
      if (slideIntervalRef.current[propertyId]) {
        clearInterval(slideIntervalRef.current[propertyId]);
        delete slideIntervalRef.current[propertyId];
      }

      // حذف از لیست
      setBookmarks(prev => prev.filter(p => p.id !== propertyId));
      showToast('ملک از نشان‌شده‌ها حذف شد', 'success');
      
      setPagination(prev => ({
        ...prev,
        totalCount: prev.totalCount - 1
      }));

    } catch (error) {
      console.error('Toggle bookmark error:', error);
      showToast(error.message || 'خطا در حذف از نشان‌شده‌ها', 'error');
    } finally {
      setRemovingId(null);
    }
  };

  useEffect(() => {
    fetchBookmarks();
    
    return () => {
      // پاک کردن تایمرها هنگام unmount
      Object.values(slideIntervalRef.current).forEach(clearInterval);
    };
  }, [fetchBookmarks]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchBookmarks(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const formatPrice = (price) => {
    if (price >= 1000000000000) {
      return (price / 1000000000000).toFixed(1) + ' هزار میلیارد تومان';
    }
    if (price >= 1000000000) {
      return (price / 1000000000).toFixed(1) + ' میلیارد تومان';
    }
    if (price >= 1000000) {
      return (price / 1000000).toFixed(1) + ' میلیون تومان';
    }
    return price.toLocaleString() + ' تومان';
  };

  const goToSlide = (propertyId, index, e) => {
    e.stopPropagation();
    setCurrentSlide(prev => ({
      ...prev,
      [propertyId]: index
    }));
    
    // ریست تایمر اسلایدر
    if (slideIntervalRef.current[propertyId]) {
      clearInterval(slideIntervalRef.current[propertyId]);
      const property = bookmarks.find(p => p.id === propertyId);
      if (property && property.images && property.images.length > 1) {
        const intervalId = setInterval(() => {
          setCurrentSlide(prev => ({
            ...prev,
            [propertyId]: ((prev[propertyId] || 0) + 1) % property.images.length
          }));
        }, 4000);
        slideIntervalRef.current[propertyId] = intervalId;
      }
    }
  };

  const filteredBookmarks = bookmarks.filter(property => {
    const matchesSearch = property.title?.includes(searchTerm) || 
                         property.address?.includes(searchTerm) ||
                         property.region?.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statistics = {
    total: bookmarks.length,
    active: bookmarks.filter(p => p.status === 'active').length,
    pending: bookmarks.filter(p => p.status === 'pending').length,
    payment_pending: bookmarks.filter(p => p.status === 'payment_pending').length,
    totalViews: bookmarks.reduce((sum, p) => sum + (p.views || 0), 0),
  };

  if (loading) {
    return (
      <div className="bookmarks-panel">
        <div className="bookmarks-loading">
          <div className="bookmarks-spinner"></div>
          <p>در حال بارگذاری نشان‌شده‌ها...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bookmarks-panel">
      {toast && (
        <div className={`bookmarks-toast ${toast.type}`}>
          <span className="toast-icon">{toast.type === 'success' ? '✅' : '❌'}</span>
          {toast.message}
        </div>
      )}

      <div className="bookmarks-header">
        <div className="bookmarks-header-content">
          <div className="bookmarks-title-section">
            <span className="bookmarks-icon">⭐</span>
            <div>
              <h2>نشان‌شده‌های من</h2>
              <p className="bookmarks-subtitle">املاکی که ذخیره کرده‌اید</p>
            </div>
          </div>
          <div className="bookmarks-total">
            <span>{pagination.totalCount} ملک</span>
          </div>
        </div>
      </div>

      <div className="bookmarks-stats">
        <div className="bookmarks-stat">
          <span className="bookmarks-stat-icon">⭐</span>
          <div>
            <div className="bookmarks-stat-number">{statistics.total}</div>
            <div className="bookmarks-stat-label">کل نشان‌شده‌ها</div>
          </div>
        </div>
        <div className="bookmarks-stat">
          <span className="bookmarks-stat-icon">✅</span>
          <div>
            <div className="bookmarks-stat-number">{statistics.active}</div>
            <div className="bookmarks-stat-label">فعال</div>
          </div>
        </div>
        <div className="bookmarks-stat">
          <span className="bookmarks-stat-icon">⏳</span>
          <div>
            <div className="bookmarks-stat-number">{statistics.pending}</div>
            <div className="bookmarks-stat-label">در انتظار</div>
          </div>
        </div>
        <div className="bookmarks-stat">
          <span className="bookmarks-stat-icon">💰</span>
          <div>
            <div className="bookmarks-stat-number">{statistics.payment_pending}</div>
            <div className="bookmarks-stat-label">در انتظار پرداخت</div>
          </div>
        </div>
        <div className="bookmarks-stat">
          <span className="bookmarks-stat-icon">👁</span>
          <div>
            <div className="bookmarks-stat-number">{statistics.totalViews}</div>
            <div className="bookmarks-stat-label">بازدید کل</div>
          </div>
        </div>
      </div>

      <div className="bookmarks-toolbar">
        <div className="bookmarks-search">
          <input
            type="text"
            placeholder="جستجو در نشان‌شده‌ها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="bookmarks-controls">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bookmarks-filter-select"
          >
            <option value="all">همه</option>
            <option value="active">فعال</option>
            <option value="pending">در انتظار تایید</option>
            <option value="payment_pending">در انتظار پرداخت</option>
            <option value="sold">فروخته شده</option>
            <option value="archived">بایگانی شده</option>
          </select>
          
          <div className="bookmarks-view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
              title="نمایش شبکه‌ای"
            >
              <span>▦</span>
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
              title="نمایش لیستی"
            >
              <span>☰</span>
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <div className="bookmarks-error">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
          <button onClick={() => fetchBookmarks(pagination.pageNumber)}>تلاش مجدد</button>
        </div>
      ) : filteredBookmarks.length === 0 ? (
        <div className="bookmarks-empty">
          <div className="empty-icon">⭐</div>
          <h4>نشان‌شده‌ای یافت نشد</h4>
          <p>هنوز هیچ ملکی را نشان‌نکرده‌اید</p>
          <button onClick={() => navigate('/RealEstate')} className="bookmarks-explore-btn">
            🏠 جستجوی املاک
          </button>
        </div>
      ) : (
        <>
          <div className={`bookmarks-properties ${viewMode}`}>
            {viewMode === 'grid' 
              ? filteredBookmarks.map(property => {
                  const statusInfo = getStatusLabel(property.status);
                  const images = property.images || [];
                  const currentIndex = currentSlide[property.id] || 0;
                  const hasMultipleImages = images.length > 1;

                  return (
                    <div key={property.id} className="bookmarks-card">
                      <div 
                        className="bookmarks-card-image"
                        onClick={() => navigate('/RealEstateDetailPageItemForDemo', { state: { propertyId: property.id } })}
                      >
                        {images.length > 0 ? (
                          <>
                            <img 
                              src={images[currentIndex] || '/images/placeholder-property.jpg'} 
                              alt={property.title}
                              className="bookmarks-card-img"
                            />
                            {hasMultipleImages && (
                              <>
                                <button 
                                  className="bookmarks-slide-btn prev"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    goToSlide(property.id, (currentIndex - 1 + images.length) % images.length, e);
                                  }}
                                >
                                  ‹
                                </button>
                                <button 
                                  className="bookmarks-slide-btn next"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    goToSlide(property.id, (currentIndex + 1) % images.length, e);
                                  }}
                                >
                                  ›
                                </button>
                                <div className="bookmarks-slide-dots">
                                  {images.map((_, idx) => (
                                    <span 
                                      key={idx}
                                      className={`bookmarks-dot ${idx === currentIndex ? 'active' : ''}`}
                                      onClick={(e) => goToSlide(property.id, idx, e)}
                                    />
                                  ))}
                                </div>
                                <div className="bookmarks-image-counter">
                                  {currentIndex + 1} / {images.length}
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <div className="bookmarks-no-image">
                            <span>📷</span>
                            <p>تصویر موجود نیست</p>
                          </div>
                        )}
                        
                        {/* <div className={`bookmarks-card-status ${statusInfo.class}`}>
                          {statusInfo.icon} {statusInfo.text}
                        </div> */}
                        
                        {/* ✅ دکمه ضربدر برای حذف از نشان‌شده‌ها */}
                        <button 
                          className="bookmarks-remove-btn"
                          onClick={(e) => handleToggleBookmark(property.id, e)}
                          disabled={removingId === property.id}
                          title="حذف از نشان‌شده‌ها"
                        >
                          {removingId === property.id ? (
                            <span className="bookmarks-remove-spinner"></span>
                          ) : (
                            '✕'
                          )}
                        </button>
                      </div>
                      
                      <div className="bookmarks-card-content">
                        <h4 
                          className="bookmarks-card-title"
                          onClick={() => navigate('/RealEstateDetailPageItemForDemo', { state: { propertyId: property.id } })}
                        >
                          {property.title}
                        </h4>
                        <div className="bookmarks-card-address">{property.address}</div>
                        <div className="bookmarks-card-price">{formatPrice(property.price)}</div>
                        
                        <div className="bookmarks-card-features">
                          <span>📐 {property.area} m²</span>
                          <span>🛏 {property.rooms} خواب</span>
                          {property.hasParking && <span>🚗 پارکینگ</span>}
                          {property.hasElevator && <span>🛗 آسانسور</span>}
                          {property.hasLoan && <span>🏦 تسهیلات</span>}
                        </div>
                        
                        <div className="bookmarks-card-footer">
                          <div className="bookmarks-card-stats">
                            <span>👁 {property.views}</span>
                            <span>📅 {property.createdAtPersianRelative || new Date(property.createdAt).toLocaleDateString('fa-IR')}</span>
                          </div>
                          <button 
                            className="bookmarks-detail-btn"
                            onClick={() => navigate('/RealEstateDetailPageItemForDemo', { state: { propertyId: property.id } })}
                          >
                            مشاهده جزئیات
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : filteredBookmarks.map(property => {
                  const statusInfo = getStatusLabel(property.status);
                  const images = property.images || [];
                  const currentIndex = currentSlide[property.id] || 0;
                  const hasMultipleImages = images.length > 1;

                  return (
                    <div 
                      key={property.id} 
                      className="bookmarks-list-item"
                      onClick={() => navigate('/RealEstateDetailPageItemForDemo', { state: { propertyId: property.id } })}
                    >
                      <div className="bookmarks-list-image">
                        {images.length > 0 ? (
                          <>
                            <img 
                              src={images[currentIndex] || '/images/placeholder-property.jpg'} 
                              alt={property.title}
                              className="bookmarks-list-img"
                            />
                            {hasMultipleImages && (
                              <div className="bookmarks-list-slide-dots">
                                {images.map((_, idx) => (
                                  <span 
                                    key={idx}
                                    className={`bookmarks-list-dot ${idx === currentIndex ? 'active' : ''}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      goToSlide(property.id, idx, e);
                                    }}
                                  />
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="bookmarks-list-no-image">
                            <span>📷</span>
                          </div>
                        )}
                      </div>
                      <div className="bookmarks-list-content">
                        <div className="bookmarks-list-header">
                          <div className="bookmarks-list-title-group">
                            <h4>{property.title}</h4>
                            <div className="bookmarks-list-address">{property.address}</div>
                          </div>
                          <div className="bookmarks-list-status-group">
                            <div className={`bookmarks-list-status ${statusInfo.class}`}>
                              {statusInfo.icon} {statusInfo.text}
                            </div>
                            {/* ✅ دکمه ضربدر برای حالت لیستی */}
                            <button 
                              className="bookmarks-list-remove"
                              onClick={(e) => handleToggleBookmark(property.id, e)}
                              disabled={removingId === property.id}
                              title="حذف از نشان‌شده‌ها"
                            >
                              {removingId === property.id ? (
                                <span className="bookmarks-remove-spinner-small"></span>
                              ) : (
                                '✕'
                              )}
                            </button>
                          </div>
                        </div>
                        
                        <div className="bookmarks-list-info">
                          <span className="price">{formatPrice(property.price)}</span>
                          <span>📐 {property.area}m²</span>
                          <span>🛏 {property.rooms} خواب</span>
                          <span>👁 {property.views} بازدید</span>
                          <span>📅 {property.createdAtPersianRelative || new Date(property.createdAt).toLocaleDateString('fa-IR')}</span>
                        </div>
                        
                        <div className="bookmarks-list-features">
                          {property.hasParking && <span>🚗 پارکینگ</span>}
                          {property.hasElevator && <span>🛗 آسانسور</span>}
                          {property.hasLoan && <span>🏦 تسهیلات</span>}
                        </div>
                      </div>
                    </div>
                  );
                })
            }
          </div>

          {pagination.totalPages > 1 && (
            <div className="bookmarks-pagination">
              <button 
                className="bookmarks-pagination-btn"
                onClick={() => handlePageChange(pagination.pageNumber - 1)}
                disabled={!pagination.hasPreviousPage}
              >
                ‹ قبلی
              </button>
              
              <div className="bookmarks-pagination-pages">
                {[...Array(pagination.totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  const isActive = pageNum === pagination.pageNumber;
                  const isNearCurrent = Math.abs(pageNum - pagination.pageNumber) <= 2;
                  const isFirst = pageNum === 1;
                  const isLast = pageNum === pagination.totalPages;
                  
                  if (isNearCurrent || isFirst || isLast) {
                    return (
                      <button
                        key={pageNum}
                        className={`bookmarks-pagination-page ${isActive ? 'active' : ''}`}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === pagination.pageNumber - 3 || pageNum === pagination.pageNumber + 3) {
                    return <span key={pageNum} className="bookmarks-pagination-dots">…</span>;
                  }
                  return null;
                })}
              </div>

              <button 
                className="bookmarks-pagination-btn"
                onClick={() => handlePageChange(pagination.pageNumber + 1)}
                disabled={!pagination.hasNextPage}
              >
                بعدی ›
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserBookmarksPanel;