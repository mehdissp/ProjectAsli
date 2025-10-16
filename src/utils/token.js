// مدیریت توکن در localStorage

export const getToken = () => {
  try {
    return localStorage.getItem('auth_token');
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const setToken = (token) => {
  try {
    localStorage.setItem('auth_token', token);
  } catch (error) {
    console.error('Error setting token:', error);
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

export const getRefreshToken = () => {
  try {
    return localStorage.getItem('refresh_token');
  } catch (error) {
    console.error('Error getting refresh token:', error);
    return null;
  }
};

export const setRefreshToken = (token) => {
  try {
    localStorage.setItem('refresh_token', token);
  } catch (error) {
    console.error('Error setting refresh token:', error);
  }
};

export const getUserData = () => {
  try {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const setUserData = (userData) => {
  try {
    localStorage.setItem('user_data', JSON.stringify(userData));
  } catch (error) {
    console.error('Error setting user data:', error);
  }
};

export const clearAuthData = () => {
  removeToken();
};

// بررسی انقضای توکن (ساده)
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};

// دریافت اطلاعات از توکن
export const decodeToken = (token) => {
  if (!token) return null;
  
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};