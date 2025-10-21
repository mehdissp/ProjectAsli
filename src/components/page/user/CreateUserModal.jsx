import React, { useState, useEffect } from 'react';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaLock, FaCheck,FaSpinner  } from 'react-icons/fa';
import { userService } from '../../../services/user';
import './CreateUserModal.css';

const CreateUserModal = ({ isOpen, onClose, onUserCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
      roleId:  '', // تنظیم اولین نقش به عنوان پیش‌فرض
    password: '',
    confirmPassword: '',
    fullname:''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
 const [roles, setRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(false);

  // دریافت نقش‌ها از API
  useEffect(() => {
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
  }, [isOpen]);
  const checkPasswordStrength = (password) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // اعتبارسنجی
    if (formData.password !== formData.confirmPassword) {
      setError('رمز عبور و تکرار آن مطابقت ندارند');
      return;
    }

    if (passwordInfo.strength < 2) {
      setError('رمز عبور بسیار ضعیف است. لطفا رمز قوی‌تری انتخاب کنید');
      return;
    }

    try {
      setLoading(true);
            const selectedRole = roles.find(role => role.id === formData.roleId);
      await userService.createUser({
        username: formData.name,
        email: formData.email,
        phone: formData.phone || null,
             roleId: formData.roleId, // ارسال ID نقش
        // role: formData.role,
        isActive:true,
        password: formData.password,
        fullname:formData.fullname
      });

      setSuccess('کاربر با موفقیت ایجاد شد');
      
      // ریست فرم
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'user',
        password: '',
        confirmPassword: ''
      });

      // اطلاع به کامپوننت والد
      setTimeout(() => {
        onUserCreated();
        onClose();
      }, 1500);

    } catch (err) {
      console.error('Error creating user:', err);
      setError(err.response?.data || 'خطا در ایجاد کاربر');
    } finally {
      setLoading(false);
    }
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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>ایجاد کاربر جدید</h2>
          <button className="close-btn" onClick={onClose} disabled={loading}>
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="user-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          {success && (
            <div className="success-message">
              {success}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">
              <FaUser style={{ marginLeft: '5px' }} />
              نام کامل
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="نام و نام خانوادگی کاربر"
            />
          </div>
       <div className="form-group">
            <label htmlFor="name">
              <FaUser style={{ marginLeft: '5px' }} />
              نام کاربری
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder=" نام کاربری"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope style={{ marginLeft: '5px' }} />
                ایمیل
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="example@domain.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <FaPhone style={{ marginLeft: '5px' }} />
                شماره تماس
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
                placeholder="09123456789"
              />
            </div>
          </div>

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
              value={formData.roleId}
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
              <label htmlFor="password">
                <FaLock style={{ marginLeft: '5px' }} />
                رمز عبور
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="رمز عبور قوی انتخاب کنید"
              />
              
              {formData.password && (
                <>
                  <div className="password-strength">
                    <div className={`strength-bar ${
                      passwordInfo.strength === 1 ? 'strength-weak' :
                      passwordInfo.strength === 2 ? 'strength-medium' :
                      passwordInfo.strength === 3 ? 'strength-strong' :
                      'strength-very-strong'
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
              <label htmlFor="confirmPassword">
                <FaLock style={{ marginLeft: '5px' }} />
                تکرار رمز عبور
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="تکرار رمز عبور"
                className={formData.confirmPassword && formData.password !== formData.confirmPassword ? 'error' : ''}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  در حال ایجاد...
                </>
              ) : (
                'ایجاد کاربر'
              )}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;