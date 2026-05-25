// // import React, { useState, useEffect } from 'react';
// // import { 
// //   FaUserCheck, 
// //   FaWallet, 
// //   FaChartLine, 
// //   FaEye, 
// //   FaUserFriends, 
// //   FaThumbsUp,
// //   FaCheckCircle,
// //   FaPhoneAlt,
// //   FaUserTie,
// //   FaCalendarAlt,
// //   FaClock,
// //   FaChartBar,
// //   FaChartPie,
// //   FaTrendingUp
// // } from 'react-icons/fa';
// // import {
// //   LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
// //   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// // } from 'recharts';
// // import './ConsultantProfile.css';

// // const ConsultantProfile = () => {
// //   const [consultant, setConsultant] = useState({
// //     name: 'دکتر مهدی کریمی',
// //     phone: '09123456789',
// //     isPhoneVerified: true,
// //     walletBalance: 2845000,
// //     specialty: 'مشاور کسب و کار و استارتاپ',
// //     experience: 8,
// //     rating: 4.9,
// //     totalSessions: 347
// //   });

// //   // داده‌های نمودار بازدید ماهانه
// //   const [monthlyViews, setMonthlyViews] = useState([
// //     { month: 'فروردین', views: 245, sessions: 18 },
// //     { month: 'اردیبهشت', views: 312, sessions: 24 },
// //     { month: 'خرداد', views: 298, sessions: 22 },
// //     { month: 'تیر', views: 356, sessions: 28 },
// //     { month: 'مرداد', views: 423, sessions: 35 },
// //     { month: 'شهریور', views: 389, sessions: 31 },
// //     { month: 'مهر', views: 445, sessions: 38 },
// //     { month: 'آبان', views: 498, sessions: 42 },
// //     { month: 'آذر', views: 467, sessions: 39 },
// //     { month: 'دی', views: 512, sessions: 45 },
// //     { month: 'بهمن', views: 534, sessions: 48 },
// //     { month: 'اسفند', views: 489, sessions: 44 }
// //   ]);

// //   // داده‌های نمودار دایره‌ای دسته‌بندی بازدیدها
// //   const [categoryData, setCategoryData] = useState([
// //     { name: 'مشاوره فردی', value: 45, color: '#4F46E5' },
// //     { name: 'مشاوره تیمی', value: 28, color: '#10B981' },
// //     { name: 'کارگاه‌ها', value: 18, color: '#F59E0B' },
// //     { name: 'دوره‌ها', value: 9, color: '#EF4444' }
// //   ]);

// //   // داده‌های هفتگی
// //   const [weeklyData, setWeeklyData] = useState([
// //     { day: 'شنبه', views: 68, engagement: 45 },
// //     { day: 'یکشنبه', views: 72, engagement: 52 },
// //     { day: 'دوشنبه', views: 85, engagement: 63 },
// //     { day: 'سه‌شنبه', views: 79, engagement: 58 },
// //     { day: 'چهارشنبه', views: 92, engagement: 71 },
// //     { day: 'پنجشنبه', views: 64, engagement: 48 },
// //     { day: 'جمعه', views: 45, engagement: 38 }
// //   ]);

// //   const formatCurrency = (amount) => {
// //     return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
// //   };

// //   const StatCard = ({ icon, title, value, trend, color }) => (
// //     <div className="stat-card">
// //       <div className="stat-icon" style={{ backgroundColor: color }}>
// //         {icon}
// //       </div>
// //       <div className="stat-info">
// //         <h4>{title}</h4>
// //         <p>{value}</p>
// //         {trend && <span className="stat-trend positive">{trend}</span>}
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="consultant-profile-container">
// //       {/* هدر پروفایل */}
// //       <div className="profile-header-modern">
// //         <div className="header-overlay"></div>
// //         <div className="profile-info-wrapper">
// //           <div className="profile-avatar">
// //             <div className="avatar-circle">
// //               <FaUserTie size={48} />
// //             </div>
// //             <div className="online-status"></div>
// //           </div>
// //           <div className="profile-details">
// //             <div className="name-section">
// //               <h1>{consultant.name}</h1>
// //               <span className="specialty-badge">{consultant.specialty}</span>
// //             </div>
// //             <div className="contact-section">
// //               <div className="contact-item">
// //                 <FaPhoneAlt />
// //                 <span>{consultant.phone}</span>
// //                 {consultant.isPhoneVerified && (
// //                   <span className="verified-badge">
// //                     <FaCheckCircle />
// //                     تایید شده
// //                   </span>
// //                 )}
// //               </div>
// //             </div>
// //             <div className="stats-ribbon">
// //               <div className="ribbon-item">
// //                 <span className="ribbon-value">{consultant.experience}+</span>
// //                 <span className="ribbon-label">سال تجربه</span>
// //               </div>
// //               <div className="ribbon-divider"></div>
// //               <div className="ribbon-item">
// //                 <span className="ribbon-value">{consultant.rating}</span>
// //                 <span className="ribbon-label">امتیاز</span>
// //               </div>
// //               <div className="ribbon-divider"></div>
// //               <div className="ribbon-item">
// //                 <span className="ribbon-value">{consultant.totalSessions}</span>
// //                 <span className="ribbon-label">جلسه مشاوره</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* کیف پول و آمار سریع */}
// //       <div className="wallet-section">
// //         <div className="wallet-card">
// //           <div className="wallet-icon">
// //             <FaWallet />
// //           </div>
// //           <div className="wallet-info">
// //             <p className="wallet-label">موجودی کیف پول</p>
// //             <h2 className="wallet-amount">{formatCurrency(consultant.walletBalance)}</h2>
// //             <button className="charge-button">افزایش موجودی</button>
// //           </div>
// //         </div>
// //         <div className="quick-stats">
// //           <StatCard 
// //             icon={<FaEye />}
// //             title="بازدید کل پروفایل"
// //             value="5,234"
// //             trend="+23%"
// //             color="#4F46E5"
// //           />
// //           <StatCard 
// //             icon={<FaUserFriends />}
// //             title="مشاوره‌های انجام شده"
// //             value={consultant.totalSessions}
// //             trend="+12%"
// //             color="#10B981"
// //           />
// //           <StatCard 
// //             icon={<FaThumbsUp />}
// //             title="رضایت مشتریان"
// //             value="98%"
// //             trend="+5%"
// //             color="#F59E0B"
// //           />
// //         </div>
// //       </div>

// //       {/* نمودارهای بازدید */}
// //       <div className="charts-section">
// //         <div className="section-header">
// //           <h2>
// //             <FaChartLine />
// //             آمار بازدید و عملکرد
// //           </h2>
// //           <div className="date-filter">
// //             <button className="filter-btn active">سال جاری</button>
// //             <button className="filter-btn">۶ ماه اخیر</button>
// //             <button className="filter-btn">۳ ماه اخیر</button>
// //           </div>
// //         </div>

// //         <div className="charts-grid">
// //           {/* نمودار خطی ماهانه */}
// //           <div className="chart-card large">
// //             <div className="chart-title">
// //               <FaTrendingUp />
// //               <h3>روند بازدید ماهانه</h3>
// //             </div>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <LineChart data={monthlyViews}>
// //                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
// //                 <XAxis dataKey="month" />
// //                 <YAxis yAxisId="left" />
// //                 <YAxis yAxisId="right" orientation="right" />
// //                 <Tooltip />
// //                 <Legend />
// //                 <Line 
// //                   yAxisId="left"
// //                   type="monotone" 
// //                   dataKey="views" 
// //                   stroke="#4F46E5" 
// //                   strokeWidth={3}
// //                   name="تعداد بازدید"
// //                   dot={{ fill: '#4F46E5', r: 4 }}
// //                 />
// //                 <Line 
// //                   yAxisId="right"
// //                   type="monotone" 
// //                   dataKey="sessions" 
// //                   stroke="#10B981" 
// //                   strokeWidth={3}
// //                   name="تعداد جلسات"
// //                   dot={{ fill: '#10B981', r: 4 }}
// //                 />
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </div>

