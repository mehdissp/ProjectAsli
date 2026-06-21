// // components/dashboard/Dashboard/Dashboard.jsx
// import React from 'react';
// import { useAuth } from '../../../context/AuthContext';
// import useApi from '../../../hooks/useApi';
// import { authService } from '../../../services/auth';
// import './Dashboard.css';
// import PersianGanttChart from './PersianGanttChart';

// const Dashboard = () => {
//   const { user } = useAuth();
  
//   // استفاده از هوک API - اصلاح شده
//   const { data: stats, loading: statsLoading, error: statsError } = useApi(
//     () => authService.getDashboardStats ? authService.getDashboardStats() : Promise.resolve(null)
//   );

//   const quickStats = [
//     {
//       title: 'کاربران فعال',
//       value: stats?.totalUsers?.toLocaleString() || '۱,۲۴۳',
//       icon: '👥',
//       color: 'var(--primary-color)',
//       change: '+12%'
//     },
//     {
//       title: 'سفارشات امروز',
//       value: stats?.totalOrders?.toLocaleString() || '۵۶',
//       icon: '📦',
//       color: 'var(--accent-color)',
//       change: '+8%'
//     },
//     {
//       title: 'درآمد ماه',
//       value: stats?.totalRevenue ? `${(stats.totalRevenue / 1000000).toFixed(1)}M` : '۱۲.۵M',
//       icon: '💰',
//       color: '#10b981',
//       change: '+23%'
//     },
//     {
//       title: 'بازدیدها',
//       value: stats?.totalVisits?.toLocaleString() || '۸,۴۵۶',
//       icon: '👀',
//       color: '#f59e0b',
//       change: '+5%'
//     }
//   ];

//   const recentActivities = [
//     { id: 1, user: 'علی محمدی', action: 'سفارش جدید ثبت کرد', time: '۲ دقیقه پیش' },
//     { id: 2, user: 'مریم کریمی', action: 'محصول جدید اضافه کرد', time: '۵ دقیقه پیش' },
//     { id: 3, user: 'رضا احمدی', action: 'نظر جدید ارسال کرد', time: '۱۰ دقیقه پیش' },
//     { id: 4, user: 'سارا نظری', action: 'پروفایل را بروزرسانی کرد', time: '۱۵ دقیقه پیش' }
//   ];

//   if (statsError) {
//     console.error('Dashboard stats error:', statsError);
//   }

//   return (
//     <div className="dashboard">
//      {/* گانت چارت */}
//       <PersianGanttChart 
//         onTaskClick={(project, task) => {
//           console.log('تسک انتخاب شده:', task.name, 'از پروژه:', project.name);
//         }}
//       />

//       <div className="dashboard-header fade-in">
//         <h1>داشبورد مدیریت</h1>
//         <p>خلاصه‌ای از فعالیت‌ها و آمار سیستم</p>
//         {statsError && (
//           <div className="error-banner">
//             ⚠️ خطا در دریافت آمار: از داده‌های نمونه استفاده می‌شود
//           </div>
//         )}
//       </div>
       

