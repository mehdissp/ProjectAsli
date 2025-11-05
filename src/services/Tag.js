// services/todoSService.js
import api from './api';

export const tagservice = {
  // دریافت لیست وضعیت‌ها
  async getTags(pageNumber = 1, pageSize = 10, searchValue = '') {
    try {

      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',pageNumber,pageSize)
            const response = await api.post('/Tag/GetTags', {
              PageNumber: pageNumber,
              PageSize: pageSize,
              KeyValue:searchValue
            });
  
      console.log('📦 Users response:', response);
      
      return response.data;
    } catch (error) {
      console.error('❌ Get users service error:', error);
      throw error;
    }
  },


  // ایجاد وضعیت جدید
async createTag(todoData) {
  try {
        console.log('📦 Users request:', todoData);
    const response = await api.post('/Tag/InsertTag', todoData);
    return response.data;
  } catch (error) {
    console.error('❌ Create tag service error:', error);
    throw error;
  }
},

   async deleteTag(todoId) {
    try {
      console.log('🗑️ Deleting project:', todoId);
      const response = await api.post('/Tag/DeleteTag', {
        Id: todoId
      });
      console.log('✅ Project deleted successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Delete project service error:', error);
      throw error;
    }
  },
  
async updateTag(tagdata) {
  try {
    const response = await api.post('/Tag/UpdateTag', tagdata);
    return response.data;
  } catch (error) {
    console.error('❌ Create todo service error:', error);
    throw error;
  }
},

async updateStatusTodo(todoData) {
  try {
    const response = await api.post('/Todo/updateStatusTodo', todoData);
    return response.data;
  } catch (error) {
    console.error('❌ Create todo service error:', error);
    throw error;
  }
},

};