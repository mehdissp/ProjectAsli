// components/project/CreateProjectModal/CreateProjectModal.jsx
import React, { useState } from 'react';
import { projectService } from '../../../services/project';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import './CreateProjectModal.css';

const CreateProjectModal = ({ isOpen, onClose, onProjectCreated }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setProjectName('');
    setProjectDescription('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!projectName.trim()) {
      setError('نام پروژه الزامی است');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('🚀 Creating new project:', projectName);
      
      await projectService.createProject({
        Name: projectName.trim(),
        Description: projectDescription.trim() || null
      });

      console.log('✅ Project created successfully');
      
      // اطلاع به والد که پروژه ایجاد شد
      onProjectCreated();
      
      // بستن modal و reset فرم
      handleClose();
      
    } catch (err) {
      console.error('❌ Error creating project:', err);
      setError(err.response?.data?.message || 'خطا در ایجاد پروژه');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>ایجاد پروژه جدید</h2>
          <button 
            className="modal-close"
            onClick={handleClose}
            disabled={loading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="projectName">
              نام پروژه *
              <span className="required-star">*</span>
            </label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="نام پروژه را وارد کنید"
              className="form-input"
              disabled={loading}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectDescription">توضیحات پروژه</label>
            <textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="توضیحات اختیاری پروژه (حداکثر 500 کاراکتر)"
              className="form-textarea"
              rows="4"
              maxLength="500"
              disabled={loading}
            />
            <div className="char-counter">
              {projectDescription.length}/500
            </div>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-secondary"
              disabled={loading}
            >
              انصراف
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !projectName.trim()}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="small" color="white" />
                  در حال ایجاد...
                </>
              ) : (
                <>
                  <span className="btn-icon">➕</span>
                  ایجاد پروژه
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;