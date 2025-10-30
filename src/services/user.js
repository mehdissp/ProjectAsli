// // import api from './api';

// // // ایجاد کاربر جدید
// // const createUser = async (userData) => {
// //   try {
// //     console.log("miyaaaaaaad")
// //     console.log(userData)
// //     console.log(api.post('/User/registerNewUser', userData))
// //     const response = await api.post('/User/registerNewUser', userData);
// //     return response.data;
// //   } catch (error) {
// //     throw handleError(error);
// //   }
// // };



// // // دریافت لیست کاربران
// // const getUsers = async (pageNumber = 1, pageSize = 10) => {
// //   try {
// //     const response = await api.post('/User/GetUsers', {
// //       pageNumber,
// //       pageSize
// //     });
// //     return response.data;
// //   } catch (error) {
// //     throw handleError(error);
// //   }
// // };

// // // حذف کاربر
// // const deleteUser = async (userId) => {
// //   try {
// //     const response = await api.delete(`/User/${userId}`);
// //     return response.data;
// //   } catch (error) {
// //     throw handleError(error);
// //   }
// // };

// // // ویرایش کاربر
// // const updateUser = async (userId, userData) => {
// //   try {
// //     const response = await api.put(`/User/${userId}`, userData);
// //     return response.data;
// //   } catch (error) {
// //     throw handleError(error);
// //   }
// // };

// // // دریافت اطلاعات یک کاربر
// // const getUserById = async (userId) => {
// //   try {
// //     const response = await api.get(`/User/${userId}`);
// //     return response.data;
// //   } catch (error) {
// //     throw handleError(error);
// //   }
// // };

// // // تغییر وضعیت فعال/غیرفعال کاربر
// // const toggleUserStatus = async (userId) => {
// //   try {
// //     const response = await api.patch(`/User/${userId}/toggle-status`);
// //     return response.data;
// //   } catch (error) {
// //     throw handleError(error);
// //   }
// // };

// // // مدیریت خطاها
// // const handleError = (error) => {
// //   console.error('User Service Error:', error);
  
// //   if (error.response) {
// //     const message = error.response.data?.message || error.response.data?.title || 'خطا در ارتباط با سرور';
// //     const status = error.response.status;
    
// //     switch (status) {
// //       case 400:
// //         return new Error(`درخواست نامعتبر: ${message}`);
// //       case 401:
// //         return new Error('دسترسی غیرمجاز. لطفا مجدد وارد شوید');
// //       case 403:
// //         return new Error('شما دسترسی لازم برای این عملیات را ندارید');
// //       case 404:
// //         return new Error('کاربر مورد نظر یافت نشد');
// //       case 409:
// //         return new Error('کاربر با این ایمیل قبلا ثبت شده است');
// //       case 429:
// //         return new Error('تعداد درخواست‌های شما زیاد است. لطفا کمی صبر کنید');
// //       case 500:
// //         return new Error('خطای داخلی سرور. لطفا بعدا تلاش کنید');
// //       default:
// //         return new Error(message);
// //     }
// //   } else if (error.request) {
// //     return new Error('خطا در ارتباط با سرور. لطفا اتصال اینترنت خود را بررسی کنید');
// //   } else {
// //     return new Error('خطای ناشناخته رخ داده است');
// //   }
// // };

// // // Export تمام توابع
// // export const userService = {
// //   createUser,
// //   getUsers,
// //   deleteUser,
// //   updateUser,
// //   getUserById,
// //   toggleUserStatus
// // };

// // // Export پیشفرض
// // export default userService;

// // services/user.js
// import { http } from './api';

// export const userService = {
//   async createUser(userData) {
//     try {
//       console.log('🚀 Sending user data:', userData);
//       const response = await http.post('/User/registerNewUser', userData);
//       console.log('✅ User created response:', response);
      
//       // بررسی ساختار پاسخ
//       if (response && response.data) {
//         return response.data;
//       } else {
//         throw new Error('پاسخ نامعتبر از سرور');
//       }
//     } catch (error) {
//       console.error('❌ Create user service error:', error);
//       throw error;
//     }
//   },

