import React, { useState, useEffect } from 'react';
import { 
  FaTimes, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaUserTag, 
  FaCheckCircle,
  FaTimesCircle,
  FaSave,
  FaSpinner
} from 'react-icons/fa';
import './UserModals.css';

const EditUserModal = ({ isOpen, onClose, onUserUpdated, user, roles }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    mobileNumber: '',
    role: '',
    isActive: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // وقتی کاربر تغییر کرد یا مودال باز شد، فرم را پر کن
  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        fullname: user.fullname || '',
        username: user.username || '',
        mobileNumber: user.mobileNumber || '',
        role: user.role || '',
        isActive: user.isActive !== undefined ? user.isActive : true
      });
      setError(null);
    }
  }, [user, isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullname || !formData.username || !formData.role) {
      setError('لطفا فیلدهای ضروری را پر کنید');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // در اینجا می‌توانید API ویرایش کاربر را فراخوانی کنید
      // await userService.updateUser(user.id, formData);
      
      console.log('🔄 Updating user:', formData);
      
      // شبیه‌سازی API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('✅ User updated successfully');
      onUserUpdated();
      onClose();
      
    } catch (err) {
      console.error('❌ Error updating user:', err);
      setError('خطا در بروزرسانی کاربر');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>ویرایش کاربر</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-group">
              <label className="form-label">
                <FaUser className="input-icon" />
                نام کامل *
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className="form-input"
                placeholder="نام کامل کاربر را وارد کنید"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FaUser className="input-icon" />
                نام کاربری *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="form-input"
                placeholder="نام کاربری را وارد کنید"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FaPhone className="input-icon" />
                شماره موبایل
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="form-input"
                placeholder="09xxxxxxxxx"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FaUserTag className="input-icon" />
                نقش کاربری *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">انتخاب نقش</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <span className="checkbox-custom">
                  {formData.isActive ? <FaCheckCircle /> : <FaTimesCircle />}
                </span>
                کاربر فعال
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
                disabled={loading}
              >
                انصراف
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="btn-spinner" />
                    در حال بروزرسانی...
                  </>
                ) : (
                  <>
                    <FaSave className="btn-icon" />
                    بروزرسانی کاربر
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;