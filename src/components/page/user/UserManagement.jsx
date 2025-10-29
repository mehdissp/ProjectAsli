// import React, { useState, useEffect, useCallback } from 'react';
// import { useAuth } from '../../../context/AuthContext';
// import { userService } from '../../../services/user';
// import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
// import CreateUserModal from './CreateUserModal';

// // import ConfirmDeleteModal from './ConfirmDeleteModal/ConfirmDeleteModal';
// import Pagination from '../../common/Pagination/Pagination';
// import { 
//   FaEye, 
//   FaEdit, 
//   FaTrash, 
//   FaUser,
//   FaCalendar,
//   FaSync,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaPlus,
//   FaRedo,
//   FaEnvelope,
//   FaPhone,
//   FaUserTag,
//   FaHouseUser
// } from 'react-icons/fa';
// import './UserManagement.css';

// const UserManagement = () => {
//   const { user } = useAuth();
//   const [users, setUsers] = useState([]);
//     const [roles, setRoles] = useState([]); // حالت جدید برای نقش‌ها
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
  
//   // حالت‌های پیجینیشن
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     pageSize: 10,
//     totalCount: 0,
//     totalPages: 0,
//     max:0
//   });

//   // دریافت کاربران از API
//   const fetchUsers = useCallback(async (pageNumber = 1, pageSize = 10) => {
//     try {
//       setLoading(true);
//       setError(null);
//       console.log(`🔄 Fetching users page ${pageNumber}...`);
      
//       const response = await userService.getUsers(pageNumber, pageSize);
//       console.log(response);
//       console.log(response.data.items?.length);
//       console.log(response.data);
//       setUsers(response.data.items || []);
//       setPagination(prev => ({
//         ...prev,
//         currentPage: pageNumber,
//         totalCount: response.data.totalCount || 0,
//         totalPages: response.data.totalPages || 0,
//         max:response.data.max || 0,
//       }));
      
//       console.log('✅ Users fetched successfully:', {
//         count: response.data.items?.length,
//         total: response.data.totalCount,
//         pages: response.data.totalPages,
//         max:response.data.max
//       });
//     } catch (err) {
//       console.error('❌ Error fetching users:', err);
      
//       if (err.message?.includes('Rate limit')) {
//         setError(`خطای محدودیت درخواست: ${err.message}`);
//       } else if (err.response.data?.status === 429) {
//         setError('تعداد درخواست‌های شما زیاد است. لطفا چند دقیقه صبر کنید.');
//       } else {
//         setError('خطا در دریافت اطلاعات کاربران');
//         // داده‌های نمونه برای نمایش
//         const sampleData = getSampleUsers();
//         setUsers(sampleData);
//         setPagination(prev => ({
//           ...prev,
//           totalCount: sampleData.length,
//           totalPages: Math.ceil(sampleData.length / pagination.pageSize)
//         }));
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.pageSize]);

// // دریافت نقش‌های کاربر از API
// const fetchRoles = useCallback(async () => {
//   try {
//     console.log('🔄 Fetching user roles...');
//     const response = await userService.getUsersCombo();
//     console.log('✅ Roles fetched successfully:', response);
    
//     // فرض بر این که response.data شامل آرایه‌ای از نقش‌ها است
//     setRoles(response.data || []);
//   } catch (err) {
//     console.error('❌ Error fetching roles:', err);
//     // در صورت خطا، نقش‌های پیش‌فرض را تنظیم کنید
//     setRoles([
//       { id: 'admin', name: 'مدیر' },
//       { id: 'user', name: 'کاربر' },
//       { id: 'manager', name: 'مدیریت' }
//     ]);
//   }
// }, []);



//   useEffect(() => {
//     fetchUsers(pagination.currentPage, pagination.pageSize);
//      fetchRoles(); // بارگذاری نقش‌ها
//   }, [fetchUsers, pagination.currentPage, pagination.pageSize]);

//   // مدیریت حذف کاربر
//   const handleDeleteClick = (user) => {
//     setUserToDelete(user);
//     setIsDeleteModalOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (!userToDelete) return;

//     try {
//       setDeleteLoading(true);
//       console.log('🗑️ Deleting user:', userToDelete.name);
      
//       await userService.deleteUser(userToDelete.id);
      
//       console.log('✅ User deleted successfully');
      
//       setIsDeleteModalOpen(false);
//       setUserToDelete(null);
//       setError(null);
      
//       setTimeout(() => {
//         fetchUsers(pagination.currentPage, pagination.pageSize);
//       }, 500);
      
//     } catch (err) {
//       console.error('❌ Error deleting user:', err);
//       setIsDeleteModalOpen(false);
      
//       if (err.response?.data?.message) {
//         setError(err.response.data.message);
//       } else if (err.request?.response) {
//         try {
//           const errorData = JSON.parse(err.request.response);
//           setError(errorData.data?.message || errorData.message || 'خطا در حذف کاربر');
//         } catch (parseError) {
//           setError('خطا در حذف کاربر');
//         }
//       } else {
//         setError('خطا در حذف کاربر');
//       }
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   const handleCancelDelete = () => {
//     setIsDeleteModalOpen(false);
//     setUserToDelete(null);
//   };

//   // تغییر صفحه
//   const handlePageChange = (pageNumber) => {
//     setPagination(prev => ({ ...prev, currentPage: pageNumber }));
//   };

//   // تغییر سایز صفحه
//   const handlePageSizeChange = (newPageSize) => {
//     setPagination(prev => ({
//       ...prev,
//       pageSize: newPageSize,
//       currentPage: 1
//     }));
//   };

//   // وقتی کاربر جدید ایجاد شد
//   const handleUserCreated = useCallback(() => {
//     console.log('🔄 Refreshing users list after creation');
//     setPagination(prev => ({ ...prev, currentPage: 1 }));
//     setTimeout(() => {
//       fetchUsers(1, pagination.pageSize);
//     }, 500);
//   }, [fetchUsers, pagination.pageSize]);

//   // مدیریت خطا
//   const handleRetry = useCallback(() => {
//     setError(null);
//     fetchUsers(pagination.currentPage, pagination.pageSize);
//   }, [fetchUsers, pagination.currentPage, pagination.pageSize]);

//   // فرمت کردن تاریخ
//   const formatDate = (dateString) => {
//     if (!dateString) return '---';
//     const options = { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     };
//     return new Date(dateString).toLocaleDateString('fa-IR', options);
//   };

//   // وضعیت کاربر
//   const getStatusBadge = (user) => {
//     if (user.isActive) {
//       return (
//         <span className="status-badge status-active">
//           <FaCheckCircle className="status-icon" />
//           فعال
//         </span>
//       );
//     } else {
//       return (
//         <span className="status-badge status-inactive">
//           <FaTimesCircle className="status-icon" />
//           غیرفعال
//         </span>
//       );
//     }
//   };

//   // نقش کاربر
// // نقش کاربر
// const getRoleBadge = (user) => {
//   // پیدا کردن نقش کاربر در لیست نقش‌ها
//   const userRole = roles.find(role => role.id === user.role);
  
//   // اگر نقش پیدا شد از لیست API استفاده کن، در غیر این صورت از پیش‌فرض
//   if (userRole) {
//     const roleClass = `role-${user.role}`;
//     return (
//       <span className={`role-badge ${roleClass}`}>
//         <FaUserTag className="role-icon" />
//         {userRole.name}
//       </span>
//     );
//   }
  
//   // نقش‌های پیش‌فرض برای حالت fallback
//   const defaultRoles = {
//     admin: { label: 'مدیر', class: 'role-admin' },
//     user: { label: 'کاربر', class: 'role-user' },
//     manager: { label: 'مدیریت', class: 'role-manager' }
//   };
  
//   const role = defaultRoles[user.role] || defaultRoles.user;
  
//   return (
//     <span className={`role-badge ${role.class}`}>
//       <FaUserTag className="role-icon" />
//       {role.label}
//     </span>
//   );
// };

//   // محاسبه رکوردهای نمایش داده شده
//   const getDisplayRange = () => {
//     const start = ((pagination.currentPage - 1) * pagination.pageSize) + 1;
//     const end = Math.min(start + pagination.pageSize - 1, pagination.totalCount);
//     return { start, end };
//   };

//   const { start, end } = getDisplayRange();

//   if (loading && users.length === 0) {
//     return <LoadingSpinner text="در حال دریافت اطلاعات کاربران..." />;
//   }

//   return (
//     <div className="user-management-page">
//       <div className="page-header">
//         <h1>مدیریت کاربران</h1>
//         <p>لیست تمام کاربران سیستم</p>
//       </div>

//       <div className="user-actions">
//         <div className="actions-left">
//           <button 
//             className="btn btn-primary"
//             onClick={() => setIsCreateModalOpen(true)}
//             disabled={loading}
//           >
//             <FaPlus className="btn-icon" />
//             کاربر جدید
//           </button>
//           <button 
//             className="btn btn-secondary"
//             onClick={() => fetchUsers(pagination.currentPage, pagination.pageSize)}
//             disabled={loading}
//           >
//             <FaRedo className="btn-icon" />
//             {loading ? 'در حال بروزرسانی...' : 'بروزرسانی'}
//           </button>
//         </div>

//         <div className="page-size-selector">
//           <label>تعداد در صفحه:</label>
//           <select 
//             value={pagination.pageSize}
//             onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//             disabled={loading}
//           >
//             <option value="5">۵</option>
//             <option value="10">۱۰</option>
//             <option value="20">۲۰</option>
//             <option value="50">۵۰</option>
//           </select>
//         </div>
//       </div>

//       {error && (
//         <div className="error-banner">
//           <span className="error-icon">⚠️</span>
//           {error}
//           <button 
//             onClick={handleRetry}
//             className="btn-retry"
//           >
//             تلاش مجدد
//           </button>
//         </div>
//       )}

//       <div className="user-info">
//         <div className="total-info">
//           نمایش {start} تا {end} از {pagination.totalCount.toLocaleString()} کاربر
//         </div>
//       </div>

//       <div className="user-table-container">
//         <table className="user-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>اطلاعات کاربر</th>
//               <th>نام کاربر</th>
//               <th>نقش</th>
//               <th>وضعیت</th>
//               <th>تاریخ ثبت‌نام</th>
//               <th>عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length === 0 ? (
//               <tr>
//                 <td colSpan="7" className="no-data">
//                   <div className="no-data-content">
//                     <span className="no-data-icon">👥</span>
//                     <p>هیچ کاربری یافت نشد</p>
//                     <button 
//                       className="btn btn-primary"
//                       onClick={() => setIsCreateModalOpen(true)}
//                     >
//                       ایجاد اولین کاربر
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ) : (
//               users.map((user, index) => (
//                 <tr key={user.id || index} className="user-row">
//                   <td className="index-cell">
//                     {((pagination.currentPage - 1) * pagination.pageSize) + index + 1}
//                   </td>
//                   <td className="user-info-cell">
//                     <div className="user-info-content">
//                       <span className="user-avatar">
//                         <FaUser />
//                       </span>
//                       <div>
//                         <div className="user-name">{user.fullname}</div>
//                         <div className="user-phone">{user.mobileNumber || 'بدون شماره'}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="email-cell">
//                     <div className="email-content">
//                       <FaHouseUser className="email-icon" />
//                       {user.username}
//                     </div>
//                   </td>
//                   <td className="role-cell">
//                     {getRoleBadge(user)}
//                   </td>
//                   <td className="status-cell">
//                     {getStatusBadge(user)}
//                   </td>
//                   <td className="date-cell">
//                     <div className="date-content">
//                       <FaCalendar className="date-icon" />
//                       {formatDate(user.createdAt)}
//                     </div>
//                   </td>
//                   <td className="actions-cell">
//                     <div className="action-buttons">
//                       <button 
//                         className="btn-action btn-view"
//                         title="مشاهده پروفایل"
//                       >
//                         <FaEye />
//                       </button>
//                       <button 
//                         className="btn-action btn-edit"
//                         title="ویرایش کاربر"
//                       >
//                         <FaEdit />
//                       </button>
//                       <button 
//                         className="btn-action btn-delete"
//                         title="حذف کاربر"
//                         onClick={() => handleDeleteClick(user)}
//                         disabled={loading}
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* پیجینیشن */}
//       {pagination.totalPages > 1 && (
//         <div className="pagination-container">
//           <Pagination
//             currentPage={pagination.currentPage}
//             totalPages={pagination.totalPages}
//             totalItems={pagination.totalCount}
//             pageSize={pagination.pageSize}
//             onPageChange={handlePageChange}
//             disabled={loading}
//           />
//         </div>
//       )}

//       <div className="project-stats">
//         <div className="stat-card">
//           <div className="stat-icon total">👥</div>
//           <div className="stat-content">
//             <div className="stat-value">{pagination.totalCount}</div>
//             <div className="stat-label">کل کاربران</div>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon active">✅</div>
//           <div className="stat-content">
//             <div className="stat-value">
//               {pagination.max}
//             </div>
//             <div className="stat-label">سقف مجاز کاربران </div>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon admins">👑</div>
//           <div className="stat-content">
//             <div className="stat-value">
//         {pagination.max - pagination.totalCount}
//             </div>
//             <div className="stat-label"> مانده مجاز</div>
//           </div>
//         </div>
//       </div>

//       {/* Modal ایجاد کاربر جدید */}
//       <CreateUserModal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         onUserCreated={handleUserCreated}
//           roles={roles} // ارسال لیست نقش‌ها به مودال
//       />

//       {/* Modal تأیید حذف */}
//       {/* <ConfirmDeleteModal
//         isOpen={isDeleteModalOpen}
//         onClose={handleCancelDelete}
//         onConfirm={handleConfirmDelete}
//         itemName={userToDelete?.name}
//         itemType="کاربر"
//         loading={deleteLoading}
//       /> */}
//     </div>
//   );
// };

// // داده‌های نمونه برای زمانی که API در دسترس نیست
// const getSampleUsers = () => [
//   {
//     id: 1,
//     name: "علیرضا محمدی",
//     email: "alireza@example.com",
//     phone: "09123456789",
//     role: "admin",
//     isActive: true,
//     createdAt: "2024-01-15T10:30:00.000Z"
//   },
//   {
//     id: 2,
//     name: "فاطمه زارعی",
//     email: "fatemeh@example.com",
//     phone: "09129876543",
//     role: "user",
//     isActive: true,
//     createdAt: "2024-01-20T14:45:00.000Z"
//   },
//   {
//     id: 3,
//     name: "محمد رضایی",
//     email: "mohammad@example.com",
//     phone: null,
//     role: "manager",
//     isActive: false,
//     createdAt: "2024-01-25T09:15:00.000Z"
//   }
// ];

// export default UserManagement;

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { userService } from '../../../services/user';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal'; // کامپوننت جدید برای ویرایش
// import ConfirmDeleteModal from './ConfirmDeleteModal/ConfirmDeleteModal';
import Pagination from '../../common/Pagination/Pagination';
import { 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaUser,
  FaCalendar,
  FaSync,
  FaCheckCircle,
  FaTimesCircle,
  FaPlus,
  FaRedo,
  FaEnvelope,
  FaPhone,
  FaUserTag,
  FaHouseUser
} from 'react-icons/fa';
import './UserManagement.css';

const UserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // حالت جدید برای ویرایش
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null); // کاربری که قرار است ویرایش شود
  
  // حالت‌های پیجینیشن
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    max: 0
  });

  // دریافت کاربران از API
  const fetchUsers = useCallback(async (pageNumber = 1, pageSize = 10) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`🔄 Fetching users page ${pageNumber}...`);
      
      const response = await userService.getUsers(pageNumber, pageSize);
      console.log(response);
      console.log(response.data.items?.length);
      console.log(response.data);
      setUsers(response.data.items || []);
      setPagination(prev => ({
        ...prev,
        currentPage: pageNumber,
        totalCount: response.data.totalCount || 0,
        totalPages: response.data.totalPages || 0,
        max: response.data.max || 0,
      }));
      
      console.log('✅ Users fetched successfully:', {
        count: response.data.items?.length,
        total: response.data.totalCount,
        pages: response.data.totalPages,
        max: response.data.max
      });
    } catch (err) {
      console.error('❌ Error fetching users:', err);
      
      if (err.message?.includes('Rate limit')) {
        setError(`خطای محدودیت درخواست: ${err.message}`);
      } else if (err.response.data?.status === 429) {
        setError('تعداد درخواست‌های شما زیاد است. لطفا چند دقیقه صبر کنید.');
      } else {
        setError('خطا در دریافت اطلاعات کاربران');
        // داده‌های نمونه برای نمایش
        const sampleData = getSampleUsers();
        setUsers(sampleData);
        setPagination(prev => ({
          ...prev,
          totalCount: sampleData.length,
          totalPages: Math.ceil(sampleData.length / pagination.pageSize)
        }));
      }
    } finally {
      setLoading(false);
    }
  }, [pagination.pageSize]);

  // دریافت نقش‌های کاربر از API
  const fetchRoles = useCallback(async () => {
    try {
      console.log('🔄 Fetching user roles...');
      const response = await userService.getUsersCombo();
      console.log('✅ Roles fetched successfully:', response);
      
      // setRoles(response.data || []);
    } catch (err) {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
      console.error('❌ Error fetching roles:', err);
      // setRoles([
      //   { id: 'admin', name: 'مدیر' },
      //   { id: 'user', name: 'کاربر' },
      //   { id: 'manager', name: 'مدیریت' }
      // ]);
    }
  }, []);

  useEffect(() => {
    fetchUsers(pagination.currentPage, pagination.pageSize);
    fetchRoles();
  }, [fetchUsers, fetchRoles, pagination.currentPage, pagination.pageSize]);

  // مدیریت حذف کاربر
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  // مدیریت ویرایش کاربر
  const handleEditClick = (user) => {
    console.log(user)
    setUserToEdit(user);
    setIsEditModalOpen(true);
   
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      setDeleteLoading(true);
      console.log('🗑️ Deleting user:', userToDelete.name);
      
      await userService.deleteUser(userToDelete.id);
      
      console.log('✅ User deleted successfully');
      
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      setError(null);
      
      setTimeout(() => {
        fetchUsers(pagination.currentPage, pagination.pageSize);
      }, 500);
      
    } catch (err) {
      console.error('❌ Error deleting user:', err);
      setIsDeleteModalOpen(false);
      
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.request?.response) {
        try {
          const errorData = JSON.parse(err.request.response);
          setError(errorData.data?.message || errorData.message || 'خطا در حذف کاربر');
        } catch (parseError) {
          setError('خطا در حذف کاربر');
        }
      } else {
        setError('خطا در حذف کاربر');
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  // وقتی کاربر ویرایش شد
  const handleUserUpdated = useCallback(() => {
    console.log('🔄 Refreshing users list after update');
 
    setTimeout(() => {
      fetchUsers(1, pagination.pageSize);
    }, 500);
  }, [fetchUsers, pagination.pageSize]);

  // وقتی کاربر جدید ایجاد شد
  const handleUserCreated = useCallback(() => {
    console.log('🔄 Refreshing users list after creation');
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setTimeout(() => {
      fetchUsers(1, pagination.pageSize);
    }, 500);
  }, [fetchUsers, pagination.pageSize]);

  // تغییر صفحه
  const handlePageChange = (pageNumber) => {
    setPagination(prev => ({ ...prev, currentPage: pageNumber }));
  };

  // تغییر سایز صفحه
  const handlePageSizeChange = (newPageSize) => {
    setPagination(prev => ({
      ...prev,
      pageSize: newPageSize,
      currentPage: 1
    }));
  };

  // مدیریت خطا
  const handleRetry = useCallback(() => {
    setError(null);
    fetchUsers(pagination.currentPage, pagination.pageSize);
  }, [fetchUsers, pagination.currentPage, pagination.pageSize]);

  // فرمت کردن تاریخ
  const formatDate = (dateString) => {
    if (!dateString) return '---';
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fa-IR', options);
  };

  // وضعیت کاربر
  const getStatusBadge = (user) => {
    if (user.isActive) {
      return (
        <span className="status-badge status-active">
          <FaCheckCircle className="status-icon" />
          فعال
        </span>
      );
    } else {
      return (
        <span className="status-badge status-inactive">
          <FaTimesCircle className="status-icon" />
          غیرفعال
        </span>
      );
    }
  };

  // // نقش کاربر
  // const getRoleBadge = (user) => {
  //   console.log('nagsh',user)
  //   // const userRole = roles.find(role => role.id === user.roleId);
  //   //     console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",roles)
  //   // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",userRole)
    
  //   if (user.roleName) {
  //     const roleClass = `role-${user.role}`;
  //     return (
  //       <span className={`role-badge ${roleClass}`}>
  //         <FaUserTag className="role-icon" />
  //         {user.roleName}
  //       </span>
  //     );
  //   }
    
  //   const defaultRoles = {
  //     admin: { label: 'مدیر', class: 'role-admin' },
  //     user: { label: 'کاربر', class: 'role-user' },
  //     manager: { label: 'مدیریت', class: 'role-manager' }
  //   };
    
  //   const role = defaultRoles[user.roleName] || defaultRoles.user;
  //   console.log(defaultRoles[user.roleName])
  //   return (
  //     <span className={`role-badge ${role.class}`}>
  //       <FaUserTag className="role-icon" />
  //       {role.label}
  //     </span>
  //   );
  // };

  // نقش کاربر
const getRoleBadge = (user) => {
  console.log('User data for role:', user);
  
  if (user.roleName) {
    // استفاده از roleName برای کلاس CSS (با حذف فاصله و کاراکترهای خاص)
    const roleClass = `role-${user.roleName.replace(/\s+/g, '-').toLowerCase()}`;
    return (
      <span className={`role-badge ${roleClass}`}>
        <FaUserTag className="role-icon" />
        {user.roleName}
      </span>
    );
  }
  
  // fallback برای زمانی که roleName وجود ندارد
  const defaultRoles = {
    admin: { label: 'مدیر', class: 'role-admin' },
    user: { label: 'کاربر', class: 'role-user' },
    manager: { label: 'مدیریت', class: 'role-manager' }
  };
  
  // اگر roleId داریم، سعی کنیم نقش مربوطه را پیدا کنیم
  if (user.roleId) {
    // اینجا می‌توانید از لیست roles استفاده کنید اگر دارید
    // const userRole = roles.find(role => role.id === user.roleId);
  }
  
  const role = defaultRoles[user.roleName] || defaultRoles.user;
  return (
    <span className={`role-badge ${role.class}`}>
      <FaUserTag className="role-icon" />
      {user.roleName}
    </span>
  );
};

  // محاسبه رکوردهای نمایش داده شده
  const getDisplayRange = () => {
    const start = ((pagination.currentPage - 1) * pagination.pageSize) + 1;
    const end = Math.min(start + pagination.pageSize - 1, pagination.totalCount);
    return { start, end };
  };

  const { start, end } = getDisplayRange();

  if (loading && users.length === 0) {
    return <LoadingSpinner text="در حال دریافت اطلاعات کاربران..." />;
  }

  return (
    <div className="user-management-page">
      <div className="page-header">
        <h1>مدیریت کاربران</h1>
        <p>لیست تمام کاربران سیستم</p>
      </div>

      <div className="user-actions">
        <div className="actions-left">
          <button 
            className="btn btn-primary"
            onClick={() => setIsCreateModalOpen(true)}
            disabled={loading}
          >
            <FaPlus className="btn-icon" />
            کاربر جدید
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => fetchUsers(pagination.currentPage, pagination.pageSize)}
            disabled={loading}
          >
            <FaRedo className="btn-icon" />
            {loading ? 'در حال بروزرسانی...' : 'بروزرسانی'}
          </button>
        </div>

        <div className="page-size-selector">
          <label>تعداد در صفحه:</label>
          <select 
            value={pagination.pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            disabled={loading}
          >
            <option value="5">۵</option>
            <option value="10">۱۰</option>
            <option value="20">۲۰</option>
            <option value="50">۵۰</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          {error}
          <button 
            onClick={handleRetry}
            className="btn-retry"
          >
            تلاش مجدد
          </button>
        </div>
      )}

      <div className="user-info">
        <div className="total-info">
          نمایش {start} تا {end} از {pagination.totalCount.toLocaleString()} کاربر
        </div>
      </div>

      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>اطلاعات کاربر</th>
              <th>نام کاربر</th>
              <th>نقش</th>
              <th>وضعیت</th>
              <th>تاریخ ثبت‌نام</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  <div className="no-data-content">
                    <span className="no-data-icon">👥</span>
                    <p>هیچ کاربری یافت نشد</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setIsCreateModalOpen(true)}
                    >
                      ایجاد اولین کاربر
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id || index} className="user-row">
                  <td className="index-cell">
                    {((pagination.currentPage - 1) * pagination.pageSize) + index + 1}
                  </td>
                  <td className="user-info-cell">
                    <div className="user-info-content">
                      <span className="user-avatar">
                        <FaUser />
                      </span>
                      <div>
                        <div className="user-name">{user.fullname}</div>
                        <div className="user-phone">{user.mobileNumber || 'بدون شماره'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="email-cell">
                    <div className="email-content">
                      <FaHouseUser className="email-icon" />
                      {user.username}
                    </div>
                  </td>
                  <td className="role-cell">
                    {getRoleBadge(user)}
                  </td>
                  <td className="status-cell">
                    {getStatusBadge(user)}
                  </td>
                  <td className="date-cell">
                    <div className="date-content">
                      <FaCalendar className="date-icon" />
                      {formatDate(user.createdAt)}
                    </div>
                  </td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <button 
                        className="btn-action btn-view"
                        title="مشاهده پروفایل"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="btn-action btn-edit"
                        title="ویرایش کاربر"
                        onClick={() => handleEditClick(user)}
                      >
                        <FaEdit />
                      </button>
                      {/* <button 
                        className="btn-action btn-delete"
                        title="حذف کاربر"
                        onClick={() => handleDeleteClick(user)}
                        disabled={loading}
                      >
                        <FaTrash />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* پیجینیشن */}
      {pagination.totalPages > 1 && (
        <div className="pagination-container">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalCount}
            pageSize={pagination.pageSize}
            onPageChange={handlePageChange}
            disabled={loading}
          />
        </div>
      )}

      <div className="project-stats">
        <div className="stat-card">
          <div className="stat-icon total">👥</div>
          <div className="stat-content">
            <div className="stat-value">{pagination.totalCount}</div>
            <div className="stat-label">کل کاربران</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">✅</div>
          <div className="stat-content">
            <div className="stat-value">
              {pagination.max}
            </div>
            <div className="stat-label">سقف مجاز کاربران </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon admins">👑</div>
          <div className="stat-content">
            <div className="stat-value">
              {pagination.max - pagination.totalCount}
            </div>
            <div className="stat-label"> مانده مجاز</div>
          </div>
        </div>
      </div>

      {/* Modal ایجاد کاربر جدید */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onUserCreated={handleUserCreated}
        roles={roles}
      />

      {/* Modal ویرایش کاربر */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUserUpdated={handleUserUpdated}
        user={userToEdit}
        // roles={roles}
      />

      {/* Modal تأیید حذف */}
      {/* <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemName={userToDelete?.name}
        itemType="کاربر"
        loading={deleteLoading}
      /> */}
    </div>
  );
};

// داده‌های نمونه برای زمانی که API در دسترس نیست
const getSampleUsers = () => [
  {
    id: 1,
    name: "علیرضا محمدی",
    email: "alireza@example.com",
    phone: "09123456789",
    role: "admin",
    isActive: true,
    createdAt: "2024-01-15T10:30:00.000Z"
  },
  {
    id: 2,
    name: "فاطمه زارعی",
    email: "fatemeh@example.com",
    phone: "09129876543",
    role: "user",
    isActive: true,
    createdAt: "2024-01-20T14:45:00.000Z"
  },
  {
    id: 3,
    name: "محمد رضایی",
    email: "mohammad@example.com",
    phone: null,
    role: "manager",
    isActive: false,
    createdAt: "2024-01-25T09:15:00.000Z"
  }
];

export default UserManagement;