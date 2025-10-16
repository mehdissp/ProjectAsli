// ثابت‌های مربوط به API
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  TIMEOUT: 15000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  RATE_LIMIT: {
    MAX_REQUESTS: 5,
    TIME_WINDOW: 60000 // 1 minute
  }
};

// ثابت‌های مربوط به احراز هویت
export const AUTH_CONSTANTS = {
  TOKEN_KEY: 'auth_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  USER_DATA_KEY: 'user_data',
  TOKEN_EXPIRY_BUFFER: 5 * 60 * 1000, // 5 minutes
  REFRESH_THRESHOLD: 10 * 60 * 1000 // 10 minutes
};

// ثابت‌های مربوط به مسیرها (Routes)
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  USERS: '/users',
  REPORTS: '/reports',
  NOT_FOUND: '/404'
};

// ثابت‌های مربوط به نقش‌های کاربری
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
  GUEST: 'guest'
};

// ثابت‌های مربوط به پرمیشن‌ها
export const PERMISSIONS = {
  // کاربران
  USER_CREATE: 'user.create',
  USER_READ: 'user.read',
  USER_UPDATE: 'user.update',
  USER_DELETE: 'user.delete',
  
  // محصولات
  PRODUCT_CREATE: 'product.create',
  PRODUCT_READ: 'product.read',
  PRODUCT_UPDATE: 'product.update',
  PRODUCT_DELETE: 'product.delete',
  
  // سفارشات
  ORDER_CREATE: 'order.create',
  ORDER_READ: 'order.read',
  ORDER_UPDATE: 'order.update',
  ORDER_DELETE: 'order.delete',
  
  // گزارشات
  REPORT_VIEW: 'report.view',
  REPORT_EXPORT: 'report.export',
  
  // تنظیمات
  SETTINGS_VIEW: 'settings.view',
  SETTINGS_EDIT: 'settings.edit'
};

// نقش‌ها و پرمیشن‌های مرتبط
export const ROLE_PERMISSIONS = {
  [USER_ROLES.SUPER_ADMIN]: [
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.PRODUCT_CREATE,
    PERMISSIONS.PRODUCT_READ,
    PERMISSIONS.PRODUCT_UPDATE,
    PERMISSIONS.PRODUCT_DELETE,
    PERMISSIONS.ORDER_CREATE,
    PERMISSIONS.ORDER_READ,
    PERMISSIONS.ORDER_UPDATE,
    PERMISSIONS.ORDER_DELETE,
    PERMISSIONS.REPORT_VIEW,
    PERMISSIONS.REPORT_EXPORT,
    PERMISSIONS.SETTINGS_VIEW,
    PERMISSIONS.SETTINGS_EDIT
  ],
  [USER_ROLES.ADMIN]: [
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.PRODUCT_CREATE,
    PERMISSIONS.PRODUCT_READ,
    PERMISSIONS.PRODUCT_UPDATE,
    PERMISSIONS.PRODUCT_DELETE,
    PERMISSIONS.ORDER_CREATE,
    PERMISSIONS.ORDER_READ,
    PERMISSIONS.ORDER_UPDATE,
    PERMISSIONS.REPORT_VIEW,
    PERMISSIONS.REPORT_EXPORT,
    PERMISSIONS.SETTINGS_VIEW
  ],
  [USER_ROLES.MANAGER]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.PRODUCT_READ,
    PERMISSIONS.PRODUCT_UPDATE,
    PERMISSIONS.ORDER_READ,
    PERMISSIONS.ORDER_UPDATE,
    PERMISSIONS.REPORT_VIEW
  ],
  [USER_ROLES.USER]: [
    PERMISSIONS.PRODUCT_READ,
    PERMISSIONS.ORDER_CREATE,
    PERMISSIONS.ORDER_READ
  ],
  [USER_ROLES.GUEST]: [
    PERMISSIONS.PRODUCT_READ
  ]
};

// ثابت‌های مربوط به منوها
export const MENU_ICONS = {
  DASHBOARD: '📊',
  USERS: '👥',
  PRODUCTS: '📦',
  ORDERS: '🛒',
  REPORTS: '📈',
  SETTINGS: '⚙️',
  PROFILE: '👤',
  MESSAGES: '💬',
  NOTIFICATIONS: '🔔',
  CATEGORIES: '📑',
  ANALYTICS: '📊',
  FINANCE: '💰',
  HELP: '❓',
  LOGOUT: '🚪'
};

