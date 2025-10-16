import { http } from './api';

// کلاس سرویس احراز هویت
class AuthService {
  // لاگین کاربر
  async login(credentials) {
    try {
      const response = await http.post('/auth/login', credentials);
      
      if (!response.data || !response.data.data) {
        throw new Error('Invalid response format');
      }
      
      return response.data.data;
    } catch (error) {
      console.error('Login service error:', error);
      throw this.handleError(error);
    }
  }

  // رفرش توکن
  async refreshToken(refreshData) {
    try {
      const response = await http.post('/auth/refresh', refreshData);
      
      if (!response.data || !response.data.data) {
        throw new Error('Invalid response format');
      }
      
      return response.data.data;
    } catch (error) {
      console.error('Refresh token service error:', error);
      throw this.handleError(error);
    }
  }

  // دریافت پروفایل کاربر
  async getProfile() {
    try {
      const response = await http.get('/auth/profile');
      
      if (!response.data || !response.data.data) {
        throw new Error('Invalid response format');
      }
      
      return response.data.data;
    } catch (error) {
      console.error('Get profile service error:', error);
      throw this.handleError(error);
    }
  }

  // دریافت منوهای کاربر
  async getMenus() {
    try {
      const response = await http.get('/auth/GetMenusForUi');
      
      if (!response.data || !response.data.data) {
        throw new Error('Invalid response format');
      }
      
      return this.transformMenuData(response.data.data);
    } catch (error) {
      console.error('Get menus service error:', error);
      throw this.handleError(error);
    }
  }

  // دریافت کپچا
  async getCaptcha() {
    try {
        console.log("injjjjjjjjjjjjjja")
      const response = await http.get('/auth/captcha');
      return response.data;
    } catch (error) {
      console.error('Get captcha service error:', error);
      throw this.handleError(error);
    }
  }

  // تأیید کپچا
  async verifyCaptcha(data) {
    try {
      const response = await http.post('/auth/verify-captcha', data);
      return response.data;
    } catch (error) {
      console.error('Verify captcha service error:', error);
      throw this.handleError(error);
    }
  }

  // آپدیت پروفایل کاربر
  async updateProfile(userData) {
    try {
      const response = await http.put('/auth/profile', userData);
      
      if (!response.data || !response.data.data) {
        throw new Error('Invalid response format');
      }
      
      return response.data.data;
    } catch (error) {
      console.error('Update profile service error:', error);
      throw this.handleError(error);
    }
  }

  // تغییر رمز عبور
  async changePassword(passwordData) {
    try {
      const response = await http.post('/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      console.error('Change password service error:', error);
      throw this.handleError(error);
    }
  }

  // لاگاوت
  async logout() {
    try {
      const response = await http.post('/auth/logout');
      return response.data;
    } catch (error) {
      console.error('Logout service error:', error);
      // حتی اگر سرور خطا داد، باز هم لاگاوت local انجام شود
      throw this.handleError(error, true);
    }
  }

  // تبدیل داده‌های منو به فرمت استاندارد
  transformMenuData(menuData) {
    if (!menuData) return [];
    
    // اگر menuData یک آبجکت است و propertyهای مختلف دارد
    if (typeof menuData === 'object' && !Array.isArray(menuData)) {
      // بررسی ساختارهای مختلف
      if (menuData.menus) return menuData.menus;
      if (menuData.items) return menuData.items;
      if (menuData.data) return menuData.data;
      
      // تبدیل به آرایه اگر آبجکت ساده است
      return Object.keys(menuData).map(key => ({
        id: key,
        ...menuData[key]
      }));
    }
    
    // اگر آرایه است
    if (Array.isArray(menuData)) {
      return menuData.map(item => ({
        id: item.id || item.menuId || Math.random().toString(36).substr(2, 9),
        title: item.title || item.name || 'Untitled',
        path: item.path || item.url || '#',
        icon: item.icon || this.getDefaultIcon(item),
        permissions: item.permissions || item.roles || [],
        children: item.children ? this.transformMenuData(item.children) : [],
        isActive: item.isActive !== false && item.status !== 'inactive',
        order: item.order || item.sortOrder || 0,
        ...item
      })).sort((a, b) => a.order - b.order);
    }
    
    return [];
  }

  // آیکون پیش‌فرض بر اساس نوع منو
  getDefaultIcon(menuItem) {
    const title = (menuItem.title || menuItem.name || '').toLowerCase();
    
    if (title.includes('dashboard')) return '📊';
    if (title.includes('user')) return '👤';
    if (title.includes('setting')) return '⚙️';
    if (title.includes('report')) return '📈';
    if (title.includes('product')) return '📦';
    if (title.includes('order')) return '🛒';
    if (title.includes('category')) return '📑';
    if (title.includes('message')) return '💬';
    if (title.includes('notification')) return '🔔';
    
    return '📄';
  }

  // مدیریت خطاها
  handleError(error, allowContinue = false) {
    if (error.response) {
      // خطای سرور
      const serverError = {
        message: error.response.data?.message || 'Server error occurred',
        status: error.response.status,
        data: error.response.data,
        isServerError: true
      };
      
      // اگر خطای 401 باشد و allowContinue نباشد
      if (error.response.status === 401 && !allowContinue) {
        serverError.message = 'Session expired. Please login again.';
      }
      
      return serverError;
    } else if (error.request) {
      // خطای شبکه
      return {
        message: 'Network error. Please check your connection.',
        status: 0,
        isNetworkError: true
      };
    } else {
      // خطای دیگر
      return {
        message: error.message || 'An unexpected error occurred',
        status: -1,
        isUnknownError: true
      };
    }
  }

  // بررسی اینکه کاربر لاگین است یا نه
  isLoggedIn() {
    return !!this.getToken();
  }

  // دریافت توکن از localStorage
  getToken() {
    return localStorage.getItem('auth_token');
  }

  // ذخیره توکن
  setToken(token) {
    localStorage.setItem('auth_token', token);
  }

  // پاک کردن توکن
  removeToken() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  }
}

// ایجاد instance از سرویس
export const authService = new AuthService();
export default authService;