// //           {/* نمودار دایره‌ای */}
// //           <div className="chart-card">
// //             <div className="chart-title">
// //               <FaChartPie />
// //               <h3>دسته‌بندی خدمات</h3>
// //             </div>
// //             <ResponsiveContainer width="100%" height={250}>
// //               <PieChart>
// //                 <Pie
// //                   data={categoryData}
// //                   cx="50%"
// //                   cy="50%"
// //                   innerRadius={60}
// //                   outerRadius={90}
// //                   paddingAngle={5}
// //                   dataKey="value"
// //                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
// //                 >
// //                   {categoryData.map((entry, index) => (
// //                     <Cell key={`cell-${index}`} fill={entry.color} />
// //                   ))}
// //                 </Pie>
// //                 <Tooltip />
// //               </PieChart>
// //             </ResponsiveContainer>
// //           </div>

// //           {/* نمودار ستونی هفتگی */}
// //           <div className="chart-card">
// //             <div className="chart-title">
// //               <FaChartBar />
// //               <h3>بازدید هفتگی</h3>
// //             </div>
// //             <ResponsiveContainer width="100%" height={250}>
// //               <BarChart data={weeklyData}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="day" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Bar dataKey="views" fill="#4F46E5" name="بازدید" radius={[8, 8, 0, 0]} />
// //                 <Bar dataKey="engagement" fill="#10B981" name="تعامل" radius={[8, 8, 0, 0]} />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>

// //           {/* نمودار面积的 تعامل */}
// //           <div className="chart-card large">
// //             <div className="chart-title">
// //               <FaChartLine />
// //               <h3>نرخ تعامل مشتریان</h3>
// //             </div>
// //             <ResponsiveContainer width="100%" height={200}>
// //               <AreaChart data={monthlyViews.slice(-6)}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="month" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Area 
// //                   type="monotone" 
// //                   dataKey="sessions" 
// //                   stackId="1"
// //                   stroke="#F59E0B" 
// //                   fill="#F59E0B" 
// //                   fillOpacity={0.3}
// //                   name="جلسات مشاوره"
// //                 />
// //                 <Area 
// //                   type="monotone" 
// //                   dataKey="views" 
// //                   stackId="1"
// //                   stroke="#4F46E5" 
// //                   fill="#4F46E5" 
// //                   fillOpacity={0.3}
// //                   name="بازدیدها"
// //                 />
// //               </AreaChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>
// //       </div>

// //       {/* آمار پیشرفته */}
// //       <div className="advanced-stats">
// //         <div className="stat-box">
// //           <div className="stat-header">
// //             <FaCalendarAlt />
// //             <span>میانگین جلسات ماهانه</span>
// //           </div>
// //           <div className="stat-value">34.5</div>
// //           <div className="stat-change positive">+15% نسبت به ماه قبل</div>
// //         </div>
// //         <div className="stat-box">
// //           <div className="stat-header">
// //             <FaClock />
// //             <span>زمان پاسخگویی میانگین</span>
// //           </div>
// //           <div className="stat-value">2.4 ساعت</div>
// //           <div className="stat-change positive">-0.8 ساعت</div>
// //         </div>
// //         <div className="stat-box">
// //           <div className="stat-header">
// //             <FaUserFriends />
// //             <span>مشتریان وفادار</span>
// //           </div>
// //           <div className="stat-value">187</div>
// //           <div className="stat-change positive">+28 نفر</div>
// //         </div>
// //         <div className="stat-box">
// //           <div className="stat-header">
// //             <FaChartLine />
// //             <span>نرخ تبدیل بازدید به جلسه</span>
// //           </div>
// //           <div className="stat-value">8.4%</div>
// //           <div className="stat-change positive">+2.1%</div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ConsultantProfile;

