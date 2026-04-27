// // services/panelService.js
// import api from './api';

// export const panelService = {
//   // دریافت لیست وضعیت‌ها

//   async GetRealEstatePanel() {
//     try {
           
//       const response = await api.get('/RealEstatePage/GetRealEstatePanel');
//       console.log('📦 GetRealEstatePanel data received:', response.data);
      
//       // استفاده از ساختار جدید API
//       return response.data.data ;
//     } catch (error) {
//       console.error('❌ Get Archive service error:', error);
//       throw error;
//     }
//   },

  
//     async GetFacilities(id) {
//     try {
           
//       const response = await api.get(`/RealEstatePage/GetFacilities?id=${id}`);
//       console.log('📦 GetRealEstatePanel data received:', response.data);
      
//       // استفاده از ساختار جدید API
//       return response.data ;
//     } catch (error) {
//       console.error('❌ Get Archive service error:', error);
//       throw error;
//     }
//   },
//   // ایجاد وضعیت جدی
//   // ایجاد وضعیت جدید
//    async GetRegionComboParent() {
//     try {
           
//     //  // ساخت URL بر اساس وجود id یا نبود آن
//     //     let url = '/RealEstatePage/GetRegionsWithChildFlagAsync';
//     //     if (id !== null && id !== undefined) {
//     //         url += `?id=${id}`;
//     //     }
        
//     //     const response = await api.get(url);
//           const response = await api.get(`/RealEstatePage/GetRegionsWithChildFlagAsync`)
//       console.log("region",response.data)
//       // استفاده از ساختار جدید API
//       return response ;
//     } catch (error) {
//       console.error('❌ Get Archive service error:', error);
//       throw error;
//     }
//   },
//     async GetRegionCombo(id) {
//     try {
           
//     //  // ساخت URL بر اساس وجود id یا نبود آن
//     //     let url = '/RealEstatePage/GetRegionsWithChildFlagAsync';
//     //     if (id !== null && id !== undefined) {
//     //         url += `?id=${id}`;
//     //     }
        
//     //     const response = await api.get(url);
//           const response = await api.get(`/RealEstatePage/GetRegionsWithChildFlagAsync?id=${id}`)
      
//       // استفاده از ساختار جدید API
//       return response ;
//     } catch (error) {
//       console.error('❌ Get Archive service error:', error);
//       throw error;
//     }
//   },

// async ClearTempImage(cacheId) {
//   try {
//     const response = await api.post('/RealEstatePage/ClearTempImage', JSON.stringify({ cacheId: cacheId }), {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
    
//     return response;
//   } catch (error) {
//     console.error('❌ ClearTempImage service error:', error);
//     throw error;
//   }
// }
  


// };
// services/panelService.js
import api from './api';

export const panelService = {
  // دریافت لیست وضعیت‌ها
  async GetRealEstatePanel() {
    try {
      const response = await api.get('/RealEstatePage/GetRealEstatePanel');
      console.log('📦 GetRealEstatePanel data received:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('❌ Get Archive service error:', error);
      throw error;
    }
  },

  async GetFacilities(id) {
    try {
      const response = await api.get(`/RealEstatePage/GetFacilities?id=${id}`);
      console.log('📦 GetRealEstatePanel data received:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Get Archive service error:', error);
      throw error;
    }
  },

  async GetRegionComboParent() {
    try {
      const response = await api.get(`/RealEstatePage/GetRegionsWithChildFlagAsync`);
      console.log("region", response.data);
      return response;
    } catch (error) {
      console.error('❌ Get Archive service error:', error);
      throw error;
    }
  },

  async GetRegionCombo(id) {
    try {
      const response = await api.get(`/RealEstatePage/GetRegionsWithChildFlagAsync?id=${id}`);
      return response;
    } catch (error) {
      console.error('❌ Get Archive service error:', error);
      throw error;
    }
  },

  async clearTempImageFromCache(cacheId) {
    try {
   
      const response = await api.post('/RealEstatePage/ClearTempImage', JSON.stringify({ cacheId: cacheId }), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response;
    } catch (error) {
      console.error('❌ ClearTempImage service error:', error);
      throw error;
    }
  },

  // متد جدید برای آپلود تصویر
  async UploadTempImage(imageFile, onProgress) {
    try {
      const formData = new FormData();
      let fileToUpload = imageFile;
      
      // تبدیل dataURL به File اگر لازم باشد
      if (typeof imageFile === 'string' && imageFile.startsWith('data:image')) {
        fileToUpload = this.dataURLtoFile(imageFile, `image_${Date.now()}.jpg`);
      }
      
      formData.append('image', fileToUpload);
      
      const token = localStorage.getItem('auth_token');
      
      // استفاده از XMLHttpRequest برای track کردن progress
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        if (onProgress) {
          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              const percentComplete = Math.round((event.loaded / event.total) * 100);
              onProgress(percentComplete);
            }
          });
        }
        
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            try {
              const result = JSON.parse(xhr.responseText);
              if (result.success) {
                resolve(result);
              } else {
                reject(new Error(result.message || 'خطا در آپلود'));
              }
            } catch (e) {
              reject(new Error('خطا در پردازش پاسخ سرور'));
            }
          } else {
            reject(new Error(`خطا در آپلود: ${xhr.status}`));
          }
        });
        
        xhr.addEventListener('error', () => {
          reject(new Error('خطا در ارتباط با سرور'));
        });
        
        xhr.open('POST', 'https://localhost:7178/api/RealEstatePage/UploadTempImage');
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.send(formData);
      });
    } catch (error) {
      console.error('❌ UploadTempImage service error:', error);
      throw error;
    }
  },

  // متد کمکی برای تبدیل dataURL به File
  dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
};