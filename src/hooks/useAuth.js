import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/auth';
import { getToken, setToken, removeToken, getRefreshToken, setRefreshToken } from '../utils/token';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // بررسی وضعیت احراز هویت
  const checkAuth = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      const userProfile = await authService.getProfile();
      setUser(userProfile);
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      console.error('Auth check failed:', err);
      logout();
      setError('Session expired. Please login again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // لاگین
  const login = async (credentials) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await authService.login(credentials);
      setToken(result.token);
      setRefreshToken(result.refreshToken);

      const userProfile = await authService.getProfile();
      setUser(userProfile);
      setIsAuthenticated(true);

      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // لاگاوت
  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  // رفرش توکن
  const refreshToken = async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const result = await authService.refreshToken({ refreshToken });
      setToken(result.token);
      setRefreshToken(result.refreshToken);
      return true;
    } catch (err) {
      console.error('Token refresh failed:', err);
      logout();
      return false;
    }
  };

  // تغییر پروفایل کاربر
  const updateProfile = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    refreshToken,
    updateProfile,
    checkAuth
  };
};

export default useAuth;