// ساختار پیش‌فرض منوها
export const DEFAULT_MENUS = [
  {
    id: 'dashboard',
    title: 'داشبورد',
    path: '/dashboard',
    icon: MENU_ICONS.DASHBOARD,
    permissions: [],
    order: 1
  },
  {
    id: 'users',
    title: 'مدیریت کاربران',
    path: '/users',
    icon: MENU_ICONS.USERS,
    permissions: [PERMISSIONS.USER_READ],
    order: 2,
    children: [
      {
        id: 'users-list',
        title: 'لیست کاربران',
        path: '/users/list',
        icon: '📋',
        permissions: [PERMISSIONS.USER_READ],
        order: 1
      },
      {
        id: 'users-create',
        title: 'ایجاد کاربر',
        path: '/users/create',
        icon: '➕',
        permissions: [PERMISSIONS.USER_CREATE],
        order: 2
      }
    ]
  },
  {
    id: 'products',
    title: 'محصولات',
    path: '/products',
    icon: MENU_ICONS.PRODUCTS,
    permissions: [PERMISSIONS.PRODUCT_READ],
    order: 3
  },
  {
    id: 'orders',
    title: 'سفارشات',
    path: '/orders',
    icon: MENU_ICONS.ORDERS,
    permissions: [PERMISSIONS.ORDER_READ],
    order: 4
  },
  {
    id: 'reports',
    title: 'گزارشات',
    path: '/reports',
    icon: MENU_ICONS.REPORTS,
    permissions: [PERMISSIONS.REPORT_VIEW],
    order: 5
  },
  {
    id: 'settings',
    title: 'تنظیمات',
    path: '/settings',
    icon: MENU_ICONS.SETTINGS,
    permissions: [PERMISSIONS.SETTINGS_VIEW],
    order: 6
  }
];

// ثابت‌های مربوط به خطاها
export const ERROR_MESSAGES = {
  // خطاهای شبکه
  NETWORK_ERROR: 'خطای شبکه! لطفا اتصال اینترنت خود را بررسی کنید.',
  TIMEOUT_ERROR: 'زمان درخواست به پایان رسید. لطفا دوباره تلاش کنید.',
  
  // خطاهای احراز هویت
  UNAUTHORIZED: 'دسترسی غیرمجاز! لطفا مجددا وارد شوید.',
  FORBIDDEN: 'شما دسترسی به این بخش را ندارید.',
  INVALID_CREDENTIALS: 'نام کاربری یا رمز عبور اشتباه است.',
  SESSION_EXPIRED: 'Session شما منقضی شده است. لطفا مجددا وارد شوید.',
  
  // خطاهای سرور
  SERVER_ERROR: 'خطای سرور! لطفا稍后 تلاش کنید.',
  MAINTENANCE: 'سیستم در حال maintenance می‌باشد.',
  
  // خطاهای اعتبارسنجی
  VALIDATION_ERROR: 'اطلاعات وارد شده معتبر نیست.',
  REQUIRED_FIELD: 'این فیلد اجباری می‌باشد.',
  INVALID_EMAIL: 'ایمیل وارد شده معتبر نیست.',
  WEAK_PASSWORD: 'رمز عبور باید حداقل ۸ کاراکتر داشته باشد.',
  
  // خطاهای عمومی
  UNKNOWN_ERROR: 'خطای ناشناخته! لطفا با پشتیبانی تماس بگیرید.',
  NOT_FOUND: 'مورد درخواستی یافت نشد.',
  RATE_LIMIT_EXCEEDED: 'تعداد درخواست‌های شما بیش از حد مجاز است. لطفا稍后 تلاش کنید.'
};

// ثابت‌های مربوط به موفقیت‌ها
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'با موفقیت وارد شدید!',
  LOGOUT_SUCCESS: 'با موفقیت خارج شدید!',
  PROFILE_UPDATED: 'پروفایل با موفقیت بروزرسانی شد!',
  PASSWORD_CHANGED: 'رمز عبور با موفقیت تغییر یافت!',
  DATA_SAVED: 'اطلاعات با موفقیت ذخیره شد!',
  DATA_DELETED: 'اطلاعات با موفقیت حذف شد!',
  OPERATION_SUCCESS: 'عملیات با موفقیت انجام شد!'
};

// ثابت‌های مربوط به اعتبارسنجی
export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z0-9_]+$/
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 100,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  PHONE: {
    PATTERN: /^09[0-9]{9}$/
  }
};

// ثابت‌های مربوط به localStorage keys
export const STORAGE_KEYS = {
  THEME: 'app_theme',
  LANGUAGE: 'app_language',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  TABLE_PREFERENCES: 'table_preferences',
  FORM_DATA: 'form_data_cache'
};

// ثابت‌های مربوط به theme
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
};

// ثابت‌های مربوط به زبان
export const LANGUAGES = {
  FA: 'fa',
  EN: 'en'
};

// ثابت‌های مربوط به breakpointهای ریسپانسیو
export const BREAKPOINTS = {
  XS: 480,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536
};

// ثابت‌های مربوط به انیمیشن
export const ANIMATION = {
  DURATION: {
    SHORT: 200,
    MEDIUM: 300,
    LONG: 500
  },
  EASING: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
    EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)'
  }
};

// ثابت‌های مربوط به pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZES: [10, 25, 50, 100],
  MAX_VISIBLE_PAGES: 5
};

// ثابت‌های مربوط به فرمت تاریخ و زمان
export const DATE_FORMATS = {
  SHORT: 'YYYY/MM/DD',
  LONG: 'YYYY/MM/DD - HH:mm',
  TIME: 'HH:mm',
  DATE_TIME: 'YYYY/MM/DD HH:mm:ss'
};

// ثابت‌های مربوط به فایل‌ها
export const FILE_CONSTANTS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

// ثابت‌های مربوط به notification
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// ثابت‌های مربوط به statusها
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// ثابت‌های مربوط به رنگ‌ها
export const COLORS = {
  PRIMARY: '#6366f1',
  PRIMARY_DARK: '#4f46e5',
  SECONDARY: '#f8fafc',
  ACCENT: '#10b981',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6',
  
  // Gray scale
  GRAY_50: '#f9fafb',
  GRAY_100: '#f3f4f6',
  GRAY_200: '#e5e7eb',
  GRAY_300: '#d1d5db',
  GRAY_400: '#9ca3af',
  GRAY_500: '#6b7280',
  GRAY_600: '#4b5563',
  GRAY_700: '#374151',
  GRAY_800: '#1f2937',
  GRAY_900: '#111827'
};

// ثابت‌های مربوط به feature flags
export const FEATURE_FLAGS = {
  DARK_MODE: true,
  MULTI_LANGUAGE: true,
  ADVANCED_REPORTS: false,
  BETA_FEATURES: false
};

// تابع برای گرفتن نقش نمایشی
export const getRoleDisplayName = (role) => {
  const roleNames = {
    [USER_ROLES.SUPER_ADMIN]: 'سوپر ادمین',
    [USER_ROLES.ADMIN]: 'ادمین',
    [USER_ROLES.MANAGER]: 'مدیر',
    [USER_ROLES.USER]: 'کاربر',
    [USER_ROLES.GUEST]: 'مهمان'
  };
  
  return roleNames[role] || 'نامشخص';
};

// تابع برای گرفتن پیخط خطا بر اساس کد
export const getErrorMessage = (errorCode, defaultMessage = ERROR_MESSAGES.UNKNOWN_ERROR) => {
  const errorMap = {
    'auth/invalid-credentials': ERROR_MESSAGES.INVALID_CREDENTIALS,
    'auth/unauthorized': ERROR_MESSAGES.UNAUTHORIZED,
    'auth/forbidden': ERROR_MESSAGES.FORBIDDEN,
    'auth/session-expired': ERROR_MESSAGES.SESSION_EXPIRED,
    'network/offline': ERROR_MESSAGES.NETWORK_ERROR,
    'network/timeout': ERROR_MESSAGES.TIMEOUT_ERROR,
    'server/error': ERROR_MESSAGES.SERVER_ERROR,
    'server/maintenance': ERROR_MESSAGES.MAINTENANCE,
    'validation/required': ERROR_MESSAGES.REQUIRED_FIELD,
    'validation/email': ERROR_MESSAGES.INVALID_EMAIL,
    'validation/password': ERROR_MESSAGES.WEAK_PASSWORD,
    'rate-limit/exceeded': ERROR_MESSAGES.RATE_LIMIT_EXCEEDED
  };
  
  return errorMap[errorCode] || defaultMessage;
};

// تابع برای بررسی پرمیشن
export const hasPermission = (userPermissions, requiredPermission) => {
  if (!requiredPermission || requiredPermission.length === 0) return true;
  if (!userPermissions || !Array.isArray(userPermissions)) return false;
  
  if (Array.isArray(requiredPermission)) {
    return requiredPermission.some(perm => userPermissions.includes(perm));
  }
  
  return userPermissions.includes(requiredPermission);
};

// تابع برای بررسی نقش
export const hasRole = (userRoles, requiredRole) => {
  if (!requiredRole || requiredRole.length === 0) return true;
  if (!userRoles || !Array.isArray(userRoles)) return false;
  
  if (Array.isArray(requiredRole)) {
    return requiredRole.some(role => userRoles.includes(role));
  }
  
  return userRoles.includes(requiredRole);
};

// تابع برای گرفتن پرمیشن‌های یک نقش
export const getPermissionsForRole = (role) => {
  return ROLE_PERMISSIONS[role] || [];
};

export default {
  API_CONFIG,
  AUTH_CONSTANTS,
  ROUTES,
  USER_ROLES,
  PERMISSIONS,
  ROLE_PERMISSIONS,
  MENU_ICONS,
  DEFAULT_MENUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  VALIDATION_RULES,
  STORAGE_KEYS,
  THEME,
  LANGUAGES,
  BREAKPOINTS,
  ANIMATION,
  PAGINATION,
  DATE_FORMATS,
  FILE_CONSTANTS,
  NOTIFICATION_TYPES,
  STATUS,
  COLORS,
  FEATURE_FLAGS,
  getRoleDisplayName,
  getErrorMessage,
  hasPermission,
  hasRole,
  getPermissionsForRole
};