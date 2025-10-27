
// components/project/Project/UserSelectionModal.jsx
import React from 'react';
import { FaTimes, FaCheck, FaUser, FaSearch } from 'react-icons/fa';
import './UserSelectionModal.css';

const UserSelectionModal = ({
  isOpen,
  onClose,
  projectName,
  users,
  selectedUsers,
  onUserToggle,
  onSelectAll,
  onDeselectAll,
  onSave,
  loading,
  error
}) => {
  if (!isOpen) return null;

  // محاسبه تعداد کاربران انتخاب شده بر اساس isCheck
  const selectedCount = users.filter(user => user.isCheck).length;

  return (
    <div className="modal-overlay">
      <div className="user-selection-modal">
        {/* Header */}
        <div className="modal-header">
          <h2>
            <FaUser className="header-icon" />
      
          </h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Project Info */}
        <div className="project-info-section">
          <h3>پروژه: {projectName}</h3>
          <p>کاربران مجاز برای دسترسی به این پروژه را انتخاب کنید</p>
        </div>

        {/* Actions */}
        <div className="selection-actions">
          <div className="selected-count">
            <FaCheck />
            {selectedCount} تعداد کاربران مجاز برای پروژه
          </div>
          <div className="selection-buttons">
            <button 
              className="btn btn-outline"
              onClick={onSelectAll}
              disabled={loading}
            >
              انتخاب همه
            </button>
            <button 
              className="btn btn-outline"
              onClick={onDeselectAll}
              disabled={loading}
            >
              لغو همه
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="error-banner">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {/* Users Grid */}
        <div className="users-grid-container">
          <div className="users-grid">
            {users.length === 0 ? (
              <div className="no-users">
                <FaUser className="no-users-icon" />
                <p>هیچ کاربری یافت نشد</p>
              </div>
            ) : (
              users.map(user => (
                <div 
                  key={user.id} 
                  className={`usercard ${user.isCheck ? 'selected' : ''}`}
                  onClick={() => onUserToggle(user.id, !user.isCheck)}
                >
                  <div className="user-checkbox">
                    <input
                      type="checkbox"
                      checked={user.isCheck || false}
                      onChange={() => onUserToggle(user.id, !user.isCheck)}
                      id={`user-${user.id}`}
                    />
                    <label htmlFor={`user-${user.id}`}></label>
                  </div>
                  
                  <div className="user-info">
                    <div className="user-username">
                      {user.fullName}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button 
            className="btn btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            انصراف
          </button>
          <button 
            className="btn btn-primary"
            onClick={onSave}
            disabled={loading || users.length === 0}
          >
            {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSelectionModal;