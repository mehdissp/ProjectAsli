// services/todoStatusService.js
import api from './api';

export const todoStatusService = {
  // دریافت لیست وضعیت‌ها
  getTodoStatuses: async (projectId) => {
    try {
      const response = await api.get(`/TodoStatus/GetTodoStatus?projectId=${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching todo statuses:', error);
      throw error;
    }
  },

  // ایجاد وضعیت جدید
  createTodoStatus: async (todoStatusData) => {
    try {

           const cleanColor = todoStatusData.color.replace('#', '');
      
      const requestData = {
        ProjectId: todoStatusData.projectId,
        Name: todoStatusData.name,
        Color: cleanColor // بدون #
      };
              console.log(requestData)
      const response = await api.post('/TodoStatus/InsertTodoStatus', requestData);
      return response.data;
    } catch (error) {
      console.error('Error creating todo status:', error);
      throw error;
    }
  },

  

  // آپدیت وضعیت
  updateTodoStatus: async (id, todoStatusData) => {
    try {
             const cleanColor = todoStatusData.color.replace('#', '');
              const requestData = {
        ProjectId: todoStatusData.projectId,
        Name: todoStatusData.name,
        Id:id,
        OrderNum:todoStatusData.orderNum,
        Color: cleanColor // بدون #
      };
      console.log('miyad')
      console.log(requestData)
      const response = await api.post(`/TodoStatus/UpdateTodoStatus`, requestData);
      return response.data;
    } catch (error) {
      console.error('Error updating todo status:', error);
      throw error;
    }
  },

  // حذف وضعیت
  deleteTodoStatus: async (id) => {
    try {
      const response = await api.delete(`/TodoStatus/DeleteTodoStatus?id=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting todo status:', error);
      throw error;
    }
  }
};