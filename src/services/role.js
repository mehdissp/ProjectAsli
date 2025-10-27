// services/roleService.js
import api from './api';

export const roleService = {
  // دریافت لیست وضعیت‌ها


  // ایجاد وضعیت جدید
  async getRoles(pageNumber = 1, pageSize = 10) {
    try {
      const response = await api.post('/Role/GetRoles', {
        PageNumber: pageNumber,
        PageSize: pageSize
      });
      console.log('📦 Role data received:', response.data);
      
      // استفاده از ساختار جدید API
      return response.data.data || {
        items: [],
        totalCount: 0,
        totalPages: 0
      };
    } catch (error) {
      console.error('❌ Get Role service error:', error);
      throw error;
    }
  },
   
  


};