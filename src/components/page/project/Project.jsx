// // components/project/Project/Project.jsx
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../../context/AuthContext';
// import useApi from '../../../hooks/useApi';
// import { projectService } from '../../../services/project';
// import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
// import CreateProjectModal from './CreateProjectModal';
// import './Project.css';

// const Project = () => {
//   const { user } = useAuth();
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);

//   // دریافت پروژه‌ها از API
//   const fetchProjects = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const projectsData = await projectService.getProjects();
//       setProjects(projectsData);
//     } catch (err) {
//       console.error('Error fetching projects:', err);
//       setError('خطا در دریافت اطلاعات پروژه‌ها');
//       // داده‌های نمونه برای نمایش
//       setProjects(getSampleProjects());
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, [refreshTrigger]);

//   // وقتی پروژه جدید ایجاد شد
//   const handleProjectCreated = () => {
//     console.log('🔄 Refreshing projects list after creation');
//     setRefreshTrigger(prev => prev + 1);
//   };

//   // فرمت کردن تاریخ
//   const formatDate = (dateString) => {
//     const options = { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     };
//     return new Date(dateString).toLocaleDateString('fa-IR', options);
//   };

//   // گرفتن وضعیت پروژه
//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       active: { label: 'فعال', class: 'status-active' },
//       completed: { label: 'تکمیل شده', class: 'status-completed' },
//       pending: { label: 'در انتظار', class: 'status-pending' },
//       cancelled: { label: 'لغو شده', class: 'status-cancelled' }
//     };
    
//     const config = statusConfig[status] || { label: status, class: 'status-default' };
//     return <span className={`status-badge ${config.class}`}>{config.label}</span>;
//   };

//   // گرفتن اولویت پروژه
//   const getPriorityBadge = (priority) => {
//     const priorityConfig = {
//       high: { label: 'بالا', class: 'priority-high' },
//       medium: { label: 'متوسط', class: 'priority-medium' },
//       low: { label: 'پایین', class: 'priority-low' }
//     };
    
//     const config = priorityConfig[priority] || { label: priority, class: 'priority-default' };
//     return <span className={`priority-badge ${config.class}`}>{config.label}</span>;
//   };

//   if (loading && projects.length === 0) {
//     return <LoadingSpinner text="در حال دریافت اطلاعات پروژه‌ها..." />;
//   }

//   return (
//     <div className="project-page">
//       <div className="page-header">
//         <h1>مدیریت پروژه‌ها</h1>
//         <p>لیست تمام پروژه‌های سیستم</p>
//       </div>

//       <div className="project-actions">
//         <button 
//           className="btn btn-primary"
//           onClick={() => setIsCreateModalOpen(true)}
//         >
//           <span className="btn-icon">➕</span>
//           پروژه جدید
//         </button>
//         <button 
//           className="btn btn-secondary"
//           onClick={fetchProjects}
//           disabled={loading}
//         >
//           <span className="btn-icon">🔄</span>
//           بروزرسانی
//         </button>
//       </div>

//       {error && (
//         <div className="error-banner">
//           <span className="error-icon">⚠️</span>
//           {error}
//         </div>
//       )}