// import React, { useState, useEffect } from 'react';
// import { 
//   FaUserCheck, 
//   FaWallet, 
//   FaChartLine, 
//   FaEye, 
//   FaUserFriends, 
//   FaThumbsUp,
//   FaCheckCircle,
//   FaPhoneAlt,
//   FaUserTie,
//   FaCalendarAlt,
//   FaClock,
//   FaChartBar,
//   FaChartPie,
//   FaArrowUp  // جایگزین FaTrendingUp
// } from 'react-icons/fa';
// import {
//   LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
//   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// } from 'recharts';
// import './ConsultantProfile.css';

// const ConsultantProfile = () => {
//   const [consultant, setConsultant] = useState({
//     name: 'دکتر مهدی کریمی',
//     phone: '09123456789',
//     isPhoneVerified: true,
//     walletBalance: 2845000,
//     specialty: 'مشاور کسب و کار و استارتاپ',
//     experience: 8,
//     rating: 4.9,
//     totalSessions: 347
//   });

//   // داده‌های نمودار بازدید ماهانه
//   const [monthlyViews, setMonthlyViews] = useState([
//     { month: 'فروردین', views: 245, sessions: 18 },
//     { month: 'اردیبهشت', views: 312, sessions: 24 },
//     { month: 'خرداد', views: 298, sessions: 22 },
//     { month: 'تیر', views: 356, sessions: 28 },
//     { month: 'مرداد', views: 423, sessions: 35 },
//     { month: 'شهریور', views: 389, sessions: 31 },
//     { month: 'مهر', views: 445, sessions: 38 },
//     { month: 'آبان', views: 498, sessions: 42 },
//     { month: 'آذر', views: 467, sessions: 39 },
//     { month: 'دی', views: 512, sessions: 45 },
//     { month: 'بهمن', views: 534, sessions: 48 },
//     { month: 'اسفند', views: 489, sessions: 44 }
//   ]);

//   // داده‌های نمودار دایره‌ای دسته‌بندی بازدیدها
//   const [categoryData, setCategoryData] = useState([
//     { name: 'مشاوره فردی', value: 45, color: '#4F46E5' },
//     { name: 'مشاوره تیمی', value: 28, color: '#10B981' },
//     { name: 'کارگاه‌ها', value: 18, color: '#F59E0B' },
//     { name: 'دوره‌ها', value: 9, color: '#EF4444' }
//   ]);

//   // داده‌های هفتگی
//   const [weeklyData, setWeeklyData] = useState([
//     { day: 'شنبه', views: 68, engagement: 45 },
//     { day: 'یکشنبه', views: 72, engagement: 52 },
//     { day: 'دوشنبه', views: 85, engagement: 63 },
//     { day: 'سه‌شنبه', views: 79, engagement: 58 },
//     { day: 'چهارشنبه', views: 92, engagement: 71 },
//     { day: 'پنجشنبه', views: 64, engagement: 48 },
//     { day: 'جمعه', views: 45, engagement: 38 }
//   ]);

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
//   };

//   const StatCard = ({ icon, title, value, trend, color }) => (
//     <div className="stat-card">
//       <div className="stat-icon" style={{ backgroundColor: color }}>
//         {icon}
//       </div>
//       <div className="stat-info">
//         <h4>{title}</h4>
//         <p>{value}</p>
//         {trend && <span className="stat-trend positive">{trend}</span>}
//       </div>
//     </div>
//   );

