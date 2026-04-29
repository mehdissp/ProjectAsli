
// // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { panelService } from '../../../../services/panelService';
// // // // import AddPropertyModal from './AddPropertyModal';
// // // // import './UserPropertiesPanel.css';

// // // // const UserPropertiesPanel = () => {
// // // //   const navigate = useNavigate();
// // // //   const [properties, setProperties] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [selectedProperty, setSelectedProperty] = useState(null);
// // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// // // //   const [viewMode, setViewMode] = useState('grid');
// // // //   const [searchTerm, setSearchTerm] = useState('');
// // // //   const [statusFilter, setStatusFilter] = useState('all');
// // // //   const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
// // // //   const [toast, setToast] = useState(null);
// // // //   const [isAddModalOpen, setIsAddModalOpen] = useState(false);

// // // //   const showToast = (message, type = 'success') => {
// // // //     setToast({ message, type });
// // // //     setTimeout(() => setToast(null), 3000);
// // // //   };

// // // //   // دریافت توکن از localStorage
// // // //   const getToken = () => {
// // // //     const token = localStorage.getItem('token');
// // // //     if (!token) {
// // // //       console.warn('توکن یافت نشد');
// // // //       return null;
// // // //     }
// // // //     return token;
// // // //   };

// // // //   const fetchUserProperties = useCallback(async () => {
// // // //     setLoading(true);
// // // //     setError(null);
    
// // // //     const token = getToken();
// // // //     if (!token) {
// // // //       setError('لطفاً ابتدا وارد شوید');
// // // //       setTimeout(() => navigate('/login'), 2000);
// // // //       setLoading(false);
// // // //       return;
// // // //     }
    
// // // //     try {
// // // //       // استفاده از panelService به جای fetch مستقیم
// // // //       const data = await panelService.GetRealEstatePanel();
      
// // // //       if (data && Array.isArray(data)) {
// // // //         const mappedProperties = data.map(item => ({
// // // //           id: item.id,
// // // //           title: item.title,
// // // //           address: item.address || `${item.region} - آدرس مشخص نشده`,
// // // //           price: item.price * 10000,
// // // //           area: item.area,
// // // //           rooms: item.countRooms,
// // // //           hasParking: item.isHasParking,
// // // //           hasElevator: item.isHasElavator,
// // // //           hasPool: false,
// // // //           hasLoan: item.isHasLoan,
// // // //           images: (item.images || []).map(img => `https://localhost:7178/${img}`),
// // // //           status: mapStatusToEnglish(item.status),
// // // //           views: parseInt(item.views) || 0,
// // // //           inquiries: 0,
// // // //           createdAt: item.createdAt,
// // // //           createdAtPersianRelative: item.createdAtPersianRelative,
// // // //           region: item.region,
// // // //           countFloor: item.countFloor,
// // // //           floor: item.floor,
// // // //           originalStatus: item.status,
// // // //         }));
        
// // // //         setProperties(mappedProperties);
// // // //       } else {
// // // //         setProperties([]);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error fetching user properties:', error);
// // // //       if (error.message?.includes('منقضی')) {
// // // //         setError(error.message);
// // // //         setTimeout(() => navigate('/login'), 2000);
// // // //       } else {
// // // //         setError(error.message || 'خطا در دریافت اطلاعات املاک شما');
// // // //       }
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, [navigate]);

// // // //   const mapStatusToEnglish = (persianStatus) => {
// // // //     switch(persianStatus) {
// // // //       case 'منتشر شد':
// // // //       case 'فعال':
// // // //         return 'active';
// // // //       case 'انتظار':
// // // //       case 'در انتظار':
// // // //         return 'pending';
// // // //       case 'در انتظارپرداخت':
// // // //         return 'payment_pending';
// // // //       case 'فروخته شده':
// // // //         return 'sold';
// // // //       case 'بایگانی شده':
// // // //         return 'archived';
// // // //       default:
// // // //         return 'pending';
// // // //     }
// // // //   };

// // // //   const mapStatusToPersian = (englishStatus) => {
// // // //     switch(englishStatus) {
// // // //       case 'active':
// // // //         return 'منتشر شد';
// // // //       case 'pending':
// // // //         return 'در انتظار';
// // // //       case 'payment_pending':
// // // //         return 'در انتظار پرداخت';
// // // //       case 'sold':
// // // //         return 'فروخته شده';
// // // //       case 'archived':
// // // //         return 'بایگانی شده';
// // // //       default:
// // // //         return 'نامشخص';
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchUserProperties();
// // // //   }, [fetchUserProperties]);

// // // //   const handleDeleteProperty = async (property) => {
// // // //     setShowDeleteConfirm(property);
// // // //   };

// // // //   const confirmDelete = async () => {
// // // //     const token = getToken();
// // // //     if (!token) {
// // // //       showToast('لطفاً ابتدا وارد شوید', 'error');
// // // //       setTimeout(() => navigate('/login'), 2000);
// // // //       setShowDeleteConfirm(null);
// // // //       return;
// // // //     }
    
// // // //     try {
// // // //       const controller = new AbortController();
// // // //       const timeoutId = setTimeout(() => controller.abort(), 10000);
      
// // // //       const response = await fetch(
// // // //         `https://localhost:7178/api/RealEstate/DeleteRealEstate/${showDeleteConfirm.id}`,
// // // //         { 
// // // //           method: 'DELETE',
// // // //           headers: {
// // // //             'Authorization': `Bearer ${token}`,
// // // //             'Content-Type': 'application/json',
// // // //           },
// // // //           signal: controller.signal 
// // // //         }
// // // //       );
      
// // // //       clearTimeout(timeoutId);
      
// // // //       if (!response.ok) {
// // // //         if (response.status === 401) {
// // // //           localStorage.removeItem('token');
// // // //           throw new Error('نشست شما منقضی شده است');
// // // //         }
// // // //         throw new Error(`HTTP ${response.status}`);
// // // //       }
      
// // // //       const result = await response.json();
      
// // // //       if (result.status === 200) {
// // // //         setProperties(prev => prev.filter(p => p.id !== showDeleteConfirm.id));
// // // //         showToast('آگهی با موفقیت حذف شد', 'success');
// // // //       } else {
// // // //         throw new Error(result.message || 'خطا در حذف');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Delete error:', error);
// // // //       if (error.name === 'AbortError') {
// // // //         showToast('مدت زمان درخواست به پایان رسید', 'error');
// // // //       } else if (error.message.includes('منقضی')) {
// // // //         showToast('نشست شما منقضی شده است', 'error');
// // // //         setTimeout(() => navigate('/login'), 2000);
// // // //       } else {
// // // //         showToast(error.message || 'خطا در حذف آگهی', 'error');
// // // //       }
// // // //     } finally {
// // // //       setShowDeleteConfirm(null);
// // // //     }
// // // //   };

// // // //   const handleEditProperty = (property) => {
// // // //     setSelectedProperty(property);
// // // //     setIsEditModalOpen(true);
// // // //   };

// // // //   const handleSaveEdit = async (e) => {
// // // //     e.preventDefault();
    
// // // //     const token = getToken();
// // // //     if (!token) {
// // // //       showToast('لطفاً ابتدا وارد شوید', 'error');
// // // //       setTimeout(() => navigate('/login'), 2000);
// // // //       return;
// // // //     }
    
// // // //     const formData = new FormData(e.target);
    
// // // //     try {
// // // //       const controller = new AbortController();
// // // //       const timeoutId = setTimeout(() => controller.abort(), 10000);
      
// // // //       const updatedData = {
// // // //         id: selectedProperty.id,
// // // //         title: formData.get('title'),
// // // //         price: parseInt(formData.get('price')),
// // // //         area: parseInt(formData.get('area')),
// // // //         address: formData.get('address'),
// // // //         region: formData.get('region'),
// // // //         countRooms: parseInt(formData.get('rooms')) || 0,
// // // //         isHasParking: formData.get('hasParking') === 'true',
// // // //         isHasElavator: formData.get('hasElevator') === 'true',
// // // //         isHasLoan: formData.get('hasLoan') === 'true',
// // // //         countFloor: parseInt(formData.get('countFloor')) || 0,
// // // //         floor: parseInt(formData.get('floor')) || 1,
// // // //       };
      
// // // //       const response = await fetch(
// // // //         `https://localhost:7178/api/RealEstate/UpdateRealEstate/${selectedProperty.id}`,
// // // //         {
// // // //           method: 'PUT',
// // // //           headers: {
// // // //             'Authorization': `Bearer ${token}`,
// // // //             'Content-Type': 'application/json',
// // // //           },
// // // //           body: JSON.stringify(updatedData),
// // // //           signal: controller.signal
// // // //         }
// // // //       );
      
// // // //       clearTimeout(timeoutId);
      
// // // //       if (!response.ok) {
// // // //         if (response.status === 401) {
// // // //           localStorage.removeItem('token');
// // // //           throw new Error('نشست شما منقضی شده است');
// // // //         }
// // // //         throw new Error(`HTTP ${response.status}`);
// // // //       }
      
// // // //       const result = await response.json();
      
// // // //       if (result.status === 200) {
// // // //         setProperties(prev => prev.map(p => 
// // // //           p.id === selectedProperty.id 
// // // //             ? { 
// // // //                 ...p, 
// // // //                 title: updatedData.title,
// // // //                 price: updatedData.price * 10000,
// // // //                 area: updatedData.area,
// // // //                 address: updatedData.address,
// // // //                 region: updatedData.region,
// // // //                 rooms: updatedData.countRooms,
// // // //                 hasParking: updatedData.isHasParking,
// // // //                 hasElevator: updatedData.isHasElavator,
// // // //                 hasLoan: updatedData.isHasLoan,
// // // //                 countFloor: updatedData.countFloor,
// // // //                 floor: updatedData.floor,
// // // //               } 
// // // //             : p
// // // //         ));
        
