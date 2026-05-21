// // services/realEstateService.js
// import api from './api';

// export const realEstateService = {
//   // دریافت لیست وضعیت‌ها

//   async GetRandomLastItemRealEstatesWithCategoryAsync(projectId,pageNumber = 1, pageSize = 10) {
//     try {
// const response = await api.post('/api/RealEstatePage/GetRandomLastItemRealEstatesWithCategoryAsync', {
//   tabId: projectId || '1',
//   pageNumber: page.toString(),
//   pageSize: '12'
// });
// console.log('📦 Real estate data received:', response.data);
      
//       // استفاده از ساختار جدید API
//       return response.data.data || {
//         items: [],
//         totalCount: 0,
//         totalPages: 0
//       };
//     } catch (error) {
//       console.error('❌ Get Archive service error:', error);
//       throw error;
//     }
//   },
//   // ایجاد وضعیت جدید
// async createTodo(todoData) {
//   try {
//     const response = await api.post('/Todo/InsertTodo', todoData);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Create todo service error:', error);
//     throw error;
//   }
// },

//    async deleteTodo(todoId) {
//     try {
//       console.log('🗑️ Deleting project:', todoId);
//       const response = await api.post('/Todo/DeleteTodo', {
//         Id: todoId
//       });
//       console.log('✅ Project deleted successfully:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ Delete project service error:', error);
//       throw error;
//     }
//   },
  
// async updateTodo(todoData) {
//   try {
//     const response = await api.post('/Todo/UpdateTodo', todoData);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Create todo service error:', error);
//     throw error;
//   }
// },

// async updateStatusTodo(todoData) {
//   try {
//     const response = await api.post('/Todo/updateStatusTodo', todoData);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Create todo service error:', error);
//     throw error;
//   }
// },

// };

import api from './api';

export const realEstateService = {
  // دریافت لیست تصادفی املاک
  async GetRandomLastItemRealEstatesWithCategoryAsync(projectId, pageNumber = 1, pageSize = 10) {
    try {
      const response = await api.post('/api/RealEstatePage/GetRandomLastItemRealEstatesWithCategoryAsync', {
        tabId: projectId || '1',
        pageNumber: pageNumber,  // اصلاح: استفاده از pageNumber
        pageSize: pageSize       // اصلاح: استفاده از pageSize
      });
      console.log('📦 Real estate data received:', response.data);
      
      return response.data.data || {
        items: [],
        totalCount: 0,
        totalPages: 0
      };
    } catch (error) {
      console.error('❌ Get Archive service error:', error);
      throw error;
    }
  },

  // دریافت املاک برای نقشه
  async GetrealEstateMap(regionId, pageNumber = 1, pageSize = 10) {
    try {
      console.log('***********************************************************',regionId)
      const response = await api.get('/RealEstatePage/GetRealStateMap', {
        params: {
          tabId: regionId || 1,
          pageNumber: pageNumber,
          pageSize: pageSize
        }
      });
      console.log('📦 Real estate map data received:', response.data);
      
      return response.data || {
        data: {
          items: [],
          totalCount: 0,
          totalPages: 0
        }
      };
    } catch (error) {
      console.error('❌ GetRealEstateMap error:', error);
      throw error;
    }
  },

  // ایجاد وضعیت جدید
  async createTodo(todoData) {
    try {
      const response = await api.post('/Todo/InsertTodo', todoData);
      return response.data;
    } catch (error) {
      console.error('❌ Create todo service error:', error);
      throw error;
    }
  },

  async deleteTodo(todoId) {
    try {
      console.log('🗑️ Deleting project:', todoId);
      const response = await api.post('/Todo/DeleteTodo', {
        Id: todoId
      });
      console.log('✅ Project deleted successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Delete project service error:', error);
      throw error;
    }
  },
  
  async updateTodo(todoData) {
    try {
      const response = await api.post('/Todo/UpdateTodo', todoData);
      return response.data;
    } catch (error) {
      console.error('❌ Update todo service error:', error);
      throw error;
    }
  },

  async updateStatusTodo(todoData) {
    try {
      const response = await api.post('/Todo/updateStatusTodo', todoData);
      return response.data;
    } catch (error) {
      console.error('❌ Update status todo service error:', error);
      throw error;
    }
  },

};

export default realEstateService;