// services/todoStatusService.js
import api from './api';

export const todoStatusService = {
  // دریافت لیست وضعیت‌ها
  getTodoStatuses: async (projectId) => {
    try {
      const response = await api.get(`/Todo/GetTodoStatus?projectId=${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching todo statuses:', error);
      throw error;
    }
  },

  // ایجاد وضعیت جدید
  createTodoStatus: async (todoStatusData) => {
    try {
      const response = await api.post('/Todo/InsertTodoStatus', todoStatusData);
      return response.data;
    } catch (error) {
      console.error('Error creating todo status:', error);
      throw error;
    }
  },

  // آپدیت وضعیت
  updateTodoStatus: async (id, todoStatusData) => {
    try {
      const response = await api.put(`/Todo/UpdateTodoStatus/${id}`, todoStatusData);
      return response.data;
    } catch (error) {
      console.error('Error updating todo status:', error);
      throw error;
    }
  },

  // حذف وضعیت
  deleteTodoStatus: async (id) => {
    try {
      const response = await api.delete(`/Todo/DeleteTodoStatus/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting todo status:', error);
      throw error;
    }
  }
};