// // // //         showToast('آگهی با موفقیت ویرایش شد', 'success');
// // // //         setIsEditModalOpen(false);
// // // //       } else {
// // // //         throw new Error(result.message || 'خطا در ویرایش');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Update error:', error);
// // // //       if (error.name === 'AbortError') {
// // // //         showToast('مدت زمان درخواست به پایان رسید', 'error');
// // // //       } else if (error.message.includes('منقضی')) {
// // // //         showToast('نشست شما منقضی شده است', 'error');
// // // //         setTimeout(() => navigate('/login'), 2000);
// // // //       } else {
// // // //         showToast(error.message || 'خطا در ویرایش آگهی', 'error');
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleStatusChange = async (propertyId, newStatus) => {
// // // //     const token = getToken();
// // // //     if (!token) {
// // // //       showToast('لطفاً ابتدا وارد شوید', 'error');
// // // //       setTimeout(() => navigate('/login'), 2000);
// // // //       return;
// // // //     }
    
// // // //     const persianStatus = mapStatusToPersian(newStatus);
    
// // // //     try {
// // // //       const controller = new AbortController();
// // // //       const timeoutId = setTimeout(() => controller.abort(), 10000);
      
// // // //       const response = await fetch(
// // // //         `https://localhost:7178/api/RealEstate/ChangeStatus/${propertyId}`,
// // // //         {
// // // //           method: 'PATCH',
// // // //           headers: {
// // // //             'Authorization': `Bearer ${token}`,
// // // //             'Content-Type': 'application/json',
// // // //           },
// // // //           body: JSON.stringify({ status: persianStatus }),
// // // //           signal: controller.signal
// // // //         }
// // // //       );
      
// // // //       clearTimeout(timeoutId);
      
// // // //       if (!response.ok) {
// // // //         if (response.status === 401) {
// // // //           localStorage.removeItem('token');
// // // //           throw new Error('نشست شما منقضی شده است');
// // // //         }
// // // //         throw new Error(`HTTP ${response.status}`);
// // // //       }
      
// // // //       const result = await response.json();
      
// // // //       if (result.status === 200) {
// // // //         setProperties(prev => prev.map(p => 
// // // //           p.id === propertyId 
// // // //             ? { 
// // // //                 ...p, 
// // // //                 status: newStatus,
// // // //                 originalStatus: persianStatus
// // // //               } 
// // // //             : p
// // // //         ));
        
// // // //         let message = '';
// // // //         switch(newStatus) {
// // // //           case 'active': message = 'آگهی فعال شد'; break;
// // // //           case 'pending': message = 'آگهی در انتظار تایید قرار گرفت'; break;
// // // //           case 'sold': message = 'آگهی به عنوان فروخته شده ثبت شد'; break;
// // // //           case 'archived': message = 'آگهی بایگانی شد'; break;
// // // //           default: message = 'وضعیت آگهی بروزرسانی شد';
// // // //         }
        
// // // //         showToast(message, 'success');
// // // //       } else {
// // // //         throw new Error(result.message || 'خطا در بروزرسانی وضعیت');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Status change error:', error);
// // // //       if (error.name === 'AbortError') {
// // // //         showToast('مدت زمان درخواست به پایان رسید', 'error');
// // // //       } else if (error.message.includes('منقضی')) {
// // // //         showToast('نشست شما منقضی شده است', 'error');
// // // //         setTimeout(() => navigate('/login'), 2000);
// // // //       } else {
// // // //         showToast(error.message || 'خطا در بروزرسانی وضعیت', 'error');
// // // //       }
// // // //     }
// // // //   };

// // // //   const statistics = {
// // // //     total: properties.length,
// // // //     active: properties.filter(p => p.status === 'active').length,
// // // //     pending: properties.filter(p => p.status === 'pending').length,
// // // //     payment_pending: properties.filter(p => p.status === 'payment_pending').length,
// // // //     sold: properties.filter(p => p.status === 'sold').length,
// // // //     archived: properties.filter(p => p.status === 'archived').length,
// // // //     totalViews: properties.reduce((sum, p) => sum + (p.views || 0), 0),
// // // //   };

// // // //   const filteredProperties = properties.filter(property => {
// // // //     const matchesSearch = property.title?.includes(searchTerm) || 
// // // //                          property.address?.includes(searchTerm) ||
// // // //                          property.region?.includes(searchTerm);
// // // //     const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
// // // //     return matchesSearch && matchesStatus;
// // // //   });

// // // //   const formatPrice = (price) => {
// // // //     if (price >= 1000000000) {
// // // //       return (price / 1000000000).toFixed(1) + ' میلیارد تومان';
// // // //     }
// // // //     if (price >= 1000000) {
// // // //       return (price / 1000000).toFixed(0) + ' میلیون تومان';
// // // //     }
// // // //     return price.toLocaleString() + ' تومان';
// // // //   };

// // // //   const getStatusLabel = (status) => {
// // // //     switch(status) {
// // // //       case 'active': return { text: 'منتشر شده', class: 'status-active', icon: '✅' };
// // // //       case 'pending': return { text: 'در انتظار', class: 'status-pending', icon: '⏳' };
// // // //       case 'payment_pending': return { text: 'در انتظار پرداخت', class: 'status-pending', icon: '💰' };
// // // //       case 'sold': return { text: 'فروخته شده', class: 'status-sold', icon: '💰' };
// // // //       case 'archived': return { text: 'بایگانی شده', class: 'status-archived', icon: '📦' };
// // // //       default: return { text: 'نامشخص', class: 'status-inactive', icon: '❓' };
// // // //     }
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="compact-loading">
// // // //         <div className="compact-spinner"></div>
// // // //         <p>در حال بارگذاری...</p>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="user-properties-compact">
// // // //       {toast && (
// // // //         <div className={`compact-toast ${toast.type}`}>
// // // //           {toast.message}
// // // //         </div>
// // // //       )}

// // // //       {showDeleteConfirm && (
// // // //         <div className="compact-modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
// // // //           <div className="compact-modal" onClick={(e) => e.stopPropagation()}>
// // // //             <div className="compact-modal-icon">🗑</div>
// // // //             <h4>حذف آگهی</h4>
// // // //             <p>آیا از حذف "{showDeleteConfirm.title}" مطمئن هستید؟</p>
// // // //             <div className="compact-modal-actions">
// // // //               <button className="compact-confirm-btn" onClick={confirmDelete}>حذف</button>
// // // //               <button className="compact-cancel-btn" onClick={() => setShowDeleteConfirm(null)}>انصراف</button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       <div className="compact-header">
// // // //         <div>
// // // //           <h2>🏠 املاک من</h2>
// // // //           <p className="compact-subtitle">مدیریت املاک ثبت شده</p>
// // // //         </div>
// // // //         <button className="compact-add-btn" onClick={() => setIsAddModalOpen(true)}>
// // // //           + ثبت ملک جدید
// // // //         </button>
// // // //       </div>

// // // //       <div className="compact-stats">
// // // //         <div className="compact-stat">
// // // //           <span className="compact-stat-icon">🏘</span>
// // // //           <div>
// // // //             <div className="compact-stat-number">{statistics.total}</div>
// // // //             <div className="compact-stat-label">کل املاک</div>
// // // //           </div>
// // // //         </div>
// // // //         <div className="compact-stat">
// // // //           <span className="compact-stat-icon">✅</span>
// // // //           <div>
// // // //             <div className="compact-stat-number">{statistics.active}</div>
// // // //             <div className="compact-stat-label">فعال</div>
// // // //           </div>
// // // //         </div>
// // // //         <div className="compact-stat">
// // // //           <span className="compact-stat-icon">⏳</span>
// // // //           <div>
// // // //             <div className="compact-stat-number">{statistics.pending + statistics.payment_pending}</div>
// // // //             <div className="compact-stat-label">در انتظار</div>
// // // //           </div>
// // // //         </div>
// // // //         <div className="compact-stat">
// // // //           <span className="compact-stat-icon">💰</span>
// // // //           <div>
// // // //             <div className="compact-stat-number">{statistics.sold}</div>
// // // //             <div className="compact-stat-label">فروخته شده</div>
// // // //           </div>
// // // //         </div>
// // // //         <div className="compact-stat">
// // // //           <span className="compact-stat-icon">📦</span>
// // // //           <div>
// // // //             <div className="compact-stat-number">{statistics.archived}</div>
// // // //             <div className="compact-stat-label">بایگانی</div>
// // // //           </div>
// // // //         </div>
// // // //         <div className="compact-stat">
// // // //           <span className="compact-stat-icon">👁</span>
// // // //           <div>
// // // //             <div className="compact-stat-number">{statistics.totalViews}</div>
// // // //             <div className="compact-stat-label">بازدید</div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <div className="compact-toolbar">
// // // //         <div className="compact-search">
// // // //           <input
// // // //             type="text"
// // // //             placeholder="جستجو در املاک..."
// // // //             value={searchTerm}
// // // //             onChange={(e) => setSearchTerm(e.target.value)}
// // // //           />
// // // //           <span>🔍</span>
// // // //         </div>
        
// // // //         <div className="compact-controls">
// // // //           <select 
// // // //             value={statusFilter}
// // // //             onChange={(e) => setStatusFilter(e.target.value)}
// // // //           >
// // // //             <option value="all">همه</option>
// // // //             <option value="active">فعال</option>
// // // //             <option value="pending">در انتظار تایید</option>
// // // //             <option value="payment_pending">در انتظار پرداخت</option>
// // // //             <option value="sold">فروخته شده</option>
// // // //             <option value="archived">بایگانی شده</option>
// // // //           </select>
          
// // // //           <div className="compact-view-toggle">
// // // //             <button 
// // // //               className={viewMode === 'grid' ? 'active' : ''}
// // // //               onClick={() => setViewMode('grid')}
// // // //             >
// // // //               🔲
// // // //             </button>
// // // //             <button 
// // // //               className={viewMode === 'list' ? 'active' : ''}
// // // //               onClick={() => setViewMode('list')}
// // // //             >
// // // //               📋
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {error ? (
// // // //         <div className="compact-error">
// // // //           <p>{error}</p>
// // // //           <button onClick={fetchUserProperties}>تلاش مجدد</button>
// // // //         </div>
// // // //       ) : filteredProperties.length === 0 ? (
// // // //         <div className="compact-empty">
// // // //           <div>🏠</div>
// // // //           <h4>ملکی یافت نشد</h4>
// // // //           <p>هیچ ملکی با این مشخصات وجود ندارد</p>
// // // //           <button onClick={() => navigate('/add-property')}>ثبت ملک جدید</button>
// // // //         </div>
// // // //       ) : (
// // // //         <div className={`compact-properties ${viewMode}`}>
// // // //           {viewMode === 'grid' 
// // // //             ? filteredProperties.map(property => {
// // // //                 const statusInfo = getStatusLabel(property.status);
// // // //                 return (
// // // //                   <div key={property.id} className="compact-card">
// // // //                     <div className="compact-card-image">
// // // //                       <img src={property.images?.[0] || '/api/placeholder/400/300'} alt={property.title} />
// // // //                       <div className={`compact-card-status ${statusInfo.class}`}>
// // // //                         {statusInfo.icon} {statusInfo.text}
// // // //                       </div>
// // // //                     </div>
                    
// // // //                     <div className="compact-card-content">
// // // //                       <h4 className="compact-card-title">{property.title}</h4>
// // // //                       <div className="compact-card-address">{property.address}</div>
// // // //                       <div className="compact-card-price">{formatPrice(property.price)}</div>
                      
// // // //                       <div className="compact-card-features">
// // // //                         <span>📐 {property.area} m²</span>
// // // //                         <span>🛏 {property.rooms} خواب</span>
// // // //                         {property.hasParking && <span>🚗</span>}
// // // //                         {property.hasElevator && <span>🛗</span>}
// // // //                         {property.hasLoan && <span>🏦 تسهیلات</span>}
// // // //                       </div>
                      
// // // //                       <div className="compact-card-stats">
// // // //                         <span>👁 {property.views}</span>
// // // //                         <span>📅 {property.createdAtPersianRelative || new Date(property.createdAt).toLocaleDateString('fa-IR')}</span>
// // // //                       </div>
                      
// // // //                       <div className="compact-card-actions">
// // // //                         <button 
// // // //                           className="compact-status-btn active-btn"
// // // //                           onClick={() => handleStatusChange(property.id, 'active')}
// // // //                           title="فعال"
// // // //                         >
// // // //                           ✅
// // // //                         </button>
// // // //                         <button 
// // // //                           className="compact-status-btn pending-btn"
// // // //                           onClick={() => handleStatusChange(property.id, 'pending')}
// // // //                           title="در انتظار"
// // // //                         >
// // // //                           ⏳
// // // //                         </button>
// // // //                         <button 
// // // //                           className="compact-status-btn sold-btn"
// // // //                           onClick={() => handleStatusChange(property.id, 'sold')}
// // // //                           title="فروخته شده"
// // // //                         >
// // // //                           💰
// // // //                         </button>
// // // //                         <button 
// // // //                           className="compact-status-btn archived-btn"
// // // //                           onClick={() => handleStatusChange(property.id, 'archived')}
// // // //                           title="بایگانی"
// // // //                         >
// // // //                           📦
// // // //                         </button>
// // // //                         <button 
// // // //                           className="compact-edit"
// // // //                           onClick={() => handleEditProperty(property)}
// // // //                           title="ویرایش"
// // // //                         >
// // // //                           ✏️
// // // //                         </button>
// // // //                         <button 
// // // //                           className="compact-delete"
// // // //                           onClick={() => handleDeleteProperty(property)}
// // // //                           title="حذف"
// // // //                         >
// // // //                           🗑
// // // //                         </button>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 );
// // // //               })
// // // //             : filteredProperties.map(property => {
// // // //                 const statusInfo = getStatusLabel(property.status);
// // // //                 return (
// // // //                   <div key={property.id} className="compact-list-item">
// // // //                     <div className="compact-list-image">
// // // //                       <img src={property.images?.[0] || '/api/placeholder/400/300'} alt={property.title} />
// // // //                     </div>
// // // //                     <div className="compact-list-content">
// // // //                       <div className="compact-list-header">
// // // //                         <div>
// // // //                           <h4>{property.title}</h4>
// // // //                           <div className="compact-list-address">{property.address}</div>
// // // //                         </div>
// // // //                         <div className={`compact-list-status ${statusInfo.class}`}>
// // // //                           {statusInfo.icon} {statusInfo.text}
// // // //                         </div>
// // // //                       </div>
                      
// // // //                       <div className="compact-list-info">
// // // //                         <span>{formatPrice(property.price)}</span>
// // // //                         <span>📐 {property.area}m²</span>
// // // //                         <span>🛏 {property.rooms} خواب</span>
// // // //                         <span>👁 {property.views} بازدید</span>
// // // //                       </div>
                      
// // // //                       <div className="compact-list-actions">
// // // //                         <button 
// // // //                           className="compact-status-btn-sm active-btn"
// // // //                           onClick={() => handleStatusChange(property.id, 'active')}
// // // //                           title="فعال"
// // // //                         >
// // // //                           ✅ فعال
// // // //                         </button>
// // // //                         <button 
// // // //                           className="compact-status-btn-sm pending-btn"
// // // //                           onClick={() => handleStatusChange(property.id, 'pending')}
// // // //                           title="در انتظار"
// // // //                         >
// // // //                           ⏳ در انتظار
// // // //                         </button>
// // // //                         <button 
// // // //                           className="compact-status-btn-sm sold-btn"
// // // //                           onClick={() => handleStatusChange(property.id, 'sold')}
// // // //                           title="فروخته شده"
// // // //                         >
// // // //                           💰 فروخته شده
// // // //                         </button>
// // // //                         <button 
// // // //                           className="compact-status-btn-sm archived-btn"
// // // //                           onClick={() => handleStatusChange(property.id, 'archived')}
// // // //                           title="بایگانی"
// // // //                         >
// // // //                           📦 بایگانی
// // // //                         </button>
// // // //                         <button 
// // // //                           className="compact-list-edit"
// // // //                           onClick={() => handleEditProperty(property)}
// // // //                         >
// // // //                           ✏️
// // // //                         </button>
// // // //                         <button 
// // // //                           className="compact-list-delete"
// // // //                           onClick={() => handleDeleteProperty(property)}
// // // //                         >
// // // //                           🗑
// // // //                         </button>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 );
// // // //               })
// // // //           }
// // // //         </div>
// // // //       )}

// // // //       {isEditModalOpen && selectedProperty && (
// // // //         <div className="compact-edit-modal" onClick={() => setIsEditModalOpen(false)}>
// // // //           <div className="compact-edit-content" onClick={(e) => e.stopPropagation()}>
// // // //             <div className="compact-edit-header">
// // // //               <h4>✏️ ویرایش ملک</h4>
// // // //               <button onClick={() => setIsEditModalOpen(false)}>✕</button>
// // // //             </div>
// // // //             <form onSubmit={handleSaveEdit}>
// // // //               <input type="text" name="title" placeholder="عنوان" defaultValue={selectedProperty.title} required />
// // // //               <input type="number" name="price" placeholder="قیمت (تومان)" defaultValue={Math.round(selectedProperty.price / 10000)} required />
// // // //               <input type="number" name="area" placeholder="متراژ" defaultValue={selectedProperty.area} required />
// // // //               <input type="text" name="region" placeholder="منطقه" defaultValue={selectedProperty.region} />
// // // //               <textarea name="address" placeholder="آدرس" rows="2" defaultValue={selectedProperty.address}></textarea>
// // // //               <input type="number" name="rooms" placeholder="تعداد اتاق" defaultValue={selectedProperty.rooms} />
// // // //               <input type="number" name="countFloor" placeholder="تعداد طبقات" defaultValue={selectedProperty.countFloor} />
// // // //               <input type="number" name="floor" placeholder="طبقه" defaultValue={selectedProperty.floor} />
              
// // // //               <div className="compact-checkbox-group">
// // // //                 <label>
// // // //                   <input type="checkbox" name="hasParking" defaultChecked={selectedProperty.hasParking} value="true" />
// // // //                   پارکینگ
// // // //                 </label>
// // // //                 <label>
// // // //                   <input type="checkbox" name="hasElevator" defaultChecked={selectedProperty.hasElevator} value="true" />
// // // //                   آسانسور
// // // //                 </label>
// // // //                 <label>
// // // //                   <input type="checkbox" name="hasLoan" defaultChecked={selectedProperty.hasLoan} value="true" />
// // // //                   تسهیلات بانکی
// // // //                 </label>
// // // //               </div>
              
// // // //               <div className="compact-edit-actions">
// // // //                 <button type="submit" className="compact-save">💾 ذخیره</button>
// // // //                 <button type="button" onClick={() => setIsEditModalOpen(false)}>انصراف</button>
// // // //               </div>
// // // //             </form>
// // // //           </div>
// // // //         </div>
// // // //       )}
      
// // // // {isAddModalOpen && (
// // // //   <AddPropertyModal
// // // //     isOpen={isAddModalOpen}
// // // //     onClose={() => setIsAddModalOpen(false)}
// // // //     onSuccess={() => {
// // // //       fetchUserProperties(); // رفرش لیست املاک
// // // //       showToast('ملک با موفقیت ثبت شد', 'success');
// // // //     }}
// // // //   />
// // // // )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default UserPropertiesPanel;
// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { panelService } from '../../../../services/panelService';
// // // import AddPropertyModal from './AddPropertyModal';
// // // import PaymentModal from './PaymentModal';
// // // import './UserPropertiesPanel.css';

// // // const UserPropertiesPanel = () => {
// // //   const navigate = useNavigate();
// // //   const [properties, setProperties] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [selectedProperty, setSelectedProperty] = useState(null);
// // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// // //   const [viewMode, setViewMode] = useState('grid');
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [statusFilter, setStatusFilter] = useState('all');
// // //   const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
// // //   const [toast, setToast] = useState(null);
// // //   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
// // //   const [selectedPaymentProperty, setSelectedPaymentProperty] = useState(null); // حالت جدید برای پرداخت

// // //   const showToast = (message, type = 'success') => {
// // //     setToast({ message, type });
// // //     setTimeout(() => setToast(null), 3000);
// // //   };

// // //   // دریافت توکن از localStorage
// // //   const getToken = () => {
// // //     const token = localStorage.getItem('token');
// // //     if (!token) {
// // //       console.warn('توکن یافت نشد');
// // //       return null;
// // //     }
// // //     return token;
// // //   };

// // //   const fetchUserProperties = useCallback(async () => {
// // //     setLoading(true);
// // //     setError(null);
    
// // //     const token = getToken();
// // //     if (!token) {
// // //       setError('لطفاً ابتدا وارد شوید');
// // //       setTimeout(() => navigate('/login'), 2000);
// // //       setLoading(false);
// // //       return;
// // //     }
    
// // //     try {
// // //       // استفاده از panelService به جای fetch مستقیم
// // //       const data = await panelService.GetRealEstatePanel();
      
// // //       if (data && Array.isArray(data)) {
// // //         const mappedProperties = data.map(item => ({
// // //           id: item.id,
// // //           title: item.title,
// // //           address: item.address || `${item.region} - آدرس مشخص نشده`,
// // //           price: item.price * 10000,
// // //           area: item.area,
// // //           rooms: item.countRooms,
// // //           hasParking: item.isHasParking,
// // //           hasElevator: item.isHasElavator,
// // //           hasPool: false,
// // //           hasLoan: item.isHasLoan,
// // //           images: (item.images || []).map(img => `https://localhost:7178/${img}`),
// // //           status: mapStatusToEnglish(item.status),
// // //           views: parseInt(item.views) || 0,
// // //           inquiries: 0,
// // //           createdAt: item.createdAt,
// // //           createdAtPersianRelative: item.createdAtPersianRelative,
// // //           region: item.region,
// // //           countFloor: item.countFloor,
// // //           floor: item.floor,
// // //           originalStatus: item.status,
// // //         }));
        
// // //         setProperties(mappedProperties);
// // //       } else {
// // //         setProperties([]);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching user properties:', error);
// // //       if (error.message?.includes('منقضی')) {
// // //         setError(error.message);
// // //         setTimeout(() => navigate('/login'), 2000);
// // //       } else {
// // //         setError(error.message || 'خطا در دریافت اطلاعات املاک شما');
// // //       }
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, [navigate]);

// // //   const mapStatusToEnglish = (persianStatus) => {
// // //     switch(persianStatus) {
// // //       case 'منتشر شد':
// // //       case 'فعال':
// // //         return 'active';
// // //       case 'انتظار':
// // //       case 'در انتظار':
// // //         return 'pending';
// // //       case 'در انتظارپرداخت':
// // //         return 'payment_pending';
// // //       case 'فروخته شده':
// // //         return 'sold';
// // //       case 'بایگانی شده':
// // //         return 'archived';
// // //       default:
// // //         return 'pending';
// // //     }
// // //   };

// // //   const mapStatusToPersian = (englishStatus) => {
// // //     switch(englishStatus) {
// // //       case 'active':
// // //         return 'منتشر شد';
// // //       case 'pending':
// // //         return 'در انتظار';
// // //       case 'payment_pending':
// // //         return 'در انتظار پرداخت';
// // //       case 'sold':
// // //         return 'فروخته شده';
// // //       case 'archived':
// // //         return 'بایگانی شده';
// // //       default:
// // //         return 'نامشخص';
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchUserProperties();
// // //   }, [fetchUserProperties]);

// // //   const handleDeleteProperty = async (property) => {
// // //     setShowDeleteConfirm(property);
// // //   };

// // //   const confirmDelete = async () => {
// // //     const token = getToken();
// // //     if (!token) {
// // //       showToast('لطفاً ابتدا وارد شوید', 'error');
// // //       setTimeout(() => navigate('/login'), 2000);
// // //       setShowDeleteConfirm(null);
// // //       return;
// // //     }
    
// // //     try {
// // //       const controller = new AbortController();
// // //       const timeoutId = setTimeout(() => controller.abort(), 10000);
      
// // //       const response = await fetch(
// // //         `https://localhost:7178/api/RealEstate/DeleteRealEstate/${showDeleteConfirm.id}`,
// // //         { 
// // //           method: 'DELETE',
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`,
// // //             'Content-Type': 'application/json',
// // //           },
// // //           signal: controller.signal 
// // //         }
// // //       );
      
// // //       clearTimeout(timeoutId);
      
// // //       if (!response.ok) {
// // //         if (response.status === 401) {
// // //           localStorage.removeItem('token');
// // //           throw new Error('نشست شما منقضی شده است');
// // //         }
// // //         throw new Error(`HTTP ${response.status}`);
// // //       }
      
// // //       const result = await response.json();
      
// // //       if (result.status === 200) {
// // //         setProperties(prev => prev.filter(p => p.id !== showDeleteConfirm.id));
// // //         showToast('آگهی با موفقیت حذف شد', 'success');
// // //       } else {
// // //         throw new Error(result.message || 'خطا در حذف');
// // //       }
// // //     } catch (error) {
// // //       console.error('Delete error:', error);
// // //       if (error.name === 'AbortError') {
// // //         showToast('مدت زمان درخواست به پایان رسید', 'error');
// // //       } else if (error.message.includes('منقضی')) {
// // //         showToast('نشست شما منقضی شده است', 'error');
// // //         setTimeout(() => navigate('/login'), 2000);
// // //       } else {
// // //         showToast(error.message || 'خطا در حذف آگهی', 'error');
// // //       }
// // //     } finally {
// // //       setShowDeleteConfirm(null);
// // //     }
// // //   };

// // //   const handleEditProperty = (property) => {
// // //     setSelectedProperty(property);
// // //     setIsEditModalOpen(true);
// // //   };

// // //   const handleSaveEdit = async (e) => {
// // //     e.preventDefault();
    
// // //     const token = getToken();
// // //     if (!token) {
// // //       showToast('لطفاً ابتدا وارد شوید', 'error');
// // //       setTimeout(() => navigate('/login'), 2000);
// // //       return;
// // //     }
    
// // //     const formData = new FormData(e.target);
    
// // //     try {
// // //       const controller = new AbortController();
// // //       const timeoutId = setTimeout(() => controller.abort(), 10000);
      
// // //       const updatedData = {
// // //         id: selectedProperty.id,
// // //         title: formData.get('title'),
// // //         price: parseInt(formData.get('price')),
// // //         area: parseInt(formData.get('area')),
// // //         address: formData.get('address'),
// // //         region: formData.get('region'),
// // //         countRooms: parseInt(formData.get('rooms')) || 0,
// // //         isHasParking: formData.get('hasParking') === 'true',
// // //         isHasElavator: formData.get('hasElevator') === 'true',
// // //         isHasLoan: formData.get('hasLoan') === 'true',
// // //         countFloor: parseInt(formData.get('countFloor')) || 0,
// // //         floor: parseInt(formData.get('floor')) || 1,
// // //       };
      
// // //       const response = await fetch(
// // //         `https://localhost:7178/api/RealEstate/UpdateRealEstate/${selectedProperty.id}`,
// // //         {
// // //           method: 'PUT',
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`,
// // //             'Content-Type': 'application/json',
// // //           },
// // //           body: JSON.stringify(updatedData),
// // //           signal: controller.signal
// // //         }
// // //       );
      
// // //       clearTimeout(timeoutId);
      
// // //       if (!response.ok) {
// // //         if (response.status === 401) {
// // //           localStorage.removeItem('token');
// // //           throw new Error('نشست شما منقضی شده است');
// // //         }
// // //         throw new Error(`HTTP ${response.status}`);
// // //       }
      
// // //       const result = await response.json();
      
// // //       if (result.status === 200) {
// // //         setProperties(prev => prev.map(p => 
// // //           p.id === selectedProperty.id 
// // //             ? { 
// // //                 ...p, 
// // //                 title: updatedData.title,
// // //                 price: updatedData.price * 10000,
// // //                 area: updatedData.area,
// // //                 address: updatedData.address,
// // //                 region: updatedData.region,
// // //                 rooms: updatedData.countRooms,
// // //                 hasParking: updatedData.isHasParking,
// // //                 hasElevator: updatedData.isHasElavator,
// // //                 hasLoan: updatedData.isHasLoan,
// // //                 countFloor: updatedData.countFloor,
// // //                 floor: updatedData.floor,
// // //               } 
// // //             : p
// // //         ));
        
// // //         showToast('آگهی با موفقیت ویرایش شد', 'success');
// // //         setIsEditModalOpen(false);
// // //       } else {
// // //         throw new Error(result.message || 'خطا در ویرایش');
// // //       }
// // //     } catch (error) {
// // //       console.error('Update error:', error);
// // //       if (error.name === 'AbortError') {
// // //         showToast('مدت زمان درخواست به پایان رسید', 'error');
// // //       } else if (error.message.includes('منقضی')) {
// // //         showToast('نشست شما منقضی شده است', 'error');
// // //         setTimeout(() => navigate('/login'), 2000);
// // //       } else {
// // //         showToast(error.message || 'خطا در ویرایش آگهی', 'error');
// // //       }
// // //     }
// // //   };

// // //   const handleStatusChange = async (propertyId, newStatus) => {
// // //     const token = getToken();
// // //     if (!token) {
// // //       showToast('لطفاً ابتدا وارد شوید', 'error');
// // //       setTimeout(() => navigate('/login'), 2000);
// // //       return;
// // //     }
    
// // //     const persianStatus = mapStatusToPersian(newStatus);
    
// // //     try {
// // //       const controller = new AbortController();
// // //       const timeoutId = setTimeout(() => controller.abort(), 10000);
      
// // //       const response = await fetch(
// // //         `https://localhost:7178/api/RealEstate/ChangeStatus/${propertyId}`,
// // //         {
// // //           method: 'PATCH',
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`,
// // //             'Content-Type': 'application/json',
// // //           },
// // //           body: JSON.stringify({ status: persianStatus }),
// // //           signal: controller.signal
// // //         }
// // //       );
      
// // //       clearTimeout(timeoutId);
      
// // //       if (!response.ok) {
// // //         if (response.status === 401) {
// // //           localStorage.removeItem('token');
// // //           throw new Error('نشست شما منقضی شده است');
// // //         }
// // //         throw new Error(`HTTP ${response.status}`);
// // //       }
      
// // //       const result = await response.json();
      
// // //       if (result.status === 200) {
// // //         setProperties(prev => prev.map(p => 
// // //           p.id === propertyId 
// // //             ? { 
// // //                 ...p, 
// // //                 status: newStatus,
// // //                 originalStatus: persianStatus
// // //               } 
// // //             : p
// // //         ));
        
// // //         let message = '';
// // //         switch(newStatus) {
// // //           case 'active': message = 'آگهی فعال شد'; break;
// // //           case 'pending': message = 'آگهی در انتظار تایید قرار گرفت'; break;
// // //           case 'sold': message = 'آگهی به عنوان فروخته شده ثبت شد'; break;
// // //           case 'archived': message = 'آگهی بایگانی شد'; break;
// // //           default: message = 'وضعیت آگهی بروزرسانی شد';
// // //         }
        
// // //         showToast(message, 'success');
// // //       } else {
// // //         throw new Error(result.message || 'خطا در بروزرسانی وضعیت');
// // //       }
// // //     } catch (error) {
// // //       console.error('Status change error:', error);
// // //       if (error.name === 'AbortError') {
// // //         showToast('مدت زمان درخواست به پایان رسید', 'error');
// // //       } else if (error.message.includes('منقضی')) {
// // //         showToast('نشست شما منقضی شده است', 'error');
// // //         setTimeout(() => navigate('/login'), 2000);
// // //       } else {
// // //         showToast(error.message || 'خطا در بروزرسانی وضعیت', 'error');
// // //       }
// // //     }
// // //   };

// // //   const statistics = {
// // //     total: properties.length,
// // //     active: properties.filter(p => p.status === 'active').length,
// // //     pending: properties.filter(p => p.status === 'pending').length,
// // //     payment_pending: properties.filter(p => p.status === 'payment_pending').length,
// // //     sold: properties.filter(p => p.status === 'sold').length,
// // //     archived: properties.filter(p => p.status === 'archived').length,
// // //     totalViews: properties.reduce((sum, p) => sum + (p.views || 0), 0),
// // //   };

// // //   const filteredProperties = properties.filter(property => {
// // //     const matchesSearch = property.title?.includes(searchTerm) || 
// // //                          property.address?.includes(searchTerm) ||
// // //                          property.region?.includes(searchTerm);
// // //     const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
// // //     return matchesSearch && matchesStatus;
// // //   });

// // //   const formatPrice = (price) => {
// // //     if (price >= 1000000000) {
// // //       return (price / 1000000000).toFixed(1) + ' میلیارد تومان';
// // //     }
// // //     if (price >= 1000000) {
// // //       return (price / 1000000).toFixed(0) + ' میلیون تومان';
// // //     }
// // //     return price.toLocaleString() + ' تومان';
// // //   };

// // //   const getStatusLabel = (status) => {
// // //     switch(status) {
// // //       case 'active': return { text: 'منتشر شده', class: 'status-active', icon: '✅' };
// // //       case 'pending': return { text: 'در انتظار', class: 'status-pending', icon: '⏳' };
// // //       case 'payment_pending': return { text: 'در انتظار پرداخت', class: 'status-payment-pending', icon: '💰' };
// // //       case 'sold': return { text: 'فروخته شده', class: 'status-sold', icon: '💰' };
// // //       case 'archived': return { text: 'بایگانی شده', class: 'status-archived', icon: '📦' };
// // //       default: return { text: 'نامشخص', class: 'status-inactive', icon: '❓' };
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="compact-loading">
// // //         <div className="compact-spinner"></div>
// // //         <p>در حال بارگذاری...</p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="user-properties-compact">
// // //       {toast && (
// // //         <div className={`compact-toast ${toast.type}`}>
// // //           {toast.message}
// // //         </div>
// // //       )}

// // //       {showDeleteConfirm && (
// // //         <div className="compact-modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
// // //           <div className="compact-modal" onClick={(e) => e.stopPropagation()}>
// // //             <div className="compact-modal-icon">🗑</div>
// // //             <h4>حذف آگهی</h4>
// // //             <p>آیا از حذف "{showDeleteConfirm.title}" مطمئن هستید؟</p>
// // //             <div className="compact-modal-actions">
// // //               <button className="compact-confirm-btn" onClick={confirmDelete}>حذف</button>
// // //               <button className="compact-cancel-btn" onClick={() => setShowDeleteConfirm(null)}>انصراف</button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <div className="compact-header">
// // //         <div>
// // //           <h2>🏠 املاک من</h2>
// // //           <p className="compact-subtitle">مدیریت املاک ثبت شده</p>
// // //         </div>
// // //         <button className="compact-add-btn" onClick={() => setIsAddModalOpen(true)}>
// // //           + ثبت ملک جدید
// // //         </button>
// // //       </div>

// // //       <div className="compact-stats">
// // //         <div className="compact-stat">
// // //           <span className="compact-stat-icon">🏘</span>
// // //           <div>
// // //             <div className="compact-stat-number">{statistics.total}</div>
// // //             <div className="compact-stat-label">کل املاک</div>
// // //           </div>
// // //         </div>
// // //         <div className="compact-stat">
// // //           <span className="compact-stat-icon">✅</span>
// // //           <div>
// // //             <div className="compact-stat-number">{statistics.active}</div>
// // //             <div className="compact-stat-label">فعال</div>
// // //           </div>
// // //         </div>
// // //         <div className="compact-stat">
// // //           <span className="compact-stat-icon">⏳</span>
// // //           <div>
// // //             <div className="compact-stat-number">{statistics.pending}</div>
// // //             <div className="compact-stat-label">در انتظار</div>
// // //           </div>
// // //         </div>
// // //         <div className="compact-stat">
// // //           <span className="compact-stat-icon">💰</span>
// // //           <div>
// // //             <div className="compact-stat-number">{statistics.payment_pending}</div>
// // //             <div className="compact-stat-label">در انتظار پرداخت</div>
// // //           </div>
// // //         </div>
// // //         <div className="compact-stat">
// // //           <span className="compact-stat-icon">💰</span>
// // //           <div>
// // //             <div className="compact-stat-number">{statistics.sold}</div>
// // //             <div className="compact-stat-label">فروخته شده</div>
// // //           </div>
// // //         </div>
// // //         <div className="compact-stat">
// // //           <span className="compact-stat-icon">📦</span>
// // //           <div>
// // //             <div className="compact-stat-number">{statistics.archived}</div>
// // //             <div className="compact-stat-label">بایگانی</div>
// // //           </div>
// // //         </div>
// // //         <div className="compact-stat">
// // //           <span className="compact-stat-icon">👁</span>
// // //           <div>
// // //             <div className="compact-stat-number">{statistics.totalViews}</div>
// // //             <div className="compact-stat-label">بازدید</div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="compact-toolbar">
// // //         <div className="compact-search">
// // //           <input
// // //             type="text"
// // //             placeholder="جستجو در املاک..."
// // //             value={searchTerm}
// // //             onChange={(e) => setSearchTerm(e.target.value)}
// // //           />
// // //           <span>🔍</span>
// // //         </div>
        
// // //         <div className="compact-controls">
// // //           <select 
// // //             value={statusFilter}
// // //             onChange={(e) => setStatusFilter(e.target.value)}
// // //           >
// // //             <option value="all">همه</option>
// // //             <option value="active">فعال</option>
// // //             <option value="pending">در انتظار تایید</option>
// // //             <option value="payment_pending">در انتظار پرداخت</option>
// // //             <option value="sold">فروخته شده</option>
// // //             <option value="archived">بایگانی شده</option>
// // //           </select>
          
// // //           <div className="compact-view-toggle">
// // //             <button 
// // //               className={viewMode === 'grid' ? 'active' : ''}
// // //               onClick={() => setViewMode('grid')}
// // //             >
// // //               🔲
// // //             </button>
// // //             <button 
// // //               className={viewMode === 'list' ? 'active' : ''}
// // //               onClick={() => setViewMode('list')}
// // //             >
// // //               📋
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {error ? (
// // //         <div className="compact-error">
// // //           <p>{error}</p>
// // //           <button onClick={fetchUserProperties}>تلاش مجدد</button>
// // //         </div>
// // //       ) : filteredProperties.length === 0 ? (
// // //         <div className="compact-empty">
// // //           <div>🏠</div>
// // //           <h4>ملکی یافت نشد</h4>
// // //           <p>هیچ ملکی با این مشخصات وجود ندارد</p>
// // //           <button onClick={() => navigate('/add-property')}>ثبت ملک جدید</button>
// // //         </div>
// // //       ) : (
// // //         <div className={`compact-properties ${viewMode}`}>
// // //           {viewMode === 'grid' 
// // //             ? filteredProperties.map(property => {
// // //                 const statusInfo = getStatusLabel(property.status);
// // //                 return (
// // //                   <div key={property.id} className="compact-card">
// // //                     <div className="compact-card-image">
// // //                       <img src={property.images?.[0] || '/api/placeholder/400/300'} alt={property.title} />
// // //                       <div className={`compact-card-status ${statusInfo.class}`}>
// // //                         {statusInfo.icon} {statusInfo.text}
// // //                       </div>
// // //                     </div>
                    
// // //                     <div className="compact-card-content">
// // //                       <h4 className="compact-card-title">{property.title}</h4>
// // //                       <div className="compact-card-address">{property.address}</div>
// // //                       <div className="compact-card-price">{formatPrice(property.price)}</div>
                      
// // //                       <div className="compact-card-features">
// // //                         <span>📐 {property.area} m²</span>
// // //                         <span>🛏 {property.rooms} خواب</span>
// // //                         {property.hasParking && <span>🚗</span>}
// // //                         {property.hasElevator && <span>🛗</span>}
// // //                         {property.hasLoan && <span>🏦 تسهیلات</span>}
// // //                       </div>
                      
// // //                       <div className="compact-card-stats">
// // //                         <span>👁 {property.views}</span>
// // //                         <span>📅 {property.createdAtPersianRelative || new Date(property.createdAt).toLocaleDateString('fa-IR')}</span>
// // //                       </div>
                      
// // //                       <div className="compact-card-actions">
// // //                         <button 
// // //                           className="compact-status-btn active-btn"
// // //                           onClick={() => handleStatusChange(property.id, 'active')}
// // //                           title="فعال"
// // //                         >
// // //                           ✅
// // //                         </button>
// // //                         <button 
// // //                           className="compact-status-btn pending-btn"
// // //                           onClick={() => handleStatusChange(property.id, 'pending')}
// // //                           title="در انتظار"
// // //                         >
// // //                           ⏳
// // //                         </button>
// // //                         <button 
// // //                           className="compact-status-btn sold-btn"
// // //                           onClick={() => handleStatusChange(property.id, 'sold')}
// // //                           title="فروخته شده"
// // //                         >
// // //                           💰
// // //                         </button>
// // //                         <button 
// // //                           className="compact-status-btn archived-btn"
// // //                           onClick={() => handleStatusChange(property.id, 'archived')}
// // //                           title="بایگانی"
// // //                         >
// // //                           📦
// // //                         </button>
// // //                         {/* دکمه پرداخت - فقط برای وضعیت در انتظار پرداخت نمایش داده می‌شود */}
// // //                         {property.status === 'payment_pending' && (
// // //                           <button 
// // //                             className="compact-payment-btn"
// // //                             onClick={() => setSelectedPaymentProperty(property)}
// // //                             title="پرداخت و فعال‌سازی"
// // //                           >
// // //                             💳
// // //                           </button>
// // //                         )}
// // //                         <button 
// // //                           className="compact-edit"
// // //                           onClick={() => handleEditProperty(property)}
// // //                           title="ویرایش"
// // //                         >
// // //                           ✏️
// // //                         </button>
// // //                         <button 
// // //                           className="compact-delete"
// // //                           onClick={() => handleDeleteProperty(property)}
// // //                           title="حذف"
// // //                         >
// // //                           🗑
// // //                         </button>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 );
// // //               })
// // //             : filteredProperties.map(property => {
// // //                 const statusInfo = getStatusLabel(property.status);
// // //                 return (
// // //                   <div key={property.id} className="compact-list-item">
// // //                     <div className="compact-list-image">
// // //                       <img src={property.images?.[0] || '/api/placeholder/400/300'} alt={property.title} />
// // //                     </div>
// // //                     <div className="compact-list-content">
// // //                       <div className="compact-list-header">
// // //                         <div>
// // //                           <h4>{property.title}</h4>
// // //                           <div className="compact-list-address">{property.address}</div>
// // //                         </div>
// // //                         <div className={`compact-list-status ${statusInfo.class}`}>
// // //                           {statusInfo.icon} {statusInfo.text}
// // //                         </div>
// // //                       </div>
                      
// // //                       <div className="compact-list-info">
// // //                         <span>{formatPrice(property.price)}</span>
// // //                         <span>📐 {property.area}m²</span>
// // //                         <span>🛏 {property.rooms} خواب</span>
// // //                         <span>👁 {property.views} بازدید</span>
// // //                       </div>
                      
// // //                       <div className="compact-list-actions">
// // //                         <button 
// // //                           className="compact-status-btn-sm active-btn"
// // //                           onClick={() => handleStatusChange(property.id, 'active')}
// // //                           title="فعال"
// // //                         >
// // //                           ✅ فعال
// // //                         </button>
// // //                         <button 
// // //                           className="compact-status-btn-sm pending-btn"
// // //                           onClick={() => handleStatusChange(property.id, 'pending')}
// // //                           title="در انتظار"
// // //                         >
// // //                           ⏳ در انتظار
// // //                         </button>
// // //                         <button 
// // //                           className="compact-status-btn-sm sold-btn"
// // //                           onClick={() => handleStatusChange(property.id, 'sold')}
// // //                           title="فروخته شده"
// // //                         >
// // //                           💰 فروخته شده
// // //                         </button>
// // //                         <button 
// // //                           className="compact-status-btn-sm archived-btn"
// // //                           onClick={() => handleStatusChange(property.id, 'archived')}
// // //                           title="بایگانی"
// // //                         >
// // //                           📦 بایگانی
// // //                         </button>
// // //                         {/* دکمه پرداخت - فقط برای وضعیت در انتظار پرداخت نمایش داده می‌شود */}
// // //                         {property.status === 'payment_pending' && (
// // //                           <button 
// // //                             className="compact-payment-btn-sm"
// // //                             onClick={() => setSelectedPaymentProperty(property)}
// // //                             title="پرداخت و فعال‌سازی"
// // //                           >
// // //                             💳 پرداخت
// // //                           </button>
// // //                         )}
// // //                         <button 
// // //                           className="compact-list-edit"
// // //                           onClick={() => handleEditProperty(property)}
// // //                         >
// // //                           ✏️
// // //                         </button>
// // //                         <button 
// // //                           className="compact-list-delete"
// // //                           onClick={() => handleDeleteProperty(property)}
// // //                         >
// // //                           🗑
// // //                         </button>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 );
// // //               })
// // //           }
// // //         </div>
// // //       )}

// // //       {isEditModalOpen && selectedProperty && (
// // //         <div className="compact-edit-modal" onClick={() => setIsEditModalOpen(false)}>
// // //           <div className="compact-edit-content" onClick={(e) => e.stopPropagation()}>
// // //             <div className="compact-edit-header">
// // //               <h4>✏️ ویرایش ملک</h4>
// // //               <button onClick={() => setIsEditModalOpen(false)}>✕</button>
// // //             </div>
// // //             <form onSubmit={handleSaveEdit}>
// // //               <input type="text" name="title" placeholder="عنوان" defaultValue={selectedProperty.title} required />
// // //               <input type="number" name="price" placeholder="قیمت (تومان)" defaultValue={Math.round(selectedProperty.price / 10000)} required />
// // //               <input type="number" name="area" placeholder="متراژ" defaultValue={selectedProperty.area} required />
// // //               <input type="text" name="region" placeholder="منطقه" defaultValue={selectedProperty.region} />
// // //               <textarea name="address" placeholder="آدرس" rows="2" defaultValue={selectedProperty.address}></textarea>
// // //               <input type="number" name="rooms" placeholder="تعداد اتاق" defaultValue={selectedProperty.rooms} />
// // //               <input type="number" name="countFloor" placeholder="تعداد طبقات" defaultValue={selectedProperty.countFloor} />
// // //               <input type="number" name="floor" placeholder="طبقه" defaultValue={selectedProperty.floor} />
              
// // //               <div className="compact-checkbox-group">
// // //                 <label>
// // //                   <input type="checkbox" name="hasParking" defaultChecked={selectedProperty.hasParking} value="true" />
// // //                   پارکینگ
// // //                 </label>
// // //                 <label>
// // //                   <input type="checkbox" name="hasElevator" defaultChecked={selectedProperty.hasElevator} value="true" />
// // //                   آسانسور
// // //                 </label>
// // //                 <label>
// // //                   <input type="checkbox" name="hasLoan" defaultChecked={selectedProperty.hasLoan} value="true" />
// // //                   تسهیلات بانکی
// // //                 </label>
// // //               </div>
              
// // //               <div className="compact-edit-actions">
// // //                 <button type="submit" className="compact-save">💾 ذخیره</button>
// // //                 <button type="button" onClick={() => setIsEditModalOpen(false)}>انصراف</button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       )}
      
// // //       {isAddModalOpen && (
// // //         <AddPropertyModal
// // //           isOpen={isAddModalOpen}
// // //           onClose={() => setIsAddModalOpen(false)}
// // //           onSuccess={() => {
// // //             fetchUserProperties(); // رفرش لیست املاک
// // //             showToast('ملک با موفقیت ثبت شد', 'success');
// // //           }}
// // //         />
// // //       )}

// // //       {/* مودال پرداخت */}
// // //       {selectedPaymentProperty && (
// // //         <PaymentModal
// // //           isOpen={!!selectedPaymentProperty}
// // //           onClose={() => setSelectedPaymentProperty(null)}
// // //           property={selectedPaymentProperty}
// // //           onSuccess={() => {
// // //             fetchUserProperties();
// // //             showToast('پرداخت با موفقیت انجام شد و آگهی شما فعال گردید', 'success');
// // //           }}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default UserPropertiesPanel;

// // import React, { useState, useEffect, useCallback } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { panelService } from '../../../../services/panelService';
// // import AddPropertyModal from './AddPropertyModal';
// // import PaymentModal from './PaymentModal';
// // import './UserPropertiesPanel.css';

// // const UserPropertiesPanel = () => {
// //   const navigate = useNavigate();
// //   const [properties, setProperties] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [selectedProperty, setSelectedProperty] = useState(null);
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// //   const [viewMode, setViewMode] = useState('grid');
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [statusFilter, setStatusFilter] = useState('all');
// //   const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
// //   const [toast, setToast] = useState(null);
// //   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
// //   const [selectedPaymentProperty, setSelectedPaymentProperty] = useState(null);
// //   const [paymentResult, setPaymentResult] = useState(null);
// //   const [showPaymentResult, setShowPaymentResult] = useState(false);

// //   const showToast = (message, type = 'success') => {
// //     setToast({ message, type });
// //     setTimeout(() => setToast(null), 3000);
// //   };

// //   // دریافت توکن از localStorage
// //   const getToken = () => {
// //     const token = localStorage.getItem('token');
// //     if (!token) {
// //       console.warn('توکن یافت نشد');
// //       return null;
// //     }
// //     return token;
// //   };

// //   const fetchUserProperties = useCallback(async () => {
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
// //       const data = await panelService.GetRealEstatePanel();
      
// //       if (data && Array.isArray(data)) {
// //         const mappedProperties = data.map(item => ({
// //           id: item.id,
// //           title: item.title,
// //           address: item.address || `${item.region} - آدرس مشخص نشده`,
// //           price: item.price * 10000,
// //           area: item.area,
// //           rooms: item.countRooms,
// //           hasParking: item.isHasParking,
// //           hasElevator: item.isHasElavator,
// //           hasPool: false,
// //           hasLoan: item.isHasLoan,
// //           images: (item.images || []).map(img => `https://localhost:7178/${img}`),
// //           status: mapStatusToEnglish(item.status),
// //           views: parseInt(item.views) || 0,
// //           inquiries: 0,
// //           createdAt: item.createdAt,
// //           createdAtPersianRelative: item.createdAtPersianRelative,
// //           region: item.region,
// //           countFloor: item.countFloor,
// //           floor: item.floor,
// //           originalStatus: item.status,
// //         }));
        
// //         setProperties(mappedProperties);
// //       } else {
// //         setProperties([]);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching user properties:', error);
// //       if (error.message?.includes('منقضی')) {
// //         setError(error.message);
// //         setTimeout(() => navigate('/login'), 2000);
// //       } else {
// //         setError(error.message || 'خطا در دریافت اطلاعات املاک شما');
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [navigate]);

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

// //   const mapStatusToPersian = (englishStatus) => {
// //     switch(englishStatus) {
// //       case 'active':
// //         return 'منتشر شد';
// //       case 'pending':
// //         return 'در انتظار';
// //       case 'payment_pending':
// //         return 'در انتظار پرداخت';
// //       case 'sold':
// //         return 'فروخته شده';
// //       case 'archived':
// //         return 'بایگانی شده';
// //       default:
// //         return 'نامشخص';
// //     }
// //   };

// //   // بررسی نتیجه پرداخت در بازگشت از درگاه
// //   useEffect(() => {
// //     const checkPaymentCallback = async () => {
// //       const urlParams = new URLSearchParams(window.location.search);
// //       const status = urlParams.get('status');
// //       const authority = urlParams.get('authority');
// //       const paymentId = urlParams.get('paymentId');
// //       const refId = urlParams.get('refId');
      
// //       // بررسی اینکه آیا از درگاه پرداخت برگشته است
// //       const paymentInitiated = sessionStorage.getItem('paymentInitiated');
      
// //       if (paymentInitiated === 'true' && status) {
// //         // پاک کردن فلگ پرداخت
// //         sessionStorage.removeItem('paymentInitiated');
        
// //         const pendingPaymentStr = sessionStorage.getItem('pendingPayment');
// //         const pendingPayment = pendingPaymentStr ? JSON.parse(pendingPaymentStr) : null;
        
// //         if (status === 'success' && refId) {
// //           // پرداخت موفق
// //           setPaymentResult({
// //             success: true,
// //             message: 'پرداخت با موفقیت انجام شد. آگهی شما فعال گردید.',
// //             refId: refId
// //           });
// //           setShowPaymentResult(true);
          
// //           // حذف اطلاعات موقت
// //           sessionStorage.removeItem('pendingPayment');
// //           sessionStorage.removeItem('currentPaymentId');
// //           sessionStorage.removeItem('currentPropertyId');
          
// //           // رفرش لیست املاک
// //           await fetchUserProperties();
          
// //           // حذف پارامترهای URL بدون رفرش صفحه
// //           window.history.replaceState({}, document.title, window.location.pathname);
// //         } else if (status === 'failed') {
// //           // پرداخت ناموفق
// //           setPaymentResult({
// //             success: false,
// //             message: 'پرداخت ناموفق بود. لطفاً مجدداً تلاش کنید.',
// //             refId: null
// //           });
// //           setShowPaymentResult(true);
          
// //           // حذف اطلاعات موقت
// //           sessionStorage.removeItem('pendingPayment');
// //           sessionStorage.removeItem('currentPaymentId');
// //           sessionStorage.removeItem('currentPropertyId');
          
// //           // حذف پارامترهای URL بدون رفرش صفحه
// //           window.history.replaceState({}, document.title, window.location.pathname);
// //         } else if (status === 'notfound') {
// //           setPaymentResult({
// //             success: false,
// //             message: 'اطلاعات پرداخت یافت نشد.',
// //             refId: null
// //           });
// //           setShowPaymentResult(true);
// //           window.history.replaceState({}, document.title, window.location.pathname);
// //         }
// //       }
// //     };
    
// //     checkPaymentCallback();
// //   }, [fetchUserProperties]);

// //   useEffect(() => {
// //     fetchUserProperties();
// //   }, [fetchUserProperties]);

// //   const handleDeleteProperty = async (property) => {
// //     setShowDeleteConfirm(property);
// //   };

// //   const confirmDelete = async () => {
// //     const token = getToken();
// //     if (!token) {
// //       showToast('لطفاً ابتدا وارد شوید', 'error');
// //       setTimeout(() => navigate('/login'), 2000);
// //       setShowDeleteConfirm(null);
// //       return;
// //     }
    
// //     try {
// //       const controller = new AbortController();
// //       const timeoutId = setTimeout(() => controller.abort(), 10000);
      
// //       const response = await fetch(
// //         `https://localhost:7178/api/RealEstate/DeleteRealEstate/${showDeleteConfirm.id}`,
// //         { 
// //           method: 'DELETE',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           },
// //           signal: controller.signal 
// //         }
// //       );
      
// //       clearTimeout(timeoutId);
      
// //       if (!response.ok) {
// //         if (response.status === 401) {
// //           localStorage.removeItem('token');
// //           throw new Error('نشست شما منقضی شده است');
// //         }
// //         throw new Error(`HTTP ${response.status}`);
// //       }
      
// //       const result = await response.json();
      
// //       if (result.status === 200) {
// //         setProperties(prev => prev.filter(p => p.id !== showDeleteConfirm.id));
// //         showToast('آگهی با موفقیت حذف شد', 'success');
// //       } else {
// //         throw new Error(result.message || 'خطا در حذف');
// //       }
// //     } catch (error) {
// //       console.error('Delete error:', error);
// //       if (error.name === 'AbortError') {
// //         showToast('مدت زمان درخواست به پایان رسید', 'error');
// //       } else if (error.message.includes('منقضی')) {
// //         showToast('نشست شما منقضی شده است', 'error');
// //         setTimeout(() => navigate('/login'), 2000);
// //       } else {
// //         showToast(error.message || 'خطا در حذف آگهی', 'error');
// //       }
// //     } finally {
// //       setShowDeleteConfirm(null);
// //     }
// //   };

// //   const handleEditProperty = (property) => {
// //     setSelectedProperty(property);
// //     setIsEditModalOpen(true);
// //   };

// //   const handleSaveEdit = async (e) => {
// //     e.preventDefault();
    
// //     const token = getToken();
// //     if (!token) {
// //       showToast('لطفاً ابتدا وارد شوید', 'error');
// //       setTimeout(() => navigate('/login'), 2000);
// //       return;
// //     }
    
// //     const formData = new FormData(e.target);
    
// //     try {
// //       const controller = new AbortController();
// //       const timeoutId = setTimeout(() => controller.abort(), 10000);
      
// //       const updatedData = {
// //         id: selectedProperty.id,
// //         title: formData.get('title'),
// //         price: parseInt(formData.get('price')),
// //         area: parseInt(formData.get('area')),
// //         address: formData.get('address'),
// //         region: formData.get('region'),
// //         countRooms: parseInt(formData.get('rooms')) || 0,
// //         isHasParking: formData.get('hasParking') === 'true',
// //         isHasElavator: formData.get('hasElevator') === 'true',
// //         isHasLoan: formData.get('hasLoan') === 'true',
// //         countFloor: parseInt(formData.get('countFloor')) || 0,
// //         floor: parseInt(formData.get('floor')) || 1,
// //       };
      
// //       const response = await fetch(
// //         `https://localhost:7178/api/RealEstate/UpdateRealEstate/${selectedProperty.id}`,
// //         {
// //           method: 'PUT',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(updatedData),
// //           signal: controller.signal
// //         }
// //       );
      
// //       clearTimeout(timeoutId);
      
// //       if (!response.ok) {
// //         if (response.status === 401) {
// //           localStorage.removeItem('token');
// //           throw new Error('نشست شما منقضی شده است');
// //         }
// //         throw new Error(`HTTP ${response.status}`);
// //       }
      
// //       const result = await response.json();
      
// //       if (result.status === 200) {
// //         setProperties(prev => prev.map(p => 
// //           p.id === selectedProperty.id 
// //             ? { 
// //                 ...p, 
// //                 title: updatedData.title,
// //                 price: updatedData.price * 10000,
// //                 area: updatedData.area,
// //                 address: updatedData.address,
// //                 region: updatedData.region,
// //                 rooms: updatedData.countRooms,
// //                 hasParking: updatedData.isHasParking,
// //                 hasElevator: updatedData.isHasElavator,
// //                 hasLoan: updatedData.isHasLoan,
// //                 countFloor: updatedData.countFloor,
// //                 floor: updatedData.floor,
// //               } 
// //             : p
// //         ));
        
// //         showToast('آگهی با موفقیت ویرایش شد', 'success');
// //         setIsEditModalOpen(false);
// //       } else {
// //         throw new Error(result.message || 'خطا در ویرایش');
// //       }
// //     } catch (error) {
// //       console.error('Update error:', error);
// //       if (error.name === 'AbortError') {
// //         showToast('مدت زمان درخواست به پایان رسید', 'error');
// //       } else if (error.message.includes('منقضی')) {
// //         showToast('نشست شما منقضی شده است', 'error');
// //         setTimeout(() => navigate('/login'), 2000);
// //       } else {
// //         showToast(error.message || 'خطا در ویرایش آگهی', 'error');
// //       }
// //     }
// //   };

// //   const handleStatusChange = async (propertyId, newStatus) => {
// //     const token = getToken();
// //     if (!token) {
// //       showToast('لطفاً ابتدا وارد شوید', 'error');
// //       setTimeout(() => navigate('/login'), 2000);
// //       return;
// //     }
    
// //     const persianStatus = mapStatusToPersian(newStatus);
    
// //     try {
// //       const controller = new AbortController();
// //       const timeoutId = setTimeout(() => controller.abort(), 10000);
      
// //       const response = await fetch(
// //         `https://localhost:7178/api/RealEstate/ChangeStatus/${propertyId}`,
// //         {
// //           method: 'PATCH',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify({ status: persianStatus }),
// //           signal: controller.signal
// //         }
// //       );
      
// //       clearTimeout(timeoutId);
      
// //       if (!response.ok) {
// //         if (response.status === 401) {
// //           localStorage.removeItem('token');
// //           throw new Error('نشست شما منقضی شده است');
// //         }
// //         throw new Error(`HTTP ${response.status}`);
// //       }
      
// //       const result = await response.json();
      
// //       if (result.status === 200) {
// //         setProperties(prev => prev.map(p => 
// //           p.id === propertyId 
// //             ? { 
// //                 ...p, 
// //                 status: newStatus,
// //                 originalStatus: persianStatus
// //               } 
// //             : p
// //         ));
        
// //         let message = '';
// //         switch(newStatus) {
// //           case 'active': message = 'آگهی فعال شد'; break;
// //           case 'pending': message = 'آگهی در انتظار تایید قرار گرفت'; break;
// //           case 'sold': message = 'آگهی به عنوان فروخته شده ثبت شد'; break;
// //           case 'archived': message = 'آگهی بایگانی شد'; break;
// //           default: message = 'وضعیت آگهی بروزرسانی شد';
// //         }
        
// //         showToast(message, 'success');
// //       } else {
// //         throw new Error(result.message || 'خطا در بروزرسانی وضعیت');
// //       }
// //     } catch (error) {
// //       console.error('Status change error:', error);
// //       if (error.name === 'AbortError') {
// //         showToast('مدت زمان درخواست به پایان رسید', 'error');
// //       } else if (error.message.includes('منقضی')) {
// //         showToast('نشست شما منقضی شده است', 'error');
// //         setTimeout(() => navigate('/login'), 2000);
// //       } else {
// //         showToast(error.message || 'خطا در بروزرسانی وضعیت', 'error');
// //       }
// //     }
// //   };

// //   const statistics = {
// //     total: properties.length,
// //     active: properties.filter(p => p.status === 'active').length,
// //     pending: properties.filter(p => p.status === 'pending').length,
// //     payment_pending: properties.filter(p => p.status === 'payment_pending').length,
// //     sold: properties.filter(p => p.status === 'sold').length,
// //     archived: properties.filter(p => p.status === 'archived').length,
// //     totalViews: properties.reduce((sum, p) => sum + (p.views || 0), 0),
// //   };

// //   const filteredProperties = properties.filter(property => {
// //     const matchesSearch = property.title?.includes(searchTerm) || 
// //                          property.address?.includes(searchTerm) ||
// //                          property.region?.includes(searchTerm);
// //     const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
// //     return matchesSearch && matchesStatus;
// //   });

// //   const formatPrice = (price) => {
// //     if (price >= 1000000000) {
// //       return (price / 1000000000).toFixed(1) + ' میلیارد تومان';
// //     }
// //     if (price >= 1000000) {
// //       return (price / 1000000).toFixed(0) + ' میلیون تومان';
// //     }
// //     return price.toLocaleString() + ' تومان';
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

// //   if (loading) {
// //     return (
// //       <div className="compact-loading">
// //         <div className="compact-spinner"></div>
// //         <p>در حال بارگذاری...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="user-properties-compact">
// //       {toast && (
// //         <div className={`compact-toast ${toast.type}`}>
// //           {toast.message}
// //         </div>
// //       )}

// //       {showDeleteConfirm && (
// //         <div className="compact-modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
// //           <div className="compact-modal" onClick={(e) => e.stopPropagation()}>
// //             <div className="compact-modal-icon">🗑</div>
// //             <h4>حذف آگهی</h4>
// //             <p>آیا از حذف "{showDeleteConfirm.title}" مطمئن هستید؟</p>
// //             <div className="compact-modal-actions">
// //               <button className="compact-confirm-btn" onClick={confirmDelete}>حذف</button>
// //               <button className="compact-cancel-btn" onClick={() => setShowDeleteConfirm(null)}>انصراف</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* مودال نمایش نتیجه پرداخت */}
// //       {showPaymentResult && paymentResult && (
// //         <div className="compact-modal-overlay" onClick={() => {
// //           setShowPaymentResult(false);
// //           setPaymentResult(null);
// //         }}>
// //           <div className="compact-modal payment-result-modal" onClick={(e) => e.stopPropagation()}>
// //             <div className={`result-icon ${paymentResult.success ? 'success' : 'error'}`}>
// //               {paymentResult.success ? '✅' : '❌'}
// //             </div>
// //             <h3>{paymentResult.success ? 'پرداخت موفقیت آمیز بود' : 'پرداخت ناموفق بود'}</h3>
// //             <p>{paymentResult.message}</p>
// //             {paymentResult.refId && (
// //               <div className="ref-id">
// //                 <span>شماره پیگیری:</span>
// //                 <strong>{paymentResult.refId}</strong>
// //               </div>
// //             )}
// //             <button 
// //               className="compact-close-result" 
// //               onClick={() => {
// //                 setShowPaymentResult(false);
// //                 setPaymentResult(null);
// //               }}
// //             >
// //               بستن
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       <div className="compact-header">
// //         <div>
// //           <h2>🏠 املاک من</h2>
// //           <p className="compact-subtitle">مدیریت املاک ثبت شده</p>
// //         </div>
// //         <button className="compact-add-btn" onClick={() => setIsAddModalOpen(true)}>
// //           + ثبت ملک جدید
// //         </button>
// //       </div>

// //       <div className="compact-stats">
// //         <div className="compact-stat">
// //           <span className="compact-stat-icon">🏘</span>
// //           <div>
// //             <div className="compact-stat-number">{statistics.total}</div>
// //             <div className="compact-stat-label">کل املاک</div>
// //           </div>
// //         </div>
// //         <div className="compact-stat">
// //           <span className="compact-stat-icon">✅</span>
// //           <div>
// //             <div className="compact-stat-number">{statistics.active}</div>
// //             <div className="compact-stat-label">فعال</div>
// //           </div>
// //         </div>
// //         <div className="compact-stat">
// //           <span className="compact-stat-icon">⏳</span>
// //           <div>
// //             <div className="compact-stat-number">{statistics.pending}</div>
// //             <div className="compact-stat-label">در انتظار</div>
// //           </div>
// //         </div>
// //         <div className="compact-stat">
// //           <span className="compact-stat-icon">💰</span>
// //           <div>
// //             <div className="compact-stat-number">{statistics.payment_pending}</div>
// //             <div className="compact-stat-label">در انتظار پرداخت</div>
// //           </div>
// //         </div>
// //         <div className="compact-stat">
// //           <span className="compact-stat-icon">💰</span>
// //           <div>
// //             <div className="compact-stat-number">{statistics.sold}</div>
// //             <div className="compact-stat-label">فروخته شده</div>
// //           </div>
// //         </div>
// //         <div className="compact-stat">
// //           <span className="compact-stat-icon">📦</span>
// //           <div>
// //             <div className="compact-stat-number">{statistics.archived}</div>
// //             <div className="compact-stat-label">بایگانی</div>
// //           </div>
// //         </div>
// //         <div className="compact-stat">
// //           <span className="compact-stat-icon">👁</span>
// //           <div>
// //             <div className="compact-stat-number">{statistics.totalViews}</div>
// //             <div className="compact-stat-label">بازدید</div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="compact-toolbar">
// //         <div className="compact-search">
// //           <input
// //             type="text"
// //             placeholder="جستجو در املاک..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //           <span>🔍</span>
// //         </div>
        
// //         <div className="compact-controls">
// //           <select 
// //             value={statusFilter}
// //             onChange={(e) => setStatusFilter(e.target.value)}
// //           >
// //             <option value="all">همه</option>
// //             <option value="active">فعال</option>
// //             <option value="pending">در انتظار تایید</option>
// //             <option value="payment_pending">در انتظار پرداخت</option>
// //             <option value="sold">فروخته شده</option>
// //             <option value="archived">بایگانی شده</option>
// //           </select>
          
// //           <div className="compact-view-toggle">
// //             <button 
// //               className={viewMode === 'grid' ? 'active' : ''}
// //               onClick={() => setViewMode('grid')}
// //             >
// //               🔲
// //             </button>
// //             <button 
// //               className={viewMode === 'list' ? 'active' : ''}
// //               onClick={() => setViewMode('list')}
// //             >
// //               📋
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {error ? (
// //         <div className="compact-error">
// //           <p>{error}</p>
// //           <button onClick={fetchUserProperties}>تلاش مجدد</button>
// //         </div>
// //       ) : filteredProperties.length === 0 ? (
// //         <div className="compact-empty">
// //           <div>🏠</div>
// //           <h4>ملکی یافت نشد</h4>
// //           <p>هیچ ملکی با این مشخصات وجود ندارد</p>
// //           <button onClick={() => navigate('/add-property')}>ثبت ملک جدید</button>
// //         </div>
// //       ) : (
// //         <div className={`compact-properties ${viewMode}`}>
// //           {viewMode === 'grid' 
// //             ? filteredProperties.map(property => {
// //                 const statusInfo = getStatusLabel(property.status);
// //                 return (
// //                   <div key={property.id} className="compact-card">
// //                     <div className="compact-card-image">
// //                       <img src={property.images?.[0] || '/api/placeholder/400/300'} alt={property.title} />
// //                       <div className={`compact-card-status ${statusInfo.class}`}>
// //                         {statusInfo.icon} {statusInfo.text}
// //                       </div>
// //                     </div>
                    
// //                     <div className="compact-card-content">
// //                       <h4 className="compact-card-title">{property.title}</h4>
// //                       <div className="compact-card-address">{property.address}</div>
// //                       <div className="compact-card-price">{formatPrice(property.price)}</div>
                      
// //                       <div className="compact-card-features">
// //                         <span>📐 {property.area} m²</span>
// //                         <span>🛏 {property.rooms} خواب</span>
// //                         {property.hasParking && <span>🚗</span>}
// //                         {property.hasElevator && <span>🛗</span>}
// //                         {property.hasLoan && <span>🏦 تسهیلات</span>}
// //                       </div>
                      
// //                       <div className="compact-card-stats">
// //                         <span>👁 {property.views}</span>
// //                         <span>📅 {property.createdAtPersianRelative || new Date(property.createdAt).toLocaleDateString('fa-IR')}</span>
// //                       </div>
                      
// //                       <div className="compact-card-actions">
// //                         <button 
// //                           className="compact-status-btn active-btn"
// //                           onClick={() => handleStatusChange(property.id, 'active')}
// //                           title="فعال"
// //                         >
// //                           ✅
// //                         </button>
// //                         <button 
// //                           className="compact-status-btn pending-btn"
// //                           onClick={() => handleStatusChange(property.id, 'pending')}
// //                           title="در انتظار"
// //                         >
// //                           ⏳
// //                         </button>
// //                         <button 
// //                           className="compact-status-btn sold-btn"
// //                           onClick={() => handleStatusChange(property.id, 'sold')}
// //                           title="فروخته شده"
// //                         >
// //                           💰
// //                         </button>
// //                         <button 
// //                           className="compact-status-btn archived-btn"
// //                           onClick={() => handleStatusChange(property.id, 'archived')}
// //                           title="بایگانی"
// //                         >
// //                           📦
// //                         </button>
// //                         {property.status === 'payment_pending' && (
// //                           <button 
// //                             className="compact-payment-btn"
// //                             onClick={() => setSelectedPaymentProperty(property)}
// //                             title="پرداخت و فعال‌سازی"
// //                           >
// //                             💳
// //                           </button>
// //                         )}
// //                         <button 
// //                           className="compact-edit"
// //                           onClick={() => handleEditProperty(property)}
// //                           title="ویرایش"
// //                         >
// //                           ✏️
// //                         </button>
// //                         <button 
// //                           className="compact-delete"
// //                           onClick={() => handleDeleteProperty(property)}
// //                           title="حذف"
// //                         >
// //                           🗑
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 );
// //               })
// //             : filteredProperties.map(property => {
// //                 const statusInfo = getStatusLabel(property.status);
// //                 return (
// //                   <div key={property.id} className="compact-list-item">
// //                     <div className="compact-list-image">
// //                       <img src={property.images?.[0] || '/api/placeholder/400/300'} alt={property.title} />
// //                     </div>
// //                     <div className="compact-list-content">
// //                       <div className="compact-list-header">
// //                         <div>
// //                           <h4>{property.title}</h4>
// //                           <div className="compact-list-address">{property.address}</div>
// //                         </div>
// //                         <div className={`compact-list-status ${statusInfo.class}`}>
// //                           {statusInfo.icon} {statusInfo.text}
// //                         </div>
// //                       </div>
                      
// //                       <div className="compact-list-info">
// //                         <span>{formatPrice(property.price)}</span>
// //                         <span>📐 {property.area}m²</span>
// //                         <span>🛏 {property.rooms} خواب</span>
// //                         <span>👁 {property.views} بازدید</span>
// //                       </div>
                      
// //                       <div className="compact-list-actions">
// //                         <button 
// //                           className="compact-status-btn-sm active-btn"
// //                           onClick={() => handleStatusChange(property.id, 'active')}
// //                           title="فعال"
// //                         >
// //                           ✅ فعال
// //                         </button>
// //                         <button 
// //                           className="compact-status-btn-sm pending-btn"
// //                           onClick={() => handleStatusChange(property.id, 'pending')}
// //                           title="در انتظار"
// //                         >
// //                           ⏳ در انتظار
// //                         </button>
// //                         <button 
// //                           className="compact-status-btn-sm sold-btn"
// //                           onClick={() => handleStatusChange(property.id, 'sold')}
// //                           title="فروخته شده"
// //                         >
// //                           💰 فروخته شده
// //                         </button>
// //                         <button 
// //                           className="compact-status-btn-sm archived-btn"
// //                           onClick={() => handleStatusChange(property.id, 'archived')}
// //                           title="بایگانی"
// //                         >
// //                           📦 بایگانی
// //                         </button>
// //                         {property.status === 'payment_pending' && (
// //                           <button 
// //                             className="compact-payment-btn-sm"
// //                             onClick={() => setSelectedPaymentProperty(property)}
// //                             title="پرداخت و فعال‌سازی"
// //                           >
// //                             💳 پرداخت
// //                           </button>
// //                         )}
// //                         <button 
// //                           className="compact-list-edit"
// //                           onClick={() => handleEditProperty(property)}
// //                         >
// //                           ✏️
// //                         </button>
// //                         <button 
// //                           className="compact-list-delete"
// //                           onClick={() => handleDeleteProperty(property)}
// //                         >
// //                           🗑
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 );
// //               })
// //           }
// //         </div>
// //       )}

// //       {isEditModalOpen && selectedProperty && (
// //         <div className="compact-edit-modal" onClick={() => setIsEditModalOpen(false)}>
// //           <div className="compact-edit-content" onClick={(e) => e.stopPropagation()}>
// //             <div className="compact-edit-header">
// //               <h4>✏️ ویرایش ملک</h4>
// //               <button onClick={() => setIsEditModalOpen(false)}>✕</button>
// //             </div>
// //             <form onSubmit={handleSaveEdit}>
// //               <input type="text" name="title" placeholder="عنوان" defaultValue={selectedProperty.title} required />
// //               <input type="number" name="price" placeholder="قیمت (تومان)" defaultValue={Math.round(selectedProperty.price / 10000)} required />
// //               <input type="number" name="area" placeholder="متراژ" defaultValue={selectedProperty.area} required />
// //               <input type="text" name="region" placeholder="منطقه" defaultValue={selectedProperty.region} />
// //               <textarea name="address" placeholder="آدرس" rows="2" defaultValue={selectedProperty.address}></textarea>
// //               <input type="number" name="rooms" placeholder="تعداد اتاق" defaultValue={selectedProperty.rooms} />
// //               <input type="number" name="countFloor" placeholder="تعداد طبقات" defaultValue={selectedProperty.countFloor} />
// //               <input type="number" name="floor" placeholder="طبقه" defaultValue={selectedProperty.floor} />
              
// //               <div className="compact-checkbox-group">
// //                 <label>
// //                   <input type="checkbox" name="hasParking" defaultChecked={selectedProperty.hasParking} value="true" />
// //                   پارکینگ
// //                 </label>
// //                 <label>
// //                   <input type="checkbox" name="hasElevator" defaultChecked={selectedProperty.hasElevator} value="true" />
// //                   آسانسور
// //                 </label>
// //                 <label>
// //                   <input type="checkbox" name="hasLoan" defaultChecked={selectedProperty.hasLoan} value="true" />
// //                   تسهیلات بانکی
// //                 </label>
// //               </div>
              
// //               <div className="compact-edit-actions">
// //                 <button type="submit" className="compact-save">💾 ذخیره</button>
// //                 <button type="button" onClick={() => setIsEditModalOpen(false)}>انصراف</button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
      
// //       {isAddModalOpen && (
// //         <AddPropertyModal
// //           isOpen={isAddModalOpen}
// //           onClose={() => setIsAddModalOpen(false)}
// //           onSuccess={() => {
// //             fetchUserProperties();
// //             showToast('ملک با موفقیت ثبت شد', 'success');
// //           }}
// //         />
// //       )}

// //       {selectedPaymentProperty && (
// //         <PaymentModal
// //           isOpen={!!selectedPaymentProperty}
// //           onClose={() => setSelectedPaymentProperty(null)}
// //           property={selectedPaymentProperty}
// //           onSuccess={() => {
// //             fetchUserProperties();
// //             showToast('پرداخت با موفقیت انجام شد و آگهی شما فعال گردید', 'success');
// //           }}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default UserPropertiesPanel;
// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { panelService } from '../../../../services/panelService';
// import AddPropertyModal from './AddPropertyModal';
// import PaymentModal from './PaymentModal';
// import './UserPropertiesPanel.css';

// const UserPropertiesPanel = () => {
//   const navigate = useNavigate();
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [viewMode, setViewMode] = useState('grid');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
//   const [toast, setToast] = useState(null);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [selectedPaymentProperty, setSelectedPaymentProperty] = useState(null);
//   const [paymentResult, setPaymentResult] = useState(null);
//   const [showPaymentResult, setShowPaymentResult] = useState(false);
//   const [verifying, setVerifying] = useState(false);

//   const showToast = (message, type = 'success') => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const getToken = () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.warn('توکن یافت نشد');
//       return null;
//     }
//     return token;
//   };

//   const fetchUserProperties = useCallback(async () => {
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
//       const data = await panelService.GetRealEstatePanel();
      
//       if (data && Array.isArray(data)) {
//         const mappedProperties = data.map(item => ({
//           id: item.id,
//           title: item.title,
//           address: item.address || `${item.region} - آدرس مشخص نشده`,
//           price: item.price * 10000,
//           area: item.area,
//           rooms: item.countRooms,
//           hasParking: item.isHasParking,
//           hasElevator: item.isHasElavator,
//           hasPool: false,
//           hasLoan: item.isHasLoan,
//           images: (item.images || []).map(img => `https://localhost:7178/${img}`),
//           status: mapStatusToEnglish(item.status),
//           views: parseInt(item.views) || 0,
//           inquiries: 0,
//           createdAt: item.createdAt,
//           createdAtPersianRelative: item.createdAtPersianRelative,
//           region: item.region,
//           countFloor: item.countFloor,
//           floor: item.floor,
//           originalStatus: item.status,
//         }));
        
//         setProperties(mappedProperties);
//       } else {
//         setProperties([]);
//       }
//     } catch (error) {
//       console.error('Error fetching user properties:', error);
//       if (error.message?.includes('منقضی')) {
//         setError(error.message);
//         setTimeout(() => navigate('/login'), 2000);
//       } else {
//         setError(error.message || 'خطا در دریافت اطلاعات املاک شما');
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [navigate]);

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

//   const mapStatusToPersian = (englishStatus) => {
//     switch(englishStatus) {
//       case 'active':
//         return 'منتشر شد';
//       case 'pending':
//         return 'در انتظار';
//       case 'payment_pending':
//         return 'در انتظار پرداخت';
//       case 'sold':
//         return 'فروخته شده';
//       case 'archived':
//         return 'بایگانی شده';
//       default:
//         return 'نامشخص';
//     }
//   };

//   const verifyPayment = useCallback(async (authority, paymentId, status) => {
//     setVerifying(true);
//     const token = getToken();
    
//     try {
//       console.log('Calling verify-callback with:', { authority, paymentId, status });
      
//       const response = await fetch(
//         `https://localhost:7178/api/Payment/verify-callback?authority=${authority}&status=${status}&paymentId=${paymentId}`,
//         {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           }
//         }
//       );
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}`);
//       }
      
//       const result = await response.json();
//       console.log('Verify response:', result);
      
//       return result;
//     } catch (error) {
//       console.error('Verify payment error:', error);
//       throw error;
//     } finally {
//       setVerifying(false);
//     }
//   }, []);

//   // بررسی نتیجه پرداخت در بازگشت از درگاه
//   useEffect(() => {
//     const checkPaymentCallback = async () => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const status = urlParams.get('status');
//       const authority = urlParams.get('authority');
//       const paymentId = urlParams.get('paymentId');
//       const refId = urlParams.get('refId');
      
//       console.log('Callback params:', { status, authority, paymentId, refId });
      
//       const paymentInitiated = sessionStorage.getItem('paymentInitiated');
      
//       if (paymentInitiated === 'true') {
//         sessionStorage.removeItem('paymentInitiated');
        
//         if (status && authority && paymentId) {
//           try {
//             const verifyResult = await verifyPayment(authority, paymentId, status);
//             console.log('Verify result:', verifyResult);
            
//             if (status === 'success') {
//               setPaymentResult({
//                 success: true,
//                 message: 'پرداخت با موفقیت انجام شد. آگهی شما فعال گردید.',
//                 refId: refId || verifyResult?.refId
//               });
//               setShowPaymentResult(true);
              
//               sessionStorage.removeItem('pendingPayment');
//               sessionStorage.removeItem('currentPaymentId');
//               sessionStorage.removeItem('currentPropertyId');
              
//               await fetchUserProperties();
//             } else {
//               setPaymentResult({
//                 success: false,
//                 message: verifyResult?.message || 'پرداخت ناموفق بود. لطفاً مجدداً تلاش کنید.',
//                 refId: null
//               });
//               setShowPaymentResult(true);
              
//               sessionStorage.removeItem('pendingPayment');
//               sessionStorage.removeItem('currentPaymentId');
//               sessionStorage.removeItem('currentPropertyId');
//             }
//           } catch (error) {
//             console.error('Verification error:', error);
//             setPaymentResult({
//               success: false,
//               message: 'خطا در تایید پرداخت. لطفاً با پشتیبانی تماس بگیرید.',
//               refId: null
//             });
//             setShowPaymentResult(true);
//           } finally {
//             window.history.replaceState({}, document.title, window.location.pathname);
//           }
//         } else if (status === 'success' && refId) {
//           setPaymentResult({
//             success: true,
//             message: 'پرداخت با موفقیت انجام شد. آگهی شما فعال گردید.',
//             refId: refId
//           });
//           setShowPaymentResult(true);
          
//           sessionStorage.removeItem('pendingPayment');
//           sessionStorage.removeItem('currentPaymentId');
//           sessionStorage.removeItem('currentPropertyId');
          
//           await fetchUserProperties();
//           window.history.replaceState({}, document.title, window.location.pathname);
//         } else if (status === 'failed') {
//           setPaymentResult({
//             success: false,
//             message: 'پرداخت ناموفق بود. لطفاً مجدداً تلاش کنید.',
//             refId: null
//           });
//           setShowPaymentResult(true);
          
//           sessionStorage.removeItem('pendingPayment');
//           sessionStorage.removeItem('currentPaymentId');
//           sessionStorage.removeItem('currentPropertyId');
          
//           window.history.replaceState({}, document.title, window.location.pathname);
//         }
//       }
//     };
    
//     checkPaymentCallback();
//   }, [fetchUserProperties, verifyPayment]);

//   useEffect(() => {
//     fetchUserProperties();
//   }, [fetchUserProperties]);

//   const handleDeleteProperty = (property) => {
//     setShowDeleteConfirm(property);
//   };

//   const confirmDelete = async () => {
//     const token = getToken();
//     if (!token) {
//       showToast('لطفاً ابتدا وارد شوید', 'error');
//       setTimeout(() => navigate('/login'), 2000);
//       setShowDeleteConfirm(null);
//       return;
//     }
    
//     try {
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 10000);
      
//       const response = await fetch(
//         `https://localhost:7178/api/RealEstate/DeleteRealEstate/${showDeleteConfirm.id}`,
//         { 
//           method: 'DELETE',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           signal: controller.signal 
//         }
//       );
      
