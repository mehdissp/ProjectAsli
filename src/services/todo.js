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
}


};