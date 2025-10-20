// // components/todo/TodoBoard.jsx
// import React, { useState } from 'react';
// import { 
//   FiPlus, 
//   FiMoreVertical, 
//   FiEdit2, 
//   FiTrash2,
//   FiClock,
//   FiUser,
//   FiColumns,
//   FiX,
//   FiSave
// } from 'react-icons/fi';
// import ColumnManager from './ColumnManager';
// import './TodoBoard.css';

// const TodoBoard = () => {
//   const [columns, setColumns] = useState({
//     todo: {
//       id: 'todo',
//       title: 'در انتظار',
//       color: '#94a3b8',
//       tasks: [
//         {
//           id: '1',
//           title: 'طراحی رابط کاربری جدید',
//           description: 'طراحی رابط کاربری برای بخش مدیریت پروژه',
//           priority: 'high',
//           assignee: 'علی محمدی',
//           dueDate: '1402/10/20',
//           tags: ['design', 'ui']
//         }
//       ]
//     },
//     inProgress: {
//       id: 'inProgress',
//       title: 'در حال انجام',
//       color: '#f59e0b',
//       tasks: [
//         {
//           id: '2',
//           title: 'توسعه ماژول پرداخت',
//           description: 'پیاده سازی درگاه پرداخت جدید',
//           priority: 'high',
//           assignee: 'محمد حسینی',
//           dueDate: '1402/10/15',
//           tags: ['development', 'payment']
//         }
//       ]
//     },
//     done: {
//       id: 'done',
//       title: 'انجام شده',
//       color: '#10b981',
//       tasks: [
//         {
//           id: '3',
//           title: 'مستند سازی API',
//           description: 'تهیه مستندات کامل برای API های سیستم',
//           priority: 'low',
//           assignee: 'حسین نجفی',
//           dueDate: '1402/10/10',
//           tags: ['documentation']
//         }
//       ]
//     }
//   });

//   const [showColumnManager, setShowColumnManager] = useState(false);
//   const [showTaskModal, setShowTaskModal] = useState(false);
//   const [selectedColumn, setSelectedColumn] = useState(null);
//   const [newTask, setNewTask] = useState({
//     title: '',
//     description: '',
//     priority: 'medium',
//     assignee: '',
//     dueDate: '',
//     tags: []
//   });

//   // مدیریت ستون‌ها
//   const handleAddColumn = (newColumnData) => {
//     const columnId = `column-${Date.now()}`;
//     const newColumn = {
//       id: columnId,
//       title: newColumnData.title,
//       color: newColumnData.color,
//       tasks: []
//     };
    
//     setColumns(prev => ({
//       ...prev,
//       [columnId]: newColumn
//     }));
//   };

//   const handleEditColumn = (columnId, updatedColumnData) => {
//     setColumns(prev => ({
//       ...prev,
//       [columnId]: {
//         ...prev[columnId],
//         title: updatedColumnData.title,
//         color: updatedColumnData.color
//       }
//     }));
//   };

//   const handleDeleteColumn = (columnId) => {
//     if (Object.keys(columns).length <= 1) {
//       alert('حداقل یک ستون باید وجود داشته باشد');
//       return;
//     }

//     const tasksToMove = columns[columnId].tasks;
//     const otherColumnId = Object.keys(columns).find(id => id !== columnId);

//     if (tasksToMove.length > 0 && otherColumnId) {
//       setColumns(prev => ({
//         ...prev,
//         [otherColumnId]: {
//           ...prev[otherColumnId],
//           tasks: [...prev[otherColumnId].tasks, ...tasksToMove]
//         }
//       }));
//     }

//     setTimeout(() => {
//       setColumns(prev => {
//         const { [columnId]: deleted, ...remainingColumns } = prev;
//         return remainingColumns;
//       });
//     }, 100);
//   };

//   const handleReorderColumns = (newColumnOrder) => {
//     const reorderedColumns = {};
//     newColumnOrder.forEach(columnId => {
//       if (columns[columnId]) {
//         reorderedColumns[columnId] = columns[columnId];
//       }
//     });
//     setColumns(reorderedColumns);
//   };

