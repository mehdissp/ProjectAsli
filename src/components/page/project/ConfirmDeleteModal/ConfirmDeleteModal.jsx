// components/project/ConfirmDeleteModal/ConfirmDeleteModal.jsx
import React from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { RiDeleteBin6Line, RiErrorWarningLine } from 'react-icons/ri';
import LoadingSpinner from '../../../common/LoadingSpinner/LoadingSpinner';
import './ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  projectName,
  loading = false,
  error = null 
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="modern-modal-overlay" onClick={onClose}>
      <div className="modern-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="header-main">
            <div className="icon-wrapper danger">
              <RiDeleteBin6Line />
            </div>
            <div className="header-text">
              <h2>حذف پروژه</h2>
              <p>عملیات حذف نهایی</p>
            </div>
          </div>
          <button 
            className="close-btn"
            onClick={onClose}
            disabled={loading}
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="modal-body">
          <div className="warning-card">
            <div className="warning-icon">
              <RiErrorWarningLine />
            </div>
            <div className="warning-content">
              <h3>پروژه "{projectName}" حذف شود؟</h3>
              <p>این عمل غیرقابل بازگشت است و تمام اطلاعات پروژه پاک خواهد شد.</p>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="error-card">
              <div className="error-badge">خطا</div>
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <div className="spinner-container">
              <LoadingSpinner size="large" />
            </div>
            <p>در حال حذف پروژه...</p>
          </div>
        )}

        {/* Actions */}
        <div className="modal-actions">
          <button
            onClick={onClose}
            className="action-btn secondary"
            disabled={loading}
          >
            انصراف
          </button>
          <button
            onClick={handleConfirm}
            className="action-btn danger"
            disabled={loading}
          >
            <FaTrash />
            حذف پروژه
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmDeleteModal;