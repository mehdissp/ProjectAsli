
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
  FaSpinner, 
  FaLock, 
  FaCheck,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import './UserModals.css';
import { userService } from '../../../services/user';

const EditUserModal = ({ isOpen, onClose, onUserUpdated, user }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    mobileNumber: '',
    role: '',
    isActive: true,
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rolesLoading, setRolesLoading] = useState(false);

  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", user);

  const checkPasswordStrength = (password) => {
    if (!password) return { 
      strength: 0, 
      requirements: {
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        special: false
      }
    };
    
    let strength = 0;
    const requirements = {
      length: password.length >= 5,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    };

    strength = Object.values(requirements).filter(Boolean).length;

    if (password.length === 0) return { strength: 0, requirements };
    if (strength <= 2) return { strength: 1, requirements }; // weak
    if (strength <= 3) return { strength: 2, requirements }; // medium
    if (strength <= 4) return { strength: 3, requirements }; // strong
    return { strength: 4, requirements }; // very strong
  };

  const passwordInfo = checkPasswordStrength(formData.password);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (error) setError('');
  };

  const handleChange = (e) => {
    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwww", e.target);
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) setError('');
  };

  // تابع برای تغییر وضعیت نمایش رمز عبور
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // تابع برای تغییر وضعیت نمایش تکرار رمز عبور
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // تابع برای تغییر وضعیت نمایش بخش رمز عبور
  const handlePasswordSectionToggle = (e) => {
    const isChecked = e.target.checked;
    setShowPasswordSection(isChecked);
    
    // اگر چک‌باکس غیرفعال شد، فیلدهای رمز عبور را پاک کن
    if (!isChecked) {
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));
    }
  };

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        fullname: user.fullname || '',
        username: user.username || '',
        mobileNumber: user.mobileNumber || '',
        role: user.role || '',
        isActive: user.isActive !== undefined ? user.isActive : true,
        password: '',
        confirmPassword: ''
      });
      setShowPasswordSection(false); // هنگام باز کردن مودال، بخش رمز عبور مخفی باشد
      setError(null);
      
      const fetchRoles = async () => {
        if (!isOpen) return;
        
        try {
          setRolesLoading(true);
          const response = await userService.getRoles();
          console.log('Roles response:', response);
          
          const rolesData = response.data || response || [];
          setRoles(rolesData);
          
          if (rolesData.length > 0 && !formData.roleId) {
            setFormData(prev => ({
              ...prev,
              roleId: rolesData[0].id
            }));
          }
        } catch (err) {
          console.error('Error fetching roles:', err);
          setError('خطا در دریافت لیست نقش‌ها');
          setRoles([
            { id: 'user', name: 'کاربر عادی' },
            { id: 'manager', name: 'مدیر' }
          ]);
        } finally {
          setRolesLoading(false);
        }
      };
  
      fetchRoles();
    }
  }, [user, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullname || !formData.username || !formData.role) {
      setError('لطفا فیلدهای ضروری را پر کنید');
      return;
    }

    // اگر بخش رمز عبور فعال است، اعتبارسنجی رمز عبور را انجام بده
    if (showPasswordSection) {
      if (formData.password && formData.password !== formData.confirmPassword) {
        setError('رمز عبور و تکرار آن مطابقت ندارند');
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Updating user:', formData);
      
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
              <label htmlFor="roleId" className="form-label">
                نقش کاربر
                {rolesLoading && (
                  <FaSpinner className="spinner-icon" style={{ marginLeft: '8px' }} />
                )}
              </label>
              <select
                id="roleId"
                name="roleId"
                value={formData.roleId}
                onChange={handleChange}
                disabled={loading || rolesLoading}
                className="form-select"
                required
              >
                <option value="">لطفا انتخاب کنید</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              {rolesLoading && (
                <div className="loading-text">در حال دریافت نقش‌ها...</div>
              )}
            </div>

            {/* چک‌باکس برای نمایش/مخفی کردن بخش رمز عبور */}
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={showPasswordSection}
                  onChange={handlePasswordSectionToggle}
                  className="checkbox-input"
                />
                <span className="checkbox-custom">
                  {showPasswordSection ? <FaCheckCircle /> : <FaTimesCircle />}
                </span>
                تغییر رمز عبور
              </label>
              <div className="checkbox-description">
                در صورت تمایل به تغییر رمز عبور کاربر، این گزینه را فعال کنید
              </div>
            </div>

            {/* بخش رمز عبور - فقط وقتی چک‌باکس فعال است نمایش داده می‌شود */}
            {showPasswordSection && (
              <div className="password-section">
                <div className="form-row">
                  <div className="form-group password-group">
                    <label className="form-label">
                      <FaLock className="input-icon" />
                      رمز عبور جدید
                    </label>
                    <div className="password-input-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="form-input password-input"
                        disabled={loading}
                        placeholder="رمز عبور جدید را وارد کنید"
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={togglePasswordVisibility}
                        disabled={loading}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    
                    {formData.password && (
                      <>
                        <div className="password-strength">
                          <div className="strength-labels">
                            <span>ضعیف</span>
                            <span>متوسط</span>
                            <span>قوی</span>
                            <span>خیلی قوی</span>
                          </div>
                          <div className={`strength-bar ${
                            passwordInfo.strength === 1 ? 'strength-weak' :
                            passwordInfo.strength === 2 ? 'strength-medium' :
                            passwordInfo.strength === 3 ? 'strength-strong' :
                            passwordInfo.strength === 4 ? 'strength-very-strong' : ''
                          }`} />
                        </div>
                        
                        <div className="password-requirements">
                          <div className={`requirement ${passwordInfo.requirements.length ? 'met' : 'unmet'}`}>
                            <span className="requirement-icon">
                              {passwordInfo.requirements.length ? <FaCheck /> : <FaTimes />}
                            </span>
                            حداقل 5 کاراکتر
                          </div>
                          <div className={`requirement ${passwordInfo.requirements.lowercase ? 'met' : 'unmet'}`}>
                            <span className="requirement-icon">
                              {passwordInfo.requirements.lowercase ? <FaCheck /> : <FaTimes />}
                            </span>
                            حروف کوچک
                          </div>
                          <div className={`requirement ${passwordInfo.requirements.uppercase ? 'met' : 'unmet'}`}>
                            <span className="requirement-icon">
                              {passwordInfo.requirements.uppercase ? <FaCheck /> : <FaTimes />}
                            </span>
                            حروف بزرگ
                          </div>
                          <div className={`requirement ${passwordInfo.requirements.number ? 'met' : 'unmet'}`}>
                            <span className="requirement-icon">
                              {passwordInfo.requirements.number ? <FaCheck /> : <FaTimes />}
                            </span>
                            عدد
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="form-group password-group">
                    <label className="form-label">
                      <FaLock className="input-icon" />
                      تکرار رمز عبور
                    </label>
                    <div className="password-input-container">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`form-input password-input ${
                          formData.confirmPassword && formData.password !== formData.confirmPassword ? 'input-error' : ''
                        }`}
                        disabled={loading}
                        placeholder="تکرار رمز عبور جدید"
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={toggleConfirmPasswordVisibility}
                        disabled={loading}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <div className="input-error-message">رمز عبور و تکرار آن مطابقت ندارند</div>
                    )}
                  </div>
                </div>
              </div>
            )}

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