//   // مدیریت تسک‌ها
//   const handleAddTaskClick = (columnId) => {
//     setSelectedColumn(columnId);
//     setNewTask({
//       title: '',
//       description: '',
//       priority: 'medium',
//       assignee: '',
//       dueDate: '',
//       tags: []
//     });
//     setShowTaskModal(true);
//   };

//   const handleCreateTask = (e) => {
//     e.preventDefault();
//     if (!newTask.title.trim()) {
//       alert('لطفا عنوان تسک را وارد کنید');
//       return;
//     }

//     const task = {
//       id: `task-${Date.now()}`,
//       title: newTask.title,
//       description: newTask.description,
//       priority: newTask.priority,
//       assignee: newTask.assignee || 'بدون اختصاص',
//       dueDate: newTask.dueDate || new Date().toLocaleDateString('fa-IR'),
//       tags: newTask.tags
//     };

//     setColumns(prev => ({
//       ...prev,
//       [selectedColumn]: {
//         ...prev[selectedColumn],
//         tasks: [...prev[selectedColumn].tasks, task]
//       }
//     }));

//     setShowTaskModal(false);
//     setNewTask({
//       title: '',
//       description: '',
//       priority: 'medium',
//       assignee: '',
//       dueDate: '',
//       tags: []
//     });
//   };

//   const handleDragStart = (e, taskId, columnId) => {
//     e.dataTransfer.setData('taskId', taskId);
//     e.dataTransfer.setData('fromColumn', columnId);
//   };

//   const handleDragOver = (e, columnId) => {
//     e.preventDefault();
//     e.currentTarget.classList.add('drag-over');
//   };

//   const handleDragLeave = (e) => {
//     e.currentTarget.classList.remove('drag-over');
//   };

//   const handleDrop = (e, toColumnId) => {
//     e.preventDefault();
//     e.currentTarget.classList.remove('drag-over');
    
//     const taskId = e.dataTransfer.getData('taskId');
//     const fromColumnId = e.dataTransfer.getData('fromColumn');
    
//     if (fromColumnId === toColumnId) return;

//     setColumns(prev => {
//       const fromColumn = prev[fromColumnId];
//       const toColumn = prev[toColumnId];
      
//       if (!fromColumn || !toColumn) return prev;
      
//       const task = fromColumn.tasks.find(t => t.id === taskId);
//       if (!task) return prev;

//       return {
//         ...prev,
//         [fromColumnId]: {
//           ...fromColumn,
//           tasks: fromColumn.tasks.filter(t => t.id !== taskId)
//         },
//         [toColumnId]: {
//           ...toColumn,
//           tasks: [...toColumn.tasks, task]
//         }
//       };
//     });
//   };

//   const handleDeleteTask = (columnId, taskId) => {
//     if (window.confirm('آیا از حذف این تسک اطمینان دارید؟')) {
//       setColumns(prev => ({
//         ...prev,
//         [columnId]: {
//           ...prev[columnId],
//           tasks: prev[columnId].tasks.filter(t => t.id !== taskId)
//         }
//       }));
//     }
//   };

//   const getPriorityClass = (priority) => {
//     switch (priority) {
//       case 'high': return 'priority-high';
//       case 'medium': return 'priority-medium';
//       case 'low': return 'priority-low';
//       default: return 'priority-medium';
//     }
//   };

//   return (
//     <div className="todo-board">
//       {/* هدر */}
//       <div className="board-header">
//         <div className="header-content">
//           <h1>برد وظایف</h1>
//           <p>مدیریت و پیگیری وظایف تیم</p>
//         </div>
//         <div className="header-actions">
//           <button 
//             className="btn btn-secondary"
//             onClick={() => setShowColumnManager(true)}
//           >
//             <FiColumns />
//             مدیریت ستون‌ها ({Object.keys(columns).length})
//           </button>
//         </div>
//       </div>

