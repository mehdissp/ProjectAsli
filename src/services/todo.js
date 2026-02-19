// services/todoSService.js
import api from './api';

export const todoService = {
  // دریافت لیست وضعیت‌ها

  async getArchive(projectId,pageNumber = 1, pageSize = 10) {
    try {
      const response = await api.post('/todo/GetTodoWithTagsViewsAsyncArchive', {
        PageNumber: pageNumber,
        PageSize: pageSize,
        Id:projectId
      });
      console.log('📦 Archive data received:', response.data);
      
      // استفاده از ساختار جدید API
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