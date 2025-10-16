import axios from 'axios';
import { getToken, removeToken } from '../utils/token';

// ایجاد instance از axios
const api = axios.create({
  //baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  baseURL:  'https://localhost:7178/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// تعداد درخواست‌های اخیر برای مدیریت Rate Limiting
const recentRequests = [];
const MAX_REQUESTS_PER_MINUTE = 30;

// بررسی Rate Limiting
const checkRateLimit = () => {
  const now = Date.now();
  const oneMinuteAgo = now - 60000;
  
  // حذف درخواست‌های قدیمی
  while (recentRequests.length > 0 && recentRequests[0] < oneMinuteAgo) {
    recentRequests.shift();
  }
  
  // بررسی تعداد درخواست‌ها
  if (recentRequests.length >= MAX_REQUESTS_PER_MINUTE) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
  
  // اضافه کردن درخواست جدید
  recentRequests.push(now);
};

// Interceptor برای درخواست‌ها
api.interceptors.request.use(
  (config) => {
    // بررسی Rate Limiting
    checkRateLimit();
    
    // اضافه کردن توکن به هدر
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // اضافه کردن timestamp برای جلوگیری از caching
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
    }
    
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Interceptor برای پاسخ‌ها
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response received from: ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error.response?.status, error.response?.data);
    
    // مدیریت خطاهای مختلف
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - پاک کردن توکن و redirect به login
          removeToken();
          window.location.href = '/login';
          break;
          
        case 403:
          // Forbidden - کاربر دسترسی ندارد
          console.warn('Access forbidden:', data.message);
          break;
          
        case 429:
          // Too Many Requests - Rate Limit
          console.warn('Rate limit exceeded:', data.message);
          break;
          
        case 500:
          // Server Error
          console.error('Server error:', data.message);
          break;
          
        default:
          console.error('API error:', data.message);
      }
    } else if (error.request) {
      // خطای شبکه
      console.error('Network error:', error.message);
    } else {
      // خطای دیگر
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// تابع برای retry درخواست
const retryRequest = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && error.response?.status >= 500) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryRequest(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

// متدهای HTTP با پشتیبانی از retry
export const http = {
  get: (url, config = {}) => retryRequest(() => api.get(url, config)),
  post: (url, data = {}, config = {}) => retryRequest(() => api.post(url, data, config)),
  put: (url, data = {}, config = {}) => retryRequest(() => api.put(url, data, config)),
  delete: (url, config = {}) => retryRequest(() => api.delete(url, config)),
  patch: (url, data = {}, config = {}) => retryRequest(() => api.patch(url, data, config)),
};

// تابع برای ایجاد cancel token
export const createCancelToken = () => {
  return axios.CancelToken.source();
};

// تابع برای بررسی اینکه خطا بخاطر cancel شدن است
export const isCancel = (error) => {
  return axios.isCancel(error);
};

export default api;