//       {/* کارت‌های آمار سریع */}
//       <div className="stats-grid stagger-children">
//         {quickStats.map((stat, index) => (
//           <div key={index} className="stat-card">
//             <div className="stat-icon" style={{ background: stat.color }}>
//               {stat.icon}
//             </div>
//             <div className="stat-content">
//               <div className="stat-value">
//                 {statsLoading ? (
//                   <div className="skeleton-loader skeleton-rect short"></div>
//                 ) : (
//                   stat.value
//                 )}
//               </div>
//               <div className="stat-title">{stat.title}</div>
//               <div className="stat-change" style={{ color: stat.color }}>
//                 {stat.change}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="dashboard-content">
//         {/* فعالیت‌های اخیر */}
//         <div className="recent-activities card slide-in-left">
//           <h2>فعالیت‌های اخیر</h2>
//           <div className="activities-list">
//             {recentActivities.map((activity, index) => (
//               <div 
//                 key={activity.id} 
//                 className="activity-item fade-in-up"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div className="activity-avatar">
//                   {activity.user.charAt(0)}
//                 </div>
//                 <div className="activity-content">
//                   <div className="activity-text">
//                     <strong>{activity.user}</strong> {activity.action}
//                   </div>
//                   <div className="activity-time">{activity.time}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* اطلاعات کاربر */}
//         <div className="user-info-card card slide-in-right">
//           <h2>اطلاعات کاربر</h2>
//           <div className="user-details">
//             <div className="detail-item">
//               <label>نام کامل:</label>
//               <span>{user?.name || 'نامشخص'}</span>
//             </div>
//             <div className="detail-item">
//               <label>ایمیل:</label>
//               <span>{user?.email || 'نامشخص'}</span>
//             </div>
//             <div className="detail-item">
//               <label>نقش:</label>
//               <span>{user?.role || 'مدیر سیستم'}</span>
//             </div>
//             <div className="detail-item">
//               <label>تاریخ عضویت:</label>
//               <span>{user?.joinDate || 'نامشخص'}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// components/dashboard/Dashboard/Dashboard.jsx
import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import useApi from '../../../hooks/useApi';
import { authService } from '../../../services/auth';
import './Dashboard.css';
// import PersianGanttChart from './PersianGanttChart';
import ImageWithSafeError from '../../common/ImageWithSafeError/ImageWithSafeError';
const Dashboard = () => {
  const { user } = useAuth();
  
  const { data: stats, loading: statsLoading, error: statsError } = useApi(
    () => authService.getDashboardStats ? authService.getDashboardStats() : Promise.resolve(null)
  );

  const quickStats = [
    {
      title: 'کاربران فعال',
      value: stats?.totalUsers?.toLocaleString() || '۱,۲۴۳',
      icon: '👥',
      color: 'var(--primary-color)',
      change: '+12%'
    },
    {
      title: 'سفارشات امروز',
      value: stats?.totalOrders?.toLocaleString() || '۵۶',
      icon: '📦',
      color: 'var(--accent-color)',
      change: '+8%'
    },
    {
      title: 'درآمد ماه',
      value: stats?.totalRevenue ? `${(stats.totalRevenue / 1000000).toFixed(1)}M` : '۱۲.۵M',
      icon: '💰',
      color: '#10b981',
      change: '+23%'
    },
    {
      title: 'بازدیدها',
      value: stats?.totalVisits?.toLocaleString() || '۸,۴۵۶',
      icon: '👀',
      color: '#f59e0b',
      change: '+5%'
    }
  ];

  const recentActivities = [
    { id: 1, user: 'علی محمدی', action: 'سفارش جدید ثبت کرد', time: '۲ دقیقه پیش' },
    { id: 2, user: 'مریم کریمی', action: 'محصول جدید اضافه کرد', time: '۵ دقیقه پیش' },
    { id: 3, user: 'رضا احمدی', action: 'نظر جدید ارسال کرد', time: '۱۰ دقیقه پیش' },
    { id: 4, user: 'سارا نظری', action: 'پروفایل را بروزرسانی کرد', time: '۱۵ دقیقه پیش' }
  ];

  if (statsError) {
    console.error('Dashboard stats error:', statsError);
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header fade-in">
        <h1>داشبورد مدیریت</h1>
        <p>خلاصه‌ای از فعالیت‌ها و آمار سیستم</p>
        {statsError && (
          <div className="error-banner">
            ⚠️ خطا در دریافت آمار: از داده‌های نمونه استفاده می‌شود
          </div>
        )}
      </div>

      <div className="stats-grid stagger-children">
        {quickStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ background: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <div className="stat-value">
                {statsLoading ? (
                  <div className="skeleton-loader skeleton-rect short"></div>
                ) : (
                  stat.value
                )}
              </div>
              <div className="stat-title">{stat.title}</div>
              <div className="stat-change" style={{ color: stat.color }}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* گانت چارت اینجا قرار بگیرد */}
      {/* <PersianGanttChart 
        onTaskClick={(project, task) => {
          console.log('تسک انتخاب شده:', task.name, 'از پروژه:', project.name);
        }}
      /> */}

      <div className="dashboard-content">
        <div className="recent-activities card slide-in-left">
          <h2>فعالیت‌های اخیر</h2>
          <div className="activities-list">
            {recentActivities.map((activity, index) => (
              <div 
                key={activity.id} 
                className="activity-item fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="activity-avatar">
                  {activity.user.charAt(0)}
                </div>
                <div className="activity-content">
                  <div className="activity-text">
                    <strong>{activity.user}</strong> {activity.action}
                  </div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="user-info-card card slide-in-right">
          <h2>اطلاعات کاربر</h2>
          <div className="user-details">
            <div className="detail-item">
              <label>نام کامل:</label>
              <span>{user?.name || 'نامشخص'}</span>
            </div>
            <div className="detail-item">
              <label>ایمیل:</label>
              <span>{user?.email || 'نامشخص'}</span>
            </div>
            <div className="detail-item">
              <label>نقش:</label>
              <span>{user?.role || 'مدیر سیستم'}</span>
            </div>
            <div className="detail-item">
              <label>تاریخ عضویت:</label>
              <span>{user?.joinDate || 'نامشخص'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;