//       clearTimeout(timeoutId);
      
//       if (!response.ok) {
//         if (response.status === 401) {
//           localStorage.removeItem('token');
//           throw new Error('نشست شما منقضی شده است');
//         }
//         throw new Error(`HTTP ${response.status}`);
//       }
      
//       const result = await response.json();
      
//       if (result.status === 200) {
//         setProperties(prev => prev.filter(p => p.id !== showDeleteConfirm.id));
//         showToast('آگهی با موفقیت حذف شد', 'success');
//       } else {
//         throw new Error(result.message || 'خطا در حذف');
//       }
//     } catch (error) {
//       console.error('Delete error:', error);
//       if (error.name === 'AbortError') {
//         showToast('مدت زمان درخواست به پایان رسید', 'error');
//       } else if (error.message.includes('منقضی')) {
//         showToast('نشست شما منقضی شده است', 'error');
//         setTimeout(() => navigate('/login'), 2000);
//       } else {
//         showToast(error.message || 'خطا در حذف آگهی', 'error');
//       }
//     } finally {
//       setShowDeleteConfirm(null);
//     }
//   };

//   const handleEditProperty = (property) => {
//     setSelectedProperty(property);
//     setIsEditModalOpen(true);
//   };

//   const handleSaveEdit = async (e) => {
//     e.preventDefault();
    
