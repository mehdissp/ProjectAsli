// import React, { useState, useMemo, useRef, useEffect } from 'react';
// import './PersianGanttChart.css';

// const PersianGanttChart = ({ 
//   projects = [],
//   onTaskClick,
//   height = 500 
// }) => {
//   const [timeRange, setTimeRange] = useState('month');
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const timelineRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(false);

//   // داده‌های نمونه با تاریخ‌های داینامیک و مهلت‌های نزدیک
//   const sampleProjects = useMemo(() => {
//     const today = new Date();
    
//     return [
//       {
//         id: 1,
//         name: 'توسعه وب اپلیکیشن',
//         startDate: new Date(today.getFullYear(), today.getMonth(), 1),
//         endDate: new Date(today.getFullYear(), today.getMonth() + 2, 15),
//         progress: 75,
//         color: '#667eea',
//         tasks: [
//           { 
//             id: 1, 
//             name: 'تحلیل', 
//             start: new Date(today.getFullYear(), today.getMonth(), 1),
//             end: new Date(today.getFullYear(), today.getMonth(), 10),
//             progress: 70, 
//             row: 0 
//           },
//           { 
//             id: 2, 
//             name: 'طراحی', 
//             start: new Date(today.getFullYear(), today.getMonth(), 8),
//             end: new Date(today.getFullYear(), today.getMonth(), 25),
//             progress: 100, 
//             row: 1 
//           },
//           { 
//             id: 3, 
//             name: 'Frontend', 
//             start: new Date(today.getFullYear(), today.getMonth(), 20),
//             end: new Date(today.getFullYear(), today.getMonth() + 1, 20),
//             progress: 80, 
//             row: 0 
//           },
//           { 
//             id: 4, 
//             name: 'Backend', 
//             start: new Date(today.getFullYear(), today.getMonth() + 1, 10),
//             end: new Date(today.getFullYear(), today.getMonth() + 1, 15),
//             progress: 60, 
//             row: 1 
//           },
//           { 
//             id: 5, 
//             name: 'تست', 
//             start: new Date(today.getFullYear(), today.getMonth() + 1, 25),
//             end: new Date(today.getFullYear(), today.getMonth() + 2, 15),
//             progress: 20, 
//             row: 2 
//           }
//         ]
//       },
//       {
//         id: 2,
//         name: 'اپلیکیشن موبایل',
//         startDate: new Date(today.getFullYear(), today.getMonth() + 1, 1),
//         endDate: new Date(today.getFullYear(), today.getMonth() + 3, 30),
//         progress: 40,
//         color: '#f093fb',
//         tasks: [
//           { 
//             id: 6, 
//             name: 'بررسی', 
//             start: new Date(today.getFullYear(), today.getMonth() + 1, 1),
//             end: new Date(today.getFullYear(), today.getMonth() + 1, 15),
//             progress: 100, 
//             row: 0 
//           },
//           { 
//             id: 7, 
//             name: 'UI/UX', 
//             start: new Date(today.getFullYear(), today.getMonth() + 1, 20),
//             end: new Date(today.getFullYear(), today.getMonth() + 1, 28),
//             progress: 70, 
//             row: 1 
//           },
//           { 
//             id: 8, 
//             name: 'توسعه', 
//             start: new Date(today.getFullYear(), today.getMonth() + 2, 10),
//             end: new Date(today.getFullYear(), today.getMonth() + 3, 20),
//             progress: 30, 
//             row: 0 
//           },
//           { 
//             id: 9, 
//             name: 'تست', 
//             start: new Date(today.getFullYear(), today.getMonth() + 3, 15),
//             end: new Date(today.getFullYear(), today.getMonth() + 3, 30),
//             progress: 0, 
//             row: 1 
//           }
//         ]
//       },
//       {
//         id: 3,
//         name: 'سیستم مدیریت محتوا',
//         startDate: new Date(today.getFullYear(), today.getMonth() - 1, 15),
//         endDate: new Date(today.getFullYear(), today.getMonth() + 1, 30),
//         progress: 90,
//         color: '#4fd1c5',
//         tasks: [
//           { 
//             id: 10, 
//             name: 'بررسی نیازها', 
//             start: new Date(today.getFullYear(), today.getMonth() - 1, 15),
//             end: new Date(today.getFullYear(), today.getMonth() - 1, 30),
//             progress: 100, 
//             row: 0 
//           },
//           { 
//             id: 11, 
//             name: 'توسعه هسته', 
//             start: new Date(today.getFullYear(), today.getMonth(), 1),
//             end: new Date(today.getFullYear(), today.getMonth(), 20),
//             progress: 100, 
//             row: 1 
//           },
//           { 
//             id: 12, 
//             name: 'ماژول‌ها', 
//             start: new Date(today.getFullYear(), today.getMonth(), 15),
//             end: new Date(today.getFullYear(), today.getMonth() + 1, 10),
//             progress: 85, 
//             row: 0 
//           },
//           { 
//             id: 13, 
//             name: 'راه‌اندازی', 
//             start: new Date(today.getFullYear(), today.getMonth() + 1, 15),
//             end: new Date(today.getFullYear(), today.getMonth() + 1, 30),
//             progress: 10, 
//             row: 1 
//           }
//         ]
//       }
//     ];
//   }, []);

