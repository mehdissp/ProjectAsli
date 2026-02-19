
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';

import { todoService } from '../../../services/todo';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import { useLocation } from 'react-router-dom';
import Pagination from '../../common/Pagination/Pagination';
import { useNavigate } from 'react-router-dom'; // اضافه کردن useNavigate

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  FaRedo,FaUsers ,FaTags,  FaUser,
} from 'react-icons/fa';
import { 
  HiOutlineExclamationCircle 
} from 'react-icons/hi';
import './Archive.css';

const Archive = () => {
  const { user } = useAuth();
    const navigate = useNavigate(); // استفاده از useNavigate
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);


    // stateهای جدید برای مدیریت کاربران
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);
  
  const location = useLocation();
    const projectId = location.state?.projectId;
  const projectName=location.state?.name
// در کامپوننت Project، stateهای جدید اضافه کنید:
const [isTagModalOpen, setIsTagModalOpen] = useState(false);
const [tags, setTags] = useState([]);
const [selectedTags, setSelectedTags] = useState(new Set());
const [tagsLoading, setTagsLoading] = useState(false);
const [tagsError, setTagsError] = useState(null);

  // حالت‌های پیجینیشن
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0
  });
  const [access, setAccess] = useState({
    checkAccess:false,
    checkAccessAssigner:false,
    checkAccessDelete:false,
  });

  // دریافت پروژه‌ها از API
  const fetchArchive = useCallback(async (pageNumber = 1, pageSize = 10) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`🔄 Fetching projects page ${pageNumber}...`);
      
const response = await todoService.getArchive(projectId,pageNumber,pageSize);
      
      console.log(response.items)
      // استفاده از ساختار جدید API
      setProjects(response.items|| []);


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


  //***********انتخاب کاربر */



// ایجاد تگ جدید