//   return (
//     <div className="consultant-profile-container">
//       {/* هدر پروفایل */}
//       <div className="profile-header-modern">
//         <div className="header-overlay"></div>
//         <div className="profile-info-wrapper">
//           <div className="profile-avatar">
//             <div className="avatar-circle">
//               <FaUserTie size={48} />
//             </div>
//             <div className="online-status"></div>
//           </div>
//           <div className="profile-details">
//             <div className="name-section">
//               <h1>{consultant.name}</h1>
//               <span className="specialty-badge">{consultant.specialty}</span>
//             </div>
//             <div className="contact-section">
//               <div className="contact-item">
//                 <FaPhoneAlt />
//                 <span>{consultant.phone}</span>
//                 {consultant.isPhoneVerified && (
//                   <span className="verified-badge">
//                     <FaCheckCircle />
//                     تایید شده
//                   </span>
//                 )}
//               </div>
//             </div>
//             <div className="stats-ribbon">
//               <div className="ribbon-item">
//                 <span className="ribbon-value">{consultant.experience}+</span>
//                 <span className="ribbon-label">سال تجربه</span>
//               </div>
//               <div className="ribbon-divider"></div>
//               <div className="ribbon-item">
//                 <span className="ribbon-value">{consultant.rating}</span>
//                 <span className="ribbon-label">امتیاز</span>
//               </div>
//               <div className="ribbon-divider"></div>
//               <div className="ribbon-item">
//                 <span className="ribbon-value">{consultant.totalSessions}</span>
//                 <span className="ribbon-label">جلسه مشاوره</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* کیف پول و آمار سریع */}
//       <div className="wallet-section">
//         <div className="wallet-card">
//           <div className="wallet-icon">
//             <FaWallet />
//           </div>
//           <div className="wallet-info">
//             <p className="wallet-label">موجودی کیف پول</p>
//             <h2 className="wallet-amount">{formatCurrency(consultant.walletBalance)}</h2>
//             <button className="charge-button">افزایش موجودی</button>
//           </div>
//         </div>
//         <div className="quick-stats">
//           <StatCard 
//             icon={<FaEye />}
//             title="بازدید کل پروفایل"
//             value="5,234"
//             trend="+23%"
//             color="#4F46E5"
//           />
//           <StatCard 
//             icon={<FaUserFriends />}
//             title="مشاوره‌های انجام شده"
//             value={consultant.totalSessions}
//             trend="+12%"
//             color="#10B981"
//           />
//           <StatCard 
//             icon={<FaThumbsUp />}
//             title="رضایت مشتریان"
//             value="98%"
//             trend="+5%"
//             color="#F59E0B"
//           />
//         </div>
//       </div>

//       {/* نمودارهای بازدید */}
//       <div className="charts-section">
//         <div className="section-header">
//           <h2>
//             <FaChartLine />
//             آمار بازدید و عملکرد
//           </h2>
//           <div className="date-filter">
//             <button className="filter-btn active">سال جاری</button>
//             <button className="filter-btn">۶ ماه اخیر</button>
//             <button className="filter-btn">۳ ماه اخیر</button>
//           </div>
//         </div>