//     const token = getToken();
//     if (!token) {
//       showToast('لطفاً ابتدا وارد شوید', 'error');
//       setTimeout(() => navigate('/login'), 2000);
//       return;
//     }
    
//     const formData = new FormData(e.target);
    
//     try {
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 10000);
      
//       const updatedData = {
//         id: selectedProperty.id,
//         title: formData.get('title'),
//         price: parseInt(formData.get('price')),
//         area: parseInt(formData.get('area')),
//         address: formData.get('address'),
//         region: formData.get('region'),
//         countRooms: parseInt(formData.get('rooms')) || 0,
//         isHasParking: formData.get('hasParking') === 'true',
//         isHasElavator: formData.get('hasElevator') === 'true',
//         isHasLoan: formData.get('hasLoan') === 'true',
//         countFloor: parseInt(formData.get('countFloor')) || 0,
//         floor: parseInt(formData.get('floor')) || 1,
//       };
      
//       const response = await fetch(
//         `https://localhost:7178/api/RealEstate/UpdateRealEstate/${selectedProperty.id}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(updatedData),
//           signal: controller.signal
//         }
//       );
      
//       clearTimeout(timeoutId);
      
//       if (!response.ok) {
//         if (response.status === 401) {
//           localStorage.removeItem('token');
//           throw new Error('نشست شما منقضی شده است');
//         }
//         throw new Error(`HTTP ${response.status}`);
//       }
      
