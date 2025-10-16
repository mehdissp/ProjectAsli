// components/project/Project/Project.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import useApi from '../../../hooks/useApi';
import { projectService } from '../../../services/project';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import CreateProjectModal from './CreateProjectModal';
import './Project.css';

const Project = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // دریافت پروژه‌ها از API
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const projectsData = await projectService.getProjects();
      setProjects(projectsData);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('خطا در دریافت اطلاعات پروژه‌ها');
      // داده‌های نمونه برای نمایش
      setProjects(getSampleProjects());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [refreshTrigger]);

  // وقتی پروژه جدید ایجاد شد
  const handleProjectCreated = () => {
    console.log('🔄 Refreshing projects list after creation');
    setRefreshTrigger(prev => prev + 1);
  };

  // فرمت کردن تاریخ
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fa-IR', options);
  };

  // گرفتن وضعیت پروژه
  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'فعال', class: 'status-active' },
      completed: { label: 'تکمیل شده', class: 'status-completed' },
      pending: { label: 'در انتظار', class: 'status-pending' },
      cancelled: { label: 'لغو شده', class: 'status-cancelled' }
    };
    
    const config = statusConfig[status] || { label: status, class: 'status-default' };
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

  // گرفتن اولویت پروژه
  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { label: 'بالا', class: 'priority-high' },
      medium: { label: 'متوسط', class: 'priority-medium' },
      low: { label: 'پایین', class: 'priority-low' }
    };
    
    const config = priorityConfig[priority] || { label: priority, class: 'priority-default' };
    return <span className={`priority-badge ${config.class}`}>{config.label}</span>;
  };

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
        <button 
          className="btn btn-primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <span className="btn-icon">➕</span>
          پروژه جدید
        </button>
        <button 
          className="btn btn-secondary"
          onClick={fetchProjects}
          disabled={loading}
        >
          <span className="btn-icon">🔄</span>
          بروزرسانی
        </button>
      </div>

      {error && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      <div className="project-table-container">
        <table className="project-table">
          <thead>
            <tr>
              <th>#</th>
              <th>نام پروژه</th>
              <th>توضیحات</th>
              <th>وضعیت</th>
              <th>اولویت</th>
              <th>تاریخ ایجاد</th>
              <th>تاریخ بروزرسانی</th>
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
                <tr key={project.id} className="project-row">
                  <td className="index-cell">{index + 1}</td>
                  <td className="project-name">
                    <div className="project-name-content">
                      <span className="project-icon">📁</span>
                      <div>
                        <div className="project-title">{project.name}</div>
                        <div className="project-code">{project.code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="project-description">
                    {project.description || 'بدون توضیحات'}
                  </td>
                  <td className="status-cell">
                    {getStatusBadge(project.status)}
                  </td>
                  <td className="priority-cell">
                    {getPriorityBadge(project.priority)}
                  </td>
                  <td className="date-cell">
                    <div className="date-content">
                      <span className="date-icon">📅</span>
                      {formatDate(project.createdAt)}
                    </div>
                  </td>
                  <td className="date-cell">
                    <div className="date-content">
                      <span className="date-icon">🔄</span>
                      {formatDate(project.updatedAt)}
                    </div>
                  </td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <button 
                        className="btn-action btn-view"
                        title="مشاهده"
                      >
                        👁️
                      </button>
                      <button 
                        className="btn-action btn-edit"
                        title="ویرایش"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-action btn-delete"
                        title="حذف"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="project-stats">
        <div className="stat-card">
          <div className="stat-icon total">📊</div>
          <div className="stat-content">
            <div className="stat-value">{projects.length}</div>
            <div className="stat-label">کل پروژه‌ها</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">🚀</div>
          <div className="stat-content">
            <div className="stat-value">
              {projects.filter(p => p.status === 'active').length}
            </div>
            <div className="stat-label">پروژه‌های فعال</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">✅</div>
          <div className="stat-content">
            <div className="stat-value">
              {projects.filter(p => p.status === 'completed').length}
            </div>
            <div className="stat-label">تکمیل شده</div>
          </div>
        </div>
      </div>

      {/* Modal ایجاد پروژه جدید */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
};

// داده‌های نمونه برای زمانی که API در دسترس نیست
const getSampleProjects = () => [
  // ... داده‌های نمونه قبلی
];

export default Project;