//         <div className="charts-grid">
//           {/* نمودار خطی ماهانه */}
//           <div className="chart-card large">
//             <div className="chart-title">
//               <FaArrowUp />  {/* جایگزین FaTrendingUp */}
//               <h3>روند بازدید ماهانه</h3>
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={monthlyViews}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//                 <XAxis dataKey="month" />
//                 <YAxis yAxisId="left" />
//                 <YAxis yAxisId="right" orientation="right" />
//                 <Tooltip />
//                 <Legend />
//                 <Line 
//                   yAxisId="left"
//                   type="monotone" 
//                   dataKey="views" 
//                   stroke="#4F46E5" 
//                   strokeWidth={3}
//                   name="تعداد بازدید"
//                   dot={{ fill: '#4F46E5', r: 4 }}
//                 />
//                 <Line 
//                   yAxisId="right"
//                   type="monotone" 
//                   dataKey="sessions" 
//                   stroke="#10B981" 
//                   strokeWidth={3}
//                   name="تعداد جلسات"
//                   dot={{ fill: '#10B981', r: 4 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* نمودار دایره‌ای */}
//           <div className="chart-card">
//             <div className="chart-title">
//               <FaChartPie />
//               <h3>دسته‌بندی خدمات</h3>
//             </div>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={categoryData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={90}
//                   paddingAngle={5}
//                   dataKey="value"
//                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                 >
//                   {categoryData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* نمودار ستونی هفتگی */}
//           <div className="chart-card">
//             <div className="chart-title">
//               <FaChartBar />
//               <h3>بازدید هفتگی</h3>
//             </div>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={weeklyData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="day" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="views" fill="#4F46E5" name="بازدید" radius={[8, 8, 0, 0]} />
//                 <Bar dataKey="engagement" fill="#10B981" name="تعامل" radius={[8, 8, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* نمودار面积的 تعامل */}
//           <div className="chart-card large">
//             <div className="chart-title">
//               <FaChartLine />
//               <h3>نرخ تعامل مشتریان</h3>
//             </div>
//             <ResponsiveContainer width="100%" height={200}>
//               <AreaChart data={monthlyViews.slice(-6)}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Area 
//                   type="monotone" 
//                   dataKey="sessions" 
//                   stackId="1"
//                   stroke="#F59E0B" 
//                   fill="#F59E0B" 
//                   fillOpacity={0.3}
//                   name="جلسات مشاوره"
//                 />
//                 <Area 
//                   type="monotone" 
//                   dataKey="views" 
//                   stackId="1"
//                   stroke="#4F46E5" 
//                   fill="#4F46E5" 
//                   fillOpacity={0.3}
//                   name="بازدیدها"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* آمار پیشرفته */}
//       <div className="advanced-stats">
//         <div className="stat-box">
//           <div className="stat-header">
//             <FaCalendarAlt />
//             <span>میانگین جلسات ماهانه</span>
//           </div>
//           <div className="stat-value">34.5</div>
//           <div className="stat-change positive">+15% نسبت به ماه قبل</div>
//         </div>
//         <div className="stat-box">
//           <div className="stat-header">
//             <FaClock />
//             <span>زمان پاسخگویی میانگین</span>
//           </div>
//           <div className="stat-value">2.4 ساعت</div>
//           <div className="stat-change positive">-0.8 ساعت</div>
//         </div>
//         <div className="stat-box">
//           <div className="stat-header">
//             <FaUserFriends />
//             <span>مشتریان وفادار</span>
//           </div>
//           <div className="stat-value">187</div>
//           <div className="stat-change positive">+28 نفر</div>
//         </div>
//         <div className="stat-box">
//           <div className="stat-header">
//             <FaChartLine />
//             <span>نرخ تبدیل بازدید به جلسه</span>
//           </div>
//           <div className="stat-value">8.4%</div>
//           <div className="stat-change positive">+2.1%</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConsultantProfile;

import React, { useState, useEffect } from 'react';
import { 
  FaUserCheck, 
  FaWallet, 
  FaChartLine, 
  FaEye, 
  FaUserFriends, 
  FaThumbsUp,
  FaCheckCircle,
  FaPhoneAlt,
  FaUserTie,
  FaCalendarAlt,
  FaClock,
  FaChartBar,
  FaChartPie,
  FaArrowUp,
  FaSpinner
} from 'react-icons/fa';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useNavigate } from 'react-router-dom'; // اضافه کردن این خط
import { consultantService } from '../../../services/consultantService ';
import './ConsultantProfile.css';