//       {/* برد Kanban */}
//       <div className="kanban-board">
//         {Object.values(columns).map(column => (
//           <div
//             key={column.id}
//             className="kanban-column"
//             onDragOver={(e) => handleDragOver(e, column.id)}
//             onDragLeave={handleDragLeave}
//             onDrop={(e) => handleDrop(e, column.id)}
//           >
//             {/* هدر ستون */}
//             <div className="column-header" style={{ borderColor: column.color }}>
//               <div className="column-title">
//                 <span 
//                   className="column-color-dot" 
//                   style={{ backgroundColor: column.color }}
//                 ></span>
//                 <h3>{column.title}</h3>
//                 <span className="task-count">{column.tasks.length}</span>
//               </div>
//               <div className="column-actions">
//                 <button 
//                   className="btn-add-task"
//                   onClick={() => handleAddTaskClick(column.id)}
//                   title="افزودن تسک"
//                 >
//                   <FiPlus />
//                 </button>
//               </div>
//             </div>

//             {/* لیست تسک‌ها */}
//             <div className="task-list">
//               {column.tasks.map(task => (
//                 <div
//                   key={task.id}
//                   className="task-card"
//                   draggable
//                   onDragStart={(e) => handleDragStart(e, task.id, column.id)}
//                 >
//                   <div className="task-header">
//                     <div className="task-priority">
//                       <div className={`priority-dot ${getPriorityClass(task.priority)}`}></div>
//                       <span className="priority-text">
//                         {task.priority === 'high' ? 'بالا' : 
//                          task.priority === 'medium' ? 'متوسط' : 'پایین'}
//                       </span>
//                     </div>
//                     <div className="task-actions">
//                       <button 
//                         className="btn-icon btn-delete"
//                         onClick={() => handleDeleteTask(column.id, task.id)}
//                         title="حذف تسک"
//                       >
//                         <FiTrash2 />
//                       </button>
//                     </div>
//                   </div>

//                   <div className="task-content">
//                     <h4 className="task-title">{task.title}</h4>
//                     <p className="task-description">{task.description}</p>
//                   </div>

//                   <div className="task-tags">
//                     {task.tags.map((tag, index) => (
//                       <span key={index} className="task-tag">
//                         {tag}
//                       </span>
//                     ))}
//                   </div>

//                   <div className="task-footer">
//                     <div className="task-assignee">
//                       <FiUser />
//                       <span>{task.assignee}</span>
//                     </div>
//                     <div className="task-due-date">
//                       <FiClock />
//                       <span>{task.dueDate}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {column.tasks.length === 0 && (
//               <div className="empty-column">
//                 <p>تسکی وجود ندارد</p>
//                 <span>برای افزودن تسک جدید کلیک کنید</span>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* مودال مدیریت ستون‌ها */}
//       <ColumnManager
//         isOpen={showColumnManager}
//         onClose={() => setShowColumnManager(false)}
//         columns={columns}
//         onAddColumn={handleAddColumn}
//         onEditColumn={handleEditColumn}
//         onDeleteColumn={handleDeleteColumn}
//         onReorderColumns={handleReorderColumns}
//       />

//       {/* مودال ایجاد تسک جدید */}
//       {showTaskModal && (
//         <div className="modal-overlay task-modal-overlay" onClick={() => setShowTaskModal(false)}>
//           <div className="modal-content task-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>ایجاد تسک جدید</h2>
//               <button className="close-btn" onClick={() => setShowTaskModal(false)}>
//                 <FiX />
//               </button>
//             </div>

//             <form onSubmit={handleCreateTask}>
//               <div className="form-group">
//                 <label>عنوان تسک *</label>
//                 <input
//                   type="text"
//                   value={newTask.title}
//                   onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
//                   placeholder="عنوان تسک را وارد کنید"
//                   required
//                   autoFocus
//                 />
//               </div>

