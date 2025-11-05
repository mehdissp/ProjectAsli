// services/roleService.js
import api from './api';

export const profileService = {
  // دریافت لیست وضعیت‌ها


async uploadProfilePhoto(file) {
      console.log('📁 File details:', {
    name: file.name,
    type: file.type,
    size: file.size,
    lastModified: file.lastModified
  });
  console.log('file', file)
  try {
    const formData = new FormData();
    formData.append('file', file); // تغییر از 'File' به 'file'
    
    const response = await api.post('/UserProfile/upload-photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('✅ Profile photo uploaded successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Upload profile photo service error:', error);
    throw error;
  }
},
   
  


};