//       const result = await response.json();
      
//       if (result.status === 200) {
//         setProperties(prev => prev.map(p => 
//           p.id === selectedProperty.id 
//             ? { 
//                 ...p, 
//                 title: updatedData.title,
//                 price: updatedData.price * 10000,
//                 area: updatedData.area,
//                 address: updatedData.address,
//                 region: updatedData.region,
//                 rooms: updatedData.countRooms,
//                 hasParking: updatedData.isHasParking,
//                 hasElevator: updatedData.isHasElavator,
//                 hasLoan: updatedData.isHasLoan,
//                 countFloor: updatedData.countFloor,
//                 floor: updatedData.floor,
//               } 
//             : p
//         ));
        
//         showToast('آگهی با موفقیت ویرایش شد', 'success');
//         setIsEditModalOpen(false);
//       } else {
//         throw new Error(result.message || 'خطا در ویرایش');
//       }
//     } catch (error) {
//       console.error('Update error:', error);
//       if (error.name === 'AbortError') {
//         showToast('مدت زمان درخواست به پایان رسید', 'error');
//       } else if (error.message.includes('منقضی')) {
//         showToast('نشست شما منقضی شده است', 'error');
//         setTimeout(() => navigate('/login'), 2000);
//       } else {
//         showToast(error.message || 'خطا در ویرایش آگهی', 'error');
//       }
//     }
//   };

//   const handleStatusChange = async (propertyId, newStatus) => {
//     const token = getToken();
//     if (!token) {
//       showToast('لطفاً ابتدا وارد شوید', 'error');
//       setTimeout(() => navigate('/login'), 2000);
//       return;
//     }
    
//     const persianStatus = mapStatusToPersian(newStatus);
    
//     try {
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 10000);
      
//       const response = await fetch(
//         `https://localhost:7178/api/RealEstate/ChangeStatus/${propertyId}`,
//         {
//           method: 'PATCH',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ status: persianStatus }),
//           signal: controller.signal
//         }
//       );
      
//       clearTimeout(timeoutId);
      
//       if (!response.ok) {
//         if (response.status === 401) {
//           localStorage.removeItem('token');
//           throw new Error('نشست شما منقضی شده است');
//         }
//         throw new Error(`HTTP ${response.status}`);
//       }
      
//       const result = await response.json();
      
//       if (result.status === 200) {
//         setProperties(prev => prev.map(p => 
//           p.id === propertyId 
//             ? { 
//                 ...p, 
//                 status: newStatus,
//                 originalStatus: persianStatus
//               } 
//             : p
//         ));
        
//         let message = '';
//         switch(newStatus) {
//           case 'active': message = 'آگهی فعال شد'; break;
//           case 'pending': message = 'آگهی در انتظار تایید قرار گرفت'; break;
//           case 'sold': message = 'آگهی به عنوان فروخته شده ثبت شد'; break;
//           case 'archived': message = 'آگهی بایگانی شد'; break;
//           default: message = 'وضعیت آگهی بروزرسانی شد';
//         }
        
//         showToast(message, 'success');
//       } else {
//         throw new Error(result.message || 'خطا در بروزرسانی وضعیت');
//       }
//     } catch (error) {
//       console.error('Status change error:', error);
//       if (error.name === 'AbortError') {
//         showToast('مدت زمان درخواست به پایان رسید', 'error');
//       } else if (error.message.includes('منقضی')) {
//         showToast('نشست شما منقضی شده است', 'error');
//         setTimeout(() => navigate('/login'), 2000);
//       } else {
//         showToast(error.message || 'خطا در بروزرسانی وضعیت', 'error');
//       }
//     }
//   };

//   const statistics = {
//     total: properties.length,
//     active: properties.filter(p => p.status === 'active').length,
//     pending: properties.filter(p => p.status === 'pending').length,
//     payment_pending: properties.filter(p => p.status === 'payment_pending').length,
//     sold: properties.filter(p => p.status === 'sold').length,
//     archived: properties.filter(p => p.status === 'archived').length,
//     totalViews: properties.reduce((sum, p) => sum + (p.views || 0), 0),
//   };

//   const filteredProperties = properties.filter(property => {
//     const matchesSearch = property.title?.includes(searchTerm) || 
//                          property.address?.includes(searchTerm) ||
//                          property.region?.includes(searchTerm);
//     const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const formatPrice = (price) => {
//     if (price >= 1000000000) {
//       return (price / 1000000000).toFixed(1) + ' میلیارد تومان';
//     }
//     if (price >= 1000000) {
//       return (price / 1000000).toFixed(0) + ' میلیون تومان';
//     }
//     return price.toLocaleString() + ' تومان';
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

//   if (loading) {
//     return (
//       <div className="compact-loading">
//         <div className="compact-spinner"></div>
//         <p>در حال بارگذاری...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="user-properties-compact">
//       {toast && (
//         <div className={`compact-toast ${toast.type}`}>
//           {toast.message}
//         </div>
//       )}

//       {showDeleteConfirm && (
//         <div className="compact-modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
//           <div className="compact-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="compact-modal-icon">🗑</div>
//             <h4>حذف آگهی</h4>
//             <p>آیا از حذف "{showDeleteConfirm.title}" مطمئن هستید؟</p>
//             <div className="compact-modal-actions">
//               <button className="compact-confirm-btn" onClick={confirmDelete}>حذف</button>
//               <button className="compact-cancel-btn" onClick={() => setShowDeleteConfirm(null)}>انصراف</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showPaymentResult && paymentResult && (
//         <div className="compact-modal-overlay" onClick={() => {
//           setShowPaymentResult(false);
//           setPaymentResult(null);
//         }}>
//           <div className="compact-modal payment-result-modal" onClick={(e) => e.stopPropagation()}>
//             <div className={`result-icon ${paymentResult.success ? 'success' : 'error'}`}>
//               {paymentResult.success ? '✅' : '❌'}
//             </div>
//             <h3>{paymentResult.success ? 'پرداخت موفقیت آمیز بود' : 'پرداخت ناموفق بود'}</h3>
//             <p>{paymentResult.message}</p>
//             {paymentResult.refId && (
//               <div className="ref-id">
//                 <span>شماره پیگیری:</span>
//                 <strong>{paymentResult.refId}</strong>
//               </div>
//             )}
//             <button 
//               className="compact-close-result" 
//               onClick={() => {
//                 setShowPaymentResult(false);
//                 setPaymentResult(null);
//               }}
//             >
//               بستن
//             </button>
//           </div>
//         </div>
//       )}

//       {verifying && (
//         <div className="compact-modal-overlay">
//           <div className="compact-loading-modal">
//             <div className="compact-spinner"></div>
//             <p>در حال تایید پرداخت...</p>
//           </div>
//         </div>
//       )}

//       <div className="compact-header">
//         <div>
//           <h2>🏠 املاک من</h2>
//           <p className="compact-subtitle">مدیریت املاک ثبت شده</p>
//         </div>
//         <button className="compact-add-btn" onClick={() => setIsAddModalOpen(true)}>
//           + ثبت ملک جدید
//         </button>
//       </div>

//       <div className="compact-stats">
//         <div className="compact-stat">
//           <span className="compact-stat-icon">🏘</span>
//           <div>
//             <div className="compact-stat-number">{statistics.total}</div>
//             <div className="compact-stat-label">کل املاک</div>
//           </div>
//         </div>
//         <div className="compact-stat">
//           <span className="compact-stat-icon">✅</span>
//           <div>
//             <div className="compact-stat-number">{statistics.active}</div>
//             <div className="compact-stat-label">فعال</div>
//           </div>
//         </div>
//         <div className="compact-stat">
//           <span className="compact-stat-icon">⏳</span>
//           <div>
//             <div className="compact-stat-number">{statistics.pending}</div>
//             <div className="compact-stat-label">در انتظار</div>
//           </div>
//         </div>
//         <div className="compact-stat">
//           <span className="compact-stat-icon">💰</span>
//           <div>
//             <div className="compact-stat-number">{statistics.payment_pending}</div>
//             <div className="compact-stat-label">در انتظار پرداخت</div>
//           </div>
//         </div>
//         <div className="compact-stat">
//           <span className="compact-stat-icon">💰</span>
//           <div>
//             <div className="compact-stat-number">{statistics.sold}</div>
//             <div className="compact-stat-label">فروخته شده</div>
//           </div>
//         </div>
//         <div className="compact-stat">
//           <span className="compact-stat-icon">📦</span>
//           <div>
//             <div className="compact-stat-number">{statistics.archived}</div>
//             <div className="compact-stat-label">بایگانی</div>
//           </div>
//         </div>
//         <div className="compact-stat">
//           <span className="compact-stat-icon">👁</span>
//           <div>
//             <div className="compact-stat-number">{statistics.totalViews}</div>
//             <div className="compact-stat-label">بازدید</div>
//           </div>
//         </div>
//       </div>

//       <div className="compact-toolbar">
//         <div className="compact-search">
//           <input
//             type="text"
//             placeholder="جستجو در املاک..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <span>🔍</span>
//         </div>
        
//         <div className="compact-controls">
//           <select 
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="all">همه</option>
//             <option value="active">فعال</option>
//             <option value="pending">در انتظار تایید</option>
//             <option value="payment_pending">در انتظار پرداخت</option>
//             <option value="sold">فروخته شده</option>
//             <option value="archived">بایگانی شده</option>
//           </select>
          
//           <div className="compact-view-toggle">
//             <button 
//               className={viewMode === 'grid' ? 'active' : ''}
//               onClick={() => setViewMode('grid')}
//             >
//               🔲
//             </button>
//             <button 
//               className={viewMode === 'list' ? 'active' : ''}
//               onClick={() => setViewMode('list')}
//             >
//               📋
//             </button>
//           </div>
//         </div>
//       </div>