//               <div className="form-group">
//                 <label>توضیحات</label>
//                 <textarea
//                   value={newTask.description}
//                   onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
//                   placeholder="توضیحات تسک"
//                   rows="3"
//                 />
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label>اولویت</label>
//                   <select
//                     value={newTask.priority}
//                     onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
//                   >
//                     <option value="low">پایین</option>
//                     <option value="medium">متوسط</option>
//                     <option value="high">بالا</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label>مسئول</label>
//                   <input
//                     type="text"
//                     value={newTask.assignee}
//                     onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
//                     placeholder="نام مسئول"
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label>تاریخ انجام</label>
//                 <input
//                   type="text"
//                   value={newTask.dueDate}
//                   onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
//                   placeholder="مثال: 1402/10/25"
//                 />
//               </div>

//               <div className="form-actions">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setShowTaskModal(false)}
//                 >
//                   انصراف
//                 </button>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                 >
//                   <FiSave />
//                   ایجاد تسک
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TodoBoard;

// components/todo/TodoBoard.jsx

import React, { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiMoreVertical, 
  FiEdit2, 
  FiTrash2,
  FiClock,
  FiUser,
  FiColumns,
  FiX,
  FiSave,
  FiRefreshCw
} from 'react-icons/fi';
import ColumnManager from './ColumnManager';
import { todoStatusService } from '../../../services/todoStatusService';
import './TodoBoard.css';
//import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const TodoBoard = () => {
  const [columns, setColumns] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [projectId, setProjectId] = useState(1); // یا از props بگیر
  
  const [showColumnManager, setShowColumnManager] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);

