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

   async deletecomment(id) {
    try {
      console.log('🗑️ Deleting project:', id);
      const response = await api.delete(`/Comment/DeleteComment?id=${id}`);
      console.log('✅ Project deleted successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Delete project service error:', error);
      throw error;
    }
  },
  
async createComment(commetnData) {
  try {
    const response = await api.post('/Comment/InsertComment', commetnData);
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