//       {error ? (
//         <div className="compact-error">
//           <p>{error}</p>
//           <button onClick={fetchUserProperties}>تلاش مجدد</button>
//         </div>
//       ) : filteredProperties.length === 0 ? (
//         <div className="compact-empty">
//           <div>🏠</div>
//           <h4>ملکی یافت نشد</h4>
//           <p>هیچ ملکی با این مشخصات وجود ندارد</p>
//           <button onClick={() => navigate('/add-property')}>ثبت ملک جدید</button>
//         </div>
//       ) : (
//         <div className={`compact-properties ${viewMode}`}>
//           {viewMode === 'grid' 
//             ? filteredProperties.map(property => {
//                 const statusInfo = getStatusLabel(property.status);
//                 return (
//                   <div key={property.id} className="compact-card">
//                     <div className="compact-card-image">
//                       <img src={property.images?.[0] || '/api/placeholder/400/300'} alt={property.title} />
//                       <div className={`compact-card-status ${statusInfo.class}`}>
//                         {statusInfo.icon} {statusInfo.text}
//                       </div>
//                     </div>
                    
//                     <div className="compact-card-content">
//                       <h4 className="compact-card-title">{property.title}</h4>
//                       <div className="compact-card-address">{property.address}</div>
//                       <div className="compact-card-price">{formatPrice(property.price)}</div>
                      
//                       <div className="compact-card-features">
//                         <span>📐 {property.area} m²</span>
//                         <span>🛏 {property.rooms} خواب</span>
//                         {property.hasParking && <span>🚗</span>}
//                         {property.hasElevator && <span>🛗</span>}
//                         {property.hasLoan && <span>🏦 تسهیلات</span>}
//                       </div>
                      
//                       <div className="compact-card-stats">
//                         <span>👁 {property.views}</span>
//                         <span>📅 {property.createdAtPersianRelative || new Date(property.createdAt).toLocaleDateString('fa-IR')}</span>
//                       </div>
                      
//                       <div className="compact-card-actions">
//                         <button 
//                           className="compact-status-btn active-btn"
//                           onClick={() => handleStatusChange(property.id, 'active')}
//                           title="فعال"
//                         >
//                           ✅
//                         </button>
//                         <button 
//                           className="compact-status-btn pending-btn"
//                           onClick={() => handleStatusChange(property.id, 'pending')}
//                           title="در انتظار"
//                         >
//                           ⏳
//                         </button>
//                         <button 
//                           className="compact-status-btn sold-btn"
//                           onClick={() => handleStatusChange(property.id, 'sold')}
//                           title="فروخته شده"
//                         >
//                           💰
//                         </button>
//                         <button 
//                           className="compact-status-btn archived-btn"
//                           onClick={() => handleStatusChange(property.id, 'archived')}
//                           title="بایگانی"
//                         >
//                           📦
//                         </button>
//                         {property.status === 'payment_pending' && (
//                           <button 
//                             className="compact-payment-btn"
//                             onClick={() => setSelectedPaymentProperty(property)}
//                             title="پرداخت و فعال‌سازی"
//                           >
//                             💳
//                           </button>
//                         )}
//                         <button 
//                           className="compact-edit"
//                           onClick={() => handleEditProperty(property)}
//                           title="ویرایش"
//                         >
//                           ✏️
//                         </button>
//                         <button 
//                           className="compact-delete"
//                           onClick={() => handleDeleteProperty(property)}
//                           title="حذف"
//                         >
//                           🗑
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//             : filteredProperties.map(property => {
//                 const statusInfo = getStatusLabel(property.status);
//                 return (
//                   <div key={property.id} className="compact-list-item">
//                     <div className="compact-list-image">
//                       <img src={property.images?.[0] || '/api/placeholder/400/300'} alt={property.title} />
//                     </div>
//                     <div className="compact-list-content">
//                       <div className="compact-list-header">
//                         <div>
//                           <h4>{property.title}</h4>
//                           <div className="compact-list-address">{property.address}</div>
//                         </div>
//                         <div className={`compact-list-status ${statusInfo.class}`}>
//                           {statusInfo.icon} {statusInfo.text}
//                         </div>
//                       </div>
                      
//                       <div className="compact-list-info">
//                         <span>{formatPrice(property.price)}</span>
//                         <span>📐 {property.area}m²</span>
//                         <span>🛏 {property.rooms} خواب</span>
//                         <span>👁 {property.views} بازدید</span>
//                       </div>
                      
//                       <div className="compact-list-actions">
//                         <button 
//                           className="compact-status-btn-sm active-btn"
//                           onClick={() => handleStatusChange(property.id, 'active')}
//                           title="فعال"
//                         >
//                           ✅ فعال
//                         </button>
//                         <button 
//                           className="compact-status-btn-sm pending-btn"
//                           onClick={() => handleStatusChange(property.id, 'pending')}
//                           title="در انتظار"
//                         >
//                           ⏳ در انتظار
//                         </button>
//                         <button 
//                           className="compact-status-btn-sm sold-btn"
//                           onClick={() => handleStatusChange(property.id, 'sold')}
//                           title="فروخته شده"
//                         >
//                           💰 فروخته شده
//                         </button>
//                         <button 
//                           className="compact-status-btn-sm archived-btn"
//                           onClick={() => handleStatusChange(property.id, 'archived')}
//                           title="بایگانی"
//                         >
//                           📦 بایگانی
//                         </button>
//                         {property.status === 'payment_pending' && (
//                           <button 
//                             className="compact-payment-btn-sm"
//                             onClick={() => setSelectedPaymentProperty(property)}
//                             title="پرداخت و فعال‌سازی"
//                           >
//                             💳 پرداخت
//                           </button>
//                         )}
//                         <button 
//                           className="compact-list-edit"
//                           onClick={() => handleEditProperty(property)}
//                         >
//                           ✏️
//                         </button>
//                         <button 
//                           className="compact-list-delete"
//                           onClick={() => handleDeleteProperty(property)}
//                         >
//                           🗑
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//           }
//         </div>
//       )}

//       {isEditModalOpen && selectedProperty && (
//         <div className="compact-edit-modal" onClick={() => setIsEditModalOpen(false)}>
//           <div className="compact-edit-content" onClick={(e) => e.stopPropagation()}>
//             <div className="compact-edit-header">
//               <h4>✏️ ویرایش ملک</h4>
//               <button onClick={() => setIsEditModalOpen(false)}>✕</button>
//             </div>
//             <form onSubmit={handleSaveEdit}>
//               <input type="text" name="title" placeholder="عنوان" defaultValue={selectedProperty.title} required />
//               <input type="number" name="price" placeholder="قیمت (تومان)" defaultValue={Math.round(selectedProperty.price / 10000)} required />
//               <input type="number" name="area" placeholder="متراژ" defaultValue={selectedProperty.area} required />
//               <input type="text" name="region" placeholder="منطقه" defaultValue={selectedProperty.region} />
//               <textarea name="address" placeholder="آدرس" rows="2" defaultValue={selectedProperty.address}></textarea>
//               <input type="number" name="rooms" placeholder="تعداد اتاق" defaultValue={selectedProperty.rooms} />
//               <input type="number" name="countFloor" placeholder="تعداد طبقات" defaultValue={selectedProperty.countFloor} />
//               <input type="number" name="floor" placeholder="طبقه" defaultValue={selectedProperty.floor} />
              
//               <div className="compact-checkbox-group">
//                 <label>
//                   <input type="checkbox" name="hasParking" defaultChecked={selectedProperty.hasParking} value="true" />
//                   پارکینگ
//                 </label>
//                 <label>
//                   <input type="checkbox" name="hasElevator" defaultChecked={selectedProperty.hasElevator} value="true" />
//                   آسانسور
//                 </label>
//                 <label>
//                   <input type="checkbox" name="hasLoan" defaultChecked={selectedProperty.hasLoan} value="true" />
//                   تسهیلات بانکی
//                 </label>
//               </div>
              
//               <div className="compact-edit-actions">
//                 <button type="submit" className="compact-save">💾 ذخیره</button>
//                 <button type="button" onClick={() => setIsEditModalOpen(false)}>انصراف</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
      
//       {isAddModalOpen && (
//         <AddPropertyModal
//           isOpen={isAddModalOpen}
//           onClose={() => setIsAddModalOpen(false)}
//           onSuccess={() => {
//             fetchUserProperties();
//             showToast('ملک با موفقیت ثبت شد', 'success');
//           }}
//         />
//       )}

//       {selectedPaymentProperty && (
//         <PaymentModal
//           isOpen={!!selectedPaymentProperty}
//           onClose={() => setSelectedPaymentProperty(null)}
//           property={selectedPaymentProperty}
//           onSuccess={() => {
//             fetchUserProperties();
//             showToast('پرداخت با موفقیت انجام شد و آگهی شما فعال گردید', 'success');
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default UserPropertiesPanel;

// UserPropertiesPanel.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { panelService } from '../../../../services/panelService';
import AddPropertyModal from './AddPropertyModal';
import PaymentModal from './PaymentModal';
import './UserPropertiesPanel.css';

