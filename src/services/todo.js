// services/todoSService.js
import api from './api';

export const todoService = {
  // دریافت لیست وضعیت‌ها


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
  
async updateStatusTodo(todoData) {
  try {
    const response = await api.post('/Todo/UpdateStatusTodo', todoData);
    return response.data;
  } catch (error) {
    console.error('❌ Create todo service error:', error);
    throw error;
  }
},

};