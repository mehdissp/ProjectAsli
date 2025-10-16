// services/project.js
import { http } from './api';

export const projectService = {
  async getProjects() {
    try {
      const response = await http.get('/project/GetProject');
      console.log('📦 Projects data received:', response.data);
      return response.data.data || [];
    } catch (error) {
      console.error('❌ Get projects service error:', error);
      throw error;
    }
  },

  async createProject(projectData) {
    try {
      console.log('🚀 Sending project data:', projectData);
      const response = await http.post('/project/InsertProject', projectData);
      console.log('✅ Project created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Create project service error:', error);
      throw error;
    }
  },

  async updateProject(id, projectData) {
    try {
      const response = await http.put(`/project/${id}`, projectData);
      return response.data.data;
    } catch (error) {
      console.error('Update project service error:', error);
      throw error;
    }
  },

  async deleteProject(id) {
    try {
      const response = await http.delete(`/project/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete project service error:', error);
      throw error;
    }
  }
};

export default projectService;