const UserPropertiesPanel = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPaymentProperty, setSelectedPaymentProperty] = useState(null);
  const [paymentResult, setPaymentResult] = useState(null);
  const [showPaymentResult, setShowPaymentResult] = useState(false);
  const [verifying, setVerifying] = useState(false);
  
  // ✅ ref برای جلوگیری از اجرای مجدد
  const hasProcessedPayment = useRef(false);
  const abortControllerRef = useRef(null);

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

  const fetchUserProperties = useCallback(async () => {
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
      const data = await panelService.GetRealEstatePanel();
      
      if (data && Array.isArray(data)) {
        const mappedProperties = data.map(item => ({
          id: item.id,
          title: item.title,
          address: item.address || `${item.region} - آدرس مشخص نشده`,
          price: item.price * 10000,
          area: item.area,
          rooms: item.countRooms,
          hasParking: item.isHasParking,
          hasElevator: item.isHasElavator,
          hasPool: false,
          hasLoan: item.isHasLoan,
          images: (item.images || []).map(img => `https://localhost:7178/${img}`),
          status: mapStatusToEnglish(item.status),
          views: parseInt(item.views) || 0,
          inquiries: 0,
          createdAt: item.createdAt,
          createdAtPersianRelative: item.createdAtPersianRelative,
          region: item.region,
          countFloor: item.countFloor,
          floor: item.floor,
          originalStatus: item.status,
        }));
        
        setProperties(mappedProperties);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.error('Error fetching user properties:', error);
      if (error.message?.includes('منقضی')) {
        setError(error.message);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(error.message || 'خطا در دریافت اطلاعات املاک شما');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

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

  const mapStatusToPersian = (englishStatus) => {
    switch(englishStatus) {
      case 'active':
        return 'منتشر شد';
      case 'pending':
        return 'در انتظار';
      case 'payment_pending':
        return 'در انتظار پرداخت';
      case 'sold':
        return 'فروخته شده';
      case 'archived':
        return 'بایگانی شده';
      default:
        return 'نامشخص';
    }
  };

  // ✅ تابع verifyPayment بهبود یافته با قابلیت abort
  const verifyPayment = useCallback(async (authority, paymentId, status) => {
    // اگر قبلاً در حال تایید است، دوباره شروع نکن
    if (verifying) {
      console.log('⏭️ Already verifying, skipping...');
      return null;
    }
    
    setVerifying(true);
    const token = getToken();
    
    // لغو درخواست قبلی اگر وجود دارد
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // ایجاد AbortController جدید
    abortControllerRef.current = new AbortController();
    
    try {
      console.log('📤 Calling verify-callback (ONCE):', { authority, paymentId, status });
      
      const response = await fetch(
        `https://localhost:7178/api/Payment/verify-callback?authority=${authority}&status=${status}&paymentId=${paymentId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          signal: abortControllerRef.current.signal
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const result = await response.json();
      console.log('✅ Verify response:', result);
      
      return result;
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('⏹️ Request was cancelled');
        return null;
      }
      console.error('❌ Verify payment error:', error);
      throw error;
    } finally {
      setVerifying(false);
      abortControllerRef.current = null;
    }
  }, [verifying]);

  // ✅ بررسی نتیجه پرداخت در بازگشت از درگاه - بهبود یافته با جلوگیری از اجرای مجدد
  useEffect(() => {
    const checkPaymentCallback = async () => {
      // ✅ اگر قبلاً پردازش شده، هیچ کاری نکن
      if (hasProcessedPayment.current) {
        console.log('⏭️ Payment already processed, skipping...');
        return;
      }
      
      const urlParams = new URLSearchParams(window.location.search);
      const status = urlParams.get('Status') || urlParams.get('status');
      const authority = urlParams.get('Authority') || urlParams.get('authority');
      const paymentId = urlParams.get('paymentId');
      const refId = urlParams.get('RefId') || urlParams.get('refId');
      
      console.log('🔍 Callback params:', { status, authority, paymentId, refId });
      
      // ✅ کلید منحصر به فرد برای این تراکنش
      const transactionKey = `payment_processed_${authority || paymentId || Date.now()}`;
      
      // ✅ بررسی کن آیا این تراکنش قبلاً پردازش شده
      const alreadyProcessed = sessionStorage.getItem(transactionKey);
      if (alreadyProcessed === 'true') {
        console.log('⚠️ This transaction already processed, skipping...');
        return;
      }
      
      const paymentInitiated = sessionStorage.getItem('paymentInitiated');
      
      // ✅ اگر پرداختی در جریان نبوده، هیچ کاری نکن
      if (paymentInitiated !== 'true') {
        console.log('ℹ️ No pending payment found');
        return;
      }
      
      // ✅ علامت بزن که در حال پردازش است
      hasProcessedPayment.current = true;
      sessionStorage.setItem(transactionKey, 'true');
      sessionStorage.removeItem('paymentInitiated');
      
      try {
        // ✅ اگر authority و paymentId داریم، حتماً تایید کن
        if (status && authority && paymentId) {
          // تبدیل status به فرمت مورد انتظار بک‌اند
          let backendStatus = 'NOK';
          if (status === 'OK' || status === 'success' || status === 'ok' || status === 'Success') {
            backendStatus = 'OK';
          }
          
          const verifyResult = await verifyPayment(authority, paymentId, backendStatus);
          console.log('🎯 Verify result:', verifyResult);
          
          if (backendStatus === 'OK' && verifyResult && !verifyResult.error) {
            setPaymentResult({
              success: true,
              message: 'پرداخت با موفقیت انجام شد. آگهی شما فعال گردید.',
              refId: verifyResult?.refId || refId
            });
            setShowPaymentResult(true);
            
            // پاک کردن اطلاعات
            sessionStorage.removeItem('pendingPayment');
            sessionStorage.removeItem('currentPaymentId');
            sessionStorage.removeItem('currentPropertyId');
            
            await fetchUserProperties();
          } else {
            setPaymentResult({
              success: false,
              message: verifyResult?.message || 'پرداخت ناموفق بود. لطفاً مجدداً تلاش کنید.',
              refId: null
            });
            setShowPaymentResult(true);
            
            sessionStorage.removeItem('pendingPayment');
            sessionStorage.removeItem('currentPaymentId');
            sessionStorage.removeItem('currentPropertyId');
          }
        } 
        // ✅ اگر مستقیماً با refId برگشته (توسط درگاه)
        else if ((status === 'success' || status === 'OK') && refId) {
          setPaymentResult({
            success: true,
            message: 'پرداخت با موفقیت انجام شد. آگهی شما فعال گردید.',
            refId: refId
          });
          setShowPaymentResult(true);
          
          sessionStorage.removeItem('pendingPayment');
          sessionStorage.removeItem('currentPaymentId');
          sessionStorage.removeItem('currentPropertyId');
          
          await fetchUserProperties();
        } 
        // ✅ پرداخت ناموفق
        else if (status === 'failed' || status === 'NOK' || status === 'nok') {
          setPaymentResult({
            success: false,
            message: 'پرداخت ناموفق بود. لطفاً مجدداً تلاش کنید.',
            refId: null
          });
          setShowPaymentResult(true);
          
          sessionStorage.removeItem('pendingPayment');
          sessionStorage.removeItem('currentPaymentId');
          sessionStorage.removeItem('currentPropertyId');
        } else {
          // وضعیت نامشخص - reset flag
          console.warn('⚠️ Unknown payment status:', status);
          hasProcessedPayment.current = false;
          sessionStorage.removeItem(transactionKey);
        }
        
        // ✅ پاک کردن پارامترهای URL بدون رفرش
        if (window.location.search) {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
        
      } catch (error) {
        console.error('❌ Verification error:', error);
        setPaymentResult({
          success: false,
          message: 'خطا در تایید پرداخت. لطفاً با پشتیبانی تماس بگیرید.',
          refId: null
        });
        setShowPaymentResult(true);
        
        // در صورت خطا، reset کن تا دفعه بعد دوباره تلاش کند
        hasProcessedPayment.current = false;
        sessionStorage.removeItem(transactionKey);
      }
    };
    
    checkPaymentCallback();
    
    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchUserProperties, verifyPayment]);

  useEffect(() => {
    fetchUserProperties();
  }, [fetchUserProperties]);

  const handleDeleteProperty = (property) => {
    setShowDeleteConfirm(property);
  };

  const confirmDelete = async () => {
    const token = getToken();
    if (!token) {
      showToast('لطفاً ابتدا وارد شوید', 'error');
      setTimeout(() => navigate('/login'), 2000);
      setShowDeleteConfirm(null);
      return;
    }
    
    const deleteController = new AbortController();
    
    try {
      const timeoutId = setTimeout(() => deleteController.abort(), 10000);
      
      const response = await fetch(
        `https://localhost:7178/api/RealEstate/DeleteRealEstate/${showDeleteConfirm.id}`,
        { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          signal: deleteController.signal 
        }
      );
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          throw new Error('نشست شما منقضی شده است');
        }
        throw new Error(`HTTP ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.status === 200) {
        setProperties(prev => prev.filter(p => p.id !== showDeleteConfirm.id));
        showToast('آگهی با موفقیت حذف شد', 'success');
      } else {
        throw new Error(result.message || 'خطا در حذف');
      }
    } catch (error) {
      console.error('Delete error:', error);
      if (error.name === 'AbortError') {
        showToast('مدت زمان درخواست به پایان رسید', 'error');
      } else if (error.message.includes('منقضی')) {
        showToast('نشست شما منقضی شده است', 'error');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        showToast(error.message || 'خطا در حذف آگهی', 'error');
      }
    } finally {
      setShowDeleteConfirm(null);
    }
  };

  const handleEditProperty = (property) => {
    setSelectedProperty(property);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    
    const token = getToken();
    if (!token) {
      showToast('لطفاً ابتدا وارد شوید', 'error');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    
    const formData = new FormData(e.target);
    
    const editController = new AbortController();
    
    try {
      const timeoutId = setTimeout(() => editController.abort(), 10000);
      
      const updatedData = {
        id: selectedProperty.id,
        title: formData.get('title'),
        price: parseInt(formData.get('price')),
        area: parseInt(formData.get('area')),
        address: formData.get('address'),
        region: formData.get('region'),
        countRooms: parseInt(formData.get('rooms')) || 0,
        isHasParking: formData.get('hasParking') === 'true',
        isHasElavator: formData.get('hasElevator') === 'true',
        isHasLoan: formData.get('hasLoan') === 'true',
        countFloor: parseInt(formData.get('countFloor')) || 0,
        floor: parseInt(formData.get('floor')) || 1,
      };
      
      const response = await fetch(
        `https://localhost:7178/api/RealEstate/UpdateRealEstate/${selectedProperty.id}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
          signal: editController.signal
        }
      );
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          throw new Error('نشست شما منقضی شده است');
        }
        throw new Error(`HTTP ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.status === 200) {
        setProperties(prev => prev.map(p => 
          p.id === selectedProperty.id 
            ? { 
                ...p, 
                title: updatedData.title,
                price: updatedData.price * 10000,
                area: updatedData.area,
                address: updatedData.address,
                region: updatedData.region,
                rooms: updatedData.countRooms,
                hasParking: updatedData.isHasParking,
                hasElevator: updatedData.isHasElavator,
                hasLoan: updatedData.isHasLoan,
                countFloor: updatedData.countFloor,
                floor: updatedData.floor,
              } 
            : p
        ));
        
        showToast('آگهی با موفقیت ویرایش شد', 'success');
        setIsEditModalOpen(false);
      } else {
        throw new Error(result.message || 'خطا در ویرایش');
      }
    } catch (error) {
      console.error('Update error:', error);
      if (error.name === 'AbortError') {
        showToast('مدت زمان درخواست به پایان رسید', 'error');
      } else if (error.message.includes('منقضی')) {
        showToast('نشست شما منقضی شده است', 'error');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        showToast(error.message || 'خطا در ویرایش آگهی', 'error');
      }
    }
  };

  const handleStatusChange = async (propertyId, newStatus) => {
    const token = getToken();
    if (!token) {
      showToast('لطفاً ابتدا وارد شوید', 'error');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    
    const persianStatus = mapStatusToPersian(newStatus);
    
    const statusController = new AbortController();
    
    try {
      const timeoutId = setTimeout(() => statusController.abort(), 10000);
      
      const response = await fetch(
        `https://localhost:7178/api/RealEstate/ChangeStatus/${propertyId}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: persianStatus }),
          signal: statusController.signal
        }
      );
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          throw new Error('نشست شما منقضی شده است');
        }
        throw new Error(`HTTP ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.status === 200) {
        setProperties(prev => prev.map(p => 
          p.id === propertyId 
            ? { 
                ...p, 
                status: newStatus,
                originalStatus: persianStatus
              } 
            : p
        ));
        
        let message = '';
        switch(newStatus) {
          case 'active': message = 'آگهی فعال شد'; break;
          case 'pending': message = 'آگهی در انتظار تایید قرار گرفت'; break;
          case 'sold': message = 'آگهی به عنوان فروخته شده ثبت شد'; break;
          case 'archived': message = 'آگهی بایگانی شد'; break;
          default: message = 'وضعیت آگهی بروزرسانی شد';
        }
        
        showToast(message, 'success');
      } else {
        throw new Error(result.message || 'خطا در بروزرسانی وضعیت');
      }
    } catch (error) {
      console.error('Status change error:', error);
      if (error.name === 'AbortError') {
        showToast('مدت زمان درخواست به پایان رسید', 'error');
      } else if (error.message.includes('منقضی')) {
        showToast('نشست شما منقضی شده است', 'error');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        showToast(error.message || 'خطا در بروزرسانی وضعیت', 'error');
      }
    }
  };

  const statistics = {
    total: properties.length,
    active: properties.filter(p => p.status === 'active').length,
    pending: properties.filter(p => p.status === 'pending').length,
    payment_pending: properties.filter(p => p.status === 'payment_pending').length,
    sold: properties.filter(p => p.status === 'sold').length,
    archived: properties.filter(p => p.status === 'archived').length,
    totalViews: properties.reduce((sum, p) => sum + (p.views || 0), 0),
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title?.includes(searchTerm) || 
                         property.address?.includes(searchTerm) ||
                         property.region?.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatPrice = (price) => {
    if (price >= 1000000000) {
      return (price / 1000000000).toFixed(1) + ' میلیارد تومان';
    }
    if (price >= 1000000) {
      return (price / 1000000).toFixed(0) + ' میلیون تومان';
    }
    return price.toLocaleString() + ' تومان';
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

  if (loading) {
    return (
      <div className="compact-loading">
        <div className="compact-spinner"></div>
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className="user-properties-compact">
      {toast && (
        <div className={`compact-toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      {showDeleteConfirm && (
        <div className="compact-modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
          <div className="compact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="compact-modal-icon">🗑</div>
            <h4>حذف آگهی</h4>
            <p>آیا از حذف "{showDeleteConfirm.title}" مطمئن هستید؟</p>
            <div className="compact-modal-actions">
              <button className="compact-confirm-btn" onClick={confirmDelete}>حذف</button>
              <button className="compact-cancel-btn" onClick={() => setShowDeleteConfirm(null)}>انصراف</button>
            </div>
          </div>
        </div>
      )}

      {showPaymentResult && paymentResult && (
        <div className="compact-modal-overlay" onClick={() => {
          setShowPaymentResult(false);
          setPaymentResult(null);
        }}>
          <div className="compact-modal payment-result-modal" onClick={(e) => e.stopPropagation()}>
            <div className={`result-icon ${paymentResult.success ? 'success' : 'error'}`}>
              {paymentResult.success ? '✅' : '❌'}
            </div>
            <h3>{paymentResult.success ? 'پرداخت موفقیت آمیز بود' : 'پرداخت ناموفق بود'}</h3>
            <p>{paymentResult.message}</p>
            {paymentResult.refId && (
              <div className="ref-id">
                <span>شماره پیگیری:</span>
                <strong>{paymentResult.refId}</strong>
              </div>
            )}
            <button 
              className="compact-close-result" 
              onClick={() => {
                setShowPaymentResult(false);
                setPaymentResult(null);
              }}
            >
              بستن
            </button>
          </div>
        </div>
      )}

      {verifying && (
        <div className="compact-modal-overlay">
          <div className="compact-loading-modal">
            <div className="compact-spinner"></div>
            <p>در حال تایید پرداخت...</p>
          </div>
        </div>
      )}

      <div className="compact-header">
        <div>
          <h2>🏠 املاک من</h2>
          <p className="compact-subtitle">مدیریت املاک ثبت شده</p>
        </div>
        <button className="compact-add-btn" onClick={() => setIsAddModalOpen(true)}>
          + ثبت ملک جدید
        </button>
      </div>

      <div className="compact-stats">
        <div className="compact-stat">
          <span className="compact-stat-icon">🏘</span>
          <div>
            <div className="compact-stat-number">{statistics.total}</div>
            <div className="compact-stat-label">کل املاک</div>
          </div>
        </div>
        <div className="compact-stat">
          <span className="compact-stat-icon">✅</span>
          <div>
            <div className="compact-stat-number">{statistics.active}</div>
            <div className="compact-stat-label">فعال</div>
          </div>
        </div>
        <div className="compact-stat">
          <span className="compact-stat-icon">⏳</span>
          <div>
            <div className="compact-stat-number">{statistics.pending}</div>
            <div className="compact-stat-label">در انتظار</div>
          </div>
        </div>
        <div className="compact-stat">
          <span className="compact-stat-icon">💰</span>
          <div>
            <div className="compact-stat-number">{statistics.payment_pending}</div>
            <div className="compact-stat-label">در انتظار پرداخت</div>
          </div>
        </div>
        <div className="compact-stat">
          <span className="compact-stat-icon">💰</span>
          <div>
            <div className="compact-stat-number">{statistics.sold}</div>
            <div className="compact-stat-label">فروخته شده</div>
          </div>
        </div>
        <div className="compact-stat">
          <span className="compact-stat-icon">📦</span>
          <div>
            <div className="compact-stat-number">{statistics.archived}</div>
            <div className="compact-stat-label">بایگانی</div>
          </div>
        </div>
        <div className="compact-stat">
          <span className="compact-stat-icon">👁</span>
          <div>
            <div className="compact-stat-number">{statistics.totalViews}</div>
            <div className="compact-stat-label">بازدید</div>
          </div>
        </div>
      </div>

      <div className="compact-toolbar">
        <div className="compact-search">
          <input
            type="text"
            placeholder="جستجو در املاک..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span>🔍</span>
        </div>
        
        <div className="compact-controls">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">همه</option>
            <option value="active">فعال</option>
            <option value="pending">در انتظار تایید</option>
            <option value="payment_pending">در انتظار پرداخت</option>
            <option value="sold">فروخته شده</option>
            <option value="archived">بایگانی شده</option>
          </select>
          
          <div className="compact-view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              🔲
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              📋
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <div className="compact-error">
          <p>{error}</p>
          <button onClick={fetchUserProperties}>تلاش مجدد</button>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="compact-empty">
          <div>🏠</div>
          <h4>ملکی یافت نشد</h4>
          <p>هیچ ملکی با این مشخصات وجود ندارد</p>
          <button onClick={() => navigate('/add-property')}>ثبت ملک جدید</button>
        </div>
      ) : (
        <div className={`compact-properties ${viewMode}`}>
          {viewMode === 'grid' 
            ? filteredProperties.map(property => {
                const statusInfo = getStatusLabel(property.status);
                return (
                  <div key={property.id} className="compact-card">
                    <div className="compact-card-image">
                      <img src={property.images?.[0] || '/api/placeholder/400/300'} alt={property.title} />
                      <div className={`compact-card-status ${statusInfo.class}`}>
                        {statusInfo.icon} {statusInfo.text}
                      </div>
                    </div>
                    
                    <div className="compact-card-content">
                      <h4 className="compact-card-title">{property.title}</h4>
                      <div className="compact-card-address">{property.address}</div>
                      <div className="compact-card-price">{formatPrice(property.price)}</div>
                      
                      <div className="compact-card-features">
                        <span>📐 {property.area} m²</span>
                        <span>🛏 {property.rooms} خواب</span>
                        {property.hasParking && <span>🚗</span>}
                        {property.hasElevator && <span>🛗</span>}
                        {property.hasLoan && <span>🏦 تسهیلات</span>}
                      </div>
                      
                      <div className="compact-card-stats">
                        <span>👁 {property.views}</span>
                        <span>📅 {property.createdAtPersianRelative || new Date(property.createdAt).toLocaleDateString('fa-IR')}</span>
                      </div>
                      
                      <div className="compact-card-actions">
                        <button 
                          className="compact-status-btn active-btn"
                          onClick={() => handleStatusChange(property.id, 'active')}
                          title="فعال"
                        >
                          ✅
                        </button>
                        <button 
                          className="compact-status-btn pending-btn"
                          onClick={() => handleStatusChange(property.id, 'pending')}
                          title="در انتظار"
                        >
                          ⏳
                        </button>
                        <button 
                          className="compact-status-btn sold-btn"
                          onClick={() => handleStatusChange(property.id, 'sold')}
                          title="فروخته شده"
                        >
                          💰
                        </button>
                        <button 
                          className="compact-status-btn archived-btn"
                          onClick={() => handleStatusChange(property.id, 'archived')}
                          title="بایگانی"
                        >
                          📦
                        </button>
                        {property.status === 'payment_pending' && (
                          <button 
                            className="compact-payment-btn"
                            onClick={() => setSelectedPaymentProperty(property)}
                            title="پرداخت و فعال‌سازی"
                          >
                            💳
                          </button>
                        )}
                        <button 
                          className="compact-edit"
                          onClick={() => handleEditProperty(property)}
                          title="ویرایش"
                        >
                          ✏️
                        </button>
                        <button 
                          className="compact-delete"
                          onClick={() => handleDeleteProperty(property)}
                          title="حذف"
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            : filteredProperties.map(property => {
                const statusInfo = getStatusLabel(property.status);
                return (
                  <div key={property.id} className="compact-list-item">
                    <div className="compact-list-image">
                      <img src={property.images?.[0] || '/api/placeholder/400/300'} alt={property.title} />
                    </div>
                    <div className="compact-list-content">
                      <div className="compact-list-header">
                        <div>
                          <h4>{property.title}</h4>
                          <div className="compact-list-address">{property.address}</div>
                        </div>
                        <div className={`compact-list-status ${statusInfo.class}`}>
                          {statusInfo.icon} {statusInfo.text}
                        </div>
                      </div>
                      
                      <div className="compact-list-info">
                        <span>{formatPrice(property.price)}</span>
                        <span>📐 {property.area}m²</span>
                        <span>🛏 {property.rooms} خواب</span>
                        <span>👁 {property.views} بازدید</span>
                      </div>
                      
                      <div className="compact-list-actions">
                        <button 
                          className="compact-status-btn-sm active-btn"
                          onClick={() => handleStatusChange(property.id, 'active')}
                          title="فعال"
                        >
                          ✅ فعال
                        </button>
                        <button 
                          className="compact-status-btn-sm pending-btn"
                          onClick={() => handleStatusChange(property.id, 'pending')}
                          title="در انتظار"
                        >
                          ⏳ در انتظار
                        </button>
                        <button 
                          className="compact-status-btn-sm sold-btn"
                          onClick={() => handleStatusChange(property.id, 'sold')}
                          title="فروخته شده"
                        >
                          💰 فروخته شده
                        </button>
                        <button 
                          className="compact-status-btn-sm archived-btn"
                          onClick={() => handleStatusChange(property.id, 'archived')}
                          title="بایگانی"
                        >
                          📦 بایگانی
                        </button>
                        {property.status === 'payment_pending' && (
                          <button 
                            className="compact-payment-btn-sm"
                            onClick={() => setSelectedPaymentProperty(property)}
                            title="پرداخت و فعال‌سازی"
                          >
                            💳 پرداخت
                          </button>
                        )}
                        <button 
                          className="compact-list-edit"
                          onClick={() => handleEditProperty(property)}
                        >
                          ✏️
                        </button>
                        <button 
                          className="compact-list-delete"
                          onClick={() => handleDeleteProperty(property)}
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
          }
        </div>
      )}

      {isEditModalOpen && selectedProperty && (
        <div className="compact-edit-modal" onClick={() => setIsEditModalOpen(false)}>
          <div className="compact-edit-content" onClick={(e) => e.stopPropagation()}>
            <div className="compact-edit-header">
              <h4>✏️ ویرایش ملک</h4>
              <button onClick={() => setIsEditModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <input type="text" name="title" placeholder="عنوان" defaultValue={selectedProperty.title} required />
              <input type="number" name="price" placeholder="قیمت (تومان)" defaultValue={Math.round(selectedProperty.price / 10000)} required />
              <input type="number" name="area" placeholder="متراژ" defaultValue={selectedProperty.area} required />
              <input type="text" name="region" placeholder="منطقه" defaultValue={selectedProperty.region} />
              <textarea name="address" placeholder="آدرس" rows="2" defaultValue={selectedProperty.address}></textarea>
              <input type="number" name="rooms" placeholder="تعداد اتاق" defaultValue={selectedProperty.rooms} />
              <input type="number" name="countFloor" placeholder="تعداد طبقات" defaultValue={selectedProperty.countFloor} />
              <input type="number" name="floor" placeholder="طبقه" defaultValue={selectedProperty.floor} />
              
              <div className="compact-checkbox-group">
                <label>
                  <input type="checkbox" name="hasParking" defaultChecked={selectedProperty.hasParking} value="true" />
                  پارکینگ
                </label>
                <label>
                  <input type="checkbox" name="hasElevator" defaultChecked={selectedProperty.hasElevator} value="true" />
                  آسانسور
                </label>
                <label>
                  <input type="checkbox" name="hasLoan" defaultChecked={selectedProperty.hasLoan} value="true" />
                  تسهیلات بانکی
                </label>
              </div>
              
              <div className="compact-edit-actions">
                <button type="submit" className="compact-save">💾 ذخیره</button>
                <button type="button" onClick={() => setIsEditModalOpen(false)}>انصراف</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {isAddModalOpen && (
        <AddPropertyModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => {
            fetchUserProperties();
            showToast('ملک با موفقیت ثبت شد', 'success');
          }}
        />
      )}

      {selectedPaymentProperty && (
        <PaymentModal
          isOpen={!!selectedPaymentProperty}
          onClose={() => setSelectedPaymentProperty(null)}
          property={selectedPaymentProperty}
          onSuccess={() => {
            fetchUserProperties();
            showToast('پرداخت با موفقیت انجام شد و آگهی شما فعال گردید', 'success');
          }}
        />
      )}
    </div>
  );
};

export default UserPropertiesPanel;