//   async getUsers(pageNumber = 1, pageSize = 10) {
//     try {
//       const response = await http.post('/User/GetUsers', {
//         PageNumber: pageNumber,
//         PageSize: pageSize
//       });
//       console.log('📦 Users response:', response);
      
//       // بررسی چندین ساختار ممکن برای پاسخ
//       if (response && response.data) {
//         // اگر داده مستقیماً در response.data باشد
//         if (response.data.items || response.data.data) {
//           return response.data;
//         }
//         // اگر ساختار متفاوت باشد
//         return response.data;
//       }
      
//       // اگر پاسخ خالی باشد
//       return {
//         items: [],
//         totalCount: 0,
//         totalPages: 0
//       };
//     } catch (error) {
//       console.error('❌ Get users service error:', error);
//       throw error;
//     }
//   },

//   async deleteUser(userId) {
//     try {
//       console.log('🗑️ Deleting user:', userId);
      
//       // دو روش احتمالی برای حذف - بستگی به API دارد
//       let response;
      
//       // روش ۱: استفاده از POST مانند پروژه
//       try {
//         response = await http.post('/User/DeleteUser', {
//           Id: userId
//         });
//       } catch (postError) {
//         // روش ۲: استفاده از DELETE در صورت عدم کارکرد POST
//         console.log('⚠️ Trying DELETE method...');
//         response = await http.delete(`/User/${userId}`);
//       }
      
//       console.log('✅ User deleted response:', response);
//       return response.data;
//     } catch (error) {
//       console.error('❌ Delete user service error:', error);
//       throw error;
//     }
//   },

//   async updateUser(id, userData) {
//     try {
//       console.log('✏️ Updating user:', id, userData);
//       const response = await http.put(`/User/${id}`, userData);
//       console.log('✅ User updated response:', response);
      
//       // بررسی ساختار پاسخ
//       if (response && response.data) {
//         return response.data.data || response.data;
//       }
//       return response;
//     } catch (error) {
//       console.error('❌ Update user service error:', error);
//       throw error;
//     }
//   },

//   async getUserById(userId) {
//     try {
//       console.log('🔍 Getting user by ID:', userId);
//       const response = await http.get(`/User/${userId}`);
//       console.log('✅ User by ID response:', response);
      
//       // بررسی ساختار پاسخ
//       if (response && response.data) {
//         return response.data.data || response.data;
//       }
//       return response;
//     } catch (error) {
//       console.error('❌ Get user by ID service error:', error);
//       throw error;
//     }
//   },

//   async toggleUserStatus(userId) {
//     try {
//       console.log('🔄 Toggling user status:', userId);
//       const response = await http.patch(`/User/${userId}/toggle-status`);
//       console.log('✅ User status response:', response);
//       return response.data;
//     } catch (error) {
//       console.error('❌ Toggle user status service error:', error);
//       throw error;
//     }
//   }
// };

// export default userService;

// services/user.js
import { http } from './api';

