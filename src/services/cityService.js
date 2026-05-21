import { http } from './api';

class CityService {
  async getCities() {
    try {
      const response = await http.get('/RealEstatePage/GetRegions');
      console.log('API Response:', response); // برای دیباگ
      
      // بررسی ساختار دیتای برگشتی
      if (response && response.data && Array.isArray(response.data)) {
        return response.data;
      }
      
      // اگه response خودش آرایه بود
      if (Array.isArray(response)) {
        return response;
      }
      
      // اگه دیتا داخل property دیگه‌ای بود
      if (response && response.data && response.data.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      
      console.warn('Unexpected data structure:', response);
      return [];
    } catch (error) {
      console.error('Error fetching cities:', error);
      return [];
    }
  }

  saveSelectedCity(city) {
    localStorage.setItem('selectedCity', JSON.stringify(city));
  }

  getSelectedCity() {
    const saved = localStorage.getItem('selectedCity');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  }
}

export default new CityService();