// services/menuAccessService.js
import api from './api';

export const menuAccessService = {
  // دریافت لیست وضعیت‌ها


  // ایجاد وضعیت جدید
async getMenuAccess(roleId) {
  try {
    const response = await api.get(`/Menu/GetMenuItemsAsync?roleId=${roleId}`);
    return response.data;
  } catch (error) {
    console.error('❌ GetMenuItemsAsync service error:', error);
    throw error;
  }
},

  async insertOrDeleteMenuAccess(menuData,roleId) {
    try {
          const payload = Array.from(menuData).map(menuId => ({
            menuId: menuId
        }));
      console.log('🚀 Sending project data:', payload);
      const response = await api.post(`/Menu/InsertOrDeleteMenuAccess?roleId=${roleId}`, payload);
      console.log('✅ Project created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Create project service error:', error);
      throw error;
    }
  },

   
  


};