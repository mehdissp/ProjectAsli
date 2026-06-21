// // // services/panelService.js
// // import api from './api';

// // export const panelService = {
// //   // دریافت لیست وضعیت‌ها

// //   async GetRealEstatePanel() {
// //     try {
           
// //       const response = await api.get('/RealEstatePage/GetRealEstatePanel');
// //       console.log('📦 GetRealEstatePanel data received:', response.data);
      
// //       // استفاده از ساختار جدید API
// //       return response.data.data ;
// //     } catch (error) {
// //       console.error('❌ Get Archive service error:', error);
// //       throw error;
// //     }
// //   },

  
// //     async GetFacilities(id) {
// //     try {
           
// //       const response = await api.get(`/RealEstatePage/GetFacilities?id=${id}`);
// //       console.log('📦 GetRealEstatePanel data received:', response.data);
      
// //       // استفاده از ساختار جدید API
// //       return response.data ;
// //     } catch (error) {
// //       console.error('❌ Get Archive service error:', error);
// //       throw error;
// //     }
// //   },
// //   // ایجاد وضعیت جدی
// //   // ایجاد وضعیت جدید
// //    async GetRegionComboParent() {
// //     try {
           
// //     //  // ساخت URL بر اساس وجود id یا نبود آن
// //     //     let url = '/RealEstatePage/GetRegionsWithChildFlagAsync';
// //     //     if (id !== null && id !== undefined) {
// //     //         url += `?id=${id}`;
// //     //     }
        
// //     //     const response = await api.get(url);
// //           const response = await api.get(`/RealEstatePage/GetRegionsWithChildFlagAsync`)
// //       console.log("region",response.data)
// //       // استفاده از ساختار جدید API
// //       return response ;
// //     } catch (error) {
// //       console.error('❌ Get Archive service error:', error);
// //       throw error;
// //     }
// //   },
// //     async GetRegionCombo(id) {
// //     try {
           
// //     //  // ساخت URL بر اساس وجود id یا نبود آن
// //     //     let url = '/RealEstatePage/GetRegionsWithChildFlagAsync';
// //     //     if (id !== null && id !== undefined) {
// //     //         url += `?id=${id}`;
// //     //     }
        
// //     //     const response = await api.get(url);
// //           const response = await api.get(`/RealEstatePage/GetRegionsWithChildFlagAsync?id=${id}`)
      
// //       // استفاده از ساختار جدید API
// //       return response ;
// //     } catch (error) {
// //       console.error('❌ Get Archive service error:', error);
// //       throw error;
// //     }
// //   },

// // async ClearTempImage(cacheId) {
// //   try {
// //     const response = await api.post('/RealEstatePage/ClearTempImage', JSON.stringify({ cacheId: cacheId }), {
// //       headers: {
// //         'Content-Type': 'application/json'
// //       }
// //     });
    
// //     return response;
// //   } catch (error) {
// //     console.error('❌ ClearTempImage service error:', error);
// //     throw error;
// //   }
// // }
  


// // };

// // services/panelService.js
// import api from './api';

// export const panelService = {
//   // دریافت لیست وضعیت‌ها
//   async GetRealEstatePanel() {
//     try {
//       const response = await api.get('/RealEstatePage/GetRealEstatePanel');
//       console.log('📦 GetRealEstatePanel data received:', response.data);
//       return response.data.data;
//     } catch (error) {
//       console.error('❌ Get Archive service error:', error);
//       throw error;
//     }
//   },



//     async GetStories() {
//     try {
//       const response = await api.get('/Story/StoryProfile');
//       console.log('📦 GetRealEstatePanel data received:', response.data);
//       return response.data.data;
//     } catch (error) {
//       console.error('❌ Get Archive service error:', error);
//       throw error;
//     }
//   },
//   // ✅ اضافه کردن متد DeleteStory
//   // async DeleteStory(storyId) {
//   //   try {
//   //     const response = await api.post(`/Story/DeleteStory?id=${storyId}`);
//   //     console.log('🗑️ DeleteStory response:', response.data);
//   //     return response.data;
//   //   } catch (error) {
//   //     console.error('❌ DeleteStory service error:', error);
//   //     throw error;
//   //   }
//   // },