const ConsultantProfile = () => {
   const navigate = useNavigate(); // اضافه کردن این خط
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [consultant, setConsultant] = useState({
    name: '',
    phone: '',
    isPhoneVerified: false,
    walletBalance: 0,
    specialty: '',
    experience: 0,
    rating: 0,
    totalSessions: 0
  });

  // داده‌های نمودار بازدید ماهانه
  const [monthlyViews, setMonthlyViews] = useState([
    { month: 'فروردین', views: 245, sessions: 18 },
    { month: 'اردیبهشت', views: 312, sessions: 24 },
    { month: 'خرداد', views: 298, sessions: 22 },
    { month: 'تیر', views: 356, sessions: 28 },
    { month: 'مرداد', views: 423, sessions: 35 },
    { month: 'شهریور', views: 389, sessions: 31 },
    { month: 'مهر', views: 445, sessions: 38 },
    { month: 'آبان', views: 498, sessions: 42 },
    { month: 'آذر', views: 467, sessions: 39 },
    { month: 'دی', views: 512, sessions: 45 },
    { month: 'بهمن', views: 534, sessions: 48 },
    { month: 'اسفند', views: 489, sessions: 44 }
  ]);

  // داده‌های نمودار دایره‌ای دسته‌بندی بازدیدها
  const [categoryData, setCategoryData] = useState([
    { name: 'مشاوره فردی', value: 45, color: '#4F46E5' },
    { name: 'مشاوره تیمی', value: 28, color: '#10B981' },
    { name: 'کارگاه‌ها', value: 18, color: '#F59E0B' },
    { name: 'دوره‌ها', value: 9, color: '#EF4444' }
  ]);

  // داده‌های هفتگی
  const [weeklyData, setWeeklyData] = useState([
    { day: 'شنبه', views: 68, engagement: 45 },
    { day: 'یکشنبه', views: 72, engagement: 52 },
    { day: 'دوشنبه', views: 85, engagement: 63 },
    { day: 'سه‌شنبه', views: 79, engagement: 58 },
    { day: 'چهارشنبه', views: 92, engagement: 71 },
    { day: 'پنجشنبه', views: 64, engagement: 48 },
    { day: 'جمعه', views: 45, engagement: 38 }
  ]);

  // دریافت اطلاعات از API
  useEffect(() => {
    const fetchConsultantData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await consultantService.getConsultantDashboard();
        
        // نگاشت داده‌های دریافتی از API به state
        setConsultant({
          name: data.fullName || 'مشاور',
          phone: data.mobile || '',
          isPhoneVerified: data.isPhoneVerified || false,
          walletBalance: data.walletBalance || 0,
          specialty: data.specialty || 'مشاور',
          experience: parseInt(data.experience) || 0,
          rating: parseFloat(data.rating) || 0,
          totalSessions: parseInt(data.totalSessions) || 0
        });
        
      } catch (err) {
        console.error('Error fetching consultant data:', err);
        setError(err.message || 'خطا در بارگذاری اطلاعات');
      } finally {
        setLoading(false);
      }
    };
    
    fetchConsultantData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
  };

  const StatCard = ({ icon, title, value, trend, color }) => (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="stat-info">
        <h4>{title}</h4>
        <p>{value}</p>
        {trend && <span className="stat-trend positive">{trend}</span>}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner" />
        <p>در حال بارگذاری اطلاعات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>خطا در بارگذاری</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <div className="consultant-profile-container">
      {/* هدر پروفایل */}
      <div className="profile-header-modern">
        <div className="header-overlay"></div>
        <div className="profile-info-wrapper">
          <div className="profile-avatar">
            <div className="avatar-circle">
              <FaUserTie size={48} />
            </div>
            <div className="online-status"></div>
          </div>
          <div className="profile-details">
            <div className="name-section">
              <h1>{consultant.name}</h1>
              <span className="specialty-badge">{consultant.specialty}</span>
            </div>
            <div className="contact-section">
              <div className="contact-item">
                <FaPhoneAlt />
                <span>{consultant.phone}</span>
                {consultant.isPhoneVerified && (
                  <span className="verified-badge">
                    <FaCheckCircle />
                    تایید شده
                  </span>
                )}
              </div>
            </div>
            <div className="stats-ribbon">
              <div className="ribbon-item">
                <span className="ribbon-value">{consultant.experience}+</span>
                <span className="ribbon-label">سال تجربه</span>
              </div>
              <div className="ribbon-divider"></div>
              <div className="ribbon-item">
                <span className="ribbon-value">{consultant.rating}</span>
                <span className="ribbon-label">امتیاز</span>
              </div>
              <div className="ribbon-divider"></div>
              <div className="ribbon-item">
                <span className="ribbon-value">{consultant.totalSessions}</span>
                <span className="ribbon-label">جلسه مشاوره</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* کیف پول و آمار سریع */}
      <div className="wallet-section">
        <div className="wallet-card">
          <div className="wallet-icon">
            <FaWallet />
          </div>
          <div className="wallet-info">
            <p className="wallet-label">موجودی کیف پول</p>
            <h2 className="wallet-amount">{formatCurrency(consultant.walletBalance)}</h2>
                   <button 
          className="charge-button"
          onClick={() => navigate('/charge-wallet')}
        >
          افزایش موجودی
        </button>
          </div>
        </div>
        <div className="quick-stats">
          <StatCard 
            icon={<FaEye />}
            title="بازدید کل پروفایل"
            value="5,234"
            trend="+23%"
            color="#4F46E5"
          />
          <StatCard 
            icon={<FaUserFriends />}
            title="مشاوره‌های انجام شده"
            value={consultant.totalSessions}
            trend="+12%"
            color="#10B981"
          />
          <StatCard 
            icon={<FaThumbsUp />}
            title="رضایت مشتریان"
            value="98%"
            trend="+5%"
            color="#F59E0B"
          />
        </div>
      </div>

      {/* بقیه بخش‌های کامپوننت به همان صورت باقی می‌مانند */}
      {/* نمودارهای بازدید */}
      <div className="charts-section">
        <div className="section-header">
          <h2>
            <FaChartLine />
            آمار بازدید و عملکرد
          </h2>
          <div className="date-filter">
            <button className="filter-btn active">سال جاری</button>
            <button className="filter-btn">۶ ماه اخیر</button>
            <button className="filter-btn">۳ ماه اخیر</button>
          </div>
        </div>

        <div className="charts-grid">
          {/* نمودار خطی ماهانه */}
          <div className="chart-card large">
            <div className="chart-title">
              <FaArrowUp />
              <h3>روند بازدید ماهانه</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyViews}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="views" 
                  stroke="#4F46E5" 
                  strokeWidth={3}
                  name="تعداد بازدید"
                  dot={{ fill: '#4F46E5', r: 4 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="تعداد جلسات"
                  dot={{ fill: '#10B981', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* نمودار دایره‌ای */}
          <div className="chart-card">
            <div className="chart-title">
              <FaChartPie />
              <h3>دسته‌بندی خدمات</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* نمودار ستونی هفتگی */}
          <div className="chart-card">
            <div className="chart-title">
              <FaChartBar />
              <h3>بازدید هفتگی</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#4F46E5" name="بازدید" radius={[8, 8, 0, 0]} />
                <Bar dataKey="engagement" fill="#10B981" name="تعامل" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* نمودار面积的 تعامل */}
          <div className="chart-card large">
            <div className="chart-title">
              <FaChartLine />
              <h3>نرخ تعامل مشتریان</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyViews.slice(-6)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="sessions" 
                  stackId="1"
                  stroke="#F59E0B" 
                  fill="#F59E0B" 
                  fillOpacity={0.3}
                  name="جلسات مشاوره"
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stackId="1"
                  stroke="#4F46E5" 
                  fill="#4F46E5" 
                  fillOpacity={0.3}
                  name="بازدیدها"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* آمار پیشرفته */}
      <div className="advanced-stats">
        <div className="stat-box">
          <div className="stat-header">
            <FaCalendarAlt />
            <span>میانگین جلسات ماهانه</span>
          </div>
          <div className="stat-value">34.5</div>
          <div className="stat-change positive">+15% نسبت به ماه قبل</div>
        </div>
        <div className="stat-box">
          <div className="stat-header">
            <FaClock />
            <span>زمان پاسخگویی میانگین</span>
          </div>
          <div className="stat-value">2.4 ساعت</div>
          <div className="stat-change positive">-0.8 ساعت</div>
        </div>
        <div className="stat-box">
          <div className="stat-header">
            <FaUserFriends />
            <span>مشتریان وفادار</span>
          </div>
          <div className="stat-value">187</div>
          <div className="stat-change positive">+28 نفر</div>
        </div>
        <div className="stat-box">
          <div className="stat-header">
            <FaChartLine />
            <span>نرخ تبدیل بازدید به جلسه</span>
          </div>
          <div className="stat-value">8.4%</div>
          <div className="stat-change positive">+2.1%</div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantProfile;