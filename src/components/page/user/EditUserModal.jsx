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
  FaSpinner, FaLock, FaCheck
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
    password: '', // اضافه کردن فیلد password
    confirmPassword: '' // اضافه کردن فیلد confirmPassword
  });
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",user)
    const [roles, setRoles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


    const [rolesLoading, setRolesLoading] = useState(false);

  const checkPasswordStrength = (password) => {
    if (!password) return { strength: 0, requirements: {
      length: false,
      lowercase: false,
      uppercase: false,
      number: false,
      special: false
    }};
    
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
  
  // تابع handleInputChange یکپارچه برای همه فیلدها
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // پاک کردن خطا هنگام تغییر
    if (error) setError('');
  };


    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // پاک کردن خطا هنگام تغییر
    if (error) setError('');
  };

  // وقتی کاربر تغییر کرد یا مودال باز شد، فرم را پر کن
  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        fullname: user.fullname || '',
        username: user.username || '',
        mobileNumber: user.mobileNumber || '',
        role: user.role || '',
        isActive: user.isActive !== undefined ? user.isActive : true,
        password: '', // مقدار پیش‌فرض برای رمز عبور
        confirmPassword: '' // مقدار پیش‌فرض برای تکرار رمز عبور
      });
      setError(null);
       const fetchRoles = async () => {
            if (!isOpen) return;
            
            try {
              setRolesLoading(true);
              const response = await userService.getRoles();
              console.log('Roles response:', response);
              
              // با توجه به ساختار پاسخ API
              const rolesData = response.data || response || [];
              setRoles(rolesData);
              
              // اگر نقش‌ها بارگذاری شدند و roleId هنوز تنظیم نشده، اولین نقش را انتخاب کن
              if (rolesData.length > 0 && !formData.roleId) {
                setFormData(prev => ({
                  ...prev,
                  roleId: rolesData[0].id
                }));
              }
            } catch (err) {
              console.error('Error fetching roles:', err);
              setError('خطا در دریافت لیست نقش‌ها');
              // داده‌های نمونه برای مواقع خطا
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
    
    // اعتبارسنجی فیلدهای ضروری
    if (!formData.fullname || !formData.username || !formData.role) {
      setError('لطفا فیلدهای ضروری را پر کنید');
      return;
    }

    // اعتبارسنجی رمز عبور اگر وارد شده باشد
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('رمز عبور و تکرار آن مطابقت ندارند');
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
{/* 
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
            </div> */}

                  <div className="form-group">
                        <label htmlFor="roleId">
                          نقش کاربر
                          {rolesLoading && (
                            <FaSpinner className="spinner-icon" style={{ marginLeft: '8px' }} />
                          )}
                        </label>
                        <select
                          id="roleId"
                          name="roleId"
                          value={user.roleId}
                          onChange={handleChange}
                          disabled={loading || rolesLoading}
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

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <FaLock className="input-icon" />
                  رمز عبور جدید
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  disabled={loading}
                  placeholder="رمز عبور جدید (اختیاری)"
                />
                
                {formData.password && (
                  <>
                    <div className="password-strength">
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

              <div className="form-group">
                <label className="form-label">
                  <FaLock className="input-icon" />
                  تکرار رمز عبور
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`form-input ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword ? 'input-error' : ''
                  }`}
                  disabled={loading}
                  placeholder="تکرار رمز عبور جدید"
                />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <div className="input-error-message">رمز عبور و تکرار آن مطابقت ندارند</div>
                )}
              </div>
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