//   async DeleteStory(storyId) {
//   try {
//     const formData = new FormData();
//     const response = await api.post(`/Story/DeleteStory?id=${storyId}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     console.log('🗑️ DeleteStory response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('❌ DeleteStory service error:', error);
//     throw error;
//   }
// },

//   async GetFacilities(id) {
//     try {
//       const response = await api.get(`/RealEstatePage/GetFacilities?id=${id}`);
//       console.log('📦 GetRealEstatePanel data received:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ Get Archive service error:', error);
//       throw error;
//     }
//   },

//   async GetRegionComboParent() {
//     try {
//       const response = await api.get(`/RealEstatePage/GetRegionsWithChildFlagAsync`);
//       console.log("region", response.data);
//       return response;
//     } catch (error) {
//       console.error('❌ Get Archive service error:', error);
//       throw error;
//     }
//   },

//   async GetRegionCombo(id) {
//     try {
//       const response = await api.get(`/RealEstatePage/GetRegionsWithChildFlagAsync?id=${id}`);
//       return response;
//     } catch (error) {
//       console.error('❌ Get Archive service error:', error);
//       throw error;
//     }
//   },

//   async clearTempImageFromCache(cacheId) {
//     try {
   
//       const response = await api.post('/RealEstatePage/ClearTempImage', JSON.stringify({ cacheId: cacheId }), {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       return response;
//     } catch (error) {
//       console.error('❌ ClearTempImage service error:', error);
//       throw error;
//     }
//   },

//   // متد جدید برای آپلود تصویر
//   async UploadTempImage(imageFile, onProgress) {
//     try {
//       const formData = new FormData();
//       let fileToUpload = imageFile;
      
//       // تبدیل dataURL به File اگر لازم باشد
//       if (typeof imageFile === 'string' && imageFile.startsWith('data:image')) {
//         fileToUpload = this.dataURLtoFile(imageFile, `image_${Date.now()}.jpg`);
//       }
      
//       formData.append('image', fileToUpload);
      
//       const token = localStorage.getItem('auth_token');
      
//       // استفاده از XMLHttpRequest برای track کردن progress
//       return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
        
//         if (onProgress) {
//           xhr.upload.addEventListener('progress', (event) => {
//             if (event.lengthComputable) {
//               const percentComplete = Math.round((event.loaded / event.total) * 100);
//               onProgress(percentComplete);
//             }
//           });
//         }
        
//         xhr.addEventListener('load', () => {
//           if (xhr.status === 200) {
//             try {
//               const result = JSON.parse(xhr.responseText);
//               if (result.success) {
//                 resolve(result);
//               } else {
//                 reject(new Error(result.message || 'خطا در آپلود'));
//               }
//             } catch (e) {
//               reject(new Error('خطا در پردازش پاسخ سرور'));
//             }
//           } else {
//             reject(new Error(`خطا در آپلود: ${xhr.status}`));
//           }
//         });
        
//         xhr.addEventListener('error', () => {
//           reject(new Error('خطا در ارتباط با سرور'));
//         });
        
//         xhr.open('POST', 'https://localhost:7178/api/RealEstatePage/UploadTempImage');
//         xhr.setRequestHeader('Authorization', `Bearer ${token}`);
//         xhr.send(formData);
//       });
//     } catch (error) {
//       console.error('❌ UploadTempImage service error:', error);
//       throw error;
//     }
//   },

//   // متد کمکی برای تبدیل dataURL به File
//   dataURLtoFile(dataurl, filename) {
//     const arr = dataurl.split(',');
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new File([u8arr], filename, { type: mime });
//   }
// };
// services/panelService.js
import api from './api';

