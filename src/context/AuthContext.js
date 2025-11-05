// // context/AuthContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { authService } from '../services/auth';
// import { getToken, setToken, removeToken, getRefreshToken, setRefreshToken } from '../utils/token';

// const AuthContext = createContext();

// // هوک useAuth
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// // Provider
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [menus, setMenus] = useState([]);

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = async () => {
//     try {
//       const token = getToken();
//       if (token) {
//         // شبیه‌سازی دریافت پروفایل کاربر
//         const userProfile = await authService.getProfile();
//         setUser(userProfile);
//         setIsAuthenticated(true);
        
//         // شبیه‌سازی دریافت منوها
//         const userMenus = await authService.getMenus();
//         setMenus(userMenus);
//       }
//     } catch (error) {
//       console.error('Auth check failed:', error);
//       logout();
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const login = async (credentials) => {
//     try {
//       const result = await authService.login(credentials);
//       setToken(result.token);
//       setRefreshToken(result.refreshToken);
      
//       const userProfile = await authService.getProfile();
//       setUser(userProfile);
//       setIsAuthenticated(true);
      
//       const userMenus = await authService.getMenus();
//       setMenus(userMenus);
      
//       return { success: true };
//     } catch (error) {
//       return { 
//         success: false, 
//         error: error.response?.data?.message || 'Login failed' 
//       };
//     }
//   };

//   const logout = () => {
//     removeToken();
//     setUser(null);
//     setIsAuthenticated(false);
//     setMenus([]);
//   };

//   const refreshToken = async () => {
//     try {
//       const refreshToken = getRefreshToken();
//       if (!refreshToken) {
//         throw new Error('No refresh token');
//       }

//       const result = await authService.refreshToken({ refreshToken });
//       setToken(result.token);
//       setRefreshToken(result.refreshToken);
//       return true;
//     } catch (error) {
//       logout();
//       return false;
//     }
//   };

//   const value = {
//     user,
//     isAuthenticated,
//     isLoading,
//     menus,
//     login,
//     logout,
//     refreshToken
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // export default AuthProvider;

// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/auth';
import { getToken, setToken, removeToken, getRefreshToken, setRefreshToken } from '../utils/token';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    checkAuth();
  }, []);


  
  const checkAuth = async () => {
    try {
      const token = getToken();
      if (token) {
        const userProfile = await authService.getProfile();
        setUser(userProfile);
        setIsAuthenticated(true);
        
        // دریافت منوها از سرور
        const userMenus = await authService.getMenus();
        setMenus(userMenus);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const result = await authService.login(credentials);
      setToken(result.token);
      setRefreshToken(result.refreshToken);
      
      const userProfile = await authService.getProfile();
      setUser(userProfile);
      setIsAuthenticated(true);
      
      // دریافت منوها بعد از لاگین
      const userMenus = await authService.getMenus();
      setMenus(userMenus);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
    setMenus([]);
  };
  // تابع جدید برای آپدیت پروفایل
  const updateProfile = async (profileData) => {
    try {
      // فراخوانی سرویس آپدیت پروفایل
    //  const updatedUser = await authService.updateProfile(profileData);
      
      // آپدیت state کاربر
      setUser(prevUser => ({
        ...prevUser,
        ...profileData
      }));
      
      return { success: true, user: profileData };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Profile update failed' 
      };
    }
  };
  const refreshToken = async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token');
      }

      const result = await authService.refreshToken({ refreshToken });
      setToken(result.token);
      setRefreshToken(result.refreshToken);
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  // تابع برای بروزرسانی منوها
  const updateMenus = (newMenus) => {
    setMenus(newMenus);
  };

  // تابع برای پیدا کردن منو بر اساس مسیر
  const findMenuByPath = (path) => {
    const findInMenus = (menus, targetPath) => {
      for (const menu of menus) {
        if (menu.path === targetPath) {
          return menu;
        }
        if (menu.children && menu.children.length > 0) {
          const found = findInMenus(menu.children, targetPath);
          if (found) return found;
        }
      }
      return null;
    };

    return findInMenus(menus, path);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    menus,
    login,
    logout,
    refreshToken,
    updateMenus,
        updateProfile, // اضافه شده
    findMenuByPath
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};