//       <div className="project-table-container">
//         <table className="project-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>نام پروژه</th>
//               <th>توضیحات</th>
//               <th>وضعیت</th>
//               <th>اولویت</th>
//               <th>تاریخ ایجاد</th>
//               <th>تاریخ بروزرسانی</th>
//               <th>عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {projects.length === 0 ? (
//               <tr>
//                 <td colSpan="8" className="no-data">
//                   <div className="no-data-content">
//                     <span className="no-data-icon">📭</span>
//                     <p>هیچ پروژه‌ای یافت نشد</p>
//                     <button 
//                       className="btn btn-primary"
//                       onClick={() => setIsCreateModalOpen(true)}
//                     >
//                       ایجاد اولین پروژه
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ) : (
//               projects.map((project, index) => (
//                 <tr key={project.id} className="project-row">
//                   <td className="index-cell">{index + 1}</td>
//                   <td className="project-name">
//                     <div className="project-name-content">
//                       <span className="project-icon">📁</span>
//                       <div>
//                         <div className="project-title">{project.name}</div>
//                         <div className="project-code">{project.code}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="project-description">
//                     {project.description || 'بدون توضیحات'}
//                   </td>
//                   <td className="status-cell">
//                     {getStatusBadge(project.status)}
//                   </td>
//                   <td className="priority-cell">
//                     {getPriorityBadge(project.priority)}
//                   </td>
//                   <td className="date-cell">
//                     <div className="date-content">
//                       <span className="date-icon">📅</span>
//                       {formatDate(project.createdAt)}
//                     </div>
//                   </td>
//                   <td className="date-cell">
//                     <div className="date-content">
//                       <span className="date-icon">🔄</span>
//                       {formatDate(project.updatedAt)}
//                     </div>
//                   </td>
//                   <td className="actions-cell">
//                     <div className="action-buttons">
//                       <button 
//                         className="btn-action btn-view"
//                         title="مشاهده"
//                       >
//                         👁️
//                       </button>
//                       <button 
//                         className="btn-action btn-edit"
//                         title="ویرایش"
//                       >
//                         ✏️
//                       </button>
//                       <button 
//                         className="btn-action btn-delete"
//                         title="حذف"
//                       >
//                         🗑️
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="project-stats">
//         <div className="stat-card">
//           <div className="stat-icon total">📊</div>
//           <div className="stat-content">
//             <div className="stat-value">{projects.length}</div>
//             <div className="stat-label">کل پروژه‌ها</div>
//           </div>
//         </div>
// <div className="stat-card">
//   <div className="stat-icon active">🚀</div>
//   <div className="stat-content">
//     <div className="stat-value">
//       {projects.length > 0 ? projects[0].maxProjects : '0'}
//     </div>
//     <div className="stat-label">تعداد پروژه قابل تعریف</div>
//   </div>
// </div>
//       <div className="stat-card">
//   <div className="stat-icon completed">✅</div>
//   <div className="stat-content">
//     <div className="stat-value">
//       {projects.length}
//       <span className="stat-divider">/</span>
//       { projects[0].maxProjects }
//     </div>
//     <div className="stat-label">تکمیل شده از کل مجاز</div>
//   </div>
// </div>
//       </div>

//       {/* Modal ایجاد پروژه جدید */}
//       <CreateProjectModal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         onProjectCreated={handleProjectCreated}
//       />
//     </div>
//   );
// };

// // داده‌های نمونه برای زمانی که API در دسترس نیست
// const getSampleProjects = () => [
//   // ... داده‌های نمونه قبلی
// ];

// export default Project;

// components/project/Project/Project.jsx
// components/project/Project/Project.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { projectService } from '../../../services/project';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import CreateProjectModal from './CreateProjectModal';
import ConfirmDeleteModal from './ConfirmDeleteModal/ConfirmDeleteModal';
import Pagination from '../../common/Pagination/Pagination';
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
  FaRedo
} from 'react-icons/fa';
import { 
  HiOutlineExclamationCircle 
} from 'react-icons/hi';
import './Project.css';

