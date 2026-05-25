import { http } from './api';

export const consultantService = {
  async getConsultantDashboard() {
    try {
      console.log('🔄 Fetching consultant dashboard data...');
      const response = await http.get('/User/getUserDashbaordIndependent');
      console.log('✅ Consultant dashboard data received:', response);
      
      // بررسی ساختار پاسخ
      if (response && response.data && response.data.status === 200) {
        return response.data.data;
      } else {
        throw new Error('فرمت پاسخ دریافتی نامعتبر است');
      }
    } catch (error) {
      console.error('❌ Get consultant dashboard error:', error);
      
      // مدیریت خطاها
      if (error.response) {
        const message = error.response.data?.message || 'خطا در دریافت اطلاعات دشبورد';
        const status = error.response.status;
        
        switch (status) {
          case 401:
            throw new Error('لطفا مجدداً وارد حساب کاربری خود شوید');
          case 403:
            throw new Error('شما دسترسی لازم برای مشاهده این صفحه را ندارید');
          case 404:
            throw new Error('اطلاعات مشاور یافت نشد');
          case 500:
            throw new Error('خطای داخلی سرور. لطفاً بعداً تلاش کنید');
          default:
            throw new Error(message);
        }
      } else if (error.request) {
        throw new Error('خطا در ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید');
      } else {
        throw new Error('خطای ناشناخته رخ داده است');
      }
    }
  }
};

export default consultantService;