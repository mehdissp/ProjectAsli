// services/todoSService.js
import api from './api';

export const commentService = {
  // دریافت لیست وضعیت‌ها


  // ایجاد وضعیت جدید
async getTaskComments(todoId) {
  try {
    const response = await api.get(`/Comment/GetCommentDtoAsync?todoId=${todoId}`);
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