import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { authService } from '../../../services/auth';
import Captcha from '../Captcha/Captcha';
import './Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    captcha: ''
  });
  const [captchaData, setCaptchaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  useEffect(() => {
    loadCaptcha();
  }, []);

  const loadCaptcha = async () => {
    try {
      const data = await authService.getCaptcha();
      setCaptchaData(data);
    } catch (error) {
              toast.success(error, {
            position: "top-left",
            autoClose: 5000,
          });
      console.error('Failed to load captcha:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // تأیید کپچا
      await authService.verifyCaptcha({
        captchaId: captchaData.captchaId,
        userInput: credentials.captcha
      });

      // لاگین
      const result = await login(credentials);
      if (!result.success) {


                loadCaptcha();
                       toast.error(result.error, {
            position: "top-left",
            autoClose: 5000,
          });
//        setError(result.error);

      }
    } catch (error) {
                    toast.error('کپچا یا اطلاعات ورود نامعتبر است', {
            position: "top-left",
            autoClose: 5000,
          });
      //setError('کپچا یا اطلاعات ورود نامعتبر است');
      loadCaptcha();
    } finally {
      setLoading(false);
      setCredentials(prev => ({ ...prev, captcha: '' }));
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
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
      <div className="login-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <div className="login-card slide-in-right">
        <div className="login-header">
          <h1 className="login-title">خوش آمدید</h1>
          <p className="login-subtitle">لطفا وارد حساب کاربری خود شوید</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">نام کاربری</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="form-input"
              placeholder="نام کاربری خود را وارد کنید"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">رمز عبور</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="form-input"
              placeholder="رمز عبور خود را وارد کنید"
              required
            />
          </div>

          {captchaData && (
            <Captcha 
              captchaData={captchaData}
              value={credentials.captcha}
              onChange={handleChange}
              onRefresh={loadCaptcha}
            />
          )}

          {error && (
            <div className="error-message shake">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={`login-button btn btn-primary ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <>
                <div className="button-spinner"></div>
                در حال ورود...
              </>
            ) : (
              'ورود به سیستم'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>سیستم مدیریت یکپارچه</p>
        </div>
      </div>
    </div>
  );
};

export default Login;