export const userService = {


     async getRoles() {
    try {
      console.log('🔄 Fetching roles from API...');
      const response = await http.get('/User/GetRoleCombo');
      console.log('✅ Roles fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Get roles service error:', error);
      
      // مدیریت خطاهای مختلف
      if (error.response && error.response.status === 400) {
        const validationErrors = error.response.data?.errors;
        if (validationErrors) {
          console.error('📋 Validation errors:', validationErrors);
          const errorMessages = Object.entries(validationErrors)
            .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
            .join('\n');
          throw new Error(`خطا در دریافت نقش‌ها:\n${errorMessages}`);
        }
      }
      
      throw error;
    }
  },
  async createUser(userData) {
    try {
      // تبدیل ساختار داده به فرمت مورد انتظار API
      const apiData = {
        fullname: userData.fullname || userData.username, // اگر fullname ندارید از username استفاده کنید
        username: userData.username,
        email: userData.email,
        password: userData.password,
        isActive: userData.isActive !== undefined ? userData.isActive : true,
        roleId:userData.roleId,
        mobileNumber: userData.mobileNumber || userData.phone // تبدیل phone به mobileNumber
      };

      console.log('🚀 Sending user data to API:', apiData);
      const response = await http.post('/User/registerNewUser', apiData);
      console.log('✅ User created successfully:', response);
      
      return response.data;
    } catch (error) {
      console.error('❌ Create user service error:', error);
      
      // نمایش خطاهای validation به صورت خوانا
      if (error.response && error.response.status === 400) {
        const validationErrors = error.response.data?.errors;
        if (validationErrors) {
          console.error('📋 Validation errors:', validationErrors);
          // ایجاد پیام خطای فارسی
          const errorMessages = Object.entries(validationErrors)
            .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
            .join('\n');
          throw new Error(`خطا در اعتبارسنجی:\n${errorMessages}`);
        }
      }
      
      throw error;
    }
  },

  async updateuser(userData,checkChange) {
    try {
      // تبدیل ساختار داده به فرمت مورد انتظار API
      const apiData = {
        userId:userData.id,
        fullname: userData.fullname || userData.username, // اگر fullname ندارید از username استفاده کنید
        username: userData.username,
        email: userData.email,
        password: userData.password,
        isActive: userData.isActive !== undefined ? userData.isActive : true,
        roleId:userData.roleId,
        mobileNumber: userData.mobileNumber , // تبدیل phone به mobileNumber
        isChangePassword:checkChange

      };

      console.log('🚀 Sending user data to API:', apiData);
      const response = await http.post('/User/updateNewUser', apiData);
      console.log('✅ User created successfully:', response);
      
      return response.data;
    } catch (error) {
      console.error('❌ Create user service error:', error);
      
      // نمایش خطاهای validation به صورت خوانا
      if (error.response && error.response.status === 400) {
        const validationErrors = error.response.data?.errors;
        if (validationErrors) {
          console.error('📋 Validation errors:', validationErrors);
          // ایجاد پیام خطای فارسی
          const errorMessages = Object.entries(validationErrors)
            .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
            .join('\n');
          throw new Error(`خطا در اعتبارسنجی:\n${errorMessages}`);
        }
      }
      
      throw error;
    }
  },
  
  async getUsersGrid(pageNumber = 1, pageSize = 10) {
    try {

      const response = await http.post('/User/GetUsers', {
        PageNumber: pageNumber,
        PageSize: pageSize
      });
      console.log('📦 Users response:', response);
      
      return response.data;
    } catch (error) {
      console.error('❌ Get users service error:', error);
      throw error;
    }
  },

  // userService.js
async getUsersCombo(pageNumber = 1, pageSize = 10) {
    try {
      const response = await http.post('/User/GetUsersCombo', {
        PageNumber: pageNumber,
        PageSize: pageSize
      });
      console.log('📦 Users response:', response);
      
      return response.data;
    } catch (error) {
    console.error('❌ Get users combo service error:', error);
    throw error;
  }
},

  async deleteUser(userId) {
    try {
      console.log('🗑️ Deleting user:', userId);
      const response = await http.delete(`/User/${userId}`);
      console.log('✅ User deleted successfully:', response);
      return response.data;
    } catch (error) {
      console.error('❌ Delete user service error:', error);
      throw error;
    }
  },

  async updateUser(id, userData) {
    try {
      // تبدیل ساختار داده برای آپدیت
      const apiData = {
        fullname: userData.fullname || userData.username,
        username: userData.username,
        email: userData.email,
        isActive: userData.isActive,
        mobileNumber: userData.mobileNumber || userData.phone
      };

      console.log('✏️ Updating user:', id, apiData);
      const response = await http.put(`/User/${id}`, apiData);
      console.log('✅ User updated successfully:', response);
      return response.data;
    } catch (error) {
      console.error('❌ Update user service error:', error);
      throw error;
    }
  },

  async getUserById(userId) {
    try {
      console.log('🔍 Getting user by ID:', userId);
      const response = await http.get(`/User/${userId}`);
      console.log('✅ User data received:', response);
      return response.data;
    } catch (error) {
      console.error('❌ Get user by ID service error:', error);
      throw error;
    }
  },

  async toggleUserStatus(userId) {
    try {
      console.log('🔄 Toggling user status:', userId);
      const response = await http.patch(`/User/${userId}/toggle-status`);
      console.log('✅ User status toggled successfully:', response);
      return response.data;
    } catch (error) {
      console.error('❌ Toggle user status service error:', error);
      throw error;
    }
  }



  
};

export default userService;