export const panelService = {
  // دریافت لیست املاک
  async GetRealEstatePanel() {
    try {
      const response = await api.get('/RealEstatePage/GetRealEstatePanel');
      console.log('📦 GetRealEstatePanel data received:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('❌ GetRealEstatePanel error:', error);
      throw error;
    }
  },
  async GetRealEstatePanelForStory() {
    try {
      const response = await api.get('/RealEstatePage/GetRealEstatePanel');
      console.log('📦 Full response:', response);
      console.log('📦 response.data:', response.data);
      
      // بررسی ساختار داده
      if (response.data && response.data.data) {
        console.log('✅ Properties found:', response.data.data);
        return response.data.data;
      } else if (Array.isArray(response.data)) {
        console.log('✅ Properties found (direct array):', response.data);
        return response.data;
      } else {
        console.warn('⚠️ Unexpected data structure:', response.data);
        return [];
      }
    } catch (error) {
      console.error('❌ GetRealEstatePanel error:', error);
      throw error;
    }
  },
  // دریافت استوری‌ها
  async GetStories() {
    try {
      const response = await api.get('/Story/StoryProfile');
      console.log('📦 GetStories data received:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('❌ GetStories error:', error);
      throw error;
    }
  },

  // حذف استوری
  async DeleteStory(storyId) {
    try {
      const formData = new FormData();
      const response = await api.post(`/Story/DeleteStory?id=${storyId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('🗑️ DeleteStory response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ DeleteStory error:', error);
      throw error;
    }
  },

  // دریافت امکانات
  async GetFacilities(id) {
    try {
      const response = await api.get(`/RealEstatePage/GetFacilities?id=${id}`);
      console.log('📦 GetFacilities data received:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ GetFacilities error:', error);
      throw error;
    }
  },

  // دریافت منطقه والد
  async GetRegionComboParent() {
    try {
      const response = await api.get(`/RealEstatePage/GetRegionsWithChildFlagAsync`);
      console.log("region", response.data);
      return response;
    } catch (error) {
      console.error('❌ GetRegionComboParent error:', error);
      throw error;
    }
  },

  // دریافت مناطق
  async GetRegionCombo(id) {
    try {
      const response = await api.get(`/RealEstatePage/GetRegionsWithChildFlagAsync?id=${id}`);
      return response;
    } catch (error) {
      console.error('❌ GetRegionCombo error:', error);
      throw error;
    }
  },

  // ⭐ آپلود عکس موقت برای استوری
  async UploadTempImage(imageFile) {
    try {
      const formData = new FormData();
      
      // اگر dataURL بود تبدیلش کن
      let fileToUpload = imageFile;
      if (typeof imageFile === 'string' && imageFile.startsWith('data:image')) {
        fileToUpload = this.dataURLtoFile(imageFile, `story_${Date.now()}.jpg`);
      }
      
      formData.append('image', fileToUpload);
      
      const response = await api.post('/RealEstatePage/UploadTempImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('📤 UploadTempImage response:', response.data);
      return response.data; // { success: true, cacheId: "..." }
    } catch (error) {
      console.error('❌ UploadTempImage error:', error);
      throw error;
    }
  },

  // ⭐ پاک کردن عکس موقت از کش
  async ClearTempImage(cacheId) {
    try {
      const response = await api.post('/RealEstatePage/ClearTempImage', {
        cacheId: cacheId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('🗑️ ClearTempImage response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ ClearTempImage error:', error);
      throw error;
    }
  },

  // ⭐ پاک کردن عکس موقت از کش (با فرمت قدیمی - برای سازگاری)
  async clearTempImageFromCache(cacheId) {
    try {
      // استفاده از متد جدید
      return await this.ClearTempImage(cacheId);
    } catch (error) {
      console.error('❌ clearTempImageFromCache error:', error);
      throw error;
    }
  },

  // ⭐ ثبت استوری جدید
  async InsertStory(storyData) {
    try {
      // ساختار مورد انتظار بک‌اند:
      // {
      //   title: string,
      //   realEstateId: string,
      //   tempImageCacheIds: string[]  // لیست cacheId ها
      // }
      
      const payload = {
        title: storyData.title || null,
         realEstatedId: storyData.realEstateId || null,
        urlAddress:"",
        tempImageCacheIds: storyData.tempImageCacheIds || []
      };
      console.log(payload)
      const response = await api.post('/Story/InsertStory', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('✅ InsertStory response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ InsertStory error:', error);
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