const Project = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  
  // حالت‌های پیجینیشن
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0
  });

  // دریافت پروژه‌ها از API
  const fetchProjects = useCallback(async (pageNumber = 1, pageSize = 10) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`🔄 Fetching projects page ${pageNumber}...`);
      
      const response = await projectService.getProjects(pageNumber, pageSize);
      
      // استفاده از ساختار جدید API
      setProjects(response.items || []);
      setPagination(prev => ({
        ...prev,
        currentPage: pageNumber,
        totalCount: response.totalCount || 0,
        totalPages: response.totalPages || 0
      }));
      
      console.log('✅ Projects fetched successfully:', {
        count: response.items?.length,
        total: response.totalCount,
        pages: response.totalPages
      });
    } catch (err) {
      console.error('❌ Error fetching projects:', err);
      
      if (err.message?.includes('Rate limit')) {
        setError(`خطای محدودیت درخواست: ${err.message}`);
      } else if (err.response?.status === 429) {
        setError('تعداد درخواست‌های شما زیاد است. لطفا چند دقیقه صبر کنید.');
      } else {
        setError('خطا در دریافت اطلاعات پروژه‌ها');
        // داده‌های نمونه برای نمایش
        const sampleData = getSampleProjects();
        setProjects(sampleData);
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

  useEffect(() => {
    fetchProjects(pagination.currentPage, pagination.pageSize);
  }, [fetchProjects, pagination.currentPage, pagination.pageSize]);
  // مدیریت حذف پروژه
  const handleDeleteClick = (project) => {
    console.log('delete')
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
        console.log(isDeleteModalOpen)
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      setDeleteLoading(true);
      console.log('🗑️ Deleting project:', projectToDelete.name);
      
      await projectService.deleteProject(projectToDelete.id || projectToDelete.rowNum);
      
      console.log('✅ Project deleted successfully');
      
      // بستن modal
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
      
      // نمایش پیغام موفقیت
      setError(null);
      
      // بروزرسانی لیست
      setTimeout(() => {
        fetchProjects(pagination.currentPage, pagination.pageSize);
      }, 500);
      
    }  catch (err) {
  console.error('❌ Error deleting project:', err);
   setIsDeleteModalOpen(false);
  // روش اول: اگر response ساختار مشخصی دارد
  if (err.response?.data?.message) {
    setError(err.response.data.message);
  } 
  // روش دوم: اگر response رشته است
  else if (err.request?.response) {
    try {
      const errorData = JSON.parse(err.request.response);
      setError(errorData.data?.message || errorData.message || 'خطا در حذف پروژه');
    } catch (parseError) {
      setError('خطا در حذف پروژه');
    }
  }
  // روش سوم: fallback
  else {
    setError('خطا در حذف پروژه');
  }
}finally {
      setDeleteLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
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

  // وقتی پروژه جدید ایجاد شد
  const handleProjectCreated = useCallback(() => {
    console.log('🔄 Refreshing projects list after creation');
    // بازگشت به صفحه اول و بروزرسانی
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setTimeout(() => {
      fetchProjects(1, pagination.pageSize);
    }, 500);
  }, [fetchProjects, pagination.pageSize]);

  // مدیریت خطا
  const handleRetry = useCallback(() => {
    setError(null);
    fetchProjects(pagination.currentPage, pagination.pageSize);
  }, [fetchProjects, pagination.currentPage, pagination.pageSize]);

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

  // گرفتن وضعیت پروژه - با توجه به داده‌های جدید
  const getStatusBadge = (project) => {
    // از آنجایی که در داده‌های API وضعیت مشخص نیست، می‌توانیم بر اساس تاریخ یا سایر فیلدها وضعیت را تعیین کنیم
    const createdDate = new Date(project.createdAt);
    const now = new Date();
    const diffDays = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) {
       return (
        <span className="status-badge status-active">
          <FaRocket className="status-icon" />
          جدید
        </span>
      );
    } else if (diffDays < 30) {
           return (
        <span className="status-badge status-pending">
          <FaSync className="status-icon" />
          در حال انجام
        </span>
      );
    } else {
         return (
        <span className="status-badge status-completed">
          <FaCheckCircle className="status-icon" />
          قدیمی
        </span>
      );
    }
  };

  // گرفتن اولویت پروژه - با توجه به داده‌های جدید
  const getPriorityBadge = (project) => {
    // از آنجایی که در داده‌های API اولویت مشخص نیست، می‌توانیم بر اساس rowNum اولویت را تعیین کنیم
    if (project.rowNum === 1) {
      return <span className="priority-badge priority-high">بالا</span>;
    } else if (project.rowNum <= 3) {
      return <span className="priority-badge priority-medium">متوسط</span>;
    } else {
      return <span className="priority-badge priority-low">پایین</span>;
    }
  };

  // محاسبه رکوردهای نمایش داده شده
  const getDisplayRange = () => {
    const start = ((pagination.currentPage - 1) * pagination.pageSize) + 1;
    const end = Math.min(start + pagination.pageSize - 1, pagination.totalCount);
    return { start, end };
  };

  const { start, end } = getDisplayRange();

  // گرفتن maxProjects از اولین پروژه (همانطور که در API برگردانده شده)
  const maxProjects = projects.length > 0 ? projects[0].maxProjects : 0;

  if (loading && projects.length === 0) {
    return <LoadingSpinner text="در حال دریافت اطلاعات پروژه‌ها..." />;
  }

  return (
    <div className="project-page">
      <div className="page-header">
        <h1>مدیریت پروژه‌ها</h1>
        <p>لیست تمام پروژه‌های سیستم</p>
      </div>

      <div className="project-actions">
        <div className="actions-left">
          <button 
            className="btn btn-primary"
            onClick={() => setIsCreateModalOpen(true)}
            disabled={loading}
          >
                   <FaPlus className="btn-icon" />
            پروژه جدید
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => fetchProjects(pagination.currentPage, pagination.pageSize)}
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

      <div className="project-info">
        <div className="total-info">
          نمایش {start} تا {end} از {pagination.totalCount.toLocaleString()} پروژه
        </div>
      </div>

      <div className="project-table-container">
        <table className="project-table">
          <thead>
            <tr>
              <th>#</th>
              <th>نام پروژه</th>
              <th>توضیحات</th>
              <th>وضعیت</th>
     
              <th>تاریخ ایجاد</th>
  
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  <div className="no-data-content">
                    <span className="no-data-icon">📭</span>
                    <p>هیچ پروژه‌ای یافت نشد</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setIsCreateModalOpen(true)}
                    >
                      ایجاد اولین پروژه
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              projects.map((project, index) => (
                <tr key={project.rowNum || index} className="project-row">
                  <td className="index-cell">
                    {((pagination.currentPage - 1) * pagination.pageSize) + index + 1}
                  </td>
                  <td className="project-name">
                    <div className="project-name-content">
                      <span className="project-icon">📁</span>
                      <div>
                        <div className="project-title">{project.name}</div>
                        <div className="project-code">ردیف: {project.rowNum}</div>
                      </div>
                    </div>
                  </td>
                  <td className="project-description">
                    {project.description || 'بدون توضیحات'}
                  </td>
                  <td className="status-cell">
                    {getStatusBadge(project)}
                  </td>
          
                  <td className="date-cell">
                    <div className="date-content">
                      <span className="date-icon">📅</span>
                      {formatDate(project.createdAt)}
                    </div>
                  </td>
           
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <button 
                        className="btn-action btn-view"
                        title="مشاهده"
                      >
                            <FaEye />
                      </button>
                      <button 
                        className="btn-action btn-edit"
                        title="ویرایش"
                      >
                           <FaEdit />
                      </button>
                 <button 
                        className="btn-action btn-delete"
                        title="حذف"
                        onClick={() => handleDeleteClick(project)}
                        disabled={loading}
                      >
                        <FaTrash />
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

      <div className="project-stats">
        <div className="stat-card">
          <div className="stat-icon total">📊</div>
          <div className="stat-content">
            <div className="stat-value">{pagination.totalCount}</div>
            <div className="stat-label">کل پروژه‌ها</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">🚀</div>
          <div className="stat-content">
            <div className="stat-value">
              {maxProjects}
            </div>
            <div className="stat-label">سقف مجاز پروژه‌ها</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">✅</div>
          <div className="stat-content">
            <div className="stat-value">
              {maxProjects - pagination.totalCount}
            </div>
            <div className="stat-label">مانده مجاز</div>
          </div>
        </div>
      </div>

      {/* Modal ایجاد پروژه جدید */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
            {/* Modal تأیید حذف */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        projectName={projectToDelete?.name}
        loading={deleteLoading}
        
      />
    </div>
  );
};

// داده‌های نمونه برای زمانی که API در دسترس نیست
const getSampleProjects = () => [
  {
    name: "تست",
    createdAt: "2025-10-16T06:27:17.6312536",
    maxProjects: 100,
    rowNum: 1,
    description: "پروژه تستی سیستم"
  },
  {
    name: "پروژه مالی 2",
    createdAt: "2025-10-16T06:14:41.4066667",
    maxProjects: 100,
    rowNum: 2,
    description: "سیستم مالی سازمان"
  },
  {
    name: "پروژه مالی 1", 
    createdAt: "2025-10-13T12:35:22.2400816",
    maxProjects: 100,
    rowNum: 3,
    description: "مدیریت مالی شرکت"
  }
];

export default Project;