const [columnOrder, setColumnOrder] = useState([]); // اضافه کردن state برای ترتیب
  const location = useLocation();
  
  // دریافت projectId از state
  const projectId = location.state?.projectId;
  const projectName=location.state?.name
  console.log(projectName)
  console.log(projectId)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    dueDate: '',
    tags: []
  });

  // دریافت ستون‌ها از API
  const fetchColumns = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoStatusService.getTodoStatuses(projectId);

    const order = [];
      // تبدیل response API به فرمت داخلی
      const columnsData = {};
      response.data.forEach(status => {
        columnsData[status.id] = {
          id: status.id.toString(),
          title: status.name,
          color: status.color,
          orderNum:status.orderNum,
          tasks: [] // در مرحله بعد می‌تونیم تسک‌ها رو هم از API بگیریم
        };
          order.push(status.id.toString());
        console.log( columnsData[status.id]);
      });
      
    //   setColumns(columnsData);
        order.sort((a, b) => columnsData[a].orderNum - columnsData[b].orderNum);
    
    setColumns(columnsData);
    setColumnOrder(order);
    } catch (err) {
    //   console.error('Error fetching columns:', err);
    //   setError('خطا در دریافت اطلاعات ستون‌ها');
    //   // داده‌های نمونه برای حالت آفلاین
    //   setColumns(getSampleColumns());
        console.error('Error fetching columns:', err);
    setError('خطا در دریافت اطلاعات ستون‌ها');
    const sampleColumns = getSampleColumns();
    setColumns(sampleColumns);
    setColumnOrder(Object.keys(sampleColumns));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColumns();
  }, [projectId]);

  // مدیریت ستون‌ها با API
  const handleAddColumn = async (newColumnData) => {
    try {
      setError(null);
      const todoStatusData = {
        projectId: projectId,
        name: newColumnData.title,
        color: newColumnData.color
      };

      await todoStatusService.createTodoStatus(todoStatusData);
      
      // رفرش لیست ستون‌ها
      await fetchColumns();
      
    } catch (err) {
      console.error('Error adding column:', err);
      setError('خطا در ایجاد ستون جدید');
      throw err; // برای نمایش خطا در ColumnManager
    }
  };

  const handleEditColumn = async (columnId, updatedColumnData) => {
    try {
      setError(null);
      const todoStatusData = {
        projectId: projectId,
        name: updatedColumnData.title,
        color: updatedColumnData.color,
        orderNum:updatedColumnData.orderNum
      };
      console.log("update")
      console.log(todoStatusData)
      await todoStatusService.updateTodoStatus(columnId, todoStatusData);
      
      // آپدیت local state
      setColumns(prev => ({
        ...prev,
        [columnId]: {
          ...prev[columnId],
          title: updatedColumnData.title,
          color: updatedColumnData.color
        }
      }));
      
    } catch (err) {
      console.error('Error updating column:', err);
      setError('خطا در ویرایش ستون');
      throw err;
    }
  };

  const handleDeleteColumn = async (columnId) => {
    try {
      setError(null);
      
      if (Object.keys(columns).length <= 1) {
        throw new Error('حداقل یک ستون باید وجود داشته باشد');
      }

      await todoStatusService.deleteTodoStatus(columnId);
      
      // رفرش لیست ستون‌ها
      await fetchColumns();
      
    } catch (err) {
      console.error('Error deleting column:', err);
      setError(err.message || 'خطا در حذف ستون');
      throw err;
    }
  };

  const handleReorderColumns = (newColumnOrder) => {
      setColumnOrder(newColumnOrder);
    // اگر API برای مرتب سازی داریم، اینجا call می‌کنیم
     console.log(" اگر API برای مرتب سازی داریم، اینجا call می‌کنیم")
    console.log(newColumnOrder)
    const reorderedColumns = {};
    newColumnOrder.forEach(columnId => {
      if (columns[columnId]) {
        reorderedColumns[columnId] = columns[columnId];
      }
    });
  const updatedColumns = { ...columns };
  newColumnOrder.forEach((columnId, index) => {
    if (updatedColumns[columnId]) {
      updatedColumns[columnId] = {
        ...updatedColumns[columnId],
        orderNum: index + 1
      };
    }
  });
  
  setColumns(updatedColumns);
    //   setColumnOrder(newColumnOrder);
  };

  // مدیریت تسک‌ها
  const handleAddTaskClick = (columnId) => {
    setSelectedColumn(columnId);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      tags: []
    });
    setShowTaskModal(true);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      alert('لطفا عنوان تسک را وارد کنید');
      return;
    }

    const task = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      assignee: newTask.assignee || 'بدون اختصاص',
      dueDate: newTask.dueDate || new Date().toLocaleDateString('fa-IR'),
      tags: newTask.tags
    };

    setColumns(prev => ({
      ...prev,
      [selectedColumn]: {
        ...prev[selectedColumn],
        tasks: [...prev[selectedColumn].tasks, task]
      }
    }));

    setShowTaskModal(false);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      tags: []
    });
  };

  const handleDragStart = (e, taskId, columnId) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('fromColumn', columnId);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e, toColumnId) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const taskId = e.dataTransfer.getData('taskId');
    const fromColumnId = e.dataTransfer.getData('fromColumn');
    
    if (fromColumnId === toColumnId) return;

    setColumns(prev => {
      const fromColumn = prev[fromColumnId];
      const toColumn = prev[toColumnId];
      
      if (!fromColumn || !toColumn) return prev;
      
      const task = fromColumn.tasks.find(t => t.id === taskId);
      if (!task) return prev;

      return {
        ...prev,
        [fromColumnId]: {
          ...fromColumn,
          tasks: fromColumn.tasks.filter(t => t.id !== taskId)
        },
        [toColumnId]: {
          ...toColumn,
          tasks: [...toColumn.tasks, task]
        }
      };
    });
  };

  const handleDeleteTask = (columnId, taskId) => {
    if (window.confirm('آیا از حذف این تسک اطمینان دارید؟')) {
      setColumns(prev => ({
        ...prev,
        [columnId]: {
          ...prev[columnId],
          tasks: prev[columnId].tasks.filter(t => t.id !== taskId)
        }
      }));
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>در حال دریافت اطلاعات...</p>
      </div>
    );
  }

  return (
    <div className="todo-board">
      {/* هدر */}
      <div className="board-header">
        <div className="header-content">
          <h1>   وظایف   {projectName}</h1>
          <p>مدیریت و پیگیری وظایف تیم</p>
        </div>
        <div className="header-actions">
          {error && (
            <div className="error-banner">
              {error}
              <button onClick={() => setError(null)} className="btn-close-error">×</button>
            </div>
          )}
          <button 
            className="btn btn-secondary"
            onClick={fetchColumns}
            disabled={loading}
          >
            <FiRefreshCw className={loading ? 'spinning' : ''} />
            بروزرسانی
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowColumnManager(true)}
          >
            <FiColumns />
            مدیریت ستون‌ها ({Object.keys(columns).length})
          </button>
        </div>
      </div>

      {/* برد Kanban */}
      <div className="kanban-board">
        {Object.values(columns)
          .sort((a, b) => a.orderNum - b.orderNum)
        .map(column => (
          <div
            key={column.id}
            className="kanban-column"
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* هدر ستون */}
            <div className="column-header" style={{ borderColor: column.color }}>
              <div className="column-title">
                <span 
                  className="column-color-dot" 
                  style={{ backgroundColor: column.color }}
                ></span>
                <h3>{column.title}</h3>
                <span className="task-count">{column.tasks.length}</span>
              </div>
              <div className="column-actions">
                <button 
                  className="btn-add-task"
                  onClick={() => handleAddTaskClick(column.id)}
                  title="افزودن تسک"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* لیست تسک‌ها */}
            <div className="task-list">
              {column.tasks.map(task => (
                <div
                  key={task.id}
                  className="task-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                >
                  <div className="task-header">
                    <div className="task-priority">
                      <div className={`priority-dot ${getPriorityClass(task.priority)}`}></div>
                      <span className="priority-text">
                        {task.priority === 'high' ? 'بالا' : 
                         task.priority === 'medium' ? 'متوسط' : 'پایین'}
                      </span>
                    </div>
                    <div className="task-actions">
                      <button 
                        className="btn-icon btn-delete"
                        onClick={() => handleDeleteTask(column.id, task.id)}
                        title="حذف تسک"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>

                  <div className="task-content">
                    <h4 className="task-title">{task.title}</h4>
                    <p className="task-description">{task.description}</p>
                  </div>

                  <div className="task-tags">
                    {task.tags.map((tag, index) => (
                      <span key={index} className="task-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="task-footer">
                    <div className="task-assignee">
                      <FiUser />
                      <span>{task.assignee}</span>
                    </div>
                    <div className="task-due-date">
                      <FiClock />
                      <span>{task.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {column.tasks.length === 0 && (
              <div className="empty-column">
                <p>تسکی وجود ندارد</p>
                <span>برای افزودن تسک جدید کلیک کنید</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* مودال مدیریت ستون‌ها */}
      <ColumnManager
        isOpen={showColumnManager}
        onClose={() => setShowColumnManager(false)}
        columns={columns}
          columnOrder={columnOrder} // اضافه کردن
        onAddColumn={handleAddColumn}
        onEditColumn={handleEditColumn}
        onDeleteColumn={handleDeleteColumn}
        onReorderColumns={handleReorderColumns}
        loading={loading}
      />

      {/* مودال ایجاد تسک جدید */}
      {showTaskModal && (
        <div className="modal-overlay task-modal-overlay" onClick={() => setShowTaskModal(false)}>
          <div className="modal-content task-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>ایجاد تسک جدید</h2>
              <button className="close-btn" onClick={() => setShowTaskModal(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleCreateTask}>
              <div className="form-group">
                <label>عنوان تسک *</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="عنوان تسک را وارد کنید"
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>توضیحات</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="توضیحات تسک"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>اولویت</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                  >
                    <option value="low">پایین</option>
                    <option value="medium">متوسط</option>
                    <option value="high">بالا</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>مسئول</label>
                  <input
                    type="text"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
                    placeholder="نام مسئول"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>تاریخ انجام</label>
                <input
                  type="text"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                  placeholder="مثال: 1402/10/25"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowTaskModal(false)}
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <FiSave />
                  ایجاد تسک
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// داده‌های نمونه برای زمانی که API در دسترس نیست
const getSampleColumns = () => ({
  '1': {
    id: '1',
    title: 'در انتظار',
    color: '#94a3b8',
    tasks: []
  },
  '2': {
    id: '2',
    title: 'در حال انجام',
    color: '#f59e0b',
    tasks: []
  },
  '3': {
    id: '3',
    title: 'انجام شده',
    color: '#10b981',
    tasks: []
  }
});

export default TodoBoard;