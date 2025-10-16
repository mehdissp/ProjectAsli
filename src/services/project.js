// services/project.js
import { http } from './api';

export const projectService = {
  async getProjects(pageNumber = 1, pageSize = 10) {
    try {
      const response = await http.post('/project/GetProject', {
        PageNumber: pageNumber,
        PageSize: pageSize
      });
      console.log('📦 Projects data received:', response.data);
      
      // استفاده از ساختار جدید API
      return response.data.data || {
        items: [],
        totalCount: 0,
        totalPages: 0
      };
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

   async deleteProject(projectId) {
    try {
      console.log('🗑️ Deleting project:', projectId);
      const response = await http.post('/project/DeleteProject', {
        Id: projectId
      });
      console.log('✅ Project deleted successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Delete project service error:', error);
      throw error;
    }
  },
};

export default projectService;