// تoggle انتخاب کاربر
// const toggleUserSelection = (userId) => {
//   const newSelectedUsers = new Set(selectedUsers);
//   if (newSelectedUsers.has(userId)) {
//     newSelectedUsers.delete(userId);
//   } else {
//     newSelectedUsers.add(userId);
//   }
//   setSelectedUsers(newSelectedUsers);
// };





  /************************ */

  useEffect(() => {
    fetchArchive(pagination.currentPage, pagination.pageSize);
  }, [fetchArchive, pagination.currentPage, pagination.pageSize]);
  // مدیریت حذف پروژه
  const handleDeleteClick = (project) => {
    console.log('delete')
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
        console.log(isDeleteModalOpen)
  };

    // مدیریت کلیک روی دکمه مشاهده
  const handleViewClick = (project) => {
    console.log('👁️ Viewing project:', project);
    
    // گرفتن آیدی پروژه - با توجه به ساختار داده‌های شما
    const projectId = project.id || project.rowNum;
    const name=project.name
    
    if (projectId) {
      console.log(`📍 Navigating to TodoBoard with projectId: ${projectId}`);
      
      // navigate به صفحه TodoBoard با آیدی پروژه
      // navigate(`/TodoBoard/${projectId}`);
        navigate('/TodoBoard', { 
    state: { projectId: projectId,

         name: project.name 
     }
  });
    } else {
      console.error('❌ Project ID not found:', project);
      setError('آیدی پروژه یافت نشد');
    }
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      setDeleteLoading(true);
      console.log('🗑️ Deleting project:', projectToDelete.name);
      
    
      
      console.log('✅ Project deleted successfully');
      
      // بستن modal
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
      
      // نمایش پیغام موفقیت
      setError(null);
      
      // بروزرسانی لیست
      setTimeout(() => {
        fetchArchive(pagination.currentPage, pagination.pageSize);
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
      fetchArchive(1, pagination.pageSize);
    }, 500);
  }, [fetchArchive, pagination.pageSize]);

  // مدیریت خطا
  const handleRetry = useCallback(() => {
    setError(null);
    fetchArchive(pagination.currentPage, pagination.pageSize);
  }, [fetchArchive, pagination.currentPage, pagination.pageSize]);

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


  if (loading && projects.length === 0) {
    return <LoadingSpinner text="در حال دریافت اطلاعات پروژه‌ها..." />;
  }

  return (
    <div className="project-page">
      <div className="page-header">
        <h1>تسک های  آرشیو {projectName}</h1>
        <p>لیست تمام آرشیوها</p>
      </div>
                          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

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
          نمایش {start} تا {end} از {pagination.totalCount.toLocaleString()} پروژه
        </div>
      </div>

      <div className="project-table-container">
        <table className="project-table">
          <thead>
            <tr>
              <th>#</th>
              <th>کاربر مسئول</th>
              <th>عنوان</th>
               <th>توضیحات</th>
               <th>وضعیت تسک</th>
              {/* <th>توضیحات</th>
              <th>وضعیت</th> */}
     
              <th>تاریخ ایجاد</th>
            <th>تاریخ ددلاین</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  <div className="no-data-content">
                    <span className="no-data-icon">📭</span>
                    <p>هیچ آرشیئ یافت نشد</p>
             
                
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
            
                      <div>
                        <div className="project-title">{project.title}</div>
<div className="project-code">

  {Array.isArray(project.tags) 
    ? project.tags.map((tag, index) => (
        <div key={tag.id || index} className="tag-item"
               style={{ backgroundColor: tag.color || '#2272b8ff' }}
        >
          
          <span className="tag-name">{tag.name}</span>
        </div>
      ))
    : project.tags ? (
        <div className="tag-item">
          <span 
            className="color-indicator"
            style={{ backgroundColor: project.tags.color || '#2272b8ff' }}
          />
          <span className="tag-name">{project.tags.name}</span>
        </div>
      ) : 'بدون تگ'
  }
</div>
                      </div>
                    </div>
                  </td>
<td>
  <div className="user-info-content" style={{padding:'15px'}}>
    <span className="user-avatar">
      {project.avatar && project.avatar !== "" ? (
        <img 
          src={project.avatar} 
          alt="Profile" 
          className="user-avatar profile-image"
        />
      ) : (
        <FaUser />
      )}
    </span>
    <div>
      <div className="user-name">{project.userNameTodo || project.name}</div>
    </div>
  </div>
</td>


                  <td className="project-description">
                    {project.description || 'بدون توضیحات'}
                  </td>
                            <td className="project-description"
                                 style={{ backgroundColor: project.statusColor || '#2272b8ff' }}
                            >
                    {project.statusName || 'بدون وضعیت'}
                  </td>
                  {/* <td className="project-description">
                    {project.description || 'بدون توضیحات'}
                  </td>
                  <td className="status-cell">
                    {getStatusBadge(project)}
                  </td> */}
          
                  <td className="date-cell">
                    <div className="date-content">
                      <span className="date-icon">📅</span>
                      {formatDate(project.createdAt)}
                    </div>
                  </td>
                         <td className="date-cell">
                    <div className="date-content">
                      <span className="date-icon">📅</span>
                      {formatDate(project.dueDate)}
                    </div>
                  </td>
           
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <button 
                        className="btn-action btn-view"
                        title="مشاهده"
                            onClick={() => handleViewClick(project)}
                      >
                            <FaEye />
                      </button>
                          
    {/* دکمه جدید برای مدیریت کاربران */}


                      {/* <button 
                        className="btn-action btn-edit"
                        title="ویرایش"
                      >
                           <FaEdit />
                      </button> */}

                       {access.checkAccessDelete ?    <button 
                        className="btn-action btn-delete"
                        title="حذف"
                        onClick={() => handleDeleteClick(project)}
                        disabled={loading}
                      >
                        <FaTrash />
                      </button> : '' }
             
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

  

      {/* Modal ایجاد پروژه جدید */}
  





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

export default Archive;