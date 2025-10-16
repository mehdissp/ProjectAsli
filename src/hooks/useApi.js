import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const useApi = (apiFunction, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { refreshToken } = useAuth();
  const apiCallCount = useRef(0);
  const lastApiCallTime = useRef(0);

  const callApi = async (...args) => {
    const now = Date.now();
    
    // بررسی Rate Limiting
    if (now - lastApiCallTime.current < 1000) {
      apiCallCount.current++;
    } else {
      apiCallCount.current = 1;
    }
    
    lastApiCallTime.current = now;

    if (apiCallCount.current > 5) {
      setError(new Error('درخواست‌های زیاد! لطفا کمی صبر کنید...'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      if (err.response?.status === 401) {
        // تلاش برای refresh token
        const refreshed = await refreshToken();
        if (refreshed) {
          try {
            const result = await apiFunction(...args);
            setData(result);
            return result;
          } catch (retryError) {
            setError(retryError);
            throw retryError;
          }
        }
      } else if (err.response?.status === 429) {
        setError(new Error('درخواست‌های زیاد! لطفا بعدا تلاش کنید.'));
      } else {
        setError(err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      callApi();
    }
  }, []);

  return { data, loading, error, callApi };
};

export default useApi;