//   const dataToUse = projects.length > 0 ? projects : sampleProjects;

//   // تولید تاریخ‌ها برای محور زمان - داینامیک بر اساس currentDate
//   const generateTimeScale = () => {
//     const dates = [];
//     const today = currentDate;
//     let startDate, endDate;
    
//     switch(timeRange) {
//       case 'month':
//         startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
//         endDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
//         break;
//       case 'quarter':
//         const currentQuarter = Math.floor(today.getMonth() / 3);
//         startDate = new Date(today.getFullYear(), (currentQuarter - 1) * 3, 1);
//         endDate = new Date(today.getFullYear(), (currentQuarter + 2) * 3 + 1, 0);
//         break;
//       case 'year':
//         startDate = new Date(today.getFullYear() - 1, 0, 1);
//         endDate = new Date(today.getFullYear() + 1, 11, 31);
//         break;
//       default:
//         startDate = new Date(today);
//         startDate.setMonth(today.getMonth() - 1);
//         endDate = new Date(today);
//         endDate.setMonth(today.getMonth() + 2);
//         endDate.setDate(0);
//     }

//     const current = new Date(startDate);
    
//     let step;
//     switch(timeRange) {
//       case 'month':
//         step = 1;
//         break;
//       case 'quarter':
//         step = 7;
//         break;
//       case 'year':
//         step = 30;
//         break;
//       default:
//         step = 7;
//     }

//     while (current <= endDate) {
//       dates.push(new Date(current));
      
//       if (timeRange === 'month') {
//         current.setDate(current.getDate() + step);
//       } else if (timeRange === 'quarter') {
//         current.setDate(current.getDate() + step);
//       } else {
//         current.setMonth(current.getMonth() + 1);
//       }
//     }
    
//     return dates;
//   };

//   const timeScale = generateTimeScale();

//   // هندل اسکرول timeline
//   const handleTimelineScroll = (e) => {
//     if (!isDragging) return;
    
//     const timeline = e.target;
//     const scrollPercentage = timeline.scrollLeft / (timeline.scrollWidth - timeline.clientWidth);
    
//     const totalDays = timeScale.length;
//     const currentIndex = Math.floor(scrollPercentage * (totalDays - 1));
    
//     if (timeScale[currentIndex]) {
//       setCurrentDate(timeScale[currentIndex]);
//     }
//   };

//   // تنظیم اسکرول بر اساس تاریخ فعلی
//   useEffect(() => {
//     if (timelineRef.current) {
//       const timeline = timelineRef.current;
//       const currentIndex = timeScale.findIndex(date => 
//         date.toDateString() === currentDate.toDateString()
//       );
      
//       if (currentIndex !== -1) {
//         const scrollPercentage = currentIndex / (timeScale.length - 1);
//         const scrollPosition = scrollPercentage * (timeline.scrollWidth - timeline.clientWidth);
//         timeline.scrollLeft = scrollPosition;
//       }
//     }
//   }, [timeRange, currentDate, timeScale]);

//   // کنترل‌های درگ کردن
//   const handleMouseDown = () => {
//     setIsDragging(true);
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     const handleGlobalMouseUp = () => {
//       setIsDragging(false);
//     };

//     document.addEventListener('mouseup', handleGlobalMouseUp);
//     return () => {
//       document.removeEventListener('mouseup', handleGlobalMouseUp);
//     };
//   }, []);

//   // محاسبه موقعیت و عرض تسک‌ها - اصلاح شده برای RTL
//   const calculateTaskPosition = (task) => {
//     const start = new Date(task.start);
//     const end = new Date(task.end);
    
//     if (end < timeScale[0] || start > timeScale[timeScale.length - 1]) {
//       return { left: 0, width: 0 };
//     }
    
//     const totalDuration = timeScale[timeScale.length - 1] - timeScale[0];
//     const taskStart = Math.max(start, timeScale[0]);
//     const taskEnd = Math.min(end, timeScale[timeScale.length - 1]);
    
//     // محاسبه موقعیت از راست به چپ
//     const taskEndPos = ((timeScale[timeScale.length - 1] - taskEnd) / totalDuration) * 100;
//     const taskWidth = ((taskEnd - taskStart) / totalDuration) * 100;
    
//     return {
//       left: Math.max(0, taskEndPos),
//       width: Math.max(2, Math.min(100, taskWidth))
//     };
//   };

//   // بررسی وضعیت مهلت تسک
//   const getTaskStatus = (task) => {
//     const today = new Date();
//     const endDate = new Date(task.end);
//     const timeDiff = endDate - today;
//     const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
//     if (task.progress === 100) {
//       return 'completed';
//     } else if (daysDiff < 0) {
//       return 'overdue';
//     } else if (daysDiff <= 3) {
//       return 'urgent';
//     } else if (daysDiff <= 7) {
//       return 'warning';
//     } else {
//       return 'normal';
//     }
//   };

//   // گرفتن رنگ بر اساس وضعیت
//   const getTaskColor = (project, task) => {
//     const status = getTaskStatus(task);
    
//     switch(status) {
//       case 'completed':
//         return '#10b981';
//       case 'overdue':
//         return '#ef4444';
//       case 'urgent':
//         return '#f59e0b';
//       case 'warning':
//         return '#f97316';
//       default:
//         return project.color;
//     }
//   };

//   // گرفتن آیکون وضعیت
//   const getStatusIcon = (task) => {
//     const status = getTaskStatus(task);
    
//     switch(status) {
//       case 'completed':
//         return '✅';
//       case 'overdue':
//         return '⏰';
//       case 'urgent':
//         return '🔥';
//       case 'warning':
//         return '⚠️';
//       default:
//         return '';
//     }
//   };

//   // گرفتن متن وضعیت
//   const getStatusText = (task) => {
//     const status = getTaskStatus(task);
//     const endDate = new Date(task.end);
//     const today = new Date();
//     const daysDiff = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
    
//     switch(status) {
//       case 'completed':
//         return 'تکمیل شده';
//       case 'overdue':
//         return `${Math.abs(daysDiff)} روز تأخیر`;
//       case 'urgent':
//         return `${daysDiff} روز باقی مانده`;
//       case 'warning':
//         return `${daysDiff} روز باقی مانده`;
//       default:
//         return `${daysDiff} روز باقی مانده`;
//     }
//   };

//   // فرمت تاریخ فارسی
//   const formatPersianDate = (date) => {
//     const options = {
//       month: 'short',
//       day: 'numeric'
//     };
    
//     if (timeRange === 'year') {
//       options.month = 'long';
//       delete options.day;
//     }
    
//     return new Intl.DateTimeFormat('fa-IR', options).format(date);
//   };

//   // فرمت کامل تاریخ برای اطلاعات تسک
//   const formatFullPersianDate = (date) => {
//     return new Intl.DateTimeFormat('fa-IR', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     }).format(date);
//   };

//   const handleTaskClick = (project, task) => {
//     setSelectedProject({ project, task });
//     if (onTaskClick) {
//       onTaskClick(project, task);
//     }
//   };

//   // محاسبه ارتفاع هر سطر
//   const getTaskRowHeight = (project) => {
//     const maxRow = Math.max(...project.tasks.map(task => task.row || 0));
//     return Math.max(60, (maxRow + 1) * 25 + 20);
//   };

//   // گرفتن عنوان بازه زمانی
//   const getTimeRangeTitle = () => {
//     const today = new Date();
//     switch(timeRange) {
//       case 'month':
//         return `ماه ${new Intl.DateTimeFormat('fa-IR', { month: 'long' }).format(today)}`;
//       case 'quarter':
//         const quarter = Math.floor(today.getMonth() / 3) + 1;
//         return `فصل ${quarter}`;
//       case 'year':
//         return `سال ${today.getFullYear()}`;
//       default:
//         return 'بازه زمانی';
//     }
//   };

//   // کنترل‌های ناوبری تاریخ
//   const navigateDate = (direction) => {
//     const newDate = new Date(currentDate);
    
//     switch(timeRange) {
//       case 'month':
//         newDate.setMonth(newDate.getMonth() + direction);
//         break;
//       case 'quarter':
//         newDate.setMonth(newDate.getMonth() + (direction * 3));
//         break;
//       case 'year':
//         newDate.setFullYear(newDate.getFullYear() + direction);
//         break;
//       default:
//         newDate.setDate(newDate.getDate() + (direction * 7));
//     }
    
//     setCurrentDate(newDate);
//   };

//   // شمارش تسک‌های دارای هشدار
//   const getAlertCount = () => {
//     let count = 0;
//     dataToUse.forEach(project => {
//       project.tasks.forEach(task => {
//         const status = getTaskStatus(task);
//         if (status === 'urgent' || status === 'overdue') {
//           count++;
//         }
//       });
//     });
//     return count;
//   };

//   const alertCount = getAlertCount();

//   return (
//     <div className="persian-gantt-container">
//       <div className="gantt-header">
//         <div className="gantt-title">
//           <h2>
//             📊 گانت چارت پروژه‌ها
//             {alertCount > 0 && (
//               <span className="alert-badge">{alertCount} هشدار</span>
//             )}
//           </h2>
//           <div className="current-range">
//             {getTimeRangeTitle()}
//           </div>
//         </div>
        
//         <div className="gantt-controls">
//           {/* کنترل‌های ناوبری تاریخ */}
//           <div className="date-navigation">
//             <button 
//               className="nav-btn"
//               onClick={() => navigateDate(-1)}
//             >
//               ← قبلی
//             </button>
//             <button 
//               className="nav-btn today-btn"
//               onClick={() => setCurrentDate(new Date())}
//             >
//               امروز
//             </button>
//             <button 
//               className="nav-btn"
//               onClick={() => navigateDate(1)}
//             >
//               بعدی →
//             </button>
//           </div>

//           <div className="time-range-selector">
//             <button 
//               className={`range-btn ${timeRange === 'month' ? 'active' : ''}`}
//               onClick={() => setTimeRange('month')}
//             >
//               ماهانه
//             </button>
//             <button 
//               className={`range-btn ${timeRange === 'quarter' ? 'active' : ''}`}
//               onClick={() => setTimeRange('quarter')}
//             >
//               فصلی
//             </button>
//             <button 
//               className={`range-btn ${timeRange === 'year' ? 'active' : ''}`}
//               onClick={() => setTimeRange('year')}
//             >
//               سالانه
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Timeline Interactive */}
//       <div 
//         className="time-scale interactive-timeline"
//         ref={timelineRef}
//         onScroll={handleTimelineScroll}
//         onMouseDown={handleMouseDown}
//         onMouseUp={handleMouseUp}
//       >
//         {timeScale.map((date, index) => (
//           <div 
//             key={index} 
//             className={`time-unit ${date.toDateString() === currentDate.toDateString() ? 'current' : ''}`}
//           >
//             <div className="date-label">{formatPersianDate(date)}</div>
//             <div className="time-line"></div>
//           </div>
//         ))}
//       </div>

//       {/* محتویات گانت چارت */}
//       <div className="gantt-content" style={{ height: `${height}px` }}>
//         {dataToUse.map((project) => (
//           <div 
//             key={project.id} 
//             className="project-row"
//             style={{ height: `${getTaskRowHeight(project)}px` }}
//           >
//             <div className="project-info">
//               <div 
//                 className="project-color" 
//                 style={{ backgroundColor: project.color }}
//               ></div>
//               <div className="project-name">
//                 <div className="project-title">{project.name}</div>
//                 <div className="project-progress">
//                   <div className="progress-bar">
//                     <div 
//                       className="progress-fill" 
//                       style={{ 
//                         width: `${project.progress}%`,
//                         backgroundColor: project.color 
//                       }}
//                     ></div>
//                   </div>
//                   <span className="progress-text">{project.progress}%</span>
//                 </div>
//               </div>
//             </div>

//             <div className="tasks-container">
//               {project.tasks.map((task) => {
//                 const position = calculateTaskPosition(task);
//                 const top = (task.row || 0) * 25 + 10;
//                 const taskColor = getTaskColor(project, task);
//                 const statusIcon = getStatusIcon(task);
//                 const status = getTaskStatus(task);
                
//                 if (position.width === 0) return null;
                
//                 return (
//                   <div
//                     key={task.id}
//                     className={`gantt-task ${selectedProject?.task?.id === task.id ? 'selected' : ''} ${status}`}
//                     style={{
//                       right: `${position.left}%`,
//                       width: `${position.width}%`,
//                       top: `${top}px`,
//                       backgroundColor: taskColor,
//                       height: '20px'
//                     }}
//                     onClick={() => handleTaskClick(project, task)}
//                     title={`${task.name} - پیشرفت: ${task.progress}% - ${getStatusText(task)}`}
//                   >
//                     <div className="task-progress">
//                       <div 
//                         className="task-progress-fill"
//                         style={{ width: `${task.progress}%` }}
//                       ></div>
//                     </div>
//                     <div className="task-content">
//                       <span className="task-name">
//                         {statusIcon && <span className="status-icon">{statusIcon}</span>}
//                         {task.name}
//                       </span>
//                       {position.width > 20 && (
//                         <span className="task-dates">
//                           {formatPersianDate(new Date(task.start))}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedProject && (
//         <div className="selected-info">
//           <h4>📝 اطلاعات تسک انتخاب شده:</h4>
//           <div className="info-grid">
//             <div className="info-item">
//               <strong>پروژه:</strong> {selectedProject.project.name}
//             </div>
//             <div className="info-item">
//               <strong>تسک:</strong> {selectedProject.task.name}
//             </div>
//             <div className="info-item">
//               <strong>پیشرفت:</strong> 
//               <span className="progress-badge">{selectedProject.task.progress}%</span>
//             </div>
//             <div className="info-item">
//               <strong>وضعیت:</strong> 
//               <span className={`status-badge ${getTaskStatus(selectedProject.task)}`}>
//                 {getStatusIcon(selectedProject.task)} {getStatusText(selectedProject.task)}
//               </span>
//             </div>
//             <div className="info-item">
//               <strong>شروع:</strong> {formatFullPersianDate(new Date(selectedProject.task.start))}
//             </div>
//             <div className="info-item">
//               <strong>پایان:</strong> {formatFullPersianDate(new Date(selectedProject.task.end))}
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="gantt-legend">
//         <div className="legend-title">🎯 راهنما:</div>
//         <div className="legend-items">
//           <div className="legend-item">
//             <div className="legend-color normal"></div>
//             <span>عادی</span>
//           </div>
//           <div className="legend-item">
//             <div className="legend-color completed"></div>
//             <span>تکمیل شده</span>
//           </div>
//           <div className="legend-item">
//             <div className="legend-color warning"></div>
//             <span>هشدار (۷ روز)</span>
//           </div>
//           <div className="legend-item">
//             <div className="legend-color urgent"></div>
//             <span>فوری (۳ روز)</span>
//           </div>
//           <div className="legend-item">
//             <div className="legend-color overdue"></div>
//             <span>تأخیر خورده</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersianGanttChart;