import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { roleService } from '../../../services/role';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';

import Pagination from '../../common/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import { 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaFolder,
  FaCalendar,
  FaSync,
  FaChartBar,
  FaRocket,
  FaCheckCircle,
  FaPlus,
  FaRedo,
} from 'react-icons/fa';
import { 
  HiOutlineExclamationCircle ,HiFingerPrint
} from 'react-icons/hi';
import './Role.css';

const Role = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]); // تغییر نام از role به roles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null); // تغییر نام از projectToDelete
  
  // حالت‌های پیجینیشن
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0
  });

  // دریافت نقش‌ها از API
  const fetchRoles = useCallback(async (pageNumber = 1, pageSize = 10) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`🔄 Fetching roles page ${pageNumber}...`);
      
      const response = await roleService.getRoles(pageNumber, pageSize);
      
      // استفاده از ساختار جدید API
      setRoles(response.items || []);
      setPagination(prev => ({
        ...prev,
        currentPage: pageNumber,
        totalCount: response.totalCount || 0,
        totalPages: response.totalPages || 0
      }));
      
      console.log('✅ Roles fetched successfully:', {
        count: response.items?.length,
        total: response.totalCount,
        pages: response.totalPages
      });
    } catch (err) {
      console.error('❌ Error fetching roles:', err);
      
      if (err.message?.includes('Rate limit')) {
        setError(`خطای محدودیت درخواست: ${err.message}`);
      } else if (err.response?.status === 429) {
        setError('تعداد درخواست‌های شما زیاد است. لطفا چند دقیقه صبر کنید.');
      } else {
        setError('خطا در دریافت اطلاعات نقش‌ها');
        // داده‌های نمونه برای نمایش
        const sampleData = getSampleRoles();
        setRoles(sampleData);
        setPagination(prev => ({
          ...prev,
          totalCount: sampleData.length,
          totalPages: Math.ceil(sampleData.length / pageSize)
        }));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles(pagination.currentPage, pagination.pageSize); // اصلاح: اضافه شدن fetchRoles
  }, [fetchRoles, pagination.currentPage, pagination.pageSize]);

  // مدیریت کلیک روی دکمه مشاهده
  const handleViewClick = (role) => {
    console.log('👁️ Viewing role:', role);
    
    // گرفتن آیدی نقش - با توجه به ساختار داده‌های شما
    const roleId = role.id ;
    const name = role.name;
    
    if (roleId) {
      console.log(`📍 Navigating to MenuAccess with roleId: ${roleId}`);
      
      navigate('/MenuAccess', { 
        state: { 
          roleId: roleId,
          name: role.name 
        }
      });
    } else {
      console.error('❌ Role ID not found:', role);
      setError('آیدی نقش یافت نشد');
    }
  };

  // تغییر صفحه
  const handlePageChange = (pageNumber) => {
    setPagination(prev => ({ ...prev, currentPage: pageNumber }));
  };

  // تغییر سایز صفحه
  const handlePageSizeChange = (newPageSize) => {
    setPagination(prev => ({
      ...prev,
      pageSize: newPageSize,
      currentPage: 1 // بازگشت به صفحه اول
    }));
  };

  // مدیریت خطا
  const handleRetry = useCallback(() => {
    setError(null);
    fetchRoles(pagination.currentPage, pagination.pageSize);
  }, [fetchRoles, pagination.currentPage, pagination.pageSize]);

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

  // محاسبه رکوردهای نمایش داده شده
  const getDisplayRange = () => {
    const start = ((pagination.currentPage - 1) * pagination.pageSize) + 1;
    const end = Math.min(start + pagination.pageSize - 1, pagination.totalCount);
    return { start, end };
  };

  const { start, end } = getDisplayRange();

  if (loading && roles.length === 0) {
    return <LoadingSpinner text="در حال دریافت اطلاعات نقش ها..." />;
  }

  return (
    <div className="project-page">
      <div className="page-header">
        <h1>مدیریت نقش ها</h1>
        <p>لیست تمام نقش های سیستم</p>
      </div>

      <div className="project-actions">
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

      <div className="project-info">
        <div className="total-info">
          نمایش {start} تا {end} از {pagination.totalCount.toLocaleString()} نقش
        </div>
      </div>

      <div className="project-table-container">
        <table className="project-table">
          <thead>
            <tr>
              <th>#</th>
              <th>نام نقش</th>
              <th>توضیحات</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {roles.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data"> 
                  <div className="no-data-content">
                    <span className="no-data-icon">📭</span>
                    <p>هیچ نقشی یافت نشد</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setIsCreateModalOpen(true)}
                    >
                      ایجاد اولین نقش
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              roles.map((role, index) => ( // اصلاح: تغییر از project به role
                <tr key={role.id || role.rowNum || index} className="project-row"> 
                  <td className="index-cell">
                    {((pagination.currentPage - 1) * pagination.pageSize) + index + 1}
                  </td>
                  <td className="project-name">
                    <div className="project-name-content">
                      <span className="project-icon">📁</span>
                      <div>
                        <div className="project-title">{role.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="project-description">
                    {role.description || 'بدون توضیحات'}
                  </td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <button 
                        className="btn-action btn-view"
                        title="دسترسی"
                        onClick={() => handleViewClick(role)} 
                      >
                        <HiFingerPrint />
                      </button>
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

      {/* Modal ایجاد نقش جدید */}


      {/* Modal تأیید حذف */}

    </div>
  );
};

// داده‌های نمونه برای زمانی که API در دسترس نیست
const getSampleRoles = () => [ // اصلاح: تغییر نام تابع
  {
    id: 1,
    name: "مدیر سیستم",
    createdAt: "2025-10-16T06:27:17.6312536",
    description: "نقش مدیریت کامل سیستم"
  },
  {
    id: 2,
    name: "کاربر عادی",
    createdAt: "2025-10-16T06:14:41.4066667",
    description: "نقش کاربر معمولی سیستم"
  },
  {
    id: 3,
    name: "مشاهده‌گر", 
    createdAt: "2025-10-13T12:35:22.2400816",
    description: "نقش فقط مشاهده اطلاعات"
  }
];

export default Role;