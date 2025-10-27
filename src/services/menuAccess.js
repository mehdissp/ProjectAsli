// services/menuAccessService.js
import api from './api';

export const menuAccessService = {
  // دریافت لیست وضعیت‌ها


  // ایجاد وضعیت جدید
async getMenuAccess() {
  try {
    const response = await api.get('/Menu/GetMenuItemsAsync');
    return response.data;
  } catch (error) {
    console.error('❌ GetMenuItemsAsync service error:', error);
    throw error;
  }
},

   
  


};